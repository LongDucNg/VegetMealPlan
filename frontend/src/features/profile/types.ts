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
}
