import { HttpException, HttpStatus } from '@nestjs/common';
import { PhotoScanService, detectImageMimeType } from './photo-scan.service';
import { stripImageMetadata } from './utils/strip-image-metadata.util';
import { ErrorCode } from '../../common/constants/error-codes.enum';
import { IngredientStatus } from '../ingredient/entities/ingredient.entity';
import { UsageActionType } from '../usage-quota/entities/usage-quota.entity';
import { IngredientSource } from '../user-ingredient/entities/user-ingredient.entity';
import { DietType } from '../users/entities/user.entity';

describe('PhotoScanService', () => {
  let service: PhotoScanService;
  let mockIngredientRepo: any;
  let mockUserRepo: any;
  let mockSubscriptionService: any;
  let mockUsageQuotaService: any;
  let mockUsersService: any;
  let mockUserIngredientService: any;
  let mockNonVegDetector: any;
  let mockDataSource: any;
  let mockScanAiProvider: any;

  beforeEach(() => {
    mockIngredientRepo = {
      find: jest.fn().mockResolvedValue([
        {
          ingredient_id: 1,
          ingredient_name: 'Cà chua',
          unit: 'quả',
          vegan_flag: true,
          status: IngredientStatus.ACTIVE,
        },
        {
          ingredient_id: 2,
          ingredient_name: 'Gạo tẻ (sống)',
          unit: 'g',
          vegan_flag: true,
          status: IngredientStatus.ACTIVE,
        },
        {
          ingredient_id: 3,
          ingredient_name: 'Cơm trắng (đã nấu)',
          unit: 'bát',
          vegan_flag: true,
          status: IngredientStatus.ACTIVE,
        },
        {
          ingredient_id: 4,
          ingredient_name: 'Thịt bò xay',
          unit: 'g',
          vegan_flag: false,
          status: IngredientStatus.ACTIVE,
        },
      ]),
    };

    mockUserRepo = {
      findOne: jest.fn().mockResolvedValue({
        user_id: 1,
        diet_type: DietType.VEGAN,
      }),
    };

    mockSubscriptionService = {
      isPremium: jest.fn().mockResolvedValue(true),
    };

    mockUsageQuotaService = {
      reserveQuota: jest.fn().mockResolvedValue({ remaining: 29, usage_count: 1 }),
      refundQuota: jest.fn().mockResolvedValue(undefined),
    };

    mockUsersService = {
      getAllergies: jest.fn().mockResolvedValue({
        ingredients: [{ ingredient_id: 1, ingredient_name: 'Cà chua' }],
      }),
    };

    mockUserIngredientService = {
      findAllByUser: jest.fn().mockResolvedValue([
        { user_ingredient_id: 10, user_id: 1, ingredient_id: 3 },
      ]),
      create: jest.fn().mockImplementation((userId, dto) =>
        Promise.resolve({ user_ingredient_id: 99, user_id: userId, ...dto }),
      ),
    };

    mockNonVegDetector = {
      checkIngredientName: jest.fn().mockReturnValue({ isClean: true, violations: [] }),
    };

    mockDataSource = {
      transaction: jest.fn().mockImplementation(async (cb) => cb({})),
      getRepository: jest.fn().mockReturnValue({
        findOne: jest.fn().mockResolvedValue({
          usage_count: 5,
          period_start: new Date(),
        }),
      }),
    };

    mockScanAiProvider = {
      providerName: 'mock',
      detectIngredients: jest.fn().mockResolvedValue({
        image_quality: 'good',
        items: [
          { name: 'Cà chua', confidence: 0.95, freshness: 'fresh' },
          { name: 'Gạo tẻ', confidence: 0.9, freshness: 'fresh' },
        ],
      }),
      detectBatchIngredients: jest.fn().mockResolvedValue({
        image_quality: 'good',
        items: [
          { name: 'Cà chua', confidence: 0.95, freshness: 'fresh' },
          { name: 'Gạo tẻ', confidence: 0.9, freshness: 'fresh' },
          { name: 'Cơm trắng', confidence: 0.92, freshness: 'fresh' },
        ],
      }),
    };

    service = new PhotoScanService(
      mockIngredientRepo,
      mockUserRepo,
      mockSubscriptionService,
      mockUsageQuotaService,
      mockUsersService,
      mockUserIngredientService,
      mockNonVegDetector,
      mockDataSource,
      mockScanAiProvider,
    );
  });

  describe('detectImageMimeType & stripImageMetadata', () => {
    it('nhận diện đúng định dạng JPEG qua magic bytes', () => {
      const jpegBuffer = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46]);
      expect(detectImageMimeType(jpegBuffer)).toBe('image/jpeg');
    });

    it('nhận diện đúng định dạng PNG qua magic bytes', () => {
      const pngBuffer = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
      expect(detectImageMimeType(pngBuffer)).toBe('image/png');
    });

    it('nhận diện đúng định dạng WEBP qua magic bytes', () => {
      const webpBuffer = Buffer.concat([
        Buffer.from('RIFF'),
        Buffer.from([0x00, 0x00, 0x00, 0x00]),
        Buffer.from('WEBP'),
      ]);
      expect(detectImageMimeType(webpBuffer)).toBe('image/webp');
    });

    it('từ chối file văn bản giả danh file ảnh', () => {
      const fakeBuffer = Buffer.from('Hello world this is a text file');
      expect(detectImageMimeType(fakeBuffer)).toBeNull();
    });

    it('loại bỏ segment APP1 (EXIF/GPS) khỏi JPEG', () => {
      // SOI + APP1 (Exif) + SOS + data
      const soi = Buffer.from([0xff, 0xd8]);
      const app1 = Buffer.from([0xff, 0xe1, 0x00, 0x0a, 0x45, 0x78, 0x69, 0x66, 0x00, 0x00, 0x00, 0x00]);
      const sos = Buffer.from([0xff, 0xda, 0x12, 0x34]);
      const fullJpeg = Buffer.concat([soi, app1, sos]);

      const stripped = stripImageMetadata(fullJpeg, 'image/jpeg');
      expect(stripped.includes(Buffer.from([0xff, 0xe1]))).toBe(false);
      expect(stripped.subarray(0, 2)).toEqual(soi);
    });
  });

  describe('detect', () => {
    const validJpeg = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x00, 0x00]);

    it('từ chối 403 nếu người dùng không phải tài khoản Premium', async () => {
      mockSubscriptionService.isPremium.mockResolvedValueOnce(false);

      await expect(
        service.detect(1, { originalname: 'test.jpg', buffer: validJpeg }),
      ).rejects.toMatchObject({
        status: HttpStatus.FORBIDDEN,
        response: { code: ErrorCode.PHOTO_SCAN_PREMIUM_REQUIRED },
      });
    });

    it('từ chối 400 nếu không có buffer file ảnh', async () => {
      await expect(service.detect(1, undefined)).rejects.toMatchObject({
        status: HttpStatus.BAD_REQUEST,
        response: { code: ErrorCode.PHOTO_SCAN_IMAGE_INVALID },
      });
    });

    it('từ chối 413 nếu dung lượng ảnh vượt quá 5 MB', async () => {
      const largeBuffer = Buffer.alloc(6 * 1024 * 1024);
      await expect(
        service.detect(1, { originalname: 'large.jpg', buffer: largeBuffer, size: largeBuffer.length }),
      ).rejects.toMatchObject({
        status: HttpStatus.PAYLOAD_TOO_LARGE,
        response: { code: ErrorCode.PHOTO_SCAN_IMAGE_TOO_LARGE },
      });
    });

    it('hoàn thành nhận diện ảnh, khớp nguyên liệu, và cảnh báo dị ứng', async () => {
      const result = await service.detect(1, { originalname: 'test.jpg', buffer: validJpeg });

      expect(result.remaining_scans).toBe(29);
      expect(result.items.length).toBe(2);

      // Cà chua: nằm trong danh sách dị ứng của user
      const tomato = result.items.find((i) => i.detected_name === 'Cà chua');
      expect(tomato).toBeDefined();
      expect(tomato?.ingredient?.ingredient_id).toBe(1);
      expect(tomato?.warnings).toContain('allergen');

      // Gạo tẻ: khớp với "Gạo tẻ (sống)" sau khi loại bỏ ngoặc đơn
      const rice = result.items.find((i) => i.detected_name === 'Gạo tẻ');
      expect(rice).toBeDefined();
      expect(rice?.ingredient?.ingredient_id).toBe(2);
    });

    it('hoàn lại lượt khi AI ném lỗi', async () => {
      mockScanAiProvider.detectIngredients.mockRejectedValueOnce(
        new HttpException('AI Error', HttpStatus.SERVICE_UNAVAILABLE),
      );

      await expect(
        service.detect(1, { originalname: 'test.jpg', buffer: validJpeg }),
      ).rejects.toThrow();

      expect(mockUsageQuotaService.refundQuota).toHaveBeenCalledWith({
        user_id: 1,
        action_type: UsageActionType.PHOTO_SCAN,
      });
    });

    it('trả về danh sách rỗng 200 khi ảnh không chứa thức ăn (no_food)', async () => {
      mockScanAiProvider.detectIngredients.mockResolvedValueOnce({
        image_quality: 'no_food',
        items: [],
      });

      const result = await service.detect(1, { originalname: 'test.jpg', buffer: validJpeg });

      expect(result.items).toEqual([]);
      expect(result.image_quality).toBe('no_food');
      expect(result.remaining_scans).toBe(29);
    });

    it('loại bỏ hoàn toàn các nguyên liệu không thuần chay (thịt bò, cá...) khỏi kết quả quét', async () => {
      mockScanAiProvider.detectIngredients.mockResolvedValueOnce({
        image_quality: 'good',
        items: [
          { name: 'Cà chua', confidence: 0.95, freshness: 'fresh' },
          { name: 'Thịt bò xay', confidence: 0.9, freshness: 'fresh' },
        ],
      });

      const result = await service.detect(1, { originalname: 'test.jpg', buffer: validJpeg });

      expect(result.items.length).toBe(1);
      expect(result.items[0].detected_name).toBe('Cà chua');
      expect(result.items.some((i) => i.detected_name === 'Thịt bò xay')).toBe(false);
    });
  });

  describe('detectBatch', () => {
    const validJpeg = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x00, 0x00]);

    it('quét thành công chùm nhiều ảnh và hợp nhất danh sách nguyên liệu', async () => {
      const files = [
        { originalname: 'photo1.jpg', buffer: validJpeg },
        { originalname: 'photo2.jpg', buffer: validJpeg },
      ];

      const result = await service.detectBatch(1, files);

      expect(result.items.length).toBe(3);
      expect(mockScanAiProvider.detectBatchIngredients).toHaveBeenCalled();
      expect(result.remaining_scans).toBe(29);
    });

    it('từ chối 400 nếu danh sách ảnh rỗng', async () => {
      await expect(service.detectBatch(1, [])).rejects.toMatchObject({
        status: HttpStatus.BAD_REQUEST,
        response: { code: ErrorCode.PHOTO_SCAN_IMAGE_INVALID },
      });
    });

    it('từ chối 400 nếu vượt quá 5 ảnh', async () => {
      const files = Array(6).fill({ originalname: 'pic.jpg', buffer: validJpeg });

      await expect(service.detectBatch(1, files)).rejects.toMatchObject({
        status: HttpStatus.BAD_REQUEST,
        response: { code: ErrorCode.VALIDATION_FAILED },
      });
    });
  });

  describe('getStats', () => {
    it('trả về thống kê số lượt quét trong ngày chính xác', async () => {
      const stats = await service.getStats(1);

      expect(stats.daily_limit).toBe(30);
      expect(stats.used_today).toBe(5);
      expect(stats.remaining_today).toBe(25);
      expect(stats.is_premium).toBe(true);
      expect(stats.rate_limit_per_minute).toBe(5);
    });
  });

  describe('confirm', () => {
    it('thêm thành công nguyên liệu vào pantry với nguồn PHOTO_SCAN', async () => {
      const result = await service.confirm(1, {
        items: [
          { ingredient_id: 1, quantity: 500, unit: 'g', freshness_status: 'fresh' },
        ],
      });

      expect(result.added_count).toBe(1);
      expect(result.skipped_count).toBe(0);
      expect(mockUserIngredientService.create).toHaveBeenCalledWith(1, {
        ingredient_id: 1,
        quantity: 500,
        unit: 'g',
        freshness_status: 'fresh',
        source: IngredientSource.PHOTO_SCAN,
      });
    });

    it('bỏ qua nguyên liệu đã có sẵn trong pantry', async () => {
      const result = await service.confirm(1, {
        items: [{ ingredient_id: 3, quantity: 1 }],
      });

      expect(result.added_count).toBe(0);
      expect(result.skipped_count).toBe(1);
      expect(result.results[0].status).toBe('already_in_pantry');
      expect(mockUserIngredientService.create).not.toHaveBeenCalled();
    });

    it('từ chối thêm nguyên liệu mặn nếu user đang theo chế độ ăn chay', async () => {
      const result = await service.confirm(1, {
        items: [{ ingredient_id: 4, quantity: 200 }],
      });

      expect(result.added_count).toBe(0);
      expect(result.skipped_count).toBe(1);
      expect(result.results[0].status).toBe('non_vegan_rejected');
      expect(mockUserIngredientService.create).not.toHaveBeenCalled();
    });

    it('từ chối và hủy toàn bộ thao tác nếu có ingredient_id không tồn tại', async () => {
      mockIngredientRepo.find.mockResolvedValueOnce([
        { ingredient_id: 1, ingredient_name: 'Cà chua' },
      ]);

      await expect(
        service.confirm(1, {
          items: [
            { ingredient_id: 1 },
            { ingredient_id: 9999 },
          ],
        }),
      ).rejects.toMatchObject({
        response: { code: ErrorCode.INGREDIENT_NOT_FOUND },
      });

      expect(mockUserIngredientService.create).not.toHaveBeenCalled();
    });
  });
});
