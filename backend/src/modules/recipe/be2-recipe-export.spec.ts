import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../../common/decorators/public.decorator';
import { ROLES_KEY } from '../../common/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import { RolesGuard } from '../../common/guards/roles.guard';
import { ErrorCode } from '../../common/constants/error-codes.enum';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { buildRecipeCsv, escapeCsvValue, UTF8_BOM } from './recipe-export.util';

const qbOf = (rows: any[]) => {
  const st: any = { ids: null, status: null };
  const qb: any = {
    where: jest.fn((sql: string, p: any) => {
      if (sql.includes('recipe_id IN')) st.ids = p.ids;
      if (sql.includes('recipe.status')) st.status = p.status;
      return qb;
    }),
    andWhere: jest.fn((sql: string, p: any) => {
      if (sql.includes('recipe.status')) st.status = p.status;
      return qb;
    }),
    orderBy: jest.fn(() => qb),
    skip: jest.fn(() => qb),
    take: jest.fn(() => qb),
    getMany: jest.fn(async () =>
      rows.filter((r: any) =>
        (!st.ids || st.ids.includes(r.recipe_id)) &&
        (!st.status || r.status === st.status))),
    getManyAndCount: jest.fn(async () => {
      const out = rows.filter((r: any) =>
        (!st.ids || st.ids.includes(r.recipe_id)) &&
        (!st.status || r.status === st.status));
      return [out, out.length];
    }),
  };
  return qb;
};

const repoOf = (rows: any[] = []) => ({
  find: jest.fn(async (o: any = {}) => {
    const w = o.where || {};
    const ids = w.recipe_id?._value;
    return rows.filter((r: any) =>
      (!ids || ids.includes(r.recipe_id)) &&
      (!w.status || r.status === w.status));
  }),
  findOne: jest.fn(async () => null),
  createQueryBuilder: jest.fn(() => qbOf(rows)),
});

const svcOf = (r: any[] = [], i: any[] = [], n: any[] = [], c: any[] = []) =>
  new RecipeService(
    repoOf(r) as any, repoOf(i) as any, repoOf() as any, repoOf() as any,
    repoOf() as any, repoOf() as any, {} as any, repoOf() as any,
    repoOf(n) as any, repoOf(c) as any, repoOf() as any, {} as any, {} as any,
  );

const RECIPE: any = {
  recipe_id: 15, title: 'Ga nam chay', description: 'd',
  instructions: 'Rau cu', image_url: 'u', prep_time: 10, cook_time: 20,
  servings: 2, difficulty: 'easy', meal_type: 'lunch',
  suitable_meals: 'lunch,dinner', diet_type: 'vegan',
  estimated_cost: 45000, status: 'approved', created_by: 7,
  created_at: new Date('2026-01-02T03:04:05Z'),
};
const ING: any = {
  recipe_id: 15, ingredient_id: 3, quantity: 200, unit: 'g',
  note: null, is_optional: false, ingredient: { ingredient_name: 'Nam rom' }
};
const NUT: any = {
  recipe_id: 15, calories: 320, protein: 12.5,
  carbs: 40, fat: 8, fiber: 5
};

