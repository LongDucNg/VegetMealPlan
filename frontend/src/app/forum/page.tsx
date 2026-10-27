"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  MessageSquare,
  Plus,
  Eye,
  Loader2,
  CheckCircle,
  AlertCircle,
  Clock,
  Sparkles,
  UserCheck,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Chip } from "@/components/ui/Chip";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { useRole } from "@/context/RoleContext";
import {
  forumService,
  BackendForumCategory,
  ForumPost,
  ForumRightRail,
} from "@/features/community";

function ForumContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isGuest, role, user, isAdmin } = useRole();

  const urlTag = searchParams.get("tag") || "";
  const urlCategory = searchParams.get("category_id");
  const urlQ = searchParams.get("q") || "";

  // State
  const [categories, setCategories] = useState<BackendForumCategory[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | undefined>(
    urlCategory ? Number(urlCategory) : undefined
  );
  const [showMyPosts, setShowMyPosts] = useState(false);
  const [sort, setSort] = useState<"newest" | "oldest" | "most_viewed">("newest");
  const [searchQuery, setSearchQuery] = useState(urlTag ? `#${urlTag}` : urlQ);
  const [debouncedQuery, setDebouncedQuery] = useState(urlTag ? `#${urlTag}` : urlQ);

  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [myPostCount, setMyPostCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // New post modal state
  const [newPostModalOpen, setNewPostModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategoryId, setNewCategoryId] = useState<number | undefined>(undefined);
  const [newContent, setNewContent] = useState("");
  const [newTags, setNewTags] = useState("#monchay");
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccessMsg, setSubmitSuccessMsg] = useState<string | null>(null);
  const [submitErrorMsg, setSubmitErrorMsg] = useState<string | null>(null);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 350);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Load categories from real BE
  useEffect(() => {
    let mounted = true;
    forumService.listCategories().then((res) => {
      if (mounted) {
        setCategories(res);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  // Fetch posts from Backend API
  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      if (showMyPosts) {
        const myRes = await forumService.listMyPosts();
        const activePosts = myRes.data.filter((p) => p.status !== "removed" && p.status !== "rejected");
        setPosts(activePosts);
        setMyPostCount(activePosts.length);
      } else {
        const res = await forumService.listPosts({
          category_id: selectedCategoryId,
          q: debouncedQuery,
          sort,
          page: 1,
          limit: 30,
          currentUserId: user?.user_id,
        });
        const activePosts = res.data.filter((p) => p.status !== "removed" && p.status !== "rejected");
        setPosts(activePosts);

        if (user?.user_id) {
          forumService
            .listMyPosts()
            .then((myRes) => {
              const count = myRes.data.filter((p) => p.status !== "removed" && p.status !== "rejected").length;
              setMyPostCount(count);
            })
            .catch(() => { });
        }
      }
    } catch (err) {
      console.error("[ForumPage] Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  }, [selectedCategoryId, debouncedQuery, sort, user?.user_id, showMyPosts]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const resetForm = () => {
    setNewTitle("");
    setNewCategoryId(undefined);
    setNewTags("#monchay");
    setNewContent("");
    setSubmitSuccessMsg(null);
    setSubmitErrorMsg(null);
    setNewPostModalOpen(false);
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim() || isGuest) return;

    setSubmitting(true);
    setSubmitErrorMsg(null);
    setSubmitSuccessMsg(null);

    try {
      const tagList = newTags
        .split(/[\s,]+/)
        .map((t) => t.trim().replace(/^#/, ""))
        .filter(Boolean);

      const res = await forumService.createPost(
        {
          title: newTitle.trim(),
          content: newContent.trim(),
          category_id: newCategoryId,
          tags: tagList.length > 0 ? tagList : undefined,
        },
        user || { full_name: "Tôi", role: role }
      );

      if (res.status === "approved" || role === "Admin") {
        setSubmitSuccessMsg("Đăng bài viết thành công!");
      } else {
        setSubmitSuccessMsg(
          "Bài viết đã được gửi thành công và đang chờ ban quản trị kiểm duyệt trước khi công khai rộng rãi."
        );
      }

      fetchPosts();

      setTimeout(() => {
        resetForm();
      }, 1800);
    } catch (err: any) {
      setSubmitErrorMsg(
        err?.message || "Không thể đăng bài viết lúc này. Vui lòng thử lại sau."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AppShell
      rightRail={
        <ForumRightRail
          onSelectTag={(tag) => {
            setShowMyPosts(false);
            setSearchQuery(tag);
          }}
        />
      }
    >
      <div className="flex flex-col space-y-7">
        {/* Header */}
        <PageHeader
          eyebrow="GIAO LƯU CỘNG ĐỒNG"
          title="Diễn đàn & Bài viết cộng đồng"
          subtitle="Khám phá kinh nghiệm ăn chay thực tế, địa điểm ăn uống thú vị và cẩm nang dinh dưỡng khoa học từ cộng đồng."
          action={
            <button
              type="button"
              onClick={() => {
                if (isGuest) {
                  router.push("/register");
                } else {
                  setNewPostModalOpen(true);
                }
              }}
              className="h-10 px-5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-base font-semibold transition-colors cursor-pointer shadow-sm inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" strokeWidth={2.5} />
              <span>{isGuest ? "Đăng ký để đăng bài" : "Tạo thảo luận mới"}</span>
            </button>
          }
        />

        {/* Filter Controls: Search, Categories & Sort */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="max-w-md w-full">
              <Input
                variant="search"
                placeholder="Tìm bài viết theo từ khóa hoặc hashtag (#monchay, #dinhduong)…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
              <span className="text-xs font-semibold text-stone-500 whitespace-nowrap">
                Sắp xếp:
              </span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as any)}
                className="h-9 px-3 rounded-xl border border-stone-200 bg-white text-xs font-semibold text-stone-700 outline-none focus:border-emerald-600 cursor-pointer shadow-2xs"
              >
                <option value="newest">Mới nhất</option>
                <option value="most_viewed">Xem nhiều nhất</option>
                <option value="oldest">Cũ nhất</option>
              </select>
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <Chip
              variant="filter"
              active={selectedCategoryId === undefined && !showMyPosts}
              onClick={() => {
                setShowMyPosts(false);
                setSelectedCategoryId(undefined);
              }}
            >
              Tất cả thảo luận
            </Chip>

            {!isGuest && (
              <Chip
                variant="filter"
                active={showMyPosts}
                onClick={() => {
                  setShowMyPosts(true);
                  setSelectedCategoryId(undefined);
                }}
              >
                <span className="inline-flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Bài viết của tôi</span>
                </span>
              </Chip>
            )}

            {categories.map((cat) => (
              <Chip
                key={cat.category_id}
                variant="filter"
                active={!showMyPosts && selectedCategoryId === cat.category_id}
                onClick={() => {
                  setShowMyPosts(false);
                  setSelectedCategoryId(cat.category_id);
                }}
              >
                {cat.category_name}
              </Chip>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-stone-400">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
            <span className="text-sm font-medium text-stone-500">
              Đang tải danh sách bài thảo luận từ máy chủ…
            </span>
          </div>
        )}

        {/* Post Feed */}
        {!loading && (
          <div className="flex flex-col space-y-4">
            {posts.map((post) => (
              <Link key={post.id} href={`/forum/${post.id}`}>
                <Card className="hover:border-emerald-600/80 transition-all p-6 group cursor-pointer">
                  <div className="flex items-start gap-4">
                    {/* Body */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                          {post.category}
                        </span>

                        {/* Status Badge: Pending vs Removed vs Approved */}
                        {post.status === "pending_review" ? (
                          <span className="text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 shadow-2xs">
                            <span>⏳</span> Đang chờ duyệt
                          </span>
                        ) : post.status === "removed" || post.status === "rejected" ? (
                          <span className="text-xs font-semibold text-red-700 bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 shadow-2xs">
                            <span>✕</span> Đã bị gỡ
                          </span>
                        ) : (
                          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 shadow-2xs">
                            <span>✓</span> Đã được duyệt
                          </span>
                        )}

                        <span className="text-xs text-stone-400">·</span>
                        <span className="text-xs text-stone-500 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-stone-400" />
                          {post.timestamp}
                        </span>
                      </div>

                      <h2 className="font-serif font-bold text-xl sm:text-2xl text-stone-900 group-hover:text-emerald-700 transition-colors tracking-tight leading-snug">
                        {post.title}
                      </h2>

                      <p className="mt-2 text-base text-stone-600 line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>

                      {/* Tags & Footer */}
                      <div className="mt-4 pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap gap-1.5">
                          {post.tags.map((tag) => (
                            <button
                              key={tag}
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setSearchQuery(tag);
                              }}
                              className="text-xs font-medium text-stone-600 bg-stone-100 hover:bg-emerald-50 hover:text-emerald-800 px-2 py-0.5 rounded-md transition-colors"
                            >
                              {tag}
                            </button>
                          ))}
                        </div>

                        <div className="flex items-center gap-4 text-xs font-semibold text-stone-600">
                          <div className="flex items-center gap-1.5">
                            <Avatar
                              initials={post.authorInitials}
                              verified={post.verified}
                              className="scale-75 -my-2"
                            />
                            <span>{post.author}</span>
                          </div>

                          <div className="flex items-center gap-1 text-stone-500">
                            <Eye className="w-3.5 h-3.5 text-stone-400" />
                            <span>{post.views ?? 0}</span>
                          </div>

                          <div className="flex items-center gap-1 text-stone-500">
                            <MessageSquare className="w-3.5 h-3.5 text-stone-400" />
                            <span>{post.commentsCount}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}

            {posts.length === 0 && (
              <Card className="text-center py-14 px-6 border-dashed border-stone-300">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-7 h-7" />
                </div>
                <p className="text-lg font-bold text-stone-800">
                  {showMyPosts
                    ? "Bạn chưa đăng bài viết nào"
                    : searchQuery.trim()
                      ? "Không tìm thấy bài thảo luận phù hợp"
                      : "Chưa có bài viết thảo luận nào"}
                </p>
                <p className="mt-1 text-sm text-stone-500 max-w-md mx-auto">
                  {showMyPosts
                    ? "Hãy bắt đầu chia sẻ kinh nghiệm hoặc công thức nấu ăn của bạn cùng cộng đồng Veggie!"
                    : searchQuery.trim()
                      ? "Hãy thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc danh mục."
                      : "Hãy là người đầu tiên bắt đầu một chủ đề chia sẻ hữu ích cùng cộng đồng Veggie!"}
                </p>
                {!isGuest && (
                  <button
                    type="button"
                    onClick={() => setNewPostModalOpen(true)}
                    className="mt-5 h-10 px-5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors cursor-pointer inline-flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tạo bài thảo luận đầu tiên</span>
                  </button>
                )}
              </Card>
            )}
          </div>
        )}
      </div>

      {/* New Post Modal */}
      <Modal
        isOpen={newPostModalOpen}
        onClose={resetForm}
        title="Bắt đầu chủ đề thảo luận mới"
      >
        <form onSubmit={handleCreatePost} className="flex flex-col space-y-4">
          {submitSuccessMsg && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-start gap-2.5">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>{submitSuccessMsg}</div>
            </div>
          )}

          {submitErrorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>{submitErrorMsg}</div>
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1.5">
              Tiêu đề bài viết <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              minLength={3}
              maxLength={200}
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Ví dụ: Cách làm đậu phụ sốt cà chua thơm ngon tại nhà"
              className="w-full h-11 px-4 rounded-xl border border-stone-200 text-base text-stone-900 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1.5">
              Chuyên mục
            </label>
            <select
              value={newCategoryId ?? ""}
              onChange={(e) =>
                setNewCategoryId(e.target.value ? Number(e.target.value) : undefined)
              }
              className="w-full h-11 px-4 rounded-xl border border-stone-200 text-base text-stone-900 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 bg-white"
            >
              <option value="">-- Chọn danh mục (tùy chọn) --</option>
              {categories.map((cat) => (
                <option key={cat.category_id} value={cat.category_id}>
                  {cat.category_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1.5">
              Hashtags (phân cách bằng dấu phẩy hoặc khoảng trắng)
            </label>
            <input
              type="text"
              value={newTags}
              onChange={(e) => setNewTags(e.target.value)}
              placeholder="monchay, dinhduong, nguoimoi"
              className="w-full h-11 px-4 rounded-xl border border-stone-200 text-base text-stone-900 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1.5">
              Nội dung chi tiết <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={5}
              required
              minLength={10}
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Chia sẻ kinh nghiệm, công thức nấu ăn hoặc đặt câu hỏi cùng cộng đồng…"
              className="w-full p-4 rounded-xl border border-stone-200 text-base text-stone-900 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              disabled={submitting}
              onClick={resetForm}
              className="h-10 px-5 rounded-full text-stone-600 hover:bg-stone-100 text-base font-medium transition-colors cursor-pointer disabled:opacity-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={submitting || !newTitle.trim() || !newContent.trim()}
              className="h-10 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-base font-semibold transition-colors shadow-sm cursor-pointer disabled:opacity-50 inline-flex items-center gap-2"
            >
              {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
              <span>{submitting ? "Đang gửi…" : "Đăng bài thảo luận"}</span>
            </button>
          </div>
        </form>
      </Modal>
    </AppShell>
  );
}

export default function ForumPage() {
  return (
    <Suspense
      fallback={
        <AppShell>
          <div className="flex flex-col items-center justify-center py-24 gap-3 text-stone-500">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
            <p className="text-sm font-medium">Đang tải diễn đàn…</p>
          </div>
        </AppShell>
      }
    >
      <ForumContent />
    </Suspense>
  );
}