"use client";

import React, { useState, useEffect } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { LockedState, GatedSkeleton } from "@/components/ui/LockedState";
import { useRole } from "@/context/RoleContext";
import { ADMIN_MEMBERS, AdminMember, adminService } from "@/features/admin";
import {
  Search,
  UserCheck,
  UserX,
  ShieldCheck,
  MoreHorizontal,
} from "lucide-react";

function StatusBadge({ status }: { status: AdminMember["status"] }) {
  if (status === "Active") return <Badge variant="success">Hoạt động</Badge>;
  if (status === "Suspended") return <Badge variant="flagged">Đã khóa</Badge>;
  return <Badge variant="info">Chờ duyệt</Badge>;
}

function RoleBadge({ role }: { role: AdminMember["role"] }) {
  if (role === "Admin") return <Badge variant="info">Quản trị viên</Badge>;
  if (role === "Member") return <Badge variant="recipeOfDay">Thành viên</Badge>;
  return <span className="text-xs text-stone-400">Khách</span>;
}

function MembersContent() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | AdminMember["status"]>("all");
  const [members, setMembers] = useState<AdminMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    adminService
      .fetchMembers({
        search: search.trim() || undefined,
        status: statusFilter !== "all" ? statusFilter : undefined,
      })
      .then((data) => {
        if (!active) return;
        setMembers(data);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [search, statusFilter]);


  const toggleSuspend = async (id: string) => {
    const target = members.find((m) => m.id === id);
    if (!target) return;
    const nextStatus = target.status === "Suspended" ? "Active" : "Suspended";

    // Optimistic update
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: nextStatus } : m))
    );

    await adminService.updateMemberStatus(id, nextStatus);
  };

  const toggleRole = async (id: string) => {
    const target = members.find((m) => m.id === id);
    if (!target) return;
    const nextRole = target.role === "Admin" ? "Member" : "Admin";

    // Optimistic update
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, role: nextRole } : m))
    );

    await adminService.updateMemberRole(id, nextRole.toLowerCase());
  };

  const filtered = members.filter((m) => {
    const matchSearch =
      !search ||
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || m.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-5">
      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[240px] max-w-[360px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm thành viên…"
            className="w-full h-10 rounded-xl border border-stone-200 bg-white pl-9 pr-4 text-sm focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none"
          />
        </div>
        <div className="flex gap-2">
          {(["all", "Active", "Suspended", "Pending"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer capitalize ${
                statusFilter === s
                  ? "bg-emerald-700 text-white"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {s === "all" ? "Tất cả" : s === "Active" ? "Hoạt động" : s === "Suspended" ? "Đã khóa" : "Chờ duyệt"}
            </button>
          ))}
        </div>
        <span className="text-xs text-stone-500 ml-auto">{filtered.length} thành viên</span>
      </div>

      {/* Table */}
      <DataTable
        columns={[
          { key: "member", label: "Thành viên" },
          { key: "role", label: "Vai trò" },
          { key: "content", label: "Đóng góp" },
          { key: "joined", label: "Ngày tham gia" },
          { key: "status", label: "Trạng thái" },
          { key: "actions", label: "" },
        ]}
        rows={filtered.map((m) => ({
          member: (
            <div className="flex items-center gap-3">
              <Avatar initials={m.initials} size={36} />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-stone-900 truncate">{m.name}</p>
                <p className="text-xs text-stone-500 truncate">{m.email}</p>
              </div>
            </div>
          ),
          role: <RoleBadge role={m.role} />,
          content: (
            <span className="text-xs text-stone-600">
              {m.videoCount} video · {m.postCount} bài
            </span>
          ),
          joined: <span className="text-xs text-stone-500">{m.joinedDate}</span>,
          status: <StatusBadge status={m.status} />,
          actions: (
            <div className="flex items-center gap-1">
              <button
                onClick={() => toggleSuspend(m.id)}
                title={m.status === "Suspended" ? "Mở khóa tài khoản" : "Khóa tài khoản"}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  m.status === "Suspended"
                    ? "hover:bg-emerald-50 text-stone-500 hover:text-emerald-700"
                    : "hover:bg-red-50 text-stone-500 hover:text-red-600"
                }`}
              >
                {m.status === "Suspended" ? (
                  <UserCheck className="w-3.5 h-3.5" />
                ) : (
                  <UserX className="w-3.5 h-3.5" />
                )}
              </button>
              <button
                onClick={() => toggleRole(m.id)}
                title={m.role === "Admin" ? "Hạ xuống Thành viên" : "Cấp quyền Quản trị viên"}
                className={`p-1.5 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer ${
                  m.role === "Admin" ? "text-emerald-700 bg-emerald-50" : "text-stone-400 hover:text-stone-600"
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
              </button>
              <button
                title="Tùy chọn khác"
                className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-stone-600 transition-colors cursor-pointer"
              >
                <MoreHorizontal className="w-3.5 h-3.5" />
              </button>
            </div>
          ),
        }))}
      />
    </div>
  );
}

export default function AdminMembersPage() {
  const { isGuest, isMember, ready } = useRole();

  return (
    <AppShell showRightRail={false}>
      <div className="max-w-[1240px] mx-auto w-full">
        <PageHeader
          eyebrow="Quản trị hệ thống"
          title="Quản lý Thành viên"
          subtitle="Xem, tìm kiếm và phân quyền các thành viên trên hệ thống VeggieHub."
        />
        {!ready ? (
          <GatedSkeleton />
        ) : isGuest ? (
          <LockedState reason="guest" />
        ) : isMember ? (
          <LockedState reason="forbidden" />
        ) : (
          <MembersContent />
        )}
      </div>
    </AppShell>
  );
}

