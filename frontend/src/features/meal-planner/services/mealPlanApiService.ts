import { apiClient } from "@/utils/api/client";

export interface GenerateMealPlanPayload {
  total_budget?: number;
}

export interface GenerateForSomeonePayload {
  profile_name: string;
  diet_type?: string;
  target_calories?: number;
  total_budget?: number;
  allergy_ids?: number[];
}

export interface SaveMealPlanPayload {
  goal_id?: number;
  plan_type?: "weekly" | "monthly";
  start_date: string;
  end_date: string;
  has_budget?: boolean;
  total_budget?: number;
  target_calories_per_day?: number;
  weekly_plans?: any[];
}

export interface UpdateMealPlanPayload {
  name?: string;
  is_active?: boolean;
}

export interface UpdateMealSlotPayload {
  recipe_id?: number;
  portion_multiplier?: number;
}

export interface ValidateMealPlanPayload {
  plan_name?: string;
  start_date: string;
  end_date: string;
  days: Array<{
    date: string;
    meals: Array<{
      recipe_id: number;
      servings: number;
    }>;
  }>;
}

export const mealPlanApiService = {
  // API #25: POST /meal-plans/generate/weekly - Sinh thực đơn 7 ngày theo hồ sơ, dị ứng, chế độ chay, ngân sách
  generateWeekly(payload?: GenerateMealPlanPayload) {
    return apiClient.post<any>("/meal-plans/generate/weekly", payload || {});
  },

  // API #26: POST /meal-plans/generate/monthly - Sinh thực đơn cả tháng
  generateMonthly(payload?: GenerateMealPlanPayload) {
    return apiClient.post<any>("/meal-plans/generate/monthly", payload || {});
  },

  // API #27: POST /meal-plans/validate - Kiểm tra bữa user tự chọn từ món yêu thích
  validateMealPlan(payload: ValidateMealPlanPayload) {
    return apiClient.post<any>("/meal-plans/validate", payload);
  },

  // API #28: POST /meal-plans/generate/for-someone - Lập cho người khác, dùng meal_plan_profile, Premium
  generateForSomeone(payload: GenerateForSomeonePayload) {
    return apiClient.post<any>("/meal-plans/generate/for-someone", payload);
  },

  // API #29: GET /users/me/meal-plans - Danh sách thực đơn đã lưu
  getMyMealPlans() {
    return apiClient.get<any[]>("/users/me/meal-plans");
  },

  // API #30: GET /users/me/meal-plans/:id - Chi tiết kèm ngày, bữa, món
  getMyMealPlanDetail(id: number | string) {
    return apiClient.get<any>(`/users/me/meal-plans/${id}`);
  },

  // API #31: POST /users/me/meal-plans - Lưu thực đơn
  saveMealPlan(payload: SaveMealPlanPayload) {
    return apiClient.post<any>("/users/me/meal-plans", payload);
  },

  // API #32: PATCH /users/me/meal-plans/:id - Đổi tên, đặt đang áp dụng
  updateMyMealPlan(id: number | string, payload: UpdateMealPlanPayload) {
    return apiClient.patch<any>(`/users/me/meal-plans/${id}`, payload);
  },

  // API #33: DELETE /users/me/meal-plans/:id - Xoá thực đơn
  deleteMyMealPlan(id: number | string) {
    return apiClient.delete<any>(`/users/me/meal-plans/${id}`);
  },

  // API #34: PATCH /users/me/meal-plans/:id/days/:dayId/slots/:slotId - Đổi món trong một bữa
  updateMealSlot(
    planId: number | string,
    dayId: number | string,
    slotId: number | string,
    payload: UpdateMealSlotPayload
  ) {
    return apiClient.patch<any>(
      `/users/me/meal-plans/${planId}/days/${dayId}/slots/${slotId}`,
      payload
    );
  },
};
