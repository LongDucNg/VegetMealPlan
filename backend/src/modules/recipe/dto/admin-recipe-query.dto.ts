import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, Max, Min } from 'class-validator';
import { RecipeStatus } from '../entities/recipe.entity';

/**
 * Tham số lọc/phân trang cho GET /admin/recipes.
 * Trước đây controller nhận từng @Query dạng chuỗi rồi tự parseInt; nay ValidationPipe
 * kiểm tra và đổi kiểu ngay ở cửa vào, giống các API khác trong dự án.
 */
export class AdminRecipeQueryDto {
  @ApiPropertyOptional({ enum: RecipeStatus })
  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim().toLowerCase() : value))
  @IsIn(Object.values(RecipeStatus), { message: 'Trạng thái công thức không hợp lệ' })
  status?: RecipeStatus;

  @ApiPropertyOptional({ description: 'Lọc theo danh mục' })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'ID danh mục phải là số nguyên dương' })
  @Min(1, { message: 'ID danh mục phải là số nguyên dương' })
  category_id?: number;

  /** page/limit tuỳ chọn: có thì trả { data, pagination }, không có thì trả toàn bộ danh sách. */
  @ApiPropertyOptional({ minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Số trang phải là số nguyên dương' })
  @Min(1, { message: 'Số trang phải là số nguyên dương' })
  page?: number;

  @ApiPropertyOptional({ minimum: 1, maximum: 100 })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Số lượng công thức mỗi trang phải là số nguyên dương' })
  @Min(1, { message: 'Số lượng công thức mỗi trang phải là số nguyên dương' })
  @Max(100, { message: 'Số lượng công thức mỗi trang vượt quá giới hạn cho phép' })
  limit?: number;
}
