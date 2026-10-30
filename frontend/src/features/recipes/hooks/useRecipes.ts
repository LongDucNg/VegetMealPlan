"use client";

import { useState, useEffect, useCallback } from "react";
import { Recipe, RecipeFilterOptions } from "../types";
import { recipeService } from "../services/recipeService";
import { recipeApiService } from "../services/recipeApiService";
import { mapBackendToFrontendRecipe } from "../utils/recipeMapper";
import { storage, STORAGE_KEYS } from "@/utils/storage/storage";
import { useProfile } from "@/features/profile/hooks/useProfile";

export function useRecipes(
  initialFilters?: RecipeFilterOptions,
  initialPage = 1,
  initialLimit = 24
) {
  const [recipes, setRecipes] = useState<Recipe[]>(() =>
    recipeService.getRecipes()
  );
  const [filters, setFilters] = useState<RecipeFilterOptions>(initialFilters || {});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(initialPage);
  const [limit, setLimit] = useState<number>(initialLimit);
  const [total, setTotal] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const { profile } = useProfile();

  const fetchFromApi = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await recipeApiService.getRecipes({
        q: filters.searchQuery,
        mealType: filters.mealType && filters.mealType !== "all" ? filters.mealType : undefined,
        vegetarianType:
          filters.vegetarianType && filters.vegetarianType !== "all"
            ? filters.vegetarianType
            : undefined,
        category: filters.category,
        maxCalories: filters.maxCalories,
        page,
        limit,
      });

      const items = Array.isArray(res) ? res : res?.data || res?.items;
      if (Array.isArray(items)) {
        const mapped = items.map(mapBackendToFrontendRecipe);
        setRecipes(mapped);
      } else {
        // Fallback to local storage if API response is invalid
        setRecipes(recipeService.getRecipes());
      }

      const pagination = (res as any)?.pagination || (items as any)?.pagination;
      if (pagination) {
        setTotal(pagination.total ?? 0);
        setTotalPages(pagination.totalPages ?? 1);
      } else if (Array.isArray(items)) {
        setTotal(items.length);
        setTotalPages(1);
      }
    } catch {
      // Graceful fallback to local storage on API error
      setRecipes(recipeService.getRecipes());
    } finally {
      setIsLoading(false);
    }
  }, [filters, page, limit]);

  const refresh = useCallback(() => {
    fetchFromApi();
  }, [fetchFromApi]);

  useEffect(() => {
    fetchFromApi();
  }, [fetchFromApi]);

  useEffect(() => {
    const unsubscribe = storage.subscribe((event) => {
      if (event.key === STORAGE_KEYS.RECIPES) {
        setRecipes(recipeService.getRecipes());
      }
    });

    return unsubscribe;
  }, []);

  const filteredRecipes = recipeService.filterRecipes(recipes, filters, profile);

  const createRecipe = useCallback(
    async (data: Omit<Recipe, "id">) => {
      try {
        // Call backend API #6
        await recipeApiService.createRecipe({
          title: data.title || data.name || "Món mới",
          description: data.description,
          instructions: Array.isArray(data.instructions)
            ? data.instructions.join("\n")
            : data.instructions,
          image_url: data.image,
          video_url: data.video_url || data.videoUrl,
          prep_time: data.prepTime,
          cook_time: data.cookTime,
          servings: data.serving,
          meal_type: data.mealType,
          diet_type: data.vegetarianType,
          estimated_cost: data.estimatedCost,
          ingredients: (data.ingredients || []).map((ing) => ({
            ingredient_id: Number(ing.id) || 1,
            quantity: Number(ing.quantity) || 1,
            unit: ing.unit || "phần",
          })),
        });
      } catch {
        // Keep working even if offline
      }
      const created = recipeService.createRecipe(data);
      refresh();
      return created;
    },
    [refresh]
  );

  const updateRecipe = useCallback(
    async (id: string, updates: Partial<Recipe>) => {
      const numericId = parseInt(id.replace(/\D/g, ""), 10);
      if (!isNaN(numericId)) {
        try {
          // Call backend API #7
          await recipeApiService.updateRecipe(numericId, {
            title: updates.title || updates.name,
            description: updates.description,
            instructions: Array.isArray(updates.instructions)
              ? updates.instructions.join("\n")
              : updates.instructions,
            image_url: updates.image,
            video_url: updates.video_url || updates.videoUrl,
            prep_time: updates.prepTime,
            cook_time: updates.cookTime,
            servings: updates.serving,
            meal_type: updates.mealType,
            diet_type: updates.vegetarianType,
            estimated_cost: updates.estimatedCost,
            ingredients: updates.ingredients
              ? updates.ingredients
                  .filter((ing) => Number(ing.id) > 0 && Number(ing.quantity) > 0)
                  .map((ing) => ({
                    ingredient_id: Number(ing.id),
                    quantity: Number(ing.quantity),
                    unit: "g",
                  }))
              : undefined,
          });
        } catch {
          // Keep working locally
        }
      }
      const updated = recipeService.updateRecipe(id, updates);
      refresh();
      return updated;
    },
    [refresh]
  );

  const deleteRecipe = useCallback(
    async (id: string) => {
      const numericId = parseInt(id.replace(/\D/g, ""), 10);
      if (!isNaN(numericId)) {
        try {
          // Call backend API #8
          await recipeApiService.deleteRecipe(numericId);
        } catch {
          // Keep working locally
        }
      }
      const deleted = recipeService.deleteRecipe(id);
      refresh();
      return deleted;
    },
    [refresh]
  );

  return {
    recipes,
    filteredRecipes,
    filters,
    setFilters,
    isLoading,
    page,
    setPage,
    limit,
    setLimit,
    total,
    totalPages,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    refresh,
  };
}
