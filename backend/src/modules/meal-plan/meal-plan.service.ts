import { ErrorCode } from '../../common/constants/error-codes.enum';
import { isRecipeDietCompatible } from '../../common/utils/diet.util';
import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  Optional,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, DataSource, EntityManager } from 'typeorm';
import { MealPlanProfile } from './entities/meal-plan-profile.entity';
import { GenerateForSomeoneDto } from './dto/generate-for-someone.dto';
import { ProfileAllergy } from './entities/profile-allergy.entity';
import { Ingredient } from '../ingredient/entities/ingredient.entity';
import {
  MealPlan,
  MealPlanStatus,
  PlanType,
} from './entities/meal-plan.entity';
import { WeeklyPlan } from './entities/weekly-plan.entity';
import { DailyMeal } from './entities/daily-meal.entity';
import { MealItem } from './entities/meal-item.entity';
import {
  Recipe,
  RecipeStatus,
} from '../recipe/entities/recipe.entity';
import { RecipeIngredient } from '../recipe/entities/recipe-ingredient.entity';
import { RecipeCategory } from '../recipe/entities/recipe-category.entity';
import { calculateIngredientCost } from '../recipe/recipe-cost.util';
import { SubscriptionService } from '../subscription/subscription.service';
import { FavoriteRecipe } from '../recipe/entities/favorite-recipe.entity';
import { NutritionInfo } from '../nutrition/entities/nutrition-info.entity';
import { User, DietType, UserRole } from '../users/entities/user.entity';
import { UserAllergy } from '../ingredient/entities/user-allergy.entity';
import { GroqAiProvider } from '../chatbot/providers/groq-ai.provider';
import { HealthGoal } from '../health-goal/entities/health-goal.entity';
import { CreateMealPlanDto } from './dto/create-meal-plan.dto';
import { SaveMealPlanDto } from './dto/save-meal-plan.dto';
import { UpdateMyMealPlanDto } from './dto/update-my-meal-plan.dto';
import { ValidateMealPlanDto } from './dto/validate-meal-plan.dto';
import { UpdateMealSlotDto } from './dto/update-meal-slot.dto';
import { GenerateMealPlanDto } from './dto/generate-meal-plan.dto';
import { IngredientService } from '../ingredient/ingredient.service';
import {
  assessWeightGoal,
  assertValidGoalInput,
  MEAL_SPLIT,
  resolveGoalPlan,
  WeightGoalDirection,
} from '../users/weight-goal.util';
import {
  BudgetTracker,
  PlannedMeal,
  RecipeIngredientRow,
  isSuitableForMeal,
  planMeals,
  aggregateIngredientsByGram,
} from './meal-plan-planner.util';
import {
  calculateTargetCalories,
  toWeightGoalDirection,
  resolveGoalAssessment,
  assertSafeCalories,
} from './meal-plan-target.util';
import { expandAllergenGroups, getWeekStart, buildPreviewMealPlan } from './meal-plan-preview.util';

/**
 * Tỉ lệ calo theo bữa dùng khi SOẠN THỰC ĐƠN (snack = phần còn lại).
 * Lấy từ MEAL_SPLIT chung (users/weight-goal.util), cùng tỉ lệ với GET /users/me/nutrition-summary.
 */
const PLAN_MEAL_SPLIT = { breakfast: MEAL_SPLIT.breakfast, lunch: MEAL_SPLIT.lunch, dinner: MEAL_SPLIT.dinner };

// =========================================================
// HẠN MỨC TẠO THỰC ĐƠN (FREE / PREMIUM)
// =========================================================

/**
 * Mã lỗi hết hạn mức tạo thực đơn.
 *
 * Lưu ý: mã này chưa có trong `common/constants/error-codes.enum.ts` vì phạm
 * vi thay đổi của nhiệm vụ chỉ giới hạn ở file này. Khi có thể sửa file enum
 * chung, hãy chuyển sang `ErrorCode.MEAL_PLAN_QUOTA_EXCEEDED`.
 */
const MEAL_PLAN_QUOTA_EXCEEDED_CODE = 'MEAL_PLAN_QUOTA_EXCEEDED';

/**
 * Số lượt tạo MealPlan tối đa mỗi tháng cho tài khoản Free.
 * Dùng CHUNG cho mọi loại thực đơn (tuần / tháng / ngày) và mọi luồng tạo.
 */
const FREE_MONTHLY_MEAL_PLAN_LIMIT = 3;

/** Lệch giờ Việt Nam so với UTC (phút). */
const VIETNAM_UTC_OFFSET_MINUTES = 7 * 60;

/**
 * Namespace cho advisory lock của hạn mức.
 * Khoá 2 tham số (namespace, user_id) -> không bao giờ trùng giữa 2 user.
 */
const MEAL_PLAN_QUOTA_LOCK_NAMESPACE = 1_234_567;
/**
 * Truy vấn đếm số MealPlan đã tạo trong tháng hiện tại (theo giờ Việt Nam),
 * CHƯA trừ các thực đơn tạo trong thời gian user còn Premium.
 *
 * VỀ THỜI GIAN (`meal_plans.created_at`):
 *   Cột là `timestamp without time zone`, mặc định `now()`.
 *   Đã kiểm chứng trên DB thật:
 *     - session `TimeZone` = 'GMT' => `now()` (timestamptz) được ép sang
 *       `timestamp` theo giờ GMT, tức GIÁ TRỊ LƯU LÀ GIỜ UTC.
 *     - TypeORM KHÔNG ghi `created_at` bằng Date của app (@CreateDateColumn
 *       chỉ set cho MongoDB) -> giá trị do DEFAULT của DB sinh ra.
 *       Bằng chứng: độ chính xác microsecond, và cùng một dòng
 *       `payment_transactions` có `paid_at` (do app ghi) lệch đúng 7 giờ so
 *       với `created_at` (do DB ghi) -> hai quy ước khác nhau.
 *
 *   Vì `created_at` là GIỜ UTC (wall-clock), giờ Việt Nam = UTC + 7, nên
 *   dịch sang giờ VN bằng `created_at + interval '7 hours'`.
 *   Cách này TƯƠNG ĐƯƠNG CHÍNH XÁC với
 *   `created_at AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Ho_Chi_Minh'`
 *   (đã kiểm chứng trên 19 dòng thật: cả timestamp và date đều khớp 100%),
 *   nhưng biểu thức chuỗi `AT TIME ZONE` lồng nhau bị PostgreSQL từ chối
 *   cú pháp khi dùng trong `WHERE` -> dùng bản `interval` cho chắc chắn.
 *   Quan trọng: KHÔNG phụ thuộc timezone của session DB.
 *
 * Ranh giới tháng ($2, $3) được tính sẵn ở tầng ứng dụng theo giờ Việt Nam
 * và truyền vào dưới dạng `timestamp` (không có múi giờ) -> không phụ thuộc
 * timezone của session DB.
 *
 * Loại trừ thời gian Premium: một thực đơn được tạo trong khoảng
 * [subscriptions.start_date, subscriptions.end_date] của user là thực đơn
 * tạo lúc user còn Premium -> KHÔNG tính vào hạn mức Free.
 */
const COUNT_MONTHLY_MEAL_PLANS_SQL = `
WITH bounds AS (
  SELECT $2::timestamp AS month_start, $3::timestamp AS next_month_start
),
plans AS (
  SELECT mp.user_id,
         (mp.created_at + interval '7 hours') AS created_vn
  FROM meal_plans mp
)
SELECT COUNT(*)::int AS used
FROM plans p, bounds b
WHERE p.user_id = $1
  AND p.created_vn >= b.month_start
  AND p.created_vn <  b.next_month_start
  AND NOT EXISTS (
    SELECT 1
    FROM subscriptions s
    WHERE s.user_id = p.user_id
      AND (p.created_vn)::date BETWEEN s.start_date AND s.end_date
  )
`;

/** Định dạng 2 chữ số. */
function pad2(value: number): string {
  return String(value).padStart(2, '0');
}

/**
 * Khoảng tháng hiện tại theo giờ Việt Nam, dạng chuỗi `timestamp` KHÔNG kèm
 * múi giờ (để truyền thẳng cho PostgreSQL, tránh bị đổi múi giờ).
 *
 * Vì sao không dùng `new Date(y, m, 1)` của Node: hàm đó dùng timezone của
 * máy chạy server (VN là UTC+7 nhưng server deploy là UTC), nên ranh giới
 * tháng sẽ lệch 7 tiếng -> lượt tạo trong khoảng 17:00-24:00 giờ VN có thể
 * bị tính nhầm sang tháng trước/sau.
 */
export function getVietnamMonthBounds(
  reference: Date = new Date(),
): { monthStart: string; nextMonthStart: string } {
  // Dịch sang giờ Việt Nam rồi đọc các trường ngày/tháng/năm theo UTC.
  const vn = new Date(
    reference.getTime() + VIETNAM_UTC_OFFSET_MINUTES * 60 * 1000,
  );

  const year = vn.getUTCFullYear();
  const month = vn.getUTCMonth();

  const next = new Date(Date.UTC(year, month + 1, 1));
  const nextYear = next.getUTCFullYear();
  const nextMonth = next.getUTCMonth();

  return {
    monthStart: `${year}-${pad2(month + 1)}-01 00:00:00.000`,
    nextMonthStart: `${nextYear}-${pad2(nextMonth + 1)}-01 00:00:00.000`,
  };
}

/** Tính kcal từng bữa từ tổng kcal mục tiêu (snack = phần còn lại). */
function splitMealCalories(targetCalories: number): {
  breakfast: number;
  lunch: number;
  dinner: number;
  snack: number;
} {
  const breakfast = Math.round(targetCalories * PLAN_MEAL_SPLIT.breakfast);
  const lunch = Math.round(targetCalories * PLAN_MEAL_SPLIT.lunch);
  const dinner = Math.round(targetCalories * PLAN_MEAL_SPLIT.dinner);
  const snack = Math.max(0, targetCalories - (breakfast + lunch + dinner));
  return { breakfast, lunch, dinner, snack };
}

@Injectable()
export class MealPlanService {
  private readonly logger = new Logger(MealPlanService.name);

  constructor(
    @InjectRepository(MealPlan)
    private readonly mealPlanRepo: Repository<MealPlan>,

    @InjectRepository(WeeklyPlan)
    private readonly weeklyPlanRepo: Repository<WeeklyPlan>,

    @InjectRepository(DailyMeal)
    private readonly dailyMealRepo: Repository<DailyMeal>,

    @InjectRepository(MealItem)
    private readonly mealItemRepo: Repository<MealItem>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(UserAllergy)
    private readonly allergyRepo: Repository<UserAllergy>,

    @InjectRepository(Recipe)
    private readonly recipeRepo: Repository<Recipe>,

    @InjectRepository(RecipeIngredient)
    private readonly recipeIngredientRepo: Repository<RecipeIngredient>,

    @InjectRepository(NutritionInfo)
    private readonly nutritionRepo: Repository<NutritionInfo>,

    @InjectRepository(FavoriteRecipe)
    private readonly favoriteRepo: Repository<FavoriteRecipe>,

    @InjectRepository(MealPlanProfile)
    private readonly mealPlanProfileRepo: Repository<MealPlanProfile>,

    @InjectRepository(ProfileAllergy)
    private readonly profileAllergyRepo: Repository<ProfileAllergy>,

    private readonly subscriptionService: SubscriptionService,
    private readonly ingredientService: IngredientService,
    private readonly dataSource: DataSource,
    @Optional()
    @InjectRepository(HealthGoal)
    private readonly goalRepo?: Repository<HealthGoal>,
    @Optional()
    private readonly groqAiProvider?: GroqAiProvider,
  ) { }

