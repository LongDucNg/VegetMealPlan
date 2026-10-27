export interface CommentItem {
  id: string;
  author: string;
  authorInitials: string;
  verified?: boolean;
  content: string;
  timestamp: string;
  votes: number;
  userVoted?: "up" | "down" | null;
}

export interface ForumPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorHandle: string;
  authorInitials: string;
  verified: boolean;
  category: string;
  tags: string[];
  votes: number;
  userVoted?: "up" | "down" | null;
  commentsCount: number;
  timestamp: string;
  comments: CommentItem[];
  mediaUrl?: string;
  mediaType?: "image" | "video";
}

export interface TrendingTopic {
  tag: string;
  posts: string;
}
