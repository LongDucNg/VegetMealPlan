import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';

export class VideoQueryDto {
  @ApiPropertyOptional({ example: 1, description: 'Số trang (bắt đầu từ 1)' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({ example: 20, description: 'Số lượng mục trên mỗi trang (mặc định 20, tối đa 50)' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit?: number;

  @ApiPropertyOptional({ description: 'Lọc theo tên danh mục video (chuỗi)' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  category?: string;

  @ApiPropertyOptional({ description: 'Tìm kiếm trong tiêu đề và mô tả video' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  q?: string;

  @ApiPropertyOptional({
    enum: ['trending', 'newest', 'rating'],
    default: 'newest',
    description: 'Sắp xếp: trending | newest | rating',
  })
  @IsOptional()
  @IsIn(['trending', 'newest', 'rating'])
  sort?: 'trending' | 'newest' | 'rating';
}
