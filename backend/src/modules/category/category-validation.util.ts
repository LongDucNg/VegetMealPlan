import { BadRequestException } from '@nestjs/common';
import { Category, RECIPE_CATEGORY_TYPES } from './entities/category.entity';
import { ErrorCode } from '../../common/constants/error-codes.enum';

/**
 * Kiểm tra danh sách category_id trước khi ghi vào bảng recipe_categories.
 *
 * Quy ước dữ liệu (xem seed-vegetarian-data.ts + các migration FixBe2..FixBe5):
 * mỗi công thức có đúng 1 danh mục recipe_type và 1 danh mục food_type.
 * Danh mục loại khác (ví dụ 'forum' của module cộng đồng) KHÔNG được gắn cho công thức.
 *
 * Hàm này ném BadRequestException nếu:
 *   - có id không tồn tại trong bảng categories;
 *   - có id thuộc loại không hợp lệ để gắn cho công thức.
 *
 * Dùng chung cho: POST /recipes, PUT /recipes/:id và import công thức, để cả 3
 * luồng báo lỗi giống nhau thay vì âm thầm bỏ qua danh mục không hợp lệ.
 */
export function assertValidRecipeCategoryIds(
  requestedIds: number[],
  foundCategories: Category[],
): void {
  const foundIds = new Set(foundCategories.map((c) => c.category_id));

  const missing = requestedIds.filter((id) => !foundIds.has(id));
  if (missing.length > 0) {
    throw new BadRequestException({
      code: ErrorCode.CATEGORY_ID_NOT_FOUND,
      message: `Danh mục không tồn tại: ${missing.join(', ')}`,
    });
  }

  const wrongType = foundCategories.filter(
    (c) => !RECIPE_CATEGORY_TYPES.includes(c.category_type),
  );
  if (wrongType.length > 0) {
    throw new BadRequestException({
      code: ErrorCode.CATEGORY_TYPE_INVALID,
      message:
        `Danh mục không thể gắn cho công thức (chỉ nhận recipe_type hoặc food_type): ` +
        wrongType.map((c) => `#${c.category_id} ${c.category_name}`).join(', '),
    });
  }
}
