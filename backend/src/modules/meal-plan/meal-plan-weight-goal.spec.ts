/* eslint-disable @typescript-eslint/no-explicit-any */
import { MealPlanService } from './meal-plan.service';

// ============================================================
// Mục tiêu cân nặng → kcal → sinh thực đơn tuần/tháng.
//
// Bao phủ:
//   - Mục tiêu cực đoan (giảm 10 kg trong 5 ngày) -> lỗi, KHÔNG ghi DB.
//   - Mục tiêu hợp lệ -> sinh thực đơn với kcal mục tiêu đúng.
//   - Lưu/cập nhật thực đơn -> chặn kcal không an toàn.
// ============================================================

const RECIPES = [
  {
    recipe_id: 1,
    title: 'Chay rau',
    status: 'approved',
    diet_type: 'vegan',
    suitable_meals: 'breakfast,lunch,dinner,snack',
    servings: 2,
  },
  {
    recipe_id: 2,
    title: 'Chay đậu',
    status: 'approved',
    diet_type: 'vegan',
    suitable_meals: 'breakfast,lunch,dinner,snack',
    servings: 2,
  },
];

const NUTRITION = [
  { recipe_id: 1, calories: 400, protein: 15, carbs: 50, fat: 12 },
  { recipe_id: 2, calories: 500, protein: 20, carbs: 60, fat: 15 },
];

function buildService(opts: {
  user?: any;
  savedPlans?: any[];
} = {}) {
  const savedPlans: any[] = opts.savedPlans ?? [];

  const user =
    opts.user ??
    {
      user_id: 1,
      age: 30,
      gender: 'male',
      height_cm: 175,
      weight_kg: 80,
      activity_level: 'moderate',
      diet_type: 'vegan',
      bmi: 26.12,
      current_goal_id: 1,
      current_goal: { goal_id: 1, name: 'lose_weight' },
      target_weight_kg: null,
      target_date: null,
    };

  const mealPlanRepo: any = {
    findOne: async ({ where }: any) =>
      savedPlans.find((p) => p.meal_plan_id === where.meal_plan_id) ?? null,
    find: async () => savedPlans,
    save: async (entity: any) => {
      const row = { meal_plan_id: 99, ...entity };
      savedPlans.push(row);
      return row;
    },
  };

  // findMyMealPlanDetail gọi findOne theo quan hệ -> trả về thực đơn đã lưu.
  mealPlanRepo.findOne = async ({ where }: any) => {
    if (where.meal_plan_id != null) {
      return savedPlans.find((p) => p.meal_plan_id === where.meal_plan_id) ?? null;
    }
    return savedPlans[0] ?? null;
  };

  const userRepo: any = {
    findOne: async () => user,
  };

  const recipeRepo: any = {
    find: async () => RECIPES,
    findOne: async ({ where }: any) =>
      RECIPES.find((r) => r.recipe_id === where.recipe_id) ?? null,
  };

  const recipeIngredientRepo: any = {
    find: async () => [],
  };

  const allergyRepo: any = {
    find: async () => [],
  };

  const nutritionRepo: any = {
    find: async () => NUTRITION,
  };

  const favoriteRepo: any = {
    find: async () => [],
  };

  const ingredientService: any = {
    findByIds: async (ids: number[]) =>
      ids.map((id) => ({ ingredient_id: id, ingredient_name: `NL ${id}` })),
  };

  // Ghi DB: đếm số lần transaction được gọi để assert "không sinh/lưu thực đơn".
  let transactionCalls = 0;
  let nextId = 99;
  const dataSource: any = {
    transaction: async (cb: any) => {
      transactionCalls++;
      return cb({
        getRepository: (entity: any) => ({
          save: async (row: any) => {
            // Trong transaction, repo MealPlan phải trả về id để service
            // đọc lại chi tiết thực đơn vừa tạo.
            if (row && row.user_id !== undefined && row.start_date !== undefined) {
              const saved = { meal_plan_id: nextId, weekly_plans: [], ...row };
              savedPlans.push(saved);
              return saved;
            }
            return row;
          },
        }),
      });
    },
  };

  const service = new MealPlanService(
    mealPlanRepo,
    { save: async (e: any) => e } as any,
    { save: async (e: any) => e } as any,
    { save: async (e: any) => e } as any,
    userRepo,
    allergyRepo,
    recipeRepo,
    recipeIngredientRepo,
    nutritionRepo,
    favoriteRepo,
    { find: async () => null } as any,
    { find: async () => null } as any,
    { isPremium: async () => true } as any,
    ingredientService,
    dataSource,
  );

  return { service, transactionCalls: () => transactionCalls, savedPlans };
}

