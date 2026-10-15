"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  CirclePlay,
  MessagesSquare,
  MapPin,
  CalendarDays,
  Sparkles,
  Lock,
  LayoutDashboard,
  ShieldAlert,
  Users,
  FileText,
  Tag,
  Cpu,
  ScanLine,
  Heart,
  Settings,
  UtensilsCrossed,
  ArrowLeft,
  Shield,
  ShieldCheck,
  LogOut,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { useRole } from "@/context/RoleContext";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  active: boolean;
  lock?: boolean;
  badge?: string;
  flagCount?: string;
}

export function Sidebar() {
  const pathname = usePathname();
  const { role, isGuest, isAdmin, user, logout } = useRole();
  const isAdminRoute = pathname.startsWith("/admin");

  // Navigation for Normal User App
  const exploreNavItems: NavItem[] = [
    {
      label: "Discover",
      href: "/",
      icon: Compass,
      active: pathname === "/",
    },
    {
      label: "Video recipes",
      href: "/videos",
      icon: CirclePlay,
      active: pathname === "/videos" || pathname.startsWith("/videos/"),
    },
    {
      label: "Pantry scan",
      href: "/planner/scan",
      icon: ScanLine,
      active: pathname.startsWith("/planner/scan"),
      badge: "AI Match",
    },
  ];

  const wellnessNavItems: NavItem[] = [
    {
      label: "Meal planner",
      href: "/planner",
      icon: CalendarDays,
      active: pathname === "/planner",
      lock: isGuest,
    },
    {
      label: "AI nutritionist",
      href: "/ai",
      icon: Sparkles,
      active: pathname === "/ai" || pathname.startsWith("/ai/"),
      badge: "Beta",
    },
    {
      label: "Community forum",
      href: "/forum",
      icon: MessagesSquare,
      active: pathname === "/forum" || pathname.startsWith("/forum/"),
    },
    {
      label: "Nearby shops",
      href: "/shops",
      icon: MapPin,
      active: pathname === "/shops" || pathname.startsWith("/shops/"),
    },
  ];

  const mySpaceNavItems: NavItem[] = [
    {
      label: "Favorites & Profile",
      href: "/me",
      icon: Heart,
      active: pathname === "/me",
    },
    {
      label: "Preferences",
      href: "/me/settings",
      icon: Settings,
      active: pathname === "/me/settings",
    },
  ];

  // Navigation Dedicated to Admin Management (/admin/*)
  const adminDashboardItems: NavItem[] = [
    {
      label: "Overview Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      active: pathname === "/admin",
    },
  ];

  const adminContentItems: NavItem[] = [
    {
      label: "Categories & Taxonomies",
      href: "/admin/categories",
      icon: Tag,
      active: pathname.startsWith("/admin/categories"),
    },
    {
      label: "Recipes CRUD",
      href: "/admin/recipes",
      icon: UtensilsCrossed,
      active: pathname.startsWith("/admin/recipes"),
    },
    {
      label: "Moderation Queue",
      href: "/admin/moderation",
      icon: ShieldAlert,
      active: pathname.startsWith("/admin/moderation"),
      flagCount: "3",
    },
    {
      label: "Content Library",
      href: "/admin/content",
      icon: FileText,
      active: pathname === "/admin/content",
    },
  ];

  const adminSystemItems: NavItem[] = [
    {
      label: "Members & Roles",
      href: "/admin/members",
      icon: Users,
      active: pathname.startsWith("/admin/members"),
    },
    {
      label: "AI Models & Logs",
      href: "/admin/ai",
      icon: Cpu,
      active: pathname.startsWith("/admin/ai"),
    },
  ];

  const renderNavGroup = (items: NavItem[]) => (
    <nav className="flex flex-col space-y-1">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.label}
            href={item.href}
            className={`min-h-[44px] px-3 py-1.5 rounded-xl flex items-center justify-between text-[14px] font-medium transition-all group ${
              item.active
                ? "bg-emerald-50 text-emerald-950 font-semibold shadow-xs border border-emerald-100"
                : "text-stone-600 hover:bg-stone-100/80 hover:text-stone-900"
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                  item.active
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-stone-100 text-stone-500 group-hover:bg-stone-200/80 group-hover:text-stone-800"
                }`}
              >
                <Icon
                  className="w-3.5 h-3.5"
                  strokeWidth={item.active ? 2.25 : 1.75}
                />
              </div>
              <span className="truncate">{item.label}</span>
            </div>

            {item.lock && (
              <Lock className="w-3.5 h-3.5 text-stone-300 shrink-0 ml-2" />
            )}
            {item.badge && (
              <Badge variant="beta" className="ml-2 shrink-0 text-[10px] px-1.5 py-0">
                {item.badge}
              </Badge>
            )}
            {item.flagCount && (
              <Badge variant="flagged" className="ml-2 shrink-0 text-[10px] px-1.5 py-0">
                {item.flagCount}
              </Badge>
            )}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <aside className="sticky top-[72px] w-[275px] h-[calc(100vh-72px)] overflow-y-auto bg-white border-r border-stone-200 p-4 flex flex-col justify-between shrink-0 select-none scrollbar-thin">
      {/* ============================================================== */}
      {/* VIEW MODE 1: DEDICATED ADMIN SIDEBAR (When inside /admin/*)    */}
      {/* ============================================================== */}
      {isAdminRoute ? (
        <div className="flex flex-col h-full justify-between">
          <div className="space-y-5">
            {/* Back to Client App button */}
            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors group border border-stone-200/80 hover:border-emerald-200"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5 text-stone-400 group-hover:text-emerald-600" />
              <span>Quay lại VeggieHub</span>
            </Link>

            {/* Admin Console Header Badge */}
            <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-800 to-stone-900 text-white shadow-xs">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-emerald-600/60 flex items-center justify-center shrink-0">
                  <Shield className="w-3.5 h-3.5 text-emerald-300" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-100">
                    Admin Portal
                  </h4>
                  <p className="text-[10px] text-emerald-300/80 truncate">
                    Quản trị & Kiểm duyệt
                  </p>
                </div>
              </div>
            </div>

            {/* Section 1: Dashboard */}
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.08em] text-stone-400 px-3 mb-1.5">
                DASHBOARD
              </h3>
              {renderNavGroup(adminDashboardItems)}
            </div>

            {/* Section 2: Content & Moderation */}
            <div className="pt-3 border-t border-stone-100">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.08em] text-stone-400 px-3 mb-1.5">
                NỘI DUNG & DANH MỤC
              </h3>
              {renderNavGroup(adminContentItems)}
            </div>

            {/* Section 3: System & Members */}
            <div className="pt-3 border-t border-stone-100">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.08em] text-stone-400 px-3 mb-1.5">
                THÀNH VIÊN & HỆ THỐNG
              </h3>
              {renderNavGroup(adminSystemItems)}
            </div>
          </div>

          {/* Admin User Card at bottom of Admin Sidebar */}
          <div className="pt-4 border-t border-stone-100 mt-4">
            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center text-xs font-bold shrink-0">
                  {user?.full_name ? user.full_name.charAt(0).toUpperCase() : "A"}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-stone-900 truncate">
                    {user?.full_name || "Admin"}
                  </p>
                  <p className="text-[10px] text-emerald-700 font-medium truncate flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Administrator</span>
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={logout}
                title="Đăng xuất"
                className="w-7 h-7 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-1"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* ============================================================== */
        /* VIEW MODE 2: CLIENT USER APP SIDEBAR (Normal user pages)        */
        /* ============================================================== */
        <div className="flex flex-col h-full justify-between">
          <div className="space-y-5">
            {/* Section: EXPLORE */}
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.08em] text-stone-400 px-3 mb-1.5">
                KHÁM PHÁ
              </h3>
              {renderNavGroup(exploreNavItems)}
            </div>

            {/* Section: WELLNESS & COMMUNITY */}
            <div className="pt-4 border-t border-stone-100">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.08em] text-stone-400 px-3 mb-1.5">
                DINH DƯỠNG & CỘNG ĐỒNG
              </h3>
              {renderNavGroup(wellnessNavItems)}
            </div>

            {/* Section: MY SPACE (When logged in) */}
            {!isGuest && (
              <div className="pt-4 border-t border-stone-100">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.08em] text-stone-400 px-3 mb-1.5">
                  CÁ NHÂN
                </h3>
                {renderNavGroup(mySpaceNavItems)}
              </div>
            )}

            {/* Shortcut to Admin Console if current user has real Admin role */}
            {isAdmin && (
              <div className="pt-4 border-t border-stone-100">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.08em] text-stone-400 px-3 mb-1.5">
                  QUẢN TRỊ VIÊN
                </h3>
                <Link
                  href="/admin"
                  className="min-h-[44px] px-3.5 py-2 rounded-xl flex items-center justify-between text-xs font-semibold bg-stone-900 text-white hover:bg-stone-800 transition-all shadow-xs group"
                >
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Vào trang Quản trị</span>
                  </div>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    Admin
                  </span>
                </Link>
              </div>
            )}

            {/* Promo Card (Guest Only) */}
            {isGuest && (
              <div className="p-4 rounded-2xl bg-emerald-800 relative overflow-hidden text-white shadow-sm mt-3">
                <div className="w-24 h-24 rounded-full bg-emerald-700 absolute -top-6 -right-6 pointer-events-none" />
                <div className="w-20 h-20 rounded-full bg-amber-400/20 absolute -bottom-6 -right-6 pointer-events-none" />

                <div className="relative z-10">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <h4 className="mt-2 font-serif font-bold text-base leading-snug text-white">
                    Kế hoạch món chay & AI thông minh.
                  </h4>
                  <p className="mt-1 text-xs text-emerald-200/85">
                    Đăng ký miễn phí ngay hôm nay.
                  </p>
                  <Link
                    href="/register"
                    className="mt-3.5 w-full h-8 rounded-full bg-amber-400 hover:bg-amber-500 text-amber-950 text-xs font-semibold transition-colors cursor-pointer shadow-xs inline-flex items-center justify-center"
                  >
                    Tạo tài khoản miễn phí
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Footer User Profile (if logged in as Member/Admin) */}
          {!isGuest && user && (
            <div className="pt-3 border-t border-stone-100 mt-4">
              <div className="p-2 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                    {user.full_name ? user.full_name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-stone-900 truncate">
                      {user.full_name}
                    </p>
                    <p className="text-[10px] text-stone-500 truncate">{user.email}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={logout}
                  title="Đăng xuất"
                  className="w-6 h-6 rounded-md text-stone-400 hover:text-red-600 hover:bg-red-50 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </aside>
  );
}
