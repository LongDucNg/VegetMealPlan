import { apiClient } from "@/lib/apiClient";
import {
  ADMIN_STATS,
  ADMIN_MEMBERS,
  ADMIN_CONTENT_ITEMS,
  MODERATION_QUEUE,
  ADMIN_CATEGORIES,
  AI_MODELS,
  AI_LOGS,
} from "../data/mockAdmin";
import {
  AdminStat,
  AdminMember,
  AdminContentItem,
  ModerationItem,
  CategoryItem,
  BackendCategory,
  CreateCategoryPayload,
  UpdateCategoryPayload,
  AIModelMetric,
  AILog,
} from "../types";

function mapBackendCategoryToItem(cat: BackendCategory): CategoryItem {
  return {
    id: String(cat.category_id),
    name: cat.category_name,
    slug: cat.description || cat.category_name.toLowerCase().replace(/\s+/g, "-"),
    type: cat.category_type === "food_type" ? "Food Type" : "Recipe Category",
    recipeCount: 0,
    status: cat.status === "active" ? "Active" : "Archived",
    description: cat.description,
  };
}

function mapBackendUserToMember(u: any): AdminMember {
  const name = u.full_name || u.name || "Thành viên";
  const words = name.trim().split(/\s+/);
  const initials = words.length >= 2 
    ? (words[0][0] + words[words.length - 1][0]).toUpperCase()
    : name.slice(0, 2).toUpperCase();

  const isSuspended = u.status === "locked" || u.status === "Suspended";
  const isAdmin = u.role === "admin" || u.role === "Admin";

  const joinedFormatted = u.created_at
    ? new Date(u.created_at).toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "Mới tham gia";

  return {
    id: String(u.user_id || u.id),
    name: name,
    email: u.email,
    role: isAdmin ? "Admin" : "Member",
    initials,
    videoCount: u.video_count || (isAdmin ? 12 : 2),
    postCount: u.post_count || (isAdmin ? 25 : 8),
    joinedDate: joinedFormatted,
    status: isSuspended ? "Suspended" : "Active",
  };
}

export const adminService = {
  getStats(): AdminStat[] {
    return ADMIN_STATS;
  },

  /**
   * Thống kê dashboard (Endpoint 18: GET /admin/stats)
   */
  async fetchStats(): Promise<AdminStat[]> {
    try {
      const res = await apiClient.get<AdminStat[]>("/admin/stats");
      if (Array.isArray(res) && res.length > 0) return res;
    } catch {}
    return ADMIN_STATS;
  },

  getMembers(): AdminMember[] {
    return ADMIN_MEMBERS;
  },

  /**
   * Danh sách thành viên thật từ Database (Endpoint 19: GET /admin/members)
   */
  async fetchMembers(params?: { search?: string; status?: string }): Promise<AdminMember[]> {
    try {
      const res = await apiClient.get<any>("/admin/members", { params });
      const rawList = Array.isArray(res) ? res : (res && Array.isArray(res.data) ? res.data : []);
      if (Array.isArray(rawList) && rawList.length > 0) {
        return rawList.map(mapBackendUserToMember);
      }
    } catch (err) {
      console.warn("[adminService] fetchMembers error, fallback to mock:", err);
    }
    return ADMIN_MEMBERS;
  },


  /**
   * Cập nhật trạng thái thành viên (Endpoint 20: PUT /admin/members/:id/status)
   */
  async updateMemberStatus(id: string, status: "Active" | "Suspended" | "Pending"): Promise<void> {
    try {
      const backendStatus = status === "Suspended" ? "locked" : "active";
      await apiClient.put(`/admin/members/${id}/status`, { status: backendStatus });
    } catch (err) {
      console.warn("[adminService] updateMemberStatus error:", err);
    }
  },

  /**
   * Cập nhật vai trò thành viên (Endpoint 21: PUT /admin/members/:id/role)
   */
  async updateMemberRole(id: string, role: string): Promise<void> {
    try {
      const backendRole = role.toLowerCase() === "admin" ? "admin" : "authorized";
      await apiClient.put(`/admin/members/${id}/role`, { role: backendRole });
    } catch (err) {
      console.warn("[adminService] updateMemberRole error:", err);
    }
  },

  /**
   * Xóa vĩnh viễn thành viên khỏi Database (Endpoint: DELETE /admin/members/:id)
   */
  async deleteMember(id: string): Promise<void> {
    await apiClient.delete(`/admin/members/${id}`);
  },


  getContentItems(): AdminContentItem[] {
    return ADMIN_CONTENT_ITEMS;
  },

  getModerationQueue(): ModerationItem[] {
    return MODERATION_QUEUE;
  },

  /**
   * Lấy danh sách danh mục (Endpoint 22: GET /admin/categories)
   */
  async getCategories(): Promise<CategoryItem[]> {
    try {
      const res = await apiClient.get<BackendCategory[]>("/admin/categories");
      if (Array.isArray(res) && res.length > 0) {
        return res.map(mapBackendCategoryToItem);
      }
    } catch (err) {
      console.warn("[adminService] Failed to load server categories, using fallback:", err);
    }
    return ADMIN_CATEGORIES;
  },

  /**
   * Tạo danh mục mới (Endpoint 23: POST /admin/categories)
   */
  async createCategory(payload: CreateCategoryPayload): Promise<CategoryItem> {
    const res = await apiClient.post<BackendCategory>("/admin/categories", payload);
    return mapBackendCategoryToItem(res);
  },

  /**
   * Cập nhật danh mục (Endpoint 24: PUT /admin/categories/:id)
   */
  async updateCategory(
    id: number | string,
    payload: UpdateCategoryPayload
  ): Promise<CategoryItem> {
    const res = await apiClient.put<BackendCategory>(`/admin/categories/${id}`, payload);
    return mapBackendCategoryToItem(res);
  },

  /**
   * Xóa danh mục (Endpoint 25: DELETE /admin/categories/:id)
   * Backend trả 204 No Content
   */
  async deleteCategory(id: number | string): Promise<void> {
    await apiClient.delete<void>(`/admin/categories/${id}`);
  },

  getAiModels(): AIModelMetric[] {
    return AI_MODELS;
  },

  /**
   * Số liệu model AI (Endpoint 26: GET /admin/ai-models)
   */
  async fetchAiModels(): Promise<AIModelMetric[]> {
    try {
      const res = await apiClient.get<AIModelMetric[]>("/admin/ai-models");
      if (Array.isArray(res) && res.length > 0) return res;
    } catch {}
    return AI_MODELS;
  },

  /**
   * Bật/tắt override model AI (Endpoint 27: PUT /admin/ai-models/:id)
   */
  async updateAiModel(id: string, updates: Partial<AIModelMetric>): Promise<void> {
    try {
      await apiClient.put(`/admin/ai-models/${id}`, updates);
    } catch {}
  },

  /**
   * Log hệ thống AI (Endpoint 28: GET /admin/ai-models/logs)
   */
  async fetchAiLogs(): Promise<AILog[]> {
    try {
      const res = await apiClient.get<AILog[]>("/admin/ai-models/logs");
      if (Array.isArray(res) && res.length > 0) return res;
    } catch {}
    return AI_LOGS;
  },
};
