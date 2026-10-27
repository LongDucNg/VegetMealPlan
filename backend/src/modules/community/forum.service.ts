import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog, ContentStatus } from './entities/blog.entity';
import { Comment } from './entities/comment.entity';
import { Vote } from './entities/vote.entity';
import { Category, CategoryStatus } from '../category/entities/category.entity';
import { ErrorCode } from '../../common/constants/error-codes.enum';
import { AuthUser } from '../../common/decorators/current-user.decorator';
import { ForumPostQueryDto } from './dto/forum-post-query.dto';
import { CreateForumPostDto } from './dto/create-forum-post.dto';
import { UpdateForumPostDto } from './dto/update-forum-post.dto';
import { VotePostDto } from './dto/vote-post.dto';
import { ForumCommentQueryDto } from './dto/forum-comment-query.dto';
import { CreateForumCommentDto } from './dto/create-forum-comment.dto';
import { AdminModerationQueryDto } from './dto/admin-moderation-query.dto';
import { ModeratePostDto } from './dto/moderate-post.dto';
import { AdminContentQueryDto } from './dto/admin-content-query.dto';
import { UpdateContentStatusDto } from './dto/update-content-status.dto';
import { NonVegetarianDetectorService } from '../../common/services/non-vegetarian-detector.service';

/** Danh mục diễn đàn là các dòng trong bảng categories có category_type = 'forum'. */
export const FORUM_CATEGORY_TYPE = 'forum';

/** Comment có moderation_status thuộc nhóm này thì bị ẩn và không tính vào số comment. */
const HIDDEN_COMMENT_STATUSES = ['rejected', 'removed'];

const SORTS: Record<string, [string, 'ASC' | 'DESC']> = {
  newest: ['blog.created_at', 'DESC'],
  oldest: ['blog.created_at', 'ASC'],
  most_viewed: ['blog.views', 'DESC'],
};

// Chỉ chọn đúng các cột cần. KHÔNG dùng relations: ['user'] vì sẽ lộ email và password_hash.
const POST_COLUMNS = [
  'blog.blog_id',
  'blog.title',
  'blog.content',
  'blog.tags',
  'blog.views',
  'blog.status',
  'blog.created_at',
  'user.user_id',
  'user.full_name',
  'category.category_id',
  'category.category_name',
];

const COMMENT_COLUMNS = [
  'c.comment_id',
  'c.comment_text',
  'c.created_at',
  'user.user_id',
  'user.full_name',
];

type StatMap = Map<number, number>;

@Injectable()
export class ForumService {
  constructor(
    @InjectRepository(Blog) private readonly blogRepo: Repository<Blog>,
    @InjectRepository(Category) private readonly categoryRepo: Repository<Category>,
    @InjectRepository(Vote) private readonly voteRepo: Repository<Vote>,
    @InjectRepository(Comment) private readonly commentRepo: Repository<Comment>,
    private readonly nonVegDetector: NonVegetarianDetectorService,
  ) {}

  // ---------- Danh mục ----------

  async listCategories() {
    const rows = await this.categoryRepo.find({
      where: { category_type: FORUM_CATEGORY_TYPE, status: CategoryStatus.ACTIVE },
      order: { category_name: 'ASC' },
    });
    return rows.map((c) => ({
      category_id: c.category_id,
      category_name: c.category_name,
      description: c.description,
    }));
  }

  // ---------- Danh sách bài ----------

  async listPosts(query: ForumPostQueryDto) {
    const { page, limit } = this.normalizePaging(query.page, query.limit, 10);

    const qb = this.basePostQuery();

    if (query.category_id) {
      qb.andWhere('blog.category_id = :categoryId', { categoryId: Number(query.category_id) });
    }
    if (query.q && query.q.trim()) {
      // Escape ký tự đặc biệt của ILIKE để người dùng gõ % hay _ không bị hiểu thành ký tự đại diện.
      const keyword = `%${query.q.trim().replace(/[\\%_]/g, '\\$&')}%`;
      qb.andWhere('(blog.title ILIKE :kw OR blog.content ILIKE :kw)', { kw: keyword });
    }
    if (query.tag && query.tag.trim()) {
      qb.andWhere(':tag = ANY(blog.tags)', { tag: query.tag.trim().normalize('NFC').toLowerCase() });
    }

    const [column, direction] = SORTS[query.sort ?? 'newest'] ?? SORTS.newest;
    qb.orderBy(column, direction).addOrderBy('blog.blog_id', 'DESC');
    qb.skip((page - 1) * limit).take(limit);

    const [posts, total] = await qb.getManyAndCount();
    const { ratingMap, commentMap } = await this.loadStats(posts.map((p) => p.blog_id));

    return {
      data: posts.map((p) => this.toPostView(p, ratingMap, commentMap, false)),
      pagination: { page, limit, total, total_pages: Math.ceil(total / limit) },
    };
  }

  // ---------- Chi tiết bài ----------

