import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { CategoryStatus, CategoryType } from '../entities/category.entity';
import { IsNotBlank } from './validators/is-not-blank.validator';
import { IsVietnameseName } from './validators/is-vietnamese-name.validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Món chính' })
  @IsString({ message: 'Tên danh mục phải là chuỗi' })
  @IsVietnameseName({ message: 'Tên danh mục chỉ được chứa chữ cái, khoảng trắng và dấu phân cách (&, /, -, ., \', (), )' })
  @IsNotBlank({ message: 'Tên danh mục không được để trống' })
  @MaxLength(255, { message: 'Tên danh mục vượt quá độ dài cho phép' })
  category_name: string;

  @ApiPropertyOptional({ example: 'Các món ăn chính trong bữa' })
  @IsOptional()
  @IsString({ message: 'Mô tả phải là chuỗi' })
  @MaxLength(1000, { message: 'Mô tả vượt quá độ dài cho phép' })
  description?: string;

  @ApiPropertyOptional({ example: 'recipe_type', description: 'recipe_type hoặc food_type' })
  @IsOptional()
  @IsEnum(CategoryType, { message: 'Loại danh mục không hợp lệ' })
  category_type?: CategoryType;

  @ApiPropertyOptional({ enum: CategoryStatus })
  @IsOptional()
  @IsEnum(CategoryStatus, { message: 'Trạng thái danh mục không hợp lệ' })
  status?: CategoryStatus;
}
