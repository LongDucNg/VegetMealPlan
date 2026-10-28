import * as XLSX from "xlsx";
import { apiClient } from "@/utils/api/client";
import { tokenStorage } from "@/lib/tokenStorage";
import { API_BASE_URL } from "@/lib/apiClient";

export interface RecipeExportParams {
  ids?: string | number | (string | number)[];
  mealType?: string;
  dietType?: string;
  status?: string;
  category?: string | number;
  q?: string;
}

export const adminRecipeApiService = {
  // API #20: GET /admin/recipes - Tất cả recipe gồm draft, pending, rejected
  getAdminRecipes(status?: string) {
    return apiClient.get<any[]>("/admin/recipes", status ? { status } : undefined);
  },

  // API #21: PUT /admin/recipes/:id/status - Duyệt, từ chối kèm lý do
  updateRecipeStatus(
    id: number | string,
    status: "approved" | "rejected" | "pending_review",
    rejected_reason?: string
  ) {
    return apiClient.put<any>(`/admin/recipes/${id}/status`, {
      status,
      rejected_reason,
    });
  },

  // API #22: POST /admin/recipe-imports - Nhập Excel
  importRecipeExcel(file: File) {
    return apiClient.upload<any>("/admin/recipe-imports", file, "file");
  },

  // API #23: GET /admin/recipe-imports - Lịch sử lô nhập
  getImportBatches() {
    return apiClient.get<any[]>("/admin/recipe-imports");
  },

  // API #24: GET /admin/recipe-imports/:id/items - Chi tiết từng dòng nhập
  getImportBatchItems(batchId: number | string) {
    return apiClient.get<any[]>(`/admin/recipe-imports/${batchId}/items`);
  },

  /**
   * API Export: GET /recipes/export
   * Hỗ trợ 3 chế độ xuất dữ liệu:
   * 1. Xuất 1 món: params = { ids: "15" } -> File chứa món ID 15
   * 2. Xuất nhiều món: params = { ids: "15,20,35" } -> Một file chứa cả 3 món
   * 3. Xuất theo bộ lọc: params = { dietType: "vegan", status: "approved" } -> File chứa tất cả món phù hợp
   */
  async exportRecipes(params: RecipeExportParams = {}): Promise<{ filename: string; blob: Blob }> {
    const token = tokenStorage.getToken();
    const query = new URLSearchParams();

    if (params.ids !== undefined && params.ids !== null && params.ids !== "") {
      const idsStr = Array.isArray(params.ids) ? params.ids.join(",") : String(params.ids).trim();
      if (idsStr) {
        query.append("ids", idsStr);
      }
    }

    if (params.mealType && params.mealType !== "all") {
      query.append("mealType", params.mealType.trim());
    }

    if (params.dietType && params.dietType !== "all") {
      let dt = params.dietType.trim().toLowerCase();
      if (dt === "lacto_vegetarian") dt = "lacto";
      if (dt === "ovo_vegetarian") dt = "ovo";
      if (dt === "lacto_ovo_vegetarian") dt = "ovo_lacto";
      query.append("diet_type", dt);
    }

    if (params.status && params.status !== "all") {
      query.append("status", params.status.trim().toLowerCase());
    }

    if (params.category && params.category !== "all") {
      query.append("category", String(params.category).trim());
    }

    if (params.q && params.q.trim()) {
      query.append("q", params.q.trim());
    }

    const qs = query.toString();
    const url = `${API_BASE_URL}/recipes/export${qs ? `?${qs}` : ""}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!res.ok) {
      let errMsg = "Không thể xuất file dữ liệu công thức.";
      try {
        const text = await res.text();
        const json = JSON.parse(text);
        errMsg = json?.message || json?.error || errMsg;
      } catch {
        errMsg = `Lỗi máy chủ (${res.status}): ${res.statusText || "Yêu cầu thất bại"}`;
      }
      throw new Error(errMsg);
    }

    const disposition = res.headers.get("content-disposition");
    let filename = "cong-thuc-xuat.csv";
    if (disposition) {
      const match = disposition.match(/filename\*?=(?:UTF-8'')?["']?([^"';]+)["']?/i);
      if (match && match[1]) {
        filename = decodeURIComponent(match[1]);
      }
    }
    if (!filename.toLowerCase().endsWith(".csv")) {
      filename += ".csv";
    }

    const rawBlob = await res.blob();
    const blob = new Blob([rawBlob], { type: "text/csv;charset=utf-8;" });

    if (typeof window !== "undefined") {
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(downloadUrl);
    }

    return { filename, blob };
  },

  /**
   * Xuất danh sách công thức ra định dạng Excel (.xlsx) chuẩn 100%
   */
  exportRecipesToExcel(recipes: any[], filenamePrefix = "Cong_Thuc_Mon_Chay"): string {
    if (typeof window === "undefined" || !recipes || recipes.length === 0) {
      throw new Error("Không có công thức nào để xuất ra file Excel.");
    }

    const headers = [
      "ID",
      "Tên món",
      "Danh mục",
      "Mô tả",
      "Bữa ăn",
      "Chế độ ăn chay",
      "Độ khó",
      "Khẩu phần",
      "Thời gian chuẩn bị (phút)",
      "Thời gian nấu (phút)",
      "Nguyên liệu",
      "Hướng dẫn thực hiện",
      "Năng lượng (kcal)",
      "Đạm (g)",
      "Tinh bột (g)",
      "Chất béo (g)",
      "Chất xơ (g)",
      "Chi phí ước tính",
      "Trạng thái",
    ];

    const rows = recipes.map((r: any) => {
      const numId = parseInt(String(r.id || r.recipe_id || "").replace(/\D/g, ""), 10);
      const ingList = r.ingredients || [];
      const ingText = Array.isArray(ingList)
        ? ingList
            .map((ing: any) => {
              if (typeof ing === "string") return ing;
              const name = ing.name || ing.ingredient_name || ing.ingredient?.ingredient_name || "Nguyên liệu";
              const qty = ing.quantity ?? 1;
              const unit = ing.unit ?? "g";
              const opt = ing.is_optional ? " (tuỳ chọn)" : "";
              return `${name} (${qty}${unit}${opt})`;
            })
            .join(", ")
        : String(ingList);

      const instructions =
        r.instructions ||
        (Array.isArray(r.steps) ? r.steps.join("\n") : "");

      return [
        !isNaN(numId) ? numId : r.id,
        r.name || r.title || "",
        r.category || (Array.isArray(r.categories) ? r.categories.join(", ") : ""),
        r.description || "",
        r.mealType || r.meal_type || "",
        r.vegetarianType || r.diet_type || "",
        r.difficulty || "",
        r.servings || 1,
        r.prepTime || r.prep_time || 0,
        r.cookTime || r.cook_time || 0,
        ingText,
        instructions,
        r.calories ?? r.nutrition?.calories ?? 0,
        r.protein ?? r.nutrition?.protein ?? 0,
        r.carbs ?? r.nutrition?.carbs ?? 0,
        r.fat ?? r.nutrition?.fat ?? 0,
        r.fiber ?? r.nutrition?.fiber ?? 0,
        r.estimatedCost ?? r.estimated_cost ?? 0,
        r.status || "APPROVED",
      ];
    });

    const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    ws["!cols"] = [
      { wch: 8 },  // ID
      { wch: 28 }, // Tên món
      { wch: 18 }, // Danh mục
      { wch: 35 }, // Mô tả
      { wch: 12 }, // Bữa ăn
      { wch: 16 }, // Chế độ ăn chay
      { wch: 10 }, // Độ khó
      { wch: 10 }, // Khẩu phần
      { wch: 22 }, // TG chuẩn bị
      { wch: 18 }, // TG nấu
      { wch: 45 }, // Nguyên liệu
      { wch: 45 }, // Hướng dẫn
      { wch: 15 }, // Calo
      { wch: 10 }, // Đạm
      { wch: 12 }, // Carb
      { wch: 12 }, // Fat
      { wch: 12 }, // Fiber
      { wch: 16 }, // Chi phí
      { wch: 14 }, // Trạng thái
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "CongThucChay");
    const stamp = new Date().toISOString().slice(0, 10);
    const filename = `${filenamePrefix}_${recipes.length}_mon_${stamp}.xlsx`;
    XLSX.writeFile(wb, filename);
    return filename;
  },
};

