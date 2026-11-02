import { VegetarianType } from "@/features/profile/types";

export type MealType = "breakfast" | "lunch" | "dinner" | "snack" | "any";
export type MealFilterType = MealType | "all" | "breakfast_lunch";

export const MEAL_TYPE_LABELS: Record<string, string> = {
  breakfast: "Bữa sáng",
  lunch: "Bữa trưa",
  dinner: "Bữa tối",
  snack: "Bữa phụ",
  any: "Bữa sáng / trưa",
  breakfast_lunch: "Bữa sáng / trưa",
};

/**
 * Kiểm tra món ăn có khớp với tiêu chí lọc bữa ăn không.
 * Trong database, phần lớn các món ăn chính được gộp chung là 'any' (phù hợp cho bữa sáng/trưa/tối).
 * Do đó khi chọn "Bữa sáng / trưa", hệ thống sẽ lọc ra tất cả các món ăn sáng, trưa và các món 'any' trong DB.
 */
export function isMealTypeMatch(recipeMealType?: string, filterMealType?: string): boolean {
  if (!filterMealType || filterMealType === "all") return true;
  const r = (recipeMealType || "").toLowerCase().trim();
  const f = filterMealType.toLowerCase().trim();

  // Bữa sáng / trưa: gộp cả món sáng, trưa, và các món chính trong DB (any)
  if (
    f === "breakfast_lunch" ||
    f === "sang_trua" ||
    f === "any" ||
    f === "breakfast" ||
    f === "lunch"
  ) {
    return r === "breakfast" || r === "lunch" || r === "any" || r === "dinner";
  }

  // Bữa tối
  if (f === "dinner") {
    return r === "dinner" || r === "any" || r === "lunch";
  }

  // Bữa phụ / Ăn vặt
  if (f === "snack") {
    return r === "snack";
  }

  return r === f;
}

export function formatMealType(mealType?: string): string {
  if (!mealType) return "Món chay";
  const key = mealType.toLowerCase();
  return MEAL_TYPE_LABELS[key] || mealType;
}

export type RecipeStatus =
  | "DRAFT"
  | "PENDING_REVIEW"
  | "APPROVED"
  | "REJECTED"
  | "ARCHIVED";

export interface RecipeSource {
  type?: "admin" | "web" | "community";
  name: string;
  url?: string;
}

export interface IngredientItem {
  id: number | string;
  ingredientId?: string;
  name: string;
  quantity: number | string;
  unit: string;
  unitPrice?: number; // admin price per unit
  cost?: number; // computed cost for this recipe
}

export interface Recipe {
  id: string;
  name?: string; // Standard property per Requirement 14
  title: string;
  description: string;
  image: string;
  category: string;
  categories?: string[];
  mealType: MealType;
  vegetarianType: VegetarianType;
  prepTime: number; // minutes
  cookTime: number; // minutes
  serving: number;
  calories: number; // kcal
  protein: number; // grams
  carbs: number; // grams
  fat: number; // grams
  fiber?: number; // grams
  ingredients: IngredientItem[];
  allergens?: string[]; // Standard property per Requirement 14
  instructions: string[];
  video_url?: string;
  videoUrl?: string;

  // Price & Source (Requirements 4, 5, 6, 16, 25, 26)
  estimatedCost?: number;
  source?: RecipeSource;
  status?: RecipeStatus;

  // Display & compatibility helpers
  duration?: string;
  author?: string;
  authorHandle?: string;
  authorInitials?: string;
  verified?: boolean;
  views?: string;
  rating?: number;
  reviewsCount?: string;
  cuisine?: string;
  difficulty?: "Easy" | "Medium" | "Advanced";
}

export interface RecipeFilterOptions {
  vegetarianType?: VegetarianType | "all";
  mealType?: MealType | "all";
  excludeAllergens?: string[];
  maxCalories?: number;
  searchQuery?: string;
  category?: string;
}
