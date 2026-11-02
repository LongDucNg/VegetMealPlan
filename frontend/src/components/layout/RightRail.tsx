"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Refrigerator,
  CalendarDays,
  MapPin,
  MessageSquare,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { PlaceRow, VeganPlace, shopToVeganPlace } from "@/features/places";
import { placeService } from "@/features/places/services/placeService";

const ECOSYSTEM_ITEMS = [
  {
    title: "Tủ lạnh thông minh & AI Scan",
    description: "Nhận diện rau củ qua ảnh & gợi ý món ăn",
    href: "/planner/scan",
    badge: "AI Vision",
    icon: Refrigerator,
    iconColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
  },
  {
    title: "Kế hoạch thực đơn khoa học",
    description: "Tính toán calo, macro theo TDEE mục tiêu",
    href: "/planner",
    badge: "Dinh dưỡng",
    icon: CalendarDays,
    iconColor: "text-blue-700 bg-blue-50 border-blue-200",
  },
  {
    title: "Quán ăn chay lân cận",
    description: "Bản đồ OpenStreetMap tìm quán ăn gần nhất",
    href: "/shops",
    badge: "Bản đồ GPS",
    icon: MapPin,
    iconColor: "text-amber-700 bg-amber-50 border-amber-200",
  },
  {
    title: "Diễn đàn ẩm thực thuần chay",
    description: "Giao lưu, chia sẻ công thức cùng cộng đồng",
    href: "/forum",
    badge: "Cộng đồng",
    icon: MessageSquare,
    iconColor: "text-teal-700 bg-teal-50 border-teal-200",
  },
];

function MapTeardropPin({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 30"
      width="24"
      height="30"
      className={className}
      fill="none"
    >
      <path
        d="M12 0C5.373 0 0 5.373 0 12C0 19.5 12 30 12 30C12 30 24 19.5 24 12C24 5.373 18.627 0 12 0Z"
        className="fill-emerald-600 drop-shadow-sm"
      />
      <circle cx="12" cy="11" r="4.5" className="fill-white" />
    </svg>
  );
}

export function RightRail() {
  const [spots, setSpots] = useState<VeganPlace[]>([]);
  const [loading, setLoading] = useState(true);

  // Lấy các quán chay GẦN VỊ TRÍ NGƯỜI DÙNG NHẤT (sắp xếp theo khoảng cách tăng dần)
  useEffect(() => {
    let active = true;

    const loadClosestSpots = async (lat: number, lng: number) => {
      try {
        const res = await placeService.fetchNearbyPlaces({
          lat,
          lng,
          radiusKm: 25, // Bán kính rộng để lấy các quán gần vị trí hiện tại
        });

        if (active && res.items && res.items.length > 0) {
          // res.items đã được Backend sắp xếp theo Haversine distanceM tăng dần (gần nhất lên đầu)
          const converted = res.items.map(shopToVeganPlace);
          setSpots(converted.slice(0, 4));
        }
      } catch (err) {
        console.warn("Lỗi tải quán chay gần nhất cho RightRail:", err);
      } finally {
        if (active) setLoading(false);
      }
    };

    if (typeof window !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          loadClosestSpots(pos.coords.latitude, pos.coords.longitude);
        },
        () => {
          // Fallback TP.HCM
          loadClosestSpots(10.776889, 106.695345);
        },
        { timeout: 8000, maximumAge: 60000 }
      );
    } else {
      loadClosestSpots(10.776889, 106.695345);
    }

    return () => {
      active = false;
    };
  }, []);

  return (
    <aside className="w-[360px] shrink-0 space-y-[22px] select-none">
      {/* Vegan Spots Card - Hiển thị các quán gần vị trí của bạn nhất */}
      <div className="overflow-hidden rounded-[20px] border border-stone-200 bg-white shadow-sm">
        {/* Map Preview header */}
        <div className="relative h-[127px] w-full bg-gradient-to-br from-map-from to-map-to overflow-hidden">
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 360 127"
            fill="none"
          >
            <path
              d="M-20 45 C 70 85, 170 15, 380 95"
              stroke="white"
              strokeWidth="10"
              strokeLinecap="round"
              strokeOpacity="0.9"
            />
            <path
              d="M100 -20 C 145 65, 215 85, 290 150"
              stroke="white"
              strokeWidth="8"
              strokeLinecap="round"
              strokeOpacity="0.9"
            />
          </svg>

          {/* Map Pins */}
          <div
            className="absolute -translate-x-1/2 -translate-y-full"
            style={{ left: "102px", top: "35px" }}
          >
            <MapTeardropPin />
          </div>
          <div
            className="absolute -translate-x-1/2 -translate-y-full"
            style={{ left: "274px", top: "25px" }}
          >
            <MapTeardropPin />
          </div>
          <div
            className="absolute -translate-x-1/2 -translate-y-full"
            style={{ left: "210px", top: "61px" }}
          >
            <MapTeardropPin />
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-serif font-bold text-xl text-stone-900 tracking-tight">
              Vegan spots near you
            </h3>
            <span className="text-xs text-stone-400">Gần vị trí của bạn</span>
          </div>

          {/* Place Rows */}
          <div className="flex flex-col space-y-1">
            {loading ? (
              <div className="space-y-2 py-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-10 bg-stone-100 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : spots.length > 0 ? (
              spots.map((place) => (
                <PlaceRow
                  key={place.id}
                  name={place.name}
                  sub={`${place.district || "TP.HCM"}${place.distance ? ` · Cách ${place.distance}` : ""}`}
                  rating={place.rating}
                />
              ))
            ) : (
              <p className="text-xs text-stone-500 py-3 text-center">
                Đang tìm các quán chay gần bạn...
              </p>
            )}
          </div>

          {/* Button "Open map" */}
          <Link
            href="/shops"
            className="mt-4 w-full h-10 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-base font-medium transition-colors inline-flex items-center justify-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
          >
            <span>Mở bản đồ đầy đủ</span>
            <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
          </Link>
        </div>
      </div>

      {/* Ecosystem Box: Hệ sinh thái VeggieHub */}
      <div className="overflow-hidden rounded-[20px] border border-stone-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3.5">
          <div>
            <span className="text-[10px] font-extrabold text-emerald-700 uppercase tracking-wider block">
              HỆ SINH THÁI VEGGIEHUB
            </span>
            <h3 className="font-serif font-bold text-lg text-stone-900 tracking-tight">
              Tính năng nổi bật
            </h3>
          </div>
          <span className="p-1.5 rounded-full bg-emerald-50 text-emerald-700">
            <Sparkles className="w-4 h-4" />
          </span>
        </div>

        <div className="space-y-2">
          {ECOSYSTEM_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                href={item.href}
                className="group flex items-start gap-3 p-2.5 rounded-xl border border-stone-100 hover:border-emerald-300 hover:bg-emerald-50/40 transition-all cursor-pointer"
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${item.iconColor} group-hover:scale-105 transition-transform`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <p className="text-xs font-bold text-stone-900 truncate group-hover:text-emerald-800 transition-colors">
                      {item.title}
                    </p>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-stone-100 text-stone-600 shrink-0">
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                    {item.description}
                  </p>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-transform self-center shrink-0" />
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
