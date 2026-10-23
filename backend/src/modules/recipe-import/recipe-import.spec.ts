/* eslint-disable @typescript-eslint/no-explicit-any */
import { RecipeImportService } from './recipe-import.service';
import { RecipeImportItem } from './entities/recipe-import-item.entity';
import { RecipeImportBatch } from './entities/recipe-import-batch.entity';
import { Recipe } from '../recipe/entities/recipe.entity';
import { RecipeIngredient } from '../recipe/entities/recipe-ingredient.entity';
import { Ingredient } from '../ingredient/entities/ingredient.entity';
import { NutritionInfo } from '../nutrition/entities/nutrition-info.entity';
import { Category } from '../category/entities/category.entity';

const norm = (s: any) =>
  String(s ?? '').replace(/\s+/g, ' ').trim().toLowerCase();

const INGREDIENTS: Record<string, any> = {
  'yến mạch': {
    ingredient_id: 25,
    ingredient_name: 'Yến mạch',
    unit: 'g',
    calories_per_100g: 380,
    protein_per_100g: 13,
    carb_per_100g: 67,
    fat_per_100g: 7,
    fiber_per_100g: 10,
    avg_price_per_unit: 20000,
  },
  'bí đỏ': {
    ingredient_id: 70,
    ingredient_name: 'Bí đỏ',
    unit: 'g',
    calories_per_100g: 26,
    protein_per_100g: 1,
    carb_per_100g: 6.5,
    fat_per_100g: 0.1,
    fiber_per_100g: 0.5,
    avg_price_per_unit: 8000,
  },
  'nấm rơm': {
    ingredient_id: 88,
    ingredient_name: 'Nấm rơm',
    unit: 'g',
    calories_per_100g: 32,
    protein_per_100g: 3.8,
    carb_per_100g: 4.6,
    fat_per_100g: 0.7,
    fiber_per_100g: 2.2,
    avg_price_per_unit: 30000,
  },
};

interface Ctx {
  dbTitles: string[];
  nextRecipeId: number;
  savedRecipes: any[];
  savedItems: any[];
  savedBatches: any[];
}

