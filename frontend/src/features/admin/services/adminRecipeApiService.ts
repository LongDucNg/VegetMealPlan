import { apiClient } from "@/utils/api/client";

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
};
