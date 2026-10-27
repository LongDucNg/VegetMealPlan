import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeImportBatch } from './entities/recipe-import-batch.entity';
import { RecipeImportItem } from './entities/recipe-import-item.entity';
import { Recipe } from '../recipe/entities/recipe.entity';
import { RecipeIngredient } from '../recipe/entities/recipe-ingredient.entity';
import { RecipeImportService } from './recipe-import.service';
import { RecipeImportController } from './recipe-import.controller';
import { IngredientModule } from '../ingredient/ingredient.module';
import { RecipeModule } from '../recipe/recipe.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RecipeImportBatch, RecipeImportItem, Recipe, RecipeIngredient]),
    IngredientModule,
    // RecipeModule cung cấp RecipeValidatorService (validator DÙNG CHUNG
    // giữa create / update / import công thức).
    RecipeModule,
  ],
  controllers: [RecipeImportController],
  providers: [RecipeImportService],
  exports: [RecipeImportService],
})
export class RecipeImportModule {}
