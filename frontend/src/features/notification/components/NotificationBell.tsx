"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bell,
  Check,
  CheckCheck,
  Clock,
  Sparkles,
  AlertCircle,
  MessageSquare,
  Heart,
  Trash2,
  ExternalLink,
} from "lucide-react";
import { useNotifications } from "../hooks/useNotifications";
import { formatTimeAgo, getNotificationLink } from "../utils";
import { NotificationType } from "../types";

export function NotificationBell() {
  const router = useRouter();
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  } = useNotifications();

  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredNotifications = notifications.filter((item) => {
    if (filter === "unread") return !item.is_read;
    return true;
  });

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "SUBSCRIPTION_SUCCESS":
        return (
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
        );
      case "SUBSCRIPTION_EXPIRING":
      case "SUBSCRIPTION_EXPIRED":
      case "SUBSCRIPTION_CANCELLED":
        return (
          <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <AlertCircle className="w-4 h-4" />
          </div>
        );
      case "CONTENT_COMMENT":
        return (
          <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
            <MessageSquare className="w-4 h-4" />
          </div>
        );
      case "CONTENT_VOTE":
        return (
          <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
            <Heart className="w-4 h-4" />
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <Bell className="w-4 h-4" />
          </div>
        );
    }
  };

  const handleItemClick = (
    item: {
      notification_id: number;
      is_read: boolean;
      type: NotificationType;
      ref_type?: string;
      ref_id?: number;
    }
  ) => {
    if (!item.is_read) {
      markAsRead(item.notification_id);
    }
    const link = getNotificationLink(item.type, item.ref_type, item.ref_id);
    if (link) {
      setIsOpen(false);
      router.push(link);
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-10 h-10 rounded-full border border-stone-200 bg-white hover:bg-stone-50 flex items-center justify-center text-stone-600 hover:text-stone-900 transition-colors relative cursor-pointer shadow-2xs"
        aria-label="Thông báo"
        title="Thông báo"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white animate-pulse">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-84 sm:w-96 bg-white rounded-2xl border border-stone-200 shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          {/* Header */}
          <div className="px-4 py-3 border-b border-stone-100 flex items-center justify-between bg-stone-50/80">
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-stone-900 text-sm">Thông báo</h4>
              {unreadCount > 0 && (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {unreadCount} mới
                </span>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={() => markAllAsRead()}
                className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1 hover:underline cursor-pointer"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Đọc tất cả</span>
              </button>
            )}
          </div>

          {/* Quick Filters */}
          <div className="flex items-center gap-1.5 px-3 py-2 border-b border-stone-100 bg-white text-xs">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${filter === "all"
                  ? "bg-emerald-50 text-emerald-800 font-semibold"
                  : "text-stone-500 hover:text-stone-800 hover:bg-stone-50"
                }`}
            >
              Tất cả ({notifications.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter("unread")}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${filter === "unread"
                  ? "bg-emerald-50 text-emerald-800 font-semibold"
                  : "text-stone-500 hover:text-stone-800 hover:bg-stone-50"
                }`}
            >
              Chưa đọc ({unreadCount})
            </button>
          </div>

          {/* Notification List */}
          <div className="max-h-84 overflow-y-auto divide-y divide-stone-100 scrollbar-thin">
            {filteredNotifications.length === 0 ? (
              <div className="p-8 text-center text-stone-400 text-xs">
                {filter === "unread"
                  ? "Không có thông báo chưa đọc nào"
                  : "Không có thông báo nào"}
              </div>
            ) : (
              filteredNotifications.map((item) => {
                const targetLink = getNotificationLink(
                  item.type,
                  item.ref_type,
                  item.ref_id
                );

                return (
                  <div
                    key={item.notification_id}
                    onClick={() => handleItemClick(item)}
                    className={`p-3.5 flex items-start gap-3 transition-colors cursor-pointer group ${item.is_read
                        ? "bg-white hover:bg-stone-50/80"
                        : "bg-emerald-50/30 hover:bg-emerald-50/60"
                      }`}
                  >
                    {/* Icon */}
                    {getNotificationIcon(item.type)}

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-1">
                        <p
                          className={`text-xs leading-snug truncate ${item.is_read
                              ? "font-medium text-stone-800"
                              : "font-bold text-stone-900"
                            }`}
                        >
                          {item.title}
                        </p>
                        {!item.is_read && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-stone-600 mt-0.5 line-clamp-2">
                        {item.message}
                      </p>
                      <div className="flex items-center justify-between text-[11px] text-stone-400 mt-1.5">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatTimeAgo(item.created_at)}
                        </span>
                        {targetLink && (
                          <span className="text-[10px] text-emerald-700 font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                            Chi tiết <ExternalLink className="w-2.5 h-2.5" />
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      {!item.is_read && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsRead(item.notification_id);
                          }}
                          className="p-1 rounded-md text-stone-400 hover:text-emerald-700 hover:bg-white transition-colors"
                          title="Đánh dấu đã đọc"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(item.notification_id);
                        }}
                        className="p-1 rounded-md text-stone-400 hover:text-rose-600 hover:bg-white transition-colors"
                        title="Xoá thông báo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

        </div>
      )}
    </div>
  );
}
