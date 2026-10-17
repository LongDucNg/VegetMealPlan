"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Leaf,
  Loader2,
  Lock,
  Mail,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { useAuth, authService } from "@/features/auth";
import { ApiError } from "@/lib/apiClient";

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resetSuccess = searchParams.get("reset") === "success";

  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);

    try {
      const res = await login({ email, password });
      if (res?.user?.role?.toLowerCase() === "admin") {
        router.push("/admin");
      } else {
        router.push("/me");
      }
    } catch (err: any) {
      if (err instanceof ApiError) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("Không thể đăng nhập. Vui lòng kiểm tra lại thông tin kết nối.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = authService.getGoogleLoginUrl();
  };

  const forgotPasswordHref = email.trim()
    ? `/forgot-password?email=${encodeURIComponent(email.trim())}`
    : "/forgot-password";

  return (
    <AppShell showRightRail={false}>
      <div className="w-full flex justify-center py-10 px-4">
        <Card className="max-w-md w-full p-8 shadow-sm">
          {/* Logo Brand Header */}
          <div className="flex flex-col items-center text-center mb-7 select-none">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-sm flex items-center justify-center text-white mb-3">
              <Leaf className="w-6 h-6 text-white" strokeWidth={1.75} />
            </div>
            <h1 className="font-serif font-bold text-2xl text-stone-900 tracking-tight">
              Chào mừng trở lại VeggieHub
            </h1>
            <p className="text-sm text-stone-500 mt-1">
              Đăng nhập để xem thực đơn, món ăn yêu thích và kết nối cộng đồng
            </p>
          </div>

          {/* Reset Password Success Banner */}
          {resetSuccess && !errorMsg && (
            <div className="mb-5 flex items-start gap-2.5 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-sm animate-in fade-in duration-200">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
              <div className="flex-1 font-medium text-xs leading-relaxed">
                Đặt lại mật khẩu thành công! Vui lòng đăng nhập bằng mật khẩu mới của bạn.
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

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                Email
              </label>
              <Input
                type="email"
                required
                icon={<Mail className="w-4 h-4" />}
                placeholder="ban@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600">
                  Mật khẩu
                </label>
              </div>
              <Input
                type="password"
                required
                icon={<Lock className="w-4 h-4" />}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
              <div className="flex justify-end mt-2">
                <Link
                  href={forgotPasswordHref}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline underline-offset-4 cursor-pointer transition-all duration-200"
                >
                  Quên mật khẩu?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 rounded-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-70 text-white text-base font-semibold transition-colors cursor-pointer shadow-sm mt-2 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Đang đăng nhập...
                </>
              ) : (
                <>
                  Đăng nhập
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-stone-400 font-semibold tracking-wider">
                Hoặc tiếp tục với
              </span>
            </div>
          </div>

          {/* Google Login Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full h-11 rounded-full border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-sm font-semibold transition-all flex items-center justify-center gap-3 shadow-xs cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            Đăng nhập với Google
          </button>

          {/* Footer Link */}
          <div className="mt-6 pt-5 border-t border-stone-100 text-center text-sm text-stone-500">
            Chưa có tài khoản VeggieHub?{" "}
            <Link
              href="/register"
              className="font-semibold text-emerald-700 hover:text-emerald-800"
            >
              Đăng ký ngay
            </Link>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}

export default function LoginPage() {
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
      <LoginFormContent />
    </Suspense>
  );
}