  async getPostDetail(id: number) {
    const post = await this.basePostQuery(['blog.updated_at'])
      .andWhere('blog.blog_id = :id', { id })
      .getOne();

    if (!post) {
      throw new NotFoundException({
        code: ErrorCode.FORUM_POST_NOT_FOUND,
        message: `Không tìm thấy bài viết #${id}`,
      });
    }

    await this.blogRepo.increment({ blog_id: id }, 'views', 1);
    post.views += 1;

    const { ratingMap, commentMap } = await this.loadStats([id]);
    return this.toPostView(post, ratingMap, commentMap, true);
  }

  // ---------- Đăng bài ----------

  // TODO: Nếu hệ thống bổ sung cờ email_verified cho tài khoản, kiểm tra cờ này trước khi cho đăng bài.
  async createPost(user: AuthUser, dto: CreateForumPostDto) {
    if (dto.category_id != null) {
      await this.assertForumCategory(dto.category_id);
    }

    const title = dto.title.trim().normalize('NFC');
    const content = dto.content.trim().normalize('NFC');
    const tags = this.normalizeTags(dto.tags);

    // Quét từ khóa nguyên liệu mặn trong tiêu đề, nội dung và tags
    const fullText = `${title} ${content} ${tags.join(' ')}`;
    const checkResult = this.nonVegDetector.checkText(fullText);

    let isFlagged = false;
    let flagReason: string | null = null;
    if (!checkResult.isClean) {
      isFlagged = true;
      flagReason = `Có thể nhắc tới nguyên liệu mặn: ${checkResult.violations.join(', ')}`;
    }

    // Admin đăng bài được duyệt luôn trừ khi bị gắn cờ; thành viên thì luôn chờ duyệt.
    const isAdmin = user.role?.toLowerCase() === 'admin';
    const shouldApprove = isAdmin && !isFlagged;

    const blog = this.blogRepo.create({
      user_id: user.user_id,
      title,
      content,
      category_id: dto.category_id,
      tags,
      status: shouldApprove ? ContentStatus.APPROVED : ContentStatus.PENDING_REVIEW,
      approved_at: shouldApprove ? new Date() : undefined,
      approved_by: shouldApprove ? user.user_id : undefined,
      reviewed_at: shouldApprove ? new Date() : undefined,
      reviewed_by: shouldApprove ? user.user_id : undefined,
      is_flagged: isFlagged,
      flag_reason: flagReason,
    });
    const saved = await this.blogRepo.save(blog);

    return {
      blog_id: saved.blog_id,
      title: saved.title,
      category_id: saved.category_id ?? null,
      tags: saved.tags,
      status: saved.status,
      is_flagged: saved.is_flagged,
      created_at: saved.created_at,
      message:
        saved.status === ContentStatus.PENDING_REVIEW
          ? isFlagged
            ? 'Bài viết chứa từ khóa cần quản trị viên xem xét trước khi hiển thị công khai.'
            : 'Bài viết đang chờ quản trị viên duyệt trước khi hiển thị công khai.'
          : 'Bài viết đã được đăng và duyệt thành công.',
    };
  }

  // ---------- Comment của bài ----------

  async listComments(postId: number, query: ForumCommentQueryDto) {
    await this.assertApprovedPost(postId);
    const { page, limit } = this.normalizePaging(query.page, query.limit, 20);

    const [rows, total] = await this.commentQuery()
      .andWhere('c.content_id = :postId', { postId })
      .orderBy('c.created_at', 'ASC')
      .addOrderBy('c.comment_id', 'ASC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      data: rows.map((c) => this.toCommentView(c)),
      pagination: { page, limit, total, total_pages: Math.ceil(total / limit) },
    };
  }

  async createComment(user: AuthUser, postId: number, dto: CreateForumCommentDto) {
    await this.assertApprovedPost(postId);

    const text = dto.content.trim().normalize('NFC');
    if (!text) {
      throw new BadRequestException({
        code: ErrorCode.VALIDATION_FAILED,
        message: 'Nội dung bình luận không được để trống',
      });
    }

    const saved = await this.commentRepo.save(
      this.commentRepo.create({
        user_id: user.user_id,
        content_type: 'blog',
        content_id: postId,
        comment_text: text,
        // Chưa có AI kiểm duyệt nên cho hiện luôn. Khi có AI quét, đổi thành 'pending' ở đây.
        moderation_status: 'approved',
      }),
    );

    const created = await this.commentQuery()
      .andWhere('c.comment_id = :id', { id: saved.comment_id })
      .getOne();
    return this.toCommentView(created ?? saved);
  }

  // ---------- Bài viết của tôi ----------

