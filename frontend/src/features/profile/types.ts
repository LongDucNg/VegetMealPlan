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

export const VEGETARIAN_TYPE_LABELS: Record<string, string> = {
  vegan: "Thuần chay (Vegan)",
  lacto_vegetarian: "Chay có sữa (Lacto)",
  ovo_vegetarian: "Chay có trứng (Ovo)",
  lacto_ovo_vegetarian: "Chay có trứng & sữa (Ovo-Lacto)",
};

export function formatVegetarianType(type?: string): string {
  if (!type) return "Thuần chay (Vegan)";
  return VEGETARIAN_TYPE_LABELS[type] || type.replace(/_/g, " ");
}

export const ALLERGEN_LABELS_VI: Record<string, string> = {
  peanut: "Đậu phộng (lạc)",
  PEANUT: "Đậu phộng (lạc)",
  soy: "Đậu nành & đậu hũ",
  SOY: "Đậu nành & đậu hũ",
  gluten: "Gluten (lúa mì)",
  GLUTEN: "Gluten (lúa mì)",
  dairy: "Sữa & chế phẩm sữa",
  DAIRY: "Sữa & chế phẩm sữa",
  treenut: "Hạt cây",
  tree_nut: "Hạt cây",
  TREE_NUT: "Hạt cây",
  nuts: "Hạt cây",
  sesame: "Mè & hạt gieo",
  seed: "Mè & hạt gieo",
  SEED: "Mè & hạt gieo",
  corn: "Bắp (ngô)",
  CORN: "Bắp (ngô)",
  egg: "Trứng",
  EGG: "Trứng",
  legume: "Họ đậu khác",
  LEGUME: "Họ đậu khác",
  fungi: "Nấm",
  mushroom: "Nấm",
  FUNGI: "Nấm",
  allium: "Hành tỏi (ngũ vị tân)",
  ALLIUM: "Hành tỏi (ngũ vị tân)",
};

export function formatAllergy(allergy?: string): string {
  if (!allergy) return "";
  const trimmed = allergy.trim();
  const lower = trimmed.toLowerCase();
  return (
    ALLERGEN_LABELS_VI[trimmed] ||
    ALLERGEN_LABELS_VI[lower] ||
    ALLERGEN_LABELS_VI[trimmed.toUpperCase()] ||
    trimmed
  );
}

export function formatAllergies(allergies?: string[] | null): string {
  if (!allergies || !allergies.length) return "";
  return allergies.map(formatAllergy).join(", ");
}

export interface UserProfile {
  id: number | string;
  name: string;
  age: number | null;
  gender: Gender | "";
  height: number | null; // in cm
  weight: number | null; // in kg
  activityLevel: ActivityLevel | "";
  healthGoal: HealthGoal | "";
  vegetarianType: VegetarianType | "";
  allergies: string[]; // e.g. ["peanut", "soy"]
  email?: string;
  handle?: string;
  bio?: string;
  bmi?: number | null;
  bmiCategory?: string;
  isPremium?: boolean;
  allergenGroups?: string[];
  target_weight_kg?: number | null;
  target_date?: string | null;
  profile_complete?: boolean;
  missing_profile_fields?: string[];
  allergies_declared?: boolean;
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
  target_weight_kg?: number | null;
  target_date?: string | null;
  profile_complete?: boolean;
  missing_profile_fields?: string[];
  allergies_declared?: boolean;
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
  target_weight_kg?: number | null;
  target_date?: string | null;
}

export interface UpdateAllergiesPayload {
  allergen_groups?: string[];
  ingredient_ids?: number[];
}
