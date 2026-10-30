"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import {
  X,
  CheckCircle2,
  AlertCircle,
  Filter,
  Layers,
  Search,
  FileSpreadsheet,
  Sparkles,
  Tag,
  Check,
  Trash2,
  Info,
} from "lucide-react";
import { adminRecipeApiService } from "@/features/admin/services/adminRecipeApiService";
import { Recipe } from "@/features/recipes/types";

// 10 danh mục chuẩn quản trị từ cơ sở dữ liệu
export const ADMIN_RECIPE_CATEGORIES = [
  "Mì, Bún & Phở",
  "Cơm, Xôi & Cháo",
  "Bánh, Bánh bột & Ăn vặt",
  "Tráng miệng & Đồ uống",
  "Món kho & Rim",
  "Xào & Chiên",
  "Luộc & Hấp",
  "Cuốn, Gỏi & Sa lát",
  "Canh & Súp",
  "Món đủ bữa",
] as const;

/** Kiểm tra công thức có thuộc danh mục hay không (hỗ trợ cả mảng categories, category string và từ khóa nhận diện) */
export function recipeHasCategory(r: Recipe, cat: string): boolean {
  if (!cat || cat === "all") return true;
  const normCat = cat.trim().toLowerCase();

  // 1. Khớp qua r.categories mảng
  if (Array.isArray(r.categories) && r.categories.length > 0) {
    if (r.categories.some((c) => c && c.trim().toLowerCase() === normCat)) {
      return true;
    }
  }

  // 2. Khớp qua r.category đơn
  if (r.category && r.category.trim().toLowerCase() === normCat) {
    return true;
  }

  // 3. Khớp thông minh theo từ khóa tên món (phòng khi công thức chưa gán hoặc đang mang nhãn mặc định)
  const title = (r.name || r.title || "").toLowerCase();
  if (normCat.includes("mì") || normCat.includes("bún") || normCat.includes("phở")) {
    return (
      title.includes("mì") ||
      title.includes("bún") ||
      title.includes("phở") ||
      title.includes("hủ tiếu") ||
      title.includes("miến") ||
      title.includes("nui")
    );
  }
  if (normCat.includes("cơm") || normCat.includes("xôi") || normCat.includes("cháo")) {
    return title.includes("cơm") || title.includes("xôi") || title.includes("cháo");
  }
  if (normCat.includes("canh") || normCat.includes("súp")) {
    return title.includes("canh") || title.includes("súp") || title.includes("lẩu");
  }
  if (normCat.includes("xào") || normCat.includes("chiên")) {
    return title.includes("xào") || title.includes("chiên") || title.includes("rán");
  }
  if (normCat.includes("kho") || normCat.includes("rim")) {
    return title.includes("kho") || title.includes("rim");
  }
  if (normCat.includes("luộc") || normCat.includes("hấp")) {
    return title.includes("luộc") || title.includes("hấp");
  }
  if (normCat.includes("cuốn") || normCat.includes("gỏi") || normCat.includes("sa lát")) {
    return (
      title.includes("cuốn") ||
      title.includes("gỏi") ||
      title.includes("salad") ||
      title.includes("sa lát") ||
      title.includes("nộm")
    );
  }
  if (normCat.includes("bánh") || normCat.includes("ăn vặt")) {
    return (
      title.includes("bánh") ||
      title.includes("chả giò") ||
      title.includes("nem") ||
      title.includes("ăn vặt")
    );
  }
  if (normCat.includes("tráng miệng") || normCat.includes("đồ uống")) {
    return (
      title.includes("chè") ||
      title.includes("trà") ||
      title.includes("nước") ||
      title.includes("sinh tố") ||
      title.includes("sữa") ||
      title.includes("thạch")
    );
  }
  if (normCat.includes("món đủ bữa")) {
    return (
      r.mealType === "lunch" ||
      r.mealType === "dinner" ||
      title.includes("cơm") ||
      title.includes("bún") ||
      title.includes("phở") ||
      title.includes("lẩu")
    );
  }

  return false;
}

