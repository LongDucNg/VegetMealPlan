import { apiClient } from "@/lib/apiClient";
import { AppNotification } from "../types";

export const notificationService = {
  /**
   * Lấy danh sách thông báo của người dùng hiện tại
   * GET /users/me/notifications hoặc fallback /notifications
   */
  async getNotifications(): Promise<AppNotification[]> {
    try {
      const res = await apiClient.get<AppNotification[]>("/users/me/notifications");
      return Array.isArray(res) ? res : [];
    } catch {
      // Try fallback to /notifications
      try {
        const fallback = await apiClient.get<AppNotification[]>("/notifications");
        return Array.isArray(fallback) ? fallback : [];
      } catch (err) {
        console.warn("[notificationService] Failed to fetch notifications:", err);
        return [];
      }
    }
  },

  /**
   * Đánh dấu thông báo đã đọc
   * PATCH /users/me/notifications/:id/read hoặc fallback /notifications/:id/read
   */
  async markAsRead(id: number | string): Promise<void> {
    try {
      await apiClient.patch<void>(`/users/me/notifications/${id}/read`);
    } catch {
      await apiClient.patch<void>(`/notifications/${id}/read`).catch(() => {});
    }
  },
};
