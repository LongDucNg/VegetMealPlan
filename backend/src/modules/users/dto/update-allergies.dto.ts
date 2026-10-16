import { ApiPropertyOptional } from '@nestjs/swagger';
import { ArrayUnique, IsArray, IsIn, IsInt, IsOptional } from 'class-validator';
import { ALLERGEN_GROUP_CODES } from '../allergen-groups';

/** Thay TOÀN BỘ danh sách dị ứng của user bằng tập này (gửi mảng rỗng để xoá hết). */
export class UpdateAllergiesDto {
  @ApiPropertyOptional({ type: [String], description: ALLERGEN_GROUP_CODES.join(', '), example: ['SOY', 'PEANUT'] })
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsIn(ALLERGEN_GROUP_CODES, { each: true })
  allergen_groups?: string[];

  @ApiPropertyOptional({ type: [Number], example: [] })
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsInt({ each: true })
  ingredient_ids?: number[];
}
