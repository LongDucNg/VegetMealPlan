import { UserProfile, Gender, ActivityLevel } from "@/features/profile/types";
import { calculateBMI, BMIResult, BMIStatus } from "./bmi";

export interface NutritionGoalInfo {
  goalTitle: string;
  recommendedApproach: string;
  suggestions: string[];
  calorieAdjustment: number;
}

export interface CalorieCalculationResult {
  bmr: number;
  tdee: number;
  dailyCalorieTarget: number;
  calorieAdjustment: number;
  goalTitle: string;
  goalDescription: string;
  recommendedApproach: string;
  suggestions: string[];
  bmiInfo: BMIResult | null;
  bmiStatus: BMIStatus | "Incomplete";
  isProfileComplete: boolean;
  macros: {
    proteinGrams: number;
    carbsGrams: number;
    fatGrams: number;
    proteinPct: number;
    carbsPct: number;
    fatPct: number;
  };
  mealTargets: {
    breakfast: number;
    lunch: number;
    dinner: number;
    snack: number;
  };
}

/**
 * Checks whether user profile has mandatory physical metrics (height & weight)
 */
export function isProfileComplete(profile?: Partial<UserProfile> | null): boolean {
  if (!profile) return false;
  const weight = Number(profile.weight);
  const height = Number(profile.height);
  return Boolean(weight && weight > 0 && height && height > 0);
}

/**
 * Calculates BMR using Mifflin-St Jeor equation:
 * Male: 10 * weight (kg) + 6.25 * height (cm) - 5 * age + 5
 * Female: 10 * weight (kg) + 6.25 * height (cm) - 5 * age - 161
 * Other / Non-binary: 10 * weight (kg) + 6.25 * height (cm) - 5 * age - 78
 */
export function calculateBMR(
  profileOrWeight: Partial<UserProfile> | number,
  explicitHeightCm?: number,
  explicitAge?: number,
  explicitGender?: Gender
): number {
  let weight = 0;
  let height = 0;
  let age = 22;
  let gender: Gender = "male";

  if (typeof profileOrWeight === "object" && profileOrWeight !== null) {
    weight = Number(profileOrWeight.weight) || 0;
    height = Number(profileOrWeight.height) || 0;
    age = Number(profileOrWeight.age) || 22;
    gender = profileOrWeight.gender || "male";
  } else {
    weight = Number(profileOrWeight) || 0;
    height = Number(explicitHeightCm) || 0;
    age = Number(explicitAge) || 22;
    gender = explicitGender || "male";
  }

  if (!weight || !height || weight <= 0 || height <= 0) {
    return 1608;
  }

  const base = 10 * weight + 6.25 * height - 5 * age;
  if (gender === "male") {
    return Math.round(base + 5);
  } else if (gender === "female") {
    return Math.round(base - 161);
  }
  return Math.round(base - 78);
}

/**
 * Maps activity level to multiplier
 */
export function getActivityMultiplier(activityLevel?: ActivityLevel): number {
  switch (activityLevel) {
    case "sedentary":
      return 1.2;
    case "light":
      return 1.375;
    case "moderate":
      return 1.55;
    case "active":
      return 1.725;
    case "very_active":
      return 1.9;
    default:
      return 1.55;
  }
}

/**
 * Calculates TDEE from BMR and activity level
 */
export function calculateTDEE(
  profileOrBmr: Partial<UserProfile> | number,
  explicitActivityLevel?: ActivityLevel
): number {
  if (typeof profileOrBmr === "object" && profileOrBmr !== null) {
    const bmr = calculateBMR(profileOrBmr);
    const multiplier = getActivityMultiplier(profileOrBmr.activityLevel);
    return Math.round(bmr * multiplier);
  }
  const bmr = Number(profileOrBmr) || 1608;
  const multiplier = getActivityMultiplier(explicitActivityLevel);
  return Math.round(bmr * multiplier);
}

/**
 * Dynamic AI Recommendation based on BMI Status (Requirement 2):
 * - UNDERWEIGHT: "Healthy Weight Gain"
 * - BALANCED: "Maintain a Healthy Weight"
 * - OVERWEIGHT: "Healthy Weight Loss"
 */
export function getNutritionGoal(bmiStatus: BMIStatus): NutritionGoalInfo {
  switch (bmiStatus) {
    case "Underweight":
      return {
        goalTitle: "Healthy Weight Gain",
        recommendedApproach:
          "Increase calorie intake gradually with protein-rich plant foods and healthy fats.",
        suggestions: [
          "Tăng lượng calorie hợp lý (calorie surplus)",
          "Ưu tiên protein thực vật",
          "Bổ sung healthy fats (bơ, các loại hạt)",
          "Chia đều calories trong ngày",
          "Không tạo calorie deficit",
        ],
        calorieAdjustment: 350,
      };

    case "Overweight":
      return {
        goalTitle: "Healthy Weight Loss",
        recommendedApproach:
          "Use a moderate calorie deficit while prioritizing protein, fiber and nutrient-dense foods.",
        suggestions: [
          "Tạo calorie deficit vừa phải",
          "Ưu tiên thực phẩm giàu protein và chất xơ",
          "Hạn chế thực phẩm nhiều đường / calorie rỗng",
          "Không giảm calorie quá mức",
        ],
        calorieAdjustment: -450,
      };

    case "Balanced":
    default:
      return {
        goalTitle: "Maintain a Healthy Weight",
        recommendedApproach:
          "Maintain your current calorie needs with balanced plant-based nutrition.",
        suggestions: [
          "Duy trì calorie target",
          "Cân bằng protein / carbs / healthy fats",
          "Đảm bảo đủ chất xơ và vi chất",
          "Duy trì chế độ ăn chay phù hợp",
        ],
        calorieAdjustment: 0,
      };
  }
}

