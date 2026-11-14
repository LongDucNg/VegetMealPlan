import { Recipe } from "@/features/recipes/types";
import { UserProfile } from "@/features/profile/types";

export type MealPlanType = "daily" | "weekly" | "monthly";

export interface MealIngredientSummaryItem {
  ingredient_name: string;
  quantity_g: number;
  note: string;
}

export interface MealSlotItem {
  recipe: Recipe;
  recipes?: Recipe[];
  time: string;
  portion?: number;
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
  ingredient_summary?: MealIngredientSummaryItem[];
  ai_cookability_notes?: string;
}

export interface WeeklyMealPlan {
  days: DayMealPlan[];
  averageDailyCalories: number;
  averageProtein: number;
  targetCalories: number;
  totalEstimatedCost: number;
  averageDailyCost: number;
  budgetLimit?: number;
  ai_cookability_notes?: string;
  ingredient_summary?: MealIngredientSummaryItem[];
}

export interface CalendarDayMealPlan extends DayMealPlan {
  dayOfMonth: number;
  month: number; // 0-11
  year: number;
  dateKey: string; // "2026-09-01"
  isCurrentMonth: boolean;
  isOutOfSubscription?: boolean;
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
  budgetLimit?: number;
  ai_cookability_notes?: string;
  ingredient_summary?: MealIngredientSummaryItem[];
  subscriptionPeriod?: {
    startDateKey: string;
    endDateKey: string;
    totalDays: number;
    daysRemaining?: number;
  };
}

export interface GenerationPlanOptions {
  planType?: MealPlanType;
  isSomeoneElse?: boolean;
  targetProfile?: UserProfile;
  budgetLimit?: number; // e.g. 500,000 VND
  targetCalories?: number; // Calo mục tiêu mỗi ngày (nếu đã chốt từ hồ sơ)
  selectedMonth?: number; // 0-11
  selectedYear?: number;
  favoriteRecipeIds?: string[];
  seed?: number;
  recentRecipeIds?: string[]; // Danh sách món đã dùng trong 14 ngày (2 tuần) gần nhất
  excludedRecipeIds?: string[];
}

export interface MealItem {
  name: string;
  kcal: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  time: string;
}

export interface DayPlan {
  day: string;
  shortDay: string;
  date: string;
  breakfast: MealItem;
  lunch: MealItem;
  dinner: MealItem;
  totalKcal: number;
  targetKcal: number;
}

export interface DetectedIngredient {
  id: string;
  name: string;
  freshness: "Fresh" | "Use soon";
  category: string;
  confidence: number;
}

export interface ScanPreset {
  id: string;
  label: string;
  detected: DetectedIngredient[];
  matchingRecipeIds: string[];
}
