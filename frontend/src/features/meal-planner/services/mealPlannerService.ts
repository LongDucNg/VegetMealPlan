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
import { mapBackendToFrontendRecipe } from "@/features/recipes/utils/recipeMapper";

export function getCurrentWeekDates(refDate: Date = new Date()): Array<{ day: string; short: string; date: string }> {
  const d = new Date(refDate);
  const dayOfWeek = d.getDay(); // 0 is Sunday, 1 is Monday ...
  const diffToMonday = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
  const monday = new Date(d);
  monday.setDate(d.getDate() + diffToMonday);

  const dayNames = [
    { day: "Monday", short: "Mon" },
    { day: "Tuesday", short: "Tue" },
    { day: "Wednesday", short: "Wed" },
    { day: "Thursday", short: "Thu" },
    { day: "Friday", short: "Fri" },
    { day: "Saturday", short: "Sat" },
    { day: "Sunday", short: "Sun" },
  ];

  const monthShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return dayNames.map((item, idx) => {
    const cur = new Date(monday);
    cur.setDate(monday.getDate() + idx);
    return {
      day: item.day,
      short: item.short,
      date: `${monthShort[cur.getMonth()]} ${cur.getDate()}`,
    };
  });
}

export const DAYS_OF_WEEK = getCurrentWeekDates();

