import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthGoal } from './entities/health-goal.entity';

// TODO: thêm Service + Controller khi cần CRUD quản lý goal từ Admin.
// Hiện tại module này chủ yếu export TypeOrmModule để UsersModule/MealPlanModule
// dùng HealthGoal làm FK reference.
@Module({
  imports: [TypeOrmModule.forFeature([HealthGoal])],
  exports: [TypeOrmModule],
})
export class HealthGoalModule {}
