/* eslint-disable @typescript-eslint/no-explicit-any */
import { UsersService } from './users.service';
import { MealPlanService } from '../meal-plan/meal-plan.service';
import { MEAL_SPLIT, resolveDailyCalorieTarget } from './weight-goal.util';

/**
 * Mục 5 của cô: "Làm rõ mục tiêu giảm/tăng bao nhiêu kg và tính lượng calo/ngày để gợi ý menu NHẤT QUÁN".
 * Kiểm: con số trang hồ sơ hiện (GET /users/me/nutrition-summary) và con số backend dùng để lập
 * thực đơn (MealPlanService) luôn bằng nhau, trong mọi kiểu hồ sơ.
 */

const daysFromNow = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const baseUser = (over: Partial<any> = {}) => ({
  user_id: 1,
  age: 25,
  gender: 'male',
  height_cm: 170,
  weight_kg: 70,
  activity_level: 'moderate',
  bmi: 24.2,
  bmi_category: 'normal',
  target_weight_kg: null,
  target_date: null,
  current_goal: { goal_id: 1, name: 'lose_weight' },
  ...over,
});

function profileSummary(user: any) {
  const repo: any = { findOne: async () => user };
  const svc = new UsersService(repo, repo, repo, repo, repo, {} as any);
  return svc.getNutritionSummary(user.user_id);
}

/** kcal mục tiêu mà MealPlanService dùng khi lập thực đơn (cùng nhánh với prepareUserGeneration). */
async function mealPlanTarget(user: any): Promise<number> {
  const svc: any = Object.create(MealPlanService.prototype);
  const assessment = await svc.resolveGoalAssessment(user);
  return assessment
    ? assessment.target_calories
    : svc.calculateTargetCalories(
        user.age,
        user.gender,
        user.height_cm,
        user.weight_kg,
        user.activity_level,
        user.current_goal?.name ?? 'maintain',
      );
}

describe('Calo mục tiêu nhất quán giữa trang hồ sơ và lập thực đơn (mục 5)', () => {
  const cases: [string, any][] = [
    ['giảm cân, chưa đặt cân nặng mục tiêu', baseUser()],
    ['tăng cơ, nữ, ít vận động', baseUser({ gender: 'female', activity_level: 'sedentary', current_goal: { name: 'gain_muscle' } })],
    ['duy trì, giới tính khác', baseUser({ gender: 'other', current_goal: { name: 'maintain' } })],
    ['chưa chọn mục tiêu', baseUser({ current_goal: null })],
    ['giảm 5 kg trong 12 tuần (có cân nặng mục tiêu + ngày đạt)', baseUser({ target_weight_kg: 65, target_date: daysFromNow(84) })],
    ['tăng 3 kg trong 10 tuần', baseUser({ weight_kg: 55, current_goal: { name: 'gain_muscle' }, target_weight_kg: 58, target_date: daysFromNow(70) })],
    ['giảm rất nhanh (cảnh báo, không chặn)', baseUser({ target_weight_kg: 60, target_date: daysFromNow(28) })],
    ['người nhỏ con chạm sàn 1200 kcal', baseUser({ gender: 'female', age: 60, height_cm: 145, weight_kg: 40, activity_level: 'sedentary' })],
  ];

  it.each(cases)('%s: hồ sơ và thực đơn ra cùng một con số', async (_name, user) => {
    const summary: any = await profileSummary(user);
    const plan = await mealPlanTarget(user);
    expect(summary.target_calories).toBe(plan);
    expect(summary.target_calories).toBeGreaterThanOrEqual(1200);
  });

  it('chưa đặt cân nặng mục tiêu: dùng đúng cách lập thực đơn tính (tạm giảm 5% trong 84 ngày) và ghi chú rõ', async () => {
    // BMR = 10×70 + 6,25×170 − 5×25 + 5 = 1642,5; TDEE = 1642,5 × 1,55 = 2545,9
    // Tạm giảm 5% = 3,5 kg trong 84 ngày: 3,5 × 7.700 / 84 ≈ 321 kcal/ngày thâm hụt -> 2225
    // (Trước đây trang hồ sơ hiện TDEE × 0,85 = 2164 trong khi thực đơn dùng 2225: lệch 61 kcal.)
    const summary: any = await profileSummary(baseUser());
    expect(summary.bmr).toBe(1643);
    expect(summary.tdee).toBe(2546);
    expect(summary.target_calories).toBe(2225);
    expect(summary.target_source).toBe('weight_goal');
    const step = summary.explanation.find((s: any) => s.step === 'Calo mục tiêu');
    expect(step.note).toContain('chưa đặt cân nặng mục tiêu');
    expect(step.note).toContain('84 ngày');
  });

  it('có cân nặng mục tiêu + ngày đạt: tính theo số kg và số ngày, giải thích rõ', async () => {
    const user = baseUser({ target_weight_kg: 65, target_date: daysFromNow(84) });
    const summary: any = await profileSummary(user);
    const shared = resolveDailyCalorieTarget({
      ...user,
      current_goal_name: user.current_goal.name,
    });

    expect(summary.target_source).toBe('weight_goal');
    expect(summary.target_calories).toBe(shared.target_calories);
    // 5 kg × 7.700 kcal / 84 ngày ≈ 458 kcal/ngày thâm hụt
    expect(summary.target_calories).toBe(2546 - 458);
    const step = summary.explanation.find((s: any) => s.step === 'Calo mục tiêu');
    expect(step.formula).toContain('giảm 5 kg');
    expect(step.formula).toContain('84 ngày');
    expect(step.note ?? '').not.toContain('chưa đặt');
  });

  it('chia calo theo bữa giống lúc lập thực đơn (22/31/31/16) và cộng lại bằng tổng', async () => {
    const summary: any = await profileSummary(baseUser());
    expect(MEAL_SPLIT).toEqual({ breakfast: 0.22, lunch: 0.31, dinner: 0.31, snack: 0.16 });
    const sum = Object.values(summary.meal_calories as Record<string, number>).reduce((a, b) => a + b, 0);
    expect(Math.abs(sum - summary.target_calories)).toBeLessThanOrEqual(2);
  });
});
