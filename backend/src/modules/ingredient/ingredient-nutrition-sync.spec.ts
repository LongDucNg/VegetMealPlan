/* eslint-disable @typescript-eslint/no-explicit-any */
import { IngredientService } from './ingredient.service';
import { calculateNutritionPerServing } from '../recipe/recipe-nutrition.util';

// ============================================================
// Tính lại dinh dưỡng cho công thức bị ảnh hưởng khi dữ liệu dinh dưỡng
// của nguyên liệu thay đổi.
//
// Đảm bảo:
//   - Dùng CHUNG calculateNutritionPerServing() (không tự tính lệch).
//   - Chỉ ghi đè nutrition của đúng các recipe chứa nguyên liệu đó.
//   - Không tạo nutrition record trùng (đã có -> update, chưa có -> insert).
//   - Nguyên liệu optional không tính vào dinh dưỡng.
// ============================================================

const INGREDIENTS: Record<number, any> = {
  1: {
    ingredient_id: 1,
    ingredient_name: 'Đậu hũ',
    calories_per_100g: 76,
    protein_per_100g: 8,
    carb_per_100g: 1.9,
    fat_per_100g: 4.8,
    fiber_per_100g: 0.5,
  },
  2: {
    ingredient_id: 2,
    ingredient_name: 'Nấm rơm',
    calories_per_100g: 32,
    protein_per_100g: 3.8,
    carb_per_100g: 4.6,
    fat_per_100g: 0.7,
    fiber_per_100g: 2.2,
  },
};

const RECIPES: any[] = [
  { recipe_id: 100, title: 'Đậu hũ xào', servings: 2 },
  { recipe_id: 200, title: 'Món khác', servings: 1 },
  { recipe_id: 300, title: 'Món thứ ba', servings: 2 },
];

const RECIPE_INGREDIENTS: any[] = [
  {
    recipe_id: 100,
    ingredient_id: 1,
    quantity: 200,
    is_optional: false,
  },
  {
    recipe_id: 200,
    ingredient_id: 2,
    quantity: 100,
    is_optional: false,
  },
];

function buildService(overrides?: {
  nutritionRows?: any[];
  recipeIngredients?: any[];
}) {
  const nutritionRows = overrides?.nutritionRows ?? [
    { recipe_id: 100, calories: 76, protein: 8, carbs: 1.9, fat: 4.8, fiber: 0.5 },
  ];

  const recipeIngredients = overrides?.recipeIngredients ?? RECIPE_INGREDIENTS;

  const saved: any[] = [];

  const nutritionRepo: any = {
    find: async ({ where }: any) => {
      const ids: number[] = where.recipe_id._value ?? [];
      return nutritionRows.filter((n) => ids.includes(n.recipe_id));
    },
    create: (o: any) => ({ ...o }),
    save: async (o: any) => {
      saved.push(o);
      return o;
    },
  };

  const recipeIngredientRepo: any = {
    find: async ({ where }: any) => {
      // Lần đầu (không relations) -> lọc theo ingredient_id.
      if (where.ingredient_id !== undefined) {
        return recipeIngredients.filter(
          (r) => r.ingredient_id === where.ingredient_id,
        );
      }

      // Lần sau (có relations) -> lọc theo recipe_id + gắn relation ingredient.
      const ids: number[] = where.recipe_id._value ?? [];
      return recipeIngredients
        .filter((r) => ids.includes(r.recipe_id))
        .map((r) => ({ ...r, ingredient: INGREDIENTS[r.ingredient_id] }));
    },
  };

  const recipeRepo: any = {
    find: async ({ where }: any) => {
      const ids: number[] = where.recipe_id._value ?? [];
      return RECIPES.filter((r) => ids.includes(r.recipe_id));
    },
  };

  const service = new IngredientService(
    { find: async () => [] } as any, // ingredientRepo
    { find: async () => [] } as any, // userAllergyRepo
    { find: async () => [] } as any, // conflictRepo
    { find: async () => [] } as any, // priceOverrideRepo
    recipeRepo,
    recipeIngredientRepo,
    nutritionRepo,
  );

  return { service, saved, nutritionRows, recipeIngredients };
}

