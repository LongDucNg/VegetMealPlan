import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PlanType } from '../entities/meal-plan.entity';

export class SaveMealItemDto {
  @IsInt({ message: 'ID công thức phải là số nguyên.' })
  @Min(1, { message: 'ID công thức phải là số nguyên dương.' })
  recipe_id: number;

  @IsOptional()
  @IsBoolean()
  is_ai_suggested?: boolean;

  @IsOptional()
  @IsBoolean()
  added_by_user?: boolean;

  @IsOptional()
  @IsNumber({}, { message: 'Tỷ lệ khẩu phần phải là số hợp lệ.' })
  @Min(0.1, { message: 'Tỷ lệ khẩu phần phải lớn hơn 0.' })
  portion_multiplier?: number;
}

export class SaveDailyMealDto {
  @IsDateString({}, { message: 'Ngày ăn không hợp lệ. Định dạng: YYYY-MM-DD.' })
  meal_date: string;

  @IsString({ message: 'Loại bữa ăn phải là chuỗi ký tự.' })
  meal_type: string;

  @IsOptional()
  @IsNumber({}, { message: 'Lượng calo mục tiêu phải là số hợp lệ.' })
  @Min(0, { message: 'Lượng calo mục tiêu không được âm.' })
  target_calories?: number;

  @IsArray({ message: 'Danh sách món ăn phải là một mảng.' })
  @ValidateNested({ each: true })
  @Type(() => SaveMealItemDto)
  meal_items: SaveMealItemDto[];
}

export class SaveWeeklyPlanDto {
  @IsInt({ message: 'Số tuần phải là số nguyên.' })
  @Min(1, { message: 'Số tuần phải là số nguyên dương.' })
  week_number: number;

  @IsDateString({}, { message: 'Ngày bắt đầu tuần không hợp lệ. Định dạng: YYYY-MM-DD.' })
  start_date: string;

  @IsDateString({}, { message: 'Ngày kết thúc tuần không hợp lệ. Định dạng: YYYY-MM-DD.' })
  end_date: string;

  @IsOptional()
  @IsNumber({}, { message: 'Ngân sách tuần phải là số hợp lệ.' })
  @Min(0, { message: 'Ngân sách tuần không được âm.' })
  week_budget?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Lượng calo tuần phải là số hợp lệ.' })
  @Min(0, { message: 'Lượng calo tuần không được âm.' })
  week_calorie_target?: number;

  @IsArray({ message: 'Danh sách ngày ăn phải là một mảng.' })
  @ValidateNested({ each: true })
  @Type(() => SaveDailyMealDto)
  daily_meals: SaveDailyMealDto[];
}

export class SaveMealPlanDto {
  @IsOptional()
  @IsInt({ message: 'ID mục tiêu sức khỏe phải là số nguyên.' })
  @Min(1, { message: 'ID mục tiêu sức khỏe phải là số nguyên dương.' })
  goal_id?: number;

  @IsOptional()
  @IsEnum(PlanType, { message: 'Loại kế hoạch không hợp lệ.' })
  plan_type?: PlanType;

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

  @IsOptional()
  @IsArray({ message: 'Danh sách tuần phải là một mảng.' })
  @ValidateNested({ each: true })
  @Type(() => SaveWeeklyPlanDto)
  weekly_plans?: SaveWeeklyPlanDto[];
}