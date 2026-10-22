"use client";

import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { LockedState, GatedSkeleton } from "@/components/ui/LockedState";
import { useRole } from "@/context/RoleContext";
import { AdminRecipeManagement } from "@/features/admin/recipes/components/AdminRecipeManagement";

export default function AdminRecipesPage() {
  const { isGuest, isMember, ready } = useRole();

  return (
    <AppShell showRightRail={false}>
      <div className="max-w-[1240px] mx-auto w-full">
        <PageHeader
          eyebrow="Quản trị hệ thống"
          title="Quản trị Công thức"
          subtitle="Thêm mới, chỉnh sửa, xem chi tiết và quản lý công thức món ăn. Dữ liệu đồng bộ trực tiếp tới kế hoạch thực đơn và trợ lý AI dinh dưỡng."
        />
        {!ready ? (
          <GatedSkeleton />
        ) : isGuest ? (
          <LockedState reason="guest" />
        ) : isMember ? (
          <LockedState reason="forbidden" />
        ) : (
          <AdminRecipeManagement />
        )}
      </div>
    </AppShell>
  );
}
