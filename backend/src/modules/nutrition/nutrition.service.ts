
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

  async findAll(): Promise<{ data: any[]; message: string }> {
    const items = await this.nutritionRepo.find({
      order: { recipe_id: 'ASC' },
    });
    return {
      data: items,
      message: items.length === 0
        ? 'Chưa có dữ liệu dinh dưỡng.'
        : 'Lấy danh sách dinh dưỡng thành công.',
    };
  }

  async getByRecipeId(recipeId: number): Promise<{ data: any; message: string }> {
    const recipe = await this.recipeRepo.findOne({
      where: { recipe_id: recipeId },
    });

    if (!recipe) {
      throw new NotFoundException('Không tìm thấy công thức.');
    }

    const nutrition = await this.nutritionRepo.findOne({
      where: { recipe_id: recipeId },
    });

    if (!nutrition) {
      throw new NotFoundException('Không tìm thấy thông tin dinh dưỡng của công thức này.');
    }

    return {
      data: nutrition,
      message: 'Lấy thông tin dinh dưỡng công thức thành công.',
    };
  }
}
