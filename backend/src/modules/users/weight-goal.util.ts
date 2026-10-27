import { BadRequestException } from '@nestjs/common';
import { ErrorCode } from '../../common/constants/error-codes.enum';
import { BODY_LIMITS } from './body-limits';
import { SAFE_GAIN_PER_WEEK, SAFE_LOSS_PER_WEEK } from './nutrition-advice';

/**
 * Luồng "mục tiêu cân nặng → kcal mục tiêu → thực đơn".
 *
 * Tách riêng thành util để 3 luồng dùng chung và báo lỗi giống nhau:
 *   - POST /users/me/recommendations/generate
 *   - POST /meal-plans/generate/weekly  |  /generate/monthly
 *   - POST /users/me/meal-plans (lưu)    |  PATCH /users/me/meal-plans/:id
 *
 * Nguyên tắc an toàn (không được tự tạo mức kcal cực thấp):
 *   1. Thiếu/sai dữ liệu đầu vào → từ chối.
 *   2. Mục tiêu cực đoan (tốc độ thay đổi quá nhanh, thay đổi quá lớn) →
 *      vẫn TÍNH kcal và vẫn sinh thực đơn, chỉ kèm CẢNH BÁO.
 *      KHÔNG chặn, KHÔNG tự đổi dữ liệu của người dùng.
 *   3. BMI không khớp hướng mục tiêu (thiếu cân + giảm, béo phì + tăng) →
 *      cũng chỉ là CẢNH BÁO, không chặn.
 *   4. kcal tính ra luôn >= sàn an toàn, không âm, không bằng 0.
 *   5. Trẻ em (<18 tuổi): không dùng BMI để kết luận tình trạng sức khoẻ.
 */

/** Sàn an toàn kcal/ngày cho người lớn. */
export const CALORIE_FLOOR = 1200;

/** Ngưỡng an toàn giảm cân: không vượt quá 20% TDEE/ngày. */
export const MAX_DEFICIT_RATIO = 0.2;

/** Ngưỡng an toàn tăng cân: không vượt quá 15% TDEE/ngày. */
export const MAX_SURPLUS_RATIO = 0.15;

/** Năng lượng quy đổi: 1 kg cân nặng ~ 7700 kcal. */
const KCAL_PER_KG = 7700;

/** Ngưỡng cân nặng mục tiêu tối đa cách cân nặng hiện tại (kg) trong 1 lần. */
const MAX_TOTAL_CHANGE_KG = 40;

/**
 * Dao động cân nặng được chấp nhận khi mục tiêu là duy trì (kg).
 * 2 kg là mức biến động bình thường do nước, thức ăn, chu kỳ sinh lý.
 */
export const MAINTAIN_TOLERANCE_KG = 2;

/** Cảnh báo (không chặn) khi mục tiêu thay đổi nhanh hơn mức an toàn. */
export interface GoalWarning {
  code: string;
  message: string;
}

/**
 * Thời gian mặc định (ngày) dùng khi client chỉ gửi `direction` mà không gửi
 * cân nặng mục tiêu / thời gian. 84 ngày = 12 tuần — khoảng thời gian phổ biến
 * và tốc độ tương đương mức an toàn (1 kg/tuần giảm, 0,5 kg/tuần tăng).
 */
export const DEFAULT_GOAL_DURATION_DAYS = 84;

/** Đầu vào đầy đủ để chốt mục tiêu cân nặng từ client + hồ sơ. */
export interface GoalPlanContext {
  clientCurrentWeight?: number | null;
  clientTargetWeight?: number | null;
  clientDurationDays?: number | null;
  clientDirection?: WeightGoalDirection | null;
  profileCurrentWeight?: number | null;
  profileTargetWeight?: number | null;
  profileTargetDate?: string | null;
  profileHealthGoalName?: string | null;
  now?: Date;
}

