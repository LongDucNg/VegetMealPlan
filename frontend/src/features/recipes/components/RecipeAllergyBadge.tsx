"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";
import { checkRecipeAllergy, HasIngredients } from "@/features/allergy/utils/checkRecipeAllergy";
import { useProfile } from "@/features/profile/hooks/useProfile";
import { formatAllergy, formatCompactAllergy } from "@/features/profile/types";
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

  // Tiêu đề & mô tả đầy đủ (dùng cho tooltip hoặc full banner)
  let title = "⚠ Cảnh báo thành phần cần tránh";
  let description = "";
  let compactDietText = "";

  if (vegType === "vegan" && (isEggDietViolation || isDairyDietViolation)) {
    title = "⚠ Không phù hợp chế độ Thuần chay (Vegan)";
    if (isEggDietViolation && isDairyDietViolation) {
      compactDietText = "Chứa Trứng & Sữa (Thuần chay)";
      description = "Món ăn có chứa cả Trứng và Sữa/Chế phẩm sữa — cảnh báo cần tránh theo trường phái Thuần chay.";
    } else if (isEggDietViolation) {
      compactDietText = "Chứa Trứng (Thuần chay)";
      description = "Món ăn có chứa Trứng — cảnh báo cần tránh theo trường phái Thuần chay.";
    } else {
      compactDietText = "Chứa Sữa (Thuần chay)";
      description = "Món ăn có chứa Sữa & Chế phẩm sữa — cảnh báo cần tránh theo trường phái Thuần chay.";
    }
  } else if (vegType === "lacto_vegetarian" && isEggDietViolation) {
    title = "⚠ Không phù hợp chế độ Chay có sữa (Lacto)";
    compactDietText = "Chứa Trứng (Chay có sữa)";
    description = "Món ăn có chứa Trứng — cảnh báo cần tránh Trứng theo trường phái Chay có sữa (chỉ cho phép dùng sữa và chế phẩm sữa).";
  } else if (vegType === "ovo_vegetarian" && isDairyDietViolation) {
    title = "⚠ Không phù hợp chế độ Chay có trứng (Ovo)";
    compactDietText = "Chứa Sữa (Chay có trứng)";
    description = "Món ăn có chứa Sữa & Chế phẩm sữa — cảnh báo cần tránh Sữa theo trường phái Chay có trứng (chỉ cho phép dùng trứng).";
  }

  // Danh sách tên dị ứng đầy đủ cho tooltip
  const fullAllergenNames = Array.from(
    new Set(userDeclaredMatches.map((a) => formatAllergy(a.id) || a.name))
  );

  // Danh sách tên dị ứng rút gọn (tránh tràn UI thẻ món ăn)
  const compactAllergenNames = Array.from(
    new Set(userDeclaredMatches.map((a) => formatCompactAllergy(a.id) || a.name))
  );

  let compactLabel = compactDietText;

  if (userDeclaredMatches.length > 0) {
    const fullText = fullAllergenNames.join(", ");
    if (!description) {
      title = "⚠ Cảnh báo dị ứng thực phẩm";
      description = `Món ăn có chứa thành phần bạn bị dị ứng: ${fullText}.`;
    } else {
      description += ` Ngoài ra món còn chứa thành phần dị ứng của bạn: ${fullText}.`;
    }

    if (compactDietText) {
      // Đã có vi phạm chế độ ăn chay, chỉ hiển thị tối đa 1 nhãn dị ứng ngắn gọn để không tràn card
      const allergyHead = compactAllergenNames[0];
      const remainingCount = compactAllergenNames.length - 1;
      const allergyCompact =
        remainingCount > 0 ? `${allergyHead} (+${remainingCount})` : allergyHead;
      compactLabel = `${compactDietText} • Dị ứng: ${allergyCompact}`;
    } else {
      // Không vi phạm chế độ ăn, hiển thị tối đa 2 nhãn dị ứng ngắn gọn
      const maxShow = 2;
      let allergyCompact = "";
      if (compactAllergenNames.length <= maxShow) {
        allergyCompact = compactAllergenNames.join(", ");
      } else {
        const head = compactAllergenNames.slice(0, maxShow).join(", ");
        const remaining = compactAllergenNames.length - maxShow;
        allergyCompact = `${head} (+${remaining})`;
      }
      compactLabel = `Dị ứng: ${allergyCompact}`;
    }
  }

  if (compact) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs max-w-full overflow-hidden shrink-0 ${className}`}
        title={description}
      >
        <AlertTriangle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
        <span className="truncate min-w-0">{compactLabel || title}</span>
      </span>
    );
  }

  return (
    <div
      className={`flex items-start gap-2.5 p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 text-xs shadow-2xs max-w-full ${className}`}
    >
      <div className="w-5 h-5 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
        <AlertTriangle className="w-3.5 h-3.5 stroke-[2.25]" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-amber-900">{title}</p>
        <p className="text-amber-800 mt-1 leading-relaxed break-words">
          {description}
        </p>
      </div>
    </div>
  );
}
