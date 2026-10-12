
import { Type } from 'class-transformer';
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class QueryRecipeDto {
  // Tìm kiếm theo tên hoặc từ khóa
  @IsOptional()
  @IsString()
  q?: string;

  // Hợp đồng FE
  @IsOptional()
  @IsString()
  mealType?: string;

  @IsOptional()
  @IsString()
  vegetarianType?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  maxCalories?: number;

  // Danh sách ingredient ID cần loại trừ, ví dụ: 1,2,3
  @IsOptional()
  @IsString()
  excludeAllergens?: string;

  // Giữ tương thích với API cũ
  @IsOptional()
  @IsString()
  meal_type?: string;

  @IsOptional()
  @IsString()
  diet_type?: string;

  @IsOptional()
  @IsString()
  difficulty?: string;

  // Phân trang
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
