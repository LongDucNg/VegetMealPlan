"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  RotateCcw,
  Flame,
  FileSpreadsheet,
  Tag,
  ExternalLink,
} from "lucide-react";
import { useRecipes } from "@/features/recipes/hooks/useRecipes";
import { Recipe, RecipeStatus } from "@/features/recipes/types";
import { AdminRecipeModal } from "./AdminRecipeModal";
import { AdminRecipeDetailModal } from "./AdminRecipeDetailModal";
import { AdminImportModal } from "./AdminImportModal";
import { recipeService } from "@/features/recipes/services/recipeService";
import { priceService } from "@/features/recipes/services/priceService";

export function AdminRecipeManagement() {
  const { recipes, createRecipe, updateRecipe, deleteRecipe, refresh } = useRecipes();

  const [search, setSearch] = useState("");
  const [selectedMealType, setSelectedMealType] = useState<string>("all");
  const [selectedDiet, setSelectedDiet] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const [modalOpen, setModalOpen] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [viewingRecipe, setViewingRecipe] = useState<Recipe | null>(null);

  // Filtered recipes
  const filtered = recipes.filter((r) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const match =
        r.title.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.ingredients.some((ing) => ing.name.toLowerCase().includes(q));
      if (!match) return false;
    }
    if (selectedMealType !== "all" && r.mealType !== selectedMealType) {
      return false;
    }
    if (selectedDiet !== "all" && r.vegetarianType !== selectedDiet) {
      return false;
    }
    if (selectedStatus !== "all" && (r.status || "APPROVED") !== selectedStatus) {
      return false;
    }
    return true;
  });

  const handleOpenAdd = () => {
    setEditingRecipe(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (recipe: Recipe) => {
    setEditingRecipe(recipe);
    setModalOpen(true);
  };

  const handleSave = (recipeData: Omit<Recipe, "id">, editId?: string) => {
    if (editId) {
      updateRecipe(editId, recipeData);
    } else {
      createRecipe(recipeData);
    }
    refresh();
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteRecipe(id);
    }
  };

  const handleReset = () => {
    if (window.confirm("Reset all recipes to default mock dataset?")) {
      recipeService.resetRecipes();
      refresh();
    }
  };

  return (
    <div className="space-y-6">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-stone-200 shadow-xs">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search recipes, ingredients, status..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-9 pr-4 rounded-xl border border-stone-200 bg-stone-50 text-sm focus:bg-white focus:border-emerald-600 outline-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleReset}
            title="Reset to default mock recipes"
            className="h-10 px-3.5 rounded-xl border border-stone-200 text-stone-600 hover:text-stone-900 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Data
          </button>

          {/* Import Recipes Button (Requirement 8) */}
          <button
            onClick={() => setImportModalOpen(true)}
            className="h-10 px-4 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
            <span>Import Recipes</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="h-10 px-5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Recipe
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="font-semibold text-stone-500 mr-1">Meal Type:</span>
        {["all", "breakfast", "lunch", "dinner", "snack"].map((m) => (
          <button
            key={m}
            onClick={() => setSelectedMealType(m)}
            className={`px-3 py-1.5 rounded-full capitalize font-medium transition-colors cursor-pointer ${
              selectedMealType === m
                ? "bg-emerald-700 text-white font-semibold"
                : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-50"
            }`}
          >
            {m}
          </button>
        ))}

        <span className="font-semibold text-stone-500 ml-3 mr-1">Diet:</span>
        {[
          { id: "all", label: "All" },
          { id: "vegan", label: "Vegan" },
          { id: "lacto_vegetarian", label: "Lacto" },
          { id: "ovo_vegetarian", label: "Ovo" },
          { id: "lacto_ovo_vegetarian", label: "Lacto-Ovo" },
        ].map((d) => (
          <button
            key={d.id}
            onClick={() => setSelectedDiet(d.id)}
            className={`px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
              selectedDiet === d.id
                ? "bg-stone-800 text-white font-semibold"
                : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-50"
            }`}
          >
            {d.label}
          </button>
        ))}

        <span className="font-semibold text-stone-500 ml-3 mr-1">Status:</span>
        {[
          { id: "all", label: "All" },
          { id: "APPROVED", label: "Approved" },
          { id: "PENDING_REVIEW", label: "Pending" },
          { id: "DRAFT", label: "Draft" },
        ].map((s) => (
          <button
            key={s.id}
            onClick={() => setSelectedStatus(s.id)}
            className={`px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
              selectedStatus === s.id
                ? "bg-emerald-800 text-white font-semibold"
                : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-50"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Recipes Table / Grid */}
      <div className="bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-xs">
        <div className="p-4 bg-stone-50/70 border-b border-stone-200 flex items-center justify-between text-xs text-stone-500">
          <span className="font-semibold uppercase tracking-wider">
            Showing {filtered.length} recipe{filtered.length !== 1 ? "s" : ""}
          </span>
          <span>Only APPROVED recipes appear in the Meal Planner</span>
        </div>

        <div className="divide-y divide-stone-100">
          {filtered.map((recipe) => {
            const cost =
              recipe.estimatedCost ||
              priceService.calculateRecipeCost(recipe.ingredients || []).estimatedCost;
            const status: RecipeStatus = recipe.status || "APPROVED";

            return (
              <div
                key={recipe.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-stone-50/50 transition-colors"
              >
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  {/* Thumbnail */}
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-stone-100 shrink-0">
                    {recipe.image ? (
                      <Image
                        src={recipe.image}
                        alt={recipe.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-stone-400">
                        No img
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200">
                        {recipe.mealType}
                      </span>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-stone-100 text-stone-700">
                        {recipe.vegetarianType.replace("_", " ")}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          status === "APPROVED"
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                            : status === "PENDING_REVIEW"
                            ? "bg-amber-100 text-amber-900 border border-amber-300"
                            : "bg-stone-200 text-stone-700"
                        }`}
                      >
                        {status}
                      </span>
                      <span className="text-xs text-stone-400">· {recipe.category}</span>
                    </div>

                    <h3 className="font-semibold text-stone-900 text-base truncate">
                      {recipe.name || recipe.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 mt-1">
                      <span className="flex items-center gap-1 font-semibold text-amber-700">
                        <Flame className="w-3.5 h-3.5 text-amber-500" />
                        {recipe.calories} kcal
                      </span>
                      <span>P: {recipe.protein}g · C: {recipe.carbs}g · F: {recipe.fat}g</span>
                      <span className="font-bold text-emerald-800">
                        {priceService.formatEstimatedPrice(cost)}
                      </span>
                      {recipe.source && (
                        <span className="text-[11px] text-stone-400">
                          Source: {recipe.source.name}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                  <button
                    onClick={() => setViewingRecipe(recipe)}
                    title="View Detail"
                    className="p-2 rounded-xl text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleOpenEdit(recipe)}
                    title="Edit Recipe"
                    className="p-2 rounded-xl text-emerald-700 hover:text-emerald-900 hover:bg-emerald-50 transition-colors cursor-pointer"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(recipe.id, recipe.title)}
                    title="Delete Recipe"
                    className="p-2 rounded-xl text-red-600 hover:text-red-800 hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="p-12 text-center text-stone-400">
              <p className="font-medium text-base">No recipes found matching criteria.</p>
              <button
                onClick={handleOpenAdd}
                className="mt-3 text-xs font-semibold text-emerald-700 hover:underline cursor-pointer"
              >
                + Add your first recipe
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Add / Edit Modal */}
      <AdminRecipeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initialRecipe={editingRecipe}
      />

      {/* Detail View Modal */}
      <AdminRecipeDetailModal
        recipe={viewingRecipe}
        onClose={() => setViewingRecipe(null)}
        onEdit={(r) => {
          setViewingRecipe(null);
          handleOpenEdit(r);
        }}
      />

      {/* Excel / CSV Import & Validation Review Dashboard Modal (Requirements 8, 14, 15) */}
      <AdminImportModal
        isOpen={importModalOpen}
        onClose={() => setImportModalOpen(false)}
        onCompleted={() => refresh()}
      />
    </div>
  );
}
