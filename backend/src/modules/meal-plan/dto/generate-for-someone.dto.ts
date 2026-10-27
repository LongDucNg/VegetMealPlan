import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayUnique,
  IsArray,
  IsEnum,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { DietType } from '../../users/entities/user.entity';
import { ALLERGEN_GROUP_CODES } from '../../users/allergen-groups';

/**
 * Sinh thực đơn cho người thân, KHÔNG lưu vào database.
 *
 * Toàn bộ thông tin đối tượng đều do client gửi lên trong request:
 * tên hiển thị, chế độ ăn, calo mục tiêu và danh sách nguyên liệu dị ứng.
 * Backend dùng các thông tin này để chọn món rồi trả thực đơn về response.
 */
export class GenerateForSomeoneDto {
  @ApiPropertyOptional({
    example: 'Mẹ',
    description: 'Tên hiển thị của người thân (tuỳ chọn)',
  })
  @IsOptional()
  @IsString({ message: 'Tên người thân phải là chuỗi.' })
  @MaxLength(120, { message: 'Tên người thân không được quá 120 ký tự.' })
  profile_name?: string;

  @ApiPropertyOptional({
    example: DietType.VEGAN,
    enum: DietType,
    description:
      'Chế độ ăn của người thân. Bỏ trống thì mặc định thuần chay (nghiêm ngặt nhất).',
  })
  @IsOptional()
  @IsEnum(DietType, {
    message:
      'Chế độ ăn không hợp lệ. Chỉ chấp nhận: vegan, lacto, ovo hoặc ovo_lacto.',
  })
  diet_type?: DietType;

  @ApiPropertyOptional({
    example: 1800,
    description:
      'Calo mục tiêu mỗi ngày của người thân (tuỳ chọn)',
  })
  @IsOptional()
  @IsNumber({}, { message: 'Calo mục tiêu phải là số hợp lệ.' })
  @Min(800, { message: 'Calo mục tiêu phải ít nhất là 800 kcal.' })
  @Max(5000, { message: 'Calo mục tiêu không được vượt quá 5000 kcal.' })
  target_calories?: number;

  @ApiPropertyOptional({
    example: ['PEANUT', 'DAIRY'],
    description:
      'Nhóm dị ứng của người thân (tuỳ chọn). Dùng cho modal chọn dị ứng theo nhóm.',
  })
  @IsOptional()
  @IsArray({ message: 'Danh sách nhóm dị ứng phải là một mảng.' })
  @ArrayUnique({
    message: 'Danh sách nhóm dị ứng không được chứa giá trị trùng lặp.',
  })
  @IsIn(ALLERGEN_GROUP_CODES, {
    each: true,
    message: `Nhóm dị ứng không hợp lệ. Chỉ chấp nhận: ${ALLERGEN_GROUP_CODES.join(', ')}.`,
  })
  allergen_groups?: string[];

  @ApiPropertyOptional({
    example: [49, 50],
    description:
      'Danh sách ingredient_id gây dị ứng cho người thân (tuỳ chọn)',
  })
  @IsOptional()
  @IsArray({ message: 'Danh sách dị ứng phải là một mảng.' })
  @ArrayUnique({
    message: 'Danh sách dị ứng không được chứa giá trị trùng lặp.',
  })
  @IsInt({ each: true, message: 'Mỗi ID nguyên liệu phải là số nguyên.' })
  @Min(1, { each: true, message: 'Mỗi ID nguyên liệu phải là số nguyên dương.' })
  allergy_ids?: number[];

  @ApiPropertyOptional({
    example: 700000,
    description: 'Tổng ngân sách cho thực đơn tuần (tùy chọn)',
  })
  @IsOptional()
  @IsNumber({}, { message: 'Tổng ngân sách phải là số hợp lệ.' })
  @Min(1, { message: 'Tổng ngân sách phải lớn hơn 0.' })
  total_budget?: number;
}
