import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { RecipeStatus } from './entities/recipe.entity';
import { RecipeIngredient } from './entities/recipe-ingredient.entity';
import { FavoriteRecipe } from './entities/favorite-recipe.entity';
import { NutritionInfo } from '../nutrition/entities/nutrition-info.entity';
import { RecipeService } from './recipe.service';

/**
 * Món yêu thích của người dùng: thêm, bỏ, xem danh sách.
 * Tách từ RecipeService; kiểm tra món tồn tại qua RecipeService.findOne.
 */
@Injectable()
export class RecipeFavoriteService {
  constructor(
    @InjectRepository(RecipeIngredient)
    private readonly recipeIngredientRepo: Repository<RecipeIngredient>,

    @InjectRepository(FavoriteRecipe)
    private readonly favoriteRepo: Repository<FavoriteRecipe>,

    @InjectRepository(NutritionInfo)
    private readonly nutritionRepo: Repository<NutritionInfo>,

    private readonly recipeService: RecipeService,
  ) {}

  // =========================
  // FAVORITES
  // =========================

  async addFavorite(
    user_id: number,
    recipe_id: number,
  ): Promise<FavoriteRecipe> {
    await this.recipeService.findOne(recipe_id);

    const existing = await this.favoriteRepo.findOne({
      where: { user_id, recipe_id },
    });

    if (existing) {
      throw new ConflictException('Công thức đã có trong danh sách yêu thích');
    }

    const favorite = this.favoriteRepo.create({
      user_id,
      recipe_id,
    });

    return this.favoriteRepo.save(favorite);
  }

  async removeFavorite(
    user_id: number,
    recipe_id: number,
  ): Promise<void> {
    const result = await this.favoriteRepo.delete({ user_id, recipe_id });
    if (result.affected === 0) {
      throw new NotFoundException('Công thức không có trong danh sách yêu thích');
    }
  }

  async listFavorites(user_id: number): Promise<any[]> {
    const favorites = await this.favoriteRepo.find({
      where: { user_id },
      relations: ['recipe'],
    });

    const validRecipes = favorites
      .map((f) => f.recipe)
      .filter((r) => r && r.status === RecipeStatus.APPROVED);

    if (validRecipes.length === 0) return [];

    const recipeIds = validRecipes.map((r) => r.recipe_id);

    // Batch query: ingredients + nutrition thay vì N+1
    const ingredients = await this.recipeIngredientRepo.find({
      where: { recipe_id: In(recipeIds) },
      relations: ['ingredient'],
    });

    const nutritions = await this.nutritionRepo.find({
      where: { recipe_id: In(recipeIds) },
    });

    const ingredientMap = new Map<number, typeof ingredients>();
    for (const ing of ingredients) {
      if (!ingredientMap.has(ing.recipe_id)) {
        ingredientMap.set(ing.recipe_id, []);
      }
      ingredientMap.get(ing.recipe_id)!.push(ing);
    }
    const nutritionMap = new Map(nutritions.map((n) => [n.recipe_id, n]));

    return validRecipes.map((r: any) => ({
      ...r,
      ingredients: ingredientMap.get(r.recipe_id) || [],
      nutrition: nutritionMap.get(r.recipe_id) || null,
    }));
  }
}
