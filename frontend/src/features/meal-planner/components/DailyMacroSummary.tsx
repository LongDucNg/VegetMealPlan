"use client";

import React from "react";
import { CheckCircle2, AlertCircle, Tag, Info } from "lucide-react";
import { DayMealPlan } from "../types";
import { PRICE_WARNING_TEXT } from "@/features/recipes/services/priceService";

interface DailyMacroSummaryProps {
  day: DayMealPlan;
}

export function DailyMacroSummary({ day }: DailyMacroSummaryProps) {
  const pct = Math.min(100, Math.round((day.totalCalories / day.targetCalories) * 100));
  const remaining = day.targetCalories - day.totalCalories;
  const isOver = remaining < 0;

  return (
    <div className="bg-white border border-stone-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
            Daily Nutrition Breakdown ({day.dayName}, {day.dateText})
          </span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="font-serif font-bold text-3xl text-stone-900">
              {day.totalCalories}
            </span>
            <span className="text-stone-400 text-lg">/</span>
            <span className="font-serif font-bold text-xl text-emerald-700">
              {day.targetCalories} kcal
            </span>
          </div>
        </div>

        {/* Estimated Cost Pill (Requirement 7) & Calorie Balance */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="px-3.5 py-1.5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-950 text-xs font-bold flex items-center gap-1.5 shadow-2xs">
            <Tag className="w-3.5 h-3.5 text-emerald-700" />
            <span>Estimated Cost: ~{day.estimatedCost.toLocaleString("vi-VN")} VND/day</span>
          </div>

          <div
            className={`px-3.5 py-1.5 rounded-full border text-xs font-semibold flex items-center gap-1.5 ${
              isOver
                ? "bg-red-50 text-red-700 border-red-200"
                : "bg-emerald-50 text-emerald-800 border-emerald-200"
            }`}
          >
            {isOver ? (
              <>
                <AlertCircle className="w-3.5 h-3.5 text-red-600" />
                <span>Exceeded target by {Math.abs(remaining)} kcal</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{remaining} kcal remaining for snacks/beverages</span>
              </>
            )}
          </div>
          <span className="text-xs font-bold text-stone-500 bg-stone-100 px-2.5 py-1 rounded-full">
            {pct}% of target
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-500 rounded-full ${
            isOver ? "bg-amber-500" : "bg-emerald-600"
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Daily Macro Totals */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
        <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-3 text-center">
          <p className="text-[11px] font-semibold text-stone-500 uppercase">Protein</p>
          <p className="font-serif font-bold text-xl text-emerald-800 mt-0.5">{day.totalProtein}g</p>
          <p className="text-[10px] text-stone-400">~{Math.round(day.totalProtein * 4)} kcal</p>
        </div>
        <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-3 text-center">
          <p className="text-[11px] font-semibold text-stone-500 uppercase">Carbs</p>
          <p className="font-serif font-bold text-xl text-amber-700 mt-0.5">{day.totalCarbs}g</p>
          <p className="text-[10px] text-stone-400">~{Math.round(day.totalCarbs * 4)} kcal</p>
        </div>
        <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-3 text-center">
          <p className="text-[11px] font-semibold text-stone-500 uppercase">Fat</p>
          <p className="font-serif font-bold text-xl text-violet-700 mt-0.5">{day.totalFat}g</p>
          <p className="text-[10px] text-stone-400">~{Math.round(day.totalFat * 9)} kcal</p>
        </div>
        <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-3 text-center">
          <p className="text-[11px] font-semibold text-stone-500 uppercase">Daily Cost</p>
          <p className="font-serif font-bold text-xl text-emerald-900 mt-0.5">
            ~{day.estimatedCost.toLocaleString("vi-VN")} đ
          </p>
          <p className="text-[10px] text-stone-400">4 planned meals</p>
        </div>
      </div>

      {/* Price Disclaimer (Requirement 5) */}
      <div className="flex items-center gap-2 text-[11px] text-stone-400 bg-stone-50/60 p-2.5 rounded-xl border border-stone-100">
        <Info className="w-3.5 h-3.5 text-stone-400 shrink-0" />
        <span>{PRICE_WARNING_TEXT}</span>
      </div>
    </div>
  );
}
