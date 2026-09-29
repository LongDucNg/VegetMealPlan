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
  Bookmark,
  Video,
  Settings,
  UtensilsCrossed,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { useRole } from "@/context/RoleContext";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  active: boolean;
  lock?: boolean;
  badge?: string;
}

export function Sidebar() {
  const pathname = usePathname();
  const { role, setRole, isGuest, isAdmin } = useRole();

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
      label: "Saved & Profile",
      href: "/me",
      icon: Bookmark,
      active: pathname === "/me",
    },
    {
      label: "Preferences",
      href: "/me/settings",
      icon: Settings,
      active: pathname === "/me/settings",
    },
  ];

  const adminNavItems = [
    {
      label: "Overview",
      href: "/admin",
      icon: LayoutDashboard,
      active: pathname === "/admin",
    },
    {
      label: "Moderation",
      href: "/admin/moderation",
      icon: ShieldAlert,
      active: pathname.startsWith("/admin/moderation"),
      flagCount: "3",
    },
    {
      label: "Members",
      href: "/admin/members",
      icon: Users,
      active: pathname.startsWith("/admin/members"),
    },
    {
      label: "Content",
      href: "/admin/content",
      icon: FileText,
      active: pathname === "/admin/content",
    },
    {
      label: "Recipes CRUD",
      href: "/admin/recipes",
      icon: UtensilsCrossed,
      active: pathname.startsWith("/admin/recipes"),
    },
    {
      label: "Categories",
      href: "/admin/categories",
      icon: Tag,
      active: pathname.startsWith("/admin/categories"),
    },
    {
      label: "AI Models",
      href: "/admin/ai",
      icon: Cpu,
      active: pathname.startsWith("/admin/ai"),
    },
  ];

  const renderNavGroup = (items: NavItem[]) => (
    <nav className="flex flex-col space-y-1.5">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.label}
            href={item.href}
            className={`min-h-[46px] px-3.5 py-1.5 rounded-xl flex items-center justify-between text-[15px] font-medium transition-all group ${
              item.active
                ? "bg-emerald-50 text-emerald-950 font-semibold shadow-xs border border-emerald-100"
                : "text-stone-600 hover:bg-stone-100/80 hover:text-stone-900"
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                  item.active
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-stone-100 text-stone-500 group-hover:bg-stone-200/80 group-hover:text-stone-800"
                }`}
              >
                <Icon
                  className="w-4 h-4"
                  strokeWidth={item.active ? 2.25 : 1.75}
                />
              </div>
              <span className="truncate">{item.label}</span>
            </div>

            {item.lock && (
              <Lock className="w-4 h-4 text-stone-300 shrink-0 ml-2" />
            )}
            {item.badge && (
              <Badge variant="beta" className="ml-2 shrink-0 text-[11px] px-2 py-0.5">
                {item.badge}
              </Badge>
            )}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <aside className="sticky top-[72px] w-[275px] h-[calc(100vh-72px)] overflow-y-auto bg-white border-r border-stone-200 p-4 flex flex-col justify-between shrink-0 select-none scrollbar-thin">
      <div className="space-y-6">
        {/* Section: EXPLORE */}
        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-[0.08em] text-stone-400 px-3 mb-2">
            EXPLORE
          </h3>
          {renderNavGroup(exploreNavItems)}
        </div>

        {/* Section: WELLNESS & COMMUNITY */}
        <div className="pt-5 border-t border-stone-100">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.08em] text-stone-400 px-3 mb-2">
            WELLNESS & COMMUNITY
          </h3>
          {renderNavGroup(wellnessNavItems)}
        </div>

        {/* Section: MY SPACE (When not guest or for logged in roles) */}
        {!isGuest && (
          <div className="pt-5 border-t border-stone-100">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.08em] text-stone-400 px-3 mb-2">
              MY SPACE
            </h3>
            {renderNavGroup(mySpaceNavItems)}
          </div>
        )}

        {/* Section: ADMIN (visible if Admin role) */}
        {isAdmin && (
          <div className="pt-5 border-t border-stone-100">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.08em] text-stone-400 px-3 mb-2">
              ADMINISTRATION
            </h3>
            <nav className="flex flex-col space-y-1.5">
              {adminNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`min-h-[44px] px-3.5 py-1.5 rounded-xl flex items-center justify-between text-sm font-medium transition-colors group ${
                      item.active
                        ? "bg-emerald-50 text-emerald-950 font-semibold shadow-xs border border-emerald-100"
                        : "text-stone-600 hover:bg-stone-100/80 hover:text-stone-900"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
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

                    {item.flagCount && (
                      <Badge variant="flagged" className="text-[11px] px-2 py-0">
                        {item.flagCount}
                      </Badge>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}

        {/* Promo Card (Guest Only) */}
        {isGuest && (
          <div className="p-5 rounded-2xl bg-emerald-800 relative overflow-hidden text-white shadow-sm">
            {/* Decor Circles */}
            <div className="w-28 h-28 rounded-full bg-emerald-700 absolute -top-6 -right-6 pointer-events-none" />
            <div className="w-24 h-24 rounded-full bg-amber-400/20 absolute -bottom-6 -right-6 pointer-events-none" />

            <div className="relative z-10">
              <Sparkles className="w-[22px] h-[22px] text-amber-400" />
              <h4 className="mt-3 font-serif font-bold text-xl leading-[1.25] text-white">
                Plan your week, save recipes, ask the AI.
              </h4>
              <p className="mt-2 text-sm text-emerald-200/85">
                Free forever for the community.
              </p>
              <Link
                href="/register"
                className="mt-4 w-full h-10 rounded-full bg-amber-400 hover:bg-amber-500 text-amber-950 text-base font-medium transition-colors cursor-pointer shadow-xs inline-flex items-center justify-center"
              >
                Create free account
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Dev Switcher: PREVIEW AS (Bottom) */}
      <div className="mt-8 rounded-xl border border-dashed border-stone-300 p-3 bg-stone-50/50">
        <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-2">
          PREVIEW AS
        </div>
        <SegmentedControl value={role} onChange={setRole} />
      </div>
    </aside>
  );
}