/** Kết quả chốt mục tiêu cân nặng (dùng chung cho mọi luồng). */
export interface ResolvedGoalPlan {
  /** Client có gửi ít nhất 1 trường cân nặng/thời gian hay không. */
  clientProvidedGoal: boolean;
  /** Client gửi dữ liệu mục tiêu nhưng thiếu -> bắt buộc báo lỗi validation. */
  clientDataIncomplete: boolean;
  direction: WeightGoalDirection;
  direction_source: ResolvedGoalDirection['source'];
  current_weight_kg: number | null;
  target_weight_kg: number | null;
  duration_days: number | null;
  /** Cân nặng mục tiêu trong hồ sơ bị bỏ qua vì mâu thuẫn lựa chọn mới. */
  ignored_profile_target: boolean;
  /** Đủ dữ liệu để áp dụng mục tiêu cân nặng (tính kcal theo TDEE ± chênh lệch). */
  has_goal: boolean;
  warnings: GoalWarning[];
}

/**
 * Chốt mục tiêu cân nặng từ dữ liệu client + hồ sơ.
 *
 * Quy tắc ưu tiên (KHÔNG được đảo):
 *   1. `direction` client gửi -> thắng tuyệt đối, kể cả khi hồ sơ đang đặt
 *      mục tiêu khác. KHÔNG để `target_weight_kg` cũ ghi đè lựa chọn mới.
 *   2. Cân nặng client gửi (hiện tại + mục tiêu) -> ý định mới nhất.
 *   3. Mục tiêu sức khoẻ trong hồ sơ (`current_goal`).
 *   4. Cân nặng mục tiêu còn lại trong hồ sơ — CHỈ dùng khi khớp với hướng
 *      đã chốt, nếu không sẽ bị bỏ qua (ghi cảnh báo).
 *   5. Không có gì -> duy trì (kcal = TDEE, không thâm hụt/thặng dư).
 */
export function resolveGoalPlan(ctx: GoalPlanContext): ResolvedGoalPlan {
  const clientProvidedGoal =
    ctx.clientCurrentWeight != null ||
    ctx.clientTargetWeight != null ||
    ctx.clientDurationDays != null;

  const clientHasWeights =
    ctx.clientCurrentWeight != null && ctx.clientTargetWeight != null;

  // Client gửi dữ liệu mục tiêu -> phải đủ cả 3 trường, thiếu là lỗi validation.
  const clientDataIncomplete =
    clientProvidedGoal &&
    !(ctx.clientCurrentWeight != null &&
      ctx.clientTargetWeight != null &&
      ctx.clientDurationDays != null);

  const resolved = resolveGoalDirectionDetailed({
    clientDirection: ctx.clientDirection ?? null,
    clientHasWeights,
    healthGoalName: ctx.profileHealthGoalName ?? null,
    currentWeight: ctx.clientCurrentWeight ?? ctx.profileCurrentWeight ?? null,
    targetWeight: ctx.clientTargetWeight ?? ctx.profileTargetWeight ?? null,
  });
  const direction = resolved.direction;

  const current = ctx.clientCurrentWeight ?? ctx.profileCurrentWeight ?? null;
  const warnings: GoalWarning[] = [];

  // ---- Chốt cân nặng mục tiêu ----
  let target: number | null = null;
  let ignoredProfileTarget = false;

  if (clientHasWeights) {
    // Client gửi đủ cân nặng -> lấy đúng ý định mới nhất.
    target = ctx.clientTargetWeight!;
  } else {
    const profileTarget = ctx.profileTargetWeight ?? null;
    const compatible = isTargetCompatibleWithDirection(profileTarget, current, direction);

    if (profileTarget != null && compatible) {
      target = profileTarget;
    } else if (current != null) {
      // Không có cân nặng mục tiêu hợp lệ -> suy ra theo hướng đã chốt.
      target = inferTargetWeight(current, direction);
      if (profileTarget != null) {
        ignoredProfileTarget = true;
        warnings.push({
          code: 'PROFILE_TARGET_IGNORED',
          message:
            'Cân nặng mục tiêu đã lưu trong hồ sơ không khớp với hướng mục tiêu đang chọn, ' +
            'nên hệ thống tạm tính theo hướng mới. Hãy cập nhật lại cân nặng mục tiêu nếu muốn.',
        });
      }
    } else {
      target = null;
    }
  }

  // ---- Chốt thời gian ----
  let durationDays: number | null = ctx.clientDurationDays ?? null;
  if (durationDays == null && ctx.profileTargetDate) {
    const now = ctx.now ?? new Date();
    const days = Math.ceil(
      (new Date(`${ctx.profileTargetDate}T00:00:00`).getTime() - now.getTime()) /
        86_400_000,
    );
    if (days > 0) durationDays = days;
  }
  // Đã rõ mục tiêu nhưng không có thời gian -> dùng mặc định an toàn.
  if (durationDays == null && target != null && current != null) {
    durationDays = DEFAULT_GOAL_DURATION_DAYS;
  }

  return {
    clientProvidedGoal,
    clientDataIncomplete,
    direction,
    direction_source: resolved.source,
    current_weight_kg: current,
    target_weight_kg: target,
    duration_days: durationDays,
    ignored_profile_target: ignoredProfileTarget,
    has_goal: current != null && target != null && durationDays != null,
    warnings,
  };
}

