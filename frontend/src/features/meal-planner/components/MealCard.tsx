"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Flame, Clock, RefreshCw, Tag, AlertCircle, Info, Utensils } from "lucide-react";
import { Recipe } from "@/features/recipes/types";
import { RecipeAllergyBadge } from "@/features/recipes/components/RecipeAllergyBadge";
import { RecipeFavoriteButton } from "@/components/ui/RecipeFavoriteButton";
import { priceService, PRICE_WARNING_TEXT } from "@/features/recipes/services/priceService";

interface MealCardProps {
  mealType: "Breakfast" | "Lunch" | "Dinner" | "Snack";
  recipe: Recipe;
  recipes?: Recipe[];
  timeString?: string;
  onOpenReplace?: (recipe: Recipe, dishIndex?: number) => void;
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

export function MealCard({
  mealType,
  recipe,
  recipes,
  timeString,
  onOpenReplace,
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
  const dishList = recipes && recipes.length > 0 ? recipes : [recipe];
  const isMultiDish = dishList.length > 1;

  // Tổng calo và chất dinh dưỡng của cả buổi (sum 2-3 món)
  const totalMealCalories = Math.round(
    dishList.reduce((sum, d) => sum + (Number(d.calories) || 0), 0)
  );
  const totalMealProtein = Math.round(
    dishList.reduce((sum, d) => sum + (Number(d.protein) || 0), 0) * 10
  ) / 10;
  const totalMealCarbs = Math.round(
    dishList.reduce((sum, d) => sum + (Number(d.carbs) || 0), 0) * 10
  ) / 10;
  const totalMealFat = Math.round(
    dishList.reduce((sum, d) => sum + (Number(d.fat) || 0), 0) * 10
  ) / 10;
  const totalMealCost = dishList.reduce(
    (sum, d) => sum + priceService.getEffectivePrice(d, userId).price,
    0
  );

  const heroDish = dishList[0] || recipe;

  return (
    <div
      className={`bg-white border ${colors.border} rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group`}
    >
      {/* Recipe Image & Top Header */}
      <div className="relative aspect-[16/10] w-full bg-stone-100 overflow-hidden">
        {heroDish.image ? (
          <Image
            src={heroDish.image}
            alt={heroDish.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-stone-200 text-stone-400">
            No Image
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
          <span
            className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border shadow-2xs ${colors.badge}`}
          >
            {mealType === "Breakfast" ? "Bữa sáng" : mealType === "Lunch" ? "Bữa trưa" : mealType === "Dinner" ? "Bữa tối" : "Bữa phụ"}
          </span>
          {isMultiDish && (
            <span className="text-[10px] font-bold bg-stone-900/80 text-amber-300 px-2 py-0.5 rounded-full shadow-2xs">
              {dishList.length} món
            </span>
          )}
        </div>

        {/* Top Right: Clock & Total Calories */}
        <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5">
          {timeString && (
            <span className="inline-flex items-center gap-1 bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
              <Clock className="w-2.5 h-2.5" />
              {timeString}
            </span>
          )}
        </div>

        {/* Bottom Banner on Image showing total meal calories */}
        <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-xs text-white z-10 pointer-events-none">
          <span className="bg-stone-900/85 backdrop-blur-xs px-2.5 py-1 rounded-xl font-bold flex items-center gap-1 text-amber-300 shadow-sm">
            <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ~{totalMealCalories} kcal
          </span>
          <span className="bg-stone-900/85 backdrop-blur-xs px-2 py-1 rounded-xl text-[10px] font-medium text-stone-200 shadow-sm">
            ~{totalMealCost.toLocaleString("vi-VN")} VNĐ
          </span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Multi-dish layout (2-3 món mỗi bữa) */}
          {isMultiDish ? (
            <div className="space-y-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                Thực đơn bữa ăn ({dishList.length} món):
              </span>
              {dishList.map((dish, idx) => (
                <div
                  key={dish.id + "-" + idx}
                  className="p-2.5 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-center gap-2.5 hover:border-emerald-300 transition-colors"
                >
                  <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0 bg-stone-200 border border-stone-100">
                    {dish.image ? (
                      <Image src={dish.image} alt={dish.title} fill className="object-cover" sizes="40px" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[9px] text-stone-400">
                        <Utensils className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/recipes/${dish.id}`}
                      className="block font-semibold text-stone-900 text-xs truncate hover:text-emerald-700 hover:underline"
                    >
                      {idx + 1}. {dish.name || dish.title}
                    </Link>
                    <div className="flex items-center gap-2 text-[10px] text-stone-500 mt-0.5">
                      <span className="font-bold text-amber-600">~{dish.calories} kcal</span>
                      <span>·</span>
                      <span>{dish.protein}g đạm</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <RecipeFavoriteButton recipeId={dish.id} size="sm" />
                    {onOpenReplace && (
                      <button
                        type="button"
                        onClick={() => onOpenReplace(dish, idx)}
                        className="px-2 py-1 rounded-lg bg-white border border-stone-200 hover:border-emerald-400 text-stone-600 hover:text-emerald-700 text-[10px] font-semibold transition-colors cursor-pointer"
                        title="Đổi món này"
                      >
                        <RefreshCw className="w-2.5 h-2.5 inline mr-0.5" />
                        Đổi
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              {/* Single Dish View */}
              <div className="mb-2">
                <RecipeAllergyBadge recipe={heroDish} compact />
              </div>

              <Link
                href={`/recipes/${heroDish.id}`}
                className="block font-semibold text-stone-900 text-sm leading-snug line-clamp-2 hover:text-emerald-700 hover:underline transition-colors cursor-pointer"
              >
                {heroDish.name || heroDish.title}
              </Link>

              <div className="flex items-center gap-2 mt-2 text-xs text-stone-500">
                <span className="flex items-center gap-1 font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                  <Flame className="w-3 h-3 text-amber-500 fill-amber-500" />
                  ~{heroDish.calories} kcal
                </span>
                <RecipeFavoriteButton recipeId={heroDish.id} size="sm" />
              </div>
            </div>
          )}

          {/* Pricing Section */}
          <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1 text-xs font-bold text-stone-800">
              <Tag className="w-3 h-3 text-emerald-600" />
              <span>Chi phí: ~{totalMealCost.toLocaleString("vi-VN")} VNĐ</span>
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
                onClick={() => onOpenPriceModal(heroDish)}
                className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-900 underline underline-offset-2 transition-colors cursor-pointer shrink-0"
              >
                Nhập giá
              </button>
            )}
          </div>
        </div>

        {/* Bottom Actions & Macros */}
        <div className="pt-2 border-t border-stone-100 space-y-2">
          {/* Macronutrient breakdown */}
          <div className="flex flex-wrap gap-1">
            <MacroPill label="Đạm" grams={totalMealProtein} color="bg-emerald-500" />
            <MacroPill label="Carb" grams={totalMealCarbs} color="bg-amber-400" />
            <MacroPill label="Béo" grams={totalMealFat} color="bg-violet-400" />
          </div>

          {/* If single dish, provide main replace button */}
          {!isMultiDish && onOpenReplace && (
            <button
              type="button"
              onClick={() => onOpenReplace(heroDish, 0)}
              className="w-full h-8 rounded-xl bg-stone-100 hover:bg-emerald-50 hover:text-emerald-800 border border-stone-200 hover:border-emerald-300 text-stone-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <RefreshCw className="w-3 h-3 text-emerald-700" />
              <span>Đổi món</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
