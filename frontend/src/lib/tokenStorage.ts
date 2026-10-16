export interface AuthStoredUser {
  user_id: number;
  full_name: string;
  email: string;
  role: string;
}

const TOKEN_KEY = "vh_access_token";
const REFRESH_TOKEN_KEY = "vh_refresh_token";
const USER_KEY = "vh_user";

export const tokenStorage = {
  getToken(): string | null {
    if (typeof window === "undefined") return null;
    try {
      return (
        localStorage.getItem(TOKEN_KEY) ||
        localStorage.getItem("vh_token") ||
        localStorage.getItem("access_token")
      );
    } catch {
      return null;
    }
  },

  setToken(token: string): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch (err) {
      console.warn("[tokenStorage] Failed to store token:", err);
    }
  },

  removeToken(): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem("vh_token");
      localStorage.removeItem("access_token");
    } catch (err) {
      console.warn("[tokenStorage] Failed to remove token:", err);
    }
  },

  getRefreshToken(): string | null {
    if (typeof window === "undefined") return null;
    try {
      return (
        localStorage.getItem(REFRESH_TOKEN_KEY) ||
        localStorage.getItem("vh_refresh_token") ||
        localStorage.getItem("refresh_token")
      );
    } catch {
      return null;
    }
  },

  setRefreshToken(token: string): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(REFRESH_TOKEN_KEY, token);
    } catch (err) {
      console.warn("[tokenStorage] Failed to store refresh token:", err);
    }
  },

  removeRefreshToken(): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      localStorage.removeItem("vh_refresh_token");
      localStorage.removeItem("refresh_token");
    } catch (err) {
      console.warn("[tokenStorage] Failed to remove refresh token:", err);
    }
  },

  getUser(): AuthStoredUser | null {
    if (typeof window === "undefined") return null;
    try {
      const data = localStorage.getItem(USER_KEY);
      return data ? (JSON.parse(data) as AuthStoredUser) : null;
    } catch {
      return null;
    }
  },

  setUser(user: AuthStoredUser): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (err) {
      console.warn("[tokenStorage] Failed to store user:", err);
    }
  },

  removeUser(): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(USER_KEY);
    } catch (err) {
      console.warn("[tokenStorage] Failed to remove user:", err);
    }
  },

  saveAuthSession(params: {
    access_token?: string;
    refresh_token?: string;
    user?: AuthStoredUser;
  }): void {
    if (params.access_token) this.setToken(params.access_token);
    if (params.refresh_token) this.setRefreshToken(params.refresh_token);
    if (params.user) this.setUser(params.user);
  },

  clearAll(): void {
    this.removeToken();
    this.removeRefreshToken();
    this.removeUser();
    if (typeof window !== "undefined") {
      localStorage.removeItem("vh-role");
    }
  },
};
