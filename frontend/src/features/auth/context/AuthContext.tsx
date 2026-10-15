"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import {
  UserRole,
  AuthUser,
  LoginPayload,
  RegisterPayload,
  AuthResponse,
} from "../types";
import { authService } from "../services/authService";
import { tokenStorage } from "@/lib/tokenStorage";

export interface AuthContextType {
  user: AuthUser | null;
  role: UserRole;
  ready: boolean;
  isAuthenticated: boolean;
  isGuest: boolean;
  isMember: boolean;
  isAdmin: boolean;
  setRole: (role: UserRole) => void;
  login: (payload: LoginPayload) => Promise<AuthResponse>;
  register: (payload: RegisterPayload) => Promise<AuthResponse>;
  logout: () => void;
  refreshMe: () => Promise<AuthUser | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [role, setRoleState] = useState<UserRole>("Guest");
  const [ready, setReady] = useState(false);

  // Rehydrate session from stored token via backend API
  const refreshMe = useCallback(async (): Promise<AuthUser | null> => {
    const token = tokenStorage.getToken();
    if (!token) {
      setUser(null);
      setRoleState("Guest");
      return null;
    }

    try {
      const me = await authService.getMe();
      setUser(me);
      const computedRole = authService.mapBackendRoleToUserRole(me.role);
      setRoleState(computedRole);
      return me;
    } catch (err) {
      console.warn("[AuthContext] Session expired or invalid:", err);
      tokenStorage.clearAll();
      setUser(null);
      setRoleState("Guest");
      return null;
    }
  }, []);

  useEffect(() => {
    refreshMe().finally(() => {
      setReady(true);
    });
  }, [refreshMe]);

  const login = useCallback(
    async (payload: LoginPayload): Promise<AuthResponse> => {
      const res = await authService.login(payload);
      try {
        const me = await authService.getMe();
        setUser(me);
        const computedRole = authService.mapBackendRoleToUserRole(me.role);
        setRoleState(computedRole);
      } catch {
        // Fallback to token response role
        const fallbackRole = authService.mapBackendRoleToUserRole(res.user?.role);
        setRoleState(fallbackRole);
      }
      return res;
    },
    []
  );

  const register = useCallback(
    async (payload: RegisterPayload): Promise<AuthResponse> => {
      const res = await authService.register(payload);
      try {
        const me = await authService.getMe();
        setUser(me);
        const computedRole = authService.mapBackendRoleToUserRole(me.role);
        setRoleState(computedRole);
      } catch {
        const fallbackRole = authService.mapBackendRoleToUserRole(res.user?.role);
        setRoleState(fallbackRole);
      }
      return res;
    },
    []
  );

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    setRoleState("Guest");
  }, []);

  // Deprecated manual switcher - roles are strictly driven by backend JWT
  const setRole = useCallback((_newRole: UserRole) => {
    console.info("[AuthContext] Manual role switching disabled. Please log in with a valid account.");
  }, []);

  const isGuest = role === "Guest";
  const isMember = role === "Member";
  const isAdmin = role === "Admin";
  const isAuthenticated = !isGuest && !!tokenStorage.getToken();

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        ready,
        isAuthenticated,
        isGuest,
        isMember,
        isAdmin,
        setRole,
        login,
        register,
        logout,
        refreshMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
