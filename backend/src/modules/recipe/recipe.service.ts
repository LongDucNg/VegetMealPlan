import { ErrorCode } from '../../common/constants/error-codes.enum';
import { getAllowedRecipeDiets } from '../../common/utils/diet.util';
import { assertRecipeDietCompatible } from '../../common/utils/diet-compat.util';
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
import { QueryRecipeDto } from './dto/query-recipe.dto';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { NutritionInfo } from '../nutrition/entities/nutrition-info.entity';
import { IngredientService } from '../ingredient/ingredient.service';
import { RecipeCategory } from './entities/recipe-category.entity';
import { Category } from '../category/entities/category.entity';
import { assertValidRecipeCategoryIds } from '../category/category-validation.util';
import { calculateNutritionPerServing } from './recipe-nutrition.util';
import { RecipeValidatorService } from './recipe-validator.service';
import {
  assertRecipeTitleVegetarian,
  assertRecipeValidation,
  buildRecipeDuplicateKey,
  normalizeRecipeTitle,
} from './recipe-validation.util';
import {
  deriveSuitableMeals,
  mealTypesSuitableFor,
  normalizeMealType,
  isConsistentMealPair,
  VALID_MEAL_TYPES,
} from './recipe-meals.util';

export interface IngredientConflictWarning {
  ingredient_id_1: number;
  ingredient_id_2: number;
  reason: string;
}

/**
 * Nghiệp vụ chính của công thức: tìm kiếm, xem chi tiết, tạo, sửa, xoá món.
 *
 * Các nhóm chức năng khác đã tách sang service riêng cùng thư mục:
 *   - RecipeExportService         : xuất CSV
 *   - RecipeFavoriteService       : món yêu thích
 *   - RecipeRecommendationService : gợi ý món, nguyên liệu thay thế
 *   - RecipePriceService          : chi phí và giá món
 *   - RecipeAdminService          : duyệt món, danh sách cho admin
 */
