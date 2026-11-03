"use client";

import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { favoriteService, getEffectiveUserId } from "../services/favoriteService";
import { storage, STORAGE_KEYS } from "@/utils/storage/storage";

export interface RecipeFavoriteButtonProps {
  recipeId: string;
  size?: "sm" | "md";
  className?: string;
  userId?: string;
}

export function RecipeFavoriteButton({
  recipeId,
  size = "md",
  className = "",
  userId: propUserId,
}: RecipeFavoriteButtonProps) {
  const effectiveUserId = getEffectiveUserId(propUserId);
  const [isFav, setIsFav] = useState(() => {
    return favoriteService.isRecipeFavorite(effectiveUserId, recipeId);
  });

  useEffect(() => {
    setIsFav(favoriteService.isRecipeFavorite(effectiveUserId, recipeId));

    const unsubscribe = storage.subscribe((event) => {
      if (event.key === STORAGE_KEYS.FAVORITES) {
        setIsFav(favoriteService.isRecipeFavorite(effectiveUserId, recipeId));
      }
    });
    return unsubscribe;
  }, [effectiveUserId, recipeId]);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const updated = favoriteService.toggleFavoriteRecipe(effectiveUserId, recipeId);
    setIsFav(updated);
  };

  const iconSize = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";
  const btnSize = size === "sm" ? "w-7 h-7" : "w-8 h-8";

  return (
    <button
      onClick={handleToggle}
      title={isFav ? "♥ Bỏ khỏi Món yêu thích" : "♡ Thêm vào Món yêu thích"}
      aria-label={isFav ? "Bỏ khỏi Món yêu thích" : "Thêm vào Món yêu thích"}
      className={`${btnSize} rounded-full flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs ${
        isFav
          ? "bg-rose-50 text-rose-600 border border-rose-300 shadow-2xs hover:bg-rose-100 ring-2 ring-rose-200"
          : "bg-white/90 text-stone-400 hover:text-rose-500 hover:bg-white border border-stone-200/80 shadow-2xs"
      } ${className}`}
    >
      <Heart
        className={`${iconSize} transition-transform active:scale-75 ${
          isFav ? "fill-rose-500 text-rose-500" : ""
        }`}
      />
    </button>
  );
}
