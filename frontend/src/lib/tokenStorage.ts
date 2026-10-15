export interface AuthStoredUser {
  user_id: number;
  full_name: string;
  email: string;
  role: string;
}

const TOKEN_KEY = "vh_access_token";
const USER_KEY = "vh_user";

export const tokenStorage = {
  getToken(): string | null {
    if (typeof window === "undefined") return null;
    try {
      return localStorage.getItem(TOKEN_KEY);
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
    } catch (err) {
      console.warn("[tokenStorage] Failed to remove token:", err);
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

  clearAll(): void {
    this.removeToken();
    this.removeUser();
  },
};
