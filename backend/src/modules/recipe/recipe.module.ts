import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './entities/recipe.entity';
import { RecipeIngredient } from './entities/recipe-ingredient.entity';
import { RecipeCategory } from './entities/recipe-category.entity';
import { FavoriteRecipe } from './entities/favorite-recipe.entity';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { IngredientModule } from '../ingredient/ingredient.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Recipe, RecipeIngredient, RecipeCategory, FavoriteRecipe]),
    IngredientModule,
  ],
  controllers: [RecipeController],
  providers: [RecipeService],
  exports: [RecipeService, TypeOrmModule],
})
export class RecipeModule {}
