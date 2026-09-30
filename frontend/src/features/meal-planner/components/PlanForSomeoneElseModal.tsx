"use client";

import React, { useState } from "react";
import { X, UserPlus, Users, Sparkles, Check, RotateCcw } from "lucide-react";
import { UserProfile, Gender, ActivityLevel, HealthGoal, VegetarianType } from "@/features/profile/types";
import { calculateBMI } from "@/features/nutrition/utils/bmi";
import { calculateDailyCalorieTarget } from "@/features/nutrition/utils/calorieCalculator";

interface PlanForSomeoneElseModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentOtherProfile: UserProfile | null;
  onApplySomeoneElse: (profile: UserProfile) => void;
  onResetToMyself: () => void;
  isPlanForSomeoneElse: boolean;
}

const COMMON_ALLERGENS = ["peanut", "soy", "dairy", "gluten", "nuts", "egg", "sesame"];

export function PlanForSomeoneElseModal({
  isOpen,
  onClose,
  currentOtherProfile,
  onApplySomeoneElse,
  onResetToMyself,
  isPlanForSomeoneElse,
}: PlanForSomeoneElseModalProps) {
  const [name, setName] = useState(currentOtherProfile?.name || "Family Member");
  const [age, setAge] = useState<number>(currentOtherProfile?.age || 28);
  const [gender, setGender] = useState<Gender>(currentOtherProfile?.gender || "female");
  const [weight, setWeight] = useState<number>(currentOtherProfile?.weight || 58);
  const [height, setHeight] = useState<number>(currentOtherProfile?.height || 162);
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>(
    currentOtherProfile?.activityLevel || "moderate"
  );
  const [vegetarianType, setVegetarianType] = useState<VegetarianType>(
    currentOtherProfile?.vegetarianType || "vegan"
  );
  const [healthGoal, setHealthGoal] = useState<HealthGoal>(
    currentOtherProfile?.healthGoal || "maintain_weight"
  );
  const [allergies, setAllergies] = useState<string[]>(
    currentOtherProfile?.allergies || []
  );

  const [hasCalculated, setHasCalculated] = useState(true);

  if (!isOpen) return null;

  // Build draft profile
  const draftProfile: UserProfile = {
    id: "someone_else_target",
    name: name.trim() || "Guest",
    age: Number(age) || 25,
    gender,
    weight: Number(weight) || 60,
    height: Number(height) || 165,
    activityLevel,
    vegetarianType,
    healthGoal,
    allergies,
  };

  const bmiInfo = calculateBMI(draftProfile.weight, draftProfile.height);
  const nutrition = calculateDailyCalorieTarget(draftProfile);

  const toggleAllergy = (allergy: string) => {
    if (allergies.includes(allergy)) {
      setAllergies(allergies.filter((a) => a !== allergy));
    } else {
      setAllergies([...allergies, allergy]);
    }
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    onApplySomeoneElse(draftProfile);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-violet-100 text-violet-800 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-stone-900">
                Plan for Someone Else
              </h3>
              <p className="text-xs text-stone-500">
                Generate a custom meal plan without modifying your main profile
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

        {/* Form Body */}
        <form onSubmit={handleApply} className="p-6 overflow-y-auto space-y-5 flex-1">
          {isPlanForSomeoneElse && (
            <div className="p-3 bg-violet-50 border border-violet-200 rounded-2xl flex items-center justify-between text-xs text-violet-900">
              <span>
                Currently active: <strong>{currentOtherProfile?.name || "Someone Else"}</strong>
              </span>
              <button
                type="button"
                onClick={() => {
                  onResetToMyself();
                  onClose();
                }}
                className="font-bold underline text-violet-800 hover:text-violet-950 cursor-pointer"
              >
                Switch back to Myself
              </button>
            </div>
          )}

          {/* Name & Age */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Name / Nickname:
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Mom, Alex, Partner"
                className="w-full h-10 px-3.5 rounded-xl border border-stone-200 bg-stone-50 text-sm focus:bg-white focus:border-emerald-600 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Age:
              </label>
              <input
                type="number"
                min="10"
                max="100"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full h-10 px-3.5 rounded-xl border border-stone-200 bg-stone-50 text-sm focus:bg-white focus:border-emerald-600 outline-none"
                required
              />
            </div>
          </div>

          {/* Gender & Diet */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Gender:
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as Gender)}
                className="w-full h-10 px-3.5 rounded-xl border border-stone-200 bg-stone-50 text-sm focus:bg-white focus:border-emerald-600 outline-none"
              >
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Vegetarian Type:
              </label>
              <select
                value={vegetarianType}
                onChange={(e) => setVegetarianType(e.target.value as VegetarianType)}
                className="w-full h-10 px-3.5 rounded-xl border border-stone-200 bg-stone-50 text-sm focus:bg-white focus:border-emerald-600 outline-none"
              >
                <option value="vegan">Vegan (Strict)</option>
                <option value="lacto_vegetarian">Lacto-Vegetarian (Dairy)</option>
                <option value="ovo_vegetarian">Ovo-Vegetarian (Eggs)</option>
                <option value="lacto_ovo_vegetarian">Lacto-Ovo (Dairy + Eggs)</option>
              </select>
            </div>
          </div>

          {/* Weight & Height */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Weight (kg):
              </label>
              <input
                type="number"
                step="0.5"
                min="30"
                max="200"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full h-10 px-3.5 rounded-xl border border-stone-200 bg-stone-50 text-sm focus:bg-white focus:border-emerald-600 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Height (cm):
              </label>
              <input
                type="number"
                min="100"
                max="230"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full h-10 px-3.5 rounded-xl border border-stone-200 bg-stone-50 text-sm focus:bg-white focus:border-emerald-600 outline-none"
                required
              />
            </div>
          </div>

          {/* Activity & Goal */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Activity Level:
              </label>
              <select
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)}
                className="w-full h-10 px-3.5 rounded-xl border border-stone-200 bg-stone-50 text-sm focus:bg-white focus:border-emerald-600 outline-none"
              >
                <option value="sedentary">Sedentary (Little/no exercise)</option>
                <option value="light">Lightly Active (1-3 days/week)</option>
                <option value="moderate">Moderately Active (3-5 days/week)</option>
                <option value="active">Active (6-7 days/week)</option>
                <option value="very_active">Very Active (Intense training)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Health Goal:
              </label>
              <select
                value={healthGoal}
                onChange={(e) => setHealthGoal(e.target.value as HealthGoal)}
                className="w-full h-10 px-3.5 rounded-xl border border-stone-200 bg-stone-50 text-sm focus:bg-white focus:border-emerald-600 outline-none"
              >
                <option value="lose_weight">Lose Weight (-500 kcal)</option>
                <option value="maintain_weight">Maintain Weight (Balance)</option>
                <option value="gain_weight">Gain Muscle (+350 kcal)</option>
                <option value="healthy_eating">Healthy Eating</option>
              </select>
            </div>
          </div>

          {/* Allergens selection */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              Allergies to Exclude:
            </label>
            <div className="flex flex-wrap gap-2">
              {COMMON_ALLERGENS.map((allergy) => {
                const active = allergies.includes(allergy);
                return (
                  <button
                    key={allergy}
                    type="button"
                    onClick={() => toggleAllergy(allergy)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium capitalize transition-colors cursor-pointer ${
                      active
                        ? "bg-rose-600 text-white font-semibold shadow-2xs"
                        : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                    }`}
                  >
                    {active ? "✕ " : "+ "}
                    {allergy}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Calculated Nutrition Live Preview (Requirement 17) */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2 text-xs">
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-bold text-stone-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                Calculated Nutrition Metrics for {name || "this person"}
              </span>
              <span className="text-[11px] font-semibold text-emerald-800">Mifflin-St Jeor</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-center">
              <div>
                <p className="text-[11px] text-stone-500">BMI</p>
                <p className="font-bold text-stone-900 text-sm">{bmiInfo?.formattedBMI}</p>
                <p className="text-[10px] text-stone-400">({bmiInfo?.category})</p>
              </div>
              <div>
                <p className="text-[11px] text-stone-500">BMR</p>
                <p className="font-bold text-stone-900 text-sm">{nutrition.bmr} kcal</p>
              </div>
              <div>
                <p className="text-[11px] text-stone-500">TDEE</p>
                <p className="font-bold text-stone-900 text-sm">{nutrition.tdee} kcal</p>
              </div>
              <div>
                <p className="text-[11px] text-stone-500">Calorie Target</p>
                <p className="font-bold text-emerald-800 text-sm">{nutrition.dailyCalorieTarget} kcal</p>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-between pt-2">
            {isPlanForSomeoneElse ? (
              <button
                type="button"
                onClick={() => {
                  onResetToMyself();
                  onClose();
                }}
                className="text-xs text-stone-500 hover:text-stone-900 underline cursor-pointer"
              >
                Reset to Myself
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="h-10 px-4 rounded-xl border border-stone-200 text-stone-600 text-xs font-semibold hover:bg-stone-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="h-10 px-5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                Apply for Meal Plan
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
