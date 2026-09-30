"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Flame, Clock, Users, RefreshCw, Tag, AlertCircle, Info } from "lucide-react";
import { Recipe } from "@/features/recipes/types";
import { RecipeAllergyBadge } from "@/features/recipes/components/RecipeAllergyBadge";
import { RecipeFavoriteButton } from "@/components/ui/RecipeFavoriteButton";
import { priceService, PRICE_WARNING_TEXT } from "@/features/recipes/services/priceService";

interface MealCardProps {
  mealType: "Breakfast" | "Lunch" | "Dinner" | "Snack";
  recipe: Recipe;
  timeString?: string;
  onOpenReplace?: (recipe: Recipe) => void;
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
  const effectivePrice = priceService.getEffectivePrice(recipe, userId);
  const myPrice = userId ? priceService.getMyPrice(userId, recipe.id) : undefined;
  const adminEstimatedCost =
    recipe.estimatedCost || priceService.calculateRecipeCost(recipe.ingredients || []).estimatedCost;

  return (
    <div
      className={`bg-white border ${colors.border} rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group`}
    >
      {/* Recipe Image & Tags */}
      <div className="relative aspect-[16/10] w-full bg-stone-100 overflow-hidden">
        {recipe.image ? (
          <Image
            src={recipe.image}
            alt={recipe.title}
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
            {mealType}
          </span>
        </div>

        {/* Top Right: Favorite Button & Time */}
        <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5">
          {timeString && (
            <span className="inline-flex items-center gap-1 bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
              <Clock className="w-2.5 h-2.5" />
              {timeString}
            </span>
          )}
          <RecipeFavoriteButton recipeId={recipe.id} size="sm" />
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Allergy warning if recipe contains allergens */}
          <div className="mb-2">
            <RecipeAllergyBadge recipe={recipe} compact />
          </div>

          <h4 className="font-semibold text-stone-900 text-sm leading-snug line-clamp-2 group-hover:text-emerald-700 transition-colors">
            {recipe.name || recipe.title}
          </h4>

          {/* Calories & Serving */}
          <div className="flex items-center gap-2 mt-2 text-xs text-stone-500">
            <span className="flex items-center gap-1 font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
              <Flame className="w-3 h-3 text-amber-500 fill-amber-500" />
              {recipe.calories} kcal
            </span>
            <span className="flex items-center gap-1 text-[11px]">
              <Users className="w-3 h-3 text-stone-400" />
              {recipe.serving} serving{recipe.serving > 1 ? "s" : ""}
            </span>
          </div>

          {/* Pricing Section (Requirements 4, 5, 6) */}
          <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
            <div className="min-w-0">
              {myPrice ? (
                <div>
                  <div className="flex items-center gap-1 text-[10px] text-stone-400">
                    <span>Est: {priceService.formatEstimatedPrice(adminEstimatedCost)}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-emerald-800">
                    <Tag className="w-3 h-3 text-emerald-600" />
                    <span>My: {priceService.formatActualPrice(myPrice)}</span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-xs font-bold text-stone-800">
                  <span>Estimated: {priceService.formatEstimatedPrice(adminEstimatedCost)}</span>
                  <div className="relative inline-block">
                    <button
                      type="button"
                      onClick={() => setShowPriceWarningTooltip(!showPriceWarningTooltip)}
                      onMouseEnter={() => setShowPriceWarningTooltip(true)}
                      onMouseLeave={() => setShowPriceWarningTooltip(false)}
                      title="Price Disclaimer"
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
              )}
            </div>

            {onOpenPriceModal && (
              <button
                type="button"
                onClick={() => onOpenPriceModal(recipe)}
                className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-900 underline underline-offset-2 transition-colors cursor-pointer shrink-0"
              >
                {myPrice ? "Edit Price" : "My Price"}
              </button>
            )}
          </div>
        </div>

        {/* Bottom Actions & Macros */}
        <div className="pt-2 border-t border-stone-100 space-y-2">
          {/* Macronutrient breakdown */}
          <div className="flex flex-wrap gap-1">
            <MacroPill label="P" grams={recipe.protein} color="bg-emerald-500" />
            <MacroPill label="C" grams={recipe.carbs} color="bg-amber-400" />
            <MacroPill label="F" grams={recipe.fat} color="bg-violet-400" />
          </div>

          {/* Change / Replace button (Requirement 3) */}
          {onOpenReplace && (
            <button
              type="button"
              onClick={() => onOpenReplace(recipe)}
              className="w-full h-8 rounded-xl bg-stone-100 hover:bg-emerald-50 hover:text-emerald-800 border border-stone-200 hover:border-emerald-300 text-stone-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <RefreshCw className="w-3 h-3 text-emerald-700" />
              <span>Change / Replace</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