  async listMyPosts(user: AuthUser, query: ForumPostQueryDto) {
    const { page, limit } = this.normalizePaging(query.page, query.limit, 10);

    const qb = this.blogRepo
      .createQueryBuilder('blog')
      .leftJoin('blog.user', 'user')
      .leftJoin('blog.category', 'category')
      .select([
        ...POST_COLUMNS,
        'blog.status',
        'blog.reject_reason',
        'blog.is_flagged',
        'blog.flag_reason',
        'blog.updated_at',
      ])
      .where('blog.user_id = :userId', { userId: user.user_id })
      .andWhere('blog.status != :removedStatus', { removedStatus: ContentStatus.REMOVED });

    if (query.category_id) {
      qb.andWhere('blog.category_id = :categoryId', { categoryId: Number(query.category_id) });
    }
    if (query.q && query.q.trim()) {
      const keyword = `%${query.q.trim().replace(/[\\%_]/g, '\\$&')}%`;
      qb.andWhere('(blog.title ILIKE :kw OR blog.content ILIKE :kw)', { kw: keyword });
    }
    if (query.tag && query.tag.trim()) {
      qb.andWhere(':tag = ANY(blog.tags)', { tag: query.tag.trim().normalize('NFC').toLowerCase() });
    }

    const [column, direction] = SORTS[query.sort ?? 'newest'] ?? SORTS.newest;
    qb.orderBy(column, direction).addOrderBy('blog.blog_id', 'DESC');
    qb.skip((page - 1) * limit).take(limit);

    const [posts, total] = await qb.getManyAndCount();
    const { ratingMap, commentMap } = await this.loadStats(posts.map((p) => p.blog_id));

    return {
      data: posts.map((p) => ({
        ...this.toPostView(p, ratingMap, commentMap, false),
        status: p.status,
        reject_reason: p.reject_reason,
        is_flagged: p.is_flagged,
        flag_reason: p.flag_reason,
        updated_at: p.updated_at,
      })),
      pagination: { page, limit, total, total_pages: Math.ceil(total / limit) },
    };
  }

  // ---------- Sửa bài viết ----------

  async updatePost(user: AuthUser, id: number, dto: UpdateForumPostDto) {
    const post = await this.blogRepo.findOne({
      where: { blog_id: id },
      relations: ['category', 'user'],
    });

    if (!post || post.status === ContentStatus.REMOVED) {
      throw new NotFoundException({
        code: ErrorCode.FORUM_POST_NOT_FOUND,
        message: `Không tìm thấy bài viết #${id}`,
      });
    }

    const isAdmin = user.role?.toLowerCase() === 'admin';
    const isOwner = post.user_id === user.user_id;

    if (!isAdmin && !isOwner) {
      throw new ForbiddenException({
        code: ErrorCode.FORUM_FORBIDDEN,
        message: 'Bạn không có quyền chỉnh sửa bài viết này',
      });
    }

    if (dto.category_id !== undefined && dto.category_id !== null) {
      await this.assertForumCategory(dto.category_id);
      post.category_id = dto.category_id;
    }

    if (dto.title !== undefined) {
      post.title = dto.title.trim().normalize('NFC');
    }
    if (dto.content !== undefined) {
      post.content = dto.content.trim().normalize('NFC');
    }
    if (dto.tags !== undefined) {
      post.tags = this.normalizeTags(dto.tags);
    }

    // Quét lại cờ nguyên liệu mặn
    const fullText = `${post.title} ${post.content} ${(post.tags || []).join(' ')}`;
    const checkResult = this.nonVegDetector.checkText(fullText);

    let isFlagged = false;
    let flagReason: string | null = null;
    if (!checkResult.isClean) {
      isFlagged = true;
      flagReason = `Có thể nhắc tới nguyên liệu mặn: ${checkResult.violations.join(', ')}`;
    }
    post.is_flagged = isFlagged;
    post.flag_reason = flagReason;

    // Trạng thái: Thành viên sửa bài thì quay lại chờ duyệt và xóa lý do từ chối cũ
    // Admin sửa thì giữ nguyên trạng thái trừ khi bị gắn cờ
    if (!isAdmin) {
      post.status = ContentStatus.PENDING_REVIEW;
      post.approved_at = null;
      post.approved_by = null;
      post.reject_reason = null;
    } else {
      if (isFlagged) {
        post.status = ContentStatus.PENDING_REVIEW;
      }
    }

    const saved = await this.blogRepo.save(post);
    const { ratingMap, commentMap } = await this.loadStats([saved.blog_id]);
    return this.toPostView(saved, ratingMap, commentMap, true);
  }

  // ---------- Xóa bài viết (xóa mềm) ----------

  async deletePost(user: AuthUser, id: number) {
    const post = await this.blogRepo.findOne({ where: { blog_id: id } });

    if (!post || post.status === ContentStatus.REMOVED) {
      throw new NotFoundException({
        code: ErrorCode.FORUM_POST_NOT_FOUND,
        message: `Không tìm thấy bài viết #${id}`,
      });
    }

    const isAdmin = user.role?.toLowerCase() === 'admin';
    const isOwner = post.user_id === user.user_id;

    if (!isAdmin && !isOwner) {
      throw new ForbiddenException({
        code: ErrorCode.FORUM_FORBIDDEN,
        message: 'Bạn không có quyền xóa bài viết này',
      });
    }

    post.status = ContentStatus.REMOVED;
    await this.blogRepo.save(post);

    return { success: true, message: 'Đã xóa bài viết thành công' };
  }

