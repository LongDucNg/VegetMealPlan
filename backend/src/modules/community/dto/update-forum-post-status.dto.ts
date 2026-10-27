import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { ContentStatus } from '../entities/blog.entity';

export class UpdateForumPostStatusDto {
  @ApiProperty({
    enum: ContentStatus,
    example: ContentStatus.APPROVED,
    description: 'Trạng thái mới: approved (duyệt), rejected (từ chối), removed (gỡ bỏ), pending_review (chờ duyệt)',
  })
  @IsEnum(ContentStatus)
  status!: ContentStatus;
}
