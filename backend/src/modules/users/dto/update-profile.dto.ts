import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, Max, Min, ValidateIf } from 'class-validator';
import { ActivityLevel, DietType } from '../entities/user.entity';
import { BODY_LIMITS } from '../body-limits';

export class UpdateProfileDto {
  @ApiPropertyOptional({ example: 'Nguyễn Văn A' })
  @IsOptional()
  @IsNotEmpty()
  full_name?: string;

  @ApiPropertyOptional({ example: 30 })
  @IsOptional()
  @IsInt()
  @Min(BODY_LIMITS.age.min, { message: `age phải từ ${BODY_LIMITS.age.min} trở lên` })
  @Max(BODY_LIMITS.age.max, { message: `age không được quá ${BODY_LIMITS.age.max}` })
  age?: number;

  @ApiPropertyOptional({ enum: ['male', 'female', 'other'] })
  @IsOptional()
  @IsIn(['male', 'female', 'other'])
  gender?: string;

  @ApiPropertyOptional({ example: 175, minimum: BODY_LIMITS.height_cm.min, maximum: BODY_LIMITS.height_cm.max })
  @IsOptional()
  @IsNumber()
  @Min(BODY_LIMITS.height_cm.min, { message: `height_cm phải từ ${BODY_LIMITS.height_cm.min} cm trở lên` })
  @Max(BODY_LIMITS.height_cm.max, { message: `height_cm không được quá ${BODY_LIMITS.height_cm.max} cm` })
  height_cm?: number;

  @ApiPropertyOptional({ example: 70, minimum: BODY_LIMITS.weight_kg.min, maximum: BODY_LIMITS.weight_kg.max })
  @IsOptional()
  @IsNumber()
  @Min(BODY_LIMITS.weight_kg.min, { message: `weight_kg phải từ ${BODY_LIMITS.weight_kg.min} kg trở lên` })
  @Max(BODY_LIMITS.weight_kg.max, { message: `weight_kg không được quá ${BODY_LIMITS.weight_kg.max} kg` })
  weight_kg?: number;

  @ApiPropertyOptional({ enum: ActivityLevel })
  @IsOptional()
  @IsEnum(ActivityLevel)
  activity_level?: ActivityLevel;

  @ApiPropertyOptional({ enum: DietType })
  @IsOptional()
  @IsEnum(DietType)
  diet_type?: DietType;

  @ApiPropertyOptional({ example: 1, description: 'goal_id trong bảng health_goals' })
  @IsOptional()
  @IsInt()
  current_goal_id?: number;

  // ---- Mục tiêu cụ thể (tuỳ chọn). Gửi null để xoá. ----
  @ApiPropertyOptional({ example: 65, nullable: true, description: 'Cân nặng muốn đạt (kg)' })
  @IsOptional()
  @ValidateIf((_, v) => v !== null)
  @IsNumber()
  @Min(BODY_LIMITS.weight_kg.min, { message: `target_weight_kg phải từ ${BODY_LIMITS.weight_kg.min} kg trở lên` })
  @Max(BODY_LIMITS.weight_kg.max, { message: `target_weight_kg không được quá ${BODY_LIMITS.weight_kg.max} kg` })
  target_weight_kg?: number | null;

  @ApiPropertyOptional({ example: '2027-01-31', nullable: true, description: 'Ngày muốn đạt mục tiêu (YYYY-MM-DD), phải sau hôm nay' })
  @IsOptional()
  @ValidateIf((_, v) => v !== null)
  @IsDateString({ strict: true }, { message: 'target_date phải có dạng YYYY-MM-DD' })
  target_date?: string | null;
}
