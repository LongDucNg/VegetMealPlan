import { ErrorCode } from '../../common/constants/error-codes.enum';
import { isRecipeDietCompatible } from '../../common/utils/diet.util';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, DataSource } from 'typeorm';

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
import { calculateIngredientCost } from '../recipe/recipe-cost.util';
import { isRecipeSuitableForMeal } from '../recipe/recipe-meals.util';
import { SubscriptionService } from '../subscription/subscription.service';
import { FavoriteRecipe } from '../recipe/entities/favorite-recipe.entity';
import { NutritionInfo } from '../nutrition/entities/nutrition-info.entity';

import { User, DietType } from '../users/entities/user.entity';
import { ALLERGEN_GROUPS } from '../users/allergen-groups';
import { UserAllergy } from '../ingredient/entities/user-allergy.entity';

import { CreateMealPlanDto } from './dto/create-meal-plan.dto';
import { SaveMealPlanDto } from './dto/save-meal-plan.dto';
import { UpdateMyMealPlanDto } from './dto/update-my-meal-plan.dto';
import { ValidateMealPlanDto } from './dto/validate-meal-plan.dto';
import { UpdateMealSlotDto } from './dto/update-meal-slot.dto';
import { GenerateMealPlanDto } from './dto/generate-meal-plan.dto';
import { IngredientService } from '../ingredient/ingredient.service';

interface BudgetTracker {
  remaining: number;
  slotsLeft: number;
}

interface PlannedMeal {
  dayIndex: number;
  mealType: string;
  calories: number;
  recipe: Recipe;
  portion: number;
}

/** Một dòng nguyên liệu của công thức (dùng cho response xem/in). */
interface RecipeIngredientRow {
  ingredient_id: number;
  ingredient_name: string;
  quantity: number;
  unit: string;
  is_optional: boolean;
}

