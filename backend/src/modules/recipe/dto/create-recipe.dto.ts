import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRecipeIngredientDto {
  @IsInt()
  ingredient_id: number;

  @IsNumber()
  @Min(0)
  quantity: number;

  @IsString()
  unit: string;

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsBoolean()
  is_optional?: boolean;
}

export class CreateRecipeDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  instructions?: string;

  @IsOptional()
  @IsString()
  image_url?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  prep_time?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  cook_time?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  servings?: number;

  @IsOptional()
  @IsString()
  difficulty?: string;

  @IsOptional()
  @IsString()
  meal_type?: string;

  @IsOptional()
  @IsString()
  diet_type?: string;

  @IsOptional()
  @IsString()
  source_video_id?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  estimated_cost?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRecipeIngredientDto)
  ingredients?: CreateRecipeIngredientDto[];

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  category_ids?: number[];
}