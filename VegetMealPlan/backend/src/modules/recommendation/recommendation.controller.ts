import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RecommendationService } from './recommendation.service';

@ApiTags('recommendations')
@Controller('users/:userId/recommendations')
export class RecommendationController {
  constructor(private readonly service: RecommendationService) {}

  @Post('generate')
  generate(@Param('userId', ParseIntPipe) userId: number) {
    return this.service.generateForUser(userId);
  }

  @Get()
  findAll(@Param('userId', ParseIntPipe) userId: number) {
    return this.service.findAllByUser(userId);
  }
}
