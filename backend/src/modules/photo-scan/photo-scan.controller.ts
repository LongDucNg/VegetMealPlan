import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import {
  FileInterceptor,
  FilesInterceptor,
  MulterModuleOptions,
} from '@nestjs/platform-express';
import { PhotoScanService } from './photo-scan.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { PhotoScanResponseData } from './dto/photo-scan-response.dto';
import { ScanPresetDto } from './dto/scan-presets-response.dto';
import {
  ConfirmScanDto,
  ConfirmScanResponseData,
} from './dto/confirm-scan.dto';
import { ScanStatsResponseData } from './dto/scan-stats-response.dto';

@ApiTags('meal-plans-scan')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('meal-plans/scan')
export class PhotoScanController {
  constructor(private readonly photoScanService: PhotoScanService) {}

  @Get('presets')
  @ApiOperation({
    summary: 'Lấy danh sách các mẫu quét nguyên liệu (Pantry, Fridge, Single)',
    description:
      'Trả về danh sách mẫu quét cố định kèm theo hướng dẫn góc chụp tối ưu. Không tốn lượt, không gọi AI.',
  })
  @ApiResponse({
    status: 200,
    description: 'Danh sách mẫu quét thành công',
    type: [ScanPresetDto],
  })
  getPresets(): ScanPresetDto[] {
    return this.photoScanService.getPresets();
  }

  @Get('stats')
  @ApiOperation({
    summary: 'Lấy thống kê số lượt quét ảnh trong ngày và thông tin hạn mức',
    description:
      'Trả về số lượt quét đã dùng hôm nay, số lượt còn lại, hạn mức ngày (30 lượt), thời điểm reset (00:00 VN), và trạng thái Premium của người dùng.',
  })
  @ApiResponse({
    status: 200,
    description: 'Thống kê lượt quét thành công',
    type: ScanStatsResponseData,
  })
  @ApiResponse({
    status: 401,
    description: 'Chưa đăng nhập (AUTH_UNAUTHORIZED)',
  })
  async getStats(
    @CurrentUser('user_id') userId: number,
  ): Promise<ScanStatsResponseData> {
    return this.photoScanService.getStats(userId);
  }

