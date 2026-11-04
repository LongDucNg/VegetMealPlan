import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { ContentStatus } from '../entities/blog.entity';

export class UpdateContentStatusDto {
  @ApiProperty({
    enum: ContentStatus,
    example: ContentStatus.APPROVED,
    description: 'Trạng thái mới: approved, rejected, hoặc removed',
  })
  @IsEnum(ContentStatus)
  status!: ContentStatus;

  @ApiPropertyOptional({
    example: 'Nội dung vi phạm quy định cộng đồng',
    description: 'Lý do từ chối hoặc gỡ bỏ (bắt buộc khi status là rejected hoặc removed, từ 5 đến 500 ký tự)',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  reason?: string;
}
