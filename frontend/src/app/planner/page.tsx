"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { GatedSkeleton } from "@/components/ui/LockedState";
import { useRole } from "@/context/RoleContext";
import { useMealPlanner } from "@/features/meal-planner/hooks/useMealPlanner";
import { MealCard } from "@/features/meal-planner/components/MealCard";
import { NutritionGoalBanner } from "@/features/meal-planner/components/NutritionGoalBanner";
import { DailyMacroSummary } from "@/features/meal-planner/components/DailyMacroSummary";
import { MonthlyCalendarView } from "@/features/meal-planner/components/MonthlyCalendarView";
import { MealReplacementModal } from "@/features/meal-planner/components/MealReplacementModal";
import { UpdatePriceModal } from "@/features/recipes/components/UpdatePriceModal";
import { FavoritesModal } from "@/features/meal-planner/components/FavoritesModal";
import { PlanForSomeoneElseModal } from "@/features/meal-planner/components/PlanForSomeoneElseModal";
import { SaveMealPlanModal } from "@/features/meal-planner/components/SaveMealPlanModal";
import { GenerationSettingsModal } from "@/features/meal-planner/components/GenerationSettingsModal";
import { useSubscription } from "@/features/subscription/hooks/useSubscription";
import { PremiumUpgradeModal } from "@/features/subscription/components/PremiumUpgradeModal";
import { ProfileEditor } from "@/features/profile/components/ProfileEditor";
import { Recipe } from "@/features/recipes/types";
import {
  RefreshCw,
  UserCheck,
  UtensilsCrossed,
  CalendarDays,
  Sparkles,
  Heart,
  Bookmark,
  Users,
  SlidersHorizontal,
  AlertTriangle,
  CheckCircle2,
  Calendar,
} from "lucide-react";

