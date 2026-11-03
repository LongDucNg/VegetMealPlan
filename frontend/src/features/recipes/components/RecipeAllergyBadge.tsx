"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";
import { checkRecipeAllergy, HasIngredients } from "@/features/allergy/utils/checkRecipeAllergy";
import { useProfile } from "@/features/profile/hooks/useProfile";
import { formatAllergy } from "@/features/profile/types";
import { useAuth } from "@/features/auth/context/AuthContext";

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
  const { isAuthenticated } = useAuth();
  const { profile } = useProfile();

  // Khách chưa đăng nhập: Không hiển thị cảnh báo cá nhân hóa
  if (!isAuthenticated || !profile) {
    return null;
  }

  const vegType = (profile.vegetarianType || "").toLowerCase().trim();
  const declaredAllergies = profile.allergies || [];

  // Nếu người dùng chưa chọn chế độ ăn chay và cũng không khai báo dị ứng: Không hiển thị
  if (!vegType && declaredAllergies.length === 0) {
    return null;
  }

  const allergyResult = checkRecipeAllergy(recipe, profile);

  // Phân loại chi tiết vi phạm:
  // 1. Vi phạm Trứng theo trường phái ăn chay
  const hasEggInRecipe =
    allergyResult.allergenIds.includes("egg") ||
    allergyResult.allergens.some(
      (a) => a.toLowerCase().includes("trứng") || a.toLowerCase() === "egg"
    );
  const isEggDietViolation =
    (vegType === "vegan" || vegType === "lacto_vegetarian") && hasEggInRecipe;

  // 2. Vi phạm Sữa theo trường phái ăn chay
  const hasDairyInRecipe =
    allergyResult.allergenIds.includes("dairy") ||
    allergyResult.allergens.some(
      (a) =>
        a.toLowerCase().includes("sữa") ||
        a.toLowerCase().includes("dairy") ||
        a.toLowerCase().includes("sua")
    );
  const isDairyDietViolation =
    (vegType === "vegan" || vegType === "ovo_vegetarian") && hasDairyInRecipe;

  // 3. Vi phạm dị ứng cá nhân do người dùng chủ động chọn
  const userDeclaredMatches = allergyResult.detectedAllergens.filter((item) => {
    return declaredAllergies.some((d) => {
      const dNorm = d.toLowerCase().trim();
      return (
        dNorm === item.id ||
        (dNorm === "treenut" && (item.id === "treenut" || item.id === "tree_nut")) ||
        (dNorm === "sesame" && (item.id === "sesame" || item.id === "seed")) ||
        (dNorm === "egg" && item.id === "egg") ||
        (dNorm === "dairy" && item.id === "dairy") ||
        dNorm === item.name.toLowerCase() ||
        (item.name.toLowerCase().includes(dNorm) && dNorm.length > 3)
      );
    });
  });

  // Nếu là chay trứng sữa (lacto_ovo) và không bị dị ứng cá nhân: Không có cảnh báo gì
  if (
    (vegType === "lacto_ovo_vegetarian" || vegType === "ovo_lacto") &&
    userDeclaredMatches.length === 0
  ) {
    return null;
  }

  const hasAnyViolation = isEggDietViolation || isDairyDietViolation || userDeclaredMatches.length > 0;
  if (!hasAnyViolation) {
    return null;
  }

  // Xác định nhãn & tiêu đề thông báo chính xác theo yêu cầu:
  let title = "⚠ Cảnh báo thành phần cần tránh";
  let description = "";
  let compactLabel = "";

  if (vegType === "vegan" && (isEggDietViolation || isDairyDietViolation)) {
    title = "⚠ Không phù hợp chế độ Thuần chay (Vegan)";
    if (isEggDietViolation && isDairyDietViolation) {
      compactLabel = "Chứa Trứng & Sữa (Né theo Thuần chay)";
      description = "Món ăn có chứa cả Trứng và Sữa/Chế phẩm sữa — hệ thống tự động né đối với chế độ Thuần chay.";
    } else if (isEggDietViolation) {
      compactLabel = "Chứa Trứng (Né theo Thuần chay)";
      description = "Món ăn có chứa Trứng — hệ thống tự động né đối với chế độ Thuần chay.";
    } else {
      compactLabel = "Chứa Sữa (Né theo Thuần chay)";
      description = "Món ăn có chứa Sữa & Chế phẩm sữa — hệ thống tự động né đối với chế độ Thuần chay.";
    }
  } else if (vegType === "lacto_vegetarian" && isEggDietViolation) {
    title = "⚠ Không phù hợp chế độ Chay có sữa (Lacto)";
    compactLabel = "Chứa Trứng (Né theo Chay có sữa)";
    description = "Món ăn có chứa Trứng — chế độ Chay có sữa tự động né Trứng (chỉ cho phép dùng sữa và chế phẩm sữa).";
  } else if (vegType === "ovo_vegetarian" && isDairyDietViolation) {
    title = "⚠ Không phù hợp chế độ Chay có trứng (Ovo)";
    compactLabel = "Chứa Sữa (Né theo Chay có trứng)";
    description = "Món ăn có chứa Sữa & Chế phẩm sữa — chế độ Chay có trứng tự động né Sữa (chỉ cho phép dùng trứng).";
  } else if (userDeclaredMatches.length > 0) {
    const formattedList = userDeclaredMatches.map((a) => formatAllergy(a.id) || a.name).join(", ");
    title = "⚠ Cảnh báo dị ứng thực phẩm";
    compactLabel = `Dị ứng: ${formattedList}`;
    description = `Món ăn có chứa thành phần bạn bị dị ứng: ${formattedList}.`;
  }

  // Bổ sung thông tin dị ứng cá nhân nếu có kèm theo vi phạm trường phái ăn chay
  if (userDeclaredMatches.length > 0 && (isEggDietViolation || isDairyDietViolation)) {
    const formattedList = userDeclaredMatches.map((a) => formatAllergy(a.id) || a.name).join(", ");
    compactLabel = `${compactLabel} • Dị ứng: ${formattedList}`;
    description += ` Ngoài ra món còn chứa thành phần dị ứng của bạn: ${formattedList}.`;
  }

  if (compact) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs ${className}`}
        title={description}
      >
        <AlertTriangle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
        <span className="truncate">{compactLabel || title}</span>
      </span>
    );
  }

  return (
    <div
      className={`flex items-start gap-2.5 p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 text-xs shadow-2xs ${className}`}
    >
      <div className="w-5 h-5 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
        <AlertTriangle className="w-3.5 h-3.5 stroke-[2.25]" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-amber-900">{title}</p>
        <p className="text-amber-800 mt-1 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
