"use client";

import React from "react";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { checkRecipeAllergy, HasIngredients } from "@/features/allergy/utils/checkRecipeAllergy";
import { useProfile } from "@/features/profile/hooks/useProfile";

interface RecipeAllergyBadgeProps {
  recipe: HasIngredients;
  compact?: boolean;
  className?: string;
}

export function RecipeAllergyBadge({
  recipe,
  compact = false,
  className = "",
}: RecipeAllergyBadgeProps) {
  const { profile } = useProfile();
  const allergyResult = checkRecipeAllergy(recipe, profile);

  // If no allergy: do NOT display warning (Requirement 5)
  if (!allergyResult.hasAllergy) {
    return null;
  }

  const allergenText = allergyResult.allergens.join(", ");
  const warningLabel =
    allergyResult.allergens.length === 1
      ? `Contains ${allergenText}`
      : `Allergy Warning: Contains ${allergenText}`;

  if (compact) {
    return (
      <span
        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs ${className}`}
        title={`Allergy Warning: Contains ${allergenText}`}
      >
        <AlertTriangle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
        <span className="truncate">⚠ {warningLabel}</span>
      </span>
    );
  }

  return (
    <div
      className={`flex items-start gap-2.5 p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-xs shadow-2xs ${className}`}
    >
      <div className="w-5 h-5 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
        <AlertTriangle className="w-3.5 h-3.5 stroke-[2.25]" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-amber-900">⚠ Allergy Warning</p>
        <p className="text-amber-800 mt-0.5 leading-relaxed">
          Contains: <span className="font-bold text-amber-950">{allergenText}</span>
        </p>
      </div>
    </div>
  );
}

