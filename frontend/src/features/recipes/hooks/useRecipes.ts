"use client";

import { useState, useEffect, useCallback } from "react";
import { Recipe, RecipeFilterOptions } from "../types";
import { recipeService } from "../services/recipeService";
import { storage, STORAGE_KEYS } from "@/utils/storage/storage";
import { useProfile } from "@/features/profile/hooks/useProfile";

export function useRecipes(initialFilters?: RecipeFilterOptions) {
  const [recipes, setRecipes] = useState<Recipe[]>(() =>
    recipeService.getRecipes()
  );
  const [filters, setFilters] = useState<RecipeFilterOptions>(initialFilters || {});
  const { profile } = useProfile();

  const refresh = useCallback(() => {
    const list = recipeService.getRecipes();
    setRecipes(list);
  }, []);

  useEffect(() => {
    const unsubscribe = storage.subscribe((event) => {
      if (event.key === STORAGE_KEYS.RECIPES) {
        setRecipes(recipeService.getRecipes());
      }
    });

    return unsubscribe;
  }, []);

  const filteredRecipes = recipeService.filterRecipes(recipes, filters, profile);

  const createRecipe = useCallback((data: Omit<Recipe, "id">) => {
    const created = recipeService.createRecipe(data);
    refresh();
    return created;
  }, [refresh]);

  const updateRecipe = useCallback((id: string, updates: Partial<Recipe>) => {
    const updated = recipeService.updateRecipe(id, updates);
    refresh();
    return updated;
  }, [refresh]);

  const deleteRecipe = useCallback((id: string) => {
    const deleted = recipeService.deleteRecipe(id);
    refresh();
    return deleted;
  }, [refresh]);

  return {
    recipes,
    filteredRecipes,
    filters,
    setFilters,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    refresh,
  };
}
