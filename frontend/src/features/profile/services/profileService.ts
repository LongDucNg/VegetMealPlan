import { apiClient } from "@/lib/apiClient";
import { tokenStorage } from "@/lib/tokenStorage";
import { storage, STORAGE_KEYS } from "@/utils/storage/storage";
import {
  UserProfile,
  BackendProfile,
  AllergiesData,
  UpdateProfilePayload,
  VegetarianType,
  HealthGoal,
  ActivityLevel,
  Gender,
} from "../types";
import { DEFAULT_MOCK_PROFILE } from "../data/mockProfile";

const ALLERGEN_MAP_TO_BACKEND: Record<string, string> = {
  peanut: "PEANUT",
  soy: "SOY",
  gluten: "GLUTEN",
  dairy: "DAIRY",
  treenut: "TREE_NUT",
  sesame: "SEED",
  egg: "EGG",
  fungi: "FUNGI",
  mushroom: "FUNGI",
  allium: "ALLIUM",
  legume: "LEGUME",
};

const ALLERGEN_MAP_FROM_BACKEND: Record<string, string> = {
  PEANUT: "peanut",
  SOY: "soy",
  GLUTEN: "gluten",
  DAIRY: "dairy",
  TREE_NUT: "treenut",
  SEED: "sesame",
  EGG: "egg",
  FUNGI: "fungi",
  ALLIUM: "allium",
  LEGUME: "legume",
};

function mapBackendDietToFrontend(diet?: string): VegetarianType {
  if (!diet) return "vegan";
  const d = diet.toLowerCase();
  if (d === "lacto") return "lacto_vegetarian";
  if (d === "ovo") return "ovo_vegetarian";
  if (d === "ovo_lacto" || d === "lacto_ovo") return "lacto_ovo_vegetarian";
  return "vegan";
}

function mapFrontendDietToBackend(diet?: VegetarianType): string {
  if (!diet) return "vegan";
  if (diet === "lacto_vegetarian") return "lacto";
  if (diet === "ovo_vegetarian") return "ovo";
  if (diet === "lacto_ovo_vegetarian") return "ovo_lacto";
  return "vegan";
}

function mapBackendGoalToFrontend(goal?: string): HealthGoal {
  if (!goal) return "maintain_weight";
  const g = goal.toLowerCase();
  if (g.includes("lose")) return "lose_weight";
  if (g.includes("gain") || g.includes("muscle")) return "gain_weight";
  return "maintain_weight";
}

function mapFrontendGoalToId(goal?: HealthGoal): number {
  if (goal === "lose_weight") return 1;
  if (goal === "gain_weight") return 2;
  return 3; // maintain
}

function mapBackendProfileToUserProfile(backend: BackendProfile): UserProfile {
  const allergenGroups = backend.allergies?.allergen_groups || [];
  const mappedAllergies = allergenGroups.map(
    (code) => ALLERGEN_MAP_FROM_BACKEND[code] || code.toLowerCase()
  );

  return {
    id: backend.user_id,
    name: backend.full_name,
    age: backend.age ?? 25,
    gender: (backend.gender as Gender) || "other",
    height: backend.height_cm ?? 170,
    weight: backend.weight_kg ?? 65,
    activityLevel:
      (backend.activity_level as ActivityLevel) || "moderate",
    healthGoal: mapBackendGoalToFrontend(backend.current_goal?.name),
    vegetarianType: mapBackendDietToFrontend(backend.diet_type),
    allergies: mappedAllergies,
    email: backend.email,
    bmi: backend.bmi,
    bmiCategory: backend.bmi_category,
    isPremium: backend.is_premium,
    allergenGroups: allergenGroups,
  };
}

