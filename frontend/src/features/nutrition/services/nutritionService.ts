import { UserProfile } from "@/features/profile/types";
import { profileService } from "@/features/profile/services/profileService";
import { calculateBMI, BMIResult } from "../utils/bmi";
import { calculateDailyNutrition, CalorieCalculationResult } from "../utils/calorieCalculator";

export const nutritionService = {
  getNutritionSummary(profile?: UserProfile): CalorieCalculationResult {
    const activeProfile = profile ?? profileService.getProfile();
    return calculateDailyNutrition(activeProfile);
  },

  getBMISummary(profile?: UserProfile): BMIResult | null {
    const activeProfile = profile ?? profileService.getProfile();
    return calculateBMI(activeProfile.weight, activeProfile.height);
  },
};
