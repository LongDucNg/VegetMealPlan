/* eslint-disable @typescript-eslint/no-explicit-any */
import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { MealPlanService } from './meal-plan.service';

/**
 * BE2 - POST /meal-plans/generate/for-someone
 * Sinh thực đơn cho người thân từ thông tin trong request, KHÔNG lưu DB.
 *
 * Repository giả lập - KHÔNG ghi vào database thật.
 */
const VEGAN_RECIPE = {
  recipe_id: 1,
  title: 'Bún Chay',
  diet_type: 'vegan',
  status: 'approved',
  meal_type: 'lunch',
  suitable_meals: 'lunch,dinner',
  servings: 2,
  prep_time: 10,
  cook_time: 15,
  estimated_cost: 30000,
};

const LACTO_RECIPE = {
  recipe_id: 2,
  title: 'Chè Sữa',
  diet_type: 'lacto',
  status: 'approved',
  meal_type: 'breakfast',
  suitable_meals: 'breakfast',
  servings: 2,
  prep_time: 5,
  cook_time: 10,
  estimated_cost: 20000,
};

describe('MealPlanService.generateMealPlanForSomeone - không lưu DB', () => {
  const buildService = (opts: {
    isPremium?: boolean;
    recipes?: any[];
    owner?: any;
    ingredientIds?: number[];
  } = {}) => {
    const savedCalls: string[] = [];

    const mealPlanRepo: any = {
      findOne: async () => null,
      save: async (e: any) => {
        savedCalls.push('mealPlanRepo.save');
        return { ...e, meal_plan_id: 999 };
      },
    };
    const weeklyPlanRepo: any = {
      find: async () => [],
      save: async (e: any) => {
        savedCalls.push('weeklyPlanRepo.save');
        return { ...e, weekly_plan_id: 888 };
      },
    };
    const dailyMealRepo: any = {
      find: async () => [],
      save: async (e: any) => {
        savedCalls.push('dailyMealRepo.save');
        return { ...e, daily_meal_id: 777 };
      },
    };
    const mealItemRepo: any = {
      find: async () => [],
      save: async (e: any) => {
        savedCalls.push('mealItemRepo.save');
        return { ...e, meal_item_id: 666 };
      },
    };
    const userRepo: any = {
      findOne: async () =>
        opts.owner === undefined
          ? {
              user_id: 5,
              age: 30,
              gender: 'male',
              height_cm: 175,
              weight_kg: 70,
              activity_level: 'moderate',
              current_goal: { name: 'maintain' },
            }
          : opts.owner,
    };
    const allergyRepo: any = {
      find: async () => [],
    };
    const recipeRepo: any = {
      find: async () => opts.recipes ?? [VEGAN_RECIPE, LACTO_RECIPE],
    };
    const recipeIngredientRepo: any = {
      find: async ({ where }: any) => {
        // getSafeRecipes gọi với where: { recipe_id: In([...]) }
        if (where.ingredient_id !== undefined) return [];

        const allRows = [
          {
            recipe_id: 1,
            ingredient_id: 10,
            quantity: 200,
            unit: 'g',
            is_optional: false,
            ingredient: { ingredient_id: 10, ingredient_name: 'Bún tươi' },
          },
          {
            recipe_id: 2,
            ingredient_id: 179,
            quantity: 100,
            unit: 'g',
            is_optional: false,
            ingredient: { ingredient_id: 179, ingredient_name: 'Sữa tươi' },
          },
        ];

        const wanted = where.recipe_id?._value ?? where.recipe_id;

        if (Array.isArray(wanted)) {
          return allRows.filter((r) => wanted.includes(r.recipe_id));
        }

        return allRows.filter((r) => r.recipe_id === wanted);
      },
    };
    const nutritionRepo: any = {
      find: async () => [
        { recipe_id: 1, calories: 300, protein: 10, carbs: 50, fat: 5, fiber: 3 },
        { recipe_id: 2, calories: 200, protein: 6, carbs: 30, fat: 4, fiber: 1 },
      ],
    };
    const favoriteRepo: any = { find: async () => [] };
    const mealPlanProfileRepo: any = { findOne: async () => null };
    const profileAllergyRepo: any = { find: async () => [] };

    const ingredientService: any = {
      // Trả về đúng số nguyên liệu tồn tại trong danh sách yêu cầu.
      findByIds: async (ids: number[]) =>
        ids
          .filter((id) => id !== 424242)
          .map((id) => ({ ingredient_id: id, ingredient_name: `NL ${id}` })),
    };

    const subscriptionService: any = {
      isPremium: async () => opts.isPremium ?? true,
    };

    const dataSource: any = {
      transaction: async (cb: any) => {
        savedCalls.push('dataSource.transaction');
        return cb({});
      },
    };

    const svc = new MealPlanService(
      mealPlanRepo as any,
      weeklyPlanRepo as any,
      dailyMealRepo as any,
      mealItemRepo as any,
      userRepo as any,
      allergyRepo as any,
      recipeRepo as any,
      recipeIngredientRepo as any,
      nutritionRepo as any,
      favoriteRepo as any,
      mealPlanProfileRepo as any,
      profileAllergyRepo as any,
      subscriptionService as any,
      ingredientService as any,
      dataSource as any,
    );

    return { svc, savedCalls };
  };

  it('trả về thực đơn và KHÔNG ghi gì vào database', async () => {
    const { svc, savedCalls } = buildService();

    const result = await svc.generateMealPlanForSomeone(5, {
      profile_name: 'Mẹ',
      diet_type: 'ovo_lacto' as any,
      target_calories: 1800,
      allergy_ids: [],
    } as any);

    expect(savedCalls).toEqual([]);
    expect(result.is_saved).toBe(false);
    expect(result.profile_name).toBe('Mẹ');
    expect(result.diet_type).toBe('ovo_lacto');
    expect(result.target_calories_per_day).toBe(1800);
  });

  it('cấu trúc response giống thực đơn đã lưu (weekly_plans -> daily_meals -> meal_items -> recipe)', async () => {
    const { svc } = buildService();

    const result = await svc.generateMealPlanForSomeone(5, {
      diet_type: 'ovo_lacto' as any,
      target_calories: 2000,
    } as any);

    expect(result.weekly_plans).toHaveLength(1);
    const dailyMeals = result.weekly_plans[0].daily_meals;

    // 7 ngày x 3 bữa = 21 bữa
    expect(dailyMeals).toHaveLength(21);
    expect(dailyMeals[0].meal_items).toHaveLength(1);
    expect(dailyMeals[0].meal_items[0].recipe.title).toBeTruthy();
    expect(dailyMeals[0].meal_items[0].recipe.ingredients).toBeDefined();
  });

  it('chế độ ăn vegan -> không chọn món lacto', async () => {
    const { svc } = buildService();

    const result = await svc.generateMealPlanForSomeone(5, {
      diet_type: 'vegan' as any,
      target_calories: 2000,
    } as any);

    const titles = new Set(
      result.weekly_plans[0].daily_meals.map(
        (dm: any) => dm.meal_items[0].recipe.title,
      ),
    );

    expect(titles.has('Chè Sữa')).toBe(false);
    expect(titles.has('Bún Chay')).toBe(true);
  });

  it('dị ứng được gửi lên -> món chứa nguyên liệu đó bị loại', async () => {
    const { svc } = buildService();

    const result = await svc.generateMealPlanForSomeone(5, {
      diet_type: 'ovo_lacto' as any,
      target_calories: 2000,
      allergy_ids: [179],
    } as any);

    const titles = new Set(
      result.weekly_plans[0].daily_meals.map(
        (dm: any) => dm.meal_items[0].recipe.title,
      ),
    );

    // Món chứa sữa tươi (id 179) bị loại khỏi thực đơn.
    expect(titles.has('Chè Sữa')).toBe(false);
  });

  it('ingredient_id dị ứng không tồn tại -> báo lỗi', async () => {
    const { svc } = buildService();

    const ingredientService: any = { findByIds: async () => [] };
    expect(ingredientService).toBeDefined();

    await expect(
      svc.generateMealPlanForSomeone(5, {
        diet_type: 'vegan' as any,
        target_calories: 2000,
        allergy_ids: [424242],
      } as any),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('nhóm dị ứng (DAIRY) -> loại món chứa sữa tươi (id 179)', async () => {
    const { svc } = buildService();

    const result = await svc.generateMealPlanForSomeone(5, {
      diet_type: 'ovo_lacto' as any,
      target_calories: 2000,
      allergen_groups: ['DAIRY'],
    } as any);

    const titles = new Set(
      result.weekly_plans[0].daily_meals.map(
        (dm: any) => dm.meal_items[0].recipe.title,
      ),
    );

    // Nhóm DAIRY gồm sữa tươi (179) -> món "Chè Sữa" bị loại.
    expect(titles.has('Chè Sữa')).toBe(false);
    expect(titles.has('Bún Chay')).toBe(true);
  });

  it('không phải Premium -> báo lỗi 403', async () => {
    const { svc } = buildService({ isPremium: false });

    await expect(
      svc.generateMealPlanForSomeone(5, {
        diet_type: 'vegan' as any,
        target_calories: 2000,
      } as any),
    ).rejects.toBeInstanceOf(ForbiddenException);
  });

  it('không gửi target_calories -> tính theo hồ sơ chủ tài khoản', async () => {
    const { svc } = buildService();

    const result = await svc.generateMealPlanForSomeone(5, {
      diet_type: 'vegan' as any,
    } as any);

    expect(result.target_calories_per_day).toBeGreaterThan(0);
  });
});
