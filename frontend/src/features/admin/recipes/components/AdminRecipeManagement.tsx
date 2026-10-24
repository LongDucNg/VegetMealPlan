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
  Activity,
  X,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { useRecipes } from "@/features/recipes/hooks/useRecipes";
import { Recipe, RecipeStatus, formatMealType } from "@/features/recipes";
import { formatVegetarianType } from "@/features/profile/types";
import { AdminRecipeModal } from "./AdminRecipeModal";
import { AdminRecipeDetailModal } from "./AdminRecipeDetailModal";
import { AdminImportModal } from "./AdminImportModal";
import { AdminNutritionModal } from "./AdminNutritionModal";
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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;

  const [modalOpen, setModalOpen] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [nutritionModalOpen, setNutritionModalOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [viewingRecipe, setViewingRecipe] = useState<Recipe | null>(null);

  // In-app dialog modal states
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState<{ id: string; title: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [recipeToReject, setRecipeToReject] = useState<Recipe | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [isRejecting, setIsRejecting] = useState(false);

  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  // Toast notification state
  const [toast, setToast] = useState<{
    id: number;
    type: "success" | "error" | "info";
    message: string;
  } | null>(null);

  const showToast = useCallback((type: "success" | "error" | "info", message: string) => {
    const id = Date.now();
    setToast({ id, type, message });
    setTimeout(() => {
      setToast((prev) => (prev?.id === id ? null : prev));
    }, 3500);
  }, []);

  const loadAdminRecipes = useCallback(async () => {
    setLoadingServer(true);
    try {
      const data = await recipeApiService.getAdminRecipes();
      const list = Array.isArray(data) ? data : (data as any)?.data || [];
      if (Array.isArray(list)) {
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
      setServerRecipes((prev) =>
        prev.map((r) => (r.id === recipe.id ? { ...r, status: "APPROVED" as RecipeStatus } : r))
      );
      await loadAdminRecipes();
      refresh();
      showToast("success", `Đã phê duyệt công thức "${recipe.name || recipe.title}" thành công!`);
    } catch (err: any) {
      showToast("error", err?.message || "Không thể phê duyệt công thức này");
    }
  };

  const handleOpenReject = (recipe: Recipe) => {
    setRecipeToReject(recipe);
    setRejectReason("Nội dung chưa đầy đủ hoặc không phù hợp tiêu chuẩn cộng đồng");
    setRejectModalOpen(true);
  };

  const handleConfirmReject = async () => {
    if (!recipeToReject) return;
    setIsRejecting(true);
    const numId = parseInt(recipeToReject.id.replace(/\D/g, ""), 10);
    const recipeTitle = recipeToReject.name || recipeToReject.title;
    try {
      if (!isNaN(numId)) {
        await recipeApiService.reviewRecipe(numId, "rejected", rejectReason);
      }
      setServerRecipes((prev) =>
        prev.map((r) => (String(r.id) === String(recipeToReject.id) ? { ...r, status: "REJECTED" as RecipeStatus } : r))
      );
      setRejectModalOpen(false);
      setRecipeToReject(null);
      await loadAdminRecipes();
      refresh();
      showToast("success", `Đã từ chối công thức "${recipeTitle}"!`);
    } catch (err: any) {
      setRejectModalOpen(false);
      setRecipeToReject(null);
      showToast("error", err?.message || "Không thể từ chối công thức này");
    } finally {
      setIsRejecting(false);
    }
  };

  const handleOpenDelete = (id: string, title: string) => {
    setRecipeToDelete({ id, title });
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!recipeToDelete) return;
    setIsDeleting(true);
    const idToDelete = recipeToDelete.id;
    const titleToDelete = recipeToDelete.title;
    const numId = parseInt(idToDelete.replace(/\D/g, ""), 10);
    try {
      if (!isNaN(numId)) {
        await recipeApiService.deleteRecipe(numId);
      }
      try {
        recipeService.deleteRecipe(idToDelete);
      } catch (_) {}
      // Gỡ khỏi state tức thì để giao diện biến mất ngay không cần reload trang
      setServerRecipes((prev) => prev.filter((r) => String(r.id) !== String(idToDelete)));
      setDeleteModalOpen(false);
      setRecipeToDelete(null);
      await loadAdminRecipes();
      refresh();
      showToast("success", `Đã xóa công thức "${titleToDelete}" thành công!`);
    } catch (err: any) {
      setDeleteModalOpen(false);
      setRecipeToDelete(null);
      showToast("error", err?.message || `Không thể xóa công thức "${titleToDelete}"`);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleConfirmReset = async () => {
    setIsResetting(true);
    try {
      recipeService.resetRecipes();
      setResetModalOpen(false);
      await loadAdminRecipes();
      refresh();
      showToast("info", "Đã khôi phục dữ liệu mẫu mặc định!");
    } catch (err: any) {
      setResetModalOpen(false);
      showToast("error", err?.message || "Không thể khôi phục dữ liệu");
    } finally {
      setIsResetting(false);
    }
  };

  // Filtered recipes
  const filtered = allRecipes.filter((r) => {
    // Không hiển thị công thức đã bị xóa (removed) trừ khi admin chọn bộ lọc cụ thể
    if (selectedStatus === "all" && (r.status || "").toLowerCase() === "removed") {
      return false;
    }
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

  const handleOpenEdit = (recipe: Recipe) => {
    setEditingRecipe(recipe);
    setModalOpen(true);
  };

  const handleSave = async (recipeData: Omit<Recipe, "id">, editId?: string) => {
    try {
      if (editId) {
        await updateRecipe(editId, recipeData);
        showToast("success", `Đã cập nhật công thức "${recipeData.name || recipeData.title}" thành công!`);
      } else {
        await createRecipe(recipeData);
        showToast("success", "Đã tạo công thức mới thành công!");
      }
      await loadAdminRecipes();
      refresh();
    } catch (err: any) {
      showToast("error", err?.message || "Thao tác lưu công thức thất bại");
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
            onClick={() => setResetModalOpen(true)}
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

          {/* Nutrition DB Button (API /nutrition) */}
          <button
            onClick={() => setNutritionModalOpen(true)}
            className="h-10 px-4 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Activity className="w-4 h-4 text-emerald-700" />
            <span>Dinh dưỡng (API)</span>
          </button>

          {/* Import Recipes Button (Requirement 8) */}
          <button
            onClick={() => setImportModalOpen(true)}
            className="h-10 px-4 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
            <span>Nhập từ file (Import)</span>
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
          <span>Chỉ các công thức &quot;ĐÃ DUYỆT&quot; mới xuất hiện trong Kế hoạch Thực đơn</span>
        </div>

        <div className="divide-y divide-stone-100">
          {paginatedRecipes.map((recipe) => {
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
                        onClick={() => handleOpenReject(recipe)}
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
                    onClick={() => handleOpenDelete(recipe.id, recipe.name || recipe.title)}
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
                        className={`min-w-8 h-8 px-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                          currentPage === page
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
        onCompleted={async () => {
          await loadAdminRecipes();
          refresh();
          showToast("success", "Đã cập nhật danh sách công thức thành công!");
        }}
      />

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && recipeToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-100 animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 text-center mb-2">
              Xác nhận xóa công thức
            </h3>
            <p className="text-sm text-stone-600 text-center mb-6 leading-relaxed">
              Bạn có chắc chắn muốn xóa vĩnh viễn công thức <span className="font-semibold text-stone-900">"{recipeToDelete.title}"</span>? Thao tác này sẽ gỡ công thức khỏi hệ thống và không thể hoàn tác.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => {
                  setDeleteModalOpen(false);
                  setRecipeToDelete(null);
                }}
                className="flex-1 h-11 rounded-xl border border-stone-200 text-sm font-semibold text-stone-700 hover:bg-stone-50 transition-colors cursor-pointer disabled:opacity-50"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleConfirmDelete}
                className="flex-1 h-11 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
              >
                {isDeleting && <Loader2 className="w-4 h-4 animate-spin" />}
                {isDeleting ? "Đang xóa..." : "Xác nhận xóa"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Recipe Modal */}
      {rejectModalOpen && recipeToReject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-100 animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 text-center mb-1">
              Từ chối công thức
            </h3>
            <p className="text-xs text-stone-500 text-center mb-4 truncate px-2 font-medium">
              {recipeToReject.name || recipeToReject.title}
            </p>
            <div className="mb-5">
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Lý do từ chối kiểm duyệt <span className="text-red-500">*</span>
              </label>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Nhập lý do gửi đến tác giả để họ chỉnh sửa..."
                rows={3}
                className="w-full p-3 rounded-xl border border-stone-200 text-sm text-stone-800 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 resize-none"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                disabled={isRejecting}
                onClick={() => {
                  setRejectModalOpen(false);
                  setRecipeToReject(null);
                }}
                className="flex-1 h-11 rounded-xl border border-stone-200 text-sm font-semibold text-stone-700 hover:bg-stone-50 transition-colors cursor-pointer disabled:opacity-50"
              >
                Hủy
              </button>
              <button
                type="button"
                disabled={isRejecting || !rejectReason.trim()}
                onClick={handleConfirmReject}
                className="flex-1 h-11 rounded-xl bg-amber-600 text-white text-sm font-semibold hover:bg-amber-700 transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
              >
                {isRejecting && <Loader2 className="w-4 h-4 animate-spin" />}
                {isRejecting ? "Đang xử lý..." : "Xác nhận từ chối"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {resetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-100 animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 text-center mb-2">
              Khôi phục dữ liệu mẫu
            </h3>
            <p className="text-sm text-stone-600 text-center mb-6 leading-relaxed">
              Bạn có chắc chắn muốn làm mới toàn bộ danh sách về dữ liệu mẫu ban đầu? Các công thức thêm thủ công trong bộ nhớ tạm sẽ bị đặt lại.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                disabled={isResetting}
                onClick={() => setResetModalOpen(false)}
                className="flex-1 h-11 rounded-xl border border-stone-200 text-sm font-semibold text-stone-700 hover:bg-stone-50 transition-colors cursor-pointer disabled:opacity-50"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                disabled={isResetting}
                onClick={handleConfirmReset}
                className="flex-1 h-11 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
              >
                {isResetting && <Loader2 className="w-4 h-4 animate-spin" />}
                {isResetting ? "Đang khôi phục..." : "Xác nhận khôi phục"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-top-4 fade-in duration-300">
          <div
            className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border text-sm font-semibold backdrop-blur-md ${
              toast.type === "success"
                ? "bg-emerald-50/95 text-emerald-950 border-emerald-300 shadow-emerald-900/10"
                : toast.type === "error"
                ? "bg-red-50/95 text-red-950 border-red-300 shadow-red-900/10"
                : "bg-blue-50/95 text-blue-950 border-blue-300 shadow-blue-900/10"
            }`}
          >
            {toast.type === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
            {toast.type === "error" && <XCircle className="w-5 h-5 text-red-600 shrink-0" />}
            {toast.type === "info" && <AlertCircle className="w-5 h-5 text-blue-600 shrink-0" />}
            <span>{toast.message}</span>
            <button
              onClick={() => setToast(null)}
              className="ml-3 p-1 rounded-lg hover:bg-black/5 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
