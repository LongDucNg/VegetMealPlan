/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  assessWeightGoal,
  assertValidGoalInput,
  CALORIE_FLOOR,
  resolveGoalDirection,
} from './weight-goal.util';

// ============================================================
// Mục tiêu cân nặng → tính kcal → kiểm tra an toàn.
//
// Bao phủ:
//   - Dữ liệu hợp lệ   -> tính BMI/BMR/TDEE/kcal, không lỗi.
//   - Dữ liệu sai/thiếu -> ném lỗi validation.
//   - Mục tiêu cực đoan  -> từ chối, KHÔNG sinh kcal cực thấp.
// ============================================================

const PROFILE = {
  age: 30,
  gender: 'male',
  height_cm: 175,
  weight_kg: 80,
  activity_level: 'moderate',
};

describe('weight-goal.util - validate đầu vào', () => {
  it('thiếu cân nặng hiện tại -> ném lỗi', () => {
    expect(() =>
      assertValidGoalInput({
        current_weight_kg: undefined,
        target_weight_kg: 70,
        duration_days: 90,
        direction: 'lose_weight',
      }),
    ).toThrow(/cân nặng hiện tại/i);
  });

  it('thiếu thời gian đạt mục tiêu -> ném lỗi', () => {
    expect(() =>
      assertValidGoalInput({
        current_weight_kg: 80,
        target_weight_kg: 70,
        duration_days: undefined,
        direction: 'lose_weight',
      }),
    ).toThrow(/thời gian đạt mục tiêu/i);
  });

  it('hướng mục tiêu không hợp lệ -> ném lỗi', () => {
    expect(() =>
      assertValidGoalInput({
        current_weight_kg: 80,
        target_weight_kg: 70,
        duration_days: 90,
        direction: 'giảm_cân' as any,
      }),
    ).toThrow(/giảm cân|tăng cân|duy trì/i);
  });

  it('hướng duy trì (maintain) -> hợp lệ', () => {
    expect(() =>
      assertValidGoalInput({
        current_weight_kg: 80,
        target_weight_kg: 80,
        duration_days: 90,
        direction: 'maintain',
      }),
    ).not.toThrow();
  });

  it('cân nặng ngoài khoảng hợp lệ -> ném lỗi', () => {
    expect(() =>
      assertValidGoalInput({
        current_weight_kg: 5,
        target_weight_kg: 70,
        duration_days: 90,
        direction: 'lose_weight',
      }),
    ).toThrow(/cân nặng hiện tại/i);
  });
});

