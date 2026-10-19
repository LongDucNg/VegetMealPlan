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

const ALLERGEN_LABELS: Record<string, string> = {
  peanut: "Đậu phộng",
  soy: "Đậu nành",
  dairy: "Sữa & Chế phẩm sữa",
  gluten: "Gluten (Lúa mì)",
  nuts: "Hạt cây",
  egg: "Trứng",
  sesame: "Mè / Vừng",
};

export function PlanForSomeoneElseModal({
  isOpen,
  onClose,
  currentOtherProfile,
  onApplySomeoneElse,
  onResetToMyself,
  isPlanForSomeoneElse,
}: PlanForSomeoneElseModalProps) {
  const [name, setName] = useState(currentOtherProfile?.name || "Người thân");
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
    name: name.trim() || "Khách",
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
                Lên kế hoạch cho người khác
              </h3>
              <p className="text-xs text-stone-500">
                Tạo kế hoạch ăn uống tùy chỉnh mà không ảnh hưởng đến hồ sơ chính của bạn
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
                Đang áp dụng cho: <strong>{currentOtherProfile?.name || "Người khác"}</strong>
              </span>
              <button
                type="button"
                onClick={() => {
                  onResetToMyself();
                  onClose();
                }}
                className="font-bold underline text-violet-800 hover:text-violet-950 cursor-pointer"
              >
                Chuyển lại cho Bản thân
              </button>
            </div>
          )}

          {/* Name & Age */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Họ tên / Biệt danh:
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ví dụ: Mẹ, Bạn thân, Vợ..."
                className="w-full h-10 px-3.5 rounded-xl border border-stone-200 bg-stone-50 text-sm focus:bg-white focus:border-emerald-600 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Tuổi:
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
                Giới tính:
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as Gender)}
                className="w-full h-10 px-3.5 rounded-xl border border-stone-200 bg-stone-50 text-sm focus:bg-white focus:border-emerald-600 outline-none"
              >
                <option value="female">Nữ</option>
                <option value="male">Nam</option>
                <option value="other">Khác</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Kiểu ăn chay:
              </label>
              <select
                value={vegetarianType}
                onChange={(e) => setVegetarianType(e.target.value as VegetarianType)}
                className="w-full h-10 px-3.5 rounded-xl border border-stone-200 bg-stone-50 text-sm focus:bg-white focus:border-emerald-600 outline-none"
              >
                <option value="vegan">Thuần chay (Vegan)</option>
                <option value="lacto_vegetarian">Chay có sữa (Lacto)</option>
                <option value="ovo_vegetarian">Chay có trứng (Ovo)</option>
                <option value="lacto_ovo_vegetarian">Chay có trứng & sữa (Ovo-Lacto)</option>
              </select>
            </div>
          </div>

          {/* Weight & Height */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Cân nặng (kg):
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
                Chiều cao (cm):
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
                Mức độ vận động:
              </label>
              <select
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)}
                className="w-full h-10 px-3.5 rounded-xl border border-stone-200 bg-stone-50 text-sm focus:bg-white focus:border-emerald-600 outline-none"
              >
                <option value="sedentary">Ít vận động (Ngồi nhiều)</option>
                <option value="light">Vận động nhẹ (1-3 ngày/tuần)</option>
                <option value="moderate">Vận động vừa (3-5 ngày/tuần)</option>
                <option value="active">Năng động (6-7 ngày/tuần)</option>
                <option value="very_active">Cường độ cao (Tập nặng)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Mục tiêu sức khỏe:
              </label>
              <select
                value={healthGoal}
                onChange={(e) => setHealthGoal(e.target.value as HealthGoal)}
                className="w-full h-10 px-3.5 rounded-xl border border-stone-200 bg-stone-50 text-sm focus:bg-white focus:border-emerald-600 outline-none"
              >
                <option value="lose_weight">Giảm cân (-500 kcal)</option>
                <option value="maintain_weight">Giữ cân (Cân bằng)</option>
                <option value="gain_weight">Tăng cơ / tăng cân (+350 kcal)</option>
                <option value="healthy_eating">Ăn uống lành mạnh</option>
              </select>
            </div>
          </div>

          {/* Allergens selection */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              Dị ứng cần loại trừ:
            </label>
            <div className="flex flex-wrap gap-2">
              {COMMON_ALLERGENS.map((allergy) => {
                const active = allergies.includes(allergy);
                return (
                  <button
                    key={allergy}
                    type="button"
                    onClick={() => toggleAllergy(allergy)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                      active
                        ? "bg-rose-600 text-white font-semibold shadow-2xs"
                        : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                    }`}
                  >
                    {active ? "✕ " : "+ "}
                    {ALLERGEN_LABELS[allergy] || allergy}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Calculated Nutrition Live Preview */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2 text-xs">
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-bold text-stone-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                Chỉ số dinh dưỡng tính toán cho {name || "người này"}
              </span>
              <span className="text-[11px] font-semibold text-emerald-800">Công thức Mifflin-St Jeor</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-center">
              <div>
                <p className="text-[11px] text-stone-500">BMI</p>
                <p className="font-bold text-stone-900 text-sm">{bmiInfo?.formattedBMI}</p>
                <p className="text-[10px] text-stone-400">
                  ({bmiInfo?.category === "Underweight" ? "Thiếu cân" : bmiInfo?.category === "Balanced" ? "Cân đối" : "Thừa cân"})
                </p>
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
                <p className="text-[11px] text-stone-500">Calo mục tiêu</p>
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
                Khôi phục về Bản thân
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
                Hủy
              </button>
              <button
                type="submit"
                className="h-10 px-5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                Áp dụng vào thực đơn
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
