import { COMMON_ALLERGENS } from "../data/mockAllergies";

export interface AllergyCheckResult {
  hasAllergy: boolean;
  allergens: string[];
  warningMessage?: string;
  isSafe: boolean;
}

export interface HasIngredients {
  name?: string;
  title?: string;
  description?: string;
  allergens?: string[];
  ingredients?: Array<
    | { name: string; id?: unknown; quantity?: unknown; unit?: unknown; amount?: unknown }
    | string
  >;
}

interface HasAllergies {
  allergies?: string[];
}

/**
 * Checks whether a recipe contains ingredients or allergens that conflict with user's profile allergies (Requirement 5 & 13)
 */
export function checkAllergies(
  recipe: HasIngredients,
  profile?: HasAllergies | null
): AllergyCheckResult {
  const userAllergies = profile?.allergies || [];
  if (!userAllergies.length) {
    return {
      hasAllergy: false,
      allergens: [],
      isSafe: true,
    };
  }

  // 1. Check explicit recipe.allergens array if present
  const explicitAllergens = (recipe.allergens || []).map((a) => a.toLowerCase().trim());

  // 2. Flatten recipe text into normalized string for comprehensive detection
  const ingredientNames = ((recipe.ingredients || []) as Array<{ name?: string } | string>).map((ing) =>
    typeof ing === "string" ? ing.toLowerCase() : (ing.name || "").toLowerCase()
  );

  const fullText = [
    recipe.name || "",
    recipe.title || "",
    recipe.description || "",
    ...ingredientNames,
  ]
    .join(" ")
    .toLowerCase();

  const detectedAllergens: string[] = [];

  for (const userAllergy of userAllergies) {
    const normalizedUserAllergy = userAllergy.toLowerCase().trim();

    // Find rule in master list or match directly
    const rule = COMMON_ALLERGENS.find(
      (r) =>
        r.id.toLowerCase() === normalizedUserAllergy ||
        r.name.toLowerCase() === normalizedUserAllergy
    );

    const keywords = rule ? rule.keywords : [normalizedUserAllergy];
    const allergenDisplayName = rule ? rule.name : userAllergy;

    // Check explicit array match
    const explicitMatch = explicitAllergens.some(
      (a) => a === normalizedUserAllergy || (rule && a === rule.id.toLowerCase())
    );

    // Check keyword match in ingredients or text
    const keywordMatch = keywords.some((kw) => {
      const lowerKw = kw.toLowerCase();
      return (
        ingredientNames.some((ing) => ing.includes(lowerKw)) ||
        fullText.includes(lowerKw)
      );
    });

    if ((explicitMatch || keywordMatch) && !detectedAllergens.includes(allergenDisplayName)) {
      detectedAllergens.push(allergenDisplayName);
    }
  }

  const hasAllergy = detectedAllergens.length > 0;

  return {
    hasAllergy,
    allergens: detectedAllergens,
    isSafe: !hasAllergy,
    warningMessage: hasAllergy
      ? `This recipe contains ingredients that may cause an allergic reaction based on your profile. Detected allergens: ${detectedAllergens.join(", ")}`
      : undefined,
  };
}

/**
 * Backward compatibility alias
 */
export const checkRecipeAllergy = checkAllergies;

