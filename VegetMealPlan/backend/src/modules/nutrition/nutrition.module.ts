import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NutritionInfo } from './entities/nutrition-info.entity';

// TODO: NutritionService tính calories/protein/carbs/fat/fiber từ
// RecipeIngredient x Ingredient.*_per_100g mỗi khi công thức đổi nguyên liệu.
@Module({
  imports: [TypeOrmModule.forFeature([NutritionInfo])],
  exports: [TypeOrmModule],
})
export class NutritionModule {}
