"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Dropzone } from "@/components/ui/Dropzone";
import { recipeApiService } from "@/features/recipes/services/recipeApiService";
import { apiClient } from "@/lib/apiClient";
import { LockedState, GatedSkeleton } from "@/components/ui/LockedState";
import { PremiumGuard } from "@/features/subscription/guards/PremiumGuard";
import { useRole } from "@/context/RoleContext";
import { photoScanService, DetectedIngredientItem } from "@/features/meal-planner/services/photoScanService";
import { profileService } from "@/features/profile/services/profileService";
import { tokenStorage } from "@/lib/tokenStorage";
import { RecipeAllergyBadge } from "@/features/recipes/components/RecipeAllergyBadge";
import { checkRecipeAllergy } from "@/features/allergy/utils/checkRecipeAllergy";
import { useProfile } from "@/features/profile/hooks/useProfile";
import {
  userIngredientService,
  UserIngredientItem,
  SystemIngredient,
} from "@/features/meal-planner/services/userIngredientService";

import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  Refrigerator,
  Sparkles,
  Camera,
  X,
  Search,
  Check,
  Utensils,
  Loader2,
  AlertTriangle,
  ShieldAlert,
} from "lucide-react";

/**
 * 1. Badge hiển thị độ tươi mới không icon, cố định theo kết quả hệ thống / AI
 */
function FreshnessBadge({ freshness }: { freshness?: string }) {
  const norm = (freshness || "").toLowerCase();
  if (norm === "aging" || norm === "use_soon" || norm.includes("dùng") || norm.includes("sớm")) {
    return (
      <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full whitespace-nowrap">
        Cần dùng ngay
      </span>
    );
  }
  if (norm === "spoiled" || norm === "expired" || norm.includes("hỏng") || norm.includes("héo") || norm.includes("hạn")) {
    return (
      <span className="text-[11px] font-semibold text-rose-800 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full whitespace-nowrap">
        Héo / Hỏng
      </span>
    );
  }
  return (
    <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full whitespace-nowrap">
      Tươi mới
    </span>
  );
}

/**
 * Chuẩn hóa tên nguyên liệu để so khớp chính xác với công thức trong database
 */
function cleanIngredientForComparison(name: string): string {
  if (!name) return "";
  return name
    .toLowerCase()
    .normalize("NFC")
    .replace(/\s*\([^)]*\)/g, "") // Bỏ (2 quả), (dứa), (sống), (100g)...
    .replace(/\b(các loại|tươi|khô|xay|chín|luộc|hấp|chiên|nấu|sống)\b/gi, "")
    .replace(/[.,;:!?'"#-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function isIngredientMatch(
  recipeIng: { id?: number; name: string },
  scannedIng: { id?: number; name: string }
): boolean {
  if (recipeIng.id && scannedIng.id && Number(recipeIng.id) === Number(scannedIng.id)) {
    return true;
  }

  const rn = cleanIngredientForComparison(recipeIng.name);
  const sn = cleanIngredientForComparison(scannedIng.name);
  if (!rn || !sn) return false;
  if (rn === sn) return true;

  const minLen = Math.min(rn.length, sn.length);
  if (minLen >= 4) {
    if ((rn === "thơm" && sn.includes("rau")) || (sn === "thơm" && rn.includes("rau"))) {
      return false;
    }
    if (rn.includes(sn) || sn.includes(rn)) {
      return true;
    }
  }

  return false;
}


interface UserAllergyState {
  names: string[];
  ids: Set<number>;
  isEggAllergic: boolean;
}

function getInitialUserAllergies(): UserAllergyState {
  if (typeof window === "undefined") {
    return { names: [], ids: new Set(), isEggAllergic: false };
  }
  try {
    const p = profileService.getProfile();
    const authUser = tokenStorage.getUser();
    const allergies = [...(p?.allergies || []), ...(authUser?.allergies || [])];
    const groups = p?.allergenGroups || [];
    const vegType = (p?.vegetarianType || (authUser as any)?.vegetarianType || "").toLowerCase().trim();
    const hasEgg =
      vegType === "vegan" ||
      vegType === "lacto_vegetarian" ||
      groups.some((g: string) => g.toUpperCase() === "EGG") ||
      allergies.some((a: string) => {
        const norm = (a || "").toLowerCase();
        return norm === "egg" || norm.includes("trứng");
      });
    return {
      names: Array.from(new Set(allergies)),
      ids: new Set<number>(),
      isEggAllergic: hasEgg,
    };
  } catch {
    return { names: [], ids: new Set(), isEggAllergic: false };
  }
}

function getRecipeAllergens(
  recipe: any,
  userAllergyNames: string[],
  userAllergyIds: Set<number>,
  isEggAllergic: boolean
): string[] {
  const detected: Set<string> = new Set();
  const titleLower = (recipe.title || "").toLowerCase();
  const descLower = (recipe.description || "").toLowerCase();

  const rIngredients: Array<{ id?: number; name: string }> = [];
  if (Array.isArray(recipe.recipe_ingredients)) {
    for (const ri of recipe.recipe_ingredients) {
      rIngredients.push({ id: ri.ingredient_id, name: ri.ingredient_name || "" });
    }
  } else if (typeof recipe.ingredients === "string") {
    const parts = recipe.ingredients.split(";").map((s: string) => s.trim()).filter(Boolean);
    const ids = typeof recipe.ingredient_ids === "string"
      ? recipe.ingredient_ids.split(",").map((s: string) => Number(s.trim())).filter(Boolean)
      : [];
    parts.forEach((p: string, idx: number) => {
      rIngredients.push({ id: ids[idx], name: p.replace(/\s*\([^)]*\).*/, "").trim() });
    });
  }

  // 1. Check by ingredient ID
  for (const ing of rIngredients) {
    if (ing.id && userAllergyIds.has(Number(ing.id))) {
      detected.add(ing.name || "Trứng gà");
    }
  }

  // 2. Check egg specifically if user has egg allergy
  if (isEggAllergic) {
    let eggFound = false;
    for (const ing of rIngredients) {
      if (ing.name.toLowerCase().includes("trứng")) {
        detected.add(ing.name || "Trứng gà");
        eggFound = true;
      }
    }
    if (!eggFound && (titleLower.includes("trứng") || descLower.includes("trứng"))) {
      detected.add("Trứng gà");
    }
  }

  // 3. Check other allergy names
  for (const aName of userAllergyNames) {
    const normA = aName.toLowerCase().trim();
    if (!normA) continue;
    const searchTerms: string[] = [normA];
    if (normA === "egg" || normA === "trứng") searchTerms.push("trứng");
    if (normA === "peanut" || normA === "đậu phộng" || normA === "lạc") searchTerms.push("đậu phộng", "lạc");
    if (normA === "soy" || normA === "đậu nành") searchTerms.push("đậu nành", "đậu hũ", "tàu hũ");
    if (normA === "gluten" || normA === "lúa mì") searchTerms.push("lúa mì", "gluten", "bột mì");
    if (normA === "dairy" || normA === "sữa") searchTerms.push("sữa", "phô mai", "bơ");
    if (normA === "fungi" || normA === "nấm") searchTerms.push("nấm");

    for (const ing of rIngredients) {
      const normIng = ing.name.toLowerCase();
      if (searchTerms.some((term) => normIng.includes(term) || term.includes(normIng))) {
        detected.add(ing.name);
      }
    }
  }

  return Array.from(detected);
}

