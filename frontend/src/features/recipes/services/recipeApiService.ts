import { apiClient } from "@/utils/api/client";

export interface RecipeQueryParams {
  q?: string;
  mealType?: string;
  vegetarianType?: string;
  category?: string;
  status?: string;
  maxCalories?: number;
  excludeAllergens?: string;
  page?: number;
  limit?: number;
  difficulty?: string;
  diet_type?: string;
  meal_type?: string;
  created_by?: number;
}

export interface RecommendationQueryParams {
  mealType?: string;
  targetCalories?: number;
  ingredientIds?: string;
  excludeIngredientIds?: string;
}

export interface RecipeIngredientPayload {
  ingredient_id: number;
  quantity: number;
  unit: string;
  note?: string;
  is_optional?: boolean;
}

export interface RecipePayload {
  title: string;
  description?: string;
  instructions?: string;
  image_url?: string;
  video_url?: string;
  prep_time?: number;
  cook_time?: number;
  servings?: number;
  difficulty?: string;
  meal_type?: string;
  diet_type?: string;
  estimated_cost?: number;
  ingredients?: RecipeIngredientPayload[];
  category_ids?: number[];
}

export interface RecipeCostResponse {
  recipe_id: number;
  total_cost: number;
  breakdown?: Array<{
    ingredient_id: number;
    name: string;
    quantity: number;
    unit: string;
    price: number;
    source: "user_price" | "standard_price";
  }>;
}

export const recipeApiService = {
  // API #1: GET /recipes - Lọc theo status, mealType, vegetarianType, category, q, maxCalories, excludeAllergens, phân trang
  getRecipes(params?: RecipeQueryParams) {
    return apiClient.get<any>("/recipes", params);
  },

  // API #2: GET /recipes/:id - Chi tiết kèm nguyên liệu, dinh dưỡng
  getRecipeById(id: number | string) {
    return apiClient.get<any>(`/recipes/${id}`);
  },

  // API #3: GET /recipes/recommendations - Gợi ý theo hồ sơ
  getRecommendations(params?: RecommendationQueryParams) {
    return apiClient.get<any>("/recipes/recommendations", params);
  },

  // API #4: GET /recipes/:id/replacements - Món thay thế cùng mealType, hợp chế độ chay
  getReplacements(id: number | string) {
    return apiClient.get<any>(`/recipes/${id}/replacements`);
  },

  // API #5: GET /recipes/:id/cost - Chi phí ước tính theo giá nguyên liệu
  getRecipeCost(id: number | string) {
    return apiClient.get<RecipeCostResponse>(`/recipes/${id}/cost`);
  },

  // API: GET /recipes/my-recipes - Công thức do chính user tạo
  getMyRecipes() {
    return apiClient.get<any>("/recipes/my-recipes");
  },

  // API #6: POST /recipes - Member tạo -> pending_review, admin tạo -> approved
  uploadMedia(file: File) {
    return apiClient.upload<{ url: string; file_type: 'image' | 'video'; filename: string; size: number }>(
      '/recipes/upload',
      file,
      'file'
    );
  },

  // API #6: POST /recipes - Member t?o -> pending_review, admin t?o -> approved
  createRecipe(data: RecipePayload) {
    return apiClient.post<any>("/recipes", data);
  },

  // API #7: PUT /recipes/:id - Sửa công thức (chủ sở hữu hoặc admin)
  updateRecipe(id: number | string, data: Partial<RecipePayload>) {
    return apiClient.put<any>(`/recipes/${id}`, data);
  },

  // API #8: DELETE /recipes/:id - Đổi status thành removed (soft delete)
  deleteRecipe(id: number | string) {
    return apiClient.delete<any>(`/recipes/${id}`);
  },

  // API GET /categories - Danh mục công thức
  getCategories() {
    return apiClient.get<any>("/categories");
  },

  // API GET /categories/:id - Chi tiết một danh mục
  getCategoryById(id: number | string) {
    return apiClient.get<any>(`/categories/${id}`);
  },

  // API Admin: GET /admin/recipes - Lấy danh sách công thức cho admin (kèm status)
  getAdminRecipes(status?: string) {
    const query = status ? `?status=${status}` : "";
    return apiClient.get<any[]>(`/admin/recipes${query}`);
  },

  // API Admin: GET /admin/recipes/:id - Lấy chi tiết công thức kèm nguyên liệu cho admin
  getAdminRecipeById(id: number | string) {
    return apiClient.get<any>(`/admin/recipes/${id}`);
  },

  // API Admin: PUT /admin/recipes/:id/status - Duyệt hoặc từ chối công thức
  reviewRecipe(id: number | string, status: "approved" | "rejected", reason?: string) {
    return apiClient.put<any>(`/admin/recipes/${id}/status`, { status, reason });
  },

  // API Export: GET /recipes/export - Xuất dữ liệu công thức ra file CSV
  exportRecipes(params?: import("@/features/admin/services/adminRecipeApiService").RecipeExportParams) {
    return import("@/features/admin/services/adminRecipeApiService").then((m) =>
      m.adminRecipeApiService.exportRecipes(params)
    );
  },
};

