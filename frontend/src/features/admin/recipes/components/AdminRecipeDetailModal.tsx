"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ExternalLink, Tag, AlertCircle, Info, Sparkles } from "lucide-react";
import { Recipe, formatMealType } from "@/features/recipes";
import { formatVegetarianType } from "@/features/profile/types";
import { RecipeAllergyBadge } from "@/features/recipes/components/RecipeAllergyBadge";
import { priceService, PRICE_WARNING_TEXT } from "@/features/recipes/services/priceService";
import { recipeApiService, NutritionItem } from "@/features/recipes/services/recipeApiService";

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
  const [liveNutrition, setLiveNutrition] = useState<NutritionItem | null>(null);

  useEffect(() => {
    if (!recipe) {
      setLiveNutrition(null);
      return;
    }
    const numId = parseInt(recipe.id.replace(/\D/g, ""), 10);
    if (!isNaN(numId)) {
      recipeApiService.getNutritionByRecipeId(numId)
        .then((res) => {
          const data = (res as any)?.data || res;
          if (data && (data.nutrition_id !== undefined || data.calories !== undefined)) {
            setLiveNutrition(data);
          }
        })
        .catch(() => {
          setLiveNutrition(null);
        });
    }
  }, [recipe]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!recipe) return null;

  const costResult = priceService.calculateRecipeCost(recipe.ingredients || []);
  const estimatedCost = recipe.estimatedCost || costResult.estimatedCost;
  const calories = liveNutrition?.calories ?? recipe.calories;
  const protein = liveNutrition?.protein ?? recipe.protein;
  const carbs = liveNutrition?.carbs ?? recipe.carbs;
  const fat = liveNutrition?.fat ?? recipe.fat;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-sm overflow-y-auto animate-in fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl max-h-[92vh] flex flex-col bg-white rounded-3xl shadow-2xl border border-stone-200/90 overflow-hidden my-auto animate-in zoom-in-95 duration-200">
        {/* Prominent floating close button (Dấu X luôn hiển thị trên cùng) */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng chi tiết công thức"
          className="absolute top-3.5 right-3.5 z-40 w-10 h-10 rounded-full bg-white/95 hover:bg-white text-stone-700 hover:text-stone-950 shadow-md border border-stone-200/90 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md group"
        >
          <X className="w-5 h-5 text-stone-600 group-hover:text-stone-950 transition-colors" />
        </button>

        {/* Hero image header */}
        <div className="relative h-52 sm:h-60 w-full bg-stone-100 shrink-0 overflow-hidden">
          {recipe.image ? (
            <Image
              src={recipe.image}
              alt={recipe.title}
              fill
              priority
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-stone-400 text-sm">
              Không có ảnh minh họa
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Scrollable Body Content */}
        <div className="p-6 sm:p-7 space-y-6 overflow-y-auto flex-1 scrollbar-thin">
          {/* Header Info */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200">
                {formatMealType(recipe.mealType)}
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 border border-stone-200">
                {formatVegetarianType(recipe.vegetarianType)}
              </span>
              <span
                className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                  recipe.status === "APPROVED"
                    ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                    : recipe.status === "PENDING_REVIEW"
                    ? "bg-amber-50 text-amber-900 border-amber-300"
                    : "bg-stone-100 text-stone-700 border-stone-200"
                }`}
              >
                Trạng thái: {recipe.status === "APPROVED" ? "Đã duyệt" : recipe.status === "PENDING_REVIEW" ? "Chờ duyệt" : recipe.status === "REJECTED" ? "Từ chối" : "Bản nháp"}
              </span>
              <span className="text-xs font-medium text-stone-500">
                Danh mục: {recipe.category}
              </span>
            </div>

            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 leading-tight">
              {recipe.name || recipe.title}
            </h2>
            {recipe.description && (
              <p className="text-stone-600 text-sm mt-1.5 leading-relaxed">
                {recipe.description}
              </p>
            )}
          </div>

          {/* Allergy warning preview for current profile */}
          <RecipeAllergyBadge recipe={recipe} />

          {/* Quick Nutrition Metrics Cards */}
          <div className="space-y-2">
            {liveNutrition && (
              <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Chỉ số dinh dưỡng đồng bộ trực tiếp từ API /nutrition/{recipe.id}</span>
              </div>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-100 text-center">
                <p className="text-xs text-stone-500 font-medium">Calo</p>
                <p className="font-serif font-bold text-lg text-amber-700 mt-0.5">{calories} kcal</p>
              </div>
              <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-center">
                <p className="text-xs text-stone-500 font-medium">Chất đạm</p>
                <p className="font-serif font-bold text-lg text-emerald-800 mt-0.5">{protein}g</p>
              </div>
              <div className="p-3 rounded-2xl bg-orange-50/70 border border-orange-100 text-center">
                <p className="text-xs text-stone-500 font-medium">Tinh bột</p>
                <p className="font-serif font-bold text-lg text-orange-600 mt-0.5">{carbs}g</p>
              </div>
              <div className="p-3 rounded-2xl bg-violet-50/70 border border-violet-100 text-center">
                <p className="text-xs text-stone-500 font-medium">Chất béo</p>
                <p className="font-serif font-bold text-lg text-violet-700 mt-0.5">{fat}g</p>
              </div>
            </div>
          </div>

          {/* Pricing Estimation & Warning */}
          <div className="p-4 bg-stone-50 border border-stone-200/90 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-600 uppercase tracking-wider">
                Chi phí ước tính công thức:
              </span>
              <span className="font-serif font-bold text-xl text-emerald-800">
                {priceService.formatEstimatedPrice(estimatedCost)}
              </span>
            </div>
            <p className="text-xs text-stone-500 leading-relaxed flex items-start gap-1.5">
              <Info className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
              <span>{PRICE_WARNING_TEXT}</span>
            </p>
          </div>

          {/* Recipe Source / Citation */}
          <div className="p-3.5 bg-stone-50/70 border border-stone-200/80 rounded-2xl text-xs space-y-1">
            <span className="font-semibold text-stone-500 uppercase tracking-wider block text-[10px]">
              Nguồn công thức & Trích dẫn:
            </span>
            <div className="flex items-center justify-between">
              <span className="font-medium text-stone-800">
                {recipe.source?.name || "VeggieHub Kitchen"}
              </span>
              {recipe.source?.url ? (
                <a
                  href={recipe.source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-emerald-700 hover:text-emerald-900 underline flex items-center gap-1"
                >
                  <span>Xem nguồn gốc</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <span className="text-stone-400 italic">Không có liên kết ngoài (Hệ thống tạo)</span>
              )}
            </div>
          </div>

          {/* Ingredients with Unit Costs */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
              Nguyên liệu ({recipe.ingredients.length})
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
              {recipe.ingredients.map((ing, i) => {
                const cost = ing.cost || priceService.calculateIngredientCost(ing.name, ing.quantity, ing.unit).cost;
                return (
                  <li
                    key={i}
                    className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200/70"
                  >
                    <div>
                      <span className="font-medium text-stone-800">{ing.name}</span>
                      <span className="text-stone-400 block text-[10px] mt-0.5">
                        ~{cost.toLocaleString("vi-VN")} VNĐ
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
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
              Các bước chế biến
            </h3>
            <ol className="space-y-3 text-xs sm:text-sm text-stone-700">
              {recipe.instructions.map((step, idx) => (
                <li key={idx} className="flex gap-3 p-3 rounded-xl bg-stone-50/60 border border-stone-100">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Sticky Action Footer */}
        <div className="p-4 sm:px-7 sm:py-4 bg-stone-50 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <Link
            href={`/recipes/${recipe.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline"
          >
            <span>Mở trang chi tiết đầy đủ</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="h-10 px-5 rounded-xl border border-stone-200 bg-white hover:bg-stone-100 text-stone-700 font-semibold text-xs transition-colors cursor-pointer"
            >
              Đóng
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onEdit(recipe);
              }}
              className="h-10 px-5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer"
            >
              Chỉnh sửa công thức
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
