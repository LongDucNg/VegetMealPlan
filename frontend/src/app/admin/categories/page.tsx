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
import { Plus, Pencil, Archive, RotateCcw, Trash2, Loader2, AlertCircle } from "lucide-react";

function CategoriesContent() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<CategoryItem | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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

  const openAdd = () => {
    setEditItem(null);
    setFormName("");
    setFormSlug("");
    setFormType("Recipe Category");
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

    const categoryType = formType === "Food Type" ? "food_type" : "recipe_type";

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

  const renderTable = (items: CategoryItem[]) => (
    <DataTable
      columns={[
        { key: "name", label: "Tên danh mục" },
        { key: "slug", label: "Định danh / Mô tả" },
        { key: "count", label: "Số công thức" },
        { key: "status", label: "Trạng thái" },
        { key: "actions", label: "" },
      ]}
      rows={items.map((item) => ({
        name: <span className="text-sm font-semibold text-stone-900">{item.name}</span>,
        slug: (
          <code className="text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded-lg max-w-[200px] truncate inline-block">
            {item.slug}
          </code>
        ),
        count: (
          <span className="text-sm text-stone-600 font-medium">
            {item.recipeCount.toLocaleString()}
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
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                item.status === "Active"
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
      {/* Header action */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-stone-500">
          Quản lý toàn bộ danh mục loại thực phẩm và phân loại công thức món ăn.
        </p>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 h-10 px-4 rounded-xl bg-emerald-700 text-white text-sm font-semibold hover:bg-emerald-800 transition-colors cursor-pointer shadow-sm"
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
        <>
          {/* Food Types */}
          <div className="space-y-3">
            <h3 className="font-semibold text-stone-800 flex items-center gap-2">
              Trường phái ẩm thực
              <span className="text-xs font-normal text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">
                {foodTypes.length}
              </span>
            </h3>
            {renderTable(foodTypes)}
          </div>

          {/* Recipe Categories */}
          <div className="space-y-3">
            <h3 className="font-semibold text-stone-800 flex items-center gap-2">
              Danh mục món ăn
              <span className="text-xs font-normal text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">
                {recipeCategories.length}
              </span>
            </h3>
            {renderTable(recipeCategories)}
          </div>
        </>
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
              Tên danh mục *
            </label>
            <input
              type="text"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              placeholder="Ví dụ: Món chay giàu đạm"
              className="w-full h-10 px-3.5 rounded-xl border border-stone-200 text-sm focus:border-emerald-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
              Định danh / Mô tả (Slug)
            </label>
            <input
              type="text"
              value={formSlug}
              onChange={(e) => setFormSlug(e.target.value)}
              placeholder="Ví dụ: mon-chay-giau-dam"
              className="w-full h-10 px-3.5 rounded-xl border border-stone-200 text-sm focus:border-emerald-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
              Loại hình danh mục
            </label>
            <select
              value={formType}
              onChange={(e) => setFormType(e.target.value as CategoryItem["type"])}
              className="w-full h-10 px-3.5 rounded-xl border border-stone-200 text-sm focus:border-emerald-600 outline-none bg-white"
            >
              <option value="Recipe Category">Danh mục món ăn</option>
              <option value="Food Type">Trường phái ẩm thực</option>
            </select>
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
          title="Quản lý Danh mục & Phân loại"
          subtitle="Quản lý các trường phái ăn chay, nhóm nguyên liệu và phân loại món ăn."
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
