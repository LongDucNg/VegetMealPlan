export type UserRole = "Guest" | "Member" | "Admin";

export interface DietOption {
  id: string;
  label: string;
  description?: string;
}

export interface AllergenGroup {
  code: string;
  name: string;
  examples: string;
}

export interface AuthUser {
  user_id: number;
  full_name: string;
  email: string;
  role: "admin" | "authorized" | string;
  status?: string;
  is_premium?: boolean;
  diet_type?: string;
  activity_level?: string;
  age?: number;
  gender?: string;
  height_cm?: number;
  weight_kg?: number;
  allergies?: string[];
  avatar_url?: string;
}

export interface AuthResponse {
  access_token: string;
  user: {
    user_id: number;
    full_name: string;
    email: string;
    role: string;
  };
}

export interface RegisterPayload {
  full_name: string;
  email: string;
  password: string;
  diet_type?: string;
  activity_level?: string;
  current_goal_id?: number;
  age?: number;
  gender?: string;
  height_cm?: number;
  weight_kg?: number;
  allergen_groups?: string[];
  allergy_ingredient_ids?: number[];
}

export interface LoginPayload {
  email: string;
  password: string;
}
