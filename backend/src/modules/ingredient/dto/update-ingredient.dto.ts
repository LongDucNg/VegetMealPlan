import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

import { IngredientStatus } from '../entities/ingredient.entity';

export class UpdateIngredientDto {
  @IsOptional()
  @IsString()
  ingredient_name?: string;

  @IsOptional()
  @IsString()
  unit?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  vegan_flag?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(0)
  avg_price_per_unit?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  calories_per_100g?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  protein_per_100g?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  carb_per_100g?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  fat_per_100g?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  fiber_per_100g?: number;

  @IsOptional()
  @IsBoolean()
  is_seasonal?: boolean;

  @IsOptional()
  @IsString()
  season_months?: string;

  @IsOptional()
  @IsEnum(IngredientStatus)
  status?: IngredientStatus;
}