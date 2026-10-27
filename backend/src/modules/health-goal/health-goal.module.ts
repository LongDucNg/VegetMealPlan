import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthGoal } from './entities/health-goal.entity';
import { HealthGoalService } from './health-goal.service';
import { HealthGoalController } from './health-goal.controller';

// Module này export TypeOrmModule để UsersModule/MealPlanModule dùng HealthGoal
// làm FK reference, cộng thêm Service (tự khởi tạo master data) + Controller
// để frontend lấy danh sách mục tiêu sức khoẻ.
@Module({
  imports: [TypeOrmModule.forFeature([HealthGoal])],
  controllers: [HealthGoalController],
  providers: [HealthGoalService],
  exports: [TypeOrmModule, HealthGoalService],
})
export class HealthGoalModule {}
