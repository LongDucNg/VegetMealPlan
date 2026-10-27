import { apiClient, API_BASE_URL } from "@/lib/apiClient";
import { tokenStorage } from "@/lib/tokenStorage";
import { DIET_OPTIONS } from "../data/mockAuth";
import {
  AllergenGroup,
  AuthResponse,
  AuthUser,
  DietOption,
  LoginPayload,
  RegisterPayload,
  RegisterResponse,
  VerifyEmailPayload,
  ResendVerificationResponse,
  UserRole,
  ForgotPasswordPayload,
  ForgotPasswordResponse,
  ResetPasswordPayload,
  ResetPasswordResponse,
  ChangePasswordPayload,
  ChangePasswordResponse,
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
      tokenStorage.saveAuthSession({
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        user: data.user,
      });
    }
    return data;
  },

  /**
   * Đăng ký tài khoản mới. Backend KHÔNG trả token: tài khoản chưa xác thực,
   * mã OTP 6 số được gửi tới email; gọi verifyEmail() để kích hoạt và đăng nhập.
   * POST /auth/register
   */
  async register(payload: RegisterPayload): Promise<RegisterResponse> {
    return apiClient.post<RegisterResponse>("/auth/register", payload);
  },

  /**
   * Nhập mã OTP xác thực email. Đúng mã thì backend trả token như đăng nhập.
   * POST /auth/verify-email
   */
  async verifyEmail(payload: VerifyEmailPayload): Promise<AuthResponse> {
    const data = await apiClient.post<AuthResponse>("/auth/verify-email", payload);
    if (data?.access_token) {
      tokenStorage.saveAuthSession({
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        user: data.user,
      });
    }
    return data;
  },

  /**
   * Gửi lại mã xác thực email (cách nhau tối thiểu 60 giây).
   * POST /auth/resend-verification
   */
  async resendVerification(email: string): Promise<ResendVerificationResponse> {
    return apiClient.post<ResendVerificationResponse>("/auth/resend-verification", { email });
  },

  /**
   * Làm mới access_token bằng refresh_token
   * POST /auth/refresh
   */
  async refresh(): Promise<AuthResponse | null> {
    const refreshToken = tokenStorage.getRefreshToken();
    if (!refreshToken) return null;

    try {
      const data = await apiClient.post<AuthResponse>("/auth/refresh", {
        refresh_token: refreshToken,
      });
      if (data?.access_token) {
        tokenStorage.saveAuthSession({
          access_token: data.access_token,
          refresh_token: data.refresh_token,
          user: data.user,
        });
        return data;
      }
    } catch (err) {
      console.warn("[authService] Token refresh failed:", err);
      tokenStorage.clearAll();
    }
    return null;
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
      tokenStorage.saveAuthSession({
        access_token: res.access_token,
        refresh_token: res.refresh_token,
        user: res.user,
      });
    }
    return res;
  },

  /**
   * Đường dẫn khởi động luồng đăng nhập Google qua OAuth2 Backend
   */
  getGoogleLoginUrl(): string {
    return `${API_BASE_URL}/auth/google`;
  },

  /**
   * Đăng xuất trên thiết bị hiện tại (thu hồi phiên hiện tại trên backend)
   * POST /auth/logout
   */
  async logout(): Promise<void> {
    try {
      const token = tokenStorage.getToken();
      if (token) {
        await apiClient.post("/auth/logout");
      }
    } catch (err) {
      console.warn("[authService] Backend logout error (ignoring and clearing local storage):", err);
    } finally {
      tokenStorage.clearAll();
    }
  },

  /**
   * Đăng xuất khỏi mọi thiết bị (thu hồi toàn bộ phiên của tài khoản)
   * POST /auth/logout-all
   */
  async logoutAll(): Promise<{ message: string; revoked_sessions: number }> {
    try {
      const res = await apiClient.post<{ message: string; revoked_sessions: number }>(
        "/auth/logout-all"
      );
      return res;
    } finally {
      tokenStorage.clearAll();
    }
  },

  /**
   * Quên mật khẩu - Bước 1: Gửi mã OTP 6 số tới email
   * POST /auth/forgot-password
   */
  async forgotPassword(payload: ForgotPasswordPayload): Promise<ForgotPasswordResponse> {
    return apiClient.post<ForgotPasswordResponse>("/auth/forgot-password", payload);
  },

  /**
   * Quên mật khẩu - Bước 2: Nhập mã OTP và mật khẩu mới
   * POST /auth/reset-password
   */
  async resetPassword(payload: ResetPasswordPayload): Promise<ResetPasswordResponse> {
    return apiClient.post<ResetPasswordResponse>("/auth/reset-password", payload);
  },

  /**
   * Đổi mật khẩu khi đang đăng nhập
   * PUT /auth/change-password
   */
  async changePassword(payload: ChangePasswordPayload): Promise<ChangePasswordResponse> {
    return apiClient.put<ChangePasswordResponse>("/auth/change-password", payload);
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
