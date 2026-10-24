import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient } from './entities/ingredient.entity';
import { IngredientConflict } from './entities/ingredient-conflict.entity';
import { UserAllergy } from './entities/user-allergy.entity';
import { UserIngredientPrice } from './entities/user-ingredient-price.entity';
import { IngredientService } from './ingredient.service';
import { IngredientController } from './ingredient.controller';
import { IngredientReplacement } from './entities/ingredient-replacement.entity';
import { AdminIngredientController } from './admin-ingredient.controller';
import { Recipe } from '../recipe/entities/recipe.entity';
import { RecipeIngredient } from '../recipe/entities/recipe-ingredient.entity';
import { NutritionInfo } from '../nutrition/entities/nutrition-info.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Ingredient,
      IngredientConflict,
      UserAllergy,
      UserIngredientPrice,
      IngredientReplacement,
      // Cần cho syncAffectedRecipes: sửa giá/dinh dưỡng nguyên liệu thì
      // tính lại đúng các công thức chứa nguyên liệu đó.
      Recipe,
      RecipeIngredient,
      NutritionInfo,
    ]),
  ],
  controllers: [
    IngredientController,
    AdminIngredientController,
  ],
  providers: [
    IngredientService,
  ],
  exports: [
    IngredientService,
    TypeOrmModule,
  ],
})
export class IngredientModule {}