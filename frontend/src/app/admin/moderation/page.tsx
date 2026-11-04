"use client";

import React, { useState, useEffect } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { LockedState, GatedSkeleton } from "@/components/ui/LockedState";
import { useRole } from "@/context/RoleContext";
import { ModerationItem } from "@/features/admin";
import { forumService } from "@/features/community";
import { MODERATION_QUEUE } from "@/features/admin";
import Link from "next/link";
import {
  ShieldCheck,
  AlertTriangle,
  Trash2,
  ArrowUpRight,
  CheckCircle2,
  Info,
  ChefHat,
  Loader2,
  ExternalLink,
} from "lucide-react";

function ModerationCard({
  item,
  onApprove,
  onRemove,
}: {
  item: ModerationItem;
  onApprove: () => void;
  onRemove: () => void;
  onEscalate?: () => void;
}) {
  return (
    <Card className="p-6 space-y-4 hover:border-emerald-300 transition-all shadow-2xs bg-white rounded-2xl flex flex-col justify-between">
      <div className="space-y-3.5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-bold text-sm flex items-center justify-center shrink-0">
              {item.author.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-stone-900">{item.author}</span>
                <span className="text-xs text-stone-400">·</span>
                <span className="text-xs text-stone-500">{item.reportedAt}</span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-2.5 py-0.5 rounded-md">
                  {item.category || (item.contentType === "Post" ? "Bài viết diễn đàn" : "Nội dung")}
                </span>
                <span className="text-[11px] text-stone-400">
                  ID: #{item.contentId}
                </span>
              </div>
            </div>
          </div>

          <span className="shrink-0 text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            Chờ duyệt
          </span>
        </div>

        {/* Content Box */}
        <div className="bg-stone-50/80 border border-stone-200/80 rounded-xl p-4 space-y-2">
          {item.title ? (
            <h4 className="font-semibold text-base text-stone-900 leading-snug">
              {item.title}
            </h4>
          ) : null}
          <p className="text-sm text-stone-600 leading-relaxed line-clamp-3">
            {item.excerpt || item.snippet}
          </p>

          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] text-stone-600 bg-white border border-stone-200 px-2 py-0.5 rounded-md font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Action Footer */}
      {item.status === "Pending" && (
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-stone-100">
          <span className="text-xs text-stone-500">
            Cần quản trị viên kiểm duyệt
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onRemove}
              className="flex items-center gap-1.5 h-9 px-3.5 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 text-xs font-semibold transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Gỡ bỏ</span>
            </button>
            <button
              onClick={onApprove}
              className="flex items-center gap-1.5 h-9 px-4 rounded-xl bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 transition-colors shadow-2xs cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Duyệt nội dung</span>
            </button>
          </div>
        </div>
      )}
    </Card>
  );
}

