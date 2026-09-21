import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient } from './entities/ingredient.entity';
import { IngredientConflict } from './entities/ingredient-conflict.entity';
import { UserAllergy } from './entities/user-allergy.entity';
import { IngredientService } from './ingredient.service';
import { IngredientController } from './ingredient.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Ingredient, IngredientConflict, UserAllergy])],
  controllers: [IngredientController],
  providers: [IngredientService],
  exports: [IngredientService, TypeOrmModule],
})
export class IngredientModule {}
