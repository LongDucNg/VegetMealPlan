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
    subscriptionService.fetchServerStatus().then(setSubscription);

    const unsubscribe = storage.subscribe((event) => {
      if (event.key === STORAGE_KEYS.SUBSCRIPTION) {
        setSubscription(subscriptionService.getSubscription());
      }
    });

    return unsubscribe;
  }, []);

  const purchase = useCallback(async (planId: SubscriptionTier) => {
    const updated = await subscriptionService.purchasePlan(planId);
    setSubscription(updated);
    return updated;
  }, []);

  const cancel = useCallback(async (id?: number) => {
    const updated = await subscriptionService.cancelSubscription(id);
    setSubscription(updated);
    return updated;
  }, []);

  const toggle = useCallback(async () => {
    const updated = await subscriptionService.togglePremium();
    setSubscription(updated);
    return updated;
  }, []);

  const checkout = useCallback(async () => {
    return subscriptionService.createCheckout();
  }, []);

  const refreshStatus = useCallback(async () => {
    const updated = await subscriptionService.fetchServerStatus();
    setSubscription(updated);
    return updated;
  }, []);

  return {
    subscription,
    isPremium: subscription.status === "active",
    purchase,
    cancel,
    toggle,
    checkout,
    refreshStatus,
  };
}
