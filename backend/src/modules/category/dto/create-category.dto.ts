import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CategoryStatus } from '../entities/category.entity';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Món chính' })
  @IsString()
  @IsNotEmpty()
  category_name: string;

  @ApiPropertyOptional({ example: 'Các món ăn chính trong bữa' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'recipe_type', description: 'recipe_type hoặc food_type' })
  @IsOptional()
  @IsString()
  category_type?: string;

  @ApiPropertyOptional({ enum: CategoryStatus })
  @IsOptional()
  @IsEnum(CategoryStatus)
  status?: CategoryStatus;
}
