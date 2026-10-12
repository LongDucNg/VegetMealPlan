
import {
  IsArray,
  IsDateString,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ValidateMealItemDto {
  @IsInt()
  @IsPositive()
  recipe_id: number;

  @IsInt()
  @Min(1)
  servings: number;
}

export class ValidateMealDayDto {
  @IsDateString()
  date: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ValidateMealItemDto)
  meals: ValidateMealItemDto[];
}

export class ValidateMealPlanDto {
  @IsOptional()
  @IsString()
  plan_name?: string;

  @IsDateString()
  start_date: string;

  @IsDateString()
  end_date: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ValidateMealDayDto)
  days: ValidateMealDayDto[];
}
