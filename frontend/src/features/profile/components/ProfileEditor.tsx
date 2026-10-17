"use client";

import React, { useState } from "react";
import { UserProfile, Gender, ActivityLevel, HealthGoal, VegetarianType } from "../types";
import { useProfile } from "../hooks/useProfile";
import {
  ALLERGY_MASTER_LIST,
  HEALTH_GOAL_OPTIONS,
  VEGETARIAN_TYPE_OPTIONS,
  ACTIVITY_LEVEL_OPTIONS,
} from "../data/mockProfile";
import { calculateBMI } from "@/features/nutrition/utils/bmi";
import { calculateDailyNutrition } from "@/features/nutrition/utils/calorieCalculator";
import { CheckCircle2, RotateCcw, Target, Activity } from "lucide-react";

export function ProfileEditor() {
  const { profile, updateProfile, resetProfile } = useProfile();

  const [name, setName] = useState(profile.name);
  const [age, setAge] = useState<number | string>(profile.age);
  const [gender, setGender] = useState<Gender>(profile.gender);
  const [height, setHeight] = useState<number | string>(profile.height);
  const [weight, setWeight] = useState<number | string>(profile.weight);
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>(profile.activityLevel);
  const [healthGoal, setHealthGoal] = useState<HealthGoal>(profile.healthGoal);
  const [vegetarianType, setVegetarianType] = useState<VegetarianType>(profile.vegetarianType);
  const [allergies, setAllergies] = useState<string[]>(profile.allergies);

  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Hàm loại bỏ hoàn toàn số 0 đứng ở đầu khi nhập số (VD: "001" -> "1", "0170" -> "170")
  const cleanNumberInput = (raw: string) => {
    if (!raw) return "";
    if (raw === "0") return "";
    return raw.replace(/^0+(?=\d)/, "");
  };

  // Sync state when profile is fetched from server
  React.useEffect(() => {
    setName(profile.name);
    setAge(profile.age);
    setGender(profile.gender);
    setHeight(profile.height);
    setWeight(profile.weight);
    setActivityLevel(profile.activityLevel);
    setHealthGoal(profile.healthGoal);
    setVegetarianType(profile.vegetarianType);
    setAllergies(profile.allergies);
  }, [profile]);


  // Real-time live calculations based on current inputs
  const liveProfile: UserProfile = {
    ...profile,
    name,
    age: Number(age) || 22,
    gender,
    height: Number(height) || 170,
    weight: Number(weight) || 65,
    activityLevel,
    healthGoal,
    vegetarianType,
    allergies,
  };

  const bmiInfo = calculateBMI(liveProfile.weight, liveProfile.height);
  const nutrition = calculateDailyNutrition(liveProfile);

  const toggleAllergy = (allergyId: string) => {
    setAllergies((prev) =>
      prev.includes(allergyId)
        ? prev.filter((a) => a !== allergyId)
        : [...prev, allergyId]
    );
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveError(null);
    setIsSaving(true);
    try {
      await updateProfile(liveProfile);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err: any) {
      setSaveError(err?.message || "Không thể cập nhật hồ sơ");
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (window.confirm("Bạn có chắc chắn muốn đặt lại hồ sơ về thông tin mặc định?")) {
      const def = resetProfile();
      setName(def.name);
      setAge(def.age);
      setGender(def.gender);
      setHeight(def.height);
      setWeight(def.weight);
      setActivityLevel(def.activityLevel);
      setHealthGoal(def.healthGoal);
      setVegetarianType(def.vegetarianType);
      setAllergies(def.allergies);
    }
  };

  const BMI_LABEL_MAP: Record<string, string> = {
    Balanced: "Cân đối",
    Underweight: "Nhẹ cân",
    Overweight: "Thừa cân",
    Obese: "Béo phì",
  };

  const getBmiCategoryLabel = (cat?: string) => {
    if (!cat) return "Chưa đủ chỉ số";
    return BMI_LABEL_MAP[cat] || cat;
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Live Health Target Highlight */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white rounded-3xl p-6 shadow-sm relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-200">
              CHỈ SỐ TRAO ĐỔI CHẤT TÍNH TOÁN TRỰC TIẾP
            </span>
            <div className="flex flex-wrap items-baseline gap-4 mt-1">
              <div>
                <span className="text-xs text-emerald-200">BMI: </span>
                <span className="font-serif font-bold text-2xl text-white">
                  {bmiInfo ? bmiInfo.formattedBMI : "—"}
                </span>
                <span className="ml-1.5 text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-700 text-emerald-100">
                  {bmiInfo ? getBmiCategoryLabel(bmiInfo.category) : "Nhập chỉ số"}
                </span>
              </div>
              <div>
                <span className="text-xs text-emerald-200">Mục tiêu calo: </span>
                <span className="font-serif font-bold text-2xl text-amber-300">
                  ~{nutrition.dailyCalorieTarget.toLocaleString()} kcal/ngày
                </span>
              </div>
            </div>
            <p className="text-xs text-emerald-100 mt-2">
              Mục tiêu: <strong className="text-white">{nutrition.goalTitle}</strong> · Tỷ lệ dinh dưỡng:{" "}
              {nutrition.macros.proteinGrams}g Đạm ({nutrition.macros.proteinPct}%),{" "}
              {nutrition.macros.carbsGrams}g Tinh bột, {nutrition.macros.fatGrams}g Chất béo
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal & Physical Metrics */}
        <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-xs space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 border-b pb-2 flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-emerald-600" />
            1. Chỉ số thể trạng cá nhân
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Tên hiển thị
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-10 rounded-xl border border-stone-200 bg-stone-50 px-3 text-sm focus:bg-white focus:border-emerald-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Tuổi (năm) *
              </label>
              <input
                type="number"
                min="10"
                max="100"
                required
                value={age === 0 ? "" : age}
                onChange={(e) => setAge(cleanNumberInput(e.target.value))}
                className="w-full h-10 rounded-xl border border-stone-200 bg-stone-50 px-3 text-sm focus:bg-white focus:border-emerald-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Giới tính *
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as Gender)}
                className="w-full h-10 rounded-xl border border-stone-200 bg-stone-50 px-3 text-sm focus:bg-white focus:border-emerald-600 outline-none"
              >
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
                <option value="other">Khác</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Chiều cao (cm) *
              </label>
              <input
                type="number"
                min="50"
                max="250"
                required
                value={height === 0 ? "" : height}
                onChange={(e) => setHeight(cleanNumberInput(e.target.value))}
                className="w-full h-10 rounded-xl border border-stone-200 bg-stone-50 px-3 text-sm focus:bg-white focus:border-emerald-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Cân nặng (kg) *
              </label>
              <input
                type="number"
                min="20"
                max="300"
                step="any"
                required
                value={weight === 0 ? "" : weight}
                onChange={(e) => setWeight(cleanNumberInput(e.target.value))}
                className="w-full h-10 rounded-xl border border-stone-200 bg-stone-50 px-3 text-sm focus:bg-white focus:border-emerald-600 outline-none"
              />
            </div>
          </div>


          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              Mức độ vận động *
            </label>
            <div className="space-y-1.5">
              {ACTIVITY_LEVEL_OPTIONS.map((lvl) => (
                <label
                  key={lvl.id}
                  className={`flex items-start gap-2.5 p-2 rounded-xl border cursor-pointer transition-all ${
                    activityLevel === lvl.id
                      ? "border-emerald-600 bg-emerald-50/70"
                      : "border-stone-200 hover:bg-stone-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="activityLevel"
                    value={lvl.id}
                    checked={activityLevel === lvl.id}
                    onChange={() => setActivityLevel(lvl.id)}
                    className="mt-1 accent-emerald-600"
                  />
                  <div>
                    <span className="text-xs font-semibold text-stone-900">{lvl.label}</span>
                    <p className="text-[11px] text-stone-500">{lvl.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Dietary Preferences & Allergies */}
        <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-xs space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 border-b pb-2 flex items-center gap-1.5">
            <Target className="w-4 h-4 text-emerald-600" />
            2. Mục tiêu & Chế độ ăn uống
          </h3>

          {/* Health Goal */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              Mục tiêu sức khỏe *
            </label>
            <div className="grid grid-cols-2 gap-2">
              {HEALTH_GOAL_OPTIONS.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setHealthGoal(g.id)}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                    healthGoal === g.id
                      ? "border-emerald-600 bg-emerald-50 text-emerald-950 font-bold"
                      : "border-stone-200 text-stone-700 hover:bg-stone-50"
                  }`}
                >
                  <p className="font-semibold">{g.label}</p>
                  <p className="text-[10px] text-stone-500 mt-0.5">{g.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Vegetarian Type */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              Trường phái ăn chay *
            </label>
            <div className="grid grid-cols-2 gap-2">
              {VEGETARIAN_TYPE_OPTIONS.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setVegetarianType(v.id)}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                    vegetarianType === v.id
                      ? "border-emerald-600 bg-emerald-50 text-emerald-950 font-bold"
                      : "border-stone-200 text-stone-700 hover:bg-stone-50"
                  }`}
                >
                  <p className="font-semibold">{v.label}</p>
                  <p className="text-[10px] text-stone-500 mt-0.5">{v.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Allergies */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Dị ứng thực phẩm / Cần tránh *
            </label>
            <p className="text-[11px] text-stone-500 mb-2">
              Chọn các thành phần bạn bị dị ứng. Các món ăn có chứa thành phần này sẽ tự động được AI gắn cờ cảnh báo và loại trừ.
            </p>
            <div className="flex flex-wrap gap-2">
              {ALLERGY_MASTER_LIST.map((item) => {
                const isSelected = allergies.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleAllergy(item.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? "bg-amber-100 text-amber-900 border border-amber-300 ring-1 ring-amber-300 shadow-2xs"
                        : "bg-stone-100 text-stone-600 hover:bg-stone-200 border border-stone-200"
                    }`}
                  >
                    {isSelected ? `⚠ ${item.label}` : item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={handleReset}
          className="text-xs text-stone-500 hover:text-stone-800 underline underline-offset-2 flex items-center gap-1 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Đặt lại hồ sơ mẫu
        </button>

        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3">
          {saveError && (
            <span className="text-xs text-red-600 font-semibold animate-in fade-in">
              {saveError}
            </span>
          )}
          {saved && (
            <span className="flex items-center gap-1 text-xs text-emerald-700 font-bold animate-in fade-in">
              <CheckCircle2 className="w-4 h-4" />
              Đã cập nhật hồ sơ & tính toán lại dinh dưỡng!
            </span>
          )}
          <button
            type="submit"
            disabled={isSaving}
            className="h-11 px-8 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 text-white font-semibold text-sm shadow-xs transition-colors cursor-pointer flex items-center gap-2"
          >
            {isSaving ? "Đang lưu thay đổi..." : "Lưu hồ sơ & Cập nhật kế hoạch"}
          </button>
        </div>
      </div>
    </form>
  );
}