describe('weight-goal.util - đánh giá mục tiêu hợp lệ', () => {
  it('giảm 5 kg trong 12 tuần -> hợp lệ, tính đúng BMI/BMR/TDEE', () => {
    const result = assessWeightGoal(
      {
        current_weight_kg: 80,
        target_weight_kg: 75,
        duration_days: 84,
        direction: 'lose_weight',
      },
      PROFILE,
    );

    expect(result.valid).toBe(true);
    expect(result.message).toBe('');

    // BMI = 80 / 1,75^2 = 26,12
    expect(result.bmi).toBeCloseTo(26.12, 1);
    expect(result.bmi_category).toBe('overweight');

    // BMR (Mifflin-St Jeor) = 10*80 + 6,25*175 − 5*30 + 5 = 1748,75
    expect(result.bmr).toBe(1749);
    // TDEE = 1748,75 * 1,55
    expect(result.tdee).toBe(2711);

    // 5 kg / 12 tuần = 0,42 kg/tuần -> an toàn
    expect(result.weekly_change_kg).toBeCloseTo(-0.42, 2);
    expect(result.change_kg).toBe(-5);
  });

  it('kcal mục tiêu luôn lớn hơn 0 và không thấp hơn sàn an toàn', () => {
    const result = assessWeightGoal(
      {
        current_weight_kg: 80,
        target_weight_kg: 75,
        duration_days: 84,
        direction: 'lose_weight',
      },
      PROFILE,
    );

    expect(result.target_calories).toBeGreaterThan(0);
    expect(result.target_calories).toBeGreaterThanOrEqual(CALORIE_FLOOR);
    expect(result.target_calories).toBeLessThan(result.tdee);
  });

  it('kcal mục tiêu được chia theo bữa và tổng bằng mục tiêu', () => {
    const result = assessWeightGoal(
      {
        current_weight_kg: 80,
        target_weight_kg: 75,
        duration_days: 84,
        direction: 'lose_weight',
      },
      PROFILE,
    );

    const sum =
      result.meal_calories.breakfast +
      result.meal_calories.lunch +
      result.meal_calories.dinner +
      result.meal_calories.snack;

    expect(sum).toBeCloseTo(result.target_calories, -1);
  });

  it('tăng cân hợp lệ -> kcal mục tiêu lớn hơn TDEE', () => {
    const result = assessWeightGoal(
      {
        current_weight_kg: 60,
        target_weight_kg: 63,
        duration_days: 84,
        direction: 'gain_muscle',
      },
      { ...PROFILE, weight_kg: 60 },
    );

    expect(result.valid).toBe(true);
    expect(result.target_calories).toBeGreaterThan(result.tdee);
  });

  // ==========================================================
  // DUY TRÌ: kcal = TDEE, không thâm hụt, không thặng dư.
  // ==========================================================
  it('duy trì -> kcal mục tiêu BẰNG TDEE (không thâm hụt/thặng dư)', () => {
    const result = assessWeightGoal(
      {
        current_weight_kg: 80,
        target_weight_kg: 80,
        duration_days: 84,
        direction: 'maintain',
      },
      PROFILE,
    );

    expect(result.valid).toBe(true);
    expect(result.target_calories).toBe(result.tdee);
    expect(result.raw_target_calories).toBe(result.tdee);
    expect(result.floor_applied).toBe(false);
  });

  it('duy trì -> dao động nhỏ (<= 2 kg) vẫn hợp lệ, kcal vẫn = TDEE', () => {
    const result = assessWeightGoal(
      {
        current_weight_kg: 80,
        target_weight_kg: 82,
        duration_days: 84,
        direction: 'maintain',
      },
      PROFILE,
    );

    expect(result.valid).toBe(true);
    expect(result.target_calories).toBe(result.tdee);
  });

  it('duy trì nhưng lệch > 2 kg -> từ chối và gợi ý đổi mục tiêu', () => {
    const result = assessWeightGoal(
      {
        current_weight_kg: 80,
        target_weight_kg: 70,
        duration_days: 84,
        direction: 'maintain',
      },
      PROFILE,
    );

    expect(result.valid).toBe(false);
    expect(result.message).toMatch(/duy trì/i);
    expect(result.suggestion).toMatch(/giảm cân|tăng cân/i);
  });

  it('ghi rõ kcal là ước tính, không phải cam kết', () => {
    const result = assessWeightGoal(
      {
        current_weight_kg: 80,
        target_weight_kg: 75,
        duration_days: 84,
        direction: 'lose_weight',
      },
      PROFILE,
    );

    expect(result.note).toMatch(/ước tính/i);
    expect(result.note).toMatch(/không phải cam kết/i);
  });
});

