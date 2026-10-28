/* eslint-disable @typescript-eslint/no-explicit-any */
import { BadRequestException } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { Recipe, RecipeStatus } from './entities/recipe.entity';
import { RecipeIngredient } from './entities/recipe-ingredient.entity';
import { NutritionInfo } from '../nutrition/entities/nutrition-info.entity';
import { DietType } from '../users/entities/user.entity';

/**
 * Nguyên liệu mẫu - lấy đúng từ dữ liệu seed hiện tại.
 * vegan_flag = true  -> thuần chay.
 * vegan_flag = false -> không thuần chay (trứng / sữa / mật ong / thịt, cá).
 */
const DB_INGREDIENTS: any[] = [
  {
    ingredient_id: 25,
    ingredient_name: 'Yến mạch',
    unit: 'g',
    vegan_flag: true,
    calories_per_100g: 380,
    protein_per_100g: 13,
    carb_per_100g: 67,
    fat_per_100g: 7,
    fiber_per_100g: 10,
    avg_price_per_unit: 20000,
  },
  {
    ingredient_id: 185,
    ingredient_name: 'Trứng gà',
    unit: 'g',
    vegan_flag: false,
    calories_per_100g: 143,
    protein_per_100g: 12.6,
    carb_per_100g: 0.7,
    fat_per_100g: 9.5,
    fiber_per_100g: 0,
    avg_price_per_unit: 70000,
  },
  {
    ingredient_id: 179,
    ingredient_name: 'Sữa tươi',
    unit: 'g',
    vegan_flag: false,
    calories_per_100g: 61,
    protein_per_100g: 3.2,
    carb_per_100g: 4.8,
    fat_per_100g: 3.3,
    fiber_per_100g: 0,
    avg_price_per_unit: 38000,
  },
  {
    ingredient_id: 9001,
    ingredient_name: 'Thịt bò',
    unit: 'g',
    vegan_flag: false,
    calories_per_100g: 250,
    protein_per_100g: 26,
    carb_per_100g: 0,
    fat_per_100g: 15,
    fiber_per_100g: 0,
    avg_price_per_unit: 300000,
  },
  {
    ingredient_id: 9002,
    ingredient_name: 'Cá hồi',
    unit: 'g',
    vegan_flag: false,
    calories_per_100g: 208,
    protein_per_100g: 20,
    carb_per_100g: 0,
    fat_per_100g: 13,
    fiber_per_100g: 0,
    avg_price_per_unit: 250000,
  },
];

interface Ctx {
  /** Công thức đang tồn tại trong DB (mô phỏng bảng recipes). */
  recipes: any[];
  /** Nguyên liệu đang gắn với công thức, theo recipe_id. */
  recipeIngredients: any[];
  savedRecipes: any[];
  savedRecipeIngredients: any[];
}

function newCtx(recipes: any[] = [], recipeIngredients: any[] = []): Ctx {
  return {
    recipes,
    recipeIngredients,
    savedRecipes: [],
    savedRecipeIngredients: [],
  };
}

/**
 * Dựng RecipeService với các repository giả lập - KHÔNG ghi vào database thật.
 * Chỉ mô phỏng đúng những phần mà luồng kiểm tra chế độ ăn chay dùng tới.
 */
