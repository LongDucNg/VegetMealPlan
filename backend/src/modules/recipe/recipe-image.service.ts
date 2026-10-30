import { BadRequestException, ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from './entities/recipe.entity';
import { CloudinaryService } from '../media/cloudinary.service';
import { ErrorCode } from '../../common/constants/error-codes.enum';

export const RECIPE_IMAGE_MAX_BYTES = 5 * 1024 * 1024;
export const RECIPE_IMAGE_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export interface UploadedImageFile {
  buffer: Buffer;
  mimetype: string;
  size: number;
}

/**
 * Ảnh món ăn lưu trên Cloudinary, mỗi món đúng MỘT file cố định: vegetmealplan/recipes/recipe-{id}.
 * Đổi ảnh = ghi đè file cũ (không sinh ảnh rác), xoá món = xoá file. recipes.image_url lưu secure_url
 * (có số version nên trình duyệt tự tải ảnh mới sau khi đổi).
 */
@Injectable()
export class RecipeImageService {
  private readonly logger = new Logger(RecipeImageService.name);

  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepo: Repository<Recipe>,
    private readonly cloudinary: CloudinaryService,
  ) {}

  static publicId(recipeId: number): string {
    return `vegetmealplan/recipes/recipe-${recipeId}`;
  }

  async upload(recipeId: number, userId: number, userRole: string, file?: UploadedImageFile) {
    this.assertValidFile(file);
    this.cloudinary.assertConfigured();

    const recipe = await this.recipeRepo.findOne({
      where: { recipe_id: recipeId },
      select: { recipe_id: true, created_by: true },
    });
    if (!recipe) {
      throw new NotFoundException({ code: ErrorCode.RECIPE_NOT_FOUND, message: `Không tìm thấy công thức #${recipeId}` });
    }
    // Cùng quy tắc với sửa món: chỉ người tạo món hoặc admin.
    if (userRole !== 'admin' && recipe.created_by !== userId) {
      throw new ForbiddenException({ code: ErrorCode.AUTH_FORBIDDEN, message: 'Bạn không có quyền đổi ảnh công thức này.' });
    }

    const uploaded = await this.cloudinary.uploadImage(file.buffer, file.mimetype, RecipeImageService.publicId(recipeId));
    await this.recipeRepo.update({ recipe_id: recipeId }, { image_url: uploaded.secure_url });
    return { recipe_id: recipeId, image_url: uploaded.secure_url };
  }

  /**
   * Gọi sau removeRecipe: món đã xoá hẳn khỏi DB thì xoá luôn ảnh; món chỉ bị ẩn (REMOVED vì còn trong
   * thực đơn của người dùng) thì giữ ảnh. Lỗi Cloudinary chỉ ghi log, không làm hỏng thao tác xoá món.
   */
  async removeIfRecipeDeleted(recipeId: number): Promise<void> {
    if (!this.cloudinary.isConfigured) return;
    if (await this.recipeRepo.exists({ where: { recipe_id: recipeId } })) return;
    await this.cloudinary
      .destroyImage(RecipeImageService.publicId(recipeId))
      .catch((err) => this.logger.warn(`Không xoá được ảnh món #${recipeId} trên Cloudinary: ${err?.message ?? err}`));
  }

  private assertValidFile(file?: UploadedImageFile): asserts file is UploadedImageFile {
    if (!file?.buffer?.length) {
      throw new BadRequestException({ code: ErrorCode.UPLOAD_INVALID_FILE, message: 'Vui lòng chọn ảnh món ăn (trường "image").' });
    }
    if (!RECIPE_IMAGE_MIME_TYPES.includes(file.mimetype)) {
      throw new BadRequestException({ code: ErrorCode.UPLOAD_INVALID_FILE, message: 'Chỉ nhận ảnh JPG, PNG hoặc WEBP.' });
    }
    if (file.size > RECIPE_IMAGE_MAX_BYTES) {
      throw new BadRequestException({ code: ErrorCode.UPLOAD_INVALID_FILE, message: 'Ảnh tối đa 5 MB.' });
    }
  }
}
