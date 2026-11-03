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
    const getSlotRecipes = (slot: MealSlotItem): Recipe[] => {
      if (slot.recipes && slot.recipes.length > 0) return slot.recipes;
      return slot.recipe ? [slot.recipe] : [];
    };

    const allSlots = [day.breakfast, day.lunch, day.dinner, day.snack];
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;
    let estimatedCost = 0;

    for (const slot of allSlots) {
      const recipes = getSlotRecipes(slot);
      for (const r of recipes) {
        totalCalories += Number(r.calories) || 0;
        totalProtein += Number(r.protein) || 0;
        totalCarbs += Number(r.carbs) || 0;
        totalFat += Number(r.fat) || 0;
        estimatedCost += priceService.getEffectivePrice(r, userId).price;
      }
    }

    totalCalories = Math.round(totalCalories);
    totalProtein = Math.round(totalProtein * 10) / 10;
    totalCarbs = Math.round(totalCarbs * 10) / 10;
    totalFat = Math.round(totalFat * 10) / 10;

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

    const getRecipeTitle = (r: Recipe): string =>
      ((r.name || r.title || "") + " " + (r.description || "")).toLowerCase();

    const getRecipeCategories = (r: Recipe): string[] => {
      const cats: string[] = [];
      if (r.category) cats.push(r.category.toLowerCase());
      if (Array.isArray(r.categories)) {
        cats.push(...r.categories.map((c) => String(c).toLowerCase()));
      }
      return cats;
    };

    const isRiceDish = (r: Recipe): boolean => {
      const t = getRecipeTitle(r);
      const cats = getRecipeCategories(r);
      return cats.some((c) => c.includes("cơm") || c.includes("xôi")) || t.includes("cơm") || t.includes("xôi");
    };

    const isSoupDish = (r: Recipe): boolean => {
      const t = getRecipeTitle(r);
      const cats = getRecipeCategories(r);
      return cats.some((c) => c.includes("canh") || c.includes("súp")) || t.includes("canh") || t.includes("súp");
    };

    const isBreakfastDish = (r: Recipe): boolean => {
      const mt = (r.mealType || "").toLowerCase();
      const t = getRecipeTitle(r);
      return mt === "breakfast" || t.includes("bánh mì") || t.includes("sandwich") || t.includes("ngũ cốc") || t.includes("yến mạch");
    };

    const isMainDish = (r: Recipe): boolean => {
      const t = getRecipeTitle(r);
      const cats = getRecipeCategories(r);
      return (
        cats.some((c) => c.includes("mặn") || c.includes("kho") || c.includes("rim") || c.includes("chiên") || c.includes("xào") || c.includes("đủ bữa")) ||
        t.includes("kho") || t.includes("rim") || t.includes("chiên") || t.includes("xào") || t.includes("đậu hũ") || t.includes("nấm")
      );
    };

    const isVeggieOrSide = (r: Recipe): boolean => {
      const t = getRecipeTitle(r);
      const cats = getRecipeCategories(r);
      return (
        cats.some((c) => c.includes("rau") || c.includes("luộc") || c.includes("hấp") || c.includes("gỏi") || c.includes("salad") || c.includes("cuốn")) ||
        t.includes("rau") || t.includes("luộc") || t.includes("salad") || t.includes("gỏi")
      );
    };

    const composeMealSlot = (
      candidates: Recipe[],
      targetKcal: number,
      mealSlotType: "breakfast" | "lunch" | "dinner" | "snack",
      preferredFavIds?: string[]
    ): MealSlotItem => {
      // 1. Filter allergies & diet né - NGHIÊM NGẶT LOẠI TRỪ 100% CÁC MÓN CÓ DỊ ỨNG HOẶC VI PHẠM NÉ TRỨNG/SỮA
      let safePool = candidates.filter((r) => recipeService.isRecipeSafeForProfile(r, profile));
      if (safePool.length === 0) {
        const allRecipes = recipeService.getRecipes();
        safePool = allRecipes.filter((r) => recipeService.isRecipeSafeForProfile(r, profile));
      }

      // 2. Không đưa món ăn sáng vào ăn trưa hay ăn tối!
      if (mealSlotType === "lunch" || mealSlotType === "dinner") {
        const nonBreakfast = safePool.filter((r) => !isBreakfastDish(r));
        if (nonBreakfast.length > 0) safePool = nonBreakfast;
      }

      // 3. Số lượng món: Bữa trưa/tối 2-3 món, bữa sáng 1-2 món, bữa phụ 1 món
      let maxDishes = 1;
      if (mealSlotType === "lunch") {
        maxDishes = targetKcal >= 500 && safePool.length >= 3 ? 3 : (safePool.length >= 2 ? 2 : 1);
      } else if (mealSlotType === "dinner") {
        maxDishes = targetKcal >= 450 && safePool.length >= 3 ? 3 : (safePool.length >= 2 ? 2 : 1);
      } else if (mealSlotType === "breakfast") {
        maxDishes = targetKcal >= 380 && safePool.length >= 2 ? 2 : 1;
      }

      const chosenDishes: Recipe[] = [];
      const usedIds = new Set<string>();
      let hasRice = false;
      let hasSoup = false;
      let remainingKcal = targetKcal;

      for (let i = 0; i < maxDishes; i++) {
        let dishCandidates = safePool.filter((r) => {
          if (usedIds.has(r.id)) return false;
          if (hasRice && isRiceDish(r)) return false;
          if (hasSoup && isSoupDish(r)) return false;
          return true;
        });

        if (dishCandidates.length === 0) break;

        // Phân vai ẩm thực: Món chính -> Món canh -> Rau/cơm
        if (mealSlotType === "lunch" || mealSlotType === "dinner") {
          if (i === 0) {
            const mains = dishCandidates.filter((r) => isMainDish(r));
            if (mains.length > 0) dishCandidates = mains;
          } else if (i === 1 && !hasSoup) {
            const soups = dishCandidates.filter((r) => isSoupDish(r));
            if (soups.length > 0) dishCandidates = soups;
          } else if (i === 2) {
            const sides = dishCandidates.filter((r) => isVeggieOrSide(r) || isRiceDish(r));
            if (sides.length > 0) dishCandidates = sides;
          }
        }

        const targetPerDish = Math.max(80, Math.round(remainingKcal / (maxDishes - i)));
        const sorted = [...dishCandidates].sort(
          (a, b) => Math.abs(a.calories - targetPerDish) - Math.abs(b.calories - targetPerDish)
        );

        // Luân phiên 14 ngày (dayIndex + seed)
        const rotationIdx = (dayIndex * 3 + i + seed) % Math.min(6, sorted.length);
        const selected = sorted[rotationIdx] || sorted[0];

        chosenDishes.push(selected);
        usedIds.add(selected.id);
        if (isRiceDish(selected)) hasRice = true;
        if (isSoupDish(selected)) hasSoup = true;
        remainingKcal -= selected.calories;
      }

      if (chosenDishes.length === 0) {
        const fallback = safePool[0];
        if (fallback) chosenDishes.push(fallback);
      }

      // Đảm bảo 100% không có món nào có dị ứng lọt vào chosenDishes
      const strictlyCleanDishes = chosenDishes.filter((d) => !checkAllergies(d, profile).hasAllergy);
      const finalDishes = strictlyCleanDishes.length > 0 ? strictlyCleanDishes : (safePool.length > 0 ? [safePool[0]] : chosenDishes);

      const maxTime = Math.max(...chosenDishes.map((d) => (Number(d.prepTime) || 0) + (Number(d.cookTime) || 0)));

      return {
        recipe: finalDishes[0],
        recipes: finalDishes,
        time: `${maxTime || 25} min`,
      };
    };

    const breakfastSlot = composeMealSlot(
      breakfastCandidates,
      mealTargets.breakfast,
      "breakfast",
      options?.favoriteRecipeIds
    );
    const lunchSlot = composeMealSlot(
      lunchCandidates,
      mealTargets.lunch,
      "lunch",
      options?.favoriteRecipeIds
    );
    const dinnerSlot = composeMealSlot(
      dinnerCandidates,
      mealTargets.dinner,
      "dinner",
      options?.favoriteRecipeIds
    );
    const snackSlot = composeMealSlot(
      snackCandidates,
      mealTargets.snack,
      "snack",
      options?.favoriteRecipeIds
    );

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
   * Tạo lịch trống ban đầu khi người dùng mới vào trang kế hoạch mà chưa bấm nút tạo thực đơn
   */
  createEmptyMonthlyPlan(
    year: number = new Date().getFullYear(),
    month: number = new Date().getMonth()
  ): MonthlyMealPlan {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];
    const dayNames = [
      "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
    ];
    const shortDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const days: CalendarDayMealPlan[] = [];
    for (let dayNum = 1; dayNum <= daysInMonth; dayNum++) {
      const dateObj = new Date(year, month, dayNum);
      const dayOfWeekIdx = dateObj.getDay();
      days.push({
        dayOfMonth: dayNum,
        month,
        year,
        isCurrentMonth: true,
        dateKey: `${year}-${String(month + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`,
        dayName: dayNames[dayOfWeekIdx],
        shortDay: shortDays[dayOfWeekIdx],
        dateText: `${monthNames[month].substring(0, 3)} ${dayNum}`,
        breakfast: { time: "07:30", recipe: null as any, recipes: [] },
        lunch: { time: "12:30", recipe: null as any, recipes: [] },
        dinner: { time: "19:00", recipe: null as any, recipes: [] },
        snack: { time: "16:00", recipe: null as any, recipes: [] },
        totalCalories: 0,
        totalProtein: 0,
        totalCarbs: 0,
        totalFat: 0,
        targetCalories: 0,
        remainingCalories: 0,
        estimatedCost: 0,
        ingredient_summary: [],
      });
    }

    return {
      month,
      year,
      monthName: `${monthNames[month]} ${year}`,
      days,
      totalEstimatedCost: 0,
      averageDailyCalories: 0,
      averageDailyCost: 0,
      targetCalories: 0,
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
      (recipeService.getRecipes().find((r) => recipeService.isRecipeSafeForProfile(r, profile)) || recipeService.getRecipes()[0]);

    const lunch =
      selectedRecipes.lunch ||
      recipeService.getRecommendations(profile, nutrition.mealTargets.lunch, "lunch")[0] ||
      (recipeService.getRecipes().find((r) => recipeService.isRecipeSafeForProfile(r, profile)) || recipeService.getRecipes()[0]);

    const dinner =
      selectedRecipes.dinner ||
      recipeService.getRecommendations(profile, nutrition.mealTargets.dinner, "dinner")[0] ||
      (recipeService.getRecipes().find((r) => recipeService.isRecipeSafeForProfile(r, profile)) || recipeService.getRecipes()[0]);

    const snack =
      selectedRecipes.snack ||
      recipeService.getRecommendations(profile, nutrition.mealTargets.snack, "snack")[0] ||
      (recipeService.getRecipes().find((r) => recipeService.isRecipeSafeForProfile(r, profile)) || recipeService.getRecipes()[0]);

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
      const items = Array.isArray(dm.meal_items) ? dm.meal_items : (dm.meal_items ? [dm.meal_items] : []);
      const recipesInMeal: Recipe[] = [];

      for (const rawItem of items) {
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
        recipesInMeal.push(frontendRecipe);
      }

      if (recipesInMeal.length > 0) {
        slots[dm.meal_type] = recipesInMeal;
      }
    }

    const currentWeekDates = getCurrentWeekDates();
    const dayDates = Array.from(dateMap.keys()).sort();
    const snackCandidates = allApproved.filter((r) => r.mealType === "snack");

    const days: DayMealPlan[] = currentWeekDates.map((dayInfo, idx) => {
      const dateKey = dayDates[idx] || dayDates[0];
      const slots = (dateKey ? dateMap.get(dateKey) : null) || {};

      const buildSlot = (mealType: string, defaultDish: Recipe): MealSlotItem => {
        let list = slots[mealType] && slots[mealType].length > 0 ? slots[mealType] : [defaultDish];

        // Tự động thay thế nếu bất kỳ món nào có chứa thành phần dị ứng
        list = list.map((dish) => {
          if (checkAllergies(dish, profile).hasAllergy) {
            const replacements = recipeService.getReplacementSuggestions(dish, profile);
            const safe = replacements.find((r) => !checkAllergies(r, profile).hasAllergy);
            return safe || dish;
          }
          return dish;
        });

        const strictlySafe = list.filter((r) => !checkAllergies(r, profile).hasAllergy);
        if (strictlySafe.length > 0) {
          list = strictlySafe;
        } else {
          const recs = recipeService.getRecommendations(profile, 300, mealType as any);
          const safePick = recs.find((r) => !checkAllergies(r, profile).hasAllergy) || defaultDish;
          list = [safePick];
        }

        const maxTime = Math.max(...list.map((r) => (Number(r.prepTime) || 0) + (Number(r.cookTime) || 0)));
        return {
          recipe: list[0],
          recipes: list,
          time: `${maxTime || 25} min`,
        };
      };

      const baseDay: DayMealPlan = {
        dayName: dayInfo.day,
        shortDay: dayInfo.short,
        dateText: dayInfo.date,
        breakfast: buildSlot("breakfast", allApproved.find((r) => r.mealType === "breakfast") || allApproved[0]),
        lunch: buildSlot("lunch", allApproved.find((r) => r.mealType === "lunch") || allApproved[1 % allApproved.length]),
        dinner: buildSlot("dinner", allApproved.find((r) => r.mealType === "dinner") || allApproved[2 % allApproved.length]),
        snack: buildSlot("snack", snackCandidates.length > 0 ? snackCandidates[idx % snackCandidates.length] : allApproved[idx % allApproved.length]),
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

    const dateMap = new Map<string, Record<string, Recipe[]>>();
    for (const dm of allDailyMeals) {
      const rawDate = typeof dm.meal_date === "string" ? dm.meal_date.split("T")[0] : String(dm.meal_date);
      if (!dateMap.has(rawDate)) {
        dateMap.set(rawDate, {});
      }
      const slots = dateMap.get(rawDate)!;
      const items = Array.isArray(dm.meal_items) ? dm.meal_items : (dm.meal_items ? [dm.meal_items] : []);
      const recipesInMeal: Recipe[] = [];

      for (const rawItem of items) {
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
        recipesInMeal.push(frontendRecipe);
      }

      if (recipesInMeal.length > 0) {
        slots[dm.meal_type] = recipesInMeal;
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

      const buildSlot = (mealType: string, defaultDish: Recipe): MealSlotItem => {
        const list = slots[mealType] && slots[mealType].length > 0 ? slots[mealType] : [defaultDish];
        const maxTime = Math.max(...list.map((r) => (Number(r.prepTime) || 0) + (Number(r.cookTime) || 0)));
        return {
          recipe: list[0],
          recipes: list,
          time: `${maxTime || 25} min`,
        };
      };

      const baseDay: DayMealPlan = {
        dayName: dayNames[dayOfWeek],
        shortDay: dayShorts[dayOfWeek],
        dateText: `${monthShort[month]} ${d}`,
        breakfast: buildSlot("breakfast", allApproved[d % allApproved.length] || allApproved[0]),
        lunch: buildSlot("lunch", allApproved[(d + 1) % allApproved.length] || allApproved[0]),
        dinner: buildSlot("dinner", allApproved[(d + 2) % allApproved.length] || allApproved[0]),
        snack: buildSlot("snack", allApproved[(d + 3) % allApproved.length] || allApproved[0]),
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

  /**
   * Tự động quét và thay thế mọi món có dị ứng trong kế hoạch bằng món an toàn
   */
  sanitizePlanAllergies(plan: WeeklyMealPlan, profile: UserProfile): WeeklyMealPlan {
    if (!profile.allergies || profile.allergies.length === 0) return plan;

    let hasChange = false;
    const cleanDays = plan.days.map((day) => {
      const sanitizeSlot = (slot: MealSlotItem, mealType: "breakfast" | "lunch" | "dinner" | "snack"): MealSlotItem => {
        const dishes = slot.recipes && slot.recipes.length > 0 ? slot.recipes : [slot.recipe];
        let slotChanged = false;

        const cleanDishes = dishes.map((dish) => {
          if (checkAllergies(dish, profile).hasAllergy) {
            slotChanged = true;
            hasChange = true;
            const replacements = recipeService.getReplacementSuggestions(dish, profile);
            const safe = replacements.find((r) => !checkAllergies(r, profile).hasAllergy);
            return safe || dish;
          }
          return dish;
        }).filter((dish) => !checkAllergies(dish, profile).hasAllergy);

        if (cleanDishes.length === 0) {
          const recs = recipeService.getRecommendations(profile, 300, mealType);
          const safePick = recs.find((r) => !checkAllergies(r, profile).hasAllergy);
          if (safePick) {
            cleanDishes.push(safePick);
            slotChanged = true;
            hasChange = true;
          }
        }

        if (!slotChanged) return slot;

        const maxTime = Math.max(...cleanDishes.map((r) => (Number(r.prepTime) || 0) + (Number(r.cookTime) || 0)));
        return {
          recipe: cleanDishes[0],
          recipes: cleanDishes,
          time: `${maxTime || 25} min`,
        };
      };

      const updatedDay: DayMealPlan = {
        ...day,
        breakfast: sanitizeSlot(day.breakfast, "breakfast"),
        lunch: sanitizeSlot(day.lunch, "lunch"),
        dinner: sanitizeSlot(day.dinner, "dinner"),
        snack: sanitizeSlot(day.snack, "snack"),
      };

      return this.recalculateDay(updatedDay, day.targetCalories, String(profile.id || ""));
    });

    if (!hasChange) return plan;

    const totalKcal = cleanDays.reduce((sum, d) => sum + d.totalCalories, 0);
    const totalProt = cleanDays.reduce((sum, d) => sum + d.totalProtein, 0);
    const totalCost = cleanDays.reduce((sum, d) => sum + d.estimatedCost, 0);

    return {
      ...plan,
      days: cleanDays,
      averageDailyCalories: Math.round(totalKcal / cleanDays.length),
      averageProtein: Math.round(totalProt / cleanDays.length),
      totalEstimatedCost: totalCost,
      averageDailyCost: Math.round(totalCost / cleanDays.length),
    };
  },
};
