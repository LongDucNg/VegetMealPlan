"use client";

import React, { useState, useRef, useEffect } from "react";
import { Bell, Check, Clock } from "lucide-react";
import { useNotifications } from "../hooks/useNotifications";

export function NotificationBell() {
  const { notifications, unreadCount, markAsRead } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
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

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-10 h-10 rounded-full border border-stone-200 bg-white hover:bg-stone-50 flex items-center justify-center text-stone-600 hover:text-stone-900 transition-colors relative cursor-pointer shadow-2xs"
        aria-label="Notifications"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white animate-pulse">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl border border-stone-200 shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          <div className="px-4 py-3 border-b border-stone-100 flex items-center justify-between bg-stone-50/70">
            <h4 className="font-semibold text-stone-900 text-sm">Notifications</h4>
            {unreadCount > 0 && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                {unreadCount} unread
              </span>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-stone-100 scrollbar-thin">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-stone-400 text-xs">
                Không có thông báo mới nào
              </div>
            ) : (
              notifications.map((item) => (
                <div
                  key={item.notification_id}
                  onClick={() => {
                    if (!item.is_read) {
                      markAsRead(item.notification_id);
                    }
                  }}
                  className={`p-3.5 flex items-start gap-3 transition-colors cursor-pointer ${
                    item.is_read
                      ? "bg-white hover:bg-stone-50/80"
                      : "bg-emerald-50/40 hover:bg-emerald-50/70"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                      item.is_read ? "bg-transparent" : "bg-emerald-600"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-xs leading-snug ${
                        item.is_read
                          ? "font-medium text-stone-800"
                          : "font-bold text-stone-900"
                      }`}
                    >
                      {item.title}
                    </p>
                    <p className="text-xs text-stone-500 mt-0.5 line-clamp-2">
                      {item.message}
                    </p>
                    <div className="flex items-center gap-1 text-[11px] text-stone-400 mt-1">
                      <Clock className="w-3 h-3" />
                      <span>
                        {new Date(item.created_at).toLocaleDateString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
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
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