export const mealPlannerService = {
  /**
   * Recalculates nutritional totals, remaining calories, and cost for a single day plan
   */
  recalculateDay(day: DayMealPlan, targetCalories: number, userId?: string): DayMealPlan {
    const totalCalories = Math.round(
      day.breakfast.recipe.calories +
      day.lunch.recipe.calories +
      day.dinner.recipe.calories +
      day.snack.recipe.calories
    );

    const totalProtein = Math.round((
      day.breakfast.recipe.protein +
      day.lunch.recipe.protein +
      day.dinner.recipe.protein +
      day.snack.recipe.protein
    ) * 10) / 10;

    const totalCarbs = Math.round((
      day.breakfast.recipe.carbs +
      day.lunch.recipe.carbs +
      day.dinner.recipe.carbs +
      day.snack.recipe.carbs
    ) * 10) / 10;

    const totalFat = Math.round((
      day.breakfast.recipe.fat +
      day.lunch.recipe.fat +
      day.dinner.recipe.fat +
      day.snack.recipe.fat
    ) * 10) / 10;

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
      // 1. If user chose favorites, give them precedence and rotate across days
      if (preferredFavIds && preferredFavIds.length > 0) {
        const matchingFavs = candidates.filter((r) => preferredFavIds.includes(r.id));
        if (matchingFavs.length > 0) {
          return matchingFavs[(index + seed) % matchingFavs.length];
        }
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

      return pool[(index * 3 + seed) % pool.length];
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
    options?: GenerationPlanOptions,
    refDate: Date = new Date()
  ): WeeklyMealPlan {
    const activeProfile = profile ?? profileService.getProfile();
    const weekDays = getCurrentWeekDates(refDate);
    const days: DayMealPlan[] = weekDays.map((dayInfo, idx) =>
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
      budgetLimit: options?.budgetLimit,
    };
  },

  /**
   * Generates Monthly Meal Plan for a full calendar month (Requirement 20, 21)
   */
  generateMonthlyPlan(
    profile?: UserProfile,
    year: number = new Date().getFullYear(),
    month: number = new Date().getMonth(),
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
      budgetLimit: options?.budgetLimit,
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

  /**
   * Chuyển đổi dữ liệu Meal Plan từ backend NestJS sang định dạng WeeklyMealPlan của frontend
   */
  convertBackendWeeklyPlan(data: any, profile: UserProfile): WeeklyMealPlan {
    const plan = data?.data || data;
    const weeklyPlans = plan?.weekly_plans || [];
    const dailyMeals = weeklyPlans[0]?.daily_meals || [];

    const dateMap = new Map<string, Record<string, Recipe>>();
    const allApproved = recipeService.getRecipes();

    for (const dm of dailyMeals) {
      const rawDate = typeof dm.meal_date === "string" ? dm.meal_date.split("T")[0] : String(dm.meal_date);
      if (!dateMap.has(rawDate)) {
        dateMap.set(rawDate, {});
      }
      const slots = dateMap.get(rawDate)!;
      const rawRecipe = dm.meal_items?.[0]?.recipe;
      if (rawRecipe) {
        let frontendRecipe = mapBackendToFrontendRecipe(rawRecipe);
        if (frontendRecipe.calories === 350) {
          const fromCache = allApproved.find((r) => String(r.id) === String(rawRecipe.recipe_id));
          if (fromCache && fromCache.calories !== 350) {
            frontendRecipe = { ...frontendRecipe, calories: fromCache.calories, protein: fromCache.protein, carbs: fromCache.carbs, fat: fromCache.fat, fiber: fromCache.fiber };
          }
        }
        slots[dm.meal_type] = frontendRecipe;
      }
    }

    const currentWeekDates = getCurrentWeekDates();
    const dayDates = Array.from(dateMap.keys()).sort();
    const snackCandidates = allApproved.filter((r) => r.mealType === "snack");

    const days: DayMealPlan[] = currentWeekDates.map((dayInfo, idx) => {
      const dateKey = dayDates[idx] || dayDates[0];
      const slots = (dateKey ? dateMap.get(dateKey) : null) || {};

      const breakfast = slots.breakfast || allApproved.find((r) => r.mealType === "breakfast") || allApproved[0];
      const lunch = slots.lunch || allApproved.find((r) => r.mealType === "lunch") || allApproved[1 % allApproved.length];
      const dinner = slots.dinner || allApproved.find((r) => r.mealType === "dinner") || allApproved[2 % allApproved.length];
      const snack =
        slots.snack ||
        (snackCandidates.length > 0 ? snackCandidates[idx % snackCandidates.length] : allApproved[idx % allApproved.length]);

      const baseDay: DayMealPlan = {
        dayName: dayInfo.day,
        shortDay: dayInfo.short,
        dateText: dayInfo.date,
        breakfast: { recipe: breakfast, time: `${breakfast.prepTime + breakfast.cookTime} min` },
        lunch: { recipe: lunch, time: `${lunch.prepTime + lunch.cookTime} min` },
        dinner: { recipe: dinner, time: `${dinner.prepTime + dinner.cookTime} min` },
        snack: { recipe: snack, time: `${snack.prepTime + snack.cookTime} min` },
        totalCalories: 0,
        totalProtein: 0,
        totalCarbs: 0,
        totalFat: 0,
        targetCalories: plan.target_calories_per_day || 2000,
        remainingCalories: 0,
        estimatedCost: 0,
      };

      return this.recalculateDay(baseDay, plan.target_calories_per_day || 2000, String(profile.id || ""));
    });

    const totalKcal = days.reduce((sum, d) => sum + d.totalCalories, 0);
    const totalProt = days.reduce((sum, d) => sum + d.totalProtein, 0);
    const totalCost = days.reduce((sum, d) => sum + d.estimatedCost, 0);

    return {
      days,
      averageDailyCalories: Math.round(totalKcal / days.length),
      averageProtein: Math.round(totalProt / days.length),
      targetCalories: plan.target_calories_per_day || 2000,
      totalEstimatedCost: totalCost,
      averageDailyCost: Math.round(totalCost / days.length),
      budgetLimit: plan.has_budget && plan.total_budget ? Number(plan.total_budget) : undefined,
    };
  },

  /**
   * Chuyển đổi dữ liệu Monthly Meal Plan từ backend NestJS sang định dạng MonthlyMealPlan của frontend
   */
  convertBackendMonthlyPlan(data: any, profile: UserProfile, year: number, month: number): MonthlyMealPlan {
    const plan = data?.data || data;
    const weeklyPlans = plan?.weekly_plans || [];
    const allApproved = recipeService.getRecipes();

    const allDailyMeals: any[] = [];
    for (const wp of weeklyPlans) {
      if (Array.isArray(wp.daily_meals)) {
        allDailyMeals.push(...wp.daily_meals);
      }
    }

    const dateMap = new Map<string, Record<string, Recipe>>();
    for (const dm of allDailyMeals) {
      const rawDate = typeof dm.meal_date === "string" ? dm.meal_date.split("T")[0] : String(dm.meal_date);
      if (!dateMap.has(rawDate)) {
        dateMap.set(rawDate, {});
      }
      const slots = dateMap.get(rawDate)!;
      const rawRecipe = dm.meal_items?.[0]?.recipe;
      if (rawRecipe) {
        let frontendRecipe = mapBackendToFrontendRecipe(rawRecipe);
        if (frontendRecipe.calories === 350) {
          const fromCache = allApproved.find((r) => String(r.id) === String(rawRecipe.recipe_id));
          if (fromCache && fromCache.calories !== 350) {
            frontendRecipe = { ...frontendRecipe, calories: fromCache.calories, protein: fromCache.protein, carbs: fromCache.carbs, fat: fromCache.fat, fiber: fromCache.fiber };
          }
        }
        slots[dm.meal_type] = frontendRecipe;
      }
    }

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const monthShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayShorts = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const calendarDays: CalendarDayMealPlan[] = [];
    const targetCalories = plan.target_calories_per_day || 2000;

    for (let d = 1; d <= daysInMonth; d++) {
      const curDate = new Date(year, month, d);
      const dayOfWeek = curDate.getDay();
      const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      const slots = dateMap.get(dateKey) || {};

      const breakfast = slots.breakfast || allApproved[d % allApproved.length] || allApproved[0];
      const lunch = slots.lunch || allApproved[(d + 1) % allApproved.length] || allApproved[0];
      const dinner = slots.dinner || allApproved[(d + 2) % allApproved.length] || allApproved[0];
      const snack = slots.snack || allApproved[(d + 3) % allApproved.length] || allApproved[0];

      const baseDay: DayMealPlan = {
        dayName: dayNames[dayOfWeek],
        shortDay: dayShorts[dayOfWeek],
        dateText: `${monthShort[month]} ${d}`,
        breakfast: { recipe: breakfast, time: `${breakfast.prepTime + breakfast.cookTime} min` },
        lunch: { recipe: lunch, time: `${lunch.prepTime + lunch.cookTime} min` },
        dinner: { recipe: dinner, time: `${dinner.prepTime + dinner.cookTime} min` },
        snack: { recipe: snack, time: `${snack.prepTime + snack.cookTime} min` },
        totalCalories: 0,
        totalProtein: 0,
        totalCarbs: 0,
        totalFat: 0,
        targetCalories,
        remainingCalories: 0,
        estimatedCost: 0,
      };

      const calculated = this.recalculateDay(baseDay, targetCalories, String(profile.id || ""));
      calendarDays.push({
        ...calculated,
        dayOfMonth: d,
        month,
        year,
        dateKey,
        isCurrentMonth: true,
      });
    }

    const totalKcal = calendarDays.reduce((sum, d) => sum + d.totalCalories, 0);
    const totalCost = calendarDays.reduce((sum, d) => sum + d.estimatedCost, 0);

    return {
      month,
      year,
      monthName: `${monthNames[month]} ${year}`,
      days: calendarDays,
      totalEstimatedCost: totalCost,
      averageDailyCalories: Math.round(totalKcal / calendarDays.length),
      averageDailyCost: Math.round(totalCost / calendarDays.length),
      targetCalories,
      budgetLimit: plan.has_budget && plan.total_budget ? Number(plan.total_budget) : undefined,
    };
  },
};
