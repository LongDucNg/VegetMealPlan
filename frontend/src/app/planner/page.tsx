"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { LockedState, GatedSkeleton } from "@/components/ui/LockedState";
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
import { GenerationPlanOptions } from "@/features/meal-planner/types";
import { useSubscription } from "@/features/subscription/hooks/useSubscription";
import { PremiumUpgradeModal } from "@/features/subscription/components/PremiumUpgradeModal";
import { subscriptionService } from "@/features/subscription/services/subscriptionService";
import { ProfileEditor } from "@/features/profile/components/ProfileEditor";
import { formatVegetarianType } from "@/features/profile/types";
import { Recipe } from "@/features/recipes/types";
import {
  RefreshCw,
  UserCheck,
  UtensilsCrossed,
  CalendarDays,
  Sparkles,
  Heart,
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
    setBudgetLimit,
    selectedMonth,
    selectedYear,
    generateDaily,
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
    recipeIndex?: number;
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

  // Generate Daily Plan action
  const handleGenerateDaily = (opts?: Partial<GenerationPlanOptions>) => {
    if (!nutritionSummary.isProfileComplete && !isPlanForSomeoneElse) {
      setShowProfileDrawer(true);
      return;
    }
    requirePremium(() => {
      generateDaily({ budgetLimit, ...opts });
    });
  };

  // Generate Weekly Plan action
  const handleGenerateWeekly = (opts?: Partial<GenerationPlanOptions>) => {
    if (!nutritionSummary.isProfileComplete && !isPlanForSomeoneElse) {
      setShowProfileDrawer(true);
      return;
    }
    requirePremium(() => {
      generateWeekly({ budgetLimit, ...opts });
    });
  };

  // Generate Monthly Plan action (Requirement 18, 20)
  const handleGenerateMonthly = (opts?: Partial<GenerationPlanOptions>) => {
    if (!nutritionSummary.isProfileComplete && !isPlanForSomeoneElse) {
      setShowProfileDrawer(true);
      return;
    }
    requirePremium(() => {
      generateMonthly(selectedMonth, selectedYear, { budgetLimit, ...opts });
    });
  };

  // Open replace modal for an individual meal (Requirement 3)
  const handleOpenReplace = (
    recipe: Recipe,
    slot: "breakfast" | "lunch" | "dinner" | "snack",
    recipeIndex?: number
  ) => {
    requirePremium(() => {
      setReplacingSlot({ slot, recipe, recipeIndex });
    });
  };

  // Execute replace
  const handleSelectReplacement = (newRecipe: Recipe) => {
    if (!replacingSlot) return;
    replaceMeal(activeDayIndex, replacingSlot.slot, newRecipe, replacingSlot.recipeIndex);
    setReplacingSlot(null);
  };

  const handleUpgradeSuccess = async () => {
    setShowUpgradeModal(false);
    try {
      const res = await subscriptionService.createCheckout();
      if (res?.payment_url) {
        window.location.href = res.payment_url;
        return;
      }
      throw new Error("Không nhận được link thanh toán VietQR.");
    } catch (err: any) {
      alert(err?.message || "Không thể khởi tạo thanh toán VietQR.");
    }
  };

  return (
    <div className="space-y-6">
      {/* ========================================================
          SUBSCRIPTION STATUS BAR (FREE vs PREMIUM 99,000 VNĐ / month)
          ======================================================== */}
      {isPremium ? (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-emerald-50 border border-emerald-200/90 rounded-2xl px-4 py-2.5 text-xs text-emerald-950 shadow-2xs">
          <div className="flex items-center gap-2">
            <span className="text-base leading-none"></span>
            <span className="font-bold text-emerald-900 flex items-center gap-1.5">
              Gói Premium đang hoạt động
            </span>
            <span className="text-emerald-700 font-medium">· 99.000 VNĐ / tháng</span>
            <span className="hidden sm:inline text-emerald-600/80">
              (Đã mở khóa toàn bộ tính năng cá nhân hóa thực đơn, kế hoạch tháng và đổi món)
            </span>
          </div>


        </div>
      ) : (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-stone-50 border border-stone-200/90 rounded-2xl px-4 py-2.5 text-xs text-stone-700 shadow-2xs">
          <div className="flex items-center gap-2">
            <span className="text-base leading-none"></span>
            <span className="font-bold text-stone-900">Gói Miễn phí</span>
            <span className="text-stone-500">· Tính năng cơ bản</span>
            <span className="hidden sm:inline text-stone-400">
              (Tạo thực đơn cá nhân hóa Tuần & Tháng yêu cầu gói Premium)
            </span>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={() => setShowUpgradeModal(true)}
              className="px-3 py-1 rounded-xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold transition-all shadow-2xs cursor-pointer flex items-center gap-1.5 text-xs"
            >
              <Sparkles className="w-3.5 h-3.5 fill-amber-950" />
              Nâng cấp Premium (99.000 VNĐ / tháng)
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
              Đang lên kế hoạch cho: <strong>{someoneElseProfile.name}</strong> ({someoneElseProfile.age} tuổi, {someoneElseProfile.weight}kg, {someoneElseProfile.height}cm · {formatVegetarianType(someoneElseProfile.vegetarianType)})
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSomeoneElseModal(true)}
              className="font-bold text-violet-800 underline hover:text-violet-950 cursor-pointer"
            >
              Chỉnh sửa
            </button>
            <button
              onClick={() => setIsPlanForSomeoneElse(false)}
              className="text-stone-500 hover:text-stone-800 underline cursor-pointer"
            >
              Đặt lại về bản thân
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
        aiCookabilityNotes={planType === 'monthly' ? monthlyPlan?.ai_cookability_notes : weeklyPlan?.ai_cookability_notes}
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
              <p className="font-bold">Hồ sơ dinh dưỡng của bạn đã thay đổi.</p>
              <p className="text-amber-800">
                Hãy tạo lại thực đơn để áp dụng mức calo mới, chế độ ăn chay hoặc cập nhật dị ứng.
              </p>
            </div>
          </div>
          <Button
            size="sm"
            onClick={() => (planType === "monthly" ? handleGenerateMonthly() : planType === "daily" ? handleGenerateDaily() : handleGenerateWeekly())}
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold h-9 px-4 rounded-xl cursor-pointer self-end sm:self-auto shrink-0 shadow-2xs"
          >
            Tạo lại thực đơn
          </Button>
        </div>
      )}

      {/* ========================================================
          GENERATION CONTROL BAR
          Thiết kế lại dễ nhìn: Thông tin & cấu hình bên trái, 3 nút tạo thực đơn xếp hàng dọc bên phải
          ======================================================== */}
      <div className="bg-white border border-stone-200/90 rounded-3xl p-5 sm:p-7 shadow-xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6">
        <div className="flex-1 space-y-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <h3 className="font-serif font-bold text-xl text-stone-900">
                Kế hoạch Thực đơn chay Cá nhân hóa
              </h3>
              {!isPremium && (
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                  Premium
                </span>
              )}
            </div>
            <p className="text-xs text-stone-500 mt-1.5 max-w-xl leading-relaxed">
              Tạo thực đơn chay cân bằng dinh dưỡng phù hợp với{" "}
              <strong className="text-stone-700">
                mục tiêu ~{Math.round(Number(nutritionSummary.dailyCalorieTarget) * 100) / 100} kcal của {activeProfile.name}
              </strong>
              , trường phái ăn chay và dị ứng thực phẩm.
            </p>
            {generationFeedback && (
              <p className="text-xs font-semibold text-emerald-700 mt-2 flex items-center gap-1.5 animate-in fade-in">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {generationFeedback}
              </p>
            )}
          </div>

          {/* Quick Settings & Budget Row */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            {/* Quick Budget Limit Control */}
            <div className="flex items-center gap-2 bg-stone-50 hover:bg-stone-100/90 border border-stone-200/90 rounded-2xl px-3 py-1.5 shadow-2xs transition-colors">
              <span className="text-sm"></span>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                  Ngân sách:
                </span>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    placeholder="Không giới hạn"
                    value={budgetLimit ?? ""}
                    onChange={(e) => {
                      const val = e.target.value ? Number(e.target.value) : undefined;
                      setBudgetLimit(val);
                    }}
                    className="w-28 text-xs font-bold text-stone-900 bg-transparent outline-none placeholder:text-stone-400 placeholder:font-normal"
                    step="50000"
                    min="50000"
                  />
                  <span className="text-[11px] font-semibold text-stone-500">VNĐ</span>
                  {budgetLimit !== undefined && (
                    <button
                      type="button"
                      onClick={() => setBudgetLimit(undefined)}
                      className="text-stone-400 hover:text-stone-700 text-xs px-1 font-bold cursor-pointer"
                      title="Xoá giới hạn ngân sách (Không giới hạn)"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            </div>

            <Button
              variant="soft"
              size="sm"
              onClick={() => setShowFavoritesModal(true)}
              className="h-10 px-3.5 rounded-xl border-stone-200 text-stone-700 hover:border-rose-300 hover:text-rose-700 flex items-center gap-1.5 text-xs cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              <span>Món yêu thích</span>
            </Button>

            <Button
              variant="soft"
              size="sm"
              onClick={() => setShowSettingsModal(true)}
              className="h-10 px-3.5 rounded-xl border-stone-200 text-stone-700 flex items-center gap-1.5 text-xs cursor-pointer"
              title="Tuỳ chỉnh chi tiết thực đơn & ngân sách"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-stone-500" />
              <span>Cài đặt</span>
            </Button>
          </div>
        </div>

        {/* 3 Nút Tạo Thực Đơn Xếp Hàng Dọc (Requirements) */}
        <div className="flex flex-col gap-2.5 w-full sm:w-60 shrink-0 self-center">
          {/* Daily Button */}
          <Button
            size="md"
            onClick={() => handleGenerateDaily()}
            disabled={isGenerating}
            className={`w-full h-11 px-4 rounded-2xl font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
              hasGenerated && planType === "daily"
                ? "bg-emerald-800 text-white ring-2 ring-emerald-500"
                : "bg-emerald-600 hover:bg-emerald-700 text-white"
            }`}
          >
            {isGenerating && planType === "daily" ? (
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            )}
            <span>Tạo Thực Đơn Ngày</span>
          </Button>

          {/* Weekly Button */}
          <Button
            size="md"
            onClick={() => handleGenerateWeekly()}
            disabled={isGenerating}
            className={`w-full h-11 px-4 rounded-2xl font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
              hasGenerated && planType === "weekly"
                ? "bg-emerald-800 text-white ring-2 ring-emerald-500"
                : "bg-emerald-700 hover:bg-emerald-800 text-white"
            }`}
          >
            {isGenerating && planType === "weekly" ? (
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <CalendarDays className="w-3.5 h-3.5 text-emerald-200" />
            )}
            <span>Tạo Kế Hoạch Tuần</span>
          </Button>

          {/* Monthly Button */}
          <Button
            size="md"
            onClick={() => handleGenerateMonthly()}
            disabled={isGenerating}
            className={`w-full h-11 px-4 rounded-2xl font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
              hasGenerated && planType === "monthly"
                ? "bg-stone-900 text-white ring-2 ring-stone-600"
                : "bg-stone-800 hover:bg-stone-900 text-white"
            }`}
          >
            {isGenerating && planType === "monthly" ? (
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Calendar className="w-3.5 h-3.5 text-amber-300" />
            )}
            <span>Tạo Kế Hoạch Tháng</span>
          </Button>
        </div>
      </div>


          {/* Plan Budget & Estimated Cost Summary Banner */}
          {(budgetLimit || (planType === "weekly" ? weeklyPlan?.budgetLimit : monthlyPlan?.budgetLimit)) && (
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-emerald-50/70 border border-emerald-200/90 rounded-2xl text-xs text-emerald-950 animate-in fade-in shadow-2xs">
              <div className="flex items-center gap-2">
                <span className="text-base"></span>
                <span>
                  <strong>Ngân sách kế hoạch ({planType === "weekly" ? "Tuần" : "Tháng"}):</strong>{" "}
                  {((planType === "weekly" ? weeklyPlan?.budgetLimit : monthlyPlan?.budgetLimit) ?? budgetLimit)?.toLocaleString("vi-VN")} VNĐ
                </span>
                <span className="text-emerald-700 font-medium">
                  · Chi phí nguyên liệu ước tính:{" "}
                  <strong>
                    {(planType === "weekly" ? weeklyPlan?.totalEstimatedCost : monthlyPlan?.totalEstimatedCost)?.toLocaleString("vi-VN")} VNĐ
                  </strong>
                </span>
              </div>
              {(() => {
                const b = (planType === "weekly" ? weeklyPlan?.budgetLimit : monthlyPlan?.budgetLimit) ?? budgetLimit;
                const cost = planType === "weekly" ? weeklyPlan?.totalEstimatedCost : monthlyPlan?.totalEstimatedCost;
                if (b && cost !== undefined) {
                  const diff = b - cost;
                  return (
                    <span className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] ${diff >= 0 ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"}`}>
                      {diff >= 0 ? `Trong ngân sách (Dư ${diff.toLocaleString("vi-VN")} VNĐ)` : `Vượt ngân sách: ${Math.abs(diff).toLocaleString("vi-VN")} VNĐ`}
                    </span>
                  );
                }
                return null;
              })()}
            </div>
          )}

          {/* ========================================================
              VIEW MODE SWITCHER & SUB-ACTIONS
              ======================================================== */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Daily or Weekly Day Selector Tabs */}
            {planType === "daily" && weeklyPlan ? (
              <div className="flex items-center gap-2 py-1">
                <span className="px-3.5 py-1.5 rounded-xl bg-emerald-100 text-emerald-900 font-bold text-xs flex items-center gap-1.5 shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                  Thực đơn 1 ngày
                </span>
                <span className="text-xs text-stone-600 font-semibold">
                  {weeklyPlan.days[0]?.dayName} · {weeklyPlan.days[0]?.dateText}
                </span>
              </div>
            ) : planType === "weekly" && weeklyPlan ? (
              <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
                {weeklyPlan.days.map((d, index) => (
                  <button
                    key={d.dayName}
                    onClick={() => setActiveDayIndex(index)}
                    className={`shrink-0 px-4 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${activeDayIndex === index
                        ? "bg-emerald-700 text-white shadow-xs"
                        : "bg-white border border-stone-200 text-stone-600 hover:border-emerald-300 hover:text-stone-900"
                      }`}
                  >
                    <div className="font-bold">{d.shortDay}</div>
                    <div
                      className={`text-[10px] ${activeDayIndex === index ? "text-emerald-200" : "text-stone-400"
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
                  Lịch tháng ({monthlyPlan?.monthName})
                </span>
                <span className="text-[11px] text-stone-400">
                  · Bấm vào các ngày trên lịch để đổi món
                </span>
              </div>
            )}

            {/* Action Buttons: Favorite Plan, Edit Profile, Regenerate */}
            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
              <button
                onClick={() => setShowSavePlanModal(true)}
                className="h-10 px-3.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Lưu thực đơn vào mục Yêu thích"
              >
                <Heart className="w-3.5 h-3.5 fill-stone-400 text-stone-400" />
                <span>Lưu thực đơn</span>
              </button>

              <button
                onClick={() => setShowProfileDrawer(!showProfileDrawer)}
                className="h-10 px-3.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>{showProfileDrawer ? "Ẩn hồ sơ" : "Hồ sơ"}</span>
              </button>

              <Button
                variant="soft"
                size="sm"
                onClick={() => requirePremium(() => regenerateSingleDay(activeDayIndex))}
                className="flex items-center gap-1.5 text-xs h-10 px-4 rounded-xl cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Tạo lại {activeDay?.shortDay || "ngày"}
              </Button>
            </div>
          </div>

          {/* Profile Quick Drawer */}
          {showProfileDrawer && (
            <Card className="p-6 bg-stone-50/70 border-emerald-200 animate-in fade-in">
              <div className="flex items-center justify-between mb-4 border-b pb-3">
                <div>
                  <h3 className="font-serif font-bold text-lg text-stone-900">
                    Cập nhật hồ sơ & tính lại thực đơn
                  </h3>
                  <p className="text-xs text-stone-500">
                    Thay đổi sẽ giúp tạo lại thực đơn đồng bộ với chỉ số của bạn.
                  </p>
                </div>
                <button
                  onClick={() => setShowProfileDrawer(false)}
                  className="text-xs font-semibold text-stone-500 hover:text-stone-900 underline cursor-pointer"
                >
                  Đóng
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
          {hasGenerated && activeDay && activeDay.totalCalories > 0 && <DailyMacroSummary day={activeDay} />}

          {/* ========================================================
              4 PLANNED MEALS FOR CURRENT DAY (HOẶC THÔNG BÁO LỊCH TRỐNG KHI CHƯA TẠO)
              ======================================================== */}
          {!hasGenerated || !activeDay || activeDay.totalCalories === 0 ? (
            <div className="p-8 sm:p-12 text-center bg-white border border-stone-200/90 rounded-3xl space-y-3 shadow-2xs">
              <div className="w-14 h-14 rounded-2xl bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                <UtensilsCrossed className="w-7 h-7" />
              </div>
              <div className="max-w-md mx-auto space-y-1.5">
                <h4 className="font-serif font-bold text-lg text-stone-900">
                  Lịch thực đơn đang trống — Chưa có món ăn nào
                </h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Vui lòng bấm một trong 3 nút ở trên: <strong>Tạo Thực Đơn Ngày</strong>, <strong>Tạo Kế Hoạch Tuần</strong>, hoặc <strong>Tạo Kế Hoạch Tháng</strong> để AI tự động lên thực đơn cá nhân hóa và phân bổ món ăn hợp lý cho từng bữa.
                </p>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif font-bold text-xl text-stone-900 flex items-center gap-2">
                  <UtensilsCrossed className="w-5 h-5 text-emerald-700" />
                  Các bữa ăn trong {activeDay.dayName} ({activeDay.dateText})
                </h3>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-stone-500">
                    Tổng ~{Math.round(Number(activeDay.totalCalories) * 100) / 100} kcal · 4 bữa
                  </span>
                  {!isPremium && (
                    <span className="text-[11px] font-semibold text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">
                      Bản xem trước
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <MealCard
                  mealType="Breakfast"
                  recipe={activeDay.breakfast.recipe}
                  recipes={activeDay.breakfast.recipes}
                  timeString={activeDay.breakfast.time}
                  userId={String(activeProfile.id || "")}
                  onOpenReplace={(r, idx) => handleOpenReplace(r, "breakfast", idx)}
                  onOpenPriceModal={(r) => setPricingRecipe(r)}
                />
                <MealCard
                  mealType="Lunch"
                  recipe={activeDay.lunch.recipe}
                  recipes={activeDay.lunch.recipes}
                  timeString={activeDay.lunch.time}
                  userId={String(activeProfile.id || "")}
                  onOpenReplace={(r, idx) => handleOpenReplace(r, "lunch", idx)}
                  onOpenPriceModal={(r) => setPricingRecipe(r)}
                />
                <MealCard
                  mealType="Dinner"
                  recipe={activeDay.dinner.recipe}
                  recipes={activeDay.dinner.recipes}
                  timeString={activeDay.dinner.time}
                  userId={String(activeProfile.id || "")}
                  onOpenReplace={(r, idx) => handleOpenReplace(r, "dinner", idx)}
                  onOpenPriceModal={(r) => setPricingRecipe(r)}
                />
                <MealCard
                  mealType="Snack"
                  recipe={activeDay.snack.recipe}
                  recipes={activeDay.snack.recipes}
                  timeString={activeDay.snack.time}
                  userId={String(activeProfile.id || "")}
                  onOpenReplace={(r, idx) => handleOpenReplace(r, "snack", idx)}
                  onOpenPriceModal={(r) => setPricingRecipe(r)}
                />
              </div>

              {/* ========================================================
                  INGREDIENTS SUMMARY BY GRAMS (~g)
                  ======================================================== */}
              {(() => {
                const currentPlan = (planType === "monthly" ? monthlyPlan : weeklyPlan);
                const ingredientList = activeDay?.ingredient_summary && activeDay.ingredient_summary.length > 0
                  ? activeDay.ingredient_summary
                  : currentPlan?.ingredient_summary && currentPlan.ingredient_summary.length > 0
                  ? currentPlan.ingredient_summary
                  : [];

                if (ingredientList.length === 0) return null;

                return (
                  <Card className="p-6 bg-white border border-stone-200/90 rounded-3xl shadow-xs space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                          ~g
                        </div>
                        <div>
                          <h4 className="font-serif font-bold text-base text-stone-900">
                            Tổng hợp nguyên liệu theo gam (~g)
                          </h4>
                          <p className="text-xs text-stone-500">
                            Quy đổi về đơn vị gam nhỏ nhất và cộng dồn định lượng cho toàn bộ thực đơn ({ingredientList.length} nguyên liệu)
                          </p>
                        </div>
                      </div>
                      <div className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60 self-start sm:self-auto">
                        {planType === "daily" ? "Thực đơn ngày" : planType === "weekly" ? "Thực đơn tuần" : "Thực đơn tháng"}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 max-h-72 overflow-y-auto pr-1">
                      {ingredientList.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-xl bg-stone-50/80 border border-stone-200/70 hover:border-emerald-300 transition-colors flex flex-col justify-between"
                        >
                          <span className="text-xs font-medium text-stone-800 line-clamp-1" title={item.ingredient_name}>
                            {item.ingredient_name}
                          </span>
                          <span className="text-xs font-bold text-emerald-700 mt-1">
                            {item.note || `~${item.quantity_g}g`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </Card>
                );
              })()}
            </div>
          )}

          {/* ========================================================
              WEEKLY AVERAGES & ESTIMATED TOTAL COST CARD (Requirement 7)
              ======================================================== */}
          {(planType === "weekly" || planType === "daily") && weeklyPlan && (
            <Card className="p-6">
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-emerald-700" />
                  <h4 className="font-semibold text-stone-800 text-sm">{planType === "daily" ? "Tổng quan thực đơn ngày" : "Tổng quan thực đơn 7 ngày"}</h4>
                </div>
                <span className="text-xs text-stone-500 font-medium">
                  Tổng ước tính: <strong className="text-emerald-800 font-bold">~{weeklyPlan.totalEstimatedCost.toLocaleString("vi-VN")} VNĐ</strong>
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div>
                  <p className="font-serif font-bold text-2xl text-stone-900">
                    {weeklyPlan.averageDailyCalories}
                  </p>
                  <p className="text-xs text-stone-500 mt-0.5">Calo TB/ngày</p>
                </div>
                <div>
                  <p className="font-serif font-bold text-2xl text-emerald-800">
                    {weeklyPlan.averageProtein}g
                  </p>
                  <p className="text-xs text-stone-500 mt-0.5">Đạm TB/ngày</p>
                </div>
                <div>
                  <p className="font-serif font-bold text-2xl text-emerald-900">
                    ~{weeklyPlan.averageDailyCost.toLocaleString("vi-VN")} VNĐ
                  </p>
                  <p className="text-xs text-stone-500 mt-0.5">Chi phí TB/ngày</p>
                </div>
                <div>
                  <p className="font-serif font-bold text-2xl text-violet-700">7 / 7</p>
                  <p className="text-xs text-stone-500 mt-0.5">Ngày đã lên kế hoạch</p>
                </div>
              </div>
            </Card>
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
        onGenerateWeeklyWithFavorites={(favIds) => {
          generateWeekly({ favoriteRecipeIds: favIds });
          setShowFavoritesModal(false);
        }}
        onGenerateMonthlyWithFavorites={(favIds) => {
          requirePremium(() => {
            generateMonthly(selectedMonth, selectedYear, { favoriteRecipeIds: favIds });
            setShowFavoritesModal(false);
          });
        }}
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
          (planType === "weekly" || planType === "daily")
            ? weeklyPlan?.totalEstimatedCost || 0
            : monthlyPlan?.totalEstimatedCost || 0
        }
        onSave={(name) => {
          saveCurrentMealPlan(name);
          alert(`Đã lưu "${name}" vào danh sách Thực đơn yêu thích!`);
        }}
      />

      {/* 6. Generation Settings & Budget Modal (Requirement 23, 24) */}
      <GenerationSettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        activeProfile={activeProfile}
        isPlanForSomeoneElse={isPlanForSomeoneElse}
        currentBudget={budgetLimit}
        onOpenSomeoneElseModal={() => {
          setShowSettingsModal(false);
          setShowSomeoneElseModal(true);
        }}
        onConfirmGenerate={(options) => {
          if (options.budgetLimit !== undefined) {
            setBudgetLimit(options.budgetLimit);
          }
          if (options.planType === "monthly") {
            generateMonthly(options.selectedMonth, options.selectedYear, options);
          } else if (options.planType === "daily") {
            generateDaily(options);
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
  const { isGuest, ready } = useRole();

  return (
    <AppShell showRightRail={false}>
      <div className="max-w-[1240px] mx-auto w-full">
        <PageHeader
          eyebrow="AI Hỗ trợ"
          title="Kế hoạch Thực đơn của tôi"
          subtitle="Lập kế hoạch thực đơn chay theo tuần và tháng dựa trên chỉ số BMI, mục tiêu calo, trường phái ăn chay và loại trừ dị ứng thực phẩm của bạn."
          action={
            <Badge variant="beta" className="text-sm px-3 py-1">
              Cá nhân hóa
            </Badge>
          }
        />

        {!ready ? (
          <GatedSkeleton />
        ) : isGuest ? (
          <LockedState
            reason="guest"
            title="Đăng nhập để xem Kế hoạch Thực đơn"
            description="Kế hoạch thực đơn chay cá nhân hóa theo tuần và tháng, tính toán calo BMR/TDEE và loại trừ nguyên liệu dị ứng tự động là tính năng dành riêng cho thành viên VeggieHub. Vui lòng đăng nhập hoặc đăng ký tài khoản để trải nghiệm."
          />
        ) : (
          <PlannerContent />
        )}
      </div>
    </AppShell>
  );
}
