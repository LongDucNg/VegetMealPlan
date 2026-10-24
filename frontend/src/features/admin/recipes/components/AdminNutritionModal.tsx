"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  Search,
  RefreshCw,
  Flame,
  Activity,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Database,
  UtensilsCrossed,
} from "lucide-react";
import { recipeApiService, NutritionItem } from "@/features/recipes/services/recipeApiService";
import { Recipe } from "@/features/recipes";

interface AdminNutritionModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipes?: Recipe[];
}

export function AdminNutritionModal({
  isOpen,
  onClose,
  recipes = [],
}: AdminNutritionModalProps) {
  const [items, setItems] = useState<NutritionItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchNutritionList = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await recipeApiService.getAllNutrition();
      const list = Array.isArray(res) ? res : (res as any)?.data || [];
      if (Array.isArray(list)) {
        setItems(list);
        setLastUpdated(new Date());
      } else {
        setItems([]);
      }
    } catch (err: any) {
      console.error("Failed to load nutrition list:", err);
      setError(err?.message || "Không thể tải danh sách dinh dưỡng từ máy chủ (GET /nutrition)");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      fetchNutritionList();
    }
  }, [isOpen, fetchNutritionList]);

  if (!isOpen) return null;

  // Filter items by search keyword (recipe_id or recipe title)
  const filtered = items.filter((item) => {
    const term = search.toLowerCase().trim();
    if (!term) return true;
    if (String(item.recipe_id).includes(term)) return true;
    if (String(item.nutrition_id).includes(term)) return true;
    // Match against recipe title from recipes prop or item.recipe
    const recipe = recipes.find(
      (r) => String(r.id).replace(/\D/g, "") === String(item.recipe_id)
    );
    if (recipe && (recipe.title || recipe.name)?.toLowerCase().includes(term)) {
      return true;
    }
    if (item.recipe?.title?.toLowerCase().includes(term)) {
      return true;
    }
    return false;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-stone-100 flex items-center justify-between bg-stone-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shadow-xs">
              <Activity className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif font-bold text-xl text-stone-900">
                  Cơ sở Dữ liệu Dinh dưỡng (Nutrition DB)
                </h2>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold">
                  GET /api/v1/nutrition
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                Quản lý chỉ số calo, protein, carbs, fat, fiber của toàn bộ công thức trên hệ thống
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchNutritionList}
              disabled={loading}
              title="Tải lại từ API"
              className="h-9 px-3 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-emerald-600" : ""}`} />
              <span>Làm mới</span>
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search & Statistics Bar */}
        <div className="p-4 bg-white border-b border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="relative flex-1 min-w-[240px] max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm theo ID công thức hoặc tên món..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-200 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-xs"
            />
          </div>

          <div className="flex items-center gap-3 text-stone-500 font-medium">
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-100 text-stone-700">
              <Database className="w-3.5 h-3.5 text-stone-500" />
              Tổng cộng: <strong className="text-stone-900 ml-1">{items.length}</strong> công thức
            </span>
            {lastUpdated && (
              <span className="text-[11px] text-stone-400">
                Đồng bộ lúc: {lastUpdated.toLocaleTimeString("vi-VN")}
              </span>
            )}
          </div>
        </div>

        {/* Content Body / Table */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {loading ? (
            <div className="py-20 text-center space-y-3">
              <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin mx-auto" />
              <p className="text-sm font-semibold text-stone-700">Đang truy vấn GET /api/v1/nutrition...</p>
              <p className="text-xs text-stone-400">Vui lòng chờ trong giây lát</p>
            </div>
          ) : error ? (
            <div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-center space-y-3">
              <AlertCircle className="w-8 h-8 text-red-500 mx-auto" />
              <p className="text-sm font-semibold text-red-900">{error}</p>
              <button
                onClick={fetchNutritionList}
                className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-semibold hover:bg-red-700 transition-colors"
              >
                Thử lại
              </button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center space-y-3 text-stone-400">
              <UtensilsCrossed className="w-12 h-12 mx-auto stroke-1 text-stone-300" />
              <p className="text-sm font-medium text-stone-600">Không tìm thấy bản ghi dinh dưỡng nào</p>
              <p className="text-xs text-stone-400">Thử tìm kiếm với từ khóa khác</p>
            </div>
          ) : (
            <div className="border border-stone-200 rounded-2xl overflow-hidden shadow-2xs">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200 text-stone-600 font-semibold uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-4">#</th>
                    <th className="py-3 px-4">ID Món</th>
                    <th className="py-3 px-4">Công thức</th>
                    <th className="py-3 px-4 text-center">Năng lượng</th>
                    <th className="py-3 px-4 text-center">Đạm (Protein)</th>
                    <th className="py-3 px-4 text-center">Tinh bột (Carbs)</th>
                    <th className="py-3 px-4 text-center">Chất béo (Fat)</th>
                    <th className="py-3 px-4 text-center">Chất xơ (Fiber)</th>
                    <th className="py-3 px-4 text-right">Xem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filtered.map((item, idx) => {
                    const matchedRecipe = recipes.find(
                      (r) => String(r.id).replace(/\D/g, "") === String(item.recipe_id)
                    );
                    const title = matchedRecipe?.title || matchedRecipe?.name || item.recipe?.title || `Công thức #${item.recipe_id}`;
                    const image = matchedRecipe?.image || item.recipe?.image_url;

                    return (
                      <tr
                        key={item.nutrition_id || item.recipe_id || idx}
                        className="hover:bg-stone-50/70 transition-colors"
                      >
                        <td className="py-3.5 px-4 text-stone-400 font-mono text-[11px]">
                          {item.nutrition_id || idx + 1}
                        </td>
                        <td className="py-3.5 px-4 font-mono font-bold text-stone-700">
                          #{item.recipe_id}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2.5">
                            {image ? (
                              <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-stone-100 shrink-0">
                                <Image
                                  src={image}
                                  alt={title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            ) : (
                              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                                <UtensilsCrossed className="w-4 h-4" />
                              </div>
                            )}
                            <span className="font-semibold text-stone-900 max-w-[200px] truncate" title={title}>
                              {title}
                            </span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 font-bold">
                            <Flame className="w-3 h-3 text-amber-500 fill-amber-500" />
                            {item.calories} kcal
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center font-semibold text-stone-700">
                          {item.protein}g
                        </td>
                        <td className="py-3.5 px-4 text-center font-semibold text-stone-700">
                          {item.carbs}g
                        </td>
                        <td className="py-3.5 px-4 text-center font-semibold text-stone-700">
                          {item.fat}g
                        </td>
                        <td className="py-3.5 px-4 text-center font-semibold text-stone-700">
                          {item.fiber ?? 0}g
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <Link
                            href={`/recipes/${item.recipe_id}`}
                            target="_blank"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-emerald-700 hover:text-emerald-900 hover:bg-emerald-50 transition-colors font-medium text-xs"
                          >
                            <span>Chi tiết</span>
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-100 bg-stone-50/50 flex items-center justify-between text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Dữ liệu dinh dưỡng được liên kết trực tiếp từ bảng <code className="font-mono bg-white px-1.5 py-0.5 rounded border border-stone-200">nutrition_infos</code> trong CSDL PostgreSQL.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 font-semibold transition-colors cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
