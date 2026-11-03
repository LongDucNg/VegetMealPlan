"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  SlidersHorizontal,
  Clock,
  Flame,
  ChefHat,
  Heart,
  Utensils,
  ChevronRight,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Chip } from "@/components/ui/Chip";
import { Card } from "@/components/ui/Card";
import { apiClient } from "@/lib/apiClient";
import { recipeApiService } from "@/features/recipes/services/recipeApiService";
import { favoriteService } from "@/features/recipes/services/favoriteService";
import { useProfile } from "@/features/profile/hooks/useProfile";
import { storage, STORAGE_KEYS } from "@/utils/storage/storage";

interface RealCategory {
  category_id: number;
  category_name: string;
  category_type?: string;
  recipe_count?: number;
}

export function TrendingVideos() {
  const { profile } = useProfile();
  const userId = String(profile?.id || "u1");

  const [categories, setCategories] = useState<RealCategory[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingRecipes, setLoadingRecipes] = useState(false);

  // 1. Tải danh mục thực tế từ backend (/categories)
  useEffect(() => {
    let active = true;
    async function loadCategories() {
      try {
        const res = await apiClient.get<any>("/categories");
        const list: RealCategory[] = Array.isArray(res) ? res : res?.data || [];
        if (active && list.length > 0) {
          // Lọc danh mục loại món ăn (recipe_type) và sắp xếp
          const valid = list.filter(
            (c) => c.category_type === "recipe_type" || !c.category_type
          );
          setCategories(valid.length > 0 ? valid : list);
        }
      } catch (err) {
        console.warn("Lỗi khi tải danh mục món ăn từ server:", err);
      } finally {
        if (active) setLoading(false);
      }
    }
    loadCategories();
    return () => {
      active = false;
    };
  }, []);

  // 2. Tải công thức thực tế từ database theo danh mục được chọn
  useEffect(() => {
    let active = true;
    async function loadRecipes() {
      setLoadingRecipes(true);
      try {
        const params: any = { limit: 12 };
        if (activeCategoryId) {
          const cat = categories.find((c) => c.category_id === activeCategoryId);
          if (cat) {
            params.category = cat.category_name;
          }
        }

        const res = await recipeApiService.getRecipes(params);
        const list = Array.isArray(res) ? res : res?.data || res?.items || [];
        if (active) {
          setRecipes(list);
        }
      } catch (err) {
        console.warn("Lỗi khi tải công thức từ database:", err);
      } finally {
        if (active) setLoadingRecipes(false);
      }
    }
    loadRecipes();
    return () => {
      active = false;
    };
  }, [activeCategoryId, categories]);

  return (
    <section className="mt-12 space-y-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase block mb-1">
            KHÁM PHÁ & NẤU ĂN
          </span>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 tracking-tight">
            Công thức món chay theo danh mục
          </h2>
          <p className="text-stone-500 text-xs sm:text-sm mt-0.5">
            Dữ liệu công thức thực tế trong hệ thống kèm thông số dinh dưỡng và định lượng chi tiết.
          </p>
        </div>

        <Link
          href="/recipes"
          className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5 transition-colors group shrink-0"
        >
          <span>Xem tất cả công thức</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Filter Row: Danh mục thực tế từ Database */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        {/* Nút "Tất cả" */}
        <Chip
          variant="filter"
          active={activeCategoryId === null}
          onClick={() => setActiveCategoryId(null)}
          className="shrink-0 whitespace-nowrap cursor-pointer font-semibold text-xs"
        >
          Tất cả (600+)
        </Chip>

        {/* Các danh mục thực tế từ DB */}
        {categories.map((cat) => {
          const isActive = activeCategoryId === cat.category_id;
          const count = cat.recipe_count ? ` (${cat.recipe_count})` : "";
          return (
            <Chip
              key={cat.category_id}
              variant="filter"
              active={isActive}
              onClick={() => setActiveCategoryId(cat.category_id)}
              className="shrink-0 whitespace-nowrap cursor-pointer font-semibold text-xs"
            >
              {cat.category_name}
              {count}
            </Chip>
          );
        })}

        {/* Link chuyển sang trang lọc nâng cao */}
        <Link
          href="/recipes"
          className="h-10 px-4 text-xs font-semibold rounded-full border border-stone-200 bg-white text-stone-700 hover:text-stone-900 hover:border-stone-300 transition-colors inline-flex items-center gap-2 shrink-0 whitespace-nowrap cursor-pointer shadow-2xs"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-stone-500" strokeWidth={1.75} />
          <span>Bộ lọc chi tiết</span>
        </Link>
      </div>

      {/* 4-column Real Recipe Grid */}
      {loadingRecipes ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Card key={i} className="p-4 space-y-3 animate-pulse">
              <div className="h-40 bg-stone-100 rounded-2xl w-full" />
              <div className="h-4 bg-stone-100 rounded w-3/4" />
              <div className="h-3 bg-stone-100 rounded w-1/2" />
            </Card>
          ))}
        </div>
      ) : recipes.length === 0 ? (
        <Card className="p-10 text-center text-xs text-stone-500 border-dashed">
          Chưa có món ăn nào trong danh mục này. Hãy chọn danh mục khác hoặc tạo món mới.
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-2">
          {recipes.map((r) => {
            const rawCalories = Number(r.nutrition?.calories ?? r.calories ?? 350);
            const calories = !isNaN(rawCalories) && rawCalories > 0 ? Math.round(rawCalories * 100) / 100 : 350;
            const cookTime = r.cook_time ? `${r.cook_time} phút` : "20 phút";
            const mealType = r.meal_type || "Món chay";

            return (
              <Link
                key={r.recipe_id}
                href={`/recipes/${r.recipe_id}`}
                className="group block"
              >
                <Card className="overflow-hidden transition-all flex flex-col h-full hover:border-emerald-500 hover:shadow-md">
                  {/* Image */}
                  <div className="relative h-44 w-full bg-stone-100 overflow-hidden">
                    {r.image_url ? (
                      <img
                        src={r.image_url}
                        alt={r.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-stone-300">
                        <Utensils className="w-10 h-10" />
                      </div>
                    )}

                    {/* Meal type pill */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-0.5 rounded-lg bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium">
                        {mealType}
                      </span>
                    </div>

                    {/* Diet type pill */}
                    {r.diet_type && (
                      <div className="absolute bottom-3 right-3">
                        <span className="px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-xs text-stone-800 text-[10px] font-bold shadow-xs">
                          {r.diet_type === "vegan"
                            ? "Thuần chay"
                            : r.diet_type === "ovo"
                            ? "Có trứng"
                            : r.diet_type === "lacto"
                            ? "Có sữa"
                            : "Chay"}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h4 className="font-bold text-stone-900 text-base line-clamp-1 group-hover:text-emerald-700 transition-colors">
                        {r.title}
                      </h4>
                      <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                        {r.description || "Công thức món chay thơm ngon, bổ dưỡng và dễ làm."}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-stone-100">
                      <div className="flex items-center justify-between text-xs text-stone-600 font-medium">
                        <span className="flex items-center gap-1">
                          <Flame className="w-3.5 h-3.5 text-amber-500" />
                          <span>~{calories} kcal</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-stone-400" />
                          <span>{cookTime}</span>
                        </span>
                      </div>

                      <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                        <span className="text-[11px] text-stone-400">
                          {r.difficulty === "hard"
                            ? "Kỳ công"
                            : r.difficulty === "medium"
                            ? "Vừa phải"
                            : "Dễ làm"}
                        </span>
                        <span className="flex items-center gap-1 font-semibold text-emerald-700 group-hover:translate-x-0.5 transition-transform">
                          Xem chi tiết <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
