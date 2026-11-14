"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { XCircle, ArrowLeft, RefreshCw, Home, Loader2 } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";

function CancelPaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [countdown, setCountdown] = useState(3);
  const [targetUrl, setTargetUrl] = useState<string>("/planner");

  const orderCode = searchParams.get("orderCode") || searchParams.get("id");

  useEffect(() => {
    let returnUrl = "/planner";
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("prePaymentUrl");
      if (saved && !saved.includes("/subscriptions/")) {
        returnUrl = saved;
      }
    }
    setTargetUrl(returnUrl);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push(returnUrl);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  const handleGoBack = () => {
    if (targetUrl) {
      router.push(targetUrl);
    } else {
      window.history.back();
    }
  };

  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <Card className="p-8 text-center border-stone-200 shadow-sm rounded-3xl">
        <div className="flex flex-col items-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 animate-in zoom-in">
            <XCircle className="w-10 h-10" />
          </div>

          <div>
            <h1 className="text-2xl font-serif font-bold text-stone-900">
              Bạn đã hủy thanh toán
            </h1>
            <p className="text-stone-600 text-sm mt-2">
              Giao dịch thanh toán gói Premium đã được hủy thành công. Tài khoản của bạn chưa bị trừ tiền.
            </p>
            {orderCode && (
              <p className="text-xs text-stone-400 mt-1">
                Mã giao dịch: <span className="font-mono text-stone-600">#{orderCode}</span>
              </p>
            )}
          </div>

          <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-2xl w-full text-center">
            <p className="text-xs text-stone-600">
              Tự động quay lại trang trước trong{" "}
              <span className="font-bold text-emerald-700 text-sm">{countdown}</span> giây...
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 w-full">
            <button
              type="button"
              onClick={handleGoBack}
              className="flex-1 h-11 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Quay lại trang trước
            </button>
            <Link
              href="/"
              className="h-11 px-5 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 font-semibold text-sm flex items-center justify-center gap-1.5 transition-colors"
            >
              <Home className="w-4 h-4 text-stone-400" />
              Về trang chủ
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function CancelPaymentPage() {
  return (
    <AppShell showRightRail={false}>
      <Suspense
        fallback={
          <div className="min-h-[50vh] flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-emerald-700 animate-spin" />
          </div>
        }
      >
        <CancelPaymentContent />
      </Suspense>
    </AppShell>
  );
}
