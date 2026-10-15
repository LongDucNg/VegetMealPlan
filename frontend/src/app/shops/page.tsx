"use client";

import React, { useState, useEffect } from "react";
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
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Rating } from "@/components/ui/Rating";
import { Badge } from "@/components/ui/Badge";
import { useAuth } from "@/features/auth";
import {
  VEGAN_PLACES,
  SHOP_FILTERS,
  SUGGESTED_FOOD_SPOTS,
  VeganPlace,
  ShopFilter,
  FoodSpotItem,
} from "@/features/places";
import { placeService } from "@/features/places/services/placeService";

function InteractiveMap({
  places,
  selectedPlace,
  onSelectPlace,
}: {
  places: VeganPlace[];
  selectedPlace: VeganPlace | null;
  onSelectPlace: (p: VeganPlace) => void;
}) {
  return (
    <div className="relative h-[360px] w-full rounded-[20px] bg-gradient-to-br from-map-from to-map-to border border-stone-200 overflow-hidden shadow-sm select-none">
      {/* Decorative City Grid Lines & River */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 800 360"
        preserveAspectRatio="none"
        fill="none"
      >
        {/* River */}
        <path
          d="M-20 180 C 180 240, 320 80, 520 220 C 640 290, 740 140, 840 170"
          stroke="white"
          strokeWidth="32"
          strokeOpacity="0.8"
          strokeLinecap="round"
        />
        {/* Major thoroughfares */}
        <path
          d="M60 -20 C 140 140, 280 220, 420 380"
          stroke="white"
          strokeWidth="14"
          strokeOpacity="0.9"
        />
        <path
          d="M-20 90 L 820 120"
          stroke="white"
          strokeWidth="10"
          strokeOpacity="0.75"
        />
        <path
          d="M220 -20 L 260 380"
          stroke="white"
          strokeWidth="8"
          strokeOpacity="0.6"
        />
        <path
          d="M580 -20 L 520 380"
          stroke="white"
          strokeWidth="8"
          strokeOpacity="0.6"
        />
      </svg>

      {/* Pins */}
      {places.map((place) => {
        const isSelected = selectedPlace?.id === place.id;
        return (
          <button
            key={place.id}
            type="button"
            onClick={() => onSelectPlace(place)}
            style={{ left: `${place.x}%`, top: `${place.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-full cursor-pointer group transition-transform hover:scale-110 focus:outline-none"
            aria-label={`Select ${place.name}`}
          >
            {/* Custom SVG Pin */}
            <svg
              viewBox="0 0 24 30"
              width={isSelected ? 32 : 26}
              height={isSelected ? 40 : 32}
              fill="none"
              className="transition-all filter drop-shadow-md"
            >
              <path
                d="M12 0C5.373 0 0 5.373 0 12C0 19.5 12 30 12 30C12 30 24 19.5 24 12C24 5.373 18.627 0 12 0Z"
                className={isSelected ? "fill-amber-500" : "fill-emerald-600"}
              />
              <circle cx="12" cy="11" r="4.5" className="fill-white" />
            </svg>

            {/* Hover Tooltip / Label */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 -top-8 px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap shadow-sm pointer-events-none transition-opacity ${
                isSelected
                  ? "bg-amber-400 text-amber-950 opacity-100 scale-105"
                  : "bg-stone-900/80 text-white opacity-0 group-hover:opacity-100"
              }`}
            >
              {place.name}
            </div>
          </button>
        );
      })}

      {/* Map Corner Info Badge */}
      <div className="absolute left-4 bottom-4 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-stone-200 text-xs font-semibold text-stone-700 shadow-xs flex items-center gap-2">
        <Navigation className="w-3.5 h-3.5 text-emerald-600" />
        <span>Ho Chi Minh City · Central Districts</span>
      </div>
    </div>
  );
}

type PlaceType = "Vegan" | "Vegetarian" | "Grocer" | "Café";

export default function ShopsPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin" || user?.role === "Admin";

  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [filters, setFilters] = useState<readonly string[]>(SHOP_FILTERS);
  const [places, setPlaces] = useState<VeganPlace[]>(VEGAN_PLACES);
  const [selectedPlace, setSelectedPlace] = useState<VeganPlace | null>(VEGAN_PLACES[0]);
  const [suggestedSpots, setSuggestedSpots] = useState<FoodSpotItem[]>(SUGGESTED_FOOD_SPOTS);
  const [loading, setLoading] = useState(false);

  // Admin Modal states (Endpoints 33, 34)
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPlace, setEditingPlace] = useState<VeganPlace | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "Vegan" as PlaceType,
    address: "",
    district: "Quận 1",
    popularDish: "",
    openingHours: "07:00 - 21:00",
    rating: 4.8,
  });

  useEffect(() => {
    placeService.fetchShopFilters().then((f) => {
      if (f && f.length > 0) setFilters(f);
    });
    placeService.fetchSuggestedFoodSpots().then((s) => {
      if (s && s.length > 0) setSuggestedSpots(s);
    });
  }, []);

  useEffect(() => {
    let active = true;
    setLoading(true);
    placeService
      .fetchPlaces(activeFilter as ShopFilter | "All")
      .then((data) => {
        if (!active) return;
        setPlaces(data);
        if (data.length > 0 && (!selectedPlace || !data.some((p) => p.id === selectedPlace.id))) {
          setSelectedPlace(data[0]);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [activeFilter]);

  // Endpoint 30: GET /places/:id
  const handleSelectPlace = async (p: VeganPlace) => {
    setSelectedPlace(p);
    try {
      const detailed = await placeService.fetchPlaceById(p.id);
      if (detailed) {
        setSelectedPlace(detailed);
      }
    } catch {}
  };

  // Admin handlers (Endpoints 33, 34, 35)
  const handleOpenAddModal = () => {
    setEditingPlace(null);
    setFormData({
      name: "",
      type: "Vegan",
      address: "",
      district: "Quận 1",
      popularDish: "",
      openingHours: "07:00 - 21:00",
      rating: 4.8,
    });
    setModalOpen(true);
  };

  const handleOpenEditModal = (p: VeganPlace) => {
    setEditingPlace(p);
    setFormData({
      name: p.name,
      type: p.type,
      address: p.address,
      district: p.district,
      popularDish: p.popularDish,
      openingHours: p.openingHours,
      rating: p.rating,
    });
    setModalOpen(true);
  };

  const handleSavePlace = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.address.trim()) return;

    if (editingPlace) {
      // Endpoint 34: PUT /places/:id
      try {
        const updated = await placeService.updatePlace(editingPlace.id, formData);
        setPlaces((prev) =>
          prev.map((p) => (p.id === editingPlace.id ? { ...p, ...formData, ...updated } : p))
        );
        setSelectedPlace((prev) =>
          prev?.id === editingPlace.id ? { ...prev, ...formData, ...updated } : prev
        );
      } catch {
        setPlaces((prev) =>
          prev.map((p) => (p.id === editingPlace.id ? { ...p, ...formData } : p))
        );
        setSelectedPlace((prev) =>
          prev?.id === editingPlace.id ? { ...prev, ...formData } : prev
        );
      }
    } else {
      // Endpoint 33: POST /places
      const newPlaceData: VeganPlace = {
        id: `custom-${Date.now()}`,
        name: formData.name,
        type: formData.type,
        address: formData.address,
        district: formData.district,
        popularDish: formData.popularDish || "Món chay tự chọn",
        openingHours: formData.openingHours,
        rating: formData.rating,
        reviewsCount: 1,
        distance: "Gần bạn",
        x: 48,
        y: 45,
      };

      try {
        const created = await placeService.createPlace(newPlaceData);
        const item = created?.id ? created : newPlaceData;
        setPlaces((prev) => [item, ...prev]);
        setSelectedPlace(item);
      } catch {
        setPlaces((prev) => [newPlaceData, ...prev]);
        setSelectedPlace(newPlaceData);
      }
    }
    setModalOpen(false);
  };

  const handleDeletePlace = async (p: VeganPlace) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa địa điểm "${p.name}"?`)) return;
    try {
      // Endpoint 35: DELETE /places/:id
      await placeService.deletePlace(p.id);
    } catch {}
    setPlaces((prev) => prev.filter((item) => item.id !== p.id));
    if (selectedPlace?.id === p.id) {
      setSelectedPlace(places.find((item) => item.id !== p.id) || null);
    }
  };

  const filteredPlaces = places;

  return (
    <AppShell>
      <div className="flex flex-col space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <PageHeader
            eyebrow="NEIGHBORHOOD GUIDE"
            title="Nearby vegan & vegetarian spots"
            subtitle="Curated plant-based restaurants, neighborhood grocers, and ethical cafés in Ho Chi Minh City."
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

        {/* Category Filters */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
          {filters.map((f) => (
            <Chip
              key={f}
              variant="filter"
              active={activeFilter === f}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </Chip>
          ))}
        </div>

        {/* Interactive Pure SVG Map */}
        <InteractiveMap
          places={filteredPlaces}
          selectedPlace={selectedPlace}
          onSelectPlace={handleSelectPlace}
        />

        {/* Selected Place Detail Highlight */}
        {selectedPlace && (
          <Card className="p-6 bg-gradient-to-r from-emerald-50/50 to-white border-emerald-200/80">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2.5 mb-1.5">
                  <Badge variant="success">{selectedPlace.type}</Badge>
                  <span className="text-sm font-semibold text-stone-500">
                    {selectedPlace.district} · {selectedPlace.distance} away
                  </span>
                </div>
                <h2 className="font-serif font-bold text-2xl text-stone-900">
                  {selectedPlace.name}
                </h2>
                <p className="mt-1 text-sm text-stone-600">
                  {selectedPlace.address}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 shrink-0">
                <Rating
                  score={selectedPlace.rating}
                  reviewsCount={`${selectedPlace.reviewsCount}`}
                  variant="hero"
                  className="text-stone-900"
                />
                <div className="flex items-center gap-1.5 text-sm text-stone-600">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span>{selectedPlace.openingHours}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-emerald-100/70 flex items-center justify-between gap-2 text-sm text-stone-700">
              <div className="flex items-center gap-2">
                <Utensils className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>
                  <strong>Signature dish:</strong> {selectedPlace.popularDish}
                </span>
              </div>

              {/* Admin Actions for selected place */}
              {isAdmin && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenEditModal(selectedPlace)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    Sửa
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeletePlace(selectedPlace)}
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

        {/* Full Places Directory List */}
        <div>
          <h2 className="font-serif font-bold text-2xl text-stone-900 tracking-tight mb-4">
            All spots ({filteredPlaces.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPlaces.map((place) => (
              <Card
                key={place.id}
                onClick={() => handleSelectPlace(place)}
                className={`p-5 cursor-pointer transition-all ${
                  selectedPlace?.id === place.id
                    ? "border-emerald-600 shadow-sm bg-emerald-50/30"
                    : "hover:border-stone-300"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                        {place.type}
                      </span>
                      <span className="text-xs text-stone-400">
                        {place.distance}
                      </span>
                    </div>
                    <h3 className="font-serif font-bold text-lg text-stone-900 leading-snug">
                      {place.name}
                    </h3>
                    <p className="mt-1 text-xs text-stone-500">
                      {place.address}
                    </p>
                  </div>

                  <Rating score={place.rating} />
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600">
                  <span>Open: {place.openingHours}</span>
                  <span className="text-emerald-700 font-medium">
                    {place.popularDish.split("&")[0]}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Suggested For Section */}
        <section className="pt-6 border-t border-stone-200">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h2 className="font-serif font-bold text-2xl text-stone-900 tracking-tight">
              Where to order recipe matches in Saigon
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {suggestedSpots.map((sug) => (
              <Card key={sug.dish} className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1">
                  CRAVING THIS DISH?
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
      </div>

      {/* Admin Add/Edit Place Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif font-bold text-xl text-stone-900 mb-1">
              {editingPlace ? "Sửa địa điểm quán chay" : "Thêm địa điểm quán chay mới"}
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
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as PlaceType })}
                    className="w-full h-10 px-3 rounded-xl border border-stone-200 text-sm focus:outline-emerald-600 bg-white"
                  >
                    <option value="Vegan">Thuần chay (Vegan)</option>
                    <option value="Vegetarian">Chay (Vegetarian)</option>
                    <option value="Café">Quán Cafe (Café)</option>
                    <option value="Grocer">Cửa hàng thực phẩm (Grocer)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">Khu vực / Quận</label>
                  <input
                    type="text"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    placeholder="Quận 1"
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
                  placeholder="Ví dụ: 38 Huỳnh Khương Ninh, Đa Kao, Quận 1"
                  className="w-full h-10 px-3.5 rounded-xl border border-stone-200 text-sm focus:outline-emerald-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">Món ăn nổi bật</label>
                  <input
                    type="text"
                    value={formData.popularDish}
                    onChange={(e) => setFormData({ ...formData, popularDish: e.target.value })}
                    placeholder="Lẩu nấm tiêu xanh"
                    className="w-full h-10 px-3.5 rounded-xl border border-stone-200 text-sm focus:outline-emerald-600"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">Giờ mở cửa</label>
                  <input
                    type="text"
                    value={formData.openingHours}
                    onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
                    placeholder="07:00 - 21:00"
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
                  <span>{editingPlace ? "Lưu thay đổi" : "Tạo địa điểm"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AppShell>
  );
}
