import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { Video } from './entities/video.entity';
import { ContentStatus } from './entities/blog.entity';
import { Comment } from './entities/comment.entity';
import { Vote } from './entities/vote.entity';
import { Category, CategoryStatus } from '../category/entities/category.entity';
import { ErrorCode } from '../../common/constants/error-codes.enum';
import { AuthUser } from '../../common/decorators/current-user.decorator';
import { VideoQueryDto } from './dto/video-query.dto';
import { VideoCommentQueryDto } from './dto/video-comment-query.dto';
import { CreateVideoCommentDto } from './dto/create-video-comment.dto';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { VoteCommentDto } from './dto/vote-comment.dto';
import { NonVegetarianDetectorService } from '../../common/services/non-vegetarian-detector.service';

export const VIDEO_CATEGORY_TYPE = 'video';

/** File upload interface để tương thích với Multer */
export interface UploadedMediaFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
}

/** Comment có moderation_status thuộc nhóm này thì bị ẩn và không tính vào số comment. */
const HIDDEN_COMMENT_STATUSES = ['rejected', 'removed'];

// Chỉ chọn các cột an toàn. Tuyệt đối KHÔNG chọn user.email hoặc user.password_hash.
const VIDEO_COLUMNS = [
  'video.video_id',
  'video.title',
  'video.thumbnail_url',
  'video.description',
  'video.video_url',
  'video.duration',
  'video.transcript_summary',
  'video.cuisine',
  'video.difficulty',
  'video.ingredients',
  'video.steps',
  'video.kcal',
  'video.servings',
  'video.tags',
  'video.views',
  'video.status',
  'video.created_at',
  'video.updated_at',
  'user.user_id',
  'user.full_name',
  'user.role',
  'category.category_id',
  'category.category_name',
];

const COMMENT_COLUMNS = [
  'c.comment_id',
  'c.comment_text',
  'c.created_at',
  'user.user_id',
  'user.full_name',
  'user.role',
];

type StatMap = Map<number, number>;

