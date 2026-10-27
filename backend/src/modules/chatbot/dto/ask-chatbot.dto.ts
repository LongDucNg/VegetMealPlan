import { IsOptional, IsString, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class AskChatbotDto {
  @ApiPropertyOptional({
    description: 'Nội dung câu hỏi (chuẩn cũ)',
    example: 'Tối nay ăn gì?',
    maxLength: 500,
  })
  @IsOptional()
  @IsString({ message: 'Nội dung câu hỏi phải là chuỗi ký tự' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @MaxLength(500, { message: 'Nội dung câu hỏi không được vượt quá 500 ký tự' })
  question?: string;

  @ApiPropertyOptional({
    description: 'Nội dung câu hỏi (chuẩn mới)',
    example: 'Tối nay ăn gì?',
    maxLength: 500,
  })
  @IsOptional()
  @IsString({ message: 'Nội dung câu hỏi phải là chuỗi ký tự' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @MaxLength(500, { message: 'Nội dung câu hỏi không được vượt quá 500 ký tự' })
  message?: string;

  @ApiPropertyOptional({
    description: 'Mã phiên khách chưa đăng nhập',
    example: 'session-guest-123456',
  })
  @IsOptional()
  @IsString()
  session_id?: string;
}
