"use client";

import React, { useState } from "react";
import { Check, ShieldCheck, CreditCard, Sparkles, X, QrCode, AlertCircle, ExternalLink } from "lucide-react";
import { SubscriptionPlan } from "../types";
import { MOCK_PLANS } from "../data/mockSubscriptions";
import { subscriptionService } from "../services/subscriptionService";

interface MockPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (planId: SubscriptionPlan["id"]) => void;
  defaultPlanId?: SubscriptionPlan["id"];
}

export function MockPaymentModal({
  isOpen,
  onClose,
  onSuccess,
  defaultPlanId = "premium",
}: MockPaymentModalProps) {
  const [selectedPlanId, setSelectedPlanId] = useState<SubscriptionPlan["id"]>(defaultPlanId);
  const [paymentMethod, setPaymentMethod] = useState<"vnpay" | "card" | "momo">("vnpay");
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentPlan =
    MOCK_PLANS.find((p) => p.id === selectedPlanId) || MOCK_PLANS[1];

  const handleConfirm = async () => {
    setErrorMessage(null);

    // Nếu chọn cổng VNPay thật: gọi API POST /subscriptions/checkout
    if (paymentMethod === "vnpay") {
      setProcessing(true);
      try {
        const res = await subscriptionService.createCheckout();
        if (res?.payment_url) {
          // Điều hướng toàn trang sang cổng thanh toán VNPay
          window.location.href = res.payment_url;
          return;
        }
        throw new Error("Không nhận được link thanh toán từ hệ thống.");
      } catch (err: any) {
        setProcessing(false);
        if (err?.status === 503 || err?.code === "SUBSCRIPTION_PAYMENT_NOT_CONFIGURED") {
          setErrorMessage(
            "Cổng thanh toán VNPay đang ở chế độ chờ cấu hình khóa bí mật (VNPAY_TMN_CODE) trên server. Bạn có thể chọn 'Kích hoạt thử nghiệm (Demo)' bên dưới để trải nghiệm."
          );
        } else {
          setErrorMessage(err?.message || "Không thể khởi tạo giao dịch thanh toán VNPay.");
        }
      }
      return;
    }

    // Đối với các phương thức mô phỏng (Card, Momo):
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setCompleted(true);
      setTimeout(() => {
        onSuccess(currentPlan.id);
        setCompleted(false);
        onClose();
      }, 1200);
    }, 800);
  };

  const handleDemoUpgrade = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setCompleted(true);
      setTimeout(() => {
        onSuccess(currentPlan.id);
        setCompleted(false);
        onClose();
      }, 800);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-emerald-200 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-amber-400 text-amber-950 text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
              Mock Payment Gateway
            </span>
          </div>
          <h2 className="font-serif font-bold text-2xl">Confirm Upgrade to Premium</h2>
          <p className="text-emerald-100 text-xs mt-1">
            Frontend Prototype · No real charges will be made.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Plan Selection */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2 block">
              Choose Plan
            </label>
            <div className="grid grid-cols-2 gap-3">
              {MOCK_PLANS.filter((p) => p.price > 0).map((plan) => (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => setSelectedPlanId(plan.id)}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    selectedPlanId === plan.id
                      ? "border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-600/30"
                      : "border-stone-200 hover:border-stone-300 bg-stone-50/50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-sm text-stone-900">{plan.name}</span>
                    {plan.badge && (
                      <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded-full">
                        {plan.badge}
                      </span>
                    )}
                  </div>
                  <p className="font-serif font-bold text-lg text-emerald-800">{plan.formattedPrice}</p>
                  <p className="text-[11px] text-stone-500">{plan.billingCycleText}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2 block">
              Phương thức thanh toán
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod("vnpay")}
                className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                  paymentMethod === "vnpay"
                    ? "border-blue-600 bg-blue-50 text-blue-900 ring-2 ring-blue-500/20"
                    : "border-stone-200 text-stone-600 hover:bg-stone-50"
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                VNPay Gateway
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                  paymentMethod === "card"
                    ? "border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20"
                    : "border-stone-200 text-stone-600 hover:bg-stone-50"
                }`}
              >
                <CreditCard className="w-4 h-4 text-emerald-700" />
                Thẻ Quốc Tế (Visa)
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("momo")}
                className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                  paymentMethod === "momo"
                    ? "border-pink-600 bg-pink-50 text-pink-900 ring-2 ring-pink-500/20"
                    : "border-stone-200 text-stone-600 hover:bg-stone-50"
                }`}
              >
                <QrCode className="w-4 h-4 text-pink-600" />
                Ví MoMo
              </button>
            </div>
          </div>

          {/* Features preview */}
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4">
            <p className="text-xs font-semibold text-stone-700 mb-2 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Đặc quyền gói {currentPlan.name}:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-stone-600">
              {currentPlan.features.slice(0, 4).map((f) => (
                <li key={f} className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Error Message if VNPay not configured */}
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-2 flex-1">
                <p>{errorMessage}</p>
                <button
                  type="button"
                  onClick={handleDemoUpgrade}
                  disabled={processing || completed}
                  className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs cursor-pointer transition-colors"
                >
                  Kích hoạt thử nghiệm (Demo)
                </button>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="pt-2">
            <button
              onClick={handleConfirm}
              disabled={processing || completed}
              className={`w-full h-12 rounded-2xl text-white font-semibold text-base shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 ${
                paymentMethod === "vnpay"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-emerald-700 hover:bg-emerald-800"
              }`}
            >
              {completed ? (
                <>
                  <Check className="w-5 h-5 text-emerald-300 animate-in zoom-in" />
                  <span>Nâng cấp thành công!</span>
                </>
              ) : processing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>
                    {paymentMethod === "vnpay" ? "Đang kết nối cổng VNPay..." : "Đang xử lý giao dịch..."}
                  </span>
                </>
              ) : paymentMethod === "vnpay" ? (
                <>
                  <ShieldCheck className="w-5 h-5 text-white" />
                  <span>Thanh toán VNPay · {currentPlan.formattedPrice}</span>
                  <ExternalLink className="w-4 h-4 text-blue-200" />
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5 text-emerald-200" />
                  <span>Xác nhận thanh toán · {currentPlan.formattedPrice}</span>
                </>
              )}
            </button>
            <p className="text-[11px] text-center text-stone-400 mt-2">
              {paymentMethod === "vnpay"
                ? "Giao dịch được bảo mật và xử lý trực tiếp qua Cổng thanh toán điện tử VNPay."
                : "Mô phỏng thanh toán trực tiếp trên môi trường thử nghiệm."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
