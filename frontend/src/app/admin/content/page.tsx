"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { LockedState, GatedSkeleton } from "@/components/ui/LockedState";
import { useRole } from "@/context/RoleContext";
import { AdminContentItem } from "@/features/admin";
import { forumService } from "@/features/community";
import {
  EyeOff,
  FileText,
  Video,
  MessageSquare,
  ExternalLink,
  Loader2,
  RefreshCw,
} from "lucide-react";

type ContentTab = "all" | "Blog" | "Video" | "Comment";

function StatusBadge({ status }: { status: AdminContentItem["status"] }) {
  if (status === "Published") return <Badge variant="success">Đã được duyệt</Badge>;
  if (status === "Under Review") return <Badge variant="info">Chờ duyệt</Badge>;
  return <Badge variant="flagged">Đã bị gỡ</Badge>;
}

function TypeIcon({ type }: { type: AdminContentItem["type"] }) {
  if (type === "Video") return <Video className="w-3.5 h-3.5 text-violet-600" />;
  if (type === "Blog") return <FileText className="w-3.5 h-3.5 text-emerald-600" />;
  return <MessageSquare className="w-3.5 h-3.5 text-blue-600" />;
}

function ContentManagement() {
  const [activeTab, setActiveTab] = useState<ContentTab>("all");
  const [items, setItems] = useState<AdminContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadContent = useCallback(async () => {
    setLoading(true);
    try {
      const realItems = await forumService.getAdminContentList();
      setItems(realItems);
    } catch (err) {
      console.warn("Error loading admin content:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  const tabs: { id: ContentTab; label: string }[] = [
    { id: "all", label: "Tất cả nội dung" },
    { id: "Blog", label: "Bài viết diễn đàn" },
    { id: "Video", label: "Video" },
    { id: "Comment", label: "Bình luận" },
  ];

  const filtered = activeTab === "all" ? items : items.filter((i) => i.type === activeTab);

  const handleSetStatus = async (id: string, status: AdminContentItem["status"]) => {
    const backendStatus =
      status === "Published"
        ? "approved"
        : status === "Removed"
          ? "removed"
          : "pending_review";

    try {
      await forumService.adminUpdatePostStatus(id, backendStatus as any);
    } catch (err) {
      console.error("Error updating post status:", err);
    }

    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status } : i))
    );
  };

  return (
    <div className="space-y-5">
      {/* Tabs & Refresh */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer ${activeTab === t.id
                ? "bg-emerald-700 text-white shadow-sm"
                : "bg-white border border-stone-200 text-stone-600 hover:border-emerald-300 hover:text-stone-900"
                }`}
            >
              {t.label}
              <span
                className={`ml-2 text-xs ${activeTab === t.id ? "text-emerald-200" : "text-stone-400"
                  }`}
              >
                {t.id === "all"
                  ? items.length
                  : items.filter((i) => i.type === t.id).length}
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={loadContent}
          disabled={loading}
          className="h-9 px-3 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-600 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Làm mới</span>
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-stone-400 bg-white rounded-2xl border border-stone-200">
          <Loader2 className="w-7 h-7 animate-spin text-emerald-600" />
          <span className="text-sm font-medium text-stone-500">
            Đang tải dữ liệu nội dung diễn đàn thực tế…
          </span>
        </div>
      ) : (
        /* Table */
        <DataTable
          columns={[
            { key: "content", label: "Nội dung" },
            { key: "type", label: "Phân loại" },
            { key: "author", label: "Tác giả" },
            { key: "date", label: "Thời gian" },
            { key: "status", label: "Trạng thái" },
            { key: "actions", label: "Thao tác" },
          ]}
          rows={filtered.map((item) => ({
            content: (
              <div className="flex items-center gap-2 max-w-[320px]">
                <p className="text-sm font-medium text-stone-900 line-clamp-1">
                  {item.title}
                </p>
                <Link
                  href={`/forum/${item.id}`}
                  target="_blank"
                  title="Xem bài viết trên diễn đàn"
                  className="text-stone-400 hover:text-emerald-600 shrink-0"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            ),
            type: (
              <span className="flex items-center gap-1.5 text-xs font-medium text-stone-600">
                <TypeIcon type={item.type} />
                {item.type === "Video"
                  ? "Video"
                  : item.type === "Blog"
                    ? "Bài viết"
                    : "Bình luận"}
              </span>
            ),
            author: <span className="text-xs text-stone-600">{item.author}</span>,
            date: <span className="text-xs text-stone-500">{item.date}</span>,
            status: <StatusBadge status={item.status} />,
            actions: (
              <div className="flex items-center gap-1.5">
                {item.status !== "Removed" ? (
                  <button
                    onClick={() => handleSetStatus(item.id, "Removed")}
                    title="Gỡ bỏ bài viết này khỏi diễn đàn"
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 text-xs font-semibold transition-colors cursor-pointer border border-red-200"
                  >
                    <EyeOff className="w-3 h-3" />
                    <span>Gỡ</span>
                  </button>
                ) : (
                  <span className="text-xs text-stone-400 font-medium italic select-none">
                    Đã bị gỡ
                  </span>
                )}
              </div>
            ),
          }))}
        />
      )}
    </div>
  );
}

export default function AdminContentPage() {
  const { isGuest, isMember, ready } = useRole();

  return (
    <AppShell showRightRail={false}>
      <div className="max-w-[1240px] mx-auto w-full">
        <PageHeader
          eyebrow="Quản trị hệ thống"
          title="Quản lý Nội dung"
          subtitle="Duyệt bài, gắn cờ và quản lý các bài viết, nội dung thực tế từ cộng đồng người dùng."

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
