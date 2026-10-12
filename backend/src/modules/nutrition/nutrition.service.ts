
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NutritionInfo } from './entities/nutrition-info.entity';
import { Recipe } from '../recipe/entities/recipe.entity';

@Injectable()
export class NutritionService {
  constructor(
    @InjectRepository(NutritionInfo)
    private readonly nutritionRepo: Repository<NutritionInfo>,

    @InjectRepository(Recipe)
    private readonly recipeRepo: Repository<Recipe>,
  ) {}

  async findAll() {
    return this.nutritionRepo.find({
      order: { recipe_id: 'ASC' },
    });
  }

  async getByRecipeId(recipeId: number) {
    const recipe = await this.recipeRepo.findOne({
      where: { recipe_id: recipeId },
    });

    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }

    const nutrition = await this.nutritionRepo.findOne({
      where: { recipe_id: recipeId },
    });

    if (!nutrition) {
      throw new NotFoundException(
        'Nutrition information not found for this recipe',
      );
    }

    return nutrition;
  }
}