  // =========================================================
  // HẠN MỨC TẠO THỰC ĐƠN (FREE / PREMIUM / ADMIN)
  // =========================================================

  /**
   * Kiểm tra hạn mức tạo MealPlan trong THẺT GIAO DỊCH đang mở.
   *
   * Vì sao phải kiểm tra BÊN TRONG transaction:
   *   - `pg_advisory_xact_lock` chỉ tồn tại trong phạm vi transaction ->
   *     nếu kiểm tra ngoài transaction thì 2 request song song có thể cùng
   *     thấy "còn lượt" và cùng ghi -> vượt hạn mức.
   *   - Đếm lượt và ghi MealPlan phải dùng CHUNG một manager để lượt vừa
   *     ghi được tính ngay trong lượt tiếp theo.
   *
   * Luồng:
   *   1. Khoá advisory theo user_id (chặn 2 request cùng lúc).
   *   2. Đọc user -> phân loại Admin / Premium / Free.
   *   3. Đếm lượt đã dùng trong tháng (giờ VN), đã trừ phần tạo lúc Premium.
   *   4. Nếu vượt hạn mức -> ném lỗi -> transaction rollback, KHÔNG ghi gì.
   *
   * Nếu ĐỌC DB thất bại -> ném lỗi (KHÔNG mặc định cho phép tạo), để
   * transaction rollback và không để lại thực đơn dở dang.
   */
  private async assertWithinMealPlanQuota(
    manager: EntityManager,
    user_id: number,
  ): Promise<void> {
    // Manager của TypeORM luôn có `.query`. Nếu thiếu -> không có tầng DB để
    // xác minh hạn mức -> KHÔNG được mặc định cho phép tạo (fail-closed).
    // Ném lỗi để transaction rollback, không ghi MealPlan/dữ liệu con.
    if (typeof manager?.query !== 'function') {
      throw new InternalServerErrorException({
        code: ErrorCode.INTERNAL_ERROR,
        message:
          'Không kiểm tra được hạn mức tạo thực đơn. Vui lòng thử lại sau.',
      });
    }

    // 1. Khoá advisory theo user_id: 2 request cùng lúc sẽ xếp hàng,
    //    request sau chỉ đếm lượt SAU khi request trước đã commit.
    //    Dùng biến thể 2 tham số `pg_advisory_xact_lock(int4, int4)` ->
    //    khoá theo cặp (namespace, user_id), không trùng giữa 2 user.
    try {
      await manager.query(
        'SELECT pg_advisory_xact_lock($1::int, $2::int)',
        [MEAL_PLAN_QUOTA_LOCK_NAMESPACE, user_id],
      );
    } catch {
      // Không lấy được khoá -> KHÔNG cho phép tạo (fail-closed).
      // Ném lỗi để transaction rollback, tránh 2 request cùng lúc cùng thấy
      // "còn lượt" và cùng ghi -> vượt hạn mức.
      throw new InternalServerErrorException({
        code: ErrorCode.INTERNAL_ERROR,
        message:
          'Không kiểm tra được hạn mức tạo thực đơn. Vui lòng thử lại sau.',
      });
    }

    // 2. Đọc trạng thái tài khoản (role + premium_until) trong CÙNG transaction.
    let user: { role?: string; premium_until?: Date | null } | null = null;

    try {
      const rows = await manager.query(
        'SELECT role, premium_until FROM users WHERE user_id = $1',
        [user_id],
      );

      if (Array.isArray(rows) && rows.length > 0) {
        user = rows[0];
      }
    } catch {
      // Không đọc được user -> KHÔNG cho phép tạo (fail-closed).
      throw new InternalServerErrorException({
        code: ErrorCode.INTERNAL_ERROR,
        message:
          'Không kiểm tra được hạn mức tạo thực đơn. Vui lòng thử lại sau.',
      });
    }

    if (!user) {
      throw new NotFoundException(
        `Không tìm thấy người dùng #${user_id}`,
      );
    }

    // 3. Admin: không giới hạn.
    if (user.role === UserRole.ADMIN) {
      return;
    }

    // 4. Premium còn hiệu lực: không giới hạn.
    //    `premium_until` được `pg` đọc về Date theo đúng timezone của tiến
    //    trình, nên so sánh với `Date.now()` cho kết quả giống hệt
    //    `SubscriptionService.isPremium()` (dùng cho thực đơn người thân).
    const premiumUntil = user.premium_until
      ? new Date(user.premium_until)
      : null;

    if (
      premiumUntil &&
      !Number.isNaN(premiumUntil.getTime()) &&
      premiumUntil.getTime() > Date.now()
    ) {
      return;
    }

    // 5. Free: đếm lượt đã dùng trong tháng (giờ Việt Nam).
    const { monthStart, nextMonthStart } = getVietnamMonthBounds();

    let used = 0;

    try {
      const rows = await manager.query(
        COUNT_MONTHLY_MEAL_PLANS_SQL,
        [user_id, monthStart, nextMonthStart],
      );

      const raw =
        Array.isArray(rows) && rows.length > 0 ? Number(rows[0]?.used) : NaN;

      if (!Number.isFinite(raw)) {
        throw new Error('Không đọc được số lượt đã dùng');
      }

      used = raw;
    } catch {
      // Không đếm được lượt -> KHÔNG cho phép tạo (fail-closed).
      throw new InternalServerErrorException({
        code: ErrorCode.INTERNAL_ERROR,
        message:
          'Không kiểm tra được hạn mức tạo thực đơn. Vui lòng thử lại sau.',
      });
    }

    if (used >= FREE_MONTHLY_MEAL_PLAN_LIMIT) {
      throw new HttpException(
        {
          code: MEAL_PLAN_QUOTA_EXCEEDED_CODE,
          message:
            `Bạn đã dùng hết ${FREE_MONTHLY_MEAL_PLAN_LIMIT} lượt tạo thực đơn ` +
            'trong tháng này. Vui lòng nâng cấp gói Premium để tạo không giới hạn, ' +
            'hoặc chờ tháng sau.',
        },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }
  }

  // =========================================================
  // HELPER: XÁC ĐỊNH ĐỐI TƯỢNG ĐƯỢC LẬP THỰC ĐƠN
  // =========================================================

  /**
   * Thực đơn có target_profile_id => lập cho hồ sơ người thân
   * (meal_plan_profiles + profile_allergies).
   * Thực đơn không có target_profile_id => lập cho chủ tài khoản
   * (users.diet_type + user_allergies).
   *
   * Mọi thao tác đổi món / kiểm tra chế độ ăn trên một thực đơn đều phải
   * theo đối tượng này, không theo chủ tài khoản.
   */
  private async resolvePlanTarget(
    mealPlan: MealPlan,
    user_id: number,
  ): Promise<{ dietType?: string | null; allergyIngredientIds: number[] }> {
    const profileId = mealPlan.target_profile_id;

    if (profileId) {
      const profile = await this.mealPlanProfileRepo.findOne({
        where: { profile_id: profileId, user_id },
      });

      if (profile) {
        const profileAllergies = await this.profileAllergyRepo.find({
          where: { profile_id: profile.profile_id },
        });

        return {
          dietType: profile.diet_type ?? null,
          allergyIngredientIds: profileAllergies.map(
            (row) => row.ingredient_id,
          ),
        };
      }
    }

    const owner = await this.userRepo.findOne({ where: { user_id } });
    const ownerAllergies = await this.allergyRepo.find({
      where: { user_id },
    });

    return {
      dietType: owner?.diet_type ?? null,
      allergyIngredientIds: ownerAllergies.map(
        (row) => row.ingredient_id,
      ),
    };
  }

  // =========================================================
  // HELPER: LẤY CÔNG THỨC PHÙ HỢP CHẾ ĐỘ ĂN VÀ DỊ ỨNG
  // =========================================================

  private async getSafeRecipes(
    userId: number,
    dietType?: string | null,
    allergyIngredientIdList?: number[],
  ): Promise<Recipe[]> {
    // Truyền danh sách dị ứng riêng (vd. của hồ sơ người thân) thì dùng nó,
    // không thì lấy dị ứng của chính user.
    const ownAllergyRows = allergyIngredientIdList
      ? []
      : await this.allergyRepo.find({ where: { user_id: userId } });

    const allergyIngredientIds = new Set(
      allergyIngredientIdList ??
        ownAllergyRows.map((row) => row.ingredient_id),
    );

    const recipes = await this.recipeRepo.find({
      where: {
        status: RecipeStatus.APPROVED,
      },
    });

    if (recipes.length === 0) {
      throw new NotFoundException(
        'Không có recipe approved để tạo meal plan',
      );
    }

    const recipeIds = recipes.map(
      (recipe) => recipe.recipe_id,
    );

    const recipeIngredients =
      await this.recipeIngredientRepo.find({
        where: {
          recipe_id: In(recipeIds),
        },
      });

    const ingredientsByRecipe = new Map<number, number[]>();

    for (const row of recipeIngredients) {
      const ids =
        ingredientsByRecipe.get(row.recipe_id) ?? [];

      ids.push(row.ingredient_id);

      ingredientsByRecipe.set(row.recipe_id, ids);
    }

    const safeRecipes = recipes.filter((recipe) => {
      if (!isRecipeDietCompatible(dietType, recipe.diet_type)) {
        return false;
      }

      const ingredientIds =
        ingredientsByRecipe.get(recipe.recipe_id) ?? [];

      return !ingredientIds.some((id) =>
        allergyIngredientIds.has(id),
      );
    });

    if (safeRecipes.length === 0) {
      throw new NotFoundException(
        'Không tìm thấy recipe phù hợp với chế độ ăn và dị ứng',
      );
    }

    try {
      if (this.dataSource) {
        const recipeCategories = await this.dataSource.getRepository(RecipeCategory).find({
          where: { recipe_id: In(safeRecipes.map((r) => r.recipe_id)) },
          relations: ['category'],
        });
        const categoryMap = new Map<number, string[]>();
        for (const rc of recipeCategories) {
          if (!rc.category?.category_name) continue;
          const list = categoryMap.get(rc.recipe_id) ?? [];
          list.push(rc.category.category_name);
          categoryMap.set(rc.recipe_id, list);
        }
        for (const recipe of safeRecipes) {
          (recipe as any).categoryNames = categoryMap.get(recipe.recipe_id) || [];
        }
      }
    } catch {
      // Mock repository fallback trong unit tests
    }

    return safeRecipes;
  }

  // =========================================================
  // HELPER: LẤY DINH DƯỠNG CỦA CÔNG THỨC
  // =========================================================

  private async getNutritionMap(
    recipes: Recipe[],
  ): Promise<Map<number, NutritionInfo>> {
    const recipeIds = recipes.map(
      (recipe) => recipe.recipe_id,
    );

    if (recipeIds.length === 0) {
      return new Map<number, NutritionInfo>();
    }

    const [nutritionRows, recipeIngredients] = await Promise.all([
      this.nutritionRepo.find({
        where: {
          recipe_id: In(recipeIds),
        },
      }),
      this.recipeIngredientRepo.find({
        where: {
          recipe_id: In(recipeIds),
        },
        relations: ['ingredient'],
      }),
    ]);

    const ingCalMap = new Map<number, number>();
    for (const ri of recipeIngredients) {
      if (ri.is_optional) continue;
      const calPer100 = Number(ri.ingredient?.calories_per_100g ?? 0);
      const cal = (calPer100 * Number(ri.quantity ?? 0)) / 100;
      ingCalMap.set(ri.recipe_id, (ingCalMap.get(ri.recipe_id) ?? 0) + cal);
    }

    const nutritionMap = new Map<number, NutritionInfo>();

    for (const nutrition of nutritionRows) {
      const totalIngKcal = ingCalMap.get(nutrition.recipe_id);
      if (totalIngKcal && totalIngKcal > 0) {
        nutrition.calories = Math.round(totalIngKcal * 100) / 100;
      }
      nutritionMap.set(
        nutrition.recipe_id,
        nutrition,
      );
    }

    for (const [recipeId, totalIngKcal] of ingCalMap.entries()) {
      if (!nutritionMap.has(recipeId) && totalIngKcal > 0) {
        nutritionMap.set(recipeId, {
          nutrition_id: 0,
          recipe_id: recipeId,
          calories: Math.round(totalIngKcal * 100) / 100,
          protein: 0,
          fat: 0,
          carbs: 0,
          fiber: 0,
          created_at: new Date(),
        } as any);
      }
    }

    return nutritionMap;
  }

  // =========================================================
  // HELPER: LẤY DANH SÁCH NGUYÊN LIỆU CỦA CÁC CÔNG THỨC
  // =========================================================

  // Trả về map recipe_id -> danh sách nguyên liệu (kèm tên + đơn vị + số lượng)
  // để frontend hiển thị/in được danh sách nguyên liệu của món.
  private async getIngredientsMap(
    recipeIds: number[],
  ): Promise<Map<number, RecipeIngredientRow[]>> {
    const uniqueIds = [...new Set(recipeIds)];

    if (uniqueIds.length === 0) {
      return new Map<number, RecipeIngredientRow[]>();
    }

    const rows = await this.recipeIngredientRepo.find({
      where: { recipe_id: In(uniqueIds) },
      relations: ['ingredient'],
    });

    const ingredientsMap = new Map<number, RecipeIngredientRow[]>();

    for (const row of rows) {
      const list = ingredientsMap.get(row.recipe_id) ?? [];
      const calPer100 = Number(row.ingredient?.calories_per_100g ?? 0);
      const ratio = Number(row.quantity ?? 0) / 100;
      const cal = Math.round(calPer100 * ratio * 100) / 100;

      list.push({
        ingredient_id: row.ingredient_id,
        ingredient_name: row.ingredient?.ingredient_name ?? '',
        quantity: Number(row.quantity ?? 0),
        unit: row.unit,
        is_optional: row.is_optional,
        calories_per_100g: calPer100,
        calories: cal,
      });

      ingredientsMap.set(row.recipe_id, list);
    }

    return ingredientsMap;
  }

  // =========================================================
  // HELPER: CHI PHÍ TỪNG CÔNG THỨC (THEO GIÁ NGUYÊN LIỆU)
  // =========================================================

  // Trả về map recipe_id -> chi phí MỖI KHẨU PHẦN. Ưu tiên tính từ giá nguyên liệu
  // (có quy đổi đơn vị); nếu không tính được thì dùng estimated_cost.
  // Công thức không xác định được chi phí sẽ không có trong map.
  private async getRecipeCostMap(
    recipes: Recipe[],
  ): Promise<Map<number, number>> {
    const costMap = new Map<number, number>();

    if (recipes.length === 0) {
      return costMap;
    }

    const rows = await this.recipeIngredientRepo.find({
      where: {
        recipe_id: In(recipes.map((recipe) => recipe.recipe_id)),
      },
      relations: ['ingredient'],
    });

    const computed = new Map<number, number>();

    for (const row of rows) {
      // Tính cả nguyên liệu optional: khớp với RecipePriceService.getRecipeCost
      // và recipe-import (estimated_cost là chi phí CẢ MÓN, gồm cả nguyên
      // liệu phụ). Trước đây meal-plan bỏ qua optional -> chi phí thực đơn
      // luôn thấp hơn giá hiển thị ở API chi phí công thức.
      const price = Number(row.ingredient?.avg_price_per_unit ?? 0);

      const { cost } = calculateIngredientCost(
        Number(row.quantity ?? 0),
        row.unit,
        row.ingredient?.unit,
        price,
      );

      computed.set(
        row.recipe_id,
        (computed.get(row.recipe_id) ?? 0) + cost,
      );
    }

    // Quy ước: nguyên liệu và estimated_cost là chi phí CẢ MÓN; mỗi bữa trong
    // thực đơn ăn 1 khẩu phần nên chi phí tính vào ngân sách = cả món / servings.
    for (const recipe of recipes) {
      const servings =
        recipe.servings && recipe.servings > 0 ? recipe.servings : 1;
      const fromIngredients = computed.get(recipe.recipe_id) ?? 0;

      if (fromIngredients > 0) {
        costMap.set(recipe.recipe_id, fromIngredients / servings);
      } else if (recipe.estimated_cost != null) {
        costMap.set(
          recipe.recipe_id,
          Number(recipe.estimated_cost) / servings,
        );
      }
    }

    return costMap;
  }

  /**
   * Thẩm định và xét duyệt thực đơn bằng AI (Gemini / Groq).
   * Kiểm tra 3 buổi chính (sáng, trưa, chiều 2-3 món), cân đối calo,
   * và tính khả thi khi nấu nướng với định lượng nguyên liệu theo gam.
   */
  private async reviewMealPlanWithAI(
    plannedMeals: PlannedMeal[],
    targetCaloriesPerDay: number,
    planType: 'daily' | 'weekly' | 'monthly',
    ingredientSummary?: string,
  ): Promise<{ chef_advice: string; is_cookable: boolean }> {
    const defaultAdvice =
      `Bếp trưởng AI: Thực đơn đã được gợi ý và xét duyệt dựa trên dữ liệu công thức, ưu tiên món cơm cho bữa trưa và cân đối lượng calo đạt ~${Math.round(targetCaloriesPerDay)} kcal/ngày. Bữa trưa giàu năng lượng hơn bữa tối, mỗi bữa 1-2 món tinh gọn vừa vặn, đảm bảo dinh dưỡng và khả thi khi chế biến tại nhà.`;

    const uniqueRecipeMap = new Map<number, { title: string; portion: number; calories: number }>();
    for (const p of plannedMeals) {
      if (!uniqueRecipeMap.has(p.recipe.recipe_id)) {
        uniqueRecipeMap.set(p.recipe.recipe_id, {
          title: p.recipe.title,
          portion: p.portion,
          calories: Math.round(p.calories),
        });
      }
      if (uniqueRecipeMap.size >= 8) break;
    }

    const mealSummary = Array.from(uniqueRecipeMap.values())
      .map((m) => '- ' + m.title + ' (~' + m.calories + ' kcal)')
      .join('\n');

    const systemInstruction =
      'Bạn là Bếp trưởng & Chuyên gia Dinh dưỡng Chay VeggieHub. ' +
      'Nhiệm vụ: Xét duyệt thực đơn món chay thông minh từ cơ sở dữ liệu, kiểm tra lượng calo mục tiêu. ' +
      'Nguyên tắc: Bữa trưa ưu tiên món liên quan đến cơm và giàu năng lượng hơn bữa tối. Mỗi bữa 1-2 món tinh gọn vừa đủ calo, không nhồi nhét nhiều món làm dư thừa calo. Tổng calo cả ngày bám sát mục tiêu. ' +
      'Trả về định dạng JSON thuần túy: { "is_cookable": true, "chef_advice": "Lời xét duyệt và lời khuyên ngắn gọn (2 câu) về dinh dưỡng, mẹo nấu, món cơm bữa trưa và cân bằng calo." }';

    const userMessage =
      `Calo mục tiêu mỗi ngày: ~${targetCaloriesPerDay} kcal.\n` +
      `Loại thực đơn: ${planType === 'daily' ? 'Ngày (1 ngày)' : planType === 'weekly' ? 'Tuần (7 ngày)' : 'Tháng (Lịch cả tháng)'}.\n` +
      `Quy tắc: Bữa trưa nhiều kcal hơn bữa tối, ưu tiên món cơm, mỗi bữa 1-2 món vừa vặn, tổng calo ngày bám sát mục tiêu.\n` +
      `Danh sách món ăn đại diện:\n${mealSummary}` +
      (ingredientSummary ? `\n\nTổng hợp nguyên liệu theo gam (có ~):\n${ingredientSummary.slice(0, 500)}` : '') +
      '\nHãy xét duyệt thực đơn và đưa ra nhận xét.';

    // 1. Thử gọi Gemini AI nếu có cấu hình GEMINI_API_KEY
    const geminiKey = (process.env.GEMINI_API_KEY || '').trim();
    if (geminiKey) {
      try {
        let currentModel = (process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite').trim();
        if (currentModel.includes('2.5') || currentModel === 'gemini-2.5-flash') {
          currentModel = 'gemini-3.5-flash-lite';
        }
        const timeoutMs = Number(process.env.GEMINI_TIMEOUT_MS) || 15000;
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), timeoutMs);

        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(currentModel)}:generateContent`;
        const res = await fetch(geminiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': geminiKey,
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { text: `${systemInstruction}\n\n${userMessage}` },
                ],
              },
            ],
            generationConfig: {
              responseMimeType: 'application/json',
            },
          }),
          signal: controller.signal,
        });
        clearTimeout(timer);

        if (res.ok) {
          const data = await res.json();
          const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
          const jsonMatch = rawText.match(/\{[\s\S]*?\}/);
          if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            if (parsed.chef_advice) {
              this.logger.log('Bếp trưởng AI (Gemini) đã xét duyệt thành công thực đơn.');
              return {
                chef_advice: parsed.chef_advice,
                is_cookable: parsed.is_cookable !== false,
              };
            }
          }
        }
      } catch (err: any) {
        this.logger.warn(`Bếp trưởng AI (Gemini) không phản hồi (${err?.message || err}), thử chuyển sang Groq...`);
      }
    }

    // 2. Thử gọi Groq AI nếu có GroqAiProvider
    if (this.groqAiProvider) {
      try {
        const responseText = await this.groqAiProvider.generateResponse({
          systemInstruction,
          userMessage,
        });

        const jsonMatch = responseText.match(/\{[\s\S]*?\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          if (parsed.chef_advice) {
            this.logger.log('Bếp trưởng AI (Groq) đã xét duyệt thành công thực đơn.');
            return {
              chef_advice: parsed.chef_advice,
              is_cookable: parsed.is_cookable !== false,
            };
          }
        }
      } catch (err: any) {
        this.logger.warn(`Bếp trưởng AI (Groq) không phản hồi: ${err?.message || err}`);
      }
    }

    // 3. Fallback mặc định
    return { chef_advice: defaultAdvice, is_cookable: true };
  }

  /**
   * Giữ alias tương thích ngược với các hàm gọi cũ
   */
  private async reviewAndOptimizeWithGroq(
    plannedMeals: PlannedMeal[],
    targetCaloriesPerDay: number,
    planType: 'daily' | 'weekly' | 'monthly',
    ingredientSummary?: string,
  ): Promise<{ chef_advice: string; is_cookable: boolean }> {
    if (this.groqAiProvider) {
      try {
        return await this.reviewMealPlanWithAI(plannedMeals, targetCaloriesPerDay, planType, ingredientSummary);
      } catch (err: any) {
        this.logger.warn(`Lỗi khi gọi Groq AI thẩm định thực đơn: ${err?.message || err}`);
      }
    }
    return {
      chef_advice:
        'Bếp trưởng AI (Groq): Thực đơn đã được phối hợp 2-3 món cân bằng (món mặn, canh, rau/cơm) để đủ calo tự nhiên chuẩn 1.0x khẩu phần, không dồn quá nhiều thứ vào 1 bữa, luân phiên không trùng món trong 2 tuần liên tiếp.',
      is_cookable: true,
    };
  }

  // =========================================================
  // GET /users/me/meal-plans
  // =========================================================

  async findMyMealPlans(user_id: number) {
    return this.mealPlanRepo.find({
      where: { user_id },
      relations: ['goal', 'target_profile'],
      order: { created_at: 'DESC' },
    });
  }

  // =========================================================
  // GET /users/me/meal-plans/:id
  // =========================================================

  async findMyMealPlanDetail(
    user_id: number,
    meal_plan_id: number,
  ) {
    const mealPlan = await this.mealPlanRepo.findOne({
      where: {
        meal_plan_id,
        user_id,
      },
      relations: [
        'goal',
        'target_profile',
        'weekly_plans',
        'weekly_plans.daily_meals',
        'weekly_plans.daily_meals.meal_items',
        'weekly_plans.daily_meals.meal_items.recipe',
      ],
    });

    if (!mealPlan) {
      throw new NotFoundException({ code: ErrorCode.MEAL_PLAN_NOT_FOUND, message: `Không tìm thấy thực đơn #${meal_plan_id}` });
    }

    // Gắn thông tin dinh dưỡng thực tế vào các công thức món ăn trong thực đơn
    const allRecipes: Recipe[] = [];
    for (const wp of mealPlan.weekly_plans || []) {
      for (const dm of wp.daily_meals || []) {
        for (const mi of dm.meal_items || []) {
          if (mi.recipe) allRecipes.push(mi.recipe);
        }
      }
    }

    let ingredientSummary: Array<{ ingredient_name: string; quantity_g: number; note: string }> = [];
    if (allRecipes.length > 0) {
      const recipeIds = [...new Set(allRecipes.map((r) => r.recipe_id))];
      const nutritions = await this.nutritionRepo.find({
        where: { recipe_id: In(recipeIds) },
      });
      const nutritionMap = new Map(nutritions.map((n) => [n.recipe_id, n]));
      const ingredientsMap = await this.getIngredientsMap(recipeIds);

      for (const r of allRecipes as any[]) {
        const ings = ingredientsMap.get(r.recipe_id) || [];
        r.ingredients = ings;
        const totalIngKcal = ings.reduce((sum, ing) => sum + (Number(ing.calories) || 0), 0);
        let nutr = nutritionMap.get(r.recipe_id) || null;
        if (totalIngKcal > 0) {
          if (!nutr) {
            nutr = { nutrition_id: 0, recipe_id: r.recipe_id, calories: Math.round(totalIngKcal * 100) / 100, protein: 0, carbs: 0, fat: 0, fiber: 0 } as any;
          } else {
            nutr.calories = Math.round(totalIngKcal * 100) / 100;
          }
        }
        r.nutrition = nutr;
        r.calories = nutr?.calories ?? 0;
      }

      // Tạo mảng PlannedMeal giả định để tính tổng hợp nguyên liệu theo gam
      const simulatedPlannedMeals: PlannedMeal[] = [];
      for (const wp of mealPlan.weekly_plans || []) {
        for (const dm of wp.daily_meals || []) {
          for (let idx = 0; idx < (dm.meal_items || []).length; idx++) {
            const mi = dm.meal_items[idx];
            if (mi.recipe) {
              simulatedPlannedMeals.push({
                dayIndex: 0,
                mealType: dm.meal_type,
                calories: Number(dm.target_calories || 0),
                recipe: mi.recipe,
                portion: Number(mi.portion_multiplier || 1),
                itemIndex: idx,
              });
            }
          }
        }
      }

      ingredientSummary = aggregateIngredientsByGram(simulatedPlannedMeals, ingredientsMap);
    }

    return {
      ...mealPlan,
      ingredient_summary: ingredientSummary,
    };
  }

