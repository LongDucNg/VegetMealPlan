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
  vegetarianType?: string;
  diet_type?: string;
}

/**
 * Checks whether a recipe contains ingredients or allergens that conflict with user's profile allergies (Requirement 5 & 13)
 * Tự động né Trứng/Sữa theo đúng trường phái ăn chay:
 * - Thuần chay (Vegan): Tự động né cả Trứng và Sữa
 * - Chay có sữa (Lacto): Tự động né Trứng
 * - Chay có trứng (Ovo): Tự động né Sữa
 */
export function checkAllergies(
  recipe: HasIngredients,
  profile?: HasAllergies | null
): AllergyCheckResult {
  const rawAllergies = profile?.allergies || [];
  const vegType = (profile?.vegetarianType || profile?.diet_type || "").toLowerCase().trim();

  const userAllergies = [...rawAllergies];
  if (vegType === "vegan") {
    if (!userAllergies.some((a) => a.toLowerCase() === "egg" || a.toLowerCase().includes("trứng"))) {
      userAllergies.push("egg");
    }
    if (!userAllergies.some((a) => a.toLowerCase() === "dairy" || a.toLowerCase().includes("sữa") || a.toLowerCase().includes("sua"))) {
      userAllergies.push("dairy");
    }
  } else if (vegType === "lacto_vegetarian" || vegType === "lacto") {
    if (!userAllergies.some((a) => a.toLowerCase() === "egg" || a.toLowerCase().includes("trứng"))) {
      userAllergies.push("egg");
    }
  } else if (vegType === "ovo_vegetarian" || vegType === "ovo") {
    if (!userAllergies.some((a) => a.toLowerCase() === "dairy" || a.toLowerCase().includes("sữa") || a.toLowerCase().includes("sua"))) {
      userAllergies.push("dairy");
    }
  }

  if (!userAllergies.length) {
    return {
      hasAllergy: false,
      allergens: [],
      isSafe: true,
    };
  }

  // 1. Check explicit recipe.allergens array if present
  const explicitAllergens = (recipe.allergens || []).map((a) => a.toLowerCase().trim());

  // 2. Flatten recipe ingredients into normalized string array for comprehensive detection
  const rawIngs = (recipe.ingredients && recipe.ingredients.length > 0)
    ? recipe.ingredients
    : (recipe.recipe_ingredients && recipe.recipe_ingredients.length > 0)
    ? recipe.recipe_ingredients
    : (recipe.recipeIngredients && recipe.recipeIngredients.length > 0)
    ? recipe.recipeIngredients
    : [];

  const ingredientNames = (rawIngs as Array<{ name?: string; ingredient_name?: string } | string>).map((ing) => {
    if (typeof ing === "string") return ing.toLowerCase().trim();
    return (ing.name || ing.ingredient_name || "").toLowerCase().trim();
  }).filter(Boolean);

  const dishTitle = (recipe.name || recipe.title || "").toLowerCase();

  // Loại bỏ các cụm phủ định trong description (VD: "không đậu nành, không gluten" -> không bị hiểu nhầm là có đậu nành)
  const cleanDescription = (recipe.description || "")
    .toLowerCase()
    .replace(/(?:không|chưa|không có|không chứa|chẳng|miễn|free from|no)\s+[\p{L}\p{N}\s,.-]{1,40}/giu, " ");

  const detectedAllergens: string[] = [];

  for (const userAllergy of userAllergies) {
    const normalizedUserAllergy = userAllergy.toLowerCase().trim();
    if (!normalizedUserAllergy) continue;

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

    // Check keyword match in ingredients, title, or clean description
    const keywordMatch = keywords.some((kw) => {
      const lowerKw = kw.toLowerCase().trim();
      if (!lowerKw) return false;
      return (
        ingredientNames.some((ing) => ing.includes(lowerKw)) ||
        dishTitle.includes(lowerKw) ||
        cleanDescription.includes(lowerKw)
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
