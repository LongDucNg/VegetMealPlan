"use client";

import { useState, useEffect, useCallback } from "react";
import { UserSubscription, SubscriptionTier } from "../types";
import { subscriptionService } from "../services/subscriptionService";
import { storage, STORAGE_KEYS } from "@/utils/storage/storage";

export function useSubscription() {
  const [subscription, setSubscription] = useState<UserSubscription>(() =>
    subscriptionService.getSubscription()
  );

  useEffect(() => {
    const unsubscribe = storage.subscribe((event) => {
      if (event.key === STORAGE_KEYS.SUBSCRIPTION) {
        setSubscription(subscriptionService.getSubscription());
      }
    });

    return unsubscribe;
  }, []);

  const purchase = useCallback((planId: SubscriptionTier) => {
    const updated = subscriptionService.purchasePlan(planId);
    setSubscription(updated);
    return updated;
  }, []);

  const cancel = useCallback(() => {
    const updated = subscriptionService.cancelSubscription();
    setSubscription(updated);
    return updated;
  }, []);

  const toggle = useCallback(() => {
    const updated = subscriptionService.togglePremium();
    setSubscription(updated);
    return updated;
  }, []);

  return {
    subscription,
    isPremium: subscription.status === "active",
    purchase,
    cancel,
    toggle,
  };
}