/** Lấy tên danh mục hiển thị chuẩn xác nhất cho chip món ăn */
export function getRecipeDisplayCategory(r: Recipe): string {
  if (r.category && r.category.trim() && r.category !== "Món chính") {
    return r.category.trim();
  }
  if (Array.isArray(r.categories) && r.categories.length > 0) {
    const valid = r.categories.find((c) => c && c.trim() && c !== "Món chính");
    if (valid) return valid.trim();
  }
  for (const cat of ADMIN_RECIPE_CATEGORIES) {
    if (recipeHasCategory(r, cat)) {
      return cat;
    }
  }
  return r.category || "Món chay";
}

function getNumericId(r: Recipe): number {
  const num = parseInt(String(r.id || "").replace(/\D/g, ""), 10);
  return isNaN(num) ? 0 : num;
}

interface AdminExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Danh sách các ID đang được tick chọn trên bảng quản lý */
  selectedIds?: number[];
  /** Danh sách công thức hiện có để preview hoặc chọn nhanh */
  availableRecipes?: Recipe[];
  /** Bộ lọc đang hoạt động trên trang quản lý để điền sẵn vào tab bộ lọc */
  activeFilters?: {
    mealType?: string;
    dietType?: string;
    status?: string;
    category?: string;
    search?: string;
  };
}

type ExportMode = "by_recipes" | "by_filter";

