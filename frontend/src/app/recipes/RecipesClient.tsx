"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Filter,
  Flame,
  Clock,
  Heart,
  ChefHat,
  ArrowRight,
  SlidersHorizontal,
  Plus,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Input } from "@/components/ui/Input";
import { useRecipes } from "@/features/recipes/hooks/useRecipes";
import { RecipeAllergyBadge } from "@/features/recipes/components/RecipeAllergyBadge";
import { RecipeFavoriteButton } from "@/features/recipes/components/RecipeFavoriteButton";
import { priceService } from "@/features/recipes/services/priceService";
import { formatMealType } from "@/features/recipes";

export function RecipesClient() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMealType, setSelectedMealType] = useState<string>("all");
  const [selectedDiet, setSelectedDiet] = useState<string>("all");

  const {
    recipes,
    isLoading,
    setFilters,
    page,
    setPage,
    total,
    totalPages,
  } = useRecipes(undefined, 1, 24);

  // Sync search and filters to hook so backend queries across all 628+ recipes
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters({
        searchQuery: searchTerm.trim() || undefined,
        mealType: selectedMealType !== "all" ? (selectedMealType as any) : undefined,
        vegetarianType: selectedDiet !== "all" ? (selectedDiet as any) : undefined,
      });
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm, selectedMealType, selectedDiet, setFilters, setPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Generate page numbers for pagination
  const renderPaginationButtons = () => {
    if (totalPages <= 1) return null;

    const pages: (number | string)[] = [];
    const maxButtons = 5;

    if (totalPages <= maxButtons + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push("...");

      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (page < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }

    return pages.map((p, idx) => {
      if (p === "...") {
        return (
          <span key={`ellipsis-${idx}`} className="px-2.5 py-1.5 text-stone-400 font-bold select-none text-xs">
            ...
          </span>
        );
      }

      const pageNum = Number(p);
      const isActive = pageNum === page;

      return (
        <button
          key={`page-${pageNum}`}
          onClick={() => handlePageChange(pageNum)}
          className={`w-9 h-9 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center justify-center ${isActive
              ? "bg-emerald-700 text-white shadow-sm shadow-emerald-800/20"
              : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-50 hover:text-emerald-700"
            }`}
        >
          {pageNum}
        </button>
      );
    });
  };

  return (
    <AppShell showRightRail={false}>
      <div className="max-w-6xl mx-auto py-6 sm:py-8 px-4 sm:px-6 space-y-7">
        <PageHeader
          eyebrow="THƯ VIỆN CÔNG THỨC"
          title="Khám phá món chay thanh đạm & bổ dưỡng"
          subtitle="Hơn 600 công thức món chay kèm bảng giá nguyên liệu chuẩn, chỉ số dinh dưỡng chi tiết và gợi ý thay thế thông minh."
          action={
            <Link
              href="/recipes/create"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-sm shadow-emerald-900/10 hover:shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Đăng công thức mới</span>
            </Link>
          }
        />

        {/* Search & Filter Bar */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <Input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm món ăn, nguyên liệu (ví dụ: bún nấm, đậu hũ, cà rốt)..."
                icon={<Search className="w-4 h-4 text-stone-400" />}
              />
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100 text-xs">
            <span className="font-semibold text-stone-500 mr-1 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Bữa ăn:
            </span>
            {[
              { id: "all", label: "Tất cả" },
              { id: "breakfast", label: "Bữa sáng" },
              { id: "snack", label: "Bữa phụ" },
              { id: "any", label: "Trưa & Tối (Linh hoạt)" },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedMealType(m.id)}
                className={`px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${selectedMealType === m.id
                    ? "bg-emerald-700 text-white font-semibold shadow-xs"
                    : "bg-stone-50 border border-stone-200 text-stone-600 hover:bg-stone-100"
                  }`}
              >
                {m.label}
              </button>
            ))}

            <span className="font-semibold text-stone-500 ml-3 mr-1">Chế độ:</span>
            {[
              { id: "all", label: "Tất cả" },
              { id: "vegan", label: "Thuần chay" },
              { id: "ovo_lacto", label: "Lacto-Ovo" },
              { id: "lacto", label: "Lacto" },
              { id: "ovo", label: "Ovo" },
            ].map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedDiet(d.id)}
                className={`px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${selectedDiet === d.id
                    ? "bg-emerald-700 text-white font-semibold shadow-xs"
                    : "bg-stone-50 border border-stone-200 text-stone-600 hover:bg-stone-100"
                  }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Recipes Grid */}
        <div className="space-y-5">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span className="font-semibold uppercase tracking-wider flex items-center gap-2">
              <span>
                Tìm thấy {total > 0 ? total : recipes.length} công thức
                {totalPages > 1 && ` (Trang ${page}/${totalPages})`}
              </span>
              {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-600" />}
            </span>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white border border-stone-200/80 rounded-3xl overflow-hidden p-4 space-y-3 animate-pulse"
                >
                  <div className="aspect-[16/10] bg-stone-100 rounded-2xl" />
                  <div className="h-4 bg-stone-100 rounded w-3/4" />
                  <div className="h-3 bg-stone-100 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : recipes.length === 0 ? (
            <div className="bg-white border border-stone-200/80 rounded-3xl p-12 text-center space-y-3">
              <ChefHat className="w-12 h-12 text-stone-300 mx-auto" />
              <p className="font-serif font-bold text-stone-800 text-lg">Không tìm thấy món nào phù hợp</p>
              <p className="text-stone-500 text-xs max-w-sm mx-auto">
                Hãy thử tìm kiếm với từ khóa khác hoặc điều chỉnh các tiêu chí bộ lọc bữa ăn, chế độ chay.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedMealType("all");
                  setSelectedDiet("all");
                }}
                className="mt-2 px-4 py-2 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors cursor-pointer"
              >
                Đặt lại bộ lọc
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe) => {
                const cost =
                  recipe.estimatedCost ||
                  priceService.calculateRecipeCost(recipe.ingredients || []).estimatedCost;

                return (
                  <div
                    key={recipe.id}
                    className="bg-white border border-stone-200/80 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
                  >
                    {/* Thumbnail */}
                    <Link
                      href={`/recipes/${recipe.id}`}
                      className="relative aspect-[16/10] w-full bg-stone-100 block overflow-hidden"
                    >
                      {recipe.image ? (
                        <Image
                          src={recipe.image}
                          alt={recipe.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-stone-200 text-stone-400">
                          <ChefHat className="w-8 h-8 opacity-40" />
                        </div>
                      )}

                      <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-600 text-white shadow-2xs">
                          {formatMealType(recipe.mealType)}
                        </span>
                      </div>

                      <div className="absolute top-2.5 right-2.5 z-10">
                        <RecipeFavoriteButton recipeId={recipe.id} size="sm" />
                      </div>
                    </Link>

                    {/* Body */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="mb-2">
                          <RecipeAllergyBadge recipe={recipe} compact />
                        </div>

                        <Link
                          href={`/recipes/${recipe.id}`}
                          className="font-serif font-bold text-stone-900 text-base leading-snug line-clamp-2 hover:text-emerald-700 transition-colors"
                        >
                          {recipe.name || recipe.title}
                        </Link>

                        <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                          {recipe.description}
                        </p>

                        <div className="flex items-center gap-2 mt-2.5 text-xs text-stone-500">
                          <span className="flex items-center gap-1 font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                            <Flame className="w-3 h-3 text-amber-500 fill-amber-500" />
                            {recipe.calories} kcal
                          </span>
                          <span className="flex items-center gap-1 text-[11px]">
                            <Clock className="w-3 h-3 text-stone-400" />
                            {recipe.cookTime || 20}m
                          </span>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-800">
                          {priceService.formatEstimatedPrice(cost)}
                        </span>
                        <Link
                          href={`/recipes/${recipe.id}`}
                          className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline"
                        >
                          <span>Chi tiết</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone-200/80">
              <p className="text-xs text-stone-500">
                Hiển thị trang <span className="font-bold text-stone-800">{page}</span> trên tổng số{" "}
                <span className="font-bold text-stone-800">{totalPages}</span> trang ({total} công thức)
              </p>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page <= 1 || isLoading}
                  className="px-3 py-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-600 text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Trang trước</span>
                </button>

                <div className="flex items-center gap-1">{renderPaginationButtons()}</div>

                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page >= totalPages || isLoading}
                  className="px-3 py-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-600 text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center gap-1"
                >
                  <span className="hidden sm:inline">Trang sau</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
