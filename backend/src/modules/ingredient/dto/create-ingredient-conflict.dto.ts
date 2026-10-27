import { IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';

/**
 * DTO cho POST /admin/ingredients/conflicts.
 *
 * Trước đây controller dùng object type inline
 * (`@Body() dto: { ingredient_id_1: number; ... }`) -> ValidationPipe KHÔNG
 * validate được (object type không có metadata) nên FE có thể gửi giá trị
 * rác và nhận lỗi 500 từ DB thay vì 400 rõ ràng.
 */
export class CreateIngredientConflictDto {
  @IsInt({ message: 'ingredient_id_1 phải là số nguyên.' })
  @Min(1, { message: 'ingredient_id_1 phải là số nguyên dương.' })
  ingredient_id_1: number;

  @IsInt({ message: 'ingredient_id_2 phải là số nguyên.' })
  @Min(1, { message: 'ingredient_id_2 phải là số nguyên dương.' })
  ingredient_id_2: number;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  reason?: string;
}
