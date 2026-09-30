import { storage, STORAGE_KEYS } from "@/utils/storage/storage";
import { Recipe } from "../types";
import { recipeService } from "./recipeService";
import { DayMealPlan } from "@/features/meal-planner/types";
import { priceService } from "./priceService";

export interface SavedMealPlan {
  id: string;
  name: string;
  planType: "weekly" | "monthly";
  createdAt: string;
  targetCalories: number;
  totalEstimatedCost: number;
  days: DayMealPlan[];
}

export interface UserFavoritesData {
  userId: string;
  recipes: string[]; // recipe IDs
  mealPlans: SavedMealPlan[];
}

function buildDefaultSavedPlans(userId: string): SavedMealPlan[] {
  const allRecipes = recipeService.getRecipes();
  if (allRecipes.length === 0) return [];

  const getR = (id: string, fallbackIdx = 0) =>
    allRecipes.find((r) => r.id === id) || allRecipes[fallbackIdx] || allRecipes[0];

  const b1 = getR("rec-1", 0);
  const b2 = getR("rec-2", 1);
  const b3 = getR("rec-3", 2);
  const l1 = getR("rec-5", 3);
  const l2 = getR("rec-6", 4);
  const l3 = getR("rec-7", 5);
  const d1 = getR("rec-8", 6);
  const d2 = getR("rec-10", 7);
  const d3 = getR("rec-11", 8);
  const s1 = getR("rec-12", 9);
  const s2 = getR("rec-13", 10);

  const daysDef = [
    { day: "Monday", short: "Mon", date: "Sep 22", b: b1, l: l1, d: d1, s: s1 },
    { day: "Tuesday", short: "Tue", date: "Sep 23", b: b2, l: l2, d: d2, s: s2 },
    { day: "Wednesday", short: "Wed", date: "Sep 24", b: b3, l: l3, d: d3, s: s1 },
    { day: "Thursday", short: "Thu", date: "Sep 25", b: b1, l: l2, d: d1, s: s2 },
    { day: "Friday", short: "Fri", date: "Sep 26", b: b2, l: l1, d: d2, s: s1 },
    { day: "Saturday", short: "Sat", date: "Sep 27", b: b3, l: l3, d: d3, s: s2 },
    { day: "Sunday", short: "Sun", date: "Sep 28", b: b1, l: l1, d: d1, s: s1 },
  ];

  const days: DayMealPlan[] = daysDef.map((item) => {
    const totalCal = item.b.calories + item.l.calories + item.d.calories + item.s.calories;
    const totalProt = item.b.protein + item.l.protein + item.d.protein + item.s.protein;
    const totalCarb = item.b.carbs + item.l.carbs + item.d.carbs + item.s.carbs;
    const totalFat = item.b.fat + item.l.fat + item.d.fat + item.s.fat;
    const cost =
      priceService.getEffectivePrice(item.b, userId).price +
      priceService.getEffectivePrice(item.l, userId).price +
      priceService.getEffectivePrice(item.d, userId).price +
      priceService.getEffectivePrice(item.s, userId).price;

    return {
      dayName: item.day,
      shortDay: item.short,
      dateText: item.date,
      breakfast: { recipe: item.b, time: "08:00 AM" },
      lunch: { recipe: item.l, time: "12:30 PM" },
      dinner: { recipe: item.d, time: "07:00 PM" },
      snack: { recipe: item.s, time: "03:30 PM" },
      totalCalories: totalCal,
      totalProtein: totalProt,
      totalCarbs: totalCarb,
      totalFat: totalFat,
      targetCalories: 1850,
      remainingCalories: Math.max(0, 1850 - totalCal),
      estimatedCost: cost,
    };
  });

  const totalCost = days.reduce((sum, d) => sum + d.estimatedCost, 0);

  return [
    {
      id: "saved-plan-demo-1",
      name: "Thực đơn Healthy 7 Ngày Giảm Cân",
      planType: "weekly",
      createdAt: "2026-09-20T10:00:00.000Z",
      targetCalories: 1850,
      totalEstimatedCost: totalCost,
      days,
    },
    {
      id: "saved-plan-demo-2",
      name: "High-Protein Chay Tăng Cơ & Săn Chắc",
      planType: "weekly",
      createdAt: "2026-09-18T14:30:00.000Z",
      targetCalories: 2150,
      totalEstimatedCost: Math.round(totalCost * 1.15),
      days: days.map((d) => ({
        ...d,
        targetCalories: 2150,
        remainingCalories: Math.max(0, 2150 - d.totalCalories),
      })),
    },
  ];
}

