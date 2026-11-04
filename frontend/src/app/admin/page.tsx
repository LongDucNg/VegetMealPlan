"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { LockedState, GatedSkeleton } from "@/components/ui/LockedState";
import { useRole } from "@/context/RoleContext";
import { adminService } from "@/features/admin";
import { forumService } from "@/features/community";
import { recipeApiService } from "@/features/recipes/services/recipeApiService";
import { ingredientApiService } from "@/features/recipes/services/ingredientApiService";
import {
  Users,
  UtensilsCrossed,
  Carrot,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  FolderTree,
  MessageSquare,
  Sparkles,
  Layers,
  HeartPulse,
  Leaf,
  Egg,
  Milk,
  RefreshCw,
  Refrigerator,
  Calculator,
  Coins,
  ShieldAlert,
} from "lucide-react";

const DIET_TYPES = [
  {
    name: "Thuần chay (Vegan)",
    tag: "100% Thực vật",
    description: "Hoàn toàn từ thực vật, không dùng thịt, cá, trứng, sữa hay mật ong.",
    icon: <Leaf className="w-4 h-4 text-emerald-600" />,
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    name: "Chay có sữa (Lacto)",
    tag: "Thực vật + Sữa",
    description: "Ăn thực vật kết hợp sữa bò/dê và các chế phẩm như phô mai, sữa chua.",
    icon: <Milk className="w-4 h-4 text-blue-600" />,
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    name: "Chay có trứng (Ovo)",
    tag: "Thực vật + Trứng",
    description: "Ăn thực vật kết hợp trứng gà hoặc trứng vịt không trống.",
    icon: <Egg className="w-4 h-4 text-amber-600" />,
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    name: "Chay trứng & sữa (Ovo-Lacto)",
    tag: "Phổ biến nhất",
    description: "Chế độ ăn chay linh hoạt kết hợp cân bằng cả trứng sạch và sữa.",
    icon: <HeartPulse className="w-4 h-4 text-violet-600" />,
    badgeColor: "bg-violet-50 text-violet-700 border-violet-200",
  },
];

const SYSTEM_MODULES = [
  {
    title: "Tủ lạnh Thông minh & Đề xuất Món",
    desc: "Theo dõi kho nguyên liệu của người dùng, tự động loại trừ dị ứng theo hồ sơ và gợi ý món nấu ngay.",
    icon: <Refrigerator className="w-4 h-4 text-emerald-600" />,
  },
  {
    title: "Tính toán Dinh dưỡng & Calo/100g",
    desc: "Tự động phân tích Calo, Đạm (Protein), Tinh bột (Carb), Béo (Fat) và Chất xơ theo trọng lượng nguyên liệu.",
    icon: <Calculator className="w-4 h-4 text-blue-600" />,
  },
  {
    title: "Ước tính Giá Đi chợ & Chi phí Bữa ăn",
    desc: "Đồng bộ đơn giá 190+ nguyên liệu thị trường, tính toán chi phí trung bình chính xác cho từng suất ăn.",
    icon: <Coins className="w-4 h-4 text-amber-600" />,
  },
  {
    title: "Kiểm duyệt & Quản trị Nội dung Diễn đàn",
    desc: "Duyệt bài viết cộng đồng, lưu lý do gỡ bài, cho phép hoàn tác/khôi phục bài viết minh bạch.",
    icon: <ShieldCheck className="w-4 h-4 text-rose-600" />,
  },
];