/** Cân nặng mục tiêu có khớp với hướng mục tiêu đã chốt hay không. */
function isTargetCompatibleWithDirection(
  target: number | null,
  current: number | null,
  direction: WeightGoalDirection,
): boolean {
  if (target == null || current == null) return false;
  const diff = target - current;
  if (direction === 'lose_weight') return diff < 0;
  if (direction === 'gain_muscle') return diff > 0;
  return Math.abs(diff) <= MAINTAIN_TOLERANCE_KG;
}

/** Suy ra cân nặng mục tiêu tạm khi chưa có cân nặng mục tiêu hợp lệ. */
function inferTargetWeight(current: number, direction: WeightGoalDirection): number {
  const step = current * 0.05; // 5% cân nặng hiện tại
  const inferred =
    direction === 'lose_weight'
      ? current - step
      : direction === 'gain_muscle'
        ? current + step
        : current;
  // Giữ 1 chữ số thập phân, tối thiểu 1 kg.
  return Math.max(1, Number(inferred.toFixed(1)));
}

export type WeightGoalDirection = 'lose_weight' | 'gain_muscle' | 'maintain';

/**
 * Hướng mục tiêu + nguồn quyết định, dùng để trả về client rõ ràng
 * hệ thống đang dùng hướng nào và vì sao.
 */
export interface ResolvedGoalDirection {
  direction: WeightGoalDirection;
  /** Hướng do client gửi rõ ràng trong request. */
  clientDirection: WeightGoalDirection | null;
  /** Mục tiêu sức khoẻ đang lưu trong hồ sơ (health_goals.current_goal). */
  profileDirection: WeightGoalDirection | null;
  /** Nguồn quyết định cuối cùng. */
  source: 'client_direction' | 'client_weights' | 'profile_goal' | 'profile_weights' | 'default_maintain';
}

/**
 * Chọn hướng mục tiêu cân nặng.
 *
 * Thứ tự ưu tiên (KHÔNG được đảo — ý định mới của client luôn thắng):
 *   1. `clientDirection` — client gửi rõ ràng trong request.
 *   2. Cân nặng client gửi kèm (hiện tại + mục tiêu) — ý định mới nhất,
 *      suy ra hướng từ chênh lệch cân nặng.
 *   3. `healthGoalName` — mục tiêu sức khoẻ đang chọn trong hồ sơ
 *      (lose_weight / gain_muscle / maintain).
 *   4. Cân nặng mục tiêu còn lại trong hồ sơ — suy ra hướng từ chênh lệch.
 *   5. Mặc định 'maintain' (duy trì, kcal = TDEE, không thâm hụt/thặng dư).
 *
 * Lưu ý: hồ sơ có thể còn `target_weight_kg` tồn đọng từ lần chọn mục tiêu
 * trước, không khớp với mục tiêu sức khoẻ hiện tại. Vì vậy mục tiêu sức khoẻ
 * trong hồ sơ (bước 3) được ưu tiên hơn cân nặng mục tiêu lưu sẵn (bước 4),
 * và 'maintain' từ hồ sơ được xử lý ở tầng trên (bỏ qua cân nặng mục tiêu
 * tồn đọng) thay vì ở đây.
 */
