import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { DietType } from '../../users/entities/user.entity';
import { Difficulty } from '../entities/recipe.entity';

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
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  // instructions là NOT NULL trong DB (recipes.instructions text NOT NULL).
  // Để optional sẽ gây lỗi 500 khi thiếu trường -> bắt buộc + không rỗng.
  @IsString()
  @IsNotEmpty()
  instructions: string;

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
  @IsEnum(Difficulty)
  difficulty?: Difficulty;

  @IsOptional()
  @IsString()
  meal_type?: string;

  // Danh sách bữa ăn phù hợp, cách nhau dấu phẩy (vd. "lunch,dinner").
  // Bỏ trống thì suy ra từ meal_type theo mapping chuẩn.
  @IsOptional()
  @IsString()
  suitable_meals?: string;

  @IsOptional()
  @IsEnum(DietType)
  diet_type?: DietType;

  // source_video_id là INT trong DB (recipes.source_video_id int).
  // Để @IsString() sẽ nhận "abc" -> lỗi DB 500.
  @IsOptional()
  @IsInt()
  @Min(1)
  source_video_id?: number;

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