"use client";

import { useState, useEffect, useCallback } from "react";
import { UserProfile } from "../types";
import { profileService } from "../services/profileService";
import { storage, STORAGE_KEYS } from "@/utils/storage/storage";

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile>(() =>
    profileService.getProfile()
  );

  useEffect(() => {
    // Subscribe to cross-component and external storage changes
    const unsubscribe = storage.subscribe((event) => {
      if (event.key === STORAGE_KEYS.USER_PROFILE) {
        setProfile(profileService.getProfile());
      }
    });

    return unsubscribe;
  }, []);

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    const updated = profileService.updateProfile(updates);
    setProfile(updated);
    return updated;
  }, []);

  const resetProfile = useCallback(() => {
    const reset = profileService.resetProfile();
    setProfile(reset);
    return reset;
  }, []);

  return {
    profile,
    updateProfile,
    resetProfile,
  };
}