function AdminDashboardContent() {
  const [totalRecipes, setTotalRecipes] = useState<number>(631);
  const [pendingRecipes, setPendingRecipes] = useState<number>(0);
  const [approvedRecipes, setApprovedRecipes] = useState<number>(631);
  const [totalIngredients, setTotalIngredients] = useState<number>(190);
  const [totalMembers, setTotalMembers] = useState<number>(24);
  const [totalPosts, setTotalPosts] = useState<number>(5);
  const [pendingPosts, setPendingPosts] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      // 1. Công thức món chay
      try {
        const recipesRes = await recipeApiService.getAdminRecipes();
        const recipesList = Array.isArray(recipesRes) ? recipesRes : (recipesRes as any)?.data || [];
        if (Array.isArray(recipesList) && recipesList.length > 0) {
          setTotalRecipes(recipesList.length);
          const pending = recipesList.filter(
            (r: any) =>
              (r.status || "").toLowerCase() === "pending" ||
              (r.status || "").toLowerCase() === "pending_review"
          ).length;
          setPendingRecipes(pending);
          setApprovedRecipes(recipesList.length - pending);
        }
      } catch (err) {
        console.warn("[AdminDashboard] Error fetching recipes:", err);
      }

      // 2. Nguyên liệu thực phẩm
      try {
        const ingRes = await ingredientApiService.getIngredients();
        const ingList = Array.isArray(ingRes) ? ingRes : (ingRes as any)?.data || [];
        if (Array.isArray(ingList) && ingList.length > 0) {
          setTotalIngredients(ingList.length);
        }
      } catch (err) {
        console.warn("[AdminDashboard] Error fetching ingredients:", err);
      }

      // 3. Thành viên
      try {
        const members = await adminService.fetchMembers();
        if (Array.isArray(members) && members.length > 0) {
          setTotalMembers(members.length);
        }
      } catch (err) {
        console.warn("[AdminDashboard] Error fetching members:", err);
      }

      // 4. Diễn đàn & Kiểm duyệt
      try {
        const postsRes = await forumService.adminListPosts({ limit: 100 });
        if (postsRes && Array.isArray(postsRes.data)) {
          setTotalPosts(postsRes.pagination?.total || postsRes.data.length);
        }
        const pendingCount = await forumService.adminGetPendingCount();
        setPendingPosts(pendingCount || 0);
      } catch (err) {
        console.warn("[AdminDashboard] Error fetching forum stats:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const totalNeedsReview = pendingPosts + pendingRecipes;

  return (
    <div className="space-y-8">
      {/* Banner thông báo cần kiểm duyệt (nếu có) */}
      {totalNeedsReview > 0 && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-amber-50/90 border border-amber-200/90 rounded-2xl shadow-xs">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-xl text-amber-800 shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-amber-950">
                Nội dung đang chờ quản trị viên phê duyệt
              </p>
              <p className="text-xs text-amber-800">
                {pendingPosts > 0 && `${pendingPosts} bài viết diễn đàn`}
                {pendingPosts > 0 && pendingRecipes > 0 && " và "}
                {pendingRecipes > 0 && `${pendingRecipes} công thức món chay`}{" "}
                đang chờ kiểm duyệt trước khi xuất hiện trên hệ thống.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {pendingPosts > 0 && (
              <Link
                href="/admin/moderation"
                className="px-3 py-1.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold transition-colors"
              >
                Duyệt diễn đàn →
              </Link>
            )}
            {pendingRecipes > 0 && (
              <Link
                href="/admin/recipes"
                className="px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold transition-colors"
              >
                Duyệt công thức →
              </Link>
            )}
          </div>
        </div>
      )}

      {/* 4 Thẻ Thống kê Cốt lõi của Dự án VeggieHub */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Công thức Món chay"
          value={`${totalRecipes} món`}
          subtext={`${approvedRecipes} đã duyệt · ${pendingRecipes} chờ duyệt`}
          icon={<UtensilsCrossed className="w-4 h-4 text-emerald-600" />}
        />
        <StatCard
          label="Nguyên liệu Chuẩn"
          value={`${totalIngredients}+ loại`}
          subtext="Đầy đủ Calo/100g, Macro & Giá thị trường"
          icon={<Carrot className="w-4 h-4 text-amber-600" />}
        />
        <StatCard
          label="Thành viên Hệ thống"
          value={`${totalMembers} người`}
          subtext="Tài khoản đăng ký trên VeggieHub"
          icon={<Users className="w-4 h-4 text-blue-600" />}
        />
        <StatCard
          label="Bài viết Diễn đàn"
          value={`${totalPosts} bài`}
          subtext={
            pendingPosts > 0
              ? `${pendingPosts} bài đang chờ kiểm duyệt`
              : "Cộng đồng chia sẻ món chay & dinh dưỡng"
          }
          icon={<FileText className="w-4 h-4 text-purple-600" />}
          badge={
            pendingPosts > 0 ? (
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse inline-block" />
            ) : undefined
          }
        />
      </div>

      {/* 2 Khối Quản trị Nền tảng Ẩm thực Chay */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Khối 1: Cơ cấu Trường phái Ăn chay & An toàn Dinh dưỡng */}
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <h3 className="font-semibold text-stone-800">
              Trường phái Ăn chay & An toàn Dị ứng
            </h3>

          </div>

          <div className="space-y-3">
            {DIET_TYPES.map((diet) => (
              <div
                key={diet.name}
                className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-stone-50 border border-transparent hover:border-stone-100 transition-colors"
              >
                <div className="mt-0.5 p-1.5 rounded-lg bg-stone-100 shrink-0">
                  {diet.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-stone-900 truncate">
                      {diet.name}
                    </p>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${diet.badgeColor}`}
                    >
                      {diet.tag}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5 line-clamp-1">
                    {diet.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3.5 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
            <span className="flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
              <span>Hỗ trợ loại trừ 10 nhóm dị ứng thực phẩm theo hồ sơ cá nhân</span>
            </span>

          </div>
        </Card>

        {/* Khối 2: Các phân hệ nghiệp vụ vận hành VeggieHub */}
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-4 h-4 text-stone-700" />
            <h3 className="font-semibold text-stone-800">
              Tính năng Nền tảng Đang Hoạt động
            </h3>
            <button
              onClick={loadData}
              disabled={loading}
              title="Làm mới dữ liệu tổng quan"
              className="ml-auto text-xs text-stone-500 hover:text-stone-800 inline-flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />
              <span>Làm mới</span>
            </button>
          </div>

          <div className="space-y-3">
            {SYSTEM_MODULES.map((mod) => (
              <div
                key={mod.title}
                className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-stone-50 border border-transparent hover:border-stone-100 transition-colors"
              >
                <div className="mt-0.5 p-1.5 rounded-lg bg-stone-100 shrink-0">
                  {mod.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-stone-900 leading-snug">
                    {mod.title}
                  </p>
                  <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">
                    {mod.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3.5 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
            <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Hệ thống cơ sở dữ liệu hoạt động ổn định</span>
            </span>

          </div>
        </Card>
      </div>

      {/* Lối tắt Thao tác nhanh (Quick links) */}
      <div>
        <h3 className="font-semibold text-stone-800 mb-4">Phím tắt Quản trị Hệ thống</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {[
            {
              label: "Công thức món",
              href: "/admin/recipes",
              icon: <UtensilsCrossed className="w-5 h-5 text-emerald-600" />,
            },
            {
              label: "Nguyên liệu",
              href: "/admin/ingredients",
              icon: <Carrot className="w-5 h-5 text-amber-600" />,
            },
            {
              label: "Danh mục món",
              href: "/admin/categories",
              icon: <FolderTree className="w-5 h-5 text-blue-600" />,
            },
            {
              label: "Mục Diễn đàn",
              href: "/admin/forum-categories",
              icon: <MessageSquare className="w-5 h-5 text-purple-600" />,
            },
            {
              label: "Quản lý bài viết",
              href: "/admin/content",
              icon: <FileText className="w-5 h-5 text-teal-600" />,
            },
            {
              label: "Kiểm duyệt",
              href: "/admin/moderation",
              icon: <AlertTriangle className="w-5 h-5 text-rose-600" />,
            },
            {
              label: "Thành viên",
              href: "/admin/members",
              icon: <Users className="w-5 h-5 text-indigo-600" />,
            },
          ].map((qa) => (
            <Link
              key={qa.href}
              href={qa.href}
              className="flex flex-col items-center gap-2 p-3.5 bg-white border border-stone-200 rounded-[16px] hover:border-emerald-400 hover:shadow-xs transition-all group text-center"
            >
              <div className="p-2 rounded-xl bg-stone-50 group-hover:bg-emerald-50 transition-colors">
                {qa.icon}
              </div>
              <span className="text-xs font-semibold text-stone-700 group-hover:text-emerald-700 transition-colors">
                {qa.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const { isGuest, isMember, ready } = useRole();

  return (
    <AppShell showRightRail={false}>
      <div className="max-w-[1240px] mx-auto w-full">
        <PageHeader
          eyebrow="Quản trị Hệ thống"
          title="Bảng điều khiển Tổng quan"
          subtitle="Giám sát kho công thức món chay, cơ sở dữ liệu dinh dưỡng, thành viên và hoạt động cộng đồng VeggieHub."


        />
        {!ready ? (
          <GatedSkeleton />
        ) : isGuest ? (
          <LockedState reason="guest" />
        ) : isMember ? (
          <LockedState reason="forbidden" />
        ) : (
          <AdminDashboardContent />
        )}
      </div>
    </AppShell>
  );
}