describe('weight-goal.util - mục tiêu cực đoan (KHÔNG chặn, chỉ cảnh báo)', () => {
  it('giảm 10 kg trong 5 ngày -> vẫn hợp lệ, KHÔNG trả kcal cực thấp', () => {
    const result = assessWeightGoal(
      {
        current_weight_kg: 80,
        target_weight_kg: 70,
        duration_days: 5,
        direction: 'lose_weight',
      },
      PROFILE,
    );

    // Mục tiêu quá nhanh KHÔNG bị chặn -> vẫn sinh được thực đơn.
    expect(result.valid).toBe(true);
    // 10 kg / 5 ngày = -14 kg/tuần -> vượt xa ngưỡng 1 kg/tuần
    expect(result.weekly_change_kg).toBe(-14);

    // Quan trọng: không được tạo ra mức kcal cực thấp.
    expect(result.target_calories).toBeGreaterThanOrEqual(CALORIE_FLOOR);
  });

  it('giảm 10 kg trong 5 ngày -> có cảnh báo tốc độ quá nhanh', () => {
    const result = assessWeightGoal(
      {
        current_weight_kg: 80,
        target_weight_kg: 70,
        duration_days: 5,
        direction: 'lose_weight',
      },
      PROFILE,
    );

    const codes = result.warnings.map((w) => w.code);
    expect(codes).toContain('WEIGHT_PACE_TOO_FAST');
    expect(codes).toContain('WEIGHT_PACE_SUGGESTION');

    const paceWarning = result.warnings.find((w) => w.code === 'WEIGHT_PACE_TOO_FAST');
    expect(paceWarning?.message).toMatch(/an toàn/i);
    expect(paceWarning?.message).toMatch(/kg\/tuần/);

    // Gợi ý thời gian hợp lý hơn vẫn phải có.
    const suggestion = result.warnings.find((w) => w.code === 'WEIGHT_PACE_SUGGESTION');
    expect(suggestion?.message).toMatch(/tuần/i);
  });

  it('giảm 10 kg trong 5 ngày -> không tự đổi mục tiêu của người dùng', () => {
    const result = assessWeightGoal(
      {
        current_weight_kg: 80,
        target_weight_kg: 70,
        duration_days: 5,
        direction: 'lose_weight',
      },
      PROFILE,
    );

    // Mục tiêu phải được giữ nguyên, không bị "sửa" về mức an toàn.
    expect(result.target_weight_kg).toBe(70);
    expect(result.current_weight_kg).toBe(80);
    expect(result.duration_days).toBe(5);
  });

  it('tăng cân quá nhanh (> 0,5 kg/tuần) -> cảnh báo, không chặn', () => {
    const result = assessWeightGoal(
      {
        current_weight_kg: 60,
        target_weight_kg: 66,
        duration_days: 28,
        direction: 'gain_muscle',
      },
      { ...PROFILE, weight_kg: 60 },
    );

    expect(result.valid).toBe(true);
    expect(result.weekly_change_kg).toBe(1.5);
    expect(result.warnings.map((w) => w.code)).toContain('WEIGHT_PACE_TOO_FAST');
    // Vẫn phải tính ra kcal tăng cân (lớn hơn TDEE).
    expect(result.target_calories).toBeGreaterThan(result.tdee);
  });

  it('chênh lệch quá lớn (> 40 kg) -> cảnh báo, không chặn', () => {
    const result = assessWeightGoal(
      {
        current_weight_kg: 200,
        target_weight_kg: 150,
        duration_days: 365,
        direction: 'lose_weight',
      },
      { ...PROFILE, weight_kg: 200 },
    );

    expect(result.valid).toBe(true);
    const warning = result.warnings.find((w) => w.code === 'WEIGHT_CHANGE_TOO_LARGE');
    expect(warning?.message).toMatch(/lớn/i);
  });

  it('mục tiêu giảm cân nhưng cân nặng mục tiêu cao hơn -> từ chối (mâu thuẫn nội tại)', () => {
    const result = assessWeightGoal(
      {
        current_weight_kg: 80,
        target_weight_kg: 85,
        duration_days: 84,
        direction: 'lose_weight',
      },
      PROFILE,
    );

    expect(result.valid).toBe(false);
    expect(result.message).toMatch(/không thấp hơn/i);
  });

  it('người dưới 18 tuổi -> không dùng BMI để kết luận, cảnh báo thay vì chặn', () => {
    const result = assessWeightGoal(
      {
        current_weight_kg: 50,
        target_weight_kg: 47,
        duration_days: 84,
        direction: 'lose_weight',
      },
      { ...PROFILE, age: 16, weight_kg: 50 },
    );

    expect(result.valid).toBe(true);
    const warning = result.warnings.find((w) => w.code === 'MINOR_AGE_BMI_NOT_APPLIED');
    expect(warning?.message).toMatch(/18 tuổi/i);
  });

  it('BMI thiếu cân nhưng muốn giảm cân -> cảnh báo, KHÔNG chặn', () => {
    const result = assessWeightGoal(
      {
        current_weight_kg: 50,
        target_weight_kg: 47,
        duration_days: 84,
        direction: 'lose_weight',
      },
      { ...PROFILE, age: 30, weight_kg: 50 },
    );

    expect(result.valid).toBe(true);
    // Vẫn tính ra kcal mục tiêu cho chế độ giảm cân.
    expect(result.target_calories).toBeGreaterThan(0);
    expect(result.target_calories).toBeLessThan(result.tdee);

    const warning = result.warnings.find((w) => w.code === 'BMI_GOAL_CONFLICT');
    expect(warning?.message).toMatch(/thiếu cân/i);
  });

  it('BMI béo phì nhưng muốn tăng cân -> cảnh báo, KHÔNG chặn', () => {
    const result = assessWeightGoal(
      {
        current_weight_kg: 110,
        target_weight_kg: 115,
        duration_days: 84,
        direction: 'gain_muscle',
      },
      { ...PROFILE, weight_kg: 110 },
    );

    expect(result.valid).toBe(true);
    // Vẫn tính ra kcal mục tiêu cho chế độ tăng cân.
    expect(result.target_calories).toBeGreaterThan(result.tdee);

    const warning = result.warnings.find((w) => w.code === 'BMI_GOAL_CONFLICT');
    expect(warning?.message).toMatch(/béo phì/i);
  });

  it('BMI bình thường + giảm cân -> không cảnh báo mâu thuẫn BMI', () => {
    const result = assessWeightGoal(
      {
        current_weight_kg: 65,
        target_weight_kg: 60,
        duration_days: 84,
        direction: 'lose_weight',
      },
      { ...PROFILE, weight_kg: 65 },
    );

    expect(result.valid).toBe(true);
    expect(result.bmi_category).toBe('normal');
    expect(result.warnings.map((w) => w.code)).not.toContain('BMI_GOAL_CONFLICT');
  });
});


