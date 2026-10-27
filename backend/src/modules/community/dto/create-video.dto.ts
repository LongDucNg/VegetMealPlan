import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class VideoIngredientItemDto {
  @ApiProperty({ example: 'Đậu phụ non' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name!: string;

  @ApiPropertyOptional({ example: '300g' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  amount?: string;
}

export class CreateVideoDto {
  @ApiProperty({ example: 'Đậu sốt nấm hương thanh đạm', description: 'Tiêu đề video' })
  @IsString()
  @IsNotEmpty({ message: 'Tiêu đề video không được để trống' })
  @MaxLength(200, { message: 'Tiêu đề video tối đa 200 ký tự' })
  title!: string;

  @ApiProperty({ example: 'Món xào & chiên giòn', description: 'Tên danh mục video' })
  @IsString()
  @IsNotEmpty({ message: 'Danh mục video không được để trống' })
  @MaxLength(100)
  category!: string;

  @ApiPropertyOptional({ example: 'Món ăn thanh đạm, dễ làm cho bữa tối.', description: 'Mô tả chi tiết' })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  description?: string;

  @ApiPropertyOptional({ example: 'Việt Nam', description: 'Ẩm thực (cuisine)' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  cuisine?: string;

  @ApiPropertyOptional({
    example: 'Easy',
    description: 'Độ khó: Easy | Medium | Advanced hoặc Dễ | Trung bình | Khó',
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  difficulty?: string;

  @ApiProperty({
    type: [VideoIngredientItemDto],
    description: 'Danh sách nguyên liệu (ít nhất 1, tối đa 50)',
    example: [{ name: 'Đậu phụ', amount: '2 bìa' }],
  })
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
  ingredients!: VideoIngredientItemDto[];

  @ApiProperty({
    type: [String],
    description: 'Các bước thực hiện (ít nhất 1, tối đa 50)',
    example: ['Cắt đậu thành miếng vừa ăn', 'Phi thơm nấm và xào cùng đậu'],
  })
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
  steps!: string[];

  @ApiProperty({ example: 450, description: 'Lượng kcal (số nguyên > 0, tối đa 5000)' })
  @Type(() => Number)
  @IsInt({ message: 'Kcal phải là số nguyên' })
  @Min(1, { message: 'Kcal phải lớn hơn 0' })
  @Max(5000, { message: 'Kcal tối đa 5000' })
  kcal!: number;

  @ApiPropertyOptional({ example: 2, description: 'Số khẩu phần (mặc định 1)' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  servings?: number;

  @ApiPropertyOptional({ example: '15 min', description: 'Thời lượng hoặc thời gian nấu' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  duration?: string;
}
