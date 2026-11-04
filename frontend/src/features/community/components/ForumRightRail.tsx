"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { TrendingUp, ShieldCheck, Flame, Eye, MessageSquare, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { ForumPost, TrendingTopic } from "../types";
import { TRENDING_TOPICS } from "../data/mockForum";
import { forumService } from "../services/forumService";

interface ForumRightRailProps {
  onSelectTag?: (tag: string) => void;
}

export function ForumRightRail({ onSelectTag }: ForumRightRailProps) {
  const [topPosts, setTopPosts] = useState<ForumPost[]>([]);
  const [trending, setTrending] = useState<TrendingTopic[]>(TRENDING_TOPICS);

  useEffect(() => {
    forumService
      .listPosts({ sort: "most_viewed", limit: 3 })
      .then((res) => {
        setTopPosts(res.data);
      })
      .catch((err) => {
        console.warn("Error fetching top forum posts:", err);
      });

    forumService
      .getTrending(8)
      .then((res) => {
        if (res && res.length > 0) {
          setTrending(res);
        }
      })
      .catch((err) => {
        console.warn("Error fetching trending topics:", err);
      });
  }, []);

  return (
    <aside className="w-[360px] shrink-0 space-y-[22px] select-none">
      {/* 1. Community Guidelines Card */}
      <Card className="p-5 border-emerald-100 bg-gradient-to-br from-emerald-50/60 to-white">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg text-stone-900 tracking-tight leading-tight">
              Nội quy diễn đàn
            </h3>
            <p className="text-xs text-stone-500">Cộng đồng ăn chay văn minh</p>
          </div>
        </div>

        <ul className="space-y-2 text-xs text-stone-600 leading-relaxed pt-1">
          <li className="flex items-start gap-2">
            <span className="text-emerald-600 font-bold shrink-0"></span>
            <span>Tôn trọng ý kiến khác biệt, chia sẻ trên tinh thần tích cực và hòa nhã.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-600 font-bold shrink-0"></span>
            <span>Chia sẻ kiến thức dinh dưỡng, công thức và quán chay rõ ràng, có căn cứ.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-600 font-bold shrink-0"></span>
            <span>Nghiêm cấm hành vi spam, chèo kéo bán hàng trái phép hoặc tin sai lệch.</span>
          </li>
        </ul>
      </Card>

      {/* 2. Trending Topics Card */}
      <Card className="p-5">
        <div className="flex items-center gap-2.5 mb-3.5">
          <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg text-stone-900 tracking-tight leading-tight">
              Chủ đề thịnh hành
            </h3>
            <p className="text-xs text-stone-500">Hashtags được quan tâm</p>
          </div>
        </div>

        <div className="flex flex-col divide-y divide-stone-100">
          {trending.map((topic) => (
            <button
              key={topic.tag}
              type="button"
              onClick={() => onSelectTag?.(topic.tag)}
              className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between text-sm transition-colors hover:bg-stone-50 px-1 -mx-1 rounded group cursor-pointer text-left w-full"
            >
              <span className="font-semibold text-emerald-800 group-hover:text-emerald-900 transition-colors">
                {topic.tag}
              </span>
              <span className="text-xs text-stone-500 font-medium">
                {typeof topic.posts === "number" ? `${topic.posts} bài viết` : topic.posts}
              </span>
            </button>
          ))}
        </div>
      </Card>

      {/* 3. Most Viewed Posts Card */}
      <Card className="p-5">
        <div className="flex items-center gap-2.5 mb-3.5">
          <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
            <Flame className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg text-stone-900 tracking-tight leading-tight">
              Xem nhiều nhất
            </h3>
            <p className="text-xs text-stone-500">Bài thảo luận nổi bật</p>
          </div>
        </div>

        <div className="space-y-3 divide-y divide-stone-100">
          {topPosts.map((post) => (
            <Link
              key={post.id}
              href={`/forum/${post.id}`}
              className="pt-2.5 first:pt-0 block group"
            >
              <h4 className="text-xs font-semibold text-stone-900 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
                {post.title}
              </h4>
              <div className="mt-1 flex items-center gap-3 text-[11px] text-stone-500">
                <span>{post.author}</span>
                <span className="inline-flex items-center gap-1">
                  <Eye className="w-3 h-3 text-stone-400" />
                  {post.views ?? 0}
                </span>
                <span className="inline-flex items-center gap-1">
                  <MessageSquare className="w-3 h-3 text-stone-400" />
                  {post.commentsCount}
                </span>
              </div>
            </Link>
          ))}
          {topPosts.length === 0 && (
            <p className="text-xs text-stone-400 py-2">
              Đang tải danh sách bài thảo luận...
            </p>
          )}
        </div>
      </Card>
    </aside>
  );
}
