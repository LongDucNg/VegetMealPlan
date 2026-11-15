import * as fs from 'fs';
import * as path from 'path';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { ErrorCode } from '../../common/constants/error-codes.enum';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const multer = require('multer');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cloudinary = require('cloudinary').v2;

/**
 * Cấu hình multer cho POST /recipes/upload: lưu tạm xuống uploads/recipes, chỉ nhận ảnh/video,
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
 * Có cấu hình Cloudinary thì đẩy lên Cloudinary rồi xoá file tạm; không có thì trả đường dẫn local.
 */
@Injectable()
export class RecipeMediaService {
  private readonly logger = new Logger(RecipeMediaService.name);

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

    // Nếu cấu hình Cloudinary trong .env, ưu tiên tải thẳng lên Cloudinary
    if (
      process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
    ) {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });

      try {
        const uploadResult = await cloudinary.uploader.upload(file.path, {
          resource_type: isVideo ? 'video' : 'image',
          folder: 'vegetmealplan/recipes',
        });

        // Xoá file tạm local sau khi đẩy lên Cloudinary
        try {
          fs.unlinkSync(file.path);
        } catch {
          // Bỏ qua lỗi xoá file tạm
        }

        return {
          url: uploadResult.secure_url,
          file_type: isVideo ? 'video' : 'image',
          public_id: uploadResult.public_id,
          size: file.size,
        };
      } catch (err: any) {
        this.logger.error(`Lỗi khi tải file lên Cloudinary: ${err?.message ?? err}`);
        throw new BadRequestException({
          code: ErrorCode.VALIDATION_FAILED,
          message: 'Lỗi khi tải file lên Cloudinary: ' + (err.message || 'Không xác định'),
        });
      }
    }

    const relativeUrl = '/uploads/recipes/' + file.filename;

    return {
      url: relativeUrl,
      file_type: isVideo ? 'video' : 'image',
      filename: file.filename,
      size: file.size,
    };
  }
}
