
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional, Min } from 'class-validator';

export class GenerateForSomeoneDto {
  @ApiProperty({
    example: 1,
    description: 'ID hồ sơ người thân trong bảng meal_plan_profiles',
  })
  @IsInt()
  @Min(1)
  profile_id: number;

  @ApiPropertyOptional({
    example: 700000,
    description: 'Tổng ngân sách cho thực đơn tuần (tùy chọn)',
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  total_budget?: number;
}
