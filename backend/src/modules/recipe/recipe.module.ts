import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Recipe } from './entities/recipe.entity';
import { RecipeIngredient } from './entities/recipe-ingredient.entity';
import { RecipeCategory } from './entities/recipe-category.entity';
import { Category } from '../category/entities/category.entity';
import { FavoriteRecipe } from './entities/favorite-recipe.entity';
import { UserRecipePrice } from './entities/user-recipe-price.entity';

import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { RecipeValidatorService } from './recipe-validator.service';
import { UserFavoriteRecipeController } from './user-favorite-recipe.controller';
import { UserRecipePriceController } from './user-recipe-price.controller';
import { AdminRecipeController } from './admin-recipe.controller';
import { NutritionInfo } from '../nutrition/entities/nutrition-info.entity';
import { IngredientModule } from '../ingredient/ingredient.module';
import { IngredientReplacement } from '../ingredient/entities/ingredient-replacement.entity';
import { User } from '../users/entities/user.entity';
import { UserAllergy } from '../ingredient/entities/user-allergy.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Recipe,
      RecipeIngredient,
      RecipeCategory,
      Category,
      FavoriteRecipe,
      IngredientReplacement,
      User,
      UserAllergy,
      UserRecipePrice,
      NutritionInfo
    ]),
    IngredientModule,
  ],
  controllers: [
    RecipeController,
    UserFavoriteRecipeController,
    UserRecipePriceController,
    AdminRecipeController,
  ],
  providers: [RecipeService, RecipeValidatorService],
  exports: [RecipeService, RecipeValidatorService, TypeOrmModule],
})
export class RecipeModule { }