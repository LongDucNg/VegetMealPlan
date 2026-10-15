import { apiClient } from "@/lib/apiClient";
import { tokenStorage } from "@/lib/tokenStorage";
import { DIET_OPTIONS } from "../data/mockAuth";
import {
  AllergenGroup,
  AuthResponse,
  AuthUser,
  DietOption,
  LoginPayload,
  RegisterPayload,
  UserRole,
} from "../types";

export const authService = {
  /**
   * Helper to map backend database role ('admin' | 'authorized')
   * to frontend presentation UserRole ('Guest' | 'Member' | 'Admin')
   */
  mapBackendRoleToUserRole(backendRole?: string | null): UserRole {
    if (!backendRole) return "Guest";
    const normalized = backendRole.toLowerCase();
    if (normalized === "admin") return "Admin";
    if (normalized === "authorized" || normalized === "member" || normalized === "user") {
      return "Member";
    }
    return "Member";
  },

  /**
   * Đăng nhập với email và mật khẩu
   * POST /auth/login
   */
  async login(payload: LoginPayload): Promise<AuthResponse> {
    const data = await apiClient.post<AuthResponse>("/auth/login", payload);
    if (data?.access_token) {
      tokenStorage.setToken(data.access_token);
      tokenStorage.setUser(data.user);
    }
    return data;
  },

  /**
   * Đăng ký tài khoản mới (kèm tùy chọn hồ sơ ăn chay)
   * POST /auth/register
   */
  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const data = await apiClient.post<AuthResponse>("/auth/register", payload);
    if (data?.access_token) {
      tokenStorage.setToken(data.access_token);
      tokenStorage.setUser(data.user);
    }
    return data;
  },

  /**
   * Lấy thông tin user hiện tại từ token đang lưu
   * GET /auth/me
   */
  async getMe(): Promise<AuthUser> {
    const user = await apiClient.get<AuthUser>("/auth/me");
    if (user) {
      tokenStorage.setUser({
        user_id: user.user_id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      });
    }
    return user;
  },

  /**
   * Lấy danh sách loại chay cho dropdown
   * GET /auth/diet-options
   * Fallback về mock data nếu backend chưa phản hồi
   */
  async getDietOptions(): Promise<DietOption[]> {
    try {
      const res = await apiClient.get<
        Array<{ value: string; label: string; description?: string }>
      >("/auth/diet-options");
      if (Array.isArray(res) && res.length > 0) {
        return res.map((item) => ({
          id: item.value,
          label: item.label,
          description: item.description,
        }));
      }
    } catch (err) {
      console.warn("[authService] Failed to fetch diet options from backend, using fallback:", err);
    }
    return DIET_OPTIONS;
  },

  /**
   * Lấy danh sách nhóm dị ứng cho form đăng ký / hồ sơ
   * GET /auth/allergen-groups
   */
  async getAllergenGroups(): Promise<AllergenGroup[]> {
    try {
      const res = await apiClient.get<AllergenGroup[]>("/auth/allergen-groups");
      if (Array.isArray(res)) return res;
    } catch (err) {
      console.warn("[authService] Failed to fetch allergen groups:", err);
    }
    return [];
  },

  /**
   * Đổi mã Google one-time code lấy access_token
   * POST /auth/google/exchange
   */
  async exchangeGoogleCode(code: string): Promise<AuthResponse & { is_new_user?: boolean }> {
    const res = await apiClient.post<AuthResponse & { is_new_user?: boolean }>(
      "/auth/google/exchange",
      { code }
    );
    if (res?.access_token) {
      tokenStorage.setToken(res.access_token);
      tokenStorage.setUser(res.user);
    }
    return res;
  },

  /**
   * Đăng xuất, xóa token và phiên làm việc
   */
  logout(): void {
    tokenStorage.clearAll();
  },

  /**
   * Tương thích ngược với mock role trong preview mode
   */
  getCurrentRole(): UserRole {
    if (typeof window === "undefined") return "Guest";
    const cachedUser = tokenStorage.getUser();
    if (cachedUser?.role) {
      return this.mapBackendRoleToUserRole(cachedUser.role);
    }
    return (localStorage.getItem("vh-role") as UserRole) || "Guest";
  },

  setRole(role: UserRole): void {
    if (typeof window !== "undefined") {
      localStorage.setItem("vh-role", role);
    }
  },
};
