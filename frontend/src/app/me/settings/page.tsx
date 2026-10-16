"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Toggle } from "@/components/ui/Toggle";
import { LockedState, GatedSkeleton } from "@/components/ui/LockedState";
import { useRole } from "@/context/RoleContext";
import { ProfileEditor } from "@/features/profile/components/ProfileEditor";
import { SubscriptionPlans } from "@/features/subscription/components/SubscriptionPlans";
import { UserCheck, Crown, Bell, Globe, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

const REGION_OPTIONS = [
  "Thành phố Hồ Chí Minh",
  "Hà Nội",
  "Đà Nẵng",
  "Cần Thơ",
  "Huế",
  "Tỉnh thành khác (Việt Nam)",
  "Quốc tế",
];

type SettingsTab = "profile" | "subscription" | "notifications";

function SettingsContent() {
  const router = useRouter();
  const { logout, logoutAll } = useRole();
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const [region, setRegion] = useState("Thành phố Hồ Chí Minh");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [isLoggingOutAll, setIsLoggingOutAll] = useState(false);
  const [logoutNotice, setLogoutNotice] = useState<string | null>(null);

  const handleLogoutThisDevice = async () => {
    await logout();
    router.push("/login");
  };

  const handleLogoutAllDevices = async () => {
    if (confirm("Bạn có chắc chắn muốn đăng xuất khỏi tất cả các thiết bị đang đăng nhập không?")) {
      setIsLoggingOutAll(true);
      try {
        const res = await logoutAll();
        setLogoutNotice(res?.message || "Đã đăng xuất khỏi mọi thiết bị.");
        setTimeout(() => {
          router.push("/login");
        }, 1200);
      } catch (err) {
        console.warn("Logout all error:", err);
        router.push("/login");
      } finally {
        setIsLoggingOutAll(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Settings Navigation Tabs */}
      <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
        <button
          onClick={() => setActiveTab("profile")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "profile"
              ? "bg-emerald-700 text-white shadow-xs"
              : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-50"
          }`}
        >
          <UserCheck className="w-4 h-4" />
          Chỉ số dinh dưỡng & Thể trạng
        </button>

        <button
          onClick={() => setActiveTab("subscription")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "subscription"
              ? "bg-emerald-700 text-white shadow-xs"
              : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-50"
          }`}
        >
          <Crown className="w-4 h-4 text-amber-400" />
          Gói hội viên & Đăng ký
        </button>

        <button
          onClick={() => setActiveTab("notifications")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "notifications"
              ? "bg-emerald-700 text-white shadow-xs"
              : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-50"
          }`}
        >
          <Bell className="w-4 h-4" />
          Khu vực & Thông báo
        </button>
      </div>

      {/* Tab 1: Profile Editor */}
      {activeTab === "profile" && (
        <div>
          <ProfileEditor />
        </div>
      )}

      {/* Tab 2: Subscription Plans */}
      {activeTab === "subscription" && (
        <div>
          <SubscriptionPlans />
        </div>
      )}

      {/* Tab 3: Notifications & Region */}
      {activeTab === "notifications" && (
        <div className="max-w-2xl space-y-6">
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
              <Globe className="w-4 h-4 text-emerald-700" />
              <h3 className="font-semibold text-stone-800 text-sm">Khu vực & Vị trí</h3>
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                Khu vực địa phương
              </label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full h-11 rounded-xl border border-stone-200 bg-white px-4 text-sm focus:border-emerald-600 outline-none"
              >
                {REGION_OPTIONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
              <Bell className="w-4 h-4 text-emerald-700" />
              <h3 className="font-semibold text-stone-800 text-sm">Cài đặt thông báo</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-stone-900">Thông báo qua Email</p>
                  <p className="text-xs text-stone-500">
                    Nhận thông báo khi có phản hồi mới từ cộng đồng và bài viết của bạn
                  </p>
                </div>
                <Toggle checked={emailNotifications} onChange={setEmailNotifications} />
              </div>
              <div className="h-px bg-stone-100" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-stone-900">Bản tin thực đơn tuần</p>
                  <p className="text-xs text-stone-500">
                    Gợi ý công thức món chay bổ dưỡng và thực đơn mới vào mỗi thứ Hai
                  </p>
                </div>
                <Toggle checked={weeklyDigest} onChange={setWeeklyDigest} />
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Account & Session Card */}
      <Card className="p-6 border-red-100 bg-red-50/20 max-w-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-semibold text-stone-900">Quản lý phiên đăng nhập</h4>
            <p className="text-xs text-stone-500 mt-0.5">
              Đăng xuất khỏi thiết bị này hoặc thu hồi phiên trên toàn bộ các thiết bị khác.
            </p>
            {logoutNotice && (
              <p className="text-xs font-semibold text-emerald-700 mt-2">{logoutNotice}</p>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleLogoutThisDevice}
              className="h-9 px-3.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <LogOut className="w-3.5 h-3.5" />
              Đăng xuất
            </button>
            <button
              type="button"
              disabled={isLoggingOutAll}
              onClick={handleLogoutAllDevices}
              className="h-9 px-3.5 rounded-xl border border-red-200 bg-white hover:bg-red-50 text-red-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs disabled:opacity-50"
            >
              <LogOut className="w-3.5 h-3.5 text-red-600" />
              {isLoggingOutAll ? "Đang xử lý..." : "Đăng xuất mọi thiết bị"}
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function MeSettingsPage() {
  const { isGuest, ready } = useRole();

  return (
    <AppShell showRightRail={false}>
      <div className="max-w-[1240px] mx-auto w-full">
        <PageHeader
          eyebrow="Tài khoản"
          title="Hồ sơ & Cài đặt cá nhân"
          subtitle="Quản lý chỉ số cơ thể, thông số tính toán calo dinh dưỡng, nhóm dị ứng và gói hội viên của bạn."
        />
        {!ready ? (
          <GatedSkeleton />
        ) : isGuest ? (
          <LockedState reason="guest" />
        ) : (
          <SettingsContent />
        )}
      </div>
    </AppShell>
  );
}
