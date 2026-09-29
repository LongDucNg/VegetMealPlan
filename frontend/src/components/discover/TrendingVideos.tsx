"use client";

import React, { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Chip } from "@/components/ui/Chip";
import { VideoCard } from "@/components/ui/VideoCard";
import { RECIPE_FILTERS, VIDEO_RECIPES } from "@/lib/mock/data";

export function TrendingVideos() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredVideos = VIDEO_RECIPES.filter((recipe) => {
    if (activeFilter === "All") return true;
    return (
      recipe.category.toLowerCase().includes(activeFilter.toLowerCase()) ||
      activeFilter.toLowerCase().includes(recipe.category.toLowerCase())
    );
  });

  return (
    <section className="mt-11">
      {/* Section Header */}
      <SectionHeader
        eyebrow="WATCH & COOK"
        title="Trending video recipes"
        actionText="See all"
      />

      {/* Filter Row */}
      <div className="mt-4 flex flex-wrap items-center gap-2.5">
        {RECIPE_FILTERS.map((filter) => (
          <Chip
            key={filter}
            variant="filter"
            active={activeFilter === filter}
            onClick={() => setActiveFilter(filter)}
            className="shrink-0 whitespace-nowrap"
          >
            {filter}
          </Chip>
        ))}

        {/* Filters button */}
        <button
          type="button"
          className="h-10 px-4 text-sm font-semibold rounded-full border border-stone-200 bg-white text-stone-700 hover:text-stone-900 hover:border-stone-300 transition-colors inline-flex items-center gap-2 shrink-0 whitespace-nowrap cursor-pointer shadow-xs"
        >
          <SlidersHorizontal className="w-4 h-4 text-stone-500" strokeWidth={1.75} />
          <span>Filters</span>
        </button>
      </div>

      {/* 4-column Video Grid */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[22px]">
        {filteredVideos.map((recipe) => (
          <VideoCard
            key={recipe.id}
            title={recipe.title}
            duration={recipe.duration}
            author={recipe.author}
            views={recipe.views}
            imageUrl={recipe.image}
          />
        ))}
      </div>
    </section>
  );
}
