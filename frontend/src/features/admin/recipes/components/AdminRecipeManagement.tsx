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
  Download,
  FileDown,
  X,
} from "lucide-react";
import { useRecipes } from "@/features/recipes/hooks/useRecipes";
import { Recipe, RecipeStatus, formatMealType } from "@/features/recipes";
import { formatVegetarianType } from "@/features/profile/types";
import { AdminRecipeModal } from "./AdminRecipeModal";
import { AdminRecipeDetailModal } from "./AdminRecipeDetailModal";
import { AdminImportModal } from "./AdminImportModal";
import { AdminExportModal } from "./AdminExportModal";
import { recipeService } from "@/features/recipes/services/recipeService";
import { priceService } from "@/features/recipes/services/priceService";
import { recipeApiService } from "@/features/recipes/services/recipeApiService";
import { adminRecipeApiService } from "@/features/admin/services/adminRecipeApiService";
import { mapBackendToFrontendRecipe } from "@/features/recipes/utils/recipeMapper";

export function AdminRecipeManagement() {
  const { recipes, createRecipe, updateRecipe, deleteRecipe, refresh } = useRecipes();

  const [serverRecipes, setServerRecipes] = useState<Recipe[]>([]);
  const [loadingServer, setLoadingServer] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedMealType, setSelectedMealType] = useState<string>("all");
  const [selectedDiet, setSelectedDiet] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;

  const [modalOpen, setModalOpen] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [viewingRecipe, setViewingRecipe] = useState<Recipe | null>(null);

  // Redesigned custom notification modals
  const [rejectModalRecipe, setRejectModalRecipe] = useState<Recipe | null>(null);
  const [rejectReason, setRejectReason] = useState<string>(
    "Nội dung chưa đầy đủ hoặc không phù hợp tiêu chuẩn cộng đồng"
  );
  const [isSubmittingReject, setIsSubmittingReject] = useState<boolean>(false);

  const [deleteModalRecipe, setDeleteModalRecipe] = useState<{ id: string; title: string } | null>(null);
  const [isSubmittingDelete, setIsSubmittingDelete] = useState<boolean>(false);

  const [resetModalOpen, setResetModalOpen] = useState<boolean>(false);

  // Modern Toast notification state
  const [toast, setToast] = useState<{
    id: number;
    type: "success" | "error" | "info";
    message: string;
  } | null>(null);

  const showToast = useCallback((type: "success" | "error" | "info", message: string) => {
    const id = Date.now();
    setToast({ id, type, message });
    setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 4500);
  }, []);

  // Batch selection states for export
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isDirectExporting, setIsDirectExporting] = useState<boolean>(false);

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
      try {
        recipeService.updateRecipe(recipe.id, { status: "APPROVED" });
      } catch {
        // Recipe tồn tại trên database server nhưng chưa có trong mock localStorage
      }
      await loadAdminRecipes();
      refresh();
      showToast("success", `Đã phê duyệt công thức "${recipe.name || recipe.title}" thành công!`);
    } catch (err: any) {
      showToast("error", err?.message || "Không thể phê duyệt công thức này");
    }
  };

  const handleOpenRejectModal = (recipe: Recipe) => {
    setRejectReason("");
    setRejectModalRecipe(recipe);
  };

  const handleConfirmReject = async () => {
    if (!rejectModalRecipe) return;
    const numId = parseInt(rejectModalRecipe.id.replace(/\D/g, ""), 10);
    setIsSubmittingReject(true);
    try {
      if (!isNaN(numId)) {
        await recipeApiService.reviewRecipe(
          numId,
          "rejected",
          rejectReason.trim() ? rejectReason.trim() : undefined
        );
      }
      try {
        recipeService.updateRecipe(rejectModalRecipe.id, { status: "REJECTED" });
      } catch {
        // Recipe tồn tại trên database server nhưng chưa có trong mock localStorage
      }
      await loadAdminRecipes();
      refresh();
      showToast("success", `Đã từ chối công thức "${rejectModalRecipe.name || rejectModalRecipe.title}"!`);
      setRejectModalRecipe(null);
    } catch (err: any) {
      showToast("error", err?.message || "Không thể từ chối công thức này");
    } finally {
      setIsSubmittingReject(false);
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

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedMealType, selectedDiet, selectedStatus]);

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const paginatedRecipes = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleOpenAdd = () => {
    setEditingRecipe(null);
    setModalOpen(true);
  };

  const handleOpenEdit = async (recipe: Recipe) => {
    // Nếu công thức chưa có danh sách nguyên liệu, nạp chi tiết từ admin API
    if (!recipe.ingredients || recipe.ingredients.length === 0) {
      const numId = parseInt(recipe.id.replace(/\D/g, ""), 10);
      if (!isNaN(numId)) {
        try {
          const detail = await recipeApiService.getAdminRecipeById(numId);
          const mapped = mapBackendToFrontendRecipe(detail);
          setEditingRecipe(mapped);
          setModalOpen(true);
          return;
        } catch {
          // Bỏ qua lỗi và dùng recipe hiện tại
        }
      }
    }
    setEditingRecipe(recipe);
    setModalOpen(true);
  };

  const handleSave = async (recipeData: Omit<Recipe, "id">, editId?: string) => {
    if (editId) {
      await updateRecipe(editId, recipeData);
    } else {
      await createRecipe(recipeData);
    }
    await loadAdminRecipes();
    refresh();
  };

  const handleOpenDeleteModal = (id: string, title: string) => {
    setDeleteModalRecipe({ id, title });
  };

  const handleConfirmDelete = async () => {
    if (!deleteModalRecipe) return;
    const numId = parseInt(deleteModalRecipe.id.replace(/\D/g, ""), 10);
    setIsSubmittingDelete(true);
    try {
      if (!isNaN(numId)) {
        await recipeApiService.deleteRecipe(numId);
      }
      try {
        deleteRecipe(deleteModalRecipe.id);
      } catch {
        // Ignored
      }
      await loadAdminRecipes();
      refresh();
      showToast("success", `Đã xóa công thức "${deleteModalRecipe.title}" thành công!`);
      setDeleteModalRecipe(null);
    } catch (err: any) {
      showToast("error", err?.message || "Không thể xóa công thức này");
    } finally {
      setIsSubmittingDelete(false);
    }
  };

  const handleOpenResetModal = () => {
    setResetModalOpen(true);
  };

  const handleConfirmReset = async () => {
    recipeService.resetRecipes();
    refresh();
    await loadAdminRecipes();
    showToast("success", "Đã khôi phục toàn bộ công thức về dữ liệu mẫu mặc định!");
    setResetModalOpen(false);
  };

  const getRecipeNumId = (r: Recipe): number => {
    const n = parseInt(r.id.replace(/\D/g, ""), 10);
    return isNaN(n) ? 0 : n;
  };

  const paginatedIds = paginatedRecipes.map(getRecipeNumId).filter((id) => id > 0);
  const allCurrentSelected =
    paginatedIds.length > 0 && paginatedIds.every((id) => selectedIds.includes(id));

  const handleToggleSelectAll = () => {
    if (allCurrentSelected) {
      setSelectedIds((prev) => prev.filter((id) => !paginatedIds.includes(id)));
    } else {
      setSelectedIds((prev) => Array.from(new Set([...prev, ...paginatedIds])));
    }
  };

  const handleToggleSelectRecipe = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleQuickExportSingle = async (recipe: Recipe) => {
    const numId = getRecipeNumId(recipe);
    setIsDirectExporting(true);
    try {
      const filename = adminRecipeApiService.exportRecipesToExcel([recipe], `Mon_${numId || "Cong_Thuc"}`);
      showToast("success", `Đã xuất món "${recipe.name || recipe.title}" thành file Excel: ${filename}!`);
    } catch (err: any) {
      showToast("error", err?.message || "Không thể xuất file cho món này.");
    } finally {
      setIsDirectExporting(false);
    }
  };

  const handleQuickExportSelected = async () => {
    if (selectedIds.length === 0) return;
    setIsDirectExporting(true);
    try {
      const targetRecipes = allRecipes.filter((r) => {
        const id = getRecipeNumId(r);
        return id !== null && selectedIds.includes(id);
      });
      const recipesToExport = targetRecipes.length > 0
        ? targetRecipes
        : selectedIds.map((id) => ({ id: String(id), title: `Món #${id}`, ingredients: [] } as any));
      const filename = adminRecipeApiService.exportRecipesToExcel(
        recipesToExport,
        `${selectedIds.length}_Mon_Da_Chon`
      );
      showToast("success", `Đã xuất ${selectedIds.length} món đã chọn thành file Excel: ${filename}!`);
    } catch (err: any) {
      showToast("error", err?.message || "Không thể xuất các món đã chọn.");
    } finally {
      setIsDirectExporting(false);
    }
  };

  const handleQuickExportByFilter = async () => {
    setIsDirectExporting(true);
    try {
      const filename = adminRecipeApiService.exportRecipesToExcel(
        filtered,
        `${filtered.length}_Mon_Theo_Bo_Loc`
      );
      showToast("success", `Đã xuất ${filtered.length} công thức theo bộ lọc thành file Excel: ${filename}!`);
    } catch (err: any) {
      showToast("error", err?.message || "Không thể xuất dữ liệu theo bộ lọc.");
    } finally {
      setIsDirectExporting(false);
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
            onClick={handleOpenResetModal}
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

          {/* Export Recipes Button */}
          <button
            onClick={() => setExportModalOpen(true)}
            className="h-10 px-4 rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-2xs"
            title="Xuất công thức ra file CSV (1 món, nhiều món hoặc theo bộ lọc)"
          >
            <Download className="w-4 h-4 text-emerald-700" />
            <span>Xuất file (Export)</span>
          </button>

          <Link
            href="/admin/recipes/create"
            className="h-10 px-5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Thêm công thức
          </Link>
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
            className={`px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${selectedMealType === m.id
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
            className={`px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${selectedDiet === d.id
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
            className={`px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${selectedStatus.toUpperCase() === s.id.toUpperCase()
              ? s.id === "PENDING_REVIEW"
                ? "bg-amber-600 text-white font-semibold"
                : "bg-emerald-800 text-white font-semibold"
              : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-50"
              }`}
          >
            <span>{s.label}</span>
            {s.count !== undefined && s.count > 0 && (
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${selectedStatus.toUpperCase() === s.id.toUpperCase()
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
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={allCurrentSelected}
              onChange={handleToggleSelectAll}
              className="w-4 h-4 rounded text-emerald-700 focus:ring-emerald-500 cursor-pointer"
              title="Chọn / bỏ chọn tất cả trên trang này"
            />
            <span className="font-semibold uppercase tracking-wider">
              Hiển thị {filtered.length} công thức
            </span>
            {selectedIds.length > 0 && (
              <span className="text-emerald-700 font-bold">
                (Đã chọn {selectedIds.length} món)
              </span>
            )}
          </div>
          <span>Chỉ các công thức &quot;ĐÃ DUYỆT&quot; mới xuất hiện trong Kế hoạch Thực đơn</span>
        </div>

        <div className="divide-y divide-stone-100">
          {paginatedRecipes.map((recipe) => {
            const cost =
              recipe.estimatedCost ||
              priceService.calculateRecipeCost(recipe.ingredients || []).estimatedCost;
            const status: RecipeStatus = recipe.status || "APPROVED";
            const numId = getRecipeNumId(recipe);
            const isChecked = selectedIds.includes(numId);

            return (
              <div
                key={recipe.id}
                className={`p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors ${isChecked ? "bg-emerald-50/40" : "hover:bg-stone-50/50"
                  }`}
              >
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  {/* Row Checkbox */}
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleToggleSelectRecipe(numId)}
                    className="w-4 h-4 rounded text-emerald-700 focus:ring-emerald-500 cursor-pointer shrink-0"
                    title={`Chọn món #${numId}`}
                  />

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
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${status === "APPROVED"
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
                        onClick={() => handleOpenRejectModal(recipe)}
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

                  {/* Quick Export Single Recipe Button */}
                  <button
                    onClick={() => handleQuickExportSingle(recipe)}
                    title={`Xuất riêng món "${recipe.name || recipe.title}" ra file CSV (ID: ${numId})`}
                    className="p-2 rounded-xl text-stone-500 hover:text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
                  >
                    <FileDown className="w-4 h-4" />
                  </button>

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
                    onClick={() => handleOpenDeleteModal(recipe.id, recipe.name || recipe.title)}
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
              <Link
                href="/admin/recipes/create"
                className="mt-3 inline-block text-xs font-semibold text-emerald-700 hover:underline cursor-pointer"
              >
                + Thêm công thức đầu tiên
              </Link>
            </div>
          )}
        </div>

        {/* Frontend Pagination Controls */}
        {filtered.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t border-stone-200 bg-stone-50/60">
            <div className="text-xs text-stone-500 font-medium">
              Hiển thị <span className="font-semibold text-stone-900">{(currentPage - 1) * pageSize + 1}</span> -{" "}
              <span className="font-semibold text-stone-900">{Math.min(currentPage * pageSize, filtered.length)}</span> trong{" "}
              <span className="font-semibold text-stone-900">{filtered.length}</span> công thức
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-lg border border-stone-200 text-xs font-semibold text-stone-700 bg-white hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                Trước
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((page) => page === 1 || page === totalPages || Math.abs(page - currentPage) <= 2)
                .map((page, idx, arr) => {
                  const prev = arr[idx - 1];
                  return (
                    <React.Fragment key={page}>
                      {prev && page - prev > 1 && (
                        <span className="px-1 text-xs text-stone-400">...</span>
                      )}
                      <button
                        onClick={() => setCurrentPage(page)}
                        className={`min-w-8 h-8 px-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${currentPage === page
                          ? "bg-emerald-700 text-white"
                          : "bg-white border border-stone-200 text-stone-700 hover:bg-stone-50"
                          }`}
                      >
                        {page}
                      </button>
                    </React.Fragment>
                  );
                })}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded-lg border border-stone-200 text-xs font-semibold text-stone-700 bg-white hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                Sau
              </button>
            </div>
          </div>
        )}
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
        onCompleted={() => {
          loadAdminRecipes();
          refresh();
        }}
        onOpenExport={() => setExportModalOpen(true)}
      />

      {/* CSV Export Modal (Single ID, Multiple IDs, or Filter) */}
      <AdminExportModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        selectedIds={selectedIds}
        availableRecipes={allRecipes}
        activeFilters={{
          mealType: selectedMealType,
          dietType: selectedDiet,
          status: selectedStatus,
          search: search,
        }}
      />

      {/* Floating Batch Selection Toolbar */}
      {selectedIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-stone-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-stone-700 flex flex-wrap items-center gap-3.5 animate-in slide-in-from-bottom-5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-medium">
              Đã chọn <strong className="text-emerald-400 font-bold">{selectedIds.length}</strong> món
              <span className="text-stone-400 font-mono ml-1">
                (ID: {selectedIds.slice(0, 5).join(", ")}{selectedIds.length > 5 ? "..." : ""})
              </span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleQuickExportSelected}
              disabled={isDirectExporting}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Xuất file {selectedIds.length} món (CSV)</span>
            </button>

            <button
              onClick={() => setExportModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold transition-colors cursor-pointer"
            >
              Tùy chọn xuất...
            </button>

            <button
              onClick={() => setSelectedIds([])}
              className="px-2.5 py-1.5 rounded-xl text-stone-400 hover:text-white text-xs transition-colors cursor-pointer"
            >
              Bỏ chọn
            </button>
          </div>
        </div>
      )}

      {/* Redesigned Floating Toast Notification */}
      {toast && (
        <div className="fixed top-5 right-5 sm:right-8 z-50 max-w-md w-full animate-in slide-in-from-top-3 fade-in duration-200">
          <div
            className={`p-4 rounded-2xl shadow-xl border flex items-start gap-3 backdrop-blur-md ${
              toast.type === "success"
                ? "bg-emerald-50/95 border-emerald-200 text-emerald-950"
                : toast.type === "error"
                ? "bg-rose-50/95 border-rose-200 text-rose-950"
                : "bg-amber-50/95 border-amber-200 text-amber-950"
            }`}
          >
            {toast.type === "success" && (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            )}
            {toast.type === "error" && (
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            )}
            {toast.type === "info" && (
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            )}

            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold">
                {toast.type === "success"
                  ? "Thành công"
                  : toast.type === "error"
                  ? "Đã xảy ra lỗi"
                  : "Thông báo"}
              </p>
              <p className="text-xs mt-0.5 leading-relaxed text-stone-700 font-medium">
                {toast.message}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setToast(null)}
              className="text-stone-400 hover:text-stone-700 p-1 rounded-lg hover:bg-black/5 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Redesigned Modal: Từ chối duyệt công thức */}
      {rejectModalRecipe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden animate-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="p-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/70">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center shadow-xs">
                  <XCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-stone-900">
                    Từ chối duyệt công thức
                  </h3>
                  <p className="text-xs text-stone-500 truncate max-w-[280px]">
                    {rejectModalRecipe.name || rejectModalRecipe.title}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setRejectModalRecipe(null)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1.5">
                  Lý do từ chối (không bắt buộc):
                </label>
                <textarea
                  rows={4}
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Nhập lý do chi tiết nếu muốn (tùy chọn, có thể bỏ trống)..."
                  className="w-full p-3.5 rounded-2xl border border-stone-200 bg-stone-50/50 text-xs focus:bg-white focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none leading-relaxed"
                />
                <p className="text-[11px] text-stone-500 mt-1">
                  Người đăng công thức sẽ nhận được thông báo kèm lý do này để bổ sung/sửa đổi.
                </p>
              </div>

              {/* Suggested quick chips */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold text-stone-500">
                  Gợi ý lý do nhanh:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Nội dung chưa đầy đủ hoặc không phù hợp tiêu chuẩn cộng đồng",
                    "Nguyên liệu chứa thành phần không thuần chay",
                    "Ảnh món ăn bị mờ hoặc không đúng với món",
                    "Hướng dẫn nấu chưa chi tiết hoặc sai định lượng",
                  ].map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setRejectReason(preset)}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-stone-100 hover:bg-rose-50 hover:text-rose-700 text-stone-700 border border-stone-200 transition-colors cursor-pointer text-left"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-stone-100 flex items-center justify-end gap-2.5 bg-stone-50/60">
              <button
                type="button"
                onClick={() => setRejectModalRecipe(null)}
                disabled={isSubmittingReject}
                className="px-4 py-2.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold cursor-pointer transition-colors"
              >
                Hủy bỏ
              </button>

              <button
                type="button"
                onClick={handleConfirmReject}
                disabled={isSubmittingReject}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                {isSubmittingReject ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Đang xử lý...</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Xác nhận từ chối</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Redesigned Modal: Xác nhận xóa công thức */}
      {deleteModalRecipe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden animate-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="p-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/70">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center shadow-xs">
                  <Trash2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-stone-900">
                    Xác nhận xóa công thức
                  </h3>
                  <p className="text-xs text-stone-500">
                    Hành động này không thể hoàn tác
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setDeleteModalRecipe(null)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-3">
              <p className="text-sm text-stone-800 leading-relaxed">
                Bạn có chắc chắn muốn xóa công thức{" "}
                <strong className="text-rose-700 font-bold">
                  &quot;{deleteModalRecipe.title}&quot;
                </strong>{" "}
                không?
              </p>
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-[11px] text-rose-900 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>
                  Công thức sẽ được gỡ khỏi danh sách công khai và người dùng sẽ không còn tìm kiếm thấy món này.
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-stone-100 flex items-center justify-end gap-2.5 bg-stone-50/60">
              <button
                type="button"
                onClick={() => setDeleteModalRecipe(null)}
                disabled={isSubmittingDelete}
                className="px-4 py-2.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold cursor-pointer transition-colors"
              >
                Hủy bỏ
              </button>

              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isSubmittingDelete}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                {isSubmittingDelete ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Đang xóa...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Xóa công thức</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Redesigned Modal: Khôi phục dữ liệu mẫu */}
      {resetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden animate-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="p-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/70">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shadow-xs">
                  <RotateCcw className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-stone-900">
                    Đặt lại dữ liệu mẫu
                  </h3>
                  <p className="text-xs text-stone-500">
                    Khôi phục về trạng thái khởi tạo
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setResetModalOpen(false)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-3">
              <p className="text-sm text-stone-800 leading-relaxed">
                Bạn có chắc chắn muốn khôi phục toàn bộ công thức về dữ liệu mẫu mặc định ban đầu không?
              </p>
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  Các thay đổi cục bộ chưa lưu sẽ được thiết lập lại về danh sách mẫu hệ thống.
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-stone-100 flex items-center justify-end gap-2.5 bg-stone-50/60">
              <button
                type="button"
                onClick={() => setResetModalOpen(false)}
                className="px-4 py-2.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold cursor-pointer transition-colors"
              >
                Hủy bỏ
              </button>

              <button
                type="button"
                onClick={handleConfirmReset}
                className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Khôi phục dữ liệu</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
