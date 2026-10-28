"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import {
  X,
  Download,
  CheckCircle2,
  AlertCircle,
  Filter,
  Layers,
  Search,
  FileSpreadsheet,
  Sparkles,
  Tag,
  Check,
} from "lucide-react";
import {
  adminRecipeApiService,
  RecipeExportParams,
} from "@/features/admin/services/adminRecipeApiService";
import { Recipe } from "@/features/recipes/types";

// 10 danh mục chuẩn quản trị từ cơ sở dữ liệu (ảnh 2)
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
  // Mode: 1. Xuất theo món (gộp 1 món và nhiều món) | 2. Xuất theo bộ lọc
  const [mode, setMode] = useState<ExportMode>("by_recipes");

  // State for Tab 1: Xuất theo món (1 hoặc nhiều món)
  const [idsInput, setIdsInput] = useState<string>("");
  const [searchRecipeQuery, setSearchRecipeQuery] = useState<string>("");
  const [quickCategoryFilter, setQuickCategoryFilter] = useState<string>("all");

  // State for Tab 2: Xuất theo bộ lọc (thay trạng thái bằng Category)
  const [filterDiet, setFilterDiet] = useState<string>("vegan");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterMealType, setFilterMealType] = useState<string>("all");
  const [filterQuery, setFilterQuery] = useState<string>("");
  const [exportFormat, setExportFormat] = useState<"xlsx" | "csv">("xlsx");

  // Status & Feedback
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [successFilename, setSuccessFilename] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 10 danh mục chuẩn từ ảnh 2
  const categories = useMemo(() => {
    return Array.from(ADMIN_RECIPE_CATEGORIES);
  }, []);

  // Đếm số công thức cho từng danh mục
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: availableRecipes.length };
    ADMIN_RECIPE_CATEGORIES.forEach((cat) => {
      counts[cat] = availableRecipes.filter((r) => recipeHasCategory(r, cat)).length;
    });
    return counts;
  }, [availableRecipes]);

  // Parse IDs from idsInput
  const parsedIds = useMemo(() => {
    return idsInput
      .split(/[,;\s]+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0 && /^\d+$/.test(s))
      .map((s) => parseInt(s, 10))
      .filter((id, idx, arr) => arr.indexOf(id) === idx);
  }, [idsInput]);

  // Preview recipe when exactly 1 ID is entered
  const singlePreviewRecipe = useMemo(() => {
    if (parsedIds.length !== 1) return null;
    const targetId = parsedIds[0];
    return availableRecipes.find((r) => {
      const idNum = parseInt(r.id.replace(/\D/g, ""), 10);
      return idNum === targetId;
    });
  }, [parsedIds, availableRecipes]);

  // Filtered recipes for the quick picker (Filtered by Category + Searched by Name)
  const filteredQuickRecipes = useMemo(() => {
    return availableRecipes.filter((r) => {
      // 1. Filter by category
      if (quickCategoryFilter !== "all" && !recipeHasCategory(r, quickCategoryFilter)) {
        return false;
      }
      // 2. Search by recipe name or ID
      if (searchRecipeQuery.trim()) {
        const q = searchRecipeQuery.trim().toLowerCase();
        const numId = parseInt(r.id.replace(/\D/g, ""), 10);
        const nameMatch = (r.name || r.title || "").toLowerCase().includes(q);
        const idMatch = String(numId).includes(q);
        if (!nameMatch && !idMatch) return false;
      }
      return true;
    });
  }, [availableRecipes, quickCategoryFilter, searchRecipeQuery]);

  // Initialize modal state on open
  useEffect(() => {
    if (!isOpen) {
      setSuccessFilename(null);
      setErrorMessage(null);
      return;
    }

    if (selectedIds.length > 0) {
      setMode("by_recipes");
      setIdsInput(selectedIds.join(", "));
    } else {
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
  }, [isOpen, selectedIds, activeFilters]);

  // Toggle a recipe ID in the selection list
  const toggleRecipeId = (numId: number) => {
    if (parsedIds.includes(numId)) {
      const next = parsedIds.filter((id) => id !== numId);
      setIdsInput(next.join(", "));
    } else {
      const next = [...parsedIds, numId];
      setIdsInput(next.join(", "));
    }
  };

  // Select all currently filtered recipes
  const handleSelectAllFiltered = () => {
    const idsToAdd = filteredQuickRecipes
      .map((r) => parseInt(r.id.replace(/\D/g, ""), 10))
      .filter((id) => !isNaN(id));
    const merged = Array.from(new Set([...parsedIds, ...idsToAdd]));
    setIdsInput(merged.join(", "));
  };

  // Deselect currently filtered recipes
  const handleDeselectAllFiltered = () => {
    const idsToRemove = new Set(
      filteredQuickRecipes
        .map((r) => parseInt(r.id.replace(/\D/g, ""), 10))
        .filter((id) => !isNaN(id))
    );
    const remaining = parsedIds.filter((id) => !idsToRemove.has(id));
    setIdsInput(remaining.join(", "));
  };

  const handleExport = async () => {
    setErrorMessage(null);
    setSuccessFilename(null);
    setIsExporting(true);

    try {
      // 1. Lấy danh sách các món cần xuất theo Mode
      let targetRecipes: Recipe[] = [];
      if (mode === "by_recipes") {
        if (parsedIds.length === 0) {
          throw new Error("Vui lòng nhập mã ID (ví dụ: 15) hoặc chọn các món ăn từ danh sách.");
        }
        if (parsedIds.length > 200) {
          throw new Error("Chỉ được xuất tối đa 200 công thức mỗi lần.");
        }
        targetRecipes = availableRecipes.filter((r) => {
          const numId = parseInt(r.id.replace(/\D/g, ""), 10);
          return parsedIds.includes(numId);
        });
        // Nếu không khớp trong availableRecipes (ví dụ vừa nhập ID lạ), tạo stub recipe
        if (targetRecipes.length === 0 && parsedIds.length > 0) {
          targetRecipes = parsedIds.map((id) => ({
            id: String(id),
            title: `Công thức #${id}`,
            image: "",
            serving: 1,
            name: `Công thức #${id}`,
            category: "Món chay",
            description: "",
            instructions: "",
            mealType: "lunch" as any,
            vegetarianType: "vegan" as any,
            difficulty: "easy" as any,
            servings: 1,
            prepTime: 10,
            cookTime: 15,
            calories: 0,
            protein: 0,
            carbs: 0,
            fat: 0,
            fiber: 0,
            status: "APPROVED" as any,
            ingredients: [],
          })) as unknown as Recipe[];
        }
      } else {
        // Mode by_filter
        targetRecipes = availableRecipes.filter((r) => {
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
      }

      if (exportFormat === "xlsx") {
        if (targetRecipes.length === 0) {
          throw new Error("Không tìm thấy công thức nào phù hợp để xuất file.");
        }
        const filename = adminRecipeApiService.exportRecipesToExcel(
          targetRecipes,
          mode === "by_recipes" ? `Cong_Thuc_${targetRecipes.length}_Mon` : "Cong_Thuc_Theo_Bo_Loc"
        );
        setSuccessFilename(filename);
      } else {
        // Format CSV
        let params: RecipeExportParams = {};
        if (mode === "by_recipes") {
          params = { ids: parsedIds.join(",") };
        } else {
          params = {
            dietType: filterDiet !== "all" ? filterDiet : undefined,
            category: filterCategory !== "all" ? filterCategory : undefined,
            mealType: filterMealType !== "all" ? filterMealType : undefined,
            q: filterQuery.trim() || undefined,
            status: "approved",
          };
        }
        const res = await adminRecipeApiService.exportRecipes(params);
        setSuccessFilename(res.filename);
      }
    } catch (err: any) {
      setErrorMessage(err?.message || "Đã xảy ra lỗi khi xuất file.");
    } finally {
      setIsExporting(false);
    }
  };

  const handleApplyActiveFilters = () => {
    if (activeFilters) {
      setFilterDiet(activeFilters.dietType && activeFilters.dietType !== "all" ? activeFilters.dietType : "vegan");
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
              <Download className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-stone-900">
                Xuất dữ liệu công thức (Excel / CSV)
              </h3>
              <p className="text-xs text-stone-500">
                Hỗ trợ mở bằng Microsoft Excel với chuẩn UTF-8 BOM tiếng Việt
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
          {/* Format Selector: Excel (.xlsx) vs CSV (.csv) */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-stone-800 block">Định dạng tệp tải về:</span>
              <span className="text-[11px] text-stone-500">
                {exportFormat === "xlsx"
                  ? "Định dạng Excel chuẩn (.xlsx) - Tự căn chỉnh cột, tương thích với file mẫu nhập"
                  : "Định dạng CSV UTF-8 có BOM (.csv) - Dành cho phân tích dữ liệu"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setExportFormat("xlsx")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  exportFormat === "xlsx"
                    ? "bg-emerald-700 text-white shadow-xs"
                    : "bg-white text-stone-700 border border-stone-200 hover:bg-stone-100"
                }`}
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>Excel (.xlsx) - Khuyên dùng</span>
              </button>

              <button
                type="button"
                onClick={() => setExportFormat("csv")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  exportFormat === "csv"
                    ? "bg-emerald-700 text-white shadow-xs"
                    : "bg-white text-stone-700 border border-stone-200 hover:bg-stone-100"
                }`}
              >
                <Download className="w-3.5 h-3.5" />
                <span>CSV (.csv)</span>
              </button>
            </div>
          </div>

          {/* Mode Switcher Tabs: Gộp xuất 1 món và nhiều món vào Tab 1 */}
          <div className="flex rounded-2xl bg-stone-100 p-1.5 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setMode("by_recipes")}
              className={`flex-1 py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                mode === "by_recipes"
                  ? "bg-white text-emerald-800 shadow-xs font-bold"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>1. Xuất theo món (1 hoặc nhiều món)</span>
              {parsedIds.length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  {parsedIds.length} món
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMode("by_filter")}
              className={`flex-1 py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                mode === "by_filter"
                  ? "bg-white text-emerald-800 shadow-xs font-bold"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <Filter className="w-4 h-4" />
              <span>2. Xuất theo bộ lọc (Chế độ ăn & Danh mục)</span>
            </button>
          </div>

          {/* Form Content */}
          <div className="bg-stone-50/70 border border-stone-200 rounded-3xl p-5 space-y-4">
            {/* Tab 1: Xuất theo món (gộp 1 món và nhiều món, tìm kiếm theo tên, lọc theo category) */}
            {mode === "by_recipes" && (
              <div className="space-y-4 animate-in fade-in">
                {/* Textarea nhập ID (1 món hoặc nhiều món) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-stone-800">
                      Mã ID công thức cần xuất (Nhập 1 món hoặc nhiều món):
                    </label>
                    {selectedIds.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setIdsInput(selectedIds.join(", "))}
                        className="text-[11px] text-emerald-700 hover:underline font-semibold cursor-pointer"
                      >
                        Lấy {selectedIds.length} món đang tick chọn trên bảng
                      </button>
                    )}
                  </div>

                  <textarea
                    rows={2}
                    value={idsInput}
                    onChange={(e) => setIdsInput(e.target.value)}
                    placeholder="Ví dụ: nhập 1 món (15) hoặc nhiều món (15, 20, 35)..."
                    className="w-full p-3 rounded-xl border border-stone-200 bg-white text-sm font-mono focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none leading-relaxed"
                  />

                  <div className="flex items-center justify-between text-[11px] text-stone-500 mt-1">
                    <div className="flex items-center gap-2">
                      <span>
                        Đã chọn:{" "}
                        <strong className="text-emerald-800 font-bold font-mono">
                          {parsedIds.length}
                        </strong>{" "}
                        mã món
                      </span>
                      {parsedIds.length === 1 && (
                        <span className="px-1.5 py-0.2 rounded-md bg-amber-100 text-amber-900 text-[10px] font-semibold">
                          Xuất 1 món
                        </span>
                      )}
                      {parsedIds.length > 1 && (
                        <span className="px-1.5 py-0.2 rounded-md bg-emerald-100 text-emerald-900 text-[10px] font-semibold">
                          Xuất nhiều món
                        </span>
                      )}
                    </div>
                    {parsedIds.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setIdsInput("")}
                        className="text-stone-400 hover:text-stone-700 underline cursor-pointer"
                      >
                        Xóa chọn
                      </button>
                    )}
                  </div>
                </div>

                {/* Preview if exactly 1 recipe matches */}
                {singlePreviewRecipe && (
                  <div className="p-3.5 rounded-2xl bg-white border border-stone-200 flex items-center gap-3 shadow-2xs">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                      {singlePreviewRecipe.image ? (
                        <Image
                          src={singlePreviewRecipe.image}
                          alt={singlePreviewRecipe.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] text-stone-400">
                          Ảnh
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-stone-900 truncate">
                        #{singlePreviewRecipe.id} · {singlePreviewRecipe.name || singlePreviewRecipe.title}
                      </p>
                      <p className="text-[11px] text-stone-500">
                        {singlePreviewRecipe.mealType} · {singlePreviewRecipe.vegetarianType} · {getRecipeDisplayCategory(singlePreviewRecipe)}
                      </p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 shrink-0">
                      Khớp 1 món
                    </span>
                  </div>
                )}

                {/* Bộ lọc theo Category & Tìm kiếm theo tên món ăn */}
                <div className="pt-3 border-t border-stone-200 space-y-3">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <span className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Chọn nhanh từ danh sách công thức hiện có (Bộ lọc danh mục):</span>
                    </span>

                    {/* Quick batch toggle for filtered items */}
                    {filteredQuickRecipes.length > 0 && (
                      <div className="flex items-center gap-2 text-[11px]">
                        <button
                          type="button"
                          onClick={handleSelectAllFiltered}
                          className="text-emerald-700 hover:text-emerald-800 font-semibold hover:underline cursor-pointer"
                        >
                          + Chọn tất cả ({filteredQuickRecipes.length})
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

                  {/* Thanh bộ lọc Category (Category Filter Pills) */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
                    <button
                      type="button"
                      onClick={() => setQuickCategoryFilter("all")}
                      className={`px-3 py-1 rounded-full text-xs font-medium shrink-0 transition-all cursor-pointer ${
                        quickCategoryFilter === "all"
                          ? "bg-emerald-800 text-white font-bold shadow-2xs"
                          : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-200"
                      }`}
                    >
                      Tất cả ({availableRecipes.length})
                    </button>
                    {categories.map((c) => {
                      const count = categoryCounts[c] || 0;
                      return (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setQuickCategoryFilter(c)}
                          className={`px-3 py-1 rounded-full text-xs font-medium shrink-0 transition-all cursor-pointer flex items-center gap-1 ${
                            quickCategoryFilter === c
                              ? "bg-emerald-800 text-white font-bold shadow-2xs"
                              : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-200"
                          }`}
                        >
                          <span>{c}</span>
                          {count > 0 && (
                            <span
                              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                                quickCategoryFilter === c
                                  ? "bg-emerald-900 text-emerald-100"
                                  : "bg-stone-100 text-stone-500 font-semibold"
                              }`}
                            >
                              {count}
                            </span>
                          )}
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
                      placeholder="Tìm kiếm nhanh theo tên món ăn (ví dụ: bún, phở, nấm, đậu phụ...)..."
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

                  {/* Danh sách chip công thức đã được lọc theo category & search name */}
                  <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto p-2.5 bg-white rounded-xl border border-stone-200">
                    {filteredQuickRecipes.slice(0, 60).map((r) => {
                      const numId = parseInt(r.id.replace(/\D/g, ""), 10);
                      const isSelected = parsedIds.includes(numId);
                      return (
                        <button
                          key={r.id}
                          type="button"
                          onClick={() => toggleRecipeId(numId)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                            isSelected
                              ? "bg-emerald-700 text-white font-semibold shadow-2xs scale-[1.02]"
                              : "bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-200"
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 text-emerald-200" />}
                          <span className="font-mono text-[11px] opacity-80">#{numId}</span>
                          <span className="truncate max-w-[150px]">{r.name || r.title}</span>
                          <span
                            className={`text-[9px] px-1.5 py-0.2 rounded-md ${
                              isSelected
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
                        Không tìm thấy món ăn nào phù hợp danh mục hoặc từ khóa tìm kiếm.
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-stone-500">
                    <span>
                      Đang hiển thị <strong>{filteredQuickRecipes.length}</strong> món
                      {quickCategoryFilter !== "all" && ` trong danh mục "${quickCategoryFilter}"`}
                      {searchRecipeQuery && ` khớp từ khóa "${searchRecipeQuery}"`}
                    </span>
                    <span>Bấm vào tên món để chọn / bỏ chọn</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Xuất theo bộ lọc (thay trạng thái bằng Category) */}
            {mode === "by_filter" && (
              <div className="space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-800">
                    Chọn các tiêu chí lọc để xuất dữ liệu:
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

                  {/* THAY TRẠNG THÁI CÔNG THỨC BẰNG CATEGORY */}
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                      Danh mục (Category):
                    </label>
                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-stone-200 bg-white text-xs font-medium focus:border-emerald-600 outline-none cursor-pointer"
                    >
                      <option value="all">Tất cả danh mục (10 danh mục)</option>
                      {categories.map((c) => (
                        <option key={c} value={c}>
                          {c}
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

                <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-150 text-[11px] text-emerald-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    Ví dụ: Chọn chế độ <strong>vegan</strong> + Danh mục{" "}
                    <strong>{filterCategory !== "all" ? filterCategory : "Món chính"}</strong> sẽ xuất một file CSV chứa toàn bộ công thức phù hợp.
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
                  <p className="font-bold">Xuất dữ liệu thành công!</p>
                  <p className="text-[11px] text-emerald-800">
                    Tệp <strong>{successFilename}</strong> đã được tải xuống trình duyệt của bạn.
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
            disabled={isExporting || (mode === "by_recipes" && parsedIds.length === 0)}
            className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold shadow-xs flex items-center gap-2 cursor-pointer transition-colors"
          >
            {isExporting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Đang tạo file ${exportFormat.toUpperCase()}...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>
                  {mode === "by_recipes"
                    ? parsedIds.length === 1
                      ? `Xuất 1 món (ID ${parsedIds[0]})`
                      : parsedIds.length > 1
                      ? `Xuất file chứa ${parsedIds.length} món`
                      : "Xuất file món đã chọn"
                    : "Xuất file theo bộ lọc"}
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