/**
 * Calculates daily calorie target and macro targets based on Profile and BMI Status (Requirement 3 & 13)
 */
export function calculateDailyCalorieTarget(
  profile: Partial<UserProfile>
): CalorieCalculationResult {
  const complete = isProfileComplete(profile);
  const bmiInfo = calculateBMI(profile);
  const bmr = calculateBMR(profile);
  const tdee = calculateTDEE(profile);

  const bmiStatus: BMIStatus = bmiInfo ? bmiInfo.status : "Balanced";
  const goalInfo = getNutritionGoal(bmiStatus);

  // If user explicitly chose a healthGoal in their profile and BMI is balanced, allow subtle refinement
  let calorieAdjustment = goalInfo.calorieAdjustment;
  let goalTitle = goalInfo.goalTitle;
  let recommendedApproach = goalInfo.recommendedApproach;
  let suggestions = goalInfo.suggestions;

  if (bmiStatus === "Balanced" && profile.healthGoal) {
    if (profile.healthGoal === "lose_weight") {
      calorieAdjustment = -350;
      goalTitle = "Healthy Weight Loss";
      recommendedApproach =
        "Use a moderate calorie deficit while prioritizing protein, fiber and nutrient-dense foods.";
      suggestions = [
        "Tạo calorie deficit vừa phải",
        "Ưu tiên thực phẩm giàu protein và chất xơ",
        "Hạn chế thực phẩm nhiều đường / calorie rỗng",
        "Không giảm calorie quá mức",
      ];
    } else if (profile.healthGoal === "gain_weight") {
      calorieAdjustment = 350;
      goalTitle = "Healthy Weight Gain";
      recommendedApproach =
        "Increase calorie intake gradually with protein-rich plant foods and healthy fats.";
      suggestions = [
        "Tăng lượng calorie hợp lý (calorie surplus)",
        "Ưu tiên protein thực vật",
        "Bổ sung healthy fats (bơ, các loại hạt)",
        "Chia đều calories trong ngày",
        "Không tạo calorie deficit",
      ];
    }
  }

  const rawDailyTarget = tdee + calorieAdjustment;
  // Safe floor for healthy plant-based nutrition
  const dailyCalorieTarget = Math.max(1350, Math.round(rawDailyTarget));

  // Macronutrient breakdown: 25% Protein, 50% Carbs, 25% Fat
  let proteinPct = 0.25;
  let carbsPct = 0.50;
  let fatPct = 0.25;

  if (bmiStatus === "Underweight" || profile.healthGoal === "gain_weight") {
    proteinPct = 0.28;
    carbsPct = 0.50;
    fatPct = 0.22;
  } else if (bmiStatus === "Overweight" || profile.healthGoal === "lose_weight") {
    proteinPct = 0.30;
    carbsPct = 0.45;
    fatPct = 0.25;
  }

  const proteinGrams = Math.round((dailyCalorieTarget * proteinPct) / 4);
  const carbsGrams = Math.round((dailyCalorieTarget * carbsPct) / 4);
  const fatGrams = Math.round((dailyCalorieTarget * fatPct) / 9);

  // Meal distribution (Requirement 6):
  // Breakfast: ~22% (~550 kcal)
  // Lunch: ~31% (~750 kcal)
  // Dinner: ~31% (~750 kcal)
  // Snack: ~16% (~400 kcal)
  // Sum = 100% (~2450-2500 kcal when target is 2492)
  const breakfast = Math.round(dailyCalorieTarget * 0.22);
  const lunch = Math.round(dailyCalorieTarget * 0.31);
  const dinner = Math.round(dailyCalorieTarget * 0.31);
  const snack = dailyCalorieTarget - (breakfast + lunch + dinner);

  const mealTargets = {
    breakfast,
    lunch,
    dinner,
    snack: Math.max(200, snack),
  };

  return {
    bmr,
    tdee,
    dailyCalorieTarget,
    calorieAdjustment,
    goalTitle,
    goalDescription: suggestions.join(" · "),
    recommendedApproach,
    suggestions,
    bmiInfo,
    bmiStatus: complete ? bmiStatus : "Incomplete",
    isProfileComplete: complete,
    macros: {
      proteinGrams,
      carbsGrams,
      fatGrams,
      proteinPct: Math.round(proteinPct * 100),
      carbsPct: Math.round(carbsPct * 100),
      fatPct: Math.round(fatPct * 100),
    },
    mealTargets,
  };
}

/**
 * Backward-compatible helper for existing consumers
 */
export function calculateDailyNutrition(profile: UserProfile): CalorieCalculationResult {
  return calculateDailyCalorieTarget(profile);
}

