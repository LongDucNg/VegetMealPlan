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
import { mealPlannerService } from "../services/mealPlannerService";
import { priceService } from "@/features/recipes/services/priceService";
import { DayMealPlan } from "../types";

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onApplyPlan: (dayPlan: DayMealPlan) => void;
  onLoadSavedPlan: (plan: SavedMealPlan) => void;
  onSelectFavoriteRecipe?: (recipe: Recipe) => void;
}

export function FavoritesModal({
  isOpen,
  onClose,
  profile,
  onApplyPlan,
  onLoadSavedPlan,
  onSelectFavoriteRecipe,
}: FavoritesModalProps) {
  const userId = String(profile.id || "u1");
  const [activeTab, setActiveTab] = useState<"recipes" | "plans">("recipes");

  const [favRecipes, setFavRecipes] = useState<Recipe[]>([]);
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

  const reloadData = () => {
    setFavRecipes(favoriteService.getFavoriteRecipes(userId));
    setSavedPlans(favoriteService.getFavoriteMealPlans(userId));
  };

  useEffect(() => {
    if (isOpen) {
      reloadData();
      setValidationResult(null);
    }
  }, [isOpen, userId]);

  // Group recipes by mealType
  const groupedRecipes = useMemo(() => {
    const map: Record<MealType, Recipe[]> = {
      breakfast: [],
      lunch: [],
      dinner: [],
      snack: [],
    };
    for (const r of favRecipes) {
      if (map[r.mealType]) {
        map[r.mealType].push(r);
      }
    }
    return map;
  }, [favRecipes]);

  if (!isOpen) return null;

  const handleValidateSelection = () => {
    const result = mealPlannerService.validateAndCreateFromFavorites(
      {
        breakfast: selectedBreakfast || undefined,
        lunch: selectedLunch || undefined,
        dinner: selectedDinner || undefined,
        snack: selectedSnack || undefined,
      },
      profile
    );
    setValidationResult(result);

    // If completely compatible without warnings, immediately apply
    if (result.isCompatible) {
      onApplyPlan(result.dayPlan);
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
    if (confirm("Remove this saved meal plan from favorites?")) {
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
                My Favorites
              </h3>
              <p className="text-xs text-stone-500">
                Personalized recipes and saved meal plan templates
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
            Favorite Recipes ({favRecipes.length})
          </button>
          <button
            onClick={() => setActiveTab("plans")}
            className={`pb-3 text-xs font-bold transition-colors border-b-2 cursor-pointer ${
              activeTab === "plans"
                ? "border-emerald-700 text-emerald-800"
                : "border-transparent text-stone-500 hover:text-stone-800"
            }`}
          >
            Saved Meal Plans ({savedPlans.length})
          </button>
        </div>

        {/* Tab 1: Favorite Recipes & Create Plan from Favorites (Requirement 1, 2) */}
        {activeTab === "recipes" && (
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            {favRecipes.length === 0 ? (
              <div className="p-12 text-center text-stone-400">
                <Heart className="w-10 h-10 mx-auto mb-2 text-stone-300" />
                <p className="font-medium text-sm text-stone-600">
                  You haven&apos;t added any favorite recipes yet.
                </p>
                <p className="text-xs text-stone-400 mt-1">
                  Click the ♡ icon on any recipe to save it to your favorites.
                </p>
              </div>
            ) : (
              <>
                {/* Create Meal Plan from Favorites Panel */}
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-3xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-serif font-bold text-base text-emerald-950 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-emerald-700" />
                        Create Meal Plan from Favorites
                      </h4>
                      <p className="text-xs text-emerald-800/80">
                        Pick favorite recipes for each meal slot and let AI calibrate them to your nutrition target.
                      </p>
                    </div>

                    <button
                      onClick={handleValidateSelection}
                      disabled={!selectedBreakfast && !selectedLunch && !selectedDinner && !selectedSnack}
                      className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
                    >
                      Create Meal Plan
                    </button>
                  </div>

                  {/* Slots Selection */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    {/* Breakfast */}
                    <div className="bg-white p-3 rounded-2xl border border-emerald-100 text-xs">
                      <span className="font-bold text-stone-500 block mb-1">
                        1. Breakfast:
                      </span>
                      <select
                        value={selectedBreakfast?.id || ""}
                        onChange={(e) => {
                          const r = favRecipes.find((item) => item.id === e.target.value) || null;
                          setSelectedBreakfast(r);
                        }}
                        className="w-full text-xs p-1.5 rounded-lg border border-stone-200 bg-stone-50 outline-none"
                      >
                        <option value="">-- Choose or Auto --</option>
                        {groupedRecipes.breakfast.map((r) => (
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
                        2. Lunch:
                      </span>
                      <select
                        value={selectedLunch?.id || ""}
                        onChange={(e) => {
                          const r = favRecipes.find((item) => item.id === e.target.value) || null;
                          setSelectedLunch(r);
                        }}
                        className="w-full text-xs p-1.5 rounded-lg border border-stone-200 bg-stone-50 outline-none"
                      >
                        <option value="">-- Choose or Auto --</option>
                        {groupedRecipes.lunch.map((r) => (
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
                        3. Dinner:
                      </span>
                      <select
                        value={selectedDinner?.id || ""}
                        onChange={(e) => {
                          const r = favRecipes.find((item) => item.id === e.target.value) || null;
                          setSelectedDinner(r);
                        }}
                        className="w-full text-xs p-1.5 rounded-lg border border-stone-200 bg-stone-50 outline-none"
                      >
                        <option value="">-- Choose or Auto --</option>
                        {groupedRecipes.dinner.map((r) => (
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
                        4. Snack:
                      </span>
                      <select
                        value={selectedSnack?.id || ""}
                        onChange={(e) => {
                          const r = favRecipes.find((item) => item.id === e.target.value) || null;
                          setSelectedSnack(r);
                        }}
                        className="w-full text-xs p-1.5 rounded-lg border border-stone-200 bg-stone-50 outline-none"
                      >
                        <option value="">-- Choose or Auto --</option>
                        {groupedRecipes.snack.map((r) => (
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
                            Some selected recipes may not perfectly match your nutrition target:
                          </p>
                          <ul className="list-disc pl-4 mt-1 space-y-0.5 text-stone-700">
                            {validationResult.warnings.map((w, i) => (
                              <li key={i}>{w}</li>
                            ))}
                          </ul>
                          <p className="mt-2 text-[11px] text-stone-500">
                            Planned Calories: <strong>{validationResult.dayPlan.totalCalories} kcal</strong> vs Target: <strong>{profile.weight ? `${validationResult.dayPlan.targetCalories} kcal` : "Custom"}</strong>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 justify-end pt-1">
                        <button
                          onClick={handleAdjustAutomatically}
                          className="px-3.5 py-1.5 rounded-xl bg-white border border-amber-300 hover:bg-amber-100 font-bold text-amber-900 text-xs transition-colors cursor-pointer"
                        >
                          Adjust automatically
                        </button>
                        <button
                          onClick={handleKeepMySelection}
                          className="px-4 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 font-bold text-white text-xs shadow-2xs transition-colors cursor-pointer"
                        >
                          Keep my selection
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Favorites List Grid */}
                <div>
                  <h4 className="font-semibold text-stone-800 text-xs uppercase tracking-wider mb-3">
                    All Favorited Recipes
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
                            title="Remove from favorites"
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
                  No saved meal plans yet.
                </p>
                <p className="text-xs text-stone-400 mt-1">
                  Once you generate a weekly or monthly plan, click &quot;Save Plan&quot; to store it as a reusable template.
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
                          {plan.planType}
                        </span>
                        <h4 className="font-bold text-stone-900 text-sm">
                          {plan.name}
                        </h4>
                      </div>
                      <p className="text-xs text-stone-500 mt-1">
                        {plan.days.length} days planned · Target: {plan.targetCalories} kcal/day · Est. Cost: ~{plan.totalEstimatedCost.toLocaleString("vi-VN")} VND
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
                        Load Plan
                      </button>
                      <button
                        onClick={() => handleRemoveSavedPlan(plan.id)}
                        className="p-2 rounded-xl text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Remove plan"
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
