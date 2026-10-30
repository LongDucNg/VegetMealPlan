export interface BackendForumCategory {
  category_id: number;
  category_name: string;
  description?: string | null;
}

export interface BackendForumPostAuthor {
  user_id: number;
  full_name: string;
}

export interface BackendForumPostCategory {
  category_id: number;
  category_name: string;
}

export interface BackendForumPostListItem {
  blog_id: number;
  title: string;
  category: BackendForumPostCategory | null;
  tags: string[];
  views: number;
  rating: number;
  comment_count: number;
  author: BackendForumPostAuthor | null;
  created_at: string;
  excerpt: string;
  status?: string;
}

export interface BackendForumPostDetail {
  blog_id: number;
  title: string;
  category: BackendForumPostCategory | null;
  tags: string[];
  views: number;
  rating: number;
  comment_count: number;
  author: BackendForumPostAuthor | null;
  created_at: string;
  content: string;
  updated_at?: string;
  excerpt?: string;
  status?: string;
}

export interface BackendForumComment {
  comment_id: number;
  content: string;
  author: BackendForumPostAuthor | null;
  created_at: string;
}

export interface ForumPagination {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

export interface ForumPostQueryParams {
  page?: number;
  limit?: number;
  category_id?: number;
  q?: string;
  tag?: string;
  sort?: "newest" | "oldest" | "most_viewed";
}

export interface CreateForumPostInput {
  title: string;
  content: string;
  category_id?: number;
  category_name?: string;
  tags?: string[];
}

export interface CreateForumPostResponse {
  blog_id: number;
  title: string;
  category_id: number | null;
  tags: string[];
  status: "approved" | "pending_review" | string;
  created_at: string;
}

export interface CreateForumCommentInput {
  content: string;
}

export interface UpdateForumPostInput {
  title?: string;
  content?: string;
  category_id?: number;
  tags?: string[];
}

export interface ForumVoteResponse {
  rating: number;
  my_vote: "up" | "down" | null;
}

export interface CommentItem {
  id: string;
  numericId?: number;
  author: string;
  authorInitials: string;
  verified?: boolean;
  content: string;
  timestamp: string;
  votes: number;
  userVoted?: "up" | "down" | null;
  createdAt?: string;
  userId?: number;
}

export interface ForumPost {
  id: string;
  numericId?: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorHandle: string;
  authorInitials: string;
  verified: boolean;
  category: string;
  categoryId?: number | null;
  tags: string[];
  votes: number;
  userVoted?: "up" | "down" | null;
  commentsCount: number;
  timestamp: string;
  comments: CommentItem[];
  mediaUrl?: string;
  mediaType?: "image" | "video";
  status?: "approved" | "pending_review" | "rejected" | string;
  views?: number;
  createdAt?: string;
  userId?: number;
  rejectReason?: string | null;
  isFlagged?: boolean;
  flagReason?: string | null;
  updatedAt?: string;
}

export interface TrendingTopic {
  tag: string;
  posts: string | number;
}
