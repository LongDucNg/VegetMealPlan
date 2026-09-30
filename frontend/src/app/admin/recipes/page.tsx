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
          eyebrow="Administration"
          title="Recipe Management"
          subtitle="Add, edit, inspect, and delete recipes. Changes sync immediately to user-facing pages, meal planner, and AI nutritionist."
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