@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepo: Repository<Recipe>,

    @InjectRepository(RecipeIngredient)
    private readonly recipeIngredientRepo: Repository<RecipeIngredient>,

    @InjectRepository(NutritionInfo)
    private readonly nutritionRepo: Repository<NutritionInfo>,

    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,

    private readonly ingredientService: IngredientService,

    private readonly recipeValidator: RecipeValidatorService,

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

  async findAll(query: QueryRecipeDto, options: { approvedOnly?: boolean } = {}) {
    const {
      q,
      mealType,
      meal_type,
      vegetarianType,
      diet_type,
      exactDiet,
      category,
      difficulty,
      maxCalories,
      excludeAllergens,
      created_by,
      page = 1,
      limit = 20,
    } = query;

    // Mặc định (route công khai) chỉ trả món đã duyệt. Admin export được
    // phép đặt approvedOnly = false để lọc theo mọi trạng thái.
    const approvedOnly = options.approvedOnly ?? true;

    // Route công khai chỉ trả món đã duyệt. Xem trạng thái khác (draft, pending_review, rejected,
    // removed) dùng GET /admin/recipes?status=... (cần quyền admin).
    if (query.status?.trim()) {
      const requested = query.status.trim().toLowerCase();
      if (!Object.values(RecipeStatus).includes(requested as RecipeStatus)) {
        throw new BadRequestException(
          `status phải là một trong: ${Object.values(RecipeStatus).join(', ')}`,
        );
      }
      if (approvedOnly && requested !== RecipeStatus.APPROVED) {
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
    if (approvedOnly) {
      qb.where('recipe.status = :status', {
        status: RecipeStatus.APPROVED,
      });
    } else if (query.status?.trim()) {
      qb.where('recipe.status = :status', {
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

      if (
        mealTypeValue === 'breakfast_lunch' ||
        mealTypeValue === 'sang_trua' ||
        mealTypeValue === 'breakfast,lunch'
      ) {
        qb.andWhere(
          `(
            LOWER(recipe.meal_type) IN ('breakfast', 'lunch', 'any', 'dinner')
            OR LOWER(recipe.suitable_meals) IN ('breakfast', 'lunch', 'any', 'dinner')
            OR LOWER(recipe.suitable_meals) LIKE '%breakfast%'
            OR LOWER(recipe.suitable_meals) LIKE '%lunch%'
            OR LOWER(recipe.suitable_meals) = 'any'
            OR recipe.suitable_meals IS NULL
          ) AND (
            LOWER(recipe.meal_type) <> 'snack' AND (recipe.suitable_meals IS NULL OR LOWER(recipe.suitable_meals) <> 'snack')
          )`,
        );
      } else {
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
    }

    // Tìm kiếm theo tên công thức
    if (q?.trim()) {
      qb.andWhere('LOWER(recipe.title) LIKE LOWER(:q)', {
        q: `%${q.trim()}%`,
      });
    }

    // Lọc theo danh mục (hỗ trợ cả category ID và tên danh mục)
    if (category?.trim()) {
      const rawCat = category.trim();
      let categoryId = Number(rawCat);

      if (!Number.isInteger(categoryId) || categoryId <= 0) {
        const found = await this.categoryRepo
          .createQueryBuilder('cat')
          .where('LOWER(cat.category_name) = LOWER(:name) OR LOWER(cat.description) = LOWER(:name)', { name: rawCat })
          .getOne();
        if (found) {
          categoryId = found.category_id;
        } else {
          const foundLike = await this.categoryRepo
            .createQueryBuilder('cat')
            .where('LOWER(cat.category_name) LIKE LOWER(:name) OR LOWER(cat.description) LIKE LOWER(:name)', { name: `%${rawCat}%` })
            .getOne();
          if (foundLike) {
            categoryId = foundLike.category_id;
          }
        }
      }

      if (Number.isInteger(categoryId) && categoryId > 0) {
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
    }

    // Lọc theo chế độ ăn
    const selectedDiet = vegetarianType || diet_type;

    if (selectedDiet?.trim()) {
      let dietType = selectedDiet.trim().toLowerCase();
      if (dietType === 'lacto_vegetarian') dietType = 'lacto';
      if (dietType === 'ovo_vegetarian') dietType = 'ovo';
      if (dietType === 'lacto_ovo_vegetarian') dietType = 'ovo_lacto';
      const validDietTypes = ['vegan', 'lacto', 'ovo', 'ovo_lacto'];

      if (!validDietTypes.includes(dietType)) {
        throw new BadRequestException(
          'Chế độ ăn chay không hợp lệ. Chỉ chấp nhận: vegan, lacto, ovo hoặc ovo_lacto.',
        );
      }

      // diet_type là cột enum Postgres: không dùng LOWER() được (dietType đã chuẩn hoá thường ở trên).
      // Lọc theo TẬP chế độ ăn tương thích, không so sánh bằng đẳng thức:
      // người ăn lacto vẫn ăn được món vegan, người ăn ovo_lacto ăn được cả 4 loại.
      // Nếu so sánh đẳng thức thì GET /recipes?diet_type=lacto chỉ trả về 30 món
      // thay vì 405 món (375 vegan + 30 lacto) -> lệch với luồng sinh thực đơn.
      if (
        dietType === 'lacto_ovo_vegetarian' ||
        dietType === 'ovo_lacto' ||
        dietType === 'ovo-lacto' ||
        dietType === 'lacto-ovo'
      ) {
        dietType = 'ovo_lacto';
      }

      // Khi exactDiet = true (người dùng chọn lọc trên trang thư viện công thức):
      // So sánh chính xác diet_type của món (vegan -> 545 món thuần chay, ovo -> 46 món chay trứng, lacto -> 33 món chay sữa).
      // Khi không truyền exactDiet: lọc theo tập tương thích (lacto ăn được cả vegan).
      if (exactDiet || query.exactDiet) {
        qb.andWhere('recipe.diet_type = :dietType', { dietType });
      } else {
        const allowedDiets = getAllowedRecipeDiets(dietType);
        if (allowedDiets && allowedDiets.length > 0) {
          qb.andWhere('recipe.diet_type IN (:...allowedDiets)', {
            allowedDiets,
          });
        }
      }
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
      const [nutritions, recipeIngredients] = await Promise.all([
        this.nutritionRepo.find({
          where: { recipe_id: In(recipeIds) },
        }),
        this.recipeIngredientRepo.find({
          where: { recipe_id: In(recipeIds) },
          relations: ['ingredient'],
        }),
      ]);
      const nutritionMap = new Map(nutritions.map((n) => [n.recipe_id, n]));

      const riMap = new Map<number, any[]>();
      for (const ri of recipeIngredients) {
        const list = riMap.get(ri.recipe_id) || [];
        const calPer100 = Number(ri.ingredient?.calories_per_100g ?? 0);
        const ratio = Number(ri.quantity ?? 0) / 100;
        const cal = Math.round(calPer100 * ratio * 100) / 100;
        list.push({
          ingredient_id: ri.ingredient_id,
          ingredient_name: ri.ingredient?.ingredient_name ?? '',
          quantity: ri.quantity,
          unit: ri.unit,
          is_optional: ri.is_optional,
          calories_per_100g: ri.ingredient?.calories_per_100g ?? null,
          calories: cal,
        });
        riMap.set(ri.recipe_id, list);
      }

      for (const recipe of recipes as any[]) {
        const list = riMap.get(recipe.recipe_id) || [];
        const nut = nutritionMap.get(recipe.recipe_id) || null;
        const totalIngKcal = list.reduce((sum: number, item: any) => {
          if (item.is_optional) return sum;
          const calPer100 = Number(item.calories_per_100g ?? 0);
          return sum + (calPer100 * Number(item.quantity ?? 0)) / 100;
        }, 0);

        if (totalIngKcal > 0) {
          const finalCal = Math.round(totalIngKcal * 100) / 100;
          recipe.calories = finalCal;
          if (nut) {
            nut.calories = finalCal;
          }
        }
        recipe.nutrition = nut;
        recipe.recipe_ingredients = list;
        recipe.ingredient_count = recipe.recipe_ingredients.length;
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

    const totalIngKcal = (ingredients || []).reduce((sum, item) => {
      if (item.is_optional) return sum;
      const calPer100 = Number(item.ingredient?.calories_per_100g ?? 0);
      return sum + (calPer100 * Number(item.quantity ?? 0)) / 100;
    }, 0);

    if (totalIngKcal > 0) {
      const finalCal = Math.round(totalIngKcal * 100) / 100;
      (recipe as any).calories = finalCal;
      if (nutrition) {
        nutrition.calories = finalCal;
      }
    }

    return {
      ...recipe,
      ingredients,
      nutrition,
    };
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
    // Tiêu đề phải được trim + không rỗng (DTO đã chuẩn hoá sẵn, nhưng service
    // cũng có thể được gọi trực tiếp trong test -> kiểm tra lại ở đây).
    const title = typeof dto.title === 'string' ? dto.title.trim() : '';

    if (!title) {
      throw new BadRequestException({
        code: ErrorCode.VALIDATION_FAILED,
        message: 'Tên món không được để trống.',
      });
    }

    // Hệ thống chỉ có món chay: tên kiểu "Gà xào xả ớt" (không có chữ "chay") bị chặn.
    assertRecipeTitleVegetarian(title);

    // Công thức PHẢI có ít nhất 1 nguyên liệu. DTO đã chặn sẵn, nhưng service
    // cũng có thể được gọi trực tiếp (test/script) -> kiểm tra lại ở đây.
    if (!Array.isArray(dto.ingredients) || dto.ingredients.length === 0) {
      throw new BadRequestException({
        code: ErrorCode.VALIDATION_FAILED,
        message: 'Công thức phải có ít nhất 1 nguyên liệu.',
      });
    }

    // Validator DÙNG CHUNG với update + import:
    //   - nguyên liệu tồn tại, active, không trùng lặp;
    //   - quantity > 0, đơn vị "g" cho nguyên liệu bắt buộc;
    //   - keyword trên TÊN NGUYÊN LIỆU;
    //   - diet_type của công thức vs từng nguyên liệu.
    const ingredientCheck = await this.recipeValidator.validateApiIngredients(
      dto.ingredients,
      dto.diet_type,
    );

    assertRecipeValidation(
      { isValid: ingredientCheck.isValid, violations: ingredientCheck.violations },
      'Công thức không hợp lệ:',
    );

    // Chống trùng món: CHỈ áp dụng cho ADMIN.
    // User thường vẫn được gửi công thức trùng để chờ admin duyệt.
    // Trùng = cùng tiêu đề (trim + không phân biệt hoa/thường) VÀ cùng tập
    // ingredient_id (thứ tự nguyên liệu không quan trọng).
    if (userRole === 'admin') {
      await this.assertRecipeNotDuplicate(
        title,
        ingredientCheck.resolved.map((item) => item.ingredient_id),
      );
    }

    // meal_type / suitable_meals phải hợp lệ và nhất quán với nhau.
    const mealFields = this.resolveMealFields({
      meal_type: dto.meal_type,
      suitable_meals: dto.suitable_meals,
    });

    // Kiểm tra tương thích giữa chế độ ăn chay và nguyên liệu THỰC TẾ.
    // Dùng chung helper với luồng cập nhật / import / duyệt để cả 4 luồng
    // báo lỗi giống nhau. Trước đây chỉ luồng tạo có kiểm tra, và regex chỉ bắt
    // trứng + 6 biến thể sữa nên thịt/cá vẫn lọt qua.
    await this.assertRecipeDietCompatible(
      dto.diet_type,
      dto.ingredients,
    );

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
        title,
        description: dto.description,
        instructions: dto.instructions,
        image_url: dto.image_url,
        video_url: dto.video_url,
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
            // Đơn vị đã được validator chuẩn hoá (trim + không phân biệt hoa thường).
            unit: item.unit.trim(),
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

        // Kiểm tra cả tồn tại lẫn loại danh mục hợp lệ (recipe_type/food_type).
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
   * Lấy tập `ingredient_id` hiện tại của một công thức.
   * Dùng khi cập nhật mà client KHÔNG gửi lại `ingredients` -> tập nguyên liệu
   * dùng để so sánh trùng là tập đang lưu trong DB.
   */
  private async getRecipeIngredientIds(
    recipeId: number,
  ): Promise<number[]> {
    const rows = await this.recipeIngredientRepo.find({
      where: { recipe_id: recipeId },
    });

    return rows.map((row) => row.ingredient_id);
  }

  /**
   * Chặn trùng MÓN (tiêu đề + tập nguyên liệu) khi ADMIN tạo công thức.
   *
   * Quy tắc:
   *   - Trùng khi tiêu đề giống nhau (đã trim, không phân biệt hoa/thường)
   *     VÀ tập `ingredient_id` giống nhau (thứ tự nguyên liệu không quan trọng).
   *   - Cùng tiêu đề nhưng KHÁC tập nguyên liệu -> được phép tạo.
   *
   * User thường KHÔNG bị chặn vì công thức của họ còn chờ admin duyệt.
   */
  private async assertRecipeNotDuplicate(
    title: string | null | undefined,
    ingredientIds: number[] | undefined,
    excludeRecipeId?: number,
  ): Promise<void> {
    const key = normalizeRecipeTitle(title);

    if (!key) {
      return;
    }

    const targetKey = buildRecipeDuplicateKey(title, ingredientIds);

    const existing = await this.recipeRepo
      .createQueryBuilder('recipe')
      .select('recipe.recipe_id', 'recipe_id')
      .addSelect('recipe.title', 'title')
      .where(
        "LOWER(BTRIM(REGEXP_REPLACE(recipe.title, '\\s+', ' ', 'g'))) = :key",
        { key },
      )
      .andWhere('recipe.status != :removedStatus', {
        removedStatus: RecipeStatus.REMOVED,
      })
      .getRawMany<{ recipe_id: number; title: string }>();

    const candidateIds = existing
      .map((row) => row.recipe_id)
      .filter((id) => id !== excludeRecipeId);

    if (candidateIds.length === 0) {
      return;
    }

    // Lấy tập nguyên liệu của các món trùng tiêu đề để so sánh.
    const recipeIngredients = await this.recipeIngredientRepo.find({
      where: { recipe_id: In(candidateIds) },
    });

    const idsByRecipe = new Map<number, number[]>();

    for (const row of recipeIngredients) {
      const list = idsByRecipe.get(row.recipe_id) ?? [];
      list.push(row.ingredient_id);
      idsByRecipe.set(row.recipe_id, list);
    }

    const duplicate = candidateIds.find((id) => {
      const existingKey = buildRecipeDuplicateKey(
        existing.find((row) => row.recipe_id === id)?.title,
        idsByRecipe.get(id) ?? [],
      );

      return existingKey === targetKey;
    });

    if (duplicate !== undefined) {
      throw new ConflictException({
        code: ErrorCode.RECIPE_TITLE_DUPLICATE,
        message:
          `Công thức "${title?.trim()}" đã tồn tại trong hệ thống ` +
          `(cùng tên và cùng tập nguyên liệu).`,
      });
    }
  }

  /**
   * Kiểm tra tương thích giữa diet_type của công thức và nguyên liệu thực tế.
   *
   * Dùng chung cho cả 3 luồng trong recipe.service.ts (tạo / cập nhật / duyệt)
   * để cùng một bộ quy tắc và cùng một mã lỗi RECIPE_DIET_INCOMPATIBLE.
   * Thành phần quy tắc nằm trong common/utils/diet-compat.util.ts.
   *
   * @param dietType chế độ ăn của công thức (null = kiểm tra theo mức nghiêm ngặt nhất).
   * @param ingredients danh sách nguyên liệu trong request (dạng { ingredient_id }).
   */
  private async assertRecipeDietCompatible(
    dietType?: string | null,
    ingredients?: { ingredient_id: number }[],
  ): Promise<void> {
    if (!ingredients || ingredients.length === 0) {
      return;
    }

    const ids = [...new Set(ingredients.map((item) => Number(item.ingredient_id)))];

    const dbIngredients = await this.ingredientService.findByIds(ids);

    // Nguyên liệu không tồn tại đã bị validateIngredientIds() loại trước đó.
    // Ở đây chỉ kiểm tra những cái tìm thấy được.
    assertRecipeDietCompatible(
      dietType,
      dbIngredients.map((item) => ({
        ingredient_id: item.ingredient_id,
        ingredient_name: item.ingredient_name,
        vegan_flag: item.vegan_flag,
      })),
    );
  }

  /**
   * Lấy nguyên liệu thực tế đang gắn với một công thức trong DB.
   * Dùng cho luồng duyệt công thức (admin) để kiểm tra lại trước khi duyệt.
   */
  async getRecipeIngredientsForCheck(
    recipeId: number,
  ): Promise<
    {
      ingredient_id: number;
      ingredient_name: string;
      vegan_flag: boolean;
    }[]
  > {
    const rows = await this.recipeIngredientRepo.find({
      where: { recipe_id: recipeId },
      relations: ['ingredient'],
    });

    return rows
      .filter((row) => !!row.ingredient)
      .map((row) => ({
        ingredient_id: row.ingredient_id,
        ingredient_name: row.ingredient.ingredient_name,
        vegan_flag: row.ingredient.vegan_flag,
      }));
  }

  // =========================
  // CALCULATE NUTRITION
  // =========================

  // nutrition_infos lưu trên 1 KHẨU PHẦN (cùng quy ước với seed, import và
  // bộ sinh thực đơn), nên chia tổng của cả món cho số khẩu phần.
  // Dùng CHUNG calculateNutritionPerServing() để không có 2 chỗ tự tính lệch nhau.
  private calculateNutrition(
    ingredients: RecipeIngredient[],
    servings?: number | null,
  ) {
    return calculateNutritionPerServing(
      ingredients.map((item) => ({
        quantity: Number(item.quantity ?? 0),
        is_optional: item.is_optional,
        ingredient: item.ingredient
          ? {
              calories_per_100g: item.ingredient.calories_per_100g,
              protein_per_100g: item.ingredient.protein_per_100g,
              carb_per_100g: item.ingredient.carb_per_100g,
              fat_per_100g: item.ingredient.fat_per_100g,
              fiber_per_100g: item.ingredient.fiber_per_100g,
            }
          : null,
      })),
      servings,
    );
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

    // Tiêu đề mới (nếu có) phải được trim + không rỗng.
    const nextTitle =
      dto.title !== undefined
        ? typeof dto.title === 'string'
          ? dto.title.trim()
          : ''
        : undefined;

    if (dto.title !== undefined && !nextTitle) {
      throw new BadRequestException({
        code: ErrorCode.VALIDATION_FAILED,
        message: 'Tên món không được để trống.',
      });
    }

    // Đổi tên thì tên mới cũng phải là tên món chay (cùng quy tắc với tạo món và import).
    if (nextTitle !== undefined) {
      assertRecipeTitleVegetarian(nextTitle);
    }

    // Validator DÙNG CHUNG với create + import.
    // diet_type dùng giá trị MỚI nếu có, nếu không thì dùng giá trị đang lưu
    // (để đổi nguyên liệu mà không gửi diet_type vẫn được kiểm tra đúng chế độ).
    const nextDietType = dto.diet_type ?? recipe.diet_type;

    const ingredientCheck = await this.recipeValidator.validateApiIngredients(
      dto.ingredients,
      nextDietType,
    );

    assertRecipeValidation(
      {
        isValid: ingredientCheck.isValid,
        violations: ingredientCheck.violations,
      },
      'Công thức không hợp lệ:',
    );

    // Chống trùng món khi CẬP NHẬT: dùng CÙNG quy tắc với create/import
    // (tên chuẩn hoá + tập `ingredient_id` đã sort) -> cùng tên nhưng khác
    // nguyên liệu vẫn được phép; chính recipe đang sửa bị loại trừ.
    //
    // Tập nguyên liệu dùng để so sánh là tập SAU khi cập nhật:
    //   - client gửi ingredients -> dùng tập đã validate;
    //   - không gửi ingredients -> dùng tập nguyên liệu hiện tại của món.
    if (nextTitle !== undefined) {
      const nextIngredientIds =
        dto.ingredients !== undefined
          ? ingredientCheck.resolved.map((item) => item.ingredient_id)
          : await this.getRecipeIngredientIds(recipeId);

      await this.assertRecipeNotDuplicate(
        nextTitle,
        nextIngredientIds,
        recipeId,
      );
    }

    // Kiểm tra tương thích diet_type <-> nguyên liệu.
    // Trước đây luồng cập nhật KHÔNG có bước này => user sở hữu công thức
    // có thể thêm nguyên liệu mặn vào một món vegan đã tạo thành công.
    //
    // diet_type lấy theo giá trị MỚI nếu request có gửi, nếu không thì giữ
    // giá trị đang lưu (để kiểm tra cả trường hợp chỉ đổi nguyên liệu).
    //
    // THỰC TẾ ĐANG LƯU cũng phải được kiểm tra khi request KHÔNG gửi
    // ingredients: khi đó nguyên liệu cũ vẫn còn nguyên trong DB, nên nếu bỏ
    // qua thì user có thể đổi diet_type từ 'lacto' (đang chứa sữa) sang
    // 'vegan' mà không cần gửi lại ingredients => món "vegan" vẫn chứa sữa.
    if (dto.ingredients !== undefined) {
      await this.assertRecipeDietCompatible(
        dto.diet_type ?? recipe.diet_type,
        dto.ingredients,
      );
    } else {
      const existingIngredients = await this.getRecipeIngredientsForCheck(
        recipeId,
      );

      assertRecipeDietCompatible(
        dto.diet_type ?? recipe.diet_type,
        existingIngredients,
      );
    }

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
        title: nextTitle ?? recipe.title,
        description: dto.description ?? recipe.description,
        instructions: dto.instructions ?? recipe.instructions,
        image_url: dto.image_url ?? recipe.image_url,
        video_url: dto.video_url !== undefined ? dto.video_url : recipe.video_url,
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
              // Đơn vị đã được validator chuẩn hoá (trim + không phân biệt hoa thường).
              unit: item.unit.trim(),
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

    await this.dataSource.transaction(async (manager) => {
      // 1. Gỡ tham chiếu từ recipe_import_items (để không bị chặn bởi khóa ngoại ON DELETE NO ACTION)
      await manager.query(
        `UPDATE recipe_import_items SET recipe_id = NULL WHERE recipe_id = $1`,
        [recipeId],
      );

      // 2. Xóa các bảng phụ thuộc không dùng CASCADE
      await manager.query(
        `DELETE FROM favorite_recipes WHERE recipe_id = $1`,
        [recipeId],
      );
      await manager.query(
        `DELETE FROM user_recipe_prices WHERE recipe_id = $1`,
        [recipeId],
      );
      await manager.query(
        `DELETE FROM ai_recommendations WHERE recipe_id = $1`,
        [recipeId],
      );

      // 3. Kiểm tra xem công thức có trong thực đơn (meal_items) nào không
      const mealItemsCount = await manager.query(
        `SELECT COUNT(*) FROM meal_items WHERE recipe_id = $1`,
        [recipeId],
      );
      const inMealPlan = parseInt(mealItemsCount[0]?.count || '0', 10) > 0;

      if (inMealPlan) {
        // Món đã được người dùng chọn vào kế hoạch bữa ăn -> đánh dấu REMOVED để giữ lịch sử
        await manager.update(Recipe, { recipe_id: recipeId }, { status: RecipeStatus.REMOVED });
      } else {
        // Món chưa bị ràng buộc bởi kế hoạch thực đơn -> xóa sạch hoàn toàn khỏi cơ sở dữ liệu
        // Các bảng recipe_ingredients, recipe_categories, nutrition_infos tự động xóa theo CASCADE
        await manager.delete(Recipe, { recipe_id: recipeId });
      }
    });

    return {
      success: true,
      message: 'Đã xóa công thức thành công.',
      recipe_id: recipeId,
    };
  }
}
