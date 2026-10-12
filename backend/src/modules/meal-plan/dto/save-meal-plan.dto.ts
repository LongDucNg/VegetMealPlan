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
  @IsInt()
  @Min(1)
  recipe_id: number;

  @IsOptional()
  @IsBoolean()
  is_ai_suggested?: boolean;

  @IsOptional()
  @IsBoolean()
  added_by_user?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(0.1)
  portion_multiplier?: number;
}

export class SaveDailyMealDto {
  @IsDateString()
  meal_date: string;

  @IsString()
  meal_type: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  target_calories?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SaveMealItemDto)
  meal_items: SaveMealItemDto[];
}

export class SaveWeeklyPlanDto {
  @IsInt()
  @Min(1)
  week_number: number;

  @IsDateString()
  start_date: string;

  @IsDateString()
  end_date: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  week_budget?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  week_calorie_target?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SaveDailyMealDto)
  daily_meals: SaveDailyMealDto[];
}

export class SaveMealPlanDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  goal_id?: number;

  @IsOptional()
  @IsEnum(PlanType)
  plan_type?: PlanType;

  @IsDateString()
  start_date: string;

  @IsDateString()
  end_date: string;

  @IsOptional()
  @IsBoolean()
  has_budget?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(0)
  total_budget?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  target_calories_per_day?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SaveWeeklyPlanDto)
  weekly_plans?: SaveWeeklyPlanDto[];
}