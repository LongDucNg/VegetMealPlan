import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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

// Ba trường bắt buộc phải có @ApiProperty: Swagger chỉ liệt kê field có decorator, thiếu thì ví dụ
// trên /api/docs không hiện full_name/email/password và người test không biết phải nhập gì.
export class RegisterDto {
  @ApiProperty({ example: 'Nguyễn Văn A' })
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({ example: 'nguyenvana@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'matkhau123', minLength: 8 })
  @MinLength(8, { message: 'password phải từ 8 ký tự trở lên' })
  password: string;

  // ---- Hồ sơ (tuỳ chọn, có thể bổ sung sau qua PUT /users/me/profile) ----
  @ApiPropertyOptional({ enum: DietType })
  @IsOptional()
  @IsEnum(DietType)
  diet_type?: DietType;

  @ApiPropertyOptional({ example: 1, description: 'goal_id trong bảng health_goals: 1 giảm cân, 2 tăng cơ, 3 duy trì' })
  @IsOptional()
  @IsInt()
  current_goal_id?: number;

  @ApiPropertyOptional({ enum: ActivityLevel })
  @IsOptional()
  @IsEnum(ActivityLevel)
  activity_level?: ActivityLevel;

  @ApiPropertyOptional({ example: 30 })
  @IsOptional()
  @IsInt()
  @Min(5)
  @Max(120)
  age?: number;

  @ApiPropertyOptional({ enum: ['male', 'female', 'other'] })
  @IsOptional()
  @IsIn(['male', 'female', 'other'])
  gender?: string;

  @ApiPropertyOptional({ example: 175 })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  height_cm?: number;

  @ApiPropertyOptional({ example: 70 })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  weight_kg?: number;

  @ApiPropertyOptional({ description: `Nhóm dị ứng: ${ALLERGEN_GROUP_CODES.join(', ')}`, type: [String], example: ['SOY'] })
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsIn(ALLERGEN_GROUP_CODES, { each: true })
  allergen_groups?: string[];

  @ApiPropertyOptional({ description: 'Dị ứng theo từng nguyên liệu (ingredient_id)', type: [Number], example: [] })
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsInt({ each: true })
  allergy_ingredient_ids?: number[];
}
