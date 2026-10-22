"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  KeyRound,
  Leaf,
  Loader2,
  Lock,
  Mail,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { authService } from "@/features/auth";
import { ApiError } from "@/lib/apiClient";

function ForgotPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get("email") || "";

  // 1: Nhập email gửi OTP
  // 2: Nhập mã OTP 6 số
  // 3: Nhập mật khẩu mới (chỉ hiện sau khi đã nhập xong mã OTP)
  // 4: Thành công
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form states
  const [email, setEmail] = useState(initialEmail);
  const [otpCode, setOtpCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Statuses
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [infoMsg, setInfoMsg] = useState<string | null>(null);

  // 60-second cooldown timer
  const [countdown, setCountdown] = useState<number>(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  // Bước 1: Gửi OTP tới email thật
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setInfoMsg(null);

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setErrorMsg("Vui lòng nhập địa chỉ email của bạn.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await authService.forgotPassword({ email: cleanEmail });
      setInfoMsg(
        res?.message ||
        "Mã OTP 6 số đã được gửi tới hộp thư của bạn. Vui lòng kiểm tra email (hoặc mục Spam/Rác)."
      );
      setStep(2);
      setCountdown(res?.resend_after_seconds || 60);
    } catch (err: any) {
      if (err instanceof ApiError) {
        if (err.code === "AUTH_OTP_RATE_LIMITED" || err.status === 429) {
          setErrorMsg("Bạn đã gửi yêu cầu quá nhanh. Vui lòng đợi ít phút trước khi thử lại.");
        } else {
          setErrorMsg(err.message || "Không thể gửi mã xác minh. Vui lòng thử lại.");
        }
      } else {
        setErrorMsg("Lỗi kết nối máy chủ, vui lòng kiểm tra mạng.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Gửi lại mã OTP
  const handleResendOtp = async () => {
    if (countdown > 0 || isResending) return;
    setErrorMsg(null);
    setIsResending(true);
    try {
      const res = await authService.forgotPassword({ email: email.trim() });
      setInfoMsg(
        res?.message || "Mã xác minh mới đã được gửi tới hộp thư email của bạn."
      );
      setCountdown(res?.resend_after_seconds || 60);
    } catch (err: any) {
      if (err instanceof ApiError) {
        setErrorMsg(err.message || "Không thể gửi lại mã lúc này.");
      } else {
        setErrorMsg("Lỗi kết nối máy chủ.");
      }
    } finally {
      setIsResending(false);
    }
  };

  // Bước 2: Xác nhận đã nhập xong mã OTP 6 số để chuyển sang bước đổi mật khẩu
  const handleConfirmOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const cleanCode = otpCode.trim();
    if (cleanCode.length !== 6) {
      setErrorMsg("Vui lòng nhập đủ 6 chữ số mã xác minh OTP.");
      return;
    }

    // Đã nhập xong mã OTP -> Chuyển sang màn hình nhập mật khẩu mới
    setStep(3);
  };

  // Bước 3: Đổi mật khẩu mới
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (newPassword.length < 8) {
      setErrorMsg("Mật khẩu mới phải có ít nhất 8 ký tự.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg("Mật khẩu xác nhận không khớp với mật khẩu mới.");
      return;
    }

    setIsLoading(true);
    try {
      await authService.resetPassword({
        email: email.trim(),
        code: otpCode.trim(),
        new_password: newPassword,
      });

      setStep(4);
      setTimeout(() => {
        router.push("/login?reset=success");
      }, 2500);
    } catch (err: any) {
      if (err instanceof ApiError) {
        if (err.code === "AUTH_OTP_INVALID") {
          setErrorMsg("Mã OTP không chính xác. Vui lòng kiểm tra lại hộp thư.");
        } else if (err.code === "AUTH_OTP_EXPIRED") {
          setErrorMsg("Mã OTP đã hết hạn (hiệu lực 10 phút). Vui lòng yêu cầu gửi mã mới.");
        } else if (err.code === "AUTH_OTP_TOO_MANY_ATTEMPTS") {
          setErrorMsg("Bạn đã nhập sai mã quá 5 lần. Vui lòng yêu cầu gửi mã mới.");
        } else {
          setErrorMsg(err.message || "Đặt lại mật khẩu thất bại.");
        }
      } else {
        setErrorMsg("Lỗi kết nối máy chủ, vui lòng thử lại.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppShell showRightRail={false}>
      <div className="w-full flex justify-center py-10 px-4">
        <Card className="max-w-md w-full p-8 shadow-sm">
          {/* Logo Header */}
          <div className="flex flex-col items-center text-center mb-6 select-none">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-sm flex items-center justify-center text-white mb-3">
              {step === 4 ? (
                <CheckCircle2 className="w-6 h-6 text-white" strokeWidth={2} />
              ) : step === 3 ? (
                <Lock className="w-6 h-6 text-white" strokeWidth={1.75} />
              ) : step === 2 ? (
                <KeyRound className="w-6 h-6 text-white" strokeWidth={1.75} />
              ) : (
                <Leaf className="w-6 h-6 text-white" strokeWidth={1.75} />
              )}
            </div>
            <h1 className="font-serif font-bold text-2xl text-stone-900 tracking-tight">
              {step === 4
                ? "Thành công!"
                : step === 3
                  ? "Đặt mật khẩu mới"
                  : step === 2
                    ? "Nhập mã xác minh OTP"
                    : "Quên mật khẩu?"}
            </h1>

          </div>

          {/* Stepper Indicator */}
          {step <= 3 && (
            <div className="flex items-center justify-center gap-2 mb-6">
              <div
                className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-colors ${step === 1
                    ? "bg-emerald-600 text-white"
                    : "bg-emerald-100 text-emerald-800"
                  }`}
              >
                1
              </div>
              <div
                className={`w-10 h-0.5 transition-colors ${step >= 2 ? "bg-emerald-600" : "bg-stone-200"
                  }`}
              />
              <div
                className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-colors ${step === 2
                    ? "bg-emerald-600 text-white"
                    : step > 2
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-stone-100 text-stone-400"
                  }`}
              >
                2
              </div>
              <div
                className={`w-10 h-0.5 transition-colors ${step >= 3 ? "bg-emerald-600" : "bg-stone-200"
                  }`}
              />
              <div
                className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-colors ${step === 3
                    ? "bg-emerald-600 text-white"
                    : "bg-stone-100 text-stone-400"
                  }`}
              >
                3
              </div>
            </div>
          )}

          {/* Error Banner */}
          {errorMsg && (
            <div className="mb-5 flex items-start gap-2.5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium">{errorMsg}</div>
            </div>
          )}

          {/* Info Banner */}
          {infoMsg && !errorMsg && step === 2 && (
            <div className="mb-5 flex items-start gap-2.5 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs leading-relaxed animate-in fade-in duration-200">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
              <div className="flex-1">{infoMsg}</div>
            </div>
          )}

          {/* BƯỚC 1: Nhập email */}
          {step === 1 && (
            <form onSubmit={handleRequestOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                  Địa chỉ Email tài khoản
                </label>
                <Input
                  type="email"
                  required
                  icon={<Mail className="w-4 h-4" />}
                  placeholder="vidu@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  autoFocus
                />
                <p className="text-[11px] text-stone-400 mt-1.5">
                  Mã OTP 6 số sẽ được gửi trực tiếp đến hộp thư email này (hiệu lực 10 phút).
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 rounded-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-70 text-white text-base font-semibold transition-colors cursor-pointer shadow-sm mt-3 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Đang gửi mã tới email...
                  </>
                ) : (
                  <>
                    Gửi mã xác minh tới Email
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center pt-3">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-emerald-700 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Quay lại đăng nhập
                </Link>
              </div>
            </form>
          )}

          {/* BƯỚC 2: Nhập mã xác minh OTP (Chỉ có ô OTP) */}
          {step === 2 && (
            <form onSubmit={handleConfirmOtp} className="space-y-5">
              <div className="text-center">
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2">
                  Mã xác minh 6 chữ số
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  autoFocus
                  placeholder="------"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                  className="w-full h-14 bg-stone-50 border-2 border-stone-200 rounded-2xl text-center font-mono font-bold text-2xl tracking-[0.5em] text-stone-900 focus:bg-white focus:border-emerald-600 focus:outline-none transition-all shadow-xs"
                />
                <p className="text-[11px] text-stone-400 mt-2">
                  Nhập mã 6 số trong email bạn vừa nhận
                </p>
              </div>

              <div className="flex items-center justify-between text-xs pt-1 px-1">
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setErrorMsg(null);
                  }}
                  className="text-stone-500 hover:text-emerald-700 underline underline-offset-2 cursor-pointer"
                >
                  Đổi email khác
                </button>

                <div>
                  {countdown > 0 ? (
                    <span className="text-stone-400">Gửi lại sau {countdown}s</span>
                  ) : (
                    <button
                      type="button"
                      disabled={isResending}
                      onClick={handleResendOtp}
                      className="font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
                    >
                      <RefreshCw
                        className={`w-3 h-3 ${isResending ? "animate-spin" : ""}`}
                      />
                      Gửi lại mã
                    </button>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={otpCode.length !== 6}
                className="w-full h-11 rounded-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white text-base font-semibold transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-2"
              >
                Xác nhận mã & Tiếp tục
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-2">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-emerald-700 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Hủy và quay lại đăng nhập
                </Link>
              </div>
            </form>
          )}

          {/* BƯỚC 3: Nhập mật khẩu mới (Chỉ hiển thị sau khi đã nhập xong mã OTP) */}
          {step === 3 && (
            <form onSubmit={handleResetPassword} className="space-y-4">

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                  Mật khẩu mới
                </label>
                <Input
                  type="password"
                  required
                  autoFocus
                  icon={<Lock className="w-4 h-4" />}
                  placeholder="Tối thiểu 8 ký tự"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                  Xác nhận mật khẩu mới
                </label>
                <Input
                  type="password"
                  required
                  icon={<Lock className="w-4 h-4" />}
                  placeholder="Nhập lại mật khẩu mới"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="pt-1 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setStep(2);
                    setErrorMsg(null);
                  }}
                  className="h-11 px-4 rounded-full border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Quay lại OTP
                </button>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 h-11 rounded-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-70 text-white text-sm font-semibold transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Đang đổi mật khẩu...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      Lưu mật khẩu mới
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* BƯỚC 4: Thành công */}
          {step === 4 && (
            <div className="text-center space-y-4 py-3">
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-xs text-emerald-800 leading-relaxed">
                Mật khẩu của bạn đã được đổi thành công! Toàn bộ các thiết bị đang đăng nhập trước đây đã được đăng xuất an toàn.
              </div>
              <p className="text-xs text-stone-400">
                Đang tự động chuyển hướng đến trang Đăng nhập...
              </p>
              <button
                type="button"
                onClick={() => router.push("/login?reset=success")}
                className="w-full h-11 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-base font-semibold transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-2"
              >
                Đăng nhập ngay
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </Card>
      </div>
    </AppShell>
  );
}

export default function ForgotPasswordPage() {
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
      <ForgotPasswordContent />
    </Suspense>
  );
}
