import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { RecommendationService } from './recommendation.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('recommendations')
@ApiBearerAuth() // guard JWT đã áp dụng toàn cục (APP_GUARD), decorator này chỉ để Swagger hiện ô token
@Controller('users/me/recommendations')
export class RecommendationController {
  constructor(private readonly service: RecommendationService) {}

  @Post('generate')
  generate(@CurrentUser('user_id') userId: number) {
    return this.service.generateForUser(userId);
  }

  @Get()
  findAll(@CurrentUser('user_id') userId: number) {
    return this.service.findAllByUser(userId);
  }
}