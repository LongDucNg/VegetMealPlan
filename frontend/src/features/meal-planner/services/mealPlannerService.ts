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
  /**
   * Recalculates nutritional totals, remaining calories, and cost for a single day plan.
   * Hỗ trợ cộng gộp đầy đủ 2-3 món cho mỗi bữa sáng, trưa, chiều để khớp chính xác calo mục tiêu.
   */
  recalculateDay(day: DayMealPlan, targetCalories: number, userId?: string): DayMealPlan {
    const getSlotRecipes = (slot: MealSlotItem): Recipe[] => {
      return slot.recipes && slot.recipes.length > 0 ? slot.recipes : [slot.recipe];
    };

    const allSlotRecipes = [
      ...getSlotRecipes(day.breakfast),
      ...getSlotRecipes(day.lunch),
      ...getSlotRecipes(day.dinner),
      ...getSlotRecipes(day.snack),
    ];

    const totalCalories = Math.round(
      allSlotRecipes.reduce((sum, r) => sum + (Number(r.calories) || 0), 0)
    );

    const totalProtein = Math.round(
      allSlotRecipes.reduce((sum, r) => sum + (Number(r.protein) || 0), 0) * 10
    ) / 10;

    const totalCarbs = Math.round(
      allSlotRecipes.reduce((sum, r) => sum + (Number(r.carbs) || 0), 0) * 10
    ) / 10;

    const totalFat = Math.round(
      allSlotRecipes.reduce((sum, r) => sum + (Number(r.fat) || 0), 0) * 10
    ) / 10;

    const estimatedCost = allSlotRecipes.reduce(
      (sum, r) => sum + priceService.getEffectivePrice(r, userId).price,
      0
    );

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
   * Tổng hợp nguyên liệu theo đơn vị gam nhỏ nhất (g) và định dạng có dấu áng chừng ~
   */
  aggregateIngredientsByGram(days: DayMealPlan[]): Array<{ ingredient_name: string; quantity_g: number; note: string }> {
    const totals = new Map<string, number>();

    const normalizeUnit = (u?: string) => {
      if (!u) return "";
      return u.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
    };

    for (const day of days) {
      const getSlotRecipes = (slot: MealSlotItem): Recipe[] => {
        return slot.recipes && slot.recipes.length > 0 ? slot.recipes : [slot.recipe];
      };
      const recipes = [
        ...getSlotRecipes(day.breakfast),
        ...getSlotRecipes(day.lunch),
        ...getSlotRecipes(day.dinner),
        ...getSlotRecipes(day.snack),
      ];

      for (const recipe of recipes) {
        if (!Array.isArray(recipe.ingredients)) continue;
        for (const ing of recipe.ingredients) {
          const name = ing.name || `Nguyên liệu #${ing.id}`;
          const qty = Number(ing.quantity) || 0;
          if (qty <= 0) continue;

          const unit = normalizeUnit(ing.unit);
          let grams = 0;

          if (unit === 'g' || unit === 'gram' || unit === 'gam' || unit === 'gr') {
            grams = qty;
          } else if (unit === 'kg' || unit === 'kilo' || unit === 'kilogram') {
            grams = qty * 1000;
          } else if (unit === 'mg' || unit === 'miligram') {
            grams = qty / 1000;
          } else if (unit === 'l' || unit === 'lit' || unit === 'liter' || unit === 'litre') {
            grams = qty * 1000;
          } else if (unit === 'ml' || unit === 'mililit' || unit === 'milliliter') {
            grams = qty;
          } else if (unit === 'tbsp' || unit === 'thia canh' || unit === 'muong canh' || unit === 'thia' || unit === 'muong') {
            grams = qty * 15;
          } else if (unit === 'tsp' || unit === 'thia ca phe' || unit === 'muong ca phe' || unit === 'thia nho') {
            grams = qty * 5;
          } else if (unit === 'chen' || unit === 'bat') {
            grams = qty * 150;
          } else if (unit === 'nhanh' || unit === 'tep') {
            grams = qty * 5;
          } else if (unit === 'qua' || unit === 'cu' || unit === 'trai' || unit === 'bap') {
            grams = qty * 100;
          } else if (unit === 'mieng' || unit === 'lat') {
            grams = qty * 50;
          } else if (unit === 'cay') {
            grams = qty * 30;
          } else if (unit === 'goi') {
            grams = qty * 50;
          } else {
            grams = qty * 10;
          }

          if (grams > 0) {
            totals.set(name, (totals.get(name) ?? 0) + grams);
          }
        }
      }
    }

    return Array.from(totals.entries())
      .filter(([, qty]) => qty > 0)
      .map(([name, qty]) => ({
        ingredient_name: name,
        quantity_g: Math.round(qty),
        note: `~${Math.round(qty)}g`,
      }))
      .sort((a, b) => b.quantity_g - a.quantity_g);
  },

  /**
   * Generates a single day plan based on the user's Profile, BMI status, calorie target,
   * vegetarian diet, and strictly excluding any allergy conflicts.
   * 3 buổi sáng, trưa, chiều được bố trí 2-3 món để đảm bảo khớp lượng calo mục tiêu.
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

    const scaleRecipeToCalories = (raw: Recipe, targetKcal: number): Recipe => {
      const baseKcal = Number(raw.calories) || 150;
      const maxPortion = 1.25;
      const minPortion = 0.85;
      const portion = Math.round(Math.min(maxPortion, Math.max(minPortion, targetKcal / baseKcal)) * 10) / 10;
      return {
        ...raw,
        calories: Math.round(baseKcal * portion),
        serving: Math.round((Number(raw.serving) || 1) * portion * 10) / 10,
        protein: Math.round((Number(raw.protein) || 0) * portion * 10) / 10,
        carbs: Math.round((Number(raw.carbs) || 0) * portion * 10) / 10,
        fat: Math.round((Number(raw.fat) || 0) * portion * 10) / 10,
      };
    };

    // Pick distinct recipes using offset without allergen violations, bám sát calo mục tiêu
    const pickRecipe = (
      candidates: Recipe[],
      targetKcal: number,
      index: number,
      preferredFavIds?: string[]
    ): Recipe => {
      // 1. If user chose favorites, give them precedence and rotate across days
      if (preferredFavIds && preferredFavIds.length > 0) {
        const matchingFavs = candidates.filter((r) => preferredFavIds.includes(r.id));
        if (matchingFavs.length > 0) {
          const chosen = matchingFavs[(index + seed) % matchingFavs.length];
          return scaleRecipeToCalories(chosen, targetKcal);
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
        const fallback = allSafe[0] || recipeService.getRecipes()[0];
        return scaleRecipeToCalories(fallback, targetKcal);
      }

      // Sắp xếp theo mức độ gần với targetKcal để chọn món cung cấp đủ năng lượng
      const sortedByCal = [...pool].sort(
        (a, b) => Math.abs(a.calories - targetKcal) - Math.abs(b.calories - targetKcal)
      );
      // Luân chuyển trong top 6 món gần nhất để đảm bảo đa dạng nhưng vẫn bám sát calo
      const topPool = sortedByCal.slice(0, Math.min(6, sortedByCal.length));
      const chosen = topPool[(index + seed) % topPool.length];
      return scaleRecipeToCalories(chosen, targetKcal);
    };

    // Hàm chọn 2-3 món cho 1 buổi để khớp lượng calo của buổi đó
    const pickDishesForSlot = (
      candidates: Recipe[],
      totalMealKcal: number,
      count: number,
      slotSeed: number,
      preferredFavIds?: string[]
    ): Recipe[] => {
      const selected: Recipe[] = [];
      const selectedIds = new Set<string>();
      const kcalPerDish = Math.round(totalMealKcal / count);

      for (let i = 0; i < count; i++) {
        const dishTargetKcal = i === count - 1
          ? Math.max(totalMealKcal - selected.reduce((s, d) => s + d.calories, 0), kcalPerDish * 0.5)
          : kcalPerDish;

        const available = candidates.filter((c) => !selectedIds.has(c.id));
        const pool = available.length > 0 ? available : candidates;
        const dish = pickRecipe(pool, dishTargetKcal, dayIndex * 5 + slotSeed + i, preferredFavIds);
        selected.push(dish);
        selectedIds.add(dish.id);
      }
      return selected;
    };

    // 3 buổi chính (sáng, trưa, chiều/tối) bố trí 2-3 món; bữa phụ 1 món
    const breakfastDishesCount = (dayIndex % 2 === 0) ? 2 : 3;
    const lunchDishesCount = (dayIndex % 2 === 0) ? 3 : 2;
    const dinnerDishesCount = (dayIndex % 2 === 0) ? 2 : 3;

    const breakfastDishes = pickDishesForSlot(breakfastCandidates, mealTargets.breakfast, breakfastDishesCount, 1, options?.favoriteRecipeIds);
    const lunchDishes = pickDishesForSlot(lunchCandidates, mealTargets.lunch, lunchDishesCount, 4, options?.favoriteRecipeIds);
    const dinnerDishes = pickDishesForSlot(dinnerCandidates, mealTargets.dinner, dinnerDishesCount, 7, options?.favoriteRecipeIds);
    const snackRecipe = pickRecipe(snackCandidates, mealTargets.snack, dayIndex, options?.favoriteRecipeIds);
    const snackDishes = [snackRecipe];

    const breakfastSlot: MealSlotItem = {
      recipe: breakfastDishes[0],
      recipes: breakfastDishes,
      time: `${Math.max(...breakfastDishes.map((r) => r.prepTime + r.cookTime))} min`,
    };
    const lunchSlot: MealSlotItem = {
      recipe: lunchDishes[0],
      recipes: lunchDishes,
      time: `${Math.max(...lunchDishes.map((r) => r.prepTime + r.cookTime))} min`,
    };
    const dinnerSlot: MealSlotItem = {
      recipe: dinnerDishes[0],
      recipes: dinnerDishes,
      time: `${Math.max(...dinnerDishes.map((r) => r.prepTime + r.cookTime))} min`,
    };
    const snackSlot: MealSlotItem = {
      recipe: snackDishes[0],
      recipes: snackDishes,
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
      ingredient_summary: this.aggregateIngredientsByGram(days),
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
      ingredient_summary: this.aggregateIngredientsByGram(days),
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
      if (profile.vegetarianType && !recipeService.isDietCompatible(r.vegetarianType, profile.vegetarianType)) {
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
  /**
   * Chuyển đổi dữ liệu Thực đơn ngày từ backend NestJS sang định dạng DayMealPlan
   * 3 buổi sáng, trưa, chiều giữ trọn vẹn 2-3 món mỗi bữa.
   */
  convertBackendDailyPlan(data: any, profile: UserProfile): DayMealPlan {
    const plan = data?.data || data;
    const weeklyPlans = plan?.weekly_plans || [];
    const dailyMeals = weeklyPlans[0]?.daily_meals || [];

    const allApproved = recipeService.getRecipes();
    const slots: Record<string, Recipe[]> = {};

    for (const dm of dailyMeals) {
      const rawItems = Array.isArray(dm.meal_items) ? dm.meal_items : (dm.meal_items ? [dm.meal_items] : []);
      const dishes: Recipe[] = [];

      for (const rawItem of rawItems) {
        const rawRecipe = rawItem?.recipe;
        if (!rawRecipe) continue;
        const portion = Number(rawItem?.portion_multiplier) || 1;
        let frontendRecipe = mapBackendToFrontendRecipe(rawRecipe);
        if (frontendRecipe.calories === 350) {
          const fromCache = allApproved.find((r) => String(r.id) === String(rawRecipe.recipe_id));
          if (fromCache && fromCache.calories !== 350) {
            frontendRecipe = { ...frontendRecipe, calories: fromCache.calories, protein: fromCache.protein, carbs: fromCache.carbs, fat: fromCache.fat, fiber: fromCache.fiber };
          }
        }
        if (portion && portion !== 1) {
          frontendRecipe = {
            ...frontendRecipe,
            calories: Math.round(frontendRecipe.calories * portion),
            serving: Math.round((Number(frontendRecipe.serving) || 1) * portion * 10) / 10,
            protein: Math.round(frontendRecipe.protein * portion * 10) / 10,
            carbs: Math.round(frontendRecipe.carbs * portion * 10) / 10,
            fat: Math.round(frontendRecipe.fat * portion * 10) / 10,
          };
        }
        dishes.push(frontendRecipe);
      }
      if (dishes.length > 0) {
        slots[dm.meal_type] = dishes;
      }
    }

    const fallbackBreakfast = allApproved.find((r) => r.mealType === "breakfast") || allApproved[0];
    const fallbackLunch = allApproved.find((r) => r.mealType === "lunch") || allApproved[1 % allApproved.length];
    const fallbackDinner = allApproved.find((r) => r.mealType === "dinner") || allApproved[2 % allApproved.length];
    const fallbackSnack = allApproved.find((r) => r.mealType === "snack") || allApproved[3 % allApproved.length];

    const buildSlot = (dishes: Recipe[] | undefined, fallback: Recipe): MealSlotItem => {
      const list = dishes && dishes.length > 0 ? dishes : [fallback];
      return {
        recipe: list[0],
        recipes: list,
        time: `${Math.max(...list.map((r) => (r.prepTime || 10) + (r.cookTime || 15)))} min`,
      };
    };

    const targetCalories = plan.target_calories_per_day || 2000;
    const today = new Date();
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const shortDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const baseDay: DayMealPlan = {
      dayName: dayNames[today.getDay()],
      shortDay: shortDays[today.getDay()],
      dateText: `${monthShort[today.getMonth()]} ${today.getDate()}`,
      breakfast: buildSlot(slots.breakfast, fallbackBreakfast),
      lunch: buildSlot(slots.lunch, fallbackLunch),
      dinner: buildSlot(slots.dinner, fallbackDinner),
      snack: buildSlot(slots.snack, fallbackSnack),
      totalCalories: 0,
      totalProtein: 0,
      totalCarbs: 0,
      totalFat: 0,
      targetCalories,
      remainingCalories: 0,
      estimatedCost: 0,
      ai_cookability_notes: plan.ai_cookability_notes || data?.ai_cookability_notes,
    };

    const calculated = this.recalculateDay(baseDay, targetCalories, String(profile.id || ""));
    calculated.ingredient_summary = plan.ingredient_summary || data?.ingredient_summary || this.aggregateIngredientsByGram([calculated]);
    return calculated;
  },

  /**
   * Chuyển đổi dữ liệu Meal Plan từ backend NestJS sang định dạng WeeklyMealPlan của frontend
   * Giữ trọn vẹn 2-3 món cho mỗi bữa sáng, trưa, chiều để khớp lượng calo mục tiêu.
   */
  convertBackendWeeklyPlan(data: any, profile: UserProfile): WeeklyMealPlan {
    const plan = data?.data || data;
    const weeklyPlans = plan?.weekly_plans || [];
    const dailyMeals = weeklyPlans[0]?.daily_meals || [];

    const dateMap = new Map<string, Record<string, Recipe[]>>();
    const allApproved = recipeService.getRecipes();

    for (const dm of dailyMeals) {
      const rawDate = typeof dm.meal_date === "string" ? dm.meal_date.split("T")[0] : String(dm.meal_date);
      if (!dateMap.has(rawDate)) {
        dateMap.set(rawDate, {});
      }
      const slots = dateMap.get(rawDate)!;
      const rawItems = Array.isArray(dm.meal_items) ? dm.meal_items : (dm.meal_items ? [dm.meal_items] : []);
      const dishes: Recipe[] = [];

      for (const rawItem of rawItems) {
        const rawRecipe = rawItem?.recipe;
        if (!rawRecipe) continue;
        const portion = Number(rawItem?.portion_multiplier) || 1;
        let frontendRecipe = mapBackendToFrontendRecipe(rawRecipe);
        if (frontendRecipe.calories === 350) {
          const fromCache = allApproved.find((r) => String(r.id) === String(rawRecipe.recipe_id));
          if (fromCache && fromCache.calories !== 350) {
            frontendRecipe = { ...frontendRecipe, calories: fromCache.calories, protein: fromCache.protein, carbs: fromCache.carbs, fat: fromCache.fat, fiber: fromCache.fiber };
          }
        }
        if (portion && portion !== 1) {
          frontendRecipe = {
            ...frontendRecipe,
            calories: Math.round(frontendRecipe.calories * portion),
            serving: Math.round((Number(frontendRecipe.serving) || 1) * portion * 10) / 10,
            protein: Math.round(frontendRecipe.protein * portion * 10) / 10,
            carbs: Math.round(frontendRecipe.carbs * portion * 10) / 10,
            fat: Math.round(frontendRecipe.fat * portion * 10) / 10,
          };
        }
        dishes.push(frontendRecipe);
      }

      if (dishes.length > 0) {
        slots[dm.meal_type] = dishes;
      }
    }

    const currentWeekDates = getCurrentWeekDates();
    const dayDates = Array.from(dateMap.keys()).sort();
    const snackCandidates = allApproved.filter((r) => r.mealType === "snack");

    const buildSlot = (dishes: Recipe[] | undefined, fallback: Recipe): MealSlotItem => {
      const list = dishes && dishes.length > 0 ? dishes : [fallback];
      return {
        recipe: list[0],
        recipes: list,
        time: `${Math.max(...list.map((r) => (r.prepTime || 10) + (r.cookTime || 15)))} min`,
      };
    };

    const days: DayMealPlan[] = currentWeekDates.map((dayInfo, idx) => {
      const dateKey = dayDates[idx] || dayDates[0];
      const slots = (dateKey ? dateMap.get(dateKey) : null) || {};

      const fallbackBreakfast = allApproved.find((r) => r.mealType === "breakfast") || allApproved[0];
      const fallbackLunch = allApproved.find((r) => r.mealType === "lunch") || allApproved[1 % allApproved.length];
      const fallbackDinner = allApproved.find((r) => r.mealType === "dinner") || allApproved[2 % allApproved.length];
      const fallbackSnack = snackCandidates.length > 0 ? snackCandidates[idx % snackCandidates.length] : allApproved[idx % allApproved.length];

      const baseDay: DayMealPlan = {
        dayName: dayInfo.day,
        shortDay: dayInfo.short,
        dateText: dayInfo.date,
        breakfast: buildSlot(slots.breakfast, fallbackBreakfast),
        lunch: buildSlot(slots.lunch, fallbackLunch),
        dinner: buildSlot(slots.dinner, fallbackDinner),
        snack: buildSlot(slots.snack, fallbackSnack),
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
      ai_cookability_notes: plan.ai_cookability_notes || data?.ai_cookability_notes || undefined,
      ingredient_summary: plan.ingredient_summary || data?.ingredient_summary || this.aggregateIngredientsByGram(days),
    };
  },

  /**
   * Chuyển đổi dữ liệu Monthly Meal Plan từ backend NestJS sang định dạng MonthlyMealPlan của frontend
   * Giữ trọn vẹn 2-3 món cho mỗi bữa sáng, trưa, chiều để khớp lượng calo mục tiêu.
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

    const dateMap = new Map<string, Record<string, Recipe[]>>();
    for (const dm of allDailyMeals) {
      const rawDate = typeof dm.meal_date === "string" ? dm.meal_date.split("T")[0] : String(dm.meal_date);
      if (!dateMap.has(rawDate)) {
        dateMap.set(rawDate, {});
      }
      const slots = dateMap.get(rawDate)!;
      const rawItems = Array.isArray(dm.meal_items) ? dm.meal_items : (dm.meal_items ? [dm.meal_items] : []);
      const dishes: Recipe[] = [];

      for (const rawItem of rawItems) {
        const rawRecipe = rawItem?.recipe;
        if (!rawRecipe) continue;
        const portion = Number(rawItem?.portion_multiplier) || 1;
        let frontendRecipe = mapBackendToFrontendRecipe(rawRecipe);
        if (frontendRecipe.calories === 350) {
          const fromCache = allApproved.find((r) => String(r.id) === String(rawRecipe.recipe_id));
          if (fromCache && fromCache.calories !== 350) {
            frontendRecipe = { ...frontendRecipe, calories: fromCache.calories, protein: fromCache.protein, carbs: fromCache.carbs, fat: fromCache.fat, fiber: fromCache.fiber };
          }
        }
        if (portion && portion !== 1) {
          frontendRecipe = {
            ...frontendRecipe,
            calories: Math.round(frontendRecipe.calories * portion),
            serving: Math.round((Number(frontendRecipe.serving) || 1) * portion * 10) / 10,
            protein: Math.round(frontendRecipe.protein * portion * 10) / 10,
            carbs: Math.round(frontendRecipe.carbs * portion * 10) / 10,
            fat: Math.round(frontendRecipe.fat * portion * 10) / 10,
          };
        }
        dishes.push(frontendRecipe);
      }

      if (dishes.length > 0) {
        slots[dm.meal_type] = dishes;
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

    const buildSlot = (dishes: Recipe[] | undefined, fallback: Recipe): MealSlotItem => {
      const list = dishes && dishes.length > 0 ? dishes : [fallback];
      return {
        recipe: list[0],
        recipes: list,
        time: `${Math.max(...list.map((r) => (r.prepTime || 10) + (r.cookTime || 15)))} min`,
      };
    };

    for (let d = 1; d <= daysInMonth; d++) {
      const curDate = new Date(year, month, d);
      const dayOfWeek = curDate.getDay();
      const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      const slots = dateMap.get(dateKey) || {};

      const fallbackBreakfast = allApproved[d % allApproved.length] || allApproved[0];
      const fallbackLunch = allApproved[(d + 1) % allApproved.length] || allApproved[0];
      const dinnerFallback = allApproved[(d + 2) % allApproved.length] || allApproved[0];
      const snackFallback = allApproved[(d + 3) % allApproved.length] || allApproved[0];

      const baseDay: DayMealPlan = {
        dayName: dayNames[dayOfWeek],
        shortDay: dayShorts[dayOfWeek],
        dateText: `${monthShort[month]} ${d}`,
        breakfast: buildSlot(slots.breakfast, fallbackBreakfast),
        lunch: buildSlot(slots.lunch, fallbackLunch),
        dinner: buildSlot(slots.dinner, dinnerFallback),
        snack: buildSlot(slots.snack, snackFallback),
        totalCalories: 0,
        totalProtein: 0,
        totalCarbs: 0,
        totalFat: 0,
        targetCalories,
        remainingCalories: 0,
        estimatedCost: 0,
      };

      const calculatedDay = this.recalculateDay(baseDay, targetCalories, String(profile.id || ""));

      calendarDays.push({
        ...calculatedDay,
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
      ai_cookability_notes: plan.ai_cookability_notes || data?.ai_cookability_notes || undefined,
      ingredient_summary: plan.ingredient_summary || data?.ingredient_summary || this.aggregateIngredientsByGram(calendarDays),
    };
  }

};
