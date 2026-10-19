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

function mapFrontendDietToBackend(diet?: VegetarianType | ""): string {
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

function mapFrontendGoalToId(goal?: HealthGoal | ""): number {
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
    age: backend.age ?? null,
    gender: (backend.gender as Gender) || "",
    height: backend.height_cm ?? null,
    weight: backend.weight_kg ?? null,
    activityLevel: (backend.activity_level as ActivityLevel) || "",
    healthGoal: backend.current_goal?.name ? mapBackendGoalToFrontend(backend.current_goal?.name) : "",
    vegetarianType: backend.diet_type ? mapBackendDietToFrontend(backend.diet_type) : "",
    allergies: mappedAllergies,
    email: backend.email,
    bmi: backend.bmi ?? null,
    bmiCategory: backend.bmi_category,
    isPremium: backend.is_premium,
    allergenGroups: allergenGroups,
    target_weight_kg: backend.target_weight_kg ?? null,
    target_date: backend.target_date ?? null,
    profile_complete: backend.profile_complete,
    missing_profile_fields: backend.missing_profile_fields || [],
    allergies_declared: backend.allergies_declared,
  };
}

let inFlightProfilePromise: Promise<UserProfile> | null = null;

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
      if (authUser && (raw.id === "guest" || raw.id === 1 || raw.id === authUser.user_id)) {
        raw.id = authUser.user_id;
        raw.name = authUser.full_name || raw.name;
        raw.email = authUser.email || raw.email;
        raw.handle = authUser.email ? authUser.email.split("@")[0] : raw.handle;

        // Xóa giá trị mặc định giả mạo nếu tài khoản chưa hoàn thiện hồ sơ
        if (raw.profile_complete === false || (!raw.profile_complete && (!authUser.height_cm || !authUser.weight_kg))) {
          if (!authUser.height_cm) raw.height = null;
          if (!authUser.weight_kg) raw.weight = null;
          if (!authUser.age) raw.age = null;
          if (!authUser.gender) raw.gender = "";
          if (!authUser.activity_level) raw.activityLevel = "";
        }
      }
      return raw;
    }

    if (authUser) {
      const userProfile: UserProfile = {
        id: authUser.user_id,
        name: authUser.full_name || "Thành viên VeggieHub",
        email: authUser.email,
        handle: authUser.email ? authUser.email.split("@")[0] : "member",
        age: authUser.age ?? null,
        gender: (authUser.gender as Gender) || "",
        height: authUser.height_cm ?? null,
        weight: authUser.weight_kg ?? null,
        activityLevel: (authUser.activity_level as ActivityLevel) || "",
        healthGoal: "",
        vegetarianType: authUser.diet_type ? mapBackendDietToFrontend(authUser.diet_type) : "",
        allergies: authUser.allergies || [],
        isPremium: authUser.is_premium,
        target_weight_kg: authUser.target_weight_kg ?? null,
        target_date: authUser.target_date ?? null,
        profile_complete: authUser.profile_complete ?? false,
        missing_profile_fields: authUser.missing_profile_fields || [],
        allergies_declared: authUser.allergies_declared ?? false,
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

    if (inFlightProfilePromise) {
      return inFlightProfilePromise;
    }

    inFlightProfilePromise = (async () => {
      try {
        const data = await apiClient.get<BackendProfile>("/users/me/profile");
        const mapped = mapBackendProfileToUserProfile(data);
        storage.setItem(STORAGE_KEYS.USER_PROFILE, mapped);
        return mapped;
      } catch (err: any) {
        // 401 UNAUTHORIZED là trạng thái bình thường khi phiên hết hạn hoặc chưa đăng nhập
        if (err?.status !== 401 && err?.code !== "AUTH_UNAUTHORIZED") {
          console.warn("[profileService] Failed to fetch server profile, using cache:", err);
        }
        return this.getProfile();
      } finally {
        inFlightProfilePromise = null;
      }
    })();

    return inFlightProfilePromise;
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
    if (updates.target_weight_kg !== undefined) {
      const val = updates.target_weight_kg as unknown;
      payload.target_weight_kg =
        val === null || val === undefined || val === "" || Number.isNaN(Number(val))
          ? null
          : Number(val);
    }
    if (updates.target_date !== undefined) {
      payload.target_date = updates.target_date ? String(updates.target_date).trim() : null;
    }

    try {
      // 1. Cập nhật metrics & thông tin hồ sơ
      const serverProfile = await apiClient.put<BackendProfile>("/users/me/profile", payload);

      // 2. Cập nhật dị ứng nếu có
      if (updates.allergies !== undefined) {
        const allergenGroups = updates.allergies
          .map((a) => ALLERGEN_MAP_TO_BACKEND[a] || a.toUpperCase())
          .filter(Boolean);

        // BE: User không dị ứng gì thì vẫn gọi PUT /users/me/allergies với {} để đánh dấu đã khai báo
        await apiClient.put<AllergiesData>("/users/me/allergies", {
          allergen_groups: allergenGroups,
          ingredient_ids: [],
        });
        if (serverProfile.allergies) {
          serverProfile.allergies.allergen_groups = allergenGroups;
        }
        serverProfile.allergies_declared = true;
      }

      const mapped = mapBackendProfileToUserProfile(serverProfile);
      storage.setItem(STORAGE_KEYS.USER_PROFILE, mapped);
      return mapped;
    } catch (err) {
      console.warn("[profileService] Server update failed:", err);
      throw err;
    }
  },

  /**
   * Đánh dấu người dùng không có dị ứng thực phẩm:
   * PUT /users/me/allergies với {}
   */
  async declareNoAllergies(): Promise<void> {
    await apiClient.put("/users/me/allergies", {});
    const current = this.getProfile();
    const updated: UserProfile = {
      ...current,
      allergies: [],
      allergenGroups: [],
      allergies_declared: true,
    };
    storage.setItem(STORAGE_KEYS.USER_PROFILE, updated);
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
