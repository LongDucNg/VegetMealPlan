/* eslint-disable @typescript-eslint/no-explicit-any */
import { UsersService } from './users.service';

// ============================================================
// Tự lành khi bảng `health_goals` bị trống / id client lệch.
//
// Bối cảnh (nguyên nhân API mặc định 'maintain'):
//   - `health_goals` là master data 3 dòng. Nếu bảng rỗng thì
//     `current_goal_id` không gán được -> `user.current_goal` = null ->
//     `resolveGoalDirection()` không có nguồn nào -> rơi về 'maintain'.
//   - `goal_id` là SERIAL nên id client gửi có thể lệch id thật trong DB.
// ============================================================

const STANDARD_GOALS = [
  { goal_id: 1, name: 'lose_weight', description: 'Giảm cân' },
  { goal_id: 2, name: 'gain_muscle', description: 'Tăng cơ' },
  { goal_id: 3, name: 'maintain', description: 'Duy trì cân nặng' },
];

function buildRepo(initial: any[] = []) {
  const rows = [...initial];
  return {
    get rows() {
      return rows;
    },
    find: async () => rows,
    findOne: async ({ where }: any) =>
      rows.find((r) => r.goal_id === where.goal_id) ??
      rows.find((r) => r.name === where.name) ??
      null,
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

function buildService(opts: { goalRows?: any[] } = {}) {
  const goalRepo = buildRepo(opts.goalRows ?? []);

  // User giữ state giữa các lần gọi (findOne trả về CÙNG object) để mô phỏng
  // đúng hành vi TypeORM: updateProfile -> save -> getProfile đọc lại.
  const user: any = {
    user_id: 1,
    full_name: 'Test',
    email: 't@t.com',
    age: 30,
    gender: 'male',
    height_cm: 175,
    weight_kg: 80,
    activity_level: 'moderate',
    diet_type: 'vegan',
    current_goal_id: null,
    current_goal: null,
    target_weight_kg: null,
    target_date: null,
    allergies: [],
  };

  const userRepo: any = {
    findOne: async () => user,
    save: async (u: any) => u,
  };
  const service = new UsersService(
    userRepo,
    goalRepo as any,
    { find: async () => [], manager: { transaction: async () => undefined } } as any,
    { count: async () => 0 } as any,
    { find: async () => [] } as any,
    { find: async () => null } as any,
  );
  return { service, goalRepo, user };
}

describe('UsersService - tự lành mục tiêu sức khoẻ', () => {
  it('health_goals RỖNG -> tự khởi tạo master data khi cập nhật mục tiêu', async () => {
    const { service, goalRepo } = buildService({ goalRows: [] });

    const profile: any = await service.updateProfile(1, { current_goal_id: 1 } as any);

    // Bảng đã được đầy 3 mục tiêu chuẩn.
    expect(goalRepo.rows).toHaveLength(3);
    expect(goalRepo.rows.map((r) => r.name).sort()).toEqual([
      'gain_muscle',
      'lose_weight',
      'maintain',
    ]);
    // Mục tiêu người dùng chọn được gán đúng (không bị mất).
    expect(profile.current_goal.name).toBe('lose_weight');
  });

  it('health_goals RỖNG + chọn gain_muscle -> gán đúng tăng cân', async () => {
    const { service } = buildService({ goalRows: [] });

    const profile: any = await service.updateProfile(1, { current_goal_id: 2 } as any);

    expect(profile.current_goal.name).toBe('gain_muscle');
  });

  it('goal_id client lệch với id thật trong DB -> vẫn ánh xạ đúng mục tiêu', async () => {
    // DB có id lệch (vd. 91/92/93 do seed lại), client gửi 1/2/3.
    const { service } = buildService({
      goalRows: [
        { goal_id: 91, name: 'lose_weight', description: 'Giảm cân' },
        { goal_id: 92, name: 'gain_muscle', description: 'Tăng cơ' },
        { goal_id: 93, name: 'maintain', description: 'Duy trì cân nặng' },
      ],
    });

    const gain: any = await service.updateProfile(1, { current_goal_id: 2 } as any);
    expect(gain.current_goal.name).toBe('gain_muscle');

    const lose: any = await service.updateProfile(1, { current_goal_id: 1 } as any);
    expect(lose.current_goal.name).toBe('lose_weight');
  });

  it('health_goals RỖNG + profile KHÔNG có mục tiêu -> vẫn mặc định an toàn, không lỗi', async () => {
    const { service } = buildService({ goalRows: [] });

    // Không gửi current_goal_id -> không đụng tới goal.
    const profile: any = await service.updateProfile(1, { age: 31 } as any);

    expect(profile.age).toBe(31);
    expect(profile.current_goal).toBeNull();
  });

  it('id vượt ngoài danh sách chuẩn -> báo lỗi mục tiêu không tồn tại', async () => {
    const { service } = buildService({ goalRows: [...STANDARD_GOALS] });

    await expect(
      service.updateProfile(1, { current_goal_id: 99 } as any),
    ).rejects.toThrow(/không tồn tại/i);
  });
});
