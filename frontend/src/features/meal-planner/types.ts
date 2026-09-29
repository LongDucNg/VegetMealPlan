import { Recipe } from "@/features/recipes/types";
import { UserProfile } from "@/features/profile/types";

export type MealPlanType = "weekly" | "monthly";

export interface MealSlotItem {
  recipe: Recipe;
  time: string;
}

export interface DayMealPlan {
  dayName: string; // e.g. "Monday"
  shortDay: string; // e.g. "Mon"
  dateText: string; // e.g. "Sep 22"
  breakfast: MealSlotItem;
  lunch: MealSlotItem;
  dinner: MealSlotItem;
  snack: MealSlotItem;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  targetCalories: number;
  remainingCalories: number;
  estimatedCost: number; // in VND (Requirement 4, 7)
}

export interface WeeklyMealPlan {
  days: DayMealPlan[];
  averageDailyCalories: number;
  averageProtein: number;
  targetCalories: number;
  totalEstimatedCost: number;
  averageDailyCost: number;
}

export interface CalendarDayMealPlan extends DayMealPlan {
  dayOfMonth: number;
  month: number; // 0-11
  year: number;
  dateKey: string; // "2026-09-01"
  isCurrentMonth: boolean;
}

export interface MonthlyMealPlan {
  month: number;
  year: number;
  monthName: string; // e.g. "September 2026"
  days: CalendarDayMealPlan[];
  totalEstimatedCost: number;
  averageDailyCalories: number;
  averageDailyCost: number;
  targetCalories: number;
}

export interface GenerationPlanOptions {
  planType: MealPlanType;
  isSomeoneElse?: boolean;
  targetProfile?: UserProfile;
  budgetLimit?: number; // e.g. 500,000 VND
  selectedMonth?: number; // 0-11
  selectedYear?: number;
  favoriteRecipeIds?: string[];
  seed?: number;
}
