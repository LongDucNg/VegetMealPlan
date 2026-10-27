"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronUp,
  ChevronDown,
  MessageSquare,
  Plus,
  Search,
  Image as ImageIcon,
  Video as VideoIcon,
  Play,
  X,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Chip } from "@/components/ui/Chip";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { useRole } from "@/context/RoleContext";
import { FORUM_CATEGORIES, FORUM_POSTS, ForumPost } from "@/features/community";

export default function ForumPage() {
  const router = useRouter();
  const { isGuest, role } = useRole();
  const [activeCategory, setActiveCategory] = useState("Tất cả thảo luận");
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState<ForumPost[]>(FORUM_POSTS);
  const [newPostModalOpen, setNewPostModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState(FORUM_CATEGORIES[1]);
  const [newContent, setNewContent] = useState("");
  const [newTags, setNewTags] = useState("#monchay");

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      activeCategory === "Tất cả thảo luận" || post.category === activeCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleVote = (e: React.MouseEvent, postId: string, direction: "up" | "down") => {
    e.preventDefault();
    e.stopPropagation();
    if (isGuest) return;

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const delta = direction === "up" ? 1 : -1;
          return { ...p, votes: p.votes + delta };
        }
        return p;
      })
    );
  };

  const resetForm = () => {
    setNewTitle("");
    setNewCategory(FORUM_CATEGORIES[1]);
    setNewTags("#monchay");
    setNewContent("");
    setNewPostModalOpen(false);
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim() || isGuest) return;

    const newPost: ForumPost = {
      id: `f-${Date.now()}`,
      title: newTitle.trim(),
      excerpt: newContent.trim().slice(0, 160) + "…",
      content: newContent.trim(),
      author: role === "Admin" ? "Quản trị viên" : "Linh Nguyễn",
      authorHandle: role === "Admin" ? "@admin.operator" : "@linh.greens",
      authorInitials: role === "Admin" ? "AD" : "LN",
      verified: true,
      category: newCategory,
      tags: newTags.split(" ").filter((t) => t.startsWith("#")),
      votes: 1,
      commentsCount: 0,
      timestamp: "Vừa xong",
      comments: [],
    };

    FORUM_POSTS.unshift(newPost);
    setPosts([newPost, ...posts]);
    resetForm();
  };

  return (
    <AppShell>
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

        {/* Search & Category Filter Chips */}
        <div className="flex flex-col gap-4">
          <div className="max-w-md">
            <Input
              variant="search"
              placeholder="Tìm kiếm bài viết theo từ khóa hoặc hashtag (#dinhduong, #monchay)…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
            {FORUM_CATEGORIES.map((cat) => (
              <Chip
                key={cat}
                variant="filter"
                active={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </Chip>
            ))}
          </div>
        </div>

        {/* Post Feed */}
        <div className="flex flex-col space-y-4">
          {filteredPosts.map((post) => (
            <Link key={post.id} href={`/forum/${post.id}`}>
              <Card className="hover:border-emerald-600/80 transition-all p-6 group cursor-pointer">
                <div className="flex items-start gap-4">
                  {/* Upvote Pill */}
                  <div
                    onClick={(e) => e.preventDefault()}
                    className="flex flex-col items-center bg-stone-50 border border-stone-200 rounded-xl p-1.5 shrink-0 select-none min-w-[48px]"
                  >
                    <button
                      type="button"
                      onClick={(e) => handleVote(e, post.id, "up")}
                      disabled={isGuest}
                      className={`p-1 rounded text-stone-500 hover:text-emerald-700 hover:bg-stone-100 transition-colors ${
                        isGuest ? "cursor-not-allowed opacity-60" : "cursor-pointer"
                      }`}
                      title={isGuest ? "Đăng nhập để biểu quyết" : "Bình chọn ủng hộ"}
                    >
                      <ChevronUp className="w-5 h-5" strokeWidth={2.5} />
                    </button>
                    <span className="text-sm font-bold text-stone-800 my-0.5">
                      {post.votes}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => handleVote(e, post.id, "down")}
                      disabled={isGuest}
                      className={`p-1 rounded text-stone-500 hover:text-red-600 hover:bg-stone-100 transition-colors ${
                        isGuest ? "cursor-not-allowed opacity-60" : "cursor-pointer"
                      }`}
                      title={isGuest ? "Đăng nhập để biểu quyết" : "Bình chọn phản đối"}
                    >
                      <ChevronDown className="w-5 h-5" strokeWidth={2.5} />
                    </button>
                  </div>

                  {/* Body */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-xs text-stone-400">·</span>
                      <span className="text-xs text-stone-500">
                        Đăng lúc {post.timestamp}
                      </span>
                    </div>

                    <h2 className="font-serif font-bold text-xl sm:text-2xl text-stone-900 group-hover:text-emerald-700 transition-colors tracking-tight leading-snug">
                      {post.title}
                    </h2>

                    <p className="mt-2 text-base text-stone-600 line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>

                    {/* Media Preview in Feed */}
                    {post.mediaUrl && (
                      <div className="mt-3.5 rounded-xl overflow-hidden border border-stone-200 bg-stone-100 max-h-64 sm:max-h-80 w-full relative group/media">
                        {post.mediaType === "video" ? (
                          <div className="relative aspect-video w-full max-h-80 bg-stone-900 flex items-center justify-center">
                            <video
                              src={post.mediaUrl}
                              className="w-full h-full object-cover opacity-90"
                              muted
                              preload="metadata"
                            />
                            <div className="absolute inset-0 bg-stone-900/30 flex items-center justify-center transition-colors group-hover/media:bg-stone-900/20">
                              <span className="w-11 h-11 rounded-full bg-white/90 text-emerald-800 flex items-center justify-center shadow-lg group-hover/media:scale-110 transition-transform">
                                <Play className="w-5 h-5 ml-0.5 fill-current" />
                              </span>
                            </div>
                            <span className="absolute bottom-2.5 right-2.5 bg-black/75 text-white text-[11px] font-semibold px-2 py-0.5 rounded-md backdrop-blur-xs flex items-center gap-1">
                              <VideoIcon className="w-3 h-3" /> Video
                            </span>
                          </div>
                        ) : (
                          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full max-h-80">
                            <img
                              src={post.mediaUrl}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover/media:scale-[1.02] transition-transform duration-300"
                            />
                            <span className="absolute bottom-2.5 right-2.5 bg-black/70 text-white text-[11px] font-semibold px-2 py-0.5 rounded-md backdrop-blur-xs flex items-center gap-1">
                              <ImageIcon className="w-3 h-3" /> Hình ảnh
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Tags & Footer */}
                    <div className="mt-4 pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-1.5">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs font-medium text-stone-600 bg-stone-100 px-2 py-0.5 rounded-md"
                          >
                            {tag}
                          </span>
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
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-3.5 h-3.5 text-stone-400" />
                          <span>{post.commentsCount} bình luận</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}

          {filteredPosts.length === 0 && (
            <Card className="text-center py-12">
              <Search className="w-10 h-10 text-stone-300 mx-auto mb-3" />
              <p className="text-lg font-semibold text-stone-800">
                Không tìm thấy bài thảo luận nào
              </p>
              <p className="mt-1 text-sm text-stone-500">
                Hãy thử chọn &quot;Tất cả thảo luận&quot; hoặc thay đổi từ khóa tìm kiếm.
              </p>
            </Card>
          )}
        </div>
      </div>

      {/* New Post Modal using native <dialog> */}
      <Modal
        isOpen={newPostModalOpen}
        onClose={() => setNewPostModalOpen(false)}
        title="Bắt đầu chủ đề thảo luận mới"
      >
        <form onSubmit={handleCreatePost} className="flex flex-col space-y-4">
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1.5">
              Tiêu đề
            </label>
            <input
              type="text"
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Ví dụ: Cách ướp đậu hũ chiên sả giòn rụm tại nhà"
              className="w-full h-11 px-4 rounded-xl border border-stone-200 text-base text-stone-900 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1.5">
              Chuyên mục
            </label>
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full h-11 px-4 rounded-xl border border-stone-200 text-base text-stone-900 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
            >
              {FORUM_CATEGORIES.slice(1).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1.5">
              Hashtag (cách nhau bằng dấu cách, kèm ký tự #)
            </label>
            <input
              type="text"
              value={newTags}
              onChange={(e) => setNewTags(e.target.value)}
              placeholder="#congthuc #dauhu #dinhduong"
              className="w-full h-11 px-4 rounded-xl border border-stone-200 text-base text-stone-900 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1.5">
              Nội dung & Hướng dẫn chi tiết
            </label>
            <textarea
              rows={5}
              required
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Chia sẻ kinh nghiệm, công thức hoặc đặt câu hỏi cùng cộng đồng…"
              className="w-full p-4 rounded-xl border border-stone-200 text-base text-stone-900 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={resetForm}
              className="h-10 px-5 rounded-full text-stone-600 hover:bg-stone-100 text-base font-medium transition-colors cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="h-10 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-base font-semibold transition-colors shadow-sm cursor-pointer"
            >
              Đăng bài thảo luận
            </button>
          </div>
        </form>
      </Modal>
    </AppShell>
  );
}
