export function getInitials(name?: string | null): string {
  if (!name || !name.trim()) return "VG";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function formatForumDate(dateStr?: string | null): string {
  if (!dateStr) return "Vừa xong";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 7) {
      return d.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    }
    if (diffDays >= 1) return `${diffDays} ngày trước`;
    if (diffHours >= 1) return `${diffHours} giờ trước`;
    if (diffMin >= 1) return `${diffMin} phút trước`;
    return "Vừa xong";
  } catch {
    return dateStr;
  }
}
