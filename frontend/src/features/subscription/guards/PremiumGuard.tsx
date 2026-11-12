"use client";

import React, { useState } from "react";
import { Sparkles, Check, Crown, ArrowRight, Refrigerator } from "lucide-react";
import { useSubscription } from "../hooks/useSubscription";
import { MockPaymentModal } from "../components/MockPaymentModal";
import { GatedSkeleton } from "@/components/ui/LockedState";

interface PremiumGuardProps {
  children: React.ReactNode;
  feature: "meal-planner" | "ai-chatbot" | "smart-fridge";
  customTitle?: string;
  customDescription?: string;
}

export function PremiumGuard({
  children,
  feature,
  customTitle,
  customDescription,
}: PremiumGuardProps) {
  const { isPremium, purchase, toggle, subscription, isReady } = useSubscription();
  const [modalOpen, setModalOpen] = useState(false);

  if (!isReady) {
    return <GatedSkeleton />;
  }

  if (isPremium) {
    return (
      <div className="relative">
        {/* Subtle premium active status bar for convenience */}
        <div className="mb-4 flex items-center justify-between bg-emerald-50 border border-emerald-200/80 rounded-2xl px-4 py-2 text-xs text-emerald-900 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold flex items-center gap-1.5">
              <Crown className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              Gói Premium đang hoạt động
            </span>
            <span className="text-emerald-700/80 hidden sm:inline">
              · 99.000 VNĐ / tháng
            </span>
          </div>

        </div>
        {children}
      </div>
    );
  }

  // Content for Meal Planner
  if (feature === "meal-planner") {
    return (
      <>
        <div className="max-w-2xl mx-auto my-10 p-8 sm:p-12 bg-white border border-stone-200 rounded-3xl shadow-sm text-center relative overflow-hidden">
          {/* Subtle decorative glow */}
          <div className="absolute -top-16 -right-16 w-40 h-40 bg-amber-200/40 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-emerald-200/40 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto mb-6 shadow-xs">
              <Crown className="w-8 h-8 text-amber-500 fill-amber-500" strokeWidth={1.5} />
            </div>

            <h2 className="font-serif font-bold text-3xl text-stone-900 mb-3 tracking-tight">
              {customTitle || "Mở khóa Kế hoạch Thực đơn Cá nhân hóa"}
            </h2>

            <p className="text-stone-600 text-base max-w-lg mx-auto mb-6">
              {customDescription ||
                "Nhận thực đơn được thiết kế riêng phù hợp với chỉ số cơ thể và lối sống ăn chay của bạn:"}
            </p>

            {/* Feature Checklist */}
            <div className="bg-stone-50 border border-stone-200/90 rounded-2xl p-5 max-w-md mx-auto mb-8 text-left space-y-2.5">
              {[
                "Tính toán chỉ số BMI & vóc dáng của bạn",
                "Nhu cầu calo & dinh dưỡng đa lượng hàng ngày (Mifflin-St Jeor)",
                "Mục tiêu sức khỏe cá nhân (Giảm cân, giữ dáng, tăng cơ)",
                "Trường phái ăn chay của bạn (Thuần chay, Chay có sữa, Chay có trứng, Trứng & Sữa)",
                "Loại trừ dị ứng thực phẩm cụ thể (Đậu phộng, Đậu nành, Gluten,...)",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5 text-sm text-stone-700">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setModalOpen(true)}
                className="w-full sm:w-auto h-12 px-8 rounded-full bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold text-base shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-900 fill-amber-900" />
                Nâng cấp Premium
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>

            <p className="text-xs text-stone-400 mt-4">
              99.000 VNĐ / tháng · Hủy bất cứ lúc nào · Thanh toán mô phỏng
            </p>
          </div>
        </div>

        <MockPaymentModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSuccess={(planId) => purchase(planId)}
        />
      </>
    );
  }

  // Content for Smart Fridge
  if (feature === "smart-fridge") {
    return (
      <>
        <div className="max-w-2xl mx-auto my-10 p-8 sm:p-12 bg-white border border-stone-200 rounded-3xl shadow-sm text-center relative overflow-hidden">
          {/* Subtle decorative glow */}
          <div className="absolute -top-16 -right-16 w-40 h-40 bg-emerald-200/40 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-amber-200/40 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto mb-6 shadow-xs">
              <Refrigerator className="w-8 h-8 text-emerald-600" strokeWidth={1.75} />
            </div>

            <h2 className="font-serif font-bold text-3xl text-stone-900 mb-3 tracking-tight">
              {customTitle || "Quản lý Tủ lạnh & Quét AI Thông minh"}
            </h2>

            <p className="text-stone-600 text-base max-w-lg mx-auto mb-6">
              {customDescription ||
                "Tính năng cao cấp giúp bạn tối ưu hóa thực phẩm sẵn có trong tủ lạnh, chống lãng phí và gợi ý món ăn dinh dưỡng ngay tức thì:"}
            </p>

            {/* Feature Checklist */}
            <div className="bg-stone-50 border border-stone-200/90 rounded-2xl p-5 max-w-md mx-auto mb-8 text-left space-y-2.5">
              {[
                "Quét ảnh tủ lạnh bằng Vision AI tự động nhận diện rau củ, nấm, đậu hũ",
                "Theo dõi số lượng, hạn sử dụng & cảnh báo nguyên liệu sắp hết hạn",
                "Gợi ý công thức nấu ăn khớp nhiều nguyên liệu có sẵn nhất",
                "Tự động đồng bộ với danh sách mua sắm và kế hoạch thực đơn",
                "Bảo vệ sức khỏe bằng cách loại trừ dị ứng và thực phẩm không phù hợp",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5 text-sm text-stone-700">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setModalOpen(true)}
                className="w-full sm:w-auto h-12 px-8 rounded-full bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold text-base shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-900 fill-amber-900" />
                Nâng cấp Premium để sử dụng
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-stone-400 mt-4">
              99.000 VNĐ / tháng · Mở khóa toàn bộ tính năng thông minh VeggieHub
            </p>
          </div>
        </div>

        <MockPaymentModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSuccess={(planId) => purchase(planId)}
        />
      </>
    );
  }

  // Content for AI Chatbot
  return (
    <>
      <div className="max-w-2xl mx-auto my-10 p-8 sm:p-12 bg-white border border-stone-200 rounded-3xl shadow-sm text-center relative overflow-hidden">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto mb-6 shadow-xs">
          <Sparkles className="w-8 h-8 text-emerald-600 fill-emerald-600" />
        </div>

        <h2 className="font-serif font-bold text-3xl text-stone-900 mb-3 tracking-tight">
          Trợ lý AI Dinh dưỡng
        </h2>

        <p className="text-stone-600 text-base max-w-md mx-auto mb-6">
          Tính năng này chỉ dành cho thành viên Premium. Mở khóa tư vấn dinh dưỡng thuần thực vật không giới hạn, được cá nhân hóa theo các chỉ số cơ thể của bạn.
        </p>

        <div className="bg-stone-50 border border-stone-200/90 rounded-2xl p-5 max-w-md mx-auto mb-8 text-left space-y-2.5">
          {[
            "Gợi ý tức thì món ăn cho bữa sáng, trưa, tối dựa trên lượng calo còn lại",
            "Đổi món an toàn theo dị ứng và trường phái ăn chay của bạn",
            "Giải thích chi tiết chỉ số BMI và mục tiêu chuyển hóa",
            "Hướng dẫn tìm nguồn thực phẩm chay Việt Nam & bổ sung vi chất B12",
          ].map((item) => (
            <div key={item} className="flex items-start gap-2.5 text-sm text-stone-700">
              <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3 h-3 stroke-[2.5]" />
              </div>
              <span>{item}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => setModalOpen(true)}
            className="w-full sm:w-auto h-12 px-8 rounded-full bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold text-base shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-900 fill-amber-900" />
            Nâng cấp Premium
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>

        <p className="text-xs text-stone-400 mt-4">
          Trạng thái được lưu trong hệ thống và duy trì khi làm mới trang.
        </p>
      </div>

      <MockPaymentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={(planId) => purchase(planId)}
      />
    </>
  );
}
