"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Users,
  Sparkles,
  Check,
  RotateCcw,
  AlertTriangle,
  AlertCircle,
  Activity,
  Target,
  Plus,
  ShieldCheck,
} from "lucide-react";
import { UserProfile, Gender, ActivityLevel, HealthGoal, VegetarianType } from "@/features/profile/types";
import { calculateBMI } from "@/features/nutrition/utils/bmi";
import { calculateDailyCalorieTarget } from "@/features/nutrition/utils/calorieCalculator";
import {
  ALLERGY_MASTER_LIST,
  FOOD_ALLERGY_MASTER_LIST,
  AVOIDANCE_PREFERENCE_LIST,
  HEALTH_GOAL_OPTIONS,
  ACTIVITY_LEVEL_OPTIONS,
  VEGETARIAN_TYPE_OPTIONS,
} from "@/features/profile/data/mockProfile";
import { storage, STORAGE_KEYS } from "@/utils/storage/storage";

interface PlanForSomeoneElseModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentOtherProfile: UserProfile | null;
  onApplySomeoneElse: (profile: UserProfile) => void;
  onResetToMyself: () => void;
  isPlanForSomeoneElse: boolean;
}

export function PlanForSomeoneElseModal({
  isOpen,
  onClose,
  currentOtherProfile,
  onApplySomeoneElse,
  onResetToMyself,
  isPlanForSomeoneElse,
}: PlanForSomeoneElseModalProps) {
  // Luôn bắt đầu bằng form trắng rỗng, không chọn sẵn bất kỳ mục nào
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | string>("");
  const [gender, setGender] = useState<Gender | "">("");
  const [weight, setWeight] = useState<number | string>("");
  const [height, setHeight] = useState<number | string>("");

  const cleanNumberInput = (raw: string) => {
    if (!raw) return "";
    if (raw === "0") return "";
    return raw.replace(/^0+(?=\d)/, "");
  };

  const [activityLevel, setActivityLevel] = useState<ActivityLevel | "">("");
  const [vegetarianType, setVegetarianType] = useState<VegetarianType | "">("");
  const [healthGoal, setHealthGoal] = useState<HealthGoal | "">("");
  const [allergies, setAllergies] = useState<string[]>([]);
  const [customAllergyInput, setCustomAllergyInput] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Khi bấm nút mở modal: Luôn reset về form trắng thông tin rỗng hoàn toàn
  useEffect(() => {
    if (isOpen) {
      setName("");
      setAge("");
      setGender("");
      setWeight("");
      setHeight("");
      setActivityLevel("");
      setVegetarianType("");
      setHealthGoal("");
      setAllergies([]);
      setCustomAllergyInput("");
      setErrorMessage(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Helper check egg and dairy
  const isEggAllergyItem = (item: string) => {
    const s = item.toLowerCase().trim();
    return s === "egg" || s === "trứng" || s === "trung" || s.includes("trứng") || s.includes("trung");
  };

  const isDairyAllergyItem = (item: string) => {
    const s = item.toLowerCase().trim();
    return s === "dairy" || s === "sữa" || s === "sua" || s === "lactose" || s.includes("sữa") || s.includes("sua") || s.includes("lactose");
  };

  const hasValidMetrics = Boolean(
    Number(weight) > 0 &&
    Number(height) > 0 &&
    Number(age) > 0 &&
    gender !== "" &&
    activityLevel !== "" &&
    healthGoal !== ""
  );

  // Build draft profile
  const draftProfile: UserProfile = {
    id: "someone_else_target",
    name: name.trim() || "Người thân",
    age: Number(age) || 25,
    gender: (gender as Gender) || "female",
    weight: Number(weight) || 60,
    height: Number(height) || 165,
    activityLevel: (activityLevel as ActivityLevel) || "moderate",
    vegetarianType: (vegetarianType as VegetarianType) || "vegan",
    healthGoal: (healthGoal as HealthGoal) || "maintain_weight",
    allergies,
  };

  const bmiInfo = hasValidMetrics ? calculateBMI(Number(weight), Number(height)) : null;
  const nutrition = hasValidMetrics ? calculateDailyCalorieTarget(draftProfile) : null;

  const isUnderweight = Boolean(bmiInfo && bmiInfo.category === "Underweight");
  const isSevereUnderweight = Boolean(bmiInfo && bmiInfo.bmi < 16.5);
  const isOverweight = Boolean(bmiInfo && (bmiInfo.category === "Overweight" || bmiInfo.bmi >= 23));

  // Auto exclusion for Egg & Dairy according to Vegetarian Diet
  // Phân loại danh sách Dị ứng thực phẩm vs Thực phẩm cần tránh
  const isAvoidancePreferenceItem = (item: string) => {
    const s = item.toLowerCase().trim();
    return (
      s === "allium" ||
      s.includes("hành tỏi") ||
      s.includes("ngũ vị tân") ||
      s.includes("ngu vi tan")
    );
  };

  const foodAllergies = allergies.filter(
    (a) => !isAvoidancePreferenceItem(a) && !isEggAllergyItem(a) && !isDairyAllergyItem(a)
  );
  const avoidanceList = allergies.filter((a) => isAvoidancePreferenceItem(a));

  const isAllergyDisabledByDiet = (allergyId: string) => {
    const isEgg = isEggAllergyItem(allergyId);
    const isDairy = isDairyAllergyItem(allergyId);

    if (vegetarianType === "vegan") {
      if (isEgg) return "Thuần chay (Vegan) cảnh báo cần tránh Trứng";
      if (isDairy) return "Thuần chay (Vegan) cảnh báo cần tránh Sữa & Chế phẩm sữa";
    }
    if (vegetarianType === "lacto_vegetarian") {
      if (isEgg) return "Chay có sữa (Lacto) cảnh báo cần tránh Trứng";
      if (isDairy) return "Bạn đang chọn Chay có sữa (Lacto). Nếu dị ứng Sữa, hãy chọn Thuần chay (Vegan).";
    }
    if (vegetarianType === "ovo_vegetarian") {
      if (isDairy) return "Chay có trứng (Ovo) cảnh báo cần tránh Sữa & Chế phẩm sữa";
      if (isEgg) return "Bạn đang chọn Chay có trứng (Ovo). Nếu dị ứng Trứng, hãy chọn Thuần chay (Vegan).";
    }
    return null;
  };

  const handleSelectDiet = (type: VegetarianType | "") => {
    setVegetarianType(type);
    if (type === "vegan" || type === "lacto_vegetarian" || type === "ovo_vegetarian") {
      setAllergies((prev) => prev.filter((a) => !isEggAllergyItem(a) && !isDairyAllergyItem(a)));
    }
  };

  const toggleAllergy = (allergyId: string) => {
    const conflict = isAllergyDisabledByDiet(allergyId);
    if (conflict) {
      setErrorMessage(conflict);
      return;
    }
    setErrorMessage(null);
    if (allergies.includes(allergyId)) {
      setAllergies(allergies.filter((a) => a !== allergyId));
    } else {
      setAllergies([...allergies, allergyId]);
    }
  };

  const handleAddCustomAllergy = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = customAllergyInput.trim();
    if (!trimmed) return;
    if (allergies.some((a) => a.toLowerCase() === trimmed.toLowerCase())) {
      setCustomAllergyInput("");
      return;
    }
    setAllergies([...allergies, trimmed]);
    setCustomAllergyInput("");
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage("Vui lòng nhập họ tên hoặc biệt danh người được tạo giùm.");
      return;
    }
    if (!age || Number(age) < 10 || Number(age) > 120) {
      setErrorMessage("Vui lòng nhập độ tuổi hợp lệ (10 - 120).");
      return;
    }
    if (!gender) {
      setErrorMessage("Vui lòng chọn giới tính.");
      return;
    }
    if (!vegetarianType) {
      setErrorMessage("Vui lòng chọn trường phái ăn chay.");
      return;
    }
    if (!weight || Number(weight) < 20 || Number(weight) > 300) {
      setErrorMessage("Vui lòng nhập cân nặng hợp lệ (20 - 300 kg).");
      return;
    }
    if (!height || Number(height) < 50 || Number(height) > 250) {
      setErrorMessage("Vui lòng nhập chiều cao hợp lệ (50 - 250 cm).");
      return;
    }
    if (!activityLevel) {
      setErrorMessage("Vui lòng chọn mức độ vận động.");
      return;
    }
    if (!healthGoal) {
      setErrorMessage("Vui lòng chọn mục tiêu sức khỏe.");
      return;
    }

    // Save persistence
    storage.setItem(STORAGE_KEYS.SOMEONE_ELSE_PROFILE, draftProfile);
    onApplySomeoneElse(draftProfile);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-stone-200 my-8 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-violet-100 text-violet-700 flex items-center justify-center shadow-xs">
              <Users className="w-5 h-5" />
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
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-800 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleApply} className="space-y-6 pt-4 overflow-y-auto pr-1 flex-1">
          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* 1. Basic Info */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 border-b pb-1.5 mb-3">
              1. Thông tin cơ bản
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Họ tên / Biệt danh *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="VD: Người thân, Mẹ, Bạn thân..."
                  className="w-full text-xs rounded-xl border border-stone-200 p-2.5 focus:border-violet-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Tuổi (10 - 120) *
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(cleanNumberInput(e.target.value))}
                  min={10}
                  max={120}
                  placeholder="VD: 28"
                  className="w-full text-xs rounded-xl border border-stone-200 p-2.5 focus:border-violet-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Giới tính *
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as Gender)}
                  className="w-full text-xs rounded-xl border border-stone-200 p-2.5 focus:border-violet-500 focus:outline-none bg-white cursor-pointer"
                  required
                >
                  <option value="">-- Chọn giới tính --</option>
                  <option value="female">Nữ</option>
                  <option value="male">Nam</option>
                  <option value="other">Khác</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Trường phái ăn chay *
                </label>
                <select
                  value={vegetarianType}
                  onChange={(e) => handleSelectDiet(e.target.value as VegetarianType)}
                  className="w-full text-xs rounded-xl border border-stone-200 p-2.5 focus:border-violet-500 focus:outline-none bg-white cursor-pointer"
                  required
                >
                  <option value="">-- Chọn trường phái ăn chay --</option>
                  {VEGETARIAN_TYPE_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Cân nặng (kg) *
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(cleanNumberInput(e.target.value))}
                  min={20}
                  max={300}
                  placeholder="VD: 55"
                  className="w-full text-xs rounded-xl border border-stone-200 p-2.5 focus:border-violet-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Chiều cao (cm) *
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(cleanNumberInput(e.target.value))}
                  min={50}
                  max={250}
                  placeholder="VD: 165"
                  className="w-full text-xs rounded-xl border border-stone-200 p-2.5 focus:border-violet-500 focus:outline-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* 2. Activity Level */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 border-b pb-1.5 mb-2.5 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-violet-600" />
              2. Mức độ vận động *
            </h4>
            <div className="space-y-1.5">
              {ACTIVITY_LEVEL_OPTIONS.map((opt) => {
                const isSelected = activityLevel === opt.id;
                return (
                  <label
                    key={opt.id}
                    onClick={() => setActivityLevel(opt.id as ActivityLevel)}
                    className={`flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer text-xs transition-all ${isSelected
                      ? "border-violet-500 bg-violet-50 text-violet-950 font-medium"
                      : "border-stone-200 hover:bg-stone-50 text-stone-700"
                      }`}
                  >
                    <input
                      type="radio"
                      name="someone_activity"
                      checked={isSelected}
                      onChange={() => setActivityLevel(opt.id as ActivityLevel)}
                      className="mt-0.5 text-violet-600 focus:ring-violet-500"
                    />
                    <div>
                      <span className="font-semibold">{opt.label}</span>
                      <p className="text-[10px] text-stone-500">{opt.desc}</p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* 3. Health Goals & Live BMI Warnings */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 border-b pb-1.5 mb-2.5 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-violet-600" />
              3. Mục tiêu sức khỏe & Cảnh báo dinh dưỡng BMI
            </h4>

            {/* Health Goal Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
              {HEALTH_GOAL_OPTIONS.map((g) => {
                const isLoseWeight = g.id === "lose_weight";
                const isGainWeight = g.id === "gain_weight";
                const isMaintainWeight = g.id === "maintain_weight";
                const isSelected = healthGoal === g.id;

                let badge = null;
                let cardStyle = "border-stone-200 text-stone-700 hover:bg-stone-50";

                if (isSelected) {
                  if (isLoseWeight && isSevereUnderweight) {
                    cardStyle = "border-red-500 bg-red-50 text-red-950 font-bold";
                    badge = (
                      <span className="text-[10px] font-bold text-red-600 bg-red-100 px-1.5 py-0.5 rounded shrink-0">
                        Nguy hiểm
                      </span>
                    );
                  } else if (isLoseWeight && isUnderweight) {
                    cardStyle = "border-amber-500 bg-amber-50 text-amber-950 font-bold";
                    badge = (
                      <span className="text-[10px] font-semibold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded shrink-0">
                        Không khuyên dùng
                      </span>
                    );
                  } else if (isGainWeight && isOverweight) {
                    cardStyle = "border-amber-500 bg-amber-50 text-amber-950 font-bold";
                    badge = (
                      <span className="text-[10px] font-semibold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded shrink-0">
                        Không phù hợp
                      </span>
                    );
                  } else if (isMaintainWeight && isSevereUnderweight) {
                    cardStyle = "border-red-500 bg-red-50 text-red-950 font-bold";
                    badge = (
                      <span className="text-[10px] font-bold text-red-600 bg-red-100 px-1.5 py-0.5 rounded shrink-0">
                        Không an toàn
                      </span>
                    );
                  } else if (isMaintainWeight && isUnderweight) {
                    cardStyle = "border-amber-500 bg-amber-50 text-amber-950 font-bold";
                    badge = (
                      <span className="text-[10px] font-semibold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded shrink-0">
                        Không phù hợp
                      </span>
                    );
                  } else if (isMaintainWeight && isOverweight) {
                    cardStyle = "border-amber-500 bg-amber-50 text-amber-950 font-bold";
                    badge = (
                      <span className="text-[10px] font-semibold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded shrink-0">
                        Không phù hợp
                      </span>
                    );
                  } else {
                    cardStyle = "border-violet-600 bg-violet-50 text-violet-950 font-bold";
                    if (isGainWeight && isUnderweight) {
                      badge = (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded shrink-0">
                          Khuyên dùng
                        </span>
                      );
                    } else if (isLoseWeight && isOverweight) {
                      badge = (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded shrink-0">
                          Khuyên dùng
                        </span>
                      );
                    }
                  }
                }

                return (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setHealthGoal(g.id as HealthGoal)}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer relative ${cardStyle}`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <p className="font-semibold">{g.label}</p>
                      {badge}
                    </div>
                    <p className="text-[10px] text-stone-500 mt-0.5">{g.desc}</p>
                  </button>
                );
              })}
            </div>

            {/* BMI Warning Messages */}
            {bmiInfo && (() => {
              // 1. Thiếu cân nghiêm trọng + Giảm cân
              if (isSevereUnderweight && healthGoal === "lose_weight") {
                return (
                  <div className="p-3.5 rounded-2xl bg-red-50 border border-red-300 text-red-950 space-y-1.5 animate-in fade-in">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <div className="text-xs space-y-1">
                        <strong className="text-red-900 block">
                          Báo động sức khỏe: Thể trạng thiếu cân nghiêm trọng (BMI {bmiInfo.formattedBMI} &lt; 16.5)
                        </strong>
                        <p className="text-[11px] text-red-800 leading-relaxed">
                          Chỉ số BMI hiện tại là <strong>{bmiInfo.formattedBMI}</strong>. Việc thâm hụt calo để Giảm cân lúc này sẽ gây suy kiệt cơ bắp và rối loạn trao đổi chất.
                        </p>
                      </div>
                    </div>
                  </div>
                );
              }

              // 2. Thiếu cân + Giảm cân
              if (isUnderweight && healthGoal === "lose_weight") {
                return (
                  <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 space-y-1.5 animate-in fade-in">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div className="text-xs space-y-1">
                        <strong className="text-amber-900 block">
                          Cảnh báo dinh dưỡng: Đang thiếu cân nhưng chọn Giảm cân
                        </strong>
                        <p className="text-[11px] text-amber-800 leading-relaxed">
                          Chỉ số BMI hiện tại là <strong>{bmiInfo.formattedBMI}</strong> (Thiếu cân). Thâm hụt calo trong lúc thiếu cân có thể gây mệt mỏi và suy nhược. Khuyến nghị nên chọn mục tiêu <strong>Tăng cơ / Tăng cân</strong>.
                        </p>
                        <button
                          type="button"
                          onClick={() => setHealthGoal("gain_weight")}
                          className="mt-1 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold cursor-pointer"
                        >
                          Chuyển sang: Tăng cơ / Tăng cân
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }

              // 3. Thiếu cân nghiêm trọng + Duy trì vóc dáng
              if (isSevereUnderweight && healthGoal === "maintain_weight") {
                return (
                  <div className="p-3.5 rounded-2xl bg-red-50 border border-red-300 text-red-950 space-y-1.5 animate-in fade-in">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <div className="text-xs space-y-1">
                        <strong className="text-red-900 block">
                          Cảnh báo sức khỏe: Quá nhẹ cân (BMI {bmiInfo.formattedBMI} &lt; 16.5) không nên chọn Duy trì vóc dáng
                        </strong>
                        <p className="text-[11px] text-red-800 leading-relaxed">
                          Cơ thể đang trong tình trạng suy kiệt dinh dưỡng. Việc chọn Duy trì vóc dáng ở mức này là không an toàn. Hãy chuyển sang mục tiêu <strong>Tăng cơ / Tăng cân</strong>.
                        </p>
                        <button
                          type="button"
                          onClick={() => setHealthGoal("gain_weight")}
                          className="mt-1 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold cursor-pointer"
                        >
                          Chuyển sang: Tăng cơ / Tăng cân
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }

              // 4. Thiếu cân + Duy trì vóc dáng
              if (isUnderweight && healthGoal === "maintain_weight") {
                return (
                  <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 space-y-1.5 animate-in fade-in">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div className="text-xs space-y-1">
                        <strong className="text-amber-900 block">
                          Cảnh báo dinh dưỡng: Thể trạng nhẹ cân nhưng chọn Duy trì vóc dáng
                        </strong>
                        <p className="text-[11px] text-amber-800 leading-relaxed">
                          Chỉ số BMI hiện tại là <strong>{bmiInfo.formattedBMI}</strong> (dưới mức chuẩn 18.5). Khuyến nghị chuyển sang <strong>Tăng cơ / Tăng cân</strong> để đạt thể trạng cân đối trước.
                        </p>
                        <button
                          type="button"
                          onClick={() => setHealthGoal("gain_weight")}
                          className="mt-1 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold cursor-pointer"
                        >
                          Chuyển sang: Tăng cơ / Tăng cân
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }

              // 5. Thừa cân + Tăng cân
              if (isOverweight && healthGoal === "gain_weight") {
                return (
                  <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 space-y-1.5 animate-in fade-in">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div className="text-xs space-y-1">
                        <strong className="text-amber-900 block">
                          Cảnh báo dinh dưỡng: Thể trạng thừa cân nhưng chọn Tăng cân
                        </strong>
                        <p className="text-[11px] text-amber-800 leading-relaxed">
                          Chỉ số BMI hiện tại là <strong>{bmiInfo.formattedBMI}</strong> (Thừa cân / Béo phì). Nạp calo thặng dư lúc này có thể làm tăng mỡ nội tạng và áp lực lên tim mạch.
                        </p>
                        <button
                          type="button"
                          onClick={() => setHealthGoal("lose_weight")}
                          className="mt-1 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold cursor-pointer"
                        >
                          Chuyển sang: Giảm cân lành mạnh
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }

              // 6. Thừa cân + Duy trì vóc dáng
              if (isOverweight && healthGoal === "maintain_weight") {
                return (
                  <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 space-y-1.5 animate-in fade-in">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div className="text-xs space-y-1">
                        <strong className="text-amber-900 block">
                          Cảnh báo dinh dưỡng: Thể trạng thừa cân nhưng chọn Duy trì vóc dáng
                        </strong>
                        <p className="text-[11px] text-amber-800 leading-relaxed">
                          Chỉ số BMI hiện tại là <strong>{bmiInfo.formattedBMI}</strong> (Thừa cân / Béo phì). Việc duy trì mức cân nặng này có thể giữ áp lực lên xương khớp. Khuyến nghị chọn mục tiêu <strong>Giảm cân lành mạnh</strong> để đưa BMI về ngưỡng an toàn (18.5 - 22.9).
                        </p>
                        <button
                          type="button"
                          onClick={() => setHealthGoal("lose_weight")}
                          className="mt-1 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold cursor-pointer"
                        >
                          Chuyển sang: Giảm cân lành mạnh
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }

              return null;
            })()}
          </div>

          {/* 4. Dị ứng thực phẩm & Thực phẩm cần tránh */}
          <div className="space-y-4">
            {/* Mục A: Dị ứng thực phẩm */}
            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              <div className="flex items-center justify-between border-b border-stone-200 pb-1.5">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    4. Dị ứng thực phẩm
                  </h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Chọn nhóm dị ứng có sẵn hoặc nhập tự do nguyên liệu để hệ thống loại trừ.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setAllergies((prev) => prev.filter(isAvoidancePreferenceItem))}
                  className={`text-[11px] font-semibold transition-colors ${foodAllergies.length > 0
                    ? "text-violet-700 hover:text-violet-900 underline cursor-pointer"
                    : "text-stone-400 cursor-default"
                    }`}
                  title={foodAllergies.length > 0 ? "Bỏ chọn tất cả dị ứng thực phẩm" : "Chưa chọn dị ứng nào"}
                >
                  Tôi không dị ứng gì
                </button>
              </div>

              {/* VÙNG CÁC PHẦN ĐƯỢC CHỌN - ĐẶT Ở TRÊN HÀNG ĐẦU */}
              <div className="p-2.5 rounded-xl bg-white border border-stone-200 space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-stone-700 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                    Dị ứng đã chọn ({foodAllergies.length}):
                  </span>
                  {foodAllergies.length > 0 && (
                    <span className="text-[10px] text-stone-400">Nhấn × để gỡ</span>
                  )}
                </div>

                {foodAllergies.length === 0 ? (
                  <p className="text-[11px] text-stone-400 italic">
                    Chưa chọn dị ứng nào (Hệ thống không loại trừ món vì lý do dị ứng)
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {foodAllergies.map((a) => (
                      <span
                        key={a}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-950 border border-amber-300 shadow-2xs"
                      >
                        <span>⚠ {ALLERGY_MASTER_LIST.find((m) => m.id === a)?.label || a}</span>
                        <button
                          type="button"
                          onClick={() => setAllergies(allergies.filter((x) => x !== a))}
                          className="hover:text-red-700 font-bold cursor-pointer transition-colors"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Nhóm dị ứng phổ biến (gồm cả nguyên liệu tự thêm như Nấm rơm) */}
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-stone-600">Nhóm dị ứng phổ biến:</span>
                <div className="flex flex-wrap gap-1.5">
                  {/* Nhóm chuẩn */}
                  {FOOD_ALLERGY_MASTER_LIST.map((item) => {
                    const isSelected = foodAllergies.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => toggleAllergy(item.id)}
                        className={`px-2.5 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer flex items-center gap-1 ${isSelected
                            ? "bg-amber-100 border-amber-400 text-amber-950 font-bold shadow-2xs"
                            : "bg-white border-stone-200 text-stone-700 hover:bg-stone-100"
                          }`}
                      >
                        {isSelected ? `✓ ${item.label}` : `+ ${item.label}`}
                      </button>
                    );
                  })}

                  {/* Nguyên liệu tự do do người dùng thêm */}
                  {foodAllergies
                    .filter((a) => !FOOD_ALLERGY_MASTER_LIST.some((m) => m.id === a))
                    .map((customItem) => (
                      <button
                        key={customItem}
                        type="button"
                        onClick={() => setAllergies(allergies.filter((x) => x !== customItem))}
                        className="px-2.5 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer flex items-center gap-1.5 bg-amber-100 border-amber-400 text-amber-950 font-bold shadow-2xs animate-in fade-in"
                      >
                        <span>✓ {ALLERGY_MASTER_LIST.find((m) => m.id === customItem)?.label || customItem}</span>
                        <span className="hover:text-red-700 font-bold">×</span>
                      </button>
                    ))}
                </div>
              </div>

              {/* Nhập nguyên liệu dị ứng tự do - thêm là xuất hiện ngay lên trên phần được chọn */}
              <div className="space-y-1 pt-1 border-t border-stone-200">
                <span className="text-[11px] font-semibold text-stone-600">Thêm nguyên liệu dị ứng khác:</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customAllergyInput}
                    onChange={(e) => setCustomAllergyInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddCustomAllergy();
                      }
                    }}
                    placeholder="Nhập tên nguyên liệu dị ứng khác (VD: Muối tiêu, Cà chua, Nấm rơm...)"
                    className="flex-1 text-xs rounded-xl border border-stone-200 p-2.5 bg-white focus:border-violet-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomAllergy}
                    className="px-3.5 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-black cursor-pointer flex items-center gap-1 shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Thêm vào dị ứng
                  </button>
                </div>
              </div>
            </div>

            {/* Mục B: Thực phẩm cần tránh / Kiêng kỵ */}
            <div className="p-3.5 rounded-2xl bg-white border border-stone-200 space-y-3">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  5. Thực phẩm cần tránh / Kiêng kỵ
                </h4>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  Cảnh báo theo trường phái ăn chay hoặc kiêng kỵ theo tín ngưỡng cá nhân.
                </p>
              </div>

              {/* Khối cảnh báo theo trường phái */}
              <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-950">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span>
                    {vegetarianType
                      ? `Cảnh báo cần tránh theo trường phái (${VEGETARIAN_TYPE_OPTIONS.find(v => v.id === vegetarianType)?.label || "ăn chay"}):`
                      : "Cảnh báo cần tránh theo trường phái:"}
                  </span>
                </div>

                {!vegetarianType && (
                  <p className="text-xs text-stone-500 italic py-1">
                    Vui lòng chọn trường phái ăn chay ở Mục 1 để xem cảnh báo thành phần phù hợp.
                  </p>
                )}

                {vegetarianType === "vegan" && (
                  <div className="flex flex-wrap gap-2 pt-0.5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-950 border border-amber-300 shadow-2xs">
                      <span>⚠️ Sữa &amp; Chế phẩm sữa (Lactose)</span>
                      <span className="text-[10px] bg-amber-200 text-amber-900 px-1 py-0.2 rounded font-bold">Cảnh báo</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-950 border border-amber-300 shadow-2xs">
                      <span>⚠️ Trứng (Trứng gà / vịt)</span>
                      <span className="text-[10px] bg-amber-200 text-amber-900 px-1 py-0.2 rounded font-bold">Cảnh báo</span>
                    </span>
                  </div>
                )}

                {vegetarianType === "lacto_vegetarian" && (
                  <div className="flex flex-wrap gap-2 pt-0.5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-950 border border-amber-300 shadow-2xs">
                      <span>⚠️ Trứng (Trứng gà / vịt)</span>
                      <span className="text-[10px] bg-amber-200 text-amber-900 px-1 py-0.2 rounded font-bold">Cảnh báo</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs text-stone-700 bg-stone-100 border border-stone-200">
                      X Sữa &amp; chế phẩm từ sữa: Dùng được
                    </span>
                  </div>
                )}

                {vegetarianType === "ovo_vegetarian" && (
                  <div className="flex flex-wrap gap-2 pt-0.5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-950 border border-amber-300 shadow-2xs">
                      <span>⚠️ Sữa &amp; Chế phẩm sữa (Lactose)</span>
                      <span className="text-[10px] bg-amber-200 text-amber-900 px-1 py-0.2 rounded font-bold">Cảnh báo</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs text-stone-700 bg-stone-100 border border-stone-200">
                      ✓ Trứng gà / vịt: Dùng được
                    </span>
                  </div>
                )}

                {vegetarianType === "lacto_ovo_vegetarian" && (
                  <p className="text-xs text-stone-600">
                    X Chế độ này dùng được cả Trứng và Sữa (không có thành phần cảnh báo cần tránh theo trường phái).
                  </p>
                )}
              </div>

              {/* Nhóm kiêng kỵ bổ sung */}

            </div>
          </div>

          {/* 5. Live Nutrition Calculation Preview */}
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4">
            <div className="flex items-center justify-between border-b pb-2 mb-3">
              <span className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-violet-600" />
                Chỉ số tính toán cho {draftProfile.name}
              </span>
              <span className="text-[10px] text-stone-400 font-medium">Công thức Mifflin-St Jeor</span>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="bg-white p-2.5 rounded-xl border border-stone-100">
                <span className="text-[10px] text-stone-400 font-bold block">BMI</span>
                <span className="text-sm font-bold text-stone-900">{bmiInfo?.formattedBMI || "--"}</span>
                <span className="text-[9px] text-stone-500 block truncate">{bmiInfo?.category || "Chờ dữ liệu"}</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-stone-100">
                <span className="text-[10px] text-stone-400 font-bold block">BMR</span>
                <span className="text-xs font-bold text-stone-900">{nutrition ? `~${nutrition.bmr}` : "--"}</span>
                <span className="text-[9px] text-stone-500 block">kcal</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-stone-100">
                <span className="text-[10px] text-stone-400 font-bold block">TDEE</span>
                <span className="text-xs font-bold text-stone-900">{nutrition ? `~${nutrition.tdee}` : "--"}</span>
                <span className="text-[9px] text-stone-500 block">kcal</span>
              </div>
              <div className="bg-violet-100/70 p-2.5 rounded-xl border border-violet-200">
                <span className="text-[10px] text-violet-700 font-bold block">Mục tiêu</span>
                <span className="text-sm font-bold text-violet-950">{nutrition ? `~${nutrition.dailyCalorieTarget}` : "--"}</span>
                <span className="text-[9px] text-violet-700 font-semibold block">kcal/ngày</span>
              </div>
            </div>

            <div className="mt-2.5 text-center text-[10px] text-stone-500">
              {nutrition
                ? `Phân bổ dinh dưỡng: ${nutrition.macros.proteinGrams}g Đạm · ${nutrition.macros.carbsGrams}g Tinh bột · ${nutrition.macros.fatGrams}g Chất béo`
                : "Vui lòng hoàn thành các thông tin ở trên (tuổi, giới tính, chiều cao, cân nặng, vận động, mục tiêu) để tính toán chỉ số dinh dưỡng."}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-3 border-t shrink-0">
            {isPlanForSomeoneElse ? (
              <button
                type="button"
                onClick={() => {
                  storage.removeItem(STORAGE_KEYS.SOMEONE_ELSE_PROFILE);
                  onResetToMyself();
                  onClose();
                }}
                className="text-xs text-stone-500 hover:text-stone-800 underline flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Quay lại hồ sơ của tôi
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 text-xs font-semibold cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
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
