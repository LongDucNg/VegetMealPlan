"use client";

import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { LockedState, GatedSkeleton } from "@/components/ui/LockedState";
import { useRole } from "@/context/RoleContext";
import { AdminIngredientManagement } from "@/features/admin/ingredients/components/AdminIngredientManagement";

export default function AdminIngredientsPage() {
  const { isGuest, isMember, ready } = useRole();

  return (
    <AppShell showRightRail={false}>
      <div className="max-w-[1240px] mx-auto w-full">
        <PageHeader
          eyebrow="Quản trị hệ thống"
          title="Quản lý Nguyên liệu"
          subtitle="Thêm mới, quản lý 190+ nguyên liệu thực phẩm, cập nhật giá thị trường tham khảo và chỉ số dinh dưỡng chuẩn."
        />
        {!ready ? (
          <GatedSkeleton />
        ) : isGuest ? (
          <LockedState reason="guest" />
        ) : isMember ? (
          <LockedState reason="forbidden" />
        ) : (
          <AdminIngredientManagement />
        )}
      </div>
    </AppShell>
  );
}
