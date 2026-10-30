import { apiClient } from "@/lib/apiClient";

export interface MatchedIngredient {
  ingredient_id: number;
  ingredient_name: string;
  unit: string;
}

export interface DetectedIngredientItem {
  detected_name: string;
  confidence: number;
  low_confidence: boolean;
  freshness_status: string;
  ingredient: MatchedIngredient | null;
  candidates: MatchedIngredient[];
  warnings: Array<"allergen" | "non_vegan">;
  // UI helper fields
  selected?: boolean;
  quantity?: number;
}

export interface PhotoScanResponse {
  items: DetectedIngredientItem[];
  image_quality: string;
  message: string;
  remaining_scans: number;
}

export const photoScanService = {
  /**
   * Gửi ảnh để Gemini AI nhận diện nguyên liệu
   * POST /meal-plans/scan/detect
   */
  async detect(file: File): Promise<PhotoScanResponse> {
    const formData = new FormData();
    formData.append("image", file);

    const res = await apiClient.post<any>("/meal-plans/scan/detect", formData);
    return res?.data || res;
  },

  /**
   * Xác nhận danh sách nguyên liệu đã quét để lưu vào tủ lạnh
   * POST /meal-plans/scan/confirm
   */
  async confirm(
    items: Array<{
      ingredient_id: number;
      quantity?: number;
      unit?: string;
      freshness_status?: string;
    }>
  ) {
    const res = await apiClient.post<any>("/meal-plans/scan/confirm", { items });
    return res?.data || res;
  },

  /**
   * Lấy thống kê số lượt quét trong ngày
   * GET /meal-plans/scan/stats
   */
  async getStats() {
    const res = await apiClient.get<any>("/meal-plans/scan/stats");
    return res?.data || res;
  },
};