  // =========================================================
  // TẠO MEAL PLAN THỦ CÔNG
  // =========================================================

  async createMealPlan(
    user_id: number,
    dto: CreateMealPlanDto,
  ) {
    const user = await this.userRepo.findOne({
      where: { user_id },
    });

    if (!user) {
      throw new NotFoundException(
        `Không tìm thấy người dùng #${user_id}`,
      );
    }

    const startDate = new Date(dto.start_date);
    const endDate = new Date(dto.end_date);

    if (
      Number.isNaN(startDate.getTime()) ||
      Number.isNaN(endDate.getTime())
    ) {
      throw new BadRequestException(
        'start_date hoặc end_date không hợp lệ',
      );
    }

    if (endDate < startDate) {
      throw new BadRequestException(
        'end_date phải lớn hơn hoặc bằng start_date',
      );
    }

    const mealPlan = new MealPlan();

    mealPlan.user_id = user_id;
    mealPlan.goal_id =
      dto.goal_id ?? user.current_goal_id ?? null;
    mealPlan.bmi_snapshot = user.bmi ?? null;
    mealPlan.plan_type = dto.plan_type;
    mealPlan.start_date = startDate;
    mealPlan.end_date = endDate;
    mealPlan.has_budget = dto.has_budget ?? false;

    if (dto.total_budget !== undefined) {
      mealPlan.total_budget = dto.total_budget;
    }

    if (dto.target_calories_per_day !== undefined) {
      mealPlan.target_calories_per_day =
        dto.target_calories_per_day;
    }

    mealPlan.status = MealPlanStatus.DRAFT;
    mealPlan.generated_by = 'USER';

    // Ghi trong 1 transaction để kiểm tra hạn mức và ghi MealPlan cùng
    // transaction manager (không để lại thực đơn dở dang khi vượt hạn mức).
    const savedMealPlanId = await this.dataSource.transaction(
      async (manager) => {
        await this.assertWithinMealPlanQuota(manager, user_id);

        const saved = await manager
          .getRepository(MealPlan)
          .save(mealPlan);

        return saved.meal_plan_id;
      },
    );

    return this.findMyMealPlanDetail(
      user_id,
      savedMealPlanId,
    );
  }

