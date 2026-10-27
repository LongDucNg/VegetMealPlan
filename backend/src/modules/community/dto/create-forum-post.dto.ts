import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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

export class CreateForumPostDto {
  @ApiProperty({ example: 'Cách làm đậu phụ sốt cà chua' })
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  title: string;

  @ApiProperty({ example: 'Mình hay nấu món này vào cuối tuần, công thức như sau...' })
  @IsString()
  @MinLength(10)
  @MaxLength(20000)
  content!: string;

  @ApiPropertyOptional({ description: 'category_id của danh mục diễn đàn' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  category_id?: number;

  @ApiPropertyOptional({ type: [String], example: ['đậu phụ', 'món chay'] })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(10)
  @IsString({ each: true })
  @MaxLength(30, { each: true })
  tags?: string[];
}