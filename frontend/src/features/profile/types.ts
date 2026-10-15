export type Gender = "male" | "female" | "other";

export type ActivityLevel =
  | "sedentary"
  | "light"
  | "moderate"
  | "active"
  | "very_active";

export type HealthGoal =
  | "lose_weight"
  | "maintain_weight"
  | "gain_weight"
  | "healthy_eating";

export type VegetarianType =
  | "vegan"
  | "lacto_vegetarian"
  | "ovo_vegetarian"
  | "lacto_ovo_vegetarian";

export interface UserProfile {
  id: number | string;
  name: string;
  age: number;
  gender: Gender;
  height: number; // in cm
  weight: number; // in kg
  activityLevel: ActivityLevel;
  healthGoal: HealthGoal;
  vegetarianType: VegetarianType;
  allergies: string[]; // e.g. ["peanut", "soy"]
  email?: string;
  handle?: string;
  bio?: string;
  bmi?: number;
  bmiCategory?: string;
  isPremium?: boolean;
  allergenGroups?: string[];
}

export interface BackendProfile {
  user_id: number;
  full_name: string;
  email: string;
  role: string;
  status: string;
  diet_type?: string;
  activity_level?: string;
  current_goal_id?: number;
  current_goal?: {
    goal_id: number;
    name: string;
    description?: string;
  };
  age?: number;
  gender?: string;
  height_cm?: number;
  weight_kg?: number;
  bmi?: number;
  bmi_category?: string;
  bmi_updated_at?: string;
  allergies?: {
    allergen_groups: string[];
    ingredients: { ingredient_id: number; ingredient_name: string }[];
  };
  is_premium?: boolean;
}

export interface AllergiesData {
  allergen_groups: string[];
  ingredients: { ingredient_id: number; ingredient_name: string }[];
}

export interface UpdateProfilePayload {
  full_name?: string;
  age?: number;
  gender?: string;
  height_cm?: number;
  weight_kg?: number;
  activity_level?: string;
  diet_type?: string;
  current_goal_id?: number;
}

export interface UpdateAllergiesPayload {
  allergen_groups?: string[];
  ingredient_ids?: number[];
}
