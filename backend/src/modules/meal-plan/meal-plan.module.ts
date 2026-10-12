import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MealPlan } from './entities/meal-plan.entity';
import { WeeklyPlan } from './entities/weekly-plan.entity';
import { DailyMeal } from './entities/daily-meal.entity';
import { MealItem } from './entities/meal-item.entity';
import { MealPlanProfile } from './entities/meal-plan-profile.entity';
import { ProfileAllergy } from './entities/profile-allergy.entity';

import { Recipe } from '../recipe/entities/recipe.entity';
import { RecipeIngredient } from '../recipe/entities/recipe-ingredient.entity';
import { NutritionInfo } from '../nutrition/entities/nutrition-info.entity';
import { User } from '../users/entities/user.entity';
import { UserAllergy } from '../ingredient/entities/user-allergy.entity';

import { SubscriptionModule } from '../subscription/subscription.module';

import { MealPlanController } from './meal-plan.controller';
import { MealPlanService } from './meal-plan.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MealPlan,
      WeeklyPlan,
      DailyMeal,
      MealItem,
      MealPlanProfile,
      ProfileAllergy,
      User,
      UserAllergy,
      Recipe,
      RecipeIngredient,
      NutritionInfo,
    ]),
    SubscriptionModule,
  ],
  controllers: [
    MealPlanController,
  ],
  providers: [
    MealPlanService,
  ],
  exports: [
    MealPlanService,
    TypeOrmModule,
  ],
})
export class MealPlanModule {}