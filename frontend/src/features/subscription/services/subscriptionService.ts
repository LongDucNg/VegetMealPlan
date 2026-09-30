import { storage, STORAGE_KEYS } from "@/utils/storage/storage";
import { UserSubscription, SubscriptionTier } from "../types";
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

  upgradeToPremium(): UserSubscription {
    return this.purchasePlan("premium");
  },

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
    return updated;
  },

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
    return updated;
  },

  togglePremium(): UserSubscription {
    if (this.isPremium()) {
      return this.cancelSubscription();
    }
    return this.upgradeToPremium();
  },
};

