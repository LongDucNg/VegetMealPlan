import { apiClient } from "@/lib/apiClient";
import {
  BackendForumCategory,
  BackendForumComment,
  BackendForumPostDetail,
  BackendForumPostListItem,
  CommentItem,
  CreateForumCommentInput,
  CreateForumPostInput,
  CreateForumPostResponse,
  ForumPagination,
  ForumPost,
  ForumPostQueryParams,
  TrendingTopic,
} from "../types";
import { FORUM_CATEGORIES, TRENDING_TOPICS } from "../data/mockForum";
import { formatForumDate, getInitials } from "../utils/forumDate";
import { AdminContentItem, ModerationItem } from "@/features/admin/types";

const MY_POSTS_STORAGE_KEY = "veggie_user_forum_posts";
const ADMIN_STATUS_OVERRIDE_KEY = "veggie_admin_post_status_overrides";

export function getUserSubmittedPosts(): ForumPost[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(MY_POSTS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveUserSubmittedPost(post: ForumPost) {
  if (typeof window === "undefined") return;
  try {
    const current = getUserSubmittedPosts();
    const updated = [post, ...current.filter((p) => String(p.id) !== String(post.id))];
    localStorage.setItem(MY_POSTS_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn("Error saving post to localStorage:", err);
  }
}

export function getAdminStatusOverrides(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(ADMIN_STATUS_OVERRIDE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function setAdminPostStatus(postId: string | number, status: string) {
  if (typeof window === "undefined") return;
  try {
    const current = getAdminStatusOverrides();
    current[String(postId)] = status;
    localStorage.setItem(ADMIN_STATUS_OVERRIDE_KEY, JSON.stringify(current));

    // Update in user submitted posts as well
    const userPosts = getUserSubmittedPosts();
    const updatedUserPosts = userPosts.map((p) =>
      p.id === String(postId) ? { ...p, status } : p
    );
    localStorage.setItem(MY_POSTS_STORAGE_KEY, JSON.stringify(updatedUserPosts));

    window.dispatchEvent(new Event("forum_status_changed"));
  } catch (err) {
    console.warn("Error updating admin status override:", err);
  }
}

export function mapBackendPostToForumPost(
  p: BackendForumPostListItem | BackendForumPostDetail
): ForumPost {
  const rawContent = ("content" in p && p.content) ? p.content : ("excerpt" in p && p.excerpt ? p.excerpt : "");
  const content = rawContent || "";
  const excerpt =
    "excerpt" in p && p.excerpt
      ? p.excerpt
      : content.length > 200
      ? `${content.slice(0, 200)}…`
      : content;

  return {
    id: String(p.blog_id),
    numericId: p.blog_id,
    title: p.title || "",
    excerpt: excerpt || "",
    content: content || "",
    author: p.author?.full_name || "Thành viên Veggie",
    authorHandle: p.author ? `@user_${p.author.user_id}` : "@veggie.user",
    authorInitials: getInitials(p.author?.full_name),
    verified: true,
    category: p.category?.category_name || "Chung",
    categoryId: p.category?.category_id ?? null,
    tags: Array.isArray(p.tags) ? p.tags.map((t) => (t.startsWith("#") ? t : `#${t}`)) : [],
    votes: p.rating ?? 0,
    commentsCount: p.comment_count ?? 0,
    timestamp: formatForumDate(p.created_at),
    comments: [],
    status: "approved",
    views: p.views ?? 0,
    createdAt: p.created_at,
    userId: p.author?.user_id,
  };
}

export function mapBackendCommentToCommentItem(c: BackendForumComment): CommentItem {
  return {
    id: String(c.comment_id),
    numericId: c.comment_id,
    author: c.author?.full_name || "Thành viên",
    authorInitials: getInitials(c.author?.full_name),
    verified: false,
    content: c.content || "",
    timestamp: formatForumDate(c.created_at),
    votes: 0,
    createdAt: c.created_at,
  };
}

export const forumService = {
  /**
   * Lấy danh sách danh mục diễn đàn
   * GET /api/v1/forum/categories
   */
  async listCategories(): Promise<BackendForumCategory[]> {
    try {
      const res = await apiClient.get<BackendForumCategory[]>("/forum/categories");
      return Array.isArray(res) ? res : ((res as any)?.data || []);
    } catch (err) {
      console.warn("[forumService] listCategories error, returning empty list:", err);
      return [];
    }
  },

  /**
   * Lấy danh sách bài viết diễn đàn có phân trang, lọc, tìm kiếm, sắp xếp
   * Tự động kết hợp bài viết của người dùng (kể cả khi đang chờ duyệt)
   * GET /api/v1/forum/posts
   */
  async listPosts(
    query?: ForumPostQueryParams & { currentUserId?: number; isMyPostsOnly?: boolean; isAdmin?: boolean }
  ): Promise<{ data: ForumPost[]; pagination: ForumPagination }> {
    try {
      const params: Record<string, any> = {};
      if (query?.page) params.page = query.page;
      if (query?.limit) params.limit = query.limit;
      if (query?.category_id) params.category_id = query.category_id;
      if (query?.q && query.q.trim()) params.q = query.q.trim();
      if (query?.tag && query.tag.trim()) {
        params.tag = query.tag.trim().replace(/^#/, "");
      }
      if (query?.sort) params.sort = query.sort;

      let rawList: BackendForumPostListItem[] = [];
      try {
        const res = await apiClient.get<BackendForumPostListItem[]>("/forum/posts", { params });
        rawList = Array.isArray(res) ? res : (res as any)?.data || [];
      } catch (err) {
        console.warn("[forumService] Backend listPosts error, using local fallback:", err);
      }

      const overrides = getAdminStatusOverrides();
      const mappedPosts = rawList.map((p) => {
        const mapped = mapBackendPostToForumPost(p);
        if (overrides[mapped.id]) {
          mapped.status = overrides[mapped.id];
        }
        return mapped;
      });

      // Merge user submitted posts
      const userSubmitted = getUserSubmittedPosts();
      const allPostsMap = new Map<string, ForumPost>();

      // Put server approved posts first
      mappedPosts.forEach((p) => allPostsMap.set(p.id, p));

      // Merge user submitted posts (updating status with overrides)
      userSubmitted.forEach((p) => {
        const finalStatus = overrides[p.id] || p.status || "pending_review";
        const updatedPost = { ...p, status: finalStatus };

        // If user is viewing their own posts, or admin is viewing, or status was approved by admin
        if (
          query?.isAdmin ||
          finalStatus === "approved" ||
          query?.isMyPostsOnly ||
          (query?.currentUserId && p.userId === query.currentUserId) ||
          !query?.currentUserId // also show to current author
        ) {
          allPostsMap.set(p.id, updatedPost);
        }
      });

      let combined = Array.from(allPostsMap.values());

      // Filter by My Posts only if selected
      if (query?.isMyPostsOnly) {
        combined = combined.filter((p) => {
          if (query.currentUserId && p.userId) {
            return p.userId === query.currentUserId;
          }
          return p.author === "Tôi" || p.userId === 3;
        });
      }

      // Filter by category if selected
      if (query?.category_id) {
        combined = combined.filter((p) => p.categoryId === query.category_id);
      }

      // Filter by keyword query if entered
      if (query?.q && query.q.trim()) {
        const qLower = query.q.trim().toLowerCase();
        combined = combined.filter(
          (p) =>
            p.title.toLowerCase().includes(qLower) ||
            p.content.toLowerCase().includes(qLower) ||
            p.tags.some((t) => t.toLowerCase().includes(qLower))
        );
      }

      // Sort
      if (query?.sort === "oldest") {
        combined.sort((a, b) => Number(a.id) - Number(b.id));
      } else if (query?.sort === "most_viewed") {
        combined.sort((a, b) => (b.views ?? 0) - (a.views ?? 0));
      } else {
        // newest
        combined.sort((a, b) => Number(b.id) - Number(a.id));
      }

      const pagination: ForumPagination = {
        page: query?.page || 1,
        limit: query?.limit || 10,
        total: combined.length,
        total_pages: Math.ceil(combined.length / (query?.limit || 10)) || 1,
      };

      return { data: combined, pagination };
    } catch (err) {
      console.warn("[forumService] listPosts error:", err);
      return {
        data: [],
        pagination: { page: 1, limit: 10, total: 0, total_pages: 0 },
      };
    }
  },

  /**
   * Lấy chi tiết bài viết (tăng lượt xem)
   * GET /api/v1/forum/posts/:id
   */
  async getPostDetail(id: number | string): Promise<ForumPost | null> {
    const numericId = Number(id);
    const overrides = getAdminStatusOverrides();
    const overrideStatus = overrides[String(id)];

    if (numericId && !isNaN(numericId)) {
      try {
        const res = await apiClient.get<BackendForumPostDetail>(`/forum/posts/${numericId}`);
        const postData = (res as any)?.data || res;
        const mapped = mapBackendPostToForumPost(postData);
        if (overrideStatus) mapped.status = overrideStatus;
        return mapped;
      } catch {
        // Backend returns 404 for posts that are pending review
      }
    }

    // Check user submitted posts
    const userPosts = getUserSubmittedPosts();
    const found = userPosts.find(
      (p) => String(p.id) === String(id) || (numericId && p.numericId === numericId)
    );
    if (found) {
      if (overrideStatus) found.status = overrideStatus;
      return found;
    }

    return null;
  },

  /**
   * Đăng bài viết mới (thành viên chờ duyệt, admin duyệt luôn)
   * POST /api/v1/forum/posts
   */
  async createPost(
    dto: CreateForumPostInput,
    currentUser?: { user_id?: number; full_name?: string; email?: string; role?: string }
  ): Promise<CreateForumPostResponse> {
    const payload: CreateForumPostInput = {
      title: dto.title.trim(),
      content: dto.content.trim(),
    };
    if (dto.category_id !== undefined && dto.category_id !== null) {
      payload.category_id = Number(dto.category_id);
    }
    if (dto.tags && dto.tags.length > 0) {
      payload.tags = dto.tags.map((t) => t.trim().replace(/^#/, "")).filter(Boolean);
    }

    const res = await apiClient.post<CreateForumPostResponse>("/forum/posts", payload);
    const responseData: CreateForumPostResponse = (res as any)?.data || res;

    // Save to user submitted posts so that user immediately sees their own post!
    const newPostId = String(responseData.blog_id);
    const isAdmin = currentUser?.role?.toLowerCase() === "admin";
    const postStatus = responseData.status || (isAdmin ? "approved" : "pending_review");

    const userPost: ForumPost = {
      id: newPostId,
      numericId: responseData.blog_id,
      title: responseData.title || dto.title,
      excerpt: dto.content.length > 200 ? `${dto.content.slice(0, 200)}…` : dto.content,
      content: dto.content,
      author: currentUser?.full_name || "Tôi",
      authorHandle: currentUser?.email ? `@${currentUser.email.split("@")[0]}` : "@me",
      authorInitials: getInitials(currentUser?.full_name),
      verified: true,
      category: dto.category_name || "Thảo luận",
      categoryId: responseData.category_id ?? null,
      tags: responseData.tags
        ? responseData.tags.map((t) => (t.startsWith("#") ? t : `#${t}`))
        : (dto.tags ? dto.tags.map((t) => (t.startsWith("#") ? t : `#${t}`)) : []),
      votes: 0,
      commentsCount: 0,
      timestamp: "Vừa xong",
      comments: [],
      status: postStatus,
      views: 0,
      userId: currentUser?.user_id,
    };
    saveUserSubmittedPost(userPost);

    return responseData;
  },

  /**
   * Lấy danh sách comment của bài viết
   * GET /api/v1/forum/posts/:id/comments
   */
  async listComments(
    postId: number | string,
    query?: { page?: number; limit?: number }
  ): Promise<{ data: CommentItem[]; pagination: ForumPagination }> {
    const numericId = Number(postId);
    if (!numericId || isNaN(numericId)) {
      return {
        data: [],
        pagination: { page: 1, limit: 20, total: 0, total_pages: 0 },
      };
    }

    try {
      const res = await apiClient.get<BackendForumComment[]>(
        `/forum/posts/${numericId}/comments`,
        { params: query }
      );

      const rawList: BackendForumComment[] = Array.isArray(res)
        ? res
        : (res as any)?.data || [];

      const rawPagination = (res as any)?.pagination;
      const pagination: ForumPagination = {
        page: rawPagination?.page ?? query?.page ?? 1,
        limit: rawPagination?.limit ?? query?.limit ?? 20,
        total: rawPagination?.total ?? rawList.length,
        total_pages: rawPagination?.total_pages ?? 1,
      };

      const mappedComments = rawList.map(mapBackendCommentToCommentItem);
      return { data: mappedComments, pagination };
    } catch (err) {
      console.warn("[forumService] listComments error:", err);
      return {
        data: [],
        pagination: { page: 1, limit: 20, total: 0, total_pages: 0 },
      };
    }
  },

  /**
   * Gửi comment mới vào bài viết đã duyệt
   * POST /api/v1/forum/posts/:id/comments
   */
  async createComment(
    postId: number | string,
    dto: CreateForumCommentInput
  ): Promise<CommentItem> {
    const numericId = Number(postId);
    const res = await apiClient.post<BackendForumComment>(
      `/forum/posts/${numericId}/comments`,
      { content: dto.content.trim() }
    );
    const commentData = (res as any)?.data || res;
    return mapBackendCommentToCommentItem(commentData);
  },

  /**
   * API cho Admin: Lấy toàn bộ danh sách nội dung diễn đàn thực tế
   */
  async getAdminContentList(): Promise<AdminContentItem[]> {
    const { data: posts } = await this.listPosts({ isAdmin: true, limit: 50 });
    return posts.map((p) => ({
      id: p.id,
      title: p.title,
      type: "Blog" as const,
      author: p.author,
      date: p.timestamp,
      reports: 0,
      status:
        p.status === "approved"
          ? ("Published" as const)
          : p.status === "rejected" || p.status === "removed"
          ? ("Removed" as const)
          : ("Under Review" as const),
    }));
  },

  /**
   * API cho Admin: Lấy danh sách hàng đợi kiểm duyệt thực tế
   */
  async getAdminModerationQueue(): Promise<ModerationItem[]> {
    const userPosts = getUserSubmittedPosts();
    const overrides = getAdminStatusOverrides();

    const pending = userPosts.filter((p) => {
      const status = overrides[p.id] || p.status;
      return status === "pending_review" || !status;
    });

    return pending.map((p) => ({
      id: `mod-${p.id}`,
      contentId: p.id,
      contentType: "Post" as const,
      author: p.author,
      snippet: p.excerpt || p.content.slice(0, 150),
      flagReasons: ["Inappropriate"],
      aiConfidence: 0.88,
      reportedAt: p.timestamp || "Gần đây",
      status: "Pending" as const,
    }));
  },

  // ---- Backward compatibility helpers ----
  getPosts(): ForumPost[] {
    return getUserSubmittedPosts();
  },

  getPostById(id: string): ForumPost | undefined {
    const userPosts = getUserSubmittedPosts();
    return userPosts.find((p) => String(p.id) === String(id));
  },

  getCategories(): string[] {
    return FORUM_CATEGORIES;
  },

  getTrendingTopics(): TrendingTopic[] {
    return TRENDING_TOPICS;
  },
};
