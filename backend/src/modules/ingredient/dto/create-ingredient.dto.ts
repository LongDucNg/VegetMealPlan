import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

import { IngredientStatus } from '../entities/ingredient.entity';

export class CreateIngredientDto {
  @IsString()
  @IsNotEmpty({ message: 'Tên nguyên liệu không được để trống.' })
  @MaxLength(255, { message: 'Tên nguyên liệu không được vượt quá 255 ký tự.' })
  ingredient_name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  unit: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  vegan_flag?: boolean;

  @IsPositive()
  avg_price_per_unit: number;

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