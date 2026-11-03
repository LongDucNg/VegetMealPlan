"use client";

import React from "react";
import Link from "next/link";
import { Lock, ShieldAlert, ArrowLeft } from "lucide-react";
import { Card } from "./Card";

export interface LockedStateProps {
  reason?: "guest" | "forbidden";
  title?: string;
  description?: string;
  className?: string;
}

export function LockedState({
  reason = "guest",
  title,
  description,
  className = "",
}: LockedStateProps) {
  if (reason === "forbidden") {
    return (
      <Card className={`max-w-2xl mx-auto my-12 text-center p-10 select-none ${className}`}>
        <div className="w-16 h-16 rounded-full bg-red-50 text-red-700 flex items-center justify-center mx-auto mb-5 shadow-xs">
          <ShieldAlert className="w-8 h-8" strokeWidth={1.75} />
        </div>

        <h2 className="font-serif font-bold text-[30px] text-stone-900 tracking-tight leading-tight mb-3">
          {title || "Yêu cầu quyền Quản trị viên (Admin)"}
        </h2>

        <p className="text-base text-stone-600 max-w-md mx-auto leading-relaxed mb-8">
          {description ||
            "Khu vực này chỉ dành riêng cho quản trị viên VeggieHub. Vui lòng đăng nhập bằng tài khoản Quản trị viên để truy cập."}
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link
            href="/"
            className="h-10 px-6 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-base font-semibold inline-flex items-center gap-2 transition-colors shadow-sm cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={2} />
            <span>Về trang chủ</span>
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <Card className={`max-w-2xl mx-auto my-12 text-center p-10 select-none ${className}`}>
      <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-5 shadow-xs">
        <Lock className="w-8 h-8" strokeWidth={1.75} />
      </div>

      <h2 className="font-serif font-bold text-[30px] text-stone-900 tracking-tight leading-tight mb-3">
        {title || "Đăng nhập để mở khóa tính năng này"}
      </h2>

      <p className="text-base text-stone-600 max-w-md mx-auto leading-relaxed mb-8">
        {description ||
          "Kế hoạch thực đơn chay cá nhân hoá theo tuần và tháng, tính toán calo BMR/TDEE và tự động loại trừ nguyên liệu dị ứng là tính năng dành riêng cho thành viên VeggieHub. Vui lòng đăng nhập hoặc đăng ký tài khoản để trải nghiệm."}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/register"
          className="h-11 px-7 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-base font-semibold inline-flex items-center justify-center transition-colors shadow-xs cursor-pointer"
        >
          Đăng ký miễn phí
        </Link>
        <Link
          href="/login"
          className="h-11 px-6 rounded-full text-stone-700 hover:text-stone-900 hover:bg-stone-100 border border-stone-200 text-base font-semibold inline-flex items-center justify-center transition-colors cursor-pointer"
        >
          Đăng nhập ngay
        </Link>
      </div>
    </Card>
  );
}

export function GatedSkeleton() {
  return (
    <div className="max-w-2xl mx-auto my-12 p-10 bg-white border border-stone-200 rounded-[20px] shadow-sm animate-pulse flex flex-col items-center">
      <div className="w-16 h-16 rounded-full bg-stone-100 mb-5" />
      <div className="h-8 w-64 bg-stone-100 rounded-lg mb-3" />
      <div className="h-4 w-96 bg-stone-100 rounded mb-2" />
      <div className="h-4 w-72 bg-stone-100 rounded mb-8" />
      <div className="h-11 w-44 bg-stone-100 rounded-full" />
    </div>
  );
}
