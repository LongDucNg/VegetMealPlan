import { ErrorCode } from '../../common/constants/error-codes.enum';
import { isRecipeDietCompatible } from '../../common/utils/diet.util';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  Optional,
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
  ACTIVITY_FACTOR,
  assessWeightGoal,
  assertValidGoalInput,
  CALORIE_FLOOR,
  ClientWeightGoal,
  computeEnergy,
  GoalAssessment,
  healthGoalCalorieTarget,
  MEAL_SPLIT,
  resolveGoalPlan,
  resolveWeightGoalAssessment,
  WeightGoalDirection,
} from '../users/weight-goal.util';

/**
 * Tỉ lệ calo theo bữa dùng khi SOẠN THỰC ĐƠN (snack = phần còn lại).
 * Lấy từ MEAL_SPLIT chung (users/weight-goal.util), cùng tỉ lệ với GET /users/me/nutrition-summary.
 */
const PLAN_MEAL_SPLIT = { breakfast: MEAL_SPLIT.breakfast, lunch: MEAL_SPLIT.lunch, dinner: MEAL_SPLIT.dinner };

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
    @Optional()
    @InjectRepository(HealthGoal)
    private readonly goalRepo?: Repository<HealthGoal>,
    @Optional()
    private readonly groqAiProvider?: GroqAiProvider,
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

  /**
   * kcal mục tiêu theo mục tiêu sức khoẻ (khi không có mục tiêu cân nặng).
   * Dùng hàm chung computeEnergy + healthGoalCalorieTarget (users/weight-goal.util) để trang hồ sơ
   * và thực đơn luôn ra cùng một con số.
   */
  private calculateTargetCalories(
    age: number,
    gender: string,
    height: number,
    weight: number,
    activityLevel: string,
    goalName = 'maintain',
  ): number {
    if (!ACTIVITY_FACTOR[activityLevel]) {
      throw new BadRequestException(
        'Activity level không hợp lệ',
      );
    }

    const { tdee } = computeEnergy({
      age,
      gender,
      height_cm: height,
      weight_kg: weight,
      activity_level: activityLevel,
    });

    return healthGoalCalorieTarget(tdee, goalName).target_calories;
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
      const dayStartIndex = planned.length;

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
        // 1. So khớp calo sau khi tính tỷ lệ khẩu phần khả dĩ (0.4x - 3.0x tuỳ calo gốc).
        // 2. Phạt nhẹ các món đã dùng trước đó và món vừa ăn gần đây để luân phiên món.
        // 3. Ưu tiên cao việc khớp calo để tổng ngày không bị hụt mục tiêu dinh dưỡng.
        const score = (recipe: Recipe) => {
          const recipeCalories = Number(nutritionMap.get(recipe.recipe_id)?.calories ?? 0);
          // Giới hạn khẩu phần thử nghiệm trong khoảng ẩm thực an toàn (0.85x - 1.25x), không tăng gấp đôi/gấp ba nguyên liệu
          const maxPortion = 1.25;
          let testPortion = recipeCalories > 0 ? Math.min(maxPortion, Math.max(0.85, calories / recipeCalories)) : 1;
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

          // Ưu tiên món tự nhiên hợp lý với bữa ăn, phạt nhẹ calDiff (nhân 4 thay vì nhân 12)
          return (calDiff * 4) + frequencyPenalty + recencyPenalty + jitter;
        };

        const pool = [...candidates].sort((x, y) => score(x) - score(y));

        const selected = pool[0];
        usedCounts.set(selected.recipe_id, (usedCounts.get(selected.recipe_id) ?? 0) + 1);
        recentDays.set(selected.recipe_id, globalDay);

        // Khẩu phần thực tế được giữ trong khoảng ẩm thực hợp lý (0.85x - 1.25x), tránh tăng nguyên liệu vô tội vạ
        const recipeCalories = Number(nutritionMap.get(selected.recipe_id)?.calories ?? 0);
        const maxPortion = 1.25;
        let portion =
          recipeCalories > 0
            ? Math.min(maxPortion, Math.max(0.85, Math.round((calories / recipeCalories) * 10) / 10))
            : 1.0;
        const unitCost = costMap.get(selected.recipe_id) ?? 0;

        if (budget) {
          const maxCost = budget.remaining / Math.max(budget.slotsLeft, 1);
          if (unitCost > 0) portion = Math.min(portion, maxCost / unitCost);
        }
        portion = Math.round(portion * 10) / 10;
        if (portion <= 0) portion = 0.85;

        dayCalories += recipeCalories * portion;

        if (budget) {
          budget.remaining -= unitCost * portion;
          budget.slotsLeft--;
        }

        planned.push({ dayIndex, mealType, calories, recipe: selected, portion });
      }

      // Giữ khẩu phần thực tế, không nhân ép mù quáng: không ép tăng nguyên liệu làm hỏng món ăn
      const dayMeals = planned.slice(dayStartIndex);
    }

    return planned;
  }

  /**
   * Thẩm định và tối ưu tính khả thi khi nấu nướng (Cookability) bằng AI Groq.
   * Đảm bảo không tăng nguyên liệu/gia vị vô tội vạ chỉ để ép đủ số kcal.
   */
  private async reviewAndOptimizeWithGroq(
    plannedMeals: PlannedMeal[],
    targetCaloriesPerDay: number,
    planType: 'weekly' | 'monthly',
  ): Promise<{ chef_advice: string; is_cookable: boolean }> {
    const defaultAdvice =
      'Bếp trưởng AI (Groq): Khẩu phần món ăn đã được kiểm tra và giữ trong ngưỡng chuẩn 0.85x - 1.25x để đảm bảo định lượng nguyên liệu, gia vị hài hòa và nấu được thực tế. Nếu cần thêm năng lượng, bạn có thể ăn thêm 1 chén cơm trắng hoặc hoa quả tươi thay vì tăng gia vị món chính.';

    if (!this.groqAiProvider) {
      return { chef_advice: defaultAdvice, is_cookable: true };
    }

    try {
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
        .map((m) => '- ' + m.title + ': khẩu phần ' + m.portion + 'x (~' + m.calories + ' kcal)')
        .join('\n');

      const systemInstruction =
        'Bạn là Bếp trưởng & Chuyên gia Dinh dưỡng Chay VeggieHub. ' +
        'Kiểm tra thực đơn: Tuyệt đối không tăng nguyên liệu hay khẩu phần vô tội vạ (như x2, x3 gia vị, dầu ăn) chỉ để ép đủ calo, ' +
        'vì sẽ làm hỏng công thức và không thể nấu được! Khẩu phần mỗi món phải giữ ở mức ăn thực tế (0.85x - 1.25x). ' +
        'Trả về định dạng JSON thuần túy: { "is_cookable": true, "chef_advice": "Lời khuyên ngắn gọn (2 câu) về cách nấu cân bằng và bổ sung calo tự nhiên nếu cần." }';

      const userMessage =
        'Calo mục tiêu mỗi ngày: ~' + targetCaloriesPerDay + ' kcal.\nDanh sách món ăn dự kiến:\n' + mealSummary +
        '\nHãy kiểm tra tính khả thi khi nấu và đưa ra nhận xét.';

      const responseText = await this.groqAiProvider.generateResponse({
        systemInstruction,
        userMessage,
      });

      const jsonMatch = responseText.match(/\{[\s\S]*?\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        if (parsed.chef_advice) {
          return {
            chef_advice: parsed.chef_advice,
            is_cookable: parsed.is_cookable !== false,
          };
        }
      }

      return { chef_advice: defaultAdvice, is_cookable: true };
    } catch {
      return { chef_advice: defaultAdvice, is_cookable: true };
    }
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
      this.assertSafeCalories(dto.target_calories_per_day);
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

    const assessment = await this.resolveGoalAssessment(user, goalDto);
    const targetCalories = assessment
      ? assessment.target_calories
      : this.calculateTargetCalories(
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
        this.toWeightGoalDirection(assessment?.direction ?? user.current_goal?.name),
        user.current_goal_id ?? null,
      ),
    };
  }

  /**
   * Chuẩn hoá tên mục tiêu về `WeightGoalDirection`.
   * Tên lạ / rỗng -> 'maintain' (không chặn, chỉ là mặc định an toàn).
   */
  private toWeightGoalDirection(name: string | null | undefined): WeightGoalDirection {
    if (name === 'lose_weight' || name === 'gain_muscle' || name === 'maintain') {
      return name;
    }
    return 'maintain';
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

  /**
   * Xác định kcal mục tiêu từ mục tiêu cân nặng (nếu có) và kiểm tra an toàn.
   * Trả về null nếu không có mục tiêu cân nặng nào để áp dụng.
   * Ném BadRequestException nếu mục tiêu cân nặng không hợp lệ.
   */
  private async resolveGoalAssessment(
    user: User,
    goalDto?: ClientWeightGoal,
  ): Promise<GoalAssessment | null> {
    // Logic chốt mục tiêu cân nặng nằm ở users/weight-goal.util (resolveWeightGoalAssessment),
    // dùng chung với GET /users/me/nutrition-summary để hồ sơ và thực đơn ra cùng kcal.
    return resolveWeightGoalAssessment(
      {
        age: user.age!,
        gender: user.gender!,
        height_cm: user.height_cm!,
        weight_kg: user.weight_kg!,
        activity_level: user.activity_level!,
        target_weight_kg: user.target_weight_kg ?? null,
        target_date: user.target_date ?? null,
        current_goal_name: user.current_goal?.name ?? null,
      },
      goalDto,
    );
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
        ? { remaining: dto.total_budget!, slotsLeft: 7 * Object.keys(mealTargets).length }
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

    const groqReview = await this.reviewAndOptimizeWithGroq(plannedMeals, targetCalories, 'weekly');
    mealPlan.ai_cookability_notes = groqReview.chef_advice;

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

    const detail = await this.findMyMealPlanDetail(
      user_id,
      savedMealPlanId,
    );

    // Trả kèm kết quả đánh giá mục tiêu (BMI/BMR/TDEE/kcal + cảnh báo) để
    // client biết thực đơn dựa trên ước tính nào. Cảnh báo KHÔNG chặn —
    // thực đơn vẫn được sinh, chỉ kèm thông tin để người dùng tự quyết định.
    return { ...detail, goal_assessment: assessment };
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

  /**
   * Chặn kcal mục tiêu không an toàn khi lưu/cập nhật thực đơn.
   * Không cho phép kcal âm, bằng 0 hoặc thấp hơn sàn an toàn đã định.
   */
  private assertSafeCalories(calories: number): void {
    if (!Number.isFinite(calories) || calories < CALORIE_FLOOR) {
      throw new BadRequestException({
        code: ErrorCode.WEIGHT_GOAL_UNSAFE,
        message:
          `Calo mục tiêu ${calories} không an toàn. ` +
          `Mức tối thiểu là ${CALORIE_FLOOR} kcal/ngày.`,
        suggestion:
          'Hãy dùng kcal mục tiêu được hệ thống tính từ hồ sơ, ' +
          'hoặc hỏi ý kiến chuyên gia dinh dưỡng.',
      });
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

    // Món trong thực đơn không được chứa nguyên liệu user bị dị ứng.
    // Trước đây luồng này chỉ kiểm tra "đã duyệt" + bữa ăn + chế độ ăn,
    // nên user có thể lưu thực đơn chứa món có nguyên liệu gây dị ứng.
    await this.assertNoAllergyConflict(user_id, recipeIds, recipeById);

    // Calo mục tiêu phải an toàn (không âm, không 0, không thấp hơn sàn).
    if (dto.target_calories_per_day !== undefined) {
      this.assertSafeCalories(dto.target_calories_per_day);
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
      ? { remaining: dto.total_budget!, slotsLeft: totalDays * Object.keys(mealTargets).length }
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
    mealPlan.goal_id = goalId ?? user.current_goal_id ?? null;
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

    const allPlanned = plannedByWeek.flat();
    const groqMonthlyReview = await this.reviewAndOptimizeWithGroq(allPlanned, targetCalories, 'monthly');
    mealPlan.ai_cookability_notes = groqMonthlyReview.chef_advice;

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

    const detail = await this.findMyMealPlanDetail(
      user_id,
      savedMealPlanId,
    );

    // Trả kèm kết quả đánh giá mục tiêu (BMI/BMR/TDEE/kcal + cảnh báo).
    return { ...detail, goal_assessment: assessment };
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
    const plannedMeals = this.planMeals({
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
      ai_cookability_notes: 'Bếp trưởng AI (Groq): Khẩu phần món ăn đã được kiểm tra và giữ trong ngưỡng chuẩn để đảm bảo định lượng nguyên liệu, gia vị hài hòa và nấu được thực tế.',
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
