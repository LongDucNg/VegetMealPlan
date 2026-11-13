"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";

/** Đường dẫn cũ từ thời dùng VNPay: chuyển tiếp query sang /subscriptions/return (PayOS). */
function VNPayReturnRedirectContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const q = searchParams.toString();
    router.replace(q ? `/subscriptions/return?${q}` : "/subscriptions/return");
  }, [router, searchParams]);

  return (
    <AppShell showRightRail={false}>
      <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-8 h-8 text-emerald-700 animate-spin" />
        <p className="text-xs text-stone-500">Đang chuyển hướng đến trang xác nhận kết quả thanh toán...</p>
      </div>
    </AppShell>
  );
}

function RedirectingFallback() {
  return (
    <AppShell showRightRail={false}>
      <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-8 h-8 text-emerald-700 animate-spin" />
      </div>
    </AppShell>
  );
}

// useSearchParams() phải nằm trong <Suspense>, nếu không `next build` dừng lỗi khi prerender trang này.
export default function VNPayReturnRedirect() {
  return (
    <Suspense fallback={<RedirectingFallback />}>
      <VNPayReturnRedirectContent />
    </Suspense>
  );
}
