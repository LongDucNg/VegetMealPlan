"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Flame, Clock, RefreshCw, Tag, Info, Utensils, Plus } from "lucide-react";
import { Recipe } from "@/features/recipes/types";
import { RecipeAllergyBadge } from "@/features/recipes/components/RecipeAllergyBadge";
import { RecipeFavoriteButton } from "@/components/ui/RecipeFavoriteButton";
import { priceService, PRICE_WARNING_TEXT } from "@/features/recipes/services/priceService";

interface MealCardProps {
  mealType: "Breakfast" | "Lunch" | "Dinner" | "Snack";
  recipe: Recipe;
  recipes?: Recipe[];
  timeString?: string;
  onOpenReplace?: (recipe: Recipe, recipeIndex?: number) => void;
  onOpenAddDish?: (mealType: "Breakfast" | "Lunch" | "Dinner" | "Snack") => void;
  onOpenPriceModal?: (recipe: Recipe) => void;
  userId?: string;
}

function MacroPill({ label, grams, color }: { label: string; grams: number; color: string }) {
  return (
    <div className="flex items-center gap-1 text-[11px] bg-stone-50 border border-stone-200/80 rounded-lg px-1.5 py-0.5">
      <span className={`w-1.5 h-1.5 rounded-full ${color}`} />
      <span className="text-stone-500">{label}:</span>
      <span className="font-semibold text-stone-800">{grams}g</span>
    </div>
  );
}

function getDishRoleBadge(dish: Recipe, index: number, mealType?: string): { label: string; color: string } {
  if (mealType === "Snack") {
    const text = `${dish.name || dish.title || ""} ${dish.category || ""} ${(dish.categories || []).join(" ")}`.toLowerCase();
    if (text.includes("chè") || text.includes("tráng miệng") || text.includes("kem") || text.includes("sinh tố")) {
      return { label: "Tráng Miệng", color: "bg-purple-50 text-purple-800 border-purple-200" };
    }
    if (text.includes("bánh") || text.includes("ăn vặt")) {
      return { label: "Ăn Vặt", color: "bg-amber-50 text-amber-800 border-amber-200" };
    }
    return { label: "Món Phụ", color: "bg-sky-50 text-sky-800 border-sky-200" };
  }

  const text = `${dish.name || dish.title || ""} ${dish.category || ""} ${(dish.categories || []).join(" ")}`.toLowerCase();
  if (text.includes("canh") || text.includes("súp")) {
    return { label: "Món Canh", color: "bg-sky-50 text-sky-800 border-sky-200" };
  }
  if (text.includes("cơm") || text.includes("xôi")) {
    return { label: "Cơm / Tinh bột", color: "bg-amber-50 text-amber-800 border-amber-200" };
  }
  if (text.includes("rau") || text.includes("luộc") || text.includes("hấp") || text.includes("salad") || text.includes("gỏi")) {
    return { label: "Rau / Salad", color: "bg-emerald-50 text-emerald-800 border-emerald-200" };
  }
  if (text.includes("xào")) {
    return { label: "Món Xào", color: "bg-orange-50 text-orange-800 border-orange-200" };
  }
  if (text.includes("kho") || text.includes("rim") || text.includes("chiên") || text.includes("đậu hũ") || text.includes("nấm") || index === 0) {
    return { label: "Món Chính", color: "bg-rose-50 text-rose-800 border-rose-200" };
  }
  return { label: dish.category || `Món ${index + 1}`, color: "bg-stone-50 text-stone-700 border-stone-200" };
}

