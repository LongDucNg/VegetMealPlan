"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { LockedState, GatedSkeleton } from "@/components/ui/LockedState";
import { useRole } from "@/context/RoleContext";
import { ADMIN_CONTENT_ITEMS, AdminContentItem } from "@/features/admin";
import { CheckCircle2, EyeOff, Flag, FileText, Video, MessageSquare } from "lucide-react";

type ContentTab = "all" | "Blog" | "Video" | "Comment";

function StatusBadge({ status }: { status: AdminContentItem["status"] }) {
  if (status === "Published") return <Badge variant="success">Đã xuất bản</Badge>;
  if (status === "Under Review") return <Badge variant="info">Đang xét duyệt</Badge>;
  return <Badge variant="flagged">Đã gỡ bỏ</Badge>;
}

function TypeIcon({ type }: { type: AdminContentItem["type"] }) {
  if (type === "Video") return <Video className="w-3.5 h-3.5 text-violet-600" />;
  if (type === "Blog") return <FileText className="w-3.5 h-3.5 text-emerald-600" />;
  return <MessageSquare className="w-3.5 h-3.5 text-blue-600" />;
}

function ContentManagement() {
  const [activeTab, setActiveTab] = useState<ContentTab>("all");
  const [items, setItems] = useState<AdminContentItem[]>([...ADMIN_CONTENT_ITEMS]);

  const tabs: { id: ContentTab; label: string }[] = [
    { id: "all", label: "Tất cả nội dung" },
    { id: "Blog", label: "Bài viết" },
    { id: "Video", label: "Video" },
    { id: "Comment", label: "Bình luận" },
  ];

  const filtered = activeTab === "all" ? items : items.filter((i) => i.type === activeTab);

  const setStatus = (id: string, status: AdminContentItem["status"]) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
  };

  return (
    <div className="space-y-5">
      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
              activeTab === t.id
                ? "bg-emerald-700 text-white shadow-sm"
                : "bg-white border border-stone-200 text-stone-600 hover:border-emerald-300 hover:text-stone-900"
            }`}
          >
            {t.label}
            <span className={`ml-2 text-xs ${activeTab === t.id ? "text-emerald-200" : "text-stone-400"}`}>
              {t.id === "all" ? items.length : items.filter((i) => i.type === t.id).length}
            </span>
          </button>
        ))}
      </div>

      {/* Table */}
      <DataTable
        columns={[
          { key: "content", label: "Nội dung" },
          { key: "type", label: "Phân loại" },
          { key: "author", label: "Tác giả" },
          { key: "date", label: "Ngày đăng" },
          { key: "reports", label: "Báo cáo" },
          { key: "status", label: "Trạng thái" },
          { key: "actions", label: "Thao tác" },
        ]}
        rows={filtered.map((item) => ({
          content: (
            <p className="text-sm font-medium text-stone-900 line-clamp-1 max-w-[280px]">
              {item.title}
            </p>
          ),
          type: (
            <span className="flex items-center gap-1.5 text-xs font-medium text-stone-600">
              <TypeIcon type={item.type} />
              {item.type === "Video" ? "Video" : item.type === "Blog" ? "Bài viết" : "Bình luận"}
            </span>
          ),
          author: <span className="text-xs text-stone-600">{item.author}</span>,
          date: <span className="text-xs text-stone-500">{item.date}</span>,
          reports: (
            <span className={`text-xs font-semibold ${item.reports > 0 ? "text-red-600" : "text-stone-400"}`}>
              {item.reports > 0 ? `⚠ ${item.reports}` : "—"}
            </span>
          ),
          status: <StatusBadge status={item.status} />,
          actions: (
            <div className="flex items-center gap-1">
              {item.status !== "Published" && (
                <button
                  onClick={() => setStatus(item.id, "Published")}
                  title="Duyệt bài"
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <CheckCircle2 className="w-3 h-3" />
                  Duyệt
                </button>
              )}
              {item.status !== "Removed" && (
                <button
                  onClick={() => setStatus(item.id, "Removed")}
                  title="Gỡ bỏ"
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <EyeOff className="w-3 h-3" />
                  Gỡ bỏ
                </button>
              )}
              {item.status !== "Under Review" && (
                <button
                  onClick={() => setStatus(item.id, "Under Review")}
                  title="Chuyển xét duyệt"
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Flag className="w-3 h-3" />
                  Gắn cờ
                </button>
              )}
            </div>
          ),
        }))}
      />
    </div>
  );
}

import Link from "next/link";

export default function AdminContentPage() {
  const { isGuest, isMember, ready } = useRole();

  return (
    <AppShell showRightRail={false}>
      <div className="max-w-[1240px] mx-auto w-full">
        <PageHeader
          eyebrow="Quản trị hệ thống"
          title="Quản lý Nội dung"
          subtitle="Duyệt bài, gắn cờ và quản lý các bài viết, video công thức, bình luận của cộng đồng."
          action={
            <Link
              href="/admin/recipes"
              className="h-10 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <span>Quản lý công thức hệ thống →</span>
            </Link>
          }
        />
        {!ready ? (
          <GatedSkeleton />
        ) : isGuest ? (
          <LockedState reason="guest" />
        ) : isMember ? (
          <LockedState reason="forbidden" />
        ) : (
          <ContentManagement />
        )}
      </div>
    </AppShell>
  );
}