function cleanupFile(filePath?: string) {
  if (!filePath) return;
  try {
    const normalized = filePath.startsWith('/') ? filePath.slice(1) : filePath;
    const fullPath = path.resolve(process.cwd(), normalized);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  } catch (err) {
    // Không ném lỗi nếu dọn file thất bại
  }
}

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(Video) private readonly videoRepo: Repository<Video>,
    @InjectRepository(Category) private readonly categoryRepo: Repository<Category>,
    @InjectRepository(Vote) private readonly voteRepo: Repository<Vote>,
    @InjectRepository(Comment) private readonly commentRepo: Repository<Comment>,
    private readonly nonVegDetector: NonVegetarianDetectorService,
  ) {}

  // ==========================================
  // GET /videos - Danh sách video đã duyệt
  // ==========================================
  async listVideos(query: VideoQueryDto) {
    const { page, limit } = this.normalizePaging(query.page, query.limit, 20);

    const qb = this.baseVideoQuery();

    // 1. Lọc theo danh mục nếu có
    if (query.category && query.category.trim()) {
      const rawCategory = query.category.trim();
      const lower = rawCategory.toLowerCase();
      if (lower !== 'tất cả' && lower !== 'all') {
        const matchedCategory = await this.categoryRepo
          .createQueryBuilder('cat')
          .where('cat.category_type = :type', { type: VIDEO_CATEGORY_TYPE })
          .andWhere('cat.status = :status', { status: CategoryStatus.ACTIVE })
          .andWhere('LOWER(cat.category_name) = LOWER(:catName)', { catName: rawCategory })
          .getOne();

        if (!matchedCategory) {
          return {
            data: [],
            pagination: { page, limit, total: 0, total_pages: 0 },
          };
        }

        qb.andWhere('video.category_id = :categoryId', { categoryId: matchedCategory.category_id });
      }
    }

    // 2. Tìm kiếm trong tiêu đề và mô tả
    if (query.q && query.q.trim()) {
      const kw = `%${query.q.trim().replace(/[\\%_]/g, '\\$&')}%`;
      qb.andWhere('(video.title ILIKE :kw OR video.description ILIKE :kw)', { kw });
    }

    // 3. Sắp xếp
    const sort = query.sort ?? 'newest';
    if (sort === 'rating') {
      qb.leftJoin(
        (sub) =>
          sub
            .select('v.content_id', 'content_id')
            .addSelect(
              `COALESCE(SUM(CASE WHEN v.vote_type = 'up' THEN 1 WHEN v.vote_type = 'down' THEN -1 ELSE 0 END), 0)`,
              'rating_score',
            )
            .from(Vote, 'v')
            .where('v.content_type = :vType', { vType: 'video' })
            .groupBy('v.content_id'),
        'vote_stat',
        'vote_stat.content_id = video.video_id',
      );
      qb.orderBy('COALESCE(vote_stat.rating_score, 0)', 'DESC').addOrderBy('video.video_id', 'DESC');
    } else if (sort === 'trending') {
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      qb.andWhere('video.created_at >= :since', { since: thirtyDaysAgo });
      qb.leftJoin(
        (sub) =>
          sub
            .select('v.content_id', 'content_id')
            .addSelect(
              `COALESCE(SUM(CASE WHEN v.vote_type = 'up' THEN 1 WHEN v.vote_type = 'down' THEN -1 ELSE 0 END), 0)`,
              'rating_score',
            )
            .from(Vote, 'v')
            .where('v.content_type = :vType', { vType: 'video' })
            .groupBy('v.content_id'),
        'vote_stat',
        'vote_stat.content_id = video.video_id',
      );
      qb.leftJoin(
        (sub) =>
          sub
            .select('c.content_id', 'content_id')
            .addSelect('COUNT(*)', 'cmt_count')
            .from(Comment, 'c')
            .where('c.content_type = :cType', { cType: 'video' })
            .andWhere('(c.moderation_status IS NULL OR c.moderation_status NOT IN (:...hiddenStatus))', {
              hiddenStatus: HIDDEN_COMMENT_STATUSES,
            })
            .groupBy('c.content_id'),
        'cmt_stat',
        'cmt_stat.content_id = video.video_id',
      );
      qb.orderBy(
        '(video.views + 5 * COALESCE(cmt_stat.cmt_count, 0) + 10 * COALESCE(vote_stat.rating_score, 0))',
        'DESC',
      )
        .addOrderBy('video.created_at', 'DESC')
        .addOrderBy('video.video_id', 'DESC');
    } else {
      qb.orderBy('video.created_at', 'DESC').addOrderBy('video.video_id', 'DESC');
    }

    // 4. Phân trang
    qb.skip((page - 1) * limit).take(limit);

    const [videos, total] = await qb.getManyAndCount();
    const { ratingMap, commentMap } = await this.loadStats(videos.map((v) => v.video_id));

    return {
      data: videos.map((v) => this.toVideoView(v, ratingMap, commentMap)),
      pagination: { page, limit, total, total_pages: Math.ceil(total / limit) },
    };
  }

  // ==========================================
  // GET /videos/trending - Video nổi bật
  // ==========================================
  async getTrendingVideos(limit?: number) {
    const safeLimit = Math.min(20, Math.max(1, Number(limit) || 6));
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const buildTrendingQb = (sinceDate?: Date) => {
      const qb = this.baseVideoQuery()
        .leftJoin(
          (sub) =>
            sub
              .select('v.content_id', 'content_id')
              .addSelect(
                `COALESCE(SUM(CASE WHEN v.vote_type = 'up' THEN 1 WHEN v.vote_type = 'down' THEN -1 ELSE 0 END), 0)`,
                'rating_score',
              )
              .from(Vote, 'v')
              .where('v.content_type = :vType', { vType: 'video' })
              .groupBy('v.content_id'),
          'vote_stat',
          'vote_stat.content_id = video.video_id',
        )
        .leftJoin(
          (sub) =>
            sub
              .select('c.content_id', 'content_id')
              .addSelect('COUNT(*)', 'cmt_count')
              .from(Comment, 'c')
              .where('c.content_type = :cType', { cType: 'video' })
              .andWhere('(c.moderation_status IS NULL OR c.moderation_status NOT IN (:...hiddenStatus))', {
                hiddenStatus: HIDDEN_COMMENT_STATUSES,
              })
              .groupBy('c.content_id'),
          'cmt_stat',
          'cmt_stat.content_id = video.video_id',
        )
        .orderBy(
          '(video.views + 5 * COALESCE(cmt_stat.cmt_count, 0) + 10 * COALESCE(vote_stat.rating_score, 0))',
          'DESC',
        )
        .addOrderBy('video.created_at', 'DESC')
        .addOrderBy('video.video_id', 'DESC')
        .take(safeLimit);

      if (sinceDate) {
        qb.andWhere('video.created_at >= :since', { since: sinceDate });
      }
      return qb;
    };

    let videos = await buildTrendingQb(thirtyDaysAgo).getMany();

    if (videos.length < safeLimit) {
      const existingIds = videos.map((v) => v.video_id);
      const fallbackQb = buildTrendingQb();
      if (existingIds.length > 0) {
        fallbackQb.andWhere('video.video_id NOT IN (:...existingIds)', { existingIds });
      }
      fallbackQb.take(safeLimit - videos.length);
      const extra = await fallbackQb.getMany();
      videos = [...videos, ...extra];
    }

    const { ratingMap, commentMap } = await this.loadStats(videos.map((v) => v.video_id));
    return videos.map((v) => this.toVideoView(v, ratingMap, commentMap));
  }

  // ==========================================
  // GET /videos/filters - Danh sách bộ lọc danh mục
  // ==========================================
  async getVideoFilters(): Promise<string[]> {
    const categories = await this.categoryRepo.find({
      where: { category_type: VIDEO_CATEGORY_TYPE, status: CategoryStatus.ACTIVE },
      order: { category_name: 'ASC' },
    });
    const names = categories.map((c) => c.category_name.trim());
    return ['Tất cả', ...names.filter((name) => name.toLowerCase() !== 'tất cả')];
  }

  // ==========================================
  // GET /videos/:id - Chi tiết video & tăng view
  // ==========================================
  async getVideoDetail(id: number) {
    const video = await this.baseVideoQuery()
      .andWhere('video.video_id = :id', { id })
      .getOne();

    if (!video) {
      throw new NotFoundException({
        code: ErrorCode.VIDEO_NOT_FOUND,
        message: `Không tìm thấy video #${id}`,
      });
    }

    await this.videoRepo.increment({ video_id: id }, 'views', 1);
    video.views += 1;

    const { ratingMap, commentMap } = await this.loadStats([id]);
    const comments = await this.loadVideoComments(id);

    return this.toVideoView(video, ratingMap, commentMap, comments);
  }

  // ==========================================
  // POST /videos - Đăng video mới
  // ==========================================
  async createVideo(
    user: AuthUser,
    dto: CreateVideoDto,
    videoFile?: UploadedMediaFile,
    thumbnailFile?: UploadedMediaFile,
  ) {
    // 1. Kiểm tra file upload
    if (!videoFile) {
      if (thumbnailFile) cleanupFile(thumbnailFile.path);
      throw new BadRequestException({
        code: ErrorCode.VALIDATION_FAILED,
        message: 'Bắt buộc phải tải lên file video (định dạng mp4 hoặc webm, tối đa 100MB)',
      });
    }

    if (!thumbnailFile) {
      cleanupFile(videoFile.path);
      throw new BadRequestException({
        code: ErrorCode.VALIDATION_FAILED,
        message: 'Bắt buộc phải tải lên ảnh thumbnail (định dạng jpg, png hoặc webp, tối đa 2MB)',
      });
    }

    // 2. Kiểm tra danh mục
    const matchedCategory = await this.categoryRepo.findOne({
      where: {
        category_name: dto.category.trim(),
        category_type: VIDEO_CATEGORY_TYPE,
        status: CategoryStatus.ACTIVE,
      },
    });

    if (!matchedCategory) {
      cleanupFile(videoFile.path);
      cleanupFile(thumbnailFile.path);
      throw new BadRequestException({
        code: ErrorCode.VIDEO_CATEGORY_INVALID,
        message: `Danh mục "${dto.category}" không tồn tại hoặc không thuộc danh mục video đang hoạt động`,
      });
    }

    // 3. Kiểm tra nguyên liệu mặn: chặn hẳn nếu có vi phạm
    const ingCheck = this.nonVegDetector.checkIngredients(dto.ingredients);
    if (!ingCheck.isClean) {
      cleanupFile(videoFile.path);
      cleanupFile(thumbnailFile.path);
      throw new BadRequestException({
        code: ErrorCode.VIDEO_NON_VEGETARIAN_INGREDIENT,
        message: `Nguyên liệu chứa thành phần mặn không phù hợp: ${ingCheck.violations.join(', ')} (${ingCheck.offendingIngredients.join(', ')})`,
      });
    }

    // 4. Quét gắn cờ tự động cho tiêu đề, mô tả, các bước
    let isFlagged = false;
    const flagReasons: string[] = [];

    const titleCheck = this.nonVegDetector.checkText(dto.title);
    if (!titleCheck.isClean) {
      isFlagged = true;
      flagReasons.push(`Tiêu đề chứa từ khóa nghi ngờ mặn: ${titleCheck.violations.join(', ')}`);
    }

    if (dto.description) {
      const descCheck = this.nonVegDetector.checkText(dto.description);
      if (!descCheck.isClean) {
        isFlagged = true;
        flagReasons.push(`Mô tả chứa từ khóa nghi ngờ mặn: ${descCheck.violations.join(', ')}`);
      }
    }

    if (dto.steps && Array.isArray(dto.steps)) {
      for (const step of dto.steps) {
        const stepCheck = this.nonVegDetector.checkText(step);
        if (!stepCheck.isClean) {
          isFlagged = true;
          flagReasons.push(`Các bước chứa từ khóa nghi ngờ mặn: ${stepCheck.violations.join(', ')}`);
          break;
        }
      }
    }

    // 5. Kiểm duyệt: Admin đăng không bị cờ -> approved; thành viên hoặc bị cờ -> pending_review
    const isAdmin = user.role?.toLowerCase() === 'admin';
    const shouldApprove = isAdmin && !isFlagged;

    const videoData: Partial<Video> = {
      user_id: user.user_id,
      category_id: matchedCategory.category_id,
      title: dto.title.trim().normalize('NFC'),
      description: dto.description?.trim().normalize('NFC') || null,
      video_url: videoFile.path.replace(/\\/g, '/'),
      thumbnail_url: thumbnailFile.path.replace(/\\/g, '/'),
      cuisine: dto.cuisine?.trim() || null,
      difficulty: dto.difficulty?.trim() || null,
      ingredients: dto.ingredients.map((i) => ({ name: i.name.trim(), amount: i.amount?.trim() || '' })),
      steps: dto.steps.map((s) => s.trim()),
      kcal: dto.kcal,
      servings: dto.servings || 1,
      duration: dto.duration?.trim() || null,
      status: shouldApprove ? ContentStatus.APPROVED : ContentStatus.PENDING_REVIEW,
      approved_at: shouldApprove ? new Date() : null,
      approved_by: shouldApprove ? user.user_id : null,
      is_flagged: isFlagged,
      flag_reason: isFlagged ? flagReasons.join('; ') : null,
    };

    const video = this.videoRepo.create(videoData as any);
    const saved = (await this.videoRepo.save(video)) as unknown as Video;
    const loaded = await this.baseVideoQuery()
      .andWhere('video.video_id = :id', { id: saved.video_id })
      .getOne();

    if (!loaded) {
      saved.category = matchedCategory;
      saved.user = { user_id: user.user_id, full_name: 'Bạn', role: user.role } as any;
      return this.toVideoView(saved, new Map(), new Map(), []);
    }

    return this.toVideoView(loaded, new Map(), new Map(), []);
  }

  // ==========================================
  // PUT /videos/:id - Chỉnh sửa video (chủ video hoặc admin)
  // ==========================================
  async updateVideo(
    user: AuthUser,
    id: number,
    dto: UpdateVideoDto,
    thumbnailFile?: UploadedMediaFile,
  ) {
    const video = await this.videoRepo.findOne({
      where: { video_id: id },
      relations: ['user', 'category'],
    });

    if (!video || video.status === ContentStatus.REMOVED) {
      if (thumbnailFile) cleanupFile(thumbnailFile.path);
      throw new NotFoundException({
        code: ErrorCode.VIDEO_NOT_FOUND,
        message: `Không tìm thấy video #${id}`,
      });
    }

    const isAdmin = user.role?.toLowerCase() === 'admin';
    const isOwner = video.user_id === user.user_id;

    if (!isAdmin && !isOwner) {
      if (thumbnailFile) cleanupFile(thumbnailFile.path);
      throw new ForbiddenException({
        code: ErrorCode.VIDEO_FORBIDDEN,
        message: 'Bạn không có quyền chỉnh sửa video này',
      });
    }

    let hasSignificantChanges = false;

    // 1. Cập nhật danh mục
    if (dto.category && dto.category.trim()) {
      const matchedCategory = await this.categoryRepo.findOne({
        where: {
          category_name: dto.category.trim(),
          category_type: VIDEO_CATEGORY_TYPE,
          status: CategoryStatus.ACTIVE,
        },
      });

      if (!matchedCategory) {
        if (thumbnailFile) cleanupFile(thumbnailFile.path);
        throw new BadRequestException({
          code: ErrorCode.VIDEO_CATEGORY_INVALID,
          message: `Danh mục "${dto.category}" không tồn tại hoặc không thuộc danh mục video hoạt động`,
        });
      }
      video.category_id = matchedCategory.category_id;
      video.category = matchedCategory;
    }

    // 2. Cập nhật nguyên liệu
    if (dto.ingredients) {
      const ingCheck = this.nonVegDetector.checkIngredients(dto.ingredients);
      if (!ingCheck.isClean) {
        if (thumbnailFile) cleanupFile(thumbnailFile.path);
        throw new BadRequestException({
          code: ErrorCode.VIDEO_NON_VEGETARIAN_INGREDIENT,
          message: `Nguyên liệu chứa thành phần mặn không phù hợp: ${ingCheck.violations.join(', ')}`,
        });
      }
      video.ingredients = dto.ingredients.map((i) => ({ name: i.name.trim(), amount: i.amount?.trim() || '' }));
      hasSignificantChanges = true;
    }

    // 3. Cập nhật các trường danh sách trắng
    if (dto.title && dto.title.trim()) {
      video.title = dto.title.trim().normalize('NFC');
      hasSignificantChanges = true;
    }
    if (dto.description !== undefined) {
      video.description = dto.description?.trim().normalize('NFC') || null;
    }
    if (dto.cuisine !== undefined) {
      video.cuisine = dto.cuisine?.trim() || null;
    }
    if (dto.difficulty !== undefined) {
      video.difficulty = dto.difficulty?.trim() || null;
    }
    if (dto.steps) {
      video.steps = dto.steps.map((s) => s.trim());
      hasSignificantChanges = true;
    }
    if (dto.kcal !== undefined) {
      video.kcal = dto.kcal;
    }
    if (dto.servings !== undefined) {
      video.servings = dto.servings;
    }
    if (dto.duration !== undefined) {
      video.duration = dto.duration?.trim() || null;
    }
    if (thumbnailFile) {
      cleanupFile(video.thumbnail_url || undefined);
      video.thumbnail_url = thumbnailFile.path.replace(/\\/g, '/');
      hasSignificantChanges = true;
    } else if (dto.thumbnail_url) {
      video.thumbnail_url = dto.thumbnail_url;
    }

    // 4. Kiểm duyệt khi sửa:
    // Thành viên sửa nội dung quan trọng của video đã duyệt -> chuyển về pending_review
    if (!isAdmin && hasSignificantChanges && video.status === ContentStatus.APPROVED) {
      video.status = ContentStatus.PENDING_REVIEW;
      video.approved_at = null;
      video.approved_by = null;
    }

    // Quét lại cờ
    const titleCheck = this.nonVegDetector.checkText(video.title);
    const descCheck = this.nonVegDetector.checkText(video.description);
    let stepFlagged = false;
    if (video.steps && Array.isArray(video.steps)) {
      for (const step of video.steps) {
        if (!this.nonVegDetector.checkText(step).isClean) {
          stepFlagged = true;
          break;
        }
      }
    }
    if (!titleCheck.isClean || !descCheck.isClean || stepFlagged) {
      video.is_flagged = true;
      video.flag_reason = 'Phát hiện từ khóa nghi ngờ mặn sau khi chỉnh sửa';
      if (!isAdmin) {
        video.status = ContentStatus.PENDING_REVIEW;
      }
    }

    const saved = await this.videoRepo.save(video);
    const { ratingMap, commentMap } = await this.loadStats([saved.video_id]);
    return this.toVideoView(saved, ratingMap, commentMap);
  }

  // ==========================================
  // DELETE /videos/:id - Xóa mềm video
  // ==========================================
  async deleteVideo(user: AuthUser, id: number) {
    const video = await this.videoRepo.findOne({ where: { video_id: id } });

    if (!video || video.status === ContentStatus.REMOVED) {
      throw new NotFoundException({
        code: ErrorCode.VIDEO_NOT_FOUND,
        message: `Không tìm thấy video #${id}`,
      });
    }

    const isAdmin = user.role?.toLowerCase() === 'admin';
    const isOwner = video.user_id === user.user_id;

    if (!isAdmin && !isOwner) {
      throw new ForbiddenException({
        code: ErrorCode.VIDEO_FORBIDDEN,
        message: 'Bạn không có quyền xóa video này',
      });
    }

    video.status = ContentStatus.REMOVED;
    await this.videoRepo.save(video);

    return { success: true, message: 'Đã xóa video thành công' };
  }

  // ==========================================
  // GET /videos/:id/comments - Danh sách comment
  // ==========================================
  async listVideoComments(videoId: number, query: VideoCommentQueryDto) {
    await this.assertApprovedVideo(videoId);
    const { page, limit } = this.normalizePaging(query.page, query.limit, 20);

    const [rows, total] = await this.commentRepo
      .createQueryBuilder('c')
      .leftJoin('c.user', 'user')
      .select(COMMENT_COLUMNS)
      .where('c.content_type = :type', { type: 'video' })
      .andWhere('c.content_id = :videoId', { videoId })
      .andWhere('(c.moderation_status IS NULL OR c.moderation_status NOT IN (:...hidden))', {
        hidden: HIDDEN_COMMENT_STATUSES,
      })
      .orderBy('c.created_at', 'ASC')
      .addOrderBy('c.comment_id', 'ASC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    const voteMap = await this.loadCommentVoteStats(rows.map((r) => r.comment_id));

    return {
      data: rows.map((c) => this.toCommentView(c, voteMap.get(c.comment_id) ?? 0)),
      pagination: { page, limit, total, total_pages: Math.ceil(total / limit) },
    };
  }

  // ==========================================
  // POST /videos/:id/comments - Thêm comment mới
  // ==========================================
  async createVideoComment(user: AuthUser, videoId: number, dto: CreateVideoCommentDto) {
    await this.assertApprovedVideo(videoId);

    const text = dto.content?.trim();
    if (!text) {
      throw new BadRequestException({
        code: ErrorCode.VALIDATION_FAILED,
        message: 'Nội dung bình luận không được để trống',
      });
    }

    const saved = await this.commentRepo.save(
      this.commentRepo.create({
        user_id: user.user_id,
        content_type: 'video',
        content_id: videoId,
        comment_text: text,
        moderation_status: 'approved',
      }),
    );

    const created = await this.commentRepo
      .createQueryBuilder('c')
      .leftJoin('c.user', 'user')
      .select(COMMENT_COLUMNS)
      .where('c.comment_id = :id', { id: saved.comment_id })
      .getOne();

    return this.toCommentView(created ?? saved, 0);
  }

  // ==========================================
  // POST /videos/:id/comments/:commentId/vote - Vote comment
  // ==========================================
  async voteComment(user: AuthUser, videoId: number, commentId: number, dto: VoteCommentDto) {
    await this.assertApprovedVideo(videoId);

    const comment = await this.commentRepo.findOne({
      where: { comment_id: commentId, content_type: 'video', content_id: videoId },
    });

    if (!comment || HIDDEN_COMMENT_STATUSES.includes(comment.moderation_status)) {
      throw new NotFoundException({
        code: ErrorCode.VIDEO_COMMENT_NOT_FOUND,
        message: `Không tìm thấy bình luận #${commentId} trong video này`,
      });
    }

    if (comment.user_id === user.user_id) {
      throw new BadRequestException({
        code: ErrorCode.VIDEO_SELF_VOTE_FORBIDDEN,
        message: 'Bạn không thể tự bình chọn cho bình luận của chính mình',
      });
    }

    const existingVote = await this.voteRepo.findOne({
      where: {
        user_id: user.user_id,
        content_type: 'comment',
        content_id: commentId,
      },
    });

    if (dto.vote === null) {
      if (existingVote) {
        await this.voteRepo.delete({ vote_id: existingVote.vote_id });
      }
    } else {
      if (existingVote) {
        existingVote.vote_type = dto.vote;
        await this.voteRepo.save(existingVote);
      } else {
        await this.voteRepo.save(
          this.voteRepo.create({
            user_id: user.user_id,
            content_type: 'comment',
            content_id: commentId,
            vote_type: dto.vote,
          }),
        );
      }
    }

    return { success: true, message: 'Bình chọn thành công' };
  }

  // ==========================================
  // GET /videos/:id/ai-summary - Tóm tắt AI
  // ==========================================
  async getVideoAiSummary(id: number) {
    const video = await this.videoRepo.findOne({
      where: { video_id: id, status: ContentStatus.APPROVED },
    });

    if (!video) {
      throw new NotFoundException({
        code: ErrorCode.VIDEO_NOT_FOUND,
        message: `Không tìm thấy video #${id}`,
      });
    }

    if (!video.transcript_summary) {
      return {
        hasSummary: false,
        durationNote: null,
        keyIngredients: [],
        speechTranscript: null,
        message: 'Video này chưa có dữ liệu tóm tắt AI',
      };
    }

    const ingredientsList = Array.isArray(video.ingredients) ? video.ingredients : [];
    return {
      hasSummary: true,
      durationNote: video.duration ? `Thời lượng video: ${video.duration}` : 'Không có thông tin thời lượng',
      keyIngredients: ingredientsList
        .map((i: any) => (typeof i === 'string' ? i : `${i.name || ''}${i.amount ? ` (${i.amount})` : ''}`))
        .filter(Boolean),
      speechTranscript: video.transcript_summary,
    };
  }

  // ==========================================
  // Helper methods
  // ==========================================

  /** Kiểm tra video tồn tại và đã duyệt */
  private async assertApprovedVideo(videoId: number) {
    const exists = await this.videoRepo.exist({
      where: { video_id: videoId, status: ContentStatus.APPROVED },
    });
    if (!exists) {
      throw new NotFoundException({
        code: ErrorCode.VIDEO_NOT_FOUND,
        message: `Không tìm thấy video #${videoId}`,
      });
    }
  }

  /** Truy vấn cơ sở: CHỈ lấy video đã được duyệt (approved) */
  private baseVideoQuery(extraColumns: string[] = []) {
    return this.videoRepo
      .createQueryBuilder('video')
      .leftJoin('video.user', 'user')
      .leftJoin('video.category', 'category')
      .select([...VIDEO_COLUMNS, ...extraColumns])
      .where('video.status = :status', { status: ContentStatus.APPROVED });
  }

  /** Phân trang: limit tối đa 50, mặc định defaultLimit, page >= 1 */
  private normalizePaging(page: number | undefined, limit: number | undefined, defaultLimit: number) {
    return {
      page: Math.max(1, Number(page) || 1),
      limit: Math.min(50, Math.max(1, Number(limit) || defaultLimit)),
    };
  }

  /** Tính rating và comment count gộp cho nhiều video */
  private async loadStats(ids: number[]): Promise<{ ratingMap: StatMap; commentMap: StatMap }> {
    const ratingMap: StatMap = new Map();
    const commentMap: StatMap = new Map();
    if (ids.length === 0) return { ratingMap, commentMap };

    // Rating
    const votes = await this.voteRepo
      .createQueryBuilder('v')
      .select('v.content_id', 'content_id')
      .addSelect(
        `COALESCE(SUM(CASE WHEN v.vote_type = 'up' THEN 1 WHEN v.vote_type = 'down' THEN -1 ELSE 0 END), 0)`,
        'rating',
      )
      .where('v.content_type = :type', { type: 'video' })
      .andWhere('v.content_id IN (:...ids)', { ids })
      .groupBy('v.content_id')
      .getRawMany();
    votes.forEach((r) => ratingMap.set(Number(r.content_id), Number(r.rating)));

    // Comments count
    const comments = await this.commentRepo
      .createQueryBuilder('c')
      .select('c.content_id', 'content_id')
      .addSelect('COUNT(*)', 'total')
      .where('c.content_type = :type', { type: 'video' })
      .andWhere('c.content_id IN (:...ids)', { ids })
      .andWhere('(c.moderation_status IS NULL OR c.moderation_status NOT IN (:...hidden))', {
        hidden: HIDDEN_COMMENT_STATUSES,
      })
      .groupBy('c.content_id')
      .getRawMany();
    comments.forEach((r) => commentMap.set(Number(r.content_id), Number(r.total)));

    return { ratingMap, commentMap };
  }

  /** Lấy danh sách bình luận đã duyệt của video */
  private async loadVideoComments(videoId: number) {
    const rows = await this.commentRepo
      .createQueryBuilder('c')
      .leftJoin('c.user', 'user')
      .select(COMMENT_COLUMNS)
      .where('c.content_type = :type', { type: 'video' })
      .andWhere('c.content_id = :videoId', { videoId })
      .andWhere('(c.moderation_status IS NULL OR c.moderation_status NOT IN (:...hidden))', {
        hidden: HIDDEN_COMMENT_STATUSES,
      })
      .orderBy('c.created_at', 'ASC')
      .addOrderBy('c.comment_id', 'ASC')
      .getMany();

    const voteMap = await this.loadCommentVoteStats(rows.map((r) => r.comment_id));
    return rows.map((c) => this.toCommentView(c, voteMap.get(c.comment_id) ?? 0));
  }

  /** Tính điểm vote cho danh sách comments */
  private async loadCommentVoteStats(commentIds: number[]): Promise<Map<number, number>> {
    const map = new Map<number, number>();
    if (commentIds.length === 0) return map;

    const votes = await this.voteRepo
      .createQueryBuilder('v')
      .select('v.content_id', 'content_id')
      .addSelect(
        `COALESCE(SUM(CASE WHEN v.vote_type = 'up' THEN 1 WHEN v.vote_type = 'down' THEN -1 ELSE 0 END), 0)`,
        'score',
      )
      .where('v.content_type = :type', { type: 'comment' })
      .andWhere('v.content_id IN (:...ids)', { ids: commentIds })
      .groupBy('v.content_id')
      .getRawMany();

    votes.forEach((r) => map.set(Number(r.content_id), Number(r.score)));
    return map;
  }

  /**
   * Ánh xạ DUY NHẤT một đối tượng Video thành VideoRecipe theo hợp đồng FE.
   * Tất cả tên trường trả ra cho FE được quy định tại đây.
   */
  private toVideoView(
    video: Video,
    ratingMap: StatMap,
    commentMap: StatMap,
    comments: any[] = [],
  ) {
    const ratingScore = ratingMap.get(video.video_id) ?? 0;
    const commentCount = commentMap.get(video.video_id) ?? 0;

    const viewsCount = video.views ?? 0;
    const viewsDisplay =
      viewsCount >= 1000000
        ? `${(viewsCount / 1000000).toFixed(1).replace(/\.0$/, '')}M views`
        : viewsCount >= 1000
          ? `${(viewsCount / 1000).toFixed(1).replace(/\.0$/, '')}K views`
          : `${viewsCount} views`;

    const authorName = video.user?.full_name || 'Tác giả';
    const authorInitials =
      authorName
        .split(/\s+/)
        .map((w) => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 3) || 'U';

    const authorHandle = `@${authorName
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '')}`;

    const isVerified = video.user?.role?.toLowerCase() === 'admin';

    let difficulty: 'Easy' | 'Medium' | 'Advanced' = 'Easy';
    if (video.difficulty) {
      const diff = video.difficulty.toLowerCase();
      if (diff === 'medium' || diff === 'trung bình') difficulty = 'Medium';
      else if (diff === 'hard' || diff === 'khó' || diff === 'advanced') difficulty = 'Advanced';
      else difficulty = 'Easy';
    }

    const ingredientsList = Array.isArray(video.ingredients) ? video.ingredients : [];

    const aiSummary = video.transcript_summary
      ? {
          durationNote: video.duration ? `Thời lượng: ${video.duration}` : 'Không có thông tin thời lượng',
          keyIngredients: ingredientsList
            .map((i: any) =>
              typeof i === 'string' ? i : `${i.name || ''}${i.amount ? ` (${i.amount})` : ''}`,
            )
            .filter(Boolean),
          speechTranscript: video.transcript_summary,
        }
      : {
          durationNote: 'Chưa có tóm tắt AI',
          keyIngredients: [],
          speechTranscript: 'Video này chưa có bản tóm tắt giọng nói AI.',
        };

    return {
      id: String(video.video_id),
      title: video.title,
      duration: video.duration || '0:00',
      author: authorName,
      authorHandle,
      authorInitials,
      verified: isVerified,
      views: viewsDisplay,
      rating: ratingScore,
      reviewsCount: String(commentCount),
      kcal: video.kcal ?? 0,
      time: video.duration || '20 min',
      difficulty,
      cuisine: video.cuisine || 'Món chay',
      category: video.category?.category_name || '',
      image: video.thumbnail_url || undefined,
      description: video.description || '',
      ingredients: ingredientsList,
      steps: Array.isArray(video.steps) ? video.steps : [],
      aiSummary,
      comments,
    };
  }

  /**
   * Ánh xạ DUY NHẤT một đối tượng Comment thành CommentItem theo hợp đồng FE.
   */
  private toCommentView(
    c: Comment,
    votes = 0,
    userVoted: 'up' | 'down' | null = null,
  ) {
    const authorName = c.user?.full_name || 'Người dùng';
    const authorInitials =
      authorName
        .split(/\s+/)
        .map((w) => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 3) || 'U';

    return {
      id: String(c.comment_id),
      author: authorName,
      authorInitials,
      verified: c.user?.role?.toLowerCase() === 'admin',
      content: c.comment_text,
      timestamp: c.created_at ? new Date(c.created_at).toISOString() : '',
      votes,
      userVoted,
    };
  }
}
