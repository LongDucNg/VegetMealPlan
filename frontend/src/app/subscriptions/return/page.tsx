"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, XCircle, Loader2, ArrowRight, ShieldCheck, QrCode } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { subscriptionService } from "@/features/subscription/services/subscriptionService";

function PaymentReturnContent() {
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("Đang xử lý kết quả thanh toán VietQR...");
  const [orderCode, setOrderCode] = useState<string | null>(null);

  useEffect(() => {
    const code = searchParams.get("orderCode") || searchParams.get("vnp_TxnRef");
    const statusParam = searchParams.get("status");
    const isCancelled = searchParams.get("cancel") === "true" || statusParam === "CANCELLED";
    setOrderCode(code);

    if (isCancelled) {
      setSuccess(false);
      setMessage("Giao dịch thanh toán đã bị hủy hoặc chưa hoàn tất.");
      setLoading(false);
      return;
    }

    if (!code) {
      if (statusParam === "PAID") {
        setSuccess(true);
        setMessage("Giao dịch thanh toán Premium thành công! Tài khoản của bạn đã được kích hoạt.");
        subscriptionService.setPremiumActive(null, null);
      } else {
        setSuccess(false);
        setMessage("Không tìm thấy mã đơn hàng cần xác thực.");
      }
      setLoading(false);
      return;
    }

    // Kiểm tra trạng thái giao dịch với Backend
    subscriptionService
      .checkTransactionStatus(code)
      .then((res) => {
        if (res?.status === "success" || statusParam === "PAID") {
          setSuccess(true);
          setMessage("Giao dịch thanh toán Premium qua VietQR thành công! Toàn bộ tính năng đã được kích hoạt.");
          subscriptionService.setPremiumActive(res?.premium_until, res?.txn_ref || code);
        } else if (res?.status === "pending") {
          // Nếu hệ thống đang xử lý, cho thử lại một lần nữa sau 2 giây
          setTimeout(() => {
            subscriptionService
              .checkTransactionStatus(code)
              .then((retry) => {
                if (retry?.status === "success") {
                  setSuccess(true);
                  setMessage("Giao dịch thanh toán Premium qua VietQR thành công!");
                  subscriptionService.setPremiumActive(retry?.premium_until, code);
                } else {
                  setSuccess(false);
                  setMessage("Giao dịch đang chờ xử lý từ ngân hàng. Vui lòng kiểm tra lại sau ít phút.");
                }
              })
              .finally(() => setLoading(false));
          }, 2000);
          return;
        } else {
          setSuccess(false);
          setMessage("Giao dịch không thành công hoặc đã hết hạn.");
        }
      })
      .catch(() => {
        if (statusParam === "PAID") {
          setSuccess(true);
          setMessage("Thanh toán thành công! Gói hội viên Premium đã được kích hoạt.");
          subscriptionService.setPremiumActive(null, code);
        } else {
          setSuccess(false);
          setMessage("Không thể xác thực trạng thái thanh toán. Vui lòng liên hệ hỗ trợ.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchParams]);

  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <Card className="p-8 text-center border-stone-200 shadow-sm rounded-3xl">
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
              {orderCode && (
                <p className="text-xs text-stone-400 mt-1">
                  Mã đơn hàng: <span className="font-mono text-stone-700 font-bold">#{orderCode}</span>
                </p>
              )}
            </div>

            <div className="p-4 bg-emerald-50/60 border border-emerald-100 rounded-2xl w-full text-left flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div className="text-xs text-emerald-900">
                <p className="font-bold">Đặc quyền Premium đã sẵn sàng</p>
                <p className="text-emerald-700 mt-0.5">
                  Bạn có thể tạo thực đơn AI không giới hạn, quét ảnh món ăn và nhận tư vấn chuyên sâu ngay bây giờ.
                </p>
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
                href="/"
                className="h-11 px-5 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 font-semibold text-sm flex items-center justify-center transition-colors"
              >
                Về trang chủ
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 animate-in zoom-in">
              <XCircle className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-stone-900">Thanh toán chưa hoàn tất</h1>
              <p className="text-stone-600 text-sm mt-2">{message}</p>
              {orderCode && (
                <p className="text-xs text-stone-400 mt-1">
                  Mã đơn hàng: <span className="font-mono text-stone-600">#{orderCode}</span>
                </p>
              )}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 w-full">
              <Link
                href="/planner"
                className="flex-1 h-11 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm flex items-center justify-center gap-1.5 transition-colors"
              >
                Thử thanh toán lại
              </Link>
              <Link
                href="/"
                className="h-11 px-5 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 font-semibold text-sm flex items-center justify-center transition-colors"
              >
                Về trang chủ
              </Link>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

export default function PaymentReturnPage() {
  return (
    <AppShell showRightRail={false}>
      <Suspense
        fallback={
          <div className="min-h-[50vh] flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-emerald-700 animate-spin" />
          </div>
        }
      >
        <PaymentReturnContent />
      </Suspense>
    </AppShell>
  );
}

