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
import { mealPlannerService, getCurrentWeekDates } from "../services/mealPlannerService";
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
import { subscriptionService } from "@/features/subscription/services/subscriptionService";

export function formatVnDateKey(dateKey: string): string {
  const [y, m, d] = dateKey.split("-");
  return `${d}/${m}/${y}`;
}

export function toDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function isPastDate(dateKey: string): boolean {
  const now = new Date();
  const todayKey = toDateKey(now);
  return dateKey < todayKey;
}

export function useMealPlanner() {
  const { profile } = useProfile();

  // Load someone else profile from storage if previously saved
  const [someoneElseProfile, setSomeoneElseProfile] = useState<UserProfile | null>(() => {
    return storage.getItem<UserProfile | null>(STORAGE_KEYS.SOMEONE_ELSE_PROFILE, null);
  });
  const [isPlanForSomeoneElse, setIsPlanForSomeoneElse] = useState<boolean>(() => {
    return Boolean(storage.getItem<UserProfile | null>(STORAGE_KEYS.SOMEONE_ELSE_PROFILE, null));
  });

  // Active profile used for planning (Displays someone else when active)
  const activeProfile = useMemo(() => {
    if (isPlanForSomeoneElse && someoneElseProfile) {
      return someoneElseProfile;
    }
    return profile;
  }, [isPlanForSomeoneElse, someoneElseProfile, profile]);

  const applySomeoneElseProfile = useCallback((newProfile: UserProfile) => {
    setSomeoneElseProfile(newProfile);
    setIsPlanForSomeoneElse(true);
    storage.setItem(STORAGE_KEYS.SOMEONE_ELSE_PROFILE, newProfile);
  }, []);

  const resetToMyself = useCallback(() => {
    setSomeoneElseProfile(null);
    setIsPlanForSomeoneElse(false);
    storage.removeItem(STORAGE_KEYS.SOMEONE_ELSE_PROFILE);
  }, []);

  // View mode / plan type: "daily" | "weekly" | "monthly"
  const [planType, setPlanType] = useState<MealPlanType>("monthly");

  // Selected date key (default today)
  const [selectedDateKey, setSelectedDateKey] = useState<string>(() => toDateKey(new Date()));

  // Active day index in weekly/monthly view
  const [activeDayIndex, setActiveDayIndex] = useState<number>(0);

  // Month & Year state
  const [selectedMonth, setSelectedMonth] = useState<number>(() => new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState<number>(() => new Date().getFullYear());
  const [budgetLimit, setBudgetLimit] = useState<number | undefined>(undefined);

  // Granular day-by-day storage of created plans
  const [generatedDays, setGeneratedDays] = useState<Record<string, CalendarDayMealPlan>>(() => {
    return storage.getItem<Record<string, CalendarDayMealPlan>>(STORAGE_KEYS.GENERATED_DAYS, {});
  });

  // Track if at least one day has been generated
  const hasGenerated = useMemo(() => {
    return Object.keys(generatedDays).length > 0;
  }, [generatedDays]);

  const saveGeneratedDays = useCallback((newMap: Record<string, CalendarDayMealPlan>) => {
    setGeneratedDays(newMap);
    storage.setItem(STORAGE_KEYS.GENERATED_DAYS, newMap);
  }, []);

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationFeedback, setGenerationFeedback] = useState<string | null>(null);

  // Profile Change Notice
  const [profileChangedNotice, setProfileChangedNotice] = useState(false);
  const prevProfileRef = useRef<string>(JSON.stringify(profile));

  useEffect(() => {
    const currentJson = JSON.stringify(profile);
    if (hasGenerated && !isPlanForSomeoneElse && prevProfileRef.current !== currentJson) {
      setProfileChangedNotice(true);
    }
    prevProfileRef.current = currentJson;
  }, [profile, hasGenerated, isPlanForSomeoneElse]);

  // Sync external changes
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

  // Calorie target
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

  // Subscription Period for 30-day package constraint
  const subPeriod = useMemo(() => {
    return subscriptionService.getSubscriptionPeriod();
  }, [syncVersion]);

  // Month navigation boundary: current month and next month within subscription period
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const monthDiff = (selectedYear - currentYear) * 12 + (selectedMonth - currentMonth);

  const canPrevMonth = monthDiff > 0;

  // RÀNG BUỘC NAVIGATION: Chỉ cho phép sang tháng sau nếu ngày đầu tháng sau vẫn thuộc chu kỳ 30 ngày của gói (<= subPeriod.endDateKey)
  const nextMonthNum = selectedMonth === 11 ? 0 : selectedMonth + 1;
  const nextYearNum = selectedMonth === 11 ? selectedYear + 1 : selectedYear;
  const firstDayOfNextMonthKey = `${nextYearNum}-${String(nextMonthNum + 1).padStart(2, "0")}-01`;
  const canNextMonth = monthDiff < 1 && firstDayOfNextMonthKey <= subPeriod.endDateKey;

  const handlePrevMonth = useCallback(() => {
    if (!canPrevMonth) return;
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear((y) => y - 1);
    } else {
      setSelectedMonth((m) => m - 1);
    }
  }, [canPrevMonth, selectedMonth]);

  const handleNextMonth = useCallback(() => {
    if (!canNextMonth) return;
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear((y) => y + 1);
    } else {
      setSelectedMonth((m) => m + 1);
    }
  }, [canNextMonth, selectedMonth]);

  // Build Dynamic Monthly Plan from generatedDays
  const monthlyPlan: MonthlyMealPlan = useMemo(() => {
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const shortDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const calendarDays: CalendarDayMealPlan[] = [];

    for (let dayNum = 1; dayNum <= daysInMonth; dayNum++) {
      const curDate = new Date(selectedYear, selectedMonth, dayNum);
      const dayOfWeekIdx = curDate.getDay();
      const dateKey = `${selectedYear}-${String(selectedMonth + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
      const isOutOfSubscription = dateKey > subPeriod.endDateKey || (subPeriod.startDateKey ? dateKey < subPeriod.startDateKey : false);

      if (generatedDays[dateKey]) {
        const d = generatedDays[dateKey];
        calendarDays.push({
          ...d,
          targetCalories: nutritionSummary.dailyCalorieTarget,
          remainingCalories: Math.round(nutritionSummary.dailyCalorieTarget - d.totalCalories),
          isOutOfSubscription,
        });
      } else {
        calendarDays.push({
          dayOfMonth: dayNum,
          month: selectedMonth,
          year: selectedYear,
          isCurrentMonth: true,
          dateKey,
          isOutOfSubscription,
          dayName: dayNames[dayOfWeekIdx],
          shortDay: shortDays[dayOfWeekIdx],
          dateText: `${monthNames[selectedMonth].substring(0, 3)} ${dayNum}`,
          breakfast: { time: "07:30", recipe: null as any, recipes: [] },
          lunch: { time: "12:30", recipe: null as any, recipes: [] },
          dinner: { time: "19:00", recipe: null as any, recipes: [] },
          snack: { time: "16:00", recipe: null as any, recipes: [] },
          totalCalories: 0,
          totalProtein: 0,
          totalCarbs: 0,
          totalFat: 0,
          targetCalories: nutritionSummary.dailyCalorieTarget,
          remainingCalories: 0,
          estimatedCost: 0,
        });
      }
    }

    const createdDays = calendarDays.filter((d) => d.totalCalories > 0);
    const totalCost = createdDays.reduce((sum, d) => sum + d.estimatedCost, 0);
    const totalKcal = createdDays.reduce((sum, d) => sum + d.totalCalories, 0);

    return {
      month: selectedMonth,
      year: selectedYear,
      monthName: `${monthNames[selectedMonth]} ${selectedYear}`,
      days: calendarDays,
      totalEstimatedCost: totalCost,
      averageDailyCalories: createdDays.length > 0 ? Math.round(totalKcal / createdDays.length) : 0,
      averageDailyCost: createdDays.length > 0 ? Math.round(totalCost / createdDays.length) : 0,
      targetCalories: nutritionSummary.dailyCalorieTarget,
      budgetLimit,
      subscriptionPeriod: {
        startDateKey: subPeriod.startDateKey,
        endDateKey: subPeriod.endDateKey,
        totalDays: subPeriod.totalDays,
      },
    };
  }, [selectedYear, selectedMonth, generatedDays, nutritionSummary, budgetLimit, subPeriod]);

  // Build Dynamic Weekly Plan for current week based on selectedDateKey (or today)
  const weeklyPlan: WeeklyMealPlan = useMemo(() => {
    const refDate = new Date();
    const dayOfWeek = refDate.getDay();
    const diffToMonday = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
    const monday = new Date(refDate);
    monday.setDate(refDate.getDate() + diffToMonday);

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

    const weekDays: CalendarDayMealPlan[] = dayNames.map((item, idx) => {
      const cur = new Date(monday);
      cur.setDate(monday.getDate() + idx);
      const dateKey = toDateKey(cur);

      if (generatedDays[dateKey]) {
        const d = generatedDays[dateKey];
        return {
          ...d,
          targetCalories: nutritionSummary.dailyCalorieTarget,
          remainingCalories: Math.round(nutritionSummary.dailyCalorieTarget - d.totalCalories),
        };
      }

      return {
        dayOfMonth: cur.getDate(),
        month: cur.getMonth(),
        year: cur.getFullYear(),
        isCurrentMonth: true,
        dateKey,
        dayName: item.day,
        shortDay: item.short,
        dateText: `${monthShort[cur.getMonth()]} ${cur.getDate()}`,
        breakfast: { time: "07:30", recipe: null as any, recipes: [] },
        lunch: { time: "12:30", recipe: null as any, recipes: [] },
        dinner: { time: "19:00", recipe: null as any, recipes: [] },
        snack: { time: "16:00", recipe: null as any, recipes: [] },
        totalCalories: 0,
        totalProtein: 0,
        totalCarbs: 0,
        totalFat: 0,
        targetCalories: nutritionSummary.dailyCalorieTarget,
        remainingCalories: 0,
        estimatedCost: 0,
      };
    });

    const createdDays = weekDays.filter((d) => d.totalCalories > 0);
    const totalCost = createdDays.reduce((sum, d) => sum + d.estimatedCost, 0);
    const totalKcal = createdDays.reduce((sum, d) => sum + d.totalCalories, 0);
    const totalProt = createdDays.reduce((sum, d) => sum + d.totalProtein, 0);

    return {
      days: weekDays,
      averageDailyCalories: createdDays.length > 0 ? Math.round(totalKcal / createdDays.length) : 0,
      averageProtein: createdDays.length > 0 ? Math.round(totalProt / createdDays.length) : 0,
      targetCalories: nutritionSummary.dailyCalorieTarget,
      totalEstimatedCost: totalCost,
      averageDailyCost: createdDays.length > 0 ? Math.round(totalCost / createdDays.length) : 0,
      budgetLimit,
    };
  }, [generatedDays, nutritionSummary, budgetLimit]);

  // Current active day meal plan
  const activeDay: DayMealPlan | null = useMemo(() => {
    let day: DayMealPlan | null = null;
    if (planType === "daily") {
      day = generatedDays[selectedDateKey] || null;
    } else if (planType === "weekly") {
      day = weeklyPlan.days[activeDayIndex] || null;
    } else if (planType === "monthly") {
      day = monthlyPlan.days[activeDayIndex] || null;
    }
    if (day && day.targetCalories !== nutritionSummary.dailyCalorieTarget) {
      return {
        ...day,
        targetCalories: nutritionSummary.dailyCalorieTarget,
        remainingCalories: Math.round(nutritionSummary.dailyCalorieTarget - day.totalCalories),
      };
    }
    return day;
  }, [planType, selectedDateKey, generatedDays, weeklyPlan, monthlyPlan, activeDayIndex, nutritionSummary.dailyCalorieTarget]);

  /**
   * Generates Daily Meal Plan for EXACTLY 1 day (selectedDateKey or today)
   * Does NOT generate the full week!
   */
  const generateDaily = useCallback(
    async (options?: Partial<GenerationPlanOptions>, onComplete?: () => void) => {
      const todayKey = toDateKey(new Date());
      const targetDateKey = selectedDateKey < todayKey ? todayKey : selectedDateKey;

      if (isPastDate(targetDateKey)) {
        setGenerationFeedback("Không thể tạo thực đơn cho ngày trong quá khứ.");
        setTimeout(() => setGenerationFeedback(null), 3000);
        return;
      }

      setIsGenerating(true);
      setGenerationFeedback(`AI đang tạo thực đơn cá nhân hóa cho ngày ${targetDateKey}...`);

      try {
        await recipeService.syncRecipesFromApi();

        const [y, m, d] = targetDateKey.split("-").map(Number);
        const curDate = new Date(y, m - 1, d);
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const shortDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const monthShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const dayInfo = {
          day: dayNames[curDate.getDay()],
          short: shortDays[curDate.getDay()],
          date: `${monthShort[m - 1]} ${d}`,
        };

        const randomSeed = Math.floor(Math.random() * 50);
        const dayPlan = mealPlannerService.generateDayPlan(
          dayInfo,
          activeProfile,
          d,
          randomSeed,
          {
            planType: "daily",
            budgetLimit: options?.budgetLimit ?? budgetLimit,
            favoriteRecipeIds: options?.favoriteRecipeIds,
            targetCalories: nutritionSummary.dailyCalorieTarget,
          }
        );

        const calDayPlan: CalendarDayMealPlan = {
          ...dayPlan,
          dayOfMonth: d,
          month: m - 1,
          year: y,
          dateKey: targetDateKey,
          isCurrentMonth: true,
        };

        const newMap = {
          ...generatedDays,
          [targetDateKey]: calDayPlan,
        };

        saveGeneratedDays(newMap);
        setSelectedDateKey(targetDateKey);
        setPlanType("daily");
        setIsGenerating(false);
        setGenerationFeedback(`✓ Đã tạo thực đơn cho ngày ${dayInfo.date}!`);
        setTimeout(() => setGenerationFeedback(null), 3000);
        onComplete?.();
      } catch (err) {
        console.error("Lỗi khi sinh thực đơn ngày:", err);
        setIsGenerating(false);
        setGenerationFeedback("Có lỗi khi tạo thực đơn ngày.");
        setTimeout(() => setGenerationFeedback(null), 3000);
      }
    },
    [selectedDateKey, activeProfile, budgetLimit, generatedDays, saveGeneratedDays]
  );

  /**
   * Generates Weekly Meal Plan: ONLY for today and future days in current week
   * Past days are NEVER generated!
   */
  const generateWeekly = useCallback(
    async (options?: Partial<GenerationPlanOptions>, onComplete?: () => void) => {
      setIsGenerating(true);
      setGenerationFeedback("AI đang tạo kế hoạch tuần (bỏ qua ngày đã qua)...");

      try {
        await recipeService.syncRecipesFromApi();

        const refDate = new Date();
        const dayOfWeek = refDate.getDay();
        const diffToMonday = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
        const monday = new Date(refDate);
        monday.setDate(refDate.getDate() + diffToMonday);

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

        const newMap = { ...generatedDays };
        let generatedCount = 0;
        const rollingRecentIds: string[] = [];

        // Thu thập trước các món từ 14 ngày gần nhất trong lịch để không bị trùng lặp
        Object.values(generatedDays).forEach((gd) => {
          if (gd) {
            [
              ...(gd.breakfast.recipes || [gd.breakfast.recipe]),
              ...(gd.lunch.recipes || [gd.lunch.recipe]),
              ...(gd.dinner.recipes || [gd.dinner.recipe]),
              ...(gd.snack.recipes || [gd.snack.recipe]),
            ].forEach((d) => d && rollingRecentIds.push(d.id));
          }
        });

        for (let idx = 0; idx < 7; idx++) {
          const cur = new Date(monday);
          cur.setDate(monday.getDate() + idx);
          const dateKey = toDateKey(cur);

          // DO NOT generate for past days!
          if (isPastDate(dateKey)) {
            continue;
          }

          const dayInfo = {
            day: dayNames[idx].day,
            short: dayNames[idx].short,
            date: `${monthShort[cur.getMonth()]} ${cur.getDate()}`,
          };

          const dayPlan = mealPlannerService.generateDayPlan(
            dayInfo,
            activeProfile,
            idx,
            Math.floor(Math.random() * 50) + idx,
            {
              planType: "weekly",
              budgetLimit: options?.budgetLimit ?? budgetLimit,
              favoriteRecipeIds: options?.favoriteRecipeIds,
              recentRecipeIds: rollingRecentIds,
              targetCalories: nutritionSummary.dailyCalorieTarget,
            }
          );

          const dayDishes = [
            ...(dayPlan.breakfast.recipes || [dayPlan.breakfast.recipe]),
            ...(dayPlan.lunch.recipes || [dayPlan.lunch.recipe]),
            ...(dayPlan.dinner.recipes || [dayPlan.dinner.recipe]),
            ...(dayPlan.snack.recipes || [dayPlan.snack.recipe]),
          ].filter(Boolean);
          dayDishes.forEach((d) => rollingRecentIds.push(d.id));

          newMap[dateKey] = {
            ...dayPlan,
            dayOfMonth: cur.getDate(),
            month: cur.getMonth(),
            year: cur.getFullYear(),
            dateKey,
            isCurrentMonth: true,
          };
          generatedCount++;
        }

        saveGeneratedDays(newMap);
        setPlanType("weekly");
        setActiveDayIndex(dayOfWeek === 0 ? 6 : dayOfWeek - 1); // select today in week
        setIsGenerating(false);
        setGenerationFeedback(`✓ Đã tạo kế hoạch tuần (${generatedCount} ngày từ hôm nay đến cuối tuần)!`);
        setTimeout(() => setGenerationFeedback(null), 3000);
        onComplete?.();
      } catch (err) {
        console.error("Lỗi khi sinh thực đơn tuần:", err);
        setIsGenerating(false);
        setGenerationFeedback("Có lỗi khi tạo thực đơn tuần.");
        setTimeout(() => setGenerationFeedback(null), 3000);
      }
    },
    [activeProfile, budgetLimit, generatedDays, saveGeneratedDays]
  );

  /**
   * Generates Monthly Meal Plan:
   * RÀNG BUỘC THEO GÓI ĐĂNG KÝ 30 NGÀY:
   * - Chỉ cho phép tạo thực đơn tính từ ngày đăng ký (hoặc hôm nay) tới ngày hết hạn của gói (chu kỳ đúng 30 ngày).
   * - Tuyệt đối không sinh thêm thực đơn ngoài chu kỳ 30 ngày này hoặc cho các tháng sau khi gói đã hết hạn.
   */
  const generateMonthly = useCallback(
    async (
      month: number = selectedMonth,
      year: number = selectedYear,
      options?: Partial<GenerationPlanOptions>,
      onComplete?: () => void
    ) => {
      const today = new Date();
      const todayKey = toDateKey(today);
      const period = subscriptionService.getSubscriptionPeriod();

      // Kiểm tra nếu gói đã hết hạn trước hôm nay
      if (todayKey > period.endDateKey) {
        setGenerationFeedback(`Gói Premium của bạn đã hết hạn vào ngày ${formatVnDateKey(period.endDateKey)}. Vui lòng gia hạn gói để tiếp tục!`);
        setTimeout(() => setGenerationFeedback(null), 4000);
        return;
      }

      // Kiểm tra nếu tháng đang xem hoàn toàn nằm ngoài chu kỳ gói
      const firstDayKey = `${year}-${String(month + 1).padStart(2, "0")}-01`;
      if (firstDayKey > period.endDateKey) {
        setGenerationFeedback(`Không thể tạo thực đơn cho tháng ${month + 1}/${year} vì đã vượt quá ngày hết hạn gói (${formatVnDateKey(period.endDateKey)}). Vui lòng gia hạn gói!`);
        setTimeout(() => setGenerationFeedback(null), 4000);
        return;
      }

      setIsGenerating(true);
      setGenerationFeedback(`AI đang tạo thực đơn cho chu kỳ 30 ngày của gói (đến ngày ${formatVnDateKey(period.endDateKey)})...`);

      try {
        await recipeService.syncRecipesFromApi();

        const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December",
        ];
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const shortDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        const newMap = { ...generatedDays };
        let generatedCount = 0;
        const rolling14Days: string[][] = [];

        // Thu thập trước các món từ các ngày đã tồn tại
        const existingIds = Object.values(generatedDays)
          .flatMap((gd) => gd ? [
            ...(gd.breakfast.recipes || [gd.breakfast.recipe]),
            ...(gd.lunch.recipes || [gd.lunch.recipe]),
            ...(gd.dinner.recipes || [gd.dinner.recipe]),
            ...(gd.snack.recipes || [gd.snack.recipe]),
          ] : [])
          .filter(Boolean)
          .map((d) => d.id);
        if (existingIds.length > 0) {
          rolling14Days.push(existingIds.slice(-28));
        }

        // Tạo danh sách các ngày trong chu kỳ gói 30 ngày:
        // Bắt đầu từ hôm nay (không tạo thực đơn cho quá khứ)
        const startCursor = new Date(today);
        startCursor.setHours(0, 0, 0, 0);

        const endCursor = new Date(period.endDate);
        endCursor.setHours(23, 59, 59, 999);

        const datesToPlan: Date[] = [];
        const iter = new Date(startCursor);
        while (iter <= endCursor && datesToPlan.length < 30) {
          datesToPlan.push(new Date(iter));
          iter.setDate(iter.getDate() + 1);
        }

        for (const curDate of datesToPlan) {
          const cYear = curDate.getFullYear();
          const cMonth = curDate.getMonth();
          const cDay = curDate.getDate();
          const dateKey = toDateKey(curDate);

          // RÀNG BUỘC TUYỆT ĐỐI: Bỏ qua nếu quá khứ hoặc vượt quá hạn gói
          if (isPastDate(dateKey) || dateKey > period.endDateKey) {
            continue;
          }

          const dayInfo = {
            day: dayNames[curDate.getDay()],
            short: shortDays[curDate.getDay()],
            date: `${monthNames[cMonth].substring(0, 3)} ${cDay}`,
          };

          const dayPlan = mealPlannerService.generateDayPlan(
            dayInfo,
            activeProfile,
            cDay,
            Math.floor(Math.random() * 50) + cDay,
            {
              planType: "monthly",
              budgetLimit: options?.budgetLimit ?? budgetLimit,
              favoriteRecipeIds: options?.favoriteRecipeIds,
              recentRecipeIds: rolling14Days.flat(),
              targetCalories: nutritionSummary.dailyCalorieTarget,
            }
          );

          const dayDishes = [
            ...(dayPlan.breakfast.recipes || [dayPlan.breakfast.recipe]),
            ...(dayPlan.lunch.recipes || [dayPlan.lunch.recipe]),
            ...(dayPlan.dinner.recipes || [dayPlan.dinner.recipe]),
            ...(dayPlan.snack.recipes || [dayPlan.snack.recipe]),
          ].filter(Boolean);
          rolling14Days.push(dayDishes.map((x) => x.id));
          if (rolling14Days.length > 14) {
            rolling14Days.shift(); // Luôn giữ cửa sổ đúng 14 ngày (2 tuần)
          }

          newMap[dateKey] = {
            ...dayPlan,
            dayOfMonth: cDay,
            month: cMonth,
            year: cYear,
            dateKey,
            isCurrentMonth: cMonth === selectedMonth,
            isOutOfSubscription: false,
          };
          generatedCount++;
        }

        saveGeneratedDays(newMap);
        setPlanType("monthly");
        setIsGenerating(false);
        const startDisplay = datesToPlan.length > 0 ? formatVnDateKey(toDateKey(datesToPlan[0])) : "";
        const endDisplay = datesToPlan.length > 0 ? formatVnDateKey(toDateKey(datesToPlan[datesToPlan.length - 1])) : "";
        setGenerationFeedback(`✓ Đã tạo thành công thực đơn chu kỳ 30 ngày của gói (${generatedCount} ngày từ ${startDisplay} đến ${endDisplay})!`);
        setTimeout(() => setGenerationFeedback(null), 4000);
        onComplete?.();
      } catch (err) {
        console.error("Lỗi khi sinh thực đơn tháng:", err);
        setIsGenerating(false);
        setGenerationFeedback("Có lỗi khi tạo thực đơn tháng.");
        setTimeout(() => setGenerationFeedback(null), 3000);
      }
    },
    [selectedMonth, selectedYear, activeProfile, budgetLimit, generatedDays, saveGeneratedDays]
  );

  /**
   * Replace a single meal in the currently selected day
   */
  const replaceMeal = useCallback(
    (
      dayIdx: number,
      mealSlot: "breakfast" | "lunch" | "dinner" | "snack",
      newRecipe: Recipe,
      recipeIndex?: number
    ) => {
      // Find the dateKey of the day being modified
      let targetDateKey = selectedDateKey;
      if (planType === "weekly" && weeklyPlan.days[dayIdx]) {
        targetDateKey = (weeklyPlan.days[dayIdx] as CalendarDayMealPlan).dateKey || selectedDateKey;
      } else if (planType === "monthly" && monthlyPlan.days[dayIdx]) {
        targetDateKey = (monthlyPlan.days[dayIdx] as CalendarDayMealPlan).dateKey || selectedDateKey;
      }

      if (targetDateKey > subPeriod.endDateKey) {
        setGenerationFeedback(`Không thể đổi món vì ngày này đã ngoài chu kỳ gói đăng ký (hết hạn ngày ${formatVnDateKey(subPeriod.endDateKey)}).`);
        setTimeout(() => setGenerationFeedback(null), 3500);
        return;
      }

      const existingDay = generatedDays[targetDateKey];
      if (!existingDay) return;

      const currentSlot = existingDay[mealSlot];
      const existingRecipes = currentSlot?.recipes && currentSlot.recipes.length > 0
        ? [...currentSlot.recipes]
        : [currentSlot.recipe];

      if (recipeIndex !== undefined && recipeIndex >= 0 && recipeIndex < existingRecipes.length) {
        existingRecipes[recipeIndex] = newRecipe;
      } else {
        existingRecipes[0] = newRecipe;
      }

      const maxTime = Math.max(...existingRecipes.map((r) => (Number(r.prepTime) || 0) + (Number(r.cookTime) || 0)));

      const updatedDay: CalendarDayMealPlan = {
        ...existingDay,
        [mealSlot]: {
          recipe: existingRecipes[0],
          recipes: existingRecipes,
          time: `${maxTime || 25} min`,
        },
      };

      const recalculated = mealPlannerService.recalculateDay(
        updatedDay,
        nutritionSummary.dailyCalorieTarget,
        String(activeProfile.id || "")
      ) as CalendarDayMealPlan;

      saveGeneratedDays({
        ...generatedDays,
        [targetDateKey]: {
          ...recalculated,
          dayOfMonth: existingDay.dayOfMonth,
          month: existingDay.month,
          year: existingDay.year,
          dateKey: targetDateKey,
          isCurrentMonth: true,
        },
      });
    },
    [selectedDateKey, planType, weeklyPlan, monthlyPlan, generatedDays, nutritionSummary, activeProfile, saveGeneratedDays]
  );

  /**
   * Regenerate single day
   */
  const regenerateSingleDay = useCallback(
    (index: number) => {
      let targetDateKey = selectedDateKey;
      if (planType === "weekly" && weeklyPlan.days[index]) {
        targetDateKey = (weeklyPlan.days[index] as CalendarDayMealPlan).dateKey || selectedDateKey;
      } else if (planType === "monthly" && monthlyPlan.days[index]) {
        targetDateKey = (monthlyPlan.days[index] as CalendarDayMealPlan).dateKey || selectedDateKey;
      }

      if (isPastDate(targetDateKey)) {
        setGenerationFeedback("Không thể tạo lại thực đơn cho ngày trong quá khứ.");
        setTimeout(() => setGenerationFeedback(null), 3000);
        return;
      }

      if (targetDateKey > subPeriod.endDateKey) {
        setGenerationFeedback(`Không thể tạo lại vì ngày này đã ngoài chu kỳ gói đăng ký (hết hạn ngày ${formatVnDateKey(subPeriod.endDateKey)}).`);
        setTimeout(() => setGenerationFeedback(null), 3500);
        return;
      }

      const existing = generatedDays[targetDateKey];
      const [y, m, d] = targetDateKey.split("-").map(Number);
      const curDate = new Date(y, m - 1, d);
      const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const shortDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const monthShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

      const dayInfo = {
        day: dayNames[curDate.getDay()],
        short: shortDays[curDate.getDay()],
        date: `${monthShort[m - 1]} ${d}`,
      };

      const regenerated = mealPlannerService.generateDayPlan(
        dayInfo,
        activeProfile,
        d,
        Math.floor(Math.random() * 50) + 1,
        {
          targetCalories: nutritionSummary.dailyCalorieTarget,
        }
      );

      const calDay: CalendarDayMealPlan = {
        ...regenerated,
        dayOfMonth: d,
        month: m - 1,
        year: y,
        dateKey: targetDateKey,
        isCurrentMonth: true,
      };

      saveGeneratedDays({
        ...generatedDays,
        [targetDateKey]: calDay,
      });

      setGenerationFeedback(`✓ Đã tạo lại món cho ngày ${dayInfo.date}!`);
      setTimeout(() => setGenerationFeedback(null), 3000);
    },
    [selectedDateKey, planType, weeklyPlan, monthlyPlan, activeProfile, generatedDays, saveGeneratedDays]
  );

  /**
   * Save currently active single day plan
   */
  const saveCurrentMealPlan = useCallback(
    async (name: string, customDay?: DayMealPlan): Promise<SavedMealPlan | null> => {
      const targetDay = customDay || activeDay;
      if (!targetDay || targetDay.totalCalories === 0) return null;

      const totalCost = targetDay.estimatedCost || 0;

      const saved = await favoriteService.saveMealPlan(String(profile.id || "u1"), {
        name,
        planType: "daily",
        targetCalories: Math.round(targetDay.totalCalories),
        totalEstimatedCost: totalCost,
        days: [targetDay],
      });

      return saved;
    },
    [activeDay, profile]
  );

  /**
   * Load saved meal plan
   */
  const loadSavedPlan = useCallback((saved: SavedMealPlan) => {
    const newMap = { ...generatedDays };
    const today = new Date();

    if (saved.planType === "daily" || (saved.days && saved.days.length === 1)) {
      const k = toDateKey(today);
      const day = saved.days[0];
      if (day) {
        newMap[k] = {
          ...day,
          dayOfMonth: today.getDate(),
          month: today.getMonth(),
          year: today.getFullYear(),
          dateKey: k,
          isCurrentMonth: true,
        };
        saveGeneratedDays(newMap);
        setSelectedDateKey(k);
        setPlanType("daily");
        return;
      }
    }

    saved.days.forEach((day, idx) => {
      const d = new Date(today);
      d.setDate(today.getDate() + idx);
      const k = toDateKey(d);
      newMap[k] = {
        ...day,
        dayOfMonth: d.getDate(),
        month: d.getMonth(),
        year: d.getFullYear(),
        dateKey: k,
        isCurrentMonth: true,
      };
    });
    saveGeneratedDays(newMap);
    setPlanType("weekly");
  }, [generatedDays, saveGeneratedDays, setSelectedDateKey, setPlanType]);

  const applyFavoriteDayPlan = useCallback(
    (dayPlan: DayMealPlan, targetDateKey?: string) => {
      const chosenKey = targetDateKey || (selectedDateKey < toDateKey(new Date()) ? toDateKey(new Date()) : selectedDateKey);
      const [y, m, d] = chosenKey.split("-").map(Number);
      const dateObj = new Date(y, m - 1, d);
      const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const shortDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const monthShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

      const isAIBalanced = dayPlan.dateText?.includes("AI Balanced");
      const calDay: CalendarDayMealPlan = {
        ...dayPlan,
        dayName:
          dayPlan.dayName && dayPlan.dayName !== "Adjusted Day" && dayPlan.dayName !== "Selected Day"
            ? dayPlan.dayName
            : dayNames[dateObj.getDay()],
        shortDay:
          dayPlan.shortDay && dayPlan.shortDay !== "Adj" && dayPlan.shortDay !== "Fav"
            ? dayPlan.shortDay
            : shortDays[dateObj.getDay()],
        dateText: isAIBalanced ? "AI Balanced" : `${monthShort[m - 1]} ${d}`,
        dayOfMonth: d,
        month: m - 1,
        year: y,
        dateKey: chosenKey,
        isCurrentMonth: true,
      };
      saveGeneratedDays({
        ...generatedDays,
        [chosenKey]: calDay,
      });
      setSelectedDateKey(chosenKey);
      setPlanType("daily");
    },
    [selectedDateKey, generatedDays, saveGeneratedDays, setSelectedDateKey, setPlanType]
  );

  const addDishToMeal = useCallback(
    (
      mealSlotType: "breakfast" | "lunch" | "dinner" | "snack",
      newRecipe: Recipe
    ) => {
      const curKey = selectedDateKey;
      const curDay = generatedDays[curKey];
      if (!curDay) return;

      const slot = curDay[mealSlotType];
      const existingDishes =
        slot.recipes && slot.recipes.length > 0
          ? [...slot.recipes]
          : slot.recipe
            ? [slot.recipe]
            : [];
      const updatedDishes = [...existingDishes, newRecipe];

      const maxTime = Math.max(
        ...updatedDishes.map((d) => (d.prepTime || 0) + (d.cookTime || 0)) || [25]
      );

      const updatedSlot = {
        ...slot,
        recipe: updatedDishes[0],
        recipes: updatedDishes,
        time: `${maxTime} min`,
      };

      const updatedDay: DayMealPlan = {
        ...curDay,
        [mealSlotType]: updatedSlot,
      };

      const recalculated = mealPlannerService.recalculateDay(
        updatedDay,
        curDay.targetCalories,
        String(activeProfile.id || "")
      );

      const finalCalDay: CalendarDayMealPlan = {
        ...recalculated,
        dayOfMonth: curDay.dayOfMonth,
        month: curDay.month,
        year: curDay.year,
        dateKey: curDay.dateKey,
        isCurrentMonth: curDay.isCurrentMonth,
      };

      saveGeneratedDays({
        ...generatedDays,
        [curKey]: finalCalDay,
      });

      setGenerationFeedback(`✓ Đã thêm "${newRecipe.title || newRecipe.name}" vào thực đơn!`);
      setTimeout(() => setGenerationFeedback(null), 3000);
    },
    [selectedDateKey, generatedDays, activeProfile, saveGeneratedDays]
  );

  return {
    hasGenerated,
    planType,
    setPlanType,
    viewMode: planType,
    setViewMode: setPlanType,
    selectedDateKey,
    setSelectedDateKey,
    generatedDays,
    weeklyPlan,
    monthlyPlan,
    activeDay,
    activeDayIndex,
    setActiveDayIndex,
    nutritionSummary,
    isGenerating,
    generationFeedback,
    setGenerationFeedback,
    profileChangedNotice,
    activeProfile,
    isPlanForSomeoneElse,
    setIsPlanForSomeoneElse,
    someoneElseProfile,
    setSomeoneElseProfile,
    applySomeoneElseProfile,
    resetToMyself,
    budgetLimit,
    setBudgetLimit,
    selectedMonth,
    setSelectedMonth,
    selectedYear,
    setSelectedYear,
    canPrevMonth,
    canNextMonth,
    handlePrevMonth,
    handleNextMonth,
    generateDaily,
    generateWeekly,
    generateMonthly,
    replaceMeal,
    regenerateSingleDay,
    saveCurrentMealPlan,
    loadSavedPlan,
    applyFavoriteDayPlan,
    addDishToMeal,
  };
}

function isBusinessError(err: unknown): err is ApiError {
  return err instanceof ApiError && err.status >= 400 && err.status < 500 && err.status !== 401;
}
