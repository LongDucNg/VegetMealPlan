/* eslint-disable @typescript-eslint/no-explicit-any */
import { MealPlanService } from './meal-plan.service';

// ============================================================
// 3 TRƯỜNG HỢP: giảm cân / tăng cân / duy trì (không gửi goal).
//
// Mỗi trường hợp kiểm tra CẢ:
//   - kcal mục tiêu đúng hướng (thiếu hụt / thặng dư / bằng TDEE)
//   - thực đơn thực tế lọc theo diet_type, dị ứng, dữ liệu dinh dưỡng
//   - áp dụng cho cả API tuần (weekly) và tháng (monthly)
// ============================================================

// Recipe 1,2: vegan. Recipe 3: ovo (chỉ hợp với ovo/ovo_lacto).
// Recipe 4: vegan nhưng KHÔNG có dòng dinh dưỡng.
const RECIPES = [
  { recipe_id: 1, title: 'Vegan A', status: 'approved', diet_type: 'vegan', suitable_meals: 'breakfast,lunch,dinner,snack', servings: 2 },
  { recipe_id: 2, title: 'Vegan B', status: 'approved', diet_type: 'vegan', suitable_meals: 'breakfast,lunch,dinner,snack', servings: 2 },
  { recipe_id: 3, title: 'Ovo A', status: 'approved', diet_type: 'ovo', suitable_meals: 'breakfast,lunch,dinner,snack', servings: 2 },
  { recipe_id: 4, title: 'Vegan KhongNutrition', status: 'approved', diet_type: 'vegan', suitable_meals: 'breakfast,lunch,dinner,snack', servings: 2 },
];

const NUTRITION = [
  { recipe_id: 1, calories: 400, protein: 15, carbs: 50, fat: 12 },
  { recipe_id: 2, calories: 500, protein: 20, carbs: 60, fat: 15 },
  { recipe_id: 3, calories: 450, protein: 18, carbs: 55, fat: 13 },
  // recipe 4 không có nutrition_infos
];

const RECIPE_INGREDIENTS = [
  { recipe_id: 1, ingredient_id: 10 },
  { recipe_id: 2, ingredient_id: 20 },
  { recipe_id: 3, ingredient_id: 30 },
  { recipe_id: 4, ingredient_id: 40 },
];

const BASE_USER = {
  user_id: 1,
  age: 30,
  gender: 'male',
  height_cm: 175,
  weight_kg: 80,
  activity_level: 'moderate',
  diet_type: 'vegan',
  bmi: 26.12,
  current_goal_id: 1,
  current_goal: { goal_id: 1, name: 'maintain' },
  target_weight_kg: null,
  target_date: null,
};

/** BMR = 10*80 + 6,25*175 − 5*30 + 5 = 1748,75 ; TDEE = 1748,75 * 1,55 = 2710,56 */
const TDEE = Math.round(1748.75 * 1.55);

/** BMR cho user 60 kg: 10*60 + 6,25*175 − 5*30 + 5 = 1608,75 ; TDEE = 2493,56 */
const TDEE_60KG = Math.round(1608.75 * 1.55);

/** Master data `health_goals` (id 1/2/3 theo thứ tự lose_weight/gain_muscle/maintain). */
const HEALTH_GOALS = [
  { goal_id: 1, name: 'lose_weight', description: 'Giảm cân' },
  { goal_id: 2, name: 'gain_muscle', description: 'Tăng cơ' },
  { goal_id: 3, name: 'maintain', description: 'Duy trì cân nặng' },
];

