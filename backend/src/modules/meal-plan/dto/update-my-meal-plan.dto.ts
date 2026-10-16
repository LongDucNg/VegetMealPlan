
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  MaxLength,
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  Min,
} from 'class-validator';
import { MealPlanStatus } from '../entities/meal-plan.entity';

export class UpdateMyMealPlanDto {
  @ApiPropertyOptional({
    example: 'Thực đơn tuần giảm cân',
    description: 'Tên thực đơn',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @ApiPropertyOptional({
    example: 2500,
    description: 'Lượng calories mục tiêu mỗi ngày',
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  target_calories_per_day?: number;

  @ApiPropertyOptional({
    example: true,
    description: 'Meal plan có sử dụng ngân sách hay không',
  })
  @IsOptional()
  @IsBoolean()
  has_budget?: boolean;

  @ApiPropertyOptional({
    enum: MealPlanStatus,
    description: 'Trạng thái meal plan',
  })
  @IsOptional()
  @IsEnum(MealPlanStatus)
  status?: MealPlanStatus;
}
