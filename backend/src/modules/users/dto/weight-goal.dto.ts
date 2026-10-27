import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsInt, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { BODY_LIMITS } from '../body-limits';

/**
 * Mục tiêu cân nặng do người dùng nhập.
 *
 * Dùng cho POST /users/me/recommendations/generate và POST /meal-plans/generate/*.
 * Chiều cao, tuổi, giới tính và mức vận động lấy từ hồ sơ (users) — không nhập ở đây.
 */
export class WeightGoalDto {
  @ApiPropertyOptional({ example: 70, minimum: BODY_LIMITS.weight_kg.min, maximum: BODY_LIMITS.weight_kg.max })
  @IsOptional()
  @IsNumber({}, { message: 'Cân nặng hiện tại phải là số hợp lệ.' })
  @Min(BODY_LIMITS.weight_kg.min, { message: `Cân nặng hiện tại phải từ ${BODY_LIMITS.weight_kg.min} kg trở lên.` })
  @Max(BODY_LIMITS.weight_kg.max, { message: `Cân nặng hiện tại không được quá ${BODY_LIMITS.weight_kg.max} kg.` })
  current_weight_kg?: number;

  @ApiPropertyOptional({ example: 65, minimum: BODY_LIMITS.weight_kg.min, maximum: BODY_LIMITS.weight_kg.max })
  @IsOptional()
  @IsNumber({}, { message: 'Cân nặng mục tiêu phải là số hợp lệ.' })
  @Min(BODY_LIMITS.weight_kg.min, { message: `Cân nặng mục tiêu phải từ ${BODY_LIMITS.weight_kg.min} kg trở lên.` })
  @Max(BODY_LIMITS.weight_kg.max, { message: `Cân nặng mục tiêu không được quá ${BODY_LIMITS.weight_kg.max} kg.` })
  target_weight_kg?: number;

  @ApiPropertyOptional({ example: 56, description: 'Số ngày để đạt mục tiêu (1 ngày = 1, 1 tuần = 7, 1 tháng ≈ 30).' })
  @IsOptional()
  @IsInt({ message: 'Thời gian đạt mục tiêu phải là số nguyên số ngày.' })
  @Min(1, { message: 'Thời gian đạt mục tiêu phải ít nhất 1 ngày.' })
  @Max(3650, { message: 'Thời gian đạt mục tiêu không được quá 3650 ngày.' })
  duration_days?: number;

  @ApiPropertyOptional({
    enum: ['lose_weight', 'gain_muscle', 'maintain'],
    description:
      'Hướng mục tiêu: giảm cân, tăng cân hoặc duy trì. ' +
      'Duy trì (maintain) -> kcal mục tiêu = TDEE, không thâm hụt, không thặng dư.',
  })
  @IsOptional()
  @IsIn(['lose_weight', 'gain_muscle', 'maintain'], {
    message:
      'Hướng mục tiêu phải là lose_weight (giảm cân), gain_muscle (tăng cân) hoặc maintain (duy trì).',
  })
  direction?: 'lose_weight' | 'gain_muscle' | 'maintain';
}
