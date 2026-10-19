"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Plus,
  Search,
  Pencil,
  Eye,
  Archive,
  RotateCcw,
  Sparkles,
  DollarSign,
  Flame,
  Leaf,
  Layers,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/ui/Table";
import {
  BackendIngredient,
  ingredientApiService,
} from "@/features/recipes/services/ingredientApiService";
import { AdminIngredientModal } from "./AdminIngredientModal";
import { AdminIngredientDetailModal } from "./AdminIngredientDetailModal";

export function AdminIngredientManagement() {
  const [ingredients, setIngredients] = useState<BackendIngredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<"all" | "active" | "inactive">("all");
  const [selectedDiet, setSelectedDiet] = useState<"all" | "vegan" | "non_vegan">("all");
  const [sortBy, setSortBy] = useState<"name" | "price_desc" | "price_asc" | "calories_desc" | "newest">("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;

  const [modalOpen, setModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [editingIngredient, setEditingIngredient] = useState<BackendIngredient | null>(null);
  const [viewingIngredient, setViewingIngredient] = useState<BackendIngredient | null>(null);

  const loadIngredients = async () => {
    setLoading(true);
    try {
      const data = await ingredientApiService.getIngredients();
      const list = Array.isArray(data) ? data : (data as any)?.data || [];
      setIngredients(list);
    } catch (err) {
      console.error("Failed to load ingredients:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIngredients();
  }, []);

  // Quick stats
  const stats = useMemo(() => {
    const total = ingredients.length;
    const active = ingredients.filter((i) => i.status === "active").length;
    const inactive = total - active;
    const vegan = ingredients.filter((i) => i.vegan_flag).length;
    return { total, active, inactive, vegan };
  }, [ingredients]);

  // Filtering & Sorting
  const filteredIngredients = useMemo(() => {
    let result = [...ingredients];

    // Search query
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (i) =>
          i.ingredient_name.toLowerCase().includes(q) ||
          (i.description && i.description.toLowerCase().includes(q))
      );
    }

    // Status filter
    if (selectedStatus !== "all") {
      result = result.filter((i) => i.status === selectedStatus);
    }

    // Vegan filter
    if (selectedDiet === "vegan") {
      result = result.filter((i) => i.vegan_flag);
    } else if (selectedDiet === "non_vegan") {
      result = result.filter((i) => !i.vegan_flag);
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === "name") {
        return a.ingredient_name.localeCompare(b.ingredient_name, "vi");
      }
      if (sortBy === "price_desc") {
        return (b.avg_price_per_unit || 0) - (a.avg_price_per_unit || 0);
      }
      if (sortBy === "price_asc") {
        return (a.avg_price_per_unit || 0) - (b.avg_price_per_unit || 0);
      }
      if (sortBy === "calories_desc") {
        return (b.calories_per_100g || 0) - (a.calories_per_100g || 0);
      }
      // Newest
      return b.ingredient_id - a.ingredient_id;
    });

    return result;
  }, [ingredients, search, selectedStatus, selectedDiet, sortBy]);

  // Pagination calculation
  const totalItems = filteredIngredients.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const paginatedIngredients = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredIngredients.slice(start, start + pageSize);
  }, [filteredIngredients, currentPage, pageSize]);

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedStatus, selectedDiet, sortBy]);

  // Open modals
  const handleOpenAdd = () => {
    setEditingIngredient(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (ing: BackendIngredient) => {
    setEditingIngredient(ing);
    setModalOpen(true);
  };

  const handleOpenDetail = (ing: BackendIngredient) => {
    setViewingIngredient(ing);
    setDetailModalOpen(true);
  };

  const handleSaveSuccess = (saved: BackendIngredient, isEdit: boolean) => {
    if (isEdit) {
      setIngredients((prev) =>
        prev.map((i) => (i.ingredient_id === saved.ingredient_id ? saved : i))
      );
    } else {
      setIngredients((prev) => [saved, ...prev]);
    }
  };

  const handleToggleStatus = async (ing: BackendIngredient) => {
    const nextStatus = ing.status === "active" ? "inactive" : "active";
    const promptText =
      nextStatus === "inactive"
        ? `Tạm dừng nguyên liệu "${ing.ingredient_name}"?`
        : `Kích hoạt lại nguyên liệu "${ing.ingredient_name}"?`;

    if (!confirm(promptText)) return;

    try {
      const updated = await ingredientApiService.adminUpdateIngredient(ing.ingredient_id, {
        status: nextStatus,
      });
      setIngredients((prev) =>
        prev.map((i) => (i.ingredient_id === ing.ingredient_id ? updated : i))
      );
    } catch (err: any) {
      alert(err?.message || "Không thể cập nhật trạng thái");
    }
  };

  return (
    <div className="space-y-7">
      {/* Top Banner & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-serif font-bold text-stone-900">
            Kho Nguyên liệu & Bảng giá chuẩn
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Quản lý toàn bộ danh mục nguyên liệu thực phẩm, giá thị trường tham khảo và chỉ số dinh dưỡng.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-sm shadow-emerald-900/10 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm nguyên liệu mới</span>
        </button>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">
              Tổng nguyên liệu
            </span>
            <span className="text-2xl font-serif font-bold text-stone-900 mt-0.5 block">
              {stats.total.toLocaleString()}
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-600">
            <Layers className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 block">
              Đang hoạt động
            </span>
            <span className="text-2xl font-serif font-bold text-emerald-800 mt-0.5 block">
              {stats.active.toLocaleString()}
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 block">
              Tạm ngưng
            </span>
            <span className="text-2xl font-serif font-bold text-stone-700 mt-0.5 block">
              {stats.inactive.toLocaleString()}
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-700">
            <Archive className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 block">
              Thuần chay (Vegan)
            </span>
            <span className="text-2xl font-serif font-bold text-emerald-900 mt-0.5 block">
              {stats.vegan.toLocaleString()}
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700">
            <Leaf className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm kiếm theo tên nguyên liệu, mô tả..."
              className="w-full h-10 pl-10 pr-4 rounded-xl border border-stone-200 text-xs focus:border-emerald-600 outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="h-10 px-3 rounded-xl border border-stone-200 text-xs bg-white focus:border-emerald-600 outline-none font-medium text-stone-700"
            >
              <option value="newest">Mới nhất</option>
              <option value="name">Tên (A → Z)</option>
              <option value="price_desc">Giá cao → thấp</option>
              <option value="price_asc">Giá thấp → cao</option>
              <option value="calories_desc">Calo cao nhất</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100 text-xs">
          <span className="font-semibold text-stone-500 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Trạng thái:
          </span>
          {[
            { id: "all", label: "Tất cả" },
            { id: "active", label: "Hoạt động" },
            { id: "inactive", label: "Tạm ngưng" },
          ].map((st) => (
            <button
              key={st.id}
              onClick={() => setSelectedStatus(st.id as any)}
              className={`px-3 py-1.5 rounded-xl font-medium transition-colors cursor-pointer ${
                selectedStatus === st.id
                  ? "bg-emerald-700 text-white font-semibold shadow-xs"
                  : "bg-stone-50 border border-stone-200 text-stone-600 hover:bg-stone-100"
              }`}
            >
              {st.label}
            </button>
          ))}

          <span className="font-semibold text-stone-500 ml-3 mr-1">Chế độ:</span>
          {[
            { id: "all", label: "Tất cả" },
            { id: "vegan", label: "Thuần chay" },
            { id: "non_vegan", label: "Chay khác" },
          ].map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedDiet(d.id as any)}
              className={`px-3 py-1.5 rounded-xl font-medium transition-colors cursor-pointer ${
                selectedDiet === d.id
                  ? "bg-emerald-700 text-white font-semibold shadow-xs"
                  : "bg-stone-50 border border-stone-200 text-stone-600 hover:bg-stone-100"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Data Table */}
      {loading ? (
        <div className="py-16 flex flex-col items-center justify-center text-stone-500 gap-3 text-xs">
          <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />
          <span>Đang tải danh sách 190+ nguyên liệu từ hệ thống...</span>
        </div>
      ) : paginatedIngredients.length === 0 ? (
        <div className="py-12 bg-white rounded-2xl border border-stone-200/80 text-center p-8 space-y-2">
          <p className="font-bold text-stone-700 text-sm">Không tìm thấy nguyên liệu nào phù hợp</p>
          <p className="text-stone-400 text-xs">
            Thử thay đổi từ khóa tìm kiếm hoặc đặt lại các bộ lọc trạng thái.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <DataTable
            columns={[
              { key: "id", label: "#ID" },
              { key: "name", label: "Tên nguyên liệu" },
              { key: "unit", label: "Đơn vị" },
              { key: "price", label: "Giá chuẩn thị trường" },
              { key: "nutrition", label: "Dinh dưỡng / 100g" },
              { key: "vegan", label: "Thuần chay" },
              { key: "status", label: "Trạng thái" },
              { key: "actions", label: "" },
            ]}
            rows={paginatedIngredients.map((ing) => ({
              id: (
                <span className="font-mono text-xs text-stone-400 font-bold">
                  #{ing.ingredient_id}
                </span>
              ),
              name: (
                <div>
                  <span className="font-semibold text-stone-900 text-xs sm:text-sm block">
                    {ing.ingredient_name}
                  </span>
                  {ing.description && (
                    <span className="text-[11px] text-stone-400 line-clamp-1">
                      {ing.description}
                    </span>
                  )}
                </div>
              ),
              unit: (
                <span className="text-xs font-bold text-stone-600 bg-stone-100 px-2.5 py-1 rounded-lg">
                  {ing.unit}
                </span>
              ),
              price: (
                <div className="font-mono font-bold text-xs text-emerald-800">
                  {(ing.avg_price_per_unit || 0).toLocaleString("vi-VN")} VNĐ
                  <span className="text-[10px] text-stone-400 font-normal block">
                    / {ing.unit}
                  </span>
                </div>
              ),
              nutrition: (
                <div className="text-xs space-y-0.5">
                  <div className="font-bold text-amber-600 flex items-center gap-1">
                    <Flame className="w-3 h-3" />
                    <span>{ing.calories_per_100g ?? 0} kcal</span>
                  </div>
                  <div className="text-[10px] text-stone-500">
                    Đạm: {ing.protein_per_100g ?? 0}g · Tinh bột: {ing.carb_per_100g ?? 0}g · Béo: {ing.fat_per_100g ?? 0}g
                  </div>
                </div>
              ),
              vegan: ing.vegan_flag ? (
                <Badge variant="success">Thuần chay</Badge>
              ) : (
                <Badge variant="info">Chay trứng sữa</Badge>
              ),
              status:
                ing.status === "active" ? (
                  <Badge variant="success">Hoạt động</Badge>
                ) : (
                  <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-stone-200 text-stone-700">
                    Tạm ngưng
                  </span>
                ),
              actions: (
                <div className="flex items-center gap-1 justify-end">
                  <button
                    onClick={() => handleOpenDetail(ing)}
                    className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
                    title="Xem chi tiết"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleOpenEdit(ing)}
                    className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
                    title="Chỉnh sửa"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleToggleStatus(ing)}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      ing.status === "active"
                        ? "hover:bg-amber-50 text-stone-400 hover:text-amber-700"
                        : "hover:bg-emerald-50 text-stone-400 hover:text-emerald-700"
                    }`}
                    title={ing.status === "active" ? "Tạm ngưng" : "Kích hoạt"}
                  >
                    {ing.status === "active" ? (
                      <Archive className="w-3.5 h-3.5" />
                    ) : (
                      <RotateCcw className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              ),
            }))}
          />

          {/* Pagination bar */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone-100">
            <p className="text-xs text-stone-500">
              Hiển thị{" "}
              <span className="font-bold text-stone-800">
                {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, totalItems)}
              </span>{" "}
              trên tổng số <span className="font-bold text-stone-800">{totalItems}</span> nguyên liệu
            </p>

            {totalPages > 1 && (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage <= 1}
                  className="px-3 py-1.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-600 text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Trước</span>
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }).map((_, idx) => {
                    const pageNum = idx + 1;
                    // Show only near current page
                    if (
                      pageNum === 1 ||
                      pageNum === totalPages ||
                      (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-8 h-8 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center justify-center ${
                            pageNum === currentPage
                              ? "bg-emerald-700 text-white shadow-xs"
                              : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-50"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    }
                    if (
                      pageNum === currentPage - 2 ||
                      pageNum === currentPage + 2
                    ) {
                      return (
                        <span key={pageNum} className="px-1 text-stone-400 text-xs font-bold">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage >= totalPages}
                  className="px-3 py-1.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-600 text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center gap-1"
                >
                  <span>Sau</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modals */}
      <AdminIngredientModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={handleSaveSuccess}
        ingredient={editingIngredient}
      />

      <AdminIngredientDetailModal
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        onEdit={(ing) => {
          setDetailModalOpen(false);
          handleOpenEdit(ing);
        }}
        ingredient={viewingIngredient}
      />
    </div>
  );
}
