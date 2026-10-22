"use client";

import React, { useState, useEffect } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { LockedState, GatedSkeleton } from "@/components/ui/LockedState";
import { useRole } from "@/context/RoleContext";
import { ADMIN_STATS, AI_MODELS, MODERATION_QUEUE, adminService, AdminStat } from "@/features/admin";
import {
  Users,
  Video,
  Sparkles,
  AlertTriangle,
  TrendingUp,
  Activity,
  Clock,
  CheckCircle2,
  ShieldCheck,
  UtensilsCrossed,
  Carrot,
} from "lucide-react";
import Link from "next/link";

const STAT_ICONS = [
  <Users className="w-4 h-4" key="users" />,
  <Video className="w-4 h-4" key="video" />,
  <Sparkles className="w-4 h-4" key="sparkles" />,
  <AlertTriangle className="w-4 h-4" key="alert" />,
];

const RECENT_ACTIVITY = [
  { id: "a1", text: "Linh Nguyễn đã đăng tải video công thức mới", time: "8 phút trước", icon: <Video className="w-3.5 h-3.5" />, color: "text-emerald-600" },
  { id: "a2", text: "AI đã gắn cờ 1 bài viết vì tuyên bố nguy hại", time: "18 phút trước", icon: <AlertTriangle className="w-3.5 h-3.5" />, color: "text-red-600" },
  { id: "a3", text: "24 thành viên mới đã tham gia trong tuần", time: "1 giờ trước", icon: <Users className="w-3.5 h-3.5" />, color: "text-blue-600" },
  { id: "a4", text: "Cập nhật mô hình kiểm duyệt nội dung lên v1.9", time: "3 giờ trước", icon: <Activity className="w-3.5 h-3.5" />, color: "text-violet-600" },
  { id: "a5", text: "Danh mục 'Món giàu đạm' đạt mốc 480 công thức", time: "Hôm qua", icon: <TrendingUp className="w-3.5 h-3.5" />, color: "text-amber-600" },
];

function AdminContent() {
  const [stats, setStats] = useState<AdminStat[]>(ADMIN_STATS);
  const pendingMod = MODERATION_QUEUE.filter((m) => m.status === "Pending");

  useEffect(() => {
    adminService.fetchStats().then((data) => {
      if (data && data.length > 0) setStats(data);
    });
  }, []);

  return (
    <div className="space-y-8">
      {/* Flagged urgent banner */}
      {pendingMod.length > 0 && (
        <div className="flex items-center gap-4 bg-red-50 border border-red-200 rounded-[16px] px-5 py-4">
          <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-red-900 text-sm">
              {pendingMod.length} mục đang chờ quản trị viên xét duyệt
            </p>
            <p className="text-xs text-red-700 mt-0.5">
              Nội dung do AI gắn cờ cần quản trị viên xem xét và phê duyệt trước khi áp dụng hành động.
            </p>
          </div>
          <Link
            href="/admin/moderation"
            className="shrink-0 h-9 px-4 rounded-xl bg-red-700 text-white text-sm font-semibold hover:bg-red-800 transition-colors"
          >
            Hàng đợi kiểm duyệt →
          </Link>
        </div>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <StatCard
            key={s.label}
            label={s.label}
            value={s.value}
            subtext={s.change}
            icon={STAT_ICONS[i]}
            badge={
              !s.positive ? (
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse inline-block" />
              ) : undefined
            }
          />
        ))}
      </div>

      {/* AI accuracy + Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI model summary */}
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h3 className="font-semibold text-stone-800">Trạng thái các mô hình AI</h3>
            <Link href="/admin/ai" className="ml-auto text-xs text-emerald-700 font-semibold hover:underline">
              Xem tất cả →
            </Link>
          </div>
          <div className="space-y-3">
            {AI_MODELS.map((m) => (
              <div key={m.id} className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-stone-900 truncate">{m.name}</p>
                  <p className="text-xs text-stone-500">{m.version} · độ trễ TB {m.latencyMs}ms</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <div className="text-right">
                    <p className="text-sm font-bold text-emerald-700">{m.accuracy}%</p>
                    <p className="text-xs text-stone-500">độ chính xác</p>
                  </div>
                  <div className={`w-2 h-2 rounded-full shrink-0 ${m.status === "Optimal" ? "bg-emerald-500" : m.status === "Degraded" ? "bg-amber-500" : "bg-red-500"}`} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent activity */}
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-4 h-4 text-stone-600" />
            <h3 className="font-semibold text-stone-800">Hoạt động gần đây</h3>
          </div>
          <div className="space-y-3">
            {RECENT_ACTIVITY.map((a) => (
              <div key={a.id} className="flex items-start gap-3">
                <div className={`mt-0.5 shrink-0 ${a.color}`}>
                  {a.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-stone-800 leading-snug">{a.text}</p>
                  <p className="text-xs text-stone-400 mt-0.5 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {a.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick links */}
      <div>
        <h3 className="font-semibold text-stone-800 mb-4">Thao tác nhanh</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {[
            { label: "Công thức", href: "/admin/recipes", icon: <UtensilsCrossed className="w-5 h-5" /> },
            { label: "Nguyên liệu", href: "/admin/ingredients", icon: <Carrot className="w-5 h-5" /> },
            { label: "Thành viên", href: "/admin/members", icon: <Users className="w-5 h-5" /> },
            { label: "Nội dung", href: "/admin/content", icon: <Video className="w-5 h-5" /> },
            { label: "Danh mục", href: "/admin/categories", icon: <ShieldCheck className="w-5 h-5" /> },
            { label: "Mô hình AI", href: "/admin/ai", icon: <Sparkles className="w-5 h-5" /> },
            { label: "Kiểm duyệt", href: "/admin/moderation", icon: <AlertTriangle className="w-5 h-5" /> },
          ].map((qa) => (
            <Link
              key={qa.href}
              href={qa.href}
              className="flex flex-col items-center gap-2 p-4 bg-white border border-stone-200 rounded-[16px] hover:border-emerald-400 hover:shadow-sm transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-600 group-hover:bg-emerald-50 group-hover:text-emerald-700 flex items-center justify-center transition-colors">
                {qa.icon}
              </div>
              <span className="text-xs font-semibold text-stone-700 group-hover:text-emerald-700 transition-colors">
                {qa.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* AI policy notice */}
      <div className="flex items-center gap-3 bg-stone-50 border border-stone-200 rounded-[14px] px-5 py-3.5">
        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
        <p className="text-sm text-stone-600">
          <span className="font-semibold text-stone-800">Chính sách: AI gắn cờ → Quản trị viên duyệt thủ công.</span>{" "}
          Không có nội dung nào bị xóa tự động. Mọi quyết định gắn cờ của AI đều cần quản trị viên duyệt.
        </p>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const { isGuest, isMember, ready } = useRole();

  return (
    <AppShell showRightRail={false}>
      <div className="max-w-[1240px] mx-auto w-full">
        <PageHeader
          eyebrow="Quản trị hệ thống"
          title="Bảng điều khiển Quản trị"
          action={
            <Badge variant="info" className="text-sm px-3 py-1">
              Bảng Quản Trị
            </Badge>
          }
        />
        {!ready ? (
          <GatedSkeleton />
        ) : isGuest ? (
          <LockedState reason="guest" />
        ) : isMember ? (
          <LockedState reason="forbidden" />
        ) : (
          <AdminContent />
        )}
      </div>
    </AppShell>
  );
}
