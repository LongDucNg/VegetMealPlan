"use client";

import React from "react";
import { MonthlyMealPlan } from "../types";
import { CalendarDays, Flame, ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";

interface MonthlyCalendarViewProps {
  monthlyPlan: MonthlyMealPlan;
  activeDayIndex: number;
  onSelectDay: (index: number) => void;
  selectedMonth?: number;
  selectedYear?: number;
  onPrevMonth?: () => void;
  onNextMonth?: () => void;
  canPrevMonth?: boolean;
  canNextMonth?: boolean;
}

export function MonthlyCalendarView({
  monthlyPlan,
  activeDayIndex,
  onSelectDay,
  onPrevMonth,
  onNextMonth,
  canPrevMonth = false,
  canNextMonth = false,
}: MonthlyCalendarViewProps) {
  const { days, monthName } = monthlyPlan;

  // Calculate current date key
  const now = new Date();
  const todayKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  // Weekday columns starting with Monday (Vietnamese standard)
  const weekdays = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

  // Calculate empty spaces before day 1
  const firstDayOfWeek = new Date(monthlyPlan.year, monthlyPlan.month, 1).getDay();
  // In JS getDay(): 0 is Sunday, 1 is Monday ... 6 is Saturday
  // Convert to Mon=0 ... Sun=6
  const leadingBlankDays = (firstDayOfWeek + 6) % 7;

  // Calculate totals ONLY for days that have been generated
  const generatedDaysList = days.filter((d) => d.totalCalories > 0);
  const totalCost = generatedDaysList.reduce((sum, d) => sum + d.estimatedCost, 0);
  const avgKcal =
    generatedDaysList.length > 0
      ? Math.round(generatedDaysList.reduce((sum, d) => sum + d.totalCalories, 0) / generatedDaysList.length)
      : 0;

  return (
    <div className="bg-white border border-stone-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
      {/* Calendar Header info with Month Navigation */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
            <CalendarDays className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif font-bold text-xl text-stone-900">
                Lịch thực đơn {monthName}
              </h3>
              {/* Month Navigation Buttons */}
              <div className="flex items-center gap-1 ml-2">
                <button
                  type="button"
                  onClick={onPrevMonth}
                  disabled={!canPrevMonth}
                  title={canPrevMonth ? "Tháng trước" : "Không thể xem tháng trong quá khứ"}
                  className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-colors ${
                    canPrevMonth
                      ? "border-stone-200 text-stone-600 hover:bg-stone-100 cursor-pointer"
                      : "border-stone-100 text-stone-300 cursor-not-allowed bg-stone-50"
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={onNextMonth}
                  disabled={!canNextMonth}
                  title={canNextMonth ? "Tháng sau" : "Chỉ được phép tạo tối đa 1 tháng tới (không được tạo 2 tháng tới)"}
                  className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-colors ${
                    canNextMonth
                      ? "border-stone-200 text-stone-600 hover:bg-stone-100 cursor-pointer"
                      : "border-stone-100 text-stone-300 cursor-not-allowed bg-stone-50"
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-xs text-stone-500">
              Nhấn vào ngày bất kỳ để xem chi tiết và tùy biến 4 bữa ăn
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="bg-stone-50 px-3 py-1.5 rounded-xl border border-stone-200">
            <span className="text-stone-400 block text-[10px]">Đã tạo {generatedDaysList.length}/{days.length} ngày:</span>
            <span className="font-bold text-emerald-800">
              {totalCost > 0 ? `~${totalCost.toLocaleString("vi-VN")} VNĐ` : "0 VNĐ"}
            </span>
          </div>
          <div className="bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
            <span className="text-amber-600 block text-[10px]">Trung bình ngày đã tạo:</span>
            <span className="font-bold text-amber-900">
              {avgKcal > 0 ? `~${avgKcal} kcal/ngày` : "0 kcal/ngày"}
            </span>
          </div>
        </div>
      </div>

      {/* Weekday Grid Header */}
      <div className="grid grid-cols-7 gap-1.5 text-center text-xs font-bold text-stone-500 uppercase tracking-wider py-1">
        {weekdays.map((w) => (
          <div key={w} className="py-1">
            {w}
          </div>
        ))}
      </div>

      {/* Calendar Days Matrix */}
      <div className="grid grid-cols-7 gap-1.5">
        {/* Leading blanks */}
        {Array.from({ length: leadingBlankDays }).map((_, i) => (
          <div
            key={`blank-${i}`}
            className="aspect-square sm:aspect-auto sm:h-20 rounded-2xl bg-stone-50/40 border border-transparent"
          />
        ))}

        {/* Real Month Days */}
        {days.map((day, idx) => {
          const isPast = day.dateKey < todayKey;
          const isSelected = activeDayIndex === idx;
          const isGenerated = day.totalCalories > 0;

          if (isPast) {
            return (
              <div
                key={day.dateKey}
                className="aspect-square sm:aspect-auto sm:h-20 p-2 sm:p-2.5 rounded-2xl border border-stone-200/60 bg-stone-100/60 text-stone-400 flex flex-col justify-between cursor-not-allowed select-none"
                title="Ngày này đã qua — Không thể tạo thực đơn trong quá khứ"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs font-bold text-stone-400 line-through">
                    {day.dayOfMonth}
                  </span>
                  <span className="text-[10px] hidden sm:inline text-stone-400">
                    {day.shortDay}
                  </span>
                </div>
                <div className="hidden sm:block text-[10px] font-medium text-stone-400 italic">
                  Đã qua
                </div>
                <div className="sm:hidden text-[9px] text-center text-stone-400">
                  Qua
                </div>
              </div>
            );
          }

          return (
            <button
              key={day.dateKey}
              type="button"
              onClick={() => onSelectDay(idx)}
              className={`aspect-square sm:aspect-auto sm:h-20 p-2 sm:p-2.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? "bg-emerald-700 text-white border-emerald-800 shadow-md ring-2 ring-emerald-600/30"
                  : isGenerated
                  ? "bg-emerald-50/40 border-emerald-300 text-stone-800 hover:border-emerald-500 hover:bg-emerald-50"
                  : "bg-white border-stone-200/90 text-stone-700 hover:border-emerald-400 hover:bg-stone-50"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span
                  className={`text-xs font-bold ${
                    isSelected ? "text-white" : "text-stone-900"
                  }`}
                >
                  {day.dayOfMonth}
                </span>
                <span
                  className={`text-[10px] hidden sm:inline ${
                    isSelected ? "text-emerald-200" : "text-stone-400"
                  }`}
                >
                  {day.shortDay}
                </span>
              </div>

              {/* Day Metrics Mini */}
              <div className="hidden sm:block space-y-0.5 text-[10px] w-full">
                {isGenerated ? (
                  <>
                    <div
                      className={`flex items-center gap-1 font-semibold truncate ${
                        isSelected ? "text-amber-200" : "text-amber-700"
                      }`}
                    >
                      <Flame className="w-2.5 h-2.5 shrink-0" />
                      <span>~{Math.round(Number(day.totalCalories) * 100) / 100} kcal</span>
                    </div>
                    <div
                      className={`truncate font-medium ${
                        isSelected ? "text-emerald-100" : "text-stone-500"
                      }`}
                    >
                      ~{day.estimatedCost.toLocaleString("vi-VN")} VNĐ
                    </div>
                  </>
                ) : (
                  <div
                    className={`italic truncate pt-1 ${
                      isSelected ? "text-emerald-200 font-semibold" : "text-stone-400"
                    }`}
                  >
                    Trống
                  </div>
                )}
              </div>

              {/* Mobile Indicator Dot */}
              <div className="sm:hidden flex items-center justify-center gap-1 mt-auto">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    isSelected
                      ? "bg-amber-300"
                      : isGenerated
                      ? "bg-emerald-600"
                      : "bg-stone-300"
                  }`}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
