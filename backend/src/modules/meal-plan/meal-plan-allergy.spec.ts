/* eslint-disable @typescript-eslint/no-explicit-any */
import { MealPlanService } from './meal-plan.service';

// ============================================================
// Meal Plan - kiểm tra dị ứng.
//
// Yêu cầu: món trong thực đơn KHÔNG được chứa nguyên liệu user bị dị ứng.
// Áp dụng cho:
//   - POST /users/me/meal-plans  (saveMealPlan)
//   - POST /meal-plans/validate  (validateMealPlan)
// ============================================================

const RECIPES = [
  {
    recipe_id: 1,
    title: 'Món an toàn',
    status: 'approved',
    diet_type: 'vegan',
    suitable_meals: 'lunch,dinner',
    servings: 2,
  },
  {
    recipe_id: 2,
    title: 'Món có đậu',
    status: 'approved',
    diet_type: 'vegan',
    suitable_meals: 'lunch,dinner',
    servings: 2,
  },
  {
    recipe_id: 3,
    title: 'Món ovo-lacto',
    status: 'approved',
    diet_type: 'ovo_lacto',
    suitable_meals: 'lunch,dinner',
    servings: 2,
  },
];

function buildService(opts: {
  allergyIngredientIds?: number[];
  recipeIngredients?: Array<{ recipe_id: number; ingredient_id: number }>;
  userDiet?: string;
}) {
  const allergyIngredientIds = opts.allergyIngredientIds ?? [];
  const recipeIngredients =
    opts.recipeIngredients ?? [
      { recipe_id: 1, ingredient_id: 10 },
      { recipe_id: 2, ingredient_id: 20 },
      { recipe_id: 3, ingredient_id: 20 },
    ];

  const userRepo: any = {
    findOne: async () => ({
      user_id: 1,
      diet_type: opts.userDiet ?? 'vegan',
    }),
  };

  const allergyRepo: any = {
    find: async () =>
      allergyIngredientIds.map((id) => ({
        user_id: 1,
        ingredient_id: id,
      })),
  };

  const recipeRepo: any = {
    find: async ({ where }: any) => {
      const ids: number[] = where.recipe_id?._value ?? [];
      return RECIPES.filter((r) => ids.includes(r.recipe_id));
    },
    findOne: async ({ where }: any) =>
      RECIPES.find((r) => r.recipe_id === where.recipe_id) ?? null,
  };

  const recipeIngredientRepo: any = {
    find: async ({ where }: any) => {
      const ids: number[] = where.recipe_id?._value ?? [];
      return recipeIngredients.filter((r) => ids.includes(r.recipe_id));
    },
  };

  const favoriteRepo: any = {
    find: async () => [
      { user_id: 1, recipe_id: 1 },
      { user_id: 1, recipe_id: 2 },
      { user_id: 1, recipe_id: 3 },
    ],
  };

  const ingredientService: any = {
    findByIds: async (ids: number[]) =>
      ids.map((id) => ({
        ingredient_id: id,
        ingredient_name: `Nguyên liệu ${id}`,
      })),
  };

  const service = new MealPlanService(
    { find: async () => null } as any, // mealPlanRepo
    { find: async () => null } as any, // weeklyPlanRepo
    { find: async () => null } as any, // dailyMealRepo
    { find: async () => null } as any, // mealItemRepo
    userRepo,
    allergyRepo,
    recipeRepo,
    recipeIngredientRepo,
    { find: async () => null } as any, // nutritionRepo
    favoriteRepo,
    { find: async () => null } as any, // mealPlanProfileRepo
    { find: async () => null } as any, // profileAllergyRepo
    { find: async () => [] } as any, // subscriptionService
    ingredientService,
    { transaction: async () => undefined } as any, // dataSource
  );

  return service;
}

const saveDto = (recipeId: number): any => ({
  start_date: '2026-01-01',
  end_date: '2026-01-07',
  weekly_plans: [
    {
      week_number: 1,
      start_date: '2026-01-01',
      end_date: '2026-01-07',
      daily_meals: [
        {
          meal_date: '2026-01-01',
          meal_type: 'lunch',
          meal_items: [{ recipe_id: recipeId }],
        },
      ],
    },
  ],
});

const validateDto = (recipeId: number): any => ({
  start_date: '2026-01-01',
  end_date: '2026-01-07',
  days: [
    {
      date: '2026-01-01',
      meals: [{ recipe_id: recipeId, servings: 2 }],
    },
  ],
});

describe('MealPlanService - kiểm tra dị ứng', () => {
  it('saveMealPlan: chặn món chứa nguyên liệu user bị dị ứng', async () => {
    const service = buildService({ allergyIngredientIds: [20] });

    await expect(
      service.saveMealPlan(1, saveDto(2)),
    ).rejects.toThrow(/dị ứng/);
  });

  it('saveMealPlan: cho phép món không chứa nguyên liệu bị dị ứng', async () => {
    const service = buildService({ allergyIngredientIds: [20] });

    // Recipe 1 dùng nguyên liệu 10 -> không dị ứng.
    // Service sẽ đi tiếp tới bước ghi DB (mock transaction trả undefined)
    // nên chỉ assert là KHÔNG ném lỗi dị ứng.
    let err: any = null;
    try {
      await service.saveMealPlan(1, saveDto(1));
    } catch (e) {
      err = e;
    }

    expect(err?.message ?? '').not.toMatch(/dị ứng/);
  });

  it('saveMealPlan: user không có dị ứng -> không chặn', async () => {
    const service = buildService({ allergyIngredientIds: [] });

    let err: any = null;
    try {
      await service.saveMealPlan(1, saveDto(2));
    } catch (e) {
      err = e;
    }

    expect(err?.message ?? '').not.toMatch(/dị ứng/);
  });

  it('validateMealPlan: báo lỗi khi món chứa nguyên liệu bị dị ứng', async () => {
    const service = buildService({ allergyIngredientIds: [20] });

    const result: any = await service.validateMealPlan(1, validateDto(2));

    expect(result.valid).toBe(false);
    expect(result.errors.some((e: string) => e.includes('dị ứng'))).toBe(
      true,
    );
  });

  it('validateMealPlan: hợp lệ khi món không chứa nguyên liệu bị dị ứng', async () => {
    const service = buildService({ allergyIngredientIds: [20] });

    const result: any = await service.validateMealPlan(1, validateDto(1));

    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it('validateMealPlan: báo cả lỗi dị ứng và lỗi chế độ ăn', async () => {
    const service = buildService({
      allergyIngredientIds: [20],
      userDiet: 'vegan',
    });

    // Recipe 3 là ovo_lacto -> không hợp với user vegan, đồng thời chứa
    // nguyên liệu 20 mà user bị dị ứng.
    const result: any = await service.validateMealPlan(1, validateDto(3));

    expect(result.valid).toBe(false);
    expect(result.errors.some((e: string) => e.includes('dị ứng'))).toBe(
      true,
    );
    expect(
      result.errors.some((e: string) => e.includes('chế độ ăn')),
    ).toBe(true);
  });
});
