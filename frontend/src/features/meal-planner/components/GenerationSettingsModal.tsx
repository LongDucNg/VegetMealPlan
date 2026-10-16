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
  currentBudget?: number;
}

const MONTHS = [
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
];

export function GenerationSettingsModal({
  isOpen,
  onClose,
  activeProfile,
  isPlanForSomeoneElse,
  onOpenSomeoneElseModal,
  onConfirmGenerate,
  initialPlanType = "weekly",
  currentBudget,
}: GenerationSettingsModalProps) {
  const [planType, setPlanType] = useState<MealPlanType>(initialPlanType);
  const [useFavorites, setUseFavorites] = useState(false);
  const [hasBudgetLimit, setHasBudgetLimit] = useState(currentBudget !== undefined);
  const [budgetValue, setBudgetValue] = useState<number>(currentBudget ?? 500000);
  const [selectedMonth, setSelectedMonth] = useState<number>(() => new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState<number>(() => new Date().getFullYear());

  React.useEffect(() => {
    if (isOpen) {
      setPlanType(initialPlanType);
      if (currentBudget !== undefined) {
        setHasBudgetLimit(true);
        setBudgetValue(currentBudget);
      } else {
        setHasBudgetLimit(false);
      }
    }
  }, [isOpen, initialPlanType, currentBudget]);

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
                Tạo Kế Hoạch Thực Đơn
              </h3>
              <p className="text-xs text-stone-500">
                Tùy chỉnh kế hoạch thực đơn thuần chay theo nhu cầu cá nhân
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
              Thời hạn kế hoạch:
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
                  <div className="text-sm">Kế hoạch Tuần</div>
                  <div className="text-[11px] font-normal text-stone-500">7 ngày (Thứ 2 - Chủ nhật)</div>
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
                  <div className="text-sm">Kế hoạch Tháng</div>
                  <div className="text-[11px] font-normal text-stone-500">Xem toàn bộ lịch trong tháng</div>
                </div>
              </label>
            </div>
          </div>

          {/* Month selector if Monthly Plan */}
          {planType === "monthly" && (
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 grid grid-cols-2 gap-3 animate-in fade-in">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Chọn Tháng:
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
                  Chọn Năm:
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="w-full h-10 px-3 rounded-xl border border-stone-200 bg-white text-xs font-semibold text-stone-900 outline-none"
                >
                  {[new Date().getFullYear(), new Date().getFullYear() + 1].map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* 2. Plan For: Myself vs Someone Else */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
              Lên kế hoạch cho:
            </label>
            <div className="flex items-center justify-between p-3.5 rounded-2xl border border-stone-200 bg-stone-50/70">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-700" />
                <span className="text-xs font-bold text-stone-900">
                  {isPlanForSomeoneElse ? `Người khác: ${activeProfile.name}` : `Bản thân (${activeProfile.name})`}
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
                {isPlanForSomeoneElse ? "Đổi người" : "Lên kế hoạch cho người khác"}
              </button>
            </div>
          </div>

          {/* 3. Budget Support */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
              Ngân sách thực đơn:
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
                  <span>Không giới hạn ngân sách</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="budgetOpt"
                    checked={hasBudgetLimit}
                    onChange={() => setHasBudgetLimit(true)}
                    className="accent-emerald-700"
                  />
                  <span>Đặt ngân sách tối đa</span>
                </label>
              </div>

              {hasBudgetLimit && (
                <div className="pt-2 animate-in fade-in">
                  <div className="relative">
                    <input
                      type="number"
                      step="50000"
                      min="50000"
                      value={budgetValue}
                      onChange={(e) => setBudgetValue(Number(e.target.value))}
                      className="w-full h-10 px-3.5 pr-28 rounded-xl border border-stone-200 bg-stone-50 text-xs font-bold text-stone-900 focus:bg-white focus:border-emerald-600 outline-none"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-500">
                      VND / {planType === "weekly" ? "tuần" : "tháng"}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1">
                    AI sẽ tính toán chi phí nguyên liệu cho từng bữa ăn đảm bảo tổng chi phí không vượt quá mức ngân sách này.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 4. Prioritize Favorite Recipes */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
              Tích hợp món ăn yêu thích:
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
                    <span>Ưu tiên các món ăn yêu thích</span>
                    {favRecipes.length > 0 && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                        {favRecipes.length} món yêu thích sẵn sàng
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-stone-500 font-normal mt-0.5">
                    {favRecipes.length > 0
                      ? "AI sẽ ưu tiên xếp các món bạn yêu thích vào lịch ăn trong tuần/tháng"
                      : "Chưa có món yêu thích nào. Hãy nhấn biểu tượng ♡ trên các món ăn để thêm vào yêu thích"}
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
              Hủy
            </button>
            <button
              type="submit"
              className="h-11 px-6 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              Tạo thực đơn {planType === "weekly" ? "Tuần" : "Tháng"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