export const profileService = {
  /**
   * Lấy hồ sơ người dùng hiện tại (đồng bộ tức thì từ cache)
   */
  getProfile(): UserProfile {
    const raw = storage.getItem<UserProfile | null>(STORAGE_KEYS.USER_PROFILE, null);
    const authUser = tokenStorage.getUser();

    // If cache contains legacy mock data, purge it
    if (raw && (raw.name === "Demo User" || raw.email === "demo@veggiehub.vn" || raw.handle === "demouser")) {
      storage.removeItem(STORAGE_KEYS.USER_PROFILE);
    } else if (raw) {
      if (authUser && (raw.id === "guest" || raw.id === 1)) {
        raw.id = authUser.user_id;
        raw.name = authUser.full_name || raw.name;
        raw.email = authUser.email || raw.email;
        raw.handle = authUser.email ? authUser.email.split("@")[0] : raw.handle;
      }
      return raw;
    }

    if (authUser) {
      const userProfile: UserProfile = {
        ...DEFAULT_MOCK_PROFILE,
        id: authUser.user_id,
        name: authUser.full_name || "Thành viên VeggieHub",
        email: authUser.email,
        handle: authUser.email ? authUser.email.split("@")[0] : "member",
      };
      storage.setItem(STORAGE_KEYS.USER_PROFILE, userProfile);
      return userProfile;
    }

    return DEFAULT_MOCK_PROFILE;
  },

  getStoredProfile(): UserProfile {
    return this.getProfile();
  },

  /**
   * Lấy hồ sơ cá nhân từ backend:
   * GET /users/me/profile
   * Nếu có JWT, gọi backend lấy hồ sơ thật và cập nhật vào LocalStorage cache.
   * Nếu chưa đăng nhập hoặc offline, trả về cached profile.
   */
  async fetchServerProfile(): Promise<UserProfile> {
    const token = tokenStorage.getToken();
    if (!token) {
      return this.getProfile();
    }

    try {
      const data = await apiClient.get<BackendProfile>("/users/me/profile");
      const mapped = mapBackendProfileToUserProfile(data);
      storage.setItem(STORAGE_KEYS.USER_PROFILE, mapped);
      return mapped;
    } catch (err) {
      console.warn("[profileService] Failed to fetch server profile, using cache:", err);
      return this.getProfile();
    }
  },

  /**
   * Cập nhật hồ sơ cá nhân:
   * PUT /users/me/profile
   * PUT /users/me/allergies
   */
  async updateProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
    const current = this.getProfile();
    const updatedLocal: UserProfile = {
      ...current,
      ...updates,
      height: updates.height !== undefined ? Number(updates.height) : current.height,
      weight: updates.weight !== undefined ? Number(updates.weight) : current.weight,
      age: updates.age !== undefined ? Number(updates.age) : current.age,
      allergies: updates.allergies ?? current.allergies,
    };

    const token = tokenStorage.getToken();
    if (!token) {
      storage.setItem(STORAGE_KEYS.USER_PROFILE, updatedLocal);
      return updatedLocal;
    }

    // Prepare payload for backend
    const payload: UpdateProfilePayload = {};
    if (updates.name !== undefined) payload.full_name = updates.name;
    if (updates.age !== undefined) payload.age = Number(updates.age);
    if (updates.gender !== undefined) payload.gender = updates.gender;
    if (updates.height !== undefined) payload.height_cm = Number(updates.height);
    if (updates.weight !== undefined) payload.weight_kg = Number(updates.weight);
    if (updates.activityLevel !== undefined) {
      payload.activity_level =
        updates.activityLevel === "very_active" ? "active" : updates.activityLevel;
    }
    if (updates.vegetarianType !== undefined) {
      payload.diet_type = mapFrontendDietToBackend(updates.vegetarianType);
    }
    if (updates.healthGoal !== undefined) {
      payload.current_goal_id = mapFrontendGoalToId(updates.healthGoal);
    }

    try {
      // 1. Cập nhật metrics & thông tin hồ sơ
      const serverProfile = await apiClient.put<BackendProfile>("/users/me/profile", payload);

      // 2. Cập nhật dị ứng nếu có
      if (updates.allergies !== undefined) {
        const allergenGroups = updates.allergies
          .map((a) => ALLERGEN_MAP_TO_BACKEND[a] || a.toUpperCase())
          .filter(Boolean);

        await apiClient.put<AllergiesData>("/users/me/allergies", {
          allergen_groups: allergenGroups,
          ingredient_ids: [],
        });
        if (serverProfile.allergies) {
          serverProfile.allergies.allergen_groups = allergenGroups;
        }
      }

      const mapped = mapBackendProfileToUserProfile(serverProfile);
      storage.setItem(STORAGE_KEYS.USER_PROFILE, mapped);
      return mapped;
    } catch (err) {
      console.warn("[profileService] Server update failed, saving locally:", err);
      storage.setItem(STORAGE_KEYS.USER_PROFILE, updatedLocal);
      return updatedLocal;
    }
  },

  /**
   * Lấy danh sách dị ứng:
   * GET /users/me/allergies
   */
  async getAllergies(): Promise<AllergiesData> {
    try {
      return await apiClient.get<AllergiesData>("/users/me/allergies");
    } catch {
      return { allergen_groups: [], ingredients: [] };
    }
  },

  /**
   * Cập nhật danh sách dị ứng:
   * PUT /users/me/allergies
   */
  async setAllergies(allergenGroups: string[], ingredientIds: number[] = []): Promise<AllergiesData> {
    return await apiClient.put<AllergiesData>("/users/me/allergies", {
      allergen_groups: allergenGroups,
      ingredient_ids: ingredientIds,
    });
  },

  /**
   * Khôi phục hồ sơ mặc định
   */
  resetProfile(): UserProfile {
    storage.setItem(STORAGE_KEYS.USER_PROFILE, DEFAULT_MOCK_PROFILE);
    return DEFAULT_MOCK_PROFILE;
  },
};
