import { storage, STORAGE_KEYS } from "@/utils/storage/storage";
import { UserProfile } from "../types";
import { DEFAULT_MOCK_PROFILE } from "../data/mockProfile";

export const profileService = {
  getProfile(): UserProfile {
    return storage.getItem<UserProfile>(STORAGE_KEYS.USER_PROFILE, DEFAULT_MOCK_PROFILE);
  },

  updateProfile(updates: Partial<UserProfile>): UserProfile {
    const current = this.getProfile();
    const updated: UserProfile = {
      ...current,
      ...updates,
      // Ensure arrays and numbers are sanitized
      height: updates.height !== undefined ? Number(updates.height) : current.height,
      weight: updates.weight !== undefined ? Number(updates.weight) : current.weight,
      age: updates.age !== undefined ? Number(updates.age) : current.age,
      allergies: updates.allergies ?? current.allergies,
    };
    storage.setItem(STORAGE_KEYS.USER_PROFILE, updated);
    return updated;
  },

  resetProfile(): UserProfile {
    storage.setItem(STORAGE_KEYS.USER_PROFILE, DEFAULT_MOCK_PROFILE);
    return DEFAULT_MOCK_PROFILE;
  },
};