function buildService(opts: {
  user?: any;
  allergyIngredientIds?: number[];
} = {}) {
  const user = { ...BASE_USER, ...(opts.user ?? {}) };
  const allergyIds = opts.allergyIngredientIds ?? [];

  const savedPlans: any[] = [];
  const savedItems: any[] = [];
  const savedDailyMeals: any[] = [];
  let dailyMealId = 0;
  let transactionCalls = 0;

  const mealPlanRepo: any = {
    findOne: async ({ where }: any) => {
      if (where.meal_plan_id != null) {
        return savedPlans.find((p) => p.meal_plan_id === where.meal_plan_id) ?? null;
      }
      return savedPlans[0] ?? null;
    },
    find: async () => savedPlans,
    save: async (row: any) => {
      const s = { meal_plan_id: 99, weekly_plans: [], ...row };
      savedPlans.push(s);
      return s;
    },
  };

  const recipeIngredientRepo: any = {
    find: async () => RECIPE_INGREDIENTS,
  };

  const allergyRepo: any = {
    find: async () => allergyIds.map((id) => ({ user_id: 1, ingredient_id: id })),
  };

  const dataSource: any = {
    transaction: async (cb: any) => {
      transactionCalls++;
      return cb({
        getRepository: (entity: any) => {
          const name = entity?.name ?? '';
          if (name === 'DailyMeal') {
            return {
              save: async (row: any) => {
                dailyMealId++;
                const saved = { daily_meal_id: dailyMealId, ...row };
                savedDailyMeals.push(saved);
                return saved;
              },
            };
          }
          if (name === 'MealItem') {
            return {
              save: async (row: any) => {
                savedItems.push(row);
                return row;
              },
            };
          }
          if (name === 'WeeklyPlan') {
            return { save: async (row: any) => ({ weekly_plan_id: savedDailyMeals.length + 1, ...row }) };
          }
          return {
            save: async (row: any) => {
              const s = { meal_plan_id: 99, weekly_plans: [], ...row };
              savedPlans.push(s);
              return s;
            },
          };
        },
      });
    },
  };

  // userRepo: tôn trọng `relations` — nếu service KHÔNG nạp 'current_goal' thì
  // `user.current_goal` phải là null (mô phỏng đúng hành vi TypeORM). Nhờ vậy
  // test thật sự kiểm chứng việc nạp quan hệ, chứ không "đúng cho có".
  const userRepo: any = {
    findOne: async ({ relations }: any = {}) => {
      if (!relations?.includes?.('current_goal')) {
        const { current_goal, ...rest } = user;
        return { ...rest, current_goal: null };
      }
      return user;
    },
  };

  const service = new MealPlanService(
    mealPlanRepo,
    { save: async (e: any) => e } as any,
    { save: async (e: any) => e } as any,
    { save: async (e: any) => e } as any,
    userRepo,
    allergyRepo,
    { find: async () => RECIPES, findOne: async () => RECIPES[0] } as any,
    recipeIngredientRepo,
    { find: async () => NUTRITION } as any,
    { find: async () => [] } as any,
    { find: async () => null } as any,
    { find: async () => null } as any,
    { isPremium: async () => true } as any,
    { findByIds: async (ids: number[]) => ids.map((id) => ({ ingredient_id: id, ingredient_name: `NL${id}` })) } as any,
    dataSource,
    // Repo health_goals: 3 mục tiêu chuẩn (id 1/2/3 theo thứ tự master data).
    { find: async () => HEALTH_GOALS } as any,
  );

  return {
    service,
    user,
    savedPlans,
    savedItems,
    savedDailyMeals,
    transactionCalls: () => transactionCalls,
    /** recipe_id các món thực sự được đưa vào thực đơn. */
    chosenRecipeIds: () => [...new Set(savedItems.map((i) => i.recipe_id))].sort((a, b) => a - b),
  };
}