function isIngredientAllergenMatch(
  ingName: string,
  ingId: number,
  allergies?: UserAllergyState
): string | null {
  if (!allergies) return null;
  const lowerName = (ingName || "").toLowerCase().trim();
  if (!lowerName) return null;

  // 1. Check ID
  if (allergies.ids && allergies.ids.has(Number(ingId))) {
    return ingName;
  }

  // 2. Egg check
  if (allergies.isEggAllergic && (lowerName.includes("trứng") || lowerName.includes("egg"))) {
    return "Trứng";
  }

  // 3. Name & Allergen group matches
  for (const aName of allergies.names || []) {
    const normA = aName.toLowerCase().trim();
    if (!normA) continue;

    // Peanut / Lạc
    if (
      (normA === "peanut" || normA === "đậu phộng" || normA === "lạc") &&
      (lowerName.includes("đậu phộng") || lowerName.includes("lạc") || lowerName.includes("bơ đậu phộng"))
    ) {
      return "Đậu phộng (Lạc)";
    }
    // Soy / Đậu nành
    if (
      (normA === "soy" || normA === "đậu nành") &&
      (lowerName.includes("đậu nành") || lowerName.includes("đậu phụ") || lowerName.includes("đậu hũ") || lowerName.includes("tàu hũ") || lowerName.includes("nước tương") || lowerName.includes("chao"))
    ) {
      return "Đậu nành & Đậu hũ";
    }
    // Gluten / Lúa mì
    if (
      (normA === "gluten" || normA === "lúa mì") &&
      (lowerName.includes("lúa mì") || lowerName.includes("gluten") || lowerName.includes("bột mì") || lowerName.includes("bánh mì") || lowerName.includes("mì sợi"))
    ) {
      return "Gluten / Lúa mì";
    }
    // Dairy / Sữa
    if (
      (normA === "dairy" || normA === "sữa") &&
      (lowerName.includes("sữa") || lowerName.includes("phô mai") || lowerName.includes("bơ") || lowerName.includes("váng sữa"))
    ) {
      return "Sữa & Chế phẩm";
    }
    // Tree nuts / Hạt cây
    if (
      (normA === "tree_nuts" || normA === "hạt cây") &&
      (lowerName.includes("hạt điều") || lowerName.includes("hạnh nhân") || lowerName.includes("óc chó") || lowerName.includes("hồ đào") || lowerName.includes("macca"))
    ) {
      return "Hạt cây";
    }
    // Sesame / Mè
    if (
      (normA === "sesame" || normA === "mè") &&
      (lowerName.includes("mè") || lowerName.includes("vừng"))
    ) {
      return "Mè & Hạt gieo";
    }
    // Fungi / Nấm
    if (
      (normA === "fungi" || normA === "nấm") &&
      lowerName.includes("nấm")
    ) {
      return "Nấm";
    }
    // Corn / Bắp
    if (
      (normA === "corn" || normA === "bắp" || normA === "ngô") &&
      (lowerName.includes("bắp") || lowerName.includes("ngô"))
    ) {
      return "Bắp (Ngô)";
    }
    // Direct match
    if (lowerName.includes(normA) || normA.includes(lowerName)) {
      return aName;
    }
  }

  return null;
}


interface MatchedRecipeItem {
  recipe: any;
  matchedCount: number;
  totalCount: number;
  matchPercentage: number;
  matchedIngredientNames: string[];
  missingIngredientNames: string[];
}

function computeMatchedRecipes(
  ingredientsToMatch: Array<{ id?: number; name: string }>,
  dbRecipes: any[]
): MatchedRecipeItem[] {
  if (!ingredientsToMatch || ingredientsToMatch.length === 0 || !dbRecipes || dbRecipes.length === 0) {
    return [];
  }

  const list: MatchedRecipeItem[] = [];

  for (const r of dbRecipes) {
    const rIngredients: Array<{ id?: number; name: string }> = [];

    if (Array.isArray(r.recipe_ingredients) && r.recipe_ingredients.length > 0) {
      for (const ri of r.recipe_ingredients) {
        rIngredients.push({
          id: ri.ingredient_id,
          name: ri.ingredient_name || `Nguyên liệu #${ri.ingredient_id}`,
        });
      }
    } else if (typeof r.ingredients === "string" && r.ingredients.trim()) {
      const parts = r.ingredients.split(";").map((s: string) => s.trim()).filter(Boolean);
      const ids = typeof r.ingredient_ids === "string"
        ? r.ingredient_ids.split(",").map((s: string) => Number(s.trim())).filter(Boolean)
        : [];

      parts.forEach((p: string, idx: number) => {
        const rawName = p.replace(/\s*\([^)]*\).*/, "").trim();
        rIngredients.push({
          id: ids[idx],
          name: rawName,
        });
      });
    }

    if (rIngredients.length === 0) continue;

    const matchedIngredientNames: string[] = [];
    const missingIngredientNames: string[] = [];

    for (const rIng of rIngredients) {
      const isMatched = ingredientsToMatch.some((sIng) => isIngredientMatch(rIng, sIng));
      if (isMatched) {
        matchedIngredientNames.push(rIng.name);
      } else {
        missingIngredientNames.push(rIng.name);
      }
    }

    const totalCount = rIngredients.length;
    const matchedCount = matchedIngredientNames.length;
    const matchPercentage = totalCount > 0 ? Math.round((matchedCount / totalCount) * 100) : 0;

    if (matchedCount > 0) {
      list.push({
        recipe: r,
        matchedCount,
        totalCount,
        matchPercentage,
        matchedIngredientNames,
        missingIngredientNames,
      });
    }
  }

  // Quy tắc xếp hạng: Trùng càng nhiều xếp càng trước (ví dụ 5/6 xếp đầu, 4/6 xếp sau)
  list.sort((a, b) => {
    if (b.matchedCount !== a.matchedCount) {
      return b.matchedCount - a.matchedCount;
    }
    if (b.matchPercentage !== a.matchPercentage) {
      return b.matchPercentage - a.matchPercentage;
    }
    return a.totalCount - b.totalCount;
  });

  return list;
}

