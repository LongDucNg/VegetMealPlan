"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import {
  WeeklyMealPlan,
  MonthlyMealPlan,
  DayMealPlan,
  CalendarDayMealPlan,
  MealPlanType,
  GenerationPlanOptions,
} from "../types";
import { mealPlannerService } from "../services/mealPlannerService";
import { useProfile } from "@/features/profile/hooks/useProfile";
import { calculateDailyCalorieTarget, withCalorieTarget } from "@/features/nutrition/utils/calorieCalculator";
import { nutritionService } from "@/features/nutrition/services/nutritionService";
import { tokenStorage } from "@/lib/tokenStorage";
import { ApiError } from "@/lib/apiClient";
import { storage, STORAGE_KEYS } from "@/utils/storage/storage";
import { Recipe } from "@/features/recipes/types";
import { UserProfile } from "@/features/profile/types";
import { SavedMealPlan, favoriteService } from "@/features/recipes/services/favoriteService";
import { recipeService } from "@/features/recipes/services/recipeService";
import { mealPlanApiService } from "../services/mealPlanApiService";
import { profileService } from "@/features/profile/services/profileService";

export function useMealPlanner() {
  const { profile } = useProfile();

  // "Plan for Someone Else" state (Requirement 17)
  const [isPlanForSomeoneElse, setIsPlanForSomeoneElse] = useState(false);
  const [someoneElseProfile, setSomeoneElseProfile] = useState<UserProfile | null>(null);

  // Active profile used for planning
  const activeProfile = useMemo(() => {
    if (isPlanForSomeoneElse && someoneElseProfile) {
      return someoneElseProfile;
    }
    return profile;
  }, [isPlanForSomeoneElse, someoneElseProfile, profile]);

  // NO AUTO-GENERATION: defaults to false unless explicitly generated or loaded (Requirements 18, 22, 29)
  const [hasGenerated, setHasGenerated] = useState<boolean>(() => {
    const saved = storage.getItem<{
      planType: MealPlanType;
      weeklyPlan: WeeklyMealPlan | null;
      monthlyPlan: MonthlyMealPlan | null;
      activeDayIndex: number;
    } | null>(STORAGE_KEYS.GENERATED_PLAN, null);
    return !!saved && (!!saved.weeklyPlan || !!saved.monthlyPlan);
  });

  interface SavedPlanData {
    planType?: MealPlanType;
    weeklyPlan?: WeeklyMealPlan | null;
    monthlyPlan?: MonthlyMealPlan | null;
    activeDayIndex?: number;
  }

  const [planType, setPlanType] = useState<MealPlanType>(() => {
    const saved = storage.getItem<SavedPlanData | null>(STORAGE_KEYS.GENERATED_PLAN, null);
    return saved?.planType || "weekly";
  });

  const [activeDayIndex, setActiveDayIndex] = useState<number>(() => {
    const saved = storage.getItem<SavedPlanData | null>(STORAGE_KEYS.GENERATED_PLAN, null);
    return saved?.activeDayIndex || 0;
  });

  // Store actual plans
  const [weeklyPlan, setWeeklyPlan] = useState<WeeklyMealPlan | null>(() => {
    const saved = storage.getItem<SavedPlanData | null>(STORAGE_KEYS.GENERATED_PLAN, null);
    return saved?.weeklyPlan || null;
  });
  const [monthlyPlan, setMonthlyPlan] = useState<MonthlyMealPlan | null>(() => {
    const saved = storage.getItem<SavedPlanData | null>(STORAGE_KEYS.GENERATED_PLAN, null);
    return saved?.monthlyPlan || null;
  });


  const [selectedMonth, setSelectedMonth] = useState<number>(() => new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState<number>(() => new Date().getFullYear());
  const [budgetLimit, setBudgetLimit] = useState<number | undefined>(undefined);

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationFeedback, setGenerationFeedback] = useState<string | null>(null);

  // Profile Change Notification without auto-regenerating (Requirement 29)
  const [profileChangedNotice, setProfileChangedNotice] = useState(false);
  const prevProfileRef = useRef<string>(JSON.stringify(profile));

  useEffect(() => {
    const currentJson = JSON.stringify(profile);
    if (hasGenerated && !isPlanForSomeoneElse && prevProfileRef.current !== currentJson) {
      setProfileChangedNotice(true);
    }
    prevProfileRef.current = currentJson;
  }, [profile, hasGenerated, isPlanForSomeoneElse]);

  // Listen for external recipe changes or price updates
  const [syncVersion, setSyncVersion] = useState(0);
  useEffect(() => {
    const unsubscribe = storage.subscribe((event) => {
      if (
        event.key === STORAGE_KEYS.RECIPES ||
        event.key === STORAGE_KEYS.RECIPE_PRICES ||
        event.key === STORAGE_KEYS.FAVORITES
      ) {
        setSyncVersion((v) => v + 1);
      }
    });
    return unsubscribe;
  }, []);

  // kcal mục tiêu của chính mình lấy từ backend (cùng hàm tính với lúc backend lập thực đơn),
  // để con số trên trang planner khớp với thực đơn nhận về. Chỉ lập cho người khác hoặc chưa đăng nhập
  // mới dùng công thức FE.
  const [serverCalorieTarget, setServerCalorieTarget] = useState<number | null>(null);
  useEffect(() => {
    if (isPlanForSomeoneElse || !tokenStorage.getToken()) {
      setServerCalorieTarget(null);
      return;
    }
    let cancelled = false;
    nutritionService
      .getServerNutritionSummary()
      .then((summary) => {
        if (!cancelled) setServerCalorieTarget(summary?.target_calories ?? null);
      })
      .catch(() => {
        if (!cancelled) setServerCalorieTarget(null);
      });
    return () => {
      cancelled = true;
    };
  }, [activeProfile, isPlanForSomeoneElse, syncVersion]);

  const nutritionSummary = useMemo(() => {
    void syncVersion;
    const local = calculateDailyCalorieTarget(activeProfile);
    return serverCalorieTarget ? withCalorieTarget(local, serverCalorieTarget) : local;
  }, [activeProfile, syncVersion, serverCalorieTarget]);

  // Current active day meal plan
  const activeDay: DayMealPlan | null = useMemo(() => {
    if (!hasGenerated) return null;

    if (planType === "weekly" && weeklyPlan) {
      return weeklyPlan.days[activeDayIndex] || weeklyPlan.days[0] || null;
    }

    if (planType === "monthly" && monthlyPlan) {
      return monthlyPlan.days[activeDayIndex] || monthlyPlan.days[0] || null;
    }

    return null;
  }, [hasGenerated, planType, weeklyPlan, monthlyPlan, activeDayIndex]);

  /**
   * Generates Weekly Meal Plan on explicit user action (Requirement 18, 19, 22)
   */
  /**
   * Generates Weekly Meal Plan using real database recipes and backend AI API (Requirement 18, 19, 22)
   */
  const generateWeekly = useCallback(
    async (options?: Partial<GenerationPlanOptions>, onComplete?: () => void) => {
      setIsGenerating(true);
      setGenerationFeedback("AI đang phân tích hồ sơ dinh dưỡng & công thức thật...");

      try {
        // 1. Đồng bộ công thức thật từ database
        await recipeService.syncRecipesFromApi();

        // 2. Đồng bộ profile nếu đã đăng nhập và là chính mình
        if (!isPlanForSomeoneElse) {
          await profileService.updateProfile(activeProfile).catch(() => {});
        }

        let plan: WeeklyMealPlan | null = null;

        // 3. Nếu không có danh sách món yêu thích tùy biến, thử gọi Backend API
        if (!options?.favoriteRecipeIds || options.favoriteRecipeIds.length === 0) {
          try {
            if (isPlanForSomeoneElse) {
              // Gọi API: POST /api/v1/meal-plans/generate/for-someone (Lập cho người thân)
              const mappedDiet =
                activeProfile.vegetarianType === "vegan"
                  ? "vegan"
                  : activeProfile.vegetarianType === "lacto_vegetarian"
                  ? "lacto"
                  : activeProfile.vegetarianType === "ovo_vegetarian"
                  ? "ovo"
                  : "ovo_lacto";

              const apiRes = await mealPlanApiService.generateForSomeone({
                profile_name: activeProfile.name || "Người thân",
                diet_type: mappedDiet,
                target_calories: nutritionSummary.dailyCalorieTarget,
                total_budget: options?.budgetLimit ?? budgetLimit,
              });
              if (apiRes && (apiRes.data || apiRes.weekly_plans || apiRes.meal_plan_id)) {
                plan = mealPlannerService.convertBackendWeeklyPlan(apiRes, activeProfile);
              }
            } else {
              // Gọi API #25: POST /api/v1/meal-plans/generate/weekly (Sinh thực đơn 7 ngày)
              const apiRes = await mealPlanApiService.generateWeekly({
                total_budget: options?.budgetLimit ?? budgetLimit,
              });
              if (apiRes && (apiRes.data || apiRes.weekly_plans || apiRes.meal_plan_id)) {
                plan = mealPlannerService.convertBackendWeeklyPlan(apiRes, activeProfile);
              }
            }
          } catch (apiErr) {
            // Lỗi nghiệp vụ từ backend (mục tiêu cân nặng không an toàn, hồ sơ thiếu, dị ứng...) phải báo cho
            // người dùng, không được lặng lẽ lùi về engine FE với công thức calo khác.
            if (isBusinessError(apiErr)) throw apiErr;
            console.warn("Backend generate failed, falling back to local engine with real DB recipes:", apiErr);
          }
        }

        // 4. Nếu chưa có plan (hoặc có favoriteRecipeIds), dùng engine với danh sách công thức thật
        if (!plan) {
          const seed = Math.floor(Math.random() * 100);
          plan = mealPlannerService.generateWeeklyPlan(activeProfile, seed, {
            planType: "weekly",
            budgetLimit: options?.budgetLimit ?? budgetLimit,
            favoriteRecipeIds: options?.favoriteRecipeIds,
          });
        }

        setWeeklyPlan(plan);
        setPlanType("weekly");
        setHasGenerated(true);
        setActiveDayIndex(0);
        setProfileChangedNotice(false);
        setIsGenerating(false);
        setGenerationFeedback("✓ Đã sinh thực đơn 7 ngày từ công thức thật!");
        storage.setItem(STORAGE_KEYS.GENERATED_PLAN, {
          planType: "weekly",
          weeklyPlan: plan,
          monthlyPlan: null,
          activeDayIndex: 0,
        });
        setTimeout(() => setGenerationFeedback(null), 3000);
        onComplete?.();
      } catch (err) {
        console.error("Lỗi khi sinh thực đơn tuần:", err);
        setIsGenerating(false);
        setGenerationFeedback(isBusinessError(err) ? err.message : "Có lỗi khi sinh thực đơn");
        setTimeout(() => setGenerationFeedback(null), isBusinessError(err) ? 8000 : 3000);
      }
    },
    [activeProfile, budgetLimit, isPlanForSomeoneElse]
  );

  /**
   * Generates Monthly Meal Plan using real database recipes and backend AI API (Requirement 18, 20, 21)
   */
  const generateMonthly = useCallback(
    async (
      month: number = selectedMonth,
      year: number = selectedYear,
      options?: Partial<GenerationPlanOptions>,
      onComplete?: () => void
    ) => {
      setIsGenerating(true);
      setGenerationFeedback(`AI đang chuẩn bị thực đơn cả tháng ${month + 1}/${year}...`);

      try {
        await recipeService.syncRecipesFromApi();

        if (!isPlanForSomeoneElse) {
          await profileService.updateProfile(activeProfile).catch(() => {});
        }

        let plan: MonthlyMealPlan | null = null;

        if (!options?.favoriteRecipeIds || options.favoriteRecipeIds.length === 0) {
          try {
            const apiRes = await mealPlanApiService.generateMonthly({
              total_budget: options?.budgetLimit ?? budgetLimit,
            });
            if (apiRes && (apiRes.data || apiRes.weekly_plans || apiRes.meal_plan_id)) {
              plan = mealPlannerService.convertBackendMonthlyPlan(apiRes, activeProfile, year, month);
            }
          } catch (apiErr) {
            if (isBusinessError(apiErr)) throw apiErr;
            console.warn("Backend generateMonthly failed, falling back to local engine with real DB recipes:", apiErr);
          }
        }

        if (!plan) {
          const seed = Math.floor(Math.random() * 100);
          plan = mealPlannerService.generateMonthlyPlan(activeProfile, year, month, seed, {
            planType: "monthly",
            budgetLimit: options?.budgetLimit ?? budgetLimit,
            favoriteRecipeIds: options?.favoriteRecipeIds,
          });
        }

        setMonthlyPlan(plan);
        setSelectedMonth(month);
        setSelectedYear(year);
        setPlanType("monthly");
        setHasGenerated(true);
        setActiveDayIndex(0);
        setProfileChangedNotice(false);
        setIsGenerating(false);
        setGenerationFeedback(`✓ Đã sinh thực đơn cả tháng cho ${plan.monthName}!`);
        storage.setItem(STORAGE_KEYS.GENERATED_PLAN, {
          planType: "monthly",
          weeklyPlan: null,
          monthlyPlan: plan,
          activeDayIndex: 0,
        });
        setTimeout(() => setGenerationFeedback(null), 3000);
        onComplete?.();
      } catch (err) {
        console.error("Lỗi khi sinh thực đơn tháng:", err);
        setIsGenerating(false);
        setGenerationFeedback(isBusinessError(err) ? err.message : "Có lỗi khi sinh thực đơn tháng");
        setTimeout(() => setGenerationFeedback(null), isBusinessError(err) ? 8000 : 3000);
      }
    },
    [activeProfile, selectedMonth, selectedYear, budgetLimit, isPlanForSomeoneElse]
  );

  /**
   * Change a single individual meal in the active plan without regenerating other meals (Requirement 3)
   */
  const replaceMeal = useCallback(
    (
      dayIdx: number,
      mealSlot: "breakfast" | "lunch" | "dinner" | "snack",
      newRecipe: Recipe
    ) => {
      const userId = String(activeProfile.id || "");
      // Đổi món thì tính lại theo kcal mục tiêu của chính thực đơn đang xem (backend trả về lúc lập).
      const targetCalories =
        (planType === "weekly" ? weeklyPlan?.targetCalories : monthlyPlan?.targetCalories) ??
        nutritionSummary.dailyCalorieTarget;

      if (planType === "weekly" && weeklyPlan) {
        const updatedDays = [...weeklyPlan.days];
        const day = updatedDays[dayIdx];
        if (!day) return;

        const updatedDay: DayMealPlan = {
          ...day,
          [mealSlot]: {
            recipe: newRecipe,
            time: `${newRecipe.prepTime + newRecipe.cookTime} min`,
          },
        };

        const recalculated = mealPlannerService.recalculateDay(
          updatedDay,
          targetCalories,
          userId
        );
        updatedDays[dayIdx] = recalculated;

        const totalKcal = updatedDays.reduce((sum, d) => sum + d.totalCalories, 0);
        const totalProtein = updatedDays.reduce((sum, d) => sum + d.totalProtein, 0);
        const totalCost = updatedDays.reduce((sum, d) => sum + d.estimatedCost, 0);

        setWeeklyPlan({
          days: updatedDays,
          averageDailyCalories: Math.round(totalKcal / updatedDays.length),
          averageProtein: Math.round(totalProtein / updatedDays.length),
          targetCalories,
          totalEstimatedCost: totalCost,
          averageDailyCost: Math.round(totalCost / updatedDays.length),
        });
      } else if (planType === "monthly" && monthlyPlan) {
        const updatedDays = [...monthlyPlan.days];
        const day = updatedDays[dayIdx];
        if (!day) return;

        const updatedDay: CalendarDayMealPlan = {
          ...day,
          [mealSlot]: {
            recipe: newRecipe,
            time: `${newRecipe.prepTime + newRecipe.cookTime} min`,
          },
        };

        const recalculated = mealPlannerService.recalculateDay(
          updatedDay,
          targetCalories,
          userId
        );

        updatedDays[dayIdx] = {
          ...recalculated,
          dayOfMonth: day.dayOfMonth,
          month: day.month,
          year: day.year,
          dateKey: day.dateKey,
          isCurrentMonth: day.isCurrentMonth,
        };

        const totalKcal = updatedDays.reduce((sum, d) => sum + d.totalCalories, 0);
        const totalCost = updatedDays.reduce((sum, d) => sum + d.estimatedCost, 0);

        setMonthlyPlan({
          ...monthlyPlan,
          days: updatedDays,
          totalEstimatedCost: totalCost,
          averageDailyCalories: Math.round(totalKcal / updatedDays.length),
          averageDailyCost: Math.round(totalCost / updatedDays.length),
        });
      }
    },
    [planType, weeklyPlan, monthlyPlan, activeProfile, nutritionSummary]
  );

  /**
   * Regenerates a single day with random variation (Requirement 3, 4)
   */
  const regenerateSingleDay = useCallback(
    (index: number) => {
      const targetDay =
        planType === "weekly"
          ? weeklyPlan?.days[index]
          : monthlyPlan?.days[index];
      if (!targetDay) return;

      const dayInfo = {
        day: targetDay.dayName,
        short: targetDay.shortDay,
        date: targetDay.dateText,
      };

      const randomOffset = Math.floor(Math.random() * 20) + 1;
      const regenerated = mealPlannerService.generateDayPlan(
        dayInfo,
        activeProfile,
        index,
        randomOffset
      );

      if (planType === "weekly" && weeklyPlan) {
        const updatedDays = [...weeklyPlan.days];
        updatedDays[index] = regenerated;
        const totalKcal = updatedDays.reduce((sum, d) => sum + d.totalCalories, 0);
        const totalProtein = updatedDays.reduce((sum, d) => sum + d.totalProtein, 0);
        const totalCost = updatedDays.reduce((sum, d) => sum + d.estimatedCost, 0);

        setWeeklyPlan({
          days: updatedDays,
          averageDailyCalories: Math.round(totalKcal / updatedDays.length),
          averageProtein: Math.round(totalProtein / updatedDays.length),
          targetCalories: weeklyPlan.targetCalories,
          totalEstimatedCost: totalCost,
          averageDailyCost: Math.round(totalCost / updatedDays.length),
        });
      } else if (planType === "monthly" && monthlyPlan) {
        const calDay = targetDay as CalendarDayMealPlan;
        const updatedDays = [...monthlyPlan.days];
        updatedDays[index] = {
          ...regenerated,
          dayOfMonth: calDay.dayOfMonth,
          month: calDay.month,
          year: calDay.year,
          dateKey: calDay.dateKey,
          isCurrentMonth: calDay.isCurrentMonth,
        };

        const totalKcal = updatedDays.reduce((sum, d) => sum + d.totalCalories, 0);
        const totalCost = updatedDays.reduce((sum, d) => sum + d.estimatedCost, 0);

        setMonthlyPlan({
          ...monthlyPlan,
          days: updatedDays,
          totalEstimatedCost: totalCost,
          averageDailyCalories: Math.round(totalKcal / updatedDays.length),
          averageDailyCost: Math.round(totalCost / updatedDays.length),
        });
      }
    },
    [planType, weeklyPlan, monthlyPlan, activeProfile]
  );

  /**
   * Save currently active plan to User Favorites and PostgreSQL Database
   */
  const saveCurrentMealPlan = useCallback(
    async (name: string): Promise<SavedMealPlan | null> => {
      const days = planType === "weekly" ? weeklyPlan?.days : monthlyPlan?.days;
      if (!days || days.length === 0) return null;

      const totalCost =
        planType === "weekly"
          ? weeklyPlan?.totalEstimatedCost || 0
          : monthlyPlan?.totalEstimatedCost || 0;

      const saved = await favoriteService.saveMealPlan(String(profile.id || "u1"), {
        name,
        planType,
        targetCalories: nutritionSummary.dailyCalorieTarget,
        totalEstimatedCost: totalCost,
        days,
      });

      return saved;
    },
    [planType, weeklyPlan, monthlyPlan, profile, nutritionSummary]
  );

  /**
   * Load a saved meal plan as current active plan (Requirement 1)
   */
  const loadSavedPlan = useCallback((saved: SavedMealPlan) => {
    if (saved.planType === "weekly") {
      const totalKcal = saved.days.reduce((sum, d) => sum + d.totalCalories, 0);
      const totalProtein = saved.days.reduce((sum, d) => sum + d.totalProtein, 0);
      const totalCost = saved.days.reduce((sum, d) => sum + d.estimatedCost, 0);

      const newPlan: WeeklyMealPlan = {
        days: saved.days,
        averageDailyCalories: Math.round(totalKcal / saved.days.length),
        averageProtein: Math.round(totalProtein / saved.days.length),
        targetCalories: saved.targetCalories,
        totalEstimatedCost: totalCost,
        averageDailyCost: Math.round(totalCost / saved.days.length),
      };

      setWeeklyPlan(newPlan);
      setPlanType("weekly");
      setHasGenerated(true);
      setActiveDayIndex(0);

      storage.setItem(STORAGE_KEYS.GENERATED_PLAN, {
        planType: "weekly",
        weeklyPlan: newPlan,
        monthlyPlan: null,
        activeDayIndex: 0,
      });
    }
  }, []);

  /**
   * Apply day created from favorites (Requirement 2)
   */
  const applyFavoriteDayPlan = useCallback(
    (dayPlan: DayMealPlan) => {
      if (!weeklyPlan) {
        // Initialize 7-day plan with this favorite day as day 0
        const base = mealPlannerService.generateWeeklyPlan(activeProfile, 1);
        base.days[0] = dayPlan;
        setWeeklyPlan(base);
        setPlanType("weekly");
        setHasGenerated(true);
        setActiveDayIndex(0);

        storage.setItem(STORAGE_KEYS.GENERATED_PLAN, {
          planType: "weekly",
          weeklyPlan: base,
          monthlyPlan: null,
          activeDayIndex: 0,
        });
      } else {
        const updatedDays = [...weeklyPlan.days];
        updatedDays[activeDayIndex] = dayPlan;
        const totalKcal = updatedDays.reduce((sum, d) => sum + d.totalCalories, 0);
        const totalProtein = updatedDays.reduce((sum, d) => sum + d.totalProtein, 0);
        const totalCost = updatedDays.reduce((sum, d) => sum + d.estimatedCost, 0);

        const updatedPlan: WeeklyMealPlan = {
          ...weeklyPlan,
          days: updatedDays,
          averageDailyCalories: Math.round(totalKcal / updatedDays.length),
          averageProtein: Math.round(totalProtein / updatedDays.length),
          totalEstimatedCost: totalCost,
          averageDailyCost: Math.round(totalCost / updatedDays.length),
        };

        setWeeklyPlan(updatedPlan);

        storage.setItem(STORAGE_KEYS.GENERATED_PLAN, {
          planType: "weekly",
          weeklyPlan: updatedPlan,
          monthlyPlan: null,
          activeDayIndex,
        });
      }
    },
    [weeklyPlan, activeDayIndex, activeProfile]
  );

  return {
    hasGenerated,
    planType,
    setPlanType,
    weeklyPlan,
    monthlyPlan,
    activeDay,
    activeDayIndex,
    setActiveDayIndex,
    nutritionSummary,
    isGenerating,
    generationFeedback,
    profileChangedNotice,
    activeProfile,
    isPlanForSomeoneElse,
    setIsPlanForSomeoneElse,
    someoneElseProfile,
    setSomeoneElseProfile,
    budgetLimit,
    setBudgetLimit,
    selectedMonth,
    setSelectedMonth,
    selectedYear,
    setSelectedYear,
    generateWeekly,
    generateMonthly,
    replaceMeal,
    regenerateSingleDay,
    saveCurrentMealPlan,
    loadSavedPlan,
    applyFavoriteDayPlan,
  };
}

/** Lỗi 4xx có mã từ backend (trừ 401 hết phiên): là lỗi nghiệp vụ cần hiện cho người dùng. */
function isBusinessError(err: unknown): err is ApiError {
  return err instanceof ApiError && err.status >= 400 && err.status < 500 && err.status !== 401;
}