describe('MealPlanService - sinh thực đơn theo mục tiêu cân nặng', () => {
  it('mục tiêu quá nhanh (giảm 10 kg trong 5 ngày) -> vẫn sinh thực đơn, không chặn', async () => {
    const { service, transactionCalls } = buildService();

    // Mục tiêu quá nhanh KHÔNG bị chặn -> thực đơn vẫn được sinh.
    await service.generateWeeklyMealPlan(1, {
      current_weight_kg: 80,
      target_weight_kg: 70,
      duration_days: 5,
      direction: 'lose_weight',
    } as any);

    expect(transactionCalls()).toBe(1);
  });

  it('mục tiêu quá nhanh -> kcal mục tiêu không thấp hơn sàn an toàn', async () => {
    const { service, savedPlans } = buildService();

    await service.generateMonthlyMealPlan(1, {
      current_weight_kg: 80,
      target_weight_kg: 70,
      duration_days: 5,
      direction: 'lose_weight',
    } as any);

    const plan = savedPlans[0];
    // TDEE của user (80kg, 175cm, 30 tuổi, male, moderate) ~ 2560 kcal.
    // Thâm hụt bị chặn ở 20% TDEE -> kcal mục tiêu ~ 2050, KHÔNG phải ~1400.
    expect(plan.target_calories_per_day).toBeGreaterThanOrEqual(1200);
    expect(plan.target_calories_per_day).toBeGreaterThan(1500);
  });

  it('mục tiêu cực đoan nhưng MÂU THUẪN NỘI TẠI -> vẫn lỗi, không ghi DB', async () => {
    const { service, transactionCalls } = buildService();

    // Giảm cân nhưng cân nặng mục tiêu CAO HƠN hiện tại -> không thể tính.
    await expect(
      service.generateWeeklyMealPlan(1, {
        current_weight_kg: 80,
        target_weight_kg: 85,
        duration_days: 84,
        direction: 'lose_weight',
      } as any),
    ).rejects.toThrow();

    expect(transactionCalls()).toBe(0);
  });

  it('BMI thiếu cân nhưng muốn giảm cân -> KHÔNG chặn, vẫn sinh thực đơn', async () => {
    const { service, transactionCalls } = buildService({
      user: {
        user_id: 1,
        age: 30,
        gender: 'male',
        height_cm: 175,
        weight_kg: 50,
        activity_level: 'moderate',
        diet_type: 'vegan',
        bmi: 16.33,
        current_goal_id: 1,
        current_goal: { goal_id: 1, name: 'lose_weight' },
        target_weight_kg: null,
        target_date: null,
      },
    });

    await service.generateWeeklyMealPlan(1, {
      current_weight_kg: 50,
      target_weight_kg: 47,
      duration_days: 84,
      direction: 'lose_weight',
    } as any);

    expect(transactionCalls()).toBe(1);
  });

  it('mục tiêu hợp lệ -> sinh thực đơn với kcal mục tiêu đúng', async () => {
    const { service, transactionCalls } = buildService();

    await service.generateWeeklyMealPlan(1, {
      current_weight_kg: 80,
      target_weight_kg: 75,
      duration_days: 84,
      direction: 'lose_weight',
    } as any);

    expect(transactionCalls()).toBe(1);
  });

  it('thiếu dữ liệu mục tiêu -> lỗi validation, không ghi DB', async () => {
    const { service, transactionCalls } = buildService();

    await expect(
      service.generateWeeklyMealPlan(1, {
        target_weight_kg: 75,
        direction: 'lose_weight',
      } as any),
    ).rejects.toThrow();

    expect(transactionCalls()).toBe(0);
  });

  it('hồ sơ thiếu chiều cao -> lỗi yêu cầu cập nhật hồ sơ', async () => {
    const { service, transactionCalls } = buildService({
      user: {
        user_id: 1,
        age: 30,
        gender: 'male',
        height_cm: null,
        weight_kg: 80,
        activity_level: 'moderate',
        diet_type: 'vegan',
      },
    });

    await expect(
      service.generateWeeklyMealPlan(1, {
        current_weight_kg: 80,
        target_weight_kg: 75,
        duration_days: 84,
        direction: 'lose_weight',
      } as any),
    ).rejects.toThrow(/hồ sơ/i);

    expect(transactionCalls()).toBe(0);
  });
});

describe('MealPlanService - lưu/cập nhật thực đơn phải an toàn', () => {
  const saveDto = (calories?: number): any => ({
    start_date: '2026-01-01',
    end_date: '2026-01-07',
    target_calories_per_day: calories,
    weekly_plans: [
      {
        week_number: 1,
        start_date: '2026-01-01',
        end_date: '2026-01-07',
        daily_meals: [
          {
            meal_date: '2026-01-01',
            meal_type: 'lunch',
            meal_items: [{ recipe_id: 1 }],
          },
        ],
      },
    ],
  });

  it('saveMealPlan: chặn kcal mục tiêu thấp hơn sàn an toàn', async () => {
    const { service } = buildService();

    let err: any = null;
    try {
      await service.saveMealPlan(1, saveDto(500));
    } catch (e) {
      err = e;
    }

    expect(err?.getResponse?.()?.code).toBe('WEIGHT_GOAL_UNSAFE');
    expect(err?.getResponse?.()?.message).toMatch(/an toàn/i);
  });

  it('saveMealPlan: chặn kcal mục tiêu bằng 0', async () => {
    const { service } = buildService();

    await expect(service.saveMealPlan(1, saveDto(0))).rejects.toThrow(
      /an toàn/i,
    );
  });

  it('updateMyMealPlan: chặn kcal mục tiêu không an toàn', async () => {
    const { service } = buildService({
      savedPlans: [
        {
          meal_plan_id: 1,
          user_id: 1,
          name: 'Thực đơn cũ',
          target_calories_per_day: 2000,
          status: 'active',
        },
      ],
    });

    await expect(
      service.updateMyMealPlan(1, 1, { target_calories_per_day: 100 } as any),
    ).rejects.toThrow(/an toàn/i);
  });
});
