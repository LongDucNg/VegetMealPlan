import { COMMON_ALLERGENS, AllergenRule } from "../data/mockAllergies";
import { formatAllergy } from "@/features/profile/types";
import { SYSTEM_ALLERGEN_GROUPS } from "@/features/recipes/data/systemIngredients";

export interface DetectedAllergenItem {
  id: string;
  name: string;
}

export interface AllergyCheckResult {
  hasAllergy: boolean;
  allergens: string[];
  allergenIds: string[];
  detectedAllergens: DetectedAllergenItem[];
  warningMessage?: string;
  isSafe: boolean;
}

export interface HasIngredients {
  name?: string;
  title?: string;
  description?: string;
  allergens?: string[];
  ingredients?: Array<
    | { name?: string; ingredient_name?: string; id?: unknown; ingredient_id?: unknown; quantity?: unknown; unit?: unknown; amount?: unknown; ingredient?: any }
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

const SYSTEM_CODE_TO_ALLERGEN_ID: Record<string, string> = {
  SOY: "soy",
  TREE_NUT: "treenut",
  PEANUT: "peanut",
  SEED: "sesame",
  GLUTEN: "gluten",
  LEGUME: "legume",
  EGG: "egg",
  DAIRY: "dairy",
  FUNGI: "fungi",
  ALLIUM: "allium",
  CORN: "corn",
};

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
      allergenIds: [],
      detectedAllergens: [],
      isSafe: true,
    };
  }

  // 1. Check explicit recipe.allergens array if present
  const explicitAllergens = (recipe.allergens || []).map((a) => a.toLowerCase().trim());

  // 2. Extract recipe ingredient IDs and names
  const rawIngs = (recipe.ingredients && recipe.ingredients.length > 0)
    ? recipe.ingredients
    : (recipe.recipe_ingredients && recipe.recipe_ingredients.length > 0)
    ? recipe.recipe_ingredients
    : (recipe.recipeIngredients && recipe.recipeIngredients.length > 0)
    ? recipe.recipeIngredients
    : [];

  const ingredientIds: number[] = [];
  const ingredientNames: string[] = [];

  for (const item of rawIngs) {
    if (typeof item === "string") {
      const clean = item.toLowerCase().trim();
      if (clean) ingredientNames.push(clean);
      continue;
    }
    if (item && typeof item === "object") {
      const id = Number(
        item.ingredient_id ??
        item.id ??
        item.ingredient?.ingredient_id ??
        item.ingredient?.id
      );
      if (!isNaN(id) && id > 0) {
        ingredientIds.push(id);
      }
      const name = String(
        item.ingredient_name ??
        item.name ??
        item.ingredient?.ingredient_name ??
        item.ingredient?.name ??
        ""
      ).toLowerCase().trim();
      if (name) {
        ingredientNames.push(name);
      }
    }
  }

  // Lập tập hợp các Allergen ID phát hiện được thông qua SYSTEM_ALLERGEN_GROUPS bằng ID nguyên liệu
  const detectedAllergenIdsFromIds = new Set<string>();
  for (const group of SYSTEM_ALLERGEN_GROUPS) {
    const matchedId = SYSTEM_CODE_TO_ALLERGEN_ID[group.code];
    if (!matchedId) continue;
    const hasIngId = ingredientIds.some((id) => group.ingredient_ids.includes(id));
    if (hasIngId) {
      detectedAllergenIdsFromIds.add(matchedId);
    }
  }

  const dishTitle = (recipe.name || recipe.title || "").toLowerCase();

  // Loại bỏ các cụm phủ định trong description (VD: "không đậu nành, không gluten" -> không bị hiểu nhầm là có đậu nành)
  const cleanDescription = (recipe.description || "")
    .toLowerCase()
    .replace(/(?:không|chưa|không có|không chứa|chẳng|miễn|free from|no)\s+[\p{L}\p{N}\s,.-]{1,40}/giu, " ");

  const detectedAllergens: DetectedAllergenItem[] = [];
  const recordedIds = new Set<string>();

  for (const userAllergy of userAllergies) {
    const normalizedUserAllergy = userAllergy.toLowerCase().trim();
    if (!normalizedUserAllergy) continue;

    // Find rule in master list
    const rule = COMMON_ALLERGENS.find(
      (r) =>
        r.id.toLowerCase() === normalizedUserAllergy ||
        r.name.toLowerCase() === normalizedUserAllergy ||
        (r.aliases && r.aliases.map((a) => a.toLowerCase()).includes(normalizedUserAllergy))
    );

    const ruleId = rule ? rule.id.toLowerCase() : normalizedUserAllergy;
    const keywords = rule ? rule.keywords : [normalizedUserAllergy];
    const allergenDisplayName = rule
      ? rule.name
      : formatAllergy(userAllergy) || userAllergy;

    // 1. Kiểm tra qua ID nguyên liệu chuẩn trong SYSTEM_ALLERGEN_GROUPS
    const idMatch = detectedAllergenIdsFromIds.has(ruleId) ||
      (ruleId === "treenut" && detectedAllergenIdsFromIds.has("treenut")) ||
      (ruleId === "sesame" && detectedAllergenIdsFromIds.has("sesame"));

    // 2. Kiểm tra mảng allergens rõ ràng của món ăn
    const explicitMatch = explicitAllergens.some((a) => {
      const lowerA = a.toLowerCase();
      return (
        lowerA === ruleId ||
        lowerA === normalizedUserAllergy ||
        (rule?.aliases && rule.aliases.some((alias) => alias.toLowerCase() === lowerA))
      );
    });

    // 3. Kiểm tra từ khóa trong tên nguyên liệu, tiêu đề món hoặc mô tả
    const keywordMatch = keywords.some((kw) => {
      const lowerKw = kw.toLowerCase().trim();
      if (!lowerKw) return false;
      return (
        ingredientNames.some((ing) => ing.includes(lowerKw)) ||
        dishTitle.includes(lowerKw) ||
        cleanDescription.includes(lowerKw)
      );
    });

    if (idMatch || explicitMatch || keywordMatch) {
      if (!recordedIds.has(ruleId)) {
        recordedIds.add(ruleId);
        detectedAllergens.push({
          id: ruleId,
          name: allergenDisplayName,
        });
      }
    }
  }

  const hasAllergy = detectedAllergens.length > 0;
  const displayNames = detectedAllergens.map((d) => d.name);
  const allergenIds = Array.from(recordedIds);

  return {
    hasAllergy,
    allergens: displayNames,
    allergenIds,
    detectedAllergens,
    isSafe: !hasAllergy,
    warningMessage: hasAllergy
      ? `Công thức này có chứa thành phần có thể gây dị ứng cho bạn: ${displayNames.join(", ")}`
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
  userAllergies?: string[] | null,
  ingredientId?: number
): boolean {
  if (!userAllergies || !userAllergies.length) return false;

  // 1. Kiểm tra qua ID
  if (ingredientId && Number(ingredientId) > 0) {
    for (const group of SYSTEM_ALLERGEN_GROUPS) {
      if (group.ingredient_ids.includes(Number(ingredientId))) {
        const mappedId = SYSTEM_CODE_TO_ALLERGEN_ID[group.code];
        if (mappedId && userAllergies.some((a) => {
          const norm = a.toLowerCase().trim();
          return norm === mappedId || (norm === "treenut" && mappedId === "treenut");
        })) {
          return true;
        }
      }
    }
  }

  if (!ingredientName) return false;
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
