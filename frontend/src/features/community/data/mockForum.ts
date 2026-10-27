import { ForumPost, TrendingTopic } from "../types";

export const FORUM_CATEGORIES: string[] = [
  "Tất cả thảo luận",
  "Công thức & Mẹo bếp",
  "Dinh dưỡng & Sức khỏe",
  "Quán chay ngon",
  "Dành cho người mới",
  "Giao lưu cộng đồng",
];

export const TRENDING_TOPICS: TrendingTopic[] = [
  { tag: "#monchay", posts: "Công thức món chay" },
  { tag: "#dinhduong", posts: "Dinh dưỡng khoa học" },
  { tag: "#nguoimoi", posts: "Người mới bắt đầu" },
  { tag: "#quanchay", posts: "Quán chay ngon" },
  { tag: "#protein", posts: "Đạm thực vật" },
];

// Mock data đã được thay thế hoàn toàn bằng Backend APIs thật (/api/v1/forum/*)
export const FORUM_POSTS: ForumPost[] = [];