export function AdminExportModal({
  isOpen,
  onClose,
  selectedIds = [],
  availableRecipes = [],
  activeFilters,
}: AdminExportModalProps) {
  // Mode: 1. Xuất theo món đã chọn | 2. Xuất theo bộ lọc
  const [mode, setMode] = useState<ExportMode>("by_recipes");

  // State for Tab 1: Danh sách các ID món ăn được chọn (quản lý ngầm, không hiện ID ra giao diện)
  const [selectedRecipeIds, setSelectedRecipeIds] = useState<number[]>([]);
  const [searchRecipeQuery, setSearchRecipeQuery] = useState<string>("");
  const [quickCategoryFilter, setQuickCategoryFilter] = useState<string>("all");

  // State for Tab 2: Xuất theo bộ lọc
  const [filterDiet, setFilterDiet] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterMealType, setFilterMealType] = useState<string>("all");
  const [filterQuery, setFilterQuery] = useState<string>("");

  // Status & Feedback
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [successFilename, setSuccessFilename] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 10 danh mục chuẩn
  const categories = useMemo(() => {
    return Array.from(ADMIN_RECIPE_CATEGORIES);
  }, []);

  // CHỈ LẤY CÁC MÓN ĐÃ ĐƯỢC PHÊ DUYỆT (APPROVED) ĐỂ XUẤT FILE
  const approvedRecipes = useMemo(() => {
    return availableRecipes.filter(
      (r) => String(r.status || "APPROVED").toUpperCase() === "APPROVED"
    );
  }, [availableRecipes]);

  // Đếm số công thức cho từng danh mục (chỉ tính món đã duyệt)
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: approvedRecipes.length };
    ADMIN_RECIPE_CATEGORIES.forEach((cat) => {
      counts[cat] = approvedRecipes.filter((r) => recipeHasCategory(r, cat)).length;
    });
    return counts;
  }, [approvedRecipes]);

  // Khởi tạo trạng thái khi mở modal
  useEffect(() => {
    if (!isOpen) {
      setSuccessFilename(null);
      setErrorMessage(null);
      return;
    }

    // Nếu người dùng đã tick chọn các món từ danh sách ngoài bảng, chỉ lấy các món ĐÃ DUYỆT
    if (selectedIds.length > 0) {
      const approvedIds = new Set(
        availableRecipes
          .filter((r) => String(r.status || "APPROVED").toUpperCase() === "APPROVED")
          .map((r) => getNumericId(r))
      );
      const validSelected = selectedIds.filter((id) => approvedIds.has(id));
      setSelectedRecipeIds(validSelected);
      setMode("by_recipes");
    } else {
      setSelectedRecipeIds([]);
      setMode("by_recipes");
    }

    if (activeFilters) {
      if (activeFilters.dietType && activeFilters.dietType !== "all") {
        setFilterDiet(activeFilters.dietType);
      }
      if (activeFilters.category && activeFilters.category !== "all") {
        setFilterCategory(activeFilters.category);
      }
      if (activeFilters.mealType && activeFilters.mealType !== "all") {
        setFilterMealType(activeFilters.mealType);
      }
      if (activeFilters.search) {
        setFilterQuery(activeFilters.search);
      }
    }
  }, [isOpen, selectedIds, activeFilters, availableRecipes]);

  // Danh sách các Recipe object tương ứng với selectedRecipeIds (chỉ món đã duyệt)
  const chosenRecipes = useMemo(() => {
    const set = new Set(selectedRecipeIds);
    return approvedRecipes.filter((r) => set.has(getNumericId(r)));
  }, [selectedRecipeIds, approvedRecipes]);

  // Danh sách món ăn được lọc nhanh trong Tab 1 (chỉ món đã duyệt)
  const filteredQuickRecipes = useMemo(() => {
    return approvedRecipes.filter((r) => {
      // 1. Lọc theo danh mục
      if (quickCategoryFilter !== "all" && !recipeHasCategory(r, quickCategoryFilter)) {
        return false;
      }
      // 2. Tìm kiếm theo tên món ăn
      if (searchRecipeQuery.trim()) {
        const q = searchRecipeQuery.trim().toLowerCase();
        const nameMatch = (r.name || r.title || "").toLowerCase().includes(q);
        if (!nameMatch) return false;
      }
      return true;
    });
  }, [approvedRecipes, quickCategoryFilter, searchRecipeQuery]);

  // Danh sách món ăn khớp với bộ lọc ở Tab 2 (chỉ món đã duyệt)
  const matchedFilterRecipes = useMemo(() => {
    return approvedRecipes.filter((r) => {
      if (filterDiet !== "all" && r.vegetarianType !== filterDiet) return false;
      if (filterCategory !== "all" && !recipeHasCategory(r, filterCategory)) return false;
      if (filterMealType !== "all" && r.mealType !== filterMealType) return false;
      if (filterQuery.trim()) {
        const q = filterQuery.trim().toLowerCase();
        const nameMatch = (r.name || r.title || "").toLowerCase().includes(q);
        if (!nameMatch) return false;
      }
      return true;
    });
  }, [approvedRecipes, filterDiet, filterCategory, filterMealType, filterQuery]);

  // Thêm hoặc bỏ chọn 1 món ăn
  const toggleRecipe = (numId: number) => {
    if (selectedRecipeIds.includes(numId)) {
      setSelectedRecipeIds((prev) => prev.filter((id) => id !== numId));
    } else {
      setSelectedRecipeIds((prev) => [...prev, numId]);
    }
  };

  // Bỏ chọn 1 món từ danh sách đã chọn
  const removeSelectedRecipe = (numId: number) => {
    setSelectedRecipeIds((prev) => prev.filter((id) => id !== numId));
  };

  // Chọn tất cả các món đang hiển thị trong bộ lọc Tab 1
  const handleSelectAllFiltered = () => {
    const idsToAdd = filteredQuickRecipes
      .map((r) => getNumericId(r))
      .filter((id) => id > 0);
    const merged = Array.from(new Set([...selectedRecipeIds, ...idsToAdd]));
    setSelectedRecipeIds(merged);
  };

  // Bỏ chọn các món đang lọc trong Tab 1
  const handleDeselectAllFiltered = () => {
    const idsToRemove = new Set(
      filteredQuickRecipes.map((r) => getNumericId(r)).filter((id) => id > 0)
    );
    setSelectedRecipeIds((prev) => prev.filter((id) => !idsToRemove.has(id)));
  };

  // Nạp lại các món đang tick chọn trên trang quản lý (chỉ lấy món đã duyệt)
  const handleLoadTableSelection = () => {
    const approvedIds = new Set(approvedRecipes.map((r) => getNumericId(r)));
    const valid = selectedIds.filter((id) => approvedIds.has(id));
    if (valid.length > 0) {
      setSelectedRecipeIds(Array.from(new Set([...selectedRecipeIds, ...valid])));
    }
  };

  // Xóa toàn bộ lựa chọn món
  const handleClearAllSelected = () => {
    setSelectedRecipeIds([]);
  };

  const handleExport = async () => {
    setErrorMessage(null);
    setSuccessFilename(null);
    setIsExporting(true);

    try {
      let targetRecipes: Recipe[] = [];

      if (mode === "by_recipes") {
        if (selectedRecipeIds.length === 0) {
          throw new Error("Vui lòng chọn ít nhất một món ăn đã duyệt từ danh sách để xuất file.");
        }
        if (selectedRecipeIds.length > 200) {
          throw new Error("Chỉ được xuất tối đa 200 công thức mỗi lần.");
        }
        targetRecipes = chosenRecipes;
      } else {
        // Mode by_filter
        targetRecipes = matchedFilterRecipes;
        if (targetRecipes.length === 0) {
          throw new Error("Không có món ăn đã duyệt nào phù hợp với các tiêu chí lọc đã chọn.");
        }
      }

      // Luôn xuất ra file Excel (.xlsx) chuẩn
      const prefix =
        mode === "by_recipes"
          ? `Cong_Thuc_${targetRecipes.length}_Mon`
          : `Cong_Thuc_Theo_Bo_Loc_${targetRecipes.length}_Mon`;
      const filename = adminRecipeApiService.exportRecipesToExcel(targetRecipes, prefix);
      setSuccessFilename(filename);
    } catch (err: any) {
      setErrorMessage(err?.message || "Đã xảy ra lỗi khi xuất file Excel.");
    } finally {
      setIsExporting(false);
    }
  };

  const handleApplyActiveFilters = () => {
    if (activeFilters) {
      setFilterDiet(activeFilters.dietType && activeFilters.dietType !== "all" ? activeFilters.dietType : "all");
      setFilterCategory(activeFilters.category && activeFilters.category !== "all" ? activeFilters.category : "all");
      setFilterMealType(activeFilters.mealType && activeFilters.mealType !== "all" ? activeFilters.mealType : "all");
      setFilterQuery(activeFilters.search || "");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shadow-xs">
              <FileSpreadsheet className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-stone-900">
                Xuất dữ liệu công thức ra file Excel (.xlsx)
              </h3>
              <p className="text-xs text-stone-500">
                Chỉ xuất các món đã được duyệt · Tệp Excel tự động căn chỉnh độ rộng cột và nguyên liệu chuẩn tiếng Việt
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Mode Switcher Tabs */}
          <div className="flex rounded-2xl bg-stone-100 p-1.5 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setMode("by_recipes")}
              className={`flex-1 py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${mode === "by_recipes"
                  ? "bg-white text-emerald-800 shadow-xs font-bold"
                  : "text-stone-600 hover:text-stone-900"
                }`}
            >
              <Layers className="w-4 h-4" />
              <span>1. Xuất theo món đã chọn</span>
              {selectedRecipeIds.length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  {selectedRecipeIds.length} món
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMode("by_filter")}
              className={`flex-1 py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${mode === "by_filter"
                  ? "bg-white text-emerald-800 shadow-xs font-bold"
                  : "text-stone-600 hover:text-stone-900"
                }`}
            >
              <Filter className="w-4 h-4" />
              <span>2. Xuất theo bộ lọc (Chế độ ăn & Danh mục)</span>
              <span className="px-2 py-0.5 rounded-full bg-stone-200 text-stone-700 text-[10px] font-bold">

              </span>
            </button>
          </div>

          {/* Form Content */}
          <div className="bg-stone-50/70 border border-stone-200 rounded-3xl p-5 space-y-4">
            {/* Tab 1: Xuất theo món đã chọn (Chỉ hiện các món đã duyệt, không có ID) */}
            {mode === "by_recipes" && (
              <div className="space-y-4 animate-in fade-in">
                {/* Khu vực 1: Danh sách các món ăn đã chọn */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-stone-900">
                        Danh sách món ăn đã chọn:
                      </span>
                      {selectedRecipeIds.length > 0 ? (
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                          Đã chọn {selectedRecipeIds.length} món
                        </span>
                      ) : (
                        <span className="text-[11px] text-stone-400 font-medium">
                          Chưa chọn món nào
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2.5 text-[11px]">
                      {selectedIds.length > 0 && selectedRecipeIds.length !== selectedIds.length && (
                        <button
                          type="button"
                          onClick={handleLoadTableSelection}
                          className="text-emerald-700 hover:underline font-semibold cursor-pointer"
                        >
                          Lấy {selectedIds.length} món đang tick ở bảng
                        </button>
                      )}
                      {selectedRecipeIds.length > 0 && (
                        <button
                          type="button"
                          onClick={handleClearAllSelected}
                          className="text-rose-600 hover:text-rose-700 hover:underline font-semibold cursor-pointer flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Xóa tất cả</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Hiển thị các món đã chọn dưới dạng chip có nút X để gỡ */}
                  {selectedRecipeIds.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-3 bg-white rounded-2xl border border-emerald-200/80 shadow-2xs">
                      {chosenRecipes.map((r) => {
                        const numId = getNumericId(r);
                        return (
                          <div
                            key={r.id}
                            className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-semibold animate-in zoom-in-95 duration-100"
                          >
                            <span className="truncate max-w-[200px]">{r.name || r.title}</span>
                            <span className="text-[9px] font-normal px-1.5 py-0.2 rounded-md bg-emerald-100/70 text-emerald-700">
                              {getRecipeDisplayCategory(r)}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeSelectedRecipe(numId)}
                              title={`Bỏ chọn món ${r.name || r.title}`}
                              className="w-4 h-4 rounded-full hover:bg-emerald-200 text-emerald-600 hover:text-emerald-900 flex items-center justify-center cursor-pointer transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-4 rounded-2xl bg-white border border-dashed border-stone-200 text-center space-y-1">
                      <div className="w-8 h-8 rounded-full bg-stone-100 text-stone-500 mx-auto flex items-center justify-center">
                        <Info className="w-4 h-4 text-stone-400" />
                      </div>
                      <p className="text-xs font-semibold text-stone-700">
                        Chưa có món ăn nào được chọn
                      </p>
                      <p className="text-[11px] text-stone-400">
                        Hệ thống chỉ cho phép xuất các món đã được duyệt. Hãy chọn món từ danh mục bên dưới để tạo file Excel.
                      </p>
                    </div>
                  )}
                </div>

                {/* Khu vực 2: Chọn món từ kho công thức đã duyệt */}
                <div className="pt-3 border-t border-stone-200 space-y-3">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <span className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Chọn món đã duyệt từ danh mục:</span>
                    </span>

                    {/* Quick batch toggle for filtered items */}
                    {filteredQuickRecipes.length > 0 && (
                      <div className="flex items-center gap-2 text-[11px]">
                        <button
                          type="button"
                          onClick={handleSelectAllFiltered}
                          className="text-emerald-700 hover:text-emerald-800 font-semibold hover:underline cursor-pointer"
                        >
                          + Chọn tất cả ({filteredQuickRecipes.length} món)
                        </button>
                        <span className="text-stone-300">|</span>
                        <button
                          type="button"
                          onClick={handleDeselectAllFiltered}
                          className="text-stone-500 hover:text-stone-700 hover:underline cursor-pointer"
                        >
                          Bỏ chọn mục đang lọc
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Thanh bộ lọc danh mục với số lượng hiển thị trong ngoặc rõ ràng */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin">
                    <button
                      type="button"
                      onClick={() => setQuickCategoryFilter("all")}
                      className={`px-3 py-1.5 rounded-full text-xs shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${quickCategoryFilter === "all"
                          ? "bg-emerald-800 text-white font-bold shadow-2xs"
                          : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-200"
                        }`}
                    >
                      <span>Tất cả</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${quickCategoryFilter === "all"
                            ? "bg-emerald-900 text-emerald-100"
                            : "bg-stone-100 text-stone-500"
                          }`}
                      >
                        ({approvedRecipes.length})
                      </span>
                    </button>

                    {categories.map((c) => {
                      const count = categoryCounts[c] || 0;
                      return (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setQuickCategoryFilter(c)}
                          className={`px-3 py-1.5 rounded-full text-xs shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${quickCategoryFilter === c
                              ? "bg-emerald-800 text-white font-bold shadow-2xs"
                              : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-200"
                            }`}
                        >
                          <span>{c}</span>
                          <span
                            className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${quickCategoryFilter === c
                                ? "bg-emerald-900 text-emerald-100"
                                : "bg-stone-100 text-stone-500"
                              }`}
                          >
                            ({count})
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Tìm kiếm theo tên món ăn */}
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchRecipeQuery}
                      onChange={(e) => setSearchRecipeQuery(e.target.value)}
                      placeholder="Tìm nhanh theo tên món ăn (ví dụ: bún, phở, nấm, đậu phụ...)..."
                      className="w-full h-9 pl-8 pr-8 rounded-xl border border-stone-200 bg-white text-xs focus:border-emerald-600 outline-none"
                    />
                    {searchRecipeQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchRecipeQuery("")}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-0.5 rounded cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Danh sách chip công thức đã duyệt */}
                  <div className="flex flex-wrap gap-1.5 max-h-44 overflow-y-auto p-2.5 bg-white rounded-xl border border-stone-200">
                    {filteredQuickRecipes.slice(0, 80).map((r) => {
                      const numId = getNumericId(r);
                      const isSelected = selectedRecipeIds.includes(numId);
                      return (
                        <button
                          key={r.id}
                          type="button"
                          onClick={() => toggleRecipe(numId)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${isSelected
                              ? "bg-emerald-700 text-white font-semibold shadow-2xs scale-[1.02]"
                              : "bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-200"
                            }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 text-emerald-200 shrink-0" />}
                          <span className="truncate max-w-[180px]">{r.name || r.title}</span>
                          <span
                            className={`text-[9px] px-1.5 py-0.2 rounded-md ${isSelected
                                ? "bg-emerald-800 text-emerald-100"
                                : "bg-stone-200 text-stone-600"
                              }`}
                          >
                            {getRecipeDisplayCategory(r)}
                          </span>
                        </button>
                      );
                    })}

                    {filteredQuickRecipes.length === 0 && (
                      <p className="text-xs text-stone-400 py-4 w-full text-center">
                        Không tìm thấy món ăn đã duyệt nào phù hợp với danh mục hoặc từ khóa tìm kiếm.
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-stone-500">
                    <span>
                      Hiển thị <strong>{filteredQuickRecipes.length}</strong> món ăn đã duyệt
                      {quickCategoryFilter !== "all" && ` thuộc "${quickCategoryFilter}"`}
                      {searchRecipeQuery && ` khớp với "${searchRecipeQuery}"`}
                    </span>
                    <span>Bấm vào món để chọn hoặc bỏ chọn</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Xuất theo bộ lọc (Chế độ ăn & Danh mục - Chỉ món đã duyệt) */}
            {mode === "by_filter" && (
              <div className="space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-800">
                    Chọn các tiêu chí lọc để xuất dữ liệu Excel:
                  </span>
                  <button
                    type="button"
                    onClick={handleApplyActiveFilters}
                    className="text-[11px] text-emerald-700 hover:underline font-semibold cursor-pointer flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" />
                    Áp dụng bộ lọc đang chọn trên trang
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Chế độ ăn chay */}
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                      Chế độ ăn chay:
                    </label>
                    <select
                      value={filterDiet}
                      onChange={(e) => setFilterDiet(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-stone-200 bg-white text-xs font-medium focus:border-emerald-600 outline-none"
                    >
                      <option value="all">Tất cả chế độ ăn</option>
                      <option value="vegan">Thuần chay (vegan) - Khuyên dùng</option>
                      <option value="lacto">Chay có sữa (lacto)</option>
                      <option value="ovo">Chay có trứng (ovo)</option>
                      <option value="ovo_lacto">Chay có trứng & sữa (ovo_lacto)</option>
                    </select>
                  </div>

                  {/* Danh mục */}
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                      Danh mục món ăn:
                    </label>
                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-stone-200 bg-white text-xs font-medium focus:border-emerald-600 outline-none cursor-pointer"
                    >
                      <option value="all">Tất cả danh mục ({approvedRecipes.length} món đã duyệt)</option>
                      {categories.map((c) => (
                        <option key={c} value={c}>
                          {c} ({categoryCounts[c] || 0} món)
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Loại bữa ăn */}
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                      Bữa ăn:
                    </label>
                    <select
                      value={filterMealType}
                      onChange={(e) => setFilterMealType(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-stone-200 bg-white text-xs font-medium focus:border-emerald-600 outline-none"
                    >
                      <option value="all">Tất cả các bữa</option>
                      <option value="breakfast">Bữa sáng</option>
                      <option value="lunch">Bữa trưa</option>
                      <option value="dinner">Bữa tối</option>
                      <option value="snack">Bữa phụ</option>
                    </select>
                  </div>

                  {/* Từ khóa tìm kiếm */}
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                      Từ khóa tìm kiếm (tùy chọn):
                    </label>
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={filterQuery}
                        onChange={(e) => setFilterQuery(e.target.value)}
                        placeholder="Tên công thức..."
                        className="w-full h-10 pl-8 pr-3 rounded-xl border border-stone-200 bg-white text-xs focus:border-emerald-600 outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Khung đếm số lượng công thức phù hợp với bộ lọc */}
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      Tìm thấy <strong className="text-emerald-800 text-sm font-bold">{matchedFilterRecipes.length}</strong> món ăn đã duyệt phù hợp với bộ lọc.
                    </span>
                  </div>
                  <span className="text-[11px] text-emerald-700 font-medium">
                    {filterCategory !== "all" ? filterCategory : "Toàn bộ danh mục"}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Feedback: Error */}
          {errorMessage && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Lỗi xuất dữ liệu:</p>
                <p className="mt-0.5 leading-relaxed">{errorMessage}</p>
              </div>
            </div>
          )}

          {/* Feedback: Success */}
          {successFilename && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between gap-3 animate-in fade-in">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <div>
                  <p className="font-bold">Xuất file Excel thành công!</p>
                  <p className="text-[11px] text-emerald-800">
                    Tệp <strong>{successFilename}</strong> đã được tải xuống máy tính của bạn.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-5 border-t border-stone-100 flex items-center justify-between bg-stone-50/60">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold cursor-pointer transition-colors"
          >
            Đóng
          </button>

          <button
            type="button"
            onClick={handleExport}
            disabled={
              isExporting ||
              (mode === "by_recipes" && selectedRecipeIds.length === 0) ||
              (mode === "by_filter" && matchedFilterRecipes.length === 0)
            }
            className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold shadow-xs flex items-center gap-2 cursor-pointer transition-colors"
          >
            {isExporting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Đang tạo file Excel...</span>
              </>
            ) : (
              <>
                <FileSpreadsheet className="w-4 h-4" />
                <span>
                  {mode === "by_recipes"
                    ? selectedRecipeIds.length === 0
                      ? "Vui lòng chọn món để xuất"
                      : `Xuất ${selectedRecipeIds.length} món đã chọn (Excel)`
                    : matchedFilterRecipes.length === 0
                      ? "Không có món nào phù hợp"
                      : `Xuất ${matchedFilterRecipes.length} món theo bộ lọc (Excel)`}
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
