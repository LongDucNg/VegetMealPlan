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
export interface BackendSubscriptionPlan {
  plan_type: string;
  name: string;
  price: number;
  currency: string;
  duration_days: number;
  description: string;
}

export interface CheckoutResponse {
  payment_url: string;
  gateway_txn_ref: string;
  amount: number;
  expires_in_minutes: number;
}

export interface PremiumStatusResponse {
  isPremium: boolean;
  premium_until: string | null;
}

export interface VnpayReturnResponse {
  status: "success" | "failed" | "invalid";
  txn_ref: string | null;
  premium_until: string | null;
}
