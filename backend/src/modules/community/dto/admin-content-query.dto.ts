import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { ContentStatus } from '../entities/blog.entity';

export class AdminContentQueryDto {
  @ApiPropertyOptional({ example: 'blog', description: "Loại nội dung: 'blog' (hiện chỉ hỗ trợ blog)" })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiPropertyOptional({ enum: ContentStatus, description: 'Lọc theo trạng thái nội dung' })
  @IsOptional()
  @IsEnum(ContentStatus)
  status?: ContentStatus;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({ example: 20, description: 'Tối đa 50' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit?: number;
}
