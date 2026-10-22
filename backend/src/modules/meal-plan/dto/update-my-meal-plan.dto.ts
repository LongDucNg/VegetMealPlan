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
  @IsString({ message: 'Tên thực đơn phải là chuỗi ký tự.' })
  @MaxLength(100, { message: 'Tên thực đơn không được quá 100 ký tự.' })
  name?: string;

  @ApiPropertyOptional({
    example: 2500,
    description: 'Lượng calories mục tiêu mỗi ngày',
  })
  @IsOptional()
  @IsInt({ message: 'Lượng calo mục tiêu phải là số nguyên.' })
  @Min(1, { message: 'Lượng calo mục tiêu phải lớn hơn 0.' })
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
  @IsEnum(MealPlanStatus, { message: 'Trạng thái thực đơn không hợp lệ.' })
  status?: MealPlanStatus;
}
