"use client";

import React, { useState, useEffect } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { LockedState, GatedSkeleton } from "@/components/ui/LockedState";
import { useRole } from "@/context/RoleContext";
import { MODERATION_QUEUE, ModerationItem } from "@/features/admin";
import { forumService, setAdminPostStatus } from "@/features/community";
import Link from "next/link";
import {
  ShieldCheck,
  AlertTriangle,
  Trash2,
  ArrowUpRight,
  CheckCircle2,
  Info,
  ChefHat,
} from "lucide-react";

const REASON_COLORS: Record<string, string> = {
  "Dangerous claim": "bg-red-100 text-red-700 border-red-200",
  Misinformation: "bg-orange-100 text-orange-700 border-orange-200",
  Spam: "bg-amber-100 text-amber-700 border-amber-200",
  Offensive: "bg-purple-100 text-purple-700 border-purple-200",
  Inappropriate: "bg-pink-100 text-pink-700 border-pink-200",
  "Tuyên bố nguy hại": "bg-red-100 text-red-700 border-red-200",
  "Thông tin sai lệch": "bg-orange-100 text-orange-700 border-orange-200",
  "Spam quảng cáo": "bg-amber-100 text-amber-700 border-amber-200",
  "Xúc phạm / Công kích": "bg-purple-100 text-purple-700 border-purple-200",
  "Không phù hợp": "bg-pink-100 text-pink-700 border-pink-200",
};

const REASON_LABELS: Record<string, string> = {
  "Dangerous claim": "Tuyên bố nguy hại",
  Misinformation: "Thông tin sai lệch",
  Spam: "Spam quảng cáo",
  Offensive: "Xúc phạm / Công kích",
  Inappropriate: "Không phù hợp",
  "Tuyên bố nguy hại": "Tuyên bố nguy hại",
  "Thông tin sai lệch": "Thông tin sai lệch",
  "Spam quảng cáo": "Spam quảng cáo",
  "Xúc phạm / Công kích": "Xúc phạm / Công kích",
  "Không phù hợp": "Không phù hợp",
};

function ConfidenceMeter({ value }: { value: number }) {
  const pct = Math.round(value * 100);
  const color = pct >= 95 ? "bg-red-500" : pct >= 85 ? "bg-amber-500" : "bg-stone-400";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-stone-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs font-bold text-stone-700 shrink-0">{pct}%</span>
    </div>
  );
}

