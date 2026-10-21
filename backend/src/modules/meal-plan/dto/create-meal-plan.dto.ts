import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';

import { PlanType } from '../entities/meal-plan.entity';

export class CreateMealPlanDto {
  @IsOptional()
  @IsInt({ message: 'ID mục tiêu sức khỏe phải là số nguyên.' })
  @Min(1, { message: 'ID mục tiêu sức khỏe phải là số nguyên dương.' })
  goal_id?: number;

  @IsEnum(PlanType, { message: 'Loại kế hoạch không hợp lệ.' })
  plan_type: PlanType;

  @IsDateString({}, { message: 'Ngày bắt đầu không hợp lệ. Định dạng: YYYY-MM-DD.' })
  start_date: string;

  @IsDateString({}, { message: 'Ngày kết thúc không hợp lệ. Định dạng: YYYY-MM-DD.' })
  end_date: string;

  @IsOptional()
  @IsBoolean()
  has_budget?: boolean;

  @IsOptional()
  @IsNumber({}, { message: 'Tổng ngân sách phải là số hợp lệ.' })
  @Min(0, { message: 'Tổng ngân sách không được âm.' })
  total_budget?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Lượng calo mục tiêu mỗi ngày phải là số hợp lệ.' })
  @Min(0, { message: 'Lượng calo mục tiêu không được âm.' })
  target_calories_per_day?: number;
}
