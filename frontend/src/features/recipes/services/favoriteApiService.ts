import { apiClient } from "@/utils/api/client";

export const favoriteApiService = {
  // API #13: GET /users/me/favorites/recipes - Danh sách yêu thích
  getMyFavorites() {
    return apiClient.get<any[]>("/users/me/favorites/recipes");
  },

  // API #14: POST /users/me/favorites/recipes/:recipeId - Thêm yêu thích
  addFavorite(recipeId: number | string) {
    return apiClient.post<any>(`/users/me/favorites/recipes/${recipeId}`);
  },

  // API #15: DELETE /users/me/favorites/recipes/:recipeId - Bỏ yêu thích
  removeFavorite(recipeId: number | string) {
    return apiClient.delete<any>(`/users/me/favorites/recipes/${recipeId}`);
  },
};
