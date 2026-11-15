import { ErrorCode } from '../../common/constants/error-codes.enum';
import { BadRequestException } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import {
  ACTIVITY_FACTOR,
  CALORIE_FLOOR,
  ClientWeightGoal,
  computeEnergy,
  GoalAssessment,
  healthGoalCalorieTarget,
  resolveWeightGoalAssessment,
  WeightGoalDirection,
} from '../users/weight-goal.util';

/**
 * Tính calo mục tiêu và đánh giá mục tiêu cân nặng khi soạn thực đơn (hàm thuần).
 * Tách từ MealPlanService, logic giữ nguyên.
 */

// =========================================================
// HELPER: TÍNH CALO MỤC TIÊU
// =========================================================

/**
 * kcal mục tiêu theo mục tiêu sức khoẻ (khi không có mục tiêu cân nặng).
 * Dùng hàm chung computeEnergy + healthGoalCalorieTarget (users/weight-goal.util) để trang hồ sơ
 * và thực đơn luôn ra cùng một con số.
 */
export function calculateTargetCalories(
  age: number,
  gender: string,
  height: number,
  weight: number,
  activityLevel: string,
  goalName = 'maintain',
): number {
  if (!ACTIVITY_FACTOR[activityLevel]) {
    throw new BadRequestException(
      'Activity level không hợp lệ',
    );
  }

  const { tdee } = computeEnergy({
    age,
    gender,
    height_cm: height,
    weight_kg: weight,
    activity_level: activityLevel,
  });

  return healthGoalCalorieTarget(tdee, goalName).target_calories;
}

/**
 * Chuẩn hoá tên mục tiêu về `WeightGoalDirection`.
 * Tên lạ / rỗng -> 'maintain' (không chặn, chỉ là mặc định an toàn).
 */
export function toWeightGoalDirection(name: string | null | undefined): WeightGoalDirection {
  if (name === 'lose_weight' || name === 'gain_muscle' || name === 'maintain' || name === 'healthy_eating') {
    return name;
  }
  return 'maintain';
}

/**
 * Xác định kcal mục tiêu từ mục tiêu cân nặng (nếu có) và kiểm tra an toàn.
 * Trả về null nếu không có mục tiêu cân nặng nào để áp dụng.
 * Ném BadRequestException nếu mục tiêu cân nặng không hợp lệ.
 */
export async function resolveGoalAssessment(
  user: User,
  goalDto?: ClientWeightGoal,
): Promise<GoalAssessment | null> {
  // Logic chốt mục tiêu cân nặng nằm ở users/weight-goal.util (resolveWeightGoalAssessment),
  // dùng chung với GET /users/me/nutrition-summary để hồ sơ và thực đơn ra cùng kcal.
  return resolveWeightGoalAssessment(
    {
      age: user.age!,
      gender: user.gender!,
      height_cm: user.height_cm!,
      weight_kg: user.weight_kg!,
      activity_level: user.activity_level!,
      target_weight_kg: user.target_weight_kg ?? null,
      target_date: user.target_date ?? null,
      current_goal_name: user.current_goal?.name ?? null,
    },
    goalDto,
  );
}

// =========================================================
// SAVE MEAL PLAN FROM FRONTEND
// =========================================================

/**
 * Chặn kcal mục tiêu không an toàn khi lưu/cập nhật thực đơn.
 * Không cho phép kcal âm, bằng 0 hoặc thấp hơn sàn an toàn đã định.
 */
export function assertSafeCalories(calories: number): void {
  if (!Number.isFinite(calories) || calories < CALORIE_FLOOR) {
    throw new BadRequestException({
      code: ErrorCode.WEIGHT_GOAL_UNSAFE,
      message:
        `Calo mục tiêu ${calories} không an toàn. ` +
        `Mức tối thiểu là ${CALORIE_FLOOR} kcal/ngày.`,
      suggestion:
        'Hãy dùng kcal mục tiêu được hệ thống tính từ hồ sơ, ' +
        'hoặc hỏi ý kiến chuyên gia dinh dưỡng.',
    });
  }
}
