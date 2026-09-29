"use client";

import React, { useState } from "react";
import { Check, Crown } from "lucide-react";
import { MOCK_PLANS } from "../data/mockSubscriptions";
import { useSubscription } from "../hooks/useSubscription";
import { MockPaymentModal } from "./MockPaymentModal";
import { SubscriptionPlan } from "../types";

export function SubscriptionPlans() {
  const { subscription, purchase, cancel, isPremium } = useSubscription();
  const [modalOpen, setModalOpen] = useState(false);
  const [targetPlanId, setTargetPlanId] = useState<SubscriptionPlan["id"]>("premium");

  const handleSelectPlan = (planId: SubscriptionPlan["id"]) => {
    if (planId === "free") {
      cancel();
      return;
    }
    setTargetPlanId(planId);
    setModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Current plan notice */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-stone-50 border border-stone-200">
        <div>
          <span className="text-xs text-stone-500">Current Membership:</span>
          <p className="font-serif font-bold text-lg text-stone-900 flex items-center gap-1.5 mt-0.5">
            {isPremium && <Crown className="w-4 h-4 text-amber-500 fill-amber-500" />}
            {subscription.planName}
          </p>
        </div>
        {isPremium ? (
          <button
            onClick={() => cancel()}
            className="text-xs text-red-600 hover:text-red-800 underline underline-offset-2 font-medium cursor-pointer"
          >
            Cancel Subscription
          </button>
        ) : (
          <span className="text-xs font-semibold text-stone-500 bg-stone-200/70 px-2.5 py-1 rounded-full">
            Free Tier
          </span>
        )}
      </div>

      {/* Plans grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {MOCK_PLANS.map((plan) => {
          const isCurrent = subscription.planId === plan.id;
          return (
            <div
              key={plan.id}
              className={`rounded-3xl p-6 flex flex-col justify-between border transition-all ${
                plan.popular
                  ? "border-emerald-600 bg-white ring-2 ring-emerald-600/30 shadow-md relative"
                  : "border-stone-200 bg-white shadow-xs hover:border-stone-300"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-amber-400 text-amber-950 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div>
                <h3 className="font-serif font-bold text-xl text-stone-900">{plan.name}</h3>
                <div className="mt-3 mb-4">
                  <span className="font-serif font-bold text-3xl text-emerald-800">
                    {plan.formattedPrice}
                  </span>
                  <span className="text-xs text-stone-500 block mt-0.5">
                    {plan.billingCycleText}
                  </span>
                </div>

                <div className="h-px bg-stone-100 my-4" />

                <ul className="space-y-2.5 text-xs text-stone-600 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                {isCurrent ? (
                  <button
                    disabled
                    className="w-full h-11 rounded-xl bg-stone-100 text-stone-500 font-semibold text-sm cursor-default"
                  >
                    Current Plan
                  </button>
                ) : (
                  <button
                    onClick={() => handleSelectPlan(plan.id)}
                    className={`w-full h-11 rounded-xl font-semibold text-sm transition-all cursor-pointer ${
                      plan.price > 0
                        ? "bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs"
                        : "bg-stone-100 hover:bg-stone-200 text-stone-800"
                    }`}
                  >
                    {plan.price > 0 ? "Upgrade Plan" : "Switch to Free"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <MockPaymentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={(planId) => purchase(planId)}
        defaultPlanId={targetPlanId}
      />
    </div>
  );
}
