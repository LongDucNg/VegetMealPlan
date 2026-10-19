"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  RotateCcw,
  Flame,
  FileSpreadsheet,
  Tag,
  ExternalLink,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Check,
  Carrot,
} from "lucide-react";
import { useRecipes } from "@/features/recipes/hooks/useRecipes";
import { Recipe, RecipeStatus, formatMealType } from "@/features/recipes";
import { formatVegetarianType } from "@/features/profile/types";
import { AdminRecipeModal } from "./AdminRecipeModal";
import { AdminRecipeDetailModal } from "./AdminRecipeDetailModal";
import { AdminImportModal } from "./AdminImportModal";
import { recipeService } from "@/features/recipes/services/recipeService";
import { priceService } from "@/features/recipes/services/priceService";
import { recipeApiService } from "@/features/recipes/services/recipeApiService";
import { mapBackendToFrontendRecipe } from "@/features/recipes/utils/recipeMapper";

export function AdminRecipeManagement() {
  const { recipes, createRecipe, updateRecipe, deleteRecipe, refresh } = useRecipes();

  const [serverRecipes, setServerRecipes] = useState<Recipe[]>([]);
  const [loadingServer, setLoadingServer] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedMealType, setSelectedMealType] = useState<string>("all");
  const [selectedDiet, setSelectedDiet] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const [modalOpen, setModalOpen] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [viewingRecipe, setViewingRecipe] = useState<Recipe | null>(null);

  const loadAdminRecipes = useCallback(async () => {
    setLoadingServer(true);
    try {
      const data = await recipeApiService.getAdminRecipes();
      const list = Array.isArray(data) ? data : (data as any)?.data || [];
      if (Array.isArray(list) && list.length > 0) {
        const mapped = list.map(mapBackendToFrontendRecipe);
        setServerRecipes(mapped);
      }
    } catch (err) {
      console.warn("Failed to load admin recipes:", err);
    } finally {
      setLoadingServer(false);
    }
  }, []);

  useEffect(() => {
    loadAdminRecipes();
  }, [loadAdminRecipes]);

  // Combined source: server recipes prioritized, fallback to hook recipes
  const allRecipes = serverRecipes.length > 0 ? serverRecipes : recipes;

  const pendingCount = allRecipes.filter(
    (r) => (r.status || "").toUpperCase() === "PENDING_REVIEW"
  ).length;

  const handleApprove = async (recipe: Recipe) => {
    const numId = parseInt(recipe.id.replace(/\D/g, ""), 10);
    try {
      if (!isNaN(numId)) {
        await recipeApiService.reviewRecipe(numId, "approved");
      }
      recipeService.updateRecipe(recipe.id, { status: "APPROVED" });
      await loadAdminRecipes();
      refresh();
    } catch (err: any) {
      alert(err?.message || "Không thể phê duyệt công thức này");
    }
  };

  const handleReject = async (recipe: Recipe) => {
    const reason = window.prompt(
      `Nhập lý do từ chối công thức "${recipe.name || recipe.title}":`,
      "Nội dung chưa đầy đủ hoặc không phù hợp tiêu chuẩn cộng đồng"
    );
    if (reason === null) return;
    const numId = parseInt(recipe.id.replace(/\D/g, ""), 10);
    try {
      if (!isNaN(numId)) {
        await recipeApiService.reviewRecipe(numId, "rejected", reason);
      }
      recipeService.updateRecipe(recipe.id, { status: "REJECTED" });
      await loadAdminRecipes();
      refresh();
    } catch (err: any) {
      alert(err?.message || "Không thể từ chối công thức này");
    }
  };

  // Filtered recipes
  const filtered = allRecipes.filter((r) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const match =
        r.title.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        (r.ingredients || []).some((ing) => ing.name.toLowerCase().includes(q));
      if (!match) return false;
    }
    if (selectedMealType !== "all" && r.mealType !== selectedMealType) {
      return false;
    }
    if (selectedDiet !== "all" && r.vegetarianType !== selectedDiet) {
      return false;
    }
    if (selectedStatus !== "all" && (r.status || "APPROVED").toUpperCase() !== selectedStatus.toUpperCase()) {
      return false;
    }
    return true;
  });

  const handleOpenAdd = () => {
    setEditingRecipe(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (recipe: Recipe) => {
    setEditingRecipe(recipe);
    setModalOpen(true);
  };

  const handleSave = (recipeData: Omit<Recipe, "id">, editId?: string) => {
    if (editId) {
      updateRecipe(editId, recipeData);
    } else {
      createRecipe(recipeData);
    }
    refresh();
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa công thức "${title}" không?`)) {
      deleteRecipe(id);
    }
  };

  const handleReset = () => {
    if (window.confirm("Khôi phục toàn bộ công thức về dữ liệu mẫu mặc định?")) {
      recipeService.resetRecipes();
      refresh();
    }
  };

  return (
    <div className="space-y-6">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-stone-200 shadow-xs">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm kiếm công thức, nguyên liệu, trạng thái..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-9 pr-4 rounded-xl border border-stone-200 bg-stone-50 text-sm focus:bg-white focus:border-emerald-600 outline-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleReset}
            title="Khôi phục dữ liệu mẫu mặc định"
            className="h-10 px-3.5 rounded-xl border border-stone-200 text-stone-600 hover:text-stone-900 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Đặt lại dữ liệu
          </button>

          {/* Link to Ingredients CRUD */}
          <Link
            href="/admin/ingredients"
            className="h-10 px-4 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Carrot className="w-4 h-4 text-emerald-700" />
            <span>Kho Nguyên liệu</span>
          </Link>

          {/* Import Recipes Button (Requirement 8) */}
          <button
            onClick={() => setImportModalOpen(true)}
            className="h-10 px-4 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
            <span>Nhập từ file (Import)</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="h-10 px-5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Thêm công thức
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="font-semibold text-stone-500 mr-1">Bữa ăn:</span>
        {[
          { id: "all", label: "Tất cả" },
          { id: "breakfast", label: "Bữa sáng" },
          { id: "lunch", label: "Bữa trưa" },
          { id: "dinner", label: "Bữa tối" },
          { id: "snack", label: "Bữa phụ" },
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => setSelectedMealType(m.id)}
            className={`px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
              selectedMealType === m.id
                ? "bg-emerald-700 text-white font-semibold"
                : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-50"
            }`}
          >
            {m.label}
          </button>
        ))}

        <span className="font-semibold text-stone-500 ml-3 mr-1">Chế độ chay:</span>
        {[
          { id: "all", label: "Tất cả" },
          { id: "vegan", label: "Thuần chay" },
          { id: "lacto_vegetarian", label: "Chay có sữa" },
          { id: "ovo_vegetarian", label: "Chay có trứng" },
          { id: "lacto_ovo_vegetarian", label: "Trứng & sữa" },
        ].map((d) => (
          <button
            key={d.id}
            onClick={() => setSelectedDiet(d.id)}
            className={`px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
              selectedDiet === d.id
                ? "bg-stone-800 text-white font-semibold"
                : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-50"
            }`}
          >
            {d.label}
          </button>
        ))}

        <span className="font-semibold text-stone-500 ml-3 mr-1">Trạng thái:</span>
        {[
          { id: "all", label: "Tất cả" },
          { id: "PENDING_REVIEW", label: "Chờ duyệt", count: pendingCount },
          { id: "APPROVED", label: "Đã duyệt" },
          { id: "REJECTED", label: "Đã từ chối" },
          { id: "DRAFT", label: "Nháp" },
        ].map((s) => (
          <button
            key={s.id}
            onClick={() => setSelectedStatus(s.id)}
            className={`px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              selectedStatus.toUpperCase() === s.id.toUpperCase()
                ? s.id === "PENDING_REVIEW"
                  ? "bg-amber-600 text-white font-semibold"
                  : "bg-emerald-800 text-white font-semibold"
                : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-50"
            }`}
          >
            <span>{s.label}</span>
            {s.count !== undefined && s.count > 0 && (
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  selectedStatus.toUpperCase() === s.id.toUpperCase()
                    ? "bg-white text-amber-700"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {s.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Pending review notice banner */}
      {pendingCount > 0 && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex flex-wrap items-center justify-between gap-3 text-amber-900 text-sm">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <p>
              Có <span className="font-bold">{pendingCount} công thức</span> do người dùng gửi đang chờ bạn phê duyệt.
            </p>
          </div>
          <button
            onClick={() => setSelectedStatus("PENDING_REVIEW")}
            className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold cursor-pointer transition-colors shadow-2xs"
          >
            Lọc công thức chờ duyệt
          </button>
        </div>
      )}

      {/* Recipes Table / Grid */}
      <div className="bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-xs">
        <div className="p-4 bg-stone-50/70 border-b border-stone-200 flex items-center justify-between text-xs text-stone-500">
          <span className="font-semibold uppercase tracking-wider">
            Hiển thị {filtered.length} công thức
          </span>
          <span>Chỉ các công thức "ĐÃ DUYỆT" mới xuất hiện trong Kế hoạch Thực đơn</span>
        </div>

        <div className="divide-y divide-stone-100">
          {filtered.map((recipe) => {
            const cost =
              recipe.estimatedCost ||
              priceService.calculateRecipeCost(recipe.ingredients || []).estimatedCost;
            const status: RecipeStatus = recipe.status || "APPROVED";

            return (
              <div
                key={recipe.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-stone-50/50 transition-colors"
              >
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  {/* Thumbnail */}
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-stone-100 shrink-0">
                    {recipe.image ? (
                      <Image
                        src={recipe.image}
                        alt={recipe.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-stone-400">
                        Không có ảnh
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200">
                        {formatMealType(recipe.mealType)}
                      </span>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-stone-100 text-stone-700">
                        {formatVegetarianType(recipe.vegetarianType)}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          status === "APPROVED"
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                            : status === "PENDING_REVIEW"
                            ? "bg-amber-100 text-amber-900 border border-amber-300"
                            : status === "REJECTED"
                            ? "bg-rose-100 text-rose-900 border border-rose-300"
                            : "bg-stone-200 text-stone-700"
                        }`}
                      >
                        {status === "APPROVED"
                          ? "Đã duyệt"
                          : status === "PENDING_REVIEW"
                          ? "Chờ duyệt"
                          : status === "REJECTED"
                          ? "Đã từ chối"
                          : "Bản nháp"}
                      </span>
                      <span className="text-xs text-stone-400">· {recipe.category}</span>
                    </div>

                    <Link
                      href={`/recipes/${recipe.id}`}
                      className="font-semibold text-stone-900 text-base truncate block hover:text-emerald-700 hover:underline transition-colors"
                    >
                      {recipe.name || recipe.title}
                    </Link>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 mt-1">
                      <span className="flex items-center gap-1 font-semibold text-amber-700">
                        <Flame className="w-3.5 h-3.5 text-amber-500" />
                        {recipe.calories} kcal
                      </span>
                      <span>Đạm: {recipe.protein}g · Tinh bột: {recipe.carbs}g · Béo: {recipe.fat}g</span>
                      <span className="font-bold text-emerald-800">
                        {priceService.formatEstimatedPrice(cost)}
                      </span>
                      {recipe.source && (
                        <span className="text-[11px] text-stone-400">
                          Nguồn: {recipe.source.name}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                  {status === "PENDING_REVIEW" && (
                    <>
                      <button
                        onClick={() => handleApprove(recipe)}
                        title="Duyệt công thức công khai"
                        className="h-8 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1 transition-colors shadow-2xs cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Duyệt</span>
                      </button>
                      <button
                        onClick={() => handleReject(recipe)}
                        title="Từ chối công thức"
                        className="h-8 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Từ chối</span>
                      </button>
                    </>
                  )}

                  {status === "REJECTED" && (
                    <button
                      onClick={() => handleApprove(recipe)}
                      title="Duyệt lại công thức"
                      className="h-8 px-2.5 rounded-xl bg-stone-100 hover:bg-emerald-50 text-stone-700 hover:text-emerald-800 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Duyệt lại</span>
                    </button>
                  )}

                  <Link
                    href={`/recipes/${recipe.id}`}
                    title="Xem trang công thức"
                    className="p-2 rounded-xl text-stone-500 hover:text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => setViewingRecipe(recipe)}
                    title="Xem nhanh chi tiết"
                    className="p-2 rounded-xl text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleOpenEdit(recipe)}
                    title="Chỉnh sửa công thức"
                    className="p-2 rounded-xl text-emerald-700 hover:text-emerald-900 hover:bg-emerald-50 transition-colors cursor-pointer"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(recipe.id, recipe.title)}
                    title="Xóa công thức"
                    className="p-2 rounded-xl text-red-600 hover:text-red-800 hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="p-12 text-center text-stone-400">
              <p className="font-medium text-base">Không tìm thấy công thức nào phù hợp tiêu chí.</p>
              <button
                onClick={handleOpenAdd}
                className="mt-3 text-xs font-semibold text-emerald-700 hover:underline cursor-pointer"
              >
                + Thêm công thức đầu tiên
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Add / Edit Modal */}
      <AdminRecipeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initialRecipe={editingRecipe}
      />

      {/* Detail View Modal */}
      <AdminRecipeDetailModal
        recipe={viewingRecipe}
        onClose={() => setViewingRecipe(null)}
        onEdit={(r) => {
          setViewingRecipe(null);
          handleOpenEdit(r);
        }}
      />

      {/* Excel / CSV Import & Validation Review Dashboard Modal (Requirements 8, 14, 15) */}
      <AdminImportModal
        isOpen={importModalOpen}
        onClose={() => setImportModalOpen(false)}
        onCompleted={() => refresh()}
      />
    </div>
  );
}
