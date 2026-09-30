import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe, RecipeStatus } from './entities/recipe.entity';
import { RecipeIngredient } from './entities/recipe-ingredient.entity';
import { FavoriteRecipe } from './entities/favorite-recipe.entity';
import { IngredientService } from '../ingredient/ingredient.service';

export interface RecipeMatchResult {
  recipe: Recipe;
  match_percentage: number;
  missing_ingredient_ids: number[];
}

export interface IngredientConflictWarning {
  ingredient_id_1: number;
  ingredient_id_2: number;
  reason: string;
}

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepo: Repository<Recipe>,
    @InjectRepository(RecipeIngredient)
    private readonly recipeIngredientRepo: Repository<RecipeIngredient>,
    @InjectRepository(FavoriteRecipe)
    private readonly favoriteRepo: Repository<FavoriteRecipe>,
    private readonly ingredientService: IngredientService,
  ) {}

  findAll(): Promise<Recipe[]> {
    // Chỉ Recipe đã APPROVED mới public — recipe reject/removed không hiển thị (BR).
    return this.recipeRepo.find({ where: { status: RecipeStatus.APPROVED } });
  }

  async findOne(recipe_id: number): Promise<Recipe> {
    const recipe = await this.recipeRepo.findOne({ where: { recipe_id } });
    if (!recipe) throw new NotFoundException(`Recipe #${recipe_id} not found`);
    return recipe;
  }

  /**
   * Kiem tra xung khac nguyen lieu cho 1 danh sach ingredient_id sap gan vao recipe.
   * KHONG chan luu — chi tra ve warning de FE hien thi, quyet dinh cuoi cung la
   * cua nguoi tao recipe (Authorized User / Admin).
   * Dung chung ham nay cho ca luong tao/sua recipe thu cong VA luong import hang loat.
   */
  async checkIngredientConflicts(ingredientIds: number[]): Promise<IngredientConflictWarning[]> {
    const conflicts = await this.ingredientService.findConflictsAmong(ingredientIds);
    return conflicts.map((c) => ({
      ingredient_id_1: c.ingredient_id_1,
      ingredient_id_2: c.ingredient_id_2,
      reason: c.reason,
    }));
  }

  // TODO: createWithIngredients(dto) — luu Recipe + RecipeIngredient (status=pending_review),
  // luon goi checkIngredientConflicts() truoc va tra warnings kem theo response (khong chan
  // luu, chi canh bao). Route Admin duyet: PATCH :id/approve, PATCH :id/reject.

  async addFavorite(user_id: number, recipe_id: number): Promise<FavoriteRecipe> {
    await this.findOne(recipe_id); // 404 nếu recipe không tồn tại/không approved
    const existing = await this.favoriteRepo.findOne({ where: { user_id, recipe_id } });
    if (existing) return existing;
    const favorite = this.favoriteRepo.create({ user_id, recipe_id });
    return this.favoriteRepo.save(favorite);
  }

  async removeFavorite(user_id: number, recipe_id: number): Promise<void> {
    await this.favoriteRepo.delete({ user_id, recipe_id });
  }

  async listFavorites(user_id: number): Promise<Recipe[]> {
    const favorites = await this.favoriteRepo.find({ where: { user_id }, relations: ['recipe'] });
    return favorites.map((f) => f.recipe);
  }

  /**
   * Lõi thuật toán matching: cho 1 danh sách ingredient_id user đang có
   * (đã join từ USER_INGREDIENT ở RecommendationService), trả về những Recipe
   * phù hợp nhất kèm % match + danh sách ingredient còn thiếu.
   *
   * Chú ý: hàm này CHƯA lọc allergy/diet_type — RecommendationService phải
   * lọc trước (loại ingredient dị ứng, loại recipe sai diet_type) rồi mới gọi
   * hàm này với availableIngredientIds đã "sạch".
   */
  async matchRecipesByIngredients(
    availableIngredientIds: number[],
    excludeIngredientIds: number[] = [],
  ): Promise<RecipeMatchResult[]> {
    const approvedRecipes = await this.recipeRepo.find({
      where: { status: RecipeStatus.APPROVED },
    });

    const results: RecipeMatchResult[] = [];

    for (const recipe of approvedRecipes) {
      const requiredRows = await this.recipeIngredientRepo.find({
        where: { recipe_id: recipe.recipe_id, is_optional: false },
      });
      if (requiredRows.length === 0) continue;

      const requiredIds = requiredRows.map((r) => r.ingredient_id);

      // Recipe chứa nguyên liệu dị ứng -> loại thẳng, không tính match.
      const hasExcluded = requiredIds.some((id) => excludeIngredientIds.includes(id));
      if (hasExcluded) continue;

      const availableSet = new Set(availableIngredientIds);
      const missing = requiredIds.filter((id) => !availableSet.has(id));
      const matchedCount = requiredIds.length - missing.length;
      const match_percentage = Math.round((matchedCount / requiredIds.length) * 100);

      // "User không có ingredient phù hợp -> không tạo recommendation giả" (edge case bắt buộc)
      if (matchedCount === 0) continue;

      results.push({ recipe, match_percentage, missing_ingredient_ids: missing });
    }

    return results.sort((a, b) => b.match_percentage - a.match_percentage);
  }
}
