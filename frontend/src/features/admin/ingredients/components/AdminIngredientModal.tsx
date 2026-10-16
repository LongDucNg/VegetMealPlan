"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { BackendIngredient, ingredientApiService, IngredientPayload } from "@/features/recipes/services/ingredientApiService";
import { Loader2, AlertCircle, Sparkles, DollarSign, Activity, Check } from "lucide-react";

interface AdminIngredientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (saved: BackendIngredient, isEdit: boolean) => void;
  ingredient: BackendIngredient | null;
}

export function AdminIngredientModal({
  isOpen,
  onClose,
  onSuccess,
  ingredient,
}: AdminIngredientModalProps) {
  const isEdit = Boolean(ingredient);

  const [form, setForm] = useState<IngredientPayload>({
    ingredient_name: "",
    unit: "kg",
    description: "",
    vegan_flag: true,
    avg_price_per_unit: 20000,
    calories_per_100g: 100,
    protein_per_100g: 2,
    carb_per_100g: 10,
    fat_per_100g: 0.5,
    fiber_per_100g: 1,
    is_seasonal: false,
    season_months: "",
    status: "active",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (ingredient) {
      setForm({
        ingredient_name: ingredient.ingredient_name || "",
        unit: ingredient.unit || "kg",
        description: ingredient.description || "",
        vegan_flag: ingredient.vegan_flag ?? true,
        avg_price_per_unit: ingredient.avg_price_per_unit ?? 0,
        calories_per_100g: ingredient.calories_per_100g ?? 0,
        protein_per_100g: ingredient.protein_per_100g ?? 0,
        carb_per_100g: ingredient.carb_per_100g ?? 0,
        fat_per_100g: ingredient.fat_per_100g ?? 0,
        fiber_per_100g: ingredient.fiber_per_100g ?? 0,
        is_seasonal: ingredient.is_seasonal ?? false,
        season_months: ingredient.season_months || "",
        status: ingredient.status || "active",
      });
    } else {
      setForm({
        ingredient_name: "",
        unit: "kg",
        description: "",
        vegan_flag: true,
        avg_price_per_unit: 25000,
        calories_per_100g: 50,
        protein_per_100g: 2,
        carb_per_100g: 10,
        fat_per_100g: 0.5,
        fiber_per_100g: 1.5,
        is_seasonal: false,
        season_months: "",
        status: "active",
      });
    }
    setErrorMsg(null);
  }, [ingredient, isOpen]);

  const handleChange = (field: keyof IngredientPayload, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.ingredient_name?.trim()) {
      setErrorMsg("Vui lòng nhập tên nguyên liệu");
      return;
    }
    if (!form.unit?.trim()) {
      setErrorMsg("Vui lòng nhập đơn vị tính (kg, g, quả, bó...)");
      return;
    }

    setIsSaving(true);
    setErrorMsg(null);

    try {
      if (isEdit && ingredient) {
        const updated = await ingredientApiService.adminUpdateIngredient(
          ingredient.ingredient_id,
          form
        );
        onSuccess(updated, true);
      } else {
        const created = await ingredientApiService.adminCreateIngredient(form);
        onSuccess(created, false);
      }
      onClose();
    } catch (err: any) {
      setErrorMsg(err?.message || "Không thể lưu nguyên liệu. Vui lòng thử lại.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? `Chỉnh sửa: ${ingredient?.ingredient_name}` : "Thêm nguyên liệu mới vào hệ thống"}
      className="max-w-2xl"
    >
      <form onSubmit={handleSave} className="space-y-6 pt-2">
        {errorMsg && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Section 1: Thông tin cơ bản */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
            <Sparkles className="w-3.5 h-3.5" />
            <span>1. Thông tin cơ bản</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Tên nguyên liệu <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={form.ingredient_name}
                onChange={(e) => handleChange("ingredient_name", e.target.value)}
                placeholder="Ví dụ: Đậu hũ non, Nấm đùi gà, Hạt sen..."
                className="w-full h-10 px-3.5 rounded-xl border border-stone-200 text-sm focus:border-emerald-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Đơn vị tính <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={form.unit}
                onChange={(e) => handleChange("unit", e.target.value)}
                placeholder="kg, g, quả, hộp, bó..."
                className="w-full h-10 px-3.5 rounded-xl border border-stone-200 text-sm focus:border-emerald-600 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Mô tả chi tiết</label>
            <input
              type="text"
              value={form.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Ghi chú về nguồn gốc, cách sơ chế hoặc phân loại..."
              className="w-full h-10 px-3.5 rounded-xl border border-stone-200 text-sm focus:border-emerald-600 outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-1 text-xs">
            <label className="flex items-center gap-2 cursor-pointer font-medium text-stone-700">
              <input
                type="checkbox"
                checked={form.vegan_flag}
                onChange={(e) => handleChange("vegan_flag", e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
              />
              <span>Thuần chay (Vegan)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer font-medium text-stone-700">
              <input
                type="checkbox"
                checked={form.is_seasonal}
                onChange={(e) => handleChange("is_seasonal", e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
              />
              <span>Nguyên liệu theo mùa</span>
            </label>

            <div className="flex items-center gap-2 ml-auto">
              <span className="font-semibold text-stone-600">Trạng thái:</span>
              <select
                value={form.status}
                onChange={(e) => handleChange("status", e.target.value as any)}
                className="h-8 px-2.5 rounded-lg border border-stone-200 text-xs bg-white focus:border-emerald-600 outline-none"
              >
                <option value="active">Active (Hoạt động)</option>
                <option value="inactive">Inactive (Tạm ngưng)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Giá tham khảo */}
        <div className="space-y-3 pt-3 border-t border-stone-100">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
            <DollarSign className="w-3.5 h-3.5" />
            <span>2. Giá chuẩn thị trường (VND)</span>
          </div>

          <div className="max-w-xs">
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Giá trung bình / 1 {form.unit || "đơn vị"} (VND)
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                step="500"
                value={form.avg_price_per_unit || 0}
                onChange={(e) => handleChange("avg_price_per_unit", Number(e.target.value))}
                className="w-full h-10 pl-3.5 pr-14 rounded-xl border border-stone-200 text-sm focus:border-emerald-600 outline-none"
              />
              <span className="absolute right-3 top-2.5 text-xs font-bold text-stone-400">VND</span>
            </div>
            <p className="text-[11px] text-stone-400 mt-1">
              Dùng để tự động tính giá thành công thức món cho thành viên.
            </p>
          </div>
        </div>

        {/* Section 3: Chỉ số dinh dưỡng trên 100g */}
        <div className="space-y-3 pt-3 border-t border-stone-100">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
            <Activity className="w-3.5 h-3.5" />
            <span>3. Chỉ số dinh dưỡng (trên 100g nguyên liệu)</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                Calories (kcal)
              </label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={form.calories_per_100g ?? 0}
                onChange={(e) => handleChange("calories_per_100g", Number(e.target.value))}
                className="w-full h-9 px-3 rounded-lg border border-stone-200 text-xs focus:border-emerald-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                Protein (g)
              </label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={form.protein_per_100g ?? 0}
                onChange={(e) => handleChange("protein_per_100g", Number(e.target.value))}
                className="w-full h-9 px-3 rounded-lg border border-stone-200 text-xs focus:border-emerald-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                Carbs (g)
              </label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={form.carb_per_100g ?? 0}
                onChange={(e) => handleChange("carb_per_100g", Number(e.target.value))}
                className="w-full h-9 px-3 rounded-lg border border-stone-200 text-xs focus:border-emerald-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                Fat (g)
              </label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={form.fat_per_100g ?? 0}
                onChange={(e) => handleChange("fat_per_100g", Number(e.target.value))}
                className="w-full h-9 px-3 rounded-lg border border-stone-200 text-xs focus:border-emerald-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                Chất xơ / Fiber (g)
              </label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={form.fiber_per_100g ?? 0}
                onChange={(e) => handleChange("fiber_per_100g", Number(e.target.value))}
                className="w-full h-9 px-3 rounded-lg border border-stone-200 text-xs focus:border-emerald-600 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex justify-end gap-2.5 pt-4 border-t border-stone-100">
          <button
            type="button"
            onClick={onClose}
            className="h-10 px-4 rounded-xl border border-stone-200 text-xs font-bold text-stone-600 hover:bg-stone-50 transition-colors cursor-pointer"
          >
            Hủy
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="h-10 px-5 rounded-xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 disabled:opacity-60 transition-all cursor-pointer flex items-center gap-2 shadow-sm"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Check className="w-4 h-4" />
            )}
            <span>{isEdit ? "Cập nhật nguyên liệu" : "Lưu nguyên liệu mới"}</span>
          </button>
        </div>
      </form>
    </Modal>
  );
}