export const favoriteService = {
  /**
   * Retrieves all favorites for a specific user with rich default mock data (Requirement 1)
   */
  getUserFavorites(userId: string): UserFavoritesData {
    const safeId = userId || "1";
    const all = storage.getItem<Record<string, UserFavoritesData>>(
      STORAGE_KEYS.FAVORITES,
      {}
    );

    if (all[safeId]) {
      return all[safeId];
    }

    // Initialize rich defaults for demo user
    const defaultData: UserFavoritesData = {
      userId: safeId,
      recipes: ["rec-1", "rec-2", "rec-5", "rec-7", "rec-10", "rec-12"],
      mealPlans: buildDefaultSavedPlans(safeId),
    };

    all[safeId] = defaultData;
    storage.setItem(STORAGE_KEYS.FAVORITES, all);
    return defaultData;
  },

  /**
   * Saves favorites object for a specific user
   */
  saveUserFavorites(data: UserFavoritesData): void {
    if (!data.userId) return;
    const all = storage.getItem<Record<string, UserFavoritesData>>(
      STORAGE_KEYS.FAVORITES,
      {}
    );
    all[data.userId] = data;
    storage.setItem(STORAGE_KEYS.FAVORITES, all);
  },

  /**
   * Check if a recipe is in user's favorites
   */
  isRecipeFavorite(userId: string, recipeId: string): boolean {
    if (!userId || !recipeId) return false;
    const favs = this.getUserFavorites(userId);
    return favs.recipes.includes(recipeId);
  },

  /**
   * Toggle favorite recipe status for a user
   */
  toggleFavoriteRecipe(userId: string, recipeId: string): boolean {
    if (!userId || !recipeId) return false;
    const favs = this.getUserFavorites(userId);
    const exists = favs.recipes.includes(recipeId);
    let updatedRecipes: string[];

    if (exists) {
      updatedRecipes = favs.recipes.filter((id) => id !== recipeId);
    } else {
      updatedRecipes = [...favs.recipes, recipeId];
    }

    this.saveUserFavorites({
      ...favs,
      recipes: updatedRecipes,
    });

    return !exists;
  },

  /**
   * Get full Recipe objects for user's favorite recipes
   */
  getFavoriteRecipes(userId: string): Recipe[] {
    const favs = this.getUserFavorites(userId);
    const allRecipes = recipeService.getRecipes();
    return allRecipes.filter((r) => favs.recipes.includes(r.id));
  },

  /**
   * Save a generated meal plan as "Saved Meal Plan" (Requirement 1)
   */
  saveMealPlan(
    userId: string,
    planData: {
      name: string;
      planType: "weekly" | "monthly";
      targetCalories: number;
      totalEstimatedCost: number;
      days: DayMealPlan[];
    }
  ): SavedMealPlan {
    const favs = this.getUserFavorites(userId);
    const newSavedPlan: SavedMealPlan = {
      id: `saved-plan-${Date.now()}`,
      name: planData.name || `Meal Plan (${new Date().toLocaleDateString("vi-VN")})`,
      planType: planData.planType,
      createdAt: new Date().toISOString(),
      targetCalories: planData.targetCalories,
      totalEstimatedCost: planData.totalEstimatedCost,
      days: planData.days,
    };

    this.saveUserFavorites({
      ...favs,
      mealPlans: [newSavedPlan, ...favs.mealPlans],
    });

    return newSavedPlan;
  },

  /**
   * Remove a saved meal plan
   */
  removeSavedMealPlan(userId: string, planId: string): void {
    const favs = this.getUserFavorites(userId);
    this.saveUserFavorites({
      ...favs,
      mealPlans: favs.mealPlans.filter((p) => p.id !== planId),
    });
  },

  /**
   * Get all saved meal plans for user
   */
  getFavoriteMealPlans(userId: string): SavedMealPlan[] {
    return this.getUserFavorites(userId).mealPlans;
  },
};
