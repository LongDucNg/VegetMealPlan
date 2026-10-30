"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import {
  X,
  Heart,
  CalendarDays,
  Sparkles,
  Check,
  AlertTriangle,
  Flame,
  Trash2,
  ExternalLink,
  BookOpen,
} from "lucide-react";
import { Recipe, MealType } from "@/features/recipes/types";
import { UserProfile } from "@/features/profile/types";
import { favoriteService, SavedMealPlan } from "@/features/recipes/services/favoriteService";
import { favoriteApiService } from "@/features/recipes/services/favoriteApiService";
import { mapBackendToFrontendRecipe } from "@/features/recipes/utils/recipeMapper";
import { mealPlannerService } from "../services/mealPlannerService";
import { mealPlanApiService } from "../services/mealPlanApiService";
import { priceService } from "@/features/recipes/services/priceService";
import { DayMealPlan } from "../types";

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onApplyPlan: (dayPlan: DayMealPlan) => void;
  onLoadSavedPlan: (plan: SavedMealPlan) => void;
  onSelectFavoriteRecipe?: (recipe: Recipe) => void;
  onGenerateWeeklyWithFavorites?: (favoriteRecipeIds: string[]) => void;
  onGenerateMonthlyWithFavorites?: (favoriteRecipeIds: string[]) => void;
  initialFavoriteRecipes?: Recipe[];
}