function ResolvedModerationSection({ items }: { items: ModerationItem[] }) {
  const [filter, setFilter] = useState<"all" | "approved" | "removed">("all");

  const approvedList = items.filter((i) => i.status === "Approved");
  const removedList = items.filter((i) => i.status === "Removed");

  const filteredItems = items.filter((item) => {
    if (filter === "approved") return item.status === "Approved";
    if (filter === "removed") return item.status === "Removed";
    return true;
  });

  return (
    <div className="space-y-4 pt-6 border-t border-stone-200">
      {/* Header with quick stats & filter controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-100/70 text-emerald-800 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5 text-emerald-700" />
          </div>
          <div>
            <h3 className="font-semibold text-stone-900 text-base flex items-center gap-2">
              Lịch sử nội dung đã xử lý
              <span className="text-xs font-semibold text-stone-600 bg-stone-100 px-2 py-0.5 rounded-full">
                {items.length} nội dung
              </span>
            </h3>
            <p className="text-xs text-stone-500">
              {approvedList.length} bài đã duyệt công khai · {removedList.length} bài đã gỡ bỏ
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${filter === "all"
              ? "bg-white text-stone-900 shadow-2xs"
              : "text-stone-600 hover:text-stone-900"
              }`}
          >
            Tất cả ({items.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter("approved")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${filter === "approved"
              ? "bg-white text-emerald-800 shadow-2xs"
              : "text-stone-600 hover:text-emerald-700"
              }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            Đã duyệt ({approvedList.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter("removed")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${filter === "removed"
              ? "bg-white text-red-800 shadow-2xs"
              : "text-stone-600 hover:text-red-700"
              }`}
          >
            <span className="w-2 h-2 rounded-full bg-red-600" />
            Đã gỡ ({removedList.length})
          </button>
        </div>
      </div>

      {/* Content list */}
      <div className="bg-white border border-stone-200/90 rounded-2xl divide-y divide-stone-100 shadow-2xs overflow-hidden">
        {filteredItems.length === 0 ? (
          <div className="p-8 text-center text-stone-400 text-sm">
            Không có bài viết nào trong danh mục này.
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-stone-50/70 transition-colors"
            >
              {/* Info Column */}
              <div className="flex-1 min-w-0 space-y-1.5">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-semibold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md">
                    {item.contentType === "Post"
                      ? "Bài viết"
                      : item.contentType === "Video"
                        ? "Video"
                        : "Bình luận"}
                  </span>
                  <span className="font-semibold text-stone-800">
                    {item.author}
                  </span>
                  <span className="text-stone-400">·</span>
                  <span className="text-stone-400">{item.reportedAt}</span>
                </div>

                {/* Content snippet */}
                <p className="text-sm font-medium text-stone-900 leading-snug line-clamp-2">
                  {item.snippet}
                </p>
              </div>

              {/* Status and Link */}
              <div className="flex items-center gap-2.5 shrink-0 self-start md:self-center">
                {item.status === "Approved" ? (
                  <>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full shadow-2xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      Đã được duyệt
                    </span>

                  </>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-800 bg-red-50 border border-red-200 px-3 py-1 rounded-full shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                    Đã bị gỡ bỏ
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function ModerationContent() {
  const [items, setItems] = useState<ModerationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmModal, setConfirmModal] = useState<{ itemId: string; action: "Remove" | "Escalate" } | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectError, setRejectError] = useState<string | null>(null);

  const loadQueue = () => {
    setLoading(true);
    forumService
      .getAdminModerationQueue()
      .then((realQueue) => {
        setItems(realQueue);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadQueue();
  }, []);

  const handleAction = async (itemId: string, status: ModerationItem["status"], reasonText?: string) => {
    const item = items.find((m) => m.id === itemId);
    if (item && item.contentId) {
      try {
        if (status === "Approved") {
          // Gọi trực tiếp API: PUT /api/v1/admin/moderation/:id (action: 'approve')
          await forumService.moderatePost(item.contentId, { action: "approve" });
        } else if (status === "Removed") {
          // Gọi trực tiếp API: PUT /api/v1/admin/moderation/:id (action: 'reject', reason)
          const validReason = (reasonText || rejectReason || "Nội dung vi phạm tiêu chuẩn cộng đồng").trim();
          await forumService.moderatePost(item.contentId, {
            action: "reject",
            reason: validReason.length >= 5 ? validReason : "Nội dung vi phạm tiêu chuẩn cộng đồng",
          });
        }
      } catch (err) {
        console.error("Error moderating post:", err);
      }
    }

    setItems((prev) =>
      prev.map((m) => (m.id === itemId ? { ...m, status } : m))
    );
    setConfirmModal(null);
    setRejectReason("");
    setRejectError(null);
  };

  const pending = items.filter((i) => i.status === "Pending");
  const resolved = items.filter((i) => i.status !== "Pending");

  return (
    <div className="space-y-8">




      {/* Pending queue */}
      <div className="space-y-4">
        <h3 className="font-semibold text-stone-800 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-600" />
          Đang chờ xem xét
          {pending.length > 0 && (
            <span className="text-xs font-semibold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
              {pending.length} cần duyệt
            </span>
          )}
        </h3>
        {loading ? (
          <div className="bg-white border border-stone-200 rounded-[20px] p-10 text-center flex flex-col items-center justify-center gap-2 text-stone-500">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
            <span className="text-sm">Đang tải hàng đợi kiểm duyệt từ máy chủ…</span>
          </div>
        ) : pending.length === 0 ? (
          <div className="bg-white border border-stone-200 rounded-[20px] p-10 text-center">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
            <p className="font-semibold text-stone-800">Hàng đợi đã trống</p>
            <p className="text-sm text-stone-500 mt-1">Tất cả bài viết và nội dung đã được xử lý xong.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {pending.map((item) => (
              <ModerationCard
                key={item.id}
                item={item}
                onApprove={() => handleAction(item.id, "Approved")}
                onRemove={() => setConfirmModal({ itemId: item.id, action: "Remove" })}
                onEscalate={() => setConfirmModal({ itemId: item.id, action: "Escalate" })}
              />
            ))}
          </div>
        )}
      </div>

      {/* Resolved items */}
      {resolved.length > 0 && <ResolvedModerationSection items={resolved} />}

      {/* Confirmation modal */}
      <Modal
        isOpen={!!confirmModal}
        onClose={() => {
          setConfirmModal(null);
          setRejectReason("");
          setRejectError(null);
        }}
        title={confirmModal?.action === "Remove" ? "Từ chối & Gỡ bỏ bài viết" : "Chuyển lên cấp cao hơn"}
      >
        <div className="space-y-4">
          <p className="text-sm text-stone-600">
            {confirmModal?.action === "Remove"
              ? "Bài viết sẽ bị từ chối duyệt và tác giả sẽ nhận được lý do từ chối. Vui lòng nhập lý do cụ thể:"
              : "Hành động này sẽ chuyển nội dung lên quản trị viên cấp cao xem xét. Nội dung tạm thời vẫn hiển thị cho tới khi có phán quyết."}
          </p>

          {confirmModal?.action === "Remove" && (
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-stone-700">
                Lý do từ chối <span className="text-red-500">*</span> (tối thiểu 5 ký tự):
              </label>
              <textarea
                value={rejectReason}
                onChange={(e) => {
                  setRejectReason(e.target.value);
                  if (rejectError) setRejectError(null);
                }}
                rows={3}
                placeholder="Ví dụ: Nội dung chứa từ khoá vi phạm tiêu chuẩn hoặc sai lệch thông tin ăn chay..."
                className="w-full p-3 rounded-xl border border-stone-200 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
              />
              {rejectError && (
                <p className="text-xs text-red-600 font-medium">{rejectError}</p>
              )}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => {
                if (!confirmModal) return;
                if (confirmModal.action === "Remove") {
                  if (rejectReason.trim().length < 5) {
                    setRejectError("Lý do từ chối bắt buộc phải có từ 5 ký tự trở lên.");
                    return;
                  }
                  handleAction(confirmModal.itemId, "Removed", rejectReason.trim());
                } else {
                  handleAction(confirmModal.itemId, "Escalated");
                }
              }}
              className={`flex-1 h-11 rounded-xl font-semibold text-white transition-colors cursor-pointer ${confirmModal?.action === "Remove"
                ? "bg-red-700 hover:bg-red-800"
                : "bg-violet-700 hover:bg-violet-800"
                }`}
            >
              {confirmModal?.action === "Remove" ? "Xác nhận từ chối" : "Đồng ý chuyển tiếp"}
            </button>
            <button
              onClick={() => {
                setConfirmModal(null);
                setRejectReason("");
                setRejectError(null);
              }}
              className="h-11 px-5 rounded-xl bg-stone-100 text-stone-700 font-semibold hover:bg-stone-200 transition-colors cursor-pointer"
            >
              Hủy
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default function AdminModerationPage() {
  const { isGuest, isMember, ready } = useRole();

  return (
    <AppShell showRightRail={false}>
      <div className="max-w-[1240px] mx-auto w-full">
        <PageHeader
          eyebrow="Quản trị hệ thống"
          title="Kiểm duyệt Nội dung"

        />
        {!ready ? (
          <GatedSkeleton />
        ) : isGuest ? (
          <LockedState reason="guest" />
        ) : isMember ? (
          <LockedState reason="forbidden" />
        ) : (
          <ModerationContent />
        )}
      </div>
    </AppShell>
  );
}

