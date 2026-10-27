/* eslint-disable @typescript-eslint/no-explicit-any */
import { HealthGoalService, HEALTH_GOAL_DEFINITIONS } from './health-goal.service';

// ============================================================
// Khởi tạo dữ liệu `health_goals` khi bảng bị trống.
//
// Bảng này là master data (3 dòng). Trước đây nếu chưa chạy `npm run seed`
// thì bảng rỗng -> `users.current_goal_id` không gán được -> mọi request
// rơi về 'maintain' dù người dùng đã chọn tăng/giảm.
// ============================================================

function buildRepo(initial: any[] = []) {
  let rows = [...initial];
  return {
    get rows() {
      return rows;
    },
    find: async () => rows,
    findOne: async ({ where }: any) =>
      rows.find((r) => r.name === where.name) ?? null,
    create: (data: any) => ({ ...data }),
    save: async (data: any) => {
      const arr = Array.isArray(data) ? data : [data];
      for (const d of arr) {
        rows.push({ goal_id: rows.length + 1, ...d });
      }
      return data;
    },
  };
}

describe('HealthGoalService - khởi tạo health_goals', () => {
  it('bảng RỖNG -> tự thêm đủ 3 mục tiêu chuẩn', async () => {
    const repo = buildRepo([]);
    const service = new HealthGoalService(repo as any);

    await service.ensureMasterData();

    expect(repo.rows).toHaveLength(3);
    expect(repo.rows.map((r) => r.name).sort()).toEqual([
      'gain_muscle',
      'lose_weight',
      'maintain',
    ]);
  });

  it('bảng RỖNG -> findAll() trả về 3 mục tiêu (frontend có dữ liệu để chọn)', async () => {
    const repo = buildRepo([]);
    const service = new HealthGoalService(repo as any);

    const goals = await service.findAll();

    expect(goals).toHaveLength(3);
    expect(goals.map((g) => g.name)).toContain('lose_weight');
    expect(goals.map((g) => g.name)).toContain('gain_muscle');
    expect(goals.map((g) => g.name)).toContain('maintain');
  });

  it('bảng ĐÃ có dữ liệu -> không thêm trùng (idempotent)', async () => {
    const repo = buildRepo([
      { goal_id: 1, name: 'lose_weight', description: 'Giảm cân' },
      { goal_id: 2, name: 'gain_muscle', description: 'Tăng cơ' },
      { goal_id: 3, name: 'maintain', description: 'Duy trì cân nặng' },
    ]);
    const service = new HealthGoalService(repo as any);

    await service.ensureMasterData();

    expect(repo.rows).toHaveLength(3);
  });

  it('bảng THIẾU một dòng -> chỉ thêm đúng dòng còn thiếu', async () => {
    const repo = buildRepo([
      { goal_id: 1, name: 'lose_weight', description: 'Giảm cân' },
    ]);
    const service = new HealthGoalService(repo as any);

    await service.ensureMasterData();

    expect(repo.rows).toHaveLength(3);
    expect(repo.rows.find((r) => r.name === 'lose_weight')).toBeDefined();
    expect(repo.rows.find((r) => r.name === 'maintain')).toBeDefined();
  });

  it('KHÔNG xoá dòng nào đã có', async () => {
    const repo = buildRepo([
      { goal_id: 7, name: 'lose_weight', description: 'Giảm cân' },
      { goal_id: 8, name: 'custom_goal', description: 'Mục tiêu tuỳ chỉnh' },
    ]);
    const service = new HealthGoalService(repo as any);

    await service.ensureMasterData();

    // Dòng custom vẫn còn, không bị xoá.
    expect(repo.rows.find((r) => r.name === 'custom_goal')).toBeDefined();
    expect(repo.rows).toHaveLength(4);
  });

  it('HEALTH_GOAL_DEFINITIONS khớp với 3 tên mục tiêu mà backend dùng', () => {
    expect(HEALTH_GOAL_DEFINITIONS.map((g) => g.name).sort()).toEqual([
      'gain_muscle',
      'lose_weight',
      'maintain',
    ]);
  });
});
