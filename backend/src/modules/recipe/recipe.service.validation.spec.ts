/* eslint-disable @typescript-eslint/no-explicit-any */
import { BadRequestException, ConflictException } from '@nestjs/common';

import { RecipeService } from './recipe.service';
import { RecipeValidatorService } from './recipe-validator.service';
import { Recipe } from './entities/recipe.entity';
import { RecipeIngredient } from './entities/recipe-ingredient.entity';
import { RecipeCategory } from './entities/recipe-category.entity';
import { Category } from '../category/entities/category.entity';
import { NutritionInfo } from '../nutrition/entities/nutrition-info.entity';

const norm = (s: any) =>
  String(s ?? '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

const INGREDIENTS: Record<number, any> = {
  1: {
    ingredient_id: 1,
    ingredient_name: 'Đậu hũ',
    status: 'active',
    vegan_flag: true,
  },
  2: {
    ingredient_id: 2,
    ingredient_name: 'Nấm rơm',
    status: 'active',
    vegan_flag: true,
  },
  3: {
    ingredient_id: 3,
    ingredient_name: 'Bí đỏ',
    status: 'active',
    vegan_flag: true,
  },
};

interface DbRecipe {
  recipe_id: number;
  title: string;
  ingredientIds: number[];
}

interface Ctx {
  db: DbRecipe[];
  savedRecipes: any[];
}

/**
 * Service với mock repository - KHÔNG ghi vào database thật.
 * - `db` mô phỏng các công thức đã tồn tại trong DB.
 * - `createQueryBuilder` trả về các món có tiêu đề khớp sau khi chuẩn hoá.
 */
function buildService(ctx: Ctx): RecipeService {
  const recipeRepo: any = {
    findOne: async ({ where }: any) => {
      const found = ctx.db.find((r) => r.recipe_id === where.recipe_id);
      return found ? { recipe_id: found.recipe_id, title: found.title } : null;
    },
    createQueryBuilder: () => {
      let keys: string[] = [];
      const qb: any = {
        select: () => qb,
        addSelect: () => qb,
        where: (_sql: string, params: any) => {
          keys = Array.isArray(params?.key)
            ? params.key
            : params?.key !== undefined
              ? [params.key]
              : [];
          return qb;
        },
        andWhere: () => qb,
        getRawMany: async () =>
          ctx.db
            .filter((r) => keys.includes(norm(r.title)))
            .map((r) => ({ recipe_id: r.recipe_id, title: r.title })),
      };
      return qb;
    },
    manager: { find: async () => [] },
  };

  const recipeIngredientRepo: any = {
    find: async ({ where }: any) => {
      const raw = where?.recipe_id;
      const ids: number[] = Array.isArray(raw?.value)
        ? raw.value
        : raw !== undefined && raw !== null
          ? [raw]
          : [];

      return ids.flatMap((recipeId: number) => {
        const found = ctx.db.find((r) => r.recipe_id === recipeId);
        if (!found) return [];

        return found.ingredientIds.map((ingredient_id) => ({
          recipe_id: recipeId,
          ingredient_id,
        }));
      });
    },
    delete: async () => undefined,
    create: (o: any) => o,
    save: async (rows: any[]) => rows,
  };

  const ingredientService: any = {
    findByIds: async (ids: number[]) =>
      ids.filter((id) => INGREDIENTS[id]).map((id) => INGREDIENTS[id]),
    findByName: async (name: string) =>
      Object.values(INGREDIENTS).find(
        (i) => norm(i.ingredient_name) === norm(name),
      ) ?? null,
    findConflictsAmong: async () => [],
  };

  const recipeValidator = new RecipeValidatorService(ingredientService);

  const makeManager = () => {
    const byEntity = new Map<any, any>([
      [
        Recipe,
        {
          create: (o: any) => o,
          save: async (row: any) => {
            ctx.savedRecipes.push(row);
            return row;
          },
        },
      ],
      [RecipeIngredient, recipeIngredientRepo],
      [RecipeCategory, { delete: async () => undefined, save: async () => undefined }],
      [Category, { find: async () => [] }],
      [
        NutritionInfo,
        { findOne: async () => null, create: (o: any) => o, save: async (o: any) => o },
      ],
    ]);

    return {
      getRepository: (e: any) => byEntity.get(e),
      count: async () => 0,
      insert: async () => undefined,
    };
  };

  const dataSource: any = {
    transaction: async (cb: any) => cb(makeManager()),
  };

  const nullRepo: any = {
    find: async () => [],
    findOne: async () => null,
    create: (o: any) => o,
    save: async (o: any) => o,
    delete: async () => undefined,
  };

  return new RecipeService(
    recipeRepo,
    recipeIngredientRepo,
    nullRepo, // favoriteRepo
    nullRepo, // replacementRepo
    nullRepo, // userRepo
    nullRepo, // userAllergyRepo
    ingredientService,
    nullRepo, // userRecipePriceRepo
    nullRepo, // nutritionRepo
    nullRepo, // recipeCategoryRepo
    nullRepo, // categoryRepo
    recipeValidator,
    dataSource,
  );
}

const ing = (ingredient_id: number, quantity = 100) => ({
  ingredient_id,
  quantity,
  unit: 'g',
  is_optional: false,
});

const newCtx = (db: DbRecipe[] = []): Ctx => ({
  db,
  savedRecipes: [],
});

const createDto = (title: string, ingredients: any[]) =>
  ({
    title,
    instructions: 'nấu thôi',
    meal_type: 'lunch',
    diet_type: 'vegan',
    ingredients,
  }) as any;

const updateDto = (title: string, ingredients?: any[]) =>
  ({
    title,
    ...(ingredients !== undefined ? { ingredients } : {}),
  }) as any;

// ─────────────────────────────────────────────────────────────
// 1. TẠO MÓN: BẮT BUỘC CÓ ÍT NHẤT 1 NGUYÊN LIỆU
// ─────────────────────────────────────────────────────────────
describe('RecipeService.createRecipe - bắt buộc có nguyên liệu', () => {
  it('thiếu trường ingredients -> báo lỗi', async () => {
    const svc = buildService(newCtx());
    const dto: any = { ...createDto('Món A', []) };
    delete dto.ingredients;

    await expect(
      svc.createRecipe(1, 'admin', dto),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('mảng ingredients rỗng -> báo lỗi', async () => {
    const svc = buildService(newCtx());

    await expect(
      svc.createRecipe(1, 'admin', createDto('Món A', [])),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('có ít nhất 1 nguyên liệu hợp lệ -> không bị chặn bởi validate số lượng nguyên liệu', async () => {
    const ctx = newCtx();
    const svc = buildService(ctx);

    await svc.createRecipe(1, 'admin', createDto('Món A', [ing(1)]));

    expect(ctx.savedRecipes.length).toBe(1);
  });
});

// ─────────────────────────────────────────────────────────────
// 2. CẬP NHẬT MÓN: TRÙNG THEO TÊN + TẬP NGUYÊN LIỆU
// ─────────────────────────────────────────────────────────────
describe('RecipeService.updateRecipe - chống trùng theo tên + tập nguyên liệu', () => {
  /** Món đang được sửa luôn tồn tại trong DB (recipe_id = 20). */
  const withTarget = (extra: DbRecipe[] = []): DbRecipe[] => [
    { recipe_id: 20, title: 'Món Y', ingredientIds: [1] },
    ...extra,
  ];

  it('cùng tên + cùng tập nguyên liệu -> bị chặn', async () => {
    const ctx = newCtx(
      withTarget([{ recipe_id: 10, title: 'Món X', ingredientIds: [1, 2] }]),
    );
    const svc = buildService(ctx);

    await expect(
      svc.updateRecipe(20, 1, 'admin', updateDto('món x', [ing(1), ing(2)])),
    ).rejects.toBeInstanceOf(ConflictException);
  });

  it('thứ tự nguyên liệu khác nhau vẫn là trùng -> bị chặn', async () => {
    const ctx = newCtx(
      withTarget([{ recipe_id: 10, title: 'Món X', ingredientIds: [1, 2] }]),
    );
    const svc = buildService(ctx);

    await expect(
      svc.updateRecipe(20, 1, 'admin', updateDto('  MÓN   X  ', [ing(2), ing(1)])),
    ).rejects.toBeInstanceOf(ConflictException);
  });

  it('cùng tên nhưng KHÁC tập nguyên liệu -> được phép', async () => {
    const ctx = newCtx(
      withTarget([{ recipe_id: 10, title: 'Món X', ingredientIds: [1, 2] }]),
    );
    const svc = buildService(ctx);

    await svc.updateRecipe(20, 1, 'admin', updateDto('Món X', [ing(3)]));

    expect(ctx.savedRecipes.length).toBe(1);
  });

  it('khác tên -> được phép', async () => {
    const ctx = newCtx(
      withTarget([{ recipe_id: 10, title: 'Món Z', ingredientIds: [1] }]),
    );
    const svc = buildService(ctx);

    await svc.updateRecipe(20, 1, 'admin', updateDto('Món Y', [ing(1)]));

    expect(ctx.savedRecipes.length).toBe(1);
  });

  it('trùng với CHÍNH món đang sửa -> không bị chặn', async () => {
    const ctx = newCtx([
      { recipe_id: 20, title: 'Món X', ingredientIds: [1, 2] },
    ]);
    const svc = buildService(ctx);

    await svc.updateRecipe(20, 1, 'admin', updateDto('Món X', [ing(1), ing(2)]));

    expect(ctx.savedRecipes.length).toBe(1);
  });

  it('không gửi ingredients -> so sánh với tập nguyên liệu đang lưu trong DB', async () => {
    const ctx = newCtx(
      withTarget([{ recipe_id: 10, title: 'Món X', ingredientIds: [1, 2] }]),
    );
    const svc = buildService(ctx);

    // Đổi tên "Món Y" -> "Món X" mà không gửi lại nguyên liệu (vẫn là [1])
    // -> KHÔNG trùng với món #10 ([1,2]) -> được phép.
    await svc.updateRecipe(20, 1, 'admin', updateDto('Món X'));

    expect(ctx.savedRecipes.length).toBe(1);

    // Còn nếu tập nguyên liệu đang lưu của món #20 cũng là [1,2] -> trùng -> chặn.
    const ctx2 = newCtx([
      { recipe_id: 10, title: 'Món X', ingredientIds: [1, 2] },
      { recipe_id: 20, title: 'Món Y', ingredientIds: [1, 2] },
    ]);
    const svc2 = buildService(ctx2);

    await expect(
      svc2.updateRecipe(20, 1, 'admin', updateDto('Món X')),
    ).rejects.toBeInstanceOf(ConflictException);
  });

  it('tên rỗng/khoảng trắng -> báo lỗi', async () => {
    const ctx = newCtx(withTarget());
    const svc = buildService(ctx);

    await expect(
      svc.updateRecipe(20, 1, 'admin', updateDto('   ')),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});

describe('Tên món phải là tên món chay (mục 2 - chặn món mặn)', () => {
  const titleError = expect.objectContaining({
    response: expect.objectContaining({ code: 'RECIPE_TITLE_NON_VEGETARIAN' }),
  });

  it('tạo món tên mặn ("Gà xào xả ớt") bị chặn dù nguyên liệu toàn đồ chay', async () => {
    const ctx = newCtx();
    const svc = buildService(ctx);

    await expect(svc.createRecipe(1, 'admin', createDto('Gà xào xả ớt', [ing(1)]))).rejects.toEqual(titleError);
    await expect(svc.createRecipe(1, 'admin', createDto('Canh cá chua', [ing(2)]))).rejects.toEqual(titleError);
    expect(ctx.savedRecipes).toHaveLength(0);
  });

  it('món chay giả mặn có chữ "chay" và tên cây trùng chữ mặn vẫn tạo được', async () => {
    const ctx = newCtx();
    const svc = buildService(ctx);

    for (const title of ['Gà kho gừng chay', 'Nấm đùi gà xào sả', 'Đậu gà hầm rau củ', 'Bánh bò hấp']) {
      await svc.createRecipe(1, 'admin', createDto(title, [ing(1)]));
    }
    expect(ctx.savedRecipes.map((r) => r.title)).toEqual([
      'Gà kho gừng chay',
      'Nấm đùi gà xào sả',
      'Đậu gà hầm rau củ',
      'Bánh bò hấp',
    ]);
  });

  it('đổi tên món thành tên mặn bị chặn', async () => {
    const ctx = newCtx([{ recipe_id: 20, title: 'Đậu hũ sốt cà', ingredientIds: [1] }]);
    const svc = buildService(ctx);

    await expect(svc.updateRecipe(20, 1, 'admin', updateDto('Sườn non rim mặn'))).rejects.toEqual(titleError);
  });
});
