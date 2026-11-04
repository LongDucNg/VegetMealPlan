"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import {
  X,
  RefreshCw,
  Flame,
  Check,
  Sparkles,
  Heart,
  CalendarDays,
  Utensils,
  AlertCircle,
  Calendar,
} from "lucide-react";
import { Recipe } from "@/features/recipes/types";
import { UserProfile, formatVegetarianType } from "@/features/profile/types";
import { recipeService } from "@/features/recipes/services/recipeService";
import { priceService } from "@/features/recipes/services/priceService";
import { RecipeAllergyBadge } from "@/features/recipes/components/RecipeAllergyBadge";
import { favoriteService, SavedMealPlan } from "@/features/recipes/services/favoriteService";
import { DayMealPlan } from "@/features/meal-planner/types";

interface MealReplacementModalProps {
  isOpen: boolean;
  onClose: () => void;
  originalRecipe: Recipe | null;
  mealType: string;
  profile: UserProfile;
  onSelectReplacement: (newRecipe: Recipe) => void;
  onApplyDayPlan?: (dayPlan: DayMealPlan) => void;
}

export function MealReplacementModal({
  isOpen,
  onClose,
  originalRecipe,
  mealType,
  profile,
  onSelectReplacement,
  onApplyDayPlan,
}: MealReplacementModalProps) {
  const [activeTab, setActiveTab] = useState<"suggestions" | "favorites" | "saved_plans">("suggestions");
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const [savedPlans, setSavedPlans] = useState<SavedMealPlan[]>([]);

  useEffect(() => {
    if (isOpen) {
      setFavoriteRecipes(favoriteService.getFavoriteRecipes(profile.id));
      setSavedPlans(favoriteService.getFavoriteMealPlans(profile.id));
    }
  }, [isOpen, profile.id]);

  const suggestions = useMemo(() => {
    if (!originalRecipe) return [];
    return recipeService.getReplacementSuggestions(originalRecipe, profile);
  }, [originalRecipe, profile]);

  if (!isOpen || !originalRecipe) return null;

  const origCost = priceService.getEffectivePrice(originalRecipe, String(profile.id || "")).formatted;
  const normalizedSlot = mealType.toLowerCase();

  const getSlotNameVi = (type: string) => {
    const s = type.toLowerCase();
    if (s.includes("breakfast") || s.includes("sáng")) return "bữa sáng";
    if (s.includes("lunch") || s.includes("trưa")) return "bữa trưa";
    if (s.includes("dinner") || s.includes("tối")) return "bữa tối";
    return "bữa phụ";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <RefreshCw className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-stone-900 flex items-center gap-2">
                Đổi món {getSlotNameVi(mealType)}
              </h3>
              <p className="text-xs text-stone-500">
                Lựa chọn từ gợi ý AI, món bạn yêu thích hoặc thay thế từ thực đơn yêu thích
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

        {/* Current Dish Summary */}
        <div className="p-4 bg-emerald-50/60 border-b border-emerald-100 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 shrink-0">
              Món hiện tại
            </span>
            <span className="font-semibold text-stone-900 text-sm truncate">
              {originalRecipe.name || originalRecipe.title}
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs shrink-0">
            <span className="font-bold text-amber-700">~{Math.round(Number(originalRecipe.calories) * 100) / 100} kcal</span>
            <span className="text-stone-400">·</span>
            <span className="text-stone-600 font-medium">{origCost}</span>
          </div>
        </div>

        {/* 3 Tabs: AI Suggestions | Favorite Recipes | Saved Plans */}
        <div className="flex items-center gap-1 px-5 pt-3 border-b border-stone-100 bg-white shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab("suggestions")}
            className={`pb-2.5 px-2 text-xs font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
              activeTab === "suggestions"
                ? "border-emerald-700 text-emerald-800"
                : "border-transparent text-stone-500 hover:text-stone-800"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Gợi ý AI ({suggestions.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("favorites")}
            className={`pb-2.5 px-2 text-xs font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
              activeTab === "favorites"
                ? "border-rose-600 text-rose-700 font-bold"
                : "border-transparent text-stone-500 hover:text-stone-800"
            }`}
          >
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>Món yêu thích ({favoriteRecipes.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("saved_plans")}
            className={`pb-2.5 px-2 text-xs font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
              activeTab === "saved_plans"
                ? "border-violet-600 text-violet-800 font-bold"
                : "border-transparent text-stone-500 hover:text-stone-800"
            }`}
          >
            <CalendarDays className="w-3.5 h-3.5 text-violet-600" />
            <span>Thực đơn yêu thích ({savedPlans.length})</span>
          </button>
        </div>

        {/* TAB 1: AI Suggestions */}
        {activeTab === "suggestions" && (
          <div className="p-5 overflow-y-auto space-y-3 flex-1">
            <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
              <span className="font-semibold uppercase tracking-wider">
                {suggestions.length} Món thay thế tương thích calo
              </span>
              <span>Ưu tiên độ lệch calo thấp nhất</span>
            </div>

            {suggestions.map((recipe) => {
              const rawDiff = Number(recipe.calories || 0) - Number(originalRecipe.calories || 0);
              const calDiff = Number(rawDiff.toFixed(2));
              const formattedDiff = calDiff > 0 ? `+${calDiff}` : `${calDiff}`;
              const diffText = Math.abs(calDiff) === 0 ? "Chuẩn xác calo" : `${formattedDiff} kcal`;
              const diffColor =
                Math.abs(calDiff) <= 25
                  ? "bg-emerald-100 text-emerald-900 border-emerald-200"
                  : "bg-amber-100 text-amber-900 border-amber-200";

              const costInfo = priceService.getEffectivePrice(recipe, String(profile.id || ""));

              return (
                <div
                  key={recipe.id}
                  className="p-3.5 rounded-2xl border border-stone-200 hover:border-emerald-500/80 bg-white hover:bg-stone-50/60 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs group"
                >
                  <div className="flex items-center gap-3.5 min-w-0 flex-1">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                      {recipe.image ? (
                        <Image
                          src={recipe.image}
                          alt={recipe.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] text-stone-400">
                          Ảnh món
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase px-2 py-0.2 rounded-full bg-stone-100 text-stone-700">
                          {formatVegetarianType(recipe.vegetarianType)}
                        </span>
                        <span className={`text-[10px] font-semibold px-2 py-0.2 rounded-full border ${diffColor}`}>
                          {diffText}
                        </span>
                        <RecipeAllergyBadge recipe={recipe} compact />
                      </div>

                      <h4 className="font-semibold text-stone-900 text-sm truncate group-hover:text-emerald-700 transition-colors">
                        {recipe.name || recipe.title}
                      </h4>

                      <div className="flex items-center gap-3 text-xs text-stone-500 mt-0.5">
                        <span className="flex items-center gap-1 font-semibold text-amber-600">
                          <Flame className="w-3 h-3 fill-amber-500 text-amber-500" />
                          ~{Math.round(Number(recipe.calories) * 100) / 100} kcal
                        </span>
                        <span>
                          Đạm: {Math.round(Number(recipe.protein || 0) * 10) / 10}g · Béo: {Math.round(Number(recipe.fat || 0) * 10) / 10}g
                        </span>
                        <span className="text-emerald-800 font-medium">{costInfo.formatted}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      onSelectReplacement(recipe);
                      onClose();
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-2xs transition-colors cursor-pointer shrink-0 self-end sm:self-center flex items-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5" />
                    Chọn món này
                  </button>
                </div>
              );
            })}

            {suggestions.length === 0 && (
              <div className="p-8 text-center text-stone-400 text-xs">
                <AlertCircle className="w-8 h-8 mx-auto mb-2 text-stone-300" />
                Không tìm thấy món thay thế phù hợp với các ràng buộc dinh dưỡng và dị ứng.
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Favorite Recipes */}
        {activeTab === "favorites" && (
          <div className="p-5 overflow-y-auto space-y-3 flex-1">
            <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
              <span className="font-semibold uppercase tracking-wider text-rose-800">
                {favoriteRecipes.length} Món bạn đã lưu yêu thích
              </span>
              <span>Bấm chọn để thay thế vào bữa này</span>
            </div>

            {favoriteRecipes.length === 0 ? (
              <div className="p-10 text-center text-stone-400">
                <Heart className="w-10 h-10 mx-auto mb-2 text-stone-300" />
                <p className="font-semibold text-stone-700 text-sm">
                  Bạn chưa có món ăn yêu thích nào
                </p>
                <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                  Hãy nhấn biểu tượng trái tim ♡ trên các món ăn ở trang Kế hoạch thực đơn hoặc Công thức để thêm vào danh sách yêu thích của bạn.
                </p>
              </div>
            ) : (
              favoriteRecipes.map((recipe) => {
                const rawDiff = Number(recipe.calories || 0) - Number(originalRecipe.calories || 0);
                const calDiff = Number(rawDiff.toFixed(2));
                const formattedDiff = calDiff > 0 ? `+${calDiff}` : `${calDiff}`;
                const diffText = Math.abs(calDiff) === 0 ? "Chuẩn xác calo" : `${formattedDiff} kcal`;
                const costInfo = priceService.getEffectivePrice(recipe, String(profile.id || ""));

                return (
                  <div
                    key={recipe.id}
                    className="p-3.5 rounded-2xl border border-rose-200 bg-rose-50/20 hover:bg-rose-50/60 hover:border-rose-400 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs group"
                  >
                    <div className="flex items-center gap-3.5 min-w-0 flex-1">
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                        {recipe.image ? (
                          <Image
                            src={recipe.image}
                            alt={recipe.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] text-stone-400">
                            Ảnh món
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold uppercase px-2 py-0.2 rounded-full bg-rose-100 text-rose-800">
                            Yêu thích
                          </span>
                          <span className="text-[10px] font-semibold px-2 py-0.2 rounded-full bg-stone-100 text-stone-700 border">
                            {diffText}
                          </span>
                          <RecipeAllergyBadge recipe={recipe} compact />
                        </div>

                        <h4 className="font-semibold text-stone-900 text-sm truncate group-hover:text-rose-700 transition-colors">
                          {recipe.name || recipe.title}
                        </h4>

                        <div className="flex items-center gap-3 text-xs text-stone-500 mt-0.5">
                          <span className="flex items-center gap-1 font-semibold text-amber-600">
                            <Flame className="w-3 h-3 fill-amber-500 text-amber-500" />
                            ~{Math.round(Number(recipe.calories) * 100) / 100} kcal
                          </span>
                          <span className="text-emerald-800 font-medium">{costInfo.formatted}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        onSelectReplacement(recipe);
                        onClose();
                      }}
                      className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-2xs transition-colors cursor-pointer shrink-0 self-end sm:self-center flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Đổi sang món này
                    </button>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* TAB 3: Saved Meal Plans */}
        {activeTab === "saved_plans" && (
          <div className="p-5 overflow-y-auto space-y-4 flex-1">
            <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
              <span className="font-semibold uppercase tracking-wider text-violet-800">
                {savedPlans.length} Mẫu thực đơn bạn đã lưu
              </span>
              <span>Chọn món trong thực đơn hoặc áp dụng nguyên ngày</span>
            </div>

            {savedPlans.length === 0 ? (
              <div className="p-10 text-center text-stone-400">
                <CalendarDays className="w-10 h-10 mx-auto mb-2 text-stone-300" />
                <p className="font-semibold text-stone-700 text-sm">
                  Bạn chưa có thực đơn đã lưu nào
                </p>
                <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                  Khi tạo thực đơn tuần hoặc tháng, hãy nhấn &quot;Lưu thực đơn&quot; để lưu lại mẫu kế hoạch yêu thích để tái sử dụng.
                </p>
              </div>
            ) : (
              savedPlans.map((plan) => {
                // Find matching slot recipes from first day
                const firstDay = plan.days?.[0];
                let slotRecipes: Recipe[] = [];
                if (firstDay) {
                  const targetSlot =
                    normalizedSlot.includes("breakfast") || normalizedSlot.includes("sáng")
                      ? firstDay.breakfast
                      : normalizedSlot.includes("lunch") || normalizedSlot.includes("trưa")
                      ? firstDay.lunch
                      : normalizedSlot.includes("dinner") || normalizedSlot.includes("tối")
                      ? firstDay.dinner
                      : firstDay.snack;
                  if (targetSlot) {
                    slotRecipes = targetSlot.recipes && targetSlot.recipes.length > 0 ? targetSlot.recipes : (targetSlot.recipe ? [targetSlot.recipe] : []);
                  }
                }

                return (
                  <div
                    key={plan.id}
                    className="p-4 rounded-2xl border border-violet-200 bg-violet-50/20 hover:border-violet-400 transition-all space-y-3 shadow-2xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-violet-100 pb-2.5">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-violet-100 text-violet-900">
                            {plan.planType === "monthly" ? "Thực đơn tháng" : "Thực đơn tuần"}
                          </span>
                          <h4 className="font-bold text-stone-900 text-sm">
                            {plan.name}
                          </h4>
                        </div>
                        <p className="text-xs text-stone-500 mt-0.5">
                          {plan.days?.length || 0} ngày · ~{Math.round(Number(plan.targetCalories) * 100) / 100} kcal/ngày · ~{plan.totalEstimatedCost?.toLocaleString("vi-VN")} đ
                        </p>
                      </div>

                      {/* Replace whole day button */}
                      {onApplyDayPlan && firstDay && (
                        <button
                          type="button"
                          onClick={() => {
                            onApplyDayPlan(firstDay);
                            onClose();
                          }}
                          className="px-3.5 py-1.5 rounded-xl bg-violet-700 hover:bg-violet-800 text-white font-bold text-xs shadow-2xs transition-colors cursor-pointer self-start sm:self-auto flex items-center gap-1.5"
                        >
                          <Utensils className="w-3.5 h-3.5" />
                          Thay thế toàn bộ 4 bữa hôm nay
                        </button>
                      )}
                    </div>

                    {/* Show corresponding slot dishes from this plan */}
                    {slotRecipes.length > 0 && (
                      <div className="space-y-2 pt-1">
                        <span className="text-[11px] font-semibold text-stone-600 block">
                          Các món {getSlotNameVi(mealType)} trong thực đơn mẫu này:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {slotRecipes.map((dish, dIdx) => (
                            <div
                              key={`${dish.id}-${dIdx}`}
                              className="p-2.5 rounded-xl bg-white border border-stone-200 flex items-center justify-between gap-2"
                            >
                              <div className="min-w-0">
                                <p className="font-semibold text-xs text-stone-900 truncate">
                                  {dish.name || dish.title}
                                </p>
                                <span className="text-[10px] text-amber-700 font-bold">
                                  ~{Math.round(Number(dish.calories) * 100) / 100} kcal
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  onSelectReplacement(dish);
                                  onClose();
                                }}
                                className="px-2.5 py-1 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-bold cursor-pointer shrink-0"
                              >
                                Đổi món này
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 shrink-0">
          <span>Đổi món sẽ cập nhật bữa này và tự động cân đối lại lượng calo.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-100 font-semibold cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
