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
    const existing = all[data.userId];
    if (existing) {
      const sameRecipes =
        Array.isArray(existing.recipes) &&
        Array.isArray(data.recipes) &&
        existing.recipes.length === data.recipes.length &&
        existing.recipes.every((r, idx) => r === data.recipes[idx]);
      const sameMealPlans =
        Array.isArray(existing.mealPlans) &&
        Array.isArray(data.mealPlans) &&
        existing.mealPlans.length === data.mealPlans.length &&
        existing.mealPlans.every((m, idx) => m.id === data.mealPlans[idx]?.id);
      if (sameRecipes && sameMealPlans) {
        return;
      }
    }
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
   * Đồng bộ lưu thực đơn vào backend database PostgreSQL và localStorage
   */
  async saveMealPlan(
    userId: string,
    planData: {
      name: string;
      planType: "weekly" | "monthly";
      targetCalories: number;
      totalEstimatedCost: number;
      days: DayMealPlan[];
    }
  ): Promise<SavedMealPlan> {
    const favs = this.getUserFavorites(userId);
    let planId = `saved-plan-${Date.now()}`;

    // Chuẩn bị payload cho backend
    const now = new Date();
    const startDateStr = now.toISOString().split("T")[0];
    const endDays = planData.planType === "monthly" ? 30 : 7;
    const endDate = new Date(now.getTime() + endDays * 24 * 60 * 60 * 1000);
    const endDateStr = endDate.toISOString().split("T")[0];

    const token = tokenStorage.getToken();
    if (token) {
      try {
        const dto: any = {
          plan_type: planData.planType === "monthly" ? "monthly" : "weekly",
          start_date: startDateStr,
          end_date: endDateStr,
          has_budget: Boolean(planData.totalEstimatedCost && planData.totalEstimatedCost > 0),
          total_budget: planData.totalEstimatedCost ? Math.round(planData.totalEstimatedCost) : undefined,
          target_calories_per_day: planData.targetCalories ? Math.round(planData.targetCalories) : undefined,
          weekly_plans: [
            {
              week_number: 1,
              start_date: startDateStr,
              end_date: endDateStr,
              week_budget: planData.totalEstimatedCost ? Math.round(planData.totalEstimatedCost) : undefined,
              week_calorie_target: planData.targetCalories ? Math.round(planData.targetCalories) : undefined,
              daily_meals: (planData.days || []).map((day, dIdx) => {
                const dDate = new Date(now.getTime() + dIdx * 24 * 60 * 60 * 1000);
                const meal_date = dDate.toISOString().split("T")[0];
                const items: any[] = [];

                const addSlot = (rec?: Recipe) => {
                  if (!rec) return;
                  const num = parseInt(String(rec.id).replace(/\D/g, ""), 10);
                  if (!isNaN(num) && num > 0) {
                    items.push({ recipe_id: num, portion_multiplier: 1 });
                  }
                };

                addSlot(day.breakfast?.recipe);
                addSlot(day.lunch?.recipe);
                addSlot(day.dinner?.recipe);
                addSlot(day.snack?.recipe);

                return {
                  meal_date,
                  meal_type: "lunch",
                  target_calories: day.targetCalories || 500,
                  meal_items: items.length > 0 ? items : [{ recipe_id: 1, portion_multiplier: 1 }],
                };
              }),
            },
          ],
        };

        const serverRes = await apiClient.post<any>("/users/me/meal-plans", dto);
        if (serverRes?.meal_plan_id) {
          planId = String(serverRes.meal_plan_id);
        }
      } catch (err) {
        console.warn("[favoriteService] Không thể lưu thực đơn lên server, lưu tạm offline:", err);
      }
    }

    const newSavedPlan: SavedMealPlan = {
      id: planId,
      name: planData.name || `Thực đơn (${new Date().toLocaleDateString("vi-VN")})`,
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
   * Xóa thực đơn khỏi database và localStorage
   */
  async removeSavedMealPlan(userId: string, planId: string): Promise<void> {
    const favs = this.getUserFavorites(userId);
    this.saveUserFavorites({
      ...favs,
      mealPlans: favs.mealPlans.filter((p) => p.id !== planId),
    });

    const token = tokenStorage.getToken();
    const numId = parseInt(planId.replace(/\D/g, ""), 10);
    if (token && !isNaN(numId)) {
      try {
        await apiClient.delete(`/users/me/meal-plans/${numId}`);
      } catch (err) {
        console.warn("[favoriteService] Xóa thực đơn trên server thất bại, đã xóa cục bộ:", err);
      }
    }
  },

  /**
   * Đồng bộ danh sách thực đơn đã lưu từ backend
   * GET /users/me/meal-plans
   */
  async fetchServerMealPlans(userId: string): Promise<SavedMealPlan[]> {
    const token = tokenStorage.getToken();
    if (!token) return this.getFavoriteMealPlans(userId);

    try {
      const serverPlans = await apiClient.get<any[]>("/users/me/meal-plans");
      if (Array.isArray(serverPlans)) {
        const favs = this.getUserFavorites(userId);
        const mapped: SavedMealPlan[] = serverPlans.map((sp: any) => ({
          id: String(sp.meal_plan_id),
          name: sp.name || `Thực đơn #${sp.meal_plan_id} (${new Date(sp.start_date).toLocaleDateString("vi-VN")})`,
          planType: sp.plan_type === "monthly" ? "monthly" : "weekly",
          createdAt: sp.created_at || new Date().toISOString(),
          targetCalories: Number(sp.target_calories_per_day || 2000),
          totalEstimatedCost: Number(sp.total_budget || 0),
          days: [],
        }));

        // Merge mapped plans with local plans that already have full days detail
        const merged = [...favs.mealPlans];
        for (const mp of mapped) {
          if (!merged.some((p) => p.id === mp.id)) {
            merged.push(mp);
          }
        }

        this.saveUserFavorites({
          ...favs,
          mealPlans: merged,
        });

        return merged;
      }
    } catch (err) {
      console.warn("[favoriteService] Không thể tải danh sách thực đơn từ server:", err);
    }
    return this.getFavoriteMealPlans(userId);
  },

  /**
   * Get all saved meal plans for user
   */
  getFavoriteMealPlans(userId: string): SavedMealPlan[] {
    return this.getUserFavorites(userId).mealPlans;
  },
};
