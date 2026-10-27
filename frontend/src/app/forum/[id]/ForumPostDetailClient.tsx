"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Share2,
  Lock,
  MessageSquare,
  Eye,
  Clock,
  Loader2,
  AlertCircle,
  AlertTriangle,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { useRole } from "@/context/RoleContext";
import {
  ForumPost,
  CommentItem,
  forumService,
} from "@/features/community";

export function ForumPostDetailClient({
  postId,
  initialPost = null,
}: {
  postId: string;
  initialPost?: ForumPost | null;
}) {
  const { isGuest } = useRole();
  const [post, setPost] = useState<ForumPost | null>(initialPost);
  const [loading, setLoading] = useState(!initialPost);
  const [comments, setComments] = useState<CommentItem[]>(initialPost?.comments || []);
  const [loadingComments, setLoadingComments] = useState(false);
  const [submittingComment, setSubmittingComment] = useState(false);
  const [commentError, setCommentError] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");
  const [copied, setCopied] = useState(false);
  const [otherPosts, setOtherPosts] = useState<ForumPost[]>([]);

  // Fetch real post details & increment views from Backend API
  useEffect(() => {
    let isMounted = true;

    forumService
      .getPostDetail(postId)
      .then((updated) => {
        if (isMounted) {
          if (updated) {
            setPost(updated);
          }
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [postId]);

  // Load real comments from Backend API
  useEffect(() => {
    const numId = Number(postId);
    if (numId && !isNaN(numId)) {
      setLoadingComments(true);
      forumService
        .listComments(numId, { page: 1, limit: 50 })
        .then((res) => {
          setComments(res.data);
        })
        .catch((err) => {
          console.warn("[ForumPostDetailClient] Error loading comments:", err);
        })
        .finally(() => {
          setLoadingComments(false);
        });
    }

    // Load related posts from Backend API
    forumService.listPosts({ limit: 4 }).then((res) => {
      setOtherPosts(res.data.filter((p) => p.id !== postId).slice(0, 3));
    });
  }, [postId]);

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || isGuest || submittingComment) return;

    setSubmittingComment(true);
    setCommentError(null);

    const currentId = post?.id || postId;
    const numId = Number(currentId);
    if (numId && !isNaN(numId)) {
      try {
        const created = await forumService.createComment(numId, {
          content: commentText.trim(),
        });
        setComments((prev) => [...prev, created]);
        setPost((prev) => (prev ? { ...prev, commentsCount: (prev.commentsCount || 0) + 1 } : prev));
        setCommentText("");
      } catch (err: any) {
        setCommentError(
          err?.message || "Không thể gửi bình luận lúc này. Vui lòng thử lại sau."
        );
      } finally {
        setSubmittingComment(false);
      }
    }
  };

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const rightRailContent = (
    <aside className="w-full space-y-6 select-none">
      <Card>
        <h3 className="font-serif font-bold text-xl text-stone-900 tracking-tight mb-4">
          Thảo luận nổi bật khác
        </h3>
        <div className="space-y-3.5 divide-y divide-stone-100">
          {otherPosts.map((op) => (
            <Link
              key={op.id}
              href={`/forum/${op.id}`}
              className="pt-3 first:pt-0 block group"
            >
              <h4 className="text-sm font-semibold text-stone-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
                {op.title}
              </h4>
              <p className="mt-1 text-xs text-stone-500">
                {op.author} · {op.timestamp}
              </p>
            </Link>
          ))}
          {otherPosts.length === 0 && (
            <p className="text-xs text-stone-400 py-2">
              Chưa có thảo luận liên quan nào khác.
            </p>
          )}
        </div>
      </Card>
    </aside>
  );

  if (loading) {
    return (
      <AppShell>
        <div className="flex flex-col items-center justify-center py-24 gap-3 text-stone-500">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
          <p className="text-sm font-medium">Đang tải nội dung bài viết từ máy chủ…</p>
        </div>
      </AppShell>
    );
  }

  if (!post) {
    return (
      <AppShell>
        <div className="max-w-xl mx-auto py-16 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto text-amber-600">
            <AlertCircle className="w-7 h-7" />
          </div>
          <h2 className="font-serif font-bold text-2xl text-stone-900">
            Không tìm thấy bài viết #{postId}
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            Bài viết này không tồn tại, đã bị gỡ bỏ hoặc đang chờ kiểm duyệt.
          </p>
          <div className="pt-2">
            <Link
              href="/forum"
              className="inline-flex items-center gap-2 h-10 px-5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Quay lại Diễn đàn thảo luận</span>
            </Link>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell rightRail={rightRailContent}>
      <div className="flex flex-col space-y-6">
        {/* Back Link */}
        <div>
          <Link
            href="/forum"
            className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={2} />
            <span>Quay lại diễn đàn thảo luận</span>
          </Link>
        </div>

        {/* Status Banners */}
        {post.status === "pending_review" ? (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-sm flex items-start gap-3 shadow-2xs">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-amber-950">Bài viết đang chờ kiểm duyệt</p>
              <p className="text-amber-800 text-xs mt-0.5">
                Bài viết này đang được ban quản trị xem xét trước khi công khai rộng rãi trên diễn đàn.
              </p>
            </div>
          </div>
        ) : (
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm flex items-center gap-2.5 shadow-2xs">
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0">✓</span>
            <span className="text-emerald-900 font-medium text-xs sm:text-sm">
              Bài viết đã được phê duyệt và đang hiển thị công khai trên diễn đàn.
            </span>
          </div>
        )}

        {/* Main Post Card */}
        <Card className="p-8">
          <div className="flex items-start gap-5">
            {/* Content Body */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2.5 mb-2">
                <Badge variant="success">{post.category}</Badge>
                {post.status === "pending_review" ? (
                  <span className="text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                    <span>⏳</span> Đang chờ duyệt
                  </span>
                ) : (
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                    <span>✓</span> Đã được duyệt
                  </span>
                )}
                <span className="text-xs text-stone-400">·</span>
                <span className="text-xs text-stone-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  Đăng lúc {post.timestamp}
                </span>
                <span className="text-xs text-stone-400">·</span>
                <span className="text-xs text-stone-500 flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-stone-400" />
                  {post.views ?? 0} lượt xem
                </span>
              </div>

              <h1 className="font-serif font-bold text-3xl sm:text-4xl text-stone-900 tracking-tight leading-tight">
                {post.title}
              </h1>

              {/* Author & Action Row */}
              <div className="mt-5 pb-5 border-b border-stone-100 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Avatar initials={post.authorInitials} verified={post.verified} />
                  <div>
                    <span className="text-base font-semibold text-stone-900">
                      {post.author}
                    </span>
                    <span className="text-xs text-stone-500 block">
                      {post.authorHandle}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleShare}
                  className="h-9 px-4 rounded-full border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700 text-sm font-medium inline-flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{copied ? "Đã sao chép liên kết!" : "Chia sẻ"}</span>
                </button>
              </div>

              {/* Article Content */}
              <div className="mt-6 text-stone-800 text-base leading-relaxed space-y-4 whitespace-pre-line">
                {post.content}
              </div>

              {/* Tags */}
              <div className="mt-8 pt-4 border-t border-stone-100 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/forum?tag=${tag.replace(/^#/, "")}`}
                    className="text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1 rounded-full transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Comments Section */}
        <Card className="p-8">
          <div className="flex items-center gap-2 mb-6">
            <MessageSquare className="w-5 h-5 text-emerald-700" />
            <h2 className="font-serif font-bold text-2xl text-stone-900 tracking-tight">
              Bình luận ({comments.length})
            </h2>
          </div>

          {/* New Comment Box */}
          {isGuest ? (
            <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200 text-center mb-6 select-none">
              <Lock className="w-6 h-6 text-amber-700 mx-auto mb-2" />
              <h3 className="font-serif font-bold text-lg text-stone-900">
                Tham gia thảo luận
              </h3>
              <p className="text-sm text-stone-600 mt-1 mb-4">
                Bạn đang xem với tư cách Khách. Hãy tạo tài khoản miễn phí hoặc đăng nhập để bình luận.
              </p>
              <div className="flex items-center justify-center gap-3">
                <Link
                  href="/register"
                  className="h-9 px-5 rounded-full bg-amber-400 hover:bg-amber-500 text-amber-950 text-sm font-medium transition-colors"
                >
                  Tạo tài khoản miễn phí
                </Link>
                <Link
                  href="/login"
                  className="h-9 px-4 rounded-full text-stone-700 hover:bg-stone-200 text-sm font-medium transition-colors"
                >
                  Đăng nhập
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handlePostComment} className="flex flex-col gap-3 mb-8">
              {commentError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{commentError}</span>
                </div>
              )}

              <textarea
                rows={3}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Chia sẻ góc nhìn của bạn hoặc thảo luận cùng cộng đồng…"
                className="w-full p-4 rounded-xl border border-stone-200 bg-white text-base text-stone-900 placeholder:text-stone-400 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 shadow-xs"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!commentText.trim() || submittingComment}
                  className="h-10 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-base font-semibold transition-colors disabled:opacity-50 disabled:pointer-events-none cursor-pointer shadow-sm inline-flex items-center gap-2"
                >
                  {submittingComment && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>{submittingComment ? "Đang gửi…" : "Gửi bình luận"}</span>
                </button>
              </div>
            </form>
          )}

          {/* Comments List */}
          {loadingComments ? (
            <div className="flex items-center justify-center py-8 gap-2 text-stone-400">
              <Loader2 className="w-5 h-5 animate-spin text-emerald-600" />
              <span className="text-sm">Đang tải bình luận từ máy chủ…</span>
            </div>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="p-4 rounded-xl bg-stone-50 border border-stone-100"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar
                        initials={comment.authorInitials}
                        verified={comment.verified}
                        className="scale-90"
                      />
                      <div>
                        <span className="text-base font-semibold text-stone-900">
                          {comment.author}
                        </span>
                        <span className="text-xs text-stone-400 ml-2">
                          {comment.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="mt-2.5 text-base text-stone-700 leading-relaxed pl-1 whitespace-pre-line">
                    {comment.content}
                  </p>
                </div>
              ))}

              {comments.length === 0 && (
                <p className="text-center py-6 text-sm text-stone-500">
                  Chưa có bình luận nào. Hãy là người đầu tiên tham gia thảo luận!
                </p>
              )}
            </div>
          )}
        </Card>
      </div>
    </AppShell>
  );
}