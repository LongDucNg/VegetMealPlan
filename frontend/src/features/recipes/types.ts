import { VegetarianType } from "@/features/profile/types";

export type MealType = "breakfast" | "lunch" | "dinner" | "snack" | "any";
export type MealFilterType = MealType | "all" | "breakfast" | "lunch_dinner" | "snack";

export const MEAL_TYPE_LABELS: Record<string, string> = {
  breakfast: "Bữa sáng",
  lunch: "Bữa trưa / tối",
  dinner: "Bữa trưa / tối",
  snack: "Bữa phụ",
  any: "Bữa trưa / tối",
  lunch_dinner: "Bữa trưa / tối",
};

/**
 * Kiểm tra món ăn có khớp với tiêu chí lọc bữa ăn không.
 * Trong database có 3 nhóm bữa ăn:
 * - breakfast: Bữa sáng
 * - any (hoặc lunch, dinner): Bữa trưa / tối
 * - snack: Bữa phụ
 */
export function isMealTypeMatch(recipeMealType?: string, filterMealType?: string): boolean {
  if (!filterMealType || filterMealType === "all") return true;
  const r = (recipeMealType || "").toLowerCase().trim();
  const f = filterMealType.toLowerCase().trim();

  // Bữa sáng
  if (f === "breakfast" || f === "sang") {
    return r === "breakfast";
  }

  // Bữa trưa / tối (trong DB lưu là 'any', hoặc 'lunch', 'dinner')
  if (f === "lunch_dinner" || f === "trua_toi" || f === "any" || f === "lunch" || f === "dinner") {
    return r === "any" || r === "lunch" || r === "dinner";
  }

  // Bữa phụ
  if (f === "snack" || f === "phu") {
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
  caloriesPer100g?: number; // kcal per 100g
  calories?: number; // computed kcal for this quantity
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
  review_reason?: string | null;
  reviewReason?: string | null;

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
  exactDiet?: boolean;
}