export function resolveGoalDirectionDetailed(params: {
  clientDirection?: WeightGoalDirection | null;
  /** Client gửi đủ cân nặng hiện tại + cân nặng mục tiêu. */
  clientHasWeights?: boolean;
  healthGoalName?: string | null;
  currentWeight?: number | null;
  targetWeight?: number | null;
}): ResolvedGoalDirection {
  const clientDirection = params.clientDirection ?? null;
  const profileDirection =
    params.healthGoalName === 'lose_weight' ||
    params.healthGoalName === 'gain_muscle' ||
    params.healthGoalName === 'maintain'
      ? params.healthGoalName
      : null;

  if (clientDirection) {
    return { direction: clientDirection, clientDirection, profileDirection, source: 'client_direction' };
  }

  const current = params.currentWeight ?? null;
  const target = params.targetWeight ?? null;
  const differs = current != null && target != null && target !== current;

  // 2. Client gửi cân nặng -> ý định mới nhất, suy ra từ chênh lệch.
  if (params.clientHasWeights && differs) {
    const direction = target! < current! ? 'lose_weight' : 'gain_muscle';
    return { direction, clientDirection: null, profileDirection, source: 'client_weights' };
  }

  // 3. Mục tiêu sức khoẻ đang chọn trong hồ sơ.
  if (profileDirection) {
    return { direction: profileDirection, clientDirection: null, profileDirection, source: 'profile_goal' };
  }

  // 4. Cân nặng mục tiêu còn lại trong hồ sơ.
  if (differs) {
    const direction = target! < current! ? 'lose_weight' : 'gain_muscle';
    return { direction, clientDirection: null, profileDirection: null, source: 'profile_weights' };
  }

  // 5. Không có thông tin nào -> duy trì.
  return { direction: 'maintain', clientDirection: null, profileDirection: null, source: 'default_maintain' };
}

/** Rút gọn: chỉ lấy hướng mục tiêu (không cần biết nguồn quyết định). */
export function resolveGoalDirection(params: {
  clientDirection?: WeightGoalDirection | null;
  clientHasWeights?: boolean;
  healthGoalName?: string | null;
  currentWeight?: number | null;
  targetWeight?: number | null;
}): WeightGoalDirection {
  return resolveGoalDirectionDetailed(params).direction;
}

/** Hệ số hoạt động (TDEE = BMR × hệ số). */
export const ACTIVITY_FACTOR: Record<string, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
};

export const ACTIVITY_LABEL: Record<string, string> = {
  sedentary: 'ít vận động',
  light: 'vận động nhẹ',
  moderate: 'vận động vừa',
  active: 'vận động nhiều',
};

/** Tỉ lệ calo theo bữa (tổng = 1). */
export const MEAL_SPLIT = { breakfast: 0.25, lunch: 0.35, dinner: 0.3, snack: 0.1 };

export interface WeightGoalInput {
  current_weight_kg?: number | null;
  target_weight_kg?: number | null;
  /** Số ngày để đạt mục tiêu. */
  duration_days?: number | null;
  direction?: WeightGoalDirection | null;
}

/** Đầu vào đã được kiểm tra hợp lệ (không còn null/undefined). */
export interface ValidWeightGoalInput {
  current_weight_kg: number;
  target_weight_kg: number;
  duration_days: number;
  direction: WeightGoalDirection;
}

export interface ProfileMetrics {
  age: number;
  gender: string;
  height_cm: number;
  weight_kg: number;
  activity_level: string;
}

