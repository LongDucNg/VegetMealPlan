"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  X,
  Search,
  Plus,
  Flame,
  Clock,
  AlertTriangle,
  Heart,
  Tag,
  Check,
} from "lucide-react";
import { Recipe } from "@/features/recipes/types";
import { UserProfile } from "@/features/profile/types";
import { recipeService } from "@/features/recipes/services/recipeService";
import { favoriteService } from "@/features/recipes/services/favoriteService";
import { CalendarDayMealPlan, DayMealPlan } from "../types";
import { RecipeAllergyBadge } from "@/features/recipes/components/RecipeAllergyBadge";
import { priceService } from "@/features/recipes/services/priceService";

interface AddDishModalProps {
  isOpen: boolean;
  onClose: () => void;
  mealType: "Breakfast" | "Lunch" | "Dinner" | "Snack" | null;
  activeDay: CalendarDayMealPlan | DayMealPlan | null;
  profile: UserProfile;
  onAddRecipe: (
    mealType: "breakfast" | "lunch" | "dinner" | "snack",
    recipe: Recipe
  ) => void;
  userId?: string;
}

export function AddDishModal({
  isOpen,
  onClose,
  mealType,
  activeDay,
  profile,
  onAddRecipe,
  userId,
}: AddDishModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [tab, setTab] = useState<"safe" | "favorites" | "all">("safe");

  const mealSlotKey = useMemo(() => {
    if (!mealType) return "lunch";
    return mealType.toLowerCase() as "breakfast" | "lunch" | "dinner" | "snack";
  }, [mealType]);

  const mealLabel = useMemo(() => {
    switch (mealType) {
      case "Breakfast":
        return "Bữa sáng";
      case "Lunch":
        return "Bữa trưa";
      case "Dinner":
        return "Bữa tối";
      case "Snack":
        return "Bữa phụ";
      default:
        return "Bữa ăn";
    }
  }, [mealType]);

  const allApprovedRecipes = useMemo(() => {
    return recipeService.getRecipes({ includeAll: true });
  }, []);

  const safeRecipes = useMemo(() => {
    return allApprovedRecipes.filter((r) =>
      recipeService.isRecipeSafeForProfile(r, profile)
    );
  }, [allApprovedRecipes, profile]);

  const favoriteRecipes = useMemo(() => {
    return favoriteService.getFavoriteRecipes(userId || profile.id);
  }, [userId, profile.id]);

  const displayedRecipes = useMemo(() => {
    let list: Recipe[] = [];
    if (tab === "safe") list = safeRecipes;
    else if (tab === "favorites") list = favoriteRecipes;
    else list = allApprovedRecipes;

    if (!searchTerm.trim()) return list;
    const q = searchTerm.toLowerCase();
    return list.filter(
      (r) =>
        (r.title || r.name || "").toLowerCase().includes(q) ||
        (r.category || "").toLowerCase().includes(q) ||
        (r.description || "").toLowerCase().includes(q)
    );
  }, [tab, safeRecipes, favoriteRecipes, allApprovedRecipes, searchTerm]);

  const currentTotalCalories = activeDay?.totalCalories || 0;
  const targetCalories = activeDay?.targetCalories || 2000;

  if (!isOpen || !mealType) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-stone-900">
                Thêm món vào {mealLabel}
              </h3>
              <p className="text-xs text-stone-500">
                Hiện tại: ~{Math.round(currentTotalCalories)} / {Math.round(targetCalories)} kcal trong ngày
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

        {/* Search & Tabs */}
        <div className="p-4 border-b border-stone-100 bg-white space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm kiếm công thức món chay..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-stone-50/60"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setTab("safe")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                tab === "safe"
                  ? "bg-emerald-700 text-white"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              Phù hợp với bạn ({safeRecipes.length})
            </button>
            <button
              onClick={() => setTab("favorites")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1 ${
                tab === "favorites"
                  ? "bg-rose-600 text-white"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              <Heart className="w-3 h-3 fill-current" />
              <span>Món yêu thích ({favoriteRecipes.length})</span>
            </button>
            <button
              onClick={() => setTab("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                tab === "all"
                  ? "bg-stone-800 text-white"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              Tất cả món ({allApprovedRecipes.length})
            </button>
          </div>
        </div>

        {/* Recipes List */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1">
          {displayedRecipes.length === 0 ? (
            <div className="p-10 text-center text-stone-400 text-xs">
              Không tìm thấy món ăn nào phù hợp với từ khóa.
            </div>
          ) : (
            displayedRecipes.map((recipe) => {
              const projectedCalories = currentTotalCalories + recipe.calories;
              const isOverCal = projectedCalories > targetCalories;
              const overDiff = projectedCalories - targetCalories;
              const cost = recipe.estimatedCost || priceService.calculateRecipeCost(recipe.ingredients || []).estimatedCost;

              return (
                <div
                  key={recipe.id}
                  className="p-3 rounded-2xl border border-stone-200 bg-white hover:border-emerald-300 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                      {recipe.image ? (
                        <Image
                          src={recipe.image}
                          alt={recipe.title}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] text-stone-400">
                          Ảnh
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 space-y-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-stone-100 text-stone-600">
                          {recipe.category || recipe.mealType}
                        </span>
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200 flex items-center gap-1">
                          <Flame className="w-3 h-3 text-amber-600" />
                          ~{Math.round(recipe.calories)} kcal
                        </span>
                        <span className="text-[10px] text-stone-500 flex items-center gap-0.5">
                          <Clock className="w-2.5 h-2.5" />
                          {(recipe.prepTime || 0) + (recipe.cookTime || 0)} min
                        </span>
                      </div>

                      <h4 className="font-bold text-stone-900 text-xs truncate max-w-xs">
                        {recipe.title || recipe.name}
                      </h4>

                      {/* Calorie projection warning */}
                      {isOverCal ? (
                        <div className="flex items-center gap-1 text-[10px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-300">
                          <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0" />
                          <span>
                            Vượt mục tiêu ngày ~{Math.round(overDiff)} kcal (sẽ đạt {Math.round(projectedCalories)} / {Math.round(targetCalories)} kcal)
                          </span>
                        </div>
                      ) : (
                        <div className="text-[10px] text-emerald-700 flex items-center gap-1">
                          <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span>
                            Sau khi thêm: ~{Math.round(projectedCalories)} / {Math.round(targetCalories)} kcal
                          </span>
                        </div>
                      )}

                      <RecipeAllergyBadge recipe={recipe} compact />
                    </div>
                  </div>

                  {/* Add Button - Always enabled */}
                  <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        onAddRecipe(mealSlotKey, recipe);
                        onClose();
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-2xs transition-colors cursor-pointer flex items-center gap-1"
                      title="Thêm món này vào bữa ăn"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Thêm món</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

