import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { RecommendationService } from './recommendation.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { WeightGoalDto } from '../users/dto/weight-goal.dto';

@ApiTags('recommendations')
@ApiBearerAuth() // guard JWT đã áp dụng toàn cục (APP_GUARD), decorator này chỉ để Swagger hiện ô token
@Controller('users/me/recommendations')
export class RecommendationController {
  constructor(private readonly service: RecommendationService) {}

  @Post('generate')
  @ApiOperation({
    summary: 'Sinh gợi ý món ăn theo tủ lạnh, chế độ ăn và mục tiêu cân nặng',
    description:
      'Gửi kèm mục tiêu cân nặng (current_weight_kg, target_weight_kg, duration_days, direction) ' +
      'để hệ thống tính kcal mục tiêu và kiểm tra an toàn. Mục tiêu không an toàn sẽ trả lỗi ' +
      'WEIGHT_GOAL_UNSAFE và KHÔNG tạo gợi ý nào.',
  })
  generate(@CurrentUser('user_id') userId: number, @Body() dto: WeightGoalDto) {
    return this.service.generateForUser(userId, dto);
  }

  @Get()
  findAll(@CurrentUser('user_id') userId: number) {
    return this.service.findAllByUser(userId);
  }
}