export interface GoalAssessment {
  valid: boolean;
  direction: WeightGoalDirection;
  current_weight_kg: number;
  target_weight_kg: number;
  duration_days: number;
  change_kg: number;
  weekly_change_kg: number;
  bmi: number;
  bmi_category: string;
  bmr: number;
  tdee: number;
  target_calories: number;
  /** kcal trước khi áp sàn an toàn (để giải thích cho người dùng). */
  raw_target_calories: number;
  floor_applied: boolean;
  meal_calories: { breakfast: number; lunch: number; dinner: number; snack: number };
  /** Thông điệp lỗi cụ thể (rỗng nếu hợp lệ). */
  message: string;
  /** Gợi ý thời gian hợp lý hơn (chuỗi rỗng nếu không cần). */
  suggestion: string;
  note: string;
  /**
   * Cảnh báo KHÔNG chặn (tốc độ thay đổi quá nhanh, BMI không khớp hướng...).
   * Mục tiêu vẫn được tính và vẫn sinh thực đơn.
   */
  warnings: GoalWarning[];
}

const BMI_CATEGORY = (bmi: number) => {
  if (bmi < 18.5) return 'underweight';
  if (bmi < 25) return 'normal';
  if (bmi < 30) return 'overweight';
  return 'obese';
};

const isFiniteNumber = (v: unknown): v is number =>
  typeof v === 'number' && Number.isFinite(v);

/** Số ngày tối thiểu để không đặt mục tiêu tức thời. */
export const MIN_DURATION_DAYS = 1;

function badRequest(code: string, message: string): BadRequestException {
  return new BadRequestException({ code, message });
}

/**
 * Kiểm tra dữ liệu đầu vào của mục tiêu cân nặng.
 * Ném BadRequestException nếu thiếu hoặc sai kiểu dữ liệu.
 */
export function assertValidGoalInput(input: WeightGoalInput): void {
  if (!isFiniteNumber(input.current_weight_kg)) {
    throw badRequest(
      ErrorCode.WEIGHT_GOAL_INVALID,
      'Cần nhập cân nặng hiện tại (kg).',
    );
  }
  if (!isFiniteNumber(input.target_weight_kg)) {
    throw badRequest(
      ErrorCode.WEIGHT_GOAL_INVALID,
      'Cần nhập cân nặng mục tiêu (kg).',
    );
  }
  if (!isFiniteNumber(input.duration_days) || input.duration_days! < MIN_DURATION_DAYS) {
    throw badRequest(
      ErrorCode.WEIGHT_GOAL_INVALID,
      'Cần nhập thời gian đạt mục tiêu (số ngày, tối thiểu 1 ngày).',
    );
  }
  if (input.direction !== 'lose_weight' && input.direction !== 'gain_muscle' && input.direction !== 'maintain') {
    throw badRequest(
      ErrorCode.WEIGHT_GOAL_INVALID,
      'Mục tiêu phải là giảm cân (lose_weight), tăng cân (gain_muscle) hoặc duy trì (maintain).',
    );
  }

  const w = BODY_LIMITS.weight_kg;
  if (input.current_weight_kg! < w.min || input.current_weight_kg! > w.max) {
    throw badRequest(
      ErrorCode.WEIGHT_GOAL_INVALID,
      `Cân nặng hiện tại phải từ ${w.min} đến ${w.max} kg.`,
    );
  }
  if (input.target_weight_kg! < w.min || input.target_weight_kg! > w.max) {
    throw badRequest(
      ErrorCode.WEIGHT_GOAL_INVALID,
      `Cân nặng mục tiêu phải từ ${w.min} đến ${w.max} kg.`,
    );
  }
}

/**
 * Kiểm tra hồ sơ có đủ dữ liệu để tính BMR/TDEE không.
 * Ném BadRequestException nếu thiếu.
 */