function buildService(ctx: Ctx): RecipeService {
  const recipeRepo: any = {
    findOne: async ({ where }: any) =>
      ctx.recipes.find((r) => r.recipe_id === where.recipe_id) ?? null,
    save: async (entity: any) => {
      const saved = { ...entity };
      if (!saved.recipe_id) {
        saved.recipe_id = ctx.savedRecipes.length + 500;
        ctx.savedRecipes.push(saved);
      }
      return saved;
    },
    create: (o: any) => o,
  };

  const recipeIngredientRepo: any = {
    find: async ({ where }: any) => {
      const rows = ctx.recipeIngredients.filter(
        (r) => r.recipe_id === where.recipe_id,
      );
      return rows.map((r) => ({
        ...r,
        ingredient: DB_INGREDIENTS.find(
          (i) => i.ingredient_id === r.ingredient_id,
        ),
      }));
    },
    create: (o: any) => o,
    save: async (rows: any[]) => {
      ctx.savedRecipeIngredients.push(...rows);
      return rows;
    },
    delete: async () => undefined,
  };

  const ingredientService: any = {
    findByIds: async (ids: number[]) =>
      DB_INGREDIENTS.filter((i) => ids.includes(i.ingredient_id)),
    findOne: async (id: number) =>
      DB_INGREDIENTS.find((i) => i.ingredient_id === id) ?? null,
  };

  const nutritionRepo: any = {
    find: async () => [],
    findOne: async () => null,
    create: (o: any) => o,
    save: async (o: any) => o,
  };

  const categoryRepo: any = {
    find: async () => [],
    manager: { find: async () => [] },
  };

  const recipeCategoryRepo: any = {
    save: async () => undefined,
    delete: async () => undefined,
  };

  const manager: any = {
    getRepository: (e: any) => {
      if (e === Recipe) return recipeRepo;
      if (e === RecipeIngredient) return recipeIngredientRepo;
      if (e === NutritionInfo) return nutritionRepo;
      return { find: async () => [], save: async () => undefined };
    },
    find: async () => [],
  };

  const dataSource: any = {
    transaction: async (cb: any) => cb(manager),
  };

  const svc = new RecipeService(
    recipeRepo as any,
    recipeIngredientRepo as any,
    { find: async () => [], findOne: async () => null } as any,
    { find: async () => [] } as any,
    { findOne: async () => null } as any,
    { find: async () => [] } as any,
    ingredientService,
    { find: async () => [], findOne: async () => null } as any,
    nutritionRepo as any,
    recipeCategoryRepo as any,
    categoryRepo as any,
    dataSource,
  );

  return svc;
}

const ingRow = (ingredient_id: number) => ({
  ingredient_id,
  quantity: 100,
  unit: 'g',
  is_optional: false,
});

const baseRecipeDto = (overrides: any = {}) =>
  ({
    title: 'Món Chay',
    instructions: 'Nấu như bình thường',
    meal_type: 'lunch',
    ...overrides,
  }) as any;

