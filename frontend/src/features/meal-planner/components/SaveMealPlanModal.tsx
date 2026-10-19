"use client";

import React, { useState } from "react";
import { X, Heart, Check, CalendarDays } from "lucide-react";

interface SaveMealPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
  planType: "weekly" | "monthly";
  targetCalories: number;
  totalCost: number;
}

export function SaveMealPlanModal({
  isOpen,
  onClose,
  onSave,
  planType,
  targetCalories,
  totalCost,
}: SaveMealPlanModalProps) {
  const [name, setName] = useState(
    `${planType === "weekly" ? "Kế hoạch tuần" : "Kế hoạch tháng"} (${new Date().toLocaleDateString("vi-VN")})`
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
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
                Lưu lại thành mẫu thực đơn yêu thích để tái sử dụng
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
              placeholder="Ví dụ: Thực đơn giàu đạm tuần 1"
              className="w-full h-11 px-4 rounded-xl border border-stone-200 bg-stone-50 text-sm font-semibold text-stone-900 focus:bg-white focus:border-emerald-600 outline-none"
              autoFocus
              required
            />
          </div>

          <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 text-xs text-stone-600 space-y-1">
            <div className="flex justify-between">
              <span>Loại thực đơn:</span>
              <span className="font-bold text-stone-900">
                {planType === "weekly" ? "Thực đơn tuần (7 ngày)" : "Thực đơn tháng (30 ngày)"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Mục tiêu calo / ngày:</span>
              <span className="font-bold text-amber-700">{targetCalories} kcal</span>
            </div>
            <div className="flex justify-between">
              <span>Chi phí ước tính:</span>
              <span className="font-bold text-emerald-800">
                ~{totalCost.toLocaleString("vi-VN")} VNĐ
              </span>
            </div>
          </div>

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
              className="h-10 px-5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              Lưu thực đơn
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
