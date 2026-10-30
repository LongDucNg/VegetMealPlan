import { Type, Transform } from 'class-transformer';
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
import { DietType } from '../../users/entities/user.entity';
import { Difficulty } from '../entities/recipe.entity';

export class UpdateRecipeIngredientDto {
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

export class UpdateRecipeDto {
  // Khi có gửi title thì không được rỗng/khoảng trắng (đã trim trước khi validate).
  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty({ message: 'Tên món không được để trống.' })
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  // Khi có gửi instructions thì không được rỗng (DB là NOT NULL).
  @IsOptional()
  @IsString()
  @IsNotEmpty()
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

  @IsOptional()
  @IsString()
  video_url?: string;

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
  @Type(() => UpdateRecipeIngredientDto)
  ingredients?: UpdateRecipeIngredientDto[];

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  category_ids?: number[];
}