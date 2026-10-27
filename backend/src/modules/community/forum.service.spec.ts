import { BadRequestException, ConflictException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ForumService, FORUM_CATEGORY_TYPE } from './forum.service';
import { Blog, ContentStatus } from './entities/blog.entity';
import { Comment } from './entities/comment.entity';
import { Vote } from './entities/vote.entity';
import { Category, CategoryStatus } from '../category/entities/category.entity';
import { NonVegetarianDetectorService } from '../../common/services/non-vegetarian-detector.service';
import { AuthUser } from '../../common/decorators/current-user.decorator';

describe('ForumService (Stage 1 & Stage 2)', () => {
  let service: ForumService;
  let blogRepo: any;
  let categoryRepo: any;
  let voteRepo: any;
  let commentRepo: any;
  let detector: NonVegetarianDetectorService;

  const normalUser: AuthUser = {
    user_id: 1,
    email: 'user@example.com',
    role: 'user',
    sid: 'sess-1',
  };

  const otherUser: AuthUser = {
    user_id: 2,
    email: 'other@example.com',
    role: 'user',
    sid: 'sess-2',
  };

  const adminUser: AuthUser = {
    user_id: 99,
    email: 'admin@example.com',
    role: 'admin',
    sid: 'sess-admin',
  };

  beforeEach(async () => {
    blogRepo = {
      createQueryBuilder: jest.fn(),
      increment: jest.fn().mockResolvedValue({ affected: 1 }),
      exist: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn().mockImplementation((val) => Promise.resolve({ ...val, blog_id: val.blog_id || 10, created_at: new Date() })),
      create: jest.fn().mockImplementation((val) => val),
    };
    categoryRepo = {
      findOne: jest.fn(),
      find: jest.fn(),
    };
    voteRepo = {
      createQueryBuilder: jest.fn(),
      findOne: jest.fn(),
      insert: jest.fn().mockResolvedValue({ identifiers: [{ vote_id: 501 }] }),
      save: jest.fn().mockImplementation((val) => Promise.resolve(val)),
      delete: jest.fn().mockResolvedValue({ affected: 1 }),
    };
    commentRepo = {
      createQueryBuilder: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn().mockImplementation((val) => val),
      save: jest.fn().mockImplementation((val) => Promise.resolve({ ...val, comment_id: val.comment_id || 201, created_at: new Date() })),
    };
    detector = new NonVegetarianDetectorService();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ForumService,
        { provide: getRepositoryToken(Blog), useValue: blogRepo },
        { provide: getRepositoryToken(Category), useValue: categoryRepo },
        { provide: getRepositoryToken(Vote), useValue: voteRepo },
        { provide: getRepositoryToken(Comment), useValue: commentRepo },
        { provide: NonVegetarianDetectorService, useValue: detector },
      ],
    }).compile();

    service = module.get<ForumService>(ForumService);
  });

  // =========================================================================
  // GIAI ĐOẠN 1
  // =========================================================================
  describe('Stage 1: createPost & createComment', () => {
    it('gắn cờ is_flagged = true và status = pending_review khi bài chứa "thịt heo"', async () => {
      const res = await service.createPost(normalUser, {
        title: 'Hỏi về cách nấu canh thịt heo',
        content: 'Nội dung bài viết về nấu ăn này có nhắc đến thịt heo...',
        tags: ['món mặn', 'thịt heo'],
      });

      expect(res.is_flagged).toBe(true);
      expect(res.status).toBe(ContentStatus.PENDING_REVIEW);
      expect(blogRepo.create).toHaveBeenCalledWith(
        expect.objectContaining({
          is_flagged: true,
          flag_reason: expect.stringContaining('thịt'),
          status: ContentStatus.PENDING_REVIEW,
        }),
      );
    });

    it('không bị gắn cờ khi bài dùng "thịt chay"', async () => {
      const res = await service.createPost(normalUser, {
        title: 'Món thịt chay kho tiêu ngon',
        content: 'Công thức làm món thịt chay thơm ngon bổ dưỡng cho người ăn chay.',
        tags: ['thịt chay'],
      });

      expect(res.is_flagged).toBe(false);
      expect(res.status).toBe(ContentStatus.PENDING_REVIEW);
      expect(blogRepo.create).toHaveBeenCalledWith(
        expect.objectContaining({
          is_flagged: false,
          flag_reason: null,
          status: ContentStatus.PENDING_REVIEW,
        }),
      );
    });

    it('admin đăng bài sạch thì được duyệt luôn (status = approved)', async () => {
      const res = await service.createPost(adminUser, {
        title: 'Quy định diễn đàn ăn chay lành mạnh',
        content: 'Chào mừng các bạn đến với diễn đàn ăn chay!',
        tags: ['nội quy'],
      });

      expect(res.is_flagged).toBe(false);
      expect(res.status).toBe(ContentStatus.APPROVED);
      expect(blogRepo.create).toHaveBeenCalledWith(
        expect.objectContaining({
          is_flagged: false,
          status: ContentStatus.APPROVED,
          approved_by: adminUser.user_id,
        }),
      );
    });

    it('admin đăng bài bị gắn cờ vẫn ở trạng thái chờ duyệt (status = pending_review)', async () => {
      const res = await service.createPost(adminUser, {
        title: 'Bài viết có nhắc đến cá hồi tươi',
        content: 'Bài viết này thử nghiệm nhắc đến cá hồi tươi sống.',
      });

      expect(res.is_flagged).toBe(true);
      expect(res.status).toBe(ContentStatus.PENDING_REVIEW);
      expect(blogRepo.create).toHaveBeenCalledWith(
        expect.objectContaining({
          is_flagged: true,
          status: ContentStatus.PENDING_REVIEW,
        }),
      );
    });

    it('thêm comment vào bài đã duyệt thành công với moderation_status = approved', async () => {
      blogRepo.exist.mockResolvedValue(true);
      const qbMock: any = {
        leftJoin: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue({
          comment_id: 201,
          comment_text: 'Bình luận tuyệt vời!',
          created_at: new Date(),
          user: { user_id: 1, full_name: 'Nguyen Van A' },
        }),
      };
      commentRepo.createQueryBuilder.mockReturnValue(qbMock);

      const res = await service.createComment(normalUser, 10, {
        content: 'Bình luận tuyệt vời!',
      });

      expect(res.comment_id).toBe(201);
      expect(res.content).toBe('Bình luận tuyệt vời!');
    });

    it('báo lỗi 404 khi comment vào bài chưa duyệt hoặc không tồn tại', async () => {
      blogRepo.exist.mockResolvedValue(false);

      await expect(
        service.createComment(normalUser, 999, { content: 'Test' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  // =========================================================================
  // GIAI ĐOẠN 2: UPDATE, DELETE, VOTE BÀI, XÓA COMMENT, BÀI CỦA TÔI
  // =========================================================================
  describe('Stage 2: updatePost', () => {
    const existingPost: Partial<Blog> = {
      blog_id: 10,
      user_id: 1,
      title: 'Tiêu đề cũ',
      content: 'Nội dung cũ dài hơn 10 ký tự',
      tags: ['cu'],
      status: ContentStatus.APPROVED,
      is_flagged: false,
      flag_reason: null,
      reject_reason: null,
      views: 50,
    };

    it('người không phải chủ bài và không phải admin nhận 403 Forbidden', async () => {
      blogRepo.findOne.mockResolvedValue({ ...existingPost });

      await expect(
        service.updatePost(otherUser, 10, { title: 'Sửa trộm bài' }),
      ).rejects.toThrow(ForbiddenException);
    });

    it('bài không tồn tại hoặc đã bị xóa trả 404 NotFound', async () => {
      blogRepo.findOne.mockResolvedValue(null);

      await expect(
        service.updatePost(normalUser, 999, { title: 'Sửa bài không có' }),
      ).rejects.toThrow(NotFoundException);

      blogRepo.findOne.mockResolvedValue({ ...existingPost, status: ContentStatus.REMOVED });
      await expect(
        service.updatePost(normalUser, 10, { title: 'Sửa bài đã xóa' }),
      ).rejects.toThrow(NotFoundException);
    });

    it('thành viên sửa bài đã duyệt thì quay về pending_review và quét lại từ khóa mặn', async () => {
      blogRepo.findOne.mockResolvedValue({ ...existingPost, user_id: normalUser.user_id });
      // Giả lập loadStats
      const voteQbMock: any = {
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue([]),
      };
      voteRepo.createQueryBuilder.mockReturnValue(voteQbMock);
      const cmtQbMock: any = {
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue([]),
      };
      commentRepo.createQueryBuilder.mockReturnValue(cmtQbMock);

      const res = await service.updatePost(normalUser, 10, {
        title: 'Tiêu đề mới sạch',
        content: 'Nội dung mới hoàn toàn sạch rau củ quả nấm đậu phụ thơm ngon',
      });

      expect(blogRepo.save).toHaveBeenCalledWith(
        expect.objectContaining({
          status: ContentStatus.PENDING_REVIEW,
          is_flagged: false,
          approved_at: null,
          approved_by: null,
        }),
      );
    });

    it('thành viên sửa bài chứa "thịt heo" thì bị gắn cờ is_flagged = true', async () => {
      blogRepo.findOne.mockResolvedValue({ ...existingPost, user_id: normalUser.user_id });
      voteRepo.createQueryBuilder.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue([]),
      });
      commentRepo.createQueryBuilder.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue([]),
      });

      await service.updatePost(normalUser, 10, {
        content: 'Nội dung này có thịt heo ở đây',
      });

      expect(blogRepo.save).toHaveBeenCalledWith(
        expect.objectContaining({
          status: ContentStatus.PENDING_REVIEW,
          is_flagged: true,
          flag_reason: expect.stringContaining('thịt'),
        }),
      );
    });

    it('bài bị từ chối được sửa thì xóa reject_reason cũ', async () => {
      blogRepo.findOne.mockResolvedValue({
        ...existingPost,
        user_id: normalUser.user_id,
        status: ContentStatus.REJECTED,
        reject_reason: 'Nội dung sơ sài',
      });
      voteRepo.createQueryBuilder.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue([]),
      });
      commentRepo.createQueryBuilder.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue([]),
      });

      await service.updatePost(normalUser, 10, {
        content: 'Bổ sung nội dung chi tiết và đầy đủ cho người ăn chay',
      });

      expect(blogRepo.save).toHaveBeenCalledWith(
        expect.objectContaining({
          status: ContentStatus.PENDING_REVIEW,
          reject_reason: null,
        }),
      );
    });

    it('admin sửa bài sạch thì giữ nguyên trạng thái cũ', async () => {
      blogRepo.findOne.mockResolvedValue({
        ...existingPost,
        user_id: 1, // bài của user
        status: ContentStatus.APPROVED,
      });
      voteRepo.createQueryBuilder.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue([]),
      });
      commentRepo.createQueryBuilder.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue([]),
      });

      await service.updatePost(adminUser, 10, {
        title: 'Admin chỉnh sửa chính tả tiêu đề',
      });

      expect(blogRepo.save).toHaveBeenCalledWith(
        expect.objectContaining({
          status: ContentStatus.APPROVED,
        }),
      );
    });
  });

  describe('Stage 2: deletePost', () => {
    it('người không phải chủ bài và không phải admin nhận 403 Forbidden', async () => {
      blogRepo.findOne.mockResolvedValue({ blog_id: 10, user_id: 1, status: ContentStatus.APPROVED });

      await expect(service.deletePost(otherUser, 10)).rejects.toThrow(ForbiddenException);
    });

    it('bài không tồn tại hoặc đã xóa trả 404 NotFound', async () => {
      blogRepo.findOne.mockResolvedValue(null);
      await expect(service.deletePost(normalUser, 999)).rejects.toThrow(NotFoundException);

      blogRepo.findOne.mockResolvedValue({ blog_id: 10, user_id: 1, status: ContentStatus.REMOVED });
      await expect(service.deletePost(normalUser, 10)).rejects.toThrow(NotFoundException);
    });

    it('chủ bài hoặc admin xóa mềm bài viết thành công (status = removed)', async () => {
      const post = { blog_id: 10, user_id: 1, status: ContentStatus.APPROVED };
      blogRepo.findOne.mockResolvedValue(post);

      const res = await service.deletePost(normalUser, 10);
      expect(res.success).toBe(true);
      expect(blogRepo.save).toHaveBeenCalledWith(
        expect.objectContaining({ status: ContentStatus.REMOVED }),
      );
    });
  });

  describe('Stage 2: votePost', () => {
    const approvedPost = { blog_id: 10, user_id: 1, status: ContentStatus.APPROVED };

    it('không cho tự vote bài của chính mình (400)', async () => {
      blogRepo.findOne.mockResolvedValue(approvedPost);

      await expect(
        service.votePost(normalUser, 10, { vote: 'up' }),
      ).rejects.toThrow(BadRequestException);
    });

    it('bài chưa duyệt hoặc không tồn tại trả 404', async () => {
      blogRepo.findOne.mockResolvedValue(null);

      await expect(
        service.votePost(otherUser, 999, { vote: 'up' }),
      ).rejects.toThrow(NotFoundException);
    });

    it('vote lần đầu tạo vote mới và trả rating mới', async () => {
      blogRepo.findOne.mockResolvedValue(approvedPost);
      voteRepo.findOne.mockResolvedValue(null);
      voteRepo.createQueryBuilder.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getRawOne: jest.fn().mockResolvedValue({ rating: '1' }),
      });

      const res = await service.votePost(otherUser, 10, { vote: 'up' });
      expect(voteRepo.insert).toHaveBeenCalledWith({
        user_id: otherUser.user_id,
        content_type: 'blog',
        content_id: 10,
        vote_type: 'up',
      });
      expect(res.rating).toBe(1);
      expect(res.my_vote).toBe('up');
    });

    it('vote lại cùng giá trị thì hủy vote (xóa dòng vote)', async () => {
      blogRepo.findOne.mockResolvedValue(approvedPost);
      voteRepo.findOne.mockResolvedValue({ vote_id: 501, vote_type: 'up' });
      voteRepo.createQueryBuilder.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getRawOne: jest.fn().mockResolvedValue({ rating: '0' }),
      });

      const res = await service.votePost(otherUser, 10, { vote: 'up' });
      expect(voteRepo.delete).toHaveBeenCalledWith({ vote_id: 501 });
      expect(res.rating).toBe(0);
      expect(res.my_vote).toBeNull();
    });

    it('vote đổi chiều thì cập nhật vote', async () => {
      blogRepo.findOne.mockResolvedValue(approvedPost);
      const existingVote = { vote_id: 501, vote_type: 'up' };
      voteRepo.findOne.mockResolvedValue(existingVote);
      voteRepo.createQueryBuilder.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getRawOne: jest.fn().mockResolvedValue({ rating: '-1' }),
      });

      const res = await service.votePost(otherUser, 10, { vote: 'down' });
      expect(voteRepo.save).toHaveBeenCalledWith(
        expect.objectContaining({ vote_type: 'down' }),
      );
      expect(res.my_vote).toBe('down');
    });

    it('gửi vote = null thì hủy vote', async () => {
      blogRepo.findOne.mockResolvedValue(approvedPost);
      voteRepo.createQueryBuilder.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getRawOne: jest.fn().mockResolvedValue({ rating: '0' }),
      });

      const res = await service.votePost(otherUser, 10, { vote: null });
      expect(voteRepo.delete).toHaveBeenCalledWith({
        user_id: otherUser.user_id,
        content_type: 'blog',
        content_id: 10,
      });
      expect(res.my_vote).toBeNull();
    });
  });

  describe('Stage 2: deleteComment', () => {
    it('người không phải chủ comment và không phải admin nhận 403 Forbidden', async () => {
      blogRepo.findOne.mockResolvedValue({ blog_id: 10, status: ContentStatus.APPROVED });
      commentRepo.findOne.mockResolvedValue({
        comment_id: 201,
        user_id: 1, // chủ là user 1
        content_type: 'blog',
        content_id: 10,
        moderation_status: 'approved',
      });

      await expect(
        service.deleteComment(otherUser, 10, 201), // otherUser là user 2
      ).rejects.toThrow(ForbiddenException);
    });

    it('comment thuộc sai bài hoặc không tìm thấy trả 404', async () => {
      blogRepo.findOne.mockResolvedValue({ blog_id: 10, status: ContentStatus.APPROVED });
      commentRepo.findOne.mockResolvedValue(null);

      await expect(
        service.deleteComment(normalUser, 10, 999),
      ).rejects.toThrow(NotFoundException);
    });

    it('chủ comment hoặc admin xóa mềm comment thành công (moderation_status = removed)', async () => {
      blogRepo.findOne.mockResolvedValue({ blog_id: 10, status: ContentStatus.APPROVED });
      const comment = {
        comment_id: 201,
        user_id: 1,
        content_type: 'blog',
        content_id: 10,
        moderation_status: 'approved',
      };
      commentRepo.findOne.mockResolvedValue(comment);

      const res = await service.deleteComment(normalUser, 10, 201);
      expect(res.success).toBe(true);
      expect(commentRepo.save).toHaveBeenCalledWith(
        expect.objectContaining({ moderation_status: 'removed' }),
      );
    });
  });

  describe('Stage 2: listMyPosts', () => {
    it('trả danh sách bài của tôi kèm status, reject_reason, không gồm removed', async () => {
      const qbMock: any = {
        leftJoin: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        addOrderBy: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        getManyAndCount: jest.fn().mockResolvedValue([
          [
            {
              blog_id: 10,
              user_id: normalUser.user_id,
              title: 'Bài đang chờ duyệt',
              content: 'Nội dung bài viết...',
              status: ContentStatus.PENDING_REVIEW,
              reject_reason: null,
              is_flagged: false,
              tags: ['monchay'],
              views: 0,
              created_at: new Date(),
            },
            {
              blog_id: 11,
              user_id: normalUser.user_id,
              title: 'Bài bị từ chối',
              content: 'Nội dung bài viết 2...',
              status: ContentStatus.REJECTED,
              reject_reason: 'Tiêu đề không phù hợp',
              is_flagged: false,
              tags: ['monchay'],
              views: 0,
              created_at: new Date(),
            },
          ],
          2,
        ]),
      };
      blogRepo.createQueryBuilder.mockReturnValue(qbMock);

      voteRepo.createQueryBuilder.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue([]),
      });
      commentRepo.createQueryBuilder.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue([]),
      });

      const res = await service.listMyPosts(normalUser, { page: 1, limit: 10 });
      expect(res.data.length).toBe(2);
      expect(res.data[0].status).toBe(ContentStatus.PENDING_REVIEW);
      expect(res.data[1].status).toBe(ContentStatus.REJECTED);
      expect(res.data[1].reject_reason).toBe('Tiêu đề không phù hợp');
    });
  });

  // =========================================================================
  // GIAI ĐOẠN 3: VOTE COMMENT, KIỂM DUYỆT ADMIN, NỘI DUNG ADMIN, TRENDING
  // =========================================================================
  describe('Stage 3: voteComment', () => {
    it('vote comment vào bài không tồn tại hoặc chưa duyệt trả 404', async () => {
      blogRepo.exist.mockResolvedValue(false);

      await expect(
        service.voteComment(normalUser, 999, 101, { vote: 'up' }),
      ).rejects.toThrow(NotFoundException);
    });

    it('vote comment không tồn tại hoặc thuộc sai bài trả 404', async () => {
      blogRepo.exist.mockResolvedValue(true);
      commentRepo.findOne.mockResolvedValue(null);

      await expect(
        service.voteComment(normalUser, 10, 999, { vote: 'up' }),
      ).rejects.toThrow(NotFoundException);
    });

    it('không cho tự vote comment của chính mình (400)', async () => {
      blogRepo.exist.mockResolvedValue(true);
      commentRepo.findOne.mockResolvedValue({
        comment_id: 101,
        user_id: normalUser.user_id,
        content_type: 'blog',
        content_id: 10,
        moderation_status: 'approved',
      });

      await expect(
        service.voteComment(normalUser, 10, 101, { vote: 'up' }),
      ).rejects.toThrow(BadRequestException);
    });

    it('vote comment lần đầu tạo mới, gửi lại cùng giá trị thì hủy vote', async () => {
      blogRepo.exist.mockResolvedValue(true);
      commentRepo.findOne.mockResolvedValue({
        comment_id: 101,
        user_id: otherUser.user_id, // comment của user khác
        content_type: 'blog',
        content_id: 10,
        moderation_status: 'approved',
      });
      voteRepo.findOne.mockResolvedValue(null);
      voteRepo.createQueryBuilder.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getRawOne: jest.fn().mockResolvedValue({ rating: '1' }),
      });

      const res = await service.voteComment(normalUser, 10, 101, { vote: 'up' });
      expect(voteRepo.insert).toHaveBeenCalledWith({
        user_id: normalUser.user_id,
        content_type: 'comment',
        content_id: 101,
        vote_type: 'up',
      });
      expect(res.rating).toBe(1);
      expect(res.my_vote).toBe('up');

      // Hủy vote
      voteRepo.findOne.mockResolvedValue({ vote_id: 701, vote_type: 'up' });
      voteRepo.createQueryBuilder.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getRawOne: jest.fn().mockResolvedValue({ rating: '0' }),
      });

      const cancelRes = await service.voteComment(normalUser, 10, 101, { vote: 'up' });
      expect(voteRepo.delete).toHaveBeenCalledWith({ vote_id: 701 });
      expect(cancelRes.rating).toBe(0);
      expect(cancelRes.my_vote).toBeNull();
    });
  });

  describe('Stage 3: getModerationQueue', () => {
    it('người không phải admin gọi hàng chờ duyệt nhận 403 Forbidden', async () => {
      await expect(
        service.getModerationQueue(normalUser, { page: 1, limit: 10 }),
      ).rejects.toThrow(ForbiddenException);
    });

    it('admin lấy hàng chờ duyệt thành công, bài bị gắn cờ lên đầu', async () => {
      const qbMock: any = {
        leftJoin: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        addOrderBy: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        getManyAndCount: jest.fn().mockResolvedValue([
          [
            {
              blog_id: 1,
              title: 'Bài bị cờ',
              content: 'Nội dung chứa từ khóa',
              is_flagged: true,
              flag_reason: 'thịt',
              status: ContentStatus.PENDING_REVIEW,
              created_at: new Date(),
            },
            {
              blog_id: 2,
              title: 'Bài thường',
              content: 'Nội dung bình thường',
              is_flagged: false,
              flag_reason: null,
              status: ContentStatus.PENDING_REVIEW,
              created_at: new Date(),
            },
          ],
          2,
        ]),
      };
      blogRepo.createQueryBuilder.mockReturnValue(qbMock);

      voteRepo.createQueryBuilder.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue([]),
      });
      commentRepo.createQueryBuilder.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue([]),
      });

      const res = await service.getModerationQueue(adminUser, { page: 1, limit: 10 });
      expect(qbMock.orderBy).toHaveBeenCalledWith('blog.is_flagged', 'DESC');
      expect(res.data.length).toBe(2);
      expect(res.data[0].is_flagged).toBe(true);
    });
  });

  describe('Stage 3: moderatePost', () => {
    it('người không phải admin duyệt/từ chối bài nhận 403 Forbidden', async () => {
      await expect(
        service.moderatePost(normalUser, 10, { action: 'approve' }),
      ).rejects.toThrow(ForbiddenException);
    });

    it('bài không tồn tại trả 404', async () => {
      blogRepo.findOne.mockResolvedValue(null);
      await expect(
        service.moderatePost(adminUser, 999, { action: 'approve' }),
      ).rejects.toThrow(NotFoundException);
    });

    it('bài không ở trạng thái pending_review trả 409 Conflict', async () => {
      blogRepo.findOne.mockResolvedValue({ blog_id: 10, status: ContentStatus.APPROVED });

      await expect(
        service.moderatePost(adminUser, 10, { action: 'approve' }),
      ).rejects.toThrow(ConflictException);
    });

    it('từ chối không có lý do hoặc < 5 ký tự trả 400 BadRequest', async () => {
      blogRepo.findOne.mockResolvedValue({ blog_id: 10, status: ContentStatus.PENDING_REVIEW });

      await expect(
        service.moderatePost(adminUser, 10, { action: 'reject', reason: '' }),
      ).rejects.toThrow(BadRequestException);

      await expect(
        service.moderatePost(adminUser, 10, { action: 'reject', reason: 'abc' }),
      ).rejects.toThrow(BadRequestException);
    });

    it('admin duyệt bài thành công: status = approved, ghi nhận approved_by và reviewed_by', async () => {
      const post = { blog_id: 10, status: ContentStatus.PENDING_REVIEW };
      blogRepo.findOne.mockResolvedValue(post);

      const res = await service.moderatePost(adminUser, 10, { action: 'approve' });
      expect(res.success).toBe(true);
      expect(res.status).toBe(ContentStatus.APPROVED);
      expect(blogRepo.save).toHaveBeenCalledWith(
        expect.objectContaining({
          status: ContentStatus.APPROVED,
          approved_by: adminUser.user_id,
          reviewed_by: adminUser.user_id,
        }),
      );
    });

    it('admin từ chối bài thành công: status = rejected, lưu reject_reason', async () => {
      const post = { blog_id: 10, status: ContentStatus.PENDING_REVIEW };
      blogRepo.findOne.mockResolvedValue(post);

      const res = await service.moderatePost(adminUser, 10, {
        action: 'reject',
        reason: 'Bài viết không phù hợp nội quy diễn đàn',
      });
      expect(res.success).toBe(true);
      expect(res.status).toBe(ContentStatus.REJECTED);
      expect(blogRepo.save).toHaveBeenCalledWith(
        expect.objectContaining({
          status: ContentStatus.REJECTED,
          reject_reason: 'Bài viết không phù hợp nội quy diễn đàn',
          reviewed_by: adminUser.user_id,
        }),
      );
    });
  });

  describe('Stage 3: getAdminContentList', () => {
    it('người không phải admin nhận 403 Forbidden', async () => {
      await expect(
        service.getAdminContentList(normalUser, { type: 'blog' }),
      ).rejects.toThrow(ForbiddenException);
    });

    it('loại nội dung khác blog trả lỗi 400 rõ ràng là chưa hỗ trợ', async () => {
      await expect(
        service.getAdminContentList(adminUser, { type: 'video' }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('Stage 3: updateContentStatus', () => {
    it('người không phải admin nhận 403 Forbidden', async () => {
      await expect(
        service.updateContentStatus(normalUser, 10, { status: ContentStatus.APPROVED }),
      ).rejects.toThrow(ForbiddenException);
    });

    it('chuyển trạng thái không hợp lệ nhận 409 Conflict', async () => {
      // draft sang removed không nằm trong danh sách chuyển hợp lệ
      blogRepo.findOne.mockResolvedValue({ blog_id: 10, status: ContentStatus.DRAFT });

      await expect(
        service.updateContentStatus(adminUser, 10, { status: ContentStatus.REMOVED }),
      ).rejects.toThrow(ConflictException);
    });

    it('gỡ bài (approved -> removed) không có lý do trả 400 BadRequest', async () => {
      blogRepo.findOne.mockResolvedValue({ blog_id: 10, status: ContentStatus.APPROVED });

      await expect(
        service.updateContentStatus(adminUser, 10, { status: ContentStatus.REMOVED }),
      ).rejects.toThrow(BadRequestException);
    });

    it('gỡ bài thành công (approved -> removed) có lý do hợp lệ', async () => {
      blogRepo.findOne.mockResolvedValue({ blog_id: 10, status: ContentStatus.APPROVED });

      const res = await service.updateContentStatus(adminUser, 10, {
        status: ContentStatus.REMOVED,
        reason: 'Nội dung bị người dùng báo cáo nhiều lần',
      });
      expect(res.success).toBe(true);
      expect(res.status).toBe(ContentStatus.REMOVED);
      expect(blogRepo.save).toHaveBeenCalledWith(
        expect.objectContaining({
          status: ContentStatus.REMOVED,
          reject_reason: 'Nội dung bị người dùng báo cáo nhiều lần',
          reviewed_by: adminUser.user_id,
        }),
      );
    });

    it('khôi phục bài đã gỡ (removed -> approved) thành công', async () => {
      blogRepo.findOne.mockResolvedValue({
        blog_id: 10,
        status: ContentStatus.REMOVED,
        reject_reason: 'Lý do cũ',
      });

      const res = await service.updateContentStatus(adminUser, 10, {
        status: ContentStatus.APPROVED,
      });
      expect(res.success).toBe(true);
      expect(res.status).toBe(ContentStatus.APPROVED);
      expect(blogRepo.save).toHaveBeenCalledWith(
        expect.objectContaining({
          status: ContentStatus.APPROVED,
          reject_reason: null,
          approved_by: adminUser.user_id,
        }),
      );
    });
  });

  describe('Stage 3: getTrendingTopics', () => {
    it('trả danh sách tag nổi bật theo số lượng bài viết giảm dần', async () => {
      blogRepo.query = jest.fn().mockResolvedValue([
        { tag: 'highprotein', posts: 15 },
        { tag: 'vegan', posts: 8 },
      ]);

      const res = await service.getTrendingTopics(10);
      expect(res.length).toBe(2);
      expect(res[0].tag).toBe('#highprotein');
      expect(res[0].posts).toBe(15);
      expect(res[1].tag).toBe('#vegan');
    });
  });
});