export function assertCompleteProfile(profile: Partial<ProfileMetrics>): void {
  const missing: string[] = [];
  if (!isFiniteNumber(profile.age)) missing.push('age');
  if (!profile.gender) missing.push('gender');
  if (!isFiniteNumber(profile.height_cm)) missing.push('height_cm');
  if (!isFiniteNumber(profile.weight_kg)) missing.push('weight_kg');
  if (!profile.activity_level) missing.push('activity_level');

  if (missing.length > 0) {
    throw badRequest(
      ErrorCode.USER_PROFILE_INCOMPLETE,
      `Cần cập nhật hồ sơ trước: thiếu ${missing.join(', ')}`,
    );
  }

  const h = BODY_LIMITS.height_cm;
  const a = BODY_LIMITS.age;
  if (profile.height_cm! < h.min || profile.height_cm! > h.max) {
    throw badRequest(
      ErrorCode.USER_BODY_METRICS_INVALID,
      `Chiều cao phải từ ${h.min} đến ${h.max} cm.`,
    );
  }
  if (profile.age! < a.min || profile.age! > a.max) {
    throw badRequest(
      ErrorCode.USER_BODY_METRICS_INVALID,
      `Tuổi phải từ ${a.min} đến ${a.max}.`,
    );
  }
}

/**
 * Đánh giá mục tiêu cân nặng và tính kcal mục tiêu.
 *
 * KHÔNG ném lỗi khi mục tiêu cực đoan — trả về `valid: false` kèm message +
 * suggestion để tầng trên quyết định trả lỗi validation. Nhờ vậy cùng một
 * logic dùng được cho cả "báo lỗi" (generate) và "cảnh báo" (nutrition summary).
 */
