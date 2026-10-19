"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Dropzone } from "@/components/ui/Dropzone";
import { VideoCard, VIDEO_RECIPES } from "@/features/videos";
import { LockedState, GatedSkeleton } from "@/components/ui/LockedState";
import { useRole } from "@/context/RoleContext";
import { SCAN_PRESETS, DetectedIngredient } from "@/features/meal-planner";
import {
  userIngredientService,
  UserIngredientItem,
  SystemIngredient,
} from "@/features/meal-planner/services/userIngredientService";
import {
  recommendationService,
  UserRecommendationItem,
} from "@/features/recipes/services/recommendationService";

import {
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Plus,
  Trash2,
  Refrigerator,
  Sparkles,
  Camera,
  X,
  Search,
  Check,
  Clock,
  Utensils,
  Loader2,
} from "lucide-react";

function FreshnessBadge({ freshness }: { freshness?: string }) {
  const norm = (freshness || "").toLowerCase();
  if (norm === "fresh" || norm === "tươi mới") {
    return (
      <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
        <CheckCircle2 className="w-3 h-3" />
        Tươi mới
      </span>
    );
  }
  if (norm === "expired" || norm === "hết hạn") {
    return (
      <span className="flex items-center gap-1 text-[11px] font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
        <AlertTriangle className="w-3 h-3" />
        Hết hạn
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
      <AlertTriangle className="w-3 h-3" />
      Dùng ngay
    </span>
  );
}

function PantryManager() {
  const [myIngredients, setMyIngredients] = useState<UserIngredientItem[]>([]);
  const [systemIngredients, setSystemIngredients] = useState<SystemIngredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Form state
  const [selectedIngredientId, setSelectedIngredientId] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<number>(200);
  const [unit, setUnit] = useState<string>("g");
  const [freshnessStatus, setFreshnessStatus] = useState<string>("fresh");
  const [ingredientSearch, setIngredientSearch] = useState<string>("");

  // AI recommendations state
  const [recommendations, setRecommendations] = useState<UserRecommendationItem[]>([]);
  const [generatingRecs, setGeneratingRecs] = useState(false);
  const [recMessage, setRecMessage] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [pantry, sys, recs] = await Promise.all([
        userIngredientService.getMyIngredients(),
        userIngredientService.getSystemIngredients(),
        recommendationService.getRecommendations(),
      ]);
      setMyIngredients(pantry);
      setSystemIngredients(sys);
      setRecommendations(recs);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleAddIngredient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedIngredientId) return;

    setIsAdding(true);
    try {
      const added = await userIngredientService.addIngredient({
        ingredient_id: selectedIngredientId,
        quantity,
        unit,
        freshness_status: freshnessStatus,
      });
      // Attach system ingredient details for instant UI display
      const sysDetail = systemIngredients.find((i) => i.ingredient_id === selectedIngredientId);
      if (sysDetail) {
        added.ingredient = {
          ingredient_id: sysDetail.ingredient_id,
          ingredient_name: sysDetail.ingredient_name,
          unit: sysDetail.unit,
          vegan_flag: sysDetail.vegan_flag,
          calories_per_100g: sysDetail.calories_per_100g,
        };
      }
      setMyIngredients((prev) => [added, ...prev.filter((i) => i.user_ingredient_id !== added.user_ingredient_id)]);
      setModalOpen(false);
      setSelectedIngredientId(null);
      setQuantity(200);
    } finally {
      setIsAdding(false);
    }
  };

  const handleRemove = async (id: number) => {
    setMyIngredients((prev) => prev.filter((i) => i.user_ingredient_id !== id));
    await userIngredientService.removeIngredient(id);
  };

  const handleGenerateAIRecommendations = async () => {
    setGeneratingRecs(true);
    setRecMessage("AI đang phân tích các nguyên liệu trong tủ lạnh...");
    try {
      await recommendationService.generateRecommendations();
      const updated = await recommendationService.getRecommendations();
      setRecommendations(updated);
      setRecMessage("✓ Đã sinh danh sách gợi ý món ăn phù hợp với tủ lạnh của bạn!");
      setTimeout(() => setRecMessage(null), 4000);
    } catch {
      setRecMessage("Gợi ý tạm thời chưa khả dụng, đang dùng công thức sẵn có.");
      setTimeout(() => setRecMessage(null), 4000);
    } finally {
      setGeneratingRecs(false);
    }
  };

  const filteredSystemIngredients = systemIngredients.filter((i) =>
    (i.ingredient_name || "").toLowerCase().includes(ingredientSearch.toLowerCase().trim())
  );

  return (
    <div className="space-y-8">
      {/* Top Banner & Quick Action */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-stone-50 border border-emerald-200/80 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Refrigerator className="w-7 h-7" />
          </div>
          <div>
            <h2 className="font-serif font-bold text-2xl text-stone-900 tracking-tight">
              Tủ lạnh thông minh của bạn
            </h2>
            <p className="text-stone-600 text-sm mt-0.5">
              Đồng bộ dữ liệu thời gian thực với PostgreSQL. AI sẽ ưu tiên gợi ý món ăn từ các nguyên liệu này để tránh lãng phí.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 h-11 px-5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm nguyên liệu</span>
          </button>
          <button
            type="button"
            onClick={handleGenerateAIRecommendations}
            disabled={generatingRecs || myIngredients.length === 0}
            className="flex items-center gap-2 h-11 px-5 rounded-2xl bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-amber-950 font-bold text-sm shadow-xs transition-colors cursor-pointer"
          >
            {generatingRecs ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4 text-amber-950" />
            )}
            <span>Gợi ý món AI từ tủ lạnh</span>
          </button>
        </div>
      </div>

      {recMessage && (
        <div className="p-4 bg-emerald-100/80 border border-emerald-200 text-emerald-900 text-xs font-semibold rounded-2xl flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>{recMessage}</span>
        </div>
      )}

      {/* Ingredients Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif font-bold text-xl text-stone-900">
            Nguyên liệu trong tủ ({myIngredients.length})
          </h3>
          <span className="text-xs text-stone-500 bg-stone-100 px-3 py-1 rounded-full font-medium">
            Tự động cập nhật vào hệ thống
          </span>
        </div>

        {loading ? (
          <div className="p-12 flex flex-col items-center justify-center space-y-3 bg-stone-50 rounded-3xl border border-stone-200">
            <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
            <p className="text-sm text-stone-500">Đang tải tủ lạnh của bạn...</p>
          </div>
        ) : myIngredients.length === 0 ? (
          <Card className="p-10 text-center flex flex-col items-center justify-center border-dashed border-2 border-stone-200">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
              <Refrigerator className="w-6 h-6" />
            </div>
            <p className="font-serif font-bold text-lg text-stone-800">Tủ lạnh của bạn đang trống</p>
            <p className="text-xs text-stone-500 max-w-sm mt-1 mb-4">
              Hãy thêm những thực phẩm chay bạn đang có (đậu hũ, rau củ, yến mạch...) để AI lên thực đơn không bị thiếu nguyên liệu.
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="px-4 h-10 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              + Thêm nguyên liệu đầu tiên
            </button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {myIngredients.map((item) => {
              const name = item.ingredient?.ingredient_name || `Nguyên liệu #${item.ingredient_id}`;
              return (
                <Card
                  key={item.user_ingredient_id}
                  className="p-4 hover:border-emerald-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-xs font-bold text-stone-400 font-mono">
                        #{item.ingredient_id}
                      </span>
                      <FreshnessBadge freshness={item.freshness_status} />
                    </div>
                    <h4 className="font-semibold text-stone-900 text-base line-clamp-1">
                      {name}
                    </h4>
                    <p className="text-sm font-bold text-emerald-800 mt-1">
                      {item.quantity ? `${item.quantity} ${item.unit || "g"}` : "Có sẵn trong bếp"}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
                    <span>Nguồn: {item.source || "Thủ công"}</span>
                    <button
                      type="button"
                      onClick={() => handleRemove(item.user_ingredient_id)}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-stone-400 hover:text-red-600 transition-colors cursor-pointer"
                      title="Xóa khỏi tủ lạnh"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Recommendations Section */}
      {recommendations.length > 0 && (
        <section className="pt-6 border-t border-stone-200 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h3 className="font-serif font-bold text-xl text-stone-900">
              Món ăn gợi ý theo nguyên liệu trong tủ lạnh của bạn
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {recommendations.map((rec) => {
              const r = rec.recipe;
              if (!r) return null;
              return (
                <Card key={rec.recommendation_id} className="p-4 hover:border-emerald-400 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-xl bg-stone-100 relative overflow-hidden shrink-0">
                      {r.image_url ? (
                        <Image src={r.image_url} alt={r.title} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-stone-400">
                          <Utensils className="w-6 h-6" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full uppercase">
                        Độ phù hợp: {Math.round(rec.score * 100)}%
                      </span>
                      <h4 className="font-bold text-stone-900 text-sm truncate mt-1">{r.title}</h4>
                      <p className="text-xs text-stone-500 mt-0.5">{r.calories || 400} kcal · {r.meal_type || "Bữa chính"}</p>
                    </div>
                  </div>
                  {rec.reason && (
                    <p className="mt-3 text-[11px] text-stone-600 bg-stone-50 p-2 rounded-xl italic">
                      &ldquo;{rec.reason}&rdquo;
                    </p>
                  )}
                </Card>
              );
            })}
          </div>
        </section>
      )}

      {/* Add Ingredient Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 relative max-h-[90vh] flex flex-col">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif font-bold text-xl text-stone-900 mb-1">
              Thêm nguyên liệu vào tủ lạnh
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              Chọn nguyên liệu từ cơ sở dữ liệu thực phẩm chuẩn của hệ thống
            </p>

            <form onSubmit={handleAddIngredient} className="space-y-4 flex-1 overflow-y-auto pr-1">
              {/* Search in System Ingredients */}
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Tìm nguyên liệu trong hệ thống *
                </label>
                <div className="relative mb-2">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Tìm theo tên nguyên liệu (đậu hũ, nấm, hạt dẻ...)"
                    value={ingredientSearch}
                    onChange={(e) => setIngredientSearch(e.target.value)}
                    className="w-full h-10 pl-9 pr-3 rounded-xl border border-stone-200 text-sm focus:outline-emerald-600"
                  />
                </div>

                <div className="border border-stone-200 rounded-2xl max-h-48 overflow-y-auto divide-y divide-stone-100 bg-stone-50/50">
                  {filteredSystemIngredients.slice(0, 30).map((ing) => (
                    <button
                      key={ing.ingredient_id}
                      type="button"
                      onClick={() => {
                        setSelectedIngredientId(ing.ingredient_id);
                        setUnit(ing.unit || "g");
                      }}
                      className={`w-full px-3.5 py-2.5 text-left text-xs flex items-center justify-between hover:bg-emerald-50 transition-colors cursor-pointer ${
                        selectedIngredientId === ing.ingredient_id
                          ? "bg-emerald-100/70 font-bold text-emerald-900"
                          : "text-stone-700"
                      }`}
                    >
                      <span>{ing.ingredient_name}</span>
                      <span className="text-[11px] text-stone-400">
                        {ing.unit} · {ing.calories_per_100g ? `${ing.calories_per_100g} kcal/100g` : "Chuẩn chay"}
                      </span>
                    </button>
                  ))}
                  {filteredSystemIngredients.length === 0 && (
                    <p className="p-4 text-center text-xs text-stone-400">Không tìm thấy nguyên liệu phù hợp.</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">Số lượng</label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full h-10 px-3 rounded-xl border border-stone-200 text-sm focus:outline-emerald-600"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">Đơn vị</label>
                  <input
                    type="text"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-stone-200 text-sm focus:outline-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Tình trạng tươi mới</label>
                <select
                  value={freshnessStatus}
                  onChange={(e) => setFreshnessStatus(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-stone-200 text-sm focus:outline-emerald-600 bg-white"
                >
                  <option value="fresh">Tươi mới (Fresh)</option>
                  <option value="use_soon">Cần dùng sớm (Use soon)</option>
                  <option value="expired">Đã cận date / Hết hạn</option>
                </select>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 h-10 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={!selectedIngredientId || isAdding}
                  className="px-5 h-10 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {isAdding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                  <span>Lưu vào tủ lạnh</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function ScanContent() {
  const [activeTab, setActiveTab] = useState<"pantry" | "scan">("pantry");
  const [scanned, setScanned] = useState(false);
  const [activePreset, setActivePreset] = useState(SCAN_PRESETS[0]);

  const handleFileAccepted = () => {
    setScanned(true);
  };

  const matchingVideos = VIDEO_RECIPES.filter((v) =>
    activePreset.matchingRecipeIds.includes(v.id)
  );

  return (
    <div className="space-y-6">
      {/* Tab Switcher */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-3">
        <button
          onClick={() => setActiveTab("pantry")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
            activeTab === "pantry"
              ? "bg-emerald-700 text-white shadow-xs"
              : "text-stone-600 hover:bg-stone-100"
          }`}
        >
          <Refrigerator className="w-4 h-4" />
          <span>Tủ lạnh của tôi</span>
        </button>
        <button
          onClick={() => setActiveTab("scan")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
            activeTab === "scan"
              ? "bg-emerald-700 text-white shadow-xs"
              : "text-stone-600 hover:bg-stone-100"
          }`}
        >
          <Camera className="w-4 h-4" />
          <span>Quét ảnh AI & Nhận diện</span>
        </button>
      </div>

      {activeTab === "pantry" ? (
        <PantryManager />
      ) : (
        <div className="space-y-8 animate-in fade-in">
          {/* Demo preset picker */}
          <div className="flex gap-2 flex-wrap items-center">
            <span className="text-xs text-stone-500 mr-1">Bộ nguyên liệu mẫu:</span>
            {SCAN_PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setActivePreset(p);
                  setScanned(false);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                  activePreset.id === p.id
                    ? "bg-emerald-700 text-white"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Upload / Scan zone */}
            <div className="space-y-4">
              <Dropzone
                label={scanned ? "Quét ảnh khác" : "Kéo thả hoặc tải ảnh nguyên liệu / tủ lạnh của bạn"}
                hint="Hỗ trợ JPG, PNG, HEIC — tối đa 12 MB"
                accept="image/*"
                onFileAccepted={handleFileAccepted}
                ctaLabel="Chọn ảnh chụp"
              />

              {!scanned && (
                <button
                  onClick={() => setScanned(true)}
                  className="w-full flex items-center justify-center gap-2 h-11 rounded-xl border border-dashed border-emerald-500 text-emerald-800 text-sm font-semibold hover:bg-emerald-50 transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                  Mô phỏng AI nhận diện với mẫu &ldquo;{activePreset.label}&rdquo;
                </button>
              )}
            </div>

            {/* Detected ingredients */}
            {scanned ? (
              <Card className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-stone-800">
                    Nguyên liệu đã nhận diện thành công
                  </h3>
                  <span className="text-xs text-stone-500 bg-stone-100 px-2.5 py-1 rounded-full font-bold">
                    {activePreset.detected.length} mục
                  </span>
                </div>

                <div className="space-y-2">
                  {activePreset.detected.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-3 bg-stone-50 border border-stone-100 rounded-[12px] px-4 py-3"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-stone-900 truncate">{item.name}</p>
                        <p className="text-xs text-stone-500 mt-0.5">
                          {item.category} · Độ chính xác {Math.round(item.confidence * 100)}%
                        </p>
                      </div>
                      <FreshnessBadge freshness={item.freshness} />
                    </div>
                  ))}
                </div>
              </Card>
            ) : (
              <Card className="p-5 flex flex-col items-center justify-center min-h-[220px] text-center opacity-60">
                <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-6 h-6 text-stone-400" />
                </div>
                <p className="text-sm font-medium text-stone-600">Tải ảnh lên để xem kết quả phân tích nguyên liệu</p>
              </Card>
            )}
          </div>

          {/* Matching Recipes */}
          {scanned && (
            <div className="space-y-4">
              <h3 className="font-semibold text-stone-800">
                Công thức & Video phù hợp
                <span className="ml-2 text-xs font-normal text-stone-500">
                  Dựa trên nguyên liệu vừa phát hiện
                </span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {matchingVideos.map((v) => (
                  <VideoCard key={v.id} video={v} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function PlannerScanPage() {
  const { isGuest, ready } = useRole();

  return (
    <AppShell showRightRail={false}>
      <div className="max-w-[1240px] mx-auto w-full">
        <PageHeader
          eyebrow="TỦ LẠNH THÔNG MINH & SCANNER"
          title="Quản lý Tủ lạnh & Quét nguyên liệu AI"
          subtitle="Theo dõi nguyên liệu sẵn có trong tủ lạnh của bạn với PostgreSQL và sử dụng AI để gợi ý món ăn chuẩn dinh dưỡng ngay tức thì."
        />

        {!ready ? (
          <GatedSkeleton />
        ) : isGuest ? (
          <LockedState reason="guest" />
        ) : (
          <ScanContent />
        )}
      </div>
    </AppShell>
  );
}
