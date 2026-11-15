import { ErrorCode } from '../../common/constants/error-codes.enum';
import { isRecipeDietCompatible } from '../../common/utils/diet.util';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Recipe, RecipeStatus } from './entities/recipe.entity';
import { RecipeIngredient } from './entities/recipe-ingredient.entity';
import { RecommendationQueryDto } from './dto/query-recipe.dto';
import { NutritionInfo } from '../nutrition/entities/nutrition-info.entity';
import { IngredientReplacement } from '../ingredient/entities/ingredient-replacement.entity';
import { User } from '../users/entities/user.entity';
import { UserAllergy } from '../ingredient/entities/user-allergy.entity';
import { isRecipeSuitableForMeal } from './recipe-meals.util';

export interface RecipeMatchResult {
  recipe: Recipe;
  match_percentage: number;
  missing_ingredient_ids: number[];
}

/**
 * Gợi ý món: theo nguyên liệu đang có, theo hồ sơ người dùng (chế độ ăn, dị ứng),
 * và gợi ý nguyên liệu thay thế cho một món.
 * Tách từ RecipeService, logic giữ nguyên.
 */
@Injectable()
export class RecipeRecommendationService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepo: Repository<Recipe>,

    @InjectRepository(RecipeIngredient)
    private readonly recipeIngredientRepo: Repository<RecipeIngredient>,

    @InjectRepository(IngredientReplacement)
    private readonly replacementRepo: Repository<IngredientReplacement>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(UserAllergy)
    private readonly userAllergyRepo: Repository<UserAllergy>,

    @InjectRepository(NutritionInfo)
    private readonly nutritionRepo: Repository<NutritionInfo>,
  ) {}

  // =========================
  // MATCH RECIPES BY INGREDIENTS
  // =========================

  async matchRecipesByIngredients(
    availableIngredientIds: number[],
    excludeIngredientIds: number[] = [],
    dietType?: string,
  ): Promise<RecipeMatchResult[]> {
    const validDietTypes = ['vegan', 'lacto', 'ovo', 'ovo_lacto'];
    const selectedDiet = dietType?.trim().toLowerCase();

    if (selectedDiet && !validDietTypes.includes(selectedDiet)) {
      throw new BadRequestException(
        'diet_type must be vegan, lacto, ovo or ovo_lacto',
      );
    }

    const recipes = await this.recipeRepo.find({
      where: { status: RecipeStatus.APPROVED },
    });

    const availableSet = new Set(availableIngredientIds);
    const excludedSet = new Set(excludeIngredientIds);
    const results: RecipeMatchResult[] = [];

    for (const recipe of recipes) {
      // Lọc theo chế độ ăn nếu bên gọi truyền dietType
      if (!isRecipeDietCompatible(selectedDiet, recipe.diet_type)) {
        continue;
      }

      const allRows = await this.recipeIngredientRepo.find({
        where: { recipe_id: recipe.recipe_id },
      });

      // Không đề xuất công thức có nguyên liệu bị loại trừ,
      // kể cả nguyên liệu tùy chọn.
      if (allRows.some((row) => excludedSet.has(row.ingredient_id))) {
        continue;
      }

      const requiredRows = allRows.filter((row) => !row.is_optional);

      if (requiredRows.length === 0) {
        continue;
      }

      const requiredIds = requiredRows.map((row) => row.ingredient_id);
      const missing = requiredIds.filter((id) => !availableSet.has(id));
      const matchedCount = requiredIds.length - missing.length;

      if (matchedCount === 0) {
        continue;
      }

      results.push({
        recipe,
        match_percentage: Math.round(
          (matchedCount / requiredIds.length) * 100,
        ),
        missing_ingredient_ids: missing,
      });
    }

    return results.sort(
      (a, b) => b.match_percentage - a.match_percentage,
    );
  }

  // =========================
  // RECOMMENDATIONS
  // =========================

  async getRecommendations(
    query: RecommendationQueryDto,
    user_id?: number,
  ) {
    let availableIngredientIds: number[] = [];

    if (query.ingredientIds) {
      availableIngredientIds = query.ingredientIds
        .split(',')
        .map((id) => Number(id.trim()));

      if (
        availableIngredientIds.some(
          (id) => !Number.isInteger(id) || id <= 0,
        )
      ) {
        throw new BadRequestException(
          'ingredientIds must contain positive ingredient IDs',
        );
      }
    }

    let excludeIngredientIds: number[] = [];

    if (query.excludeIngredientIds) {
      excludeIngredientIds = query.excludeIngredientIds
        .split(',')
        .map((id) => Number(id.trim()));

      if (
        excludeIngredientIds.some(
          (id) => !Number.isInteger(id) || id <= 0,
        )
      ) {
        throw new BadRequestException(
          'excludeIngredientIds must contain positive ingredient IDs',
        );
      }
    }

    let dietType: string | undefined;

    if (user_id) {
      const user = await this.userRepo.findOne({
        where: { user_id },
      });

      if (user) {
        dietType = user.diet_type;
      }

      const allergyRows = await this.userAllergyRepo.find({
        where: { user_id },
      });

      excludeIngredientIds = [
        ...new Set([
          ...excludeIngredientIds,
          ...allergyRows.map((row) => row.ingredient_id),
        ]),
      ];
    }

    const recipes = await this.recipeRepo.find({
      where: { status: RecipeStatus.APPROVED },
    });

    const results: RecipeMatchResult[] = [];

    for (const recipe of recipes) {
      // Lọc theo bữa ăn
      if (query.mealType?.trim()) {
        if (
          !isRecipeSuitableForMeal(
            recipe,
            query.mealType,
          )
        ) {
          continue;
        }
      }

      // Lọc theo chế độ ăn của người dùng
      if (!isRecipeDietCompatible(dietType, recipe.diet_type)) {
        continue;
      }

      // Lọc theo calories
      if (
        query.targetCalories !== undefined &&
        query.targetCalories > 0
      ) {
        const nutrition = await this.nutritionRepo.findOne({
          where: { recipe_id: recipe.recipe_id },
        });

        if (
          !nutrition ||
          nutrition.calories === null ||
          nutrition.calories === undefined
        ) {
          continue;
        }

        const difference = Math.abs(
          Number(nutrition.calories) - query.targetCalories,
        );

        if (difference > query.targetCalories * 0.1) {
          continue;
        }
      }

      const ingredientRows = await this.recipeIngredientRepo.find({
        where: { recipe_id: recipe.recipe_id },
      });

      const requiredRows = ingredientRows.filter(
        (row) => !row.is_optional,
      );

      if (requiredRows.length === 0) {
        continue;
      }

      // Loại công thức có nguyên liệu gây dị ứng,
      // kể cả nguyên liệu tùy chọn.
      if (
        ingredientRows.some((row) =>
          excludeIngredientIds.includes(row.ingredient_id),
        )
      ) {
        continue;
      }

      const requiredIds = requiredRows.map((row) => row.ingredient_id);
      let match_percentage = 100;
      let missing_ingredient_ids: number[] = [];

      if (availableIngredientIds.length > 0) {
        const availableSet = new Set(availableIngredientIds);

        missing_ingredient_ids = requiredIds.filter(
          (id) => !availableSet.has(id),
        );

        const matchedCount =
          requiredIds.length - missing_ingredient_ids.length;

        if (matchedCount === 0) {
          continue;
        }

        match_percentage = Math.round(
          (matchedCount / requiredIds.length) * 100,
        );
      }

      results.push({
        recipe,
        match_percentage,
        missing_ingredient_ids,
      });
    }

    if (results.length > 0) {
      const rIds = results.map((res) => res.recipe.recipe_id);
      const nutList = await this.nutritionRepo.find({
        where: { recipe_id: In(rIds) },
      });
      const nutMap = new Map(nutList.map((n) => [n.recipe_id, n]));
      for (const res of results) {
        (res.recipe as any).nutrition = nutMap.get(res.recipe.recipe_id) || null;
      }
    }

    return results.sort(
      (a, b) => b.match_percentage - a.match_percentage,
    );
  }

  // =========================
  // RECIPE REPLACEMENTS
  // =========================

  async getRecipeReplacements(recipe_id: number) {
    const recipe = await this.recipeRepo.findOne({
      where: {
        recipe_id,
        status: RecipeStatus.APPROVED,
      },
    });

    if (!recipe) {
      throw new NotFoundException({ code: ErrorCode.RECIPE_NOT_FOUND, message: `Không tìm thấy công thức #${recipe_id}` });
    }

    const recipeIngredients = await this.recipeIngredientRepo.find({
      where: { recipe_id },
      relations: ['ingredient'],
    });

    if (recipeIngredients.length === 0) {
      return {
        recipe_id: recipe.recipe_id,
        recipe_title: recipe.title,
        replacements: [],
      };
    }

    const originalIngredientIds = recipeIngredients.map(
      (row) => row.ingredient_id,
    );

    const replacements = await this.replacementRepo.find({
      where: {
        original_ingredient_id: In(originalIngredientIds),
      },
      relations: ['original_ingredient', 'replacement_ingredient'],
    });

    return {
      recipe_id: recipe.recipe_id,
      recipe_title: recipe.title,
      replacements: replacements.map((item) => ({
        replacement_id: item.replacement_id,
        original_ingredient_id: item.original_ingredient_id,
        original_ingredient_name:
          item.original_ingredient?.ingredient_name,
        replacement_ingredient_id: item.replacement_ingredient_id,
        replacement_ingredient_name:
          item.replacement_ingredient?.ingredient_name,
        ratio: item.ratio,
        reason: item.reason,
        applicable_when: item.applicable_when,
        note: item.note,
      })),
    };
  }
}
