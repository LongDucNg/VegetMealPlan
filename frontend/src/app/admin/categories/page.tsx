"use client";

import React, { useState, useEffect } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { LockedState, GatedSkeleton } from "@/components/ui/LockedState";
import { useRole } from "@/context/RoleContext";
import { ADMIN_CATEGORIES, CategoryItem, adminService } from "@/features/admin";
import {
  Plus,
  Pencil,
  Archive,
  RotateCcw,
  Trash2,
  Loader2,
  AlertCircle,
  Utensils,
  MessageSquare,
  Layers,
} from "lucide-react";

type CategoryTab = "all" | "recipes" | "forum";

function CategoriesContent() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<CategoryItem | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<CategoryTab>("all");

  // Form state
  const [formName, setFormName] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formType, setFormType] = useState<CategoryItem["type"]>("Recipe Category");

  const loadCategories = async () => {
    setLoading(true);
    try {
      const data = await adminService.getCategories();
      setCategories(data);
    } catch {
      setCategories(ADMIN_CATEGORIES);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const openAdd = (defaultType: CategoryItem["type"] = "Recipe Category") => {
    setEditItem(null);
    setFormName("");
    setFormSlug("");
    setFormType(activeTab === "forum" ? "Forum Category" : defaultType);
    setErrorMsg(null);
    setModalOpen(true);
  };

  const openEdit = (item: CategoryItem) => {
    setEditItem(item);
    setFormName(item.name);
    setFormSlug(item.slug);
    setFormType(item.type);
    setErrorMsg(null);
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!formName.trim()) return;
    setIsSaving(true);
    setErrorMsg(null);

    const categoryType =
      formType === "Forum Category"
        ? "forum"
        : formType === "Food Type"
          ? "food_type"
          : "recipe_type";

    try {
      if (editItem) {
        const updated = await adminService.updateCategory(editItem.id, {
          category_name: formName.trim(),
          description: formSlug.trim() || undefined,
          category_type: categoryType,
        });
        setCategories((prev) =>
          prev.map((c) => (c.id === editItem.id ? { ...updated, type: formType } : c))
        );
      } else {
        const created = await adminService.createCategory({
          category_name: formName.trim(),
          description: formSlug.trim() || undefined,
          category_type: categoryType,
          status: "active",
        });
        setCategories((prev) => [...prev, { ...created, type: formType }]);
      }
      setModalOpen(false);
    } catch (err: any) {
      setErrorMsg(err?.message || "Không thể lưu danh mục");
    } finally {
      setIsSaving(false);
    }
  };

  const toggleArchive = async (id: string) => {
    const target = categories.find((c) => c.id === id);
    if (!target) return;

    const nextStatus = target.status === "Active" ? "inactive" : "active";
    const nextPresentation = target.status === "Active" ? "Archived" : "Active";

    try {
      await adminService.updateCategory(id, { status: nextStatus });
      setCategories((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: nextPresentation } : c))
      );
    } catch (err) {
      console.warn("Failed to update status:", err);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Bạn có chắc muốn xóa vĩnh viễn danh mục "${name}"?`)) return;

    try {
      await adminService.deleteCategory(id);
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch (err: any) {
      alert(err?.message || "Không thể xóa danh mục này");
    }
  };

  const foodTypes = categories.filter((c) => c.type === "Food Type");
  const recipeCategories = categories.filter((c) => c.type === "Recipe Category");
  const forumCategories = categories.filter((c) => c.type === "Forum Category");

  const renderTable = (items: CategoryItem[], isForum = false) => (
    <DataTable
      columns={[
        { key: "name", label: isForum ? "Tên chuyên mục" : "Tên danh mục" },
        { key: "slug", label: "Định danh / Mô tả" },
        { key: "count", label: isForum ? "Số bài viết" : "Số công thức" },
        { key: "status", label: "Trạng thái" },
        { key: "actions", label: "" },
      ]}
      rows={items.map((item) => ({
        name: (
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-stone-900">{item.name}</span>
            {item.description && (
              <span className="text-xs text-stone-400 line-clamp-1">{item.description}</span>
            )}
          </div>
        ),
        slug: (
          <code className="text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded-lg max-w-[200px] truncate inline-block">
            {item.slug}
          </code>
        ),
        count: (
          <span className="text-sm text-stone-600 font-medium">
            {isForum
              ? (item.postCount ?? 0).toLocaleString()
              : item.recipeCount.toLocaleString()}
          </span>
        ),
        status:
          item.status === "Active" ? (
            <Badge variant="success">Hoạt động</Badge>
          ) : (
            <Badge variant="info">Lưu trữ</Badge>
          ),
        actions: (
          <div className="flex items-center gap-1 justify-end">
            <button
              onClick={() => openEdit(item)}
              className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
              title="Chỉnh sửa"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => toggleArchive(item.id)}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${item.status === "Active"
                ? "hover:bg-amber-50 text-stone-400 hover:text-amber-700"
                : "hover:bg-emerald-50 text-stone-400 hover:text-emerald-700"
                }`}
              title={item.status === "Active" ? "Lưu trữ" : "Khôi phục"}
            >
              {item.status === "Active" ? (
                <Archive className="w-3.5 h-3.5" />
              ) : (
                <RotateCcw className="w-3.5 h-3.5" />
              )}
            </button>
            <button
              onClick={() => handleDelete(item.id, item.name)}
              className="p-1.5 rounded-lg hover:bg-red-50 text-stone-400 hover:text-red-700 transition-colors cursor-pointer"
              title="Xóa danh mục"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ),
      }))}
    />
  );

  return (
    <div className="space-y-8">
      {/* Header action & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-stone-200/80 pb-5">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-3.5 py-1.5 text-sm font-medium rounded-xl transition-all cursor-pointer flex items-center gap-2 ${activeTab === "all"
              ? "bg-emerald-700 text-white shadow-xs"
              : "bg-stone-100 text-stone-600 hover:bg-stone-200/70"
              }`}
          >
            <Layers className="w-4 h-4" />
            Tất cả
            <span
              className={`text-xs px-1.5 py-0.2 rounded-full ${activeTab === "all"
                ? "bg-white/20 text-white"
                : "bg-stone-200 text-stone-700"
                }`}
            >
              {recipeCategories.length + forumCategories.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("recipes")}
            className={`px-3.5 py-1.5 text-sm font-medium rounded-xl transition-all cursor-pointer flex items-center gap-2 ${activeTab === "recipes"
              ? "bg-emerald-700 text-white shadow-xs"
              : "bg-stone-100 text-stone-600 hover:bg-stone-200/70"
              }`}
          >
            <Utensils className="w-4 h-4" />
            Công thức & Món ăn
            <span
              className={`text-xs px-1.5 py-0.2 rounded-full ${activeTab === "recipes"
                ? "bg-white/20 text-white"
                : "bg-stone-200 text-stone-700"
                }`}
            >
              {recipeCategories.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("forum")}
            className={`px-3.5 py-1.5 text-sm font-medium rounded-xl transition-all cursor-pointer flex items-center gap-2 ${activeTab === "forum"
              ? "bg-emerald-700 text-white shadow-xs"
              : "bg-stone-100 text-stone-600 hover:bg-stone-200/70"
              }`}
          >
            <MessageSquare className="w-4 h-4" />
            Diễn đàn & Thảo luận
            <span
              className={`text-xs px-1.5 py-0.2 rounded-full ${activeTab === "forum"
                ? "bg-white/20 text-white"
                : "bg-stone-200 text-stone-700"
                }`}
            >
              {forumCategories.length}
            </span>
          </button>
        </div>

        <button
          onClick={() => openAdd()}
          className="flex items-center gap-2 h-10 px-4 rounded-xl bg-emerald-700 text-white text-sm font-semibold hover:bg-emerald-800 transition-colors cursor-pointer shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Thêm danh mục
        </button>
      </div>

      {loading ? (
        <div className="py-12 flex justify-center items-center text-stone-500 gap-2 text-sm">
          <Loader2 className="w-5 h-5 animate-spin text-emerald-600" />
          Đang tải danh mục từ máy chủ...
        </div>
      ) : (
        <div className="space-y-10">
          {/* Section: Recipe Categories */}
          {(activeTab === "all" || activeTab === "recipes") && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-stone-800 text-base flex items-center gap-2">
                    <Utensils className="w-4 h-4 text-emerald-600" />
                    Danh mục Công thức & Món ăn
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full">
                      {recipeCategories.length} danh mục
                    </span>
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Phân loại các công thức nấu ăn, món chính, món khai vị, canh, lẩu...
                  </p>
                </div>
              </div>
              {renderTable(recipeCategories, false)}
            </div>
          )}

          {/* Section: Forum Categories */}
          {(activeTab === "all" || activeTab === "forum") && (
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-stone-800 text-base flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-teal-600" />
                    Chuyên mục Diễn đàn & Thảo luận
                    <span className="text-xs font-semibold text-teal-700 bg-teal-50 border border-teal-200/60 px-2 py-0.5 rounded-full">
                      {forumCategories.length} chuyên mục
                    </span>
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Quản lý các chủ đề thảo luận, cẩm nang, quán chay và kết nối cộng đồng.
                  </p>
                </div>
              </div>
              {renderTable(forumCategories, true)}
            </div>
          )}
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editItem ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
      >
        <div className="space-y-4 pt-2">
          {errorMsg && (
            <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 p-2.5 rounded-lg">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
              Loại danh mục *
            </label>
            <select
              value={formType}
              onChange={(e) => setFormType(e.target.value as CategoryItem["type"])}
              className="w-full h-10 px-3 rounded-xl border border-stone-200 text-sm focus:border-emerald-600 outline-none bg-white cursor-pointer"
            >
              <option value="Recipe Category">Danh mục món ăn (Công thức)</option>
              <option value="Forum Category">Chuyên mục Diễn đàn & Thảo luận</option>

            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
              {formType === "Forum Category" ? "Tên chuyên mục diễn đàn *" : "Tên danh mục *"}
            </label>
            <input
              type="text"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              placeholder={
                formType === "Forum Category"
                  ? "Ví dụ: Mẹo vặt bếp chay"
                  : "Ví dụ: Món chay giàu đạm"
              }
              className="w-full h-10 px-3.5 rounded-xl border border-stone-200 text-sm focus:border-emerald-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
              Mô tả ngắn / Định danh (Slug)
            </label>
            <input
              type="text"
              value={formSlug}
              onChange={(e) => setFormSlug(e.target.value)}
              placeholder={
                formType === "Forum Category"
                  ? "Ví dụ: Chia sẻ công thức và mẹo vặt khi nấu nướng..."
                  : "Ví dụ: mon-chay-giau-dam"
              }
              className="w-full h-10 px-3.5 rounded-xl border border-stone-200 text-sm focus:border-emerald-600 outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-stone-100">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="h-10 px-4 rounded-xl border border-stone-200 text-sm font-semibold text-stone-700 hover:bg-stone-50 transition-colors cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving || !formName.trim()}
              className="h-10 px-5 rounded-xl bg-emerald-700 text-white text-sm font-semibold hover:bg-emerald-800 disabled:opacity-60 transition-colors cursor-pointer flex items-center gap-2 shadow-xs"
            >
              {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
              {editItem ? "Lưu thay đổi" : "Tạo danh mục"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default function AdminCategoriesPage() {
  const { isGuest, isMember, ready } = useRole();

  return (
    <AppShell showRightRail={false}>
      <div className="max-w-[1240px] mx-auto w-full">
        <PageHeader
          eyebrow="Quản trị hệ thống"
          title="Quản lý Danh mục & Chuyên mục"
          subtitle="Quản lý danh mục công thức món ăn, chế độ dinh dưỡng và chuyên mục diễn đàn cộng đồng."
        />
        {!ready ? (
          <GatedSkeleton />
        ) : isGuest ? (
          <LockedState reason="guest" />
        ) : isMember ? (
          <LockedState reason="forbidden" />
        ) : (
          <CategoriesContent />
        )}
      </div>
    </AppShell>
  );
}
