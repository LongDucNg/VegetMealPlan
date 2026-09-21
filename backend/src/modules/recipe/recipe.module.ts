import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './entities/recipe.entity';
import { RecipeIngredient } from './entities/recipe-ingredient.entity';
import { RecipeCategory } from './entities/recipe-category.entity';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe, RecipeIngredient, RecipeCategory])],
  controllers: [RecipeController],
  providers: [RecipeService],
  exports: [RecipeService, TypeOrmModule],
})
export class RecipeModule {}
