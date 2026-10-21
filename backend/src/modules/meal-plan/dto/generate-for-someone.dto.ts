
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional, Min } from 'class-validator';

export class GenerateForSomeoneDto {
  @ApiProperty({
    example: 1,
    description: 'ID hồ sơ người thân trong bảng meal_plan_profiles',
  })
  @IsInt({ message: 'ID hồ sơ người thân phải là số nguyên.' })
  @Min(1, { message: 'ID hồ sơ người thân phải là số nguyên dương.' })
  profile_id: number;

  @ApiPropertyOptional({
    example: 700000,
    description: 'Tổng ngân sách cho thực đơn tuần (tùy chọn)',
  })
  @IsOptional()
  @IsNumber({}, { message: 'Tổng ngân sách phải là số hợp lệ.' })
  @Min(1, { message: 'Tổng ngân sách phải lớn hơn 0.' })
  total_budget?: number;
}
