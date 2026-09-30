import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MealPlan } from './entities/meal-plan.entity';
import { WeeklyPlan } from './entities/weekly-plan.entity';
import { DailyMeal } from './entities/daily-meal.entity';
import { MealItem } from './entities/meal-item.entity';
import { MealPlanProfile } from './entities/meal-plan-profile.entity';

// TODO: MealPlanService — tao weekly plan tu danh sach AiRecommendation da chon,
// doc user.bmi (hoac target_profile.bmi neu lap cho nguoi khac) de set bmi_snapshot
// luc tao (KHONG update lai sau do). Tao WeeklyPlan.start_date/end_date snap theo
// lich duong T2-CN (tuan dau co the ngan hon 7 ngay neu tao giua tuan).
@Module({
  imports: [
    TypeOrmModule.forFeature([MealPlan, WeeklyPlan, DailyMeal, MealItem, MealPlanProfile]),
  ],
  exports: [TypeOrmModule],
})
export class MealPlanModule {}
