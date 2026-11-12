"use client";

import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import {
  MapPin,
  Clock,
  Utensils,
  Navigation,
  Sparkles,
  Plus,
  Pencil,
  Trash2,
  X,
  Check,
  Phone,
  Compass,
  Star,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useAuth } from "@/features/auth";
import type { Shop } from "@/types/shop";
import { FoodSpotItem } from "@/features/places";
import { placeService } from "@/features/places/services/placeService";
import ShopCard from "@/components/ShopCard";

// Dynamic import component bản đồ Leaflet để tránh lỗi SSR trên Next.js
const PlacesMap = dynamic(() => import("@/components/PlacesMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[420px] w-full rounded-[20px] bg-stone-100 flex flex-col items-center justify-center border border-stone-200">
      <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin mb-2" />
      <p className="text-sm text-stone-500 font-medium">Đang tải bản đồ OpenStreetMap...</p>
    </div>
  ),
});

const DEFAULT_COORDS = { lat: 10.776889, lng: 106.695345 }; // Trung tâm TP.HCM
const RADIUS_OPTIONS = [2, 5, 10, 20];

export default function ShopsPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin" || user?.role === "Admin";

  // Tọa độ người dùng & cài đặt tìm kiếm
  const [coords, setCoords] = useState(DEFAULT_COORDS);
  const [radiusKm, setRadiusKm] = useState<number>(5);

  // Dữ liệu quán ăn
  const [shops, setShops] = useState<Shop[]>([]);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [gpsLoading, setGpsLoading] = useState<boolean>(false);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [gpsSuccess, setGpsSuccess] = useState<boolean>(false);

  // Gợi ý món
  const [suggestedSpots, setSuggestedSpots] = useState<FoodSpotItem[]>([]);

  // Admin Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [editingShop, setEditingShop] = useState<Shop | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "Vegan",
    address: "",
    latitude: 10.7769,
    longitude: 106.6983,
    specialDish: "",
    phoneNumber: "",
    rating: 4.8,
  });

  // ── 1. Lấy vị trí GPS từ trình duyệt ──────────────────────────
  const requestGps = useCallback(() => {
    if (typeof window === "undefined" || !("geolocation" in navigator)) {
      setGpsError("Trình duyệt không hỗ trợ Geolocation GPS.");
      return;
    }

    setGpsLoading(true);
    setGpsError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setGpsLoading(false);
        setGpsSuccess(true);
        setGpsError(null);
      },
      (err) => {
        console.warn("Lỗi GPS:", err.message);
        setGpsLoading(false);
        setGpsSuccess(false);
        setGpsError("Không thể lấy vị trí GPS tự động. Đang dùng vị trí mặc định (TP.HCM).");
      },
      { timeout: 10000, maximumAge: 60000, enableHighAccuracy: true }
    );
  }, []);

  useEffect(() => {
    requestGps();
  }, [requestGps]);

  // ── 2. Nạp danh sách gợi ý món ăn ──────────────────────────
  useEffect(() => {
    placeService.fetchSuggestedFoodSpots().then((s) => {
      if (s && s.length > 0) setSuggestedSpots(s);
    });
  }, []);

  // ── 3. Gọi Backend tìm quán xung quanh (Haversine + OSM + Cache) ──
  const fetchNearby = useCallback(async () => {
    setLoading(true);
    try {
      const res = await placeService.fetchNearbyPlaces({
        lat: coords.lat,
        lng: coords.lng,
        radiusKm,
      });

      const fetchedShops = res.items || [];
      setShops(fetchedShops);

      if (fetchedShops.length > 0) {
        setSelectedShop((prev) => {
          if (prev && fetchedShops.some((s) => s.shopId === prev.shopId)) {
            return fetchedShops.find((s) => s.shopId === prev.shopId) || fetchedShops[0];
          }
          return fetchedShops[0];
        });
      } else {
        setSelectedShop(null);
      }
    } catch (err) {
      console.error("Lỗi khi tải quán lân cận:", err);
      setShops([]);
      setSelectedShop(null);
    } finally {
      setLoading(false);
    }
  }, [coords, radiusKm]);

  useEffect(() => {
    fetchNearby();
  }, [fetchNearby]);

  // ── 4. Admin CRUD Handlers ────────────────────────────────────
  const handleOpenAddModal = () => {
    setEditingShop(null);
    setFormData({
      name: "",
      category: "Vegan",
      address: "",
      latitude: coords.lat,
      longitude: coords.lng,
      specialDish: "",
      phoneNumber: "",
      rating: 4.8,
    });
    setModalOpen(true);
  };

  const handleOpenEditModal = (shop: Shop) => {
    setEditingShop(shop);
    setFormData({
      name: shop.name,
      category: shop.category || "Vegan",
      address: shop.address || "",
      latitude: Number(shop.latitude),
      longitude: Number(shop.longitude),
      specialDish: shop.specialDish || "",
      phoneNumber: shop.phoneNumber || "",
      rating: Number(shop.rating || 4.5),
    });
    setModalOpen(true);
  };

  const handleSavePlace = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.address.trim()) return;

    try {
      if (editingShop) {
        await placeService.updatePlace(String(editingShop.shopId), {
          name: formData.name,
          address: formData.address,
          latitude: formData.latitude,
          longitude: formData.longitude,
          type: formData.category as any,
          popularDish: formData.specialDish,
          phoneNumber: formData.phoneNumber,
          rating: formData.rating,
        });
      } else {
        await placeService.createPlace({
          name: formData.name,
          address: formData.address,
          latitude: formData.latitude,
          longitude: formData.longitude,
          type: formData.category as any,
          popularDish: formData.specialDish,
          phoneNumber: formData.phoneNumber,
          rating: formData.rating,
        });
      }
      setModalOpen(false);
      fetchNearby();
    } catch (err) {
      console.error("Lưu địa điểm thất bại:", err);
      alert("Không thể lưu địa điểm, vui lòng kiểm tra lại quyền.");
    }
  };

  const handleDeletePlace = async (shop: Shop) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa quán "${shop.name}"?`)) return;
    try {
      await placeService.deletePlace(String(shop.shopId));
      fetchNearby();
    } catch (err) {
      console.error("Xóa thất bại:", err);
      alert("Không thể xóa địa điểm.");
    }
  };

  return (
    <AppShell>
      <div className="flex flex-col space-y-6 max-w-7xl mx-auto pb-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <PageHeader
            eyebrow="BẢN ĐỒ ĂN UỐNG"
            title="Quán chay & địa điểm thuần chay gần bạn"
            subtitle="Khám phá nhà hàng chay, quán cơm chay thanh tịnh, siêu thị thực phẩm sạch và quán café thân thiện gần vị trí của bạn."
          />
          {isAdmin && (
            <button
              type="button"
              onClick={handleOpenAddModal}
              className="flex items-center gap-2 h-10 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs transition-colors shrink-0 self-start sm:self-auto cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm địa điểm (Admin)</span>
            </button>
          )}
        </div>

        {/* Thanh bộ lọc chỉ để BÁN KÍNH & VỊ TRÍ GPS */}
        <div className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          {/* Bộ lọc bán kính */}
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-semibold text-stone-700">Bán kính:</span>
            <div className="flex gap-1.5">
              {RADIUS_OPTIONS.map((r) => (
                <button
                  key={r}
                  onClick={() => setRadiusKm(r)}
                  className={`px-3.5 py-1.5 text-xs rounded-full font-semibold transition cursor-pointer ${
                    radiusKm === r
                      ? "bg-emerald-700 text-white shadow-xs"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  }`}
                >
                  {r}km
                </button>
              ))}
            </div>
          </div>

          {/* Nút & trạng thái định vị GPS */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            {gpsSuccess && !gpsError && (
              <span className="text-xs text-stone-500 hidden md:inline">
                Tọa độ: ({coords.lat.toFixed(4)}, {coords.lng.toFixed(4)})
              </span>
            )}
            <button
              type="button"
              onClick={requestGps}
              disabled={gpsLoading}
              title="Cập nhật vị trí GPS hiện tại"
              className="h-9 px-3.5 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-medium shrink-0 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Compass className={`w-4 h-4 text-emerald-600 ${gpsLoading ? "animate-spin" : ""}`} />
              <span>{gpsLoading ? "Đang định vị..." : "Định vị vị trí của tôi"}</span>
            </button>
          </div>
        </div>

        {/* Cảnh báo GPS lỗi nếu có */}
        {gpsError && (
          <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-center justify-between">
            <span>{gpsError}</span>
            <button
              type="button"
              onClick={requestGps}
              className="font-semibold text-emerald-800 hover:underline cursor-pointer ml-2 shrink-0"
            >
              Thử lại GPS
            </button>
          </div>
        )}

        {/* ── BẢN ĐỒ TƯƠNG TÁC OPENSTREETMAP (LEAFLET) ── */}
        <div className="relative w-full rounded-[20px] overflow-hidden border border-stone-200 shadow-sm bg-stone-100">
          <PlacesMap
            userLat={coords.lat}
            userLng={coords.lng}
            radiusKm={radiusKm}
            shops={shops}
            selectedShop={selectedShop}
            onSelectShop={setSelectedShop}
            height="420px"
          />

          {/* Badge góc bản đồ */}
          <div className="absolute left-4 bottom-4 z-20 bg-white/95 backdrop-blur-xs px-3.5 py-1.5 rounded-xl border border-stone-200 text-xs font-semibold text-stone-800 shadow-md flex items-center gap-2">
            <Navigation className="w-3.5 h-3.5 text-emerald-700" />
            <span>
              {loading
                ? `Đang quét quán trong ${radiusKm}km...`
                : shops.length > 0
                ? `Tìm thấy ${shops.length} quán trong ${radiusKm}km`
                : `Không tìm thấy quán nào trong ${radiusKm}km`}
            </span>
          </div>
        </div>

        {/* ── QUÁN ĐƯỢC CHỌN (DETAIL HIGHLIGHT CARD) ── */}
        {selectedShop && (
          <Card className="p-6 bg-gradient-to-r from-emerald-50/60 to-white border-emerald-200/90 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2.5 mb-1.5">
                  <Badge variant="success">
                    {selectedShop.category || "Quán chay"}
                  </Badge>
                  {selectedShop.distanceM != null && (
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100/90 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <Navigation className="w-3 h-3" />
                      Cách {selectedShop.distanceM < 1000
                        ? `${selectedShop.distanceM}m`
                        : `${(selectedShop.distanceM / 1000).toFixed(1)}km`}
                    </span>
                  )}
                  <span
                    className={`text-xs font-medium flex items-center gap-1 ${
                      selectedShop.isOpen ? "text-emerald-700" : "text-stone-500"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${selectedShop.isOpen ? "bg-emerald-600" : "bg-stone-400"}`} />
                    {selectedShop.isOpen ? "Đang mở cửa" : "Tạm đóng cửa"}
                  </span>
                </div>

                <h2 className="font-serif font-bold text-2xl text-stone-900 leading-snug">
                  {selectedShop.name}
                </h2>
                {selectedShop.address && (
                  <p className="mt-1 text-sm text-stone-600 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{selectedShop.address}</span>
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
                <div className="flex items-center gap-1.5 font-bold text-base text-stone-900">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400 shrink-0" />
                  <span>{Number(selectedShop.rating || 4.5).toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${selectedShop.latitude},${selectedShop.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs transition"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Chỉ đường Google Maps</span>
                  </a>
                  {selectedShop.phoneNumber && (
                    <a
                      href={`tel:${selectedShop.phoneNumber}`}
                      className="p-2 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs"
                      title="Gọi điện thoại"
                    >
                      <Phone className="w-4 h-4 text-emerald-700" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-emerald-100 flex items-center justify-between gap-2 text-sm text-stone-700">
              <div className="flex items-center gap-2">
                <Utensils className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>
                  <strong>Món đặc trưng:</strong>{" "}
                  {selectedShop.specialDish || "Đậu hũ sốt nấm, cơm chay tự chọn"}
                </span>
              </div>

              {/* Admin Actions */}
              {isAdmin && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenEditModal(selectedShop)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    Sửa
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeletePlace(selectedShop)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Xóa
                  </button>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* ── DANH SÁCH QUÁN XUNG QUANH (HAVERSINE REAL DISTANCE) ── */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif font-bold text-2xl text-stone-900 tracking-tight">
              Quán ăn trong bán kính {radiusKm}km ({shops.length})
            </h2>
            <span className="text-xs text-stone-500">
              Sắp xếp theo khoảng cách gần nhất
            </span>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-stone-100 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : shops.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-stone-200">
              <p className="text-base font-semibold text-stone-800">
                Không tìm thấy quán chay nào trong bán kính {radiusKm}km
              </p>
              <p className="text-xs text-stone-500 mt-1">
                Thử mở rộng bán kính tìm kiếm để xem thêm các quán lân cận.
              </p>
              <button
                type="button"
                onClick={() => setRadiusKm((r) => Math.min(r + 5, 30))}
                className="mt-4 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs cursor-pointer transition inline-flex items-center gap-1.5"
              >
                <span>Mở rộng lên {Math.min(radiusKm + 5, 30)}km</span>
                <Navigation className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {shops.map((shop) => (
                <ShopCard
                  key={shop.shopId}
                  shop={shop}
                  isSelected={selectedShop?.shopId === shop.shopId}
                  onClick={() => setSelectedShop(shop)}
                />
              ))}
            </div>
          )}
        </div>

        {/* ── GỢI Ý MÓN ĂN CHUẨN VỊ ── */}
        {suggestedSpots.length > 0 && (
          <section className="pt-6 border-t border-stone-200">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <h2 className="font-serif font-bold text-2xl text-stone-900 tracking-tight">
                Gợi ý quán chay chuẩn vị theo món ăn
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {suggestedSpots.map((sug) => (
                <Card key={sug.dish} className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1">
                    BẠN ĐANG THÈM MÓN NÀY?
                  </p>
                  <h3 className="font-serif font-bold text-lg text-stone-900 mb-3">
                    {sug.dish}
                  </h3>
                  <div className="space-y-2">
                    {sug.places.map((p) => (
                      <div
                        key={p.name}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 text-sm"
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span className="font-medium text-stone-900">{p.name}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-stone-500">
                          <span>{p.distance}</span>
                          <span className="font-semibold text-emerald-800">{p.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* ── MODAL THÊM / SỬA ĐỊA ĐIỂM (ADMIN) ── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif font-bold text-xl text-stone-900 mb-1">
              {editingShop ? "Sửa địa điểm quán chay" : "Thêm địa điểm quán chay mới"}
            </h3>
            <p className="text-xs text-stone-500 mb-5">
              Cập nhật cơ sở dữ liệu các điểm ăn chay cho cộng đồng
            </p>

            <form onSubmit={handleSavePlace} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Tên quán *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ví dụ: Quán Chay Hoa Đăng"
                  className="w-full h-10 px-3.5 rounded-xl border border-stone-200 text-sm focus:outline-emerald-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">Loại hình</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl border border-stone-200 text-sm focus:outline-emerald-600 bg-white"
                  >
                    <option value="Vegan">Thuần chay (Vegan)</option>
                    <option value="Vegetarian">Chay (Vegetarian)</option>
                    <option value="Café">Quán Cafe (Café)</option>
                    <option value="Grocer">Cửa hàng thực phẩm (Grocer)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">Số điện thoại</label>
                  <input
                    type="text"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    placeholder="028 3823 4567"
                    className="w-full h-10 px-3.5 rounded-xl border border-stone-200 text-sm focus:outline-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Địa chỉ chi tiết *</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Ví dụ: 38 Huỳnh Khương Ninh, Đa Kao, Quận 1, TP.HCM"
                  className="w-full h-10 px-3.5 rounded-xl border border-stone-200 text-sm focus:outline-emerald-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">Vĩ độ (Latitude)</label>
                  <input
                    type="number"
                    step="0.0000001"
                    value={formData.latitude}
                    onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value) || 0 })}
                    className="w-full h-10 px-3.5 rounded-xl border border-stone-200 text-sm focus:outline-emerald-600"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">Kinh độ (Longitude)</label>
                  <input
                    type="number"
                    step="0.0000001"
                    value={formData.longitude}
                    onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) || 0 })}
                    className="w-full h-10 px-3.5 rounded-xl border border-stone-200 text-sm focus:outline-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">Món ăn nổi bật</label>
                  <input
                    type="text"
                    value={formData.specialDish}
                    onChange={(e) => setFormData({ ...formData, specialDish: e.target.value })}
                    placeholder="Lẩu nấm tiêu xanh"
                    className="w-full h-10 px-3.5 rounded-xl border border-stone-200 text-sm focus:outline-emerald-600"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">Đánh giá (Rating)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) || 4.5 })}
                    className="w-full h-10 px-3.5 rounded-xl border border-stone-200 text-sm focus:outline-emerald-600"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 h-10 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 h-10 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingShop ? "Lưu thay đổi" : "Tạo địa điểm"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AppShell>
  );
}
