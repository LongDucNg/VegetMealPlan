import * as fs from 'fs';
import * as path from 'path';
import { BadRequestException, Injectable } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { ErrorCode } from '../../common/constants/error-codes.enum';
import { CloudinaryService } from '../media/cloudinary.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const multer = require('multer');

/**
 * Cấu hình multer cho POST /recipes/upload: lưu TẠM xuống uploads/recipes (xoá ngay sau khi đẩy lên Cloudinary), chỉ nhận ảnh/video,
 * tối đa 100MB. Tách khỏi controller để controller chỉ còn khai báo route.
 */
export const RECIPE_MEDIA_UPLOAD_OPTIONS: MulterOptions = {
  storage: multer.diskStorage({
    destination: (_req: any, _file: any, cb: any) => {
      const uploadPath = path.join(process.cwd(), 'uploads', 'recipes');
      fs.mkdirSync(uploadPath, { recursive: true });
      cb(null, uploadPath);
    },
    filename: (_req: any, file: any, cb: any) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, 'recipe-' + uniqueSuffix + ext);
    },
  }),
  fileFilter: (_req: any, file: any, cb: any) => {
    const allowedMimes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
      'video/mp4',
      'video/webm',
      'video/quicktime',
    ];
    const allowedExts = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.mp4', '.webm', '.mov'];
    const ext = path.extname(file.originalname).toLowerCase();
    // Cần đúng CẢ mimetype lẫn đuôi file: trước đây chỉ cần một trong hai nên file .html khai mimetype
    // image/png vẫn lọt vào uploads/ và được phục vụ tĩnh từ origin của backend (XSS).
    if (allowedMimes.includes(file.mimetype) && allowedExts.includes(ext)) {
      cb(null, true);
    } else {
      cb(
        new BadRequestException({
          code: ErrorCode.VALIDATION_FAILED,
          message: 'Chỉ chấp nhận file ảnh (jpg, png, webp, gif) hoặc video (mp4, webm, mov)',
        }),
        false,
      );
    }
  },
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
};

/**
 * Tải ảnh/video cho form tạo/sửa món khi món CHƯA có id (khác RecipeImageService:
 * POST /recipes/:id/image gắn ảnh cho món đã tồn tại).
 * Bắt buộc dùng Cloudinary: server deploy (Render) xoá ổ đĩa mỗi lần deploy, nên không lưu file lâu dài
 * trên máy chủ. Thiếu cấu hình Cloudinary thì báo 503 UPLOAD_NOT_CONFIGURED. File tạm luôn bị xoá.
 */
@Injectable()
export class RecipeMediaService {
  constructor(private readonly cloudinary: CloudinaryService) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async upload(file: any) {
    if (!file) {
      throw new BadRequestException({
        code: ErrorCode.VALIDATION_FAILED,
        message: 'Vui lòng chọn file để tải lên',
      });
    }

    const isVideo =
      file.mimetype?.startsWith('video/') ||
      ['.mp4', '.webm', '.mov'].includes(path.extname(file.originalname).toLowerCase());

    try {
      const uploadResult = await this.cloudinary.uploadLocalFile(
        file.path,
        isVideo ? 'video' : 'image',
        'vegetmealplan/recipes',
      );
      return {
        url: uploadResult.secure_url,
        file_type: isVideo ? 'video' : 'image',
        public_id: uploadResult.public_id,
        size: file.size,
      };
    } finally {
      removeTempFile(file.path);
    }
  }
}

function removeTempFile(filePath?: string) {
  if (!filePath) return;
  try {
    fs.unlinkSync(filePath);
  } catch {
    // File tạm đã bị xoá hoặc không tồn tại: bỏ qua
  }
}
