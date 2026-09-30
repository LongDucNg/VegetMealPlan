"use client";

import React from "react";
import Image from "next/image";
import { X, ExternalLink, Tag, AlertCircle, Info } from "lucide-react";
import { Recipe } from "@/features/recipes/types";
import { RecipeAllergyBadge } from "@/features/recipes/components/RecipeAllergyBadge";
import { priceService, PRICE_WARNING_TEXT } from "@/features/recipes/services/priceService";

interface AdminRecipeDetailModalProps {
  recipe: Recipe | null;
  onClose: () => void;
  onEdit: (recipe: Recipe) => void;
}

export function AdminRecipeDetailModal({
  recipe,
  onClose,
  onEdit,
}: AdminRecipeDetailModalProps) {
  if (!recipe) return null;

  const costResult = priceService.calculateRecipeCost(recipe.ingredients || []);
  const estimatedCost = recipe.estimatedCost || costResult.estimatedCost;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200">
        <div className="relative aspect-video w-full bg-stone-100">
          {recipe.image ? (
            <Image
              src={recipe.image}
              alt={recipe.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-stone-400">
              No Image
            </div>
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-stone-900/70 hover:bg-stone-900 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6 max-h-[calc(70vh)] overflow-y-auto">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200">
                {recipe.mealType}
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 border border-stone-200">
                {recipe.vegetarianType.replace("_", " ")}
              </span>
              <span
                className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                  recipe.status === "APPROVED"
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-300"
                    : recipe.status === "PENDING_REVIEW"
                    ? "bg-amber-100 text-amber-900 border border-amber-300"
                    : "bg-stone-100 text-stone-700"
                }`}
              >
                Status: {recipe.status || "APPROVED"}
              </span>
              <span className="text-[11px] font-medium text-stone-500">
                Category: {recipe.category}
              </span>
            </div>

            <h2 className="font-serif font-bold text-2xl text-stone-900 leading-snug">
              {recipe.name || recipe.title}
            </h2>
            <p className="text-stone-600 text-sm mt-1 leading-relaxed">
              {recipe.description}
            </p>
          </div>

          {/* Allergy warning preview for current profile */}
          <RecipeAllergyBadge recipe={recipe} />

          {/* Quick Metrics */}
          <div className="grid grid-cols-4 gap-2 py-3 border-y border-stone-100 text-center">
            <div>
              <p className="text-xs text-stone-400">Calories</p>
              <p className="font-serif font-bold text-lg text-amber-700">{recipe.calories} kcal</p>
            </div>
            <div>
              <p className="text-xs text-stone-400">Protein</p>
              <p className="font-serif font-bold text-lg text-emerald-800">{recipe.protein}g</p>
            </div>
            <div>
              <p className="text-xs text-stone-400">Carbs</p>
              <p className="font-serif font-bold text-lg text-amber-600">{recipe.carbs}g</p>
            </div>
            <div>
              <p className="text-xs text-stone-400">Fat</p>
              <p className="font-serif font-bold text-lg text-violet-700">{recipe.fat}g</p>
            </div>
          </div>

          {/* Pricing Estimation & Warning (Requirements 4, 5) */}
          <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                Recipe Estimated Cost:
              </span>
              <span className="font-serif font-bold text-lg text-emerald-800">
                {priceService.formatEstimatedPrice(estimatedCost)}
              </span>
            </div>
            <p className="text-[11px] text-stone-500 leading-relaxed flex items-start gap-1.5">
              <Info className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
              <span>{PRICE_WARNING_TEXT}</span>
            </p>
          </div>

          {/* Recipe Source / Citation (Requirement 16) */}
          <div className="p-3.5 bg-stone-50/70 border border-stone-200 rounded-2xl text-xs space-y-1">
            <span className="font-semibold text-stone-500 uppercase tracking-wider block text-[10px]">
              Recipe Source & Citation:
            </span>
            <div className="flex items-center justify-between">
              <span className="font-medium text-stone-800">
                {recipe.source?.name || "Admin Created"}
              </span>
              {recipe.source?.url ? (
                <a
                  href={recipe.source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-emerald-700 hover:text-emerald-900 underline flex items-center gap-1"
                >
                  <span>View Original Source</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <span className="text-stone-400 italic">No external URL (Admin native)</span>
              )}
            </div>
          </div>

          {/* Ingredients with Unit Costs */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3">
              Ingredients ({recipe.ingredients.length})
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
              {recipe.ingredients.map((ing, i) => {
                const cost = ing.cost || priceService.calculateIngredientCost(ing.name, ing.quantity, ing.unit).cost;
                return (
                  <li
                    key={i}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 border border-stone-100"
                  >
                    <div>
                      <span className="font-medium text-stone-800">{ing.name}</span>
                      <span className="text-stone-400 block text-[10px]">
                        ~{cost.toLocaleString("vi-VN")} đ
                      </span>
                    </div>
                    <span className="font-semibold text-stone-900">
                      {ing.quantity} {ing.unit}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Instructions */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3">
              Instructions
            </h3>
            <ol className="space-y-2.5 text-xs text-stone-700">
              {recipe.instructions.map((step, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Footer Action */}
          <div className="pt-4 border-t flex justify-end gap-3">
            <button
              onClick={() => {
                onClose();
                onEdit(recipe);
              }}
              className="h-10 px-5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer"
            >
              Edit Recipe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
