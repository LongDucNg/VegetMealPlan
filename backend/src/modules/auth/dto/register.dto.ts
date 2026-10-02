import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayUnique,
  IsArray,
  IsEmail,
  IsEnum,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import { ActivityLevel, DietType } from '../../users/entities/user.entity';
import { ALLERGEN_GROUP_CODES } from '../../users/allergen-groups';

export class RegisterDto {
  @IsNotEmpty()
  full_name: string;

  @IsEmail()
  email: string;

  @MinLength(8, { message: 'password phải từ 8 ký tự trở lên' })
  password: string;

  // ---- Hồ sơ (tuỳ chọn, có thể bổ sung sau qua PUT /users/me/profile) ----
  @ApiPropertyOptional({ enum: DietType })
  @IsOptional()
  @IsEnum(DietType)
  diet_type?: DietType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  current_goal_id?: number;

  @ApiPropertyOptional({ enum: ActivityLevel })
  @IsOptional()
  @IsEnum(ActivityLevel)
  activity_level?: ActivityLevel;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(5)
  @Max(120)
  age?: number;

  @ApiPropertyOptional({ enum: ['male', 'female', 'other'] })
  @IsOptional()
  @IsIn(['male', 'female', 'other'])
  gender?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @IsPositive()
  height_cm?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @IsPositive()
  weight_kg?: number;

  @ApiPropertyOptional({ description: `Nhóm dị ứng: ${ALLERGEN_GROUP_CODES.join(', ')}`, type: [String] })
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsIn(ALLERGEN_GROUP_CODES, { each: true })
  allergen_groups?: string[];

  @ApiPropertyOptional({ description: 'Dị ứng theo từng nguyên liệu (ingredient_id)', type: [Number] })
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsInt({ each: true })
  allergy_ingredient_ids?: number[];
}
