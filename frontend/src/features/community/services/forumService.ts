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
  ForumVoteResponse,
  TrendingTopic,
  UpdateForumPostInput,
} from "../types";
import { FORUM_CATEGORIES, TRENDING_TOPICS } from "../data/mockForum";
import { formatForumDate, getInitials } from "../utils/forumDate";
import { AdminContentItem, ModerationItem } from "@/features/admin/types";

export function getUserSubmittedPosts(): ForumPost[] {
  return [];
}

export function saveUserSubmittedPost(_post: ForumPost) {
  // Không lưu mock vào localStorage, dữ liệu được đồng bộ trực tiếp từ Backend
}

export function getAdminStatusOverrides(): Record<string, string> {
  return {};
}

export function setAdminPostStatus(_postId: string | number, _status: string) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("forum_status_changed"));
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
    status: p.status || "approved",
    views: p.views ?? 0,
    createdAt: p.created_at,
    userId: p.author?.user_id,
    rejectReason: (p as any).reject_reason ?? null,
    isFlagged: (p as any).is_flagged ?? false,
    flagReason: (p as any).flag_reason ?? null,
    updatedAt: (p as any).updated_at ?? undefined,
    userVoted: (p as any).my_vote ?? null,
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
    votes: (c as any).rating ?? (c as any).votes ?? 0,
    createdAt: c.created_at,
    userId: c.author?.user_id,
    userVoted: (c as any).my_vote ?? null,
  };
}

