import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
import { ForumCommentQueryDto } from './dto/forum-comment-query.dto';
import { CreateForumCommentDto } from './dto/create-forum-comment.dto';

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
      qb.andWhere(':tag = ANY(blog.tags)', { tag: query.tag.trim().toLowerCase() });
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

  async createPost(user: AuthUser, dto: CreateForumPostDto) {
    if (dto.category_id != null) {
      await this.assertForumCategory(dto.category_id);
    }

    // Admin đăng thì duyệt luôn, thành viên đăng thì chờ duyệt.
    // Nếu dự án có enum role riêng thì dùng lại enum đó thay cho chuỗi 'admin'.
    const isAdmin = user.role === 'admin';

    const blog = this.blogRepo.create({
      user_id: user.user_id,
      title: dto.title.trim(),
      content: dto.content.trim(),
      category_id: dto.category_id,
      tags: this.normalizeTags(dto.tags),
      status: isAdmin ? ContentStatus.APPROVED : ContentStatus.PENDING_REVIEW,
      approved_at: isAdmin ? new Date() : undefined,
      approved_by: isAdmin ? user.user_id : undefined,
    });
    const saved = await this.blogRepo.save(blog);

    return {
      blog_id: saved.blog_id,
      title: saved.title,
      category_id: saved.category_id ?? null,
      tags: saved.tags,
      status: saved.status,
      created_at: saved.created_at,
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

    const text = dto.content.trim();
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
    return [...new Set(tags.map((t) => t.trim().toLowerCase()).filter((t) => t.length > 0))];
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
}