export function FavoritesModal({
  isOpen,
  onClose,
  profile,
  onApplyPlan,
  onLoadSavedPlan,
  onSelectFavoriteRecipe,
  onGenerateWeeklyWithFavorites,
  onGenerateMonthlyWithFavorites,
  initialFavoriteRecipes,
}: FavoritesModalProps) {
  const userId = String(profile.id || "1");
  const [activeTab, setActiveTab] = useState<"recipes" | "plans">("recipes");

  const [favRecipes, setFavRecipes] = useState<Recipe[]>(initialFavoriteRecipes || []);
  const [savedPlans, setSavedPlans] = useState<SavedMealPlan[]>([]);

  // Selection for Create Meal Plan from Favorites (Requirement 2)
  const [selectedBreakfast, setSelectedBreakfast] = useState<Recipe | null>(null);
  const [selectedLunch, setSelectedLunch] = useState<Recipe | null>(null);
  const [selectedDinner, setSelectedDinner] = useState<Recipe | null>(null);
  const [selectedSnack, setSelectedSnack] = useState<Recipe | null>(null);

  const [validationResult, setValidationResult] = useState<{
    isCompatible: boolean;
    warnings: string[];
    dayPlan: DayMealPlan;
  } | null>(null);

  const reloadData = async () => {
    try {
      const res = await favoriteApiService.getMyFavorites();
      const list = Array.isArray(res) ? res : (res as any)?.data || [];
      if (Array.isArray(list) && list.length > 0) {
        const mapped = list.map(mapBackendToFrontendRecipe);
        setFavRecipes(mapped);
        favoriteService.saveUserFavorites({
          userId,
          recipes: mapped.map((r) => String(r.id)),
          mealPlans: favoriteService.getFavoriteMealPlans(userId),
        });
      } else if (initialFavoriteRecipes && initialFavoriteRecipes.length > 0) {
        setFavRecipes(initialFavoriteRecipes);
      } else {
        setFavRecipes(favoriteService.getFavoriteRecipes(userId));
      }
    } catch {
      if (initialFavoriteRecipes && initialFavoriteRecipes.length > 0) {
        setFavRecipes(initialFavoriteRecipes);
      } else {
        setFavRecipes(favoriteService.getFavoriteRecipes(userId));
      }
    }
    setSavedPlans(favoriteService.getFavoriteMealPlans(userId));
  };

  useEffect(() => {
    if (isOpen) {
      if (initialFavoriteRecipes && initialFavoriteRecipes.length > 0) {
        setFavRecipes(initialFavoriteRecipes);
      }
      queueMicrotask(() => {
        reloadData();
        setValidationResult(null);
      });
    }
  }, [isOpen, userId, initialFavoriteRecipes]);

  // Group recipes by mealType
  const groupedRecipes = useMemo(() => {
    const map: Record<MealType, Recipe[]> = {
      breakfast: [],
      lunch: [],
      dinner: [],
      snack: [],
      any: [],
    };
    for (const r of favRecipes) {
      const raw = (r.mealType || "").toLowerCase();
      if (raw.includes("breakfast") || raw.includes("sáng")) {
        map.breakfast.push(r);
      } else if (raw.includes("snack") || raw.includes("vặt") || raw.includes("phụ")) {
        map.snack.push(r);
      } else if (raw.includes("dinner") || raw.includes("tối")) {
        map.dinner.push(r);
      } else if (raw === "any" || raw.includes("any")) {
        map.any.push(r);
        map.lunch.push(r);
        map.dinner.push(r);
      } else {
        map.lunch.push(r);
      }
    }
    return map;
  }, [favRecipes]);

  const breakfastOptions = groupedRecipes.breakfast.length > 0 ? groupedRecipes.breakfast : favRecipes;
  const lunchOptions = groupedRecipes.lunch.length > 0 ? groupedRecipes.lunch : favRecipes;
  const dinnerOptions = groupedRecipes.dinner.length > 0 ? groupedRecipes.dinner : favRecipes;
  const snackOptions = groupedRecipes.snack.length > 0 ? groupedRecipes.snack : favRecipes;

  if (!isOpen) return null;

  const handleValidateSelection = async () => {
    const result = mealPlannerService.validateAndCreateFromFavorites(
      {
        breakfast: selectedBreakfast || undefined,
        lunch: selectedLunch || undefined,
        dinner: selectedDinner || undefined,
        snack: selectedSnack || undefined,
      },
      profile
    );

    // Gọi API: POST /api/v1/meal-plans/validate để kiểm tra dị ứng và chế độ ăn từ server
    const todayStr = new Date().toISOString().split("T")[0];
    const mealsToValidate = [
      selectedBreakfast?.id ? { recipe_id: Number(selectedBreakfast.id), servings: 1 } : null,
      selectedLunch?.id ? { recipe_id: Number(selectedLunch.id), servings: 1 } : null,
      selectedDinner?.id ? { recipe_id: Number(selectedDinner.id), servings: 1 } : null,
      selectedSnack?.id ? { recipe_id: Number(selectedSnack.id), servings: 1 } : null,
    ].filter(Boolean) as Array<{ recipe_id: number; servings: number }>;

    let finalResult = result;
    if (mealsToValidate.length > 0) {
      try {
        const backendCheck = await mealPlanApiService.validateMealPlan({
          start_date: todayStr,
          end_date: todayStr,
          days: [{ date: todayStr, meals: mealsToValidate }],
        });

        if (backendCheck && !backendCheck.valid && Array.isArray(backendCheck.errors) && backendCheck.errors.length > 0) {
          finalResult = {
            ...result,
            isCompatible: false,
            warnings: [
              ...result.warnings,
              ...backendCheck.errors.map((e: string) => `[Hệ thống kiểm tra]: ${e}`),
            ],
          };
        }
      } catch (err) {
        console.warn("[FavoritesModal] Backend validateMealPlan error:", err);
      }
    }

    setValidationResult(finalResult);

    // If completely compatible without warnings, immediately apply
    if (finalResult.isCompatible) {
      onApplyPlan(finalResult.dayPlan);
      onClose();
    }
  };

  const handleKeepMySelection = () => {
    if (validationResult) {
      onApplyPlan(validationResult.dayPlan);
      onClose();
    }
  };

  const handleAdjustAutomatically = () => {
    if (validationResult) {
      // Generate a calibrated day using selected favorite ids as preferred pool
      const favIds = [
        selectedBreakfast?.id,
        selectedLunch?.id,
        selectedDinner?.id,
        selectedSnack?.id,
      ].filter(Boolean) as string[];

      const adjusted = mealPlannerService.generateDayPlan(
        { day: "Adjusted Day", short: "Adj", date: "AI Balanced" },
        profile,
        0,
        1,
        { planType: "weekly", favoriteRecipeIds: favIds }
      );

      onApplyPlan(adjusted);
      onClose();
    }
  };

  const handleRemoveSavedPlan = (id: string) => {
    if (confirm("Bạn có chắc muốn xóa thực đơn đã lưu này khỏi danh sách?")) {
      favoriteService.removeSavedMealPlan(userId, id);
      reloadData();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
              <Heart className="w-4 h-4 fill-rose-600" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-stone-900">
                Bộ sưu tập yêu thích
              </h3>
              <p className="text-xs text-stone-500">
                Công thức cá nhân hóa & các mẫu thực đơn đã lưu
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-stone-100 bg-white">
          <button
            onClick={() => setActiveTab("recipes")}
            className={`pb-3 text-xs font-bold transition-colors border-b-2 cursor-pointer ${
              activeTab === "recipes"
                ? "border-emerald-700 text-emerald-800"
                : "border-transparent text-stone-500 hover:text-stone-800"
            }`}
          >
            Món ăn yêu thích ({favRecipes.length})
          </button>
          <button
            onClick={() => setActiveTab("plans")}
            className={`pb-3 text-xs font-bold transition-colors border-b-2 cursor-pointer ${
              activeTab === "plans"
                ? "border-emerald-700 text-emerald-800"
                : "border-transparent text-stone-500 hover:text-stone-800"
            }`}
          >
            Thực đơn đã lưu ({savedPlans.length})
          </button>
        </div>

        {/* Tab 1: Favorite Recipes & Create Plan from Favorites (Requirement 1, 2) */}
        {activeTab === "recipes" && (
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            {favRecipes.length === 0 ? (
              <div className="p-12 text-center text-stone-400">
                <Heart className="w-10 h-10 mx-auto mb-2 text-stone-300" />
                <p className="font-medium text-sm text-stone-600">
                  Bạn chưa lưu món ăn yêu thích nào.
                </p>
                <p className="text-xs text-stone-400 mt-1">
                  Nhấn vào biểu tượng ♡ trên bất kỳ công thức nào để lưu vào danh sách yêu thích.
                </p>
              </div>
            ) : (
              <>
                {/* Quick Plan Generation with All Favorites (Requirement: đưa công thức yêu thích vào làm thực đơn tuần tháng) */}
                <div className="bg-gradient-to-r from-rose-50 to-amber-50 border border-rose-200/80 rounded-3xl p-5 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
                        <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                        Tạo thực đơn Tuần & Tháng từ món yêu thích
                      </h4>
                      <p className="text-xs text-stone-600 mt-0.5">
                        Đưa {favRecipes.length} công thức yêu thích vào thực đơn AI, tự động cân đối dinh dưỡng và calo.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {onGenerateWeeklyWithFavorites && (
                        <button
                          type="button"
                          onClick={() => {
                            onGenerateWeeklyWithFavorites(favRecipes.map((r) => r.id));
                            onClose();
                          }}
                          className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                          <span>Thực đơn Tuần (7 ngày)</span>
                        </button>
                      )}

                      {onGenerateMonthlyWithFavorites && (
                        <button
                          type="button"
                          onClick={() => {
                            onGenerateMonthlyWithFavorites(favRecipes.map((r) => r.id));
                            onClose();
                          }}
                          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <CalendarDays className="w-3.5 h-3.5" />
                          <span>Thực đơn Tháng (30 ngày)</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Create Meal Plan from Favorites Panel */}
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-3xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-serif font-bold text-base text-emerald-950 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-emerald-700" />
                        Tự tạo thực đơn 1 ngày từ món yêu thích
                      </h4>
                      <p className="text-xs text-emerald-800/80">
                        Chọn món yêu thích cho từng bữa ăn và để AI hỗ trợ cân đối chuẩn mục tiêu calo.
                      </p>
                    </div>

                    <button
                      onClick={handleValidateSelection}
                      disabled={!selectedBreakfast && !selectedLunch && !selectedDinner && !selectedSnack}
                      className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
                    >
                      Áp dụng thực đơn
                    </button>
                  </div>

                  {/* Slots Selection */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    {/* Breakfast */}
                    <div className="bg-white p-3 rounded-2xl border border-emerald-100 text-xs">
                      <span className="font-bold text-stone-500 block mb-1">
                        1. Bữa sáng:
                      </span>
                      <select
                        value={selectedBreakfast?.id || ""}
                        onChange={(e) => {
                          const r = favRecipes.find((item) => item.id === e.target.value) || null;
                          setSelectedBreakfast(r);
                        }}
                        className="w-full text-xs p-1.5 rounded-lg border border-stone-200 bg-stone-50 outline-none"
                      >
                        <option value="">-- Chọn món hoặc tự động --</option>
                        {breakfastOptions.map((r) => (
                          <option key={r.id} value={r.id}>
                            {r.name || r.title} ({r.calories} kcal)
                          </option>
                        ))}
                      </select>
                      {selectedBreakfast && (
                        <p className="text-[11px] font-semibold text-emerald-800 mt-1">
                          {selectedBreakfast.calories} kcal · {priceService.getEffectivePrice(selectedBreakfast, userId).formatted}
                        </p>
                      )}
                    </div>

                    {/* Lunch */}
                    <div className="bg-white p-3 rounded-2xl border border-emerald-100 text-xs">
                      <span className="font-bold text-stone-500 block mb-1">
                        2. Bữa trưa:
                      </span>
                      <select
                        value={selectedLunch?.id || ""}
                        onChange={(e) => {
                          const r = favRecipes.find((item) => item.id === e.target.value) || null;
                          setSelectedLunch(r);
                        }}
                        className="w-full text-xs p-1.5 rounded-lg border border-stone-200 bg-stone-50 outline-none"
                      >
                        <option value="">-- Chọn món hoặc tự động --</option>
                        {lunchOptions.map((r) => (
                          <option key={r.id} value={r.id}>
                            {r.name || r.title} ({r.calories} kcal)
                          </option>
                        ))}
                      </select>
                      {selectedLunch && (
                        <p className="text-[11px] font-semibold text-emerald-800 mt-1">
                          {selectedLunch.calories} kcal · {priceService.getEffectivePrice(selectedLunch, userId).formatted}
                        </p>
                      )}
                    </div>

                    {/* Dinner */}
                    <div className="bg-white p-3 rounded-2xl border border-emerald-100 text-xs">
                      <span className="font-bold text-stone-500 block mb-1">
                        3. Bữa tối:
                      </span>
                      <select
                        value={selectedDinner?.id || ""}
                        onChange={(e) => {
                          const r = favRecipes.find((item) => item.id === e.target.value) || null;
                          setSelectedDinner(r);
                        }}
                        className="w-full text-xs p-1.5 rounded-lg border border-stone-200 bg-stone-50 outline-none"
                      >
                        <option value="">-- Chọn món hoặc tự động --</option>
                        {dinnerOptions.map((r) => (
                          <option key={r.id} value={r.id}>
                            {r.name || r.title} ({r.calories} kcal)
                          </option>
                        ))}
                      </select>
                      {selectedDinner && (
                        <p className="text-[11px] font-semibold text-emerald-800 mt-1">
                          {selectedDinner.calories} kcal · {priceService.getEffectivePrice(selectedDinner, userId).formatted}
                        </p>
                      )}
                    </div>

                    {/* Snack */}
                    <div className="bg-white p-3 rounded-2xl border border-emerald-100 text-xs">
                      <span className="font-bold text-stone-500 block mb-1">
                        4. Bữa phụ:
                      </span>
                      <select
                        value={selectedSnack?.id || ""}
                        onChange={(e) => {
                          const r = favRecipes.find((item) => item.id === e.target.value) || null;
                          setSelectedSnack(r);
                        }}
                        className="w-full text-xs p-1.5 rounded-lg border border-stone-200 bg-stone-50 outline-none"
                      >
                        <option value="">-- Chọn món hoặc tự động --</option>
                        {snackOptions.map((r) => (
                          <option key={r.id} value={r.id}>
                            {r.name || r.title} ({r.calories} kcal)
                          </option>
                        ))}
                      </select>
                      {selectedSnack && (
                        <p className="text-[11px] font-semibold text-emerald-800 mt-1">
                          {selectedSnack.calories} kcal · {priceService.getEffectivePrice(selectedSnack, userId).formatted}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Target Mismatch Warning Dialog (Requirement 2) */}
                  {validationResult && !validationResult.isCompatible && (
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl space-y-3 text-xs text-amber-900 animate-in fade-in">
                      <div className="flex items-start gap-2.5">
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold">
                            Một số món ăn chưa hoàn toàn khớp với mục tiêu dinh dưỡng hôm nay:
                          </p>
                          <ul className="list-disc pl-4 mt-1 space-y-0.5 text-stone-700">
                            {validationResult.warnings.map((w, i) => (
                              <li key={i}>{w}</li>
                            ))}
                          </ul>
                          <p className="mt-2 text-[11px] text-stone-500">
                            Calo dự tính: <strong>{validationResult.dayPlan.totalCalories} kcal</strong> so với Mục tiêu: <strong>{profile.weight ? `${validationResult.dayPlan.targetCalories} kcal` : "Tùy chỉnh"}</strong>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 justify-end pt-1">
                        <button
                          onClick={handleAdjustAutomatically}
                          className="px-3.5 py-1.5 rounded-xl bg-white border border-amber-300 hover:bg-amber-100 font-bold text-amber-900 text-xs transition-colors cursor-pointer"
                        >
                          Tự động cân bằng AI
                        </button>
                        <button
                          onClick={handleKeepMySelection}
                          className="px-4 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 font-bold text-white text-xs shadow-2xs transition-colors cursor-pointer"
                        >
                          Giữ nguyên lựa chọn
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Favorites List Grid */}
                <div>
                  <h4 className="font-semibold text-stone-800 text-xs uppercase tracking-wider mb-3">
                    Tất cả món đã yêu thích ({favRecipes.length})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {favRecipes.map((r) => {
                      const cost = priceService.getEffectivePrice(r, userId);
                      return (
                        <div
                          key={r.id}
                          className="p-3 rounded-2xl border border-stone-200 bg-white flex items-center justify-between gap-3 shadow-2xs hover:border-emerald-300 transition-colors"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                              {r.image && (
                                <Image
                                  src={r.image}
                                  alt={r.title}
                                  fill
                                  className="object-cover"
                                />
                              )}
                            </div>
                            <div className="min-w-0">
                              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-sm bg-stone-100 text-stone-600">
                                {r.mealType}
                              </span>
                              <h5 className="font-semibold text-stone-900 text-xs truncate mt-0.5">
                                {r.name || r.title}
                              </h5>
                              <div className="flex items-center gap-2 text-[11px] text-stone-500">
                                <span className="text-amber-700 font-bold">{r.calories} kcal</span>
                                <span>·</span>
                                <span className="text-emerald-800 font-medium">{cost.formatted}</span>
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              favoriteService.toggleFavoriteRecipe(userId, r.id);
                              reloadData();
                            }}
                            title="Bỏ khỏi yêu thích"
                            className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 cursor-pointer"
                          >
                            <Heart className="w-4 h-4 fill-rose-500" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Tab 2: Saved Meal Plans (Requirement 1) */}
        {activeTab === "plans" && (
          <div className="p-6 overflow-y-auto space-y-4 flex-1">
            {savedPlans.length === 0 ? (
              <div className="p-12 text-center text-stone-400">
                <CalendarDays className="w-10 h-10 mx-auto mb-2 text-stone-300" />
                <p className="font-medium text-sm text-stone-600">
                  Chưa có thực đơn nào được lưu.
                </p>
                <p className="text-xs text-stone-400 mt-1">
                  Khi tạo thực đơn tuần hoặc tháng, hãy nhấn &quot;Lưu thực đơn&quot; để lưu lại làm mẫu kế hoạch mẫu.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {savedPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className="p-4 rounded-2xl border border-stone-200 bg-white hover:border-emerald-300 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900">
                          {plan.planType === "monthly" ? "Thực đơn tháng" : "Thực đơn tuần"}
                        </span>
                        <h4 className="font-bold text-stone-900 text-sm">
                          {plan.name}
                        </h4>
                      </div>
                      <p className="text-xs text-stone-500 mt-1">
                        Kế hoạch {plan.days.length} ngày · Mục tiêu: {plan.targetCalories} kcal/ngày · Chi phí ước tính: ~{plan.totalEstimatedCost.toLocaleString("vi-VN")} đ
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                      <button
                        onClick={() => {
                          onLoadSavedPlan(plan);
                          onClose();
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-2xs transition-colors cursor-pointer"
                      >
                        Áp dụng
                      </button>
                      <button
                        onClick={() => handleRemoveSavedPlan(plan.id)}
                        className="p-2 rounded-xl text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Xóa thực đơn"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
