import { apiClient } from "@/lib/apiClient";
import { tokenStorage } from "@/lib/tokenStorage";
import { storage, STORAGE_KEYS } from "@/utils/storage/storage";
import { UserSubscription, SubscriptionTier, SubscriptionPlan } from "../types";
import { DEFAULT_SUBSCRIPTION, MOCK_PLANS } from "../data/mockSubscriptions";

const SUBSCRIPTION_PLAN_KEY = "subscriptionPlan";

export const subscriptionService = {
  /**
   * Get subscription plan ("free" | "premium")
   * Reads from localStorage.getItem("subscriptionPlan") or fallback to app_subscription
   */
  getSubscriptionPlan(): "free" | "premium" {
    if (typeof window !== "undefined") {
      const explicit = window.localStorage.getItem(SUBSCRIPTION_PLAN_KEY);
      if (explicit === "premium" || explicit === "free") {
        return explicit;
      }
    }
    const current = storage.getItem<UserSubscription>(
      STORAGE_KEYS.SUBSCRIPTION,
      DEFAULT_SUBSCRIPTION
    );
    return current.status === "active" ? "premium" : "free";
  },

  getSubscription(): UserSubscription {
    const plan = this.getSubscriptionPlan();
    const stored = storage.getItem<UserSubscription>(
      STORAGE_KEYS.SUBSCRIPTION,
      DEFAULT_SUBSCRIPTION
    );

    if (plan === "premium" && stored.status !== "active") {
      const premiumPlan = MOCK_PLANS.find((p) => p.id === "premium") || MOCK_PLANS[1];
      const fixed: UserSubscription = {
        status: "active",
        planId: "premium",
        planName: premiumPlan.name,
        autoRenew: true,
      };
      storage.setItem(STORAGE_KEYS.SUBSCRIPTION, fixed);
      return fixed;
    }

    if (plan === "free" && stored.status === "active") {
      const fixed: UserSubscription = {
        ...DEFAULT_SUBSCRIPTION,
      };
      storage.setItem(STORAGE_KEYS.SUBSCRIPTION, fixed);
      return fixed;
    }

    return stored;
  },

  isPremium(): boolean {
    return this.getSubscriptionPlan() === "premium";
  },

  /**
   * Đồng bộ trạng thái Premium từ backend
   * GET /subscriptions/me/premium-status hoặc GET /users/me/subscription
   */
  async fetchServerStatus(): Promise<UserSubscription> {
    const token = tokenStorage.getToken();
    if (!token) {
      return this.getSubscription();
    }

    try {
      // Gọi trực tiếp endpoint backend đã có: GET /subscriptions/me/premium-status
      const res = await apiClient
        .get<{ isPremium?: boolean; is_premium?: boolean; status?: string }>("/subscriptions/me/premium-status")
        .catch(() =>
          apiClient.get<{ isPremium?: boolean; is_premium?: boolean; status?: string }>("/users/me/subscription")
        );

      const isPrem = !!(res?.isPremium ?? res?.is_premium ?? (res?.status === "active"));

      if (isPrem) {
        if (typeof window !== "undefined") {
          window.localStorage.setItem(SUBSCRIPTION_PLAN_KEY, "premium");
        }
        const premiumPlan = MOCK_PLANS.find((p) => p.id === "premium") || MOCK_PLANS[1];
        const activeSub: UserSubscription = {
          status: "active",
          planId: "premium",
          planName: premiumPlan.name,
          autoRenew: true,
        };
        storage.setItem(STORAGE_KEYS.SUBSCRIPTION, activeSub);
        return activeSub;
      } else {
        if (typeof window !== "undefined") {
          window.localStorage.setItem(SUBSCRIPTION_PLAN_KEY, "free");
        }
        storage.setItem(STORAGE_KEYS.SUBSCRIPTION, DEFAULT_SUBSCRIPTION);
        return DEFAULT_SUBSCRIPTION;
      }
    } catch {
      return this.getSubscription();
    }
  },

  /**
   * Lấy danh sách các gói dịch vụ
   * GET /subscriptions/plans
   */
  async getPlans(): Promise<SubscriptionPlan[]> {
    try {
      const res = await apiClient.get<SubscriptionPlan[]>("/subscriptions/plans");
      if (Array.isArray(res) && res.length > 0) return res;
    } catch {}
    return MOCK_PLANS;
  },

  upgradeToPremium(): UserSubscription {
    return this.purchasePlan("premium");
  },

  /**
   * Mua gói Premium:
   * POST /subscriptions/checkout (Lưu giao dịch PENDING vào PostgreSQL)
   */
  purchasePlan(planId: SubscriptionTier = "premium"): UserSubscription {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(SUBSCRIPTION_PLAN_KEY, "premium");
    }

    const premiumPlan = MOCK_PLANS.find((p) => p.id === "premium") || MOCK_PLANS[1];
    const now = new Date();
    const expires = new Date();
    expires.setMonth(now.getMonth() + 1);

    const updated: UserSubscription = {
      status: "active",
      planId: "premium",
      planName: premiumPlan.name,
      activatedAt: now.toISOString(),
      expiresAt: expires.toISOString(),
      autoRenew: true,
    };

    storage.setItem(STORAGE_KEYS.SUBSCRIPTION, updated);

    // Gọi trực tiếp endpoint backend: POST /subscriptions/checkout
    const token = tokenStorage.getToken();
    if (token) {
      apiClient
        .post<{ gateway_txn_ref?: string }>("/subscriptions/checkout")
        .catch(() => apiClient.post("/users/me/subscription/purchase"))
        .catch(() => {});
    }

    return updated;
  },

  /**
   * Hủy gói Premium:
   * DELETE /subscriptions/:id
   */
  cancelSubscription(): UserSubscription {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(SUBSCRIPTION_PLAN_KEY, "free");
    }

    const updated: UserSubscription = {
      ...DEFAULT_SUBSCRIPTION,
      status: "free",
      planId: "free",
      planName: "Free Plan",
    };
    storage.setItem(STORAGE_KEYS.SUBSCRIPTION, updated);

    const token = tokenStorage.getToken();
    if (token) {
      apiClient
        .delete("/subscriptions/1")
        .catch(() => apiClient.delete("/users/me/subscription"))
        .catch(() => {});
    }


    return updated;
  },

  togglePremium(): UserSubscription {
    if (this.isPremium()) {
      return this.cancelSubscription();
    }
    return this.upgradeToPremium();
  },
};
