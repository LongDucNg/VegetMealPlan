"use client";

import React, { useState, useEffect } from "react";
import { Check, Crown, Sparkles, Loader2, AlertCircle } from "lucide-react";
import { subscriptionService } from "../services/subscriptionService";
import { MOCK_PLANS } from "../data/mockSubscriptions";
import { useSubscription } from "../hooks/useSubscription";
import { SubscriptionPlan } from "../types";

export function SubscriptionPlans() {
  const { subscription, purchase, cancel, isPremium } = useSubscription();
  const [plans, setPlans] = useState<SubscriptionPlan[]>(MOCK_PLANS);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    subscriptionService.getPlans().then(setPlans);
  }, []);

  const handleSelectPlan = async (planId: SubscriptionPlan["id"]) => {
    if (loading) return;
    setLoading(true);
    setAlert(null);
    try {
      if (planId === "free") {
        await cancel();
        setAlert({
          type: "success",
          message: "Đã chuyển về gói Miễn phí thành công.",
        });
      } else {
        await purchase("premium");
        setAlert({
          type: "success",
          message: "Chúc mừng! Đã chuyển sang gói Premium thành công. Toàn bộ tính năng đã được mở khóa!",
        });
      }
    } catch (err: any) {
      setAlert({
        type: "error",
        message: err?.message || "Có lỗi xảy ra khi chuyển gói. Vui lòng thử lại.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Current plan notice */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-2xl bg-stone-50 border border-stone-200">
        <div>
          <span className="text-xs text-stone-500">Gói hội viên hiện tại:</span>
          <p className="font-serif font-bold text-lg text-stone-900 flex items-center gap-1.5 mt-0.5">
            {isPremium && <Crown className="w-4 h-4 text-amber-500 fill-amber-500" />}
            {isPremium ? "Premium 1 tháng (Toàn bộ tính năng)" : "Free Plan (Gói Miễn Phí)"}
          </p>
          {isPremium && subscription.expiresAt && (
            <p className="text-xs text-emerald-700 mt-0.5 font-medium">
              Hạn sử dụng đến: <span className="font-semibold">{new Date(subscription.expiresAt).toLocaleDateString("vi-VN")}</span> · Tất cả tính năng đã sẵn sàng
            </p>
          )}
        </div>
        {isPremium ? (
          <button
            onClick={() => handleSelectPlan("free")}
            disabled={loading}
            className="text-xs text-stone-500 hover:text-red-700 underline underline-offset-2 font-medium cursor-pointer"
          >
            Chuyển về gói Miễn phí
          </button>
        ) : (
          <button
            onClick={() => handleSelectPlan("premium")}
            disabled={loading}
            className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Crown className="w-3.5 h-3.5 text-amber-300" />}
            Nâng cấp Premium ngay
          </button>
        )}
      </div>

      {/* Thông báo kết quả thao tác */}
      {alert && (
        <div
          className={`p-3.5 rounded-2xl text-xs font-medium flex items-center justify-between animate-in fade-in ${
            alert.type === "success"
              ? "bg-emerald-50 border border-emerald-200 text-emerald-900"
              : "bg-red-50 border border-red-200 text-red-900"
          }`}
        >
          <div className="flex items-center gap-2">
            {alert.type === "success" ? (
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            )}
            <span>{alert.message}</span>
          </div>
          <button
            onClick={() => setAlert(null)}
            className="text-stone-400 hover:text-stone-600 cursor-pointer ml-3 font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Plans grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {plans.map((plan) => {
          const isCurrent = isPremium ? plan.id === "premium" : plan.id === "free";
          return (
            <div
              key={plan.id}
              className={`rounded-3xl p-6 flex flex-col justify-between border transition-all ${
                plan.popular
                  ? "border-emerald-600 bg-white ring-2 ring-emerald-600/30 shadow-md relative"
                  : "border-stone-200 bg-white shadow-xs hover:border-stone-300"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-amber-400 text-amber-950 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div>
                <h3 className="font-serif font-bold text-xl text-stone-900">{plan.name}</h3>
                <div className="mt-3 mb-4">
                  <span className="font-serif font-bold text-3xl text-emerald-800">
                    {plan.formattedPrice}
                  </span>
                  <span className="text-xs text-stone-500 block mt-0.5">
                    {plan.billingCycleText}
                  </span>
                </div>

                <div className="h-px bg-stone-100 my-4" />

                <ul className="space-y-2.5 text-xs text-stone-600 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                {isCurrent ? (
                  <button
                    disabled
                    className="w-full h-11 rounded-xl bg-stone-100 text-stone-500 font-semibold text-sm cursor-default flex items-center justify-center gap-1.5"
                  >
                    <Check className="w-4 h-4 text-emerald-600" />
                    Gói đang sử dụng
                  </button>
                ) : (
                  <button
                    onClick={() => handleSelectPlan(plan.id)}
                    disabled={loading}
                    className={`w-full h-11 rounded-xl font-semibold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      plan.price > 0
                        ? "bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs"
                        : "bg-stone-100 hover:bg-stone-200 text-stone-800"
                    }`}
                  >
                    {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                    {plan.price > 0 ? (
                      <>
                        <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
                        <span>Nâng cấp Premium</span>
                      </>
                    ) : (
                      "Chuyển về Miễn phí"
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
