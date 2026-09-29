"use client";

import React, { useState } from "react";
import { Sparkles, Check, Crown, ArrowRight } from "lucide-react";
import { useSubscription } from "../hooks/useSubscription";
import { MockPaymentModal } from "../components/MockPaymentModal";

interface PremiumGuardProps {
  children: React.ReactNode;
  feature: "meal-planner" | "ai-chatbot";
  customTitle?: string;
  customDescription?: string;
}

export function PremiumGuard({
  children,
  feature,
  customTitle,
  customDescription,
}: PremiumGuardProps) {
  const { isPremium, purchase, toggle, subscription } = useSubscription();
  const [modalOpen, setModalOpen] = useState(false);

  if (isPremium) {
    return (
      <div className="relative">
        {/* Subtle premium active status bar for convenience */}
        <div className="mb-4 flex items-center justify-between bg-emerald-50 border border-emerald-200/80 rounded-2xl px-4 py-2 text-xs text-emerald-900 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold flex items-center gap-1.5">
              <Crown className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              Premium Active
            </span>
            <span className="text-emerald-700/80 hidden sm:inline">
              · 99,000 VND / month (persisted in localStorage)
            </span>
          </div>
          <button
            onClick={() => toggle()}
            className="text-[11px] font-medium text-emerald-800 hover:text-red-700 underline underline-offset-2 transition-colors cursor-pointer"
            title="Click to toggle back to Free for testing guard"
          >
            [Dev: Switch to Free]
          </button>
        </div>
        {children}
      </div>
    );
  }

  // Content for Meal Planner
  if (feature === "meal-planner") {
    return (
      <>
        <div className="max-w-2xl mx-auto my-10 p-8 sm:p-12 bg-white border border-stone-200 rounded-3xl shadow-sm text-center relative overflow-hidden">
          {/* Subtle decorative glow */}
          <div className="absolute -top-16 -right-16 w-40 h-40 bg-amber-200/40 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-emerald-200/40 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto mb-6 shadow-xs">
              <Crown className="w-8 h-8 text-amber-500 fill-amber-500" strokeWidth={1.5} />
            </div>

            <h2 className="font-serif font-bold text-3xl text-stone-900 mb-3 tracking-tight">
              {customTitle || "Unlock Personalized Meal Planner"}
            </h2>

            <p className="text-stone-600 text-base max-w-lg mx-auto mb-6">
              {customDescription ||
                "Get personalized meal recommendations tailored specifically for your body composition and plant-based lifestyle:"}
            </p>

            {/* Feature Checklist */}
            <div className="bg-stone-50 border border-stone-200/90 rounded-2xl p-5 max-w-md mx-auto mb-8 text-left space-y-2.5">
              {[
                "Your BMI & body metrics calculation",
                "Your daily calorie & macro needs (Mifflin-St Jeor)",
                "Your personal health goal (Weight loss, maintenance, muscle gain)",
                "Your vegetarian diet (Vegan, Lacto, Ovo, Lacto-Ovo)",
                "Your specific allergies (Peanut, Soy, Gluten, etc.)",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5 text-sm text-stone-700">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setModalOpen(true)}
                className="w-full sm:w-auto h-12 px-8 rounded-full bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold text-base shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-900 fill-amber-900" />
                Upgrade to Premium
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => toggle()}
                className="text-xs text-stone-500 hover:text-stone-800 underline underline-offset-2 py-2 px-3 cursor-pointer"
              >
                [Dev Quick Unlock]
              </button>
            </div>

            <p className="text-xs text-stone-400 mt-4">
              99,000 VND / month · Cancel anytime · Prototype mock payment
            </p>
          </div>
        </div>

        <MockPaymentModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSuccess={(planId) => purchase(planId)}
        />
      </>
    );
  }

  // Content for AI Chatbot
  return (
    <>
      <div className="max-w-2xl mx-auto my-10 p-8 sm:p-12 bg-white border border-stone-200 rounded-3xl shadow-sm text-center relative overflow-hidden">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto mb-6 shadow-xs">
          <Sparkles className="w-8 h-8 text-emerald-600 fill-emerald-600" />
        </div>

        <h2 className="font-serif font-bold text-3xl text-stone-900 mb-3 tracking-tight">
          AI Nutrition Assistant
        </h2>

        <p className="text-stone-600 text-base max-w-md mx-auto mb-6">
          This feature is available for Premium users. Unlock unlimited, personalized plant-based nutrition guidance powered by your profile metrics.
        </p>

        <div className="bg-stone-50 border border-stone-200/90 rounded-2xl p-5 max-w-md mx-auto mb-8 text-left space-y-2.5">
          {[
            "Instant dinner & breakfast recommendations based on remaining calories",
            "Safe recipe swaps tailored to your allergies & vegetarian diet",
            "In-depth BMI and metabolic target explanations",
            "Vietnamese plant-based sourcing & B12 guidance",
          ].map((item) => (
            <div key={item} className="flex items-start gap-2.5 text-sm text-stone-700">
              <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3 h-3 stroke-[2.5]" />
              </div>
              <span>{item}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => setModalOpen(true)}
            className="w-full sm:w-auto h-12 px-8 rounded-full bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold text-base shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-900 fill-amber-900" />
            Upgrade to Premium
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => toggle()}
            className="text-xs text-stone-500 hover:text-stone-800 underline underline-offset-2 py-2 px-3 cursor-pointer"
          >
            [Dev Quick Unlock]
          </button>
        </div>

        <p className="text-xs text-stone-400 mt-4">
          Status is stored in localStorage (<code className="text-stone-600">app_subscription</code>) and persists on refresh.
        </p>
      </div>

      <MockPaymentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={(planId) => purchase(planId)}
      />
    </>
  );
}
