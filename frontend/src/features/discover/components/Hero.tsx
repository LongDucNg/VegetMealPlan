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

export function Hero() {
  const { profile } = useProfile();
  const userId = String(profile?.id || "u1");

  const [recipe, setRecipe] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // Load real featured recipe from database
  useEffect(() => {
    let active = true;
    async function loadFeaturedRecipe() {
      try {
        const res = await recipeApiService.getRecipes({ limit: 20 });
        const list = Array.isArray(res) ? res : res?.data || res?.items || [];
        if (active && list.length > 0) {
          // Ưu tiên chọn món đã duyệt có ảnh và mô tả phong phú
          const withImages = list.filter((r: any) => r.image_url && r.image_url.trim());
          const chosen = withImages.length > 0 ? withImages[0] : list[0];
          setRecipe(chosen);
        }
      } catch (err) {
        console.warn("Lỗi khi tải công thức nổi bật cho Hero banner:", err);
      } finally {
        if (active) setLoading(false);
      }
    }
    loadFeaturedRecipe();
    return () => {
      active = false;
    };
  }, []);

  const recipeId = recipe?.recipe_id ? String(recipe.recipe_id) : "629";

  const [isFav, setIsFav] = useState(() => {
    return favoriteService.isRecipeFavorite(userId, recipeId);
  });

  useEffect(() => {
    setIsFav(favoriteService.isRecipeFavorite(userId, recipeId));
    const unsubscribe = storage.subscribe((event) => {
      if (event.key === STORAGE_KEYS.FAVORITES) {
        setIsFav(favoriteService.isRecipeFavorite(userId, recipeId));
      }
    });
    return unsubscribe;
  }, [userId, recipeId]);

  const handleToggleFavorite = () => {
    const updated = favoriteService.toggleFavoriteRecipe(userId, recipeId);
    setIsFav(updated);
  };

  // Recipe display values
  const title = recipe?.title || "Đậu Hũ Chiên Giòn Sả Ớt";
  const description =
    recipe?.description ||
    "Đậu hũ chiên giòn thơm dùng kèm cơm lài dẻo thơm, đồ chua thanh mát và nước mắm chay đậm đà chuẩn vị.";
  const cookTime = recipe?.cook_time ? `${recipe.cook_time} phút` : "20 phút";
  const difficulty =
    recipe?.difficulty === "hard"
      ? "Kỳ công"
      : recipe?.difficulty === "medium"
        ? "Vừa phải"
        : "Dễ làm";
  const rawCalories = Number(recipe?.nutrition?.calories ?? recipe?.calories);
  const calories =
    !isNaN(rawCalories) && rawCalories > 0
      ? `~${Math.round(rawCalories * 100) / 100} kcal`
      : "~380 kcal";
  const dietLabel =
    recipe?.diet_type === "vegan"
      ? "Thuần chay"
      : recipe?.diet_type === "ovo"
        ? "Chay có trứng"
        : recipe?.diet_type === "lacto"
          ? "Chay có sữa"
          : "Món chay chuẩn vị";
  const imageUrl = recipe?.image_url || "/images/hero-bowl.jpg";

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
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-emerald-300" />
              <span>{calories}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex items-center gap-3 sm:gap-4">
            <Link
              href={`/recipes/${recipeId}`}
              className="h-[50px] px-6 sm:px-7 rounded-full bg-amber-400 hover:bg-amber-500 text-amber-950 text-base font-bold inline-flex items-center gap-2.5 transition-colors cursor-pointer shadow-sm focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Xem công thức</span>
            </Link>
            <button
              type="button"
              onClick={handleToggleFavorite}
              title={isFav ? "Bỏ thích công thức" : "Thêm vào công thức yêu thích"}
              className={`h-[50px] px-5 rounded-full text-base font-semibold inline-flex items-center gap-2 transition-all cursor-pointer border ${isFav
                  ? "bg-rose-500/20 text-rose-300 border-rose-400/40 hover:bg-rose-500/30"
                  : "text-white hover:bg-white/10 border-white/20"
                }`}
            >
              <Heart
                className={`w-4 h-4 transition-transform ${isFav ? "fill-rose-400 text-rose-400 scale-110" : ""
                  }`}
                strokeWidth={2}
              />
              <span>{isFav ? "Đã thích" : "Thích"}</span>
            </button>
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
