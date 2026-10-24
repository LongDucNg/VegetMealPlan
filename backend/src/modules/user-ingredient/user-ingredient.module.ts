import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserIngredient } from './entities/user-ingredient.entity';
import { UserIngredientService } from './user-ingredient.service';
import { UserIngredientController } from './user-ingredient.controller';
import { Ingredient } from '../ingredient/entities/ingredient.entity';
import { UserAllergy } from '../ingredient/entities/user-allergy.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserIngredient, Ingredient, UserAllergy, User])],
  controllers: [UserIngredientController],
  providers: [UserIngredientService],
  exports: [UserIngredientService, TypeOrmModule],
})
export class UserIngredientModule { }
