/**
 * Centralized Local Storage utility
 * Handles safe SSR checks and custom change events for real-time reactivity
 */

export const STORAGE_KEYS = {
  USER_PROFILE: "app_user_profile",
  SUBSCRIPTION: "app_subscription",
  RECIPES: "app_recipes",
  MEAL_PLANS: "app_meal_plans",
  FAVORITES: "app_user_favorites",
  RECIPE_PRICES: "app_user_recipe_prices",
  GENERATED_PLAN: "app_generated_plan",
  ADMIN_INGREDIENT_PRICES: "app_admin_ingredient_prices",
  IMPORT_PENDING: "app_import_pending_recipes",
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS] | string;

const memoryStore = new Map<string, string>();

export const storage = {
  getItem<T>(key: StorageKey, defaultValue: T): T {
    if (typeof window === "undefined") {
      const stored = memoryStore.get(key);
      if (stored !== undefined) {
        try {
          return JSON.parse(stored) as T;
        } catch {
          return defaultValue;
        }
      }
      return defaultValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      if (item === null || item === undefined) {
        return defaultValue;
      }
      return JSON.parse(item) as T;
    } catch (err) {
      console.warn(`[storage] Error reading key "${key}":`, err);
      return defaultValue;
    }
  },

  setItem<T>(key: StorageKey, value: T): void {
    const serialized = JSON.stringify(value);
    if (typeof window === "undefined") {
      memoryStore.set(key, serialized);
      return;
    }
    try {
      window.localStorage.setItem(key, serialized);
      // Dispatch an event so hooks in the same window can re-render immediately
      window.dispatchEvent(
        new CustomEvent("app-storage-change", {
          detail: { key, value },
        })
      );
    } catch (err) {
      console.warn(`[storage] Error setting key "${key}":`, err);
    }
  },

  removeItem(key: StorageKey): void {
    if (typeof window === "undefined") {
      memoryStore.delete(key);
      return;
    }
    try {
      window.localStorage.removeItem(key);
      window.dispatchEvent(
        new CustomEvent("app-storage-change", {
          detail: { key, value: null },
        })
      );
    } catch (err) {
      console.warn(`[storage] Error removing key "${key}":`, err);
    }
  },

  /**
   * Subscribe to storage change events across same-window or cross-tab
   */
  subscribe(callback: (event: { key: string; value: unknown }) => void): () => void {
    if (typeof window === "undefined") return () => {};

    const handleCustomEvent = (e: Event) => {
      const custom = e as CustomEvent<{ key: string; value: unknown }>;
      if (custom.detail) {
        callback(custom.detail);
      }
    };

    const handleStorageEvent = (e: StorageEvent) => {
      if (e.key) {
        try {
          callback({
            key: e.key,
            value: e.newValue ? JSON.parse(e.newValue) : null,
          });
        } catch {
          callback({ key: e.key, value: e.newValue });
        }
      }
    };

    window.addEventListener("app-storage-change", handleCustomEvent);
    window.addEventListener("storage", handleStorageEvent);

    return () => {
      window.removeEventListener("app-storage-change", handleCustomEvent);
      window.removeEventListener("storage", handleStorageEvent);
    };
  },
};