export const forumService = {
  /**
   * 1. Lấy danh sách danh mục diễn đàn thực tế
   * GET /api/v1/forum/categories
   */
  async listCategories(): Promise<BackendForumCategory[]> {
    try {
      const res = await apiClient.get<BackendForumCategory[]>("/forum/categories");
      return Array.isArray(res) ? res : ((res as any)?.data || []);
    } catch (err) {
      console.warn("[forumService] listCategories error:", err);
      return [];
    }
  },

  /**
   * 2. Chủ đề nổi bật (trending tags trong 7 ngày gần nhất, mặc định 10, tối đa 20)
   * GET /api/v1/forum/trending
   */
  async getTrending(limit: number = 10): Promise<TrendingTopic[]> {
    try {
      const res = await apiClient.get<TrendingTopic[]>("/forum/trending", {
        params: { limit },
      });
      const data = Array.isArray(res) ? res : ((res as any)?.data || []);
      return data.map((t: any) => ({
        tag: t.tag.startsWith("#") ? t.tag : `#${t.tag}`,
        posts: Number(t.posts) || 0,
      }));
    } catch (err) {
      console.warn("[forumService] getTrending error:", err);
      return TRENDING_TOPICS;
    }
  },

  /**
   * 2. Lấy danh sách bài viết diễn đàn (lọc theo danh mục, từ khóa, tag, sắp xếp, phân trang)
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
      if (query?.q && query.q.trim()) {
        const trimmed = query.q.trim();
        if (trimmed.startsWith("#")) {
          params.tag = trimmed.replace(/^#/, "");
        } else {
          params.q = trimmed;
        }
      }
      if (query?.tag && query.tag.trim()) {
        params.tag = query.tag.trim().replace(/^#/, "");
      }
      if (query?.sort) params.sort = query.sort;

      const res = await apiClient.get<BackendForumPostListItem[]>("/forum/posts", { params });
      const rawList: BackendForumPostListItem[] = Array.isArray(res)
        ? res
        : (res as any)?.data || [];

      const rawPagination = (res as any)?.pagination;
      const pagination: ForumPagination = {
        page: rawPagination?.page ?? query?.page ?? 1,
        limit: rawPagination?.limit ?? query?.limit ?? 10,
        total: rawPagination?.total ?? rawList.length,
        total_pages: rawPagination?.total_pages ?? 1,
      };

      let mappedPosts = rawList.map(mapBackendPostToForumPost);

      if (query?.isMyPostsOnly && query.currentUserId) {
        mappedPosts = mappedPosts.filter((p) => p.userId === query.currentUserId);
      }

      return { data: mappedPosts, pagination };
    } catch (err) {
      console.warn("[forumService] listPosts error:", err);
      return {
        data: [],
        pagination: { page: 1, limit: 10, total: 0, total_pages: 0 },
      };
    }
  },

  /**
   * 3. Lấy chi tiết bài viết và tăng lượt xem
   * GET /api/v1/forum/posts/:id
   */
  async getPostDetail(id: number | string): Promise<ForumPost | null> {
    const numericId = Number(id);
    if (!numericId || isNaN(numericId)) {
      return null;
    }

    try {
      const res = await apiClient.get<BackendForumPostDetail>(`/forum/posts/${numericId}`);
      const postData = (res as any)?.data || res;
      if (!postData || !postData.blog_id) return null;
      return mapBackendPostToForumPost(postData);
    } catch (err) {
      console.warn(`[forumService] getPostDetail error for #${numericId}:`, err);
      return null;
    }
  },

  /**
   * 4. Đăng bài viết mới (thành viên chờ duyệt, admin duyệt luôn)
   * POST /api/v1/forum/posts
   */
  async createPost(
    dto: CreateForumPostInput,
    _currentUser?: { user_id?: number; full_name?: string; email?: string; role?: string }
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
    return (res as any)?.data || res;
  },

  /**
   * Chỉnh sửa bài viết (chủ bài hoặc admin)
   * PUT /api/v1/forum/posts/:id
   */
  async updatePost(
    id: number | string,
    dto: UpdateForumPostInput
  ): Promise<ForumPost> {
    const numericId = Number(id);
    const payload: any = {};
    if (dto.title !== undefined) payload.title = dto.title.trim();
    if (dto.content !== undefined) payload.content = dto.content.trim();
    if (dto.category_id !== undefined && dto.category_id !== null) {
      payload.category_id = Number(dto.category_id);
    }
    if (dto.tags !== undefined) {
      payload.tags = dto.tags.map((t) => t.trim().replace(/^#/, "")).filter(Boolean);
    }

    const res = await apiClient.put<BackendForumPostDetail>(
      `/forum/posts/${numericId}`,
      payload
    );
    const postData = (res as any)?.data || res;
    return mapBackendPostToForumPost(postData);
  },

  /**
   * Xóa mềm bài viết (chủ bài hoặc admin)
   * DELETE /api/v1/forum/posts/:id
   */
  async deletePost(id: number | string): Promise<{ success: boolean; message: string }> {
    const numericId = Number(id);
    const res = await apiClient.delete<{ success: boolean; message: string }>(
      `/forum/posts/${numericId}`
    );
    return (res as any)?.data || res;
  },

  /**
   * Bình chọn bài viết (up / down / null để hủy)
   * POST /api/v1/forum/posts/:id/vote
   */
  async votePost(
    id: number | string,
    vote: "up" | "down" | null
  ): Promise<ForumVoteResponse> {
    const numericId = Number(id);
    const res = await apiClient.post<ForumVoteResponse>(
      `/forum/posts/${numericId}/vote`,
      { vote }
    );
    return (res as any)?.data || res;
  },

  /**
   * 5. Lấy danh sách comment của bài viết
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
   * 6. Gửi comment mới vào bài viết đã duyệt
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
   * Xóa mềm bình luận (chủ bình luận hoặc admin)
   * DELETE /api/v1/forum/posts/:postId/comments/:commentId
   */
  async deleteComment(
    postId: number | string,
    commentId: number | string
  ): Promise<{ success: boolean; message: string }> {
    const pId = Number(postId);
    const cId = Number(commentId);
    const res = await apiClient.delete<{ success: boolean; message: string }>(
      `/forum/posts/${pId}/comments/${cId}`
    );
    return (res as any)?.data || res;
  },

  /**
   * Bình chọn bình luận (up / down / null để hủy)
   * POST /api/v1/forum/posts/:postId/comments/:commentId/vote
   */
  async voteComment(
    postId: number | string,
    commentId: number | string,
    vote: "up" | "down" | null
  ): Promise<ForumVoteResponse> {
    const pId = Number(postId);
    const cId = Number(commentId);
    const res = await apiClient.post<ForumVoteResponse>(
      `/forum/posts/${pId}/comments/${cId}/vote`,
      { vote }
    );
    return (res as any)?.data || res;
  },

  /**
   * 7. Lấy danh sách bài viết của người dùng hiện tại (bao gồm cả chờ duyệt)
   * GET /api/v1/forum/my-posts
   */
  async listMyPosts(
    query?: { page?: number; limit?: number }
  ): Promise<{ data: ForumPost[]; pagination: ForumPagination }> {
    try {
      const res = await apiClient.get<BackendForumPostListItem[]>("/forum/my-posts", {
        params: query,
      });
      const rawList: BackendForumPostListItem[] = Array.isArray(res)
        ? res
        : (res as any)?.data || [];

      const rawPagination = (res as any)?.pagination;
      const pagination: ForumPagination = {
        page: rawPagination?.page ?? query?.page ?? 1,
        limit: rawPagination?.limit ?? query?.limit ?? 20,
        total: rawPagination?.total ?? rawList.length,
        total_pages: rawPagination?.total_pages ?? 1,
      };

      const mappedPosts = rawList.map((p) => {
        const item = mapBackendPostToForumPost(p);
        if ((p as any).status) item.status = (p as any).status;
        return item;
      });

      return { data: mappedPosts, pagination };
    } catch (err) {
      console.warn("[forumService] listMyPosts error:", err);
      return {
        data: [],
        pagination: { page: 1, limit: 20, total: 0, total_pages: 0 },
      };
    }
  },

  /**
   * 8. Admin: Lấy danh sách toàn bộ bài viết (có lọc theo status)
   * GET /api/v1/admin/forum/posts
   */
  async adminListPosts(
    query?: { status?: string; page?: number; limit?: number }
  ): Promise<{ data: ForumPost[]; pagination: ForumPagination }> {
    try {
      const res = await apiClient.get<BackendForumPostListItem[]>("/admin/forum/posts", {
        params: query,
      });
      const rawList: BackendForumPostListItem[] = Array.isArray(res)
        ? res
        : (res as any)?.data || [];

      const rawPagination = (res as any)?.pagination;
      const pagination: ForumPagination = {
        page: rawPagination?.page ?? query?.page ?? 1,
        limit: rawPagination?.limit ?? query?.limit ?? 20,
        total: rawPagination?.total ?? rawList.length,
        total_pages: rawPagination?.total_pages ?? 1,
      };

      const mappedPosts = rawList.map((p) => {
        const item = mapBackendPostToForumPost(p);
        if ((p as any).status) item.status = (p as any).status;
        return item;
      });

      return { data: mappedPosts, pagination };
    } catch (err) {
      console.warn("[forumService] adminListPosts error:", err);
      return {
        data: [],
        pagination: { page: 1, limit: 20, total: 0, total_pages: 0 },
      };
    }
  },

  /**
   * 9. Admin: Lấy danh sách hàng đợi các bài viết đang chờ duyệt
   * GET /api/v1/admin/forum/moderation/pending
   */
  async adminGetPendingModeration(
    query?: { page?: number; limit?: number }
  ): Promise<{ data: ForumPost[]; pagination: ForumPagination }> {
    try {
      const res = await apiClient.get<BackendForumPostListItem[]>(
        "/admin/forum/moderation/pending",
        { params: query }
      );
      const rawList: BackendForumPostListItem[] = Array.isArray(res)
        ? res
        : (res as any)?.data || [];

      const rawPagination = (res as any)?.pagination;
      const pagination: ForumPagination = {
        page: rawPagination?.page ?? query?.page ?? 1,
        limit: rawPagination?.limit ?? query?.limit ?? 20,
        total: rawPagination?.total ?? rawList.length,
        total_pages: rawPagination?.total_pages ?? 1,
      };

      const mappedPosts = rawList.map((p) => {
        const item = mapBackendPostToForumPost(p);
        item.status = "pending_review";
        return item;
      });

      return { data: mappedPosts, pagination };
    } catch (err) {
      console.warn("[forumService] adminGetPendingModeration error:", err);
      return {
        data: [],
        pagination: { page: 1, limit: 20, total: 0, total_pages: 0 },
      };
    }
  },

  /**
   * 10. Admin: Đếm số lượng bài viết đang chờ duyệt
   * GET /api/v1/admin/forum/moderation/count
   */
  async adminGetPendingCount(): Promise<number> {
    try {
      const res = await apiClient.get<{ count: number }>("/admin/forum/moderation/count");
      return (res as any)?.count ?? (res as any)?.data?.count ?? 0;
    } catch (err) {
      console.warn("[forumService] adminGetPendingCount error:", err);
      return 0;
    }
  },

  /**
   * 11. Admin: Phê duyệt / Từ chối / Gỡ bài viết thật trong cơ sở dữ liệu
   * PUT /api/v1/admin/forum/posts/:id/status
   */
  async adminUpdatePostStatus(
    id: number | string,
    status: "approved" | "rejected" | "removed" | "pending_review"
  ): Promise<ForumPost> {
    const numericId = Number(id);
    const res = await apiClient.put<BackendForumPostDetail>(
      `/admin/forum/posts/${numericId}/status`,
      { status }
    );
    const postData = (res as any)?.data || res;
    return mapBackendPostToForumPost(postData);
  },

  /**
   * 12. Admin: Xoá hẳn bài viết khỏi hệ thống
   * DELETE /api/v1/admin/forum/posts/:id
   */
  async adminDeletePost(id: number | string): Promise<{ success: boolean; message: string }> {
    const numericId = Number(id);
    const res = await apiClient.delete<{ success: boolean; message: string }>(
      `/admin/forum/posts/${numericId}`
    );
    return (res as any)?.data || res;
  },

  /**
   * Admin Helpers: Lấy danh sách nội dung bài viết thật cho trang Quản lý Nội dung
   */
  async getAdminContentList(): Promise<AdminContentItem[]> {
    const { data: posts } = await this.adminListPosts({ limit: 50 });
    return posts.map((p) => {
      let status: AdminContentItem["status"] = "Published";
      if (p.status === "pending_review") status = "Under Review";
      else if (p.status === "rejected" || p.status === "removed") status = "Removed";

      return {
        id: p.id,
        title: p.title,
        type: "Blog" as const,
        author: p.author,
        date: p.timestamp,
        reports: 0,
        status,
      };
    });
  },

  /**
   * Admin: Hàng chờ duyệt bài viết diễn đàn (bài gắn cờ lên đầu, cũ nhất trước)
   * GET /admin/moderation
   */
  async getAdminModeration(query?: {
    page?: number;
    limit?: number;
    is_flagged?: boolean;
  }): Promise<{
    data: any[];
    pagination: { page: number; limit: number; total: number; total_pages: number };
  }> {
    const params = new URLSearchParams();
    if (query?.page) params.append("page", String(query.page));
    if (query?.limit) params.append("limit", String(query.limit));
    if (query?.is_flagged !== undefined) params.append("is_flagged", String(query.is_flagged));

    const qs = params.toString() ? `?${params.toString()}` : "";
    return apiClient.get<{
      data: any[];
      pagination: { page: number; limit: number; total: number; total_pages: number };
    }>(`/admin/moderation${qs}`);
  },

  /**
   * Admin: Duyệt hoặc từ chối bài viết (chỉ bài chờ duyệt, từ chối bắt buộc có lý do)
   * PUT /admin/moderation/:id
   */
  async moderatePost(
    id: number | string,
    dto: { action: "approve" | "reject"; reason?: string }
  ): Promise<{ success: boolean; message: string; blog_id: number; status: string }> {
    return apiClient.put<{ success: boolean; message: string; blog_id: number; status: string }>(
      `/admin/moderation/${id}`,
      dto
    );
  },

  /**
   * Admin Helpers: Lấy danh sách hàng đợi kiểm duyệt bài viết thật (bao gồm chờ duyệt và đã xử lý)
   */
  async getAdminModerationQueue(): Promise<ModerationItem[]> {
    try {
      // 1. Gọi trực tiếp API chuyên dụng: GET /api/v1/admin/moderation (Hàng chờ duyệt)
      const res = await this.getAdminModeration({ limit: 50 });
      if (res && Array.isArray(res.data) && res.data.length > 0) {
        return res.data.map((p: any) => {
          let modStatus: ModerationItem["status"] = "Pending";
          if (p.status === "approved") modStatus = "Approved";
          else if (p.status === "removed" || p.status === "rejected") modStatus = "Removed";
          else modStatus = "Pending";

          return {
            id: `mod-post-${p.id || p.blog_id}`,
            contentId: p.id || p.blog_id,
            contentType: "Post" as const,
            author: p.author || p.user?.full_name || "Thành viên",
            title: p.title,
            category: p.category?.name || p.category || "Diễn đàn",
            excerpt: p.excerpt || p.content,
            tags: p.tags || [],
            snippet: p.title ? `${p.title}${p.excerpt ? ` — ${p.excerpt}` : ""}` : (p.excerpt || p.content?.slice(0, 150)),
            flagReasons: p.flag_reason ? [p.flag_reason] : p.is_flagged ? ["Bài viết bị gắn cờ"] : [],
            aiConfidence: p.status === "approved" ? 0.98 : 0.88,
            reportedAt: p.timestamp || (p.created_at ? new Date(p.created_at).toLocaleDateString("vi-VN") : "Gần đây"),
            status: modStatus,
          };
        });
      }
    } catch (err) {
      console.warn("[forumService] getAdminModeration error, falling back to adminListPosts:", err);
    }

    // Fallback: Lấy danh sách toàn bộ bài viết từ adminListPosts
    const { data: posts } = await this.adminListPosts({ limit: 50 });
    return posts.map((p) => {
      let modStatus: ModerationItem["status"] = "Pending";
      if (p.status === "approved") modStatus = "Approved";
      else if (p.status === "removed" || p.status === "rejected") modStatus = "Removed";
      else modStatus = "Pending";

      return {
        id: `mod-post-${p.id}`,
        contentId: p.id,
        contentType: "Post" as const,
        author: p.author,
        title: p.title,
        category: p.category,
        excerpt: p.excerpt || p.content,
        tags: p.tags,
        snippet: p.title ? `${p.title}${p.excerpt ? ` — ${p.excerpt}` : ""}` : (p.excerpt || p.content.slice(0, 150)),
        flagReasons: [],
        aiConfidence: p.status === "approved" ? 0.98 : 0.88,
        reportedAt: p.timestamp || "Gần đây",
        status: modStatus,
      };
    });
  },

  // ---- Backward compatibility helpers ----
  getPosts(): ForumPost[] {
    return [];
  },

  getPostById(_id: string): ForumPost | undefined {
    return undefined;
  },

  getCategories(): string[] {
    return FORUM_CATEGORIES;
  },

  getTrendingTopics(): TrendingTopic[] {
    return TRENDING_TOPICS;
  },
};