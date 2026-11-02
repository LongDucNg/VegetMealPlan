'use client';

import React from 'react';
import type { Shop } from '@/types/shop';
import { MapPin, Phone, Navigation } from 'lucide-react';

function StarRating({ rating }: { rating: number }) {
  const stars = Math.min(5, Math.max(0, Math.round(rating)));
  return (
    <span className="text-amber-500 text-xs flex items-center gap-0.5">
      {'★'.repeat(stars)}
      {'☆'.repeat(5 - stars)}
      <span className="text-stone-600 font-semibold ml-1">{rating.toFixed(1)}</span>
    </span>
  );
}

export default function ShopCard({
  shop,
  isSelected,
  onClick,
}: {
  shop: Shop;
  isSelected: boolean;
  onClick: () => void;
}) {
  const distLabel =
    shop.distanceM == null
      ? null
      : shop.distanceM < 1000
      ? `${shop.distanceM}m`
      : `${(shop.distanceM / 1000).toFixed(1)}km`;

  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
        isSelected
          ? 'border-emerald-600 bg-emerald-50/50 shadow-md ring-1 ring-emerald-600'
          : 'border-stone-200 hover:border-emerald-400 bg-white hover:shadow-sm'
      }`}
    >
      {/* Header: Tên quán + Khoảng cách */}
      <div className="flex justify-between items-start gap-2">
        <h3 className="font-semibold text-stone-900 text-base leading-snug flex-1">
          {shop.name}
        </h3>
        {distLabel && (
          <span className="shrink-0 text-xs font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <Navigation className="w-3 h-3" />
            {distLabel}
          </span>
        )}
      </div>

      {/* Phân loại + Trạng thái mở cửa */}
      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
        {shop.category && (
          <span className="text-xs text-emerald-800 bg-emerald-50 font-medium px-2 py-0.5 rounded-md">
            {shop.category}
          </span>
        )}
        <span
          className={`text-xs font-semibold flex items-center gap-1 ${
            shop.isOpen ? 'text-emerald-700' : 'text-red-500'
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${shop.isOpen ? 'bg-emerald-600' : 'bg-red-500'}`} />
          {shop.isOpen ? 'Đang mở' : 'Đóng cửa'}
        </span>
      </div>

      {/* Địa chỉ */}
      {shop.address && (
        <p className="text-xs text-stone-500 mt-2 line-clamp-1 flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
          <span>{shop.address}</span>
        </p>
      )}

      {/* Rating */}
      {shop.rating != null && (
        <div className="mt-2">
          <StarRating rating={Number(shop.rating)} />
        </div>
      )}

      {/* Món nổi bật */}
      {shop.specialDish && (
        <p className="text-xs text-amber-800 bg-amber-50/80 border border-amber-200/50 rounded-lg p-1.5 mt-2">
          🍲 <span className="font-medium">Món đặc trưng: {shop.specialDish}</span>
        </p>
      )}

      {/* Action buttons */}
      <div className="flex items-center gap-4 mt-3 pt-2.5 border-t border-stone-100">
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${shop.latitude},${shop.longitude}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline flex items-center gap-1"
        >
          📍 Chỉ đường Google Maps
        </a>
        {shop.phoneNumber && (
          <a
            href={`tel:${shop.phoneNumber}`}
            onClick={(e) => e.stopPropagation()}
            className="text-xs font-semibold text-stone-600 hover:text-stone-900 hover:underline flex items-center gap-1"
          >
            <Phone className="w-3 h-3" />
            {shop.phoneNumber}
          </a>
        )}
      </div>
    </div>
  );
}

