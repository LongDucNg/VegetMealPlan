"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { DataTable } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { LockedState, GatedSkeleton } from "@/components/ui/LockedState";
import { useRole } from "@/context/RoleContext";
import { FORUM_POSTS } from "@/lib/mock/forum";
import {
  FileText,
  MessageSquare,
  Settings,
  Pencil,
  Trash2,
  CheckCircle2,
  Star,
  Heart,
  CalendarDays,
  Tag,
  Plus,
  UtensilsCrossed,
  Sparkles,
  ArrowRight,
  Info,
  Calendar,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

import { useProfile } from "@/features/profile/hooks/useProfile";
import { useSubscription } from "@/features/subscription/hooks/useSubscription";
import { calculateBMI } from "@/features/nutrition/utils/bmi";
import { calculateDailyNutrition } from "@/features/nutrition/utils/calorieCalculator";
import { favoriteService, SavedMealPlan } from "@/features/recipes/services/favoriteService";
import { priceService, PRICE_WARNING_TEXT } from "@/features/recipes/services/priceService";
import { recipeService } from "@/features/recipes/services/recipeService";
import { Recipe } from "@/features/recipes/types";
import { RecipeFavoriteButton } from "@/components/ui/RecipeFavoriteButton";
import { UpdatePriceModal } from "@/features/recipes/components/UpdatePriceModal";
import { FavoritesModal } from "@/features/meal-planner/components/FavoritesModal";
import { storage, STORAGE_KEYS } from "@/utils/storage/storage";
import { DayMealPlan, WeeklyMealPlan } from "@/features/meal-planner/types";

const MY_POSTS = FORUM_POSTS.slice(0, 3).map((p) => ({
  id: p.id,
  title: p.title,
  votes: p.votes,
  comments: p.commentsCount,
  status: "Published" as const,
  date: "Sep 14, 2026",
}));

const MY_COMMENTS = [
  { id: "c1", content: "This tofu method changed my life!", on: "Crispy Sesame Garlic Tofu", date: "Sep 17, 2026", votes: 24 },
  { id: "c2", content: "Do you need a high-speed blender for this?", on: "Green Goddess Smoothie Bowl", date: "Sep 12, 2026", votes: 8 },
  { id: "c3", content: "I swapped coconut aminos for soy and it still tastes great.", on: "Miso Glazed Portobello", date: "Sep 10, 2026", votes: 15 },
];

type TabId = "favorites" | "saved_plans" | "custom_prices" | "posts" | "comments";

function TabButton({
  label,
  icon,
  active,
  badgeCount,
  onClick,
}: {
  id?: TabId;
  label: string;
  icon: React.ReactNode;
  active: boolean;
  badgeCount?: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer shrink-0 ${
        active
          ? "bg-emerald-700 text-white shadow-sm"
          : "text-stone-600 hover:bg-stone-100 hover:text-stone-900 bg-white border border-stone-200"
      }`}
    >
      {icon}
      <span>{label}</span>
      {badgeCount !== undefined && badgeCount > 0 && (
        <span
          className={`px-2 py-0.5 text-xs font-bold rounded-full ${
            active ? "bg-white/20 text-white" : "bg-stone-100 text-stone-700"
          }`}
        >
          {badgeCount}
        </span>
      )}
    </button>
  );
}

function ProfileContent() {
  const router = useRouter();
  const { profile } = useProfile();
  const { subscription, isPremium } = useSubscription();
  const userId = String(profile.id || "1");

  const [activeTab, setActiveTab] = useState<TabId>("favorites");
  const [dataVersion, setDataVersion] = useState(0);

  // Modals
  const [pricingRecipe, setPricingRecipe] = useState<Recipe | null>(null);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);
  const [showPickRecipeForPriceModal, setShowPickRecipeForPriceModal] = useState(false);

  // Subscribe to storage changes
  useEffect(() => {
    const unsub = storage.subscribe((event) => {
      if (
        event.key === STORAGE_KEYS.FAVORITES ||
        event.key === STORAGE_KEYS.RECIPE_PRICES ||
        event.key === STORAGE_KEYS.RECIPES
      ) {
        setDataVersion((v) => v + 1);
      }
    });
    return unsub;
  }, []);

  const bmiInfo = calculateBMI(profile.weight, profile.height);
  const nutrition = calculateDailyNutrition(profile);

  // Data queries
  const allApprovedRecipes = recipeService.getRecipes();
  const favoriteRecipes = favoriteService.getFavoriteRecipes(userId);
  const savedMealPlans = favoriteService.getFavoriteMealPlans(userId);
  const customPricedList = priceService.getAllUserPricedRecipes(userId, allApprovedRecipes);

  const handleOpenPriceModal = (recipe: Recipe) => {
    setPricingRecipe(recipe);
    setShowPricingModal(true);
  };

  const handleResetPrice = (recipeId: string) => {
    if (confirm("Đặt lại giá món ăn này về giá ước tính mặc định của hệ thống?")) {
      priceService.removeMyPrice(userId, recipeId);
      setDataVersion((v) => v + 1);
    }
  };

  const handleLoadSavedPlan = (plan: SavedMealPlan) => {
    // Save to active GENERATED_PLAN storage so Planner immediately displays it
    const totalKcal = plan.days.reduce((sum, d) => sum + d.totalCalories, 0);
    const totalProtein = plan.days.reduce((sum, d) => sum + d.totalProtein, 0);
    const totalCost = plan.days.reduce((sum, d) => sum + d.estimatedCost, 0);

    const weeklyPlan: WeeklyMealPlan = {
      days: plan.days,
      averageDailyCalories: Math.round(totalKcal / plan.days.length),
      averageProtein: Math.round(totalProtein / plan.days.length),
      targetCalories: plan.targetCalories,
      totalEstimatedCost: totalCost,
      averageDailyCost: Math.round(totalCost / plan.days.length),
    };

    storage.setItem(STORAGE_KEYS.GENERATED_PLAN, {
      planType: plan.planType,
      weeklyPlan,
      monthlyPlan: null,
      activeDayIndex: 0,
    });

    router.push("/planner");
  };

  const handleDeleteSavedPlan = (planId: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa thực đơn yêu thích này?")) {
      favoriteService.removeSavedMealPlan(userId, planId);
      setDataVersion((v) => v + 1);
    }
  };

  const handleApplyFavoriteDay = (dayPlan: DayMealPlan) => {
    const basePlan = {
      days: [dayPlan],
      averageDailyCalories: dayPlan.totalCalories,
      averageProtein: dayPlan.totalProtein,
      targetCalories: dayPlan.targetCalories,
      totalEstimatedCost: dayPlan.estimatedCost,
      averageDailyCost: dayPlan.estimatedCost,
    };

    storage.setItem(STORAGE_KEYS.GENERATED_PLAN, {
      planType: "weekly",
      weeklyPlan: basePlan,
      monthlyPlan: null,
      activeDayIndex: 0,
    });

    setShowFavoritesModal(false);
    router.push("/planner");
  };

  return (
    <div className="space-y-6">
      {/* Profile Header Card */}
      <div className="bg-white border border-stone-200 rounded-[24px] p-6 sm:p-8 flex flex-wrap gap-6 items-center shadow-xs">
        <div className="relative">
          <Avatar initials={profile.name.substring(0, 2).toUpperCase()} size={80} />
          <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-600 border-2 border-white flex items-center justify-center shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-white" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5">
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 tracking-tight">
              {profile.name}
            </h2>
            <Badge variant={isPremium ? "recipeOfDay" : "success"}>
              {subscription.planName}
            </Badge>
          </div>
          <p className="text-stone-500 text-sm mt-0.5">
            @{profile.handle || "demouser"} · Thành viên từ Tháng 1/2026
          </p>

          <div className="flex flex-wrap items-center gap-2 mt-3">
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
              BMI: {bmiInfo ? `${bmiInfo.formattedBMI} (${bmiInfo.category})` : "—"}
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-amber-50 text-amber-800 font-semibold border border-amber-200">
              Mục tiêu: ~{nutrition.dailyCalorieTarget} kcal/ngày
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-stone-100 text-stone-700 capitalize font-medium">
              Chế độ: {profile.vegetarianType.replace("_", " ")}
            </span>
            {profile.allergies.length > 0 && (
              <span className="text-xs px-3 py-1 rounded-full bg-red-50 text-red-700 border border-red-200 font-medium">
                Dị ứng: {profile.allergies.join(", ")}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons in Header */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/planner"
            className="flex items-center gap-2 h-11 px-5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold transition-all shadow-xs"
          >
            <Calendar className="w-4 h-4" />
            <span>Kế hoạch Meal Planner</span>
          </Link>
          <Link
            href="/me/settings"
            className="flex items-center gap-2 h-11 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-sm font-semibold transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span>Cài đặt</span>
          </Link>
        </div>
      </div>

      {/* Quick Overview Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          label="Món ăn yêu thích"
          value={String(favoriteRecipes.length)}
          subtext="Lưu trữ riêng của bạn"
          icon={<Heart className="w-4 h-4 text-rose-500 fill-rose-500" />}
        />
        <StatCard
          label="Thực đơn đã lưu"
          value={String(savedMealPlans.length)}
          subtext="Mẫu thực đơn tùy chỉnh"
          icon={<CalendarDays className="w-4 h-4 text-emerald-600" />}
        />
        <StatCard
          label="Giá riêng đã cập nhật"
          value={String(customPricedList.length)}
          subtext="Ưu tiên tính vào thực đơn"
          icon={<Tag className="w-4 h-4 text-amber-600" />}
        />
        <StatCard
          label="Mục tiêu calo hàng ngày"
          value={`~${nutrition.dailyCalorieTarget}`}
          subtext="Tính tự động từ BMI"
          icon={<Star className="w-4 h-4 text-emerald-600" />}
        />
      </div>

      {/* Tabs Row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <TabButton
          label="Món ăn yêu thích"
          icon={<Heart className="w-4 h-4 text-rose-500 fill-rose-500" />}
          active={activeTab === "favorites"}
          badgeCount={favoriteRecipes.length}
          onClick={() => setActiveTab("favorites")}
        />
        <TabButton
          label="Thực đơn yêu thích"
          icon={<CalendarDays className="w-4 h-4 text-emerald-700" />}
          active={activeTab === "saved_plans"}
          badgeCount={savedMealPlans.length}
          onClick={() => setActiveTab("saved_plans")}
        />
        <TabButton
          label="Bảng giá món của tôi"
          icon={<Tag className="w-4 h-4 text-amber-600" />}
          active={activeTab === "custom_prices"}
          badgeCount={customPricedList.length}
          onClick={() => setActiveTab("custom_prices")}
        />
        <TabButton
          label="Bài viết diễn đàn"
          icon={<FileText className="w-4 h-4" />}
          active={activeTab === "posts"}
          onClick={() => setActiveTab("posts")}
        />
        <TabButton
          label="Bình luận"
          icon={<MessageSquare className="w-4 h-4" />}
          active={activeTab === "comments"}
          onClick={() => setActiveTab("comments")}
        />
      </div>

      {/* ========================================================
          TAB 1: FAVORITE RECIPES
      ======================================================== */}
      {activeTab === "favorites" && (
        <div className="space-y-6 animate-in fade-in">
          <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                  <h3 className="font-serif font-bold text-xl text-stone-900">
                    Danh sách Món ăn Yêu thích
                  </h3>
                </div>
                <p className="text-xs text-stone-500 mt-0.5">
                  Dữ liệu yêu thích riêng của bạn. Dùng để xem dinh dưỡng, tạo thực đơn hoặc cập nhật giá thực tế.
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowFavoritesModal(true)}
                  className="flex items-center gap-2 h-10 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs transition-all shadow-xs cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Tạo thực đơn từ yêu thích</span>
                </button>
                <Link
                  href="/planner"
                  className="flex items-center gap-1.5 h-10 px-3.5 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-semibold transition-colors"
                >
                  <span>Mở Planner</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {favoriteRecipes.length === 0 ? (
              <div className="p-12 text-center text-stone-400 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
                <Heart className="w-10 h-10 text-stone-300 mx-auto mb-2" />
                <p className="font-medium text-stone-700 text-sm">Chưa có món ăn yêu thích nào.</p>
                <p className="text-xs text-stone-500 mt-1">
                  Nhấp vào biểu tượng ♡ trên bất kỳ công thức nào để lưu vào danh sách cá nhân của bạn.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {favoriteRecipes.map((recipe) => {
                  const costInfo = priceService.getEffectivePrice(recipe, userId);
                  const adminEst = recipe.estimatedCost || priceService.calculateRecipeCost(recipe.ingredients || []).estimatedCost;

                  return (
                    <div
                      key={recipe.id}
                      className="p-4 rounded-2xl border border-stone-200 bg-stone-50/40 hover:bg-white hover:border-emerald-300 transition-all flex flex-col justify-between space-y-4 shadow-2xs group"
                    >
                      <div className="flex items-start gap-3.5">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                          {recipe.image ? (
                            <img
                              src={recipe.image}
                              alt={recipe.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-stone-300">
                              <UtensilsCrossed className="w-6 h-6" />
                            </div>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900">
                              {recipe.mealType}
                            </span>
                            <RecipeFavoriteButton recipeId={recipe.id} size="sm" />
                          </div>

                          <h4 className="font-bold text-stone-900 text-sm truncate mt-1">
                            {recipe.name || recipe.title}
                          </h4>

                          <div className="flex items-center gap-2 text-xs text-stone-500 mt-1">
                            <span className="text-amber-700 font-bold">{recipe.calories} kcal</span>
                            <span>·</span>
                            <span>{recipe.protein}g đạm</span>
                          </div>
                        </div>
                      </div>

                      {/* Pricing Info & Price Update Button */}
                      <div className="pt-3 border-t border-stone-100 flex flex-col gap-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-stone-500">Giá ước tính hệ thống:</span>
                          <span className="font-semibold text-stone-700">~{adminEst.toLocaleString("vi-VN")} VND</span>
                        </div>

                        <div className="flex items-center justify-between text-xs bg-emerald-50/70 p-2 rounded-xl border border-emerald-100">
                          <span className="text-emerald-900 font-medium flex items-center gap-1">
                            <Tag className="w-3 h-3 text-emerald-700" />
                            Giá áp dụng:
                          </span>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-emerald-800">{costInfo.formatted}</span>
                            {costInfo.isCustom && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-emerald-200 text-emerald-950 font-bold uppercase">
                                Giá riêng
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => handleOpenPriceModal(recipe)}
                            className="h-8 rounded-xl bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                          >
                            <Pencil className="w-3 h-3" />
                            <span>Cập nhật giá</span>
                          </button>

                          <Link
                            href="/planner"
                            className="h-8 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors shadow-2xs"
                          >
                            <span>Dùng trong tuần</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 2: SAVED MEAL PLANS
      ======================================================== */}
      {activeTab === "saved_plans" && (
        <div className="space-y-6 animate-in fade-in">
          <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-emerald-700" />
                  <h3 className="font-serif font-bold text-xl text-stone-900">
                    Thực đơn Yêu thích đã lưu (Saved Templates)
                  </h3>
                </div>
                <p className="text-xs text-stone-500 mt-0.5">
                  Lưu trữ các kế hoạch thực đơn hoàn chỉnh để tái sử dụng làm mẫu hoặc tải ngay vào Meal Planner.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowFavoritesModal(true)}
                className="flex items-center gap-2 h-10 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs transition-all shadow-xs cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Tạo thực đơn mới</span>
              </button>
            </div>

            {savedMealPlans.length === 0 ? (
              <div className="p-12 text-center text-stone-400 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
                <CalendarDays className="w-10 h-10 text-stone-300 mx-auto mb-2" />
                <p className="font-medium text-stone-700 text-sm">Chưa có thực đơn nào được lưu.</p>
                <p className="text-xs text-stone-500 mt-1">
                  Trong Meal Planner, bạn có thể bấm &quot;Save Plan&quot; để lưu lại các thực đơn tuần hoặc tháng yêu thích.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {savedMealPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className="p-5 rounded-2xl border border-stone-200 bg-stone-50/50 hover:bg-white hover:border-emerald-300 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-2xs"
                  >
                    <div className="space-y-2 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900">
                          {plan.planType} Plan
                        </span>
                        <h4 className="font-serif font-bold text-stone-900 text-base truncate">
                          {plan.name}
                        </h4>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-stone-600">
                        <span className="font-medium">
                          📅 {plan.days.length} ngày dinh dưỡng
                        </span>
                        <span>·</span>
                        <span className="text-amber-700 font-bold">
                          ⚡ Mục tiêu: ~{plan.targetCalories} kcal/ngày
                        </span>
                        <span>·</span>
                        <span className="text-emerald-800 font-bold">
                          💰 Tổng chi phí: ~{plan.totalEstimatedCost.toLocaleString("vi-VN")} VND
                        </span>
                        <span>·</span>
                        <span className="text-stone-400 text-[11px]">
                          Lưu ngày: {new Date(plan.createdAt).toLocaleDateString("vi-VN")}
                        </span>
                      </div>

                      {/* Day meal preview badges */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {plan.days.slice(0, 4).map((d, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 font-medium"
                          >
                            {d.shortDay}: {d.lunch?.recipe?.name || d.breakfast?.recipe?.name || "Healthy meal"}
                          </span>
                        ))}
                        {plan.days.length > 4 && (
                          <span className="text-[11px] px-2 py-0.5 rounded-md bg-stone-200 text-stone-600 font-medium">
                            +{plan.days.length - 4} ngày khác
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2.5 self-end md:self-auto shrink-0">
                      <button
                        type="button"
                        onClick={() => handleLoadSavedPlan(plan)}
                        className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Áp dụng vào Meal Planner</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteSavedPlan(plan.id)}
                        className="p-2.5 rounded-xl text-stone-400 hover:text-red-600 hover:bg-red-50 border border-stone-200 transition-colors cursor-pointer"
                        title="Xóa thực đơn"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 3: MY CUSTOM RECIPE PRICES (Requirement 6, 7)
      ======================================================== */}
      {activeTab === "custom_prices" && (
        <div className="space-y-6 animate-in fade-in">
          <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <Tag className="w-5 h-5 text-amber-600" />
                  <h3 className="font-serif font-bold text-xl text-stone-900">
                    Bảng giá Món ăn Cá nhân của Tôi (&quot;My Price&quot;)
                  </h3>
                </div>
                <p className="text-xs text-stone-500 mt-0.5">
                  Giá do bạn tự nhập theo giá đi chợ thực tế. Hệ thống sẽ ưu tiên tính toán chi phí thực đơn theo giá này.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowPickRecipeForPriceModal(true)}
                className="flex items-center gap-2 h-10 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs transition-all shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>+ Đặt giá món mới</span>
              </button>
            </div>

            {/* Price Warning Notice (Requirement 5) */}
            <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Lưu ý về giá ước tính:</p>
                <p className="mt-0.5 text-stone-600">{PRICE_WARNING_TEXT}</p>
              </div>
            </div>

            {customPricedList.length === 0 ? (
              <div className="p-12 text-center text-stone-400 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
                <Tag className="w-10 h-10 text-stone-300 mx-auto mb-2" />
                <p className="font-medium text-stone-700 text-sm">
                  Bạn chưa nhập giá riêng cho món ăn nào.
                </p>
                <p className="text-xs text-stone-500 mt-1">
                  Nhấp vào nút &quot;+ Đặt giá món mới&quot; hoặc &quot;Cập nhật giá thực tế&quot; trên các món ăn để lưu giá chợ của gia đình bạn.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-stone-200">
                <table className="w-full text-left text-sm">
                  <thead className="bg-stone-50 border-b border-stone-200 text-xs font-semibold text-stone-600 uppercase tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4">Tên món ăn</th>
                      <th className="py-3.5 px-3">Bữa ăn</th>
                      <th className="py-3.5 px-4">Giá ước tính Admin</th>
                      <th className="py-3.5 px-4">Giá thực tế của bạn</th>
                      <th className="py-3.5 px-3">Chênh lệch</th>
                      <th className="py-3.5 px-4 text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {customPricedList.map((item) => (
                      <tr key={item.recipe.id} className="hover:bg-stone-50/60 transition-colors">
                        <td className="py-3.5 px-4 font-semibold text-stone-900">
                          <div className="flex items-center gap-2.5">
                            {item.recipe.image && (
                              <img
                                src={item.recipe.image}
                                alt={item.recipe.name}
                                className="w-8 h-8 rounded-lg object-cover shrink-0"
                              />
                            )}
                            <span className="truncate max-w-xs">{item.recipe.name || item.recipe.title}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-3">
                          <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-stone-100 text-stone-700">
                            {item.recipe.mealType}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-stone-600 font-medium">
                          ~{item.estimatedCost.toLocaleString("vi-VN")} VND
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-emerald-800">
                            {item.myPrice.toLocaleString("vi-VN")} VND
                          </span>
                        </td>
                        <td className="py-3.5 px-3">
                          <span
                            className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                              item.diff > 0
                                ? "bg-amber-100 text-amber-900"
                                : item.diff < 0
                                ? "bg-emerald-100 text-emerald-900"
                                : "bg-stone-100 text-stone-700"
                            }`}
                          >
                            {item.diff > 0 ? `+${item.diff.toLocaleString("vi-VN")}` : item.diff.toLocaleString("vi-VN")} VND
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleOpenPriceModal(item.recipe)}
                              className="px-2.5 py-1.5 rounded-lg bg-stone-100 hover:bg-emerald-50 hover:text-emerald-700 text-stone-700 text-xs font-semibold transition-colors cursor-pointer"
                            >
                              Sửa giá
                            </button>
                            <button
                              type="button"
                              onClick={() => handleResetPrice(item.recipe.id)}
                              className="p-1.5 rounded-lg hover:bg-red-50 text-stone-400 hover:text-red-600 transition-colors cursor-pointer"
                              title="Đặt lại về mặc định"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 4: MY POSTS
      ======================================================== */}
      {activeTab === "posts" && (
        <DataTable
          columns={[
            { key: "title", label: "Tiêu đề bài viết" },
            { key: "votes", label: "Bình chọn" },
            { key: "comments", label: "Bình luận" },
            { key: "status", label: "Trạng thái" },
            { key: "actions", label: "" },
          ]}
          rows={MY_POSTS.map((p) => ({
            title: (
              <Link
                href={`/forum/${p.id}`}
                className="font-medium text-stone-900 hover:text-emerald-700 transition-colors line-clamp-1"
              >
                {p.title}
              </Link>
            ),
            votes: <span className="text-sm text-stone-600">▲ {p.votes}</span>,
            comments: <span className="text-sm text-stone-600">{p.comments}</span>,
            status: <Badge variant="success">{p.status}</Badge>,
            actions: (
              <Link
                href={`/forum/${p.id}`}
                className="text-xs font-semibold text-emerald-700 hover:underline"
              >
                Xem chi tiết
              </Link>
            ),
          }))}
        />
      )}

      {/* ========================================================
          TAB 5: MY COMMENTS
      ======================================================== */}
      {activeTab === "comments" && (
        <DataTable
          columns={[
            { key: "content", label: "Bình luận" },
            { key: "on", label: "Bài viết / Món ăn" },
            { key: "votes", label: "Ủng hộ" },
            { key: "date", label: "Ngày" },
          ]}
          rows={MY_COMMENTS.map((c) => ({
            content: <span className="text-sm text-stone-800 line-clamp-1">{c.content}</span>,
            on: <span className="text-xs text-emerald-700 font-medium line-clamp-1">{c.on}</span>,
            votes: <span className="text-sm text-stone-600">▲ {c.votes}</span>,
            date: <span className="text-xs text-stone-500">{c.date}</span>,
          }))}
        />
      )}

      {/* ========================================================
          MODALS
      ======================================================== */}

      {/* Update Personal Recipe Price Modal (Requirement 6) */}
      <UpdatePriceModal
        recipe={pricingRecipe}
        isOpen={showPricingModal}
        onClose={() => {
          setShowPricingModal(false);
          setPricingRecipe(null);
        }}
        onSaved={() => {
          setDataVersion((v) => v + 1);
        }}
      />

      {/* Create Meal Plan from Favorites Modal (Requirement 2) */}
      <FavoritesModal
        isOpen={showFavoritesModal}
        onClose={() => setShowFavoritesModal(false)}
        profile={profile}
        onApplyPlan={handleApplyFavoriteDay}
        onLoadSavedPlan={handleLoadSavedPlan}
      />

      {/* Modal to Pick Any Recipe for Custom Price */}
      {showPickRecipeForPriceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/60">
              <div className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-emerald-700" />
                <h3 className="font-serif font-bold text-base text-stone-900">
                  Chọn món ăn để đặt giá của bạn
                </h3>
              </div>
              <button
                onClick={() => setShowPickRecipeForPriceModal(false)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 flex items-center justify-center transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-2 flex-1">
              {allApprovedRecipes.map((r) => {
                const existing = priceService.getMyPrice(userId, r.id);
                return (
                  <div
                    key={r.id}
                    onClick={() => {
                      setShowPickRecipeForPriceModal(false);
                      handleOpenPriceModal(r);
                    }}
                    className="p-3 rounded-xl border border-stone-200 hover:border-emerald-500 hover:bg-emerald-50/40 cursor-pointer transition-all flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {r.image && (
                        <img
                          src={r.image}
                          alt={r.title}
                          className="w-10 h-10 rounded-lg object-cover shrink-0"
                        />
                      )}
                      <div className="min-w-0">
                        <h4 className="font-semibold text-stone-900 text-sm truncate">
                          {r.name || r.title}
                        </h4>
                        <p className="text-xs text-stone-500">
                          {r.mealType} · {r.calories} kcal
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      {existing ? (
                        <span className="text-xs font-bold text-emerald-800">
                          {existing.toLocaleString("vi-VN")} VND
                        </span>
                      ) : (
                        <span className="text-xs font-semibold text-stone-400">
                          Chưa đặt giá
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MePage() {
  const { isGuest, ready } = useRole();

  return (
    <AppShell showRightRail={false}>
      <div className="max-w-[1240px] mx-auto w-full">
        <PageHeader
          eyebrow="TÀI KHOẢN CỦA BẠN"
          title="Hồ sơ & Thực đơn Cá nhân"
          subtitle="Quản lý món ăn yêu thích, mẫu thực đơn đã lưu và giá nguyên liệu đi chợ riêng của gia đình bạn."
        />
        {!ready ? (
          <GatedSkeleton />
        ) : isGuest ? (
          <LockedState reason="guest" />
        ) : (
          <ProfileContent />
        )}
      </div>
    </AppShell>
  );
}
