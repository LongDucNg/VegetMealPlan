import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HealthGoalService } from './health-goal.service';

@ApiTags('health-goals')
@ApiBearerAuth()
@Controller('health-goals')
export class HealthGoalController {
  constructor(private readonly healthGoalService: HealthGoalService) {}

  @Get()
  @ApiOperation({
    summary: 'Danh sách mục tiêu sức khoẻ (lose_weight / gain_muscle / maintain)',
    description:
      'Dùng để frontend hiển thị lựa chọn mục tiêu và gán `current_goal_id` khi cập nhật hồ sơ. ' +
      'Nếu bảng `health_goals` đang trống, hệ thống tự khởi tạo 3 mục tiêu chuẩn.',
  })
  findAll() {
    return this.healthGoalService.findAll();
  }
}
