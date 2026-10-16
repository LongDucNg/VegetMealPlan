"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Input } from "@/components/ui/Input";
import { Chip } from "@/components/ui/Chip";
import { VideoCard, RECIPE_FILTERS } from "@/features/videos";
import { Card } from "@/components/ui/Card";
import { useRecipes } from "@/features/recipes/hooks/useRecipes";


export default function VideosPage() {
  const [activeFilter, setActiveFilter] = useState("Tất cả");
  const [searchQuery, setSearchQuery] = useState("");
  const { recipes } = useRecipes();

  const filteredVideos = recipes.filter((recipe) => {
    const matchesFilter =
      activeFilter === "Tất cả" ||
      recipe.category.toLowerCase().includes(activeFilter.toLowerCase()) ||
      activeFilter.toLowerCase().includes(recipe.category.toLowerCase()) ||
      (recipe.cuisine && recipe.cuisine.toLowerCase().includes(activeFilter.toLowerCase()));

    const matchesSearch =
      !searchQuery.trim() ||
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (recipe.author && recipe.author.toLowerCase().includes(searchQuery.toLowerCase())) ||
      recipe.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.ingredients.some((ing) => ing.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  return (
    <AppShell>
      <div className="flex flex-col space-y-8">
        {/* Page Header */}
        <PageHeader
          eyebrow="XEM & NẤU ĂN"
          title="Video công thức món chay"
          subtitle="Đồng hành cùng các đầu bếp ẩm thực chay sáng tạo. Tự động cảnh báo dị ứng dựa trên hồ sơ cá nhân của bạn."
        />

        {/* Search and Filters Bar */}
        <div className="flex flex-col gap-4">
          <div className="max-w-md">
            <Input
              variant="search"
              placeholder="Tìm kiếm theo tên món, đầu bếp hoặc nguyên liệu…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {RECIPE_FILTERS.map((filter) => (
              <Chip
                key={filter}
                variant="filter"
                active={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
                className="shrink-0 whitespace-nowrap cursor-pointer"
              >
                {filter}
              </Chip>
            ))}

            {/* Total Count */}
            <span className="text-xs text-stone-500 ml-auto">
              {filteredVideos.length} công thức món chay
            </span>
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              id={video.id}
              title={video.title}
              duration={video.duration}
              author={video.author}
              views={video.views}
              imageUrl={video.image}
            />
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <Card className="text-center py-12">
            <p className="text-lg font-semibold text-stone-800">
              Không tìm thấy công thức phù hợp
            </p>
            <p className="mt-1 text-sm text-stone-500">
              Hãy thử chọn bộ lọc khác hoặc tìm kiếm với nguyên liệu khác.
            </p>
          </Card>
        )}
      </div>
    </AppShell>
  );
}
