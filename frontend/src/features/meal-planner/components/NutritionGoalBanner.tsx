"use client";

import React from "react";
import { Target, Flame, Activity, Sparkles, AlertCircle, ArrowRight } from "lucide-react";
import { CalorieCalculationResult } from "@/features/nutrition/utils/calorieCalculator";
import { UserProfile } from "@/features/profile/types";

interface NutritionGoalBannerProps {
  nutrition: CalorieCalculationResult;
  profile: UserProfile;
  onCompleteProfile?: () => void;
}

export function NutritionGoalBanner({
  nutrition,
  profile,
  onCompleteProfile,
}: NutritionGoalBannerProps) {
  const {
    bmiInfo,
    bmiStatus,
    dailyCalorieTarget,
    goalTitle,
    recommendedApproach,
    suggestions,
    isProfileComplete,
  } = nutrition;

  // Incomplete profile state (Requirement 12)
  if (!isProfileComplete || !bmiInfo) {
    return (
      <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 rounded-3xl p-6 sm:p-7 text-white shadow-md relative overflow-hidden mb-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-700/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3 max-w-xl">
            <div className="p-2.5 rounded-2xl bg-amber-400 text-amber-950 shrink-0 mt-0.5">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-200 block mb-1">
                Your Nutrition Goal
              </span>
              <h3 className="font-serif font-bold text-xl text-white">
                Complete your profile to generate a personalized meal plan.
              </h3>
              <p className="text-xs text-emerald-200 mt-1 leading-relaxed">
                We need your height, weight, and age to accurately calculate your Body Mass Index (BMI), Mifflin-St Jeor metabolic rate (BMR), and personalized daily calorie target.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onCompleteProfile}
            className="h-11 px-6 rounded-2xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold text-xs shadow-sm transition-all flex items-center gap-2 cursor-pointer shrink-0"
          >
            <span>Complete Profile</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 rounded-3xl p-6 sm:p-7 text-white shadow-md relative overflow-hidden mb-6">
      {/* Decorative ambient elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-700/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 space-y-4">
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-700/60 pb-4">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-amber-400 text-amber-950">
              <Target className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
              Your Nutrition Goal
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-emerald-200">Profile:</span>
            <span className="font-semibold text-white">
              {profile.weight} kg · {profile.height} cm · {profile.age} yrs
            </span>
            <span className="text-emerald-300 font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-800/80 border border-emerald-600/60 text-[10px]">
              {profile.vegetarianType ? profile.vegetarianType.replace("_", " ") : "Vegan"}
            </span>
            {profile.allergies && profile.allergies.length > 0 && (
              <span className="text-amber-200 font-medium px-2 py-0.5 rounded-full bg-amber-950/60 border border-amber-600/40 text-[10px]">
                Allergies: {profile.allergies.join(", ")}
              </span>
            )}
          </div>
        </div>

        {/* Main metrics grid (Requirement 11) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          {/* 1. Body Mass Index (BMI) */}
          <div className="bg-emerald-950/40 border border-emerald-700/40 rounded-2xl p-4 flex flex-col justify-between">
            <div>
              <p className="text-xs text-emerald-300 mb-1.5 flex items-center gap-1.5 font-medium">
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                Body Mass Index (BMI)
              </p>
              <div className="flex items-baseline gap-2.5">
                <span className="font-serif font-bold text-3xl text-white">
                  {bmiInfo.formattedBMI}
                </span>
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-full border shadow-2xs ${
                    bmiStatus === "Underweight"
                      ? "bg-amber-400/20 text-amber-300 border-amber-400/40"
                      : bmiStatus === "Balanced"
                      ? "bg-emerald-500/20 text-emerald-200 border-emerald-400/40"
                      : "bg-orange-500/20 text-orange-200 border-orange-400/40"
                  }`}
                >
                  {bmiStatus}
                </span>
              </div>
            </div>
            <p className="text-[11px] text-emerald-200/80 mt-2 leading-snug">
              Healthy weight range: {bmiInfo.healthyWeightRange.min} - {bmiInfo.healthyWeightRange.max} kg
            </p>
          </div>

          {/* 2. Daily Calorie Target (Requirement 3) */}
          <div className="bg-emerald-950/40 border border-emerald-700/40 rounded-2xl p-4 flex flex-col justify-between">
            <div>
              <p className="text-xs text-emerald-300 mb-1.5 flex items-center gap-1.5 font-medium">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                Daily Calorie Target
              </p>
              <div className="flex items-baseline gap-2">
                <span className="font-serif font-bold text-3xl text-amber-300">
                  ~{dailyCalorieTarget.toLocaleString()}
                </span>
                <span className="text-xs text-emerald-200">kcal/day</span>
              </div>
            </div>
            <p className="text-[11px] text-emerald-200/80 mt-2 leading-snug">
              BMR: {nutrition.bmr.toLocaleString()} kcal · TDEE: {nutrition.tdee.toLocaleString()} kcal
            </p>
          </div>

          {/* 3. Recommended Goal (Requirement 2 & 11) */}
          <div className="bg-emerald-950/40 border border-emerald-700/40 rounded-2xl p-4 flex flex-col justify-between">
            <div>
              <p className="text-xs text-emerald-300 mb-1.5 flex items-center gap-1.5 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Recommended Goal
              </p>
              <p className="font-serif font-bold text-lg text-white leading-snug">
                {goalTitle}
              </p>
            </div>
            <ul className="text-[11px] text-emerald-200/90 mt-2 space-y-0.5">
              {suggestions.slice(0, 2).map((s, idx) => (
                <li key={idx} className="flex items-start gap-1">
                  <span className="text-amber-400">•</span>
                  <span className="truncate">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Dynamic Approach info footnote (Requirement 2 & 11) */}
        <div className="pt-2 border-t border-emerald-800/80 flex flex-wrap items-center gap-2 text-xs text-emerald-100">
          <span className="font-bold text-amber-300">Approach:</span>
          <span>{recommendedApproach}</span>
        </div>
      </div>
    </div>
  );
}

