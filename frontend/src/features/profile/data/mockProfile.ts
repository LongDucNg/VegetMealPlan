import { UserProfile } from "../types";

export const DEFAULT_MOCK_PROFILE: UserProfile = {
  id: 1,
  name: "Demo User",
  age: 22,
  gender: "male",
  height: 170,
  weight: 65,
  activityLevel: "moderate",
  healthGoal: "maintain_weight",
  vegetarianType: "vegan",
  allergies: ["peanut", "soy"],
  email: "demo@veggiehub.vn",
  handle: "demouser",
  bio: "Plant-based enthusiast from Ho Chi Minh City 🌿 Passionate about wholesome vegan cooking and balanced macros.",
};

export const ALLERGY_MASTER_LIST = [
  { id: "peanut", label: "Peanuts" },
  { id: "soy", label: "Soy & Tofu" },
  { id: "gluten", label: "Gluten / Wheat" },
  { id: "dairy", label: "Dairy (Lactose)" },
  { id: "treenut", label: "Tree Nuts (Cashews, Almonds, Walnuts)" },
  { id: "sesame", label: "Sesame" },
  { id: "corn", label: "Corn" },
  { id: "egg", label: "Eggs" },
];

export const VEGETARIAN_TYPE_OPTIONS: { id: UserProfile["vegetarianType"]; label: string; desc: string }[] = [
  { id: "vegan", label: "Vegan", desc: "100% plant-based, no animal products" },
  { id: "lacto_vegetarian", label: "Lacto Vegetarian", desc: "Plant-based + dairy products" },
  { id: "ovo_vegetarian", label: "Ovo Vegetarian", desc: "Plant-based + eggs" },
  { id: "lacto_ovo_vegetarian", label: "Lacto-Ovo Vegetarian", desc: "Plant-based + dairy + eggs" },
];

export const HEALTH_GOAL_OPTIONS: { id: UserProfile["healthGoal"]; label: string; desc: string }[] = [
  { id: "lose_weight", label: "Lose Weight", desc: "Deficit of ~500 kcal for steady fat loss" },
  { id: "maintain_weight", label: "Maintain Weight", desc: "Balanced energy intake aligned with your TDEE" },
  { id: "gain_weight", label: "Gain Muscle / Weight", desc: "Surplus of ~400 kcal + higher plant protein" },
  { id: "healthy_eating", label: "Healthy Eating", desc: "Nutrient-dense variety and gut vitality" },
];

export const ACTIVITY_LEVEL_OPTIONS: { id: UserProfile["activityLevel"]; label: string; factor: number; desc: string }[] = [
  { id: "sedentary", label: "Sedentary", factor: 1.2, desc: "Little or no exercise, desk job" },
  { id: "light", label: "Light Activity", factor: 1.375, desc: "Light exercise/sports 1-3 days/week" },
  { id: "moderate", label: "Moderate Activity", factor: 1.55, desc: "Moderate exercise 3-5 days/week" },
  { id: "active", label: "Active", factor: 1.725, desc: "Hard exercise 6-7 days/week" },
  { id: "very_active", label: "Very Active", factor: 1.9, desc: "Physical job or twice-per-day training" },
];