// ============================================================
// Chọn hướng mục tiêu (ưu tiên ý định client > mục tiêu sức khoẻ).
// ============================================================
describe('weight-goal.util - resolveGoalDirection', () => {
  it('client gửi hướng rõ -> ưu tiên hướng client', () => {
    expect(
      resolveGoalDirection({
        clientDirection: 'maintain',
        healthGoalName: 'lose_weight',
        currentWeight: 80,
        targetWeight: 75,
      }),
    ).toBe('maintain');
  });

  it('client gửi cân nặng -> suy ra hướng từ chênh lệch, bỏ qua mục tiêu sức khoẻ', () => {
    expect(
      resolveGoalDirection({
        clientHasWeights: true,
        healthGoalName: 'lose_weight',
        currentWeight: 80,
        targetWeight: 85,
      }),
    ).toBe('gain_muscle');
  });

  it('không có client data -> lấy mục tiêu sức khoẻ trong hồ sơ', () => {
    expect(
      resolveGoalDirection({
        healthGoalName: 'gain_muscle',
        currentWeight: 80,
        targetWeight: 75,
      }),
    ).toBe('gain_muscle');
  });

  it('mục tiêu sức khoẻ maintain + cân nặng mục tiêu tồn đọng -> maintain', () => {
    expect(
      resolveGoalDirection({
        healthGoalName: 'maintain',
        currentWeight: 80,
        targetWeight: 75,
      }),
    ).toBe('maintain');
  });

  it('không có gì cả -> mặc định maintain (duy trì)', () => {
    expect(
      resolveGoalDirection({
        currentWeight: 80,
        targetWeight: null,
      }),
    ).toBe('maintain');
  });
});
