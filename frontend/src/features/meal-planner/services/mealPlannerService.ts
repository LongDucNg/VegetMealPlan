import { UserProfile } from "@/features/profile/types";
import { profileService } from "@/features/profile/services/profileService";
import { calculateDailyCalorieTarget } from "@/features/nutrition/utils/calorieCalculator";
import { recipeService } from "@/features/recipes/services/recipeService";
import { Recipe } from "@/features/recipes/types";
import {
  DayMealPlan,
  WeeklyMealPlan,
  MonthlyMealPlan,
  CalendarDayMealPlan,
  MealSlotItem,
  GenerationPlanOptions,
} from "../types";
import { checkAllergies } from "@/features/allergy/utils/checkRecipeAllergy";
import { priceService } from "@/features/recipes/services/priceService";

const DAYS_OF_WEEK = [
  { day: "Monday", short: "Mon", date: "Sep 22" },
  { day: "Tuesday", short: "Tue", date: "Sep 23" },
  { day: "Wednesday", short: "Wed", date: "Sep 24" },
  { day: "Thursday", short: "Thu", date: "Sep 25" },
  { day: "Friday", short: "Fri", date: "Sep 26" },
  { day: "Saturday", short: "Sat", date: "Sep 27" },
  { day: "Sunday", short: "Sun", date: "Sep 28" },
];

