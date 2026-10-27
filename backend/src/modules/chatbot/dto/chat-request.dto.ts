import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ChatRequestDto {
  @ApiProperty({
    description: 'Nội dung câu hỏi của người dùng (tối đa 500 ký tự sau khi bỏ khoảng trắng thừa)',
    example: 'Tối nay tôi nên nấu món chay gì nhanh và đủ đạm?',
    maxLength: 500,
  })
  @IsString({ message: 'Nội dung câu hỏi phải là chuỗi ký tự' })
  @IsNotEmpty({ message: 'Nội dung câu hỏi không được để trống' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @MaxLength(500, { message: 'Nội dung câu hỏi không được vượt quá 500 ký tự' })
  message: string;

  @ApiPropertyOptional({
    description: 'Mã phiên cho khách chưa đăng nhập (bắt buộc nếu không có Bearer token)',
    example: 'session-guest-123456',
  })
  @IsOptional()
  @IsString({ message: 'session_id phải là chuỗi ký tự' })
  session_id?: string;
}
