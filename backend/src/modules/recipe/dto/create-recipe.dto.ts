import {
  ArrayMinSize,
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
import { Type, Transform } from 'class-transformer';
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
  // Tên món không được rỗng/khoảng trắng. @Transform trim TRƯỚC khi validate
  // để "   " bị chặn (IsNotEmpty chỉ chặn chuỗi rỗng, không chặn khoảng trắng)
  // và tên được lưu chuẩn hoá.
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty({ message: 'Tên món không được để trống.' })
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

  // Công thức PHẢI có ít nhất 1 nguyên liệu. Không dùng @IsOptional() vì
  // món không có nguyên liệu thì không tính được dinh dưỡng/chi phí -> sinh
  // thực đơn hụt calo mà người dùng không biết. Import Excel cũng bắt buộc
  // >= 1 nguyên liệu -> hai luồng phải giống nhau.
  @IsArray()
  @ArrayMinSize(1, { message: 'Công thức phải có ít nhất 1 nguyên liệu.' })
  @ValidateNested({ each: true })
  @Type(() => CreateRecipeIngredientDto)
  ingredients: CreateRecipeIngredientDto[];

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  category_ids?: number[];
}