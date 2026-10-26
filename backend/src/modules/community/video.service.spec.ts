import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { VideoService, VIDEO_CATEGORY_TYPE } from './video.service';
import { Video } from './entities/video.entity';
import { ContentStatus } from './entities/blog.entity';
import { Comment } from './entities/comment.entity';
import { Vote } from './entities/vote.entity';
import { Category, CategoryStatus } from '../category/entities/category.entity';
import { ErrorCode } from '../../common/constants/error-codes.enum';
import { AuthUser } from '../../common/decorators/current-user.decorator';
import { NonVegetarianDetectorService } from '../../common/services/non-vegetarian-detector.service';

describe('VideoService', () => {
  let service: VideoService;
  let videoRepo: any;
  let categoryRepo: any;
  let voteRepo: any;
  let commentRepo: any;
  let detector: NonVegetarianDetectorService;

  beforeEach(async () => {
    videoRepo = {
      createQueryBuilder: jest.fn(),
      increment: jest.fn().mockResolvedValue({ affected: 1 }),
      exist: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn().mockImplementation((val) => Promise.resolve({ ...val, video_id: val.video_id || 10 })),
      create: jest.fn().mockImplementation((val) => val),
    };
    categoryRepo = {
      createQueryBuilder: jest.fn(),
      findOne: jest.fn(),
      find: jest.fn(),
    };
    voteRepo = {
      createQueryBuilder: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn().mockImplementation((val) => Promise.resolve(val)),
      create: jest.fn().mockImplementation((val) => val),
      delete: jest.fn().mockResolvedValue({ affected: 1 }),
    };
    commentRepo = {
      createQueryBuilder: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn().mockImplementation((val) => val),
      save: jest.fn().mockImplementation((val) => Promise.resolve({ ...val, comment_id: 101 })),
    };
    detector = new NonVegetarianDetectorService();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VideoService,
        { provide: getRepositoryToken(Video), useValue: videoRepo },
        { provide: getRepositoryToken(Category), useValue: categoryRepo },
        { provide: getRepositoryToken(Vote), useValue: voteRepo },
        { provide: getRepositoryToken(Comment), useValue: commentRepo },
        { provide: NonVegetarianDetectorService, useValue: detector },
      ],
    }).compile();

    service = module.get<VideoService>(VideoService);
  });

  it('nên được khởi tạo thành công', () => {
    expect(service).toBeDefined();
  });

  describe('Giai đoạn 1 & 2', () => {
    it('getVideoDetail ném lỗi NotFoundException với mã VIDEO_NOT_FOUND nếu video không tồn tại', async () => {
      const qb: any = {
        leftJoin: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(null),
      };
      videoRepo.createQueryBuilder.mockReturnValue(qb);

      await expect(service.getVideoDetail(999)).rejects.toThrow(NotFoundException);
    });

    it('listVideoComments ném 404 VIDEO_NOT_FOUND nếu video chưa duyệt', async () => {
      videoRepo.exist.mockResolvedValue(false);
      await expect(service.listVideoComments(123, { page: 1, limit: 10 })).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('Giai đoạn 3: createVideo, updateVideo, deleteVideo, voteComment, aiSummary', () => {
    const normalUser: AuthUser = { user_id: 1, email: 'user@example.com', role: 'authorized', sid: 's1' };
    const adminUser: AuthUser = { user_id: 2, email: 'admin@example.com', role: 'admin', sid: 's2' };
    const otherUser: AuthUser = { user_id: 3, email: 'other@example.com', role: 'authorized', sid: 's3' };

    it('createVideo chặn nguyên liệu "thịt heo" (400 VIDEO_NON_VEGETARIAN_INGREDIENT)', async () => {
      categoryRepo.findOne.mockResolvedValue({ category_id: 1, category_name: 'Món xào' });

      const dto: any = {
        title: 'Món đậu xào',
        category: 'Món xào',
        ingredients: [{ name: 'thịt heo xay', amount: '100g' }],
        steps: ['Xào đều'],
        kcal: 300,
      };

      const dummyFile: any = { path: 'uploads/videos/test.mp4' };
      const dummyThumb: any = { path: 'uploads/thumbnails/test.jpg' };

      await expect(service.createVideo(normalUser, dto, dummyFile, dummyThumb)).rejects.toThrow(
        BadRequestException,
      );
      try {
        await service.createVideo(normalUser, dto, dummyFile, dummyThumb);
      } catch (err: any) {
        expect(err.getResponse().code).toBe(ErrorCode.VIDEO_NON_VEGETARIAN_INGREDIENT);
      }
    });

    it('createVideo cho phép nguyên liệu "thịt chay"', async () => {
      categoryRepo.findOne.mockResolvedValue({ category_id: 1, category_name: 'Món xào' });

      const dto: any = {
        title: 'Món đậu xào thịt chay',
        category: 'Món xào',
        ingredients: [{ name: 'thịt chay', amount: '100g' }],
        steps: ['Xào đều'],
        kcal: 300,
      };

      const dummyFile: any = { path: 'uploads/videos/test.mp4' };
      const dummyThumb: any = { path: 'uploads/thumbnails/test.jpg' };

      const qb: any = {
        leftJoin: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(null),
      };
      videoRepo.createQueryBuilder.mockReturnValue(qb);

      const res = await service.createVideo(normalUser, dto, dummyFile, dummyThumb);
      expect(res).toBeDefined();
      expect(videoRepo.save).toHaveBeenCalled();
    });

    it('updateVideo ném 403 VIDEO_FORBIDDEN nếu người sửa không phải chủ video hoặc admin', async () => {
      videoRepo.findOne.mockResolvedValue({
        video_id: 10,
        user_id: 1, // Chủ là normalUser (id=1)
        status: ContentStatus.APPROVED,
      });

      const dto: any = { title: 'Tiêu đề sửa' };
      await expect(service.updateVideo(otherUser, 10, dto)).rejects.toThrow(ForbiddenException);
      try {
        await service.updateVideo(otherUser, 10, dto);
      } catch (err: any) {
        expect(err.getResponse().code).toBe(ErrorCode.VIDEO_FORBIDDEN);
      }
    });

    it('updateVideo bỏ qua các trường không trong whitelist như status hay views', async () => {
      const existingVideo: any = {
        video_id: 10,
        user_id: 1,
        title: 'Tiêu đề cũ',
        views: 50,
        status: ContentStatus.APPROVED,
      };
      videoRepo.findOne.mockResolvedValue(existingVideo);

      const voteQb: any = {
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue([]),
      };
      voteRepo.createQueryBuilder.mockReturnValue(voteQb);

      const commentQb: any = {
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue([]),
      };
      commentRepo.createQueryBuilder.mockReturnValue(commentQb);

      // Cố tình gửi status và views trong payload
      const maliciousDto: any = {
        title: 'Tiêu đề mới',
        status: 'approved_hacked',
        views: 999999,
      };

      await service.updateVideo(normalUser, 10, maliciousDto);

      expect(existingVideo.views).toBe(50); // Không bị thay đổi thành 999999
      expect(existingVideo.title).toBe('Tiêu đề mới');
    });

    it('deleteVideo ném 403 VIDEO_FORBIDDEN nếu không phải chủ hoặc admin', async () => {
      videoRepo.findOne.mockResolvedValue({
        video_id: 10,
        user_id: 1,
        status: ContentStatus.APPROVED,
      });

      await expect(service.deleteVideo(otherUser, 10)).rejects.toThrow(ForbiddenException);
    });

    it('deleteVideo chuyển trạng thái sang REMOVED (xóa mềm)', async () => {
      const existingVideo: any = {
        video_id: 10,
        user_id: 1,
        status: ContentStatus.APPROVED,
      };
      videoRepo.findOne.mockResolvedValue(existingVideo);

      await service.deleteVideo(normalUser, 10);
      expect(existingVideo.status).toBe(ContentStatus.REMOVED);
      expect(videoRepo.save).toHaveBeenCalledWith(existingVideo);
    });

    it('voteComment chặn tự vote bình luận của chính mình (400 VIDEO_SELF_VOTE_FORBIDDEN)', async () => {
      videoRepo.exist.mockResolvedValue(true);
      commentRepo.findOne.mockResolvedValue({
        comment_id: 5,
        user_id: 1, // Bình luận của normalUser (id=1)
        moderation_status: 'approved',
      });

      await expect(service.voteComment(normalUser, 10, 5, { vote: 'up' })).rejects.toThrow(
        BadRequestException,
      );
      try {
        await service.voteComment(normalUser, 10, 5, { vote: 'up' });
      } catch (err: any) {
        expect(err.getResponse().code).toBe(ErrorCode.VIDEO_SELF_VOTE_FORBIDDEN);
      }
    });

    it('voteComment gửi null sẽ xóa vote hiện tại', async () => {
      videoRepo.exist.mockResolvedValue(true);
      commentRepo.findOne.mockResolvedValue({
        comment_id: 5,
        user_id: 2, // của người khác
        moderation_status: 'approved',
      });
      voteRepo.findOne.mockResolvedValue({ vote_id: 88, vote_type: 'up' });

      const res = await service.voteComment(normalUser, 10, 5, { vote: null });
      expect(voteRepo.delete).toHaveBeenCalledWith({ vote_id: 88 });
      expect(res.success).toBe(true);
    });

    it('getVideoAiSummary trả hasSummary: false nếu chưa có tóm tắt, không dựng dữ liệu giả', async () => {
      videoRepo.findOne.mockResolvedValue({
        video_id: 10,
        status: ContentStatus.APPROVED,
        transcript_summary: null, // Chưa có tóm tắt
      });

      const res = await service.getVideoAiSummary(10);
      expect(res.hasSummary).toBe(false);
      expect(res.speechTranscript).toBeNull();
      expect(res.keyIngredients).toEqual([]);
    });

    it('getVideoAiSummary trả tóm tắt thật khi video có transcript_summary', async () => {
      videoRepo.findOne.mockResolvedValue({
        video_id: 10,
        status: ContentStatus.APPROVED,
        duration: '10:00',
        transcript_summary: 'Bản ghi âm thật từ AI tóm tắt công thức nấu ăn.',
        ingredients: [{ name: 'Đậu hũ', amount: '200g' }],
      });

      const res = await service.getVideoAiSummary(10);
      expect(res.hasSummary).toBe(true);
      expect(res.speechTranscript).toBe('Bản ghi âm thật từ AI tóm tắt công thức nấu ăn.');
      expect(res.keyIngredients).toContain('Đậu hũ (200g)');
    });
  });
});
