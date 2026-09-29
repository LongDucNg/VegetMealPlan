"use client";

import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { favoriteService } from "@/features/recipes/services/favoriteService";
import { useProfile } from "@/features/profile/hooks/useProfile";
import { storage, STORAGE_KEYS } from "@/utils/storage/storage";

interface RecipeFavoriteButtonProps {
  recipeId: string;
  size?: "sm" | "md";
  className?: string;
}

export function RecipeFavoriteButton({
  recipeId,
  size = "md",
  className = "",
}: RecipeFavoriteButtonProps) {
  const { profile } = useProfile();
  const userId = String(profile.id || "u1");
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    setIsFav(favoriteService.isRecipeFavorite(userId, recipeId));

    const unsubscribe = storage.subscribe((event) => {
      if (event.key === STORAGE_KEYS.FAVORITES) {
        setIsFav(favoriteService.isRecipeFavorite(userId, recipeId));
      }
    });
    return unsubscribe;
  }, [userId, recipeId]);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const updated = favoriteService.toggleFavoriteRecipe(userId, recipeId);
    setIsFav(updated);
  };

  const iconSize = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";
  const btnSize = size === "sm" ? "w-7 h-7" : "w-8 h-8";

  return (
    <button
      onClick={handleToggle}
      title={isFav ? "♥ Remove from Favorites" : "♡ Add to Favorites"}
      aria-label={isFav ? "Remove from Favorites" : "Add to Favorites"}
      className={`${btnSize} rounded-full flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs ${
        isFav
          ? "bg-rose-50 text-rose-600 border border-rose-200 shadow-2xs hover:bg-rose-100"
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