  // =========================================================
  // VALIDATE MEAL PLAN
  // =========================================================

  // Kiểm tra bữa user tự chọn từ món yêu thích: ngày hợp lệ, món đã duyệt và nằm trong danh sách yêu thích.
  // Nếu client gửi kèm mục tiêu cân nặng thì cũng kiểm tra mục tiêu đó có an toàn không.
  async validateMealPlan(user_id: number, dto: ValidateMealPlanDto) {
    const errors: string[] = [];

    // ---- Kiểm tra mục tiêu cân nặng (nếu có) ----
    const goalErrors = await this.validateGoalForMealPlan(user_id, dto);
    errors.push(...goalErrors);

    const startDate = new Date(dto.start_date);
    const endDate = new Date(dto.end_date);

    if (endDate < startDate) {
      errors.push('Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu');
    }

    for (const day of dto.days ?? []) {
      const dayDate = new Date(day.date);

      if (dayDate < startDate || dayDate > endDate) {
        errors.push(`Ngày ${day.date} nằm ngoài khoảng thời gian của thực đơn`);
      }
    }

    const recipeIds = [
      ...new Set(
        (dto.days ?? []).flatMap((day) =>
          (day.meals ?? []).map((meal) => meal.recipe_id),
        ),
      ),
    ];

    if (recipeIds.length > 0) {
      const recipes = await this.recipeRepo.find({
        where: { recipe_id: In(recipeIds), status: RecipeStatus.APPROVED },
      });
      const approvedIds = new Set(recipes.map((r) => r.recipe_id));

      const invalidIds = recipeIds.filter((id) => !approvedIds.has(id));
      if (invalidIds.length > 0) {
        errors.push(
          `Công thức không tồn tại hoặc chưa được duyệt: ${invalidIds.join(', ')}`,
        );
      }

      const favorites = await this.favoriteRepo.find({
        where: { user_id, recipe_id: In(recipeIds) },
      });
      const favoriteIds = new Set(favorites.map((f) => f.recipe_id));
      for (const recipe of recipes) {
        if (!favoriteIds.has(recipe.recipe_id)) {
          errors.push(`Món "${recipe.title}" không nằm trong danh sách món yêu thích của bạn`);
        }
      }

      // Món phải hợp chế độ ăn của user và không chứa nguyên liệu gây dị ứng.
      const mealPlanUser = await this.userRepo.findOne({
        where: { user_id },
      });

      for (const recipe of recipes) {
        if (
          mealPlanUser &&
          !isRecipeDietCompatible(
            mealPlanUser.diet_type,
            recipe.diet_type,
          )
        ) {
          errors.push(
            `Món "${recipe.title}" không hợp với chế độ ăn của bạn.`,
          );
        }
      }

      const recipeById = new Map(recipes.map((r) => [r.recipe_id, r]));

      try {
        await this.assertNoAllergyConflict(
          user_id,
          recipeIds,
          recipeById,
        );
      } catch (error) {
        errors.push(
          error instanceof Error
            ? error.message
            : 'Có công thức chứa nguyên liệu bạn bị dị ứng.',
        );
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Kiểm tra mục tiêu cân nặng kèm theo thực đơn.
   *
   * Trả về danh sách lỗi (rỗng nếu hợp lệ) thay vì ném exception, vì
   * POST /meal-plans/validate có hợp đồng trả { valid, errors }.
   * Chỉ kiểm tra khi client thực sự gửi mục tiêu cân nặng.
   */
  private async validateGoalForMealPlan(
    user_id: number,
    dto: ValidateMealPlanDto,
  ): Promise<string[]> {
    const errors: string[] = [];

    const goal = (dto as ValidateMealPlanDto & {
      current_weight_kg?: number;
      target_weight_kg?: number;
      duration_days?: number;
      direction?: WeightGoalDirection;
    });

    const hasGoal =
      goal.current_weight_kg !== undefined ||
      goal.target_weight_kg !== undefined ||
      goal.duration_days !== undefined;

    if (!hasGoal) return errors;

    // Phải nạp quan hệ `current_goal`: nếu không, `user.current_goal` luôn là
    // null -> mục tiêu sức khoẻ đang lưu trong hồ sơ bị bỏ qua, và hệ thống
    // rơi về "maintain" dù người dùng đã chọn tăng/giảm.
    const user = await this.userRepo.findOne({
      where: { user_id },
      relations: ['current_goal'],
    });
    if (!user) {
      errors.push('Không tìm thấy hồ sơ người dùng.');
      return errors;
    }

    const clientExplicitDirection = goal.direction ?? null;
    const clientHasWeights =
      goal.current_weight_kg !== undefined && goal.target_weight_kg !== undefined;

    // Chốt mục tiêu bằng quy tắc dùng chung (giống luồng sinh thực đơn).
    const plan = resolveGoalPlan({
      clientCurrentWeight: goal.current_weight_kg ?? null,
      clientTargetWeight: goal.target_weight_kg ?? null,
      clientDurationDays: goal.duration_days ?? null,
      clientDirection: clientExplicitDirection,
      profileCurrentWeight: user.weight_kg ?? null,
      profileTargetWeight: user.target_weight_kg ?? null,
      profileTargetDate: user.target_date ?? null,
      profileHealthGoalName: user.current_goal?.name ?? null,
    });

    const direction = plan.direction;
    const current = plan.current_weight_kg;
    const target = plan.target_weight_kg;
    const durationDays = plan.duration_days;

    if (current == null || target == null || durationDays == null) {
      errors.push(
        'Thiếu dữ liệu mục tiêu cân nặng: cần cân nặng hiện tại, cân nặng mục tiêu và thời gian đạt mục tiêu.',
      );
      return errors;
    }

    // Chế độ duy trì đến từ hồ sơ -> bỏ qua cân nặng mục tiêu tồn đọng.
    const maintainFromProfile =
      direction === 'maintain' && !clientExplicitDirection && !clientHasWeights;
    const effectiveTarget = maintainFromProfile ? current : target;

    try {
      assertValidGoalInput({
        current_weight_kg: current,
        target_weight_kg: effectiveTarget,
        duration_days: durationDays,
        direction,
      });
    } catch (e) {
      errors.push(
        e instanceof Error ? e.message : 'Dữ liệu mục tiêu cân nặng không hợp lệ.',
      );
      return errors;
    }

    try {
      const assessment = assessWeightGoal(
        { current_weight_kg: current, target_weight_kg: effectiveTarget, duration_days: durationDays, direction },
        {
          age: user.age!,
          gender: user.gender!,
          height_cm: user.height_cm!,
          weight_kg: user.weight_kg!,
          activity_level: user.activity_level!,
        },
      );

      if (!assessment.valid) {
        errors.push(assessment.message);
        if (assessment.suggestion) errors.push(assessment.suggestion);
      }
    } catch (e) {
      errors.push(
        e instanceof Error
          ? e.message
          : 'Không thể đánh giá mục tiêu cân nặng.',
      );
    }

    return errors;
  }

  // =========================================================
  // HELPER: CHẶN MÓN CHỨA NGUYÊN LIỆU GÂY DỊ ỨNG
  // =========================================================

  /**
   * Kiểm tra các công thức trong thực đơn có chứa nguyên liệu user bị dị ứng
   * hay không.
   *
   * Dùng chung cho luồng lưu thực đơn (POST /meal-plans) và luồng validate
   * thực đơn (POST /meal-plans/validate) để cả 2 báo lỗi giống nhau.
   */
  private async assertNoAllergyConflict(
    user_id: number,
    recipeIds: number[],
    recipeById: Map<number, Recipe>,
  ): Promise<void> {
    if (recipeIds.length === 0) {
      return;
    }

    const allergyRows = await this.allergyRepo.find({
      where: { user_id },
    });

    if (allergyRows.length === 0) {
      return;
    }

    const allergyIds = new Set(
      allergyRows.map((row) => row.ingredient_id),
    );

    const recipeIngredients = await this.recipeIngredientRepo.find({
      where: { recipe_id: In(recipeIds) },
    });

    const conflicting = recipeIngredients.filter((row) =>
      allergyIds.has(row.ingredient_id),
    );

    if (conflicting.length === 0) {
      return;
    }

    const ingredientNames = await this.ingredientService.findByIds(
      [...new Set(conflicting.map((row) => row.ingredient_id))],
    );

    const nameMap = new Map(
      ingredientNames.map((i) => [i.ingredient_id, i.ingredient_name]),
    );

    const allergenNames = [
      ...new Set(
        conflicting.map(
          (row) =>
            nameMap.get(row.ingredient_id) ?? `#${row.ingredient_id}`,
        ),
      ),
    ].join(', ');

    const recipeTitles = [
      ...new Set(
        conflicting.map((row) => {
          const recipe = recipeById.get(row.recipe_id);
          return recipe ? `"${recipe.title}"` : `#${row.recipe_id}`;
        }),
      ),
    ].join(', ');

    throw new BadRequestException(
      `Công thức ${recipeTitles} chứa nguyên liệu bạn bị dị ứng: ${allergenNames}`,
    );
  }

  // =========================================================
  // UPDATE MY MEAL PLAN
  // =========================================================

  async updateMyMealPlan(
    user_id: number,
    meal_plan_id: number,
    dto: UpdateMyMealPlanDto,
  ) {
    const mealPlan = await this.mealPlanRepo.findOne({
      where: { meal_plan_id, user_id },
    });

    if (!mealPlan) {
      throw new NotFoundException({ code: ErrorCode.MEAL_PLAN_NOT_FOUND, message: 'Không tìm thấy thực đơn của bạn' });
    }

    if (dto.name !== undefined) {
      mealPlan.name = dto.name.trim() || null;
    }

    if (dto.target_calories_per_day !== undefined) {
      // Chặn kcal mục tiêu không an toàn trước khi ghi.
      assertSafeCalories(dto.target_calories_per_day);
      mealPlan.target_calories_per_day =
        dto.target_calories_per_day;
    }

    if (dto.has_budget !== undefined) {
      mealPlan.has_budget = dto.has_budget;
    }

    if (dto.status !== undefined) {
      mealPlan.status = dto.status;
    }

    await this.mealPlanRepo.save(mealPlan);

    return this.findMyMealPlanDetail(user_id, meal_plan_id);
  }

  // =========================================================
  // DELETE MY MEAL PLAN
  // =========================================================

  async deleteMyMealPlan(
    user_id: number,
    meal_plan_id: number,
  ) {
    const mealPlan = await this.mealPlanRepo.findOne({
      where: { meal_plan_id, user_id },
    });

    if (!mealPlan) {
      throw new NotFoundException({ code: ErrorCode.MEAL_PLAN_NOT_FOUND, message: 'Không tìm thấy thực đơn của bạn' });
    }

    await this.mealPlanRepo.remove(mealPlan);

    return {
      success: true,
      message: 'Xóa thực đơn thành công',
    };
  }

  // =========================================================
  // UPDATE MEAL SLOT
  // =========================================================

  async updateMealSlot(
    user_id: number,
    meal_plan_id: number,
    day_id: number,
    slot_id: number,
    dto: UpdateMealSlotDto,
  ) {
    // 1. Kiểm tra thực đơn thuộc người dùng
    const mealPlan = await this.mealPlanRepo.findOne({
      where: { meal_plan_id, user_id },
    });

    if (!mealPlan) {
      throw new NotFoundException({ code: ErrorCode.MEAL_PLAN_NOT_FOUND, message: 'Không tìm thấy thực đơn của bạn' });
    }

    // 2. Kiểm tra ngày thuộc thực đơn
    const dailyMeal = await this.dailyMealRepo.findOne({
      where: { daily_meal_id: day_id },
      relations: { weekly_plan: true },
    });

    if (
      !dailyMeal ||
      dailyMeal.weekly_plan.meal_plan_id !== meal_plan_id
    ) {
      throw new NotFoundException('Không tìm thấy ngày trong thực đơn');
    }

    // 3. Kiểm tra món ăn thuộc đúng ngày
    const mealItem = await this.mealItemRepo.findOne({
      where: {
        meal_item_id: slot_id,
        daily_meal_id: day_id,
      },
    });

    if (!mealItem) {
      throw new NotFoundException('Không tìm thấy món ăn trong bữa');
    }

    // 4. Cập nhật công thức nếu có truyền recipe_id
    if (dto.recipe_id !== undefined) {
      const recipe = await this.recipeRepo.findOne({
        where: {
          recipe_id: dto.recipe_id,
          status: RecipeStatus.APPROVED,
        },
      });

      if (!recipe) {
        throw new BadRequestException(
          'Công thức không tồn tại hoặc chưa được duyệt',
        );
      }

      // Kiểm tra dị ứng với nguyên liệu trong công thức mới.
      // Thực đơn có target_profile_id thuộc về hồ sơ người thân, nên phải
      // dùng dị ứng + chế độ ăn CỦA HỒ SƠ ĐÓ, không phải của chủ thực đơn.
      const planTarget = await this.resolvePlanTarget(mealPlan, user_id);
      const allergyIngredientIds = new Set(
        planTarget.allergyIngredientIds,
      );

      if (allergyIngredientIds.size > 0) {
        const recipeIngredients = await this.recipeIngredientRepo.find({
          where: { recipe_id: dto.recipe_id },
        });

        const conflictingIngredients = recipeIngredients.filter((ri) =>
          allergyIngredientIds.has(ri.ingredient_id),
        );

        if (conflictingIngredients.length > 0) {
          // Lấy tên nguyên liệu gây dị ứng
          const ingredientNames = await this.ingredientService.findByIds(
            conflictingIngredients.map((ri: RecipeIngredient) => ri.ingredient_id),
          );
          const ingredientMap = new Map(
            ingredientNames.map((i: Ingredient) => [i.ingredient_id, i.ingredient_name]),
          );
          const allergenNames = conflictingIngredients
            .map((ri) => ingredientMap.get(ri.ingredient_id) ?? `#${ri.ingredient_id}`)
            .join(', ');

          throw new BadRequestException(
            `Công thức chứa nguyên liệu bạn bị dị ứng: ${allergenNames}`,
          );
        }
      }

      // Món phải hợp với bữa (suitable_meals chứa meal_type của ngày).
      // Nếu không kiểm tra, người dùng có thể đổi bữa tối sang món chỉ
      // hợp bữa sáng -> thực đơn sai nghiệp vụ.
      if (
        dailyMeal.meal_type &&
        !isSuitableForMeal(recipe, dailyMeal.meal_type)
      ) {
        throw new BadRequestException(
          `Công thức "${recipe.title}" không hợp với bữa ${dailyMeal.meal_type} ` +
            `(suitable_meals: ${recipe.suitable_meals ?? 'không có'}).`,
        );
      }

      // Món phải hợp chế độ ăn của đối tượng được lập thực đơn
      // (hồ sơ người thân nếu có, nếu không thì của chủ thực đơn).
      if (
        !isRecipeDietCompatible(
          planTarget.dietType,
          recipe.diet_type,
        )
      ) {
        throw new BadRequestException(
          `Công thức "${recipe.title}" không hợp với chế độ ăn của bạn.`,
        );
      }

      mealItem.recipe_id = dto.recipe_id;
      mealItem.is_ai_suggested = false;
      mealItem.added_by_user = true;
    }

    // 5. Cập nhật khẩu phần nếu có truyền
    if (dto.portion_multiplier !== undefined) {
      mealItem.portion_multiplier = dto.portion_multiplier;
    }

    if (
      dto.recipe_id === undefined &&
      dto.portion_multiplier === undefined
    ) {
      throw new BadRequestException(
        'Bạn cần cung cấp recipe_id hoặc portion_multiplier',
      );
    }

    await this.mealItemRepo.save(mealItem);

    return this.findMyMealPlanDetail(user_id, meal_plan_id);
  }

  // =========================================================
  // HELPER: CHUẨN BỊ DỮ LIỆU SINH THỰC ĐƠN CHO USER
  // Dùng chung cho weekly và monthly.
  //
  // Thứ tự ưu tiên kcal mục tiêu:
  //   1. Mục tiêu cân nặng client gửi kèm (current/target/duration) — có kiểm tra an toàn.
  //   2. Mục tiêu cân nặng đã lưu trong hồ sơ (target_weight_kg + target_date) — có kiểm tra an toàn.
  //   3. Công thức kcal theo mục tiêu sức khoẻ đang chọn (Mifflin-St Jeor × hệ số hoạt động × hệ số mục tiêu, sàn 1200 kcal).
  //
  // Nếu mục tiêu cân nặng KHÔNG an toàn -> ném lỗi, KHÔNG sinh thực đơn.
  // =========================================================

  private async prepareUserGeneration(
    user_id: number,
    goalDto?: {
      current_weight_kg?: number;
      target_weight_kg?: number;
      duration_days?: number;
      direction?: WeightGoalDirection;
    },
  ) {
    const user = await this.userRepo.findOne({
      where: { user_id },
      relations: ['current_goal'],
    });

    if (!user) {
      throw new NotFoundException(`Không tìm thấy người dùng #${user_id}`);
    }

    const missing: string[] = [];

    if (user.age == null) missing.push('age');
    if (!user.gender) missing.push('gender');
    if (user.height_cm == null) missing.push('height_cm');
    if (user.weight_kg == null) missing.push('weight_kg');
    if (!user.activity_level) missing.push('activity_level');

    if (missing.length > 0) {
      throw new BadRequestException(
        `Cần cập nhật hồ sơ trước: thiếu ${missing.join(', ')}`,
      );
    }

    const assessment = await resolveGoalAssessment(user, goalDto);
    const targetCalories = assessment
      ? assessment.target_calories
      : calculateTargetCalories(
          user.age!,
          user.gender!,
          user.height_cm!,
          user.weight_kg!,
          user.activity_level!,
          user.current_goal?.name ?? 'maintain',
        );

    const safeRecipes = await this.getSafeRecipes(user_id, user.diet_type);
    const nutritionMap = await this.getNutritionMap(safeRecipes);

    // Chỉ giữ món CÓ dữ liệu dinh dưỡng để tính được kcal thực tế.
    // Món không có nutrition_infos (calories = null) sẽ bị coi là 0 kcal
    // -> thực đơn hụt calo so với mục tiêu mà người dùng không biết.
    const recipesWithNutrition = safeRecipes.filter(
      (recipe) => Number(nutritionMap.get(recipe.recipe_id)?.calories ?? 0) > 0,
    );

    if (recipesWithNutrition.length === 0) {
      throw new NotFoundException(
        'Không có công thức nào có dữ liệu dinh dưỡng để tính calo cho thực đơn.',
      );
    }

    const mealTargets = splitMealCalories(targetCalories);

    return {
      user,
      targetCalories,
      safeRecipes: recipesWithNutrition,
      nutritionMap,
      mealTargets,
      assessment,
      // goal_id lưu kèm thực đơn phải KHỚP với hướng đã áp dụng. Nếu client gửi
      // `direction` khác mục tiêu đang lưu trong hồ sơ thì lưu theo hồ sơ sẽ
      // ghi sai (thực đơn tăng cân nhưng `goal_id` trỏ tới giảm cân).
      goalId: await this.resolveGoalIdForDirection(
        toWeightGoalDirection(assessment?.direction ?? user.current_goal?.name),
        user.current_goal_id ?? null,
      ),
    };
  }

  /**
   * Chọn `goal_id` lưu kèm thực đơn theo hướng đã áp dụng.
   *
   * - Nếu hồ sơ đang đặt đúng hướng đó -> giữ `current_goal_id`.
   * - Nếu client gửi hướng KHÁC mục tiêu trong hồ sơ -> tìm (hoặc tự khởi
   *   tạo) dòng `health_goals` tương ứng để thực đơn không bị gắn sai nhãn.
   * - Không tìm được -> null (không chặn sinh thực đơn).
   */
  private async resolveGoalIdForDirection(
    direction: WeightGoalDirection,
    profileGoalId: number | null,
  ): Promise<number | null> {
    if (!this.goalRepo) return profileGoalId;

    try {
      const goals = await this.goalRepo.find();
      if (goals.length === 0) return profileGoalId;

      const match = goals.find((g) => g.name === direction);
      if (match) {
        // Hướng đã khớp -> giữ id hồ sơ nếu có, nếu không thì dùng id thật.
        if (profileGoalId != null && goals.some((g) => g.goal_id === profileGoalId)) {
          const profileGoal = goals.find((g) => g.goal_id === profileGoalId);
          if (profileGoal?.name === direction) return profileGoalId;
        }
        return match.goal_id;
      }
    } catch {
      // Không tra được master data -> giữ hành vi cũ, KHÔNG chặn sinh thực đơn.
    }

    return profileGoalId;
  }

  // =========================================================
  // POST /meal-plans/generate/daily
  // =========================================================

  async generateDailyMealPlan(
    user_id: number,
    dto: GenerateMealPlanDto = {},
  ) {
    const { user, targetCalories, safeRecipes, nutritionMap, mealTargets, goalId, assessment } =
      await this.prepareUserGeneration(user_id, dto);

    const hasBudget = dto.total_budget !== undefined;

    const costMap = hasBudget
      ? await this.getRecipeCostMap(safeRecipes)
      : new Map<number, number>();

    // Chọn món cho 1 ngày (3 buổi sáng trưa chiều có 2-3 món, bữa phụ 1 món)
    const plannedMeals = planMeals({
      dayCount: 1,
      mealTargets,
      recipes: safeRecipes,
      nutritionMap,
      costMap,
      usedRecipeCounts: new Map<number, number>(),
      recentUsedDays: new Map<number, number>(),
      dayOffset: 0,
      budget: hasBudget
        ? { remaining: dto.total_budget!, slotsLeft: 1 * Object.keys(mealTargets).length * 2 }
        : undefined,
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const mealPlan = new MealPlan();
    mealPlan.user_id = user_id;
    mealPlan.goal_id = goalId ?? user.current_goal_id ?? null;
    mealPlan.bmi_snapshot = user.bmi ?? null;
    mealPlan.plan_type = PlanType.DAILY;
    mealPlan.start_date = today;
    mealPlan.end_date = today;
    mealPlan.has_budget = hasBudget;
    if (hasBudget) {
      mealPlan.total_budget = dto.total_budget!;
    }
    mealPlan.target_calories_per_day = targetCalories;
    mealPlan.status = MealPlanStatus.ACTIVE;
    mealPlan.generated_by = 'AI';

    // Tổng hợp nguyên liệu theo gam (có ~) để cung cấp cho Bếp trưởng AI xét duyệt và trả về response
    const dailyIngredientsMap = await this.getIngredientsMap(
      plannedMeals.map((m) => m.recipe.recipe_id),
    );
    const dailyIngredientAgg = aggregateIngredientsByGram(plannedMeals, dailyIngredientsMap);
    const dailyIngredientSummary = dailyIngredientAgg
      .map((i) => '- ' + i.ingredient_name + ': ~' + i.quantity_g + 'g')
      .join('\n');

    const aiReview = await this.reviewMealPlanWithAI(plannedMeals, targetCalories, 'daily', dailyIngredientSummary);
    mealPlan.ai_cookability_notes = aiReview.chef_advice;

    const savedMealPlanId = await this.dataSource.transaction(async (manager) => {
      const mealPlanRepo = manager.getRepository(MealPlan);
      const weeklyPlanRepo = manager.getRepository(WeeklyPlan);
      const dailyMealRepo = manager.getRepository(DailyMeal);
      const mealItemRepo = manager.getRepository(MealItem);

      const savedMealPlan = await mealPlanRepo.save(mealPlan);

      const weeklyPlan = new WeeklyPlan();
      weeklyPlan.meal_plan_id = savedMealPlan.meal_plan_id;
      weeklyPlan.week_number = 1;
      weeklyPlan.start_date = today;
      weeklyPlan.end_date = today;
      weeklyPlan.rollover_amount = 0;
      weeklyPlan.week_calorie_target = targetCalories;

      const savedWeeklyPlan = await weeklyPlanRepo.save(weeklyPlan);

      await this.savePlannedMeals(
        savedWeeklyPlan.weekly_plan_id,
        today,
        plannedMeals,
        dailyMealRepo,
        mealItemRepo,
      );

      return savedMealPlan.meal_plan_id;
    });

    const detail = await this.findMyMealPlanDetail(
      user_id,
      savedMealPlanId,
    );

    return { ...detail, goal_assessment: assessment, ingredient_summary: dailyIngredientAgg };
  }

  // =========================================================
  // POST /meal-plans/generate/weekly
  // =========================================================

  async generateWeeklyMealPlan(
    user_id: number,
    dto: GenerateMealPlanDto = {},
  ) {
    const { user, targetCalories, safeRecipes, nutritionMap, mealTargets, goalId, assessment } =
      await this.prepareUserGeneration(user_id, dto);

    const hasBudget = dto.total_budget !== undefined;

    const costMap = hasBudget
      ? await this.getRecipeCostMap(safeRecipes)
      : new Map<number, number>();

    // Chọn món trước khi ghi DB; ném lỗi nếu không đủ ngân sách.
    const plannedMeals = planMeals({
      dayCount: 7,
      mealTargets,
      recipes: safeRecipes,
      nutritionMap,
      costMap,
      usedRecipeCounts: new Map<number, number>(),
      recentUsedDays: new Map<number, number>(),
      dayOffset: 0,
      budget: hasBudget
        ? { remaining: dto.total_budget!, slotsLeft: 7 * Object.keys(mealTargets).length * 2 }
        : undefined,
    });

    const today = new Date();
    const currentDay = today.getDay();
    const diffToMonday =
      currentDay === 0 ? -6 : 1 - currentDay;

    const monday = new Date(today);
    monday.setDate(today.getDate() + diffToMonday);
    monday.setHours(0, 0, 0, 0);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(0, 0, 0, 0);

    const mealPlan = new MealPlan();

    mealPlan.user_id = user_id;
    mealPlan.goal_id = goalId ?? user.current_goal_id ?? null;
    mealPlan.bmi_snapshot = user.bmi ?? null;
    mealPlan.plan_type = PlanType.WEEKLY;
    mealPlan.start_date = monday;
    mealPlan.end_date = sunday;
    mealPlan.has_budget = hasBudget;
    if (hasBudget) {
      mealPlan.total_budget = dto.total_budget!;
    }
    mealPlan.target_calories_per_day = targetCalories;
    mealPlan.status = MealPlanStatus.ACTIVE;
    mealPlan.generated_by = 'AI';

    // Tổng hợp nguyên liệu theo gam (có ~) để cung cấp cho Bếp trưởng AI (Groq) và trả về response
    const weeklyIngredientsMap = await this.getIngredientsMap(
      plannedMeals.map((m) => m.recipe.recipe_id),
    );
    const weeklyIngredientAgg = aggregateIngredientsByGram(plannedMeals, weeklyIngredientsMap);
    const weeklyIngredientSummary = weeklyIngredientAgg
      .map((i) => '- ' + i.ingredient_name + ': ~' + i.quantity_g + 'g')
      .join('\n');

    const groqReview = await this.reviewAndOptimizeWithGroq(plannedMeals, targetCalories, 'weekly', weeklyIngredientSummary);
    mealPlan.ai_cookability_notes = groqReview.chef_advice;

    // Ghi MealPlan + WeeklyPlan + DailyMeal + MealItem trong 1 transaction để
    // không để lại thực đơn dở dang (thiếu bữa) khi 1 phần ghi lỗi.
    const savedMealPlanId = await this.dataSource.transaction(async (manager) => {
      // Kiểm tra hạn mức TRƯỚC khi ghi, trong cùng transaction manager ->
      // chặn được 2 request đồng thời và rollback sạch khi vượt hạn mức.
      await this.assertWithinMealPlanQuota(manager, user_id);

      const mealPlanRepo = manager.getRepository(MealPlan);
      const weeklyPlanRepo = manager.getRepository(WeeklyPlan);
      const dailyMealRepo = manager.getRepository(DailyMeal);
      const mealItemRepo = manager.getRepository(MealItem);

      const savedMealPlan = await mealPlanRepo.save(mealPlan);

      const weeklyPlan = new WeeklyPlan();

      weeklyPlan.meal_plan_id =
        savedMealPlan.meal_plan_id;
      weeklyPlan.week_number = 1;
      weeklyPlan.start_date = monday;
      weeklyPlan.end_date = sunday;
      weeklyPlan.rollover_amount = 0;
      weeklyPlan.week_calorie_target =
        targetCalories * 7;

      const savedWeeklyPlan =
        await weeklyPlanRepo.save(weeklyPlan);

      await this.savePlannedMeals(
        savedWeeklyPlan.weekly_plan_id,
        monday,
        plannedMeals,
        dailyMealRepo,
        mealItemRepo,
      );

      return savedMealPlan.meal_plan_id;
    });

    const detail = await this.findMyMealPlanDetail(
      user_id,
      savedMealPlanId,
    );

    // Trả kèm kết quả đánh giá mục tiêu và danh sách nguyên liệu tổng hợp theo gam (có ~)
    return { ...detail, goal_assessment: assessment, ingredient_summary: weeklyIngredientAgg };
  }

  // =========================================================
  // HELPER: GHI CÁC BỮA ĐÃ CHỌN VÀO DB
  // =========================================================

  private async savePlannedMeals(
    weeklyPlanId: number,
    firstDate: Date,
    plannedMeals: PlannedMeal[],
    dailyMealRepo: Repository<DailyMeal> = this.dailyMealRepo,
    mealItemRepo: Repository<MealItem> = this.mealItemRepo,
  ) {
    // Nhóm theo (dayIndex, mealType) để mỗi bữa có 2-3 món đều thuộc về 1 daily_meal
    const grouped = new Map<string, { dayIndex: number; mealType: string; meals: PlannedMeal[] }>();
    for (const planned of plannedMeals) {
      const key = `${planned.dayIndex}_${planned.mealType}`;
      if (!grouped.has(key)) {
        grouped.set(key, { dayIndex: planned.dayIndex, mealType: planned.mealType, meals: [] });
      }
      grouped.get(key)!.meals.push(planned);
    }

    for (const { dayIndex, mealType, meals } of grouped.values()) {
      const mealDate = new Date(firstDate);
      mealDate.setDate(firstDate.getDate() + dayIndex);

      mealDate.setHours(0, 0, 0, 0);

      const totalTargetCalories = meals.reduce((sum, m) => sum + m.calories, 0);

      const dailyMeal = new DailyMeal();
      dailyMeal.weekly_plan_id = weeklyPlanId;
      dailyMeal.meal_date = mealDate;
      dailyMeal.meal_type = mealType;
      dailyMeal.target_calories = totalTargetCalories;

      const savedDailyMeal = await dailyMealRepo.save(dailyMeal);

      for (const planned of meals) {
        const mealItem = new MealItem();

        mealItem.daily_meal_id = savedDailyMeal.daily_meal_id;
        mealItem.recipe_id = planned.recipe.recipe_id;
        mealItem.is_ai_suggested = true;
        mealItem.added_by_user = false;
        mealItem.portion_multiplier = planned.portion;

        await mealItemRepo.save(mealItem);
      }
    }
  }

  async saveMealPlan(
    user_id: number,
    dto: SaveMealPlanDto,
  ) {
    const user = await this.userRepo.findOne({
      where: { user_id },
    });

    if (!user) {
      throw new NotFoundException(
        `Không tìm thấy người dùng #${user_id}`,
      );
    }

    const startDate = new Date(dto.start_date);
    const endDate = new Date(dto.end_date);

    if (
      Number.isNaN(startDate.getTime()) ||
      Number.isNaN(endDate.getTime())
    ) {
      throw new BadRequestException(
        'start_date hoặc end_date không hợp lệ',
      );
    }

    if (endDate < startDate) {
      throw new BadRequestException(
        'end_date phải lớn hơn hoặc bằng start_date',
      );
    }

    for (const week of dto.weekly_plans ?? []) {
      const weekStart = new Date(week.start_date);
      const weekEnd = new Date(week.end_date);

      if (
        Number.isNaN(weekStart.getTime()) ||
        Number.isNaN(weekEnd.getTime())
      ) {
        throw new BadRequestException(
          `Tuần ${week.week_number}: ngày không hợp lệ`,
        );
      }

      if (weekEnd < weekStart) {
        throw new BadRequestException(
          `Tuần ${week.week_number}: end_date không hợp lệ`,
        );
      }

      if (weekStart < startDate || weekEnd > endDate) {
        throw new BadRequestException(
          `Tuần ${week.week_number} nằm ngoài khoảng ngày của thực đơn`,
        );
      }

      for (const meal of week.daily_meals ?? []) {
        const mealDate = new Date(meal.meal_date);

        if (Number.isNaN(mealDate.getTime())) {
          throw new BadRequestException(
            `Ngày ăn ${meal.meal_date} không hợp lệ`,
          );
        }

        if (mealDate < weekStart || mealDate > weekEnd) {
          throw new BadRequestException(
            `Ngày ăn ${meal.meal_date} nằm ngoài khoảng ngày của tuần`,
          );
        }
      }
    }

    const recipeIds = [
      ...new Set(
        (dto.weekly_plans ?? []).flatMap((week) =>
          (week.daily_meals ?? []).flatMap((meal) =>
            (meal.meal_items ?? []).map(
              (item) => item.recipe_id,
            ),
          ),
        ),
      ),
    ];

    if (recipeIds.length > 0) {
      const approvedRecipes = await this.recipeRepo.find({
        where: {
          recipe_id: In(recipeIds),
          status: RecipeStatus.APPROVED,
        },
      });

      const approvedIds = new Set(
        approvedRecipes.map((recipe) => recipe.recipe_id),
      );

      const invalidIds = recipeIds.filter(
        (id) => !approvedIds.has(id),
      );

      if (invalidIds.length > 0) {
        throw new BadRequestException(
          `Công thức không tồn tại hoặc chưa được duyệt: ${invalidIds.join(', ')}`,
        );
      }
    }

    // Món trong bữa phải hợp với bữa (suitable_meals chứa meal_type của ngày)
    // và phải hợp chế độ ăn của user - trước đây chỉ kiểm tra "đã duyệt"
    // nên người dùng có thể lưu bữa tối chứa món chỉ hợp bữa sáng.
    const recipeById = new Map<number, Recipe>();

    if (recipeIds.length > 0) {
      const approvedRecipes = await this.recipeRepo.find({
        where: { recipe_id: In(recipeIds) },
      });

      for (const recipe of approvedRecipes) {
        recipeById.set(recipe.recipe_id, recipe);
      }
    }

    for (const week of dto.weekly_plans ?? []) {
      for (const meal of week.daily_meals ?? []) {
        for (const item of meal.meal_items ?? []) {
          const recipe = recipeById.get(item.recipe_id);

          if (!recipe) {
            continue;
          }

          if (!isSuitableForMeal(recipe, meal.meal_type)) {
            throw new BadRequestException(
              `Công thức "${recipe.title}" không hợp với bữa ${meal.meal_type} ` +
                `(suitable_meals: ${recipe.suitable_meals ?? 'không có'}).`,
            );
          }

          if (
            !isRecipeDietCompatible(
              user.diet_type,
              recipe.diet_type,
            )
          ) {
            throw new BadRequestException(
              `Công thức "${recipe.title}" không hợp với chế độ ăn của bạn.`,
            );
          }
        }
      }
    }

    // Món trong thực đơn không được chứa nguyên liệu user bị dị ứng.
    // Trước đây luồng này chỉ kiểm tra "đã duyệt" + bữa ăn + chế độ ăn,
    // nên user có thể lưu thực đơn chứa món có nguyên liệu gây dị ứng.
    await this.assertNoAllergyConflict(user_id, recipeIds, recipeById);

    // Calo mục tiêu phải an toàn (không âm, không 0, không thấp hơn sàn).
    if (dto.target_calories_per_day !== undefined) {
      assertSafeCalories(dto.target_calories_per_day);
    }

    const mealPlan = new MealPlan();

    mealPlan.user_id = user_id;
    mealPlan.goal_id =
      dto.goal_id ?? user.current_goal_id ?? null;
    mealPlan.bmi_snapshot = user.bmi ?? null;
    mealPlan.plan_type = dto.plan_type ?? PlanType.WEEKLY;
    mealPlan.start_date = startDate;
    mealPlan.end_date = endDate;
    mealPlan.has_budget = dto.has_budget ?? false;

    if (dto.total_budget !== undefined) {
      mealPlan.total_budget = dto.total_budget;
    }

    if (dto.target_calories_per_day !== undefined) {
      mealPlan.target_calories_per_day =
        dto.target_calories_per_day;
    }

    mealPlan.status = MealPlanStatus.ACTIVE;
    mealPlan.generated_by = 'USER';

    // Ghi MealPlan + WeeklyPlan + DailyMeal + MealItem trong 1 transaction.
    // Sau khi COMMIT mới đọc lại chi tiết: đọc bằng this.mealPlanRepo (default
    // connection) trong lúc transaction chưa commit sẽ không thấy dữ liệu vừa
    // ghi -> trả 404 và làm rollback toàn bộ lưu thực đơn.
    const savedMealPlanId = await this.dataSource.transaction(async (manager) => {
      // Kiểm tra hạn mức TRƯỚC khi ghi, trong cùng transaction manager ->
      // chặn được 2 request đồng thời và rollback sạch khi vượt hạn mức.
      await this.assertWithinMealPlanQuota(manager, user_id);

      const mealPlanRepo = manager.getRepository(MealPlan);
      const weeklyPlanRepo = manager.getRepository(WeeklyPlan);
      const dailyMealRepo = manager.getRepository(DailyMeal);
      const mealItemRepo = manager.getRepository(MealItem);

      const savedMealPlan = await mealPlanRepo.save(mealPlan);

      for (const weekDto of dto.weekly_plans ?? []) {
        const weeklyPlan = new WeeklyPlan();

        weeklyPlan.meal_plan_id =
          savedMealPlan.meal_plan_id;
        weeklyPlan.week_number = weekDto.week_number;
        weeklyPlan.start_date = new Date(weekDto.start_date);
        weeklyPlan.end_date = new Date(weekDto.end_date);
        weeklyPlan.week_calorie_target =
          weekDto.week_calorie_target ?? 0;

        const savedWeeklyPlan =
          await weeklyPlanRepo.save(weeklyPlan);

        for (const dayDto of weekDto.daily_meals ?? []) {
          const dailyMeal = new DailyMeal();

          dailyMeal.weekly_plan_id =
            savedWeeklyPlan.weekly_plan_id;
          dailyMeal.meal_date = new Date(dayDto.meal_date);
          dailyMeal.meal_type = dayDto.meal_type;
          dailyMeal.target_calories =
            dayDto.target_calories ?? 0;

          const savedDailyMeal =
            await dailyMealRepo.save(dailyMeal);

          for (const itemDto of dayDto.meal_items ?? []) {
            const mealItem = new MealItem();

            mealItem.daily_meal_id =
              savedDailyMeal.daily_meal_id;
            mealItem.recipe_id = itemDto.recipe_id;
            mealItem.is_ai_suggested =
              itemDto.is_ai_suggested ?? false;
            mealItem.added_by_user = true;
            mealItem.portion_multiplier =
              itemDto.portion_multiplier ?? 1;

            await mealItemRepo.save(mealItem);
          }
        }
      }

      return savedMealPlan.meal_plan_id;
    });

    return this.findMyMealPlanDetail(user_id, savedMealPlanId);
  }

  // =========================================================
  // GENERATE MONTHLY MEAL PLAN
  // =========================================================

  async generateMonthlyMealPlan(
    user_id: number,
    dto: GenerateMealPlanDto = {},
  ) {
    const { user, targetCalories, safeRecipes, nutritionMap, mealTargets, goalId, assessment } =
      await this.prepareUserGeneration(user_id, dto);

    const today = new Date();

    const monthStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      1,
    );

    const monthEnd = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0,
    );

    monthStart.setHours(0, 0, 0, 0);
    monthEnd.setHours(0, 0, 0, 0);

    // Ràng buộc chu kỳ 30 ngày của gói đăng ký: Không vượt quá ngày hết hạn của gói
    let premEnd: Date | null = null;
    if (user?.premium_until) {
      premEnd = new Date(user.premium_until);
    } else if (typeof this.subscriptionService?.premiumStatus === 'function') {
      const premStatus = await this.subscriptionService.premiumStatus(user_id);
      if (premStatus?.premium_until) {
        premEnd = new Date(premStatus.premium_until);
      }
    }

    let effectiveEnd = monthEnd;
    if (premEnd) {
      premEnd.setHours(0, 0, 0, 0);
      if (premEnd < effectiveEnd) {
        effectiveEnd = premEnd;
      }
    }

    const hasBudget = dto.total_budget !== undefined;
    const dayMs = 24 * 60 * 60 * 1000;

    // Chia tháng thành các tuần (Thứ 2 - Chủ nhật, tuần đầu/cuối có thể ngắn hơn)
    const weeks: { start: Date; end: Date; days: number }[] = [];
    let cursor = new Date(monthStart);

    while (cursor <= effectiveEnd) {
      const start = new Date(cursor);
      const end = new Date(cursor);

      end.setDate(start.getDate() + ((7 - start.getDay()) % 7));

      if (end > effectiveEnd) {
        end.setTime(effectiveEnd.getTime());
      }

      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);

      weeks.push({
        start,
        end,
        days: Math.round((end.getTime() - start.getTime()) / dayMs) + 1,
      });

      cursor = new Date(end);
      cursor.setDate(cursor.getDate() + 1);
      cursor.setHours(0, 0, 0, 0);
    }

    // Chọn món cho cả tháng trước khi ghi DB; ném lỗi nếu không đủ ngân sách.
    const costMap = hasBudget
      ? await this.getRecipeCostMap(safeRecipes)
      : new Map<number, number>();

    const totalDays = weeks.reduce((sum, week) => sum + week.days, 0);
    const budget: BudgetTracker | undefined = hasBudget
      ? { remaining: dto.total_budget!, slotsLeft: totalDays * Object.keys(mealTargets).length * 2 }
      : undefined;

    const usedRecipeCounts = new Map<number, number>();
    const recentUsedDays = new Map<number, number>();
    let globalDayOffset = 0;

    const plannedByWeek = weeks.map((week) => {
      const weekMeals = planMeals({
        dayCount: week.days,
        mealTargets,
        recipes: safeRecipes,
        nutritionMap,
        costMap,
        usedRecipeCounts,
        recentUsedDays,
        dayOffset: globalDayOffset,
        budget,
      });
      globalDayOffset += week.days;
      return weekMeals;
    });

    const mealPlan = new MealPlan();

    mealPlan.user_id = user_id;
    mealPlan.goal_id = goalId ?? user.current_goal_id ?? null;
    mealPlan.bmi_snapshot = user.bmi ?? null;
    mealPlan.plan_type = PlanType.MONTHLY;
    mealPlan.start_date = monthStart;
    mealPlan.end_date = effectiveEnd;
    mealPlan.has_budget = hasBudget;

    if (hasBudget) {
      mealPlan.total_budget = dto.total_budget!;
    }

    mealPlan.target_calories_per_day = targetCalories;
    mealPlan.status = MealPlanStatus.ACTIVE;
    mealPlan.generated_by = 'AI';

    const allPlanned = plannedByWeek.flat();

    // Tổng hợp nguyên liệu theo gam (có ~) để cung cấp cho Bếp trưởng AI (Groq) và trả về response
    const monthlyIngredientsMap = await this.getIngredientsMap(
      allPlanned.map((m) => m.recipe.recipe_id),
    );
    const monthlyIngredientAgg = aggregateIngredientsByGram(allPlanned, monthlyIngredientsMap);
    const monthlyIngredientSummary = monthlyIngredientAgg
      .map((i) => '- ' + i.ingredient_name + ': ~' + i.quantity_g + 'g')
      .join('\n');

    const groqMonthlyReview = await this.reviewAndOptimizeWithGroq(allPlanned, targetCalories, 'monthly', monthlyIngredientSummary);
    mealPlan.ai_cookability_notes = groqMonthlyReview.chef_advice;

    // Ghi MealPlan + WeeklyPlan + DailyMeal + MealItem trong 1 transaction để
    // không để lại thực đơn dở dang khi 1 tuần ghi lỗi.
    const savedMealPlanId = await this.dataSource.transaction(async (manager) => {
      // Kiểm tra hạn mức TRƯỚC khi ghi, trong cùng transaction manager ->
      // chặn được 2 request đồng thời và rollback sạch khi vượt hạn mức.
      await this.assertWithinMealPlanQuota(manager, user_id);

      const mealPlanRepo = manager.getRepository(MealPlan);
      const weeklyPlanRepo = manager.getRepository(WeeklyPlan);
      const dailyMealRepo = manager.getRepository(DailyMeal);
      const mealItemRepo = manager.getRepository(MealItem);

      const savedMealPlan = await mealPlanRepo.save(mealPlan);

      for (const [index, week] of weeks.entries()) {
        const weeklyPlan = new WeeklyPlan();

        weeklyPlan.meal_plan_id =
          savedMealPlan.meal_plan_id;
        weeklyPlan.week_number = index + 1;
        weeklyPlan.start_date = new Date(week.start);
        weeklyPlan.end_date = new Date(week.end);
        weeklyPlan.rollover_amount = 0;
        weeklyPlan.week_calorie_target =
          targetCalories * week.days;

        const savedWeeklyPlan =
          await weeklyPlanRepo.save(weeklyPlan);

        await this.savePlannedMeals(
          savedWeeklyPlan.weekly_plan_id,
          week.start,
          plannedByWeek[index],
          dailyMealRepo,
          mealItemRepo,
        );
      }

      return savedMealPlan.meal_plan_id;
    });

    const detail = await this.findMyMealPlanDetail(
      user_id,
      savedMealPlanId,
    );

    // Trả kèm kết quả đánh giá mục tiêu và danh sách nguyên liệu tổng hợp theo gam (có ~)
    return { ...detail, goal_assessment: assessment, ingredient_summary: monthlyIngredientAgg };
  }

  // =========================================================
  // GENERATE MEAL PLAN FOR SOMEONE
  // =========================================================

  /**
   * Sinh thực đơn cho người thân, KHÔNG lưu vào database.
   *
   * Mọi thông tin đối tượng đều lấy từ request (profile_name, diet_type,
   * target_calories, allergy_ids) - không cần hồ sơ lưu trong DB.
   * Thực đơn được chọn bằng đúng bộ sinh thực đơn hiện có (planMeals) rồi
   * trả về response để frontend hiển thị/in.
   */
  async generateMealPlanForSomeone(
    user_id: number,
    dto: GenerateForSomeoneDto,
  ) {
    // Tính năng Premium: tạo thực đơn cho người thân
    const isPremium = await this.subscriptionService.isPremium(user_id);

    if (!isPremium) {
      throw new ForbiddenException(
        'Tạo thực đơn cho người thân là tính năng Premium. Vui lòng nâng cấp gói để sử dụng.',
      );
    }

    // Chế độ ăn: thiếu thì dùng thuần chay (nghiêm ngặt nhất) - không tự ý
    // mặc định là "được dùng mọi món".
    const dietType = dto.diet_type ?? DietType.VEGAN;

    // Calo mục tiêu: ưu tiên con số người dùng gửi lên; không gửi thì tính
    // theo hồ sơ chủ tài khoản làm mốc (cùng công thức Mifflin-St Jeor).
    const targetCalories =
      dto.target_calories ??
      (await this.resolveDefaultTargetCalories(user_id));

    // Dị ứng: lấy đúng danh sách người thân gửi lên (rỗng = không dị ứng),
    // KHÔNG dùng dị ứng của chủ tài khoản.
    // Nhóm dị ứng (PEANUT, DAIRY...) được ánh xạ sang ingredient_id y như
    // luồng PUT /users/me/allergies.
    const allergyIngredientIds = [
      ...new Set([
        ...(dto.allergy_ids ?? []),
        ...expandAllergenGroups(dto.allergen_groups),
      ]),
    ];

    if (allergyIngredientIds.length > 0) {
      const found = await this.ingredientService.findByIds(
        allergyIngredientIds,
      );

      if (found.length !== allergyIngredientIds.length) {
        throw new BadRequestException(
          'Có ingredient_id không tồn tại trong danh sách dị ứng',
        );
      }
    }

    const safeRecipes = await this.getSafeRecipes(
      user_id,
      dietType,
      allergyIngredientIds,
    );

    const hasBudget = dto.total_budget !== undefined;

    const nutritionMap = await this.getNutritionMap(safeRecipes);

    const costMap = hasBudget
      ? await this.getRecipeCostMap(safeRecipes)
      : new Map<number, number>();

    // Chỉ giữ món CÓ dữ liệu dinh dưỡng (xem prepareUserGeneration).
    const recipesWithNutrition = safeRecipes.filter(
      (recipe) => Number(nutritionMap.get(recipe.recipe_id)?.calories ?? 0) > 0,
    );

    if (recipesWithNutrition.length === 0) {
      throw new NotFoundException(
        'Không có công thức nào có dữ liệu dinh dưỡng để tính calo cho thực đơn.',
      );
    }

    const mealTargets = splitMealCalories(targetCalories);

    // Chọn món trước; ném lỗi nếu không đủ ngân sách.
    const plannedMeals = planMeals({
      dayCount: 7,
      mealTargets,
      recipes: recipesWithNutrition,
      nutritionMap,
      costMap,
      usedRecipeCounts: new Map<number, number>(),
      recentUsedDays: new Map<number, number>(),
      dayOffset: 0,
      budget: hasBudget
        ? { remaining: dto.total_budget!, slotsLeft: 7 * Object.keys(mealTargets).length }
        : undefined,
    });

    const startDate = getWeekStart();

    // Nguyên liệu của các món được chọn: cần cho màn hình hiển thị/in.
    const ingredientsMap = await this.getIngredientsMap(
      plannedMeals.map((meal) => meal.recipe.recipe_id),
    );

    const someoneIngredientAgg = aggregateIngredientsByGram(plannedMeals, ingredientsMap);

    const preview = buildPreviewMealPlan({
      profileName: dto.profile_name?.trim() || 'Người thân',
      dietType,
      targetCalories,
      allergyIngredientIds,
      startDate,
      plannedMeals,
      nutritionMap,
      ingredientsMap,
      hasBudget,
      totalBudget: dto.total_budget,
    });

    return { ...preview, ingredient_summary: someoneIngredientAgg };
  }

  /**
   * Calo mục tiêu mặc định khi client không gửi target_calories.
   * Dùng hồ sơ chủ tài khoản làm mốc để thực đơn người thân vẫn có mức
   * calo hợp lý thay vì để trống.
   */
  private async resolveDefaultTargetCalories(
    user_id: number,
  ): Promise<number> {
    const user = await this.userRepo.findOne({
      where: { user_id },
      relations: ['current_goal'],
    });

    if (!user) {
      throw new NotFoundException(`Không tìm thấy người dùng #${user_id}`);
    }

    const missing: string[] = [];

    if (user.age == null) missing.push('age');
    if (!user.gender) missing.push('gender');
    if (user.height_cm == null) missing.push('height_cm');
    if (user.weight_kg == null) missing.push('weight_kg');
    if (!user.activity_level) missing.push('activity_level');

    if (missing.length > 0) {
      throw new BadRequestException(
        `Cần cập nhật hồ sơ trước: thiếu ${missing.join(', ')}`,
      );
    }

    return calculateTargetCalories(
      user.age!,
      user.gender!,
      user.height_cm!,
      user.weight_kg!,
      user.activity_level!,
      user.current_goal?.name ?? 'maintain',
    );
  }

}
