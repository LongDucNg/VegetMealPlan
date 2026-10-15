"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Leaf, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { authService, useAuth } from "@/features/auth";

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshMe } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const code = searchParams.get("code");
    const errParam = searchParams.get("error");

    if (errParam) {
      if (errParam === "account_locked") {
        setError("Tài khoản của bạn đã bị khóa.");
      } else {
        setError("Đăng nhập bằng Google không thành công.");
      }
      return;
    }

    if (!code) {
      setError("Không tìm thấy mã xác thực Google.");
      return;
    }

    authService
      .exchangeGoogleCode(code)
      .then(async (res) => {
        await refreshMe();
        if (res.user?.role?.toLowerCase() === "admin") {
          router.replace("/admin");
        } else {
          router.replace("/me");
        }
      })
      .catch((err) => {
        setError(err?.message || "Xác thực Google thất bại.");
      });
  }, [searchParams, router, refreshMe]);

  return (
    <Card className="max-w-md w-full p-8 text-center shadow-sm">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-sm flex items-center justify-center text-white mb-4 mx-auto">
        <Leaf className="w-6 h-6 text-white" strokeWidth={1.75} />
      </div>

      {error ? (
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 text-red-600 font-semibold text-lg">
            <AlertCircle className="w-5 h-5" />
            Đăng nhập thất bại
          </div>
          <p className="text-sm text-stone-600">{error}</p>
          <button
            onClick={() => router.push("/login")}
            className="mt-4 px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors"
          >
            Quay lại đăng nhập
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-center gap-2 text-stone-800 font-semibold text-lg">
            <Loader2 className="w-5 h-5 animate-spin text-emerald-600" />
            Đang xác thực Google...
          </div>
          <p className="text-sm text-stone-500">
            Vui lòng đợi giây lát trong khi chúng tôi chuẩn bị tài khoản cho bạn.
          </p>
        </div>
      )}
    </Card>
  );
}

export default function GoogleCallbackPage() {
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
      <Suspense
        fallback={
          <Card className="max-w-md w-full p-8 text-center shadow-sm">
            <Loader2 className="w-6 h-6 animate-spin text-emerald-600 mx-auto" />
            <p className="text-sm text-stone-500 mt-3">Đang tải...</p>
          </Card>
        }
      >
        <CallbackContent />
      </Suspense>
    </div>
  );
}
