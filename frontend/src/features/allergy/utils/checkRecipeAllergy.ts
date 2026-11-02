import { COMMON_ALLERGENS } from "../data/mockAllergies";
import { formatAllergy } from "@/features/profile/types";

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
    | { name?: string; ingredient_name?: string; id?: unknown; quantity?: unknown; unit?: unknown; amount?: unknown }
    | string
  >;
  recipe_ingredients?: Array<any>;
  recipeIngredients?: Array<any>;
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
  const rawIngs = (recipe.ingredients && recipe.ingredients.length > 0)
    ? recipe.ingredients
    : (recipe.recipe_ingredients && recipe.recipe_ingredients.length > 0)
    ? recipe.recipe_ingredients
    : (recipe.recipeIngredients && recipe.recipeIngredients.length > 0)
    ? recipe.recipeIngredients
    : [];

  const ingredientNames = (rawIngs as Array<{ name?: string; ingredient_name?: string } | string>).map((ing) => {
    if (typeof ing === "string") return ing.toLowerCase();
    return (ing.name || ing.ingredient_name || "").toLowerCase();
  });

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
        r.name.toLowerCase() === normalizedUserAllergy ||
        (r.aliases && r.aliases.map((a) => a.toLowerCase()).includes(normalizedUserAllergy))
    );

    const keywords = rule ? rule.keywords : [normalizedUserAllergy];
    const allergenDisplayName = rule
      ? rule.name
      : formatAllergy(userAllergy) || userAllergy;

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
      ? `Công thức này có chứa thành phần có thể gây dị ứng cho bạn: ${detectedAllergens.join(", ")}`
      : undefined,
  };
}

/**
 * Backward compatibility alias
 */
export const checkRecipeAllergy = checkAllergies;

/**
 * Kiểm tra xem một nguyên liệu cụ thể có chứa thành phần dị ứng của người dùng hay không
 */
export function isIngredientAllergenic(
  ingredientName?: string,
  userAllergies?: string[] | null
): boolean {
  if (!ingredientName || !userAllergies || !userAllergies.length) return false;
  const lowerName = ingredientName.toLowerCase().trim();

  for (const allergy of userAllergies) {
    const normalized = allergy.toLowerCase().trim();
    const rule = COMMON_ALLERGENS.find(
      (r) =>
        r.id.toLowerCase() === normalized ||
        r.name.toLowerCase() === normalized ||
        (r.aliases && r.aliases.map((a) => a.toLowerCase()).includes(normalized))
    );
    const keywords = rule ? rule.keywords : [normalized];

    if (keywords.some((kw) => lowerName.includes(kw.toLowerCase()))) {
      return true;
    }
  }
  return false;
}

