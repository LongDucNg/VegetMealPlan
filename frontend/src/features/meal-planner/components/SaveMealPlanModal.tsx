"use client";

import React, { useState, useEffect } from "react";
import { X, Heart, Check, CalendarDays, AlertTriangle } from "lucide-react";
import { DayMealPlan, MealPlanType } from "../types";

interface SaveMealPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void | Promise<void>;
  planType?: MealPlanType;
  activeDay: DayMealPlan | null;
  targetCalories?: number;
  totalCost?: number;
}

export function SaveMealPlanModal({
  isOpen,
  onClose,
  onSave,
  planType = "daily",
  activeDay,
  targetCalories,
  totalCost,
}: SaveMealPlanModalProps) {
  const dayName = activeDay?.dayName || "ngày";
  const dateStr = activeDay?.dateText || new Date().toLocaleDateString("vi-VN");
  const defaultTitle = `Thực đơn ${dayName} (${dateStr})`;

  const [name, setName] = useState(defaultTitle);

  useEffect(() => {
    if (isOpen) {
      setName(
        `Thực đơn ${activeDay?.dayName || "ngày"} (${activeDay?.dateText || new Date().toLocaleDateString("vi-VN")})`
      );
    }
  }, [isOpen, activeDay]);

  if (!isOpen) return null;

  const hasPlanData = Boolean(activeDay && activeDay.totalCalories > 0);
  const dayKcal = Math.round(Number(activeDay?.totalCalories ?? targetCalories ?? 0) * 100) / 100;
  const dayCost = Math.round(Number(activeDay?.estimatedCost ?? totalCost ?? 0));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !hasPlanData) return;
    onSave(name.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
              <Heart className="w-4 h-4 fill-rose-600" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-stone-900">
                Lưu vào Thực đơn yêu thích
              </h3>
              <p className="text-xs text-stone-500">
                Lưu lại thực đơn 1 ngày đang chọn để tái sử dụng
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              Tên mẫu thực đơn:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ví dụ: Thực đơn Thứ 4 nhiều đạm"
              className="w-full h-11 px-4 rounded-xl border border-stone-200 bg-stone-50 text-sm font-semibold text-stone-900 focus:bg-white focus:border-emerald-600 outline-none"
              autoFocus
              required
            />
          </div>

          <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 text-xs text-stone-600 space-y-1.5">
            <div className="flex justify-between items-center">
              <span>Loại thực đơn:</span>
              <span className="font-bold text-emerald-900 bg-emerald-100/90 px-2.5 py-0.5 rounded-full text-[11px]">
                Thực đơn 1 ngày {activeDay?.dayName ? `(${activeDay.dayName})` : ""}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Năng lượng trong ngày:</span>
              <span className="font-bold text-amber-700">~{dayKcal} kcal</span>
            </div>
            <div className="flex justify-between">
              <span>Chi phí ước tính:</span>
              <span className="font-bold text-emerald-800">
                ~{dayCost.toLocaleString("vi-VN")} VNĐ
              </span>
            </div>
          </div>

          {!hasPlanData && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Ngày hiện tại chưa có thực đơn. Vui lòng chọn hoặc tạo thực đơn cho ngày này trước khi lưu.</span>
            </div>
          )}

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="h-10 px-4 rounded-xl border border-stone-200 text-stone-600 text-xs font-semibold hover:bg-stone-50 transition-colors cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={!hasPlanData || !name.trim()}
              className="h-10 px-5 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              Lưu thực đơn 1 ngày
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
