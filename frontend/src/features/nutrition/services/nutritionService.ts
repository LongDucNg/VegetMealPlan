import { apiClient } from "@/lib/apiClient";
import { UserProfile } from "@/features/profile/types";
import { profileService } from "@/features/profile/services/profileService";
import { calculateBMI, BMIResult } from "../utils/bmi";
import { calculateDailyNutrition, CalorieCalculationResult } from "../utils/calorieCalculator";
import { ServerNutritionSummary } from "../types";

export const nutritionService = {
  /**
   * Lấy tóm tắt dinh dưỡng từ backend (Mifflin-St Jeor, BMR, TDEE, Calo mục tiêu, Macro, Calo từng bữa)
   * GET /users/me/nutrition-summary
   */
  async getServerNutritionSummary(): Promise<ServerNutritionSummary> {
    return await apiClient.get<ServerNutritionSummary>("/users/me/nutrition-summary");
  },

  /**
   * Tính toán dinh dưỡng client-side (cho live preview hoặc khi offline)
   */
  getNutritionSummary(profile?: UserProfile): CalorieCalculationResult {
    const activeProfile = profile ?? profileService.getProfile();
    return calculateDailyNutrition(activeProfile);
  },

  /**
   * Tính toán BMI client-side
   */
  getBMISummary(profile?: UserProfile): BMIResult | null {
    const activeProfile = profile ?? profileService.getProfile();
    return calculateBMI(activeProfile.weight, activeProfile.height);
  },
};
