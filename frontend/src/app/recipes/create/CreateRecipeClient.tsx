"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  ArrowLeft,
  ChefHat,
  Upload,
  Video,
  Loader2,
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
  ShieldCheck,
  Send,
  RotateCcw,
  ChevronDown,
  X,
  Check,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { useAuth } from "@/features/auth/context/AuthContext";
import { recipeApiService, RecipePayload } from "@/features/recipes/services/recipeApiService";
import { ingredientApiService } from "@/features/recipes/services/ingredientApiService";

export interface IngredientRow {
  keyId: string;
  ingredient_id: number;
  name: string;
  quantity: number | "";
  unit: string;
  note: string;
  is_optional: boolean;
  avg_price_per_unit: number;
  calories_per_100g: number;
  protein_per_100g: number;
  carb_per_100g: number;
  fat_per_100g: number;
  fiber_per_100g: number;
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

function normalizeText(text: string): string {
  return (text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .trim();
}

/**
 * Kiểm tra nguyên liệu có phù hợp với chế độ ăn chay đang chọn không:
 * - vegan: không trứng, không sữa bò / bơ / phô mai / kem tươi / sữa đặc / sữa chua.
 * - lacto: cho phép sữa, không trứng.
 * - ovo: cho phép trứng, không sữa.
 * - ovo_lacto: cho phép cả hai.
 */
function isIngredientAllowedForDiet(ing: any, diet: string): boolean {
  const name = (ing.ingredient_name || "").toLowerCase();
  const isEgg = /trứng/i.test(name);
  const isDairy =
    /sữa tươi|sữa đặc|bơ lạt|phô mai|kem tươi|sữa chua|whey/i.test(name) ||
    (Array.isArray(ing.allergens) && ing.allergens.includes("DAIRY"));

  if (diet === "vegan") {
    if (ing.vegan_flag === false) return false;
    if (isEgg || isDairy) return false;
    return true;
  }

  if (diet === "lacto") {
    if (isEgg) return false;
    return true;
  }

  if (diet === "ovo") {
    if (isDairy) return false;
    return true;
  }

  return true;
}

interface CreateRecipeClientProps {
  isAdminMode?: boolean;
}

export function CreateRecipeClient({ isAdminMode: propAdminMode }: CreateRecipeClientProps = {}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, isAdmin, ready } = useAuth();

  const isActuallyAdmin = propAdminMode ?? (pathname.startsWith("/admin") || isAdmin);

  // Master Data from DB
  const [availableIngredients, setAvailableIngredients] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  // Form Fields - Unfilled numeric parts start at 0
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState(SAMPLE_PRESET_IMAGES[0].url);
  const [videoUrl, setVideoUrl] = useState("");
  const [uploadingVideo, setUploadingVideo] = useState(false);

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingVideo(true);
      const res = await recipeApiService.uploadMedia(file);
      const fullUrl = (res as any)?.data?.url || res?.url;
      if (fullUrl) {
        setVideoUrl(fullUrl);
      }
    } catch (err: any) {
      alert("Lỗi khi tải video: " + (err.message || "Không thể tải file lên"));
    } finally {
      setUploadingVideo(false);
    }
  };

  // Ảnh chọn từ máy: tải lên Cloudinary SAU khi tạo món (POST /recipes/:id/image), imageUrl lúc đó chỉ để xem trước.
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageWarning, setImageWarning] = useState("");
  const imageInputRef = useRef<HTMLInputElement>(null);

  const clearImageFile = () => {
    setImageFile(null);
    if (imageUrl.startsWith("blob:")) URL.revokeObjectURL(imageUrl);
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setErrorMsg("Ảnh món chỉ nhận JPG, PNG hoặc WEBP.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg("Ảnh món tối đa 5 MB.");
      return;
    }
    clearImageFile();
    setImageFile(file);
    setImageUrl(URL.createObjectURL(file));
  };

  const pickImageUrl = (url: string) => {
    clearImageFile();
    setImageUrl(url);
  };

  // Gộp trưa/tối thành 1 lựa chọn "any" (Trưa & Tối)
  const [mealType, setMealType] = useState<string>("any");
  const [dietType, setDietType] = useState<string>("vegan");
  const [difficulty, setDifficulty] = useState<string>("easy");
  const [prepTime, setPrepTime] = useState<number | "">(0);
  const [cookTime, setCookTime] = useState<number | "">(0);
  const [servings, setServings] = useState<number | "">(0);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);

  // Category Dropdown State (thay vì show ra 1 đống)
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [categorySearchQuery, setCategorySearchQuery] = useState("");
  const categoryDropdownRef = useRef<HTMLDivElement>(null);

  // Ingredients Form - Starts with 1 empty row, quantity = 0
  const [ingredients, setIngredients] = useState<IngredientRow[]>([
    {
      keyId: "init-1",
      ingredient_id: 0,
      name: "",
      quantity: 0,
      unit: "g",
      note: "",
      is_optional: false,
      avg_price_per_unit: 0,
      calories_per_100g: 0,
      protein_per_100g: 0,
      carb_per_100g: 0,
      fat_per_100g: 0,
      fiber_per_100g: 0,
    },
  ]);

  // Instructions Form - Steps start empty
  const [steps, setSteps] = useState<string[]>([""]);

  // UI States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Khung báo lỗi nằm trên đầu form, còn nút gửi ở cuối trang: có lỗi thì cuộn lên để người dùng thấy
  // (trước đây chỉ lỗi thiếu tên món mới cuộn, các lỗi khác như "0 bước" hay lỗi từ backend bị khuất).
  useEffect(() => {
    if (errorMsg) window.scrollTo({ top: 0, behavior: "smooth" });
  }, [errorMsg]);
  const [successData, setSuccessData] = useState<any | null>(null);

  // Active searching ingredient dropdown
  const [activeSearchIndex, setActiveSearchIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const ingredientDropdownRef = useRef<HTMLDivElement>(null);

  // Load backend master data (ingredients & categories) from Database
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

  // Close dropdowns when clicked outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        ingredientDropdownRef.current &&
        !ingredientDropdownRef.current.contains(e.target as Node)
      ) {
        setActiveSearchIndex(null);
      }
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(e.target as Node)
      ) {
        setCategoryDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filtered ingredients for autocomplete (chỉ gợi ý các nguyên liệu phù hợp với dietType đã chọn)
  const filteredSuggestions = useMemo(() => {
    // Lọc theo chế độ ăn chay trước: thuần chay thì không hiện trứng, sữa
    const allowed = availableIngredients.filter((item) =>
      isIngredientAllowedForDiet(item, dietType)
    );

    if (!searchQuery.trim()) {
      return allowed.slice(0, 15);
    }
    const q = normalizeText(searchQuery);
    return allowed
      .filter((item) => normalizeText(item.ingredient_name || "").includes(q))
      .slice(0, 20);
  }, [availableIngredients, searchQuery, dietType]);

  // Categories filtered for category dropdown search
  const filteredCategories = useMemo(() => {
    if (!categorySearchQuery.trim()) return categories;
    const q = normalizeText(categorySearchQuery);
    return categories.filter((c) =>
      normalizeText(c.category_name || "").includes(q)
    );
  }, [categories, categorySearchQuery]);

  // Live estimated cost
  const estimatedCost = useMemo(() => {
    return ingredients.reduce((sum, item) => {
      if (!item.ingredient_id || !item.quantity) return sum;
      const price = Number(item.avg_price_per_unit || 0);
      const qty = Number(item.quantity || 0);
      const cost = (price / 1000) * qty;
      return sum + Math.round(cost);
    }, 0);
  }, [ingredients]);

  // Dynamic Kcal and nutrition calculated based on input ingredients and grams
  const nutrition = useMemo(() => {
    let calories = 0;
    let protein = 0;
    let carbs = 0;
    let fat = 0;
    let fiber = 0;

    for (const item of ingredients) {
      if (!item.ingredient_id || !item.quantity || item.is_optional) continue;
      const qty = Number(item.quantity) || 0;
      const ratio = qty / 100;

      calories += ratio * (Number(item.calories_per_100g) || 0);
      protein += ratio * (Number(item.protein_per_100g) || 0);
      carbs += ratio * (Number(item.carb_per_100g) || 0);
      fat += ratio * (Number(item.fat_per_100g) || 0);
      fiber += ratio * (Number(item.fiber_per_100g) || 0);
    }

    const numServings = Number(servings) > 0 ? Number(servings) : 1;
    return {
      totalCalories: Math.round(calories),
      caloriesPerServing: Math.round(calories / numServings),
      totalProtein: Math.round(protein * 10) / 10,
      proteinPerServing: Math.round((protein / numServings) * 10) / 10,
      totalCarbs: Math.round(carbs * 10) / 10,
      carbsPerServing: Math.round((carbs / numServings) * 10) / 10,
      totalFat: Math.round(fat * 10) / 10,
      fatPerServing: Math.round((fat / numServings) * 10) / 10,
      totalFiber: Math.round(fiber * 10) / 10,
      fiberPerServing: Math.round((fiber / numServings) * 10) / 10,
    };
  }, [ingredients, servings]);

  // Handle Ingredient Selection from DB suggestions
  const handleSelectIngredient = (index: number, selected: any) => {
    setIngredients((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        ingredient_id: selected.ingredient_id,
        name: selected.ingredient_name,
        unit: "g",
        avg_price_per_unit: Number(selected.avg_price_per_unit || 0),
        calories_per_100g: Number(selected.calories_per_100g || 0),
        protein_per_100g: Number(selected.protein_per_100g || 0),
        carb_per_100g: Number(selected.carb_per_100g || 0),
        fat_per_100g: Number(selected.fat_per_100g || 0),
        fiber_per_100g: Number(selected.fiber_per_100g || 0),
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
        keyId: `row-${Date.now()}-${Math.random()}`,
        ingredient_id: 0,
        name: "",
        quantity: 0,
        unit: "g",
        note: "",
        is_optional: false,
        avg_price_per_unit: 0,
        calories_per_100g: 0,
        protein_per_100g: 0,
        carb_per_100g: 0,
        fat_per_100g: 0,
        fiber_per_100g: 0,
      },
    ]);
  };

  const handleRemoveIngredientRow = (index: number) => {
    if (activeSearchIndex === index) {
      setActiveSearchIndex(null);
      setSearchQuery("");
    }
    if (ingredients.length <= 1) {
      setIngredients([
        {
          keyId: `init-${Date.now()}`,
          ingredient_id: 0,
          name: "",
          quantity: 0,
          unit: "g",
          note: "",
          is_optional: false,
          avg_price_per_unit: 0,
          calories_per_100g: 0,
          protein_per_100g: 0,
          carb_per_100g: 0,
          fat_per_100g: 0,
          fiber_per_100g: 0,
        },
      ]);
      return;
    }
    setIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle Steps
  const handleAddStep = () => {
    setSteps((prev) => [...prev, ""]);
  };

  const handleRemoveStep = (index: number) => {
    if (steps.length <= 1) {
      setSteps([""]);
      return;
    }
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

  // Handle Reset Form to 0 / Empty
  const handleResetForm = () => {
    if (!window.confirm("Bạn có chắc muốn đặt lại toàn bộ form về ban đầu?")) return;
    setTitle("");
    setDescription("");
    setImageUrl(SAMPLE_PRESET_IMAGES[0].url);
    setVideoUrl("");
    setPrepTime(0);
    setCookTime(0);
    setServings(0);
    setSelectedCategoryIds([]);
    setIngredients([
      {
        keyId: `init-${Date.now()}`,
        ingredient_id: 0,
        name: "",
        quantity: 0,
        unit: "g",
        note: "",
        is_optional: false,
        avg_price_per_unit: 0,
        calories_per_100g: 0,
        protein_per_100g: 0,
        carb_per_100g: 0,
        fat_per_100g: 0,
        fiber_per_100g: 0,
      },
    ]);
    setSteps([""]);
    setErrorMsg(null);
  };

  // Handle Submit Form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!title.trim()) {
      setErrorMsg("Vui lòng nhập tên công thức món ăn.");
      return;
    }

    // Kiểm tra tất cả nguyên liệu người dùng nhập
    const nonEmptyRows = ingredients.filter((ing) => ing.name.trim() !== "");
    if (nonEmptyRows.length === 0) {
      setErrorMsg("Vui lòng thêm ít nhất một nguyên liệu từ kho dữ liệu hệ thống.");
      return;
    }

    // Auto-match nếu người dùng gõ tên trùng với DB mà chưa click gợi ý
    for (const ing of nonEmptyRows) {
      if (!ing.ingredient_id || ing.ingredient_id === 0) {
        const found = availableIngredients.find(
          (a) => a.ingredient_name.trim().toLowerCase() === ing.name.trim().toLowerCase()
        );
        if (found) {
          ing.ingredient_id = found.ingredient_id;
          ing.avg_price_per_unit = Number(found.avg_price_per_unit || 0);
          ing.calories_per_100g = Number(found.calories_per_100g || 0);
        }
      }
      if (!ing.ingredient_id || ing.ingredient_id === 0) {
        setErrorMsg(`Nguyên liệu "${ing.name}" không có trong DB. Theo quy tắc hệ thống, bạn chỉ được chọn nguyên liệu có sẵn trong cơ sở dữ liệu.`);
        return;
      }
      if (!ing.quantity || Number(ing.quantity) <= 0) {
        setErrorMsg(`Vui lòng nhập số lượng theo đơn vị gam (g) lớn hơn 0 cho nguyên liệu "${ing.name}".`);
        return;
      }
    }

    const validIngredients = nonEmptyRows;

    // Kiểm tra tính tương thích giữa nguyên liệu đã chọn và chế độ ăn chay
    for (const ing of validIngredients) {
      if (!isIngredientAllowedForDiet(ing, dietType)) {
        setErrorMsg(
          `Nguyên liệu "${ing.name}" không phù hợp với chế độ ăn "${dietType}". Vui lòng đổi chế độ ăn hoặc bỏ nguyên liệu này.`
        );
        return;
      }
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
      // Ảnh từ máy được tải lên riêng sau khi tạo món, không gửi link blob: tạm của trình duyệt.
      image_url: imageFile ? undefined : imageUrl.trim() || undefined,
      video_url: videoUrl.trim() || undefined,
      prep_time: Math.max(0, Number(prepTime) || 0),
      cook_time: Math.max(0, Number(cookTime) || 0),
      servings: Math.max(1, Number(servings) || 1),
      difficulty,
      meal_type: mealType,
      diet_type: dietType,
      estimated_cost: estimatedCost > 0 ? estimatedCost : undefined,
      ingredients: validIngredients.map((ing) => ({
        ingredient_id: ing.ingredient_id,
        quantity: Number(ing.quantity),
        unit: ing.unit || "g",
        note: ing.note.trim() || undefined,
        is_optional: ing.is_optional,
      })),
      category_ids: selectedCategoryIds.length > 0 ? selectedCategoryIds : undefined,
    };

    setIsSubmitting(true);
    try {
      const res = await recipeApiService.createRecipe(payload);
      const data = res?.data || res;
      const newId = data?.recipe_id ?? data?.id;
      if (imageFile && newId) {
        try {
          const uploaded: any = await recipeApiService.uploadRecipeImage(newId, imageFile);
          data.image_url = uploaded?.data?.image_url ?? uploaded?.image_url ?? data.image_url;
        } catch (uploadErr: any) {
          // Món đã tạo xong, chỉ ảnh lỗi: báo để người dùng đổi ảnh sau, không coi cả lần tạo là thất bại.
          setImageWarning(
            `Công thức đã tạo nhưng chưa tải được ảnh: ${uploadErr?.message || "lỗi không xác định"}. Bạn có thể đổi ảnh sau.`,
          );
        }
      }
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

  // Helper label for meal type
  const mealTypeDisplay = useMemo(() => {
    if (mealType === "breakfast") return "Bữa sáng";
    if (mealType === "snack") return "Bữa phụ";
    return "Trưa / Tối";
  }, [mealType]);

  // SUCCESS STATE VIEW
  if (successData) {
    const isApproved = successData.status === "approved" || isActuallyAdmin;
    return (
      <AppShell showRightRail={false}>
        <div className="max-w-2xl mx-auto py-16 px-4">
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-stone-200/80 shadow-md text-center space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                {isApproved ? "Đã duyệt công khai (APPROVED)" : "Đang chờ kiểm duyệt (Pending Review)"}
              </span>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900">
                Công thức &ldquo;{successData.title || title}&rdquo; đã được tạo thành công!
              </h2>
              <p className="text-sm text-stone-600 max-w-lg mx-auto leading-relaxed">
                {isApproved
                  ? "Bạn đã tạo công thức thành công với quyền Quản trị viên. Món ăn đã được tự động duyệt và đồng bộ ngay trên Thư viện công thức & Kế hoạch thực đơn!"
                  : "Cảm ơn bạn đã đóng góp công thức món chay cho VeggieHub! Công thức đang được chuyển tới Ban quản trị để kiểm duyệt trước khi đưa lên Thư viện công thức."}
              </p>
            </div>

            {imageWarning && (
              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-800 text-left flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{imageWarning}</span>
              </div>
            )}

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100 text-xs text-stone-600 space-y-2 text-left max-w-md mx-auto">
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
                  {successData.status || (isApproved ? "APPROVED" : "pending_review")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Năng lượng ước tính:</span>
                <span className="font-bold text-amber-700">
                  {nutrition.totalCalories} kcal ({nutrition.caloriesPerServing} kcal/phần)
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
              {isActuallyAdmin ? (
                <Link
                  href="/admin/recipes"
                  className="px-6 py-2.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-sm"
                >
                  ← Về Quản trị công thức
                </Link>
              ) : null}

              <Link
                href="/recipes"
                className="px-6 py-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-all"
              >
                Xem trên Thư viện công thức
              </Link>

              <button
                type="button"
                onClick={() => {
                  setSuccessData(null);
                  handleResetForm();
                }}
                className="px-6 py-2.5 rounded-full border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-bold transition-all cursor-pointer"
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
    <AppShell showRightRail={false} fullWidth={true}>
      <div className="max-w-[1440px] w-full mx-auto py-6 sm:py-8 px-2 sm:px-4 space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href={isActuallyAdmin ? "/admin/recipes" : "/recipes"}
            className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>
              {isActuallyAdmin ? "Quay lại Quản trị công thức" : "Quay lại Thư viện công thức"}
            </span>
          </Link>

          {/* User / Admin Status Badge */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>
                Đang đăng với tư cách:{" "}
                <strong className="font-bold text-emerald-950">
                  {user?.full_name || user?.email || "Quản trị viên VeggieHub"}
                </strong>{" "}
                ({isActuallyAdmin ? "Quản trị viên" : "Thành viên"})
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs">
              <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
              <span>
                Bạn chưa đăng nhập.{" "}
                <Link
                  href="/login?redirect=/admin/recipes/create"
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
            {isActuallyAdmin ? "QUẢN TRỊ CÔNG THỨC HỆ THỐNG" : "ĐÓNG GÓP CỘNG ĐỒNG"}
          </span>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900">
            Đăng công thức món chay mới
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 max-w-2xl">
            {isActuallyAdmin
              ? "Thêm công thức chuẩn vào hệ thống VeggieHub. Công thức tạo bởi Quản trị viên sẽ được tự động kích hoạt trạng thái ĐÃ DUYỆT (APPROVED) và hiển thị trực tiếp trên Thư viện công thức và Kế hoạch thực đơn."
              : "Chia sẻ những món chay thơm ngon, tốt cho sức khoẻ và môi trường. Công thức sẽ được kiểm duyệt trước khi xuất hiện trên hệ thống VeggieHub."}
          </p>
        </div>

        {/* Notice Banner */}
        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex items-start gap-3 text-xs text-emerald-950">
          <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          <div className="space-y-0.5 leading-relaxed">
            <span className="font-bold text-emerald-900">Quy trình kiểm duyệt công thức:</span>
            <p className="text-stone-600">
              {isActuallyAdmin
                ? "Tài khoản Quản trị viên: Công thức tạo bởi quản trị viên sẽ được tự động kích hoạt trạng thái APPROVED."
                : "Công thức của bạn sẽ được lưu ở trạng thái PENDING_REVIEW để ban quản trị kiểm tra tính an toàn dinh dưỡng và tiêu chuẩn chay. Sau khi được duyệt, món ăn sẽ hiển thị công khai trên toàn hệ thống."}
            </p>
          </div>
        </div>

        {/* Error Alert if any */}
        {errorMsg && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span className="font-medium">{errorMsg}</span>
          </div>
        )}

        {/* 2-Column Form Layout: Inputs on Left, Live Preview on Right */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Main Form Inputs (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* SECTION 1: Basic Information */}
            <div className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <ChefHat className="w-5 h-5 text-emerald-700" />
                  <h3 className="font-serif font-bold text-base text-stone-900">
                    1. Thông tin chung món ăn
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="text-stone-400 hover:text-stone-700 text-xs flex items-center gap-1 font-medium cursor-pointer"
                  title="Đặt lại form"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Làm mới</span>
                </button>
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

              {/* Image URL & Presets & Cloudinary Upload */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-stone-700 flex items-center justify-between">
                    <span>Ảnh món ăn (URL)</span>
                    <span className="text-[11px] font-normal text-stone-400">
                      Chọn nhanh ảnh mẫu bên dưới hoặc nhập link
                    </span>
                  </label>
                  <input
                    type="url"
                    value={imageFile ? "" : imageUrl}
                    disabled={!!imageFile}
                    onChange={(e) => pickImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full px-4 py-2 text-xs rounded-2xl border border-stone-200 bg-stone-50/50 focus:bg-white focus:outline-hidden focus:border-emerald-600 transition-all font-mono text-stone-600"
                  />

                  {/* Tải ảnh từ máy lên Cloudinary */}
                  <div className="flex items-center gap-2">
                    <input
                      ref={imageInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                      onChange={handleImageFileChange}
                    />
                    <button
                      type="button"
                      onClick={() => imageInputRef.current?.click()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border border-emerald-600 text-emerald-700 hover:bg-emerald-50 transition-colors"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      Tải ảnh từ máy
                    </button>
                    {imageFile ? (
                      <span className="flex items-center gap-1.5 text-[11px] text-stone-600 min-w-0">
                        <span className="truncate max-w-[180px]">{imageFile.name}</span>
                        <button
                          type="button"
                          onClick={() => pickImageUrl(SAMPLE_PRESET_IMAGES[0].url)}
                          className="text-stone-400 hover:text-red-600"
                          title="Bỏ ảnh đã chọn"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ) : (
                      <span className="text-[11px] text-stone-400">JPG, PNG, WEBP · tối đa 5 MB</span>
                    )}
                  </div>

                  {/* Preset image thumbnails */}
                  <div className="flex items-center gap-2 overflow-x-auto py-1">
                    {SAMPLE_PRESET_IMAGES.map((preset, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => pickImageUrl(preset.url)}
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

                {/* Video Section */}
                <div className="space-y-2 pt-2 border-t border-stone-100">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-stone-700">
                      Video nấu ăn (tùy chọn)
                    </label>
                    <label className={`text-xs px-3 py-1.5 rounded-xl border border-violet-600 bg-violet-50 text-violet-800 font-bold hover:bg-violet-100 cursor-pointer flex items-center gap-1.5 transition-all ${uploadingVideo ? "opacity-50 pointer-events-none" : ""}`}>
                      {uploadingVideo ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                      <span>{uploadingVideo ? "Đang tải video..." : "Tải video từ máy"}</span>
                      <input
                        type="file"
                        accept="video/mp4,video/webm,video/quicktime"
                        onChange={handleVideoUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      placeholder="Hoặc dán đường link video (mp4, webm...)..."
                      className="flex-1 px-4 py-2 text-xs rounded-2xl border border-stone-200 bg-stone-50/50 focus:bg-white focus:outline-hidden focus:border-emerald-600 transition-all font-mono text-stone-600"
                    />
                    {videoUrl && (
                      <button
                        type="button"
                        onClick={() => setVideoUrl("")}
                        className="text-xs px-3 py-2 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 font-semibold hover:bg-rose-100 cursor-pointer"
                      >
                        Gỡ video
                      </button>
                    )}
                  </div>

                  {videoUrl && (
                    <div className="p-3 bg-stone-900 rounded-2xl overflow-hidden mt-1">
                      <div className="flex items-center gap-1.5 text-white/90 text-xs font-semibold mb-2">
                        <Video className="w-4 h-4 text-emerald-400" />
                        <span>Xem trước video đã tải lên:</span>
                      </div>
                      <video
                        src={videoUrl.startsWith('/') ? `http://localhost:3000${videoUrl}` : videoUrl}
                        controls
                        className="w-full max-h-48 rounded-xl bg-black"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Meal Type (Trưa / Tối gộp thành 1) & Diet Type (Lọc nguyên liệu tương ứng) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                {/* Gộp Trưa/Tối thành 1 buổi */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700">
                    Bữa ăn phù hợp
                  </label>
                  <select
                    value={mealType}
                    onChange={(e) => setMealType(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-2xl border border-stone-200 bg-stone-50/50 focus:bg-white focus:outline-hidden focus:border-emerald-600 font-medium text-stone-800"
                  >
                    <option value="breakfast">Bữa sáng (Breakfast)</option>
                    <option value="any">Bữa trưa / tối (Trưa & Tối)</option>
                    <option value="snack">Bữa phụ / Ăn vặt (Snack)</option>
                  </select>
                </div>

                {/* Chế độ ăn chay (Rule: Lọc bỏ trứng & sữa nếu thuần chay) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 flex items-center justify-between">
                    <span>Chế độ ăn chay</span>
                    <span className="text-[10px] text-emerald-700 font-semibold">
                      {dietType === "vegan" ? "Không trứng & sữa" : dietType === "lacto" ? "Có sữa" : dietType === "ovo" ? "Có trứng" : "Trứng & sữa"}
                    </span>
                  </label>
                  <select
                    value={dietType}
                    onChange={(e) => setDietType(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-2xl border border-stone-200 bg-stone-50/50 focus:bg-white focus:outline-hidden focus:border-emerald-600 font-medium text-stone-800"
                  >
                    <option value="vegan">Thuần chay (Vegan — Không trứng & sữa)</option>
                    <option value="lacto">Chay có sữa (Lacto — Dùng sữa, không trứng)</option>
                    <option value="ovo">Chay có trứng (Ovo — Dùng trứng, không sữa)</option>
                    <option value="ovo_lacto">Chay trứng & sữa (Lacto-Ovo)</option>
                  </select>
                </div>
              </div>

              {/* Time, Servings & Difficulty - Unfilled numeric values default to 0 */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-stone-500 uppercase">
                    Chuẩn bị (phút)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={prepTime === "" ? "" : prepTime}
                    onChange={(e) => {
                      const v = e.target.value;
                      setPrepTime(v === "" ? "" : Math.max(0, Number(v)));
                    }}
                    onBlur={() => {
                      if (prepTime === "") setPrepTime(0);
                    }}
                    placeholder="0"
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
                    value={cookTime === "" ? "" : cookTime}
                    onChange={(e) => {
                      const v = e.target.value;
                      setCookTime(v === "" ? "" : Math.max(0, Number(v)));
                    }}
                    onBlur={() => {
                      if (cookTime === "") setCookTime(0);
                    }}
                    placeholder="0"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-stone-50/50 focus:bg-white focus:border-emerald-600 font-bold text-stone-800 text-center"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-stone-500 uppercase">
                    Khẩu phần (người)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={servings === "" ? "" : servings}
                    onChange={(e) => {
                      const v = e.target.value;
                      setServings(v === "" ? "" : Math.max(0, Number(v)));
                    }}
                    onBlur={() => {
                      if (servings === "") setServings(0);
                    }}
                    placeholder="0"
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

              {/* Danh mục món ăn - Dạng Dropdown gọn gàng thay vì show ra 1 đống */}
              {categories.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-stone-100 relative" ref={categoryDropdownRef}>
                  <label className="text-xs font-bold text-stone-700 flex items-center justify-between">
                    <span>Danh mục món ăn</span>
                    <span className="text-[11px] font-medium text-stone-500">
                      {selectedCategoryIds.length > 0
                        ? `Đã chọn: ${selectedCategoryIds.length} danh mục`
                        : "Chưa chọn danh mục"}
                    </span>
                  </label>

                  {/* Dropdown trigger button */}
                  <div
                    onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-2xl border border-stone-200 bg-stone-50/50 hover:bg-stone-50 focus:border-emerald-600 flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div className="flex-1 truncate pr-2 text-stone-700 font-medium">
                      {selectedCategoryIds.length === 0 ? (
                        <span className="text-stone-400">Nhấn để chọn danh mục món ăn...</span>
                      ) : (
                        <span>
                          {selectedCategoryIds
                            .map((id) => categories.find((c) => c.category_id === id)?.category_name)
                            .filter(Boolean)
                            .join(", ")}
                        </span>
                      )}
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-stone-400 transition-transform ${
                        categoryDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  {/* Dropdown list panel */}
                  {categoryDropdownOpen && (
                    <div className="absolute z-30 left-0 right-0 mt-1 bg-white border border-stone-200 rounded-2xl shadow-xl p-3 space-y-2 animate-in fade-in-50">
                      {/* Search box inside dropdown */}
                      <div className="relative">
                        <input
                          type="text"
                          value={categorySearchQuery}
                          onChange={(e) => setCategorySearchQuery(e.target.value)}
                          placeholder="Tìm danh mục món..."
                          className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-stone-200 bg-stone-50/60 focus:bg-white focus:border-emerald-600 outline-none"
                        />
                        <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>

                      {/* Categories checkable items list */}
                      <div className="max-h-52 overflow-y-auto space-y-1 pr-1">
                        {filteredCategories.length > 0 ? (
                          filteredCategories.map((cat) => {
                            const isSelected = selectedCategoryIds.includes(cat.category_id);
                            const count = Number(cat.recipe_count ?? 0);
                            return (
                              <div
                                key={cat.category_id}
                                onClick={() => handleToggleCategory(cat.category_id)}
                                className={`px-3 py-2 rounded-xl text-xs font-medium cursor-pointer flex items-center justify-between transition-colors ${
                                  isSelected
                                    ? "bg-emerald-50 text-emerald-950 font-semibold"
                                    : "hover:bg-stone-50 text-stone-700"
                                }`}
                              >
                                <div className="flex items-center gap-2.5">
                                  <div
                                    className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${
                                      isSelected
                                        ? "bg-emerald-700 border-emerald-700 text-white"
                                        : "border-stone-300 bg-white"
                                    }`}
                                  >
                                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                                  </div>
                                  <span>{cat.category_name}</span>
                                </div>
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-100 text-stone-500 font-mono">
                                  {count} món
                                </span>
                              </div>
                            );
                          })
                        ) : (
                          <div className="p-3 text-center text-xs text-stone-400">
                            Không tìm thấy danh mục phù hợp
                          </div>
                        )}
                      </div>

                      {/* Quick actions at bottom of dropdown */}
                      <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-[11px]">
                        <button
                          type="button"
                          onClick={() => setSelectedCategoryIds([])}
                          className="text-stone-400 hover:text-stone-700 font-medium cursor-pointer"
                        >
                          Bỏ chọn tất cả
                        </button>
                        <button
                          type="button"
                          onClick={() => setCategoryDropdownOpen(false)}
                          className="px-3 py-1 bg-emerald-700 text-white font-semibold rounded-lg hover:bg-emerald-800 cursor-pointer"
                        >
                          Xong
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Selected Category Tags below dropdown */}
                  {selectedCategoryIds.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {selectedCategoryIds.map((id) => {
                        const cat = categories.find((c) => c.category_id === id);
                        if (!cat) return null;
                        return (
                          <span
                            key={id}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100/70 text-emerald-900 text-[11px] font-semibold border border-emerald-200"
                          >
                            <span>{cat.category_name}</span>
                            <button
                              type="button"
                              onClick={() => handleToggleCategory(id)}
                              className="text-emerald-700 hover:text-rose-600 cursor-pointer"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* SECTION 2: Ingredients & Live Kcal Nutrition (THU GỌN 1 DÒNG) */}
            <div className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <UtensilsCrossed className="w-5 h-5 text-emerald-700" />
                  <h3 className="font-serif font-bold text-base text-stone-900">
                    2. Thành phần nguyên liệu & Dinh dưỡng
                  </h3>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-amber-700 flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                    <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{nutrition.totalCalories} kcal</span>
                  </span>
                  <span className="text-xs text-stone-500 font-medium">
                    {ingredients.filter((i) => i.ingredient_id > 0).length} nguyên liệu
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-stone-500">
                <p>
                  Nguyên liệu hiển thị được tự động lọc theo chế độ ăn <strong>{dietType}</strong> (thuần chay sẽ không có trứng & sữa).
                </p>
              </div>

              {/* Table Header Row (Desktop) */}
              <div className="hidden sm:grid grid-cols-[32px_1fr_96px_48px_96px_80px_36px] gap-2.5 px-3 py-2 text-[11px] font-bold text-stone-400 uppercase tracking-wider border-b border-stone-100 items-center">
                <div className="text-center">STT</div>
                <div>Tên nguyên liệu (Gợi ý DB)</div>
                <div className="text-center">Số lượng</div>
                <div className="text-center">Đơn vị</div>
                <div className="text-center">Năng lượng</div>
                <div className="text-center">Tùy chọn</div>
                <div className="text-center">Xóa</div>
              </div>

              {/* Ingredients List - Gọn gàng trên 1 dòng duy nhất, căn chỉnh đều 100% */}
              <div className="space-y-2" ref={ingredientDropdownRef}>
                {ingredients.map((item, idx) => {
                  const rowKcal = Math.round(
                    ((Number(item.quantity) || 0) / 100) * (Number(item.calories_per_100g) || 0)
                  );
                  const rowCost = Math.round(
                    ((Number(item.quantity) || 0) / 1000) * (Number(item.avg_price_per_unit) || 0)
                  );

                  return (
                    <div
                      key={item.keyId}
                      className="grid grid-cols-[32px_1fr_96px_48px_96px_80px_36px] gap-2.5 p-2 rounded-2xl bg-stone-50/70 border border-stone-200/80 hover:border-emerald-300 transition-colors items-center"
                    >
                      {/* 1. STT */}
                      <div className="w-7 h-7 rounded-lg bg-stone-200/80 text-stone-600 font-bold text-[11px] flex items-center justify-center shrink-0 mx-auto">
                        {idx + 1}
                      </div>

                      {/* 2. Tên nguyên liệu (Autocomplete from DB) */}
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
                              updated[idx] = {
                                ...updated[idx],
                                name: val,
                                ...(val.trim() === ""
                                  ? {
                                      ingredient_id: 0,
                                      avg_price_per_unit: 0,
                                      calories_per_100g: 0,
                                      protein_per_100g: 0,
                                      carb_per_100g: 0,
                                      fat_per_100g: 0,
                                      fiber_per_100g: 0,
                                    }
                                  : {}),
                              };
                              return updated;
                            });
                            setActiveSearchIndex(idx);
                            setSearchQuery(val);
                          }}
                          placeholder="Gõ để tìm nguyên liệu..."
                          className="w-full pl-3 pr-8 py-1.5 text-xs rounded-xl border border-stone-200 bg-white focus:outline-hidden focus:border-emerald-600 font-medium text-stone-800"
                        />
                        <Search className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />

                        {/* Dropdown Suggestions from DB */}
                        {activeSearchIndex === idx && (
                          <div className="absolute z-20 left-0 right-0 mt-1 max-h-56 overflow-y-auto bg-white border border-stone-200 rounded-2xl shadow-xl p-1.5 space-y-1">
                            {filteredSuggestions.length > 0 ? (
                              filteredSuggestions.map((sug) => (
                                <div
                                  key={sug.ingredient_id}
                                  onClick={() => handleSelectIngredient(idx, sug)}
                                  className="px-3 py-1.5 text-xs rounded-xl hover:bg-emerald-50 hover:text-emerald-950 cursor-pointer flex items-center justify-between transition-colors border-b border-stone-50 last:border-0"
                                >
                                  <div>
                                    <span className="font-semibold block text-stone-900">
                                      {sug.ingredient_name}
                                    </span>
                                    <span className="text-[10px] text-amber-700 font-medium">
                                      {sug.calories_per_100g || 0} kcal/100g
                                    </span>
                                  </div>
                                  <div className="text-right">
                                    <span className="text-[11px] font-bold text-emerald-800 block">
                                      {Number(sug.avg_price_per_unit || 0).toLocaleString("vi-VN")} đ/kg
                                    </span>
                                    <span className="text-[10px] text-stone-400">Đơn vị: g</span>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="p-3 text-center text-xs text-stone-400">
                                Không tìm thấy nguyên liệu (hoặc không phù hợp với chế độ {dietType})
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* 3. Khối lượng */}
                      <div>
                        <input
                          type="number"
                          min="0"
                          step="any"
                          value={item.quantity === "" ? "" : item.quantity}
                          onChange={(e) => {
                            const val = e.target.value === "" ? "" : Math.max(0, Number(e.target.value));
                            setIngredients((prev) => {
                              const updated = [...prev];
                              updated[idx] = { ...updated[idx], quantity: val };
                              return updated;
                            });
                          }}
                          onBlur={() => {
                            if (item.quantity === "") {
                              setIngredients((prev) => {
                                const updated = [...prev];
                                updated[idx] = { ...updated[idx], quantity: 0 };
                                return updated;
                              });
                            }
                          }}
                          placeholder="0"
                          className="w-full px-2 py-1.5 text-xs rounded-xl border border-stone-200 bg-white focus:outline-hidden focus:border-emerald-600 font-bold text-stone-800 text-center"
                        />
                      </div>

                      {/* 4. Đơn vị */}
                      <div className="text-center text-xs font-semibold text-stone-500 bg-stone-100/80 py-1.5 rounded-xl border border-stone-200 select-none">
                        g
                      </div>

                      {/* 5. Năng lượng */}
                      <div className="text-center">
                        {item.ingredient_id > 0 ? (
                          <span
                            className="text-[10px] font-bold text-amber-800 bg-amber-100/90 px-2 py-1 rounded-lg inline-flex items-center gap-0.5 whitespace-nowrap"
                            title={`Chi phí ước tính: ~${rowCost.toLocaleString("vi-VN")} đ`}
                          >
                            <Flame className="w-2.5 h-2.5 text-amber-600" />
                            {rowKcal} kcal
                          </span>
                        ) : (
                          <span className="text-[10px] text-stone-400 font-mono">0 kcal</span>
                        )}
                      </div>

                      {/* 6. Tùy chọn */}
                      <div className="flex items-center justify-center gap-1">
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
                          className="rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                          title="Đánh dấu nguyên liệu tùy chọn"
                        />
                        <span className="text-[10px] text-stone-400 select-none hidden sm:inline">Tùy chọn</span>
                      </div>

                      {/* 7. Nút Xóa */}
                      <div className="flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => handleRemoveIngredientRow(idx)}
                          className="text-stone-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                          title={
                            ingredients.length > 1
                              ? "Xóa dòng nguyên liệu này"
                              : "Xóa / Làm sạch nguyên liệu đã chọn"
                          }
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
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

              {/* Dynamic Kcal & Nutrition Breakdown Card */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-amber-600 fill-amber-600" />
                    <span className="text-xs font-bold text-amber-950 uppercase tracking-wider">
                      Dinh dưỡng & Năng lượng tính tự động
                    </span>
                  </div>
                  <span className="text-[11px] font-black text-amber-800 bg-amber-100/90 px-2.5 py-0.5 rounded-full">
                    {nutrition.totalCalories} kcal tổng món
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
                  <div className="p-2.5 rounded-xl bg-white border border-amber-100 shadow-2xs">
                    <span className="text-[10px] text-stone-500 font-medium block">Năng lượng / phần</span>
                    <span className="text-sm font-black text-amber-600">
                      {nutrition.caloriesPerServing} <span className="text-[10px] font-normal text-stone-500">kcal</span>
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white border border-amber-100 shadow-2xs">
                    <span className="text-[10px] text-stone-500 font-medium block">Chất đạm (Protein)</span>
                    <span className="text-sm font-black text-emerald-700">
                      {nutrition.totalProtein} <span className="text-[10px] font-normal text-stone-500">g</span>
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white border border-amber-100 shadow-2xs">
                    <span className="text-[10px] text-stone-500 font-medium block">Tinh bột (Carbs)</span>
                    <span className="text-sm font-black text-blue-700">
                      {nutrition.totalCarbs} <span className="text-[10px] font-normal text-stone-500">g</span>
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white border border-amber-100 shadow-2xs">
                    <span className="text-[10px] text-stone-500 font-medium block">Chất béo (Fat)</span>
                    <span className="text-sm font-black text-rose-700">
                      {nutrition.totalFat} <span className="text-[10px] font-normal text-stone-500">g</span>
                    </span>
                  </div>
                </div>

                <p className="text-[10px] text-stone-500 italic">
                  * Lượng calo (kcal) và các chỉ số dinh dưỡng được tự động tính toán dựa trên khối lượng (g) nguyên liệu bạn chọn từ cơ sở dữ liệu VeggieHub.
                </p>
              </div>
            </div>

            {/* SECTION 3: Instructions - Starts with empty steps */}
            <div className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-amber-500" />
                  <h3 className="font-serif font-bold text-base text-stone-900">
                    3. Hướng dẫn chế biến (Từng bước)
                  </h3>
                </div>
                <span className="text-xs text-stone-500 font-medium">
                  {steps.filter((s) => s.trim().length > 0).length} bước đã nhập
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
                        placeholder={`Mô tả bước ${idx + 1} (để trống nếu chưa nhập)...`}
                        className="w-full px-3.5 py-2 text-xs rounded-2xl border border-stone-200 bg-stone-50/50 focus:bg-white focus:outline-hidden focus:border-emerald-600 transition-all font-medium text-stone-800 resize-none"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveStep(idx)}
                      className="text-stone-400 hover:text-rose-600 p-2 transition-colors mt-0.5 cursor-pointer"
                      title={steps.length > 1 ? "Xóa bước này" : "Xóa / Làm trống bước này"}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
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

          {/* RIGHT COLUMN: Live Preview Card & Action Bar (4 cols) */}
          <div className="lg:col-span-4 space-y-6 sticky top-6">
            {/* Live Recipe Card Preview */}
            <div className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Xem trước hiển thị (Live Preview)
                </span>
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                  {isActuallyAdmin ? "Sẽ duyệt (APPROVED)" : "Chờ duyệt (PENDING)"}
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
                      unoptimized={imageUrl.startsWith("blob:")}
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone-400 text-xs">
                      Chưa có ảnh
                    </div>
                  )}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-700 text-white shadow-xs uppercase">
                      {mealTypeDisplay}
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
                      <span>{Number(servings) || 0} người</span>
                    </div>

                    <div className="flex items-center gap-1 font-bold text-amber-700">
                      <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>{nutrition.caloriesPerServing || 0} kcal</span>
                    </div>

                    <div className="font-bold text-emerald-800">
                      {estimatedCost > 0 ? `${estimatedCost.toLocaleString("vi-VN")} đ` : "0 đ"}
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
                <div className="flex items-center justify-between text-stone-700">
                  <span>Tổng năng lượng món ăn:</span>
                  <span className="font-bold text-amber-800">
                    {nutrition.totalCalories} kcal ({nutrition.caloriesPerServing} kcal/phần)
                  </span>
                </div>
                <div className="flex items-center justify-between text-stone-700">
                  <span>Chỉ số dinh dưỡng:</span>
                  <span className="font-medium text-stone-800">
                    {nutrition.totalProtein}g đạm • {nutrition.totalCarbs}g carbs • {nutrition.totalFat}g béo
                  </span>
                </div>
                <div className="flex items-center justify-between text-emerald-950 font-bold pt-1 border-t border-emerald-200/60 text-sm">
                  <span>Chi phí nguyên liệu ước tính:</span>
                  <span>{estimatedCost.toLocaleString("vi-VN")} đ</span>
                </div>
                <p className="text-[10px] text-stone-400 italic">
                  * Năng lượng (kcal) và chi phí được tính toán tự động dựa trên nguyên liệu và khối lượng bạn chọn từ hệ thống.
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
                      <span>{isActuallyAdmin ? "Tạo & Phê duyệt công thức ngay (Admin)" : "Gửi duyệt công thức (Member)"}</span>
                    </>
                  )}
                </button>

                <p className="text-center text-[11px] text-stone-400">
                  {isActuallyAdmin
                    ? "Công thức tạo bởi Quản trị viên sẽ được tự động kích hoạt trạng thái APPROVED."
                    : "Nhấn gửi đồng nghĩa bạn đồng ý với tiêu chuẩn cộng đồng VeggieHub."}
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </AppShell>
  );
}
