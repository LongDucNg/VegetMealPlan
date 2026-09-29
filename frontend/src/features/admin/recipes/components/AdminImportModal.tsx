"use client";

import React, { useState, useRef } from "react";
import {
  X,
  Upload,
  FileSpreadsheet,
  Download,
  AlertTriangle,
  CheckCircle2,
  AlertOctagon,
  Trash2,
  Check,
  Edit2,
  Layers,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import {
  excelImportService,
  ImportPendingRecipe,
  ImportSummary,
} from "../services/excelImportService";
import { Recipe } from "@/features/recipes/types";

interface AdminImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleted: () => void;
}

export function AdminImportModal({
  isOpen,
  onClose,
  onCompleted,
}: AdminImportModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [summary, setSummary] = useState<ImportSummary | null>(null);
  const [items, setItems] = useState<ImportPendingRecipe[]>([]);
  const [filterTab, setFilterTab] = useState<"all" | "valid" | "conflicts" | "non_veg" | "duplicates" | "invalid">("all");
  const [editingItem, setEditingItem] = useState<ImportPendingRecipe | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCalories, setEditCalories] = useState<number>(500);

  if (!isOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsProcessing(true);
      const res = await excelImportService.parseAndValidateFile(file);
      setSummary(res.summary);
      setItems(res.items);
    } catch (err: unknown) {
      alert(`Error parsing file: ${(err as Error).message || "Invalid file format."}`);
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleApprove = (tempId: string) => {
    excelImportService.approveRecipe(tempId);
    setItems((prev) => prev.filter((i) => i.tempId !== tempId));
    onCompleted();
  };

  const handleApproveAllValid = () => {
    const approvedCount = excelImportService.approveAllValid();
    setItems((prev) => prev.filter((i) => !i.isValid));
    alert(`Successfully approved and published ${approvedCount} valid recipes!`);
    onCompleted();
  };

  const handleRemove = (tempId: string) => {
    excelImportService.removePendingItem(tempId);
    setItems((prev) => prev.filter((i) => i.tempId !== tempId));
  };

  const handleStartEdit = (item: ImportPendingRecipe) => {
    setEditingItem(item);
    setEditTitle(item.recipe.title);
    setEditCalories(item.recipe.calories);
  };

  const handleSaveEdit = () => {
    if (!editingItem) return;
    const updated: Recipe = {
      ...editingItem.recipe,
      title: editTitle.trim() || editingItem.recipe.title,
      name: editTitle.trim() || editingItem.recipe.title,
      calories: Number(editCalories) || editingItem.recipe.calories,
    };
    excelImportService.editAndApprove(editingItem.tempId, updated);
    setItems((prev) => prev.filter((i) => i.tempId !== editingItem.tempId));
    setEditingItem(null);
    onCompleted();
  };

  // Filter items
  const filteredItems = items.filter((item) => {
    if (filterTab === "all") return true;
    if (filterTab === "valid") return item.isValid;
    if (filterTab === "conflicts")
      return item.issues.some((iss) => iss.type === "INGREDIENT_CONFLICT");
    if (filterTab === "non_veg")
      return item.issues.some((iss) => iss.type === "NON_VEGETARIAN");
    if (filterTab === "duplicates")
      return item.issues.some((iss) => iss.type === "DUPLICATE");
    if (filterTab === "invalid")
      return item.issues.some((iss) =>
        ["MISSING_DATA", "INVALID_INGREDIENT", "INVALID_NUTRITION"].includes(iss.type)
      );
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <FileSpreadsheet className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-stone-900">
                Import Recipes from Excel / CSV
              </h3>
              <p className="text-xs text-stone-500">
                Batch import with multi-row grouping, validation pipeline, and Admin review dashboard
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => excelImportService.downloadTemplate()}
              className="h-8 px-3 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Download standard Excel template with multi-row examples"
            >
              <Download className="w-3.5 h-3.5 text-emerald-700" />
              <span>Download Template</span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* File Upload Drop Area */}
          <div className="p-6 rounded-3xl border-2 border-dashed border-stone-200 bg-stone-50/50 hover:bg-emerald-50/20 hover:border-emerald-300 transition-all text-center">
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx, .xls, .csv"
              onChange={handleFileUpload}
              className="hidden"
              id="excel-file-input"
            />
            <label
              htmlFor="excel-file-input"
              className="cursor-pointer flex flex-col items-center justify-center space-y-2"
            >
              <div className="w-12 h-12 rounded-2xl bg-white border border-stone-200 shadow-xs flex items-center justify-center text-emerald-700">
                {isProcessing ? (
                  <div className="w-5 h-5 border-2 border-emerald-700 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Upload className="w-5 h-5" />
                )}
              </div>
              <div>
                <p className="text-sm font-bold text-stone-800">
                  {isProcessing
                    ? "Validating recipes & checking ingredients..."
                    : "Click to upload or drag & drop .xlsx or .csv"}
                </p>
                <p className="text-xs text-stone-500 mt-0.5">
                  Multi-row ingredients grouped by Recipe Name · Automatic duplicate & allergy validation
                </p>
              </div>
            </label>
          </div>

          {/* Validation Summary Metrics (Requirement 14) */}
          {summary && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-serif font-bold text-base text-stone-900">
                  Import Summary & Review Dashboard
                </h4>

                {summary.validCount > 0 && (
                  <button
                    onClick={handleApproveAllValid}
                    className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5" />
                    Approve All {summary.validCount} Valid Recipes
                  </button>
                )}
              </div>

              {/* Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-2.5 text-center text-xs">
                <div className="p-3 rounded-2xl bg-stone-100 border border-stone-200">
                  <span className="text-stone-500 block text-[10px] uppercase font-bold">Total</span>
                  <span className="font-serif font-bold text-xl text-stone-900">
                    {summary.totalImported}
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <span className="text-emerald-700 block text-[10px] uppercase font-bold">Valid</span>
                  <span className="font-serif font-bold text-xl text-emerald-800">
                    {summary.validCount}
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200">
                  <span className="text-amber-700 block text-[10px] uppercase font-bold">Duplicates</span>
                  <span className="font-serif font-bold text-xl text-amber-800">
                    {summary.duplicateCount}
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200">
                  <span className="text-rose-700 block text-[10px] uppercase font-bold">Conflicts</span>
                  <span className="font-serif font-bold text-xl text-rose-800">
                    {summary.conflictCount}
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-red-50 border border-red-200">
                  <span className="text-red-700 block text-[10px] uppercase font-bold">Non-Veg</span>
                  <span className="font-serif font-bold text-xl text-red-800">
                    {summary.nonVegetarianCount}
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
                  <span className="text-stone-500 block text-[10px] uppercase font-bold">Missing</span>
                  <span className="font-serif font-bold text-xl text-stone-700">
                    {summary.missingDataCount + summary.invalidDataCount}
                  </span>
                </div>
              </div>

              {/* Tabs for filtering review list */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs pt-1">
                {[
                  { id: "all", label: `All (${items.length})` },
                  { id: "valid", label: "Valid Only" },
                  { id: "duplicates", label: "Duplicates" },
                  { id: "conflicts", label: "Ingredient Conflicts" },
                  { id: "non_veg", label: "Non-Vegetarian" },
                  { id: "invalid", label: "Missing / Invalid" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setFilterTab(tab.id as any)}
                    className={`px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
                      filterTab === tab.id
                        ? "bg-stone-900 text-white font-bold"
                        : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Review Table (Requirement 14, 15) */}
              <div className="border border-stone-200 rounded-2xl overflow-hidden divide-y divide-stone-100 text-xs">
                {filteredItems.map((item) => {
                  const hasDuplicates = item.issues.some((iss) => iss.type === "DUPLICATE");
                  const hasConflicts = item.issues.some((iss) => iss.type === "INGREDIENT_CONFLICT");
                  const hasNonVeg = item.issues.some((iss) => iss.type === "NON_VEGETARIAN");

                  return (
                    <div
                      key={item.tempId}
                      className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-stone-50/70 transition-colors"
                    >
                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-bold text-stone-900 text-sm">
                            {item.recipe.title}
                          </span>
                          <span className="text-[10px] font-bold uppercase px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800">
                            {item.recipe.mealType}
                          </span>
                          <span className="text-[10px] font-medium px-2 py-0.2 rounded-full bg-stone-100 text-stone-700">
                            {item.recipe.vegetarianType.replace("_", " ")}
                          </span>
                          <span className="text-stone-400">· {item.recipe.calories} kcal</span>
                          <span className="text-stone-400">· {item.recipe.ingredients.length} ingredients</span>
                        </div>

                        {/* Status / Issue Badges */}
                        {item.isValid ? (
                          <div className="flex items-center gap-1.5 text-emerald-700 font-semibold text-[11px]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Valid · No issues found</span>
                          </div>
                        ) : (
                          <div className="space-y-1 pt-0.5">
                            {item.issues.map((iss, idx) => (
                              <div
                                key={idx}
                                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-[11px] font-medium mr-2 ${
                                  iss.type === "NON_VEGETARIAN"
                                    ? "bg-red-100 text-red-800"
                                    : iss.type === "INGREDIENT_CONFLICT"
                                    ? "bg-rose-100 text-rose-800"
                                    : iss.type === "DUPLICATE"
                                    ? "bg-amber-100 text-amber-900"
                                    : "bg-stone-200 text-stone-800"
                                }`}
                              >
                                <AlertTriangle className="w-3 h-3 shrink-0" />
                                <span>{iss.message}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Source info (Requirement 16) */}
                        {item.recipe.source && (
                          <div className="text-[10px] text-stone-400">
                            Source: {item.recipe.source.name}
                            {item.recipe.source.url && (
                              <a
                                href={item.recipe.source.url}
                                target="_blank"
                                rel="noreferrer"
                                className="ml-1 text-emerald-700 underline inline-flex items-center gap-0.5"
                              >
                                [View Original Source <ExternalLink className="w-2.5 h-2.5 inline" />]
                              </a>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                        <button
                          onClick={() => handleStartEdit(item)}
                          className="p-2 rounded-xl text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
                          title="Edit Recipe"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleRemove(item.tempId)}
                          className="p-2 rounded-xl text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Remove from import"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleApprove(item.tempId)}
                          className="px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-2xs transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Approve
                        </button>
                      </div>
                    </div>
                  );
                })}

                {filteredItems.length === 0 && (
                  <div className="p-8 text-center text-stone-400">
                    No recipes in this review category.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Quick Inline Edit Sub-Modal */}
          {editingItem && (
            <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 p-4">
              <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
                <h4 className="font-serif font-bold text-base text-stone-900">
                  Edit Recipe before Approving
                </h4>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Title:
                  </label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-stone-200 text-xs font-semibold outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Calories (kcal):
                  </label>
                  <input
                    type="number"
                    value={editCalories}
                    onChange={(e) => setEditCalories(Number(e.target.value))}
                    className="w-full h-10 px-3 rounded-xl border border-stone-200 text-xs font-semibold outline-none"
                  />
                </div>
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    onClick={() => setEditingItem(null)}
                    className="px-4 py-1.5 rounded-xl border border-stone-200 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="px-4 py-1.5 rounded-xl bg-emerald-700 text-white text-xs font-bold"
                  >
                    Save & Approve
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
