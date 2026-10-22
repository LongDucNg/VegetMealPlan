import { apiClient } from "@/lib/apiClient";

export interface UserRecommendationItem {
  recommendation_id: number;
  user_id: number;
  recipe_id: number;
  score: number;
  reason?: string;
  created_at: string;
  recipe?: {
    recipe_id: number;
    title: string;
    description?: string;
    image_url?: string;
    meal_type?: string;
    diet_type?: string;
    estimated_cost?: number;
    calories?: number;
  };
}

export const recommendationService = {
  /**
   * Yêu cầu AI sinh gợi ý món ăn dựa trên tủ lạnh và hồ sơ dinh dưỡng
   * POST /users/me/recommendations/generate
   */
  async generateRecommendations(): Promise<any> {
    return await apiClient.post("/users/me/recommendations/generate");
  },

  /**
   * Lấy danh sách món ăn gợi ý cá nhân hóa
   * GET /users/me/recommendations
   */
  async getRecommendations(): Promise<UserRecommendationItem[]> {
    try {
      const res = await apiClient.get<UserRecommendationItem[]>("/users/me/recommendations");
      if (Array.isArray(res)) return res;
    } catch (err) {
      console.warn("[recommendationService] Lỗi khi tải gợi ý từ server:", err);
    }
    return [];
  },
};
