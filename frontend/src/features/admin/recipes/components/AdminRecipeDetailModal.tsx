"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  ExternalLink,
  Info,
  Video,
  ImageIcon,
  Clock,
  Users,
  ChefHat,
  XCircle,
  Flame,
} from "lucide-react";
import { Recipe, formatMealType } from "@/features/recipes";
import { formatVegetarianType } from "@/features/profile/types";
import { RecipeAllergyBadge } from "@/features/recipes/components/RecipeAllergyBadge";
import { priceService, PRICE_WARNING_TEXT } from "@/features/recipes/services/priceService";
import {
  getIngredientCaloriesPer100g,
  calculateIngredientCalories,
} from "@/features/recipes/utils/ingredientNutrition";

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
  const [activeMedia, setActiveMedia] = useState<"image" | "video">("image");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    setActiveMedia("image");
  }, [recipe?.id]);

  if (!recipe) return null;

  const costResult = priceService.calculateRecipeCost(recipe.ingredients || []);
  const estimatedCost = recipe.estimatedCost || costResult.estimatedCost;
  const videoUrl = recipe.video_url || recipe.videoUrl;
  const hasVideo = Boolean(videoUrl);

  const totalTime =
    (Number(recipe.prepTime) || 0) + (Number(recipe.cookTime) || 0);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-sm overflow-y-auto animate-in fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-white rounded-3xl shadow-2xl border border-stone-200/90 overflow-hidden my-auto animate-in zoom-in-95 duration-200">
        {/* Header Bar */}
        <div className="px-6 py-4 bg-gradient-to-r from-stone-50 via-white to-stone-50/80 border-b border-stone-200/80 flex items-start justify-between gap-4 shrink-0">
          <div className="space-y-1.5 min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200 shadow-2xs">
                {formatMealType(recipe.mealType)}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 border border-stone-200">
                {formatVegetarianType(recipe.vegetarianType)}
              </span>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border shadow-2xs ${
                  recipe.status === "APPROVED"
                    ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                    : recipe.status === "PENDING_REVIEW"
                    ? "bg-amber-50 text-amber-900 border-amber-300"
                    : recipe.status === "REJECTED"
                    ? "bg-rose-50 text-rose-900 border-rose-300"
                    : "bg-stone-100 text-stone-700 border-stone-200"
                }`}
              >
                {recipe.status === "APPROVED"
                  ? "Đã duyệt"
                  : recipe.status === "PENDING_REVIEW"
                  ? "Chờ duyệt"
                  : recipe.status === "REJECTED"
                  ? "Đã từ chối"
                  : "Bản nháp"}
              </span>
              <span className="text-[11px] font-medium text-stone-500">
                · Danh mục:{" "}
                <strong className="text-stone-700">
                  {recipe.category || "Món chay"}
                </strong>
              </span>
            </div>

            <h2 className="font-serif font-bold text-xl sm:text-2xl text-stone-900 truncate">
              {recipe.name || recipe.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng chi tiết công thức"
            className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 flex items-center justify-center transition-colors cursor-pointer shrink-0 mt-0.5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2-Column Responsive Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Left Column (5/12): Media, Nutrition, Key Metrics */}
          <div className="md:col-span-5 space-y-3.5">
            {/* Media Box with Image / Video Toggle */}
            <div className="relative h-44 w-full rounded-2xl overflow-hidden bg-stone-900 border border-stone-200/80 shadow-xs group">
              {hasVideo && activeMedia === "video" ? (
                <video
                  src={
                    videoUrl!.startsWith("/")
                      ? `http://localhost:3000${videoUrl}`
                      : videoUrl
                  }
                  controls
                  autoPlay
                  className="w-full h-full object-contain bg-black"
                />
              ) : recipe.image ? (
                <Image
                  src={recipe.image}
                  alt={recipe.title}
                  fill
                  priority
                  className="object-cover group-hover:scale-102 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-stone-400 text-xs">
                  Không có ảnh minh họa
                </div>
              )}

              {/* Media Toggle Switch (if video available) */}
              {hasVideo && (
                <div className="absolute top-2.5 right-2.5 z-10 flex items-center bg-black/60 backdrop-blur-md p-1 rounded-xl border border-white/20 text-[10px] font-bold text-white shadow-sm">
                  <button
                    type="button"
                    onClick={() => setActiveMedia("image")}
                    className={`px-2 py-0.5 rounded-lg flex items-center gap-1 transition-colors cursor-pointer ${
                      activeMedia === "image"
                        ? "bg-emerald-600 text-white shadow-2xs"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    <ImageIcon className="w-3 h-3" />
                    <span>Ảnh</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveMedia("video")}
                    className={`px-2 py-0.5 rounded-lg flex items-center gap-1 transition-colors cursor-pointer ${
                      activeMedia === "video"
                        ? "bg-emerald-600 text-white shadow-2xs"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    <Video className="w-3 h-3" />
                    <span>Video</span>
                  </button>
                </div>
              )}
            </div>

            {/* Recipe Description */}
            {recipe.description && (
              <p className="text-stone-600 text-xs leading-relaxed italic bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                &ldquo;{recipe.description}&rdquo;
              </p>
            )}

            {/* Quick Metrics (Time, Servings, Difficulty) */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 rounded-xl bg-stone-50 border border-stone-200/70">
                <div className="flex items-center justify-center gap-1 text-stone-400 text-[10px]">
                  <Clock className="w-3 h-3" />
                  <span>Thời gian</span>
                </div>
                <p className="font-bold text-stone-800 mt-0.5">
                  {totalTime > 0 ? `${totalTime} ph` : "20 ph"}
                </p>
              </div>

              <div className="p-2 rounded-xl bg-stone-50 border border-stone-200/70">
                <div className="flex items-center justify-center gap-1 text-stone-400 text-[10px]">
                  <Users className="w-3 h-3" />
                  <span>Khẩu phần</span>
                </div>
                <p className="font-bold text-stone-800 mt-0.5">
                  {recipe.serving || 2} người
                </p>
              </div>

              <div className="p-2 rounded-xl bg-stone-50 border border-stone-200/70">
                <div className="flex items-center justify-center gap-1 text-stone-400 text-[10px]">
                  <ChefHat className="w-3 h-3" />
                  <span>Độ khó</span>
                </div>
                <p className="font-bold text-stone-800 mt-0.5 capitalize">
                  {recipe.difficulty === "Easy"
                    ? "Dễ"
                    : recipe.difficulty === "Advanced"
                    ? "Khó"
                    : "Vừa"}
                </p>
              </div>
            </div>

            {/* Nutrition Breakdown (4 Cards) */}
            <div className="grid grid-cols-4 gap-1.5 text-center">
              <div className="p-2 rounded-xl bg-amber-50/80 border border-amber-200/80">
                <span className="text-[10px] text-amber-800 font-semibold block">
                  Calo
                </span>
                <span className="font-serif font-bold text-sm text-amber-700 block mt-0.5">
                  ~{Math.round(Number(recipe.calories) * 10) / 10}
                </span>
                <span className="text-[9px] text-amber-600 block">kcal</span>
              </div>

              <div className="p-2 rounded-xl bg-emerald-50/80 border border-emerald-200/80">
                <span className="text-[10px] text-emerald-800 font-semibold block">
                  Đạm
                </span>
                <span className="font-serif font-bold text-sm text-emerald-800 block mt-0.5">
                  {recipe.protein || 0}g
                </span>
                <span className="text-[9px] text-emerald-600 block">Protein</span>
              </div>

              <div className="p-2 rounded-xl bg-orange-50/80 border border-orange-200/80">
                <span className="text-[10px] text-orange-800 font-semibold block">
                  Carb
                </span>
                <span className="font-serif font-bold text-sm text-orange-700 block mt-0.5">
                  {recipe.carbs || 0}g
                </span>
                <span className="text-[9px] text-orange-600 block">Tinh bột</span>
              </div>

              <div className="p-2 rounded-xl bg-violet-50/80 border border-violet-200/80">
                <span className="text-[10px] text-violet-800 font-semibold block">
                  Béo
                </span>
                <span className="font-serif font-bold text-sm text-violet-700 block mt-0.5">
                  {recipe.fat || 0}g
                </span>
                <span className="text-[9px] text-violet-600 block">Lipid</span>
              </div>
            </div>

            {/* Pricing & Allergy warning */}
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 flex items-center justify-between text-xs">
              <span className="text-stone-500 font-medium">Chi phí ước tính:</span>
              <span className="font-serif font-bold text-base text-emerald-800">
                {priceService.formatEstimatedPrice(estimatedCost)}
              </span>
            </div>

            <RecipeAllergyBadge recipe={recipe} />

            {/* Rejection reason banner if rejected */}
            {recipe.status === "REJECTED" &&
              (recipe.review_reason || recipe.reviewReason) && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-rose-700">
                    <XCircle className="w-4 h-4" />
                    <span>Lý do từ chối:</span>
                  </div>
                  <p className="text-stone-700 leading-relaxed">
                    {recipe.review_reason || recipe.reviewReason}
                  </p>
                </div>
              )}
          </div>

          {/* Right Column (7/12): Ingredients & Cooking Instructions */}
          <div className="md:col-span-7 space-y-4">
            {/* Ingredients List */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                  <span>Nguyên liệu</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 text-[10px]">
                    {recipe.ingredients.length}
                  </span>
                </h3>
                <span className="text-[10px] text-stone-400">
                  Khẩu phần {recipe.serving || 2} người
                </span>
              </div>

              <div className="max-h-44 overflow-y-auto space-y-1.5 pr-1 scrollbar-thin">
                {recipe.ingredients.map((ing, i) => {
                  const cost =
                    ing.cost ||
                    priceService.calculateIngredientCost(
                      ing.name,
                      ing.quantity,
                      ing.unit
                    ).cost;
                  const calPer100 =
                    ing.caloriesPer100g !== undefined &&
                    ing.caloriesPer100g !== null
                      ? Number(ing.caloriesPer100g)
                      : getIngredientCaloriesPer100g(ing.name);
                  const calculatedKcal = calculateIngredientCalories(
                    ing.quantity,
                    ing.unit,
                    calPer100
                  );

                  return (
                    <div
                      key={i}
                      className="flex items-center justify-between p-2 rounded-xl bg-stone-50/80 border border-stone-200/60 text-xs hover:bg-stone-50 transition-colors"
                    >
                      <div className="min-w-0 flex-1">
                        <span className="font-semibold text-stone-800 truncate block">
                          {ing.name}
                        </span>
                        <span className="text-[10px] text-stone-400 block">
                          ~{cost.toLocaleString("vi-VN")} đ · ~
                          {Math.round(Number(calPer100))} kcal/100g
                        </span>
                      </div>
                      <div className="text-right shrink-0 ml-2">
                        <span className="font-bold text-stone-900 block text-xs">
                          {ing.quantity} {ing.unit}
                        </span>
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1 py-0.2 rounded border border-amber-200/60 inline-block">
                          ~{Math.round(Number(calculatedKcal))} kcal
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Cooking Instructions */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                  <span>Cách nấu & Hướng dẫn</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-stone-200 text-stone-800 text-[10px]">
                    {recipe.instructions.length} bước
                  </span>
                </h3>
              </div>

              <div className="max-h-52 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
                {recipe.instructions.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex gap-2.5 p-2.5 rounded-xl bg-stone-50/80 border border-stone-100 text-xs text-stone-700 leading-relaxed"
                  >
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="flex-1">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 bg-stone-50 border-t border-stone-200/80 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <Link
            href={`/recipes/${recipe.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline"
          >
            <span>Mở trang chi tiết đầy đủ</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="h-9 px-4 rounded-xl border border-stone-200 bg-white hover:bg-stone-100 text-stone-700 font-semibold text-xs transition-colors cursor-pointer"
            >
              Đóng
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onEdit(recipe);
              }}
              className="h-9 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer"
            >
              Chỉnh sửa công thức
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