describe('MealPlanService - 3 trường hợp mục tiêu cân nặng', () => {
  // ==========================================================
  // TRƯỜNG HỢP 1: GIẢM CÂN
  // ==========================================================
  describe('1. Giảm cân', () => {
    it('weekly: kcal mục tiêu thấp hơn TDEE (có thâm hụt)', async () => {
      const { service } = buildService();

      const r: any = await service.generateWeeklyMealPlan(1, {
        current_weight_kg: 80,
        target_weight_kg: 75,
        duration_days: 84,
        direction: 'lose_weight',
      } as any);

      expect(r.target_calories_per_day).toBeLessThan(TDEE);
      // Chênh lệch không vượt 20% TDEE (ngưỡng deficit an toàn).
      expect(TDEE - r.target_calories_per_day).toBeLessThanOrEqual(TDEE * 0.2);
      expect(r.target_calories_per_day).toBeGreaterThanOrEqual(1200);
    });

    it('weekly: giảm càng lâu thì kcal càng cao hơn (thiếu hụt càng nhỏ)', async () => {
      const { service } = buildService();

      const nhanh: any = await service.generateWeeklyMealPlan(1, {
        current_weight_kg: 80, target_weight_kg: 75, duration_days: 84, direction: 'lose_weight',
      } as any);
      const { service: s2 } = buildService();
      const cham: any = await s2.generateWeeklyMealPlan(1, {
        current_weight_kg: 80, target_weight_kg: 75, duration_days: 168, direction: 'lose_weight',
      } as any);

      // 12 tuần giảm 5 kg -> thiếu hụt nhiều hơn 24 tuần giảm 5 kg.
      expect(cham.target_calories_per_day).toBeGreaterThan(nhanh.target_calories_per_day);
    });

    it('weekly: thực đơn lọc diet_type, dị ứng và có dinh dưỡng', async () => {
      const { service, chosenRecipeIds } = buildService({ allergyIngredientIds: [20] });

      await service.generateWeeklyMealPlan(1, {
        current_weight_kg: 80, target_weight_kg: 75, duration_days: 84, direction: 'lose_weight',
      } as any);

      const chosen = chosenRecipeIds();
      // Recipe 3 (ovo) bị loại: user vegan.
      expect(chosen).not.toContain(3);
      // Recipe 2 bị loại: chứa NL20 mà user dị ứng.
      expect(chosen).not.toContain(2);
      // Recipe 4 bị loại: không có dữ liệu dinh dưỡng.
      expect(chosen).not.toContain(4);
      // Recipe 1 hợp lệ -> được chọn.
      expect(chosen).toContain(1);
    });

    it('weekly: tổng calo thực tế của ngày bám sát kcal mục tiêu', async () => {
      const { service, savedItems, savedDailyMeals } = buildService();

      const r: any = await service.generateWeeklyMealPlan(1, {
        current_weight_kg: 80, target_weight_kg: 75, duration_days: 84, direction: 'lose_weight',
      } as any);

      const calById = new Map(NUTRITION.map((n) => [n.recipe_id, n.calories]));
      const byDay = new Map<number, number>();
      for (const item of savedItems) {
        const day = savedDailyMeals.find((d) => d.daily_meal_id === item.daily_meal_id);
        byDay.set(
          day.meal_date.getTime(),
          (byDay.get(day.meal_date.getTime()) ?? 0) +
            calById.get(item.recipe_id)! * item.portion_multiplier,
        );
      }

      const totals = [...byDay.values()];
      expect(totals.length).toBe(7);
      for (const t of totals) {
        // Mỗi ngày không hụt quá 100 kcal và không vượt quá 150 kcal so với mục tiêu.
        expect(t).toBeGreaterThan(r.target_calories_per_day - 100);
        expect(t).toBeLessThan(r.target_calories_per_day + 150);
      }
    });

    it('monthly: cùng logic với weekly', async () => {
      const { service, chosenRecipeIds } = buildService({ allergyIngredientIds: [20] });

      const r: any = await service.generateMonthlyMealPlan(1, {
        current_weight_kg: 80, target_weight_kg: 75, duration_days: 84, direction: 'lose_weight',
      } as any);

      expect(r.target_calories_per_day).toBeLessThan(TDEE);
      const chosen = chosenRecipeIds();
      expect(chosen).not.toContain(3);
      expect(chosen).not.toContain(2);
      expect(chosen).not.toContain(4);
      expect(chosen).toContain(1);
    });
  });

  // ==========================================================
  // TRƯỜNG HỢP 2: TĂNG CÂN
  // ==========================================================
  describe('2. Tăng cân', () => {
    it('weekly: kcal mục tiêu cao hơn TDEE (có thặng dư)', async () => {
      const { service } = buildService({ user: { weight_kg: 60, bmi: 19.6 } });

      const r: any = await service.generateWeeklyMealPlan(1, {
        current_weight_kg: 60, target_weight_kg: 63, duration_days: 84, direction: 'gain_muscle',
      } as any);

      expect(r.target_calories_per_day).toBeGreaterThan(TDEE_60KG);
      // Thặng dư không vượt 15% TDEE.
      expect(r.target_calories_per_day - TDEE_60KG).toBeLessThanOrEqual(TDEE_60KG * 0.15);
    });

    it('weekly: tăng càng lâu thì kcal càng gần TDEE (thặng dư càng nhỏ)', async () => {
      const { service } = buildService({ user: { weight_kg: 60, bmi: 19.6 } });
      const { service: s2 } = buildService({ user: { weight_kg: 60, bmi: 19.6 } });

      const nhanh: any = await service.generateWeeklyMealPlan(1, {
        current_weight_kg: 60, target_weight_kg: 63, duration_days: 84, direction: 'gain_muscle',
      } as any);
      const cham: any = await s2.generateWeeklyMealPlan(1, {
        current_weight_kg: 60, target_weight_kg: 63, duration_days: 168, direction: 'gain_muscle',
      } as any);

      expect(cham.target_calories_per_day).toBeLessThan(nhanh.target_calories_per_day);
      expect(cham.target_calories_per_day).toBeGreaterThan(TDEE_60KG);
    });

    it('weekly: thực đơn lọc diet_type, dị ứng và có dinh dưỡng', async () => {
      const { service, chosenRecipeIds } = buildService({
        user: { weight_kg: 60, bmi: 19.6 },
        allergyIngredientIds: [20],
      });

      await service.generateWeeklyMealPlan(1, {
        current_weight_kg: 60, target_weight_kg: 63, duration_days: 84, direction: 'gain_muscle',
      } as any);

      const chosen = chosenRecipeIds();
      expect(chosen).not.toContain(3);
      expect(chosen).not.toContain(2);
      expect(chosen).not.toContain(4);
      expect(chosen).toContain(1);
    });

    it('monthly: cùng logic với weekly', async () => {
      const { service, chosenRecipeIds } = buildService({
        user: { weight_kg: 60, bmi: 19.6 },
        allergyIngredientIds: [20],
      });

      const r: any = await service.generateMonthlyMealPlan(1, {
        current_weight_kg: 60, target_weight_kg: 63, duration_days: 84, direction: 'gain_muscle',
      } as any);

      expect(r.target_calories_per_day).toBeGreaterThan(TDEE_60KG);
      const chosen = chosenRecipeIds();
      expect(chosen).not.toContain(3);
      expect(chosen).not.toContain(2);
      expect(chosen).not.toContain(4);
      expect(chosen).toContain(1);
    });
  });

  // ==========================================================
  // TRƯỜNG HỢP 3: DUY TRÌ / KHÔNG GỬI GOAL
  // ==========================================================
  describe('3. Duy trì cân nặng / không gửi goal', () => {
    it('weekly: không gửi goal, hồ sơ maintain -> kcal = TDEE (không thâm hụt/thặng dư)', async () => {
      const { service } = buildService();

      const r: any = await service.generateWeeklyMealPlan(1, {} as any);

      expect(r.target_calories_per_day).toBe(TDEE);
    });

    it('weekly: client gửi direction=maintain -> kcal = TDEE', async () => {
      const { service } = buildService();

      const r: any = await service.generateWeeklyMealPlan(1, { direction: 'maintain' } as any);

      expect(r.target_calories_per_day).toBe(TDEE);
    });

    it('weekly: hồ sơ có target_weight_kg CŨ không khớp mục tiêu maintain -> vẫn kcal = TDEE', async () => {
      // target_weight_kg = 75 nhưng mục tiêu sức khoẻ là 'maintain'.
      // Không được tự áp thâm hụt chỉ vì có cân nặng mục tiêu tồn đọng.
      const { service } = buildService({
        user: { target_weight_kg: 75, target_date: '2027-06-01' },
      });

      const r: any = await service.generateWeeklyMealPlan(1, {} as any);

      expect(r.target_calories_per_day).toBe(TDEE);
    });

    it('weekly: hồ sơ target_weight_kg BẰNG cân nặng hiện tại -> không lỗi, kcal = TDEE', async () => {
      const { service } = buildService({
        user: { target_weight_kg: 80, target_date: '2027-06-01' },
      });

      const r: any = await service.generateWeeklyMealPlan(1, {} as any);

      expect(r.target_calories_per_day).toBe(TDEE);
    });

    it('weekly: hồ sơ KHÔNG có mục tiêu sức khoẻ nào -> mặc định duy trì (kcal = TDEE)', async () => {
      const { service } = buildService({
        user: { current_goal_id: null, current_goal: null },
      });

      const r: any = await service.generateWeeklyMealPlan(1, {} as any);

      expect(r.target_calories_per_day).toBe(TDEE);
    });

    it('weekly: thực đơn duy trì vẫn lọc diet_type, dị ứng và dinh dưỡng', async () => {
      const { service, chosenRecipeIds } = buildService({ allergyIngredientIds: [20] });

      await service.generateWeeklyMealPlan(1, {} as any);

      const chosen = chosenRecipeIds();
      expect(chosen).not.toContain(3);
      expect(chosen).not.toContain(2);
      expect(chosen).not.toContain(4);
      expect(chosen).toContain(1);
    });

    it('monthly: không gửi goal -> kcal = TDEE và vẫn lọc món', async () => {
      const { service, chosenRecipeIds } = buildService({ allergyIngredientIds: [20] });

      const r: any = await service.generateMonthlyMealPlan(1, {} as any);

      expect(r.target_calories_per_day).toBe(TDEE);
      const chosen = chosenRecipeIds();
      expect(chosen).not.toContain(3);
      expect(chosen).not.toContain(2);
      expect(chosen).not.toContain(4);
      expect(chosen).toContain(1);
    });

    it('weekly: client gửi direction=maintain nhưng lệch > 2 kg -> báo lỗi, không ghi DB', async () => {
      const { service, transactionCalls } = buildService();

      await expect(
        service.generateWeeklyMealPlan(1, {
          current_weight_kg: 80,
          target_weight_kg: 70,
          duration_days: 84,
          direction: 'maintain',
        } as any),
      ).rejects.toThrow(/duy trì/i);

      expect(transactionCalls()).toBe(0);
    });
  });

  // ==========================================================
  // health_goals RỖNG + ưu tiên `direction` của client
  // ==========================================================
  describe('4. health_goals rỗng & ưu tiên direction của client', () => {
    it('weekly: health_goals rỗng + client gửi direction=lose_weight -> KHÔNG mặc định maintain', async () => {
      const { service } = buildService({
        user: { current_goal_id: null, current_goal: null },
      });

      const r: any = await service.generateWeeklyMealPlan(1, {
        direction: 'lose_weight',
      } as any);

      // Phải có thâm hụt, không được bằng TDEE.
      expect(r.target_calories_per_day).toBeLessThan(TDEE);
    });

    it('weekly: health_goals rỗng + client gửi direction=gain_muscle -> KHÔNG mặc định maintain', async () => {
      const { service } = buildService({
        user: { current_goal_id: null, current_goal: null },
      });

      const r: any = await service.generateWeeklyMealPlan(1, {
        direction: 'gain_muscle',
      } as any);

      // Phải có thặng dư, không được bằng TDEE.
      expect(r.target_calories_per_day).toBeGreaterThan(TDEE);
    });

    it('weekly: health_goals rỗng + KHÔNG gửi gì -> mặc định duy trì (kcal = TDEE)', async () => {
      const { service } = buildService({
        user: { current_goal_id: null, current_goal: null },
      });

      const r: any = await service.generateWeeklyMealPlan(1, {} as any);

      expect(r.target_calories_per_day).toBe(TDEE);
    });

    it('weekly: client gửi direction=maintain -> kcal = TDEE (không thâm hụt/thặng dư)', async () => {
      const { service } = buildService();

      const r: any = await service.generateWeeklyMealPlan(1, {
        direction: 'maintain',
      } as any);

      expect(r.target_calories_per_day).toBe(TDEE);
    });

    it('weekly: client gửi direction=gain_muscle KHÁC hồ sơ -> thắng hồ sơ (không bị ghi đè)', async () => {
      // Hồ sơ đang đặt mục tiêu "lose_weight" + cân nặng mục tiêu cũ 75 kg.
      const { service } = buildService({
        user: {
          current_goal: { goal_id: 1, name: 'lose_weight' },
          target_weight_kg: 75,
          target_date: '2027-06-01',
        },
      });

      const r: any = await service.generateWeeklyMealPlan(1, {
        direction: 'gain_muscle',
      } as any);

      // Phải là thặng dư (tăng cân), không phải thâm hụt (giảm cân theo hồ sơ).
      expect(r.target_calories_per_day).toBeGreaterThan(TDEE);
    });

    it('weekly: client gửi direction=lose_weight KHÁC hồ sơ -> thắng hồ sơ', async () => {
      const { service } = buildService({
        user: {
          current_goal: { goal_id: 2, name: 'gain_muscle' },
          target_weight_kg: 85,
          target_date: '2027-06-01',
        },
      });

      const r: any = await service.generateWeeklyMealPlan(1, {
        direction: 'lose_weight',
      } as any);

      // Phải là thâm hụt, không phải thặng dư.
      expect(r.target_calories_per_day).toBeLessThan(TDEE);
    });

    it('weekly: hồ sơ có target_weight_kg CŨ khác hướng -> KHÔNG ghi đè lựa chọn client', async () => {
      const { service } = buildService({
        user: {
          current_goal: { goal_id: 1, name: 'lose_weight' },
          // Cân nặng mục tiêu cũ từ lần chọn "giảm cân" trước.
          target_weight_kg: 60,
          target_date: '2027-06-01',
        },
      });

      const r: any = await service.generateWeeklyMealPlan(1, {
        direction: 'gain_muscle',
      } as any);

      expect(r.target_calories_per_day).toBeGreaterThan(TDEE);
    });

    it('weekly: client gửi direction nhưng thiếu cân nặng mục tiêu -> vẫn sinh được thực đơn', async () => {
      const { service, transactionCalls } = buildService({
        user: { current_goal_id: null, current_goal: null },
      });

      await service.generateWeeklyMealPlan(1, { direction: 'lose_weight' } as any);

      expect(transactionCalls()).toBe(1);
    });

    it('weekly: client gửi cân nặng nhưng thiếu duration_days -> báo lỗi validation, không ghi DB', async () => {
      const { service, transactionCalls } = buildService();

      await expect(
        service.generateWeeklyMealPlan(1, {
          current_weight_kg: 80,
          target_weight_kg: 75,
          direction: 'lose_weight',
        } as any),
      ).rejects.toThrow();

      expect(transactionCalls()).toBe(0);
    });
  });

  // ==========================================================
  // goal_id lưu kèm thực đơn phải KHỚP hướng đã áp dụng.
  // ==========================================================
  describe('5. goal_id của thực đơn khớp hướng đã áp dụng', () => {
    it('weekly: client gửi direction=gain_muscle, hồ sơ là lose_weight -> goal_id = gain_muscle', async () => {
      const { service, savedPlans } = buildService({
        user: {
          current_goal_id: 1,
          current_goal: { goal_id: 1, name: 'lose_weight' },
        },
      });

      await service.generateWeeklyMealPlan(1, { direction: 'gain_muscle' } as any);

      // goal_id = 2 (gain_muscle), KHÔNG phải 1 (lose_weight) của hồ sơ.
      expect(savedPlans[0].goal_id).toBe(2);
    });

    it('weekly: client gửi direction=lose_weight, hồ sơ là gain_muscle -> goal_id = lose_weight', async () => {
      const { service, savedPlans } = buildService({
        user: {
          current_goal_id: 2,
          current_goal: { goal_id: 2, name: 'gain_muscle' },
        },
      });

      await service.generateWeeklyMealPlan(1, { direction: 'lose_weight' } as any);

      expect(savedPlans[0].goal_id).toBe(1);
    });

    it('weekly: client gửi direction=maintain, hồ sơ là lose_weight -> goal_id = maintain', async () => {
      const { service, savedPlans } = buildService({
        user: {
          current_goal_id: 1,
          current_goal: { goal_id: 1, name: 'lose_weight' },
        },
      });

      await service.generateWeeklyMealPlan(1, { direction: 'maintain' } as any);

      expect(savedPlans[0].goal_id).toBe(3);
    });

    it('weekly: không gửi direction, hồ sơ là gain_muscle -> giữ goal_id của hồ sơ', async () => {
      const { service, savedPlans } = buildService({
        user: {
          current_goal_id: 2,
          current_goal: { goal_id: 2, name: 'gain_muscle' },
        },
      });

      await service.generateWeeklyMealPlan(1, {} as any);

      expect(savedPlans[0].goal_id).toBe(2);
    });

    it('monthly: client gửi direction=gain_muscle, hồ sơ là lose_weight -> goal_id = gain_muscle', async () => {
      const { service, savedPlans } = buildService({
        user: {
          current_goal_id: 1,
          current_goal: { goal_id: 1, name: 'lose_weight' },
        },
      });

      await service.generateMonthlyMealPlan(1, { direction: 'gain_muscle' } as any);

      expect(savedPlans[0].goal_id).toBe(2);
    });
  });

  // ==========================================================
  // POST /meal-plans/validate phải ĐỌC ĐƯỢC mục tiêu trong hồ sơ.
  // ==========================================================
  describe('6. validate đọc được mục tiêu sức khoẻ trong hồ sơ', () => {
    const validateDto = (extra: any = {}): any => ({
      start_date: '2026-01-01',
      end_date: '2026-01-07',
      days: [
        { date: '2026-01-01', meals: [{ recipe_id: 1, servings: 2 }] },
      ],
      ...extra,
    });

    it('hồ sơ có target_weight_kg khớp hướng lose_weight -> KHÔNG báo lỗi mục tiêu', async () => {
      const { service } = buildService({
        user: {
          current_goal_id: 1,
          current_goal: { goal_id: 1, name: 'lose_weight' },
          target_weight_kg: 75,
          target_date: '2027-06-01',
        },
      });

      const r: any = await service.validateMealPlan(1, validateDto({
        current_weight_kg: 80,
        target_weight_kg: 75,
        duration_days: 84,
      }));

      // Lỗi mục tiêu cân nặng (nếu có) sẽ chứa từ khoá "duy trì"/"giảm cân".
      const goalErrors = r.errors.filter((e: string) =>
        /duy trì|giảm cân|tăng cân|mục tiêu cân nặng/i.test(e),
      );
      expect(goalErrors).toEqual([]);
    });

    it('mục tiêu trong hồ sơ ĐƯỢC dùng khi validate (không bị bỏ qua)', async () => {
      // Hồ sơ đang đặt mục tiêu "giảm cân" (current_goal.name).
      // Client gửi cân nặng hiện tại = mục tiêu (80 = 80) nên không thể suy ra
      // hướng từ chênh lệch -> hướng phải lấy từ mục tiêu trong hồ sơ.
      // Nếu hồ sơ bị bỏ qua (thiếu quan hệ current_goal) thì rơi về 'maintain'
      // và KHÔNG có lỗi nào.
      const { service } = buildService({
        user: {
          current_goal_id: 1,
          current_goal: { goal_id: 1, name: 'lose_weight' },
          target_weight_kg: null,
          target_date: null,
        },
      });

      const r: any = await service.validateMealPlan(1, validateDto({
        current_weight_kg: 80,
        target_weight_kg: 80,
        duration_days: 84,
      }));

      const goalErrors = r.errors.filter((e: string) => /giảm cân/i.test(e));
      expect(goalErrors.length).toBeGreaterThan(0);
    });
  });

  // ==========================================================
  // Cảnh báo (KHÔNG chặn) phải đến được client.
  // ==========================================================
  describe('7. Response trả kèm kết quả đánh giá mục tiêu + cảnh báo', () => {
    it('weekly: mục tiêu quá nhanh -> vẫn sinh thực đơn KÈM cảnh báo', async () => {
      const { service } = buildService();

      const r: any = await service.generateWeeklyMealPlan(1, {
        current_weight_kg: 80,
        target_weight_kg: 70,
        duration_days: 5,
        direction: 'lose_weight',
      } as any);

      // Thực đơn vẫn được sinh (không chặn).
      expect(r.target_calories_per_day).toBeGreaterThanOrEqual(1200);

      // Cảnh báo tốc độ quá nhanh phải tới client.
      expect(r.goal_assessment).toBeDefined();
      const codes = r.goal_assessment.warnings.map((w: any) => w.code);
      expect(codes).toContain('WEIGHT_PACE_TOO_FAST');
    });

    it('weekly: goal_assessment có BMI/BMR/TDEE và note là ước tính', async () => {
      const { service } = buildService();

      const r: any = await service.generateWeeklyMealPlan(1, {
        current_weight_kg: 80,
        target_weight_kg: 75,
        duration_days: 84,
        direction: 'lose_weight',
      } as any);

      expect(r.goal_assessment.bmi).toBeCloseTo(26.12, 1);
      expect(r.goal_assessment.bmr).toBeGreaterThan(0);
      expect(r.goal_assessment.tdee).toBe(TDEE);
      expect(r.goal_assessment.target_calories).toBe(r.target_calories_per_day);
      // Không coi kết quả tính toán là bảo đảm an toàn y tế.
      expect(r.goal_assessment.note).toMatch(/ước tính/i);
    });

    it('monthly: trả kèm goal_assessment', async () => {
      const { service } = buildService();

      const r: any = await service.generateMonthlyMealPlan(1, {
        direction: 'lose_weight',
      } as any);

      expect(r.goal_assessment).toBeDefined();
      expect(r.goal_assessment.direction).toBe('lose_weight');
    });

    it('weekly: không gửi mục tiêu -> assessment mặc định duy trì, kcal = TDEE', async () => {
      const { service } = buildService({
        user: { current_goal_id: null, current_goal: null },
      });

      const r: any = await service.generateWeeklyMealPlan(1, {} as any);

      // Không có mục tiêu nào -> hệ thống chốt 'maintain' theo hồ sơ và tính
      // kcal = TDEE (không thâm hụt, không thặng dư).
      expect(r.goal_assessment).toBeDefined();
      expect(r.goal_assessment.direction).toBe('maintain');
      expect(r.goal_assessment.target_calories).toBe(TDEE);
      expect(r.target_calories_per_day).toBe(TDEE);
    });
  });
});
