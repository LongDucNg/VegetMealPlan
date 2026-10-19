"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AlertCircle, ArrowRight, X } from "lucide-react";
import { useAuth } from "@/features/auth";
import { useProfile } from "@/features/profile/hooks/useProfile";

const FIELD_LABEL_MAP: Record<string, string> = {
  height_cm: "chiều cao",
  weight_kg: "cân nặng",
  age: "độ tuổi",
  gender: "giới tính",
  activity_level: "mức độ vận động",
  diet_type: "chế độ ăn chay",
  current_goal_id: "mục tiêu",
};

export function ProfileIncompleteBanner() {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();
  const { profile } = useProfile();
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.sessionStorage.getItem("dismissed_profile_banner") === "true") {
      setDismissed(true);
    }
  }, []);

  // Không hiển thị nếu chưa đăng nhập, đã đóng, hoặc đang ở trang /me/settings
  if (!isAuthenticated || dismissed || pathname === "/me/settings") {
    return null;
  }

  // Nếu profile_complete rõ ràng là true thì không hiện
  if (profile?.profile_complete === true) return null;

  // Nếu profile đã có đủ height và weight và không có missing_profile_fields thì coi như đầy đủ
  const hasBasicMetrics =
    Number(profile?.height) > 0 && Number(profile?.weight) > 0 && Number(profile?.age) > 0;
  if (profile?.profile_complete === undefined && hasBasicMetrics) {
    return null;
  }

  const missingFields = profile?.missing_profile_fields || [];
  const missingText =
    missingFields.length > 0
      ? missingFields.map((f) => FIELD_LABEL_MAP[f] || f).join(", ")
      : "chiều cao, cân nặng, độ tuổi, mục tiêu dinh dưỡng";

  const handleUpdateClick = () => {
    setDismissed(true);
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("dismissed_profile_banner", "true");
    }
    router.push("/me/settings");
  };

  const handleDismiss = () => {
    setDismissed(true);
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("dismissed_profile_banner", "true");
    }
  };

  return (
    <div className="w-full mb-6 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="p-4 sm:p-4.5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-amber-950">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-700 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
            <AlertCircle className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-amber-900">
              Hãy cập nhật hồ sơ để nhận thực đơn chính xác
            </h4>
            <p className="text-xs text-amber-800/90 mt-0.5">
              Hồ sơ của bạn còn thiếu <span className="font-semibold text-amber-950">{missingText}</span>.
              Hệ thống cần các chỉ số này để tính calo chuẩn và lập thực đơn khoa học.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          <button
            type="button"
            onClick={handleUpdateClick}
            className="h-9 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            Cập nhật ngay
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleDismiss}
            className="p-1.5 rounded-lg text-amber-700/70 hover:text-amber-900 hover:bg-amber-100/50 transition-colors cursor-pointer"
            title="Đóng thông báo"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
