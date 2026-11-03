"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";

export default function VNPayReturnRedirect() {
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