  // ---------- Bình chọn bài viết (vote) ----------

  async votePost(user: AuthUser, id: number, dto: VotePostDto) {
    const post = await this.blogRepo.findOne({
      where: { blog_id: id, status: ContentStatus.APPROVED },
    });

    if (!post) {
      throw new NotFoundException({
        code: ErrorCode.FORUM_POST_NOT_FOUND,
        message: `Không tìm thấy bài viết #${id}`,
      });
    }

    // Không cho tự vote bài của chính mình
    if (post.user_id === user.user_id) {
      throw new BadRequestException({
        code: ErrorCode.FORUM_SELF_VOTE_FORBIDDEN,
        message: 'Bạn không thể tự bình chọn cho bài viết của chính mình',
      });
    }

    let myVote: 'up' | 'down' | null = null;

    if (dto.vote === null) {
      await this.voteRepo.delete({
        user_id: user.user_id,
        content_type: 'blog',
        content_id: id,
      });
      myVote = null;
    } else {
      const existing = await this.voteRepo.findOne({
        where: {
          user_id: user.user_id,
          content_type: 'blog',
          content_id: id,
        },
      });

      if (existing) {
        if (existing.vote_type === dto.vote) {
          // Gửi lại đúng giá trị đang có -> hủy vote
          await this.voteRepo.delete({ vote_id: existing.vote_id });
          myVote = null;
        } else {
          // Đổi chiều vote
          existing.vote_type = dto.vote;
          await this.voteRepo.save(existing);
          myVote = dto.vote;
        }
      } else {
        // Chưa có vote -> tạo mới (chống race condition với error 23505)
        try {
          await this.voteRepo.insert({
            user_id: user.user_id,
            content_type: 'blog',
            content_id: id,
            vote_type: dto.vote,
          });
          myVote = dto.vote;
        } catch (err: any) {
          if (err?.code === '23505' || err?.driverError?.code === '23505') {
            const current = await this.voteRepo.findOne({
              where: {
                user_id: user.user_id,
                content_type: 'blog',
                content_id: id,
              },
            });
            if (current) {
              if (current.vote_type === dto.vote) {
                await this.voteRepo.delete({ vote_id: current.vote_id });
                myVote = null;
              } else {
                current.vote_type = dto.vote;
                await this.voteRepo.save(current);
                myVote = dto.vote;
              }
            }
          } else {
            throw err;
          }
        }
      }
    }

    const ratingRes = await this.voteRepo
      .createQueryBuilder('v')
      .select(
        `COALESCE(SUM(CASE WHEN v.vote_type = 'up' THEN 1 WHEN v.vote_type = 'down' THEN -1 ELSE 0 END), 0)`,
        'rating',
      )
      .where('v.content_type = :type AND v.content_id = :id', { type: 'blog', id })
      .getRawOne();

    const rating = Number(ratingRes?.rating ?? 0);

    return {
      rating,
      my_vote: myVote,
    };
  }

  // ---------- Xóa bình luận (xóa mềm) ----------

  async deleteComment(user: AuthUser, postId: number, commentId: number) {
    const post = await this.blogRepo.findOne({ where: { blog_id: postId } });
    if (!post || post.status === ContentStatus.REMOVED) {
      throw new NotFoundException({
        code: ErrorCode.FORUM_POST_NOT_FOUND,
        message: `Không tìm thấy bài viết #${postId}`,
      });
    }

    const comment = await this.commentRepo.findOne({
      where: { comment_id: commentId, content_type: 'blog', content_id: postId },
    });

    if (!comment || comment.moderation_status === 'removed') {
      throw new NotFoundException({
        code: ErrorCode.FORUM_COMMENT_NOT_FOUND,
        message: `Không tìm thấy bình luận #${commentId} thuộc bài viết này`,
      });
    }

    const isAdmin = user.role?.toLowerCase() === 'admin';
    const isOwner = comment.user_id === user.user_id;

    if (!isAdmin && !isOwner) {
      throw new ForbiddenException({
        code: ErrorCode.FORUM_COMMENT_FORBIDDEN,
        message: 'Bạn không có quyền xóa bình luận này',
      });
    }

    comment.moderation_status = 'removed';
    await this.commentRepo.save(comment);

    return { success: true, message: 'Đã xóa bình luận thành công' };
  }

  // ---------- Bình chọn bình luận (vote comment) ----------

