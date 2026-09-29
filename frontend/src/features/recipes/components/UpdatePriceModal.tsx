"use client";

import React, { useState, useEffect } from "react";
import { X, Tag, AlertCircle, Check, Trash2 } from "lucide-react";
import { Recipe } from "../types";
import { priceService, PRICE_WARNING_TEXT } from "../services/priceService";
import { useProfile } from "@/features/profile/hooks/useProfile";

interface UpdatePriceModalProps {
  recipe: Recipe | null;
  isOpen: boolean;
  onClose: () => void;
  onSaved?: () => void;
}

export function UpdatePriceModal({
  recipe,
  isOpen,
  onClose,
  onSaved,
}: UpdatePriceModalProps) {
  const { profile } = useProfile();
  const userId = String(profile.id || "u1");

  const [priceInput, setPriceInput] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    if (recipe) {
      const currentMyPrice = priceService.getMyPrice(userId, recipe.id);
      setPriceInput(currentMyPrice ? String(currentMyPrice) : "");
      setSuccessMsg(false);
    }
  }, [recipe, userId, isOpen]);

  if (!isOpen || !recipe) return null;

  const estimatedCost =
    recipe.estimatedCost ||
    priceService.calculateRecipeCost(recipe.ingredients || []).estimatedCost;
  const currentMyPrice = priceService.getMyPrice(userId, recipe.id);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseInt(priceInput.replace(/\D/g, ""), 10);
    if (isNaN(parsed) || parsed <= 0) {
      alert("Vui lòng nhập số tiền hợp lệ (lớn hơn 0 VND).");
      return;
    }

    priceService.setMyPrice(userId, recipe.id, parsed);
    setSuccessMsg(true);
    setTimeout(() => {
      onSaved?.();
      onClose();
    }, 600);
  };

  const handleResetToAdmin = () => {
    priceService.removeMyPrice(userId, recipe.id);
    setPriceInput("");
    setSuccessMsg(true);
    setTimeout(() => {
      onSaved?.();
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/60">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Tag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-stone-900">
                Update My Price
              </h3>
              <p className="text-xs text-stone-500">
                Personalized price for your household
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

        {/* Content */}
        <form onSubmit={handleSave} className="p-6 space-y-5">
          <div>
            <h4 className="font-semibold text-stone-900 text-sm line-clamp-1">
              {recipe.name || recipe.title}
            </h4>
            <div className="flex items-center gap-3 mt-2 text-xs">
              <div className="bg-stone-100 px-3 py-1.5 rounded-xl border border-stone-200">
                <span className="text-stone-500 block text-[10px]">Admin Estimated:</span>
                <span className="font-bold text-stone-800">
                  {priceService.formatEstimatedPrice(estimatedCost)}
                </span>
              </div>
              {currentMyPrice && (
                <div className="bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 text-emerald-900">
                  <span className="text-emerald-700 block text-[10px]">Your Current Price:</span>
                  <span className="font-bold">
                    {priceService.formatActualPrice(currentMyPrice)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Price Warning (Requirement 5) */}
          <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-2xl flex items-start gap-2.5 text-xs text-amber-900 leading-relaxed">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>{PRICE_WARNING_TEXT}</p>
          </div>

          {/* Input */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              My Actual Price (VND):
            </label>
            <div className="relative">
              <input
                type="number"
                step="500"
                min="1000"
                placeholder="Ví dụ: 22000"
                value={priceInput}
                onChange={(e) => setPriceInput(e.target.value)}
                className="w-full h-11 px-4 rounded-xl border border-stone-200 bg-stone-50 text-sm font-semibold text-stone-900 focus:bg-white focus:border-emerald-600 outline-none"
                autoFocus
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400">
                VND
              </span>
            </div>
            <p className="text-[11px] text-stone-400 mt-1">
              Dữ liệu này được lưu riêng cho bạn và không ảnh hưởng đến người dùng khác.
            </p>
          </div>

          {successMsg && (
            <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center gap-1.5 animate-in fade-in">
              <Check className="w-4 h-4 text-emerald-600" />
              Đã cập nhật giá cá nhân thành công!
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center justify-between gap-3 pt-2">
            {currentMyPrice ? (
              <button
                type="button"
                onClick={handleResetToAdmin}
                className="h-10 px-3.5 rounded-xl border border-stone-200 text-red-600 hover:bg-red-50 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Reset to default Admin estimated price"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Reset Default
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="h-10 px-4 rounded-xl border border-stone-200 text-stone-600 text-xs font-semibold hover:bg-stone-50 transition-colors cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="h-10 px-5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                Lưu Giá Của Tôi
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
