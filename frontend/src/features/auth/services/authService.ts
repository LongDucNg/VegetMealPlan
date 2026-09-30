import { DIET_OPTIONS } from "../data/mockAuth";
import { DietOption, UserRole } from "../types";

export const authService = {
  getDietOptions(): DietOption[] {
    return DIET_OPTIONS;
  },

  getCurrentRole(): UserRole {
    if (typeof window === "undefined") return "Member";
    return (localStorage.getItem("veggiehub_role") as UserRole) || "Member";
  },

  setRole(role: UserRole): void {
    if (typeof window !== "undefined") {
      localStorage.setItem("veggiehub_role", role);
    }
  },
};
