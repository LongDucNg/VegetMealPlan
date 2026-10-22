
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';

export class GenerateMealPlanDto {
  @ApiPropertyOptional({
    example: 700000,
    description:
      'Tổng ngân sách cho toàn bộ thực đơn tuần hoặc tháng',
  })
  @IsOptional()
  @IsNumber({}, { message: 'Tổng ngân sách phải là số hợp lệ.' })
  @Min(1, { message: 'Tổng ngân sách phải lớn hơn 0.' })
  total_budget?: number;
}