  async voteComment(user: AuthUser, postId: number, commentId: number, dto: VotePostDto) {
    await this.assertApprovedPost(postId);

    const comment = await this.commentRepo.findOne({
      where: { comment_id: commentId, content_type: 'blog', content_id: postId },
    });

    if (!comment || HIDDEN_COMMENT_STATUSES.includes(comment.moderation_status)) {
      throw new NotFoundException({
        code: ErrorCode.FORUM_COMMENT_NOT_FOUND,
        message: `Không tìm thấy bình luận #${commentId} thuộc bài viết này`,
      });
    }

    if (comment.user_id === user.user_id) {
      throw new BadRequestException({
        code: ErrorCode.FORUM_SELF_VOTE_FORBIDDEN,
        message: 'Bạn không thể tự bình chọn cho bình luận của chính mình',
      });
    }

    let myVote: 'up' | 'down' | null = null;

    if (dto.vote === null) {
      await this.voteRepo.delete({
        user_id: user.user_id,
        content_type: 'comment',
        content_id: commentId,
      });
      myVote = null;
    } else {
      const existing = await this.voteRepo.findOne({
        where: {
          user_id: user.user_id,
          content_type: 'comment',
          content_id: commentId,
        },
      });

      if (existing) {
        if (existing.vote_type === dto.vote) {
          await this.voteRepo.delete({ vote_id: existing.vote_id });
          myVote = null;
        } else {
          existing.vote_type = dto.vote;
          await this.voteRepo.save(existing);
          myVote = dto.vote;
        }
      } else {
        try {
          await this.voteRepo.insert({
            user_id: user.user_id,
            content_type: 'comment',
            content_id: commentId,
            vote_type: dto.vote,
          });
          myVote = dto.vote;
        } catch (err: any) {
          if (err?.code === '23505' || err?.driverError?.code === '23505') {
            const current = await this.voteRepo.findOne({
              where: {
                user_id: user.user_id,
                content_type: 'comment',
                content_id: commentId,
              },
            });
            if (current) {
              if (current.vote_type === dto.vote) {
                await this.voteRepo.delete({ vote_id: current.vote_id });
                myVote = null;
              } else {
                current.vote_type = dto.vote;
                await this.voteRepo.save(current);
                myVote = dto.vote;
              }
            }
          } else {
            throw err;
          }
        }
      }
    }

    const ratingRes = await this.voteRepo
      .createQueryBuilder('v')
      .select(
        `COALESCE(SUM(CASE WHEN v.vote_type = 'up' THEN 1 WHEN v.vote_type = 'down' THEN -1 ELSE 0 END), 0)`,
        'rating',
      )
      .where('v.content_type = :type AND v.content_id = :id', { type: 'comment', id: commentId })
      .getRawOne();

    return {
      rating: Number(ratingRes?.rating ?? 0),
      my_vote: myVote,
    };
  }

  // ---------- Admin: Hàng chờ duyệt bài viết ----------

  async getModerationQueue(user: AuthUser, query: AdminModerationQueryDto) {
    this.assertAdmin(user);
    const { page, limit } = this.normalizePaging(query.page, query.limit, 10);

    const qb = this.blogRepo
      .createQueryBuilder('blog')
      .leftJoin('blog.user', 'user')
      .leftJoin('blog.category', 'category')
      .select([
        ...POST_COLUMNS,
        'blog.status',
        'blog.is_flagged',
        'blog.flag_reason',
        'blog.reject_reason',
      ])
      .where('blog.status = :status', { status: ContentStatus.PENDING_REVIEW });

    if (query.is_flagged === true) {
      qb.andWhere('blog.is_flagged = true');
    }

    qb.orderBy('blog.is_flagged', 'DESC')
      .addOrderBy('blog.created_at', 'ASC')
      .addOrderBy('blog.blog_id', 'ASC');

    qb.skip((page - 1) * limit).take(limit);

    const [posts, total] = await qb.getManyAndCount();
    const { ratingMap, commentMap } = await this.loadStats(posts.map((p) => p.blog_id));

    return {
      data: posts.map((p) => ({
        ...this.toPostView(p, ratingMap, commentMap, false),
        status: p.status,
        is_flagged: p.is_flagged,
        flag_reason: p.flag_reason,
        reject_reason: p.reject_reason,
      })),
      pagination: { page, limit, total, total_pages: Math.ceil(total / limit) },
    };
  }

  // ---------- Admin: Duyệt hoặc từ chối bài viết ----------

