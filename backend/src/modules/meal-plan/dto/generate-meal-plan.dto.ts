
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
  @IsNumber()
  @Min(1)
  total_budget?: number;
}
