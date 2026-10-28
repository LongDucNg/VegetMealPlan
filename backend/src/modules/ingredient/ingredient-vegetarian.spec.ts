/* eslint-disable @typescript-eslint/no-explicit-any */
import { IngredientService } from './ingredient.service';
import { validateRecipeTitleKeyword } from '../recipe/recipe-validation.util';

/**
 * Mục 2 của cô: "Xác định và áp dụng business rule cho tạo món/menu chay; chặn nguyên liệu, món mặn".
 * Kiểm: admin không thêm/sửa được nguyên liệu mặn; vegan_flag mặc định đúng theo tên.
 */

function buildService(existing: any[] = []) {
  const saved: any[] = [];
  // Query builder giả: findByName luôn không thấy trùng tên (trừ khi truyền `existing`).
  const qb: any = new Proxy(
    {},
    {
      get: (_t, prop) => (prop === 'getOne' ? async () => existing[0] ?? null : () => qb),
    },
  );
  const ingredientRepo: any = {
    createQueryBuilder: () => qb,
    create: (o: any) => o,
    save: async (o: any) => {
      saved.push(o);
      return o;
    },
    findOne: async ({ where }: any) => existing.find((i) => i.ingredient_id === where.ingredient_id) ?? null,
  };
  const nullRepo: any = { find: async () => [], findOne: async () => null };
  const svc = new IngredientService(ingredientRepo, nullRepo, nullRepo, nullRepo, nullRepo, nullRepo, nullRepo);
  return { svc, saved };
}

const nonVegError = expect.objectContaining({
  response: expect.objectContaining({ code: 'INGREDIENT_NON_VEGETARIAN' }),
});

describe('Admin thêm/sửa nguyên liệu: chặn nguyên liệu mặn (mục 2)', () => {
  it.each(['Gà tươi', 'Ức gà', 'Thịt heo quay', 'Bò viên', 'Cá basa', 'Tôm sú', 'Mực ống', 'Sườn non', 'Mắm tôm'])(
    'chặn "%s"',
    async (name) => {
      const { svc, saved } = buildService();
      await expect(svc.createIngredient({ ingredient_name: name, unit: 'g' } as any)).rejects.toEqual(nonVegError);
      expect(saved).toHaveLength(0);
    },
  );

  it.each(['Nấm đùi gà', 'Đậu gà khô', 'Gà chay', 'Nước mắm chay', 'Trứng gà', 'Bánh bò', 'Đậu hũ trắng'])(
    'cho phép "%s"',
    async (name) => {
      const { svc, saved } = buildService();
      await svc.createIngredient({ ingredient_name: name, unit: 'g' } as any);
      expect(saved[0].ingredient_name).toBe(name);
    },
  );

  it('đổi tên nguyên liệu có sẵn thành tên mặn cũng bị chặn', async () => {
    const { svc } = buildService();
    (svc as any).ingredientRepo.findOne = async () => ({ ingredient_id: 5, ingredient_name: 'Đậu hũ', vegan_flag: true });
    await expect(svc.updateIngredient(5, { ingredient_name: 'Gà xé phay' } as any)).rejects.toEqual(nonVegError);
  });

  it('vegan_flag mặc định theo tên khi admin không gửi: trứng/sữa động vật = false, sữa thực vật = true', async () => {
    const { svc, saved } = buildService();
    for (const name of ['Trứng vịt', 'Sữa tươi', 'Phô mai', 'Sữa đậu nành', 'Sữa hạt điều', 'Cà rốt', 'Trứng chay']) {
      await svc.createIngredient({ ingredient_name: name, unit: 'g' } as any);
    }
    expect(Object.fromEntries(saved.map((i) => [i.ingredient_name, i.vegan_flag]))).toEqual({
      'Trứng vịt': false,
      'Sữa tươi': false,
      'Phô mai': false,
      'Sữa đậu nành': true,
      'Sữa hạt điều': true,
      'Cà rốt': true,
      'Trứng chay': true,
    });
  });

  it('admin gửi vegan_flag rõ ràng thì giữ nguyên lựa chọn của admin', async () => {
    const { svc, saved } = buildService();
    await svc.createIngredient({ ingredient_name: 'Sữa tươi', unit: 'g', vegan_flag: true } as any);
    expect(saved[0].vegan_flag).toBe(true);
  });
});

describe('Tên món trong dữ liệu seed không bị chặn nhầm (mục 2)', () => {
  it('cả 628 món seed đều qua kiểm tra tên món chay', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const recipes: { title: string }[] = require('../../database/seeds/data/recipes.json');
    const blocked = recipes.filter((r) => !validateRecipeTitleKeyword(r.title).isValid).map((r) => r.title);
    expect(recipes.length).toBe(628);
    expect(blocked).toEqual([]);
  });

  it('cả 190 nguyên liệu seed đều qua kiểm tra từ khoá mặn', async () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const ingredients: { ingredient_name: string }[] = require('../../database/seeds/data/ingredients.json');
    const { svc } = buildService();
    const blocked: string[] = [];
    for (const i of ingredients) {
      await svc.createIngredient({ ingredient_name: i.ingredient_name, unit: 'g' } as any).catch(() => blocked.push(i.ingredient_name));
    }
    expect(blocked).toEqual([]);
  });
});