  async moderatePost(user: AuthUser, id: number, dto: ModeratePostDto) {
    this.assertAdmin(user);

    const post = await this.blogRepo.findOne({ where: { blog_id: id } });
    if (!post) {
      throw new NotFoundException({
        code: ErrorCode.FORUM_POST_NOT_FOUND,
        message: `Không tìm thấy bài viết #${id}`,
      });
    }

    if (post.status !== ContentStatus.PENDING_REVIEW) {
      throw new ConflictException({
        code: ErrorCode.FORUM_POST_NOT_PENDING,
        message: 'Bài viết không ở trạng thái chờ duyệt',
      });
    }

    if (dto.action === 'approve') {
      post.status = ContentStatus.APPROVED;
      post.approved_at = new Date();
      post.approved_by = user.user_id;
      post.reviewed_at = new Date();
      post.reviewed_by = user.user_id;
      post.reject_reason = null;
    } else {
      const reason = dto.reason?.trim();
      if (!reason || reason.length < 5 || reason.length > 500) {
        throw new BadRequestException({
          code: ErrorCode.VALIDATION_FAILED,
          message: 'Lý do từ chối là bắt buộc và phải có từ 5 đến 500 ký tự',
        });
      }

      post.status = ContentStatus.REJECTED;
      post.reject_reason = reason;
      post.reviewed_at = new Date();
      post.reviewed_by = user.user_id;
      post.approved_at = null;
      post.approved_by = null;
    }

    const saved = await this.blogRepo.save(post);

    return {
      success: true,
      message: dto.action === 'approve' ? 'Đã duyệt bài viết thành công' : 'Đã từ chối bài viết',
      blog_id: saved.blog_id,
      status: saved.status,
      reject_reason: saved.reject_reason,
    };
  }

  // ---------- Admin: Danh sách nội dung đã đăng ----------

  async getAdminContentList(user: AuthUser, query: AdminContentQueryDto) {
    this.assertAdmin(user);

    if (query.type && query.type.trim().toLowerCase() !== 'blog') {
      throw new BadRequestException({
        code: ErrorCode.VALIDATION_FAILED,
        message: `Loại nội dung '${query.type}' chưa được hỗ trợ, hiện chỉ hỗ trợ 'blog'`,
      });
    }

    const { page, limit } = this.normalizePaging(query.page, query.limit, 20);

    const qb = this.blogRepo
      .createQueryBuilder('blog')
      .leftJoin('blog.user', 'user')
      .leftJoin('blog.category', 'category')
      .select([
        ...POST_COLUMNS,
        'blog.status',
        'blog.is_flagged',
        'blog.flag_reason',
        'blog.reject_reason',
        'blog.updated_at',
      ]);

    if (query.status) {
      qb.andWhere('blog.status = :status', { status: query.status });
    }

    qb.orderBy('blog.created_at', 'DESC').addOrderBy('blog.blog_id', 'DESC');
    qb.skip((page - 1) * limit).take(limit);

    const [posts, total] = await qb.getManyAndCount();
    const { ratingMap, commentMap } = await this.loadStats(posts.map((p) => p.blog_id));

    return {
      data: posts.map((p) => ({
        ...this.toPostView(p, ratingMap, commentMap, false),
        status: p.status,
        is_flagged: p.is_flagged,
        flag_reason: p.flag_reason,
        reject_reason: p.reject_reason,
        updated_at: p.updated_at,
      })),
      pagination: { page, limit, total, total_pages: Math.ceil(total / limit) },
    };
  }

  // ---------- Admin: Đổi trạng thái nội dung ----------

  async updateContentStatus(user: AuthUser, id: number, dto: UpdateContentStatusDto) {
    this.assertAdmin(user);

    const post = await this.blogRepo.findOne({ where: { blog_id: id } });
    if (!post) {
      throw new NotFoundException({
        code: ErrorCode.FORUM_POST_NOT_FOUND,
        message: `Không tìm thấy nội dung #${id}`,
      });
    }

    const current = post.status;
    const target = dto.status;

    // Kiểm tra chuyển trạng thái hợp lệ
    const isValidTransition =
      (current === ContentStatus.PENDING_REVIEW && (target === ContentStatus.APPROVED || target === ContentStatus.REJECTED)) ||
      (current === ContentStatus.APPROVED && target === ContentStatus.REMOVED) ||
      (current === ContentStatus.REMOVED && target === ContentStatus.APPROVED);

    if (!isValidTransition) {
      throw new ConflictException({
        code: ErrorCode.FORUM_POST_NOT_PENDING,
        message: `Không thể chuyển trạng thái từ '${current}' sang '${target}'`,
      });
    }

    // Từ chối hoặc gỡ bắt buộc có lý do từ 5 đến 500 ký tự
    const reason = dto.reason?.trim();
    if (target === ContentStatus.REJECTED || target === ContentStatus.REMOVED) {
      if (!reason || reason.length < 5 || reason.length > 500) {
        throw new BadRequestException({
          code: ErrorCode.VALIDATION_FAILED,
          message: 'Lý do từ chối hoặc gỡ bỏ là bắt buộc và phải có từ 5 đến 500 ký tự',
        });
      }
    }

    post.status = target;
    post.reviewed_by = user.user_id;
    post.reviewed_at = new Date();

    if (target === ContentStatus.APPROVED) {
      post.approved_by = user.user_id;
      post.approved_at = new Date();
      post.reject_reason = null;
    } else {
      post.reject_reason = reason || null;
      if (target === ContentStatus.REMOVED) {
        post.approved_by = null;
        post.approved_at = null;
      }
    }

    const saved = await this.blogRepo.save(post);

    return {
      success: true,
      message: 'Cập nhật trạng thái thành công',
      blog_id: saved.blog_id,
      status: saved.status,
      reject_reason: saved.reject_reason,
    };
  }