describe('BE2 - Export cong thuc (CSV)', () => {
  it('escapeCsvValue: boc nhay kep, nhan doi nhay kep, giu gia tri thuong', () => {
    expect(escapeCsvValue('a,b')).toBe('"a,b"');
    expect(escapeCsvValue('a"b')).toBe('"a""b"');
    expect(escapeCsvValue('Nam rom')).toBe('Nam rom');
    expect(escapeCsvValue(200)).toBe('200');
    expect(escapeCsvValue(null)).toBe('');
  });

  it('escapeCsvValue: chong CSV injection', () => {
    expect(escapeCsvValue('=1+1')).toBe("'=1+1");
    expect(escapeCsvValue('@cmd')).toBe("'@cmd");
  });

  it('buildRecipeCsv: co BOM va tieu de cot', () => {
    const csv = buildRecipeCsv([{
      recipe_id: 15, title: 'Ga nam chay', description: '', diet_type: 'vegan',
      meal_type: 'lunch', suitable_meals: 'lunch', difficulty: 'easy',
      servings: 2, prep_time: 10, cook_time: 20, ingredient_count: 1,
      ingredient_ids: '3', ingredients: 'Nam rom - 200g', calories: 320,
      protein: 12.5, carbs: 40, fat: 8, fiber: 5, estimated_cost: 45000,
      categories: 'Mon chay', instructions: 'Rau cu', image_url: '',
      status: 'approved', created_by: 7, created_at: '2026-01-02T03:04:05.000Z',
    }]);
    expect(csv.startsWith(UTF8_BOM)).toBe(true);
    expect(csv.split('\r\n')[0]).toContain('Tên công thức');
    expect(csv).toContain('Ga nam chay');
  });

  it('getRecipesForExport: loai bo ID trung lap, giu thu tu', async () => {
    const res = await svcOf([RECIPE]).getRecipesForExport('15,15,15', {} as any);
    expect(res).toHaveLength(1);
    expect(res[0].recipe_id).toBe(15);
  });

  it('getRecipesForExport: bao loi khi ID khong phai so', async () => {
    await expect(svcOf([RECIPE]).getRecipesForExport('15,abc', {} as any))
      .rejects.toBeInstanceOf(BadRequestException);
  });

  it('getRecipesForExport: bao loi khi ID khong ton tai', async () => {
    await expect(svcOf([RECIPE]).getRecipesForExport('15,999', {} as any))
      .rejects.toBeInstanceOf(NotFoundException);
  });

  it('getRecipesForExport: khong export mon chua duyet', async () => {
    await expect(
      svcOf([{ ...RECIPE, status: 'draft' }]).getRecipesForExport('15', {} as any))
      .rejects.toBeInstanceOf(NotFoundException);
  });

  it('getRecipesForExport: gioi han so ID moi request', async () => {
    await expect(
      svcOf([RECIPE]).getRecipesForExport('1,2,3,4,5', {} as any, { maxIds: 3 }))
      .rejects.toBeInstanceOf(BadRequestException);
  });

  it('buildRecipeExportRows: gop nguyen lieu, so luong, don vi, dinh duong', async () => {
    const rows = await svcOf([RECIPE], [ING], [NUT],
      [{ recipe_id: 15, category_id: 1, category: { category_name: 'Mon chay' } }])
      .buildRecipeExportRows([RECIPE] as any);
    expect(rows).toHaveLength(1);
    expect(rows[0].title).toBe('Ga nam chay');
    expect(rows[0].diet_type).toBe('vegan');
    expect(rows[0].ingredient_count).toBe(1);
    expect(rows[0].ingredient_ids).toBe('3');
    expect(rows[0].ingredients).toContain('Nam rom');
    expect(rows[0].ingredients).toContain('200g');
    expect(rows[0].calories).toBe(320);
    expect(rows[0].protein).toBe(12.5);
    expect(rows[0].categories).toBe('Mon chay');
  });

  it('getRecipesForExport: khong co ids -> dung bo loc hien co (findAll)', async () => {
    const svc = svcOf([RECIPE]);
    const spy = jest.spyOn(svc, 'findAll');
    const res = await svc.getRecipesForExport(undefined, { status: 'approved' } as any);
    expect(spy).toHaveBeenCalled();
    expect(res).toHaveLength(1);
    expect(res[0].recipe_id).toBe(15);
  });

  describe('Phan quyen endpoint GET /recipes/export', () => {
    const reflector = new Reflector();
    const handler = RecipeController.prototype.exportRecipes;

    it('KHONG con @Public() -> nguoi chua dang nhap bi tu choi (401)', () => {
      const isPublic = reflector.getAllAndOverride<boolean>(
        IS_PUBLIC_KEY,
        [handler, RecipeController],
      );
      expect(isPublic).toBeUndefined();
      expect(isPublic).not.toBe(true);
    });

    it('co @Roles(UserRole.ADMIN) -> user thuong bi tu choi (403)', () => {
      const roles = reflector.getAllAndOverride<UserRole[]>(
        ROLES_KEY,
        [handler, RecipeController],
      );
      expect(roles).toEqual([UserRole.ADMIN]);
    });

    // Chay THAT RolesGuard (global) voi context gia lap -> xac nhan 403
    // cho user thuong va 200 cho admin.
    const ctxOf = (user: any) => ({
      getHandler: () => handler,
      getClass: () => RecipeController,
      switchToHttp: () => ({ getRequest: () => ({ user }) }),
    }) as any;

    it('RolesGuard that: user thuong -> 403 AUTH_FORBIDDEN', () => {
      const guard = new RolesGuard(new Reflector());
      expect(() =>
        guard.canActivate(ctxOf({ user_id: 5, role: UserRole.AUTHORIZED })),
      ).toThrow(ForbiddenException);
      try {
        guard.canActivate(ctxOf({ user_id: 5, role: UserRole.AUTHORIZED }));
      } catch (e: any) {
        expect(e.getStatus()).toBe(403);
        expect(e.getResponse()).toMatchObject({
          code: ErrorCode.AUTH_FORBIDDEN,
        });
      }
    });

    it('RolesGuard that: admin -> qua', () => {
      const guard = new RolesGuard(new Reflector());
      expect(
        guard.canActivate(ctxOf({ user_id: 1, role: UserRole.ADMIN })),
      ).toBe(true);
    });

    it('RolesGuard that: route khong co @Roles -> qua (khong chan user thuong)', () => {
      const guard = new RolesGuard(new Reflector());
      const otherHandler = RecipeController.prototype.findAll;
      const ctx = {
        getHandler: () => otherHandler,
        getClass: () => RecipeController,
        switchToHttp: () => ({ getRequest: () => ({ user: { role: UserRole.AUTHORIZED } }) }),
      } as any;
      expect(guard.canActivate(ctx)).toBe(true);
    });
  });

  it('controller exportRecipes: set Content-Type va Content-Disposition de trinh duyet tai file', async () => {
    const svc = {
      exportRecipesCsv: jest.fn(async () => ({
        filename: 'cong-thuc-1-mon-2026-01-02-03-04.csv',
        content: 'x',
      })),
    };
    const ctrl = new RecipeController(svc as any, {} as any);
    const headers: Record<string, string> = {};
    const res: any = {
      setHeader: jest.fn((k: string, v: string) => { headers[k] = v; }),
      send: jest.fn(),
    };
    await ctrl.exportRecipes({ ids: '15' } as any, res);
    expect(headers['Content-Type']).toBe('text/csv; charset=utf-8');
    expect(headers['Content-Disposition']).toBe(
      'attachment; filename="cong-thuc-1-mon-2026-01-02-03-04.csv"',
    );
    expect(res.send).toHaveBeenCalledWith('x');
  });

  it('exportRecipesCsv: 1 file CSV co BOM chua nhieu cong thuc', async () => {
    const r = await svcOf([RECIPE, { ...RECIPE, recipe_id: 20, title: 'Tofu nuong' }],
      [ING], [NUT], []).exportRecipesCsv('15,20', {} as any);
    expect(r.filename).toMatch(/\.csv$/);
    expect(r.content.startsWith(UTF8_BOM)).toBe(true);
    expect(r.content).toContain('Ga nam chay');
    expect(r.content).toContain('Tofu nuong');
  });
});