import { profileService } from "@/features/profile/services/profileService";
import { checkRecipeAllergy, AllergyCheckResult } from "../utils/checkRecipeAllergy";
import { COMMON_ALLERGENS, AllergenRule } from "../data/mockAllergies";

export const allergyService = {
  checkRecipe(recipe: { ingredients?: Array<{ name: string }>; title?: string; description?: string }): AllergyCheckResult {
    const profile = profileService.getProfile();
    return checkRecipeAllergy(recipe, profile);
  },

  getAllergens(): AllergenRule[] {
    return COMMON_ALLERGENS;
  },
};
