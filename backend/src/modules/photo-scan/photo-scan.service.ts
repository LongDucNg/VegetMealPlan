import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';
import {
  Ingredient,
  IngredientStatus,
} from '../ingredient/entities/ingredient.entity';
import { User } from '../users/entities/user.entity';
import { UserIngredientService } from '../user-ingredient/user-ingredient.service';
import { IngredientSource } from '../user-ingredient/entities/user-ingredient.entity';
import { SubscriptionService } from '../subscription/subscription.service';
import {
  UsageQuota,
  UsageActionType,
} from '../usage-quota/entities/usage-quota.entity';
import {
  UsageQuotaService,
  startOfCurrentDayVN,
} from '../usage-quota/usage-quota.service';
import { UsersService } from '../users/users.service';
import { NonVegetarianDetectorService } from '../../common/services/non-vegetarian-detector.service';
import { ScanAiProvider } from './providers/scan-ai-provider.interface';
import {
  PhotoScanResponseData,
  DetectedIngredientItemDto,
  MatchedIngredientDto,
} from './dto/photo-scan-response.dto';
import {
  ConfirmScanDto,
  ConfirmScanResponseData,
  ConfirmScanResultItem,
} from './dto/confirm-scan.dto';
import { ScanStatsResponseData } from './dto/scan-stats-response.dto';
import { stripImageMetadata } from './utils/strip-image-metadata.util';
import { SCAN_PRESETS, ScanPresetItem } from './constants/scan-presets.constant';
import { ErrorCode } from '../../common/constants/error-codes.enum';

interface RateLimitEntry {
  timestamps: number[];
}

/**
 * Kiểm tra kiểu ảnh thực tế qua Magic Bytes ở đầu buffer.
 * Tránh trường hợp người dùng đổi đuôi file (ví dụ file.txt đổi thành file.jpg).
 */
export function detectImageMimeType(buffer: Buffer): string | null {
  if (!buffer || buffer.length < 8) return null;

  // JPEG: bắt đầu bằng 0xFF, 0xD8, 0xFF
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return 'image/jpeg';
  }

  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return 'image/png';
  }

  // WEBP: RIFF....WEBP
  if (
    buffer.length >= 12 &&
    buffer.subarray(0, 4).toString('ascii') === 'RIFF' &&
    buffer.subarray(8, 12).toString('ascii') === 'WEBP'
  ) {
    return 'image/webp';
  }

  return null;
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Chuẩn hóa chuỗi so khớp: Unicode NFC, chữ thường, gộp khoảng trắng thừa.
 */
function normalizeString(value: string): string {
  return value.normalize('NFC').toLowerCase().replace(/\s+/g, ' ').trim();
}

/**
 * Chuẩn hóa tên nguyên liệu: bỏ phần chú thích trong ngoặc đơn rồi chuẩn hóa.
 * Ví dụ: "Gạo tẻ (sống)" -> "gạo tẻ", "Cơm trắng (đã nấu)" -> "cơm trắng".
 */
function cleanIngredientName(name: string): string {
  const withoutParens = name.replace(/\s*\([^)]*\)/g, '');
  return normalizeString(withoutParens);
}