@Injectable()
export class MealPlanService {
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
  ) { }

  // =========================================================
  // HELPER: KIỂM TRA MÓN CÓ PHÙ HỢP VỚI BỮA ĂN KHÔNG
  // =========================================================

  private isSuitableForMeal(
    recipe: Recipe,
    mealType: string,
  ): boolean {
    // suitable_meals là nguồn chuẩn (vd. meal_type='lunch' nhưng
    // suitable_meals='lunch,dinner' thì dùng được cho cả bữa tối).
    // Chỉ fallback về meal_type khi suitable_meals trống.
    return isRecipeSuitableForMeal(recipe, mealType);
  }

  // =========================================================
  // HELPER: TÍNH CALO MỤC TIÊU
  // =========================================================

  private calculateTargetCalories(
    age: number,
    gender: string,
    height: number,
    weight: number,
    activityLevel: string,
    goalName = 'maintain',
  ): number {
    const sexOffset =
      gender === 'male' ? 5 : gender === 'female' ? -161 : -78;

    const bmr =
      10 * weight +
      6.25 * height -
      5 * age +
      sexOffset;

    const activityFactor: Record<string, number> = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
    };

    const activity = activityFactor[activityLevel];

    if (!activity) {
      throw new BadRequestException(
        'Activity level không hợp lệ',
      );
    }

    const goalFactor =
      goalName === 'lose_weight'
        ? 0.85
        : goalName === 'gain_muscle'
          ? 1.1
          : 1;

    return Math.max(
      Math.round(bmr * activity * goalFactor),
      1200,
    );
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

    const nutritionRows = await this.nutritionRepo.find({
      where: {
        recipe_id: In(recipeIds),
      },
    });

    const nutritionMap = new Map<number, NutritionInfo>();

    for (const nutrition of nutritionRows) {
      nutritionMap.set(
        nutrition.recipe_id,
        nutrition,
      );
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

      list.push({
        ingredient_id: row.ingredient_id,
        ingredient_name: row.ingredient?.ingredient_name ?? '',
        quantity: Number(row.quantity ?? 0),
        unit: row.unit,
        is_optional: row.is_optional,
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
      // Tính cả nguyên liệu optional: khớp với RecipeService.getRecipeCost
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

  // =========================================================
  // HELPER: CHỌN MÓN CHO CÁC BỮA, CÓ GIỚI HẠN NGÂN SÁCH
  // =========================================================

  // Chọn trước toàn bộ món trong bộ nhớ (chưa ghi DB) để nếu ngân sách
  // không đủ thì báo lỗi mà không để lại thực đơn dở dang.
  // Mỗi bữa chỉ được chọn món có chi phí <= ngân sách còn lại / số bữa còn lại,
  // nên tổng chi phí không bao giờ vượt total_budget.
  // Đồng thời tối ưu độ đa dạng: phạt nặng món lặp lại và món ăn gần kề để không bị trùng món.
  private planMeals(params: {
    dayCount: number;
    mealTargets: Record<string, number>;
    recipes: Recipe[];
    nutritionMap: Map<number, NutritionInfo>;
    costMap: Map<number, number>;
    usedRecipeCounts?: Map<number, number>;
    recentUsedDays?: Map<number, number>;
    dayOffset?: number;
    budget?: BudgetTracker;
  }): PlannedMeal[] {
    const {
      dayCount,
      mealTargets,
      recipes,
      nutritionMap,
      costMap,
      budget,
    } = params;

    const usedCounts = params.usedRecipeCounts ?? new Map<number, number>();
    const recentDays = params.recentUsedDays ?? new Map<number, number>();
    const dayOffset = params.dayOffset ?? 0;

    const planned: PlannedMeal[] = [];

    const mealEntries = Object.entries(mealTargets);
    const dayTarget = mealEntries.reduce((sum, [, c]) => sum + c, 0);

    for (let dayIndex = 0; dayIndex < dayCount; dayIndex++) {
      let dayCalories = 0;
      const globalDay = dayOffset + dayIndex;

      for (let mealIndex = 0; mealIndex < mealEntries.length; mealIndex++) {
        const [mealType, baseCalories] = mealEntries[mealIndex];
        // Bữa cuối ngày bù phần calo các bữa trước còn thiếu/thừa để tổng ngày bám mục tiêu.
        const calories =
          mealIndex === mealEntries.length - 1
            ? Math.max(dayTarget - dayCalories, baseCalories * 0.5)
            : baseCalories;
        let candidates = recipes.filter((recipe) =>
          this.isSuitableForMeal(recipe, mealType),
        );

        if (candidates.length === 0) {
          if (budget) budget.slotsLeft--;
          continue;
        }

        if (budget) {
          const maxCost = budget.remaining / Math.max(budget.slotsLeft, 1);

          candidates = candidates.filter((recipe) => {
            const cost = costMap.get(recipe.recipe_id);
            return cost !== undefined && cost <= maxCost;
          });

          if (candidates.length === 0) {
            throw new BadRequestException(
              'Ngân sách không đủ để tạo thực đơn: không có công thức nào phù hợp chi phí mỗi bữa. Hãy tăng ngân sách.',
            );
          }
        }

        // Đánh giá điểm độ phù hợp của món ăn:
        // 1. So khớp calo sau khi tính tỷ lệ khẩu phần khả dĩ (0.6x - 3.0x tuỳ calo gốc).
        // 2. Phạt nhẹ các món đã dùng trước đó và món vừa ăn gần đây để luân phiên món.
        // 3. Ưu tiên cao việc khớp calo để tổng ngày không bị hụt mục tiêu dinh dưỡng.
        const score = (recipe: Recipe) => {
          const recipeCalories = Number(nutritionMap.get(recipe.recipe_id)?.calories ?? 0);
          const maxPortion = recipeCalories < 200 ? 3.0 : recipeCalories < 350 ? 2.5 : 1.8;
          let testPortion = recipeCalories > 0 ? Math.min(maxPortion, Math.max(0.6, calories / recipeCalories)) : 1;
          testPortion = Math.round(testPortion * 10) / 10;
          const effectiveCalories = recipeCalories * testPortion;
          const calDiff = Math.abs(effectiveCalories - calories);

          const timesUsed = usedCounts.get(recipe.recipe_id) ?? 0;
          const lastUsedDay = recentDays.get(recipe.recipe_id);
          const daysSinceLastUsed = lastUsedDay !== undefined ? (globalDay - lastUsedDay) : 999;

          const recencyPenalty =
            daysSinceLastUsed === 0 ? 8000 :
            daysSinceLastUsed === 1 ? 3000 :
            daysSinceLastUsed === 2 ? 1000 : 0;

          const frequencyPenalty = timesUsed * 800;
          const jitter = ((recipe.recipe_id * 17 + globalDay * 31) % 100) * 0.1;

          // Nhân calDiff với 12 để thuật toán ưu tiên món nạp đủ calo sát mục tiêu bữa ăn
          return (calDiff * 12) + frequencyPenalty + recencyPenalty + jitter;
        };

        const pool = [...candidates].sort((x, y) => score(x) - score(y));

        const selected = pool[0];
        usedCounts.set(selected.recipe_id, (usedCounts.get(selected.recipe_id) ?? 0) + 1);
        recentDays.set(selected.recipe_id, globalDay);

        // Chỉnh khẩu phần (0.6x–3.0x) để calo bữa bám sát mục tiêu khi món calo thấp.
        const recipeCalories = Number(nutritionMap.get(selected.recipe_id)?.calories ?? 0);
        const maxPortion = recipeCalories < 200 ? 3.0 : recipeCalories < 350 ? 2.5 : 1.8;
        let portion =
          recipeCalories > 0
            ? Math.min(maxPortion, Math.max(0.6, calories / recipeCalories))
            : 1;
        const unitCost = costMap.get(selected.recipe_id) ?? 0;

        if (budget) {
          // Khẩu phần lớn hơn thì tốn hơn: không để vượt ngân sách mỗi bữa.
          const maxCost = budget.remaining / Math.max(budget.slotsLeft, 1);
          if (unitCost > 0) portion = Math.min(portion, maxCost / unitCost);
        }
        portion = Math.round(portion * 10) / 10;
        if (portion <= 0) portion = 0.5;

        dayCalories += recipeCalories * portion;

        if (budget) {
          budget.remaining -= unitCost * portion;
          budget.slotsLeft--;
        }

        planned.push({ dayIndex, mealType, calories, recipe: selected, portion });
      }
    }

    return planned;
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

    if (allRecipes.length > 0) {
      const recipeIds = [...new Set(allRecipes.map((r) => r.recipe_id))];
      const nutritions = await this.nutritionRepo.find({
        where: { recipe_id: In(recipeIds) },
      });
      const nutritionMap = new Map(nutritions.map((n) => [n.recipe_id, n]));
      for (const r of allRecipes as any[]) {
        r.nutrition = nutritionMap.get(r.recipe_id) || null;
      }
    }

    return mealPlan;
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

    const savedMealPlan =
      await this.mealPlanRepo.save(mealPlan);

    return this.findMyMealPlanDetail(
      user_id,
      savedMealPlan.meal_plan_id,
    );
  }

  // =========================================================
  // VALIDATE MEAL PLAN
  // =========================================================

  // Kiểm tra bữa user tự chọn từ món yêu thích: ngày hợp lệ, món đã duyệt và nằm trong danh sách yêu thích.
  async validateMealPlan(user_id: number, dto: ValidateMealPlanDto) {
    const errors: string[] = [];

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
    }

    return {
      valid: errors.length === 0,
      errors,
    };
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
        !this.isSuitableForMeal(recipe, dailyMeal.meal_type)
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
  // Dùng chung cho weekly và monthly: monthly chạy đúng công thức
  // calo/bữa của weekly (Mifflin-St Jeor × hệ số hoạt động × hệ số mục tiêu,
  // tối thiểu 1200 kcal, chia sáng 25% / trưa 35% / tối 40%).
  // =========================================================

  private async prepareUserGeneration(user_id: number) {
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

    const targetCalories = this.calculateTargetCalories(
      user.age!,
      user.gender!,
      user.height_cm!,
      user.weight_kg!,
      user.activity_level!,
      user.current_goal?.name ?? 'maintain',
    );

    const safeRecipes = await this.getSafeRecipes(user_id, user.diet_type);
    const nutritionMap = await this.getNutritionMap(safeRecipes);

    const mealTargets: Record<string, number> = {
      breakfast: Math.round(targetCalories * 0.25),
      lunch: Math.round(targetCalories * 0.35),
      dinner: Math.round(targetCalories * 0.4),
    };

    return { user, targetCalories, safeRecipes, nutritionMap, mealTargets };
  }

  // =========================================================
  // POST /meal-plans/generate/weekly
  // =========================================================

  async generateWeeklyMealPlan(
    user_id: number,
    dto: GenerateMealPlanDto = {},
  ) {
    const { user, targetCalories, safeRecipes, nutritionMap, mealTargets } =
      await this.prepareUserGeneration(user_id);

    const hasBudget = dto.total_budget !== undefined;

    const costMap = hasBudget
      ? await this.getRecipeCostMap(safeRecipes)
      : new Map<number, number>();

    // Chọn món trước khi ghi DB; ném lỗi nếu không đủ ngân sách.
    const plannedMeals = this.planMeals({
      dayCount: 7,
      mealTargets,
      recipes: safeRecipes,
      nutritionMap,
      costMap,
      usedRecipeCounts: new Map<number, number>(),
      recentUsedDays: new Map<number, number>(),
      dayOffset: 0,
      budget: hasBudget
        ? { remaining: dto.total_budget!, slotsLeft: 21 }
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
    mealPlan.goal_id = user.current_goal_id ?? null;
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

    // Ghi MealPlan + WeeklyPlan + DailyMeal + MealItem trong 1 transaction để
    // không để lại thực đơn dở dang (thiếu bữa) khi 1 phần ghi lỗi.
    const savedMealPlanId = await this.dataSource.transaction(async (manager) => {
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

    return this.findMyMealPlanDetail(
      user_id,
      savedMealPlanId,
    );
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
    for (const planned of plannedMeals) {
      const mealDate = new Date(firstDate);
      mealDate.setDate(firstDate.getDate() + planned.dayIndex);
      mealDate.setHours(0, 0, 0, 0);

      const dailyMeal = new DailyMeal();

      dailyMeal.weekly_plan_id = weeklyPlanId;
      dailyMeal.meal_date = mealDate;
      dailyMeal.meal_type = planned.mealType;
      dailyMeal.target_calories = planned.calories;

      const savedDailyMeal = await dailyMealRepo.save(dailyMeal);

      const mealItem = new MealItem();

      mealItem.daily_meal_id = savedDailyMeal.daily_meal_id;
      mealItem.recipe_id = planned.recipe.recipe_id;
      mealItem.is_ai_suggested = true;
      mealItem.added_by_user = false;
      mealItem.portion_multiplier = planned.portion;

      await mealItemRepo.save(mealItem);
    }
  }

  // =========================================================
  // SAVE MEAL PLAN FROM FRONTEND
  // =========================================================

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

          if (!this.isSuitableForMeal(recipe, meal.meal_type)) {
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
    const { user, targetCalories, safeRecipes, nutritionMap, mealTargets } =
      await this.prepareUserGeneration(user_id);

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

    const hasBudget = dto.total_budget !== undefined;
    const dayMs = 24 * 60 * 60 * 1000;

    // Chia tháng thành các tuần (Thứ 2 - Chủ nhật, tuần đầu/cuối có thể ngắn hơn)
    const weeks: { start: Date; end: Date; days: number }[] = [];
    let cursor = new Date(monthStart);

    while (cursor <= monthEnd) {
      const start = new Date(cursor);
      const end = new Date(cursor);

      end.setDate(start.getDate() + ((7 - start.getDay()) % 7));

      if (end > monthEnd) {
        end.setTime(monthEnd.getTime());
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
      ? { remaining: dto.total_budget!, slotsLeft: totalDays * 3 }
      : undefined;

    const usedRecipeCounts = new Map<number, number>();
    const recentUsedDays = new Map<number, number>();
    let globalDayOffset = 0;

    const plannedByWeek = weeks.map((week) => {
      const weekMeals = this.planMeals({
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
    mealPlan.goal_id = user.current_goal_id ?? null;
    mealPlan.bmi_snapshot = user.bmi ?? null;
    mealPlan.plan_type = PlanType.MONTHLY;
    mealPlan.start_date = monthStart;
    mealPlan.end_date = monthEnd;
    mealPlan.has_budget = hasBudget;

    if (hasBudget) {
      mealPlan.total_budget = dto.total_budget!;
    }

    mealPlan.target_calories_per_day = targetCalories;
    mealPlan.status = MealPlanStatus.ACTIVE;
    mealPlan.generated_by = 'AI';

    // Ghi MealPlan + WeeklyPlan + DailyMeal + MealItem trong 1 transaction để
    // không để lại thực đơn dở dang khi 1 tuần ghi lỗi.
    const savedMealPlanId = await this.dataSource.transaction(async (manager) => {
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

    return this.findMyMealPlanDetail(
      user_id,
      savedMealPlanId,
    );
  }

  // =========================================================
  // DỊ ỨNG CỦA HỒ SƠ NGƯỜI THÂN
  // =========================================================

  private async findOwnedProfile(user_id: number, profile_id: number) {
    const profile = await this.mealPlanProfileRepo.findOne({
      where: { profile_id, user_id },
    });

    if (!profile) {
      throw new NotFoundException(
        'Không tìm thấy hồ sơ người thân hoặc bạn không có quyền sử dụng hồ sơ này',
      );
    }

    return profile;
  }

  async getProfileAllergies(user_id: number, profile_id: number) {
    await this.findOwnedProfile(user_id, profile_id);

    const rows = await this.profileAllergyRepo.find({
      where: { profile_id },
      relations: ['ingredient'],
    });

    return rows.map((row) => ({
      ingredient_id: row.ingredient_id,
      ingredient_name: row.ingredient?.ingredient_name,
    }));
  }

  // Thay toàn bộ danh sách dị ứng của hồ sơ bằng danh sách mới.
  async setProfileAllergies(
    user_id: number,
    profile_id: number,
    ingredientIds: number[],
  ) {
    await this.findOwnedProfile(user_id, profile_id);

    const ids = [...new Set(ingredientIds)];

    if (ids.length > 0) {
      const validCount = await this.profileAllergyRepo.manager
        .getRepository(Ingredient)
        .count({ where: { ingredient_id: In(ids) } });

      if (validCount !== ids.length) {
        throw new BadRequestException('Có ingredient_id không tồn tại');
      }
    }

    await this.profileAllergyRepo.manager.transaction(async (manager) => {
      await manager.delete(ProfileAllergy, { profile_id });

      if (ids.length > 0) {
        await manager.insert(
          ProfileAllergy,
          ids.map((ingredient_id) => ({ profile_id, ingredient_id })),
        );
      }
    });

    return this.getProfileAllergies(user_id, profile_id);
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
        ...this.expandAllergenGroups(dto.allergen_groups),
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

    const mealTargets: Record<string, number> = {
      breakfast: Math.round(targetCalories * 0.25),
      lunch: Math.round(targetCalories * 0.35),
      dinner: Math.round(targetCalories * 0.4),
    };

    // Chọn món trước; ném lỗi nếu không đủ ngân sách.
    const plannedMeals = this.planMeals({
      dayCount: 7,
      mealTargets,
      recipes: safeRecipes,
      nutritionMap,
      costMap,
      usedRecipeCounts: new Map<number, number>(),
      recentUsedDays: new Map<number, number>(),
      dayOffset: 0,
      budget: hasBudget
        ? { remaining: dto.total_budget!, slotsLeft: 21 }
        : undefined,
    });

    const startDate = this.getWeekStart();

    // Nguyên liệu của các món được chọn: cần cho màn hình hiển thị/in.
    const ingredientsMap = await this.getIngredientsMap(
      plannedMeals.map((meal) => meal.recipe.recipe_id),
    );

    return this.buildPreviewMealPlan({
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
  }

  /**
   * Ánh xạ mã nhóm dị ứng (PEANUT, DAIRY...) sang danh sách ingredient_id.
   * Dùng chung bảng ALLERGEN_GROUPS với luồng dị ứng của tài khoản.
   */
  private expandAllergenGroups(codes?: string[]): number[] {
    if (!codes || codes.length === 0) {
      return [];
    }

    const ids: number[] = [];

    for (const code of codes) {
      const group = ALLERGEN_GROUPS.find(
        (item) => item.code === code,
      );

      if (group) {
        ids.push(...group.ingredient_ids);
      }
    }

    return ids;
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

    return this.calculateTargetCalories(
      user.age!,
      user.gender!,
      user.height_cm!,
      user.weight_kg!,
      user.activity_level!,
      user.current_goal?.name ?? 'maintain',
    );
  }

  /** Ngày bắt đầu tuần (Thứ 2) của tuần hiện tại. */
  private getWeekStart(): Date {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

    const monday = new Date(today);
    monday.setDate(today.getDate() + diffToMonday);
    monday.setHours(0, 0, 0, 0);

    return monday;
  }

  /**
   * Gom kết quả thực đơn thành cấu trúc trả về cho frontend.
   * Cùng hình dạng với thực đơn đã lưu (weekly_plans -> daily_meals ->
   * meal_items -> recipe) để frontend dùng chung được component hiển thị/in.
   */
  private buildPreviewMealPlan(params: {
    profileName: string;
    dietType: string;
    targetCalories: number;
    allergyIngredientIds: number[];
    startDate: Date;
    plannedMeals: PlannedMeal[];
    nutritionMap: Map<number, NutritionInfo>;
    ingredientsMap: Map<number, RecipeIngredientRow[]>;
    hasBudget: boolean;
    totalBudget?: number;
  }) {
    const {
      profileName,
      dietType,
      targetCalories,
      allergyIngredientIds,
      startDate,
      plannedMeals,
      nutritionMap,
      ingredientsMap,
      hasBudget,
      totalBudget,
    } = params;

    const days = new Map<number, PlannedMeal[]>();

    for (const meal of plannedMeals) {
      const list = days.get(meal.dayIndex) ?? [];
      list.push(meal);
      days.set(meal.dayIndex, list);
    }

    // Cùng cấu trúc với thực đơn đã lưu: MỖI bữa là 1 daily_meals, mỗi
    // daily_meals có 1 meal_items và bên trong là đối tượng recipe đầy đủ.
    // Nhờ vậy frontend dùng chung được đúng hàm đọc thực đơn đã lưu.
    const dailyMeals: any[] = [];

    for (const [dayIndex, meals] of [...days.entries()].sort(
      (a, b) => a[0] - b[0],
    )) {
      const mealDate = new Date(startDate);
      mealDate.setDate(startDate.getDate() + dayIndex);
      mealDate.setHours(0, 0, 0, 0);

      for (const meal of meals) {
        dailyMeals.push({
          meal_date: mealDate,
          meal_type: meal.mealType,
          target_calories: meal.calories,
          meal_items: [
            {
              recipe_id: meal.recipe.recipe_id,
              is_ai_suggested: true,
              added_by_user: false,
              portion_multiplier: meal.portion,
              recipe: {
                ...meal.recipe,
                nutrition: nutritionMap.get(meal.recipe.recipe_id) ?? null,
                ingredients:
                  ingredientsMap.get(meal.recipe.recipe_id) ?? [],
              },
            },
          ],
        });
      }
    }

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    endDate.setHours(0, 0, 0, 0);

    return {
      // Thực đơn này KHÔNG được lưu -> is_saved = false để frontend biết
      // không có mục trong danh sách thực đơn của tôi.
      is_saved: false,
      profile_name: profileName,
      diet_type: dietType,
      target_calories_per_day: targetCalories,
      allergy_ingredient_ids: allergyIngredientIds,
      has_budget: hasBudget,
      total_budget: hasBudget ? (totalBudget ?? null) : null,
      start_date: startDate,
      end_date: endDate,
      weekly_plans: [
        {
          week_number: 1,
          start_date: startDate,
          end_date: endDate,
          week_calorie_target: targetCalories * 7,
          daily_meals: dailyMeals,
        },
      ],
    };
  }
}