/**
 * Component hiển thị danh sách công thức phù hợp xếp hạng theo số nguyên liệu trùng
 */
function RecipeMatchList({
  title = "Công thức phù hợp",
  subtitle = "Xếp hạng theo số nguyên liệu trùng (trùng nhiều nhất lên đầu)",
  matchedRecipes,
  loading = false,
  emptyMessage = "Chưa tìm thấy công thức nào khớp với các nguyên liệu này.",
  userAllergies,
}: {
  title?: string;
  subtitle?: string;
  matchedRecipes: MatchedRecipeItem[];
  loading?: boolean;
  emptyMessage?: string;
  userAllergies?: UserAllergyState;
}) {
  const PAGE_SIZE = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const listTopRef = React.useRef<HTMLDivElement>(null);
  const { profile } = useProfile();

  // Khi danh sách công thức thay đổi (ví dụ người dùng thêm/bớt nguyên liệu), reset về trang 1
  useEffect(() => {
    setCurrentPage(1);
  }, [matchedRecipes]);

  const totalCount = matchedRecipes.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const safePage = Math.min(Math.max(1, currentPage), totalPages);
  const startIndex = (safePage - 1) * PAGE_SIZE;
  const endIndex = Math.min(startIndex + PAGE_SIZE, totalCount);
  const currentRecipes = matchedRecipes.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== safePage) {
      setCurrentPage(newPage);
      listTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const getPaginationPages = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (safePage <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    }
    if (safePage >= totalPages - 3) {
      return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, "...", safePage - 1, safePage, safePage + 1, "...", totalPages];
  };

  return (
    <div ref={listTopRef} className="space-y-5 pt-4 border-t border-stone-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="font-serif font-bold text-xl text-stone-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <span>{title}</span>
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">{subtitle}</p>
        </div>
        <span className="text-xs font-semibold px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full w-fit">
          Tìm thấy {totalCount} công thức có nguyên liệu trùng{totalPages > 1 ? ` (Trang ${safePage}/${totalPages})` : ""}
        </span>
      </div>

      {loading ? (
        <div className="p-8 bg-stone-50 rounded-2xl border border-stone-200 flex items-center justify-center gap-2 text-stone-500 text-xs">
          <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
          <span>Đang đối chiếu nguyên liệu với công thức trong hệ thống...</span>
        </div>
      ) : matchedRecipes.length === 0 ? (
        <Card className="p-8 text-center text-xs text-stone-500 border-dashed">
          {emptyMessage}
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {currentRecipes.map((item) => {
              const {
                recipe,
                matchedCount,
                totalCount,
                matchPercentage,
                matchedIngredientNames,
                missingIngredientNames,
              } = item;
              const isFullMatch = matchedCount === totalCount && totalCount > 0;

              const allergyResult = checkRecipeAllergy(recipe, profile);
              const legacyAllergens = getRecipeAllergens(
                recipe,
                userAllergies?.names || [],
                userAllergies?.ids || new Set(),
                userAllergies?.isEggAllergic || false
              );
              const allergensInRecipe: string[] = Array.from(new Set([...allergyResult.allergens, ...legacyAllergens]));
              const hasAllergy = allergensInRecipe.length > 0;

              return (
                <Link
                  key={recipe.recipe_id}
                  href={`/recipes/${recipe.recipe_id}`}
                  className="group block"
                >
                  <Card className={`overflow-hidden transition-all flex flex-col h-full ${hasAllergy
                      ? "border-2 border-amber-400 bg-amber-50/30 shadow-md ring-2 ring-amber-300/60 hover:border-amber-500"
                      : "hover:border-emerald-500 hover:shadow-md"
                    }`}>
                    <div className="relative h-44 w-full bg-stone-100 overflow-hidden">
                      {recipe.image_url ? (
                        <img
                          src={recipe.image_url}
                          alt={recipe.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-stone-300">
                          <Utensils className="w-10 h-10" />
                        </div>
                      )}

                      <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-extrabold shadow-sm flex items-center gap-1 ${isFullMatch
                              ? "bg-emerald-600 text-white"
                              : matchedCount >= 2
                                ? "bg-emerald-700 text-white"
                                : "bg-stone-900/80 backdrop-blur-xs text-white"
                            }`}
                        >
                          {isFullMatch ? "✓ Đủ " : "Trùng "}
                          {matchedCount}/{totalCount} nguyên liệu
                        </span>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-white/90 text-stone-800 shadow-xs">
                          Khớp {matchPercentage}%
                        </span>
                      </div>

                      {recipe.meal_type && (
                        <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium">
                          {recipe.meal_type}
                        </span>
                      )}
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="mb-2">
                          <RecipeAllergyBadge recipe={recipe} compact />
                        </div>

                        <h4 className="font-bold text-stone-900 text-base line-clamp-1 group-hover:text-emerald-700 transition-colors">
                          {recipe.title}
                        </h4>
                        <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                          {recipe.description || "Công thức món chay bổ dưỡng, thanh đạm."}
                        </p>
                      </div>

                      <div className="space-y-1.5 pt-2 border-t border-stone-100">
                        {matchedIngredientNames.length > 0 && (
                          <div className="text-xs">
                            <span className="text-emerald-700 font-bold block mb-1">
                              ✓ Đã có ({matchedCount}):
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {matchedIngredientNames.slice(0, 4).map((name, i) => {
                                const isEggChip = name.toLowerCase().includes("trứng");
                                const isAllergenChip =
                                  (userAllergies?.isEggAllergic && isEggChip) ||
                                  allergensInRecipe.some((a) => name.toLowerCase().includes(a.toLowerCase()));

                                return (
                                  <span
                                    key={i}
                                    className={`inline-block text-[11px] px-2.5 py-1 rounded-md font-bold border transition-colors ${isAllergenChip
                                        ? "bg-amber-100 text-amber-950 border-amber-400 ring-1 ring-amber-300 shadow-2xs"
                                        : "bg-emerald-50 text-emerald-800 border-emerald-200/80 font-medium"
                                      }`}
                                  >
                                    {isAllergenChip ? `⚠ ${name}` : name}
                                  </span>
                                );
                              })}
                              {matchedIngredientNames.length > 4 && (
                                <span className="text-[11px] text-stone-400 font-medium self-center">
                                  +{matchedIngredientNames.length - 4}
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        {missingIngredientNames.length > 0 && (
                          <div className="text-xs">
                            <span className="text-stone-400 font-medium block mb-1">
                              Thiếu ({missingIngredientNames.length}):
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {missingIngredientNames.slice(0, 3).map((name, i) => {
                                const isEggMissing = name.toLowerCase().includes("trứng");
                                const isAllergenMissing =
                                  (userAllergies?.isEggAllergic && isEggMissing) ||
                                  allergensInRecipe.some((a) => name.toLowerCase().includes(a.toLowerCase()));

                                return (
                                  <span
                                    key={i}
                                    className={`inline-block text-[11px] px-2 py-0.5 rounded-md ${isAllergenMissing
                                        ? "bg-amber-100 text-amber-950 border border-amber-400 font-bold"
                                        : "bg-stone-100 text-stone-600"
                                      }`}
                                  >
                                    {isAllergenMissing ? `⚠ ${name}` : name}
                                  </span>
                                );
                              })}
                              {missingIngredientNames.length > 3 && (
                                <span className="text-[11px] text-stone-400 font-medium self-center">
                                  +{missingIngredientNames.length - 3}
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                        <span>{recipe.calories ? `~${Math.round(Number(recipe.calories) * 100) / 100} kcal` : "Chuẩn dinh dưỡng"}</span>
                        <span className="flex items-center gap-1 font-semibold text-emerald-700 group-hover:translate-x-0.5 transition-transform">
                          Xem cách nấu <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-stone-200 text-xs text-stone-600">
              <div>
                Hiển thị <span className="font-bold text-stone-900">{startIndex + 1}</span> -{" "}
                <span className="font-bold text-stone-900">{endIndex}</span> trong tổng số{" "}
                <span className="font-bold text-stone-900">{totalCount}</span> công thức
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handlePageChange(safePage - 1)}
                  disabled={safePage === 1}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-medium text-xs shadow-2xs"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Trước</span>
                </button>

                <div className="flex items-center gap-1">
                  {getPaginationPages().map((pageItem, idx) => {
                    if (pageItem === "...") {
                      return (
                        <span key={`ellipsis-${idx}`} className="px-2 py-1 text-stone-400">
                          ...
                        </span>
                      );
                    }
                    const pageNum = pageItem as number;
                    const isActive = pageNum === safePage;
                    return (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => handlePageChange(pageNum)}
                        className={`min-w-8 h-8 px-2 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center ${isActive
                            ? "bg-emerald-700 text-white shadow-xs"
                            : "border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 hover:text-emerald-700"
                          }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => handlePageChange(safePage + 1)}
                  disabled={safePage === totalPages}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-medium text-xs shadow-2xs"
                >
                  <span>Sau</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

/**
 * 3. Quản lý Tủ lạnh của tôi
 */
function PantryManager({
  onOpenScan,
  dbRecipes,
  loadingRecipes,
  userAllergies,
}: {
  onOpenScan?: () => void;
  dbRecipes: any[];
  loadingRecipes: boolean;
  userAllergies?: UserAllergyState;
}) {
  const [myIngredients, setMyIngredients] = useState<UserIngredientItem[]>([]);
  const [systemIngredients, setSystemIngredients] = useState<SystemIngredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Form state: CHỈ CẦN TÊN (chọn nguyên liệu có sẵn trong database)
  const [selectedIngredientId, setSelectedIngredientId] = useState<number | null>(null);
  const [ingredientSearch, setIngredientSearch] = useState<string>("");
  const [hideAllergens, setHideAllergens] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [pantry, sys] = await Promise.all([
        userIngredientService.getMyIngredients(),
        userIngredientService.getSystemIngredients(),
      ]);
      setMyIngredients(pantry);
      setSystemIngredients(sys);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Thêm nguyên liệu chỉ bằng tên có sẵn trong DB
  const handleAddIngredient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedIngredientId) return;

    setIsAdding(true);
    try {
      const sysDetail = systemIngredients.find((i) => i.ingredient_id === selectedIngredientId);
      const added = await userIngredientService.addIngredient({
        ingredient_id: selectedIngredientId,
        quantity: 200,
        unit: sysDetail?.unit || "g",
        freshness_status: "fresh",
      });
      if (sysDetail) {
        added.ingredient = {
          ingredient_id: sysDetail.ingredient_id,
          ingredient_name: sysDetail.ingredient_name,
          unit: sysDetail.unit,
          vegan_flag: sysDetail.vegan_flag,
          calories_per_100g: sysDetail.calories_per_100g,
        };
      }
      setMyIngredients((prev) => [added, ...prev.filter((i) => i.user_ingredient_id !== added.user_ingredient_id)]);
      setModalOpen(false);
      setSelectedIngredientId(null);
      setIngredientSearch("");
    } finally {
      setIsAdding(false);
    }
  };

  const handleRemove = async (id: number) => {
    setMyIngredients((prev) => prev.filter((i) => i.user_ingredient_id !== id));
    await userIngredientService.removeIngredient(id);
  };

  // Tính toán công thức trùng khớp dựa trên nguyên liệu trong tủ lạnh
  const pantryIngredientsForMatch = useMemo(() => {
    return myIngredients.map((item) => ({
      id: item.ingredient_id,
      name: item.ingredient?.ingredient_name || "",
    }));
  }, [myIngredients]);

  const matchedPantryRecipes = useMemo(() => {
    return computeMatchedRecipes(pantryIngredientsForMatch, dbRecipes);
  }, [pantryIngredientsForMatch, dbRecipes]);

  const effectiveAllergies = useMemo<UserAllergyState>(() => {
    if (userAllergies && (userAllergies.isEggAllergic || userAllergies.names.length > 0 || userAllergies.ids.size > 0)) {
      return userAllergies;
    }
    return getInitialUserAllergies();
  }, [userAllergies]);

  const hasConfiguredAllergies =
    effectiveAllergies.names.length > 0 ||
    effectiveAllergies.isEggAllergic ||
    effectiveAllergies.ids.size > 0;

  const filteredSystemIngredients = useMemo(() => {
    const searchLower = ingredientSearch.toLowerCase().trim();
    return systemIngredients.filter((i) => {
      const matchSearch = (i.ingredient_name || "").toLowerCase().includes(searchLower);
      if (!matchSearch) return false;
      if (hideAllergens && hasConfiguredAllergies) {
        const allergen = isIngredientAllergenMatch(i.ingredient_name, i.ingredient_id, effectiveAllergies);
        if (allergen) return false;
      }
      return true;
    });
  }, [systemIngredients, ingredientSearch, hideAllergens, hasConfiguredAllergies, effectiveAllergies]);

  return (
    <div className="space-y-8">
      {/* Top Banner & Quick Action (Đã xoá nút gợi ý AI từ tủ lạnh) */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-stone-50 border border-emerald-200/80 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Refrigerator className="w-7 h-7" />
          </div>
          <div>
            <h2 className="font-serif font-bold text-2xl text-stone-900 tracking-tight">
              Tủ lạnh thông minh của bạn
            </h2>
            <p className="text-stone-600 text-sm mt-0.5">
              Tự động cập nhật nguyên liệu trong bếp. Hệ thống AI sẽ đề xuất các món chay dinh dưỡng phù hợp nhất từ những gì bạn đang có.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 h-11 px-5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm nguyên liệu</span>
          </button>
        </div>
      </div>

      {/* Ingredients Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif font-bold text-xl text-stone-900">
            Nguyên liệu trong tủ ({myIngredients.length})
          </h3>
          <span className="text-xs text-stone-500 bg-stone-100 px-3 py-1 rounded-full font-medium">
            Tự động cập nhật vào hệ thống
          </span>
        </div>

        {loading ? (
          <div className="p-12 flex flex-col items-center justify-center space-y-3 bg-stone-50 rounded-3xl border border-stone-200">
            <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
            <p className="text-sm text-stone-500">Đang tải tủ lạnh của bạn...</p>
          </div>
        ) : myIngredients.length === 0 ? (
          <Card className="p-10 text-center flex flex-col items-center justify-center border-dashed border-2 border-stone-200">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
              <Refrigerator className="w-6 h-6" />
            </div>
            <p className="font-serif font-bold text-lg text-stone-800">Tủ lạnh của bạn đang trống</p>
            <p className="text-xs text-stone-500 max-w-sm mt-1 mb-4">
              Hãy thêm những thực phẩm chay bạn đang có (đậu hũ, rau củ, cà rốt, khoai tây...) để hệ thống gợi ý công thức phù hợp ngay bên dưới.
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="px-4 h-10 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              + Thêm nguyên liệu đầu tiên
            </button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {myIngredients.map((item) => {
              const name = item.ingredient?.ingredient_name || `Nguyên liệu #${item.ingredient_id}`;
              return (
                <Card
                  key={item.user_ingredient_id}
                  className="p-4 hover:border-emerald-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-xs font-bold text-stone-400 font-mono">
                        #{item.ingredient_id}
                      </span>
                      <FreshnessBadge freshness={item.freshness_status} />
                    </div>
                    <h4 className="font-semibold text-stone-900 text-base line-clamp-1">
                      {name}
                    </h4>
                    {(() => {
                      const allergenHit = isIngredientAllergenMatch(name, item.ingredient_id, effectiveAllergies);
                      if (!allergenHit) return null;
                      return (
                        <div className="mt-2 py-1 px-2 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-[11px] font-bold flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                          <span>Cảnh báo nguyên liệu: {allergenHit}</span>
                        </div>
                      );
                    })()}
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-end text-xs text-stone-400">
                    <button
                      type="button"
                      onClick={() => handleRemove(item.user_ingredient_id)}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-stone-400 hover:text-red-600 transition-colors cursor-pointer"
                      title="Xóa khỏi tủ lạnh"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. Đề xuất các công thức có trong DB chứa nguyên liệu trong tủ lạnh */}
      {myIngredients.length > 0 && (
        <RecipeMatchList
          title="Công thức phù hợp từ tủ lạnh"
          subtitle="Xếp hạng theo số nguyên liệu bạn đang có trong tủ lạnh (trùng nhiều nhất lên đầu)"
          matchedRecipes={matchedPantryRecipes}
          loading={loadingRecipes}
          emptyMessage="Chưa tìm thấy công thức nào khớp với các nguyên liệu trong tủ lạnh của bạn. Hãy thêm thêm nguyên liệu."
          userAllergies={effectiveAllergies}
        />
      )}

      {/* Modal thêm nguyên liệu: CHỈ CẦN TÊN, CHỈ CHỌN NGUYÊN LIỆU TRONG DB */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 relative max-h-[90vh] flex flex-col">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif font-bold text-xl text-stone-900 mb-1">
              Thêm nguyên liệu vào tủ lạnh
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              Chọn nguyên liệu chuẩn có sẵn trong cơ sở dữ liệu hệ thống
            </p>

            <form onSubmit={handleAddIngredient} className="space-y-4 flex-1 overflow-y-auto pr-1">
              {/* Cảnh báo liên kết dị ứng hồ sơ thông minh */}
              {hasConfiguredAllergies && (
                <div className="p-3 bg-amber-50/90 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-1.5 animate-in fade-in">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 font-bold text-amber-800">
                      <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Hồ sơ có dị ứng: {effectiveAllergies.names.join(", ") || (effectiveAllergies.isEggAllergic ? "Trứng" : "")}</span>
                    </div>
                    <label className="flex items-center gap-1.5 text-[11px] font-bold text-amber-900 cursor-pointer select-none bg-amber-100/90 px-2 py-0.5 rounded-lg border border-amber-300">
                      <input
                        type="checkbox"
                        checked={hideAllergens}
                        onChange={(e) => setHideAllergens(e.target.checked)}
                        className="w-3.5 h-3.5 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                      />
                      <span>Tự động ẩn</span>
                    </label>
                  </div>
                  <p className="text-[11px] text-amber-700 leading-relaxed">
                    {hideAllergens
                      ? "Hệ thống tự động ẩn các thực phẩm chứa chất dị ứng theo hồ sơ của bạn để tránh chọn nhầm."
                      : "Đang hiển thị cả nguyên liệu dị ứng (kèm nhãn đỏ). Hãy cân nhắc kỹ trước khi thêm vào tủ lạnh!"}
                  </p>
                </div>
              )}

              {/* Tìm kiếm và chọn nguyên liệu */}
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Tên nguyên liệu trong hệ thống *
                </label>
                <div className="relative mb-2">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Tìm theo tên nguyên liệu (đậu hũ, nấm, cà rốt, khoai tây...)"
                    value={ingredientSearch}
                    onChange={(e) => setIngredientSearch(e.target.value)}
                    className="w-full h-10 pl-9 pr-3 rounded-xl border border-stone-200 text-sm focus:outline-emerald-600"
                    autoFocus
                  />
                </div>

                <div className="border border-stone-200 rounded-2xl max-h-60 overflow-y-auto divide-y divide-stone-100 bg-stone-50/50">
                  {filteredSystemIngredients.slice(0, 50).map((ing) => {
                    const allergenMatch = isIngredientAllergenMatch(ing.ingredient_name, ing.ingredient_id, effectiveAllergies);
                    const isSelected = selectedIngredientId === ing.ingredient_id;
                    return (
                      <button
                        key={ing.ingredient_id}
                        type="button"
                        onClick={() => {
                          if (allergenMatch) {
                            const ok = window.confirm(
                              `CẢNH BÁO AN TOÀN:\nBạn đã khai báo dị ứng với "${allergenMatch}" trong hồ sơ sức khỏe.\n\nBạn có chắc chắn vẫn muốn thêm "${ing.ingredient_name}" vào tủ lạnh không?`
                            );
                            if (!ok) return;
                          }
                          setSelectedIngredientId(ing.ingredient_id);
                        }}
                        className={`w-full px-3.5 py-2.5 text-left text-xs flex items-center justify-between transition-colors cursor-pointer ${allergenMatch
                            ? isSelected
                              ? "bg-rose-100 border border-rose-300 font-bold text-rose-950"
                              : "bg-rose-50/70 hover:bg-rose-100/80 text-rose-900 border-b border-rose-100"
                            : isSelected
                              ? "bg-emerald-100/80 font-bold text-emerald-950"
                              : "hover:bg-emerald-50 text-stone-700"
                          }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{ing.ingredient_name}</span>
                          {allergenMatch && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-100 text-rose-700 border border-rose-300 flex items-center gap-0.5">
                              <AlertTriangle className="w-3 h-3 text-rose-600" />
                              Dị ứng: {allergenMatch}
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-stone-400">
                          {ing.unit} · {ing.calories_per_100g ? `~${Math.round(Number(ing.calories_per_100g) * 100) / 100} kcal/100g` : "Chuẩn chay"}
                        </span>
                      </button>
                    );
                  })}
                  {filteredSystemIngredients.length === 0 && (
                    <p className="p-4 text-center text-xs text-stone-400">Không tìm thấy nguyên liệu phù hợp trong cơ sở dữ liệu.</p>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 h-10 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={!selectedIngredientId || isAdding}
                  className="px-5 h-10 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {isAdding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                  <span>Lưu vào tủ lạnh</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function ScanContent() {
  const [activeTab, setActiveTab] = useState<"pantry" | "scan">("pantry");

  const [userAllergies, setUserAllergies] = useState<UserAllergyState>(getInitialUserAllergies);

  useEffect(() => {
    async function loadAllergies() {
      try {
        const res = await apiClient.get<any>("/users/me/allergies");
        const list = res?.ingredients || [];
        const ids = new Set<number>(list.map((i: any) => Number(i.ingredient_id)));
        const names: string[] = list.map((i: any) => i.ingredient_name || "").filter(Boolean);
        const groups: string[] = res?.allergen_groups || [];
        const hasEgg =
          groups.some((g: string) => g.toUpperCase() === "EGG") ||
          ids.has(185) ||
          ids.has(186) ||
          names.some((n: string) => n.toLowerCase().includes("trứng") || n.toLowerCase().includes("egg"));

        setUserAllergies((prev) => ({
          names: names.length > 0 ? names : prev.names,
          ids,
          isEggAllergic: hasEgg || prev.isEggAllergic,
        }));
      } catch (err) {
        console.warn("Could not load user allergies from /users/me/allergies:", err);
        try {
          const profile = await profileService.fetchServerProfile();
          const hasEgg =
            profile.allergenGroups?.some((g: string) => g.toUpperCase() === "EGG") ||
            profile.allergies?.some((a: string) => a.toLowerCase().includes("trứng") || a.toLowerCase() === "egg");
          setUserAllergies((prev) => ({
            names: profile.allergies?.length ? profile.allergies : prev.names,
            ids: prev.ids,
            isEggAllergic: Boolean(hasEgg || prev.isEggAllergic),
          }));
        } catch {
          // ignore
        }
      }
    }
    loadAllergies();
  }, []);

  const [scanned, setScanned] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);
  const [uploadedPreview, setUploadedPreview] = useState<string | null>(null);
  const [detectedItems, setDetectedItems] = useState<DetectedIngredientItem[]>([]);
  const [isSavingToPantry, setIsSavingToPantry] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Danh sách toàn bộ công thức đã duyệt từ DB
  const [dbRecipes, setDbRecipes] = useState<any[]>([]);
  const [loadingRecipes, setLoadingRecipes] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadRecipes() {
      setLoadingRecipes(true);
      try {
        const res = await recipeApiService.getRecipes({ limit: 1000 });
        const list = Array.isArray(res) ? res : res?.data || res?.items || [];
        if (isMounted) {
          setDbRecipes(list);
        }
      } catch (err) {
        console.error("Lỗi khi tải công thức từ database:", err);
      } finally {
        if (isMounted) setLoadingRecipes(false);
      }
    }
    loadRecipes();
    return () => {
      isMounted = false;
    };
  }, []);

  // Gọi API AI Scan ảnh thực tế (POST /api/v1/meal-plans/scan/detect)
  const handleFileAccepted = async (file: File) => {
    if (!file) return;
    setIsScanning(true);
    setScanError(null);
    setSaveSuccessMsg(null);
    setUploadedPreview(URL.createObjectURL(file));

    try {
      const res = await photoScanService.detect(file);
      if (res && res.items && res.items.length > 0) {
        setDetectedItems(
          res.items.map((it) => ({
            ...it,
            selected: true,
            quantity: 200,
          }))
        );
        setScanned(true);
      } else {
        setScanError(
          res?.message ||
          "Không nhận diện được nguyên liệu thực phẩm nào trong ảnh. Hãy chụp gần hơn và đủ sáng!"
        );
      }
    } catch (err: any) {
      console.error("Lỗi khi quét ảnh AI:", err);
      const msg = err?.message || err?.details?.[0];
      setScanError(
        msg ||
        "Lỗi khi gửi ảnh lên AI nhận diện. Vui lòng kiểm tra file ảnh và thử lại!"
      );
    } finally {
      setIsScanning(false);
    }
  };

  // Xác nhận lưu các nguyên liệu đã quét vào Tủ lạnh
  const handleConfirmToPantry = async () => {
    const toSave = detectedItems.filter((i) => i.selected);
    if (toSave.length === 0) {
      alert("Vui lòng chọn ít nhất một nguyên liệu để thêm vào tủ lạnh.");
      return;
    }

    setIsSavingToPantry(true);
    try {
      for (const item of toSave) {
        const ingId = item.ingredient?.ingredient_id || 1;
        await userIngredientService.addIngredient({
          ingredient_id: ingId,
          quantity: item.quantity || 200,
          unit: item.ingredient?.unit || "g",
          freshness_status: item.freshness_status || "fresh",
        });
      }

      setSaveSuccessMsg(`Đã lưu thành công ${toSave.length} nguyên liệu vào Tủ lạnh của bạn!`);
      setTimeout(() => {
        setSaveSuccessMsg(null);
        setActiveTab("pantry");
      }, 1500);
    } catch (err: any) {
      alert("Lỗi khi lưu vào tủ lạnh: " + (err?.message || "Vui lòng thử lại"));
    } finally {
      setIsSavingToPantry(false);
    }
  };

  // Danh sách nguyên liệu quét được đã chọn
  const selectedScanned = useMemo(() => {
    return detectedItems
      .filter((it) => it.selected !== false)
      .map((it) => ({
        id: it.ingredient?.ingredient_id,
        name: it.ingredient?.ingredient_name || it.detected_name || "",
      }));
  }, [detectedItems]);

  // Xếp hạng công thức dựa trên số lượng nguyên liệu trùng khớp từ ảnh quét
  const matchedScanRecipes: MatchedRecipeItem[] = useMemo(() => {
    return computeMatchedRecipes(selectedScanned, dbRecipes);
  }, [selectedScanned, dbRecipes]);

  return (
    <div className="space-y-6">
      {/* Tab Switcher */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-3">
        <button
          onClick={() => setActiveTab("pantry")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${activeTab === "pantry"
              ? "bg-emerald-700 text-white shadow-xs"
              : "text-stone-600 hover:bg-stone-100"
            }`}
        >
          <Refrigerator className="w-4 h-4" />
          <span>Tủ lạnh của tôi</span>
        </button>
        <button
          onClick={() => setActiveTab("scan")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${activeTab === "scan"
              ? "bg-emerald-700 text-white shadow-xs"
              : "text-stone-600 hover:bg-stone-100"
            }`}
        >
          <Camera className="w-4 h-4" />
          <span>Quét ảnh AI & Nhận diện</span>
        </button>
      </div>

      {activeTab === "pantry" ? (
        <PantryManager
          onOpenScan={() => setActiveTab("scan")}
          dbRecipes={dbRecipes}
          loadingRecipes={loadingRecipes}
          userAllergies={userAllergies}
        />
      ) : (
        <div className="space-y-8 animate-in fade-in">
          {/* Thông báo thành công */}
          {saveSuccessMsg && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-semibold text-sm flex items-center gap-2 animate-in fade-in">
              <Check className="w-5 h-5 text-emerald-600" />
              <span>{saveSuccessMsg}</span>
            </div>
          )}

          {/* Lỗi scan nếu có */}
          {scanError && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center justify-between gap-3 animate-in fade-in">
              <span>{scanError}</span>
              <button
                type="button"
                onClick={() => setScanError(null)}
                className="text-stone-400 hover:text-stone-700 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Upload / Scan zone */}
            <div className="space-y-4">
              <div className="relative">
                <Dropzone
                  label={scanned ? "Quét ảnh khác bằng AI" : "Chụp hoặc tải ảnh tủ lạnh / rau củ"}
                  hint="Hỗ trợ JPG, PNG, WEBP — AI Gemini chỉ nhận diện nguyên liệu thực vật / thuần chay"
                  accept="image/jpeg,image/png,image/webp"
                  onFileAccepted={handleFileAccepted}
                  ctaLabel="Chọn ảnh để AI quét"
                />

                {isScanning && (
                  <div className="absolute inset-0 bg-white/85 backdrop-blur-xs rounded-3xl flex flex-col items-center justify-center gap-3 z-10 animate-in fade-in">
                    <Loader2 className="w-9 h-9 animate-spin text-emerald-600" />
                    <div className="text-center">
                      <p className="font-bold text-sm text-stone-800">Gemini AI đang phân tích ảnh...</p>
                      <p className="text-xs text-stone-500 mt-0.5">Nhận diện rau củ quả thuần chay và đối chiếu với cơ sở dữ liệu</p>
                    </div>
                  </div>
                )}
              </div>

              {uploadedPreview && (
                <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-stone-200 bg-stone-100">
                  <img
                    src={uploadedPreview}
                    alt="Ảnh chụp tủ lạnh"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium">
                    Ảnh đang phân tích
                  </span>
                </div>
              )}
            </div>

            {/* Detected ingredients list */}
            {scanned ? (
              <Card className="p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <div>
                    <h3 className="font-bold text-stone-900 text-base flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      Nguyên liệu AI đã phát hiện
                    </h3>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Chọn nguyên liệu và kiểm tra độ tươi mới để đưa vào tủ lạnh
                    </p>
                  </div>
                  <span className="text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full font-bold">
                    {detectedItems.length} nguyên liệu
                  </span>
                </div>

                <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1">
                  {detectedItems.map((item, idx) => {
                    const itemName = item.ingredient?.ingredient_name || item.detected_name || "";
                    const isEgg = itemName.toLowerCase().includes("trứng");
                    const isAllergen =
                      item.warnings?.includes("allergen") ||
                      (isEgg && userAllergies.isEggAllergic) ||
                      userAllergies.ids.has(item.ingredient?.ingredient_id || 0) ||
                      userAllergies.names.some((a) => itemName.toLowerCase().includes(a.toLowerCase()));

                    const allergenLabel =
                      item.allergen_name || (isEgg ? "Trứng gà" : itemName);

                    return (
                      <div
                        key={idx}
                        className={`flex items-center justify-between gap-3 border rounded-2xl p-3 transition-colors ${isAllergen
                            ? "bg-amber-50/90 border-amber-400 ring-1 ring-amber-300 shadow-xs"
                            : item.selected
                              ? "bg-emerald-50/40 border-emerald-200"
                              : "bg-stone-50/60 border-stone-200 opacity-60"
                          }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <input
                            type="checkbox"
                            checked={item.selected ?? true}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              setDetectedItems((prev) =>
                                prev.map((it, i) => (i === idx ? { ...it, selected: checked } : it))
                              );
                            }}
                            className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                          />
                          <div className="min-w-0">
                            <p className="text-xs sm:text-sm font-bold text-stone-900 truncate">
                              {itemName}
                            </p>
                            {isAllergen ? (
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-[11px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-md border border-amber-300 flex items-center gap-1">
                                  <AlertTriangle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                                  <span>Thành phần dị ứng: {allergenLabel}</span>
                                </span>
                              </div>
                            ) : item.warnings && item.warnings.length > 0 ? (
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                                  ⚠ {item.warnings.includes("allergen") ? "Dị ứng" : "Nguyên liệu mặn"}
                                </span>
                              </div>
                            ) : null}
                          </div>
                        </div>

                        {/* 1. Status tươi mới */}
                        <div className="shrink-0">
                          <FreshnessBadge freshness={item.freshness_status} />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs text-stone-500">
                    Đã chọn: <strong className="text-stone-800">{detectedItems.filter((i) => i.selected).length}</strong> nguyên liệu
                  </span>
                  <button
                    type="button"
                    onClick={handleConfirmToPantry}
                    disabled={isSavingToPantry || detectedItems.filter((i) => i.selected).length === 0}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                  >
                    {isSavingToPantry ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Check className="w-3.5 h-3.5" />
                    )}
                    <span>{isSavingToPantry ? "Đang lưu..." : "Xác nhận thêm vào Tủ lạnh"}</span>
                  </button>
                </div>
              </Card>
            ) : (
              <Card className="p-6 flex flex-col items-center justify-center min-h-[260px] text-center opacity-60">
                <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mb-3">
                  <Camera className="w-6 h-6 text-stone-400" />
                </div>
                <h4 className="text-sm font-semibold text-stone-700">Chưa có ảnh nguyên liệu</h4>
                <p className="text-xs text-stone-500 mt-1 max-w-sm">
                  Chụp hoặc tải ảnh tủ lạnh để AI tự động nhận diện rau củ, nấm, đậu hũ và đưa vào quản lý tủ lạnh.
                </p>
              </Card>
            )}
          </div>

          {/* 2. Công thức phù hợp xếp hạng theo số nguyên liệu trùng khớp từ ảnh quét */}
          {scanned && (
            <RecipeMatchList
              title="Công thức phù hợp"
              subtitle="Xếp hạng theo số nguyên liệu trùng với ảnh vừa quét (trùng nhiều nhất lên đầu)"
              matchedRecipes={matchedScanRecipes}
              loading={loadingRecipes}
              emptyMessage="Chưa tìm thấy công thức nào khớp với các nguyên liệu đã quét. Hãy thử chọn thêm nguyên liệu."
              userAllergies={userAllergies}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default function PlannerScanPage() {
  const { isGuest, ready } = useRole();

  return (
    <AppShell showRightRail={false}>
      <div className="max-w-[1240px] mx-auto w-full">
        <PageHeader
          eyebrow="TỦ LẠNH THÔNG MINH & SCANNER"
          title="Quản lý Tủ lạnh & Quét nguyên liệu AI"
          subtitle="Theo dõi nguyên liệu sẵn có trong tủ lạnh của bạn và sử dụng AI để gợi ý các món chay chuẩn dinh dưỡng ngay tức thì."
        />

        {!ready ? (
          <GatedSkeleton />
        ) : isGuest ? (
          <LockedState reason="guest" />
        ) : (
          <PremiumGuard feature="smart-fridge">
            <ScanContent />
          </PremiumGuard>
        )}
      </div>
    </AppShell>
  );
}
