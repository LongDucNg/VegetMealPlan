"use client";

import React from "react";
import { MonthlyMealPlan } from "../types";
import { CalendarDays, Flame, Tag } from "lucide-react";

interface MonthlyCalendarViewProps {
  monthlyPlan: MonthlyMealPlan;
  activeDayIndex: number;
  onSelectDay: (index: number) => void;
}

export function MonthlyCalendarView({
  monthlyPlan,
  activeDayIndex,
  onSelectDay,
}: MonthlyCalendarViewProps) {
  const { days, monthName, totalEstimatedCost, averageDailyCalories } = monthlyPlan;

  // Weekday columns starting with Monday (Vietnamese & International standard)
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Calculate empty spaces before day 1
  const firstDayOfWeek = new Date(monthlyPlan.year, monthlyPlan.month, 1).getDay();
  // In JS getDay(): 0 is Sunday, 1 is Monday ... 6 is Saturday
  // Convert to Mon=0 ... Sun=6
  const leadingBlankDays = (firstDayOfWeek + 6) % 7;

  return (
    <div className="bg-white border border-stone-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
      {/* Calendar Header info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <CalendarDays className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-xl text-stone-900">
              {monthName} Calendar
            </h3>
            <p className="text-xs text-stone-500">
              Click any date to inspect and customize its 4 daily planned meals
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="bg-stone-50 px-3 py-1.5 rounded-xl border border-stone-200">
            <span className="text-stone-400 block text-[10px]">Monthly Total:</span>
            <span className="font-bold text-emerald-800">
              ~{totalEstimatedCost.toLocaleString("vi-VN")} VND
            </span>
          </div>
          <div className="bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
            <span className="text-amber-600 block text-[10px]">Daily Average:</span>
            <span className="font-bold text-amber-900">
              {averageDailyCalories} kcal/day
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
          const isSelected = activeDayIndex === idx;

          return (
            <button
              key={day.dateKey}
              onClick={() => onSelectDay(idx)}
              className={`aspect-square sm:aspect-auto sm:h-20 p-2 sm:p-2.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? "bg-emerald-700 text-white border-emerald-800 shadow-md ring-2 ring-emerald-600/30"
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
                <div
                  className={`flex items-center gap-1 font-semibold truncate ${
                    isSelected ? "text-amber-200" : "text-amber-700"
                  }`}
                >
                  <Flame className="w-2.5 h-2.5 shrink-0" />
                  <span>{day.totalCalories} kcal</span>
                </div>
                <div
                  className={`truncate font-medium ${
                    isSelected ? "text-emerald-100" : "text-stone-500"
                  }`}
                >
                  ~{day.estimatedCost.toLocaleString("vi-VN")} đ
                </div>
              </div>

              {/* Mobile Indicator Dot */}
              <div className="sm:hidden flex items-center justify-center gap-1 mt-auto">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    isSelected ? "bg-amber-300" : "bg-emerald-600"
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
