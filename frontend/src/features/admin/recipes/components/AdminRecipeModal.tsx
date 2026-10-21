"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import {
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

  // Nguyên liệu: Chưa nhập thì để trống mảng []
  const [ingredients, setIngredients] = useState<IngredientItem[]>(
    initialRecipe?.ingredients?.length ? initialRecipe.ingredients : []
  );

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
      { id: Date.now(), name: "", quantity: 0, unit: "g", unitPrice: 0 },
    ]);
  };

  const handleSelectIngredient = (index: number, selected: BackendIngredient) => {
    setIngredients((prev) => {
      const copy = [...prev];
      copy[index] = {
        ...copy[index],
        id: selected.ingredient_id,
        name: selected.ingredient_name,
        unit: selected.unit || "g",
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
      copy[index] = { ...copy[index], [field]: val };
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

    const { ingredientsWithCost } = priceService.calculateRecipeCost(
      ingredients.filter((i) => i.name.trim() !== "")
    );

    const safePrep = Number(prepTime) || 0;
    const safeCook = Number(cookTime) || 0;

    const payload: Omit<Recipe, "id"> = {
      title: title.trim(),
      name: title.trim(),
      description: description.trim(),
      image,
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

        {/* Card 2: Hình ảnh món ăn & Nguồn */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 text-stone-800 border-b border-stone-100 pb-3">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-700">
              2. Hình ảnh món ăn & Nguồn trích dẫn
            </h3>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Đường dẫn hình ảnh (URL)
              </label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full h-11 rounded-xl border border-stone-200 bg-stone-50/50 px-3.5 text-sm focus:border-emerald-600 focus:bg-white outline-none"
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
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
                  type="url"
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
                          <div className="px-3 py-3 text-xs text-stone-400 text-center">
                            Không tìm thấy nguyên liệu trùng khớp. Bạn vẫn có thể dùng tên này.
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

                  {/* Số lượng */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <input
                      type="number"
                      min="0"
                      step="any"
                      placeholder="Số lượng"
                      value={ing.quantity || ""}
                      onChange={(e) =>
                        handleUpdateIngredient(
                          idx,
                          "quantity",
                          e.target.value === "" ? 0 : Number(e.target.value)
                        )
                      }
                      className="w-24 h-10 rounded-lg border border-stone-200 bg-white px-2.5 text-sm text-center focus:border-emerald-600 outline-none"
                      title="Số lượng"
                    />

                    {/* Đơn vị */}
                    <input
                      type="text"
                      placeholder="Đơn vị"
                      value={ing.unit || ""}
                      onChange={(e) => handleUpdateIngredient(idx, "unit", e.target.value)}
                      className="w-16 h-10 rounded-lg border border-stone-200 bg-white px-2 text-sm text-center focus:border-emerald-600 outline-none"
                      title="Đơn vị (g, kg, cái, ml...)"
                    />

                    {/* Đơn giá */}
                    <input
                      type="number"
                      min="0"
                      placeholder="Đơn giá (đ)"
                      value={ing.unitPrice || ""}
                      onChange={(e) =>
                        handleUpdateIngredient(
                          idx,
                          "unitPrice",
                          e.target.value === "" ? 0 : Number(e.target.value)
                        )
                      }
                      className="w-28 h-10 rounded-lg border border-stone-200 bg-white px-2.5 text-xs text-right focus:border-emerald-600 outline-none font-medium"
                      title="Đơn giá nguyên liệu theo đơn vị"
                    />

                    <button
                      type="button"
                      onClick={() => handleRemoveIngredient(idx)}
                      className="p-2 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="Xóa dòng này"
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
            Nhập tên nguyên liệu để chọn gợi ý từ 190+ nguyên liệu chuẩn trong DB. Lượng calo và chi phí sẽ tự động cập nhật theo khối lượng.
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
