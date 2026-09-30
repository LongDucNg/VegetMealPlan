import { UserProfile } from "@/features/profile/types";

export type BMIStatus = "Underweight" | "Balanced" | "Overweight";

export interface BMIResult {
  bmi: number;
  formattedBMI: string;
  category: BMIStatus;
  status: BMIStatus;
  colorClass: string;
  badgeVariant: "default" | "success" | "warning" | "danger";
  healthyWeightRange: { min: number; max: number };
  description: string;
}

/**
 * Classifies BMI into the 3 primary states defined in requirements:
 * 1. UNDERWEIGHT: BMI < 18.5
 * 2. NORMAL / BALANCED: 18.5 <= BMI < 25
 * 3. OVERWEIGHT: BMI >= 25
 */
export function getBMIStatus(bmi: number): BMIStatus {
  if (bmi < 18.5) {
    return "Underweight";
  }
  if (bmi < 25) {
    return "Balanced";
  }
  return "Overweight";
}

/**
 * Calculates BMI dynamic from Profile or raw weight/height:
 * BMI = weight / (height_in_meter ^ 2)
 * Height is in cm.
 */
export function calculateBMI(
  profileOrWeight: Partial<UserProfile> | number,
  explicitHeightCm?: number
): BMIResult | null {
  let weightKg = 0;
  let heightCm = 0;

  if (typeof profileOrWeight === "object" && profileOrWeight !== null) {
    weightKg = Number(profileOrWeight.weight) || 0;
    heightCm = Number(profileOrWeight.height) || 0;
  } else {
    weightKg = Number(profileOrWeight) || 0;
    heightCm = Number(explicitHeightCm) || 0;
  }

  // If profile is incomplete (missing height or weight), do not calculate
  if (!weightKg || !heightCm || weightKg <= 0 || heightCm <= 0) {
    return null;
  }

  const heightM = heightCm / 100;
  const rawBmi = weightKg / (heightM * heightM);
  const roundedBmi = Math.round(rawBmi * 10) / 10;

  // Calculate healthy weight range (BMI 18.5 - 24.9)
  const minHealthyWeight = Math.round(18.5 * heightM * heightM * 10) / 10;
  const maxHealthyWeight = Math.round(24.9 * heightM * heightM * 10) / 10;

  const status = getBMIStatus(roundedBmi);

  let colorClass: string;
  let badgeVariant: BMIResult["badgeVariant"];
  let description: string;

  switch (status) {
    case "Underweight":
      colorClass = "text-amber-500";
      badgeVariant = "warning";
      description =
        "Your BMI indicates underweight (< 18.5). Focus on healthy weight gain with nutrient-dense plant foods and healthy fats.";
      break;

    case "Balanced":
      colorClass = "text-emerald-400";
      badgeVariant = "success";
      description =
        "Your BMI is balanced (18.5 - 24.9). Maintain your current energy needs with balanced plant-based nutrition.";
      break;

    case "Overweight":
    default:
      colorClass = "text-amber-400";
      badgeVariant = "warning";
      description =
        "Your BMI indicates overweight (>= 25). A moderate calorie deficit while prioritizing plant protein and fiber is recommended.";
      break;
  }

  return {
    bmi: roundedBmi,
    formattedBMI: roundedBmi.toFixed(1),
    category: status,
    status,
    colorClass,
    badgeVariant,
    healthyWeightRange: { min: minHealthyWeight, max: maxHealthyWeight },
    description,
  };
}

