"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { PlaceRow, VEGAN_PLACES } from "@/features/places";
import { TRENDING_TOPICS } from "@/features/community";
import { Meter } from "@/components/ui/Meter";
import { Badge } from "@/components/ui/Badge";
import { useRole } from "@/context/RoleContext";


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
  const { isGuest } = useRole();

  return (
    <aside className="w-[360px] shrink-0 space-y-[22px] select-none">
      {/* 3. Trending Topics Card */}
      <Card>
        <div className="flex items-center gap-2 mb-3.5">
          <TrendingUp className="w-[18px] h-[18px] text-emerald-600" strokeWidth={2} />
          <h3 className="font-serif font-bold text-xl text-stone-900 tracking-tight">
            Trending topics
          </h3>
        </div>

        <div className="flex flex-col divide-y divide-stone-100">
          {TRENDING_TOPICS.map((topic) => (
            <Link
              key={topic.tag}
              href="/forum"
              className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between text-sm transition-colors hover:bg-stone-50 px-1 -mx-1 rounded group cursor-pointer"
            >
              <span className="font-medium text-stone-900 group-hover:text-emerald-700">
                {topic.tag}
              </span>
              <span className="text-stone-500">{topic.posts}</span>
            </Link>
          ))}
        </div>
      </Card>


      {/* 2. Vegan Spots Card (p-0) */}
      <div className="overflow-hidden rounded-[20px] border border-stone-200 bg-white shadow-sm">
        {/* Map Preview: h-[127px], gradient from-map-from to-map-to */}
        <div className="relative h-[127px] w-full bg-gradient-to-br from-map-from to-map-to overflow-hidden">
          {/* Curvy white roads: stroke ≈ 10px, 90% opacity */}
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

          {/* 3 Pins at (102,35), (274,25), (210,61) */}
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

        {/* Body (p-6) */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-serif font-bold text-xl text-stone-900 tracking-tight">
              Vegan spots near you
            </h3>
            <span className="text-sm text-stone-400">Ho Chi Minh City</span>
          </div>

          {/* Place Rows (pitch 52) */}
          <div className="flex flex-col space-y-0.5">
            {VEGAN_PLACES.slice(0, 3).map((place) => (
              <PlaceRow
                key={place.id}
                name={place.name}
                sub={`${place.district} · ${place.distance}`}
                rating={place.rating}
              />
            ))}
          </div>

          {/* Button "Open map" */}
          <Link
            href="/shops"
            className="mt-4 w-full h-10 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-base font-medium transition-colors inline-flex items-center justify-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
          >
            <span>Open map</span>
            <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
          </Link>
        </div>
      </div>


    </aside>
  );
}
