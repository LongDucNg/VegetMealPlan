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
  profileOrWeight?: Partial<UserProfile> | number | null,
  explicitHeightCm?: number | null
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
        "Chỉ số BMI cho thấy bạn đang nhẹ cân (< 18.5). Hãy tập trung tăng cân lành mạnh với các loại thực phẩm thực vật giàu dinh dưỡng và chất béo tốt.";
      break;

    case "Balanced":
      colorClass = "text-emerald-400";
      badgeVariant = "success";
      description =
        "Chỉ số BMI của bạn ở mức cân đối (18.5 - 24.9). Hãy duy trì mức năng lượng hiện tại với chế độ dinh dưỡng thuần chay cân bằng.";
      break;

    case "Overweight":
    default:
      colorClass = "text-amber-400";
      badgeVariant = "warning";
      description =
        "Chỉ số BMI cho thấy bạn đang thừa cân (>= 25). Khuyến nghị thâm hụt calo vừa phải kết hợp ưu tiên đạm thực vật và chất xơ.";
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

