"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ChefHat,
  Plus,
  Trash2,
  Clock,
  Users,
  Flame,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Info,
  DollarSign,
  UtensilsCrossed,
  Search,
  ExternalLink,
  ShieldCheck,
  Send,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { useAuth } from "@/features/auth/context/AuthContext";
import { recipeApiService, RecipePayload } from "@/features/recipes/services/recipeApiService";
import { ingredientApiService } from "@/features/recipes/services/ingredientApiService";

interface IngredientRow {
  keyId: string;
  ingredient_id: number;
  name: string;
  quantity: number | "";
  unit: string;
  note: string;
  is_optional: boolean;
  avg_price_per_unit: number;
}

const SAMPLE_PRESET_IMAGES = [
  {
    name: "Bún nấm thanh đạm",
    url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
  },
  {
    name: "Salad rau củ sốt mè",
    url: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
  },
  {
    name: "Cơm xào nấm đậu hũ",
    url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
  },
  {
    name: "Canh củ quả hầm sen",
    url: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80",
  },
  {
    name: "Phở cuốn rau thơm",
    url: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&auto=format&fit=crop&q=80",
  },
];

export function CreateRecipeClient() {
  const router = useRouter();
  const { user, isAuthenticated, isAdmin, ready } = useAuth();

  // Master Data
  const [availableIngredients, setAvailableIngredients] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  // Form Fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState(SAMPLE_PRESET_IMAGES[0].url);
  const [mealType, setMealType] = useState<string>("lunch");
  const [dietType, setDietType] = useState<string>("vegan");
  const [difficulty, setDifficulty] = useState<string>("easy");
  const [prepTime, setPrepTime] = useState<number | "">(15);
  const [cookTime, setCookTime] = useState<number | "">(20);
  const [servings, setServings] = useState<number | "">(2);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);

  // Ingredients Form
  const [ingredients, setIngredients] = useState<IngredientRow[]>([
    {
      keyId: "init-1",
      ingredient_id: 0,
      name: "",
      quantity: 200,
      unit: "g",
      note: "",
      is_optional: false,
      avg_price_per_unit: 0,
    },
  ]);

  // Instructions Form
  const [steps, setSteps] = useState<string[]>([
    "Sơ chế và rửa sạch các nguyên liệu tươi.",
    "Bắc chảo/nồi lên bếp, cho một chút dầu và xào thơm.",
    "Nêm nếm gia vị vừa miệng và thưởng thức khi còn nóng.",
  ]);

  // UI States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<any | null>(null);

  // Active searching ingredient dropdown
  const [activeSearchIndex, setActiveSearchIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load backend master data (ingredients & categories)
  useEffect(() => {
    let isMounted = true;
    async function loadMasterData() {
      try {
        const [ingRes, catRes] = await Promise.allSettled([
          ingredientApiService.getIngredients(),
          recipeApiService.getCategories(),
        ]);

        if (ingRes.status === "fulfilled") {
          const list = Array.isArray(ingRes.value)
            ? ingRes.value
            : (ingRes.value as any)?.data || [];
          if (isMounted) setAvailableIngredients(list);
        }

        if (catRes.status === "fulfilled") {
          const list = Array.isArray(catRes.value)
            ? catRes.value
            : (catRes.value as any)?.data || [];
          if (isMounted) setCategories(list);
        }
      } catch (err) {
        console.error("Error loading master data for recipe creation:", err);
      } finally {
        if (isMounted) setDataLoading(false);
      }
    }
    loadMasterData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Close dropdown when clicked outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveSearchIndex(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filtered ingredients for autocomplete
  const filteredSuggestions = useMemo(() => {
    if (!searchQuery.trim()) return availableIngredients.slice(0, 10);
    const q = searchQuery.toLowerCase();
    return availableIngredients
      .filter((item) => (item.ingredient_name || "").toLowerCase().includes(q))
      .slice(0, 15);
  }, [availableIngredients, searchQuery]);

  // Calculate live cost
  const estimatedCost = useMemo(() => {
    return ingredients.reduce((sum, item) => {
      if (!item.ingredient_id || !item.quantity) return sum;
      const price = Number(item.avg_price_per_unit || 0);
      const qty = Number(item.quantity || 0);
      let cost = 0;
      if (item.unit === "g") {
        cost = (price / 1000) * qty;
      } else {
        cost = price * qty;
      }
      return sum + Math.round(cost);
    }, 0);
  }, [ingredients]);

  // Handle Ingredient Selection
  const handleSelectIngredient = (index: number, selected: any) => {
    setIngredients((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        ingredient_id: selected.ingredient_id,
        name: selected.ingredient_name,
        unit: selected.unit || "g",
        avg_price_per_unit: Number(selected.avg_price_per_unit || 0),
      };
      return updated;
    });
    setActiveSearchIndex(null);
    setSearchQuery("");
  };

  const handleAddIngredientRow = () => {
    setIngredients((prev) => [
      ...prev,
      {
        keyId: `row-${Date.now()}`,
        ingredient_id: 0,
        name: "",
        quantity: 100,
        unit: "g",
        note: "",
        is_optional: false,
        avg_price_per_unit: 0,
      },
    ]);
  };

  const handleRemoveIngredientRow = (index: number) => {
    if (ingredients.length <= 1) return;
    setIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle Steps
  const handleAddStep = () => {
    setSteps((prev) => [...prev, ""]);
  };

  const handleRemoveStep = (index: number) => {
    if (steps.length <= 1) return;
    setSteps((prev) => prev.filter((_, i) => i !== index));
  };

  const handleStepChange = (index: number, val: string) => {
    setSteps((prev) => {
      const updated = [...prev];
      updated[index] = val;
      return updated;
    });
  };

  // Handle Category Toggle
  const handleToggleCategory = (catId: number) => {
    setSelectedCategoryIds((prev) =>
      prev.includes(catId) ? prev.filter((id) => id !== catId) : [...prev, catId]
    );
  };

  // Handle Submit Form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!title.trim()) {
      setErrorMsg("Vui lòng nhập tên công thức món ăn.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const validIngredients = ingredients.filter(
      (ing) => ing.ingredient_id > 0 && Number(ing.quantity) > 0
    );

    if (validIngredients.length === 0) {
      setErrorMsg("Vui lòng thêm ít nhất một nguyên liệu hợp lệ từ danh sách hệ thống.");
      return;
    }

    const validSteps = steps.map((s) => s.trim()).filter((s) => s.length > 0);
    if (validSteps.length === 0) {
      setErrorMsg("Vui lòng nhập ít nhất một bước hướng dẫn chế biến.");
      return;
    }

    const instructionsText = validSteps
      .map((step, idx) => `${idx + 1}. ${step}`)
      .join("\n");

    const payload: RecipePayload = {
      title: title.trim(),
      description: description.trim() || undefined,
      instructions: instructionsText,
      image_url: imageUrl.trim() || undefined,
      prep_time: typeof prepTime === "number" ? prepTime : 15,
      cook_time: typeof cookTime === "number" ? cookTime : 20,
      servings: typeof servings === "number" ? servings : 2,
      difficulty,
      meal_type: mealType,
      diet_type: dietType,
      estimated_cost: estimatedCost > 0 ? estimatedCost : undefined,
      ingredients: validIngredients.map((ing) => ({
        ingredient_id: ing.ingredient_id,
        quantity: Number(ing.quantity),
        unit: ing.unit,
        note: ing.note.trim() || undefined,
        is_optional: ing.is_optional,
      })),
      category_ids: selectedCategoryIds.length > 0 ? selectedCategoryIds : undefined,
    };

    setIsSubmitting(true);
    try {
      const res = await recipeApiService.createRecipe(payload);
      const data = res?.data || res;
      setSuccessData(data);
    } catch (err: any) {
      const msg =
        err?.message ||
        err?.response?.data?.message ||
        "Có lỗi xảy ra khi tạo công thức. Vui lòng kiểm tra lại thông tin.";
      setErrorMsg(typeof msg === "string" ? msg : JSON.stringify(msg));
    } finally {
      setIsSubmitting(false);
    }
  };

  // SUCCESS STATE MODAL
  if (successData) {
    const isApproved = successData.status === "approved";
    return (
      <AppShell showRightRail={false}>
        <div className="max-w-2xl mx-auto py-16 px-4">
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-stone-200/80 shadow-md text-center space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                {isApproved ? "Đã duyệt công khai" : "Đang chờ kiểm duyệt (Pending Review)"}
              </span>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900">
                🎉 Công thức &ldquo;{successData.title || title}&rdquo; đã được tạo thành công!
              </h2>
              <p className="text-sm text-stone-600 max-w-lg mx-auto leading-relaxed">
                {isApproved
                  ? "Bạn đã tạo công thức thành công với quyền Quản trị viên. Công thức đã xuất hiện công khai trên thư viện!"
                  : "Cảm ơn bạn đã đóng góp công thức món chay cho VeggieHub! Công thức đang được chuyển tới Ban quản trị để kiểm duyệt trước khi đưa lên Thư viện công thức."}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100 text-xs text-stone-600 space-y-1.5 text-left max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="text-stone-400">Mã công thức:</span>
                <span className="font-mono font-bold text-stone-800">
                  #{successData.recipe_id || successData.id || "Mới tạo"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Trạng thái:</span>
                <span
                  className={`font-semibold uppercase tracking-wider ${
                    isApproved ? "text-emerald-700" : "text-amber-700"
                  }`}
                >
                  {successData.status || "pending_review"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Số nguyên liệu:</span>
                <span className="font-semibold text-stone-800">
                  {ingredients.filter((i) => i.ingredient_id > 0).length} thành phần
                </span>
              </div>
              {estimatedCost > 0 && (
                <div className="flex justify-between">
                  <span className="text-stone-400">Ước tính chi phí:</span>
                  <span className="font-bold text-emerald-800">
                    {estimatedCost.toLocaleString("vi-VN")} đ
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/recipes"
                className="px-6 py-2.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-sm"
              >
                Về thư viện công thức
              </Link>
              <button
                onClick={() => {
                  setSuccessData(null);
                  setTitle("");
                  setDescription("");
                  setSteps(["", "", ""]);
                  setIngredients([
                    {
                      keyId: `new-${Date.now()}`,
                      ingredient_id: 0,
                      name: "",
                      quantity: 100,
                      unit: "g",
                      note: "",
                      is_optional: false,
                      avg_price_per_unit: 0,
                    },
                  ]);
                }}
                className="px-6 py-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition-all"
              >
                Tạo thêm công thức khác
              </button>
            </div>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell showRightRail={false}>
      <div className="max-w-6xl mx-auto py-6 sm:py-8 px-4 sm:px-6 space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/recipes"
            className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại Thư viện công thức</span>
          </Link>

          {/* User Status Badge */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>
                Đang đăng với tư cách:{" "}
                <strong className="font-bold text-emerald-950">
                  {user?.full_name || user?.email || "Member"}
                </strong>{" "}
                ({isAdmin ? "Quản trị viên" : "Thành viên"})
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs">
              <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
              <span>
                Bạn chưa đăng nhập.{" "}
                <Link
                  href="/login?redirect=/recipes/create"
                  className="font-bold underline text-amber-950 hover:text-emerald-700"
                >
                  Đăng nhập ngay
                </Link>
              </span>
            </div>
          )}
        </div>

        {/* Page Title & Intro */}
        <div className="space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
            ĐÓNG GÓP CỘNG ĐỒNG
          </span>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900">
            Đăng công thức món chay mới
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 max-w-2xl">
            Chia sẻ những món chay thơm ngon, tốt cho sức khoẻ và môi trường. Công thức sẽ được
            kiểm duyệt trước khi xuất hiện trên hệ thống VeggieHub.
          </p>
        </div>

        {/* Notice Banner */}
        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex items-start gap-3 text-xs text-emerald-950">
          <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          <div className="space-y-0.5 leading-relaxed">
            <span className="font-bold text-emerald-900">Quy trình kiểm duyệt công thức:</span>
            <p className="text-stone-600">
              {isAdmin
                ? "👑 Tài khoản Admin: Công thức tạo bởi quản trị viên sẽ được tự động kích hoạt trạng thái APPROVED."
                : "💡 Công thức của bạn sẽ được lưu ở trạng thái PENDING_REVIEW để ban quản trị kiểm tra tính an toàn dinh dưỡng và tiêu chuẩn chay. Sau khi được duyệt, món ăn sẽ hiển thị công khai trên toàn hệ thống."}
            </p>
          </div>
        </div>

        {/* Error Alert if any */}
        {errorMsg && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2.5 animate-shake">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span className="font-medium">{errorMsg}</span>
          </div>
        )}

        {/* 2-Column Form Layout: Inputs on Left, Live Preview on Right */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Main Form Inputs (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* SECTION 1: Basic Information */}
            <div className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
                <ChefHat className="w-5 h-5 text-emerald-700" />
                <h3 className="font-serif font-bold text-base text-stone-900">
                  1. Thông tin chung món ăn
                </h3>
              </div>

              {/* Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700">
                  Tên công thức món ăn <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ví dụ: Bún nấm chay chua cay, Đậu hũ sốt cà chua nấm..."
                  className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-2xl border border-stone-200 bg-stone-50/50 focus:bg-white focus:outline-hidden focus:border-emerald-600 transition-all font-medium text-stone-800"
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700">
                  Giới thiệu & Mẹo từ đầu bếp
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Chia sẻ lý do bạn thích món này, hương vị đặc trưng, hoặc mẹo nhỏ khi nấu..."
                  rows={3}
                  className="w-full px-4 py-2.5 text-xs rounded-2xl border border-stone-200 bg-stone-50/50 focus:bg-white focus:outline-hidden focus:border-emerald-600 transition-all font-medium text-stone-800 resize-none"
                />
              </div>

              {/* Image URL & Presets */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-700 flex items-center justify-between">
                  <span>Ảnh món ăn (URL)</span>
                  <span className="text-[11px] font-normal text-stone-400">
                    Chọn nhanh ảnh mẫu bên dưới hoặc nhập link
                  </span>
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full px-4 py-2 text-xs rounded-2xl border border-stone-200 bg-stone-50/50 focus:bg-white focus:outline-hidden focus:border-emerald-600 transition-all font-mono text-stone-600"
                />

                {/* Preset image thumbnails */}
                <div className="flex items-center gap-2 overflow-x-auto py-1">
                  {SAMPLE_PRESET_IMAGES.map((preset, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setImageUrl(preset.url)}
                      className={`relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                        imageUrl === preset.url
                          ? "border-emerald-600 ring-2 ring-emerald-600/30"
                          : "border-stone-200 hover:border-emerald-400 opacity-70 hover:opacity-100"
                      }`}
                      title={preset.name}
                    >
                      <Image
                        src={preset.url}
                        alt={preset.name}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Meal Type & Diet Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700">Bữa ăn phù hợp</label>
                  <select
                    value={mealType}
                    onChange={(e) => setMealType(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-2xl border border-stone-200 bg-stone-50/50 focus:bg-white focus:outline-hidden focus:border-emerald-600 font-medium text-stone-800"
                  >
                    <option value="breakfast">Bữa sáng (Breakfast)</option>
                    <option value="lunch">Bữa trưa (Lunch)</option>
                    <option value="dinner">Bữa tối (Dinner)</option>
                    <option value="snack">Bữa phụ / Ăn vặt (Snack)</option>
                    <option value="any">Bữa trưa & Tối (Món chính linh hoạt)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700">Chế độ ăn chay</label>
                  <select
                    value={dietType}
                    onChange={(e) => setDietType(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-2xl border border-stone-200 bg-stone-50/50 focus:bg-white focus:outline-hidden focus:border-emerald-600 font-medium text-stone-800"
                  >
                    <option value="vegan">Thuần chay (Vegan)</option>
                    <option value="lacto">Chay có sữa (Lacto)</option>
                    <option value="ovo">Chay có trứng (Ovo)</option>
                    <option value="ovo_lacto">Chay có trứng & sữa (Lacto-Ovo)</option>
                  </select>
                </div>
              </div>

              {/* Time, Servings & Difficulty */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-stone-500 uppercase">
                    Chuẩn bị (phút)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={prepTime}
                    onChange={(e) => setPrepTime(e.target.value ? Number(e.target.value) : "")}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-stone-50/50 focus:bg-white focus:border-emerald-600 font-bold text-stone-800 text-center"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-stone-500 uppercase">
                    Nấu chín (phút)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={cookTime}
                    onChange={(e) => setCookTime(e.target.value ? Number(e.target.value) : "")}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-stone-50/50 focus:bg-white focus:border-emerald-600 font-bold text-stone-800 text-center"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-stone-500 uppercase">
                    Khẩu phần (người)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={servings}
                    onChange={(e) => setServings(e.target.value ? Number(e.target.value) : "")}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-stone-50/50 focus:bg-white focus:border-emerald-600 font-bold text-stone-800 text-center"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-stone-500 uppercase">
                    Độ khó
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="w-full px-2 py-2 text-xs rounded-xl border border-stone-200 bg-stone-50/50 focus:bg-white focus:border-emerald-600 font-bold text-stone-800 text-center"
                  >
                    <option value="easy">Dễ</option>
                    <option value="medium">Vừa</option>
                    <option value="hard">Khó</option>
                  </select>
                </div>
              </div>

              {/* Categories */}
              {categories.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-stone-100">
                  <label className="text-xs font-bold text-stone-700 block">
                    Danh mục món ăn
                  </label>
                  <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1">
                    {categories.map((cat) => {
                      const isSelected = selectedCategoryIds.includes(cat.category_id);
                      return (
                        <button
                          type="button"
                          key={cat.category_id}
                          onClick={() => handleToggleCategory(cat.category_id)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer border ${
                            isSelected
                              ? "bg-emerald-700 text-white border-emerald-700 font-semibold"
                              : "bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100"
                          }`}
                        >
                          {cat.category_name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* SECTION 2: Ingredients */}
            <div className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <UtensilsCrossed className="w-5 h-5 text-emerald-700" />
                  <h3 className="font-serif font-bold text-base text-stone-900">
                    2. Thành phần nguyên liệu
                  </h3>
                </div>
                <span className="text-xs text-stone-500 font-medium">
                  {ingredients.filter((i) => i.ingredient_id > 0).length} nguyên liệu đã chọn
                </span>
              </div>

              <p className="text-xs text-stone-500">
                Gõ tên để tìm và chọn nguyên liệu chuẩn từ kho nguyên liệu VeggieHub. Hệ thống sẽ tự
                động liên kết giá thị trường để tính chi phí ước tính.
              </p>

              {/* Ingredients List */}
              <div className="space-y-3">
                {ingredients.map((item, idx) => (
                  <div
                    key={item.keyId}
                    className="p-3.5 rounded-2xl bg-stone-50/70 border border-stone-200/80 space-y-2 relative"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                        Nguyên liệu #{idx + 1}
                      </span>
                      {ingredients.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveIngredientRow(idx)}
                          className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                          title="Xóa nguyên liệu"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-12 gap-2.5 items-start">
                      {/* Ingredient search / name (6 cols) */}
                      <div className="col-span-12 sm:col-span-6 relative">
                        <div className="relative">
                          <input
                            type="text"
                            value={item.name}
                            onFocus={() => {
                              setActiveSearchIndex(idx);
                              setSearchQuery(item.name);
                            }}
                            onChange={(e) => {
                              const val = e.target.value;
                              setIngredients((prev) => {
                                const updated = [...prev];
                                updated[idx] = { ...updated[idx], name: val };
                                return updated;
                              });
                              setActiveSearchIndex(idx);
                              setSearchQuery(val);
                            }}
                            placeholder="Gõ để tìm (ví dụ: Đậu hũ, Bún tươi, Cà rốt)..."
                            className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-white focus:outline-hidden focus:border-emerald-600 font-medium text-stone-800"
                          />
                          <Search className="w-3.5 h-3.5 text-stone-400 absolute right-3 top-2.5 pointer-events-none" />
                        </div>

                        {/* Dropdown Suggestions */}
                        {activeSearchIndex === idx && (
                          <div
                            ref={dropdownRef}
                            className="absolute z-20 left-0 right-0 mt-1 max-h-48 overflow-y-auto bg-white border border-stone-200 rounded-2xl shadow-lg p-1.5 space-y-1"
                          >
                            {filteredSuggestions.length > 0 ? (
                              filteredSuggestions.map((sug) => (
                                <div
                                  key={sug.ingredient_id}
                                  onClick={() => handleSelectIngredient(idx, sug)}
                                  className="px-3 py-1.5 text-xs rounded-xl hover:bg-emerald-50 hover:text-emerald-900 cursor-pointer flex items-center justify-between transition-colors"
                                >
                                  <span className="font-semibold">{sug.ingredient_name}</span>
                                  <span className="text-[10px] text-stone-400 font-mono">
                                    {sug.unit} •{" "}
                                    {Number(sug.avg_price_per_unit || 0).toLocaleString("vi-VN")} VNĐ/
                                    {sug.unit}
                                  </span>
                                </div>
                              ))
                            ) : (
                              <div className="p-3 text-center text-xs text-stone-400">
                                Không tìm thấy nguyên liệu phù hợp
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Quantity (3 cols) */}
                      <div className="col-span-6 sm:col-span-3">
                        <input
                          type="number"
                          min="0.1"
                          step="any"
                          value={item.quantity}
                          onChange={(e) => {
                            const val = e.target.value ? Number(e.target.value) : "";
                            setIngredients((prev) => {
                              const updated = [...prev];
                              updated[idx] = { ...updated[idx], quantity: val };
                              return updated;
                            });
                          }}
                          placeholder="Số lượng"
                          className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-white focus:outline-hidden focus:border-emerald-600 font-semibold text-stone-800 text-center"
                        />
                      </div>

                      {/* Unit (3 cols) */}
                      <div className="col-span-6 sm:col-span-3">
                        <input
                          type="text"
                          value={item.unit}
                          onChange={(e) => {
                            const val = e.target.value;
                            setIngredients((prev) => {
                              const updated = [...prev];
                              updated[idx] = { ...updated[idx], unit: val };
                              return updated;
                            });
                          }}
                          placeholder="Đơn vị (g, kg, quả...)"
                          className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-white focus:outline-hidden focus:border-emerald-600 font-medium text-stone-800 text-center"
                        />
                      </div>

                      {/* Note / preparation (9 cols) */}
                      <div className="col-span-9 sm:col-span-9">
                        <input
                          type="text"
                          value={item.note}
                          onChange={(e) => {
                            const val = e.target.value;
                            setIngredients((prev) => {
                              const updated = [...prev];
                              updated[idx] = { ...updated[idx], note: val };
                              return updated;
                            });
                          }}
                          placeholder="Ghi chú (tùy chọn: thái lát, băm nhỏ, chiên vàng...)"
                          className="w-full px-3 py-1.5 text-[11px] rounded-xl border border-stone-200/80 bg-white/70 focus:outline-hidden focus:border-emerald-600 text-stone-600"
                        />
                      </div>

                      {/* Is Optional checkbox (3 cols) */}
                      <div className="col-span-3 sm:col-span-3 flex items-center justify-end gap-1.5 pt-1">
                        <label className="text-[11px] text-stone-500 cursor-pointer select-none">
                          Tùy chọn
                        </label>
                        <input
                          type="checkbox"
                          checked={item.is_optional}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setIngredients((prev) => {
                              const updated = [...prev];
                              updated[idx] = { ...updated[idx], is_optional: checked };
                              return updated;
                            });
                          }}
                          className="rounded text-emerald-600 focus:ring-emerald-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add ingredient button */}
              <button
                type="button"
                onClick={handleAddIngredientRow}
                className="w-full py-2.5 rounded-2xl border-2 border-dashed border-stone-200 hover:border-emerald-400 text-emerald-700 text-xs font-bold transition-all flex items-center justify-center gap-2 hover:bg-emerald-50/50 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Thêm dòng nguyên liệu</span>
              </button>
            </div>

            {/* SECTION 3: Instructions */}
            <div className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-amber-500" />
                  <h3 className="font-serif font-bold text-base text-stone-900">
                    3. Hướng dẫn chế biến (Từng bước)
                  </h3>
                </div>
                <span className="text-xs text-stone-500 font-medium">
                  {steps.filter((s) => s.trim().length > 0).length} bước
                </span>
              </div>

              <div className="space-y-3">
                {steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 mt-1 shadow-2xs">
                      {idx + 1}
                    </div>
                    <div className="flex-1 relative">
                      <textarea
                        rows={2}
                        value={step}
                        onChange={(e) => handleStepChange(idx, e.target.value)}
                        placeholder={`Mô tả bước ${idx + 1}...`}
                        className="w-full px-3.5 py-2 text-xs rounded-2xl border border-stone-200 bg-stone-50/50 focus:bg-white focus:outline-hidden focus:border-emerald-600 transition-all font-medium text-stone-800 resize-none"
                      />
                    </div>
                    {steps.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveStep(idx)}
                        className="text-stone-400 hover:text-rose-600 p-2 transition-colors mt-0.5"
                        title="Xóa bước này"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleAddStep}
                className="w-full py-2.5 rounded-2xl border-2 border-dashed border-stone-200 hover:border-emerald-400 text-emerald-700 text-xs font-bold transition-all flex items-center justify-center gap-2 hover:bg-emerald-50/50 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Thêm bước thực hiện</span>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Live Preview Card & Action Bar (5 cols) */}
          <div className="lg:col-span-5 space-y-6 sticky top-6">
            {/* Live Recipe Card Preview */}
            <div className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Xem trước hiển thị (Live Preview)
                </span>
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 font-bold border border-amber-200">
                  {isAdmin ? "Sẽ duyệt (APPROVED)" : "Chờ duyệt (PENDING)"}
                </span>
              </div>

              {/* Card visual */}
              <div className="rounded-2xl overflow-hidden border border-stone-100 bg-stone-50 space-y-3 pb-3">
                <div className="relative aspect-[16/10] w-full bg-stone-200">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={title || "Công thức món"}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone-400 text-xs">
                      Chưa có ảnh
                    </div>
                  )}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-700 text-white shadow-xs">
                      {mealType}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-stone-800 border border-white/50">
                      {dietType}
                    </span>
                  </div>
                </div>

                <div className="px-4 space-y-1.5">
                  <h4 className="font-serif font-bold text-base text-stone-900 leading-snug line-clamp-1">
                    {title || "Tên món ăn của bạn sẽ hiển thị ở đây"}
                  </h4>
                  <p className="text-xs text-stone-500 line-clamp-2">
                    {description || "Giới thiệu ngắn gọn về hương vị và cách thưởng thức món chay này."}
                  </p>

                  <div className="flex items-center justify-between text-xs text-stone-600 pt-2 border-t border-stone-200/60">
                    <div className="flex items-center gap-1 text-stone-500">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{(Number(prepTime) || 0) + (Number(cookTime) || 0)} phút</span>
                    </div>

                    <div className="flex items-center gap-1 text-stone-500">
                      <Users className="w-3.5 h-3.5 text-violet-600" />
                      <span>{servings || 1} người</span>
                    </div>

                    <div className="font-bold text-emerald-800">
                      {estimatedCost > 0 ? `${estimatedCost.toLocaleString("vi-VN")} đ` : "Ước tính giá"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Cost & Summary Breakdown */}
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-2 text-xs">
                <div className="flex items-center justify-between text-stone-700">
                  <span>Số nguyên liệu đã chọn:</span>
                  <span className="font-bold">
                    {ingredients.filter((i) => i.ingredient_id > 0).length} thành phần
                  </span>
                </div>
                <div className="flex items-center justify-between text-stone-700">
                  <span>Số bước chế biến:</span>
                  <span className="font-bold">
                    {steps.filter((s) => s.trim().length > 0).length} bước
                  </span>
                </div>
                <div className="flex items-center justify-between text-emerald-950 font-bold pt-1 border-t border-emerald-200/60 text-sm">
                  <span>Chi phí nguyên liệu ước tính:</span>
                  <span>{estimatedCost.toLocaleString("vi-VN")} đ</span>
                </div>
                <p className="text-[10px] text-stone-400 italic">
                  * Hệ thống sẽ tự động tính toán dinh dưỡng chi tiết (Calories, Protein, Carbs, Fat,
                  Fiber) ngay khi lưu công thức vào máy chủ.
                </p>
              </div>

              {/* Submit Button */}
              <div className="space-y-2 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-2xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>{isAdmin ? "Tạo & Duyệt công thức (Admin)" : "Gửi duyệt công thức (Member)"}</span>
                    </>
                  )}
                </button>

                <p className="text-center text-[11px] text-stone-400">
                  Nhấn gửi đồng nghĩa bạn đồng ý với tiêu chuẩn cộng đồng VeggieHub.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </AppShell>
  );
}
