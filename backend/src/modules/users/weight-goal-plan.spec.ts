/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DEFAULT_GOAL_DURATION_DAYS,
  resolveGoalDirectionDetailed,
  resolveGoalPlan,
} from './weight-goal.util';

// ============================================================
// Chốt mục tiêu cân nặng từ client + hồ sơ.
//
// Bao phủ:
//   - `direction` client gửi -> thắng tuyệt đối (kể cả khi hồ sơ đang đặt
//     mục tiêu KHÁC).
//   - Cân nặng mục tiêu CŨ trong hồ sơ KHÔNG được ghi đè lựa chọn mới.
//   - `health_goals` rỗng (current_goal = null) -> không được âm thầm bỏ qua
//     lựa chọn tăng/giảm của người dùng.
// ============================================================

describe('resolveGoalDirectionDetailed - nguồn quyết định', () => {
  it('client gửi direction -> nguồn là client_direction', () => {
    const r = resolveGoalDirectionDetailed({
      clientDirection: 'gain_muscle',
      healthGoalName: 'lose_weight',
    });

    expect(r.direction).toBe('gain_muscle');
    expect(r.source).toBe('client_direction');
    expect(r.clientDirection).toBe('gain_muscle');
    expect(r.profileDirection).toBe('lose_weight');
  });

  it('client gửi đủ cân nặng -> nguồn là client_weights', () => {
    const r = resolveGoalDirectionDetailed({
      clientHasWeights: true,
      currentWeight: 80,
      targetWeight: 75,
      healthGoalName: 'maintain',
    });

    expect(r.direction).toBe('lose_weight');
    expect(r.source).toBe('client_weights');
  });

  it('chỉ có mục tiêu trong hồ sơ -> nguồn là profile_goal', () => {
    const r = resolveGoalDirectionDetailed({
      healthGoalName: 'gain_muscle',
    });

    expect(r.direction).toBe('gain_muscle');
    expect(r.source).toBe('profile_goal');
  });

  it('không có gì -> mặc định duy trì, nguồn là default_maintain', () => {
    const r = resolveGoalDirectionDetailed({});

    expect(r.direction).toBe('maintain');
    expect(r.source).toBe('default_maintain');
  });

  it('health_goals rỗng + client gửi direction -> vẫn dùng direction của client', () => {
    const r = resolveGoalDirectionDetailed({
      clientDirection: 'lose_weight',
      healthGoalName: null,
    });

    expect(r.direction).toBe('lose_weight');
    expect(r.source).toBe('client_direction');
    expect(r.profileDirection).toBeNull();
  });
});

