"use client";

import React, { ReactNode } from "react";
import { UserRole } from "../types";
import { AuthProvider, useAuth, AuthContextType } from "./AuthContext";

export type { UserRole };
export type RoleContextType = AuthContextType;

export function RoleProvider({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}

export function useRole(): AuthContextType {
  return useAuth();
}
