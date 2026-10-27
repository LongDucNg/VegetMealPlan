/* eslint-disable @typescript-eslint/no-explicit-any */
import { IngredientService } from './ingredient.service';

/**
 * BE2 - sửa dinh dưỡng của nguyên liệu thì phải tính lại nutrition_infos
 * của các công thức chứa nguyên liệu đó.
 *
 * Repository giả lập - KHÔNG ghi vào database thật.
 */
describe('IngredientService.updateIngredient - đồng bộ dinh dưỡng công thức', () => {
  const buildService = () => {
    const savedIngredients: any[] = [];
    const savedNutrition: any[] = [];

    const ingredient = {
      ingredient_id: 25,
      ingredient_name: 'Yến mạch',
      unit: 'g',
      vegan_flag: true,
      avg_price_per_unit: 20000,
      calories_per_100g: 380,
      protein_per_100g: 13,
      carb_per_100g: 67,
      fat_per_100g: 7,
      fiber_per_100g: 10,
      is_seasonal: false,
      season_months: null,
      status: 'active',
    };

    const ingredientRepo: any = {
      // findOne trả về CÙNG một object tham chiếu, để Object.assign trong
      // updateIngredient cập nhật đúng object này (giống hành vi thật của
      // TypeORM khi load rồi save lại cùng entity).
      findOne: async () => ingredient,
      find: async () => [ingredient],
      save: async (e: any) => {
        savedIngredients.push({ ...e });
        return e;
      },
      createQueryBuilder: () => ({
        where: () => ({ getOne: async () => null }),
      }),
    };

    const recipeIngredientRepo: any = {
      find: async ({ where }: any) => {
        if (where.ingredient_id !== undefined) {
          return [{ recipe_id: 10, ingredient_id: 25 }];
        }
        if (where.recipe_id !== undefined) {
          // relations: ['ingredient'] -> TypeORM query lại bảng ingredients
          // sau khi đã save => nhận GIÁ TRỊ MỚI của nguyên liệu.
          return [
            {
              recipe_id: 10,
              ingredient_id: 25,
              quantity: 200,
              unit: 'g',
              is_optional: false,
              ingredient,
            },
          ];
        }
        return [];
      },
    };

    const recipeRepo: any = {
      find: async () => [{ recipe_id: 10, servings: 2 }],
    };

    const nutritionRepo: any = {
      find: async () => [
        {
          nutrition_id: 1,
          recipe_id: 10,
          calories: 300,
          protein: 0,
          carbs: 0,
          fat: 0,
          fiber: 0,
        },
      ],
      create: (o: any) => o,
      save: async (e: any) => {
        savedNutrition.push({ ...e });
        return e;
      },
    };

    const svc = new IngredientService(
      ingredientRepo as any,
      { find: async () => [], delete: async () => {} } as any,
      { find: async () => [], save: async () => {} } as any,
      { find: async () => [], save: async () => {} } as any,
      recipeRepo as any,
      recipeIngredientRepo as any,
      nutritionRepo as any,
    );

    return { svc, savedNutrition, savedIngredients };
  };

  it('sửa calories_per_100g -> tính lại nutrition của công thức chứa nguyên liệu', async () => {
    const { svc, savedNutrition } = buildService();

    await svc.updateIngredient(25, {
      calories_per_100g: 500,
    } as any);

    expect(savedNutrition.length).toBe(1);

    const nutrition = savedNutrition[0];
    expect(nutrition.recipe_id).toBe(10);
    // 200g * 500 kcal/100g / 2 khẩu phần = 500 kcal
    expect(nutrition.calories).toBe(500);
    // 200g * 13g/100g / 2 khẩu phần = 13g đạm
    expect(nutrition.protein).toBe(13);
  });

  it('không đổi trường dinh dưỡng -> không tính lại nutrition', async () => {
    const { svc, savedNutrition } = buildService();

    await svc.updateIngredient(25, {
      description: 'Mô tả mới',
    } as any);

    expect(savedNutrition.length).toBe(0);
  });
});
