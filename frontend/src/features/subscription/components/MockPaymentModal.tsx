"use client";

import React from "react";
import { PremiumUpgradeModal } from "./PremiumUpgradeModal";
import { SubscriptionPlan } from "../types";

export interface MockPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (planId: SubscriptionPlan["id"]) => void;
  defaultPlanId?: SubscriptionPlan["id"];
  title?: string;
  description?: string;
}

/**
 * Đã thay thế hoàn toàn giao diện mock prototype cũ bằng cổng thanh toán VietQR thật PayOS trong PremiumUpgradeModal.
 */
export function MockPaymentModal({
  isOpen,
  onClose,
  title,
  description,
}: MockPaymentModalProps) {
  return (
    <PremiumUpgradeModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={description}
    />
  );
}
