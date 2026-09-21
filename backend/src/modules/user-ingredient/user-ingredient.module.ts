import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserIngredient } from './entities/user-ingredient.entity';
import { UserIngredientService } from './user-ingredient.service';
import { UserIngredientController } from './user-ingredient.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserIngredient])],
  controllers: [UserIngredientController],
  providers: [UserIngredientService],
  exports: [UserIngredientService, TypeOrmModule],
})
export class UserIngredientModule {}