describe('resolveGoalPlan - chốt cân nặng mục tiêu + thời gian', () => {
  it('client gửi đủ cân nặng -> dùng đúng số client gửi', () => {
    const plan = resolveGoalPlan({
      clientCurrentWeight: 80,
      clientTargetWeight: 75,
      clientDurationDays: 84,
      clientDirection: 'lose_weight',
      profileCurrentWeight: 80,
      profileTargetWeight: 60, // cũ, không khớp
    });

    expect(plan.current_weight_kg).toBe(80);
    expect(plan.target_weight_kg).toBe(75);
    expect(plan.duration_days).toBe(84);
    expect(plan.direction).toBe('lose_weight');
    expect(plan.ignored_profile_target).toBe(false);
    expect(plan.has_goal).toBe(true);
  });

  it('client gửi direction KHÁC hồ sơ -> direction client thắng', () => {
    const plan = resolveGoalPlan({
      clientDirection: 'gain_muscle',
      profileCurrentWeight: 60,
      profileHealthGoalName: 'lose_weight',
    });

    expect(plan.direction).toBe('gain_muscle');
    expect(plan.direction_source).toBe('client_direction');
  });

  it('target_weight_kg CŨ trong hồ sơ KHÔNG ghi đè lựa chọn tăng cân mới', () => {
    const plan = resolveGoalPlan({
      clientDirection: 'gain_muscle',
      profileCurrentWeight: 60,
      // Cân nặng mục tiêu cũ của lần chọn "giảm cân" trước đó.
      profileTargetWeight: 55,
      profileHealthGoalName: 'lose_weight',
    });

    expect(plan.direction).toBe('gain_muscle');
    // Cân nặng mục tiêu cũ (55 < 60) không dùng cho hướng tăng cân.
    expect(plan.target_weight_kg).toBeGreaterThan(60);
    expect(plan.ignored_profile_target).toBe(true);
    expect(plan.warnings.map((w) => w.code)).toContain('PROFILE_TARGET_IGNORED');
  });

  it('target_weight_kg CŨ trong hồ sơ KHÔNG ghi đè lựa chọn giảm cân mới', () => {
    const plan = resolveGoalPlan({
      clientDirection: 'lose_weight',
      profileCurrentWeight: 60,
      // Cân nặng mục tiêu cũ của lần chọn "tăng cân" trước đó.
      profileTargetWeight: 70,
      profileHealthGoalName: 'gain_muscle',
    });

    expect(plan.direction).toBe('lose_weight');
    expect(plan.target_weight_kg).toBeLessThan(60);
    expect(plan.ignored_profile_target).toBe(true);
  });

  it('health_goals RỖNG + client gửi direction=lose_weight -> KHÔNG mặc định maintain', () => {
    const plan = resolveGoalPlan({
      clientDirection: 'lose_weight',
      profileCurrentWeight: 80,
      profileHealthGoalName: null,
    });

    expect(plan.direction).toBe('lose_weight');
    expect(plan.direction_source).toBe('client_direction');
    expect(plan.has_goal).toBe(true);
    expect(plan.target_weight_kg).toBeLessThan(80);
  });

  it('health_goals RỖNG + client gửi direction=gain_muscle -> KHÔNG mặc định maintain', () => {
    const plan = resolveGoalPlan({
      clientDirection: 'gain_muscle',
      profileCurrentWeight: 60,
      profileHealthGoalName: null,
    });

    expect(plan.direction).toBe('gain_muscle');
    expect(plan.target_weight_kg).toBeGreaterThan(60);
  });

  it('health_goals RỖNG + client gửi cân nặng đủ -> suy ra hướng từ chênh lệch', () => {
    const plan = resolveGoalPlan({
      clientCurrentWeight: 80,
      clientTargetWeight: 72,
      clientDurationDays: 84,
      profileHealthGoalName: null,
    });

    expect(plan.direction).toBe('lose_weight');
    expect(plan.direction_source).toBe('client_weights');
  });

  it('không có gì cả -> duy trì (không thâm hụt/thặng dư)', () => {
    const plan = resolveGoalPlan({
      profileCurrentWeight: 80,
      profileHealthGoalName: null,
    });

    expect(plan.direction).toBe('maintain');
    expect(plan.direction_source).toBe('default_maintain');
    // Duy trì -> cân nặng mục tiêu = cân nặng hiện tại (không dao động).
    expect(plan.target_weight_kg).toBe(80);
  });

  it('mục tiêu trong hồ sơ khớp hướng -> dùng cân nặng mục tiêu đã lưu', () => {
    const plan = resolveGoalPlan({
      profileCurrentWeight: 80,
      profileTargetWeight: 75,
      profileTargetDate: '2027-06-01',
      profileHealthGoalName: 'lose_weight',
    });

    expect(plan.direction).toBe('lose_weight');
    expect(plan.target_weight_kg).toBe(75);
    expect(plan.ignored_profile_target).toBe(false);
    // Thời gian suy ra từ target_date.
    expect(plan.duration_days).toBeGreaterThan(0);
  });

  it('mục tiêu trong hồ sơ KHÔNG khớp hướng -> bỏ qua, suy ra lại', () => {
    const plan = resolveGoalPlan({
      profileCurrentWeight: 80,
      // Mục tiêu hồ sơ là "maintain" nhưng cân nặng mục tiêu lệch 10 kg.
      profileTargetWeight: 70,
      profileHealthGoalName: 'maintain',
    });

    expect(plan.direction).toBe('maintain');
    // Dao động > 2 kg -> không dùng cân nặng mục tiêu cũ.
    expect(plan.target_weight_kg).toBe(80);
    expect(plan.ignored_profile_target).toBe(true);
  });

  it('client gửi thiếu dữ liệu -> clientDataIncomplete = true (bắt buộc báo lỗi)', () => {
    const plan = resolveGoalPlan({
      clientTargetWeight: 75,
      clientDirection: 'lose_weight',
      profileCurrentWeight: 80,
    });

    expect(plan.clientProvidedGoal).toBe(true);
    expect(plan.clientDataIncomplete).toBe(true);
  });

  it('client không gửi gì -> clientDataIncomplete = false', () => {
    const plan = resolveGoalPlan({
      profileCurrentWeight: 80,
      profileHealthGoalName: 'maintain',
    });

    expect(plan.clientProvidedGoal).toBe(false);
    expect(plan.clientDataIncomplete).toBe(false);
  });

  it('rõ hướng mục tiêu nhưng thiếu thời gian -> dùng thời gian mặc định', () => {
    const plan = resolveGoalPlan({
      clientDirection: 'lose_weight',
      profileCurrentWeight: 80,
    });

    expect(plan.duration_days).toBe(DEFAULT_GOAL_DURATION_DAYS);
  });
});
