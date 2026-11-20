"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Flame,
  Clock,
  ChefHat,
  Play,
  Heart,
  Utensils,
} from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { favoriteService } from "@/features/recipes/services/favoriteService";
import { recipeApiService } from "@/features/recipes/services/recipeApiService";
import { useProfile } from "@/features/profile/hooks/useProfile";
import { storage, STORAGE_KEYS } from "@/utils/storage/storage";

const HERO_FEATURED_CACHE_KEY = "veggie_hero_featured_recipe";

export function Hero() {
  const { profile } = useProfile();
  const userId = String(profile?.id || "u1");

  const [mounted, setMounted] = useState(false);
  const [recipe, setRecipe] = useState<any | null>(null);

  // Phục hồi từ cache trên client sau khi mount và tải món nổi bật từ database
  useEffect(() => {
    setMounted(true);

    try {
      const cached = localStorage.getItem(HERO_FEATURED_CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && (parsed.title || parsed.name)) {
          setRecipe(parsed);
        }
      }
    } catch {}

    let active = true;
    async function loadFeaturedRecipe() {
      try {
        const res = await recipeApiService.getRecipes({ limit: 20 });
        const list = Array.isArray(res) ? res : res?.data || res?.items || [];
        if (active && list.length > 0) {
          // Ưu tiên chọn món đã duyệt có ảnh và mô tả phong phú từ cơ sở dữ liệu thật
          const withImages = list.filter((r: any) => r.image_url && r.image_url.trim());
          const chosen = withImages.length > 0 ? withImages[0] : list[0];
          setRecipe(chosen);
          try {
            localStorage.setItem(HERO_FEATURED_CACHE_KEY, JSON.stringify(chosen));
          } catch {}
        }
      } catch (err) {
        console.warn("Lỗi khi tải công thức nổi bật cho Hero banner:", err);
      }
    }
    loadFeaturedRecipe();
    return () => {
      active = false;
    };
  }, []);

  const recipeId = recipe?.recipe_id ? String(recipe.recipe_id) : recipe?.id ? String(recipe.id) : "";

  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    if (!recipeId) return;
    setIsFav(favoriteService.isRecipeFavorite(userId, recipeId));
    const unsubscribe = storage.subscribe((event) => {
      if (event.key === STORAGE_KEYS.FAVORITES) {
        setIsFav(favoriteService.isRecipeFavorite(userId, recipeId));
      }
    });
    return unsubscribe;
  }, [userId, recipeId]);

  const handleToggleFavorite = () => {
    if (!recipeId) return;
    const updated = favoriteService.toggleFavoriteRecipe(userId, recipeId);
    setIsFav(updated);
  };

  // Skeleton loading khi chưa mount hoặc chưa có dữ liệu công thức (đảm bảo SSR và client đồng nhất)
  if (!mounted || !recipe) {
    return (
      <div className="relative h-[498px] w-full rounded-3xl bg-emerald-950 overflow-hidden shadow-md animate-pulse">
        <div className="absolute right-0 inset-y-0 w-[55%] bg-emerald-900/30" />
        <div className="relative z-10 p-8 sm:p-11 max-w-[520px] h-full flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex gap-2.5">
              <div className="h-8 w-44 rounded-full bg-emerald-800/60" />
              <div className="h-8 w-28 rounded-full bg-emerald-800/40" />
            </div>
            <div className="h-12 w-4/5 rounded-2xl bg-emerald-800/60 mt-4" />
            <div className="h-5 w-full rounded-xl bg-emerald-800/40 mt-3" />
            <div className="h-5 w-3/4 rounded-xl bg-emerald-800/40" />
            <div className="flex gap-4 pt-4">
              <div className="h-6 w-20 rounded-lg bg-emerald-800/40" />
              <div className="h-6 w-20 rounded-lg bg-emerald-800/40" />
              <div className="h-6 w-24 rounded-lg bg-emerald-800/40" />
            </div>
            <div className="pt-4 flex gap-3">
              <div className="h-[50px] w-40 rounded-full bg-emerald-800/70" />
              <div className="h-[50px] w-28 rounded-full bg-emerald-800/50" />
            </div>
          </div>
          <div className="pt-4 border-t border-emerald-800/40 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-800/60" />
            <div className="h-4 w-48 rounded bg-emerald-800/40" />
          </div>
        </div>
      </div>
    );
  }

  // Lấy toàn bộ thông tin trực tiếp từ đối tượng recipe thật của database
  const title = recipe.title || recipe.name || "Món chay thanh đạm";
  const description =
    recipe.description ||
    "Khám phá công thức món chay thanh đạm, giàu dinh dưỡng và dễ dàng chuẩn bị cho bữa cơm gia đình.";
  const cookTime = recipe.cook_time
    ? `${recipe.cook_time} phút`
    : recipe.prep_time
      ? `${recipe.prep_time} phút`
      : "20 phút";
  const difficulty =
    recipe.difficulty === "hard"
      ? "Kỳ công"
      : recipe.difficulty === "medium"
        ? "Vừa phải"
        : "Dễ làm";
  const rawCalories = Number(recipe.nutrition?.calories ?? recipe.calories);
  const calories =
    !isNaN(rawCalories) && rawCalories > 0
      ? `~${Math.round(rawCalories * 10) / 10} kcal`
      : null;
  const dietLabel =
    recipe.diet_type === "vegan" || recipe.vegetarianType === "vegan"
      ? "Thuần chay"
      : recipe.diet_type === "ovo" || recipe.vegetarianType === "ovo_vegetarian"
        ? "Chay có trứng"
        : recipe.diet_type === "lacto" || recipe.vegetarianType === "lacto_vegetarian"
          ? "Chay có sữa"
          : "Món chay chuẩn vị";
  const imageUrl = recipe.image_url || recipe.image;

  return (
    <div className="relative h-[498px] w-full rounded-3xl bg-emerald-900 overflow-hidden select-none shadow-md">
      {/* Background Decor Circles */}
      <div className="absolute -left-10 -bottom-20 w-64 h-64 rounded-full bg-emerald-800/80 pointer-events-none" />
      <div className="absolute top-10 right-[50%] w-32 h-32 rounded-full bg-emerald-800/30 blur-2xl pointer-events-none" />

      {/* Right Image Container */}
      <div className="absolute right-0 inset-y-0 w-[55%] overflow-hidden bg-emerald-950">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-emerald-700">
            <Utensils className="w-20 h-20" />
          </div>
        )}

        {/* Left-to-right overlay gradient: emerald-900 -> transparent across left 45% */}
        <div className="absolute inset-y-0 left-0 w-[45%] bg-gradient-to-r from-emerald-900 via-emerald-900/80 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Left Column Content */}
      <div className="relative z-10 p-8 sm:p-11 max-w-[520px] h-full flex flex-col justify-between">
        <div>
          {/* Top Tag Row */}
          <div className="flex items-center gap-3">
            <span className="h-8 px-3 rounded-full bg-amber-400 text-amber-950 text-sm font-semibold inline-flex items-center gap-1.5 shadow-sm">
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>Món ngon trong ngày</span>
            </span>
            <span className="text-sm font-semibold text-emerald-200 bg-emerald-800/60 px-3 py-1 rounded-full border border-emerald-700/50">
              {dietLabel}
            </span>
          </div>

          {/* Heading H1 */}
          <h1 className="mt-5 font-serif font-bold text-3xl sm:text-[42px] leading-tight text-white tracking-tight line-clamp-2">
            {title}
          </h1>

          {/* Description */}
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-emerald-100/90 line-clamp-2">
            {description}
          </p>

          {/* Meta Row */}
          <div className="mt-5 flex flex-wrap items-center gap-4 sm:gap-6 text-sm sm:text-base font-semibold text-white">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-300" />
              <span>{cookTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <ChefHat className="w-4 h-4 text-emerald-300" />
              <span>{difficulty}</span>
            </div>
            {calories && (
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-emerald-300" />
                <span>{calories}</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex items-center gap-3 sm:gap-4">
            {recipeId ? (
              <Link
                href={`/recipes/${recipeId}`}
                className="h-[50px] px-6 sm:px-7 rounded-full bg-amber-400 hover:bg-amber-500 text-amber-950 text-base font-bold inline-flex items-center gap-2.5 transition-colors cursor-pointer shadow-sm focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Xem công thức</span>
              </Link>
            ) : (
              <Link
                href="/recipes"
                className="h-[50px] px-6 sm:px-7 rounded-full bg-amber-400 hover:bg-amber-500 text-amber-950 text-base font-bold inline-flex items-center gap-2.5 transition-colors cursor-pointer shadow-sm focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Khám phá món chay</span>
              </Link>
            )}
            {recipeId && (
              <button
                type="button"
                onClick={handleToggleFavorite}
                title={isFav ? "Bỏ thích công thức" : "Thêm vào công thức yêu thích"}
                className={`h-[50px] px-5 rounded-full text-base font-semibold inline-flex items-center gap-2 transition-all cursor-pointer border ${
                  isFav
                    ? "bg-rose-500/20 text-rose-300 border-rose-400/40 hover:bg-rose-500/30"
                    : "text-white hover:bg-white/10 border-white/20"
                }`}
              >
                <Heart
                  className={`w-4 h-4 transition-transform ${
                    isFav ? "fill-rose-400 text-rose-400 scale-110" : ""
                  }`}
                  strokeWidth={2}
                />
                <span>{isFav ? "Đã thích" : "Thích"}</span>
              </button>
            )}
          </div>
        </div>

        {/* Divider & Author Row */}
        <div>
          <div className="h-px w-full bg-white/10" />
          <div className="mt-4 flex items-center gap-3">
            <Avatar initials="VH" verified={true} />
            <div className="flex items-center gap-1.5 text-sm sm:text-base font-semibold text-white">
              <span>Bếp chay VeggieHub</span>
              <span className="text-white/60">·</span>
              <span className="text-emerald-200/85 font-normal text-xs sm:text-sm">
                Đã kiểm định dinh dưỡng
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
