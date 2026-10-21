import { ErrorCode } from '../../common/constants/error-codes.enum';
import { isRecipeDietCompatible } from '../../common/utils/diet.util';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Recipe, RecipeStatus } from './entities/recipe.entity';
import { RecipeIngredient } from './entities/recipe-ingredient.entity';
import { FavoriteRecipe } from './entities/favorite-recipe.entity';
import { QueryRecipeDto, RecommendationQueryDto } from './dto/query-recipe.dto';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import {
  UpdateRecipeStatusDto,
  RecipeReviewStatus,
} from './dto/update-recipe-status.dto';

import { NutritionInfo } from '../nutrition/entities/nutrition-info.entity';
import { IngredientReplacement } from '../ingredient/entities/ingredient-replacement.entity';
import { IngredientService } from '../ingredient/ingredient.service';
import { User } from '../users/entities/user.entity';
import { UserAllergy } from '../ingredient/entities/user-allergy.entity';
import { UserRecipePrice } from './entities/user-recipe-price.entity';
import { RecipeCategory } from './entities/recipe-category.entity';
import { Category } from '../category/entities/category.entity';
import { calculateIngredientCost } from './recipe-cost.util';

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

    @InjectRepository(IngredientReplacement)
    private readonly replacementRepo: Repository<IngredientReplacement>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(UserAllergy)
    private readonly userAllergyRepo: Repository<UserAllergy>,

    private readonly ingredientService: IngredientService,

    @InjectRepository(UserRecipePrice)
    private readonly userRecipePriceRepo: Repository<UserRecipePrice>,

    @InjectRepository(NutritionInfo)
    private readonly nutritionRepo: Repository<NutritionInfo>,

    @InjectRepository(RecipeCategory)
    private readonly recipeCategoryRepo: Repository<RecipeCategory>,

    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  // =========================
  // GET ALL APPROVED RECIPES
  // =========================

  async findAll(query: QueryRecipeDto) {
    const {
      q,
      mealType,
      meal_type,
      vegetarianType,
      diet_type,
      category,
      difficulty,
      maxCalories,
      excludeAllergens,
      created_by,
      page = 1,
      limit = 20,
    } = query;

    // Route công khai chỉ trả món đã duyệt. Xem trạng thái khác (draft, pending_review, rejected,
    // removed) dùng GET /admin/recipes?status=... (cần quyền admin).
    if (query.status?.trim()) {
      const requested = query.status.trim().toLowerCase();
      if (!Object.values(RecipeStatus).includes(requested as RecipeStatus)) {
        throw new BadRequestException(
          `status phải là một trong: ${Object.values(RecipeStatus).join(', ')}`,
        );
      }
      if (requested !== RecipeStatus.APPROVED) {
        throw new ForbiddenException({
          code: ErrorCode.AUTH_FORBIDDEN,
          message: 'Chỉ admin mới xem được công thức chưa duyệt. Dùng GET /admin/recipes?status=...',
        });
      }
    }

    const qb = this.recipeRepo.createQueryBuilder('recipe');

    if (created_by !== undefined && Number(created_by) > 0) {
      qb.where('recipe.created_by = :createdBy', {
        createdBy: Number(created_by),
      });
      if (query.status?.trim()) {
        qb.andWhere('recipe.status = :status', {
          status: query.status.trim().toLowerCase(),
        });
      }
    } else {
      qb.where('recipe.status = :status', {
        status: RecipeStatus.APPROVED,
      });
    }

    // Lọc theo loại bữa ăn
    const selectedMealType = mealType || meal_type;

    if (selectedMealType?.trim()) {
      const mealTypeValue = selectedMealType.trim().toLowerCase();

      qb.andWhere(
        `(
          LOWER(recipe.meal_type) = :mealType
          OR LOWER(recipe.meal_type) = 'any'
        )`,
        { mealType: mealTypeValue },
      );
    }

    // Tìm kiếm theo tên công thức
    if (q?.trim()) {
      qb.andWhere('LOWER(recipe.title) LIKE LOWER(:q)', {
        q: `%${q.trim()}%`,
      });
    }

    // Lọc theo danh mục
    if (category?.trim()) {
      const categoryId = Number(category.trim());

      if (!Number.isInteger(categoryId) || categoryId <= 0) {
        throw new BadRequestException(
          'category must be a positive category ID',
        );
      }

      const categorySubQuery = this.recipeRepo.manager
        .createQueryBuilder()
        .select('rc.recipe_id')
        .from('recipe_categories', 'rc')
        .where('rc.category_id = :categoryId');

      qb.andWhere(
        `recipe.recipe_id IN (${categorySubQuery.getQuery()})`,
      ).setParameters({
        ...categorySubQuery.getParameters(),
        categoryId,
      });
    }

    // Lọc theo chế độ ăn
    const selectedDiet = vegetarianType || diet_type;

    if (selectedDiet?.trim()) {
      const dietType = selectedDiet.trim().toLowerCase();
      const validDietTypes = ['vegan', 'lacto', 'ovo', 'ovo_lacto'];

      if (!validDietTypes.includes(dietType)) {
        throw new BadRequestException(
          'Chế độ ăn chay không hợp lệ. Chỉ chấp nhận: vegan, lacto, ovo hoặc ovo_lacto.',
        );
      }

      // diet_type là cột enum Postgres: không dùng LOWER() được (dietType đã chuẩn hoá thường ở trên).
      qb.andWhere('recipe.diet_type = :dietType', {
        dietType,
      });
    }

    // Lọc theo độ khó
    if (difficulty?.trim()) {
      qb.andWhere('recipe.difficulty = :difficulty', {
        difficulty: difficulty.trim(),
      });
    }

    // Lọc calories
    if (maxCalories !== undefined) {
      const n = Number(maxCalories);
      if (!Number.isFinite(n) || n < 0) {
        throw new BadRequestException('Lượng calo tối đa không hợp lệ.');
      }

      const nutritionSubQuery = this.nutritionRepo
        .createQueryBuilder('nutrition')
        .select('nutrition.recipe_id')
        .where('nutrition.calories <= :maxCalories');

      qb.andWhere(
        `recipe.recipe_id IN (${nutritionSubQuery.getQuery()})`,
      ).setParameters({
        ...nutritionSubQuery.getParameters(),
        maxCalories: n,
      });
    }

    // Loại công thức có nguyên liệu gây dị ứng
    if (excludeAllergens?.trim()) {
      const allergenIds = [
        ...new Set(
          excludeAllergens.split(',').map((id) => Number(id.trim())),
        ),
      ];

      if (allergenIds.some((id) => !Number.isInteger(id) || id <= 0)) {
        throw new BadRequestException(
          'excludeAllergens must contain positive ingredient IDs',
        );
      }

      const ingredientSubQuery = this.recipeIngredientRepo
        .createQueryBuilder('ri')
        .select('ri.recipe_id')
        .where('ri.ingredient_id IN (:...allergenIds)');

      qb.andWhere(
        `recipe.recipe_id NOT IN (${ingredientSubQuery.getQuery()})`,
      ).setParameters({
        ...ingredientSubQuery.getParameters(),
        allergenIds,
      });
    }

    // Lọc theo người tạo (nếu có)
    if (created_by !== undefined && Number(created_by) > 0) {
      qb.andWhere('recipe.created_by = :createdBy', {
        createdBy: Number(created_by),
      });
    }

    // Phân trang
    const safePage = Math.max(1, Number(page) || 1);
    const safeLimit = Math.min(1000, Math.max(1, Number(limit) || 20));

    qb.orderBy('recipe.created_at', 'DESC')
      .skip((safePage - 1) * safeLimit)
      .take(safeLimit);

    const [recipes, total] = await qb.getManyAndCount();

    if (recipes.length > 0) {
      const recipeIds = recipes.map((r) => r.recipe_id);
      const nutritions = await this.nutritionRepo.find({
        where: { recipe_id: In(recipeIds) },
      });
      const nutritionMap = new Map(nutritions.map((n) => [n.recipe_id, n]));

      for (const recipe of recipes as any[]) {
        recipe.nutrition = nutritionMap.get(recipe.recipe_id) || null;
      }
    }

    return {
      data: recipes,
      pagination: {
        page: safePage,
        limit: safeLimit,
        total,
        totalPages: Math.ceil(total / safeLimit),
      },
      message: 'Lấy danh sách công thức thành công.',
    };
  }

  // =========================
  // GET ONE APPROVED RECIPE
  // =========================

  async findOne(recipe_id: number) {
    const recipe = await this.recipeRepo.findOne({
      where: {
        recipe_id,
        status: RecipeStatus.APPROVED,
      },
    });

    if (!recipe) {
      throw new NotFoundException({ code: ErrorCode.RECIPE_NOT_FOUND, message: `Không tìm thấy công thức #${recipe_id}` });
    }

    const ingredients = await this.recipeIngredientRepo.find({
      where: { recipe_id },
      relations: ['ingredient'],
    });

    const nutrition = await this.nutritionRepo.findOne({
      where: { recipe_id },
    });

    return {
      ...recipe,
      ingredients,
      nutrition,
    };
  }

  // =========================
  // CHECK INGREDIENT CONFLICTS
  // =========================

  async checkIngredientConflicts(
    ingredientIds: number[],
  ): Promise<IngredientConflictWarning[]> {
    const conflicts =
      await this.ingredientService.findConflictsAmong(ingredientIds);

    return conflicts.map((conflict) => ({
      ingredient_id_1: conflict.ingredient_id_1,
      ingredient_id_2: conflict.ingredient_id_2,
      reason: conflict.reason,
    }));
  }

  // =========================
  // CREATE RECIPE
  // =========================

  async createRecipe(
    userId: number,
    userRole: string,
    dto: CreateRecipeDto,
  ) {
    if (
      dto.ingredients?.some(
        (item) =>
          (item.is_optional ?? false) === false && item.unit !== 'g',
      )
    ) {
      throw new BadRequestException(
        'Nguyên liệu bắt buộc phải sử dụng đơn vị g để tính dinh dưỡng',
      );
    }

    const status =
      userRole === 'admin'
        ? RecipeStatus.APPROVED
        : RecipeStatus.PENDING_REVIEW;

    const recipe = this.recipeRepo.create({
      title: dto.title,
      description: dto.description,
      instructions: dto.instructions,
      image_url: dto.image_url,
      prep_time: dto.prep_time,
      cook_time: dto.cook_time,
      servings: dto.servings,
      difficulty: dto.difficulty,
      meal_type: dto.meal_type,
      diet_type: dto.diet_type,
      source_video_id: dto.source_video_id,
      estimated_cost: dto.estimated_cost,
      created_by: userId,
      status,
      // Admin tạo thì duyệt luôn: ghi nhận người duyệt và thời điểm như luồng PUT /admin/recipes/:id/status.
      approved_at: status === RecipeStatus.APPROVED ? new Date() : null,
      approved_by: status === RecipeStatus.APPROVED ? userId : null,
    } as Partial<Recipe>);

    const savedRecipe = await this.recipeRepo.save(recipe);

    if (dto.ingredients && dto.ingredients.length > 0) {
      const recipeIngredients = dto.ingredients.map((item) =>
        this.recipeIngredientRepo.create({
          recipe_id: savedRecipe.recipe_id,
          ingredient_id: item.ingredient_id,
          quantity: item.quantity,
          unit: item.unit,
          note: item.note,
          is_optional: item.is_optional ?? false,
        }),
      );

      await this.recipeIngredientRepo.save(recipeIngredients);
    }

    const ingredients = await this.recipeIngredientRepo.find({
      where: { recipe_id: savedRecipe.recipe_id },
      relations: ['ingredient'],
    });

    const nutrition = this.calculateNutrition(ingredients, savedRecipe.servings);

    const savedNutrition = await this.nutritionRepo.save(
      this.nutritionRepo.create({
        recipe_id: savedRecipe.recipe_id,
        ...nutrition,
      }),
    );

    // Chỉ tạo category links khi request có gửi category_ids hợp lệ.
    if (
      dto.category_ids !== undefined &&
      Array.isArray(dto.category_ids) &&
      dto.category_ids.length > 0
    ) {
      const uniqueIds = [...new Set(dto.category_ids.filter((id) => Number.isInteger(id) && id > 0))];
      if (uniqueIds.length > 0) {
        const found = await this.categoryRepo.count({
          where: { category_id: In(uniqueIds) },
        });
        if (found === uniqueIds.length) {
          await this.recipeCategoryRepo.save(
            uniqueIds.map((category_id) =>
              this.recipeCategoryRepo.create({
                recipe_id: savedRecipe.recipe_id,
                category_id,
              }),
            ),
          );
        }
      }
    }

    return {
      ...savedRecipe,
      ingredients,
      nutrition: savedNutrition,
    };
  }

  // =========================
  // CALCULATE NUTRITION
  // =========================

  // nutrition_infos lưu trên 1 KHẨU PHẦN (cùng quy ước với seed và bộ sinh thực đơn),
  // nên chia tổng của cả món cho số khẩu phần.
  private calculateNutrition(ingredients: RecipeIngredient[], servings?: number | null) {
    const nutrition = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0,
    };

    for (const item of ingredients) {
      if (item.is_optional) {
        continue;
      }

      const ingredient = item.ingredient;
      const ratio = Number(item.quantity || 0) / 100;

      nutrition.calories +=
        ratio * Number(ingredient?.calories_per_100g ?? 0);
      nutrition.protein +=
        ratio * Number(ingredient?.protein_per_100g ?? 0);
      nutrition.carbs +=
        ratio * Number(ingredient?.carb_per_100g ?? 0);
      nutrition.fat +=
        ratio * Number(ingredient?.fat_per_100g ?? 0);
      nutrition.fiber +=
        ratio * Number(ingredient?.fiber_per_100g ?? 0);
    }

    const divisor = servings && servings > 0 ? servings : 1;
    return {
      calories: nutrition.calories / divisor,
      protein: nutrition.protein / divisor,
      carbs: nutrition.carbs / divisor,
      fat: nutrition.fat / divisor,
      fiber: nutrition.fiber / divisor,
    };
  }

  // =========================
  // FAVORITES
  // =========================

  async addFavorite(
    user_id: number,
    recipe_id: number,
  ): Promise<FavoriteRecipe> {
    await this.findOne(recipe_id);

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

  async findMyRecipes(user_id: number): Promise<any[]> {
    const recipes = await this.recipeRepo.find({
      where: { created_by: user_id },
      order: { created_at: 'DESC' },
    });

    if (recipes.length === 0) return [];

    const recipeIds = recipes.map((r) => r.recipe_id);
    const nutritions = await this.nutritionRepo.find({
      where: { recipe_id: In(recipeIds) },
    });
    const nutritionMap = new Map(nutritions.map((n) => [n.recipe_id, n]));

    return recipes.map((r: any) => ({
      ...r,
      nutrition: nutritionMap.get(r.recipe_id) || null,
    }));
  }

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
        const selectedMeal = query.mealType.trim().toLowerCase();
        const recipeMeal = recipe.meal_type?.trim().toLowerCase();

        if (recipeMeal !== selectedMeal && recipeMeal !== 'any') {
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
  // RECIPE COST
  // =========================

  async getRecipeCost(recipe_id: number) {
    const recipe = await this.recipeRepo.findOne({
      where: {
        recipe_id,
        status: RecipeStatus.APPROVED,
      },
    });

    if (!recipe) {
      throw new NotFoundException({ code: ErrorCode.RECIPE_NOT_FOUND, message: `Không tìm thấy công thức #${recipe_id}` });
    }

    const rows = await this.recipeIngredientRepo.find({
      where: { recipe_id },
      relations: ['ingredient'],
    });

    let hasIncompletePrice = false;

    const ingredients = rows.map((row) => {
      const ingredient = row.ingredient;
      const price = Number(ingredient?.avg_price_per_unit ?? 0);
      const hasPrice = ingredient?.avg_price_per_unit != null;
      const quantity = Number(row.quantity ?? 0);

      if (!hasPrice) {
        hasIncompletePrice = true;
      }

      // Quy đổi đơn vị của công thức sang đơn vị tính giá của nguyên liệu.
      const { cost, converted } = calculateIngredientCost(
        quantity,
        row.unit,
        ingredient?.unit,
        price,
      );

      return {
        ingredient_id: ingredient.ingredient_id,
        ingredient_name: ingredient.ingredient_name,
        quantity,
        unit: row.unit,
        price_unit: ingredient?.unit ?? null,
        unit_price: hasPrice ? price : null,
        cost: hasPrice ? Math.round(cost) : null,
        // false: không quy đổi được đơn vị, chi phí chỉ là ước tính
        unit_converted: hasPrice ? converted : false,
      };
    });

    // total_cost là chi phí CẢ MÓN (nguyên liệu khai báo cho cả món);
    // cost_per_serving = cả món / số khẩu phần.
    const servings =
      recipe.servings && recipe.servings > 0 ? recipe.servings : 1;

    if (hasIncompletePrice) {
      return {
        recipe_id: recipe.recipe_id,
        recipe_title: recipe.title,
        servings,
        total_cost: null,
        cost_per_serving: null,
        cost_is_incomplete: true,
        ingredients,
      };
    }

    const total_cost = ingredients.reduce(
      (sum, item) => sum + (item.cost ?? 0),
      0,
    );

    return {
      recipe_id: recipe.recipe_id,
      recipe_title: recipe.title,
      servings,
      total_cost: Math.round(total_cost),
      cost_per_serving: Math.round(total_cost / servings),
      cost_is_incomplete: false,
      ingredients,
    };
  }

  // =========================
  // COMMUNITY PRICES
  // =========================

  async getRecipeCommunityPrices(recipeId: number) {
    const recipe = await this.recipeRepo.findOne({
      where: {
        recipe_id: recipeId,
        status: RecipeStatus.APPROVED,
      },
    });

    if (!recipe) {
      throw new NotFoundException({
        code: ErrorCode.RECIPE_NOT_FOUND,
        message: 'Không tìm thấy công thức hoặc công thức chưa được phép sử dụng.',
      });
    }

    const prices = await this.userRecipePriceRepo.find({
      where: { recipe_id: recipeId },
      order: { updated_at: 'DESC' },
    });

    const estimatedCost =
      recipe.estimated_cost != null ? Number(recipe.estimated_cost) : null;

    // Luôn trả estimated_cost
    const base: Record<string, any> = {
      recipe_id: recipeId,
      recipe_title: recipe.title,
      estimated_cost: estimatedCost,
      has_contributions: prices.length > 0,
    };

    if (prices.length === 0) {
      return {
        ...base,
        contributions: [],
        message: 'Chưa có giá tham khảo từ người dùng.',
        notice: 'Giá cộng đồng chỉ mang tính tham khảo và có thể thay đổi theo nơi mua.',
      };
    }

    const latest = prices[0];
    const actualPrices = prices.map((p) => Number(p.actual_price));
    const avg = actualPrices.reduce((s, v) => s + v, 0) / actualPrices.length;
    const min = Math.min(...actualPrices);
    const max = Math.max(...actualPrices);

    const latestPrice = Number(latest.actual_price);

    return {
      ...base,
      latest_price: latestPrice,
      latest_updated_at: latest.updated_at,
      diff_from_estimated:
        estimatedCost !== null
          ? Math.round((latestPrice - estimatedCost) * 100) / 100
          : null,
      stats: {
        average_price: Math.round(avg * 100) / 100,
        min_price: min,
        max_price: max,
        total_contributions: prices.length,
      },
      message: 'Giá cộng đồng được lấy từ lần cập nhật gần nhất.',
      notice: 'Giá cộng đồng chỉ mang tính tham khảo và có thể thay đổi theo nơi mua.',
    };
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

  // =========================
  // UPDATE RECIPE
  // =========================

  async updateRecipe(
    recipeId: number,
    userId: number,
    userRole: string,
    dto: UpdateRecipeDto,
  ) {
    const recipe = await this.recipeRepo.findOne({
      where: { recipe_id: recipeId },
    });

    if (!recipe) {
      throw new NotFoundException({ code: ErrorCode.RECIPE_NOT_FOUND, message: `Không tìm thấy công thức #${recipeId}` });
    }

    if (
      userRole !== 'admin' &&
      recipe.created_by !== userId
    ) {
      throw new ForbiddenException(
        'Bạn không có quyền cập nhật công thức này.',
      );
    }

    if (dto.ingredients) {
      const unsupportedIngredient = dto.ingredients.find(
        (item) =>
          (item.is_optional ?? false) === false && item.unit !== 'g',
      );

      if (unsupportedIngredient) {
        throw new BadRequestException(
          `Cannot calculate nutrition for unit "${unsupportedIngredient.unit}". Use "g" for required ingredients.`,
        );
      }
    }

    // Kiểm tra danh mục trước khi ghi gì vào DB.
    const categoryIds =
      dto.category_ids !== undefined
        ? [...new Set(dto.category_ids)]
        : undefined;

    if (categoryIds && categoryIds.length > 0) {
      const found = await this.recipeRepo.manager.count(Category, {
        where: { category_id: In(categoryIds) },
      });

      if (found !== categoryIds.length) {
        throw new BadRequestException('Có category_id không tồn tại');
      }
    }

    Object.assign(recipe, {
      title: dto.title ?? recipe.title,
      description: dto.description ?? recipe.description,
      instructions: dto.instructions ?? recipe.instructions,
      image_url: dto.image_url ?? recipe.image_url,
      prep_time: dto.prep_time ?? recipe.prep_time,
      cook_time: dto.cook_time ?? recipe.cook_time,
      servings: dto.servings ?? recipe.servings,
      difficulty: dto.difficulty ?? recipe.difficulty,
      meal_type: dto.meal_type ?? recipe.meal_type,
      diet_type: dto.diet_type ?? recipe.diet_type,
      source_video_id: dto.source_video_id ?? recipe.source_video_id,
      estimated_cost: dto.estimated_cost ?? recipe.estimated_cost,
    });

    const updatedRecipe = await this.recipeRepo.save(recipe);

    // Chỉ thay nguyên liệu nếu request có gửi trường ingredients.
    if (dto.ingredients !== undefined) {
      await this.recipeIngredientRepo.delete({
        recipe_id: recipeId,
      });

      if (dto.ingredients.length > 0) {
        const recipeIngredients = dto.ingredients.map((item) =>
          this.recipeIngredientRepo.create({
            recipe_id: recipeId,
            ingredient_id: item.ingredient_id,
            quantity: item.quantity,
            unit: item.unit,
            note: item.note,
            is_optional: item.is_optional ?? false,
          }),
        );

        await this.recipeIngredientRepo.save(recipeIngredients);
      }
    }

    // Chỉ đồng bộ danh mục nếu request có gửi category_ids ([] = bỏ hết danh mục).
    // Không gửi trường này thì giữ nguyên danh mục hiện tại.
    if (categoryIds !== undefined) {
      await this.recipeRepo.manager.transaction(async (manager) => {
        await manager.delete(RecipeCategory, { recipe_id: recipeId });

        if (categoryIds.length > 0) {
          await manager.insert(
            RecipeCategory,
            categoryIds.map((category_id) => ({
              recipe_id: recipeId,
              category_id,
            })),
          );
        }
      });
    }

    const ingredients = await this.recipeIngredientRepo.find({
      where: { recipe_id: recipeId },
      relations: ['ingredient'],
    });

    // Tính lại dinh dưỡng khi nguyên liệu hoặc số khẩu phần thay đổi.
    if (dto.ingredients !== undefined || dto.servings !== undefined) {
      const nutritionValues = this.calculateNutrition(ingredients, updatedRecipe.servings);

      let nutritionInfo = await this.nutritionRepo.findOne({
        where: { recipe_id: recipeId },
      });

      if (!nutritionInfo) {
        nutritionInfo = this.nutritionRepo.create({
          recipe_id: recipeId,
        });
      }

      Object.assign(nutritionInfo, nutritionValues);
      await this.nutritionRepo.save(nutritionInfo);
    }

    return {
      ...updatedRecipe,
      ingredients,
    };
  }

  // =========================
  // REMOVE RECIPE
  // =========================

  async removeRecipe(
    recipeId: number,
    userId: number,
    userRole: string,
  ) {
    const recipe = await this.recipeRepo.findOne({
      where: { recipe_id: recipeId },
    });

    if (!recipe) {
      throw new NotFoundException({ code: ErrorCode.RECIPE_NOT_FOUND, message: `Không tìm thấy công thức #${recipeId}` });
    }

    if (
      userRole !== 'admin' &&
      recipe.created_by !== userId
    ) {
      throw new ForbiddenException(
        'You do not have permission to delete this recipe',
      );
    }

    recipe.status = RecipeStatus.REMOVED;
    await this.recipeRepo.save(recipe);

    return {
      message: 'Đã xóa công thức thành công.',
      recipe_id: recipeId,
    };
  }

  // =========================
  // USER RECIPE PRICES
  // =========================

  async getMyRecipePrices(userId: number) {
    const prices = await this.userRecipePriceRepo.find({
      where: { user_id: userId },
      relations: ['recipe'],
      order: { updated_at: 'DESC' },
    });

    return prices.map((item) => {
      const recipe = item.recipe;
      const isApproved = recipe?.status === RecipeStatus.APPROVED;
      const estimatedCost =
        recipe?.estimated_cost != null
          ? Number(recipe.estimated_cost)
          : null;

      return {
        recipe_id: item.recipe_id,
        // Chỉ trả recipe object khi công thức được duyệt, không lộ công thức ẩn
        recipe: isApproved ? recipe : null,
        actual_price: Number(item.actual_price),
        estimated_cost: estimatedCost,
        diff:
          estimatedCost !== null
            ? Number(item.actual_price) - estimatedCost
            : null,
        updated_at: item.updated_at,
      };
    });
  }

  async setMyRecipePrice(
    userId: number,
    recipeId: number,
    actualPrice: number,
  ) {
    const recipe = await this.recipeRepo.findOne({
      where: { recipe_id: recipeId },
    });

    if (!recipe) {
      throw new NotFoundException({ code: ErrorCode.RECIPE_NOT_FOUND, message: `Không tìm thấy công thức #${recipeId}` });
    }

    if (recipe.status !== RecipeStatus.APPROVED) {
      throw new NotFoundException({ code: ErrorCode.RECIPE_NOT_FOUND, message: 'Không tìm thấy công thức hoặc công thức chưa được phép sử dụng.' });
    }

    let price = await this.userRecipePriceRepo.findOne({
      where: {
        user_id: userId,
        recipe_id: recipeId,
      },
    });

    if (price) {
      price.actual_price = actualPrice;
    } else {
      price = this.userRecipePriceRepo.create({
        user_id: userId,
        recipe_id: recipeId,
        actual_price: actualPrice,
      });
    }

    const saved = await this.userRecipePriceRepo.save(price);

    const estimatedCost =
      recipe.estimated_cost != null
        ? Number(recipe.estimated_cost)
        : null;

    return {
      recipe_id: recipeId,
      actual_price: Number(saved.actual_price),
      estimated_cost: estimatedCost,
      diff:
        estimatedCost !== null
          ? Number(saved.actual_price) - estimatedCost
          : null,
      updated_at: saved.updated_at,
    };
  }

  async removeMyRecipePrice(
    userId: number,
    recipeId: number,
  ) {
    const price = await this.userRecipePriceRepo.findOne({
      where: {
        user_id: userId,
        recipe_id: recipeId,
      },
    });

    if (!price) {
      throw new NotFoundException({ code: ErrorCode.RECIPE_NOT_FOUND, message: 'Không tìm thấy giá thực tế do bạn đóng góp cho công thức này.' });
    }

    await this.userRecipePriceRepo.remove(price);

    return {
      message: 'Đã xóa giá thực tế do bạn đóng góp.',
      recipe_id: recipeId,
    };
  }

  // =========================
  // ADMIN RECIPE REVIEW
  // =========================

  async findAllForAdmin(
    status?: string,
    categoryId?: number,
    page?: number,
    limit?: number,
  ) {
    const value = status?.trim().toLowerCase();
    if (value && !Object.values(RecipeStatus).includes(value as RecipeStatus)) {
      throw new BadRequestException('Trạng thái công thức không hợp lệ');
    }

    // Validate categoryId nếu truyền
    if (categoryId !== undefined && (isNaN(categoryId) || categoryId <= 0)) {
      throw new BadRequestException('ID danh mục phải là số nguyên dương');
    }

    // Validate phân trang
    if (page !== undefined && (isNaN(page) || page < 1)) {
      throw new BadRequestException('Số trang phải là số nguyên dương');
    }
    if (limit !== undefined) {
      if (isNaN(limit) || limit < 1) {
        throw new BadRequestException('Số lượng công thức mỗi trang phải là số nguyên dương');
      }
      if (limit > 100) {
        throw new BadRequestException('Số lượng công thức mỗi trang vượt quá giới hạn cho phép');
      }
    }

    const where: any = {};
    if (value) {
      where.status = value as RecipeStatus;
    }

    const pageNum = page ?? 1;
    const limitNum = limit ?? 20;
    const skip = (pageNum - 1) * limitNum;

    // Đếm tổng
    const total = await this.recipeRepo.count({ where });

    const recipes = await this.recipeRepo.find({
      where,
      order: { created_at: 'DESC' },
      skip,
      take: limitNum,
    });

    let filtered = recipes;
    if (categoryId) {
      const recipeIds = recipes.map((r) => r.recipe_id);
      if (recipeIds.length === 0) {
        filtered = [];
      } else {
        const rcRecords = await this.recipeCategoryRepo.find({
          where: { category_id: categoryId, recipe_id: In(recipeIds) },
        });
        const allowedIds = new Set(rcRecords.map((rc) => rc.recipe_id));
        filtered = recipes.filter((r) => allowedIds.has(r.recipe_id));
      }
    }

    if (filtered.length > 0) {
      const ids = filtered.map((r) => r.recipe_id);
      const nutritions = await this.nutritionRepo.find({
        where: { recipe_id: In(ids) },
      });
      const nutritionMap = new Map(nutritions.map((n) => [n.recipe_id, n]));
      for (const recipe of filtered as any[]) {
        recipe.nutrition = nutritionMap.get(recipe.recipe_id) || null;
      }
    }

    return {
      data: filtered,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
      },
      message: 'Lấy danh sách công thức quản trị thành công.',
    };
  }

  async updateRecipeStatus(
    recipeId: number,
    adminId: number,
    dto: UpdateRecipeStatusDto,
  ) {
    const recipe = await this.recipeRepo.findOne({
      where: { recipe_id: recipeId },
    });

    if (!recipe) {
      throw new NotFoundException({ code: ErrorCode.RECIPE_NOT_FOUND, message: `Không tìm thấy công thức #${recipeId}` });
    }

    const status = dto.status;

    if (
      status !== RecipeReviewStatus.APPROVED &&
      status !== RecipeReviewStatus.REJECTED
    ) {
      throw new BadRequestException(
        'Trạng thái công thức chỉ có thể là approved hoặc rejected',
      );
    }

    const reason = dto.reason?.trim();

    if (
      status === RecipeReviewStatus.REJECTED &&
      !reason
    ) {
      throw new BadRequestException(
        'Vui lòng nhập lý do từ chối công thức',
      );
    }

    recipe.status = status as unknown as RecipeStatus;

    if (status === RecipeReviewStatus.APPROVED) {
      recipe.approved_at = new Date();
      recipe.approved_by = adminId;
      recipe.review_reason = null;
    } else {
      recipe.approved_at = null;
      recipe.approved_by = null;
      recipe.review_reason = reason ?? null;
    }

    return this.recipeRepo.save(recipe);
  }
}