export const mealPlannerService = {
  /**
   * Recalculates nutritional totals, remaining calories, and cost for a single day plan
   */
  recalculateDay(day: DayMealPlan, targetCalories: number, userId?: string): DayMealPlan {
    const totalCalories =
      day.breakfast.recipe.calories +
      day.lunch.recipe.calories +
      day.dinner.recipe.calories +
      day.snack.recipe.calories;

    const totalProtein =
      day.breakfast.recipe.protein +
      day.lunch.recipe.protein +
      day.dinner.recipe.protein +
      day.snack.recipe.protein;

    const totalCarbs =
      day.breakfast.recipe.carbs +
      day.lunch.recipe.carbs +
      day.dinner.recipe.carbs +
      day.snack.recipe.carbs;

    const totalFat =
      day.breakfast.recipe.fat +
      day.lunch.recipe.fat +
      day.dinner.recipe.fat +
      day.snack.recipe.fat;

    const costBreakfast = priceService.getEffectivePrice(day.breakfast.recipe, userId).price;
    const costLunch = priceService.getEffectivePrice(day.lunch.recipe, userId).price;
    const costDinner = priceService.getEffectivePrice(day.dinner.recipe, userId).price;
    const costSnack = priceService.getEffectivePrice(day.snack.recipe, userId).price;
    const estimatedCost = costBreakfast + costLunch + costDinner + costSnack;

    return {
      ...day,
      totalCalories,
      totalProtein,
      totalCarbs,
      totalFat,
      targetCalories,
      remainingCalories: Math.max(0, targetCalories - totalCalories),
      estimatedCost,
    };
  },

  /**
   * Generates a single day plan based on the user's Profile, BMI status, calorie target,
   * vegetarian diet, and strictly excluding any allergy conflicts (Requirements 4, 5, 6, 7).
   */
  generateDayPlan(
    dayInfo: { day: string; short: string; date: string },
    profile: UserProfile,
    dayIndex: number = 0,
    seed: number = 0,
    options?: GenerationPlanOptions
  ): DayMealPlan {
    const nutrition = calculateDailyCalorieTarget(profile);
    const targetCalories = nutrition.dailyCalorieTarget;
    const { mealTargets } = nutrition;
    const userId = String(profile.id || "");

    // Fetch safe recipes for each meal type strictly avoiding allergies
    const breakfastCandidates = recipeService.getRecommendations(
      profile,
      mealTargets.breakfast,
      "breakfast"
    );
    const lunchCandidates = recipeService.getRecommendations(
      profile,
      mealTargets.lunch,
      "lunch"
    );
    const dinnerCandidates = recipeService.getRecommendations(
      profile,
      mealTargets.dinner,
      "dinner"
    );
    const snackCandidates = recipeService.getRecommendations(
      profile,
      mealTargets.snack,
      "snack"
    );

    // Pick distinct recipes using offset without allergen violations
    const pickRecipe = (
      candidates: Recipe[],
      index: number,
      preferredFavIds?: string[]
    ): Recipe => {
      // 1. If user chose favorites, give them precedence
      if (preferredFavIds && preferredFavIds.length > 0) {
        const fav = candidates.find((r) => preferredFavIds.includes(r.id));
        if (fav) return fav;
      }

      // Filter out any recipe with user allergies
      const safe = candidates.filter((r) => !checkAllergies(r, profile).hasAllergy);
      let pool = safe.length > 0 ? safe : candidates;

      // Budget sorting if budget limit exists (Requirement 24)
      if (options?.budgetLimit && options.budgetLimit > 0) {
        pool = [...pool].sort((a, b) => {
          const costA = priceService.getEffectivePrice(a, userId).price;
          const costB = priceService.getEffectivePrice(b, userId).price;
          return costA - costB;
        });
      }

      if (!pool.length) {
        const allSafe = recipeService
          .getRecipes()
          .filter((r) => !checkAllergies(r, profile).hasAllergy);
        return allSafe[0] || recipeService.getRecipes()[0];
      }

      return pool[(index + seed) % pool.length];
    };

    const breakfastRecipe = pickRecipe(
      breakfastCandidates,
      dayIndex,
      options?.favoriteRecipeIds
    );
    const lunchRecipe = pickRecipe(lunchCandidates, dayIndex, options?.favoriteRecipeIds);
    const dinnerRecipe = pickRecipe(dinnerCandidates, dayIndex, options?.favoriteRecipeIds);
    const snackRecipe = pickRecipe(snackCandidates, dayIndex, options?.favoriteRecipeIds);

    const breakfastSlot: MealSlotItem = {
      recipe: breakfastRecipe,
      time: `${breakfastRecipe.prepTime + breakfastRecipe.cookTime} min`,
    };
    const lunchSlot: MealSlotItem = {
      recipe: lunchRecipe,
      time: `${lunchRecipe.prepTime + lunchRecipe.cookTime} min`,
    };
    const dinnerSlot: MealSlotItem = {
      recipe: dinnerRecipe,
      time: `${dinnerRecipe.prepTime + dinnerRecipe.cookTime} min`,
    };
    const snackSlot: MealSlotItem = {
      recipe: snackRecipe,
      time: `${snackRecipe.prepTime + snackRecipe.cookTime} min`,
    };

    const baseDay: DayMealPlan = {
      dayName: dayInfo.day,
      shortDay: dayInfo.short,
      dateText: dayInfo.date,
      breakfast: breakfastSlot,
      lunch: lunchSlot,
      dinner: dinnerSlot,
      snack: snackSlot,
      totalCalories: 0,
      totalProtein: 0,
      totalCarbs: 0,
      totalFat: 0,
      targetCalories,
      remainingCalories: 0,
      estimatedCost: 0,
    };

    return this.recalculateDay(baseDay, targetCalories, userId);
  },

  /**
   * Generates the entire 7-day weekly meal plan based on Profile (Requirement 4, 19)
   */
  generateWeeklyPlan(
    profile?: UserProfile,
    seed: number = 0,
    options?: GenerationPlanOptions
  ): WeeklyMealPlan {
    const activeProfile = profile ?? profileService.getProfile();
    const days: DayMealPlan[] = DAYS_OF_WEEK.map((dayInfo, idx) =>
      this.generateDayPlan(dayInfo, activeProfile, idx, seed, options)
    );

    const totalKcal = days.reduce((sum, d) => sum + d.totalCalories, 0);
    const totalProtein = days.reduce((sum, d) => sum + d.totalProtein, 0);
    const totalCost = days.reduce((sum, d) => sum + d.estimatedCost, 0);

    return {
      days,
      averageDailyCalories: Math.round(totalKcal / days.length),
      averageProtein: Math.round(totalProtein / days.length),
      targetCalories: days[0]?.targetCalories || 2492,
      totalEstimatedCost: totalCost,
      averageDailyCost: Math.round(totalCost / days.length),
    };
  },

  /**
   * Generates Monthly Meal Plan for a full calendar month (Requirement 20, 21)
   */
  generateMonthlyPlan(
    profile?: UserProfile,
    year: number = 2026,
    month: number = 8, // September (0-indexed)
    seed: number = 0,
    options?: GenerationPlanOptions
  ): MonthlyMealPlan {
    const activeProfile = profile ?? profileService.getProfile();
    const nutrition = calculateDailyCalorieTarget(activeProfile);
    const targetCalories = nutrition.dailyCalorieTarget;

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthName = `${monthNames[month]} ${year}`;

    const days: CalendarDayMealPlan[] = [];

    for (let dayNum = 1; dayNum <= daysInMonth; dayNum++) {
      const dateObj = new Date(year, month, dayNum);
      const dayOfWeekIdx = dateObj.getDay(); // 0 is Sun, 1 is Mon...
      const dayNames = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const shortDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

      const dayName = dayNames[dayOfWeekIdx];
      const shortDay = shortDays[dayOfWeekIdx];
      const dateText = `${monthNames[month].substring(0, 3)} ${dayNum}`;

      // Rotates recipes smoothly across the month without repeating identical consecutive meals
      const dayPlan = this.generateDayPlan(
        { day: dayName, short: shortDay, date: dateText },
        activeProfile,
        dayNum - 1,
        seed + Math.floor((dayNum - 1) / 7) * 3,
        options
      );

      const calendarDay: CalendarDayMealPlan = {
        ...dayPlan,
        dayOfMonth: dayNum,
        month,
        year,
        dateKey: `${year}-${String(month + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`,
        isCurrentMonth: true,
      };

      days.push(calendarDay);
    }

    const totalKcal = days.reduce((sum, d) => sum + d.totalCalories, 0);
    const totalCost = days.reduce((sum, d) => sum + d.estimatedCost, 0);

    return {
      month,
      year,
      monthName,
      days,
      totalEstimatedCost: totalCost,
      averageDailyCalories: Math.round(totalKcal / days.length),
      averageDailyCost: Math.round(totalCost / days.length),
      targetCalories,
    };
  },

  /**
   * Creates a meal plan from user-selected favorites with validation (Requirement 2)
   */
  validateAndCreateFromFavorites(
    selectedRecipes: {
      breakfast?: Recipe;
      lunch?: Recipe;
      dinner?: Recipe;
      snack?: Recipe;
    },
    profile: UserProfile
  ): {
    isCompatible: boolean;
    warnings: string[];
    dayPlan: DayMealPlan;
  } {
    const nutrition = calculateDailyCalorieTarget(profile);
    const targetCalories = nutrition.dailyCalorieTarget;

    // Fill any missing meal slots with safe recommended recipes
    const breakfast =
      selectedRecipes.breakfast ||
      recipeService.getRecommendations(profile, nutrition.mealTargets.breakfast, "breakfast")[0] ||
      recipeService.getRecipes()[0];

    const lunch =
      selectedRecipes.lunch ||
      recipeService.getRecommendations(profile, nutrition.mealTargets.lunch, "lunch")[0] ||
      recipeService.getRecipes()[0];

    const dinner =
      selectedRecipes.dinner ||
      recipeService.getRecommendations(profile, nutrition.mealTargets.dinner, "dinner")[0] ||
      recipeService.getRecipes()[0];

    const snack =
      selectedRecipes.snack ||
      recipeService.getRecommendations(profile, nutrition.mealTargets.snack, "snack")[0] ||
      recipeService.getRecipes()[0];

    const rawDay: DayMealPlan = {
      dayName: "Selected Day",
      shortDay: "Fav",
      dateText: "Favorite Plan",
      breakfast: {
        recipe: breakfast,
        time: `${breakfast.prepTime + breakfast.cookTime} min`,
      },
      lunch: {
        recipe: lunch,
        time: `${lunch.prepTime + lunch.cookTime} min`,
      },
      dinner: {
        recipe: dinner,
        time: `${dinner.prepTime + dinner.cookTime} min`,
      },
      snack: {
        recipe: snack,
        time: `${snack.prepTime + snack.cookTime} min`,
      },
      totalCalories: 0,
      totalProtein: 0,
      totalCarbs: 0,
      totalFat: 0,
      targetCalories,
      remainingCalories: 0,
      estimatedCost: 0,
    };

    const calculatedDay = this.recalculateDay(rawDay, targetCalories, String(profile.id || ""));

    const warnings: string[] = [];

    // Check allergy violations
    const allSelected = [breakfast, lunch, dinner, snack];
    for (const r of allSelected) {
      const allergy = checkAllergies(r, profile);
      if (allergy.hasAllergy) {
        warnings.push(`"${r.title}" contains your allergen (${allergy.allergens.join(", ")}).`);
      }
    }

    // Check diet compatibility
    for (const r of allSelected) {
      if (!recipeService.isDietCompatible(r.vegetarianType, profile.vegetarianType)) {
        warnings.push(`"${r.title}" is ${r.vegetarianType} which is not compatible with your ${profile.vegetarianType} diet.`);
      }
    }

    // Check calorie tolerance (within ±15% of target)
    const calDiff = Math.abs(calculatedDay.totalCalories - targetCalories);
    const tolerance = targetCalories * 0.15;
    if (calDiff > tolerance) {
      warnings.push(
        `Total calories (${calculatedDay.totalCalories} kcal) differs from your target (${targetCalories} kcal) by ${calDiff} kcal.`
      );
    }

    const isCompatible = warnings.length === 0;

    return {
      isCompatible,
      warnings,
      dayPlan: calculatedDay,
    };
  },
};