  @Post('detect')
  @ApiOperation({
    summary: 'Quét ảnh nhận diện nguyên liệu thực phẩm (Dành riêng cho gói Premium)',
    description:
      'Nhận một file ảnh (JPEG, PNG, WEBP tối đa 5 MB) qua multipart/form-data. Phân tích qua Gemini AI, đối chiếu với cơ sở dữ liệu nguyên liệu, cảnh báo dị ứng và nguyên liệu mặn. Không lưu ảnh vào ổ đĩa hay cơ sở dữ liệu.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
          description: 'File ảnh nguyên liệu chụp từ camera hoặc thư viện (tối đa 5 MB)',
        },
      },
      required: ['image'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Nhận diện ảnh thành công',
    type: PhotoScanResponseData,
  })
  @ApiResponse({
    status: 400,
    description: 'File không phải ảnh hợp lệ hoặc file bị hỏng (PHOTO_SCAN_IMAGE_INVALID)',
  })
  @ApiResponse({
    status: 401,
    description: 'Chưa đăng nhập (AUTH_UNAUTHORIZED)',
  })
  @ApiResponse({
    status: 403,
    description: 'Yêu cầu tài khoản Premium (PHOTO_SCAN_PREMIUM_REQUIRED)',
  })
  @ApiResponse({
    status: 413,
    description: 'Dung lượng ảnh vượt quá 5 MB (PHOTO_SCAN_IMAGE_TOO_LARGE)',
  })
  @ApiResponse({
    status: 422,
    description: 'Ảnh bị từ chối do vi phạm bộ lọc an toàn (PHOTO_SCAN_IMAGE_UNPROCESSABLE)',
  })
  @ApiResponse({
    status: 429,
    description: 'Hết hạn mức quét trong ngày (PHOTO_SCAN_QUOTA_EXCEEDED) hoặc gửi quá nhanh (PHOTO_SCAN_RATE_LIMITED)',
  })
  @ApiResponse({
    status: 503,
    description: 'Dịch vụ AI tạm thời không phản hồi hoặc chưa cấu hình (PHOTO_SCAN_SERVICE_UNAVAILABLE)',
  })
  @UseInterceptors(
    FileInterceptor('image', {
      limits: {
        fileSize: 10 * 1024 * 1024,
      },
    } as MulterModuleOptions),
  )
  async detect(
    @CurrentUser('user_id') userId: number,
    @UploadedFile()
    file?: {
      originalname: string;
      buffer: Buffer;
      size?: number;
      mimetype?: string;
    },
  ): Promise<PhotoScanResponseData> {
    return this.photoScanService.detect(userId, file);
  }

  @Post('detect-batch')
  @ApiOperation({
    summary: 'Quét chùm nhiều ảnh nhận diện nguyên liệu (Tối đa 5 ảnh, Premium)',
    description:
      'Nhận danh sách tối đa 5 file ảnh (trường "images"). Hỗ trợ chụp nhiều góc độ (ví dụ giỏ rau, ngăn tủ mát, bàn bếp) và hợp nhất kết quả nhận diện. Mỗi lần quét chùm chỉ tính 1 lượt scan.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        images: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
          description: 'Danh sách các file ảnh (tối đa 5 ảnh, mỗi ảnh không quá 5 MB)',
        },
      },
      required: ['images'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Nhận diện chùm ảnh thành công',
    type: PhotoScanResponseData,
  })
  @ApiResponse({
    status: 400,
    description: 'Ảnh không hợp lệ hoặc quá 5 ảnh (PHOTO_SCAN_IMAGE_INVALID, VALIDATION_FAILED)',
  })
  @ApiResponse({
    status: 401,
    description: 'Chưa đăng nhập (AUTH_UNAUTHORIZED)',
  })
  @ApiResponse({
    status: 403,
    description: 'Yêu cầu tài khoản Premium (PHOTO_SCAN_PREMIUM_REQUIRED)',
  })
  @ApiResponse({
    status: 413,
    description: 'Có ảnh vượt quá 5 MB (PHOTO_SCAN_IMAGE_TOO_LARGE)',
  })
  @ApiResponse({
    status: 429,
    description: 'Hết hạn mức quét trong ngày hoặc gửi quá nhanh',
  })
  @ApiResponse({
    status: 503,
    description: 'Dịch vụ AI tạm thời không khả dụng',
  })
  @UseInterceptors(
    FilesInterceptor('images', 5, {
      limits: {
        fileSize: 10 * 1024 * 1024,
      },
    } as MulterModuleOptions),
  )
  async detectBatch(
    @CurrentUser('user_id') userId: number,
    @UploadedFiles()
    files?: Array<{
      originalname: string;
      buffer: Buffer;
      size?: number;
      mimetype?: string;
    }>,
  ): Promise<PhotoScanResponseData> {
    return this.photoScanService.detectBatch(userId, files);
  }

  @Post('confirm')
  @ApiOperation({
    summary: 'Xác nhận danh sách nguyên liệu đã chọn từ scan để đưa vào tủ lạnh (pantry)',
    description:
      'Nhận danh sách ingredient_id (kèm số lượng, đơn vị, độ tươi tùy chọn) được người dùng xác nhận sau khi quét ảnh. Ghi bản ghi vào user_ingredients với source = PHOTO_SCAN. Kiểm tra tính tồn tại trong transaction; bỏ qua nếu đã có sẵn trong tủ lạnh; từ chối thêm món mặn nếu người dùng đang theo chế độ ăn chay.',
  })
  @ApiResponse({
    status: 200,
    description: 'Xác nhận lưu nguyên liệu vào tủ lạnh thành công',
    type: ConfirmScanResponseData,
  })
  @ApiResponse({
    status: 400,
    description: 'ingredient_id không tồn tại hoặc dữ liệu xác thực không hợp lệ (INGREDIENT_NOT_FOUND, VALIDATION_FAILED)',
  })
  @ApiResponse({
    status: 401,
    description: 'Chưa đăng nhập (AUTH_UNAUTHORIZED)',
  })
  async confirm(
    @CurrentUser('user_id') userId: number,
    @Body() dto: ConfirmScanDto,
  ): Promise<ConfirmScanResponseData> {
    return this.photoScanService.confirm(userId, dto);
  }
}

