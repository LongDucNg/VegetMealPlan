"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { AppNotification } from "../types";
import { notificationService } from "../services/notificationService";
import { useAuth } from "@/features/auth";

export function useNotifications() {
  const { isAuthenticated } = useAuth();
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [loading, setLoading] = useState(false);
  const isFetchingRef = useRef(false);

  const fetchNotifications = useCallback(async (isSilent = false) => {
    if (!isAuthenticated) {
      setNotifications([]);
      return;
    }
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    if (!isSilent) setLoading(true);

    try {
      const data = await notificationService.getNotifications();
      setNotifications(data);
    } catch {
      // Keep existing on silent or empty on fresh
      if (!isSilent) setNotifications([]);
    } finally {
      isFetchingRef.current = false;
      if (!isSilent) setLoading(false);
    }
  }, [isAuthenticated]);

  // Initial fetch and on auth change
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  // Periodic polling every 30 seconds & on window focus
  useEffect(() => {
    if (!isAuthenticated) return;

    const intervalId = setInterval(() => {
      fetchNotifications(true);
    }, 30000);

    const handleFocus = () => {
      fetchNotifications(true);
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("focus", handleFocus);
    };
  }, [isAuthenticated, fetchNotifications]);

  const markAsRead = useCallback(async (id: number) => {
    // Optimistic update
    setNotifications((prev) =>
      prev.map((n) => (n.notification_id === id ? { ...n, is_read: true } : n))
    );
    await notificationService.markAsRead(id);
  }, []);

  const markAllAsRead = useCallback(async () => {
    // Optimistic update
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
    await notificationService.markAllAsRead();
  }, []);

  const deleteNotification = useCallback(async (id: number) => {
    // Optimistic update
    setNotifications((prev) => prev.filter((n) => n.notification_id !== id));
    await notificationService.deleteNotification(id);
  }, []);

  const deleteAllNotifications = useCallback(async () => {
    // Optimistic update
    setNotifications([]);
    await notificationService.deleteAllNotifications();
  }, []);

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  return {
    notifications,
    unreadCount,
    loading,
    refetch: () => fetchNotifications(false),
    markAsRead,
    markAllAsRead,
    deleteNotification,
    deleteAllNotifications,
  };
}