export function assessWeightGoal(
  input: ValidWeightGoalInput,
  profile: ProfileMetrics,
): GoalAssessment {
  const { direction, current, target, durationDays } = {
    direction: input.direction,
    current: input.current_weight_kg,
    target: input.target_weight_kg,
    durationDays: input.duration_days,
  };

  const m = profile.height_cm / 100;
  const bmi = Number((current / (m * m)).toFixed(2));
  const bmi_category = BMI_CATEGORY(bmi);

  const change_kg = Number((target - current).toFixed(2));
  const weeks = durationDays / 7;
  const weekly_change_kg = Number((change_kg / weeks).toFixed(2));

  // ---- Tính BMR / TDEE / kcal mục tiêu (luôn trả về để giải thích được) ----
  const sexOffset = profile.gender === 'male' ? 5 : profile.gender === 'female' ? -161 : -78;
  const bmr = 10 * profile.weight_kg + 6.25 * profile.height_cm - 5 * profile.age + sexOffset;
  const activityFactor = ACTIVITY_FACTOR[profile.activity_level] ?? ACTIVITY_FACTOR.sedentary;
  const tdee = bmr * activityFactor;

  // Chênh lệch kcal theo tốc độ mong muốn, nhưng bị chặn bởi ngưỡng an toàn.
  // 'maintain' -> không thâm hụt, không thặng dư: kcal mục tiêu = TDEE.
  const desiredDelta = (Math.abs(change_kg) * KCAL_PER_KG) / durationDays;
  const maxDelta =
    direction === 'maintain'
      ? 0
      : tdee * (direction === 'lose_weight' ? MAX_DEFICIT_RATIO : MAX_SURPLUS_RATIO);
  const appliedDelta = Math.min(desiredDelta, maxDelta);

  const rawTarget =
    direction === 'maintain'
      ? tdee
      : direction === 'lose_weight'
        ? tdee - appliedDelta
        : tdee + appliedDelta;
  const floorApplied = rawTarget < CALORIE_FLOOR;
  const targetCalories = Math.max(Math.round(rawTarget), CALORIE_FLOOR);

  const base: GoalAssessment = {
    valid: false,
    direction,
    current_weight_kg: current,
    target_weight_kg: target,
    duration_days: durationDays,
    change_kg,
    weekly_change_kg,
    bmi,
    bmi_category,
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    target_calories: targetCalories,
    raw_target_calories: Math.round(rawTarget),
    floor_applied: floorApplied,
    meal_calories: {
      breakfast: Math.round(targetCalories * MEAL_SPLIT.breakfast),
      lunch: Math.round(targetCalories * MEAL_SPLIT.lunch),
      dinner: Math.round(targetCalories * MEAL_SPLIT.dinner),
      snack: Math.round(targetCalories * MEAL_SPLIT.snack),
    },
    message: '',
    suggestion: '',
    note: '',
    warnings: [],
  };

  // ---- Hướng mục tiêu không khớp với chênh lệch cân nặng ----
  // Đây là dữ liệu MÂU THUẪN NỘI TẠI (không phải rủi ro sức khoẻ) -> vẫn
  // chặn, vì không thể vừa "giảm cân" vừa có cân nặng mục tiêu cao hơn hiện tại.
  if (direction === 'lose_weight' && change_kg >= 0) {
    return {
      ...base,
      message: `Mục tiêu là giảm cân nhưng cân nặng mục tiêu (${target} kg) không thấp hơn cân nặng hiện tại (${current} kg).`,
      suggestion: 'Hãy chọn cân nặng mục tiêu nhỏ hơn cân nặng hiện tại.',
    };
  }
  if (direction === 'gain_muscle' && change_kg <= 0) {
    return {
      ...base,
      message: `Mục tiêu là tăng cân nhưng cân nặng mục tiêu (${target} kg) không cao hơn cân nặng hiện tại (${current} kg).`,
      suggestion: 'Hãy chọn cân nặng mục tiêu lớn hơn cân nặng hiện tại.',
    };
  }

  // ---- Duy trì cân nặng: không thâm hụt, không thặng dư ----
  // kcal mục tiêu = TDEE. Chênh lệch cân nặng nhỏ (dưới 2 kg) vẫn chấp nhận
  // được vì đây là dao động bình thường; lệch lớn thì báo lỗi để người dùng
  // chọn đúng mục tiêu.
  if (direction === 'maintain') {
    if (Math.abs(change_kg) > MAINTAIN_TOLERANCE_KG) {
      return {
        ...base,
        message:
          `Mục tiêu là duy trì cân nặng nhưng cân nặng mục tiêu lệch ${Math.abs(change_kg)} kg so với hiện tại.`,
        suggestion:
          change_kg < 0
            ? 'Hãy chọn mục tiêu giảm cân (lose_weight) nếu bạn muốn giảm cân.'
            : 'Hãy chọn mục tiêu tăng cân (gain_muscle) nếu bạn muốn tăng cân.',
      };
    }

    return {
      ...base,
      valid: true,
      message: floorApplied
        ? `Calo mục tiêu tính ra ${Math.round(rawTarget)} kcal, thấp hơn mức sàn an toàn ${CALORIE_FLOOR} kcal nên được nâng lên ${CALORIE_FLOOR} kcal.`
        : '',
      suggestion: '',
      note:
        'Kcal mục tiêu bằng TDEE (mức tiêu hao) để duy trì cân nặng — không thâm hụt, không thặng dư. ' +
        'Đây là ước tính theo công thức Mifflin-St Jeor, chỉ mang tính tham khảo, không thay thế tư vấn y tế.',
    };
  }

  // ---- Cảnh báo KHÔNG chặn ----
  // Mục tiêu quá nhanh / quá lớn / BMI không khớp hướng: vẫn TÍNH kcal và vẫn
  // sinh thực đơn, chỉ kèm cảnh báo để người dùng tự quyết định.
  const warnings: GoalWarning[] = [];

  // Mục tiêu cực đoan về lượng thay đổi -> cảnh báo, không chặn.
  if (Math.abs(change_kg) > MAX_TOTAL_CHANGE_KG) {
    warnings.push({
      code: 'WEIGHT_CHANGE_TOO_LARGE',
      message: `Chênh lệch ${Math.abs(change_kg)} kg là thay đổi rất lớn. Hãy cân nhắc chia nhỏ thành nhiều giai đoạn, mỗi giai đoạn không quá ${MAX_TOTAL_CHANGE_KG} kg, hoặc hỏi ý kiến chuyên gia dinh dưỡng.`,
    });
  }

  // Tốc độ thay đổi quá nhanh -> cảnh báo, KHÔNG chặn, KHÔNG tự đổi dữ liệu.
  const safeRate = direction === 'lose_weight' ? SAFE_LOSS_PER_WEEK : SAFE_GAIN_PER_WEEK;
  const pace = Math.abs(weekly_change_kg);
  if (pace > safeRate) {
    const neededDays = Math.ceil((Math.abs(change_kg) / safeRate) * 7);
    const weeksNeeded = Math.ceil(neededDays / 7);
    warnings.push({
      code: 'WEIGHT_PACE_TOO_FAST',
      message:
        direction === 'lose_weight'
          ? `Giảm ${Math.abs(change_kg)} kg trong ${durationDays} ngày là khoảng ${pace} kg/tuần, nhanh hơn mức an toàn ${safeRate} kg/tuần.`
          : `Tăng ${change_kg} kg trong ${durationDays} ngày là khoảng ${pace} kg/tuần, nhanh hơn mức hợp lý ${safeRate} kg/tuần.`,
    });
    warnings.push({
      code: 'WEIGHT_PACE_SUGGESTION',
      message: `Để đạt mục tiêu ở tốc độ an toàn, hãy đặt khoảng ${weeksNeeded} tuần trở lên.`,
    });
  }

  // BMI không khớp hướng mục tiêu -> cảnh báo, KHÔNG chặn.
  // Yêu cầu: không chặn tăng/giảm chỉ vì BMI thuộc nhóm thiếu cân, bình
  // thường, thừa cân hay béo phì.
  if (bmi_category === 'underweight' && direction === 'lose_weight') {
    warnings.push({
      code: 'BMI_GOAL_CONFLICT',
      message: `BMI của bạn là ${bmi} (thiếu cân) nên mục tiêu giảm cân có thể không phù hợp. Hãy cân nhắc mục tiêu duy trì hoặc tăng cân, hoặc hỏi ý kiến chuyên gia dinh dưỡng.`,
    });
  }
  if (bmi_category === 'obese' && direction === 'gain_muscle') {
    warnings.push({
      code: 'BMI_GOAL_CONFLICT',
      message: `BMI của bạn là ${bmi} (béo phì) nên mục tiêu tăng cân có thể không phù hợp. Hãy cân nhắc mục tiêu giảm cân hoặc duy trì, hoặc hỏi ý kiến chuyên gia dinh dưỡng.`,
    });
  }

  // Trẻ em (<18 tuổi): không kết luận sức khoẻ dựa trên BMI -> cảnh báo.
  if (profile.age < 18) {
    warnings.push({
      code: 'MINOR_AGE_BMI_NOT_APPLIED',
      message:
        'Bạn dưới 18 tuổi nên hệ thống không dùng BMI để kết luận tình trạng sức khoẻ. ' +
        'Hãy trao đổi với bác sĩ hoặc chuyên gia dinh dưỡng để được hướng dẫn phù hợp.',
    });
  }

  return {
    ...base,
    valid: true,
    message: floorApplied
      ? `Calo mục tiêu tính ra ${Math.round(rawTarget)} kcal, thấp hơn mức sàn an toàn ${CALORIE_FLOOR} kcal nên được nâng lên ${CALORIE_FLOOR} kcal.`
      : '',
    suggestion: '',
    note:
      'Kcal là ước tính theo công thức Mifflin-St Jeor và tốc độ thay đổi cân nặng mong muốn, ' +
      'chỉ mang tính tham khảo — không phải cam kết giảm/tăng cân chính xác, không thay thế tư vấn y tế.',
    warnings,
  };
}