@Injectable()
export class PhotoScanService {
  private readonly logger = new Logger(PhotoScanService.name);
  private readonly rateLimits = new Map<number, RateLimitEntry>();

  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepo: Repository<Ingredient>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly subscriptionService: SubscriptionService,
    private readonly usageQuotaService: UsageQuotaService,
    private readonly usersService: UsersService,
    private readonly userIngredientService: UserIngredientService,
    private readonly nonVegDetector: NonVegetarianDetectorService,
    private readonly dataSource: DataSource,
    @Inject('SCAN_AI_PROVIDER')
    private readonly scanAiProvider: ScanAiProvider,
  ) {}

  /**
   * Lấy danh sách mẫu quét (Presets) kèm hướng dẫn chụp.
   * Không tốn lượt, không gọi AI.
   */
  getPresets(): ScanPresetItem[] {
    return SCAN_PRESETS;
  }

  /**
   * Giới hạn tần suất gọi: 5 yêu cầu/phút trên mỗi tài khoản Premium.
   */
  private checkRateLimit(userId: number) {
    const now = Date.now();
    const windowMs = 60 * 1000;
    const maxRequests = Number(process.env.SCAN_RATE_LIMIT_PER_MINUTE) || 5;

    let entry = this.rateLimits.get(userId);
    if (!entry) {
      entry = { timestamps: [] };
      this.rateLimits.set(userId, entry);
    }

    entry.timestamps = entry.timestamps.filter((t) => now - t < windowMs);

    if (entry.timestamps.length >= maxRequests) {
      throw new HttpException(
        {
          code: ErrorCode.PHOTO_SCAN_RATE_LIMITED,
          message:
            'Bạn đang gửi yêu cầu quét ảnh quá nhanh, vui lòng thử lại sau 1 phút.',
        },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    entry.timestamps.push(now);
  }

  /**
   * Nhận diện nguyên liệu trong ảnh sử dụng Gemini AI.
   */
  async detect(
    userId: number,
    file?: { originalname: string; buffer: Buffer; size?: number; mimetype?: string },
  ): Promise<PhotoScanResponseData> {
    // 1. Kiểm tra quyền Premium
    const isPremium = await this.subscriptionService.isPremium(userId);
    if (!isPremium) {
      throw new HttpException(
        {
          code: ErrorCode.PHOTO_SCAN_PREMIUM_REQUIRED,
          message:
            'Tính năng quét ảnh nguyên liệu bằng AI chỉ dành cho thành viên gói Premium. Vui lòng nâng cấp tài khoản để sử dụng.',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    // 2. Kiểm tra tần suất gọi (5 req/phút)
    this.checkRateLimit(userId);

    // 3. Kiểm tra file đầu vào
    if (!file || !file.buffer || file.buffer.length === 0) {
      throw new HttpException(
        {
          code: ErrorCode.PHOTO_SCAN_IMAGE_INVALID,
          message:
            'Vui lòng tải lên một file ảnh nguyên liệu qua trường dữ liệu "image".',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    // Giới hạn dung lượng ảnh (mặc định 5 MB)
    const maxMb = Number(process.env.SCAN_MAX_IMAGE_MB) || 5;
    const maxBytes = maxMb * 1024 * 1024;
    const actualSize = file.size || file.buffer.length;

    if (actualSize > maxBytes) {
      throw new HttpException(
        {
          code: ErrorCode.PHOTO_SCAN_IMAGE_TOO_LARGE,
          message: `Dung lượng ảnh tải lên (${(actualSize / (1024 * 1024)).toFixed(1)} MB) vượt quá giới hạn cho phép (${maxMb} MB).`,
        },
        HttpStatus.PAYLOAD_TOO_LARGE,
      );
    }

    // Kiểm tra định dạng ảnh thật qua Magic Bytes
    const mimeType = detectImageMimeType(file.buffer);
    if (!mimeType) {
      throw new HttpException(
        {
          code: ErrorCode.PHOTO_SCAN_IMAGE_INVALID,
          message:
            'File tải lên không phải là ảnh hợp lệ hoặc file bị hỏng (hệ thống chỉ chấp nhận định dạng JPEG, PNG, WEBP).',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    // TODO: Tước bỏ siêu dữ liệu vị trí GPS khỏi ảnh ở server khi người dùng đồng ý cài thêm thư viện xử lý ảnh (sharp/exiftool).

    // 4. Giữ chỗ lượt nguyên tử trước khi gọi Gemini AI
    const dailyLimit = Number(process.env.SCAN_DAILY_LIMIT) || 30;
    const quotaResult = await this.usageQuotaService.reserveQuota({
      user_id: userId,
      action_type: UsageActionType.PHOTO_SCAN,
      limit: dailyLimit,
    });

    const remainingScans = quotaResult.remaining;

    // 5. Loại bỏ siêu dữ liệu vị trí GPS/EXIF và gọi AI provider trong bộ nhớ RAM
    const sanitizedBuffer = stripImageMetadata(file.buffer, mimeType);

    let rawResult: {
      items: Array<{
        name: string;
        confidence: number;
        freshness: 'fresh' | 'aging' | 'spoiled' | 'unknown';
      }>;
      image_quality: 'good' | 'blurry' | 'dark' | 'no_food';
    };

    try {
      rawResult = await this.scanAiProvider.detectIngredients(
        sanitizedBuffer,
        mimeType,
      );
    } catch (aiError: any) {
      // Khi AI lỗi kỹ thuật: Hoàn lại lượt nguyên tử cho người dùng và ném tiếp lỗi
      await this.usageQuotaService.refundQuota({
        user_id: userId,
        action_type: UsageActionType.PHOTO_SCAN,
      });

      throw aiError;
    }

    // 6. Xử lý trường hợp ảnh không có thực phẩm hoặc AI trả danh sách rỗng
    if (
      rawResult.image_quality === 'no_food' ||
      !rawResult.items ||
      rawResult.items.length === 0
    ) {
      const guidance =
        rawResult.image_quality === 'dark'
          ? 'Ảnh chụp hơi tối, bạn hãy bật thêm đèn hoặc dùng đèn flash.'
          : rawResult.image_quality === 'blurry'
            ? 'Ảnh chụp bị mờ nét, bạn hãy giữ chắc tay khi chụp.'
            : 'Hãy chụp gần hơn vào giỏ rau củ hoặc tủ lạnh của bạn.';

      return {
        items: [],
        image_quality: rawResult.image_quality,
        message: `Không nhận diện được nguyên liệu thực phẩm nào trong ảnh. ${guidance}`,
        remaining_scans: remainingScans,
      };
    }

    // 7. Lọc độ tin cậy: Chỉ giữ các mục có confidence >= 0.4
    const filteredRaw = rawResult.items.filter(
      (item) => typeof item.confidence === 'number' && item.confidence >= 0.4,
    );

    if (filteredRaw.length === 0) {
      return {
        items: [],
        image_quality: rawResult.image_quality,
        message:
          'Độ tin cậy nhận diện của các nguyên liệu trong ảnh quá thấp. Vui lòng chụp lại với ánh sáng tốt và góc chụp rõ ràng hơn.',
        remaining_scans: remainingScans,
      };
    }

    // 8, 9, 10: Ánh xạ nguyên liệu và kiểm tra cảnh báo
    const items = await this.mapAndEnrichIngredients(filteredRaw, userId);
    const message =
      items.length > 0
        ? `Nhận diện thành công ${items.length} nguyên liệu thực phẩm chay.`
        : 'Không tìm thấy nguyên liệu chay hợp lệ nào trong ảnh. VegetMealPlan chỉ nhận diện thực phẩm thuần chay (rau củ, nấm, đậu hạt...).';

    return {
      items,
      image_quality: rawResult.image_quality,
      message,
      remaining_scans: remainingScans,
    };
  }

  /**
   * Quét và nhận diện chùm nhiều ảnh cùng lúc (tối đa 5 ảnh).
   * Hỗ trợ chụp nhiều góc độ (giỏ rau, ngăn tủ mát, khay gia vị) và hợp nhất kết quả.
   */
  async detectBatch(
    userId: number,
    files?: Array<{ originalname: string; buffer: Buffer; size?: number; mimetype?: string }>,
  ): Promise<PhotoScanResponseData> {
    // 1. Kiểm tra quyền Premium
    const isPremium = await this.subscriptionService.isPremium(userId);
    if (!isPremium) {
      throw new HttpException(
        {
          code: ErrorCode.PHOTO_SCAN_PREMIUM_REQUIRED,
          message:
            'Tính năng quét ảnh nguyên liệu bằng AI chỉ dành cho thành viên gói Premium. Vui lòng nâng cấp tài khoản để sử dụng.',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    // 2. Kiểm tra tần suất gọi (5 req/phút)
    this.checkRateLimit(userId);

    // 3. Kiểm tra danh sách file
    if (!files || files.length === 0) {
      throw new HttpException(
        {
          code: ErrorCode.PHOTO_SCAN_IMAGE_INVALID,
          message: 'Vui lòng tải lên ít nhất một file ảnh qua trường "images".',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (files.length > 5) {
      throw new BadRequestException({
        code: ErrorCode.VALIDATION_FAILED,
        message: 'Mỗi lần quét chùm tối đa 5 ảnh.',
      });
    }

    const maxMb = Number(process.env.SCAN_MAX_IMAGE_MB) || 5;
    const maxBytes = maxMb * 1024 * 1024;
    const sanitizedImages: Array<{ imageBuffer: Buffer; mimeType: string }> = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file || !file.buffer || file.buffer.length === 0) {
        throw new HttpException(
          {
            code: ErrorCode.PHOTO_SCAN_IMAGE_INVALID,
            message: `File ảnh thứ ${i + 1} không hợp lệ hoặc rỗng.`,
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      const actualSize = file.size || file.buffer.length;
      if (actualSize > maxBytes) {
        throw new HttpException(
          {
            code: ErrorCode.PHOTO_SCAN_IMAGE_TOO_LARGE,
            message: `Ảnh "${file.originalname || i + 1}" vượt quá dung lượng tối đa cho phép (${maxMb} MB).`,
          },
          HttpStatus.PAYLOAD_TOO_LARGE,
        );
      }

      const mimeType = detectImageMimeType(file.buffer);
      if (!mimeType) {
        throw new HttpException(
          {
            code: ErrorCode.PHOTO_SCAN_IMAGE_INVALID,
            message: `Ảnh "${file.originalname || i + 1}" không phải định dạng hợp lệ (chỉ chấp nhận JPEG, PNG, WEBP).`,
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      const stripped = stripImageMetadata(file.buffer, mimeType);
      sanitizedImages.push({ imageBuffer: stripped, mimeType });
    }

    // 4. Giữ chỗ lượt nguyên tử
    const dailyLimit = Number(process.env.SCAN_DAILY_LIMIT) || 30;
    const quotaResult = await this.usageQuotaService.reserveQuota({
      user_id: userId,
      action_type: UsageActionType.PHOTO_SCAN,
      limit: dailyLimit,
    });
    const remainingScans = quotaResult.remaining;

    // 5. Gọi AI Provider xử lý chùm ảnh
    let rawResult: {
      items: Array<{
        name: string;
        confidence: number;
        freshness: 'fresh' | 'aging' | 'spoiled' | 'unknown';
      }>;
      image_quality: 'good' | 'blurry' | 'dark' | 'no_food';
    };

    try {
      rawResult = await this.scanAiProvider.detectBatchIngredients(sanitizedImages);
    } catch (aiError: any) {
      await this.usageQuotaService.refundQuota({
        user_id: userId,
        action_type: UsageActionType.PHOTO_SCAN,
      });
      throw aiError;
    }

    // 6. Xử lý ảnh không có thực phẩm
    if (
      rawResult.image_quality === 'no_food' ||
      !rawResult.items ||
      rawResult.items.length === 0
    ) {
      return {
        items: [],
        image_quality: rawResult.image_quality,
        message: 'Không nhận diện được nguyên liệu thực phẩm nào trong các ảnh đã chụp. Vui lòng chụp lại rõ nét hơn.',
        remaining_scans: remainingScans,
      };
    }

    // 7. Lọc độ tin cậy >= 0.4
    const filteredRaw = rawResult.items.filter(
      (item) => typeof item.confidence === 'number' && item.confidence >= 0.4,
    );

    if (filteredRaw.length === 0) {
      return {
        items: [],
        image_quality: rawResult.image_quality,
        message: 'Độ tin cậy nhận diện của các nguyên liệu quá thấp. Vui lòng chụp lại rõ ràng hơn.',
        remaining_scans: remainingScans,
      };
    }

    // 8, 9, 10: Ánh xạ nguyên liệu và kiểm tra dị ứng / mặn
    const items = await this.mapAndEnrichIngredients(filteredRaw, userId);
    const message =
      items.length > 0
        ? `Nhận diện thành công ${items.length} nguyên liệu thực phẩm chay từ ${files.length} ảnh.`
        : 'Không tìm thấy nguyên liệu chay hợp lệ nào trong các ảnh đã chụp. VegetMealPlan chỉ nhận diện thực phẩm thuần chay (rau củ, nấm, đậu hạt...).';

    return {
      items,
      image_quality: rawResult.image_quality,
      message,
      remaining_scans: remainingScans,
    };
  }

  /**
   * Lấy thống kê lượt quét ảnh và thời điểm đặt lại hạn mức của người dùng.
   */
  async getStats(userId: number): Promise<ScanStatsResponseData> {
    const isPremium = await this.subscriptionService.isPremium(userId);
    const dailyLimit = Number(process.env.SCAN_DAILY_LIMIT) || 30;
    const rateLimitPerMinute = Number(process.env.SCAN_RATE_LIMIT_PER_MINUTE) || 5;

    const currentPeriod = startOfCurrentDayVN();
    const quota = await this.dataSource.getRepository(UsageQuota).findOne({
      where: {
        user_id: userId,
        action_type: UsageActionType.PHOTO_SCAN,
      },
    });

    const usedToday =
      quota && quota.period_start.getTime() >= currentPeriod.getTime()
        ? quota.usage_count
        : 0;

    const remainingToday = Math.max(0, dailyLimit - usedToday);
    const resetAt = new Date(currentPeriod.getTime() + 24 * 3600 * 1000);

    return {
      daily_limit: dailyLimit,
      used_today: usedToday,
      remaining_today: remainingToday,
      reset_at: resetAt.toISOString(),
      period_start: currentPeriod.toISOString(),
      rate_limit_per_minute: rateLimitPerMinute,
      is_premium: isPremium,
    };
  }

  /**
   * Phương thức chung xử lý ánh xạ danh mục nguyên liệu và kiểm tra cảnh báo dị ứng/mặn.
   */
  private async mapAndEnrichIngredients(
    filteredRaw: Array<{
      name: string;
      confidence: number;
      freshness: 'fresh' | 'aging' | 'spoiled' | 'unknown';
    }>,
    userId: number,
  ): Promise<DetectedIngredientItemDto[]> {
    const dbIngredients = await this.ingredientRepo.find({
      where: { status: IngredientStatus.ACTIVE },
    });

    const userAllergies = await this.usersService.getAllergies(userId);
    const allergyIngredientIds = new Set<number>(
      userAllergies.ingredients.map((i) => i.ingredient_id),
    );
    const allergyNames = userAllergies.ingredients.map((i) =>
      normalizeString(i.ingredient_name),
    );

    const items: DetectedIngredientItemDto[] = [];

    for (const rawItem of filteredRaw) {
      const normAiName = normalizeString(rawItem.name);
      const isLowConfidence = rawItem.confidence < 0.7;

      const exactMatches = dbIngredients.filter(
        (ing) => cleanIngredientName(ing.ingredient_name) === normAiName,
      );

      let matchedIngredient: MatchedIngredientDto | null = null;
      let candidates: MatchedIngredientDto[] = [];
      let matchedEntity: Ingredient | null = null;

      if (exactMatches.length === 1) {
        matchedEntity = exactMatches[0];
        matchedIngredient = {
          ingredient_id: matchedEntity.ingredient_id,
          ingredient_name: matchedEntity.ingredient_name,
          unit: matchedEntity.unit,
        };
      } else if (exactMatches.length > 1) {
        candidates = exactMatches.map((m) => ({
          ingredient_id: m.ingredient_id,
          ingredient_name: m.ingredient_name,
          unit: m.unit,
        }));
      } else {
        const wordMatches = dbIngredients.filter((ing) => {
          const cleanName = cleanIngredientName(ing.ingredient_name);
          if (!cleanName) return false;

          const patternDb = new RegExp(
            `(?<![\\p{L}\\p{N}])${escapeRegex(cleanName)}(?![\\p{L}\\p{N}])`,
            'iu',
          );
          const patternAi = new RegExp(
            `(?<![\\p{L}\\p{N}])${escapeRegex(normAiName)}(?![\\p{L}\\p{N}])`,
            'iu',
          );

          return patternDb.test(normAiName) || patternAi.test(cleanName);
        });

        if (wordMatches.length === 1) {
          matchedEntity = wordMatches[0];
          matchedIngredient = {
            ingredient_id: matchedEntity.ingredient_id,
            ingredient_name: matchedEntity.ingredient_name,
            unit: matchedEntity.unit,
          };
        } else if (wordMatches.length > 1) {
          candidates = wordMatches.map((m) => ({
            ingredient_id: m.ingredient_id,
            ingredient_name: m.ingredient_name,
            unit: m.unit,
          }));
        }
      }

      const warningsSet = new Set<'allergen' | 'non_vegan'>();

      // A. Cảnh báo dị ứng
      if (matchedEntity && allergyIngredientIds.has(matchedEntity.ingredient_id)) {
        warningsSet.add('allergen');
      } else if (candidates.some((c) => allergyIngredientIds.has(c.ingredient_id))) {
        warningsSet.add('allergen');
      } else {
        const isAllergenMatch = allergyNames.some((allergy) => {
          const pattern = new RegExp(
            `(?<![\\p{L}\\p{N}])${escapeRegex(allergy)}(?![\\p{L}\\p{N}])`,
            'iu',
          );
          return pattern.test(normAiName);
        });
        if (isAllergenMatch) {
          warningsSet.add('allergen');
        }
      }

      // B. Cảnh báo mặn (Non-vegan)
      if (matchedEntity) {
        if (!matchedEntity.vegan_flag) {
          warningsSet.add('non_vegan');
        }
      } else if (candidates.length > 0) {
        const allCandidatesNonVegan = candidates.every((c) => {
          const ent = dbIngredients.find((db) => db.ingredient_id === c.ingredient_id);
          return ent && !ent.vegan_flag;
        });
        if (allCandidatesNonVegan) {
          warningsSet.add('non_vegan');
        }
      }

      if (!warningsSet.has('non_vegan')) {
        const nonVegCheck = this.nonVegDetector.checkIngredientName(rawItem.name);
        if (!nonVegCheck.isClean) {
          warningsSet.add('non_vegan');
        }
      }

      // CHỈ QUÉT NGUYÊN LIỆU NẤU ĐỒ ĂN CHAY: Bỏ qua hoàn toàn nguyên liệu mặn
      if (warningsSet.has('non_vegan')) {
        this.logger.warn(`Bỏ qua nguyên liệu không thuần chay: "${rawItem.name}"`);
        continue;
      }

      items.push({
        detected_name: rawItem.name,
        confidence: Math.round(rawItem.confidence * 100) / 100,
        low_confidence: isLowConfidence,
        freshness_status: rawItem.freshness,
        ingredient: matchedIngredient,
        candidates,
        warnings: Array.from(warningsSet),
      });
    }

    return items;
  }

  /**
   * Xác nhận danh sách nguyên liệu đã chọn từ kết quả scan và đưa vào pantry (bảng user_ingredients).
   * - Mọi ingredient_id phải tồn tại trong bảng ingredients; nếu thiếu ném 400 và không lưu mục nào.
   * - Toàn bộ được thực hiện trong 1 database transaction.
   * - Nguyên liệu mặn (vegan_flag = false) không được thêm vào pantry của người dùng ăn chay.
   * - Nguyên liệu đã có trong pantry sẽ được bỏ qua và thông báo rõ ràng trong kết quả.
   * - Nguồn được gán là PHOTO_SCAN, gọi qua UserIngredientService.create.
   */
  async confirm(
    userId: number,
    dto: ConfirmScanDto,
  ): Promise<ConfirmScanResponseData> {
    if (!dto.items || dto.items.length === 0) {
      throw new BadRequestException({
        code: ErrorCode.VALIDATION_FAILED,
        message: 'Danh sách nguyên liệu xác nhận không được để trống.',
      });
    }

    if (dto.items.length > 30) {
      throw new BadRequestException({
        code: ErrorCode.VALIDATION_FAILED,
        message: 'Mỗi lần xác nhận tối đa 30 nguyên liệu.',
      });
    }

    // 1. Lấy thông tin user để kiểm tra trường phái ăn chay
    const user = await this.userRepo.findOne({ where: { user_id: userId } });
    if (!user) {
      throw new HttpException(
        {
          code: ErrorCode.USER_NOT_FOUND,
          message: 'Không tìm thấy thông tin người dùng.',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const isVegetarianUser = Boolean(user.diet_type);

    // 2. Kiểm tra tính tồn tại của toàn bộ ingredient_id
    const ingredientIds = Array.from(
      new Set(dto.items.map((i) => i.ingredient_id)),
    );
    const dbIngredients = await this.ingredientRepo.find({
      where: { ingredient_id: In(ingredientIds) },
    });

    const foundIdMap = new Map<number, Ingredient>();
    dbIngredients.forEach((ing) => foundIdMap.set(ing.ingredient_id, ing));

    const missingIds = ingredientIds.filter((id) => !foundIdMap.has(id));
    if (missingIds.length > 0) {
      throw new BadRequestException({
        code: ErrorCode.INGREDIENT_NOT_FOUND,
        message: `Không tìm thấy nguyên liệu có ID [${missingIds.join(', ')}] trong hệ thống. Thao tác đã bị hủy để đảm bảo tính toàn vẹn dữ liệu.`,
      });
    }

    // 3. Lấy danh sách nguyên liệu hiện có trong pantry của user
    const existingPantry =
      await this.userIngredientService.findAllByUser(userId);
    const existingPantrySet = new Set<number>(
      existingPantry.map((p) => p.ingredient_id),
    );

    // 4. Ghi trong transaction (một mục lỗi thì không ghi mục nào)
    return await this.dataSource.transaction(async () => {
      const results: ConfirmScanResultItem[] = [];
      let addedCount = 0;
      let skippedCount = 0;

      for (const item of dto.items) {
        const ing = foundIdMap.get(item.ingredient_id)!;

        // Nếu đã có sẵn trong pantry (từ trước hoặc đã thêm trong batch hiện tại)
        if (existingPantrySet.has(item.ingredient_id)) {
          results.push({
            ingredient_id: ing.ingredient_id,
            ingredient_name: ing.ingredient_name,
            status: 'already_in_pantry',
            message: `Nguyên liệu "${ing.ingredient_name}" đã có sẵn trong tủ lạnh của bạn, bỏ qua không tạo trùng.`,
          });
          skippedCount++;
          continue;
        }

        // Nếu người dùng theo chế độ ăn chay nhưng nguyên liệu là món mặn
        if (isVegetarianUser && !ing.vegan_flag) {
          results.push({
            ingredient_id: ing.ingredient_id,
            ingredient_name: ing.ingredient_name,
            status: 'non_vegan_rejected',
            message: `Nguyên liệu "${ing.ingredient_name}" là nguyên liệu mặn, không thể thêm vào tủ lạnh của người ăn chay.`,
          });
          skippedCount++;
          continue;
        }

        // Tạo dòng user_ingredients của chính user đang đăng nhập qua UserIngredientService.create
        await this.userIngredientService.create(userId, {
          ingredient_id: item.ingredient_id,
          quantity: item.quantity,
          unit: item.unit || ing.unit,
          freshness_status: item.freshness_status || 'fresh',
          expiry_date: item.expiry_date,
          source: IngredientSource.PHOTO_SCAN,
        });

        // Đánh dấu đã thêm để chống trùng lặp nếu trong batch có item trùng ID
        existingPantrySet.add(item.ingredient_id);
        addedCount++;

        results.push({
          ingredient_id: ing.ingredient_id,
          ingredient_name: ing.ingredient_name,
          status: 'added',
          message: `Đã thêm "${ing.ingredient_name}" vào tủ lạnh thành công.`,
        });
      }

      const summaryMessage =
        addedCount > 0
          ? `Đã thêm thành công ${addedCount} nguyên liệu vào tủ lạnh${skippedCount > 0 ? ` (bỏ qua ${skippedCount} mục)` : ''}.`
          : `Không có nguyên liệu mới nào được thêm${skippedCount > 0 ? ` (${skippedCount} mục bị bỏ qua)` : ''}.`;

      return {
        added_count: addedCount,
        skipped_count: skippedCount,
        results,
        message: summaryMessage,
      };
    });
  }
}

