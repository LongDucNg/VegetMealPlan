"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Mail,
  MailCheck,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { useAuth, authService } from "@/features/auth";
import { ApiError } from "@/lib/apiClient";

const RESEND_COOLDOWN_SECONDS = 60;

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { verifyEmail } = useAuth();

  // ?sent=1: vừa đăng ký hoặc vừa đăng nhập khi chưa xác thực -> backend đã gửi mã, bắt đầu đếm ngược luôn
  const justSent = searchParams.get("sent") === "1";

  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [otpCode, setOtpCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [infoMsg, setInfoMsg] = useState<string | null>(
    justSent ? "Mã xác thực 6 số đã được gửi tới email của bạn. Kiểm tra cả mục Spam/Quảng cáo nếu chưa thấy." : null
  );
  const [countdown, setCountdown] = useState<number>(justSent ? RESEND_COOLDOWN_SECONDS : 0);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email.trim()) {
      setErrorMsg("Vui lòng nhập email bạn đã dùng để đăng ký.");
      return;
    }
    if (otpCode.length !== 6) {
      setErrorMsg("Vui lòng nhập đủ 6 chữ số mã xác thực.");
      return;
    }

    setIsLoading(true);
    try {
      await verifyEmail({ email: email.trim(), code: otpCode });
      // Xác thực xong là đã đăng nhập: chuyển sang trang cá nhân để hoàn thiện hồ sơ
      router.push("/me");
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        if (err.code === "AUTH_OTP_INVALID") {
          setErrorMsg("Mã xác thực không đúng. Vui lòng kiểm tra lại email.");
        } else if (err.code === "AUTH_OTP_EXPIRED") {
          setErrorMsg("Mã đã hết hạn (hiệu lực 10 phút). Bấm \"Gửi lại mã\" để nhận mã mới.");
        } else if (err.code === "AUTH_OTP_TOO_MANY_ATTEMPTS") {
          setErrorMsg("Bạn đã nhập sai quá 5 lần. Bấm \"Gửi lại mã\" để nhận mã mới.");
        } else {
          setErrorMsg(err.message || "Xác thực không thành công.");
        }
      } else {
        setErrorMsg("Lỗi kết nối máy chủ, vui lòng thử lại.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (countdown > 0 || isResending) return;
    setErrorMsg(null);
    if (!email.trim()) {
      setErrorMsg("Vui lòng nhập email bạn đã dùng để đăng ký.");
      return;
    }

    setIsResending(true);
    try {
      const res = await authService.resendVerification(email.trim());
      setInfoMsg(res?.message || "Mã xác thực mới đã được gửi tới email của bạn.");
      setOtpCode("");
      setCountdown(res?.resend_after_seconds || RESEND_COOLDOWN_SECONDS);
    } catch (err: unknown) {
      if (err instanceof ApiError && (err.code === "AUTH_OTP_RATE_LIMITED" || err.status === 429)) {
        setErrorMsg("Bạn yêu cầu gửi mã quá nhiều lần. Vui lòng đợi ít phút rồi thử lại.");
      } else if (err instanceof ApiError) {
        setErrorMsg(err.message || "Không thể gửi lại mã lúc này.");
      } else {
        setErrorMsg("Lỗi kết nối máy chủ.");
      }
    } finally {
      setIsResending(false);
    }
  };

  return (
    <AppShell showRightRail={false}>
      <div className="w-full flex justify-center py-10 px-4">
        <Card className="max-w-md w-full p-8 shadow-sm">
          <div className="flex flex-col items-center text-center mb-6 select-none">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-sm flex items-center justify-center text-white mb-3">
              <MailCheck className="w-6 h-6 text-white" strokeWidth={1.75} />
            </div>
            <h1 className="font-serif font-bold text-2xl text-stone-900 tracking-tight">
              Xác thực email
            </h1>
            <p className="text-sm text-stone-500 mt-1">
              Nhập mã 6 số trong email để kích hoạt tài khoản VeggieHub.
            </p>
          </div>

          {errorMsg && (
            <div className="mb-5 flex items-start gap-2.5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium">{errorMsg}</div>
            </div>
          )}

          {infoMsg && !errorMsg && (
            <div className="mb-5 flex items-start gap-2.5 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs leading-relaxed animate-in fade-in duration-200">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
              <div className="flex-1">{infoMsg}</div>
            </div>
          )}

          <form onSubmit={handleVerify} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                Email đăng ký
              </label>
              <Input
                type="email"
                required
                icon={<Mail className="w-4 h-4" />}
                placeholder="vidu@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="text-center">
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2">
                Mã xác thực 6 chữ số
              </label>
              <input
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                required
                maxLength={6}
                autoFocus
                placeholder="------"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                disabled={isLoading}
                className="w-full h-14 bg-stone-50 border-2 border-stone-200 rounded-2xl text-center font-mono font-bold text-2xl tracking-[0.5em] text-stone-900 focus:bg-white focus:border-emerald-600 focus:outline-none transition-all shadow-xs"
              />
              <p className="text-[11px] text-stone-400 mt-2">Mã có hiệu lực 10 phút và chỉ dùng được một lần.</p>
            </div>

            <div className="flex justify-end text-xs px-1">
              {countdown > 0 ? (
                <span className="text-stone-400">Gửi lại mã sau {countdown}s</span>
              ) : (
                <button
                  type="button"
                  disabled={isResending}
                  onClick={handleResend}
                  className="font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className={`w-3 h-3 ${isResending ? "animate-spin" : ""}`} />
                  Gửi lại mã
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading || otpCode.length !== 6}
              className="w-full h-11 rounded-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white text-base font-semibold transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Đang xác thực...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  Xác thực & đăng nhập
                </>
              )}
            </button>

            <div className="text-center pt-1">
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-emerald-700 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Quay lại đăng nhập
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </AppShell>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <AppShell showRightRail={false}>
          <div className="w-full flex justify-center py-20">
            <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
          </div>
        </AppShell>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
