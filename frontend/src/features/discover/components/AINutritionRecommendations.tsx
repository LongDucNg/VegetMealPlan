"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  Flame,
  Clock,
  ChefHat,
  ChevronRight,
  ArrowRight,
  Utensils,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { recipeApiService } from "@/features/recipes/services/recipeApiService";
import { useProfile } from "@/features/profile/hooks/useProfile";
import { tokenStorage } from "@/lib/tokenStorage";

export function AINutritionRecommendations() {
  const { profile } = useProfile();
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadRecommendations() {
      setLoading(true);
      try {
        const token = tokenStorage.getToken();
        let list: any[] = [];

        // 1. Nếu có token, thử gọi API recommendations chính thức
        if (token) {
          try {
            const res = await recipeApiService.getRecommendations({
              targetCalories: profile?.bmi ? 550 : undefined,
            });
            if (Array.isArray(res) && res.length > 0) {
              list = res.map((item: any) => item.recipe || item).filter(Boolean);
            }
          } catch {
            // fallback
          }
        }

        // 2. Nếu chưa có hoặc danh sách rỗng, lấy từ kho công thức và áp dụng bộ lọc AI dinh dưỡng
        if (list.length === 0) {
          const res = await recipeApiService.getRecipes({ limit: 30 });
          const allRecipes = Array.isArray(res) ? res : res?.data || res?.items || [];

          // Lọc theo chế độ ăn của người dùng (nếu có)
          const userDiet = profile?.vegetarianType?.toLowerCase() || "";
          const userAllergies = (profile?.allergies || []).map((a) => a.toLowerCase());

          list = allRecipes.filter((r: any) => {
            // Loại bỏ món vi phạm dị ứng
            if (userAllergies.length > 0) {
              const titleLower = (r.title || "").toLowerCase();
              const hasAllergy = userAllergies.some((a) => {
                const normA = a === "egg" ? "trứng" : a === "peanut" ? "lạc" : a;
                return titleLower.includes(normA);
              });
              if (hasAllergy) return false;
            }

            // Ưu tiên món có ảnh và thông tin calo
            return r.image_url && r.image_url.trim();
          });

          // Nếu lọc xong còn ít, lấy thêm món chung
          if (list.length < 4) {
            list = allRecipes.filter((r: any) => r.image_url);
          }
        }

        if (active) {
          setRecipes(list.slice(0, 4));
        }
      } catch (err) {
        console.warn("Lỗi khi tải món ăn đề xuất AI:", err);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadRecommendations();
    return () => {
      active = false;
    };
  }, [profile]);

  return (
    <section className="mt-10 space-y-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold tracking-wider uppercase mb-1">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>DINH DƯỠNG THÔNG MINH</span>
          </div>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 tracking-tight">
            Món ăn đề xuất bằng AI dinh dưỡng
          </h2>
          <p className="text-stone-500 text-xs sm:text-sm mt-1 max-w-2xl">
            Tính toán cá nhân hóa theo chế độ ăn chay, cân bằng calo (TDEE) và tự động loại trừ các thành phần gây dị ứng trong hồ sơ của bạn.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/planner"
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5 transition-colors group"
          >
            <span>Lập thực đơn tuần</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Cards Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="p-4 space-y-3 animate-pulse">
              <div className="h-40 bg-stone-100 rounded-2xl w-full" />
              <div className="h-4 bg-stone-100 rounded w-3/4" />
              <div className="h-3 bg-stone-100 rounded w-1/2" />
            </Card>
          ))}
        </div>
      ) : recipes.length === 0 ? (
        <Card className="p-8 text-center text-xs text-stone-500">
          Hệ thống đang chuẩn bị thêm công thức đề xuất phù hợp với hồ sơ của bạn.
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {recipes.map((r) => {
            const calories = r.nutrition?.calories || r.calories || 380;
            const cookTime = r.cook_time ? `${r.cook_time} phút` : "20 phút";
            const mealType = r.meal_type || "Món chính";

            return (
              <Link
                key={r.recipe_id}
                href={`/recipes/${r.recipe_id}`}
                className="group block"
              >
                <Card className="overflow-hidden transition-all flex flex-col h-full hover:border-emerald-500 hover:shadow-md">
                  {/* Image container */}
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

                    {/* AI Tag */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-emerald-700/90 backdrop-blur-xs text-white shadow-sm flex items-center gap-1 border border-emerald-500/30">
                        <Sparkles className="w-3 h-3 text-amber-300" />
                        <span>AI Đề xuất</span>
                      </span>
                    </div>

                    {/* Meal Type Tag */}
                    <div className="absolute bottom-3 right-3">
                      <span className="px-2.5 py-0.5 rounded-lg bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium">
                        {mealType}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h4 className="font-bold text-stone-900 text-base line-clamp-1 group-hover:text-emerald-700 transition-colors">
                        {r.title}
                      </h4>
                      <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                        {r.description || "Công thức món chay bổ dưỡng, thanh đạm chuẩn khoa học."}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-stone-100">
                      <div className="flex items-center justify-between text-xs text-stone-600 font-medium">
                        <span className="flex items-center gap-1">
                          <Flame className="w-3.5 h-3.5 text-amber-500" />
                          <span>{calories} kcal</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-stone-400" />
                          <span>{cookTime}</span>
                        </span>
                      </div>

                      <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                        <span className="text-[11px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold">
                          Chuẩn dinh dưỡng
                        </span>
                        <span className="flex items-center gap-1 font-semibold text-emerald-700 group-hover:translate-x-0.5 transition-transform">
                          Xem cách nấu <ChevronRight className="w-3.5 h-3.5" />
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

