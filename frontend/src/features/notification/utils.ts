import { NotificationType } from "./types";

/**
 * Định dạng thời gian tương đối bằng tiếng Việt
 */
export function formatTimeAgo(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    if (diffMs < 0) return "Vừa xong";

    const diffSec = Math.floor(diffMs / 1000);
    if (diffSec < 60) return "Vừa xong";

    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin} phút trước`;

    const diffHour = Math.floor(diffMin / 60);
    if (diffHour < 24) return `${diffHour} giờ trước`;

    const diffDay = Math.floor(diffHour / 24);
    if (diffDay < 7) return `${diffDay} ngày trước`;

    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return dateString;
  }
}

/**
 * Xác định URL điều hướng dựa vào loại thông báo và ref
 */
export function getNotificationLink(
  type: NotificationType,
  refType?: string,
  refId?: number
): string | null {
  if (refType === "subscription" || type.startsWith("SUBSCRIPTION")) {
    return "/me/settings?tab=subscription";
  }
  if (refType === "recipe" && refId) {
    return `/recipes/${refId}`;
  }
  if (refType === "blog" && refId) {
    return `/community/blogs/${refId}`;
  }
  return null;
}

