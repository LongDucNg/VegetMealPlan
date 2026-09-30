"use client";

import React from "react";
import { Check, Crown, Sparkles, X } from "lucide-react";
import { MOCK_PLANS } from "../data/mockSubscriptions";

interface PremiumUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}

export function PremiumUpgradeModal({
  isOpen,
  onClose,
  onUpgrade,
}: PremiumUpgradeModalProps) {
  if (!isOpen) return null;

  const freePlan = MOCK_PLANS.find((p) => p.id === "free") || MOCK_PLANS[0];
  const premiumPlan = MOCK_PLANS.find((p) => p.id === "premium") || MOCK_PLANS[1];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-stone-400 hover:text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-full transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="pt-8 px-6 sm:px-8 text-center">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto mb-4 shadow-xs">
            <Crown className="w-7 h-7 text-amber-500 fill-amber-500" strokeWidth={1.5} />
          </div>

          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 tracking-tight">
            Unlock Personalized Meal Planning
          </h2>
          <p className="text-stone-600 text-sm sm:text-base max-w-md mx-auto mt-2">
            Get a meal plan tailored to your BMI, calorie target, diet preferences and allergies.
          </p>
        </div>

        {/* 2 Packages Pricing Comparison */}
        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
            {/* FREE PLAN */}
            <div className="rounded-2xl p-5 border border-stone-200 bg-stone-50/70 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  {freePlan.name.toUpperCase()}
                </span>
                <div className="mt-2 mb-3">
                  <span className="font-serif font-bold text-3xl text-stone-900">
                    {freePlan.formattedPrice}
                  </span>
                  <span className="text-xs text-stone-500 block mt-0.5">
                    {freePlan.billingCycleText}
                  </span>
                </div>

                <div className="h-px bg-stone-200/80 my-3" />

                <ul className="space-y-2 text-xs text-stone-600">
                  {freePlan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-3 border-t border-stone-200/60 text-center">
                <span className="text-xs font-semibold text-stone-500">
                  Current Free Tier
                </span>
              </div>
            </div>

            {/* PREMIUM PLAN */}
            <div className="rounded-2xl p-5 border-2 border-emerald-600 bg-emerald-50/30 flex flex-col justify-between relative shadow-md">
              <div className="absolute -top-3 right-4">
                <span className="bg-amber-400 text-amber-950 text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                  <Sparkles className="w-3 h-3 fill-amber-950" />
                  Recommended
                </span>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  {premiumPlan.name.toUpperCase()}
                </span>
                <div className="mt-2 mb-3">
                  <span className="font-serif font-bold text-3xl text-emerald-800">
                    {premiumPlan.formattedPrice}
                  </span>
                  <span className="text-xs text-emerald-700 font-medium block mt-0.5">
                    {premiumPlan.billingCycleText}
                  </span>
                </div>

                <div className="h-px bg-emerald-200/80 my-3" />

                <ul className="space-y-2 text-xs text-stone-700">
                  {premiumPlan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-3 border-t border-emerald-200/60 text-center">
                <span className="text-xs font-bold text-emerald-800">
                  👑 Unlock All Features
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto h-11 px-5 rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-600 hover:text-stone-900 text-xs font-semibold transition-colors cursor-pointer"
            >
              Continue with Free
            </button>

            <button
              type="button"
              onClick={onUpgrade}
              className="w-full sm:w-auto h-11 px-7 rounded-xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-950 fill-amber-950" />
              Upgrade to Premium
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
