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
import { DataSource, In, Repository } from 'typeorm';

import { Recipe, RecipeStatus, Difficulty } from './entities/recipe.entity';
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
import { assertValidRecipeCategoryIds } from '../category/category-validation.util';
import { calculateIngredientCost } from './recipe-cost.util';
import {
  isRecipeSuitableForMeal,
  deriveSuitableMeals,
  mealTypesSuitableFor,
  normalizeMealType,
  isConsistentMealPair,
  VALID_MEAL_TYPES,
} from './recipe-meals.util';

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

    private readonly dataSource: DataSource,
  ) {}

  // =========================
  // HELPER: CHUẨN HOÁ & KIỂM TRA TRƯỜNG BỮA ĂN
  // =========================

  /**
   * Chuẩn hoá meal_type + suitable_meals trước khi ghi vào DB.
   *
   * Quy tắc (theo dữ liệu gốc):
   *   - meal_type phải nằm trong danh sách hợp lệ, không phân biệt hoa thường.
   *   - suitable_meals phải khớp với meal_type theo mapping chuẩn.
   *     Không gửi suitable_meals thì suy ra từ meal_type.
   *
   * Trả về cặp { meal_type, suitable_meals } đã chuẩn hoá (có thể undefined).
   * Ném BadRequestException nếu dữ liệu không hợp lệ - để không tạo ra món
   * mà meal_type/suitable_meals mâu thuẫn nhau (nguồn gây món "lunch" nhưng
   * suitable_meals lại là "breakfast", khiến bữa tối không sinh được món).
   */
  private resolveMealFields(input: {
    meal_type?: string | null;
    suitable_meals?: string | null;
  }): { meal_type?: string; suitable_meals?: string } {
    const mealType = normalizeMealType(input.meal_type);

    if (input.meal_type?.trim() && !mealType) {
      throw new BadRequestException(
        `Loại bữa ăn "${input.meal_type}" không hợp lệ. Chỉ chấp nhận: ${VALID_MEAL_TYPES.join(', ')}.`,
      );
    }

    const rawSuitableMeals = input.suitable_meals?.trim();

    if (rawSuitableMeals) {
      // Client gửi suitable_meals: phải khớp meal_type, nếu không sẽ tạo dữ liệu mâu thuẫn.
      if (
        !mealType ||
        !isConsistentMealPair(mealType, rawSuitableMeals)
      ) {
        const expected = mealType
          ? deriveSuitableMeals(mealType)
          : null;

        throw new BadRequestException({
          code: ErrorCode.VALIDATION_FAILED,
          message:
            `suitable_meals "${rawSuitableMeals}" không khớp meal_type` +
            (mealType ? ` "${mealType}"` : '') +
            (expected ? ` (đúng phải là "${expected}")` : '') +
            '.',
        });
      }

      return {
        meal_type: mealType,
        suitable_meals: rawSuitableMeals,
      };
    }

    return {
      meal_type: mealType ?? undefined,
      suitable_meals: deriveSuitableMeals(mealType) ?? undefined,
    };
  }

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

    // Route công khai CHỈ trả món APPROVED, bất kể có truyền created_by hay không.
    // Trước đây khi có created_by và không truyền status thì nhánh đó bỏ qua
    // điều kiện status -> lộ công thức draft/pending_review/rejected ra API công khai.
    qb.where('recipe.status = :status', {
      status: RecipeStatus.APPROVED,
    });

    if (query.status?.trim()) {
      qb.andWhere('recipe.status = :status', {
        status: query.status.trim().toLowerCase(),
      });
    }

    // Lọc theo loại bữa ăn
    // meal_type là phân loại bữa chính; suitable_meals mới là danh sách bữa
    // thực sự phù hợp (vd. meal_type='lunch' nhưng suitable_meals='lunch,dinner').
    // Món chưa có suitable_meals thì suy ra từ meal_type theo mapping chuẩn.
    const selectedMealType = mealType || meal_type;

    if (selectedMealType?.trim()) {
      const mealTypeValue = selectedMealType.trim().toLowerCase();

      // Các meal_type hợp lệ cho bữa này khi món chưa có suitable_meals.
      const allowedMealTypes = mealTypesSuitableFor(mealTypeValue);

      // Nhánh "chưa có suitable_meals" chỉ ghép vào query khi danh sách
      // KHÔNG rỗng. Nếu để trống, TypeORM mở rộng IN (:...arr) thành
      // "IN ()" -> Postgres báo lỗi cú pháp -> HTTP 500.
      const legacyMealTypeClause =
        allowedMealTypes.length > 0
          ? `OR (
              (recipe.suitable_meals IS NULL OR TRIM(recipe.suitable_meals) = '')
              AND LOWER(recipe.meal_type) IN (:...allowedMealTypes)
            )`
          : '';

      qb.andWhere(
        `(
          LOWER(recipe.suitable_meals) = :mealType
          OR LOWER(recipe.suitable_meals) LIKE :mealTypeStart
          OR LOWER(recipe.suitable_meals) LIKE :mealTypeMiddle
          OR LOWER(recipe.suitable_meals) LIKE :mealTypeEnd
          OR LOWER(recipe.suitable_meals) = 'any'
          OR LOWER(recipe.meal_type) = :mealType
          OR LOWER(recipe.meal_type) = 'any'
          ${legacyMealTypeClause}
        )`,
        {
          mealType: mealTypeValue,
          mealTypeStart: `${mealTypeValue},%`,
          mealTypeMiddle: `%,${mealTypeValue},%`,
          mealTypeEnd: `%,${mealTypeValue}`,
          allowedMealTypes,
        },
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
      const difficultyValue = difficulty.trim().toLowerCase();
      const validDifficulties = Object.values(Difficulty) as string[];

      // recipes.difficulty là cột ENUM Postgres: truyền giá trị ngoài enum sẽ khiến
      // Postgres ném lỗi -> HTTP 500. Phải validate trước và trả 400.
      if (!validDifficulties.includes(difficultyValue)) {
        throw new BadRequestException(
          `Độ khó không hợp lệ. Chỉ chấp nhận: ${validDifficulties.join(', ')}`,
        );
      }

      qb.andWhere('recipe.difficulty = :difficulty', {
        difficulty: difficultyValue,
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

    // Nguyên liệu phải tồn tại và không được lặp lại.
    await this.validateIngredientIds(dto.ingredients);

    // meal_type / suitable_meals phải hợp lệ và nhất quán với nhau.
    const mealFields = this.resolveMealFields({
      meal_type: dto.meal_type,
      suitable_meals: dto.suitable_meals,
    });

    const status =
      userRole === 'admin'
        ? RecipeStatus.APPROVED
        : RecipeStatus.PENDING_REVIEW;

    // Ghi recipe + recipe_ingredients + nutrition_infos + recipe_categories:
    // bọc trong 1 transaction để không để lại recipe mồ côi khi 1 phần thất bại.
    const savedRecipe = await this.dataSource.transaction(async (manager) => {
      const recipeRepo = manager.getRepository(Recipe);
      const recipeIngredientRepo = manager.getRepository(RecipeIngredient);
      const nutritionRepo = manager.getRepository(NutritionInfo);
      const recipeCategoryRepo = manager.getRepository(RecipeCategory);
      const categoryRepo = manager.getRepository(Category);

      const recipe = recipeRepo.create({
        title: dto.title,
        description: dto.description,
        instructions: dto.instructions,
        image_url: dto.image_url,
        prep_time: dto.prep_time,
        cook_time: dto.cook_time,
        servings: dto.servings,
        difficulty: dto.difficulty,
        meal_type: mealFields.meal_type,
        // suitable_meals: đã chuẩn hoá + khớp meal_type ở resolveMealFields().
        suitable_meals: mealFields.suitable_meals,
        diet_type: dto.diet_type,
        source_video_id: dto.source_video_id,
        estimated_cost: dto.estimated_cost,
        created_by: userId,
        status,
        // Admin tạo thì duyệt luôn: ghi nhận người duyệt và thời điểm như luồng PUT /admin/recipes/:id/status.
        approved_at: status === RecipeStatus.APPROVED ? new Date() : null,
        approved_by: status === RecipeStatus.APPROVED ? userId : null,
      } as Partial<Recipe>);

      const created = await recipeRepo.save(recipe);

      if (dto.ingredients && dto.ingredients.length > 0) {
        const recipeIngredients = dto.ingredients.map((item) =>
          recipeIngredientRepo.create({
            recipe_id: created.recipe_id,
            ingredient_id: item.ingredient_id,
            quantity: item.quantity,
            unit: item.unit,
            note: item.note,
            is_optional: item.is_optional ?? false,
          }),
        );

        await recipeIngredientRepo.save(recipeIngredients);
      }

      // Nạp lại nguyên liệu (kèm relation) để tính dinh dưỡng.
      const ingredients = await recipeIngredientRepo.find({
        where: { recipe_id: created.recipe_id },
        relations: ['ingredient'],
      });

      const nutrition = this.calculateNutrition(ingredients, created.servings);

      const savedNutrition = await nutritionRepo.save(
        nutritionRepo.create({
          recipe_id: created.recipe_id,
          ...nutrition,
        }),
      );

      // Tạo category links khi request có gửi category_ids.
      // Trước đây: nếu 1 category_id không tồn tại thì `found !== uniqueIds.length`
      // khiến TOÀN BỘ danh mục bị bỏ qua mà không báo lỗi (công thức lưu ra không có danh mục).
      // Nay: validate trước và ném 400 để client biết chính xác danh mục nào sai.
      if (
        dto.category_ids !== undefined &&
        Array.isArray(dto.category_ids) &&
        dto.category_ids.length > 0
      ) {
        const uniqueIds = [...new Set(dto.category_ids)];

        const invalidIds = uniqueIds.filter(
          (id) => !Number.isInteger(id) || id <= 0,
        );
        if (invalidIds.length > 0) {
          throw new BadRequestException({
            code: ErrorCode.VALIDATION_FAILED,
            message: `category_ids phải là số nguyên dương: ${invalidIds.join(', ')}`,
          });
        }

        const foundCategories = await categoryRepo.find({
          where: { category_id: In(uniqueIds) },
        });

        assertValidRecipeCategoryIds(uniqueIds, foundCategories);

        await recipeCategoryRepo.save(
          uniqueIds.map((category_id) =>
            recipeCategoryRepo.create({
              recipe_id: created.recipe_id,
              category_id,
            }),
          ),
        );
      }

      return {
        recipe: created,
        ingredients,
        nutrition: savedNutrition,
      };
    });

    return {
      ...savedRecipe.recipe,
      ingredients: savedRecipe.ingredients,
      nutrition: savedRecipe.nutrition,
    };
  }

  /**
   * Kiểm tra danh sách nguyên liệu của công thức:
   * - ingredient_id phải tồn tại trong bảng ingredients.
   * - Không được lặp lại cùng một ingredient_id.
   *
   * Trước đây thiếu bước này: gửi ingredient_id không tồn tại sẽ gây lỗi
   * foreign key (500), còn gửi trùng sẽ tạo dòng recipe_ingredients lặp.
   */
  private async validateIngredientIds(
    ingredients?: { ingredient_id: number }[],
  ): Promise<void> {
    if (!ingredients || ingredients.length === 0) {
      return;
    }

    const ids = ingredients.map((item) => Number(item.ingredient_id));

    const uniqueIds = [...new Set(ids)];

    if (uniqueIds.length !== ids.length) {
      throw new BadRequestException({
        code: ErrorCode.VALIDATION_FAILED,
        message: 'Công thức có nguyên liệu bị lặp lại.',
      });
    }

    const found = await this.ingredientService.findByIds(uniqueIds);

    const foundIds = new Set(found.map((item) => item.ingredient_id));

    const missing = uniqueIds.filter((id) => !foundIds.has(id));

    if (missing.length > 0) {
      throw new BadRequestException({
        code: ErrorCode.VALIDATION_FAILED,
        message: `Nguyên liệu không tồn tại: ${missing.join(', ')}`,
      });
    }
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

    // Nguyên liệu phải tồn tại và không được lặp lại.
    await this.validateIngredientIds(dto.ingredients);

    // meal_type / suitable_meals phải hợp lệ và nhất quán với nhau.
    // Tính TRƯỚC khi mở transaction để lỗi validation không sinh thay đổi nào.
    //
    // Chỉ kiểm tra khi client thực sự gửi lên trường bữa ăn:
    //   - gửi suitable_meals -> phải khớp meal_type (mới hoặc đang lưu).
    //   - gửi meal_type mà không gửi suitable_meals -> suy ra lại cho khớp.
    //   - không gửi gì -> giữ nguyên cặp đang lưu (kể cả dòng dữ liệu cũ
    //     đang lệch chuẩn, không nên chặn cập nhật trường khác).
    let nextMealType: string | null = recipe.meal_type ?? null;
    let nextSuitableMeals: string | null = recipe.suitable_meals ?? null;

    if (dto.suitable_meals !== undefined) {
      const resolved = this.resolveMealFields({
        meal_type: dto.meal_type ?? recipe.meal_type,
        suitable_meals: dto.suitable_meals,
      });

      nextMealType = resolved.meal_type ?? null;
      nextSuitableMeals = resolved.suitable_meals ?? null;
    } else if (dto.meal_type !== undefined) {
      const resolved = this.resolveMealFields({
        meal_type: dto.meal_type,
      });

      nextMealType = resolved.meal_type ?? null;
      nextSuitableMeals = resolved.suitable_meals ?? null;
    }

    // Kiểm tra danh mục trước khi ghi gì vào DB.
    // Trước đây chỉ so sánh COUNT nên không biết id nào sai; và không kiểm tra
    // category_type => có thể gắn danh mục loại khác (vd. forum) vào công thức.
    const categoryIds =
      dto.category_ids !== undefined
        ? [...new Set(dto.category_ids)]
        : undefined;

    if (categoryIds && categoryIds.length > 0) {
      const invalidIds = categoryIds.filter(
        (id) => !Number.isInteger(id) || id <= 0,
      );
      if (invalidIds.length > 0) {
        throw new BadRequestException({
          code: ErrorCode.VALIDATION_FAILED,
          message: `category_ids phải là số nguyên dương: ${invalidIds.join(', ')}`,
        });
      }

      const foundCategories = await this.recipeRepo.manager.find(Category, {
        where: { category_id: In(categoryIds) },
      });

      assertValidRecipeCategoryIds(categoryIds, foundCategories);
    }

    // Ghi recipe + recipe_ingredients + recipe_categories + nutrition_infos:
    // bọc trong 1 transaction để không để lại dữ liệu mồ côi / mất nối khi
    // 1 phần thất bại (trước đây xoá nguyên liệu rồi mới lưu, lỗi là mất cả).
    const updatedRecipe = await this.dataSource.transaction(async (manager) => {
      const recipeRepo = manager.getRepository(Recipe);
      const recipeIngredientRepo = manager.getRepository(RecipeIngredient);
      const recipeCategoryRepo = manager.getRepository(RecipeCategory);
      const nutritionRepo = manager.getRepository(NutritionInfo);

      Object.assign(recipe, {
        title: dto.title ?? recipe.title,
        description: dto.description ?? recipe.description,
        instructions: dto.instructions ?? recipe.instructions,
        image_url: dto.image_url ?? recipe.image_url,
        prep_time: dto.prep_time ?? recipe.prep_time,
        cook_time: dto.cook_time ?? recipe.cook_time,
        servings: dto.servings ?? recipe.servings,
        difficulty: dto.difficulty ?? recipe.difficulty,
        meal_type: nextMealType,
        // suitable_meals: đã chuẩn hoá + khớp meal_type ở resolveMealFields().
        suitable_meals: nextSuitableMeals,
        diet_type: dto.diet_type ?? recipe.diet_type,
        source_video_id: dto.source_video_id ?? recipe.source_video_id,
        estimated_cost: dto.estimated_cost ?? recipe.estimated_cost,
      });

      const saved = await recipeRepo.save(recipe);

      // Chỉ thay nguyên liệu nếu request có gửi trường ingredients.
      if (dto.ingredients !== undefined) {
        await recipeIngredientRepo.delete({
          recipe_id: recipeId,
        });

        if (dto.ingredients.length > 0) {
          const recipeIngredients = dto.ingredients.map((item) =>
            recipeIngredientRepo.create({
              recipe_id: recipeId,
              ingredient_id: item.ingredient_id,
              quantity: item.quantity,
              unit: item.unit,
              note: item.note,
              is_optional: item.is_optional ?? false,
            }),
          );

          await recipeIngredientRepo.save(recipeIngredients);
        }
      }

      // Chỉ đồng bộ danh mục nếu request có gửi category_ids ([] = bỏ hết danh mục).
      // Không gửi trường này thì giữ nguyên danh mục hiện tại.
      if (categoryIds !== undefined) {
        await recipeCategoryRepo.delete({ recipe_id: recipeId });

        if (categoryIds.length > 0) {
          await recipeCategoryRepo.save(
            categoryIds.map((category_id) =>
              recipeCategoryRepo.create({
                recipe_id: recipeId,
                category_id,
              }),
            ),
          );
        }
      }

      const ingredients = await recipeIngredientRepo.find({
        where: { recipe_id: recipeId },
        relations: ['ingredient'],
      });

      // Tính lại dinh dưỡng khi nguyên liệu hoặc số khẩu phần thay đổi.
      if (dto.ingredients !== undefined || dto.servings !== undefined) {
        const nutritionValues = this.calculateNutrition(
          ingredients,
          saved.servings,
        );

        let nutritionInfo = await nutritionRepo.findOne({
          where: { recipe_id: recipeId },
        });

        if (!nutritionInfo) {
          nutritionInfo = nutritionRepo.create({
            recipe_id: recipeId,
          });
        }

        Object.assign(nutritionInfo, nutritionValues);
        await nutritionRepo.save(nutritionInfo);
      }

      return { recipe: saved, ingredients };
    });

    return {
      ...updatedRecipe.recipe,
      ingredients: updatedRecipe.ingredients,
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

    // Lọc theo danh mục PHẢI áp dụng TRƯỚC khi phân trang, nếu không trang
    // hiện tại có thể rỗng dù DB có món thuộc danh mục, và `total` không
    // phản ánh đúng số món của danh mục đó.
    if (categoryId !== undefined) {
      const rcRecords = await this.recipeCategoryRepo.find({
        where: { category_id: categoryId },
        select: { recipe_id: true },
      });

      const recipeIds = [...new Set(rcRecords.map((rc) => rc.recipe_id))];

      if (recipeIds.length === 0) {
        return {
          data: [],
          pagination: {
            page: page ?? 1,
            limit: limit ?? 20,
            total: 0,
          },
          message: 'Lấy danh sách công thức quản trị thành công.',
        };
      }

      where.recipe_id = In(recipeIds);
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

    const filtered = recipes;

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