  // ---------- Chủ đề nổi (trending tags 7 ngày gần nhất) ----------

  async getTrendingTopics(limit?: number) {
    const safeLimit = Math.min(20, Math.max(1, Number(limit) || 10));
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const query = `
      SELECT tag, COUNT(*)::int AS posts
      FROM (
        SELECT unnest(tags) AS tag
        FROM blogs
        WHERE status = 'approved' AND created_at >= $1
      ) sub
      WHERE tag IS NOT NULL AND trim(tag) != ''
      GROUP BY tag
      ORDER BY posts DESC, tag ASC
      LIMIT $2
    `;

    const rows = await this.blogRepo.query(query, [sevenDaysAgo, safeLimit]);

    return rows.map((r: any) => ({
      tag: r.tag.startsWith('#') ? r.tag : `#${r.tag}`,
      posts: Number(r.posts),
    }));
  }

  private assertAdmin(user: AuthUser) {
    if (user.role?.toLowerCase() !== 'admin') {
      throw new ForbiddenException({
        code: ErrorCode.AUTH_FORBIDDEN,
        message: 'Chỉ quản trị viên mới có quyền thực hiện thao tác này',
      });
    }
  }

  // ---------- Hàm phụ ----------

  /** Câu truy vấn chung: chỉ lấy bài đã duyệt, kèm tác giả và danh mục. */
  private basePostQuery(extraColumns: string[] = []) {
    return this.blogRepo
      .createQueryBuilder('blog')
      .leftJoin('blog.user', 'user')
      .leftJoin('blog.category', 'category')
      .select([...POST_COLUMNS, ...extraColumns])
      .where('blog.status = :status', { status: ContentStatus.APPROVED });
  }

  /** Câu truy vấn chung cho comment của bài viết: bỏ comment bị ẩn, kèm tác giả. */
  private commentQuery() {
    return this.commentRepo
      .createQueryBuilder('c')
      .leftJoin('c.user', 'user')
      .select(COMMENT_COLUMNS)
      .where('c.content_type = :type', { type: 'blog' })
      .andWhere('(c.moderation_status IS NULL OR c.moderation_status NOT IN (:...hidden))', {
        hidden: HIDDEN_COMMENT_STATUSES,
      });
  }

  /** bảng comments không có khóa ngoại thật tới bài viết, nên phải tự kiểm tra bài tồn tại và đã duyệt. */
  private async assertApprovedPost(postId: number) {
    const exists = await this.blogRepo.exist({
      where: { blog_id: postId, status: ContentStatus.APPROVED },
    });
    if (!exists) {
      throw new NotFoundException({
        code: ErrorCode.FORUM_POST_NOT_FOUND,
        message: `Không tìm thấy bài viết #${postId}`,
      });
    }
  }

  private normalizePaging(page: number | undefined, limit: number | undefined, defaultLimit: number) {
    return {
      page: Math.max(1, Number(page) || 1),
      limit: Math.min(50, Math.max(1, Number(limit) || defaultLimit)),
    };
  }

  private async assertForumCategory(categoryId: number) {
    const category = await this.categoryRepo.findOne({
      where: {
        category_id: categoryId,
        category_type: FORUM_CATEGORY_TYPE,
        status: CategoryStatus.ACTIVE,
      },
    });
    if (!category) {
      throw new BadRequestException({
        code: ErrorCode.FORUM_CATEGORY_INVALID,
        message: 'Danh mục không tồn tại hoặc không thuộc diễn đàn',
      });
    }
  }

  private normalizeTags(tags?: string[]): string[] {
    if (!tags) return [];
    const normalized = tags
      .map((t) => t.trim().normalize('NFC').toLowerCase())
      .filter((t) => t.length > 0 && t.length <= 30);
    return [...new Set(normalized)].slice(0, 10);
  }

