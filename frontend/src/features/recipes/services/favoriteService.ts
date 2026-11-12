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
  planType: "daily" | "weekly" | "monthly";
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

export function getEffectiveUserId(userId?: string | number): string {
  const authUser = tokenStorage.getUser();
  if (authUser?.user_id) return String(authUser.user_id);
  const strId = userId !== undefined && userId !== null ? String(userId) : undefined;
  if (
    strId &&
    strId !== "someone_else_target" &&
    strId !== "guest" &&
    strId !== "guest_user" &&
    strId !== "undefined" &&
    strId !== ""
  ) {
    return strId;
  }
  return "user_default";
}

const isMockRecipeId = (id: string) => /^rec-\d{1,2}$/.test(id);
const isMockPlanId = (id: string) => id.includes("demo");

export const favoriteService = {
  /**
   * Retrieves all favorites for a specific user without mock data
   */
  getUserFavorites(userId?: string | number): UserFavoritesData {
    const safeId = getEffectiveUserId(userId);
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
    const safeId = getEffectiveUserId(data.userId);
    const all = storage.getItem<Record<string, UserFavoritesData>>(
      STORAGE_KEYS.FAVORITES,
      {}
    );
    const existing = all[safeId];
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
    all[safeId] = { ...data, userId: safeId };
    storage.setItem(STORAGE_KEYS.FAVORITES, all);
  },

  /**
   * Check if a recipe is in user's favorites
   */
  isRecipeFavorite(userId: string | number | undefined, recipeId: string): boolean {
    if (!recipeId) return false;
    const safeId = getEffectiveUserId(userId);
    const favs = this.getUserFavorites(safeId);
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
  toggleFavoriteRecipe(userId: string | number | undefined, recipeId: string): boolean {
    if (!recipeId) return false;
    const safeId = getEffectiveUserId(userId);
    const favs = this.getUserFavorites(safeId);
    const cleanId = String(recipeId).trim();
    const numId = cleanId.replace(/\D/g, "");
    const exists = this.isRecipeFavorite(safeId, recipeId);
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
   * Đồng bộ danh sách yêu thích từ backend (Merge thông minh, không xóa đè cục bộ)
   * GET /users/me/favorites/recipes
   */
  async fetchServerFavorites(userId?: string | number): Promise<string[]> {
    const safeId = getEffectiveUserId(userId);
    const current = this.getUserFavorites(safeId);
    const token = tokenStorage.getToken();
    if (!token) return current.recipes;

    try {
      const res = await apiClient.get<any>(
        "/users/me/favorites/recipes"
      );
      const list = Array.isArray(res) ? res : (res as any)?.data || [];
      if (Array.isArray(list) && list.length > 0) {
        const serverIds = list.map((r: any) => String(r.recipe_id || r.id));
        const mergedSet = new Set([...current.recipes, ...serverIds]);
        const mergedList = Array.from(mergedSet);
        this.saveUserFavorites({
          ...current,
          recipes: mergedList,
        });
        return mergedList;
      }
    } catch (err) {
      console.warn("[favoriteService] Không thể đồng bộ yêu thích từ server:", err);
    }
    return current.recipes;
  },

  /**
   * Get full Recipe objects for user's favorite recipes
   */
  getFavoriteRecipes(userId?: string | number): Recipe[] {
    const safeId = getEffectiveUserId(userId);
    const favs = this.getUserFavorites(safeId);
    const allRecipes = recipeService.getRecipes({ includeAll: true });
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
   * Save a generated meal plan as "Saved Meal Plan"
   * Đồng bộ lưu thực đơn vào backend database PostgreSQL và localStorage
   */
  async saveMealPlan(
    userId: string | number | undefined,
    planData: {
      name: string;
      planType: "daily" | "weekly" | "monthly";
      targetCalories: number;
      totalEstimatedCost: number;
      days: DayMealPlan[];
    }
  ): Promise<SavedMealPlan> {
    const safeId = getEffectiveUserId(userId);
    const favs = this.getUserFavorites(safeId);
    let planId = `saved-plan-${Date.now()}`;

    // Chuẩn bị payload cho backend
    const now = new Date();
    const startDateStr = now.toISOString().split("T")[0];
    const endDays = planData.planType === "monthly" ? 29 : planData.planType === "daily" ? 0 : 6;
    const endDate = new Date(now.getTime() + endDays * 24 * 60 * 60 * 1000);
    const endDateStr = endDate.toISOString().split("T")[0];

    const token = tokenStorage.getToken();
    if (token) {
      try {
        const daily_meals: any[] = [];
        (planData.days || []).forEach((day, dIdx) => {
          const dDate = new Date(now.getTime() + dIdx * 24 * 60 * 60 * 1000);
          const meal_date = dDate.toISOString().split("T")[0];

          const extractItems = (slot?: any) => {
            if (!slot) return [];
            const recipes = slot.recipes && slot.recipes.length > 0 ? slot.recipes : (slot.recipe ? [slot.recipe] : []);
            const res: any[] = [];
            for (const r of recipes) {
              const num = parseInt(String(r.id).replace(/\D/g, ""), 10);
              if (!isNaN(num) && num > 0) {
                res.push({ recipe_id: num, portion_multiplier: 1 });
              }
            }
            return res;
          };

          const bItems = extractItems(day.breakfast);
          if (bItems.length > 0) {
            daily_meals.push({
              meal_date,
              meal_type: "breakfast",
              target_calories: Math.round((day.targetCalories || 2000) * 0.25),
              meal_items: bItems,
            });
          }

          const lItems = extractItems(day.lunch);
          if (lItems.length > 0) {
            daily_meals.push({
              meal_date,
              meal_type: "lunch",
              target_calories: Math.round((day.targetCalories || 2000) * 0.35),
              meal_items: lItems,
            });
          }

          const dItems = extractItems(day.dinner);
          if (dItems.length > 0) {
            daily_meals.push({
              meal_date,
              meal_type: "dinner",
              target_calories: Math.round((day.targetCalories || 2000) * 0.30),
              meal_items: dItems,
            });
          }

          const sItems = extractItems(day.snack);
          if (sItems.length > 0) {
            daily_meals.push({
              meal_date,
              meal_type: "snack",
              target_calories: Math.round((day.targetCalories || 2000) * 0.10),
              meal_items: sItems,
            });
          }
        });

        const dto: any = {
          plan_type: planData.planType,
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
              week_calorie_target: planData.targetCalories ? Math.round(planData.targetCalories * (planData.days?.length || 1)) : undefined,
              daily_meals,
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

    const updatedPlans = [newSavedPlan, ...favs.mealPlans.filter((p) => p.id !== planId)];
    this.saveUserFavorites({
      ...favs,
      mealPlans: updatedPlans,
    });

    return newSavedPlan;
  },

  /**
   * Remove a saved meal plan
   * Xóa thực đơn khỏi database và localStorage
   */
  async removeSavedMealPlan(userId: string | number | undefined, planId: string): Promise<void> {
    const safeId = getEffectiveUserId(userId);
    const favs = this.getUserFavorites(safeId);
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
  async fetchServerMealPlans(userId?: string | number): Promise<SavedMealPlan[]> {
    const safeId = getEffectiveUserId(userId);
    const favs = this.getUserFavorites(safeId);
    const token = tokenStorage.getToken();
    if (!token) return favs.mealPlans;

    try {
      const serverPlans = await apiClient.get<any[]>("/users/me/meal-plans");
      if (Array.isArray(serverPlans)) {
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
    return favs.mealPlans;
  },

  /**
   * Get all saved meal plans for user
   */
  getFavoriteMealPlans(userId?: string | number): SavedMealPlan[] {
    const safeId = getEffectiveUserId(userId);
    return this.getUserFavorites(safeId).mealPlans;
  },

  /**
   * Lấy chi tiết thực đơn kèm ngày, bữa, món từ server
   * GET /users/me/meal-plans/:id
   */
  async getSavedMealPlanDetail(planId: string | number): Promise<any> {
    const numId = typeof planId === "number" ? planId : parseInt(String(planId).replace(/\D/g, ""), 10);
    if (!isNaN(numId)) {
      try {
        return await apiClient.get<any>(`/users/me/meal-plans/${numId}`);
      } catch (err) {
        console.warn("[favoriteService] Không thể lấy chi tiết thực đơn từ server:", err);
      }
    }
    return null;
  },

  /**
   * Đổi tên hoặc trạng thái áp dụng thực đơn trên server
   * PATCH /users/me/meal-plans/:id
   */
  async updateSavedMealPlan(
    planId: string | number,
    payload: { name?: string; is_active?: boolean }
  ): Promise<any> {
    const numId = typeof planId === "number" ? planId : parseInt(String(planId).replace(/\D/g, ""), 10);
    if (!isNaN(numId)) {
      try {
        return await apiClient.patch<any>(`/users/me/meal-plans/${numId}`, payload);
      } catch (err) {
        console.warn("[favoriteService] Cập nhật thực đơn trên server thất bại:", err);
      }
    }
    return null;
  },
};
