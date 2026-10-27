import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateForumPostDto {
  @ApiPropertyOptional({ example: 'Tiêu đề bài viết sau khi sửa' })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  title?: string;

  @ApiPropertyOptional({ example: 'Nội dung bài viết mới có độ dài tối thiểu 10 ký tự...' })
  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(20000)
  content?: string;

  @ApiPropertyOptional({ description: 'category_id của danh mục diễn đàn' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  category_id?: number;

  @ApiPropertyOptional({ type: [String], example: ['món chay', 'dinh dưỡng'] })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(10)
  @IsString({ each: true })
  @MaxLength(30, { each: true })
  tags?: string[];
}
