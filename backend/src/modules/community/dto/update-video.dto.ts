import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { VideoIngredientItemDto } from './create-video.dto';

export class UpdateVideoDto {
  @ApiPropertyOptional({ example: 'Đậu sốt nấm hương cập nhật', description: 'Tiêu đề video' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  title?: string;

  @ApiPropertyOptional({ example: 'Món xào & chiên giòn', description: 'Tên danh mục video' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  category?: string;

  @ApiPropertyOptional({ example: 'Mô tả mới', description: 'Mô tả chi tiết' })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  description?: string;

  @ApiPropertyOptional({ example: 'Việt Nam', description: 'Ẩm thực (cuisine)' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  cuisine?: string;

  @ApiPropertyOptional({ example: 'Medium', description: 'Độ khó' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  difficulty?: string;

  @ApiPropertyOptional({
    type: [VideoIngredientItemDto],
    description: 'Danh sách nguyên liệu (ít nhất 1, tối đa 50)',
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    }
    return value;
  })
  @IsArray({ message: 'Nguyên liệu phải là một mảng' })
  @ArrayMinSize(1, { message: 'Cần có ít nhất 1 nguyên liệu' })
  @ArrayMaxSize(50, { message: 'Tối đa 50 nguyên liệu' })
  ingredients?: VideoIngredientItemDto[];

  @ApiPropertyOptional({
    type: [String],
    description: 'Các bước thực hiện (ít nhất 1, tối đa 50)',
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    }
    return value;
  })
  @IsArray({ message: 'Các bước phải là một mảng' })
  @ArrayMinSize(1, { message: 'Cần có ít nhất 1 bước thực hiện' })
  @ArrayMaxSize(50, { message: 'Tối đa 50 bước' })
  steps?: string[];

  @ApiPropertyOptional({ example: 400, description: 'Lượng kcal' })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Kcal phải là số nguyên' })
  @Min(1, { message: 'Kcal phải lớn hơn 0' })
  @Max(5000, { message: 'Kcal tối đa 5000' })
  kcal?: number;

  @ApiPropertyOptional({ example: 2, description: 'Số khẩu phần' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  servings?: number;

  @ApiPropertyOptional({ example: '20 min', description: 'Thời lượng hoặc thời gian nấu' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  duration?: string;

  @ApiPropertyOptional({ example: 'https://example.com/thumb.jpg', description: 'Đường dẫn ảnh thumbnail' })
  @IsOptional()
  @IsString()
  thumbnail_url?: string;
}
