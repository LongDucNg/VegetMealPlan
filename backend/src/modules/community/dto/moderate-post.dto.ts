import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString, MaxLength } from 'class-validator';

export class ModeratePostDto {
  @ApiProperty({
    example: 'approve',
    enum: ['approve', 'reject'],
    description: 'Hành động duyệt (approve) hoặc từ chối (reject)',
  })
  @IsIn(['approve', 'reject'], {
    message: "Hành động phải là 'approve' hoặc 'reject'",
  })
  action!: 'approve' | 'reject';

  @ApiPropertyOptional({
    example: 'Nội dung chứa từ khóa không phù hợp với diễn đàn ăn chay',
    description: 'Lý do từ chối (bắt buộc khi action là reject, từ 5 đến 500 ký tự)',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  reason?: string;
}
