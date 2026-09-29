export type SubscriptionTier = "free" | "premium" | "premium_monthly" | "premium_yearly";
export type SubscriptionStatus = "free" | "active";

export interface SubscriptionPlan {
  id: SubscriptionTier;
  name: string;
  price: number;
  formattedPrice: string;
  duration: "free" | "monthly";
  billingCycleText: string;
  badge?: string;
  popular?: boolean;
  features: string[];
}

export interface UserSubscription {
  status: SubscriptionStatus;
  planId: SubscriptionTier;
  planName: string;
  activatedAt?: string;
  expiresAt?: string;
  autoRenew: boolean;
}