export function MealCard({
  mealType,
  recipe,
  recipes,
  timeString,
  onOpenReplace,
  onOpenAddDish,
  onOpenPriceModal,
  userId,
}: MealCardProps) {
  const [showPriceWarningTooltip, setShowPriceWarningTooltip] = useState(false);

  const colorMap: Record<string, { badge: string; border: string }> = {
    Breakfast: { badge: "bg-amber-100 text-amber-900 border-amber-200", border: "border-stone-200" },
    Lunch: { badge: "bg-emerald-100 text-emerald-900 border-emerald-200", border: "border-stone-200" },
    Dinner: { badge: "bg-violet-100 text-violet-900 border-violet-200", border: "border-stone-200" },
    Snack: { badge: "bg-sky-100 text-sky-900 border-sky-200", border: "border-stone-200" },
  };

  const colors = colorMap[mealType] || colorMap.Breakfast;
  const dishes = recipes && recipes.length > 0 ? recipes : [recipe];

  // Aggregated metrics for meal
  const totalMealCalories = dishes.reduce((sum, d) => sum + (Number(d.calories) || 0), 0);
  const totalMealProtein = Math.round(dishes.reduce((sum, d) => sum + (Number(d.protein) || 0), 0) * 10) / 10;
  const totalMealCarbs = Math.round(dishes.reduce((sum, d) => sum + (Number(d.carbs) || 0), 0) * 10) / 10;
  const totalMealFat = Math.round(dishes.reduce((sum, d) => sum + (Number(d.fat) || 0), 0) * 10) / 10;
  const totalMealAdminCost = dishes.reduce(
    (sum, d) => sum + (d.estimatedCost || priceService.calculateRecipeCost(d.ingredients || []).estimatedCost),
    0
  );

  return (
    <div
      className={`bg-white border ${colors.border} rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group h-full`}
    >
      {/* Header bar */}
      <div className="p-4 bg-gradient-to-r from-stone-50 via-white to-stone-50/60 border-b border-stone-100 space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border shadow-2xs ${colors.badge}`}
            >
              {mealType === "Breakfast"
                ? "Bữa sáng"
                : mealType === "Lunch"
                ? "Bữa trưa"
                : mealType === "Dinner"
                ? "Bữa tối"
                : "Bữa phụ"}
            </span>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Utensils className="w-2.5 h-2.5 text-emerald-600" />
              {dishes.length > 1 ? `Mâm ${dishes.length} món` : "1 món"}
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {timeString && (
              <span className="inline-flex items-center gap-1 bg-stone-100 text-stone-600 text-[10px] font-medium px-2 py-0.5 rounded-full border border-stone-200">
                <Clock className="w-2.5 h-2.5 text-stone-400" />
                {timeString}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 pt-0.5 flex-wrap">
          <span className="flex items-center gap-1 font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-lg border border-amber-200 text-xs shadow-2xs">
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            Tổng: ~{Math.round(Number(totalMealCalories) * 100) / 100} kcal
          </span>

          {/* Macronutrient breakdown */}
          <div className="flex flex-wrap gap-1">
            <MacroPill label="Đạm" grams={totalMealProtein} color="bg-emerald-500" />
            <MacroPill label="Carb" grams={totalMealCarbs} color="bg-amber-400" />
            <MacroPill label="Béo" grams={totalMealFat} color="bg-violet-400" />
          </div>
        </div>
      </div>

      {/* Dishes Items List */}
      <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2.5">
        <div className="space-y-2">
          {dishes.map((dish, idx) => {
            const role = getDishRoleBadge(dish, idx, mealType);
            return (
              <div
                key={`${dish.id}-${idx}`}
                className="p-2.5 rounded-2xl bg-stone-50/80 border border-stone-200/70 hover:bg-white hover:border-emerald-300 hover:shadow-2xs transition-all flex items-center gap-2.5 group/dish"
              >
                {/* Dish Thumbnail */}
                <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-stone-200 shrink-0 border border-stone-200">
                  {dish.image ? (
                    <Image
                      src={dish.image}
                      alt={dish.title}
                      fill
                      className="object-cover group-hover/dish:scale-105 transition-transform duration-200"
                      sizes="48px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[9px] text-stone-400">
                      Ảnh món
                    </div>
                  )}
                </div>

                {/* Dish Info */}
                <div className="flex-1 min-w-0 space-y-0.5">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded border ${role.color}`}>
                      {role.label}
                    </span>
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                      ~{Math.round(Number(dish.calories) * 100) / 100} kcal
                    </span>
                  </div>

                  <Link
                    href={`/recipes/${dish.id}`}
                    className="block font-semibold text-stone-900 text-xs leading-snug truncate hover:text-emerald-700 hover:underline transition-colors cursor-pointer"
                    title={dish.name || dish.title}
                  >
                    {dish.name || dish.title}
                  </Link>

                  {/* Allergy warning if any */}
                  <div className="max-w-full overflow-hidden">
                    <RecipeAllergyBadge recipe={dish} compact />
                  </div>
                </div>

                {/* Actions for this specific dish */}
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <RecipeFavoriteButton recipeId={dish.id} size="sm" />
                  {onOpenReplace && (
                    <button
                      type="button"
                      onClick={() => onOpenReplace(dish, idx)}
                      className="px-2 py-0.5 rounded-lg bg-white hover:bg-emerald-50 hover:text-emerald-800 border border-stone-200 hover:border-emerald-300 text-stone-600 font-semibold text-[10px] flex items-center gap-1 transition-all cursor-pointer shadow-2xs"
                      title={`Đổi ${role.label.toLowerCase()}`}
                    >
                      <RefreshCw className="w-2.5 h-2.5 text-emerald-700" />
                      <span>Đổi</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {onOpenAddDish && (
            <button
              type="button"
              onClick={() => onOpenAddDish(mealType)}
              className="w-full py-1.5 px-3 rounded-xl border border-dashed border-emerald-300 hover:border-emerald-500 bg-emerald-50/50 hover:bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs mt-1"
            >
              <Plus className="w-3.5 h-3.5 text-emerald-600" />
              <span>+ Thêm món</span>
            </button>
          )}
        </div>

        {/* Pricing Section */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1 font-bold text-stone-800 text-[11px]">
            <Tag className="w-3 h-3 text-emerald-600" />
            <span>Ước tính: ~{priceService.formatEstimatedPrice(totalMealAdminCost)}</span>
            <div className="relative inline-block">
              <button
                type="button"
                onClick={() => setShowPriceWarningTooltip(!showPriceWarningTooltip)}
                onMouseEnter={() => setShowPriceWarningTooltip(true)}
                onMouseLeave={() => setShowPriceWarningTooltip(false)}
                title="Thông tin giá"
                className="text-stone-400 hover:text-stone-600 cursor-pointer p-0.5"
              >
                <Info className="w-3 h-3 text-stone-400" />
              </button>
              {showPriceWarningTooltip && (
                <div className="absolute bottom-full left-0 mb-1 w-52 p-2 bg-stone-900 text-white text-[10px] rounded-xl shadow-lg z-20 leading-relaxed">
                  {PRICE_WARNING_TEXT}
                </div>
              )}
            </div>
          </div>

          {onOpenPriceModal && (
            <button
              type="button"
              onClick={() => onOpenPriceModal(dishes[0])}
              className="text-[10px] font-semibold text-emerald-700 hover:text-emerald-900 underline underline-offset-2 transition-colors cursor-pointer shrink-0"
            >
              Nhập giá thực
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