  /** Tính rating (up trừ down) và số comment cho cả danh sách bằng 2 truy vấn gộp. */
  private async loadStats(ids: number[]): Promise<{ ratingMap: StatMap; commentMap: StatMap }> {
    const ratingMap: StatMap = new Map();
    const commentMap: StatMap = new Map();
    if (ids.length === 0) return { ratingMap, commentMap };

    const votes = await this.voteRepo
      .createQueryBuilder('v')
      .select('v.content_id', 'content_id')
      .addSelect(
        `COALESCE(SUM(CASE WHEN v.vote_type = 'up' THEN 1 WHEN v.vote_type = 'down' THEN -1 ELSE 0 END), 0)`,
        'rating',
      )
      .where('v.content_type = :type', { type: 'blog' })
      .andWhere('v.content_id IN (:...ids)', { ids })
      .groupBy('v.content_id')
      .getRawMany();
    votes.forEach((r) => ratingMap.set(Number(r.content_id), Number(r.rating)));

    const comments = await this.commentRepo
      .createQueryBuilder('c')
      .select('c.content_id', 'content_id')
      .addSelect('COUNT(*)', 'total')
      .where('c.content_type = :type', { type: 'blog' })
      .andWhere('c.content_id IN (:...ids)', { ids })
      .andWhere('(c.moderation_status IS NULL OR c.moderation_status NOT IN (:...hidden))', {
        hidden: HIDDEN_COMMENT_STATUSES,
      })
      .groupBy('c.content_id')
      .getRawMany();
    comments.forEach((r) => commentMap.set(Number(r.content_id), Number(r.total)));

    return { ratingMap, commentMap };
  }

  /** Chỗ DUY NHẤT quyết định tên field của bài trả ra. Cần đổi theo doc FE thì sửa ở đây. */
  private toPostView(post: Blog, ratingMap: StatMap, commentMap: StatMap, full: boolean) {
    const base = {
      blog_id: post.blog_id,
      title: post.title,
      category: post.category
        ? { category_id: post.category.category_id, category_name: post.category.category_name }
        : null,
      tags: post.tags,
      views: post.views,
      status: post.status,
      rating: ratingMap.get(post.blog_id) ?? 0,
      comment_count: commentMap.get(post.blog_id) ?? 0,
      author: post.user ? { user_id: post.user.user_id, full_name: post.user.full_name } : null,
      created_at: post.created_at,
    };

    if (full) {
      return { ...base, content: post.content, updated_at: post.updated_at };
    }
    const excerpt = post.content.length > 200 ? `${post.content.slice(0, 200)}…` : post.content;
    return { ...base, excerpt };
  }

  /** Chỗ DUY NHẤT quyết định tên field của comment trả ra. Cần đổi theo doc FE thì sửa ở đây. */
  private toCommentView(c: Comment) {
    return {
      comment_id: c.comment_id,
      content: c.comment_text,
      author: c.user ? { user_id: c.user.user_id, full_name: c.user.full_name } : null,
      created_at: c.created_at,
    };
  }

  // ---------- Admin: Quản lý bài viết & Kiểm duyệt ----------

  async adminListPosts(query: { status?: string; page?: number; limit?: number }) {
    const { page, limit } = this.normalizePaging(query.page, query.limit, 20);
    const qb = this.blogRepo
      .createQueryBuilder('blog')
      .leftJoin('blog.user', 'user')
      .leftJoin('blog.category', 'category')
      .select([...POST_COLUMNS, 'blog.approved_at']);

    if (query.status && query.status !== 'all') {
      qb.andWhere('blog.status = :status', { status: query.status });
    }

    qb.orderBy('blog.created_at', 'DESC')
      .addOrderBy('blog.blog_id', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    const [posts, total] = await qb.getManyAndCount();
    const { ratingMap, commentMap } = await this.loadStats(posts.map((p) => p.blog_id));

    return {
      data: posts.map((p) => this.toPostView(p, ratingMap, commentMap, false)),
      pagination: { page, limit, total, total_pages: Math.ceil(total / limit) },
    };
  }

  async adminListPending(query: { page?: number; limit?: number }) {
    return this.adminListPosts({ status: ContentStatus.PENDING_REVIEW, ...query });
  }

  async adminGetPendingCount() {
    const count = await this.blogRepo.count({
      where: { status: ContentStatus.PENDING_REVIEW },
    });
    return { count };
  }

  async adminUpdateStatus(adminId: number, blogId: number, status: ContentStatus) {
    const blog = await this.blogRepo
      .createQueryBuilder('blog')
      .leftJoinAndSelect('blog.user', 'user')
      .leftJoinAndSelect('blog.category', 'category')
      .where('blog.blog_id = :id', { id: blogId })
      .getOne();

    if (!blog) {
      throw new NotFoundException({
        code: ErrorCode.FORUM_POST_NOT_FOUND,
        message: `Không tìm thấy bài viết #${blogId}`,
      });
    }

    blog.status = status;
    blog.approved_by = adminId;
    blog.approved_at = new Date();

    const saved = await this.blogRepo.save(blog);
    const { ratingMap, commentMap } = await this.loadStats([blogId]);
    return this.toPostView(saved, ratingMap, commentMap, true);
  }

  async adminDeletePost(blogId: number) {
    const blog = await this.blogRepo.findOne({ where: { blog_id: blogId } });
    if (!blog) {
      throw new NotFoundException({
        code: ErrorCode.FORUM_POST_NOT_FOUND,
        message: `Không tìm thấy bài viết #${blogId}`,
      });
    }

    await this.blogRepo.delete({ blog_id: blogId });
    return { success: true, message: `Đã xoá bài viết #${blogId}` };
  }
}