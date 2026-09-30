import { VIDEO_RECIPES, RECIPE_FILTERS } from "../data/mockVideos";
import { VideoRecipe } from "../types";

export const videoService = {
  getVideoRecipes(): VideoRecipe[] {
    return VIDEO_RECIPES;
  },

  getVideoById(id: string): VideoRecipe | undefined {
    return VIDEO_RECIPES.find((v) => v.id === id);
  },

  getRecipeFilters(): string[] {
    return RECIPE_FILTERS;
  },

  getTrendingVideos(limit: number = 6): VideoRecipe[] {
    return VIDEO_RECIPES.slice(0, limit);
  },

  searchVideos(query: string): VideoRecipe[] {
    const q = (query || "").toLowerCase().trim();
    if (!q) return VIDEO_RECIPES;
    return VIDEO_RECIPES.filter(
      (v) =>
        v.title.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q) ||
        v.cuisine.toLowerCase().includes(q) ||
        v.category.toLowerCase().includes(q) ||
        v.ingredients.some((ing) => ing.name.toLowerCase().includes(q))
    );
  },

  filterByCategory(category: string): VideoRecipe[] {
    if (!category || category === "All") return VIDEO_RECIPES;
    return VIDEO_RECIPES.filter((v) => v.category === category);
  },
};
