"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { X, RefreshCw, Flame, Check, Sparkles, AlertCircle } from "lucide-react";
import { Recipe } from "@/features/recipes/types";
import { UserProfile } from "@/features/profile/types";
import { recipeService } from "@/features/recipes/services/recipeService";
import { priceService } from "@/features/recipes/services/priceService";
import { RecipeAllergyBadge } from "@/features/recipes/components/RecipeAllergyBadge";

interface MealReplacementModalProps {
  isOpen: boolean;
  onClose: () => void;
  originalRecipe: Recipe | null;
  mealType: string;
  profile: UserProfile;
  onSelectReplacement: (newRecipe: Recipe) => void;
}

export function MealReplacementModal({
  isOpen,
  onClose,
  originalRecipe,
  mealType,
  profile,
  onSelectReplacement,
}: MealReplacementModalProps) {
  const suggestions = useMemo(() => {
    if (!originalRecipe) return [];
    return recipeService.getReplacementSuggestions(originalRecipe, profile);
  }, [originalRecipe, profile]);

  if (!isOpen || !originalRecipe) return null;

  const origCost = priceService.getEffectivePrice(originalRecipe, String(profile.id || "")).formatted;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <RefreshCw className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-stone-900 flex items-center gap-2">
                Replace {mealType}
              </h3>
              <p className="text-xs text-stone-500">
                AI suggestions matched to your {profile.vegetarianType.replace("_", " ")} diet, allergens & calorie target
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
              Current
            </span>
            <span className="font-semibold text-stone-900 text-sm truncate">
              {originalRecipe.name || originalRecipe.title}
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs shrink-0">
            <span className="font-bold text-amber-700">{originalRecipe.calories} kcal</span>
            <span className="text-stone-400">·</span>
            <span className="text-stone-600">{origCost}</span>
          </div>
        </div>

        {/* Suggestions List */}
        <div className="p-5 overflow-y-auto space-y-3 flex-1">
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
            <span className="font-semibold uppercase tracking-wider">
              {suggestions.length} Compatible Replacements
            </span>
            <span>Sorted by calorie proximity</span>
          </div>

          {suggestions.map((recipe) => {
            const calDiff = recipe.calories - originalRecipe.calories;
            const diffText =
              calDiff === 0
                ? "Exact calories"
                : calDiff > 0
                ? `+${calDiff} kcal`
                : `${calDiff} kcal`;

            const diffColor =
              Math.abs(calDiff) <= 25
                ? "bg-emerald-100 text-emerald-900 border-emerald-200"
                : "bg-amber-100 text-amber-900 border-amber-200";

            const costInfo = priceService.getEffectivePrice(
              recipe,
              String(profile.id || "")
            );

            return (
              <div
                key={recipe.id}
                className="p-3.5 sm:p-4 rounded-2xl border border-stone-200 hover:border-emerald-500/80 bg-white hover:bg-stone-50/60 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs group"
              >
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  {/* Image */}
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                    {recipe.image ? (
                      <Image
                        src={recipe.image}
                        alt={recipe.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] text-stone-400">
                        No img
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase px-2 py-0.2 rounded-full bg-stone-100 text-stone-700">
                        {recipe.vegetarianType.replace("_", " ")}
                      </span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.2 rounded-full border ${diffColor}`}
                      >
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
                        {recipe.calories} kcal
                      </span>
                      <span>P: {recipe.protein}g · C: {recipe.carbs}g · F: {recipe.fat}g</span>
                      <span className="text-emerald-800 font-medium">{costInfo.formatted}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onSelectReplacement(recipe);
                    onClose();
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-2xs transition-colors cursor-pointer shrink-0 self-end sm:self-center flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  Select Dish
                </button>
              </div>
            );
          })}

          {suggestions.length === 0 && (
            <div className="p-8 text-center text-stone-400 text-xs">
              <AlertCircle className="w-8 h-8 mx-auto mb-2 text-stone-300" />
              No alternate recipes found matching all diet and allergy constraints.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
          <span>Replacing updates only this meal and recalibrates remaining calories.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-100 font-semibold cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