function PlannerContent() {
  const {
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
    selectedMonth,
    selectedYear,
    generateWeekly,
    generateMonthly,
    replaceMeal,
    regenerateSingleDay,
    saveCurrentMealPlan,
    loadSavedPlan,
    applyFavoriteDayPlan,
  } = useMealPlanner();

  const { isPremium, purchase, toggle } = useSubscription();

  // Modals state
  const [showProfileDrawer, setShowProfileDrawer] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);
  const [showSomeoneElseModal, setShowSomeoneElseModal] = useState(false);
  const [showSavePlanModal, setShowSavePlanModal] = useState(false);

  // Single meal replace state
  const [replacingSlot, setReplacingSlot] = useState<{
    slot: "breakfast" | "lunch" | "dinner" | "snack";
    recipe: Recipe;
  } | null>(null);

  // Update user price modal state
  const [pricingRecipe, setPricingRecipe] = useState<Recipe | null>(null);

  // Check premium gating helper
  const requirePremium = (action: () => void) => {
    if (!isPremium) {
      setShowUpgradeModal(true);
    } else {
      action();
    }
  };

  // Generate Weekly Plan action
  const handleGenerateWeekly = () => {
    if (!nutritionSummary.isProfileComplete && !isPlanForSomeoneElse) {
      setShowProfileDrawer(true);
      return;
    }
    requirePremium(() => {
      generateWeekly();
    });
  };

  // Generate Monthly Plan action (Requirement 18, 20)
  const handleGenerateMonthly = () => {
    if (!nutritionSummary.isProfileComplete && !isPlanForSomeoneElse) {
      setShowProfileDrawer(true);
      return;
    }
    requirePremium(() => {
      generateMonthly(selectedMonth, selectedYear);
    });
  };

  // Open replace modal for an individual meal (Requirement 3)
  const handleOpenReplace = (
    recipe: Recipe,
    slot: "breakfast" | "lunch" | "dinner" | "snack"
  ) => {
    requirePremium(() => {
      setReplacingSlot({ slot, recipe });
    });
  };

  // Execute replace
  const handleSelectReplacement = (newRecipe: Recipe) => {
    if (!replacingSlot) return;
    replaceMeal(activeDayIndex, replacingSlot.slot, newRecipe);
    setReplacingSlot(null);
  };

  const handleUpgradeSuccess = () => {
    purchase("premium");
    setShowUpgradeModal(false);
    setTimeout(() => {
      generateWeekly();
    }, 200);
  };

  return (
    <div className="space-y-6">
      {/* ========================================================
          SUBSCRIPTION STATUS BAR (FREE vs PREMIUM 99,000 VND / month)
          ======================================================== */}
      {isPremium ? (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-emerald-50 border border-emerald-200/90 rounded-2xl px-4 py-2.5 text-xs text-emerald-950 shadow-2xs">
          <div className="flex items-center gap-2">
            <span className="text-base leading-none">👑</span>
            <span className="font-bold text-emerald-900 flex items-center gap-1.5">
              Premium Active
            </span>
            <span className="text-emerald-700 font-medium">· 99,000 VND / month</span>
            <span className="hidden sm:inline text-emerald-600/80">
              (All AI personalization, monthly planning & meal replacement features unlocked)
            </span>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={() => toggle()}
              className="text-[11px] font-medium text-emerald-800 hover:text-red-700 underline underline-offset-2 transition-colors cursor-pointer"
              title="Click to toggle back to Free tier for testing"
            >
              [Dev: Switch to Free]
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-stone-50 border border-stone-200/90 rounded-2xl px-4 py-2.5 text-xs text-stone-700 shadow-2xs">
          <div className="flex items-center gap-2">
            <span className="text-base leading-none">🆓</span>
            <span className="font-bold text-stone-900">Free Plan</span>
            <span className="text-stone-500">· Basic access</span>
            <span className="hidden sm:inline text-stone-400">
              (Personalized Weekly & Monthly meal generation requires Premium)
            </span>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={() => setShowUpgradeModal(true)}
              className="px-3 py-1 rounded-xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold transition-all shadow-2xs cursor-pointer flex items-center gap-1.5 text-xs"
            >
              <Sparkles className="w-3.5 h-3.5 fill-amber-950" />
              Upgrade to Premium (99,000 VND / month)
            </button>
            <button
              onClick={() => toggle()}
              className="text-[11px] text-stone-400 hover:text-stone-700 underline cursor-pointer"
              title="Click to unlock Premium immediately for testing"
            >
              [Dev: Unlock]
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          ACTIVE TARGET PERSON BANNER (Myself vs Someone Else) (Requirement 17)
          ======================================================== */}
      {isPlanForSomeoneElse && someoneElseProfile && (
        <div className="flex items-center justify-between bg-violet-50 border border-violet-200 rounded-2xl px-4 py-2.5 text-xs text-violet-950">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-violet-700" />
            <span>
              Planning for: <strong>{someoneElseProfile.name}</strong> ({someoneElseProfile.age}y, {someoneElseProfile.weight}kg, {someoneElseProfile.height}cm · {someoneElseProfile.vegetarianType.replace("_", " ")})
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSomeoneElseModal(true)}
              className="font-bold text-violet-800 underline hover:text-violet-950 cursor-pointer"
            >
              Edit Person
            </button>
            <button
              onClick={() => setIsPlanForSomeoneElse(false)}
              className="text-stone-500 hover:text-stone-800 underline cursor-pointer"
            >
              Reset to Myself
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          NUTRITION GOAL BANNER (BMI, Calories, Goal)
          ======================================================== */}
      <NutritionGoalBanner
        nutrition={nutritionSummary}
        profile={activeProfile}
        onCompleteProfile={() => {
          if (isPlanForSomeoneElse) {
            setShowSomeoneElseModal(true);
          } else {
            setShowProfileDrawer(true);
          }
        }}
      />

      {/* ========================================================
          PROFILE CHANGED WARNING (Requirement 29)
          Do NOT auto-regenerate. Prompt user to regenerate!
          ======================================================== */}
      {profileChangedNotice && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-amber-950 animate-in fade-in shadow-2xs">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <div>
              <p className="font-bold">Your nutrition profile has changed.</p>
              <p className="text-amber-800">
                Regenerate your meal plan to apply the new calorie target, vegetarian diet, or allergy updates.
              </p>
            </div>
          </div>
          <Button
            size="sm"
            onClick={planType === "monthly" ? handleGenerateMonthly : handleGenerateWeekly}
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold h-9 px-4 rounded-xl cursor-pointer self-end sm:self-auto shrink-0 shadow-2xs"
          >
            Regenerate Plan
          </Button>
        </div>
      )}

      {/* ========================================================
          GENERATION CONTROL BAR (Requirements 18, 20, 22)
          [Generate Weekly Plan] [Generate Monthly Plan] [Favorites] [Settings]
          ======================================================== */}
      <div className="bg-white border border-stone-200/90 rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <h3 className="font-serif font-bold text-lg text-stone-900">
              Personalized Plant-Based Meal Planner
            </h3>
            {!isPremium && (
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                Premium
              </span>
            )}
          </div>
          <p className="text-xs text-stone-500 mt-1 max-w-xl leading-relaxed">
            Generate balanced plant-based meals calibrated to{" "}
            <strong className="text-stone-700">
              {activeProfile.name}&apos;s {nutritionSummary.dailyCalorieTarget.toLocaleString()} kcal target
            </strong>
            , vegetarian tier, and allergies.
          </p>
          {generationFeedback && (
            <p className="text-xs font-semibold text-emerald-700 mt-1.5 flex items-center gap-1.5 animate-in fade-in">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {generationFeedback}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-center shrink-0">
          <Button
            variant="soft"
            size="sm"
            onClick={() => setShowFavoritesModal(true)}
            className="h-10 px-3.5 rounded-xl border-stone-200 text-stone-700 hover:border-rose-300 hover:text-rose-700 flex items-center gap-1.5 text-xs cursor-pointer"
          >
            <Heart className="w-3.5 h-3.5 text-rose-500" />
            <span>Favorites</span>
          </Button>

          <Button
            variant="soft"
            size="sm"
            onClick={() => setShowSettingsModal(true)}
            className="h-10 px-3.5 rounded-xl border-stone-200 text-stone-700 flex items-center gap-1.5 text-xs cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-stone-500" />
            <span>Settings</span>
          </Button>

          {/* Weekly Button */}
          <Button
            size="md"
            onClick={handleGenerateWeekly}
            disabled={isGenerating}
            className={`h-11 px-5 rounded-2xl font-bold text-xs shadow-xs flex items-center gap-2 transition-all cursor-pointer ${
              hasGenerated && planType === "weekly"
                ? "bg-emerald-800 text-white"
                : "bg-emerald-700 hover:bg-emerald-800 text-white"
            }`}
          >
            {isGenerating && planType === "weekly" ? (
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <CalendarDays className="w-3.5 h-3.5" />
            )}
            <span>Generate Weekly Plan</span>
          </Button>

          {/* Monthly Button (Requirement 18, 20) */}
          <Button
            size="md"
            onClick={handleGenerateMonthly}
            disabled={isGenerating}
            className={`h-11 px-5 rounded-2xl font-bold text-xs shadow-xs flex items-center gap-2 transition-all cursor-pointer ${
              hasGenerated && planType === "monthly"
                ? "bg-stone-900 text-white"
                : "bg-stone-800 hover:bg-stone-900 text-white"
            }`}
          >
            {isGenerating && planType === "monthly" ? (
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Calendar className="w-3.5 h-3.5 text-amber-300" />
            )}
            <span>Generate Monthly Plan</span>
          </Button>
        </div>
      </div>

      {/* ========================================================
          EMPTY STATE WHEN PLAN HAS NOT BEEN GENERATED YET (Requirement 22, 29)
          ======================================================== */}
      {!hasGenerated ? (
        <Card className="p-8 sm:p-12 text-center bg-white border border-stone-200/90 rounded-3xl space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-emerald-50 border border-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-2xs">
            <UtensilsCrossed className="w-8 h-8" />
          </div>
          <div className="max-w-md mx-auto space-y-1.5">
            <h3 className="font-serif font-bold text-xl text-stone-900">
              Your meal plan hasn&apos;t been generated yet.
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Create a personalized meal plan based on your nutrition profile, BMI calorie targets, vegetarian preferences, and allergy exclusions.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button
              onClick={handleGenerateWeekly}
              className="h-11 px-6 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <CalendarDays className="w-4 h-4 text-emerald-200" />
              <span>Generate Weekly Plan (7 Days)</span>
            </Button>

            <Button
              onClick={handleGenerateMonthly}
              className="h-11 px-6 rounded-2xl bg-stone-800 hover:bg-stone-900 text-white font-bold text-xs shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-amber-300" />
              <span>Generate Monthly Plan (Calendar)</span>
            </Button>

            <Button
              variant="soft"
              onClick={() => setShowFavoritesModal(true)}
              className="h-11 px-5 rounded-2xl border-stone-200 text-stone-700 hover:border-emerald-300 font-bold text-xs cursor-pointer flex items-center gap-2"
            >
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              <span>Create from Favorites</span>
            </Button>
          </div>
        </Card>
      ) : (
        <>
          {/* ========================================================
              VIEW MODE SWITCHER & SUB-ACTIONS
              ======================================================== */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Weekly Day Selector Tabs (if Weekly Plan active) */}
            {planType === "weekly" && weeklyPlan ? (
              <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
                {weeklyPlan.days.map((d, index) => (
                  <button
                    key={d.dayName}
                    onClick={() => setActiveDayIndex(index)}
                    className={`shrink-0 px-4 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                      activeDayIndex === index
                        ? "bg-emerald-700 text-white shadow-xs"
                        : "bg-white border border-stone-200 text-stone-600 hover:border-emerald-300 hover:text-stone-900"
                    }`}
                  >
                    <div className="font-bold">{d.shortDay}</div>
                    <div
                      className={`text-[10px] ${
                        activeDayIndex === index ? "text-emerald-200" : "text-stone-400"
                      }`}
                    >
                      {d.dateText}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-stone-800">
                  Monthly Calendar ({monthlyPlan?.monthName})
                </span>
                <span className="text-[11px] text-stone-400">
                  · Click dates on the calendar to change meals
                </span>
              </div>
            )}

            {/* Action Buttons: Save Plan, Edit Profile, Regenerate */}
            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
              <button
                onClick={() => setShowSavePlanModal(true)}
                className="h-10 px-3.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Save current plan to Favorites"
              >
                <Bookmark className="w-3.5 h-3.5 text-emerald-700" />
                <span>Save Plan</span>
              </button>

              <button
                onClick={() => setShowProfileDrawer(!showProfileDrawer)}
                className="h-10 px-3.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>{showProfileDrawer ? "Hide Profile" : "Profile"}</span>
              </button>

              <Button
                variant="soft"
                size="sm"
                onClick={() => requirePremium(() => regenerateSingleDay(activeDayIndex))}
                className="flex items-center gap-1.5 text-xs h-10 px-4 rounded-xl cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Regenerate {activeDay?.shortDay || "Day"}
              </Button>
            </div>
          </div>

          {/* Profile Quick Drawer */}
          {showProfileDrawer && (
            <Card className="p-6 bg-stone-50/70 border-emerald-200 animate-in fade-in">
              <div className="flex items-center justify-between mb-4 border-b pb-3">
                <div>
                  <h3 className="font-serif font-bold text-lg text-stone-900">
                    Update Profile & Recalculate Planner
                  </h3>
                  <p className="text-xs text-stone-500">
                    Changes will prompt you to regenerate your plan to stay synchronized with your metrics.
                  </p>
                </div>
                <button
                  onClick={() => setShowProfileDrawer(false)}
                  className="text-xs font-semibold text-stone-500 hover:text-stone-900 underline cursor-pointer"
                >
                  Close
                </button>
              </div>
              <ProfileEditor />
            </Card>
          )}

          {/* ========================================================
              MONTHLY CALENDAR VIEW (Requirement 21)
              ======================================================== */}
          {planType === "monthly" && monthlyPlan && (
            <MonthlyCalendarView
              monthlyPlan={monthlyPlan}
              activeDayIndex={activeDayIndex}
              onSelectDay={(idx) => setActiveDayIndex(idx)}
            />
          )}

          {/* ========================================================
              DAILY MACRO SUMMARY (Target, Consumed, Remaining & Daily Cost)
              ======================================================== */}
          {activeDay && <DailyMacroSummary day={activeDay} />}

          {/* ========================================================
              4 PLANNED MEALS FOR CURRENT DAY (Requirement 3, 4, 5, 6, 7)
              ======================================================== */}
          {activeDay && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif font-bold text-xl text-stone-900 flex items-center gap-2">
                  <UtensilsCrossed className="w-5 h-5 text-emerald-700" />
                  Planned Meals for {activeDay.dayName} ({activeDay.dateText})
                </h3>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-stone-500">
                    {activeDay.totalCalories} kcal total · 4 meals
                  </span>
                  {!isPremium && (
                    <span className="text-[11px] font-semibold text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">
                      Sample preview
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <MealCard
                  mealType="Breakfast"
                  recipe={activeDay.breakfast.recipe}
                  timeString={activeDay.breakfast.time}
                  userId={String(activeProfile.id || "")}
                  onOpenReplace={(r) => handleOpenReplace(r, "breakfast")}
                  onOpenPriceModal={(r) => setPricingRecipe(r)}
                />
                <MealCard
                  mealType="Lunch"
                  recipe={activeDay.lunch.recipe}
                  timeString={activeDay.lunch.time}
                  userId={String(activeProfile.id || "")}
                  onOpenReplace={(r) => handleOpenReplace(r, "lunch")}
                  onOpenPriceModal={(r) => setPricingRecipe(r)}
                />
                <MealCard
                  mealType="Dinner"
                  recipe={activeDay.dinner.recipe}
                  timeString={activeDay.dinner.time}
                  userId={String(activeProfile.id || "")}
                  onOpenReplace={(r) => handleOpenReplace(r, "dinner")}
                  onOpenPriceModal={(r) => setPricingRecipe(r)}
                />
                <MealCard
                  mealType="Snack"
                  recipe={activeDay.snack.recipe}
                  timeString={activeDay.snack.time}
                  userId={String(activeProfile.id || "")}
                  onOpenReplace={(r) => handleOpenReplace(r, "snack")}
                  onOpenPriceModal={(r) => setPricingRecipe(r)}
                />
              </div>
            </div>
          )}

          {/* ========================================================
              WEEKLY AVERAGES & ESTIMATED TOTAL COST CARD (Requirement 7)
              ======================================================== */}
          {planType === "weekly" && weeklyPlan && (
            <Card className="p-6">
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-emerald-700" />
                  <h4 className="font-semibold text-stone-800 text-sm">7-Day Weekly Summary</h4>
                </div>
                <span className="text-xs text-stone-500 font-medium">
                  Estimated Total: <strong className="text-emerald-800 font-bold">~{weeklyPlan.totalEstimatedCost.toLocaleString("vi-VN")} VND</strong>
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div>
                  <p className="font-serif font-bold text-2xl text-stone-900">
                    {weeklyPlan.averageDailyCalories}
                  </p>
                  <p className="text-xs text-stone-500 mt-0.5">Avg kcal/day</p>
                </div>
                <div>
                  <p className="font-serif font-bold text-2xl text-emerald-800">
                    {weeklyPlan.averageProtein}g
                  </p>
                  <p className="text-xs text-stone-500 mt-0.5">Avg protein/day</p>
                </div>
                <div>
                  <p className="font-serif font-bold text-2xl text-emerald-900">
                    ~{weeklyPlan.averageDailyCost.toLocaleString("vi-VN")} đ
                  </p>
                  <p className="text-xs text-stone-500 mt-0.5">Avg cost/day</p>
                </div>
                <div>
                  <p className="font-serif font-bold text-2xl text-violet-700">7 / 7</p>
                  <p className="text-xs text-stone-500 mt-0.5">Days planned</p>
                </div>
              </div>
            </Card>
          )}
        </>
      )}

      {/* ========================================================
          ALL INTERACTIVE MODALS
          ======================================================== */}
      {/* 1. Meal Replacement Modal (Requirement 3) */}
      <MealReplacementModal
        isOpen={replacingSlot !== null}
        onClose={() => setReplacingSlot(null)}
        originalRecipe={replacingSlot?.recipe || null}
        mealType={replacingSlot?.slot ? replacingSlot.slot.toUpperCase() : "Meal"}
        profile={activeProfile}
        onSelectReplacement={handleSelectReplacement}
      />

      {/* 2. Update Personal Recipe Price Modal (Requirement 6) */}
      <UpdatePriceModal
        isOpen={pricingRecipe !== null}
        onClose={() => setPricingRecipe(null)}
        recipe={pricingRecipe}
        onSaved={() => {
          // Re-trigger active day recomputation
          if (activeDay) {
            replaceMeal(activeDayIndex, "breakfast", activeDay.breakfast.recipe);
          }
        }}
      />

      {/* 3. Favorites & Create from Favorites Modal (Requirement 1, 2) */}
      <FavoritesModal
        isOpen={showFavoritesModal}
        onClose={() => setShowFavoritesModal(false)}
        profile={activeProfile}
        onApplyPlan={(dayPlan) => applyFavoriteDayPlan(dayPlan)}
        onLoadSavedPlan={(plan) => loadSavedPlan(plan)}
      />

      {/* 4. Plan for Someone Else Modal (Requirement 17) */}
      <PlanForSomeoneElseModal
        isOpen={showSomeoneElseModal}
        onClose={() => setShowSomeoneElseModal(false)}
        currentOtherProfile={someoneElseProfile}
        isPlanForSomeoneElse={isPlanForSomeoneElse}
        onApplySomeoneElse={(p) => {
          setSomeoneElseProfile(p);
          setIsPlanForSomeoneElse(true);
        }}
        onResetToMyself={() => {
          setIsPlanForSomeoneElse(false);
          setSomeoneElseProfile(null);
        }}
      />

      {/* 5. Save Meal Plan Modal (Requirement 1) */}
      <SaveMealPlanModal
        isOpen={showSavePlanModal}
        onClose={() => setShowSavePlanModal(false)}
        planType={planType}
        targetCalories={nutritionSummary.dailyCalorieTarget}
        totalCost={
          planType === "weekly"
            ? weeklyPlan?.totalEstimatedCost || 0
            : monthlyPlan?.totalEstimatedCost || 0
        }
        onSave={(name) => {
          saveCurrentMealPlan(name);
          alert(`Saved "${name}" to your Favorite Meal Plans!`);
        }}
      />

      {/* 6. Generation Settings & Budget Modal (Requirement 23, 24) */}
      <GenerationSettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        activeProfile={activeProfile}
        isPlanForSomeoneElse={isPlanForSomeoneElse}
        onOpenSomeoneElseModal={() => {
          setShowSettingsModal(false);
          setShowSomeoneElseModal(true);
        }}
        onConfirmGenerate={(options) => {
          if (options.planType === "monthly") {
            generateMonthly(options.selectedMonth, options.selectedYear, options);
          } else {
            generateWeekly(options);
          }
        }}
        initialPlanType={planType}
      />

      {/* 7. Premium Upgrade Modal (Requirement 8, 28) */}
      <PremiumUpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        onUpgrade={handleUpgradeSuccess}
      />
    </div>
  );
}

export default function PlannerPage() {
  const { ready } = useRole();

  return (
    <AppShell showRightRail={false}>
      <div className="max-w-[1240px] mx-auto w-full">
        <PageHeader
          eyebrow="AI-Powered"
          title="My Meal Planner"
          subtitle="Dynamic weekly and monthly plant-based meal planning tailored to your BMI, Mifflin-St Jeor calorie targets, vegetarian diet, and allergies."
          action={
            <Badge variant="beta" className="text-sm px-3 py-1">
              Personalised
            </Badge>
          }
        />

        {!ready ? <GatedSkeleton /> : <PlannerContent />}
      </div>
    </AppShell>
  );
}
