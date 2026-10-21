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
  AlertTriangle,
  Trash2,
  X,
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

  // Tab & Conflicts Management (Phần 10)
  const [mainTab, setMainTab] = useState<"ingredients" | "conflicts">("ingredients");
  const [conflicts, setConflicts] = useState<any[]>([]);
  const [conflictsLoading, setConflictsLoading] = useState(false);
  const [conflictSearch, setConflictSearch] = useState("");
  const [conflictModalOpen, setConflictModalOpen] = useState(false);
  const [ing1Id, setIng1Id] = useState<number | "">("");
  const [ing2Id, setIng2Id] = useState<number | "">("");
  const [conflictReason, setConflictReason] = useState("");
  const [savingConflict, setSavingConflict] = useState(false);

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

  const loadConflicts = async () => {
    setConflictsLoading(true);
    try {
      const data = await ingredientApiService.getIngredientConflicts();
      const list = Array.isArray(data) ? data : (data as any)?.data || [];
      setConflicts(list);
    } catch (err) {
      console.error("Failed to load conflicts:", err);
    } finally {
      setConflictsLoading(false);
    }
  };

  useEffect(() => {
    loadIngredients();
  }, []);

  useEffect(() => {
    if (mainTab === "conflicts") {
      loadConflicts();
    }
  }, [mainTab]);

  const handleSaveConflict = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ing1Id || !ing2Id) {
      alert("Vui lòng chọn cả 2 nguyên liệu.");
      return;
    }
    if (ing1Id === ing2Id) {
      alert("Hai nguyên liệu kỵ nhau phải khác nhau.");
      return;
    }
    setSavingConflict(true);
    try {
      await ingredientApiService.createIngredientConflict(
        Number(ing1Id),
        Number(ing2Id),
        conflictReason.trim() || undefined,
      );
      setConflictModalOpen(false);
      setIng1Id("");
      setIng2Id("");
      setConflictReason("");
      loadConflicts();
    } catch (err: any) {
      alert(err?.message || "Không thể lưu cặp nguyên liệu xung khắc.");
    } finally {
      setSavingConflict(false);
    }
  };

  const handleDeleteConflict = async (id1: number, id2: number) => {
    if (!confirm("Bạn có chắc chắn muốn xoá quy tắc kỵ nhau giữa hai nguyên liệu này?")) return;
    try {
      await ingredientApiService.deleteIngredientConflict(id1, id2);
      loadConflicts();
    } catch (err: any) {
      alert(err?.message || "Không thể xoá quy tắc.");
    }
  };

  // Quick stats
  const stats = useMemo(() => {
    const total = ingredients.length;
    const active = ingredients.filter((i) => i.status === "active").length;
    const inactive = total - active;
    const vegan = ingredients.filter((i) => i.vegan_flag).length;
    return { total, active, inactive, vegan };
  }, [ingredients]);

  // Filtering conflicts
  const filteredConflicts = useMemo(() => {
    if (!conflictSearch.trim()) return conflicts;
    const q = conflictSearch.trim().toLowerCase();
    return conflicts.filter((c) => {
      const name1 = (c.ingredient_1?.ingredient_name || "").toLowerCase();
      const name2 = (c.ingredient_2?.ingredient_name || "").toLowerCase();
      const reason = (c.reason || "").toLowerCase();
      return name1.includes(q) || name2.includes(q) || reason.includes(q);
    });
  }, [conflicts, conflictSearch]);

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
            {mainTab === "ingredients" ? "Kho Nguyên liệu & Bảng giá chuẩn" : "Quản lý Nguyên liệu kỵ nhau (Tương kỵ thực phẩm)"}
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            {mainTab === "ingredients"
              ? "Quản lý toàn bộ danh mục nguyên liệu thực phẩm, giá thị trường tham khảo và chỉ số dinh dưỡng."
              : "Thiết lập danh sách các cặp thực phẩm tương kỵ kỵ nhau để cảnh báo người dùng và admin khi lên thực đơn hoặc tạo công thức."}
          </p>
        </div>

        {mainTab === "ingredients" ? (
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-sm shadow-emerald-900/10 cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm nguyên liệu mới</span>
          </button>
        ) : (
          <button
            onClick={() => {
              setIng1Id("");
              setIng2Id("");
              setConflictReason("");
              setConflictModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all shadow-sm shadow-amber-900/10 cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm quy tắc kỵ nhau</span>
          </button>
        )}
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-3">
        <button
          type="button"
          onClick={() => setMainTab("ingredients")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            mainTab === "ingredients"
              ? "bg-emerald-700 text-white shadow-xs"
              : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-50"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Kho nguyên liệu ({ingredients.length})</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setMainTab("conflicts");
            loadConflicts();
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            mainTab === "conflicts"
              ? "bg-amber-600 text-white shadow-xs"
              : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-50"
          }`}
        >
          <AlertTriangle className={`w-4 h-4 ${mainTab === "conflicts" ? "text-white" : "text-amber-500"}`} />
          <span>Nguyên liệu kỵ nhau ({conflicts.length})</span>
        </button>
      </div>

      {mainTab === "ingredients" ? (
        <>
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
    </>
  ) : (
        /* Tab: Nguyên liệu kỵ nhau (Phần 10) */
        <div className="space-y-4">
          {/* Info Banner */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 leading-relaxed">
              <p className="font-bold text-amber-950">Quy tắc tương kỵ thực phẩm (Phần 10)</p>
              <p className="mt-0.5 text-amber-800">
                Hệ thống tự động tra cứu danh sách này khi người dùng hoặc quản trị viên thêm nguyên liệu vào công thức hoặc lên thực đơn. Nếu phát hiện hai nguyên liệu kỵ nhau xuất hiện cùng một món hoặc cùng một bữa ăn, hệ thống sẽ cảnh báo nguy cơ sức khỏe kèm lý do khoa học cụ thể.
              </p>
            </div>
          </div>

          {/* Conflict Search & Action */}
          <div className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={conflictSearch}
                onChange={(e) => setConflictSearch(e.target.value)}
                placeholder="Tìm kiếm theo tên nguyên liệu hoặc lý do..."
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-200 text-xs bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
              />
            </div>
            <div className="text-xs font-bold text-stone-500">
              Tổng số quy tắc: <span className="text-stone-900">{filteredConflicts.length}</span>
            </div>
          </div>

          {/* Conflict Table */}
          {conflictsLoading ? (
            <div className="p-16 rounded-2xl bg-white border border-stone-200 flex flex-col items-center justify-center text-center">
              <Loader2 className="w-8 h-8 text-amber-600 animate-spin mb-3" />
              <p className="text-xs font-bold text-stone-600">Đang tải danh mục tương kỵ...</p>
            </div>
          ) : filteredConflicts.length === 0 ? (
            <div className="p-16 rounded-2xl bg-white border border-stone-200 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 mx-auto flex items-center justify-center text-amber-600">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-stone-800">Không tìm thấy quy tắc tương kỵ nào</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Chưa có quy tắc nào khớp với từ khóa tìm kiếm.
              </p>
            </div>
          ) : (
            <div className="rounded-2xl bg-white border border-stone-200/80 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-stone-100 bg-stone-50/70 text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                      <th className="py-3.5 px-4">Nguyên liệu 1</th>
                      <th className="py-3.5 px-4 text-center">Tương tác</th>
                      <th className="py-3.5 px-4">Nguyên liệu 2</th>
                      <th className="py-3.5 px-4">Lý do khoa học / Tác hại</th>
                      <th className="py-3.5 px-4 text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-xs">
                    {filteredConflicts.map((c, idx) => {
                      const id1 = c.ingredient_id_1 ?? c.ingredient_1_id;
                      const id2 = c.ingredient_id_2 ?? c.ingredient_2_id;
                      return (
                        <tr key={`${id1}-${id2}-${idx}`} className="hover:bg-amber-50/30 transition-colors">
                          <td className="py-3.5 px-4">
                            <span className="font-bold text-stone-900">
                              {c.ingredient_1?.ingredient_name || `Nguyên liệu #${id1}`}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-50 text-red-700 border border-red-200 text-[11px] font-bold">
                              <AlertTriangle className="w-3 h-3 text-red-500" />
                              <span>Kỵ nhau</span>
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-bold text-stone-900">
                              {c.ingredient_2?.ingredient_name || `Nguyên liệu #${id2}`}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <p className="text-stone-700 leading-relaxed text-[11px] max-w-md">
                              {c.reason || "Hai thực phẩm phản ứng giảm hấp thu hoặc sinh độc tố nhẹ khi dùng cùng nhau."}
                            </p>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => handleDeleteConflict(id1, id2)}
                              className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                              title="Xoá quy tắc"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Modal Thêm Quy Tắc Kỵ Nhau */}
          {conflictModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs">
              <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-stone-200 space-y-5 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-amber-700">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-stone-900">Thêm quy tắc kỵ nhau mới</h3>
                      <p className="text-[11px] text-stone-500">Cảnh báo khi người dùng kết hợp 2 nguyên liệu này</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setConflictModalOpen(false)}
                    className="p-1 rounded-lg text-stone-400 hover:text-stone-600 hover:bg-stone-100 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Nguyên liệu 1</label>
                    <select
                      value={ing1Id}
                      onChange={(e) => setIng1Id(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                    >
                      <option value="">-- Chọn nguyên liệu thứ nhất --</option>
                      {ingredients.map((ing) => (
                        <option key={ing.ingredient_id} value={ing.ingredient_id}>
                          {ing.ingredient_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Nguyên liệu 2 (Kỵ với)</label>
                    <select
                      value={ing2Id}
                      onChange={(e) => setIng2Id(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                    >
                      <option value="">-- Chọn nguyên liệu thứ hai --</option>
                      {ingredients
                        .filter((ing) => ing.ingredient_id !== Number(ing1Id))
                        .map((ing) => (
                          <option key={ing.ingredient_id} value={ing.ingredient_id}>
                            {ing.ingredient_name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Lý do khoa học / Tác hại</label>
                    <textarea
                      rows={3}
                      value={conflictReason}
                      onChange={(e) => setConflictReason(e.target.value)}
                      placeholder="Ví dụ: Axit oxalic trong rau bina kết hợp với canxi trong đậu hũ tạo thành canxi oxalat khó tan, lâu ngày gây lắng đọng sỏi thận."
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-100">
                  <button
                    type="button"
                    onClick={() => setConflictModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 text-xs font-bold transition-all cursor-pointer"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="button"
                    disabled={!ing1Id || !ing2Id || !conflictReason.trim() || savingConflict}
                    onClick={handleSaveConflict}
                    className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    {savingConflict && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    <span>Lưu quy tắc</span>
                  </button>
                </div>
              </div>
            </div>
          )}
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