/** Service với mock repository - KHONG ghi vao database that. */
function buildService(ctx: Ctx): RecipeImportService {
  const itemRepo: any = {
    create: (o: any) => o,
    find: async () => [],
    findOne: async () => null,
  };

  const batchRepo: any = {
    find: async () => [],
    findOne: async () => null,
  };

  const recipeRepo: any = {
    createQueryBuilder: () => {
      let keys: string[] = [];
      const qb: any = {
        select: () => qb,
        where: (_sql: string, params: any) => {
          keys = params.keys;
          return qb;
        },
        // Service dùng getRawMany() (getMany() với select 1 cột trả về mảng rỗng).
        getRawMany: async () =>
          ctx.dbTitles
            .filter((t) => keys.includes(norm(t)))
            .map((t) => ({ title: t })),
      };
      return qb;
    },
  };

  const ingredientService: any = {
    findByName: async (name: string) => {
      const found = Object.values(INGREDIENTS).find(
        (i) => norm(i.ingredient_name) === norm(name),
      );
      return found ?? null;
    },
    findConflictsAmong: async () => [],
  };

  const makeManager = () => {
    const recipeRepoM: any = {
      create: (o: any) => o,
      save: async (o: any) => {
        const id = ctx.nextRecipeId++;
        ctx.savedRecipes.push({ ...o, recipe_id: id });
        ctx.dbTitles.push(o.title);
        return { ...o, recipe_id: id };
      },
    };
    const riRepoM: any = { create: (o: any) => o, save: async (o: any) => o };
    const ingRepoM: any = {
      findOne: async ({ where }: any) =>
        Object.values(INGREDIENTS).find(
          (i) => i.ingredient_id === where.ingredient_id,
        ) ?? null,
    };
    const nutRepoM: any = { create: (o: any) => o, save: async (o: any) => o };
    const catRepoM: any = { find: async () => [] };
    const batchRepoM: any = {
      create: (o: any) => o,
      save: async (o: any) => {
        const batch = { ...o, batch_id: 1 };
        ctx.savedBatches.push(batch);
        return batch;
      },
    };
    const itemRepoM: any = {
      create: (o: any) => o,
      save: async (o: any) => {
        const saved = o.map((x: any) => ({
          ...x,
          import_item_id: ctx.savedItems.length + 1,
        }));
        ctx.savedItems.push(...saved);
        return saved;
      },
    };

    const byEntity = new Map<any, any>([
      [Recipe, recipeRepoM],
      [RecipeIngredient, riRepoM],
      [Ingredient, ingRepoM],
      [NutritionInfo, nutRepoM],
      [Category, catRepoM],
      [RecipeImportBatch, batchRepoM],
      [RecipeImportItem, itemRepoM],
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

  return new RecipeImportService(
    batchRepo,
    itemRepo,
    recipeRepo,
    { create: (o: any) => o, save: async (o: any) => o } as any,
    ingredientService,
    dataSource,
  );
}

const ing = (name: string, quantity = 100) => ({
  ingredient_name: name,
  quantity,
  unit: 'g',
  is_optional: false,
});

const row = (title: string, extra: any = {}) => ({
  title,
  description: 'mo ta',
  instructions: 'nau thoi',
  prep_time: 10,
  cook_time: 20,
  servings: 2,
  difficulty: 'easy',
  meal_type: 'lunch',
  diet_type: 'vegan',
  ingredients: [ing('Yến mạch')],
  ...extra,
});

const newCtx = (dbTitles: string[] = []): Ctx => ({
  dbTitles,
  nextRecipeId: 900,
  savedRecipes: [],
  savedItems: [],
  savedBatches: [],
});

/** Service có sẵn danh sách cặp xung khắc giả lập (để test mức độ chặn). */
function buildServiceWithConflicts(
  ctx: Ctx,
  conflicts: any[],
): RecipeImportService {
  const svc = buildService(ctx);
  const ingredientService = (svc as any).ingredientService;
  ingredientService.findConflictsAmong = async () => conflicts;
  return svc;
}

describe('RecipeImportService - xu ly trung ten', () => {
  it('skip cong thuc trung DB / trung trong file, va xu ly dong loi doc lap', async () => {
    const ctx = newCtx(['Món Đã Có']);
    const svc = buildService(ctx);

    const rows = [
      row('Món Đã Có'), // trùng DB (khác hoa/thường) -> skipped
      row('  Món Mới  '), // hợp lệ -> success
      row('món mới'), // trùng trong file -> skipped
      row('Món lỗi', { ingredients: [ing('Không Tồn Tại')] }), // failed
      row('Món Lỗi'), // dòng sau dòng lỗi cùng tên -> success
      row('Món Lỗi'), // trùng dòng 5 -> skipped
    ];

    const res: any = await svc.importRows(1, 'a.xlsx', rows as any);

    expect(res.success).toBe(true);
    expect(res.data.summary).toEqual({
      total: 6,
      success: 2,
      skipped: 3,
      failed: 1,
    });
    expect(res.data.details.map((d: any) => d.status)).toEqual([
      'skipped',
      'success',
      'skipped',
      'failed',
      'success',
      'skipped',
    ]);
    res.data.details.forEach((d: any) => {
      expect(d).toHaveProperty('row');
      expect(d).toHaveProperty('title');
      expect(d).toHaveProperty('status');
      expect(d).toHaveProperty('reason');
    });
    expect(ctx.savedRecipes.every((r) => r.status === 'pending_review')).toBe(
      true,
    );
    expect(ctx.savedBatches[0].skipped_count).toBe(3);
  });

  it('dong dau khong hop le thi dong sau cung ten van import duoc', async () => {
    const ctx = newCtx();
    const svc = buildService(ctx);

    const rows = [
      row('Món A', { instructions: '   ' }), // failed
      row('Món A'), // success
      row('Món A'), // skipped
    ];

    const res: any = await svc.importRows(1, 'b.xlsx', rows as any);

    expect(res.data.summary).toEqual({
      total: 3,
      success: 1,
      skipped: 1,
      failed: 1,
    });
  });

  it('import lai cung file khong tao ban sao', async () => {
    const ctx = newCtx();
    const svc = buildService(ctx);
    const rows = [row('Món Lặp'), row('Món Lặp')];

    const r1: any = await svc.importRows(1, 'c.xlsx', rows as any);
    expect(r1.data.summary.success).toBe(1);
    expect(r1.data.summary.skipped).toBe(1);

    const r2: any = await svc.importRows(1, 'c.xlsx', rows as any);
    expect(r2.data.summary.success).toBe(0);
    expect(r2.data.summary.skipped).toBe(2);

    expect(ctx.savedRecipes.length).toBe(1);
  });

  it('bo qua cong thuc trung DB khi khac hoa/thuong va khoang trang', async () => {
    const ctx = newCtx(['  Món  Có  ']);
    const svc = buildService(ctx);

    const res: any = await svc.importRows(1, 'd.xlsx', [
      row('món có'),
    ] as any);

    expect(res.data.summary.skipped).toBe(1);
    expect(res.data.summary.success).toBe(0);
  });

  it('dong co row_error (JSON ingredients sai) bi danh dau failed', async () => {
    const ctx = newCtx();
    const svc = buildService(ctx);

    const res: any = await svc.importRows(1, 'e.xlsx', [
      row('Món X', { row_error: 'cột ingredients không hợp lệ' }),
      row('Món Y'),
    ] as any);

    expect(res.data.summary.failed).toBe(1);
    expect(res.data.summary.success).toBe(1);
    expect(res.data.details[0].status).toBe('failed');
    expect(res.data.details[0].reason).toContain('ingredients');
  });

  it('tinh nutrition va estimated_cost cho dong import thanh cong', async () => {
    const ctx = newCtx();
    const svc = buildService(ctx);

    await svc.importRows(1, 'f.xlsx', [
      row('Món Cost', { ingredients: [ing('Yến mạch', 200)] }),
    ] as any);

    const saved = ctx.savedRecipes[0];
    // 200g yến mạch: 380 * 2 = 760 kcal, giá 20000/kg -> 0.2kg * 20000 = 4000
    expect(saved.estimated_cost).toBe(4000);
    expect(saved.status).toBe('pending_review');
  });
});

// ─────────────────────────────────────────────────────────────
// Regression: 2 bug BE2 tìm ra khi test file HappyCase thật.
//
// 1. getMany() với select chỉ 1 cột -> mảng rỗng -> skip trùng tên
//    KHÔNG chạy, mỗi lần import lại đều tạo bản sao trong DB.
// 2. Bảng ingredient_conflicts gộp cả "mẹo tốt" (tip) - đậu hũ + chanh là
//    mẹo (vitamin C hỗ trợ hấp thu sắt) nhưng lại chặn import công thức.
// ─────────────────────────────────────────────────────────────
describe('RecipeImportService - regression BE2', () => {
  it('skip cong thuc trung trong DB khi import lai file (getRawMany)', async () => {
    const ctx = newCtx();
    const svc = buildService(ctx);

    const rows = [row('Món Lặp')];

    const r1: any = await svc.importRows(1, 'g.xlsx', rows as any);
    expect(r1.data.summary).toEqual({
      total: 1,
      success: 1,
      skipped: 0,
      failed: 0,
    });

    // Lần 2: tiêu đề đã có trong DB -> phải skipped, không tạo bản sao.
    const r2: any = await svc.importRows(1, 'g.xlsx', rows as any);
    expect(r2.data.summary).toEqual({
      total: 1,
      success: 0,
      skipped: 1,
      failed: 0,
    });
    expect(r2.data.details[0].status).toBe('skipped');
    expect(r2.data.details[0].reason).toContain('đã tồn tại');

    expect(ctx.savedRecipes.length).toBe(1);
  });

  it('cặp "tip" (mẹo tốt) KHÔNG chặn import', async () => {
    const ctx = newCtx();
    // "tip" = mẹo tốt (vitamin C hỗ trợ hấp thu sắt) -> vẫn import được.
    const svc = buildServiceWithConflicts(ctx, [
      {
        ingredient_id_1: 32,
        ingredient_id_2: 105,
        reason: '[tip/B] Vitamin C hỗ trợ hấp thu sắt thực vật',
      },
    ]);

    const res: any = await svc.importRows(1, 'h.xlsx', [
      row('Món Với Tip'),
    ] as any);

    expect(res.data.summary.success).toBe(1);
    expect(res.data.summary.failed).toBe(0);
    expect(ctx.savedRecipes.length).toBe(1);
  });

  it('cặp "avoid"/"caution" (xung khắc thật) VẪN chặn import', async () => {
    const ctx = newCtx();
    const svc = buildServiceWithConflicts(ctx, [
      {
        ingredient_id_1: 105,
        ingredient_id_2: 179,
        reason: '[avoid/A] Axit làm sữa vón cục',
      },
    ]);

    const res: any = await svc.importRows(1, 'i.xlsx', [
      row('Món Xung Khắc'),
    ] as any);

    expect(res.data.summary.failed).toBe(1);
    expect(res.data.summary.success).toBe(0);
    expect(res.data.details[0].reason).toContain('xung khắc');
    expect(ctx.savedRecipes.length).toBe(0);
  });
});
