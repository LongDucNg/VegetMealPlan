
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NutritionInfo } from './entities/nutrition-info.entity';
import { NutritionService } from './nutrition.service';
import { NutritionController } from './nutrition.controller';
import { Recipe } from '../recipe/entities/recipe.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      NutritionInfo,
      Recipe,
    ]),
  ],
  controllers: [NutritionController],
  providers: [NutritionService],
  exports: [NutritionService],
})
export class NutritionModule {}
