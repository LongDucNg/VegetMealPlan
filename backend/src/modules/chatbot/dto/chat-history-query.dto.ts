import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class ChatHistoryQueryDto {
  @ApiPropertyOptional({ example: 1, description: 'Số trang cần lấy (mặc định 1)' })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Số trang phải là số nguyên' })
  @Min(1, { message: 'Số trang tối thiểu là 1' })
  page?: number = 1;

  @ApiPropertyOptional({ example: 20, description: 'Số lượng cuộc hội thoại trên mỗi trang (mặc định 20, tối đa 50)' })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Số lượng mỗi trang phải là số nguyên' })
  @Min(1, { message: 'Số lượng tối thiểu là 1' })
  @Max(50, { message: 'Số lượng tối đa là 50' })
  limit?: number = 20;
}
