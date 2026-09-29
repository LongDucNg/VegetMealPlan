import { SubscriptionPlan, UserSubscription } from "../types";

export const MOCK_PLANS: SubscriptionPlan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    formattedPrice: "0 VND",
    duration: "free",
    billingCycleText: "Basic access",
    features: [
      "Browse recipes",
      "Discover recipes",
      "View recipe details",
      "Basic profile",
      "Basic BMI calculation",
      "Basic nutrition information",
      "Limited meal plan access",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 99000,
    formattedPrice: "99,000 VND",
    duration: "monthly",
    billingCycleText: "99,000 VND / month",
    badge: "Full Access",
    popular: true,
    features: [
      "Full personalized meal planner",
      "Personalized calorie target",
      "BMI-based meal recommendations",
      "Allergy-aware recommendations",
      "Personalized nutrition recommendations",
      "Full weekly meal plan",
      "AI Nutritionist",
      "Regenerate Meal Plan",
      "Personalized recommendations",
    ],
  },
];

export const DEFAULT_SUBSCRIPTION: UserSubscription = {
  status: "free",
  planId: "free",
  planName: "Free Plan",
  autoRenew: false,
};

