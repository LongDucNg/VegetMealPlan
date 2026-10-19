"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Calculator, Target, Calendar, Flame, CheckCircle, Sparkles } from "lucide-react";
import { CalorieExplanationStep, TargetGoalSummary } from "../types";

interface CalorieExplanationSectionProps {
  explanation?: CalorieExplanationStep[];
  targetGoal?: TargetGoalSummary | null;
  targetCalories?: number;
}

export function CalorieExplanationSection({
  explanation,
  targetGoal,
  targetCalories,
}: CalorieExplanationSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const hasExplanation = explanation && explanation.length > 0;

  return (
    <div className="space-y-4">
      {/* Target Goal Summary Card if present */}
      {targetGoal && (
        <div className="rounded-2xl bg-gradient-to-r from-emerald-900 to-teal-900 text-white p-5 shadow-sm border border-emerald-700/50">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-700/60 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-300">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                  MỤC TIÊU CÂN NẶNG & TIẾN ĐỘ
                </span>
                <h4 className="text-base font-bold text-white">
                  Đạt {targetGoal.target_weight_kg} kg vào ngày {targetGoal.target_date}
                </h4>
              </div>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-800/80 border border-emerald-600 text-emerald-200">
              BMI dự kiến: {targetGoal.target_bmi}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
            <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-xs">
              <span className="text-[11px] text-emerald-200 block">Mức thay đổi</span>
              <span className="text-base font-bold text-amber-300">
                {targetGoal.change_kg > 0 ? `+${targetGoal.change_kg}` : targetGoal.change_kg} kg
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-xs">
              <span className="text-[11px] text-emerald-200 block">Thời gian còn lại</span>
              <span className="text-base font-bold text-white">
                {targetGoal.weeks_left} tuần
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-xs">
              <span className="text-[11px] text-emerald-200 block">Tốc độ điều chỉnh</span>
              <span className="text-base font-bold text-white">
                {targetGoal.weekly_change_kg} kg/tuần
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-xs">
              <span className="text-[11px] text-emerald-200 block">Calo khuyến nghị</span>
              <span className="text-base font-bold text-emerald-300">
                {targetCalories ? `${targetCalories.toLocaleString()} kcal` : "Theo mục tiêu"}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Accordion: Chi tiết các bước tính Kcal */}
      {hasExplanation && (
        <div className="rounded-2xl border border-stone-200 bg-white overflow-hidden shadow-2xs">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-stone-50 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Calculator className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800">
                  Minh bạch công thức tính Kcal
                </h4>
                <p className="text-[11px] text-stone-500">
                  Xem chi tiết {explanation.length} bước tính toán năng lượng chuẩn y khoa
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
              <span>{isOpen ? "Thu gọn" : "Xem chi tiết"}</span>
              {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>

          {isOpen && (
            <div className="p-4 pt-1 border-t border-stone-100 space-y-3 bg-stone-50/40">
              {explanation.map((item) => (
                <div
                  key={item.step}
                  className="p-3.5 rounded-xl bg-white border border-stone-200/80 shadow-2xs space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center justify-center">
                        {item.step}
                      </span>
                      Công thức bước {item.step}
                    </span>
                    <span className="text-xs font-bold text-stone-900 bg-stone-100 px-2 py-0.5 rounded-md">
                      {typeof item.result === "number" ? item.result.toLocaleString() : item.result} {item.unit}
                    </span>
                  </div>

                  <p className="text-xs font-mono text-stone-700 bg-stone-50 p-2 rounded-lg border border-stone-100">
                    {item.formula}
                  </p>

                  {item.note && (
                    <p className="text-[11px] text-stone-500 italic">
                      Lưu ý: {item.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
