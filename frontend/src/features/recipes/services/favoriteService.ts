import { storage, STORAGE_KEYS } from "@/utils/storage/storage";
import { Recipe } from "../types";
import { recipeService } from "./recipeService";
import { DayMealPlan } from "@/features/meal-planner/types";
import { priceService } from "./priceService";
import { apiClient } from "@/lib/apiClient";
import { tokenStorage } from "@/lib/tokenStorage";


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

function buildDefaultSavedPlans(_userId: string): SavedMealPlan[] {
  return [];
}

const isMockRecipeId = (id: string) => /^rec-\d{1,2}$/.test(id);
const isMockPlanId = (id: string) => id.includes("demo");

export const favoriteService = {
  /**
   * Retrieves all favorites for a specific user without mock data
   */
  getUserFavorites(userId: string): UserFavoritesData {
    const safeId = userId || "1";
    const all = storage.getItem<Record<string, UserFavoritesData>>(
      STORAGE_KEYS.FAVORITES,
      {}
    );

    if (all[safeId]) {
      // Purge any legacy mock recipe IDs and mock saved plans from storage
      const cleanedRecipes = (all[safeId].recipes || []).filter((id) => !isMockRecipeId(id));
      const cleanedPlans = (all[safeId].mealPlans || []).filter((p) => !isMockPlanId(p.id));

      if (
        cleanedRecipes.length !== (all[safeId].recipes || []).length ||
        cleanedPlans.length !== (all[safeId].mealPlans || []).length
      ) {
        all[safeId] = {
          ...all[safeId],
          recipes: cleanedRecipes,
          mealPlans: cleanedPlans,
        };
        storage.setItem(STORAGE_KEYS.FAVORITES, all);
      }
      return all[safeId];
    }

    const defaultData: UserFavoritesData = {
      userId: safeId,
      recipes: [],
      mealPlans: [],
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
    if (!recipeId) return false;
    const favs = this.getUserFavorites(userId);
    const cleanId = String(recipeId).trim();
    const numId = cleanId.replace(/\D/g, "");
    return favs.recipes.some((id) => {
      if (id === cleanId) return true;
      if (numId && id.replace(/\D/g, "") === numId) return true;
      return false;
    });
  },

  /**
   * Toggle favorite recipe status for a user
   */
  toggleFavoriteRecipe(userId: string, recipeId: string): boolean {
    if (!recipeId) return false;
    const favs = this.getUserFavorites(userId);
    const cleanId = String(recipeId).trim();
    const numId = cleanId.replace(/\D/g, "");
    const exists = this.isRecipeFavorite(userId, recipeId);
    let updatedRecipes: string[];

    if (exists) {
      updatedRecipes = favs.recipes.filter((id) => {
        if (id === cleanId) return false;
        if (numId && id.replace(/\D/g, "") === numId) return false;
        return true;
      });
    } else {
      updatedRecipes = [...favs.recipes, cleanId];
    }

    this.saveUserFavorites({
      ...favs,
      recipes: updatedRecipes,
    });

    // Sync to backend if logged in
    const token = tokenStorage.getToken();
    const numericId = parseInt(numId, 10);
    if (token && !isNaN(numericId) && numericId > 0) {
      if (exists) {
        apiClient.delete(`/users/me/favorites/recipes/${numericId}`).catch(() => {});
      } else {
        apiClient.post(`/users/me/favorites/recipes/${numericId}`).catch(() => {});
      }
    }

    return !exists;
  },

  /**
   * Đồng bộ danh sách yêu thích từ backend
   * GET /users/me/favorites/recipes
   */
  async fetchServerFavorites(userId: string): Promise<string[]> {
    const token = tokenStorage.getToken();
    if (!token) return this.getUserFavorites(userId).recipes;

    try {
      const res = await apiClient.get<any>(
        "/users/me/favorites/recipes"
      );
      const list = Array.isArray(res) ? res : (res as any)?.data || [];
      if (Array.isArray(list)) {
        const ids = list.map((r: any) => String(r.recipe_id || r.id));
        const current = this.getUserFavorites(userId);
        this.saveUserFavorites({
          ...current,
          recipes: ids,
        });
        return ids;
      }
    } catch {}
    return this.getUserFavorites(userId).recipes;
  },

  /**
   * Get full Recipe objects for user's favorite recipes
   */
  getFavoriteRecipes(userId: string): Recipe[] {
    const favs = this.getUserFavorites(userId);
    const allRecipes = recipeService.getRecipes();
    return allRecipes.filter((r) => {
      const rNum = String(r.id).replace(/\D/g, "");
      return favs.recipes.some((fid) => {
        if (fid === r.id) return true;
        const fNum = String(fid).replace(/\D/g, "");
        return Boolean(fNum && rNum && fNum === rNum);
      });
    });
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
