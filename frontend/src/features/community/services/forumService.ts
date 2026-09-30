import { FORUM_POSTS, FORUM_CATEGORIES, TRENDING_TOPICS } from "../data/mockForum";
import { ForumPost, TrendingTopic, CommentItem } from "../types";

export const forumService = {
  getPosts(): ForumPost[] {
    return FORUM_POSTS;
  },

  getPostById(id: string): ForumPost | undefined {
    return FORUM_POSTS.find((p) => p.id === id);
  },

  getCategories(): string[] {
    return FORUM_CATEGORIES;
  },

  getTrendingTopics(): TrendingTopic[] {
    return TRENDING_TOPICS;
  },

  getPostsByCategory(category: string): ForumPost[] {
    if (!category || category === "All discussions") return FORUM_POSTS;
    return FORUM_POSTS.filter((p) => p.category === category);
  },

  searchPosts(query: string): ForumPost[] {
    const q = (query || "").toLowerCase().trim();
    if (!q) return FORUM_POSTS;
    return FORUM_POSTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  },

  addComment(postId: string, comment: CommentItem): boolean {
    const post = this.getPostById(postId);
    if (!post) return false;
    post.comments.push(comment);
    post.commentsCount = post.comments.length;
    return true;
  },
};
