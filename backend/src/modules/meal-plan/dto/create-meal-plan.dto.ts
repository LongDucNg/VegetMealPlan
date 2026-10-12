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
  @IsInt()
  goal_id?: number;

  @IsEnum(PlanType)
  plan_type: PlanType;

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
}