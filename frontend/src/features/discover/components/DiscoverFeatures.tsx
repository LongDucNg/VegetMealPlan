"use client";

import React from "react";
import Link from "next/link";
import {
  Refrigerator,
  CalendarDays,
  MapPin,
  MessageSquare,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Card } from "@/components/ui/Card";

const FEATURES = [
  {
    title: "Tủ lạnh thông minh & AI Scanner",
    description:
      "Chụp ảnh tủ lạnh để AI nhận diện rau củ, kiểm tra độ tươi và tự động đề xuất món ăn phù hợp với nguyên liệu bạn đang có.",
    href: "/planner/scan",
    badge: "AI Vision",
    icon: Refrigerator,
    color: "emerald",
    bgClass: "from-emerald-500/10 to-teal-500/5 border-emerald-200/80 hover:border-emerald-400",
    iconBg: "bg-emerald-600 text-white",
  },
  {
    title: "Kế hoạch thực đơn khoa học",
    description:
      "Tự động tính toán calo, macro (protein, carb, fat) cho bữa sáng, trưa, tối theo mục tiêu cân nặng và chỉ số TDEE của bạn.",
    href: "/planner",
    badge: "Dinh dưỡng",
    icon: CalendarDays,
    color: "blue",
    bgClass: "from-blue-500/10 to-indigo-500/5 border-blue-200/80 hover:border-blue-400",
    iconBg: "bg-blue-600 text-white",
  },
  {
    title: "Quán ăn chay & Địa điểm lân cận",
    description:
      "Định vị GPS và bản đồ OpenStreetMap tương tác giúp bạn tìm kiếm nhà hàng, quán cơm chay gần vị trí của bạn trong bán kính 2-20km.",
    href: "/shops",
    badge: "Bản đồ GPS",
    icon: MapPin,
    color: "amber",
    bgClass: "from-amber-500/10 to-orange-500/5 border-amber-200/80 hover:border-amber-400",
    iconBg: "bg-amber-600 text-white",
  },
  {
    title: "Diễn đàn ẩm thực thuần chay",
    description:
      "Giao lưu, hỏi đáp và chia sẻ mẹo nấu món chay thơm ngon, bí quyết sống xanh cùng cộng đồng hàng ngàn thành viên VeggieHub.",
    href: "/forum",
    badge: "Cộng đồng",
    icon: MessageSquare,
    color: "teal",
    bgClass: "from-teal-500/10 to-emerald-500/5 border-teal-200/80 hover:border-teal-400",
    iconBg: "bg-teal-600 text-white",
  },
];

export function DiscoverFeatures() {
  return (
    <section className="mt-12 space-y-4">
      {/* Section Header */}
      <div>
        <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase block mb-1">
          HỆ SINH THÁI VEGGIEHUB
        </span>
        <h2 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 tracking-tight">
          Tính năng sẵn có giúp bạn ăn chay lành mạnh
        </h2>
        <p className="text-stone-500 text-xs sm:text-sm mt-0.5">
          Tích hợp công nghệ AI, cơ sở dữ liệu mở và cộng đồng hỗ trợ lối sống thuần thực vật.
        </p>
      </div>

      {/* Grid 4 Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
        {FEATURES.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.title} href={item.href} className="group block">
              <Card
                className={`p-6 bg-gradient-to-br ${item.bgClass} transition-all duration-300 hover:shadow-md flex flex-col justify-between h-full border`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-2xl ${item.iconBg} flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-white/90 text-stone-700 shadow-2xs border border-stone-200/60">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-stone-900 group-hover:text-emerald-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-stone-600 text-xs sm:text-sm mt-1.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-stone-200/60 flex items-center justify-between text-xs font-bold text-emerald-700">
                  <span>Khám phá ngay</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

