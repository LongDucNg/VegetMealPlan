"use client";

import { useState, useEffect, useCallback } from "react";
import { UserProfile } from "../types";
import { profileService } from "../services/profileService";
import { storage, STORAGE_KEYS } from "@/utils/storage/storage";

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile>(() =>
    profileService.getProfile()
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const serverProfile = await profileService.fetchServerProfile();
      setProfile(serverProfile);
      return serverProfile;
    } catch (err: any) {
      setError(err?.message || "Không thể tải hồ sơ người dùng");
      return profileService.getProfile();
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();

    // Subscribe to cross-component and external storage changes
    const unsubscribe = storage.subscribe((event) => {
      if (event.key === STORAGE_KEYS.USER_PROFILE) {
        setProfile(profileService.getProfile());
      }
    });

    return unsubscribe;
  }, [fetchProfile]);

  const updateProfile = useCallback(async (updates: Partial<UserProfile>) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await profileService.updateProfile(updates);
      setProfile(updated);
      return updated;
    } catch (err: any) {
      setError(err?.message || "Không thể cập nhật hồ sơ");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const resetProfile = useCallback(() => {
    const reset = profileService.resetProfile();
    setProfile(reset);
    return reset;
  }, []);

  return {
    profile,
    loading,
    error,
    refetch: fetchProfile,
    updateProfile,
    resetProfile,
  };
}
