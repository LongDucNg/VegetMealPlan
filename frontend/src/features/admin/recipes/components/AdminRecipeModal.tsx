"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Upload,
  Video,
  Loader2,
  X,
  Plus,
  Trash2,
  Check,
  Tag,
  Info,
  ChefHat,
  Clock,
  Flame,
  DollarSign,
  Search,
  Sparkles,
  UtensilsCrossed,
  Layers,
  HelpCircle,
} from "lucide-react";
import { Recipe, IngredientItem, MealType, RecipeStatus } from "@/features/recipes/types";
import { VegetarianType } from "@/features/profile/types";
import { priceService } from "@/features/recipes/services/priceService";
import { ingredientApiService, BackendIngredient } from "@/features/recipes/services/ingredientApiService";
import { recipeApiService } from "@/features/recipes/services/recipeApiService";
import { mapBackendToFrontendRecipe } from "@/features/recipes/utils/recipeMapper";

interface AdminRecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (recipeData: Omit<Recipe, "id">, editId?: string) => void;
  initialRecipe?: Recipe | null;
}

const CATEGORY_PRESETS = [
  "Bữa sáng & Cháo",
  "Sinh tố & Cơm tô",
  "Món xào & Giòn rụm",
  "Bún, Mì & Phở",
  "Canh, Súp & Lẩu",
  "Gỏi cuốn & Salad",
  "Cà ri & Món kho",
  "Mâm cơm chay thập cẩm",
  "Ăn vặt & Bánh ngọt",
  "Tráng miệng & Thức uống",
];

const SAMPLE_IMAGES = [
  "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=800&q=80",
];

