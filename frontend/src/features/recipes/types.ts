import { VegetarianType } from "@/features/profile/types";

export type MealType = "breakfast" | "lunch" | "dinner" | "snack" | "any";

export const MEAL_TYPE_LABELS: Record<string, string> = {
  breakfast: "Bữa sáng",
  lunch: "Bữa trưa",
  dinner: "Bữa tối",
  snack: "Bữa phụ",
  any: "Bữa trưa / Tối",
};

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
