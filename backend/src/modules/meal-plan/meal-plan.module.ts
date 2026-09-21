import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MealPlan } from './entities/meal-plan.entity';
import { WeeklyPlan } from './entities/weekly-plan.entity';
import { DailyMeal } from './entities/daily-meal.entity';
import { MealItem } from './entities/meal-item.entity';

// TODO: MealPlanService — tạo weekly plan từ danh sách AiRecommendation đã chọn,
// đọc user.bmi hiện tại để set bmi_snapshot lúc tạo (KHÔNG update lại sau đó).
@Module({
  imports: [TypeOrmModule.forFeature([MealPlan, WeeklyPlan, DailyMeal, MealItem])],
  exports: [TypeOrmModule],
})
export class MealPlanModule {}
