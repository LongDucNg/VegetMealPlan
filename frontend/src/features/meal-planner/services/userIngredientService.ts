import { apiClient } from "@/lib/apiClient";
import { storage } from "@/utils/storage/storage";

export interface SystemIngredient {
  ingredient_id: number;
  ingredient_name: string;
  unit: string;
  description?: string;
  vegan_flag: boolean;
  calories_per_100g?: number;
  protein_per_100g?: number;
  carb_per_100g?: number;
  fat_per_100g?: number;
  avg_price_per_unit?: number;
}

export interface UserIngredientItem {
  user_ingredient_id: number;
  user_id?: number;
  ingredient_id: number;
  quantity?: number;
  unit?: string;
  expiry_date?: string;
  freshness_status?: "fresh" | "use_soon" | "expired" | string;
  source?: "MANUAL" | "OCR" | "BARCODE";
  ingredient?: {
    ingredient_id: number;
    ingredient_name: string;
    unit: string;
    vegan_flag: boolean;
    calories_per_100g?: number;
  };
}

const LOCAL_PANTRY_KEY = "user_pantry_ingredients";

export const userIngredientService = {
  /**
   * Lấy danh sách nguyên liệu chuẩn hệ thống
   * GET /ingredients
   */
  async getSystemIngredients(): Promise<SystemIngredient[]> {
    try {
      const res = await apiClient.get<SystemIngredient[]>("/ingredients");
      if (Array.isArray(res) && res.length > 0) return res;
    } catch (err) {
      console.warn("[userIngredientService] Không thể lấy danh sách nguyên liệu hệ thống:", err);
    }
    return [];
  },

  /**
   * Lấy danh sách nguyên liệu trong tủ lạnh của người dùng
   * GET /users/me/ingredients
   */
  async getMyIngredients(): Promise<UserIngredientItem[]> {
    try {
      const res = await apiClient.get<UserIngredientItem[]>("/users/me/ingredients");
      if (Array.isArray(res)) {
        storage.setItem(LOCAL_PANTRY_KEY, res);
        return res;
      }
    } catch (err) {
      console.warn("[userIngredientService] Lỗi khi tải tủ lạnh từ server, dùng cache:", err);
    }
    return storage.getItem<UserIngredientItem[]>(LOCAL_PANTRY_KEY, []);
  },

  /**
   * Thêm nguyên liệu vào tủ lạnh
   * POST /users/me/ingredients
   */
  async addIngredient(payload: {
    ingredient_id: number;
    quantity?: number;
    unit?: string;
    expiry_date?: string;
    freshness_status?: string;
  }): Promise<UserIngredientItem> {
    try {
      const created = await apiClient.post<UserIngredientItem>("/users/me/ingredients", {
        ...payload,
        source: "MANUAL",
      });
      if (created?.user_ingredient_id) {
        const current = storage.getItem<UserIngredientItem[]>(LOCAL_PANTRY_KEY, []);
        storage.setItem(LOCAL_PANTRY_KEY, [created, ...current]);
        return created;
      }
    } catch (err) {
      console.warn("[userIngredientService] Lỗi khi thêm vào server, lưu cục bộ:", err);
    }

    const localItem: UserIngredientItem = {
      user_ingredient_id: Date.now(),
      ingredient_id: payload.ingredient_id,
      quantity: payload.quantity || 100,
      unit: payload.unit || "g",
      expiry_date: payload.expiry_date,
      freshness_status: payload.freshness_status || "fresh",
    };
    const current = storage.getItem<UserIngredientItem[]>(LOCAL_PANTRY_KEY, []);
    storage.setItem(LOCAL_PANTRY_KEY, [localItem, ...current]);
    return localItem;
  },

  /**
   * Xóa nguyên liệu khỏi tủ lạnh
   * DELETE /users/me/ingredients/:id
   */
  async removeIngredient(userIngredientId: number): Promise<void> {
    try {
      await apiClient.delete(`/users/me/ingredients/${userIngredientId}`);
    } catch (err) {
      console.warn("[userIngredientService] Lỗi khi xóa trên server:", err);
    }
    const current = storage.getItem<UserIngredientItem[]>(LOCAL_PANTRY_KEY, []);
    storage.setItem(
      LOCAL_PANTRY_KEY,
      current.filter((item) => item.user_ingredient_id !== userIngredientId)
    );
  },
};
