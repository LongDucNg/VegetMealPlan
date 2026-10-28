/* eslint-disable @typescript-eslint/no-explicit-any */
import { BadRequestException } from '@nestjs/common';
import { MealPlanService } from './meal-plan.service';
import { getAllowedRecipeDiets } from '../../common/utils/diet.util';

/**
 * BE2 - kiểm tra luồng thực đơn cho hồ sơ người thân + lọc diet_type khi
 * duyệt danh sách công thức.
 *
 * Các test dùng repository giả lập - KHÔNG ghi vào database thật.
 */

const OWNER = {
  user_id: 5,
  diet_type: 'ovo_lacto',
  bmi: 22.5,
  current_goal_id: 1,
  current_goal: { name: 'lose_weight' },
};

const PROFILE = {
  profile_id: 7,
  user_id: 5,
  full_name: 'Người thân',
  age: 30,
  gender: 'female',
  height_cm: 165,
  weight_kg: 58,
  bmi: 21.3,
  activity_level: 'moderate',
  diet_type: 'vegan',
};

describe('BE2 - thực đơn người thân & lọc diet_type', () => {
  describe('getAllowedRecipeDiets', () => {
    it('mỗi chế độ ăn nhận đúng tập công thức tương thích', () => {
      expect(getAllowedRecipeDiets('vegan')).toEqual(['vegan']);
      expect(getAllowedRecipeDiets('lacto')).toEqual([
        'vegan',
        'lacto',
      ]);
      expect(getAllowedRecipeDiets('ovo')).toEqual(['vegan', 'ovo']);
      expect(getAllowedRecipeDiets('ovo_lacto')).toEqual([
        'vegan',
        'lacto',
        'ovo',
        'ovo_lacto',
      ]);
    });

    it('thiếu chế độ ăn hoặc chế độ không hợp lệ -> không lọc', () => {
      expect(getAllowedRecipeDiets(null)).toBeNull();
      expect(getAllowedRecipeDiets('')).toBeNull();
      expect(getAllowedRecipeDiets('vegetarian')).toBeNull();
    });
  });

  describe('updateMealSlot - dùng hồ sơ người thân', () => {
    const buildService = (opts: {
      recipes: any[];
      recipeIngredients: any[];
      profileAllergies: any[];
      userAllergies: any[];
      mealPlan: any;
    }) => {
      const mealPlanRepo: any = {
        findOne: async () => opts.mealPlan,
        save: async (e: any) => e,
      };
      const dailyMealRepo: any = {
        findOne: async () => ({
          daily_meal_id: 100,
          meal_type: 'lunch',
          weekly_plan: { meal_plan_id: 1 },
        }),
      };
      const mealItemRepo: any = {
        findOne: async () => ({
          meal_item_id: 200,
          daily_meal_id: 100,
          recipe_id: 1,
          portion_multiplier: 1,
        }),
        save: async (e: any) => e,
      };
      const userRepo: any = {
        findOne: async () => OWNER,
      };
      const allergyRepo: any = {
        find: async () => opts.userAllergies,
      };
      const recipeRepo: any = {
        findOne: async ({ where }: any) =>
          opts.recipes.find(
            (r) => r.recipe_id === where.recipe_id,
          ) ?? null,
      };
      const recipeIngredientRepo: any = {
        find: async ({ where }: any) =>
          opts.recipeIngredients.filter(
            (r) => r.recipe_id === where.recipe_id,
          ),
      };
      const mealPlanProfileRepo: any = {
        findOne: async () => PROFILE,
      };
      const profileAllergyRepo: any = {
        find: async () => opts.profileAllergies,
      };
      const ingredientService: any = {
        findByIds: async (ids: number[]) =>
          ids.map((id) => ({
            ingredient_id: id,
            ingredient_name: `Nguyên liệu ${id}`,
          })),
      };
      const nutritionRepo: any = { find: async () => [] };
      const favoriteRepo: any = { find: async () => [] };
      const weeklyPlanRepo: any = { find: async () => [] };

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
        { isPremium: async () => true } as any,
        ingredientService as any,
        { transaction: async (cb: any) => cb({}) } as any,
      );

      return svc;
    };

    it('thực đơn có target_profile_id -> chặn món SỮA cho hồ sơ người thân vegan', async () => {
      const svc = buildService({
        recipes: [
          {
            recipe_id: 10,
            title: 'Chè Sữa',
            diet_type: 'lacto',
            status: 'approved',
            suitable_meals: 'lunch,dinner',
          },
        ],
        recipeIngredients: [
          { recipe_id: 10, ingredient_id: 179 },
        ],
        profileAllergies: [],
        userAllergies: [],
        mealPlan: {
          meal_plan_id: 1,
          user_id: 5,
          target_profile_id: PROFILE.profile_id,
        },
      });

      // Chủ tài khoản là ovo_lacto (ăn được sữa) nhưng hồ sơ người thân là vegan.
      await expect(
        svc.updateMealSlot(5, 1, 100, 200, {
          recipe_id: 10,
        } as any),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('thực đơn có target_profile_id -> chặn món chứa nguyên liệu dị ứng CỦA HỒ SƠ NGƯỜI THÂN', async () => {
      const svc = buildService({
        recipes: [
          {
            recipe_id: 11,
            title: 'Món Chay An Toàn',
            diet_type: 'vegan',
            status: 'approved',
            suitable_meals: 'lunch,dinner',
          },
        ],
        recipeIngredients: [
          { recipe_id: 11, ingredient_id: 42 },
        ],
        // Chủ tài khoản KHÔNG dị ứng nguyên liệu 42, chỉ hồ sơ người thân dị ứng.
        profileAllergies: [{ ingredient_id: 42 }],
        userAllergies: [],
        mealPlan: {
          meal_plan_id: 1,
          user_id: 5,
          target_profile_id: PROFILE.profile_id,
        },
      });

      await expect(
        svc.updateMealSlot(5, 1, 100, 200, {
          recipe_id: 11,
        } as any),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('thực đơn cho chính chủ -> vẫn dùng chế độ ăn + dị ứng của chủ tài khoản', async () => {
      const svc = buildService({
        recipes: [
          {
            recipe_id: 12,
            title: 'Món Lacto',
            diet_type: 'lacto',
            status: 'approved',
            suitable_meals: 'lunch,dinner',
          },
        ],
        recipeIngredients: [],
        profileAllergies: [],
        userAllergies: [],
        mealPlan: {
          meal_plan_id: 1,
          user_id: 5,
          target_profile_id: null,
        },
      });

      // Chủ tài khoản là ovo_lacto => món lacto hợp lệ, không được chặn.
      await expect(
        svc.updateMealSlot(5, 1, 100, 200, {
          recipe_id: 12,
        } as any),
      ).resolves.toBeDefined();
    });
  });
});