function ModerationCard({
  item,
  onApprove,
  onRemove,
  onEscalate,
}: {
  item: ModerationItem;
  onApprove: () => void;
  onRemove: () => void;
  onEscalate: () => void;
}) {
  const statusColor = {
    Pending: "bg-amber-50 text-amber-700 border-amber-200",
    Approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Removed: "bg-red-50 text-red-700 border-red-200",
    Escalated: "bg-violet-50 text-violet-700 border-violet-200",
  }[item.status];

  return (
    <Card className="p-5 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-stone-500">
              {item.contentType === "Post" ? "Bài viết" : item.contentType === "Video" ? "Video" : "Bình luận"}
            </span>
            <span className="text-xs text-stone-400">·</span>
            <span className="text-xs text-stone-500">{item.author}</span>
            <span className="text-xs text-stone-400">·</span>
            <span className="text-xs text-stone-400">{item.reportedAt}</span>
          </div>
        </div>
        <span
          className={`shrink-0 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${statusColor}`}
        >
          {item.status === "Pending" ? "Chờ duyệt" : item.status === "Approved" ? "Đã duyệt" : item.status === "Removed" ? "Đã gỡ" : "Chuyển tiếp"}
        </span>
      </div>

      {/* Snippet */}
      <blockquote className="bg-red-50 border-l-4 border-red-300 px-4 py-3 rounded-r-xl">
        <p className="text-sm text-red-900 leading-relaxed italic">&ldquo;{item.snippet}&rdquo;</p>
      </blockquote>

      {/* Flag reasons */}
      <div className="flex flex-wrap gap-1.5">
        {item.flagReasons.map((r) => (
          <span
            key={r}
            className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${REASON_COLORS[r] ?? "bg-stone-100 text-stone-600 border-stone-200"}`}
          >
            {REASON_LABELS[r] ?? r}
          </span>
        ))}
      </div>

      {/* AI confidence */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-stone-500 font-medium">Độ tin cậy của AI</span>
        </div>
        <ConfidenceMeter value={item.aiConfidence} />
      </div>

      {/* Actions */}
      {item.status === "Pending" && (
        <div className="flex flex-wrap gap-2 pt-1">
          <button
            onClick={onApprove}
            className="flex items-center gap-1.5 h-9 px-4 rounded-xl bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 transition-colors cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Duyệt nội dung
          </button>
          <button
            onClick={onRemove}
            className="flex items-center gap-1.5 h-9 px-4 rounded-xl bg-red-700 text-white text-xs font-semibold hover:bg-red-800 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Xóa bỏ
          </button>
          <button
            onClick={onEscalate}
            className="flex items-center gap-1.5 h-9 px-4 rounded-xl bg-stone-100 text-stone-700 text-xs font-semibold hover:bg-stone-200 transition-colors cursor-pointer"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
            Chuyển cấp trên
          </button>
        </div>
      )}
    </Card>
  );
}

function ModerationContent() {
  const [items, setItems] = useState<ModerationItem[]>([]);
  const [confirmModal, setConfirmModal] = useState<{ itemId: string; action: "Remove" | "Escalate" } | null>(null);

  useEffect(() => {
    forumService.getAdminModerationQueue().then((realQueue) => {
      // Merge real forum pending posts with mock items (avoiding duplicates)
      const existingIds = new Set(realQueue.map((r) => r.id));
      const filteredMock = MODERATION_QUEUE.filter((m) => !existingIds.has(m.id));
      setItems([...realQueue, ...filteredMock]);
    });
  }, []);

  const handleAction = (itemId: string, status: ModerationItem["status"]) => {
    const item = items.find((m) => m.id === itemId);
    if (item && item.contentId) {
      const backendStatus = status === "Approved" ? "approved" : status === "Removed" ? "removed" : "pending_review";
      setAdminPostStatus(item.contentId, backendStatus);
    }

    setItems((prev) =>
      prev.map((m) => (m.id === itemId ? { ...m, status } : m))
    );
    setConfirmModal(null);
  };

  const pending = items.filter((i) => i.status === "Pending");
  const resolved = items.filter((i) => i.status !== "Pending");

  return (
    <div className="space-y-8">
      {/* Recipe Moderation Queue Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-emerald-50/80 border border-emerald-200 rounded-[14px] px-5 py-3.5 shadow-2xs">
        <div className="flex items-center gap-3">
          <ChefHat className="w-5 h-5 text-emerald-700 shrink-0" />
          <div>
            <p className="text-sm text-stone-900 font-semibold">
              Kiểm duyệt công thức món ăn thành viên đăng tải
            </p>
            <p className="text-xs text-stone-500">
              Xem xét, duyệt hoặc từ chối các công thức món ăn mới do cộng đồng đóng góp.
            </p>
          </div>
        </div>
        <Link
          href="/admin/recipes"
          className="text-xs px-4 py-2 rounded-xl bg-emerald-700 text-white font-semibold hover:bg-emerald-800 transition-colors shadow-2xs cursor-pointer flex items-center gap-1.5"
        >
          <span>Mở duyệt công thức</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Policy banner */}
      <div className="flex items-center gap-4 bg-stone-50 border border-stone-200 rounded-[14px] px-5 py-3.5">
        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
        <p className="text-sm text-stone-700">
          <span className="font-semibold text-stone-900">Cơ chế: AI gắn cờ → Người duyệt:</span>{" "}
          Không có nội dung nào bị xóa mà không có lệnh của quản trị viên. Mọi cờ báo AI đều yêu cầu xác nhận thủ công.
        </p>
      </div>

      {/* Pending queue */}
      <div className="space-y-4">
        <h3 className="font-semibold text-stone-800 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-600" />
          Đang chờ xem xét
          {pending.length > 0 && (
            <span className="text-xs font-semibold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
              {pending.length} cần duyệt gấp
            </span>
          )}
        </h3>
        {pending.length === 0 ? (
          <div className="bg-white border border-stone-200 rounded-[20px] p-10 text-center">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
            <p className="font-semibold text-stone-800">Hàng đợi đã trống</p>
            <p className="text-sm text-stone-500 mt-1">Tất cả nội dung bị gắn cờ đã được kiểm duyệt xong.</p>
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
      {resolved.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-stone-800 flex items-center gap-2">
            <Info className="w-4 h-4 text-stone-500" />
            Đã xử lý
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {resolved.map((item) => (
              <ModerationCard
                key={item.id}
                item={item}
                onApprove={() => {}}
                onRemove={() => {}}
                onEscalate={() => {}}
              />
            ))}
          </div>
        </div>
      )}

      {/* Confirmation modal */}
      <Modal
        isOpen={!!confirmModal}
        onClose={() => setConfirmModal(null)}
        title={confirmModal?.action === "Remove" ? "Xác nhận gỡ bỏ nội dung" : "Chuyển lên cấp cao hơn"}
      >
        <div className="space-y-4">
          <p className="text-base text-stone-700">
            {confirmModal?.action === "Remove"
              ? "Hành động này sẽ gỡ vĩnh viễn nội dung khỏi VeggieHub. Quản trị viên vẫn có thể phục hồi lại từ trang Quản lý nội dung."
              : "Hành động này sẽ chuyển nội dung lên quản trị viên cấp cao xem xét. Nội dung tạm thời vẫn hiển thị cho tới khi có phán quyết."}
          </p>
          <div className="flex gap-3">
            <button
              onClick={() =>
                confirmModal &&
                handleAction(
                  confirmModal.itemId,
                  confirmModal.action === "Remove" ? "Removed" : "Escalated"
                )
              }
              className={`flex-1 h-11 rounded-xl font-semibold text-white transition-colors cursor-pointer ${
                confirmModal?.action === "Remove"
                  ? "bg-red-700 hover:bg-red-800"
                  : "bg-violet-700 hover:bg-violet-800"
              }`}
            >
              {confirmModal?.action === "Remove" ? "Đồng ý gỡ bỏ" : "Đồng ý chuyển tiếp"}
            </button>
            <button
              onClick={() => setConfirmModal(null)}
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
          subtitle="Nội dung do AI phát hiện vi phạm cần người kiểm tra và đưa ra quyết định."
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

