"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { subscriptionService } from "@/features/subscription/services/subscriptionService";

function SubscriptionsCancelContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [returnUrl, setReturnUrl] = useState<string>("/planner");

  useEffect(() => {
    const paramReturnTo = searchParams.get("return_to");
    const storedReturnTo =
      typeof window !== "undefined"
        ? sessionStorage.getItem("veggie_payment_return_to")
        : null;

    const target = paramReturnTo || storedReturnTo || "/planner";
    setReturnUrl(target);

    // PayOS không gọi webhook khi huỷ: báo backend tra lại để chuyển giao dịch sang "thất bại" thay vì treo "đang chờ".
    const orderCode = searchParams.get("orderCode");
    if (orderCode) subscriptionService.checkTransactionStatus(orderCode).catch(() => {});

    // Tự động chuyển về trang trước đó sau 1.2s
    const timer = setTimeout(() => {
      router.replace(target);
    }, 1200);

    return () => clearTimeout(timer);
  }, [router, searchParams]);

  return (
    <div className="max-w-md mx-auto py-16 px-4">
      <Card className="p-8 text-center border-stone-200 shadow-sm rounded-3xl space-y-5">
        <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto animate-in zoom-in">
          <AlertCircle className="w-7 h-7 text-amber-600" />
        </div>

        <div>
          <h1 className="text-xl font-serif font-bold text-stone-900">
            Giao dịch thanh toán đã hủy
          </h1>
          <p className="text-stone-600 text-xs mt-2 leading-relaxed">
            Bạn đã hủy giao dịch trên cổng thanh toán. Hệ thống đang tự động đưa bạn quay trở về trang trước đó...
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 text-stone-400 text-xs py-1">
          <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
          <span>Đang chuyển hướng...</span>
        </div>

        <div className="pt-2">
          <Link
            href={returnUrl}
            className="w-full h-11 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại trang trước ngay
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default function SubscriptionsCancelPage() {
  return (
    <AppShell showRightRail={false}>
      <Suspense
        fallback={
          <div className="min-h-[50vh] flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-emerald-700 animate-spin" />
          </div>
        }
      >
        <SubscriptionsCancelContent />
      </Suspense>
    </AppShell>
  );
}
