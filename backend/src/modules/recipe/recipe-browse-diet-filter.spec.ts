/* eslint-disable @typescript-eslint/no-explicit-any */
import { RecipeService } from './recipe.service';
import { RecipeStatus } from './entities/recipe.entity';

/**
 * BE2 - GET /recipes?diet_type=... phải lọc theo TẬP chế độ ăn tương thích,
 * giống hệt luồng sinh thực đơn (lacto ăn được cả vegan, ovo_lacto ăn được cả 4).
 *
 * Không chạm database: query builder được giả lập và chỉ ghi lại các điều kiện.
 */
describe('RecipeService.findAll - lọc diet_type', () => {
  const buildService = () => {
    const conditions: { sql: string; params: any }[] = [];

    const qb: any = {
      where: (sql: string, params: any) => {
        conditions.push({ sql, params });
        return qb;
      },
      andWhere: (sql: string, params: any) => {
        conditions.push({ sql, params });
        return qb;
      },
      setParameters: () => qb,
      orderBy: () => qb,
      skip: () => qb,
      take: () => qb,
      getManyAndCount: async () => [[], 0],
    };

    const recipeRepo: any = {
      createQueryBuilder: () => qb,
      manager: { createQueryBuilder: () => qb },
    };

    const svc = new RecipeService(
      recipeRepo as any,
      { find: async () => [], findOne: async () => null } as any,
      { find: async () => [], findOne: async () => null } as any,
      { find: async () => [], findOne: async () => null } as any,
      { find: async () => [], findOne: async () => null } as any,
      { find: async () => [], findOne: async () => null } as any,
      { findByIds: async () => [], findOne: async () => null } as any,
      { find: async () => [], findOne: async () => null } as any,
      { find: async () => [], findOne: async () => null } as any,
      { find: async () => [], findOne: async () => null } as any,
      { find: async () => [], findOne: async () => null } as any,
      {} as any, // recipeValidator (không dùng khi lọc danh sách)
      { transaction: async (cb: any) => cb({}) } as any,
    );

    return { svc, conditions };
  };

  const dietCondition = (conditions: { sql: string; params: any }[]) =>
    conditions.find((c) => c.sql.includes('recipe.diet_type'));

  it('lacto -> lọc bằng IN với tập [vegan, lacto], không so sánh đẳng thức', async () => {
    const { svc, conditions } = buildService();

    await svc.findAll({ diet_type: 'lacto' } as any);

    const condition = dietCondition(conditions);
    expect(condition).toBeDefined();
    expect(condition!.sql).toContain('recipe.diet_type IN (:...allowedDiets)');
    expect(condition!.params.allowedDiets).toEqual(['vegan', 'lacto']);
  });

  it('ovo_lacto -> lọc bằng IN với cả 4 chế độ', async () => {
    const { svc, conditions } = buildService();

    await svc.findAll({ diet_type: 'ovo_lacto' } as any);

    const condition = dietCondition(conditions);
    expect(condition!.params.allowedDiets).toEqual([
      'vegan',
      'lacto',
      'ovo',
      'ovo_lacto',
    ]);
  });

  it('vegan -> chỉ lọc món vegan', async () => {
    const { svc, conditions } = buildService();

    await svc.findAll({ diet_type: 'vegan' } as any);

    expect(dietCondition(conditions)!.params.allowedDiets).toEqual([
      'vegan',
    ]);
  });

  it('không truyền diet_type -> không thêm điều kiện lọc chế độ ăn', async () => {
    const { svc, conditions } = buildService();

    await svc.findAll({} as any);

    expect(dietCondition(conditions)).toBeUndefined();
  });

  it('route công khai vẫn chỉ trả món APPROVED', async () => {
    const { svc, conditions } = buildService();

    await svc.findAll({} as any);

    expect(
      conditions.some(
        (c) =>
          c.sql.includes('recipe.status') &&
          c.params.status === RecipeStatus.APPROVED,
      ),
    ).toBe(true);
  });
});
