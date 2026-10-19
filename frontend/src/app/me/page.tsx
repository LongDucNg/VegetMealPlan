"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { DataTable } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { LockedState, GatedSkeleton } from "@/components/ui/LockedState";
import { useRole } from "@/context/RoleContext";
import { FORUM_POSTS } from "@/features/community";

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
  Crown,
  ChefHat,
} from "lucide-react";

import { useProfile } from "@/features/profile/hooks/useProfile";
import { formatVegetarianType } from "@/features/profile/types";
import { useSubscription } from "@/features/subscription/hooks/useSubscription";
import { calculateBMI } from "@/features/nutrition/utils/bmi";
import { calculateDailyNutrition } from "@/features/nutrition/utils/calorieCalculator";
import {
  nutritionService,
  ServerNutritionSummary,
  NutritionWarnings,
  CalorieExplanationSection,
} from "@/features/nutrition";
import { favoriteService, SavedMealPlan } from "@/features/recipes/services/favoriteService";
import { priceService, PRICE_WARNING_TEXT } from "@/features/recipes/services/priceService";
import { recipeService } from "@/features/recipes/services/recipeService";
import { Recipe } from "@/features/recipes/types";
import { RecipeFavoriteButton } from "@/components/ui/RecipeFavoriteButton";
import { UpdatePriceModal } from "@/features/recipes/components/UpdatePriceModal";
import { FavoritesModal } from "@/features/meal-planner/components/FavoritesModal";
import { mealPlannerService } from "@/features/meal-planner/services/mealPlannerService";
import { storage, STORAGE_KEYS } from "@/utils/storage/storage";
import { DayMealPlan, WeeklyMealPlan } from "@/features/meal-planner/types";
import { favoriteApiService } from "@/features/recipes/services/favoriteApiService";
import { recipeApiService } from "@/features/recipes/services/recipeApiService";
import { ingredientApiService, UserRecipePriceItem } from "@/features/recipes/services/ingredientApiService";
import { mapBackendToFrontendRecipe } from "@/features/recipes/utils/recipeMapper";
import { tokenStorage } from "@/lib/tokenStorage";

const MY_POSTS: Array<{
  id: string;
  title: string;
  votes: number;
  comments: number;
  status: "Published";
  date: string;
}> = [];

const MY_COMMENTS: Array<{
  id: string;
  content: string;
  on: string;
  date: string;
  votes: number;
}> = [];

