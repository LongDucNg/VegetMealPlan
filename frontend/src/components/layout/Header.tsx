"use client";

import React from "react";
import Link from "next/link";
import { Leaf } from "lucide-react";
import { useRole } from "@/context/RoleContext";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { NotificationBell } from "@/features/notification";

export function Header() {
  const { isGuest, role, user } = useRole();

  return (
    <header className="sticky top-0 z-50 h-[72px] w-full bg-white border-b border-stone-200 flex items-center justify-between">
      {/* Left Cell: 270px wide, left offset 26px */}
      <div className="w-[270px] h-full flex items-center pl-[26px] gap-2.5 shrink-0 border-r border-stone-200 lg:border-r-0">
        <Link href="/" className="flex items-center gap-2.5 select-none group">
          {/* Logo Tile: 40x40, rounded-xl, emerald faint 500->600 gradient */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-sm flex items-center justify-center text-white">
            <Leaf className="w-5 h-5 text-white" strokeWidth={1.75} />
          </div>

          {/* Wordmark: Fraunces 700 24px */}
          <span className="font-serif font-bold text-2xl tracking-tight leading-none">
            <span className="text-stone-900">Veggie</span>
            <span className="text-emerald-700">Hub</span>
          </span>
        </Link>
      </div>

      {/* Right Cluster: right offset 28px, gap 24 */}
      <div className="flex items-center gap-5 pr-7 shrink-0 ml-auto">
        {isGuest ? (
          <>
            <Link
              href="/login"
              className="text-base font-medium text-stone-800 hover:text-stone-950 transition-colors cursor-pointer"
            >
              Đăng nhập
            </Link>
            <Link
              href="/register"
              className="h-9 px-5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-base font-semibold transition-colors cursor-pointer shadow-sm inline-flex items-center justify-center focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
            >
              Đăng ký
            </Link>
          </>
        ) : (
          <>
            <NotificationBell />
            <Link
              href="/me"
              className="flex items-center gap-3 p-1.5 pr-3 rounded-full hover:bg-stone-50 transition-colors group cursor-pointer"
            >
              <Avatar
                initials={
                  user?.full_name
                    ? user.full_name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()
                    : role === "Admin"
                      ? "AD"
                      : "ME"
                }
                verified={true}
              />
              <div className="hidden sm:flex flex-col text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold text-stone-900 group-hover:text-emerald-700 transition-colors">
                    {user?.full_name || (role === "Admin" ? "Admin User" : "Member")}
                  </span>
                  <Badge
                    variant={role === "Admin" ? "flagged" : "success"}
                    className="text-[10px] px-1.5 py-0"
                  >
                    {role}
                  </Badge>
                </div>
                <span className="text-xs text-stone-500">
                  {user?.email || (role === "Admin" ? "System Operator" : "@member")}
                </span>
              </div>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