describe('IngredientService.syncAffectedRecipes - tính lại dinh dưỡng', () => {
  it('tính lại nutrition của đúng các recipe chứa nguyên liệu', async () => {
    const { service, saved } = buildService();

    const updated = await service.syncAffectedRecipes(1);

    // Recipe 100 chứa nguyên liệu 1 -> được tính lại.
    // Recipe 200 KHÔNG chứa nguyên liệu 1 -> không đụng tới.
    expect(updated).toBe(1);
    expect(saved).toHaveLength(1);
    expect(saved[0].recipe_id).toBe(100);
  });

  it('dùng CHUNG calculateNutritionPerServing (chia cho servings)', async () => {
    const { service, saved } = buildService();

    await service.syncAffectedRecipes(1);

    // 200g đậu hũ (76 kcal/100g) = 152 kcal tổng, servings = 2 -> 76 kcal/khẩu phần.
    const expected = calculateNutritionPerServing(
      [
        {
          quantity: 200,
          is_optional: false,
          ingredient: INGREDIENTS[1],
        },
      ],
      2,
    );

    expect(saved[0].calories).toBeCloseTo(expected.calories, 5);
    expect(saved[0].protein).toBeCloseTo(expected.protein, 5);
    expect(saved[0].carbs).toBeCloseTo(expected.carbs, 5);
    expect(saved[0].fat).toBeCloseTo(expected.fat, 5);
    expect(saved[0].fiber).toBeCloseTo(expected.fiber, 5);
  });

  it('UPDATE nutrition record đã có (không tạo bản ghi trùng)', async () => {
    const { service, saved, nutritionRows } = buildService();

    await service.syncAffectedRecipes(1);

    const existing = nutritionRows.find((n) => n.recipe_id === 100);
    expect(existing.calories).toBeCloseTo(76, 5);
    expect(saved).toHaveLength(1);
    expect(saved[0]).toBe(existing);
  });

  it('INSERT nutrition record khi recipe chưa có nutrition', async () => {
    const { service, saved } = buildService({ nutritionRows: [] });

    const updated = await service.syncAffectedRecipes(1);

    expect(updated).toBe(1);
    expect(saved).toHaveLength(1);
    expect(saved[0].recipe_id).toBe(100);
    expect(saved[0].calories).toBeCloseTo(76, 5);
  });

  it('nguyên liệu optional KHÔNG tính vào dinh dưỡng', async () => {
    const { service, saved } = buildService({
      recipeIngredients: [
        {
          recipe_id: 100,
          ingredient_id: 1,
          quantity: 200,
          is_optional: true,
        },
      ],
    });

    await service.syncAffectedRecipes(1);

    expect(saved[0].calories).toBeCloseTo(0, 5);
    expect(saved[0].protein).toBeCloseTo(0, 5);
  });

  it('nguyên liệu không dùng trong công thức nào -> không tính lại gì', async () => {
    const { service, saved } = buildService();

    const updated = await service.syncAffectedRecipes(999);

    expect(updated).toBe(0);
    expect(saved).toHaveLength(0);
  });

  it('nhiều recipe cùng dùng nguyên liệu -> tính lại tất cả', async () => {
    const { service, saved } = buildService({
      recipeIngredients: [
        ...RECIPE_INGREDIENTS,
        {
          recipe_id: 300,
          ingredient_id: 1,
          quantity: 100,
          is_optional: false,
        },
      ],
      nutritionRows: [],
    });

    const updated = await service.syncAffectedRecipes(1);

    expect(updated).toBe(2);
    expect(saved.map((s) => s.recipe_id).sort()).toEqual([100, 300]);
  });
});

// ─────────────────────────────────────────────────────────────
// Wiring: sửa dinh dưỡng nguyên liệu -> tự tính lại nutrition công thức.
// Không có bước này thì nutrition_infos giữ giá trị cũ (sai lệch).
// ─────────────────────────────────────────────────────────────
describe('IngredientService.updateIngredient - tự tính lại nutrition công thức', () => {
  function buildUpdateService() {
    const ingredient: any = {
      ingredient_id: 1,
      ingredient_name: 'Đậu hũ',
      unit: 'g',
      vegan_flag: true,
      status: 'active',
      calories_per_100g: 76,
      protein_per_100g: 8,
      carb_per_100g: 1.9,
      fat_per_100g: 4.8,
      fiber_per_100g: 0.5,
    };

    const savedNutrition: any[] = [];

    const ingredientRepo: any = {
      findOne: async () => ingredient,
      find: async () => [ingredient],
      save: async (o: any) => {
        Object.assign(ingredient, o);
        return ingredient;
      },
    };

    const nutritionRepo: any = {
      find: async () => [
        {
          recipe_id: 100,
          calories: 76,
          protein: 8,
          carbs: 1.9,
          fat: 4.8,
          fiber: 0.5,
        },
      ],
      create: (o: any) => ({ ...o }),
      save: async (o: any) => {
        savedNutrition.push(o);
        return o;
      },
    };

    const recipeIngredientRepo: any = {
      find: async ({ where }: any) => {
        if (where.ingredient_id !== undefined) {
          return [
            {
              recipe_id: 100,
              ingredient_id: 1,
              quantity: 200,
              is_optional: false,
            },
          ];
        }
        return [
          {
            recipe_id: 100,
            ingredient_id: 1,
            quantity: 200,
            is_optional: false,
            ingredient: {
              calories_per_100g: ingredient.calories_per_100g,
              protein_per_100g: ingredient.protein_per_100g,
              carb_per_100g: ingredient.carb_per_100g,
              fat_per_100g: ingredient.fat_per_100g,
              fiber_per_100g: ingredient.fiber_per_100g,
            },
          },
        ];
      },
    };

    const service = new IngredientService(
      ingredientRepo,
      { find: async () => [] } as any,
      { find: async () => [] } as any,
      { find: async () => [] } as any,
      { find: async () => [{ recipe_id: 100, servings: 2 }] } as any,
      recipeIngredientRepo,
      nutritionRepo,
    );

    return { service, ingredient, savedNutrition };
  }

  it('sửa calories_per_100g -> nutrition công thức được tính lại', async () => {
    const { service, ingredient, savedNutrition } = buildUpdateService();

    await service.updateIngredient(1, { calories_per_100g: 100 } as any);

    expect(ingredient.calories_per_100g).toBe(100);

    // 200g x 100 kcal/100g = 200 kcal tổng, servings = 2 -> 100 kcal/khẩu phần.
    expect(savedNutrition).toHaveLength(1);
    expect(savedNutrition[0].recipe_id).toBe(100);
    expect(savedNutrition[0].calories).toBeCloseTo(100, 5);
    // protein không đổi -> 200g x 8/100 = 16 kcal-protein tổng, /2 = 8.
    expect(savedNutrition[0].protein).toBeCloseTo(8, 5);
  });

  it('sửa thuộc tính khác (không phải dinh dưỡng) vẫn đồng bộ nutrition', async () => {
    const { service, savedNutrition } = buildUpdateService();

    await service.updateIngredient(1, { description: 'Mô tả mới' } as any);

    expect(savedNutrition).toHaveLength(1);
    expect(savedNutrition[0].recipe_id).toBe(100);
  });
});
