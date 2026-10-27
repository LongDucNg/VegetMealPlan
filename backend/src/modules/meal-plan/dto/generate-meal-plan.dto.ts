import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min } from 'class-validator';
import { WeightGoalDto } from '../../users/dto/weight-goal.dto';

/**
 * DTO cho POST /meal-plans/generate/weekly và /generate/monthly.
 *
 * Ngoài ngân sách, client có thể gửi mục tiêu cân nặng để thực đơn được sinh
 * theo kcal mục tiêu đó. Nếu không gửi, server dùng mục tiêu cân nặng đã lưu
 * trong hồ sơ (users.target_weight_kg / target_date); nếu hồ sơ cũng không có
 * thì dùng công thức kcal theo mục tiêu sức khoẻ đang chọn.
 */
export class GenerateMealPlanDto extends WeightGoalDto {
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
