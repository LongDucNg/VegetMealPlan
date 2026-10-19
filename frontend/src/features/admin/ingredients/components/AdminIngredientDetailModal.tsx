"use client";

import React from "react";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { BackendIngredient } from "@/features/recipes/services/ingredientApiService";
import {
  Sparkles,
  Flame,
  Leaf,
  Calendar,
  DollarSign,
  Tag,
  Clock,
  Layers,
} from "lucide-react";

interface AdminIngredientDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (ing: BackendIngredient) => void;
  ingredient: BackendIngredient | null;
}

export function AdminIngredientDetailModal({
  isOpen,
  onClose,
  onEdit,
  ingredient,
}: AdminIngredientDetailModalProps) {
  if (!ingredient) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Chi tiết nguyên liệu"
      className="max-w-xl"
    >
      <div className="space-y-6 pt-2">
        {/* Header Summary */}
        <div className="flex items-start justify-between gap-4 p-4 rounded-2xl bg-stone-50 border border-stone-200/80">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-stone-400">
                #{ingredient.ingredient_id}
              </span>
              <h3 className="font-serif font-bold text-lg text-stone-900">
                {ingredient.ingredient_name}
              </h3>
            </div>
            {ingredient.description && (
              <p className="text-xs text-stone-500 mt-1">{ingredient.description}</p>
            )}
            <div className="flex items-center gap-2 mt-2">
              {ingredient.vegan_flag ? (
                <Badge variant="success">Thuần chay</Badge>
              ) : (
                <Badge variant="info">Chay có sữa/trứng</Badge>
              )}
              {ingredient.status === "active" ? (
                <Badge variant="success">Hoạt động</Badge>
              ) : (
                <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-stone-200 text-stone-700">
                  Tạm ngưng
                </span>
              )}
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
              Giá chuẩn
            </span>
            <span className="text-base font-bold text-emerald-800">
              {(ingredient.avg_price_per_unit || 0).toLocaleString("vi-VN")} VNĐ
            </span>
            <span className="text-xs text-stone-500 block">/ {ingredient.unit}</span>
          </div>
        </div>

        {/* Dinh dưỡng trên 100g */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-600">
            <Flame className="w-4 h-4 text-amber-500" />
            <span>Thành phần dinh dưỡng (trên 100g)</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/60 text-center">
              <span className="text-[10px] uppercase font-semibold text-amber-700 block">Calo</span>
              <span className="text-sm font-bold text-amber-900">
                {ingredient.calories_per_100g ?? 0}
              </span>
              <span className="text-[10px] text-amber-700 block">kcal</span>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200/60 text-center">
              <span className="text-[10px] uppercase font-semibold text-emerald-700 block">Chất đạm</span>
              <span className="text-sm font-bold text-emerald-900">
                {ingredient.protein_per_100g ?? 0}g
              </span>
            </div>

            <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-200/60 text-center">
              <span className="text-[10px] uppercase font-semibold text-blue-700 block">Tinh bột</span>
              <span className="text-sm font-bold text-blue-900">
                {ingredient.carb_per_100g ?? 0}g
              </span>
            </div>

            <div className="p-3 rounded-xl bg-purple-50/60 border border-purple-200/60 text-center">
              <span className="text-[10px] uppercase font-semibold text-purple-700 block">Chất béo</span>
              <span className="text-sm font-bold text-purple-900">
                {ingredient.fat_per_100g ?? 0}g
              </span>
            </div>

            <div className="p-3 rounded-xl bg-lime-50/60 border border-lime-200/60 text-center">
              <span className="text-[10px] uppercase font-semibold text-lime-700 block">Chất xơ</span>
              <span className="text-sm font-bold text-lime-900">
                {ingredient.fiber_per_100g ?? 0}g
              </span>
            </div>
          </div>
        </div>

        {/* Thông tin mùa vụ & Metadata */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl border border-stone-100 bg-stone-50/50 space-y-1">
            <span className="font-semibold text-stone-500 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-stone-400" />
              Tính mùa vụ:
            </span>
            <p className="font-medium text-stone-800">
              {ingredient.is_seasonal
                ? `Có mùa vụ (${ingredient.season_months || "Các tháng trong năm"})`
                : "Quanh năm (Không theo mùa)"}
            </p>
          </div>

          <div className="p-3 rounded-xl border border-stone-100 bg-stone-50/50 space-y-1">
            <span className="font-semibold text-stone-500 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              Cập nhật lần cuối:
            </span>
            <p className="font-medium text-stone-800">
              {ingredient.updated_at
                ? new Date(ingredient.updated_at).toLocaleDateString("vi-VN")
                : "—"}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-3 border-t border-stone-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-stone-200 text-xs font-bold text-stone-600 hover:bg-stone-50 transition-colors cursor-pointer"
          >
            Đóng
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onEdit(ingredient);
            }}
            className="px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 transition-colors cursor-pointer"
          >
            Chỉnh sửa nguyên liệu này
          </button>
        </div>
      </div>
    </Modal>
  );
}
