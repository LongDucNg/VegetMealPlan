"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { LockedState, GatedSkeleton } from "@/components/ui/LockedState";
import { useRole } from "@/context/RoleContext";
import { ADMIN_CONTENT_ITEMS, AdminContentItem } from "@/features/admin";
import { forumService } from "@/features/community";
import {
  EyeOff,
  FileText,
  Video,
  MessageSquare,
  ExternalLink,
  Loader2,
  RefreshCw,
  RotateCcw,
  AlertTriangle,
  X,
  ShieldAlert,
  CheckCircle2,
} from "lucide-react";

type ContentTab = "all" | "Blog" | "Video" | "Comment";

const REJECT_PRESETS = [
  "Vi phạm tiêu chuẩn cộng đồng",
  "Thông tin sai lệch về dinh dưỡng chay",
  "Nội dung quảng cáo, spam thương mại",
  "Không phù hợp với ẩm thực chay",
  "Nội dung trùng lặp hoặc phản cảm",
];

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
  const [items, setItems] = useState<AdminContentItem[]>([...ADMIN_CONTENT_ITEMS]);
  const [loading, setLoading] = useState(false);

  // Modal từ chối / gỡ bài
  const [rejectModalItem, setRejectModalItem] = useState<AdminContentItem | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [isSubmittingReject, setIsSubmittingReject] = useState(false);

  // State phục hồi bài viết
  const [restoringId, setRestoringId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const tabs: { id: ContentTab; label: string }[] = [
    { id: "all", label: "Tất cả nội dung" },
    { id: "Blog", label: "Bài viết" },
    { id: "Video", label: "Video" },
    { id: "Comment", label: "Bình luận" },
  ];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const loadContent = async () => {
    setLoading(true);
    try {
      const realItems = await forumService.getAdminContentList();
      if (realItems && realItems.length > 0) {
        setItems(realItems);
      }
    } catch (err) {
      console.warn("[AdminContent] Error loading real content:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContent();
  }, []);

  const filtered = activeTab === "all" ? items : items.filter((i) => i.type === activeTab);

  // Mở modal gỡ bài
  const handleOpenRejectModal = (item: AdminContentItem) => {
    setRejectModalItem(item);
    setRejectReason("");
  };

  // Xác nhận gỡ bài kèm lý do
  const handleConfirmReject = async () => {
    if (!rejectModalItem) return;
    setIsSubmittingReject(true);
    const finalReason = rejectReason.trim() || "Vi phạm tiêu chuẩn cộng đồng";

    try {
      await forumService.adminUpdatePostStatus(rejectModalItem.id, "removed", finalReason);
      setItems((prev) =>
        prev.map((i) =>
          i.id === rejectModalItem.id
            ? { ...i, status: "Removed", rejectReason: finalReason }
            : i
        )
      );
      showToast(`Đã gỡ bài viết "${rejectModalItem.title}" khỏi diễn đàn.`);
      setRejectModalItem(null);
    } catch (err) {
      console.error("Lỗi khi gỡ bài viết:", err);
      alert("Không thể cập nhật trạng thái bài viết. Vui lòng thử lại!");
    } finally {
      setIsSubmittingReject(false);
    }
  };

  // Khôi phục lại bài viết (back bài viết lại -> Published)
  const handleRestore = async (id: string, title?: string) => {
    setRestoringId(id);
    try {
      await forumService.adminUpdatePostStatus(id, "approved");
      setItems((prev) =>
        prev.map((i) =>
          i.id === id ? { ...i, status: "Published", rejectReason: null } : i
        )
      );
      showToast(`Đã khôi phục và duyệt lại bài viết "${title || id}" thành công!`);
    } catch (err) {
      console.error("Lỗi khi khôi phục bài viết:", err);
      alert("Không thể khôi phục bài viết. Vui lòng thử lại!");
    } finally {
      setRestoringId(null);
    }
  };

  return (
    <div className="space-y-5">
      {/* Thông báo Toast nhanh */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-stone-900 text-white rounded-xl shadow-xl text-sm font-medium animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

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
              <div className="flex flex-col gap-1 max-w-[340px]">
                <div className="flex items-center gap-2">
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
                {item.status === "Removed" && item.rejectReason && (
                  <div className="flex items-start gap-1.5 text-[11px] text-red-700 bg-red-50/90 px-2 py-0.5 rounded-md border border-red-200/80">
                    <AlertTriangle className="w-3 h-3 shrink-0 mt-0.5 text-red-500" />
                    <span className="line-clamp-2">
                      <strong className="font-semibold">Lý do:</strong> {item.rejectReason}
                    </span>
                  </div>
                )}
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
              <div className="flex items-center gap-2">
                {item.status !== "Removed" ? (
                  <button
                    onClick={() => handleOpenRejectModal(item)}
                    title="Gỡ bài viết này kèm lý do cụ thể"
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 text-xs font-semibold transition-colors cursor-pointer border border-red-200"
                  >
                    <EyeOff className="w-3 h-3" />
                    <span>Gỡ</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleRestore(item.id, item.title)}
                    disabled={restoringId === item.id}
                    title="Khôi phục & duyệt lại bài viết này trên diễn đàn"
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-semibold transition-colors cursor-pointer border border-emerald-200 shadow-2xs"
                  >
                    <RotateCcw
                      className={`w-3 h-3 ${restoringId === item.id ? "animate-spin" : ""}`}
                    />
                    <span>Khôi phục bài</span>
                  </button>
                )}
              </div>
            ),
          }))}
        />
      )}

      {/* MODAL NHẬP LÝ DO GỠ / TỪ CHỐI BÀI VIẾT */}
      {rejectModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-stone-200 overflow-hidden">
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between bg-stone-50/60">
              <div className="flex items-center gap-2 text-stone-800 font-bold text-base">
                <ShieldAlert className="w-5 h-5 text-red-600" />
                <span>Gỡ bài viết & Nhập lý do</span>
              </div>
              <button
                onClick={() => setRejectModalItem(null)}
                className="text-stone-400 hover:text-stone-600 p-1 rounded-lg hover:bg-stone-200/50 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/70 text-xs text-stone-600 space-y-1">
                <p className="font-semibold text-stone-800 text-sm line-clamp-1">
                  {rejectModalItem.title}
                </p>
                <p>
                  Tác giả: <span className="font-medium text-stone-700">{rejectModalItem.author}</span>
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Chọn lý do nhanh:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {REJECT_PRESETS.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setRejectReason(preset)}
                      className={`text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${rejectReason === preset
                          ? "bg-red-50 border-red-300 text-red-700 font-medium"
                          : "bg-white border-stone-200 text-stone-600 hover:border-stone-300 hover:bg-stone-50"
                        }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Lý do chi tiết <span className="text-red-500">*</span>:
                </label>
                <textarea
                  rows={3}
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Nhập lý do gỡ bài để tác giả và quản trị viên nắm rõ..."
                  className="w-full text-xs p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-red-400/30 focus:border-red-500 text-stone-800 placeholder:text-stone-400 resize-none"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3.5 bg-stone-50 border-t border-stone-100 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setRejectModalItem(null)}
                disabled={isSubmittingReject}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-200/60 transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleConfirmReject}
                disabled={isSubmittingReject}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-red-600 hover:bg-red-700 text-white transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm disabled:opacity-60"
              >
                {isSubmittingReject ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <EyeOff className="w-3.5 h-3.5" />
                )}
                <span>Xác nhận gỡ bài</span>
              </button>
            </div>
          </div>
        </div>
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
          subtitle="Duyệt bài, gỡ bỏ và quản lý các bài viết, nội dung chia sẻ của cộng đồng diễn đàn chay."

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
