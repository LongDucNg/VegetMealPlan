"use client";

import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { favoriteService } from "@/features/recipes/services/favoriteService";
import { useProfile } from "@/features/profile/hooks/useProfile";
import { storage, STORAGE_KEYS } from "@/utils/storage/storage";

export interface BookmarkButtonProps {
  recipeId?: string;
  initialSaved?: boolean;
  onToggle?: (saved: boolean) => void;
  className?: string;
  size?: "sm" | "md";
}

export function BookmarkButton({
  recipeId,
  initialSaved = false,
  onToggle,
  className = "",
  size = "md",
}: BookmarkButtonProps) {
  const { profile } = useProfile();
  const userId = String(profile?.id || "u1");

  const [isFav, setIsFav] = useState<boolean>(() => {
    if (recipeId) {
      return favoriteService.isRecipeFavorite(userId, recipeId);
    }
    return initialSaved;
  });

  useEffect(() => {
    if (!recipeId) return;

    const unsubscribe = storage.subscribe((event) => {
      if (event.key === STORAGE_KEYS.FAVORITES) {
        setIsFav(favoriteService.isRecipeFavorite(userId, recipeId));
      }
    });

    return unsubscribe;
  }, [recipeId, userId]);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (recipeId) {
      const updated = favoriteService.toggleFavoriteRecipe(userId, recipeId);
      setIsFav(updated);
      onToggle?.(updated);
    } else {
      const next = !isFav;
      setIsFav(next);
      onToggle?.(next);
    }
  };

  const btnSize = size === "sm" ? "w-8 h-8 rounded-lg" : "w-9 h-9 rounded-xl";
  const iconSize = size === "sm" ? "w-4 h-4" : "w-[18px] h-[18px]";

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={isFav ? "Bỏ thích công thức" : "Thích công thức"}
      title={isFav ? "Đã thích công thức (Click để bỏ thích)" : "Thích công thức (Lưu vào thực đơn yêu thích)"}
      className={`${btnSize} bg-white/95 backdrop-blur flex items-center justify-center transition-all cursor-pointer hover:bg-white shadow-sm hover:scale-105 active:scale-95 ${
        isFav ? "text-rose-500" : "text-stone-600 hover:text-rose-500"
      } ${className}`}
    >
      <Heart
        className={`${iconSize} transition-transform ${
          isFav ? "fill-rose-500 text-rose-500 scale-110" : ""
        }`}
        strokeWidth={1.75}
      />
    </button>
  );
}

// Alias for clear semantics
export const FavoriteButton = BookmarkButton;
