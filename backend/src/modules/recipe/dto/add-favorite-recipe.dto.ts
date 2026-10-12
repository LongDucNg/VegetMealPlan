import { Type } from 'class-transformer';
import {IsInt,IsNumber,IsOptional,IsString,
Min,
} from 'class-validator';

export class QueryRecipeDto {
  @IsOptional()
  @IsString()
  q?: string;

  @IsOptional()
  @IsString()
  mealType?: string;

  @IsOptional()
  @IsString()
  dietType?: string;

  @IsOptional()
  @IsString()
  difficulty?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;
}

export class RecommendationQueryDto {
  @IsOptional()
  @IsString()
  mealType?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  targetCalories?: number;

  @IsOptional()
  @IsString()
  ingredientIds?: string;

  @IsOptional()
  @IsString()
  excludeIngredientIds?: string;
}