function AdminRecipeForm({
  initialRecipe,
  onClose,
  onSave,
}: {
  initialRecipe?: Recipe | null;
  onClose: () => void;
  onSave: (recipeData: Omit<Recipe, "id">, editId?: string) => void;
}) {
  // Master data: Nguyên liệu trong DB
  const [availableIngredients, setAvailableIngredients] = useState<BackendIngredient[]>([]);
  const [loadingIngredients, setLoadingIngredients] = useState<boolean>(true);

  // Form Fields - Nếu chưa nhập thì mặc định là rỗng hoặc 0
  const [title, setTitle] = useState(initialRecipe?.title || "");
  const [description, setDescription] = useState(initialRecipe?.description || "");
  const [image, setImage] = useState(initialRecipe?.image || SAMPLE_IMAGES[0]);
  const [category, setCategory] = useState(initialRecipe?.category || CATEGORY_PRESETS[0]);
  const [mealType, setMealType] = useState<MealType>(initialRecipe?.mealType || "lunch");
  const [vegetarianType, setVegetarianType] = useState<VegetarianType>(
    initialRecipe?.vegetarianType || "vegan"
  );
  const [status, setStatus] = useState<RecipeStatus>(initialRecipe?.status || "APPROVED");
  const [sourceName, setSourceName] = useState(initialRecipe?.source?.name || "Hệ thống tạo");
  const [sourceUrl, setSourceUrl] = useState(initialRecipe?.source?.url || "");
  const [videoUrl, setVideoUrl] = useState(initialRecipe?.video_url || initialRecipe?.videoUrl || "");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingImage(true);
      const res = await recipeApiService.uploadMedia(file);
      const fullUrl = (res as any)?.data?.url || res?.url;
      if (fullUrl) {
        setImage(fullUrl);
      }
    } catch (err: any) {
      alert("Lỗi khi tải ảnh: " + (err.message || "Không thể tải file lên"));
    } finally {
      setUploadingImage(false);
    }
  };

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


  // Các trường số: Chưa nhập thì để là 0
  const [prepTime, setPrepTime] = useState<number | "">(initialRecipe?.prepTime ?? 0);
  const [cookTime, setCookTime] = useState<number | "">(initialRecipe?.cookTime ?? 0);
  const [serving, setServing] = useState<number | "">(initialRecipe?.serving ?? 0);
  const [calories, setCalories] = useState<number | "">(initialRecipe?.calories ?? 0);
  const [protein, setProtein] = useState<number | "">(initialRecipe?.protein ?? 0);
  const [carbs, setCarbs] = useState<number | "">(initialRecipe?.carbs ?? 0);
  const [fat, setFat] = useState<number | "">(initialRecipe?.fat ?? 0);
  const [cuisine, setCuisine] = useState(initialRecipe?.cuisine || "Món Việt");
  const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Advanced">(
    initialRecipe?.difficulty || "Easy"
  );

  // Nguyên liệu: Chưa nhập thì để trống mảng []. Bắt buộc chuẩn hoá đơn vị là "g"
  const [ingredients, setIngredients] = useState<IngredientItem[]>(() => {
    if (initialRecipe?.ingredients?.length) {
      return initialRecipe.ingredients.map((ing) => ({
        ...ing,
        unit: "g",
      }));
    }
    return [];
  });

  // Tự động tải lại nguyên liệu từ Admin API nếu initialRecipe bị thiếu/rỗng
  useEffect(() => {
    if (initialRecipe?.id && (!ingredients || ingredients.length === 0)) {
      const numId = parseInt(initialRecipe.id.replace(/\D/g, ""), 10);
      if (!isNaN(numId)) {
        recipeApiService
          .getAdminRecipeById(numId)
          .then((res: any) => {
            const data = res?.data || res;
            const mapped = mapBackendToFrontendRecipe(data);
            if (mapped?.ingredients && mapped.ingredients.length > 0) {
              setIngredients(
                mapped.ingredients.map((ing) => ({
                  ...ing,
                  unit: "g",
                }))
              );
            }
          })
          .catch(() => {});
      }
    }
  }, [initialRecipe?.id]);

  // Các bước: Chưa nhập thì để trống mảng []
  const [instructions, setInstructions] = useState<string[]>(
    initialRecipe?.instructions?.length ? initialRecipe.instructions : []
  );

  // Quản lý dropdown gợi ý nguyên liệu
  const [activeSearchIndex, setActiveSearchIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load danh sách nguyên liệu từ backend
  useEffect(() => {
    let isMounted = true;
    async function loadIngredients() {
      try {
        const res = await ingredientApiService.getIngredients();
        const list = Array.isArray(res) ? res : (res as any)?.data || [];
        if (isMounted) {
          setAvailableIngredients(list);
        }
      } catch (err) {
        console.warn("Không thể tải danh sách nguyên liệu từ DB:", err);
      } finally {
        if (isMounted) setLoadingIngredients(false);
      }
    }
    loadIngredients();
    return () => {
      isMounted = false;
    };
  }, []);

  // Bắt sự kiện click ra ngoài để đóng dropdown gợi ý
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveSearchIndex(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lọc danh sách nguyên liệu gợi ý theo từ khóa
  const filteredSuggestions = useMemo(() => {
    if (!searchQuery.trim()) return availableIngredients.slice(0, 10);
    const q = searchQuery.toLowerCase();
    return availableIngredients
      .filter((item) => (item.ingredient_name || "").toLowerCase().includes(q))
      .slice(0, 15);
  }, [availableIngredients, searchQuery]);

  // Tự động tính lượng kcal và dinh dưỡng dựa trên nguyên liệu nhập vào
  useEffect(() => {
    // Nếu không có nguyên liệu nào thì dinh dưỡng về 0
    if (ingredients.length === 0) {
      if (!initialRecipe) {
        setCalories(0);
        setProtein(0);
        setCarbs(0);
        setFat(0);
      }
      return;
    }

    let totalKcal = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;
    let hasMatchedIngredient = false;

    for (const ing of ingredients) {
      const qty = Number(ing.quantity || 0);
      if (!qty) continue;

      const matched = availableIngredients.find(
        (a) =>
          (ing.id && a.ingredient_id === ing.id) ||
          (ing.name && a.ingredient_name.toLowerCase() === ing.name.trim().toLowerCase())
      );

      if (matched) {
        hasMatchedIngredient = true;
        let grams = qty;
        const u = (ing.unit || matched.unit || "g").toLowerCase();
        if (u === "kg" || u === "l" || u === "lit") grams = qty * 1000;
        else if (u === "mg" || u === "ml") grams = qty;

        const caloPer100 = Number(matched.calories_per_100g || 0);
        const pPer100 = Number(matched.protein_per_100g || 0);
        const cPer100 = Number(matched.carb_per_100g || 0);
        const fPer100 = Number(matched.fat_per_100g || 0);

        totalKcal += (grams / 100) * caloPer100;
        totalProtein += (grams / 100) * pPer100;
        totalCarbs += (grams / 100) * cPer100;
        totalFat += (grams / 100) * fPer100;
      }
    }

    if (hasMatchedIngredient) {
      setCalories(Math.round(totalKcal));
      setProtein(Math.round(totalProtein * 10) / 10);
      setCarbs(Math.round(totalCarbs * 10) / 10);
      setFat(Math.round(totalFat * 10) / 10);
    }
  }, [ingredients, availableIngredients, initialRecipe]);

  // Tính chi phí ước tính theo thời gian thực
  const estimatedCost = useMemo(() => {
    return priceService.calculateRecipeCost(ingredients).estimatedCost;
  }, [ingredients]);

  // Thêm / Cập nhật / Xóa nguyên liệu
  const handleAddIngredient = () => {
    setIngredients((prev) => [
      ...prev,
      { id: 0, name: "", quantity: 0, unit: "g", unitPrice: 0 },
    ]);
  };

  const handleSelectIngredient = (index: number, selected: BackendIngredient) => {
    setIngredients((prev) => {
      const copy = [...prev];
      copy[index] = {
        ...copy[index],
        id: selected.ingredient_id,
        name: selected.ingredient_name,
        unit: "g",
        unitPrice: Number(selected.avg_price_per_unit || 0),
      };
      return copy;
    });
    setActiveSearchIndex(null);
    setSearchQuery("");
  };

  const handleUpdateIngredient = (
    index: number,
    field: keyof IngredientItem,
    val: string | number
  ) => {
    setIngredients((prev) => {
      const copy = [...prev];
      if (field === "name") {
        const textVal = String(val);
        const matched = availableIngredients.find(
          (db) => db.ingredient_name.trim().toLowerCase() === textVal.trim().toLowerCase()
        );
        copy[index] = {
          ...copy[index],
          name: textVal,
          id: matched ? matched.ingredient_id : 0,
          unit: "g",
          unitPrice: matched ? Number(matched.avg_price_per_unit || 0) : copy[index].unitPrice,
        };
      } else if (field === "quantity") {
        copy[index] = {
          ...copy[index],
          quantity: val === "" ? 0 : Number(val),
          unit: "g",
        };
      } else {
        copy[index] = { ...copy[index], [field]: val };
      }
      return copy;
    });
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  // Thêm / Cập nhật / Xóa bước thực hiện
  const handleAddInstruction = () => {
    setInstructions((prev) => [...prev, ""]);
  };

  const handleUpdateInstruction = (index: number, val: string) => {
    setInstructions((prev) => {
      const copy = [...prev];
      copy[index] = val;
      return copy;
    });
  };

  const handleRemoveInstruction = (index: number) => {
    setInstructions((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Vui lòng nhập tên công thức.");
      return;
    }

    const nonEmptyIngredients = ingredients.filter((i) => i.name.trim() !== "");
    if (nonEmptyIngredients.length === 0) {
      alert("Vui lòng thêm ít nhất một nguyên liệu cho công thức.");
      return;
    }

    // Quy tắc: Chỉ được thêm nguyên liệu có sẵn trong DB, bắt buộc số lượng > 0 theo đơn vị g
    for (let i = 0; i < nonEmptyIngredients.length; i++) {
      const ing = nonEmptyIngredients[i];
      const matched = availableIngredients.find(
        (db) =>
          db.ingredient_id === Number(ing.id) ||
          db.ingredient_name.trim().toLowerCase() === ing.name.trim().toLowerCase()
      );
      if (!matched) {
        alert(
          `Nguyên liệu "${ing.name}" không tồn tại trong cơ sở dữ liệu. Theo quy định, chỉ được chọn nguyên liệu có sẵn trong DB.`
        );
        return;
      }
      if (!ing.quantity || Number(ing.quantity) <= 0) {
        alert(
          `Vui lòng nhập số lượng theo đơn vị gam (g) lớn hơn 0 cho nguyên liệu "${matched.ingredient_name}".`
        );
        return;
      }
      // Chuẩn hoá lại id và unit
      ing.id = matched.ingredient_id;
      ing.name = matched.ingredient_name;
      ing.unit = "g";
      ing.unitPrice = Number(matched.avg_price_per_unit || 0);
    }

    const { ingredientsWithCost } = priceService.calculateRecipeCost(nonEmptyIngredients);

    const safePrep = Number(prepTime) || 0;
    const safeCook = Number(cookTime) || 0;

    const payload: Omit<Recipe, "id"> = {
      title: title.trim(),
      name: title.trim(),
      description: description.trim(),
      image,
      video_url: videoUrl.trim() || undefined,
      videoUrl: videoUrl.trim() || undefined,
      category,
      mealType,
      vegetarianType,
      status,
      source: {
        type: sourceUrl ? "web" : "admin",
        name: sourceName.trim() || "Hệ thống tạo",
        url: sourceUrl.trim() || undefined,
      },
      estimatedCost,
      prepTime: safePrep,
      cookTime: safeCook,
      duration: `${safePrep + safeCook} phút`,
      serving: Number(serving) || 0,
      calories: Number(calories) || 0,
      protein: Number(protein) || 0,
      carbs: Number(carbs) || 0,
      fat: Number(fat) || 0,
      cuisine,
      difficulty,
      ingredients: ingredientsWithCost,
      instructions: instructions.filter((step) => step.trim() !== ""),
    };

    onSave(payload, initialRecipe?.id);
    onClose();
  };

  return (
    <div className="relative w-full max-w-4xl my-6 bg-stone-50 rounded-3xl shadow-2xl overflow-hidden border border-stone-200">
      {/* Modal Header */}
      <div className="bg-emerald-900 text-white p-6 sm:p-7 flex items-center justify-between border-b border-emerald-800">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-emerald-800 flex items-center justify-center text-emerald-300 shadow-inner">
            <ChefHat className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-800/80 px-2 py-0.5 rounded-full">
                Quản trị công thức
              </span>
              <span className="text-xs text-emerald-200">· Hệ thống VeggieHub</span>
            </div>
            <h2 className="font-serif font-bold text-2xl mt-0.5 text-white">
              {initialRecipe ? "Chỉnh sửa công thức" : "Thêm công thức mới"}
            </h2>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2.5 rounded-full text-emerald-200 hover:text-white hover:bg-emerald-800/80 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Modal Form */}
      <form
        onSubmit={handleSubmit}
        className="p-6 sm:p-8 space-y-6 max-h-[calc(88vh-80px)] overflow-y-auto"
      >
        {/* Card 1: Thông tin cơ bản & Phân loại */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 text-stone-800 border-b border-stone-100 pb-3">
            <UtensilsCrossed className="w-4 h-4 text-emerald-700" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-700">
              1. Thông tin cơ bản & Phân loại
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Tên công thức món ăn *
              </label>
              <input
                type="text"
                required
                placeholder="Ví dụ: Đậu hũ sốt sả ớt giòn rụm"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full h-11 rounded-xl border border-stone-200 bg-stone-50/50 px-3.5 text-sm focus:border-emerald-600 focus:bg-white outline-none transition-colors"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Mô tả món ăn
              </label>
              <textarea
                rows={2}
                placeholder="Mô tả ngắn gọn hương vị, câu chuyện hoặc lợi ích dinh dưỡng..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-xl border border-stone-200 bg-stone-50/50 p-3 text-sm focus:border-emerald-600 focus:bg-white outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Trạng thái kiểm duyệt *
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as RecipeStatus)}
                className="w-full h-11 rounded-xl border border-stone-200 bg-stone-50/50 px-3 text-sm font-semibold text-emerald-800 focus:border-emerald-600 focus:bg-white outline-none cursor-pointer"
              >
                <option value="APPROVED">ĐÃ DUYỆT (Hiển thị trong Thực đơn)</option>
                <option value="PENDING_REVIEW">CHỜ DUYỆT (Đang xét duyệt)</option>
                <option value="DRAFT">BẢN NHÁP (Chưa công khai)</option>
                <option value="REJECTED">TỪ CHỐI</option>
                <option value="ARCHIVED">LƯU TRỮ</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Danh mục món ăn
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-11 rounded-xl border border-stone-200 bg-stone-50/50 px-3 text-sm focus:border-emerald-600 focus:bg-white outline-none cursor-pointer"
              >
                {CATEGORY_PRESETS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Loại bữa ăn *
              </label>
              <select
                value={mealType}
                onChange={(e) => setMealType(e.target.value as MealType)}
                className="w-full h-11 rounded-xl border border-stone-200 bg-stone-50/50 px-3 text-sm focus:border-emerald-600 focus:bg-white outline-none cursor-pointer"
              >
                <option value="breakfast">Bữa sáng (Breakfast)</option>
                <option value="lunch">Bữa trưa (Lunch)</option>
                <option value="dinner">Bữa tối (Dinner)</option>
                <option value="snack">Bữa phụ (Snack)</option>
                <option value="any">Bữa trưa / Tối (Linh hoạt)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Chế độ ăn chay *
              </label>
              <select
                value={vegetarianType}
                onChange={(e) => setVegetarianType(e.target.value as VegetarianType)}
                className="w-full h-11 rounded-xl border border-stone-200 bg-stone-50/50 px-3 text-sm focus:border-emerald-600 focus:bg-white outline-none cursor-pointer"
              >
                <option value="vegan">Thuần chay (Vegan - 100% Thực vật)</option>
                <option value="lacto_vegetarian">Chay có sữa (Lacto Vegetarian)</option>
                <option value="ovo_vegetarian">Chay có trứng (Ovo Vegetarian)</option>
                <option value="lacto_ovo_vegetarian">Chay có trứng & sữa (Lacto-Ovo)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Card 2: Hình ảnh món ăn, Video & Nguồn */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 text-stone-800 border-b border-stone-100 pb-3">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-700">
              2. Hình ảnh món ăn, Video & Nguồn trích dẫn
            </h3>
          </div>

          <div className="space-y-4">
            {/* Ảnh món ăn */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-stone-700">
                  Hình ảnh món ăn (URL hoặc Tải lên từ máy)
                </label>
                <label
                  className={`text-xs px-3 py-1.5 rounded-xl border border-emerald-600 bg-emerald-50 text-emerald-800 font-bold hover:bg-emerald-100 cursor-pointer flex items-center gap-1.5 transition-all ${
                    uploadingImage ? "opacity-50 pointer-events-none" : ""
                  }`}
                >
                  {uploadingImage ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Upload className="w-3.5 h-3.5" />
                  )}
                  <span>{uploadingImage ? "Đang tải ảnh..." : "Tải ảnh từ máy"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="flex gap-3 items-center">
                {image && (
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-stone-200 bg-stone-100">
                    <img
                      src={image.startsWith("/") ? `http://localhost:3000${image}` : image}
                      alt="Xem trước ảnh"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                  </div>
                )}
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/... hoặc đường dẫn ảnh tải lên"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="flex-1 h-11 rounded-xl border border-stone-200 bg-stone-50/50 px-3.5 text-sm focus:border-emerald-600 focus:bg-white outline-none"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs text-stone-500 font-medium">Hoặc chọn ảnh mẫu:</span>
                {SAMPLE_IMAGES.map((url, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setImage(url)}
                    className={`text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                      image === url
                        ? "border-emerald-600 bg-emerald-50 text-emerald-800 font-bold"
                        : "border-stone-200 text-stone-600 hover:bg-stone-50"
                    }`}
                  >
                    Ảnh mẫu #{idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Video nấu ăn */}
            <div className="space-y-2 pt-3 border-t border-stone-100">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                  <Video className="w-4 h-4 text-emerald-600" />
                  Video hướng dẫn nấu ăn (Tùy chọn)
                </label>
                <label
                  className={`text-xs px-3 py-1.5 rounded-xl border border-violet-600 bg-violet-50 text-violet-800 font-bold hover:bg-violet-100 cursor-pointer flex items-center gap-1.5 transition-all ${
                    uploadingVideo ? "opacity-50 pointer-events-none" : ""
                  }`}
                >
                  {uploadingVideo ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Upload className="w-3.5 h-3.5" />
                  )}
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
                  placeholder="Hoặc dán đường link video (mp4, webm...)..."
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  className="flex-1 h-11 rounded-xl border border-stone-200 bg-stone-50/50 px-3.5 text-sm focus:border-emerald-600 focus:bg-white outline-none font-mono text-stone-700"
                />
                {videoUrl && (
                  <button
                    type="button"
                    onClick={() => setVideoUrl("")}
                    className="h-11 text-xs px-3.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 font-semibold hover:bg-rose-100 transition-colors cursor-pointer shrink-0"
                  >
                    Gỡ video
                  </button>
                )}
              </div>

              {videoUrl && (
                <div className="p-3 bg-stone-900 rounded-2xl overflow-hidden mt-2">
                  <div className="flex items-center gap-1.5 text-white/90 text-xs font-semibold mb-2">
                    <Video className="w-4 h-4 text-emerald-400" />
                    <span>Xem trước video:</span>
                  </div>
                  <video
                    src={videoUrl.startsWith("/") ? `http://localhost:3000${videoUrl}` : videoUrl}
                    controls
                    className="w-full max-h-52 rounded-xl bg-black"
                  />
                </div>
              )}
            </div>

            {/* Nguồn trích dẫn */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-stone-100">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Tên nguồn / Tác giả
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Bếp chay An Lạc, Hệ thống tạo"
                  value={sourceName}
                  onChange={(e) => setSourceName(e.target.value)}
                  className="w-full h-10 rounded-xl border border-stone-200 bg-stone-50/50 px-3.5 text-sm focus:border-emerald-600 focus:bg-white outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Đường dẫn nguồn tham khảo (nếu có)
                </label>
                <input
                  type="text"
                  placeholder="https://example.com/recipe"
                  value={sourceUrl}
                  onChange={(e) => setSourceUrl(e.target.value)}
                  className="w-full h-10 rounded-xl border border-stone-200 bg-stone-50/50 px-3.5 text-sm focus:border-emerald-600 focus:bg-white outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Thời gian nấu & Dinh dưỡng (Kcal tự động tính) */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div className="flex items-center gap-2.5 text-stone-800">
              <Clock className="w-4 h-4 text-emerald-700" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-700">
                3. Thời gian & Chỉ số dinh dưỡng
              </h3>
            </div>
            <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              Kcal tự động tính theo nguyên liệu
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1">Chuẩn bị (phút)</label>
              <input
                type="number"
                min="0"
                value={prepTime}
                onChange={(e) => setPrepTime(e.target.value === "" ? 0 : Number(e.target.value))}
                className="w-full h-10 rounded-xl border border-stone-200 bg-stone-50/50 px-3 text-sm focus:bg-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1">Nấu (phút)</label>
              <input
                type="number"
                min="0"
                value={cookTime}
                onChange={(e) => setCookTime(e.target.value === "" ? 0 : Number(e.target.value))}
                className="w-full h-10 rounded-xl border border-stone-200 bg-stone-50/50 px-3 text-sm focus:bg-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1">Khẩu phần (người)</label>
              <input
                type="number"
                min="0"
                value={serving}
                onChange={(e) => setServing(e.target.value === "" ? 0 : Number(e.target.value))}
                className="w-full h-10 rounded-xl border border-stone-200 bg-stone-50/50 px-3 text-sm focus:bg-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-amber-800 mb-1 flex items-center gap-1">
                <Flame className="w-3 h-3 text-amber-600" />
                Calo (kcal)
              </label>
              <input
                type="number"
                min="0"
                value={calories}
                onChange={(e) => setCalories(e.target.value === "" ? 0 : Number(e.target.value))}
                className="w-full h-10 rounded-xl border border-amber-300 bg-amber-50/60 px-3 text-sm font-bold text-amber-900 focus:bg-white outline-none"
                title="Tự động tính từ các nguyên liệu có trong DB"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1">Chất đạm / Protein (g)</label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={protein}
                onChange={(e) => setProtein(e.target.value === "" ? 0 : Number(e.target.value))}
                className="w-full h-10 rounded-xl border border-stone-200 bg-stone-50/50 px-3 text-sm focus:bg-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1">Tinh bột / Carbs (g)</label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={carbs}
                onChange={(e) => setCarbs(e.target.value === "" ? 0 : Number(e.target.value))}
                className="w-full h-10 rounded-xl border border-stone-200 bg-stone-50/50 px-3 text-sm focus:bg-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1">Chất béo / Fat (g)</label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={fat}
                onChange={(e) => setFat(e.target.value === "" ? 0 : Number(e.target.value))}
                className="w-full h-10 rounded-xl border border-stone-200 bg-stone-50/50 px-3 text-sm focus:bg-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1">Độ khó chế biến</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as "Easy" | "Medium" | "Advanced")}
                className="w-full h-10 rounded-xl border border-stone-200 bg-stone-50/50 px-3 text-sm focus:bg-white outline-none cursor-pointer"
              >
                <option value="Easy">Dễ (Easy)</option>
                <option value="Medium">Trung bình (Medium)</option>
                <option value="Advanced">Nâng cao (Advanced)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Card 4: Nguyên liệu & Gợi ý từ DB & Tính chi phí */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div className="flex items-center gap-2.5 text-stone-800">
              <DollarSign className="w-4 h-4 text-emerald-700" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-700">
                4. Nguyên liệu & Chi phí ước tính
              </h3>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Ước tính: {priceService.formatEstimatedPrice(estimatedCost)}
              </span>
            </div>
            <button
              type="button"
              onClick={handleAddIngredient}
              className="text-xs text-emerald-700 font-semibold flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Thêm nguyên liệu
            </button>
          </div>

          {ingredients.length === 0 ? (
            <div className="py-8 text-center text-stone-400 bg-stone-50 rounded-xl border border-dashed border-stone-200">
              <p className="text-sm font-medium">Chưa có nguyên liệu nào.</p>
              <button
                type="button"
                onClick={handleAddIngredient}
                className="mt-2 text-xs font-semibold text-emerald-700 hover:underline cursor-pointer"
              >
                + Bấm vào đây để thêm nguyên liệu đầu tiên
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {ingredients.map((ing, idx) => (
                <div key={ing.id || idx} className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-3 bg-stone-50/70 rounded-xl border border-stone-200/80">
                  {/* Ô nhập tên nguyên liệu có gợi ý */}
                  <div className="relative flex-1">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Nhập tên nguyên liệu (sẽ gợi ý từ DB)..."
                        value={ing.name}
                        onChange={(e) => {
                          handleUpdateIngredient(idx, "name", e.target.value);
                          setSearchQuery(e.target.value);
                          setActiveSearchIndex(idx);
                        }}
                        onFocus={() => {
                          setSearchQuery(ing.name || "");
                          setActiveSearchIndex(idx);
                        }}
                        className="w-full h-10 rounded-lg border border-stone-200 bg-white pl-8 pr-3 text-sm focus:border-emerald-600 outline-none"
                      />
                      <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    </div>

                    {/* Dropdown gợi ý nguyên liệu */}
                    {activeSearchIndex === idx && (
                      <div
                        ref={dropdownRef}
                        className="absolute left-0 right-0 top-full mt-1 bg-white rounded-xl shadow-xl border border-stone-200 py-1.5 z-50 max-h-56 overflow-y-auto"
                      >
                        <div className="px-3 py-1 text-[11px] font-bold text-stone-400 uppercase tracking-wider border-b border-stone-100 flex items-center justify-between">
                          <span>Nguyên liệu có sẵn trong DB</span>
                          <span>Đơn vị / Đơn giá / Calo</span>
                        </div>
                        {filteredSuggestions.length === 0 ? (
                          <div className="px-3 py-3 text-xs text-rose-700 bg-rose-50 rounded-lg m-1 text-center font-medium">
                            Không tìm thấy trong DB. Chỉ được thêm nguyên liệu có sẵn trong hệ thống!
                          </div>
                        ) : (
                          filteredSuggestions.map((item) => (
                            <button
                              key={item.ingredient_id}
                              type="button"
                              onClick={() => handleSelectIngredient(idx, item)}
                              className="w-full px-3 py-2 text-left hover:bg-emerald-50 flex items-center justify-between text-xs transition-colors cursor-pointer border-b border-stone-50 last:border-none"
                            >
                              <span className="font-semibold text-stone-800">
                                {item.ingredient_name}
                              </span>
                              <div className="flex items-center gap-2 text-stone-500 text-[11px]">
                                <span className="px-1.5 py-0.5 rounded bg-stone-100">
                                  {item.unit || "g"}
                                </span>
                                <span className="font-medium text-emerald-700">
                                  {Number(item.avg_price_per_unit || 0).toLocaleString("vi-VN")} đ
                                </span>
                                {item.calories_per_100g && (
                                  <span className="text-amber-700 font-bold">
                                    {Math.round(item.calories_per_100g)} kcal/100g
                                  </span>
                                )}
                              </div>
                            </button>
                          ))
                        )}
                      </div>
                    )}
                  </div>

                  {/* Trạng thái khớp DB */}
                  <div className="shrink-0">
                    {ing.name ? (
                      availableIngredients.some(
                        (db) =>
                          db.ingredient_id === Number(ing.id) ||
                          db.ingredient_name.trim().toLowerCase() === ing.name.trim().toLowerCase()
                      ) ? (
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/90 px-2 py-1 rounded-md border border-emerald-300">
                          ✓ DB
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-1 rounded-md border border-rose-200 animate-pulse" title="Vui lòng bấm chọn nguyên liệu từ gợi ý DB">
                          ! Chưa chọn từ DB
                        </span>
                      )
                    ) : null}
                  </div>

                  {/* Số lượng (gam) */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        step="any"
                        placeholder="Số lượng"
                        value={ing.quantity === 0 ? "" : ing.quantity || ""}
                        onChange={(e) =>
                          handleUpdateIngredient(
                            idx,
                            "quantity",
                            e.target.value === "" ? 0 : Number(e.target.value)
                          )
                        }
                        className="w-28 h-10 rounded-lg border border-stone-200 bg-white px-2.5 text-sm font-semibold text-center focus:border-emerald-600 outline-none"
                        title="Nhập số lượng theo đơn vị gam (g)"
                      />
                    </div>

                    {/* Đơn vị bắt buộc: g */}
                    <div
                      className="w-12 h-10 rounded-lg border border-stone-200 bg-stone-100 flex items-center justify-center text-xs font-bold text-stone-700 select-none shrink-0"
                      title="Đơn vị bắt buộc theo chuẩn hệ thống: gam (g)"
                    >
                      g
                    </div>

                    {/* Đơn giá ước tính (tự động tính từ DB) */}
                    <div className="w-28 h-10 rounded-lg border border-stone-100 bg-stone-100/60 px-2.5 flex items-center justify-end text-xs text-stone-600 font-medium select-none" title="Đơn giá tham khảo từ kho nguyên liệu DB">
                      {Number(ing.unitPrice || 0) > 0 ? `${Number(ing.unitPrice).toLocaleString("vi-VN")} đ` : "0 đ"}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveIngredient(idx)}
                      className="p-2 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="Xóa nguyên liệu này"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <p className="text-[11px] text-stone-400 flex items-center gap-1 pt-1">
            <Info className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            Quy định hệ thống: Chỉ được thêm nguyên liệu có sẵn trong DB (chọn từ danh sách gợi ý). Khối lượng bắt buộc tính theo đơn vị gam (g).
          </p>
        </div>

        {/* Card 5: Hướng dẫn chế biến từng bước */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div className="flex items-center gap-2.5 text-stone-800">
              <Layers className="w-4 h-4 text-emerald-700" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-700">
                5. Các bước chế biến món ăn
              </h3>
            </div>
            <button
              type="button"
              onClick={handleAddInstruction}
              className="text-xs text-emerald-700 font-semibold flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Thêm bước
            </button>
          </div>

          {instructions.length === 0 ? (
            <div className="py-8 text-center text-stone-400 bg-stone-50 rounded-xl border border-dashed border-stone-200">
              <p className="text-sm font-medium">Chưa có bước thực hiện nào.</p>
              <button
                type="button"
                onClick={handleAddInstruction}
                className="mt-2 text-xs font-semibold text-emerald-700 hover:underline cursor-pointer"
              >
                + Bấm vào đây để thêm bước đầu tiên
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {instructions.map((step, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    placeholder={`Hướng dẫn thực hiện bước ${idx + 1}...`}
                    value={step}
                    onChange={(e) => handleUpdateInstruction(idx, e.target.value)}
                    className="flex-1 h-10 rounded-xl border border-stone-200 bg-stone-50/50 px-3.5 text-sm focus:bg-white focus:border-emerald-600 outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveInstruction(idx)}
                    className="p-2 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title="Xóa bước này"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-stone-200 text-stone-700 text-sm font-semibold hover:bg-stone-100 transition-colors cursor-pointer"
          >
            Hủy bỏ
          </button>
          <button
            type="submit"
            className="px-7 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold shadow-xs transition-colors cursor-pointer flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            {initialRecipe ? "Lưu thay đổi" : "Tạo công thức mới"}
          </button>
        </div>
      </form>
    </div>
  );
}

export function AdminRecipeModal({
  isOpen,
  onClose,
  onSave,
  initialRecipe,
}: AdminRecipeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <AdminRecipeForm
        key={initialRecipe?.id || "new-recipe"}
        initialRecipe={initialRecipe}
        onClose={onClose}
        onSave={onSave}
      />
    </div>
  );
}
