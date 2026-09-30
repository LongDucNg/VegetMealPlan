"use client";

import React, { useState } from "react";
import { X, Sparkles, DollarSign, Calendar, UserCheck, AlertCircle, Heart } from "lucide-react";
import { MealPlanType, GenerationPlanOptions } from "../types";
import { UserProfile } from "@/features/profile/types";
import { favoriteService } from "@/features/recipes/services/favoriteService";

interface GenerationSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeProfile: UserProfile;
  isPlanForSomeoneElse: boolean;
  onOpenSomeoneElseModal: () => void;
  onConfirmGenerate: (options: GenerationPlanOptions) => void;
  initialPlanType?: MealPlanType;
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function GenerationSettingsModal({
  isOpen,
  onClose,
  activeProfile,
  isPlanForSomeoneElse,
  onOpenSomeoneElseModal,
  onConfirmGenerate,
  initialPlanType = "weekly",
}: GenerationSettingsModalProps) {
  const [planType, setPlanType] = useState<MealPlanType>(initialPlanType);
  const [useFavorites, setUseFavorites] = useState(false);
  const [hasBudgetLimit, setHasBudgetLimit] = useState(false);
  const [budgetValue, setBudgetValue] = useState<number>(500000);
  const [selectedMonth, setSelectedMonth] = useState<number>(8); // 8 = September
  const [selectedYear, setSelectedYear] = useState<number>(2026);

  const userId = String(activeProfile.id || "u1");
  const favRecipes = favoriteService.getFavoriteRecipes(userId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirmGenerate({
      planType,
      isSomeoneElse: isPlanForSomeoneElse,
      targetProfile: activeProfile,
      budgetLimit: hasBudgetLimit ? budgetValue : undefined,
      selectedMonth,
      selectedYear,
      favoriteRecipeIds: useFavorites && favRecipes.length > 0 ? favRecipes.map((r) => r.id) : undefined,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-emerald-700" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-stone-900">
                Create Meal Plan
              </h3>
              <p className="text-xs text-stone-500">
                Configure your personalized plant-based planning preferences
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* 1. Plan Type */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
              Plan Duration:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label
                className={`p-3.5 rounded-2xl border flex items-center gap-3 cursor-pointer transition-all ${
                  planType === "weekly"
                    ? "bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-2xs"
                    : "bg-white border-stone-200 hover:bg-stone-50 text-stone-700 font-medium"
                }`}
              >
                <input
                  type="radio"
                  name="planType"
                  value="weekly"
                  checked={planType === "weekly"}
                  onChange={() => setPlanType("weekly")}
                  className="accent-emerald-700"
                />
                <div>
                  <div className="text-sm">Weekly Plan</div>
                  <div className="text-[11px] font-normal text-stone-500">7 days (Mon - Sun)</div>
                </div>
              </label>

              <label
                className={`p-3.5 rounded-2xl border flex items-center gap-3 cursor-pointer transition-all ${
                  planType === "monthly"
                    ? "bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-2xs"
                    : "bg-white border-stone-200 hover:bg-stone-50 text-stone-700 font-medium"
                }`}
              >
                <input
                  type="radio"
                  name="planType"
                  value="monthly"
                  checked={planType === "monthly"}
                  onChange={() => setPlanType("monthly")}
                  className="accent-emerald-700"
                />
                <div>
                  <div className="text-sm">Monthly Plan</div>
                  <div className="text-[11px] font-normal text-stone-500">Full calendar view</div>
                </div>
              </label>
            </div>
          </div>

          {/* Month selector if Monthly Plan */}
          {planType === "monthly" && (
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 grid grid-cols-2 gap-3 animate-in fade-in">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Select Month:
                </label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(Number(e.target.value))}
                  className="w-full h-10 px-3 rounded-xl border border-stone-200 bg-white text-xs font-semibold text-stone-900 outline-none"
                >
                  {MONTHS.map((m, idx) => (
                    <option key={m} value={idx}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Select Year:
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="w-full h-10 px-3 rounded-xl border border-stone-200 bg-white text-xs font-semibold text-stone-900 outline-none"
                >
                  <option value={2026}>2026</option>
                  <option value={2027}>2027</option>
                </select>
              </div>
            </div>
          )}

          {/* 2. Plan For: Myself vs Someone Else */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
              Plan For:
            </label>
            <div className="flex items-center justify-between p-3.5 rounded-2xl border border-stone-200 bg-stone-50/70">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-700" />
                <span className="text-xs font-bold text-stone-900">
                  {isPlanForSomeoneElse ? `Someone Else: ${activeProfile.name}` : `Myself (${activeProfile.name})`}
                </span>
                <span className="text-[11px] text-stone-500">
                  · {activeProfile.vegetarianType.replace("_", " ")}
                </span>
              </div>

              <button
                type="button"
                onClick={onOpenSomeoneElseModal}
                className="text-xs font-bold text-emerald-800 hover:text-emerald-950 underline cursor-pointer"
              >
                {isPlanForSomeoneElse ? "Change Person" : "Plan for Someone Else"}
              </button>
            </div>
          </div>

          {/* 3. Budget Support (Requirement 24) */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
              Grocery Budget:
            </label>
            <div className="space-y-2">
              <div className="flex items-center gap-4 text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="budgetOpt"
                    checked={!hasBudgetLimit}
                    onChange={() => setHasBudgetLimit(false)}
                    className="accent-emerald-700"
                  />
                  <span>No budget limit</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="budgetOpt"
                    checked={hasBudgetLimit}
                    onChange={() => setHasBudgetLimit(true)}
                    className="accent-emerald-700"
                  />
                  <span>Set maximum budget</span>
                </label>
              </div>

              {hasBudgetLimit && (
                <div className="pt-2 animate-in fade-in">
                  <div className="relative">
                    <input
                      type="number"
                      step="50000"
                      min="100000"
                      value={budgetValue}
                      onChange={(e) => setBudgetValue(Number(e.target.value))}
                      className="w-full h-10 px-3.5 rounded-xl border border-stone-200 bg-stone-50 text-xs font-bold text-stone-900 focus:bg-white focus:border-emerald-600 outline-none"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400">
                      VND / {planType === "weekly" ? "week" : "month"}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1">
                    AI will prioritize cost-effective ingredients while keeping full nutritional targets.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 4. Prioritize Favorite Recipes */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
              Favorite Recipes Integration:
            </label>
            <label
              className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                useFavorites
                  ? "bg-rose-50/80 border-rose-300 text-rose-950 shadow-2xs"
                  : "bg-stone-50/70 border-stone-200 hover:bg-stone-100/70 text-stone-700"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    useFavorites
                      ? "bg-rose-200 text-rose-600"
                      : "bg-stone-200 text-stone-400"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${useFavorites ? "fill-rose-500" : ""}`} />
                </div>
                <div>
                  <div className="text-xs font-bold flex items-center gap-2">
                    <span>Prioritize Favorite Recipes</span>
                    {favRecipes.length > 0 && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                        {favRecipes.length} favorites ready
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-stone-500 font-normal mt-0.5">
                    {favRecipes.length > 0
                      ? "AI will prioritize incorporating your favorite dishes into your weekly/monthly schedule"
                      : "No favorite recipes yet. Click ♡ on recipes to add them to your favorites"}
                  </div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={useFavorites}
                onChange={(e) => setUseFavorites(e.target.checked)}
                className="w-4 h-4 accent-rose-600 rounded cursor-pointer ml-3 shrink-0"
              />
            </label>
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-100">
            <button
              type="button"
              onClick={onClose}
              className="h-10 px-4 rounded-xl border border-stone-200 text-stone-600 text-xs font-semibold hover:bg-stone-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-11 px-6 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              Generate {planType === "weekly" ? "Weekly" : "Monthly"} Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
