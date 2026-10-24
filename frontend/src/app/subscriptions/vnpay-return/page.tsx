"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, XCircle, Loader2, ArrowRight, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { apiClient } from "@/lib/apiClient";
import { subscriptionService } from "@/features/subscription/services/subscriptionService";

function VNPayReturnContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("Đang xử lý kết quả thanh toán từ VNPay...");
  const [txnRef, setTxnRef] = useState<string | null>(null);

  useEffect(() => {
    const paramsObj: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      paramsObj[key] = value;
    });

    const ref = searchParams.get("vnp_TxnRef");
    setTxnRef(ref);

    // Call backend endpoint: GET /subscriptions/vnpay-return
    subscriptionService
      .verifyVnpayReturn(paramsObj)
      .then((res) => {
        // Chỉ tin kết quả backend đã kiểm chữ ký; tự gõ vnp_ResponseCode=00 lên URL không được tính.
        if (res?.status === "success") {
          setSuccess(true);
          setMessage("Giao dịch thanh toán Premium thành công! Tài khoản của bạn đã được kích hoạt.");
          subscriptionService.setPremiumActive(res?.premium_until, res?.txn_ref || ref);
        } else {
          setSuccess(false);
          setMessage(
            res?.status === "invalid"
              ? "Chữ ký giao dịch không hợp lệ, không thể xác thực."
              : "Giao dịch không thành công hoặc đã bị hủy bởi người dùng."
          );
        }
      })
      .catch((err) => {
        // Backend lỗi thì KHÔNG coi là thành công; người dùng tải lại trang để xác nhận lại.
        setSuccess(false);
        setMessage(err?.message || "Không thể xác thực giao dịch thanh toán, vui lòng tải lại trang.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchParams]);

  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <Card className="p-8 text-center border-stone-200 shadow-sm">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-10 space-y-4">
            <Loader2 className="w-12 h-12 text-emerald-600 animate-spin" />
            <p className="text-base font-medium text-stone-700">{message}</p>
            <p className="text-xs text-stone-400">Vui lòng không đóng trình duyệt...</p>
          </div>
        ) : success ? (
          <div className="flex flex-col items-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 animate-in zoom-in">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-stone-900">Thanh toán thành công!</h1>
              <p className="text-stone-600 text-sm mt-2">{message}</p>
              {txnRef && (
                <p className="text-xs text-stone-400 mt-1">Mã tham chiếu: <span className="font-mono text-stone-600">{txnRef}</span></p>
              )}
            </div>

            <div className="p-4 bg-emerald-50/60 border border-emerald-100 rounded-2xl w-full text-left flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div className="text-xs text-emerald-900">
                <p className="font-bold">Quyền lợi Premium đã sẵn sàng</p>
                <p className="text-emerald-700 mt-0.5">Bạn có thể tạo thực đơn AI không giới hạn và xuất danh sách mua sắm tự động ngay bây giờ.</p>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 w-full">
              <Link
                href="/planner"
                className="flex-1 h-11 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm flex items-center justify-center gap-1.5 transition-colors"
              >
                Tạo thực đơn ngay
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/me"
                className="flex-1 h-11 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-sm flex items-center justify-center transition-colors"
              >
                Về trang cá nhân
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 animate-in zoom-in">
              <XCircle className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-stone-900">Thanh toán không thành công</h1>
              <p className="text-stone-600 text-sm mt-2">{message}</p>
              {txnRef && (
                <p className="text-xs text-stone-400 mt-1">Mã tham chiếu: <span className="font-mono text-stone-600">{txnRef}</span></p>
              )}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 w-full">
              <Link
                href="/me"
                className="flex-1 h-11 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm flex items-center justify-center transition-colors"
              >
                Thử lại gói Premium
              </Link>
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 h-11 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-sm flex items-center justify-center transition-colors cursor-pointer"
              >
                Quay lại
              </button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

export default function VNPayReturnPage() {
  return (
    <AppShell>
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-[50vh]">
            <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
          </div>
        }
      >
        <VNPayReturnContent />
      </Suspense>
    </AppShell>
  );
}
