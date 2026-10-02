import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, Max, Min } from 'class-validator';
import { ActivityLevel, DietType } from '../entities/user.entity';

export class UpdateProfileDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  full_name?: string;

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
  @IsPositive({ message: 'height_cm phải lớn hơn 0' })
  height_cm?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @IsPositive({ message: 'weight_kg phải lớn hơn 0' })
  weight_kg?: number;

  @ApiPropertyOptional({ enum: ActivityLevel })
  @IsOptional()
  @IsEnum(ActivityLevel)
  activity_level?: ActivityLevel;

  @ApiPropertyOptional({ enum: DietType })
  @IsOptional()
  @IsEnum(DietType)
  diet_type?: DietType;

  @ApiPropertyOptional({ description: 'goal_id trong bảng health_goals' })
  @IsOptional()
  @IsInt()
  current_goal_id?: number;
}
