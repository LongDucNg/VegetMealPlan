import { apiClient } from "@/lib/apiClient";
import { AppNotification } from "../types";

export const notificationService = {
  /**
   * Lấy danh sách thông báo của người dùng hiện tại
   * GET /notifications
   */
  async getNotifications(): Promise<AppNotification[]> {
    try {
      const res = await apiClient.get<AppNotification[]>("/notifications");
      return Array.isArray(res) ? res : [];
    } catch (err) {
      console.warn("[notificationService] Failed to fetch notifications:", err);
      return [];
    }
  },

  /**
   * Đánh dấu 1 thông báo đã đọc
   * PATCH /notifications/:id/read
   */
  async markAsRead(id: number | string): Promise<void> {
    try {
      await apiClient.patch<void>(`/notifications/${id}/read`);
    } catch (err) {
      console.warn(`[notificationService] Failed to mark notification ${id} as read:`, err);
    }
  },

  /**
   * Đánh dấu tất cả thông báo là đã đọc
   * PATCH /notifications/read-all
   */
  async markAllAsRead(): Promise<void> {
    try {
      await apiClient.patch<void>("/notifications/read-all");
    } catch (err) {
      console.warn("[notificationService] Failed to mark all as read:", err);
    }
  },

  /**
   * Xoá 1 thông báo
   * DELETE /notifications/:id
   */
  async deleteNotification(id: number | string): Promise<void> {
    try {
      await apiClient.delete<void>(`/notifications/${id}`);
    } catch (err) {
      console.warn(`[notificationService] Failed to delete notification ${id}:`, err);
    }
  },

  /**
   * Xoá toàn bộ thông báo
   * DELETE /notifications/all
   */
  async deleteAllNotifications(): Promise<void> {
    try {
      await apiClient.delete<void>("/notifications/all");
    } catch (err) {
      console.warn("[notificationService] Failed to delete all notifications:", err);
    }
  },
};