describe('RecipeService - kiem tra tuong thiep chu do an chay', () => {
  describe('tao cong thuc (createRecipe)', () => {
    it('món vegan với nguyên liệu chay -> tạo được', async () => {
      const ctx = newCtx();
      const svc = buildService(ctx);

      const res: any = await svc.createRecipe(5, 'authorized', baseRecipeDto({
        diet_type: DietType.VEGAN,
        ingredients: [ingRow(25)],
      }));

      expect(res).toBeDefined();
      expect(ctx.savedRecipes.length).toBe(1);
      expect(ctx.savedRecipes[0].status).toBe(RecipeStatus.PENDING_REVIEW);
    });

    it('món vegan chứa thịt bò -> bị từ chối', async () => {
      const ctx = newCtx();
      const svc = buildService(ctx);

      await expect(
        svc.createRecipe(5, 'authorized', baseRecipeDto({
          diet_type: DietType.VEGAN,
          ingredients: [ingRow(25), ingRow(9001)],
        })),
      ).rejects.toBeInstanceOf(BadRequestException);

      expect(ctx.savedRecipes.length).toBe(0);
    });

    it('món vegan chứa cá -> bị từ chối', async () => {
      const ctx = newCtx();
      const svc = buildService(ctx);

      await expect(
        svc.createRecipe(5, 'authorized', baseRecipeDto({
          diet_type: DietType.VEGAN,
          ingredients: [ingRow(9002)],
        })),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('lỗi có mã RECIPE_DIET_INCOMPATIBLE và nêu rõ nguyên liệu', async () => {
      const ctx = newCtx();
      const svc = buildService(ctx);

      try {
        await svc.createRecipe(5, 'authorized', baseRecipeDto({
          diet_type: DietType.VEGAN,
          ingredients: [ingRow(9001)],
        }));
        throw new Error('phải ném lỗi');
      } catch (error: any) {
        expect(error.getStatus()).toBe(400);
        expect(error.getResponse().code).toBe(
          'RECIPE_DIET_INCOMPATIBLE',
        );
        expect(error.getResponse().message).toContain('Thịt bò');
      }
    });

    it('món lacto chứa sữa -> tạo được', async () => {
      const ctx = newCtx();
      const svc = buildService(ctx);

      await svc.createRecipe(5, 'authorized', baseRecipeDto({
        diet_type: DietType.LACTO,
        ingredients: [ingRow(25), ingRow(179)],
      }));

      expect(ctx.savedRecipes.length).toBe(1);
    });

    it('món lacto chứa trứng -> bị từ chối', async () => {
      const ctx = newCtx();
      const svc = buildService(ctx);

      await expect(
        svc.createRecipe(5, 'authorized', baseRecipeDto({
          diet_type: DietType.LACTO,
          ingredients: [ingRow(185)],
        })),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('món ovo chứa trứng -> tạo được', async () => {
      const ctx = newCtx();
      const svc = buildService(ctx);

      await svc.createRecipe(5, 'authorized', baseRecipeDto({
        diet_type: DietType.OVO,
        ingredients: [ingRow(185)],
      }));

      expect(ctx.savedRecipes.length).toBe(1);
    });

    it('món ovo chứa sữa -> bị từ chối', async () => {
      const ctx = newCtx();
      const svc = buildService(ctx);

      await expect(
        svc.createRecipe(5, 'authorized', baseRecipeDto({
          diet_type: DietType.OVO,
          ingredients: [ingRow(179)],
        })),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('món ovo_lacto chứa cả trứng và sữa -> tạo được', async () => {
      const ctx = newCtx();
      const svc = buildService(ctx);

      await svc.createRecipe(5, 'authorized', baseRecipeDto({
        diet_type: DietType.OVO_LACTO,
        ingredients: [ingRow(185), ingRow(179)],
      }));

      expect(ctx.savedRecipes.length).toBe(1);
    });

    it('món ovo_lacto chứa thịt -> bị từ chối', async () => {
      const ctx = newCtx();
      const svc = buildService(ctx);

      await expect(
        svc.createRecipe(5, 'authorized', baseRecipeDto({
          diet_type: DietType.OVO_LACTO,
          ingredients: [ingRow(9001)],
        })),
      ).rejects.toBeInstanceOf(BadRequestException);
    });
  });

  describe('cap nhat cong thuc (updateRecipe)', () => {
    it('user thêm thịt vào món vegan đã tồn tại -> bị từ chối', async () => {
      const ctx = newCtx(
        [
          {
            recipe_id: 10,
            title: 'Món Vegan',
            diet_type: DietType.VEGAN,
            created_by: 5,
            status: RecipeStatus.PENDING_REVIEW,
            meal_type: 'lunch',
            suitable_meals: 'lunch,dinner',
            servings: 2,
          },
        ],
        [{ recipe_id: 10, ingredient_id: 25, quantity: 100, unit: 'g' }],
      );
      const svc = buildService(ctx);

      await expect(
        svc.updateRecipe(10, 5, 'authorized', {
          ingredients: [ingRow(25), ingRow(9001)],
        } as any),
      ).rejects.toBeInstanceOf(BadRequestException);

      // Không ghi thêm nguyên liệu nào vào DB.
      expect(ctx.savedRecipeIngredients.length).toBe(0);
    });

    it('user thêm cá vào món vegan -> bị từ chối', async () => {
      const ctx = newCtx(
        [
          {
            recipe_id: 11,
            title: 'Món Vegan 2',
            diet_type: DietType.VEGAN,
            created_by: 5,
            status: RecipeStatus.PENDING_REVIEW,
            meal_type: 'lunch',
            servings: 2,
          },
        ],
        [{ recipe_id: 11, ingredient_id: 25, quantity: 100, unit: 'g' }],
      );
      const svc = buildService(ctx);

      await expect(
        svc.updateRecipe(11, 5, 'authorized', {
          ingredients: [ingRow(25), ingRow(9002)],
        } as any),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('user cập nhật món vegan bằng nguyên liệu chay -> thành công', async () => {
      const ctx = newCtx(
        [
          {
            recipe_id: 12,
            title: 'Món Vegan 3',
            diet_type: DietType.VEGAN,
            created_by: 5,
            status: RecipeStatus.PENDING_REVIEW,
            meal_type: 'lunch',
            servings: 2,
          },
        ],
        [{ recipe_id: 12, ingredient_id: 25, quantity: 100, unit: 'g' }],
      );
      const svc = buildService(ctx);

      await svc.updateRecipe(12, 5, 'authorized', {
        ingredients: [ingRow(25)],
      } as any);

      expect(ctx.savedRecipeIngredients.length).toBe(1);
    });

    it('đổi diet_type sang vegan khi công thức đang có thịt -> bị từ chối', async () => {
      const ctx = newCtx(
        [
          {
            recipe_id: 13,
            title: 'Món Thịt',
            diet_type: DietType.OVO_LACTO,
            created_by: 5,
            status: RecipeStatus.PENDING_REVIEW,
            meal_type: 'lunch',
            servings: 2,
          },
        ],
        [{ recipe_id: 13, ingredient_id: 9001, quantity: 100, unit: 'g' }],
      );
      const svc = buildService(ctx);

      await expect(
        svc.updateRecipe(13, 5, 'authorized', {
          diet_type: DietType.VEGAN,
          ingredients: [ingRow(9001)],
        } as any),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('đổi diet_type sang vegan mà KHÔNG gửi lại ingredients -> vẫn bị từ chối (lỗ hổng: nguyên liệu cũ vẫn còn trong DB)', async () => {
      const ctx = newCtx(
        [
          {
            recipe_id: 14,
            title: 'Chè Sữa',
            diet_type: DietType.LACTO,
            created_by: 5,
            status: RecipeStatus.PENDING_REVIEW,
            meal_type: 'lunch',
            servings: 2,
          },
        ],
        [{ recipe_id: 14, ingredient_id: 179, quantity: 100, unit: 'g' }],
      );
      const svc = buildService(ctx);

      // Không gửi trường ingredients => nguyên liệu đang lưu (sữa) vẫn còn.
      // Nếu chỉ kiểm tra "request có gửi ingredients không" thì món này sẽ
      // lọt qua và trở thành món "vegan" nhưng vẫn chứa sữa.
      await expect(
        svc.updateRecipe(14, 5, 'authorized', {
          diet_type: DietType.VEGAN,
        } as any),
      ).rejects.toBeInstanceOf(BadRequestException);

      expect(ctx.savedRecipeIngredients.length).toBe(0);
    });

    it('đổi diet_type sang vegan (không gửi ingredients) khi công thức chỉ có nguyên liệu chay -> thành công', async () => {
      const ctx = newCtx(
        [
          {
            recipe_id: 15,
            title: 'Món Chay',
            diet_type: DietType.LACTO,
            created_by: 5,
            status: RecipeStatus.PENDING_REVIEW,
            meal_type: 'lunch',
            servings: 2,
          },
        ],
        [{ recipe_id: 15, ingredient_id: 25, quantity: 100, unit: 'g' }],
      );
      const svc = buildService(ctx);

      const res: any = await svc.updateRecipe(15, 5, 'authorized', {
        diet_type: DietType.VEGAN,
      } as any);

      expect(res.diet_type).toBe(DietType.VEGAN);
    });

    it('cập nhật trường khác (không đổi nguyên liệu, không đổi diet_type) của món lacto chứa sữa -> vẫn thành công', async () => {
      const ctx = newCtx(
        [
          {
            recipe_id: 16,
            title: 'Chè Sữa',
            diet_type: DietType.LACTO,
            created_by: 5,
            status: RecipeStatus.PENDING_REVIEW,
            meal_type: 'lunch',
            servings: 2,
          },
        ],
        [{ recipe_id: 16, ingredient_id: 179, quantity: 100, unit: 'g' }],
      );
      const svc = buildService(ctx);

      const res: any = await svc.updateRecipe(16, 5, 'authorized', {
        title: 'Chè Sữa Nóng',
      } as any);

      expect(res.title).toBe('Chè Sữa Nóng');
      expect(res.diet_type).toBe(DietType.LACTO);
    });
  });

  describe('duyet cong thuc (updateRecipeStatus)', () => {
    it('duyệt món vegan chứa thịt -> bị từ chối duyệt', async () => {
      const ctx = newCtx(
        [
          {
            recipe_id: 20,
            title: 'Bún Riêu Chay',
            diet_type: DietType.VEGAN,
            created_by: 1,
            status: RecipeStatus.PENDING_REVIEW,
            meal_type: 'lunch',
            servings: 2,
          },
        ],
        [{ recipe_id: 20, ingredient_id: 9001, quantity: 100, unit: 'g' }],
      );
      const svc = buildService(ctx);

      await expect(
        svc.updateRecipeStatus(20, 1, { status: 'approved' } as any),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('duyệt món vegan chỉ có nguyên liệu chay -> thành công', async () => {
      const ctx = newCtx(
        [
          {
            recipe_id: 21,
            title: 'Món Chay Thuần',
            diet_type: DietType.VEGAN,
            created_by: 1,
            status: RecipeStatus.PENDING_REVIEW,
            meal_type: 'lunch',
            servings: 2,
          },
        ],
        [{ recipe_id: 21, ingredient_id: 25, quantity: 100, unit: 'g' }],
      );
      const svc = buildService(ctx);

      const res: any = await svc.updateRecipeStatus(21, 1, {
        status: 'approved',
      } as any);

      expect(res.status).toBe(RecipeStatus.APPROVED);
      expect(res.approved_at).toBeTruthy();
    });

    it('từ chối công thức vẫn lưu công thức và ghi lý do', async () => {
      const ctx = newCtx(
        [
          {
            recipe_id: 22,
            title: 'Món Cần Sửa',
            diet_type: DietType.VEGAN,
            created_by: 1,
            status: RecipeStatus.PENDING_REVIEW,
            meal_type: 'lunch',
            servings: 2,
          },
        ],
        [{ recipe_id: 22, ingredient_id: 9001, quantity: 100, unit: 'g' }],
      );
      const svc = buildService(ctx);

      const res: any = await svc.updateRecipeStatus(22, 1, {
        status: 'rejected',
        reason: 'Chứa nguyên liệu không phù hợp',
      } as any);

      // Công thức KHÔNG bị xoá - chỉ đổi trạng thái và lưu lý do.
      expect(res.status).toBe(RecipeStatus.REJECTED);
      expect(res.review_reason).toBe('Chứa nguyên liệu không phù hợp');
      expect(ctx.recipes.length).toBe(1);
    });

    it('duyệt món lacto chứa sữa -> thành công', async () => {
      const ctx = newCtx(
        [
          {
            recipe_id: 23,
            title: 'Súp Sữa',
            diet_type: DietType.LACTO,
            created_by: 1,
            status: RecipeStatus.PENDING_REVIEW,
            meal_type: 'lunch',
            servings: 2,
          },
        ],
        [{ recipe_id: 23, ingredient_id: 179, quantity: 100, unit: 'g' }],
      );
      const svc = buildService(ctx);

      const res: any = await svc.updateRecipeStatus(23, 1, {
        status: 'approved',
      } as any);

      expect(res.status).toBe(RecipeStatus.APPROVED);
    });
  });
});
