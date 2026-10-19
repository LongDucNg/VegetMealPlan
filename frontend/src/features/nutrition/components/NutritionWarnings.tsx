"use client";

import React from "react";
import { AlertTriangle, Info } from "lucide-react";
import { NutritionWarning } from "../types";

interface NutritionWarningsProps {
  warnings?: NutritionWarning[];
  className?: string;
  title?: string;
}

const WARNING_TITLE_MAP: Record<string, string> = {
  BMI_GOAL_CONFLICT: "Xung đột mục tiêu & BMI",
  CALORIE_FLOOR_APPLIED: "Áp dụng sàn calo an toàn",
  TARGET_PACE_TOO_FAST: "Tốc độ thay đổi cân nặng quá nhanh",
  TARGET_GOAL_MISMATCH: "Mục tiêu không khớp chỉ số",
  TARGET_BMI_UNDERWEIGHT: "Cân nặng mục tiêu ở mức thiếu cân",
  TARGET_DATE_PASSED: "Thời hạn mục tiêu đã qua",
};

export function NutritionWarnings({
  warnings,
  className = "",
  title = "Cảnh báo & Lưu ý dinh dưỡng",
}: NutritionWarningsProps) {
  if (!warnings || warnings.length === 0) return null;

  return (
    <div
      className={`rounded-2xl border border-amber-200/90 bg-gradient-to-br from-amber-50/90 to-orange-50/80 p-4 sm:p-5 shadow-xs space-y-3 ${className}`}
    >
      <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
        <span>{title}</span>
        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-200/70 text-amber-900 ml-auto">
          {warnings.length} lưu ý
        </span>
      </div>

      <div className="space-y-2">
        {warnings.map((w, index) => (
          <div
            key={`${w.code}-${index}`}
            className="flex items-start gap-2.5 p-3 rounded-xl bg-white/80 border border-amber-200/60 text-xs text-amber-950 shadow-2xs"
          >
            <Info className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-semibold text-amber-900 mr-1.5">
                [{WARNING_TITLE_MAP[w.code] || w.code}]:
              </span>
              <span className="leading-relaxed">{w.message}</span>
            </div>
          </div>
        ))}
      </div>
      <p className="text-[11px] text-amber-700/80 italic pt-1">
        * Đây là khuyến nghị an toàn sức khỏe từ chuyên gia dinh dưỡng và không chặn bạn tiếp tục tạo thực đơn.
      </p>
    </div>
  );
}
