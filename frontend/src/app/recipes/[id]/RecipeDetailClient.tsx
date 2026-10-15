"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  Users,
  Flame,
  ChefHat,
  Heart,
  DollarSign,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  RefreshCw,
  UtensilsCrossed,
  Layers,
  Scale,
  CalendarPlus,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { recipeApiService, RecipeCostResponse } from "@/features/recipes/services/recipeApiService";
import { favoriteApiService } from "@/features/recipes/services/favoriteApiService";
import { recipeService } from "@/features/recipes/services/recipeService";
import { priceService } from "@/features/recipes/services/priceService";
import { RecipeAllergyBadge } from "@/features/recipes/components/RecipeAllergyBadge";
import { useProfile } from "@/features/profile/hooks/useProfile";
import { favoriteService } from "@/features/recipes/services/favoriteService";
import { tokenStorage } from "@/lib/tokenStorage";
import { mapBackendToFrontendRecipe } from "@/features/recipes/utils/recipeMapper";
import { Recipe } from "@/features/recipes/types";

interface RecipeDetailClientProps {
  recipeId: string;
  initialRecipe?: Recipe | null;
  initialCost?: any;
  initialReplacements?: any[];
}

export function RecipeDetailClient({
  recipeId,
  initialRecipe = null,
  initialCost = null,
  initialReplacements = [],
}: RecipeDetailClientProps) {
  const { profile } = useProfile();
  const userId = String(profile?.id || "u1");

  const [loading, setLoading] = useState(!initialRecipe);
  const [recipe, setRecipe] = useState<Recipe | null>(initialRecipe);
  const [costData, setCostData] = useState<any | null>(initialCost);
  const [replacements, setReplacements] = useState<any[]>(initialReplacements);
  const [isFavorite, setIsFavorite] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});
  const [servingsMultiplier, setServingsMultiplier] = useState(1);

  useEffect(() => {
    let isMounted = true;
    async function loadRecipeData() {
      if (!recipe) setLoading(true);
      const numericId = parseInt(recipeId.replace(/\D/g, ""), 10);

      try {
        // 1. Fetch Recipe Detail from Backend API #2
        if (!isNaN(numericId)) {
          const res = await recipeApiService.getRecipeById(numericId);
          const raw = res?.data || res;
          if (raw && (raw.recipe_id || raw.id)) {
            const mapped = mapBackendToFrontendRecipe(raw);
            if (isMounted) setRecipe(mapped);
          }
        }
      } catch {
        // Fallback to local storage if API fails or mock ID
        const local = recipeService.getRecipeById(recipeId);
        if (local && isMounted) {
          setRecipe(local);
        }
      }

      // 2. Fetch Cost Data from API #5
      if (!isNaN(numericId)) {
        try {
          const costRes = await recipeApiService.getRecipeCost(numericId);
          if (isMounted) setCostData((costRes as any)?.data || costRes);
        } catch {
          // ignore cost API error
        }

        // 3. Fetch Replacements from API #4
        try {
          const repRes = await recipeApiService.getReplacements(numericId);
          const items = repRes?.data?.replacements || repRes?.replacements || [];
          if (isMounted) setReplacements(items);
        } catch {
          // ignore replacements API error
        }
      }

      // 4. Check Favorite status
      try {
        const favs = await favoriteApiService.getMyFavorites();
        const list = Array.isArray(favs) ? favs : (favs as any)?.data || [];
        const isFav = list.some(
          (f: any) =>
            String(f.recipe_id || f.id) === String(numericId) ||
            String(f.recipe_id || f.id) === recipeId
        );
        if (isMounted) setIsFavorite(isFav);
      } catch {
        // Fallback to local favorite
        if (isMounted) {
          setIsFavorite(recipeService.getRecipeById(recipeId) ? false : false);
        }
      }

      if (isMounted) setLoading(false);
    }

    loadRecipeData();
    return () => {
      isMounted = false;
    };
  }, [recipeId]);

  const toggleFavorite = async () => {
    const numericId = parseInt(recipeId.replace(/\D/g, ""), 10);
    const nextState = !isFavorite;
    setIsFavorite(nextState);

    const authUser = tokenStorage.getUser();
    const userId = String(authUser?.user_id || "1");
    favoriteService.toggleFavoriteRecipe(userId, recipeId);

    if (!isNaN(numericId)) {
      try {
        if (nextState) {
          await favoriteApiService.addFavorite(numericId);
        } else {
          await favoriteApiService.removeFavorite(numericId);
        }
      } catch {
        // roll back if failed
        setIsFavorite(!nextState);
        favoriteService.toggleFavoriteRecipe(userId, recipeId);
      }
    }
  };

  const toggleIngredientCheck = (key: string) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (loading) {
    return (
      <AppShell showRightRail={false}>
        <div className="max-w-4xl mx-auto py-12 px-4 animate-pulse space-y-6">
          <div className="h-6 w-32 bg-stone-200 rounded-full" />
          <div className="h-72 w-full bg-stone-200 rounded-3xl" />
          <div className="h-10 w-2/3 bg-stone-200 rounded-xl" />
          <div className="h-24 w-full bg-stone-200 rounded-2xl" />
        </div>
      </AppShell>
    );
  }

  if (!recipe) {
    return (
      <AppShell showRightRail={false}>
        <div className="max-w-md mx-auto py-20 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
            <UtensilsCrossed className="w-8 h-8" />
          </div>
          <h2 className="font-serif font-bold text-xl text-stone-900">
            Không tìm thấy công thức
          </h2>
          <p className="text-sm text-stone-500">
            Công thức này không tồn tại hoặc đã bị gỡ bỏ khỏi hệ thống.
          </p>
          <Link
            href="/planner"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Quay lại Thực đơn
          </Link>
        </div>
      </AppShell>
    );
  }

  const baseServings = recipe.serving || 1;
  const currentServings = baseServings * servingsMultiplier;

  // Cost calculation
  const totalCost = costData?.total_cost || recipe.estimatedCost || 0;
  const costPerServing = costData?.cost_per_serving || Math.round(totalCost / baseServings);

  return (
    <AppShell showRightRail={false}>
      <div className="max-w-5xl mx-auto py-6 sm:py-8 px-4 sm:px-6 space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/planner"
            className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại Kế hoạch ăn uống</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleFavorite}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all border shadow-2xs ${
                isFavorite
                  ? "bg-rose-50 text-rose-600 border-rose-200"
                  : "bg-white text-stone-600 border-stone-200 hover:text-rose-600 hover:border-rose-200"
              }`}
            >
              <Heart
                className={`w-4 h-4 ${
                  isFavorite ? "fill-rose-500 text-rose-500" : ""
                }`}
              />
              <span>{isFavorite ? "Đã yêu thích" : "Lưu yêu thích"}</span>
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden bg-white border border-stone-200/80 shadow-sm">
          <div className="relative aspect-[21/9] min-h-[260px] w-full bg-stone-100">
            {recipe.image ? (
              <Image
                src={recipe.image}
                alt={recipe.title}
                fill
                priority
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-emerald-800 to-stone-900 text-white/60">
                <ChefHat className="w-12 h-12 text-white/40 mb-2" />
                <span className="text-sm">VeggieHub Kitchen</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute bottom-5 left-6 right-6 text-white space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-600 text-white shadow-xs">
                  {recipe.mealType}
                </span>
                <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30">
                  {recipe.vegetarianType.replace("_", " ")}
                </span>
                <span className="text-[11px] font-medium text-stone-200">
                  Danh mục: {recipe.category}
                </span>
              </div>
              <h1 className="font-serif font-bold text-2xl sm:text-4xl text-white tracking-tight drop-shadow-sm">
                {recipe.name || recipe.title}
              </h1>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="p-4 sm:p-6 bg-white border-t border-stone-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-100">
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block mb-1">
                Chuẩn bị
              </span>
              <div className="flex items-center justify-center gap-1.5 text-stone-800 font-bold text-base">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>{recipe.prepTime} phút</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-100">
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block mb-1">
                Nấu chín
              </span>
              <div className="flex items-center justify-center gap-1.5 text-stone-800 font-bold text-base">
                <Flame className="w-4 h-4 text-amber-500" />
                <span>{recipe.cookTime} phút</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-100">
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block mb-1">
                Khẩu phần
              </span>
              <div className="flex items-center justify-center gap-1.5 text-stone-800 font-bold text-base">
                <Users className="w-4 h-4 text-violet-600" />
                <span>{recipe.serving} người</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-100">
              <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider block mb-1">
                Chi phí ước tính
              </span>
              <div className="flex items-center justify-center gap-1 text-emerald-900 font-bold text-base">
                <span>{totalCost.toLocaleString("vi-VN")} đ</span>
              </div>
            </div>
          </div>
        </div>

        {/* Nutritional Summary Card */}
        <div className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-lg text-stone-900">
                Giá trị dinh dưỡng
              </h3>
              <p className="text-xs text-stone-500">
                Chỉ số dinh dưỡng được tính toán trên 1 khẩu phần ăn tiêu chuẩn
              </p>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 font-bold text-sm">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>{recipe.calories} kcal</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/60 text-center">
              <span className="text-[11px] font-semibold text-stone-500 uppercase">
                Chất đạm (Protein)
              </span>
              <div className="text-lg font-bold text-stone-900 mt-0.5">
                {recipe.protein}g
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/60 text-center">
              <span className="text-[11px] font-semibold text-stone-500 uppercase">
                Tinh bột (Carbs)
              </span>
              <div className="text-lg font-bold text-stone-900 mt-0.5">
                {recipe.carbs}g
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/60 text-center">
              <span className="text-[11px] font-semibold text-stone-500 uppercase">
                Chất béo (Fat)
              </span>
              <div className="text-lg font-bold text-stone-900 mt-0.5">
                {recipe.fat}g
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/60 text-center">
              <span className="text-[11px] font-semibold text-stone-500 uppercase">
                Chất xơ (Fiber)
              </span>
              <div className="text-lg font-bold text-stone-900 mt-0.5">
                {recipe.fiber ?? 6}g
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Layout: Ingredients & Cost Breakdown on Left, Instructions & Substitutions on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Ingredients (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div>
                  <h3 className="font-serif font-bold text-lg text-stone-900">
                    Nguyên liệu
                  </h3>
                  <span className="text-xs text-stone-500">
                    {recipe.ingredients?.length || 0} thành phần
                  </span>
                </div>

                {/* Servings Adjuster */}
                <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-xl text-xs font-bold text-stone-700">
                  <button
                    onClick={() => setServingsMultiplier(Math.max(1, servingsMultiplier - 1))}
                    disabled={servingsMultiplier <= 1}
                    className="w-6 h-6 rounded-lg bg-white disabled:opacity-40 flex items-center justify-center hover:bg-stone-50 cursor-pointer shadow-2xs"
                  >
                    -
                  </button>
                  <span className="px-1.5">{currentServings} suất</span>
                  <button
                    onClick={() => setServingsMultiplier(servingsMultiplier + 1)}
                    className="w-6 h-6 rounded-lg bg-white flex items-center justify-center hover:bg-stone-50 cursor-pointer shadow-2xs"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Ingredient Checkbox List */}
              <div className="space-y-2.5">
                {(recipe.ingredients || []).map((ing, idx) => {
                  const ingKey = `ing-${idx}`;
                  const isChecked = !!checkedIngredients[ingKey];
                  const adjustedQuantity =
                    typeof ing.quantity === "number"
                      ? ing.quantity * servingsMultiplier
                      : ing.quantity;

                  return (
                    <div
                      key={idx}
                      onClick={() => toggleIngredientCheck(ingKey)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        isChecked
                          ? "bg-stone-50/70 border-stone-200 text-stone-400 line-through"
                          : "bg-white border-stone-200/80 hover:border-emerald-300 text-stone-800"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-colors ${
                            isChecked
                              ? "bg-emerald-600 border-emerald-600 text-white"
                              : "border-stone-300 bg-white"
                          }`}
                        >
                          {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                        <span className="text-xs font-semibold">{ing.name}</span>
                      </div>
                      <span className="text-xs font-bold text-emerald-800">
                        {adjustedQuantity} {ing.unit}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Cost Breakdown Accordion/Block */}
              {costData?.ingredients && costData.ingredients.length > 0 && (
                <div className="pt-4 border-t border-stone-100 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">
                    Chi tiết giá nguyên liệu thị trường
                  </span>
                  <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
                    {costData.ingredients.map((cIng: any, i: number) => (
                      <div
                        key={i}
                        className="flex items-center justify-between text-xs py-1 border-b border-stone-50"
                      >
                        <span className="text-stone-600 truncate max-w-[180px]">
                          {cIng.ingredient_name}
                        </span>
                        <div className="text-right shrink-0">
                          <span className="font-semibold text-stone-900">
                            {Number(cIng.cost || 0).toLocaleString("vi-VN")} đ
                          </span>
                          <span className="text-[10px] text-stone-400 block">
                            ({Number(cIng.unit_price || 0).toLocaleString("vi-VN")} đ/{cIng.price_unit || cIng.unit})
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-2 text-xs font-bold text-emerald-900">
                    <span>Tổng chi phí:</span>
                    <span>{Number(costData.total_cost || 0).toLocaleString("vi-VN")} đ</span>
                  </div>
                </div>
              )}
            </div>

            {/* Replacements Card (API #4) */}
            {replacements.length > 0 && (
              <div className="p-6 rounded-3xl bg-amber-50/70 border border-amber-200/80 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-amber-900">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <h4 className="font-serif font-bold text-sm">
                    Gợi ý nguyên liệu thay thế (Substitutions)
                  </h4>
                </div>
                <p className="text-xs text-amber-800/80">
                  Nếu bạn bị dị ứng hoặc không có sẵn nguyên liệu, bạn có thể thay thế bằng:
                </p>

                <div className="space-y-2 pt-1">
                  {replacements.map((rep, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-white border border-amber-200/60 shadow-2xs text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between font-bold">
                        <span className="text-stone-700">{rep.original_ingredient_name}</span>
                        <span className="text-amber-700">➜ {rep.replacement_ingredient_name}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-stone-500">
                        <span>Tỷ lệ: {rep.ratio || "1:1"}</span>
                        {rep.applicable_when && (
                          <span className="text-amber-800 italic">
                            ({rep.applicable_when})
                          </span>
                        )}
                      </div>
                      {rep.note && (
                        <p className="text-[10px] text-stone-400 pt-0.5">
                          Lưu ý: {rep.note}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Cooking Instructions & Tips (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-6">
              <div>
                <h3 className="font-serif font-bold text-xl text-stone-900">
                  Hướng dẫn chế biến
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Làm theo từng bước dưới đây để có món ăn chuẩn vị thơm ngon nhất
                </p>
              </div>

              {/* Instructions Steps */}
              <div className="space-y-4">
                {(recipe.instructions || []).map((step, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                      {idx + 1}
                    </div>
                    <div className="flex-1 p-3.5 rounded-2xl bg-stone-50/70 border border-stone-100 text-xs sm:text-sm text-stone-800 leading-relaxed font-medium">
                      {step}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chef Notes / Description */}
              {recipe.description && (
                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 text-xs text-emerald-950 space-y-1">
                  <span className="font-bold flex items-center gap-1.5 text-emerald-900">
                    <ChefHat className="w-4 h-4 text-emerald-700" />
                    Mẹo từ bếp VeggieHub:
                  </span>
                  <p className="text-stone-600 leading-relaxed">
                    {recipe.description}
                  </p>
                </div>
              )}

              {/* Call to action */}
              <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-stone-500">
                  Thích món này? Thêm ngay vào thực đơn tuần của bạn!
                </span>
                <Link
                  href="/planner"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-sm"
                >
                  <CalendarPlus className="w-4 h-4" />
                  <span>Mở Meal Planner</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
