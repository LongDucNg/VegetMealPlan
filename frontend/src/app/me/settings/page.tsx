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
import { UserCheck, Crown, Bell, Globe } from "lucide-react";

const REGION_OPTIONS = [
  "Ho Chi Minh City",
  "Ha Noi",
  "Da Nang",
  "Can Tho",
  "Hue",
  "Other (Vietnam)",
  "Other (International)",
];

type SettingsTab = "profile" | "subscription" | "notifications";

function SettingsContent() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const [region, setRegion] = useState("Ho Chi Minh City");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);

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
          Nutrition & Body Profile
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
          Membership & Plans
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
          Preferences & Region
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
              <h3 className="font-semibold text-stone-800 text-sm">Region & Local Area</h3>
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                Region
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
              <h3 className="font-semibold text-stone-800 text-sm">Notifications</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-stone-900">Email notifications</p>
                  <p className="text-xs text-stone-500">Replies to your posts and community questions</p>
                </div>
                <Toggle checked={emailNotifications} onChange={setEmailNotifications} />
              </div>
              <div className="h-px bg-stone-100" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-stone-900">Weekly meal digest</p>
                  <p className="text-xs text-stone-500">Personalized recipe roundup every Monday</p>
                </div>
                <Toggle checked={weeklyDigest} onChange={setWeeklyDigest} />
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

export default function MeSettingsPage() {
  const { isGuest, ready } = useRole();

  return (
    <AppShell showRightRail={false}>
      <div className="max-w-[1240px] mx-auto w-full">
        <PageHeader
          eyebrow="Account"
          title="Profile & Settings"
          subtitle="Manage your physical metrics, calorie calculation parameters, dietary allergies, and subscription tier."
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
