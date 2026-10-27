import { BmiCategory } from './entities/user.entity';

/**
 * Phần "giải thích và khuyến cáo" cho GET /users/me/nutrition-summary.
 * Chỉ CẢNH BÁO, không chặn: thực đơn vẫn được soạn theo mục tiêu user đã chọn.
 */

export interface NutritionWarning {
  code: string;
  message: string;
}

export interface ExplanationStep {
  step: string;
  formula: string;
  result: number;
  unit: string;
  note?: string;
}

/** Tốc độ thay đổi cân nặng được coi là an toàn (kg/tuần). */
export const SAFE_LOSS_PER_WEEK = 1;
export const SAFE_GAIN_PER_WEEK = 0.5;

const GOAL_LABEL: Record<string, string> = {
  lose_weight: 'giảm cân',
  gain_muscle: 'tăng cơ',
  maintain: 'duy trì',
};

export const fmt = (n: number, digits = 0) =>
  n.toLocaleString('vi-VN', { minimumFractionDigits: 0, maximumFractionDigits: digits });

/** Mâu thuẫn giữa BMI và mục tiêu sức khoẻ. */
export function bmiGoalWarnings(bmi: number | null, category: BmiCategory | null, goal: string): NutritionWarning[] {
  if (!bmi || !category) return [];
  if (category === BmiCategory.UNDERWEIGHT && goal === 'lose_weight') {
    return [
      {
        code: 'BMI_GOAL_CONFLICT',
        message: `BMI của bạn là ${fmt(bmi, 1)} (thiếu cân) nhưng mục tiêu đang là giảm cân. Nên chuyển sang duy trì hoặc tăng cơ, hoặc hỏi ý kiến chuyên gia dinh dưỡng.`,
      },
    ];
  }
  if ((category === BmiCategory.OVERWEIGHT || category === BmiCategory.OBESE) && goal === 'gain_muscle') {
    return [
      {
        code: 'BMI_GOAL_CONFLICT',
        message: `BMI của bạn là ${fmt(bmi, 1)} (${category === BmiCategory.OBESE ? 'béo phì' : 'thừa cân'}) nhưng mục tiêu đang là tăng cơ, tức là ăn dư calo. Nên cân nhắc giảm cân hoặc duy trì.`,
      },
    ];
  }
  return [];
}

/** Tiến độ và cảnh báo cho mục tiêu cụ thể (target_weight_kg, target_date). */
export function goalProgress(
  weight: number,
  height_cm: number,
  goal: string,
  target_weight_kg: number | null,
  target_date: string | null,
  today = new Date(),
) {
  const warnings: NutritionWarning[] = [];
  if (target_weight_kg == null) return { progress: null, warnings };

  const change = Number((target_weight_kg - weight).toFixed(1));
  let weeks_left: number | null = null;
  let weekly_change_kg: number | null = null;

  if (target_date) {
    const days = Math.ceil((new Date(`${target_date}T00:00:00`).getTime() - today.getTime()) / 86_400_000);
    if (days <= 0) {
      warnings.push({ code: 'TARGET_DATE_PASSED', message: 'Ngày mục tiêu đã qua, hãy đặt lại ngày mới.' });
    } else {
      weeks_left = Number((days / 7).toFixed(1));
      weekly_change_kg = Number((change / (days / 7)).toFixed(2));
      const pace = Math.abs(weekly_change_kg);
      if (change < 0 && pace > SAFE_LOSS_PER_WEEK) {
        warnings.push({
          code: 'TARGET_PACE_TOO_FAST',
          message: `Giảm ${fmt(Math.abs(change), 1)} kg trong ${fmt(weeks_left, 1)} tuần là khoảng ${fmt(pace, 2)} kg/tuần, nhanh hơn mức an toàn ${SAFE_LOSS_PER_WEEK} kg/tuần. Nên lùi ngày mục tiêu.`,
        });
      }
      if (change > 0 && pace > SAFE_GAIN_PER_WEEK) {
        warnings.push({
          code: 'TARGET_PACE_TOO_FAST',
          message: `Tăng ${fmt(change, 1)} kg trong ${fmt(weeks_left, 1)} tuần là khoảng ${fmt(pace, 2)} kg/tuần, nhanh hơn mức hợp lý ${SAFE_GAIN_PER_WEEK} kg/tuần. Nên lùi ngày mục tiêu.`,
        });
      }
    }
  }

  if (goal === 'lose_weight' && change >= 0) {
    warnings.push({
      code: 'TARGET_GOAL_MISMATCH',
      message: `Mục tiêu là giảm cân nhưng cân nặng muốn đạt (${fmt(target_weight_kg, 1)} kg) không thấp hơn hiện tại (${fmt(weight, 1)} kg).`,
    });
  } else if (goal === 'gain_muscle' && change <= 0) {
    warnings.push({
      code: 'TARGET_GOAL_MISMATCH',
      message: `Mục tiêu là tăng cơ nhưng cân nặng muốn đạt (${fmt(target_weight_kg, 1)} kg) không cao hơn hiện tại (${fmt(weight, 1)} kg).`,
    });
  } else if (goal === 'maintain' && Math.abs(change) > 2) {
    warnings.push({
      code: 'TARGET_GOAL_MISMATCH',
      message: `Mục tiêu là duy trì nhưng cân nặng muốn đạt lệch ${fmt(Math.abs(change), 1)} kg so với hiện tại. Nên chọn mục tiêu ${change < 0 ? 'giảm cân' : 'tăng cơ'}.`,
    });
  }

  const m = height_cm / 100;
  const target_bmi = Number((target_weight_kg / (m * m)).toFixed(1));
  if (target_bmi < 18.5) {
    warnings.push({
      code: 'TARGET_BMI_UNDERWEIGHT',
      message: `Ở ${fmt(target_weight_kg, 1)} kg, BMI của bạn sẽ là ${fmt(target_bmi, 1)} (thiếu cân). Nên chọn cân nặng mục tiêu cao hơn.`,
    });
  }

  return {
    progress: { target_weight_kg, target_date, change_kg: change, weeks_left, weekly_change_kg, target_bmi },
    warnings,
  };
}

export const goalLabel = (goal: string) => GOAL_LABEL[goal] ?? goal;
