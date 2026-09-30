import { storage, STORAGE_KEYS } from "@/utils/storage/storage";
import { Recipe, RecipeFilterOptions, MealType, RecipeStatus } from "../types";
import { INITIAL_MOCK_RECIPES } from "../data/mockRecipes";
import { UserProfile, VegetarianType } from "@/features/profile/types";
import { checkRecipeAllergy } from "@/features/allergy/utils/checkRecipeAllergy";
import { priceService } from "./priceService";

function enrichRecipeDefaults(r: Recipe): Recipe {
  const status: RecipeStatus = r.status || "APPROVED";
  const estimatedCost =
    r.estimatedCost ||
    priceService.calculateRecipeCost(r.ingredients || []).estimatedCost;
  const source = r.source || {
    type: "admin",
    name: "VeggieHub Kitchen",
  };

  return {
    ...r,
    name: r.name || r.title,
    status,
    estimatedCost,
    source,
    allergens: r.allergens || [],
  };
}

export const recipeService = {
  getRecipes(options?: { includeAll?: boolean }): Recipe[] {
    const raw = storage.getItem<Recipe[]>(STORAGE_KEYS.RECIPES, INITIAL_MOCK_RECIPES);
    const enriched = raw.map(enrichRecipeDefaults);

    if (options?.includeAll) {
      return enriched;
    }

    // Only APPROVED recipes are used in meal planning and standard discovery (Requirement 15, 26)
    return enriched.filter((r) => r.status === "APPROVED");
  },

  getRecipeById(id: string): Recipe | undefined {
    const list = this.getRecipes({ includeAll: true });
    return list.find((r) => r.id === id);
  },

  createRecipe(data: Omit<Recipe, "id"> & { id?: string }): Recipe {
    const list = this.getRecipes({ includeAll: true });
    const newId = data.id || `rec-${Date.now()}`;
    const cost =
      data.estimatedCost ||
      priceService.calculateRecipeCost(data.ingredients || []).estimatedCost;

    const newRecipe: Recipe = enrichRecipeDefaults({
      ...data,
      id: newId,
      name: data.name || data.title,
      estimatedCost: cost,
      status: data.status || "APPROVED",
      source: data.source || { type: "admin", name: "VeggieHub Kitchen" },
      allergens: data.allergens || [],
      duration: data.duration || `${(data.prepTime || 0) + (data.cookTime || 0)} min`,
      rating: data.rating || 5.0,
      views: data.views || "1.2k",
      author: data.author || "VeggieHub Member",
      authorInitials: data.authorInitials || "VH",
      verified: data.verified ?? true,
    });

    const updated = [newRecipe, ...list];
    storage.setItem(STORAGE_KEYS.RECIPES, updated);
    return newRecipe;
  },

  updateRecipe(id: string, updates: Partial<Recipe>): Recipe {
    const list = this.getRecipes({ includeAll: true });
    const index = list.findIndex((r) => r.id === id);
    if (index === -1) {
      throw new Error(`Recipe with id "${id}" not found.`);
    }

    const current = list[index];
    const newIngredients = updates.ingredients || current.ingredients;
    const estimatedCost =
      updates.estimatedCost ||
      priceService.calculateRecipeCost(newIngredients).estimatedCost;

    const updatedRecipe: Recipe = enrichRecipeDefaults({
      ...current,
      ...updates,
      estimatedCost,
      duration:
        updates.duration ||
        `${(updates.prepTime ?? current.prepTime) + (updates.cookTime ?? current.cookTime)} min`,
    });

    list[index] = updatedRecipe;
    storage.setItem(STORAGE_KEYS.RECIPES, [...list]);
    return updatedRecipe;
  },

  deleteRecipe(id: string): boolean {
    const list = this.getRecipes({ includeAll: true });
    const filtered = list.filter((r) => r.id !== id);
    if (filtered.length === list.length) return false;

    storage.setItem(STORAGE_KEYS.RECIPES, filtered);
    return true;
  },

  resetRecipes(): Recipe[] {
    const enriched = INITIAL_MOCK_RECIPES.map(enrichRecipeDefaults);
    storage.setItem(STORAGE_KEYS.RECIPES, enriched);
    return enriched;
  },

  /**
   * Evaluates if a recipe matches a user's vegetarian dietary tier:
   * - vegan: only vegan
   * - lacto_vegetarian: vegan or lacto_vegetarian
   * - ovo_vegetarian: vegan or ovo_vegetarian
   * - lacto_ovo_vegetarian: vegan, lacto, ovo, or lacto_ovo
   */
  isDietCompatible(recipeType: VegetarianType, userType: VegetarianType): boolean {
    if (userType === "vegan") return recipeType === "vegan";
    if (userType === "lacto_vegetarian") {
      return recipeType === "vegan" || recipeType === "lacto_vegetarian";
    }
    if (userType === "ovo_vegetarian") {
      return recipeType === "vegan" || recipeType === "ovo_vegetarian";
    }
    if (userType === "lacto_ovo_vegetarian") {
      return true;
    }
    return true;
  },

  /**
   * Filter recipes with complex criteria
   */
  filterRecipes(recipes: Recipe[], filters: RecipeFilterOptions, profile?: UserProfile): Recipe[] {
    return recipes.filter((recipe) => {
      // 1. Search Query
      if (filters.searchQuery?.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchesTitle = recipe.title.toLowerCase().includes(q);
        const matchesAuthor = recipe.author?.toLowerCase().includes(q);
        const matchesCuisine = recipe.cuisine?.toLowerCase().includes(q);
        const matchesIngredient = recipe.ingredients.some((i) =>
          i.name.toLowerCase().includes(q)
        );
        if (!matchesTitle && !matchesAuthor && !matchesCuisine && !matchesIngredient) {
          return false;
        }
      }

      // 2. Category
      if (filters.category && filters.category !== "All") {
        if (!recipe.category.toLowerCase().includes(filters.category.toLowerCase())) {
          return false;
        }
      }

      // 3. Meal Type
      if (filters.mealType && filters.mealType !== "all") {
        if (recipe.mealType !== filters.mealType) {
          return false;
        }
      }

      // 4. Vegetarian Type
      if (filters.vegetarianType && filters.vegetarianType !== "all") {
        if (!this.isDietCompatible(recipe.vegetarianType, filters.vegetarianType)) {
          return false;
        }
      }

      // 5. Exclude Allergens
      if (profile && profile.allergies && profile.allergies.length > 0) {
        const check = checkRecipeAllergy(recipe, profile);
        if (filters.excludeAllergens && check.hasAllergy) {
          return false;
        }
      }

      // 6. Max Calories
      if (filters.maxCalories && recipe.calories > filters.maxCalories) {
        return false;
      }

      return true;
    });
  },

  /**
   * Smart Recipe Recommendation based on Profile + Calories + Allergies + Meal Type
   */
  getRecommendations(
    profile: UserProfile,
    targetCalories?: number,
    mealType?: MealType
  ): Recipe[] {
    const all = this.getRecipes(); // only approved recipes

    // 1. Strictly filter by Vegetarian Type and Allergen-Free
    const safeForUser = all.filter((r) => {
      if (!this.isDietCompatible(r.vegetarianType, profile.vegetarianType)) {
        return false;
      }
      const allergyCheck = checkRecipeAllergy(r, profile);
      return !allergyCheck.hasAllergy;
    });

    // 2. Filter by mealType if provided
    let candidates = mealType
      ? safeForUser.filter((r) => r.mealType === mealType)
      : safeForUser;

    // Fallback to all safe if candidates empty for this specific mealType
    if (candidates.length === 0) {
      candidates = safeForUser;
    }

    // 3. Sort by proximity to target calories if provided
    if (targetCalories && targetCalories > 0) {
      candidates.sort((a, b) => {
        const diffA = Math.abs(a.calories - targetCalories);
        const diffB = Math.abs(b.calories - targetCalories);
        return diffA - diffB;
      });
    }

    return candidates;
  },

  /**
   * Suggests compatible replacements for a specific meal slot (Requirement 3)
   * Prioritizes:
   * 1. Same meal type
   * 2. Compatible with vegetarian diet
   * 3. Allergen-free for user
   * 4. Calories close to original recipe
   * 5. Fits Daily Calorie Target and Nutrition Goal
   */
  getReplacementSuggestions(
    originalRecipe: Recipe,
    profile: UserProfile,
    targetMealCalories?: number
  ): Recipe[] {
    const all = this.getRecipes();

    // 1. Same meal type, exclude current recipe, match diet & allergens
    const eligible = all.filter((r) => {
      if (r.id === originalRecipe.id) return false;
      if (r.mealType !== originalRecipe.mealType) return false;
      if (!this.isDietCompatible(r.vegetarianType, profile.vegetarianType)) return false;
      const allergy = checkRecipeAllergy(r, profile);
      return !allergy.hasAllergy;
    });

    // If empty with same meal type, allow other safe recipes as fallback
    const pool = eligible.length > 0 ? eligible : all.filter(
      (r) => r.id !== originalRecipe.id && !checkRecipeAllergy(r, profile).hasAllergy
    );

    const refCalories = targetMealCalories || originalRecipe.calories;

    // Sort by calorie proximity to original recipe / meal target
    pool.sort((a, b) => {
      const diffA = Math.abs(a.calories - refCalories);
      const diffB = Math.abs(b.calories - refCalories);
      return diffA - diffB;
    });

    return pool;
  },
};
