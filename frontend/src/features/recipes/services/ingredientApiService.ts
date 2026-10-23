import { apiClient } from "@/utils/api/client";

export interface BackendIngredient {
  ingredient_id: number;
  ingredient_name: string;
  unit: string;
  description?: string;
  vegan_flag: boolean;
  avg_price_per_unit?: number;
  calories_per_100g?: number;
  protein_per_100g?: number;
  carb_per_100g?: number;
  fat_per_100g?: number;
  fiber_per_100g?: number;
  is_seasonal?: boolean;
  season_months?: string;
  status: "active" | "inactive";
  created_at: string;
  updated_at: string;
}

export interface IngredientPayload {
  ingredient_name?: string;
  name?: string;
  unit: string;
  description?: string;
  vegan_flag?: boolean;
  avg_price_per_unit?: number;
  price_per_unit?: number;
  calories_per_100g?: number;
  protein_per_100g?: number;
  carb_per_100g?: number;
  carbs_per_100g?: number;
  fat_per_100g?: number;
  fiber_per_100g?: number;
  is_seasonal?: boolean;
  season_months?: string;
  status?: "active" | "inactive";
  category?: string;
}

export interface UserRecipePriceItem {
  recipe_id: number;
  recipe?: {
    recipe_id: number;
    title: string;
    meal_type?: string;
    image_url?: string;
    estimated_cost?: number;
    description?: string;
    calories?: number;
  };
  actual_price: number;
  estimated_cost?: number;
  diff?: number;
  updated_at?: string;
}

export const ingredientApiService = {
  // API #9: GET /ingredients - Danh sách 190+ nguyên liệu kèm giá chuẩn & dinh dưỡng
  getIngredients() {
    return apiClient.get<BackendIngredient[]>("/ingredients");
  },

  // API #10: GET /ingredients/:id - Chi tiết nguyên liệu
  getIngredientById(id: number | string) {
    return apiClient.get<BackendIngredient>(`/ingredients/${id}`);
  },

  // API #11: POST /admin/ingredients - Admin thêm nguyên liệu
  adminCreateIngredient(data: IngredientPayload) {
    const payload = {
      ingredient_name: (data.ingredient_name || data.name || "").trim(),
      unit: data.unit ? data.unit.trim() : "kg",
      description: data.description?.trim() || undefined,
      vegan_flag: data.vegan_flag ?? true,
      avg_price_per_unit:
        data.avg_price_per_unit !== undefined
          ? Number(data.avg_price_per_unit)
          : data.price_per_unit !== undefined
          ? Number(data.price_per_unit)
          : undefined,
      calories_per_100g:
        data.calories_per_100g !== undefined ? Number(data.calories_per_100g) : undefined,
      protein_per_100g:
        data.protein_per_100g !== undefined ? Number(data.protein_per_100g) : undefined,
      carb_per_100g:
        data.carb_per_100g !== undefined
          ? Number(data.carb_per_100g)
          : data.carbs_per_100g !== undefined
          ? Number(data.carbs_per_100g)
          : undefined,
      fat_per_100g:
        data.fat_per_100g !== undefined ? Number(data.fat_per_100g) : undefined,
      fiber_per_100g:
        data.fiber_per_100g !== undefined ? Number(data.fiber_per_100g) : undefined,
      is_seasonal: data.is_seasonal ?? false,
      season_months: data.season_months || undefined,
      status: data.status || "active",
    };
    return apiClient.post<BackendIngredient>("/admin/ingredients", payload);
  },

  // API #12: PUT /admin/ingredients/:id - Admin sửa nguyên liệu, gồm giá chuẩn & dinh dưỡng
  adminUpdateIngredient(id: number | string, data: Partial<IngredientPayload>) {
    const payload: any = {};
    if (data.ingredient_name !== undefined || data.name !== undefined) {
      payload.ingredient_name = (data.ingredient_name || data.name || "").trim();
    }
    if (data.unit !== undefined) payload.unit = data.unit.trim();
    if (data.description !== undefined) payload.description = data.description.trim() || undefined;
    if (data.vegan_flag !== undefined) payload.vegan_flag = data.vegan_flag;
    if (data.avg_price_per_unit !== undefined) {
      payload.avg_price_per_unit = Number(data.avg_price_per_unit);
    } else if (data.price_per_unit !== undefined) {
      payload.avg_price_per_unit = Number(data.price_per_unit);
    }
    if (data.calories_per_100g !== undefined) {
      payload.calories_per_100g = Number(data.calories_per_100g);
    }
    if (data.protein_per_100g !== undefined) {
      payload.protein_per_100g = Number(data.protein_per_100g);
    }
    if (data.carb_per_100g !== undefined) {
      payload.carb_per_100g = Number(data.carb_per_100g);
    } else if (data.carbs_per_100g !== undefined) {
      payload.carb_per_100g = Number(data.carbs_per_100g);
    }
    if (data.fat_per_100g !== undefined) {
      payload.fat_per_100g = Number(data.fat_per_100g);
    }
    if (data.fiber_per_100g !== undefined) {
      payload.fiber_per_100g = Number(data.fiber_per_100g);
    }
    if (data.is_seasonal !== undefined) payload.is_seasonal = data.is_seasonal;
    if (data.season_months !== undefined) payload.season_months = data.season_months;
    if (data.status !== undefined) payload.status = data.status;

    return apiClient.put<BackendIngredient>(`/admin/ingredients/${id}`, payload);
  },

  // API #16: PUT /ingredients/:id/my-price - User tự đặt giá nguyên liệu
  setMyIngredientPrice(id: number | string, price_per_unit: number) {
    return apiClient.put<any>(`/ingredients/${id}/my-price`, {
      price_per_unit,
    });
  },

  // API #17: GET /users/me/recipe-prices - Giá tự đặt theo công thức
  getMyRecipePrices() {
    return apiClient.get<UserRecipePriceItem[]>("/users/me/recipe-prices");
  },

  // API #18: PUT /users/me/recipe-prices/:recipeId - Đặt giá công thức
  setMyRecipePrice(recipeId: number | string, actual_price: number) {
    return apiClient.put<any>(`/users/me/recipe-prices/${recipeId}`, {
      actual_price,
    });
  },

  // API #19: DELETE /users/me/recipe-prices/:recipeId - Xoá giá tự đặt
  removeMyRecipePrice(recipeId: number | string) {
    return apiClient.delete<any>(`/users/me/recipe-prices/${recipeId}`);
  },

  // Admin Quản lý nguyên liệu kỵ nhau (Phần 10)
  getIngredientConflicts() {
    return apiClient.get<any[]>("/admin/ingredients/conflicts");
  },

  createIngredientConflict(ingredient_id_1: number, ingredient_id_2: number, reason?: string) {
    return apiClient.post<any>("/admin/ingredients/conflicts", {
      ingredient_id_1,
      ingredient_id_2,
      reason,
    });
  },

  deleteIngredientConflict(ingredient_id_1: number, ingredient_id_2: number) {
    return apiClient.delete<any>(`/admin/ingredients/conflicts/${ingredient_id_1}/${ingredient_id_2}`);
  },
};