type TabId = "favorites" | "my_recipes" | "saved_plans" | "custom_prices" | "posts" | "comments";

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
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer shrink-0 ${active
          ? "bg-emerald-700 text-white shadow-sm"
          : "text-stone-600 hover:bg-stone-100 hover:text-stone-900 bg-white border border-stone-200"
        }`}
    >
      {icon}
      <span>{label}</span>
      {badgeCount !== undefined && badgeCount > 0 && (
        <span
          className={`px-2 py-0.5 text-xs font-bold rounded-full ${active ? "bg-white/20 text-white" : "bg-stone-100 text-stone-700"
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
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab") as TabId | null;
  const { profile } = useProfile();
  const { subscription, isPremium, cancel, purchase } = useSubscription();
  const authUser = tokenStorage.getUser();
  const userId = String(authUser?.user_id || profile.id || "1");

  const [activeTab, setActiveTab] = useState<TabId>(tabParam || "favorites");
  const [dataVersion, setDataVersion] = useState(0);
  const [recipeStatusFilter, setRecipeStatusFilter] = useState<"ALL" | "APPROVED" | "PENDING_REVIEW" | "REJECTED">("ALL");

  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

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

  const [serverNutrition, setServerNutrition] = useState<ServerNutritionSummary | null>(null);

  useEffect(() => {
    nutritionService
      .getServerNutritionSummary()
      .then(setServerNutrition)
      .catch(() => {
        // Fallback silently to client calculation
      });
  }, [profile]);

  const hasPhysicalMetrics = Number(profile.height) > 0 && Number(profile.weight) > 0;
  const bmiInfo = hasPhysicalMetrics ? calculateBMI(profile.weight, profile.height) : null;
  const nutrition = calculateDailyNutrition(profile);

  const displayBmi = hasPhysicalMetrics
    ? (serverNutrition?.bmi ?? profile.bmi ?? (bmiInfo ? Number(bmiInfo.formattedBMI) : null))
    : null;
  const displayBmiCategory = hasPhysicalMetrics
    ? (serverNutrition?.bmi_category ?? profile.bmiCategory ?? bmiInfo?.category)
    : null;
  const displayTargetCalories = hasPhysicalMetrics
    ? (serverNutrition?.target_calories ?? nutrition.dailyCalorieTarget)
    : null;

  // Data queries
  const [allApprovedRecipes, setAllApprovedRecipes] = useState<Recipe[]>([]);
  useEffect(() => {
    setAllApprovedRecipes(recipeService.getRecipes());
  }, []);

  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const [favLoading, setFavLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadFavorites() {
      try {
        const res = await favoriteApiService.getMyFavorites();
        const list = Array.isArray(res) ? res : (res as any)?.data || [];
        if (Array.isArray(list) && isMounted) {
          const mapped = list.map(mapBackendToFrontendRecipe);
          setFavoriteRecipes(mapped);

          // Sync IDs to local favoriteService only when actually changed
          const ids = mapped.map((r) => String(r.id));
          const currentFavs = favoriteService.getUserFavorites(userId);
          const hasDiff =
            currentFavs.recipes.length !== ids.length ||
            !ids.every((id) => currentFavs.recipes.includes(id));
          if (hasDiff) {
            favoriteService.saveUserFavorites({
              userId,
              recipes: ids,
              mealPlans: favoriteService.getFavoriteMealPlans(userId),
            });
          }
        }
      } catch (err) {
        if (isMounted) {
          setFavoriteRecipes(favoriteService.getFavoriteRecipes(userId));
        }
      } finally {
        if (isMounted) setFavLoading(false);
      }
    }

    loadFavorites();
    return () => {
      isMounted = false;
    };
  }, [userId, dataVersion]);

  const handleRemoveFavorite = async (recipeId: string) => {
    const numericId = parseInt(recipeId.replace(/\D/g, ""), 10);
    setFavoriteRecipes((prev) => prev.filter((r) => r.id !== recipeId));
    favoriteService.toggleFavoriteRecipe(userId, recipeId);

    if (!isNaN(numericId)) {
      try {
        await favoriteApiService.removeFavorite(numericId);
      } catch (err) {
        console.error("Failed to remove favorite:", err);
      }
    }
  };

  const savedMealPlans = favoriteService.getFavoriteMealPlans(userId);

  // Real user custom prices from API
  const [customPrices, setCustomPrices] = useState<UserRecipePriceItem[]>([]);
  const [customPricesLoading, setCustomPricesLoading] = useState(true);

  // Real recipes created by this user that are approved
  const [myRecipes, setMyRecipes] = useState<Recipe[]>([]);
  const [myRecipesLoading, setMyRecipesLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadCustomPrices() {
      try {
        const res = await ingredientApiService.getMyRecipePrices();
        const list = Array.isArray(res) ? res : (res as any)?.data || [];
        if (isMounted) {
          setCustomPrices(Array.isArray(list) ? list : []);
        }
      } catch (err) {
        if (isMounted) setCustomPrices([]);
      } finally {
        if (isMounted) setCustomPricesLoading(false);
      }
    }

    loadCustomPrices();
    return () => {
      isMounted = false;
    };
  }, [userId, dataVersion]);

  useEffect(() => {
    let isMounted = true;
    async function loadMyRecipes() {
      try {
        let list: any[] = [];
        try {
          const res = await recipeApiService.getMyRecipes();
          list = Array.isArray(res) ? res : (res as any)?.data || [];
        } catch {
          const numericUserId = parseInt(userId, 10);
          if (!isNaN(numericUserId)) {
            const res = await recipeApiService.getRecipes({
              created_by: numericUserId,
              limit: 100,
            });
            list = Array.isArray(res) ? res : (res as any)?.data || (res as any)?.items || [];
          }
        }
        if (Array.isArray(list) && isMounted) {
          setMyRecipes(list.map(mapBackendToFrontendRecipe));
        }
      } catch (err) {
        if (isMounted && myRecipes.length === 0) setMyRecipes([]);
      } finally {
        if (isMounted) setMyRecipesLoading(false);
      }
    }

    loadMyRecipes();
    return () => {
      isMounted = false;
    };
  }, [userId, dataVersion]);

  const handleOpenPriceModal = (recipe: Recipe) => {
    setPricingRecipe(recipe);
    setShowPricingModal(true);
  };

  const handleResetPrice = async (recipeId: number | string) => {
    const numericId =
      typeof recipeId === "number"
        ? recipeId
        : parseInt(String(recipeId).replace(/\D/g, ""), 10);

    if (confirm("Đặt lại giá món ăn này về giá ước tính mặc định của hệ thống?")) {
      try {
        if (!isNaN(numericId)) {
          await ingredientApiService.removeMyRecipePrice(numericId);
        }
        priceService.removeMyPrice(userId, String(recipeId));
        setCustomPrices((prev) => prev.filter((p) => p.recipe_id !== numericId));
        setDataVersion((v) => v + 1);
      } catch (err: any) {
        alert(err?.message || "Không thể xóa giá cá nhân");
      }
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

  const handleGenerateWeeklyWithFavorites = (favIds: string[]) => {
    const plan = mealPlannerService.generateWeeklyPlan(profile, 0, {
      planType: "weekly",
      favoriteRecipeIds: favIds,
    });
    storage.setItem(STORAGE_KEYS.GENERATED_PLAN, {
      planType: "weekly",
      weeklyPlan: plan,
      monthlyPlan: null,
      activeDayIndex: 0,
    });
    setShowFavoritesModal(false);
    router.push("/planner");
  };

  const handleGenerateMonthlyWithFavorites = (favIds: string[]) => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const plan = mealPlannerService.generateMonthlyPlan(profile, currentYear, currentMonth, 0, {
      planType: "monthly",
      favoriteRecipeIds: favIds,
    });
    storage.setItem(STORAGE_KEYS.GENERATED_PLAN, {
      planType: "monthly",
      weeklyPlan: null,
      monthlyPlan: plan,
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
            @{profile.handle || (profile.email ? profile.email.split("@")[0] : "member")} · {profile.email ? profile.email : "Thành viên VeggieHub"}
          </p>

          <div className="flex flex-wrap items-center gap-2 mt-3">
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
              BMI: {displayBmi ? `${displayBmi} (${displayBmiCategory || "Bình thường"})` : "Chưa có chỉ số"}
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-amber-50 text-amber-800 font-semibold border border-amber-200">
              Mục tiêu: {displayTargetCalories ? `~${displayTargetCalories} kcal/ngày` : "Chưa thiết lập"}
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-stone-100 text-stone-700 capitalize font-medium">
              Chế độ: {profile.vegetarianType ? formatVegetarianType(profile.vegetarianType) : "Chưa chọn"}
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

      {/* Membership & Subscription Bar (Endpoints 12, 13, 15) */}
      <div className="bg-stone-50 border border-stone-200 rounded-[20px] p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
            <Crown className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-stone-900">
                Gói hội viên: {subscription.planName}
              </span>
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${isPremium ? "bg-amber-100 text-amber-900 border border-amber-200" : "bg-stone-200 text-stone-700"}`}>
                {isPremium ? "Đang kích hoạt" : "Gói miễn phí"}
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              {isPremium ? "Gói tự động gia hạn mỗi tháng. Bạn có thể hủy gia hạn bất kỳ lúc nào." : "Nâng cấp Premium để sử dụng tính năng tạo thực đơn không giới hạn với AI."}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isPremium ? (
            <button
              onClick={() => {
                if (confirm("Bạn có chắc chắn muốn hủy gói thành viên Premium?")) {
                  cancel();
                }
              }}
              className="text-xs text-red-600 hover:text-red-800 hover:bg-red-50 border border-red-200 rounded-xl px-3.5 py-2 font-medium transition-colors cursor-pointer"
            >
              Hủy gói hội viên
            </button>
          ) : (
            <button
              onClick={() => purchase("premium")}
              className="text-xs bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold rounded-xl px-4 py-2 transition-colors cursor-pointer shadow-xs"
            >
              Nâng cấp Premium
            </button>
          )}
        </div>
      </div>

      {/* Cảnh báo dinh dưỡng từ Backend nếu có */}
      {serverNutrition?.warnings && serverNutrition.warnings.length > 0 && (
        <NutritionWarnings warnings={serverNutrition.warnings} />
      )}

      {/* Mục tiêu cân nặng & Giải thích Kcal */}
      <CalorieExplanationSection
        explanation={serverNutrition?.explanation}
        targetGoal={serverNutrition?.target_goal}
        targetCalories={serverNutrition?.target_calories}
      />

      {/* Quick Overview Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          label="Món ăn yêu thích"
          value={String(favoriteRecipes.length)}
          subtext="Lưu trữ riêng của bạn"
          icon={<Heart className="w-4 h-4 text-rose-500 fill-rose-500" />}
        />
        <StatCard
          label="Công thức tự tạo"
          value={String(myRecipes.length)}
          subtext="Món do bạn đóng góp"
          icon={<ChefHat className="w-4 h-4 text-emerald-600" />}
        />
        <StatCard
          label="Giá riêng đã cập nhật"
          value={String(customPrices.length)}
          subtext="Ưu tiên tính vào thực đơn"
          icon={<Tag className="w-4 h-4 text-amber-600" />}
        />
        <StatCard
          label="Mục tiêu calo hàng ngày"
          value={displayTargetCalories ? `~${displayTargetCalories}` : "—"}
          subtext={hasPhysicalMetrics ? "Tính tự động từ BMI" : "Chưa có chỉ số"}
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
          label="Công thức tự tạo của tôi"
          icon={<ChefHat className="w-4 h-4 text-emerald-700" />}
          active={activeTab === "my_recipes"}
          badgeCount={myRecipes.length}
          onClick={() => setActiveTab("my_recipes")}
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
          badgeCount={customPrices.length}
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
                        <Link
                          href={`/recipes/${recipe.id}`}
                          className="relative w-16 h-16 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200 block"
                        >
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
                        </Link>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900">
                              {recipe.mealType}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRemoveFavorite(recipe.id)}
                              className="w-7 h-7 rounded-full flex items-center justify-center bg-rose-50 text-rose-600 border border-rose-200 shadow-2xs hover:bg-rose-100 transition-all cursor-pointer"
                              title="Bỏ yêu thích"
                            >
                              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                            </button>
                          </div>

                          <Link
                            href={`/recipes/${recipe.id}`}
                            className="block hover:text-emerald-700 transition-colors"
                          >
                            <h4 className="font-bold text-stone-900 text-sm truncate mt-1">
                              {recipe.name || recipe.title}
                            </h4>
                          </Link>

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
                          <span className="font-semibold text-stone-700">~{adminEst.toLocaleString("vi-VN")} VNĐ</span>
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
          TAB: MY CREATED RECIPES (CÔNG THỨC DO MEMBER TỰ TẠO)
      ======================================================== */}
      {activeTab === "my_recipes" && (
        <div className="space-y-6 animate-in fade-in">
          <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <ChefHat className="w-5 h-5 text-emerald-700" />
                  <h3 className="font-serif font-bold text-xl text-stone-900">
                    Công thức Món ăn Tự tạo của Tôi
                  </h3>
                </div>
                <p className="text-xs text-stone-500 mt-0.5">
                  Quản lý các công thức do bạn tự tạo và đóng góp. Theo dõi trạng thái kiểm duyệt (Chờ duyệt, Đã duyệt, Bị từ chối).
                </p>
              </div>

              <Link
                href="/recipes/create"
                className="flex items-center gap-2 h-10 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs transition-all shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>+ Đăng công thức mới</span>
              </Link>
            </div>

            {/* Quick Filter Status Badges */}
            {myRecipes.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setRecipeStatusFilter("ALL")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${recipeStatusFilter === "ALL"
                      ? "bg-stone-900 text-white"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                    }`}
                >
                  Tất cả ({myRecipes.length})
                </button>
                <button
                  type="button"
                  onClick={() => setRecipeStatusFilter("APPROVED")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${recipeStatusFilter === "APPROVED"
                      ? "bg-emerald-700 text-white"
                      : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
                    }`}
                >
                  <span>Đã duyệt</span>
                  <span className="font-bold">
                    ({myRecipes.filter((r) => r.status === "APPROVED").length})
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setRecipeStatusFilter("PENDING_REVIEW")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${recipeStatusFilter === "PENDING_REVIEW"
                      ? "bg-amber-600 text-white"
                      : "bg-amber-50 text-amber-800 hover:bg-amber-100"
                    }`}
                >
                  <span>Đang chờ duyệt</span>
                  <span className="font-bold">
                    ({myRecipes.filter((r) => r.status === "PENDING_REVIEW").length})
                  </span>
                </button>
                {myRecipes.some((r) => r.status === "REJECTED") && (
                  <button
                    type="button"
                    onClick={() => setRecipeStatusFilter("REJECTED")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${recipeStatusFilter === "REJECTED"
                        ? "bg-rose-600 text-white"
                        : "bg-rose-50 text-rose-700 hover:bg-rose-100"
                      }`}
                  >
                    <span>Bị từ chối</span>
                    <span className="font-bold">
                      ({myRecipes.filter((r) => r.status === "REJECTED").length})
                    </span>
                  </button>
                )}
              </div>
            )}

            {myRecipesLoading && myRecipes.length === 0 ? (
              <div className="p-12 text-center text-stone-400">
                <p className="text-xs">Đang tải danh sách công thức của bạn...</p>
              </div>
            ) : myRecipes.length === 0 ? (
              <div className="p-12 text-center text-stone-400 bg-stone-50 rounded-2xl border border-dashed border-stone-200 space-y-2">
                <ChefHat className="w-10 h-10 text-stone-300 mx-auto" />
                <p className="font-medium text-stone-700 text-sm">
                  Bạn chưa tự tạo công thức món ăn nào.
                </p>
                <p className="text-xs text-stone-500 max-w-md mx-auto">
                  Hãy gửi công thức món chay của riêng bạn! Sau khi tạo, công thức sẽ được chuyển tới Ban quản trị để duyệt và chia sẻ với toàn bộ cộng đồng.
                </p>
                <div className="pt-2">
                  <Link
                    href="/recipes/create"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 text-white text-xs font-bold rounded-xl hover:bg-emerald-800 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tạo công thức ngay</span>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {myRecipes
                  .filter((recipe) => {
                    if (recipeStatusFilter === "ALL") return true;
                    return recipe.status === recipeStatusFilter;
                  })
                  .map((recipe) => {
                    const isApproved = recipe.status === "APPROVED";
                    const isPending = recipe.status === "PENDING_REVIEW";
                    const isRejected = recipe.status === "REJECTED";

                    return (
                      <div
                        key={recipe.id}
                        className="bg-white border border-stone-200/90 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
                      >
                        <div className="relative aspect-[16/10] w-full bg-stone-100 overflow-hidden">
                          {recipe.image ? (
                            <img
                              src={recipe.image}
                              alt={recipe.title}
                              loading="lazy"
                              decoding="async"
                              onError={(e) => {
                                const target = e.currentTarget;
                                if (!target.dataset.fallback) {
                                  target.dataset.fallback = "1";
                                  target.src =
                                    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80";
                                }
                              }}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-stone-100 text-stone-400">
                              <ChefHat className="w-8 h-8 opacity-40" />
                            </div>
                          )}
                          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                            {isApproved && (
                              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-600 text-white shadow-xs">
                                Đã duyệt
                              </span>
                            )}
                            {isPending && (
                              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500 text-white shadow-xs">
                                Chờ Admin duyệt
                              </span>
                            )}
                            {isRejected && (
                              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-600 text-white shadow-xs">
                                Bị từ chối
                              </span>
                            )}
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-stone-900/60 text-white backdrop-blur-xs">
                              {recipe.mealType}
                            </span>
                          </div>
                        </div>

                        <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                          <div>
                            <h4 className="font-serif font-bold text-stone-900 text-base leading-snug line-clamp-1 group-hover:text-emerald-700 transition-colors">
                              {recipe.name || recipe.title}
                            </h4>
                            <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                              {recipe.description || "Công thức món ăn thanh đạm, dinh dưỡng."}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-stone-500 mt-2">
                              <span className="text-amber-700 font-bold">{recipe.calories} kcal</span>
                              <span>·</span>
                              <span>{recipe.protein}g đạm</span>
                              <span>·</span>
                              <span>{recipe.serving} khẩu phần</span>
                            </div>
                          </div>

                          <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                            <span className="text-xs font-bold text-emerald-800">
                              ~{(recipe.estimatedCost || 0).toLocaleString("vi-VN")} VNĐ
                            </span>
                            {isApproved ? (
                              <Link
                                href={`/recipes/${recipe.id}`}
                                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline"
                              >
                                <span>Xem chi tiết</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </Link>
                            ) : (
                              <span className="text-[11px] font-medium text-stone-400">
                                {isPending ? "Đang chờ duyệt" : "Không hiển thị"}
                              </span>
                            )}
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
          TAB 3: SAVED MEAL PLANS
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
                          {plan.days.length} ngày dinh dưỡng
                        </span>
                        <span>·</span>
                        <span className="text-amber-700 font-bold">
                          Mục tiêu: ~{plan.targetCalories} kcal/ngày
                        </span>
                        <span>·</span>
                        <span className="text-emerald-800 font-bold">
                          Tổng chi phí: ~{plan.totalEstimatedCost.toLocaleString("vi-VN")} VNĐ
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

            {customPricesLoading ? (
              <div className="p-12 text-center text-stone-400">
                <p className="text-xs">Đang tải bảng giá cá nhân của bạn...</p>
              </div>
            ) : customPrices.length === 0 ? (
              <div className="p-12 text-center text-stone-400 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
                <Tag className="w-10 h-10 text-stone-300 mx-auto mb-2" />
                <p className="font-medium text-stone-700 text-sm">
                  Bạn chưa nhập giá riêng cho món ăn nào.
                </p>
                <p className="text-xs text-stone-500 mt-1">
                  Nhấp vào nút &quot;+ Đặt giá món mới&quot; trên các món ăn để lưu giá chợ thực tế của gia đình bạn.
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
                    {customPrices.map((item) => {
                      const recipeName = item.recipe?.title || `Món ăn #${item.recipe_id}`;
                      const mealType = item.recipe?.meal_type || "Món chay";
                      const image = item.recipe?.image_url || "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80";
                      const estimatedCost = Number(item.estimated_cost ?? item.recipe?.estimated_cost ?? 0);
                      const myPrice = Number(item.actual_price ?? 0);
                      const diff = item.diff !== null && item.diff !== undefined ? Number(item.diff) : (myPrice - estimatedCost);

                      const recipeObj: Recipe = {
                        id: String(item.recipe_id),
                        name: recipeName,
                        title: recipeName,
                        mealType: (mealType as any) || "lunch",
                        category: "Món chính",
                        estimatedCost,
                        image,
                        calories: item.recipe?.calories || 350,
                        protein: 15,
                        carbs: 45,
                        fat: 10,
                        prepTime: 15,
                        cookTime: 20,
                        serving: 2,
                        description: item.recipe?.description || "",
                        instructions: [],
                        ingredients: [],
                        vegetarianType: "vegan",
                      };

                      return (
                        <tr key={item.recipe_id} className="hover:bg-stone-50/60 transition-colors">
                          <td className="py-3.5 px-4 font-semibold text-stone-900">
                            <div className="flex items-center gap-2.5">
                              {image ? (
                                <img
                                  src={image}
                                  alt={recipeName}
                                  className="w-8 h-8 rounded-lg object-cover shrink-0"
                                />
                              ) : (
                                <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-400 shrink-0">
                                  <UtensilsCrossed className="w-4 h-4" />
                                </div>
                              )}
                              <span className="truncate max-w-xs">{recipeName}</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-3">
                            <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-stone-100 text-stone-700">
                              {mealType}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-stone-600 font-medium">
                            ~{estimatedCost.toLocaleString("vi-VN")} VNĐ
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-bold text-emerald-800">
                              {myPrice.toLocaleString("vi-VN")} VNĐ
                            </span>
                          </td>
                          <td className="py-3.5 px-3">
                            <span
                              className={`text-xs font-bold px-2 py-0.5 rounded-md ${diff > 0
                                  ? "bg-amber-100 text-amber-900"
                                  : diff < 0
                                    ? "bg-emerald-100 text-emerald-900"
                                    : "bg-stone-100 text-stone-700"
                                }`}
                            >
                              {diff > 0 ? `+${diff.toLocaleString("vi-VN")}` : diff.toLocaleString("vi-VN")} VNĐ
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleOpenPriceModal(recipeObj)}
                                className="px-2.5 py-1.5 rounded-lg bg-stone-100 hover:bg-emerald-50 hover:text-emerald-700 text-stone-700 text-xs font-semibold transition-colors cursor-pointer"
                              >
                                Sửa giá
                              </button>
                              <button
                                type="button"
                                onClick={() => handleResetPrice(item.recipe_id)}
                                className="p-1.5 rounded-lg hover:bg-red-50 text-stone-400 hover:text-red-600 transition-colors cursor-pointer"
                                title="Đặt lại về mặc định"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
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
        MY_POSTS.length === 0 ? (
          <div className="bg-white border border-stone-200 rounded-3xl p-12 text-center text-stone-400">
            <FileText className="w-10 h-10 text-stone-300 mx-auto mb-2" />
            <p className="font-medium text-stone-700 text-sm">Chưa có bài viết nào.</p>
            <p className="text-xs text-stone-500 mt-1">
              Bạn chưa đăng bài viết nào trên Diễn đàn cộng đồng.
            </p>
          </div>
        ) : (
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
        )
      )}

      {/* ========================================================
          TAB 5: MY COMMENTS
      ======================================================== */}
      {activeTab === "comments" && (
        MY_COMMENTS.length === 0 ? (
          <div className="bg-white border border-stone-200 rounded-3xl p-12 text-center text-stone-400">
            <MessageSquare className="w-10 h-10 text-stone-300 mx-auto mb-2" />
            <p className="font-medium text-stone-700 text-sm">Chưa có bình luận nào.</p>
            <p className="text-xs text-stone-500 mt-1">
              Các bình luận của bạn trên các công thức và bài viết sẽ xuất hiện tại đây.
            </p>
          </div>
        ) : (
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
        )
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
        initialFavoriteRecipes={favoriteRecipes}
        onApplyPlan={handleApplyFavoriteDay}
        onLoadSavedPlan={handleLoadSavedPlan}
        onGenerateWeeklyWithFavorites={handleGenerateWeeklyWithFavorites}
        onGenerateMonthlyWithFavorites={handleGenerateMonthlyWithFavorites}
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
                          {existing.toLocaleString("vi-VN")} VNĐ
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
          <Suspense fallback={<GatedSkeleton />}>
            <ProfileContent />
          </Suspense>
        )}
      </div>
    </AppShell>
  );
}
