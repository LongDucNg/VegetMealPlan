'use client';

import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import type { Shop } from '@/types/shop';

export default function PlacesMap({
  userLat,
  userLng,
  radiusKm,
  shops,
  selectedShop,
  onSelectShop,
  height = '420px',
}: {
  userLat: number;
  userLng: number;
  radiusKm: number;
  shops: Shop[];
  selectedShop: Shop | null;
  onSelectShop: (shop: Shop) => void;
  height?: string | number;
}) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const userMarkerRef = useRef<L.LayerGroup | null>(null);

  // Khởi tạo bản đồ Leaflet
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [userLat, userLng],
      zoom: 14,
      scrollWheelZoom: true,
      fadeAnimation: false,
    });

    // Sử dụng OpenStreetMap HOT (Humanitarian OSM): Miễn phí hoàn toàn 100%, KHÔNG CẦN API KEY, không watermark
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      subdomains: ['a', 'b'],
      maxZoom: 19,
    }).addTo(map);

    markersLayerRef.current = L.layerGroup().addTo(map);
    userMarkerRef.current = L.layerGroup().addTo(map);

    mapInstanceRef.current = map;

    // Tự động invalidateSize để các ô bản đồ hiển thị tức thì
    const t1 = setTimeout(() => map.invalidateSize(), 100);
    const t2 = setTimeout(() => map.invalidateSize(), 350);

    const observer = new ResizeObserver(() => {
      map.invalidateSize();
    });
    if (mapContainerRef.current) {
      observer.observe(mapContainerRef.current);
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      observer.disconnect();
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Recenter bản đồ khi tọa độ GPS người dùng thay đổi
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    map.setView([userLat, userLng], 14);
    setTimeout(() => map.invalidateSize(), 150);
  }, [userLat, userLng]);

  // Cập nhật Marker người dùng & vòng tròn bán kính tìm kiếm
  useEffect(() => {
    const map = mapInstanceRef.current;
    const group = userMarkerRef.current;
    if (!map || !group) return;

    group.clearLayers();

    // Icon vị trí người dùng bằng SVG DivIcon
    const userPinIcon = L.divIcon({
      className: 'custom-user-marker',
      html: `
        <div style="display:flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:50%;background:#059669;color:white;box-shadow:0 4px 12px rgba(0,0,0,0.3);border:3px solid white;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
        </div>
      `,
      iconSize: [34, 34],
      iconAnchor: [17, 17],
      popupAnchor: [0, -18],
    });

    const userMarker = L.marker([userLat, userLng], { icon: userPinIcon });
    userMarker.bindPopup(`
      <div style="font-family:sans-serif;font-size:13px;padding:2px;">
        <strong style="color:#059669;">📍 Vị trí của bạn</strong>
        <p style="margin:4px 0 0;color:#666;font-size:11px;">Bán kính tìm kiếm: ${radiusKm}km</p>
      </div>
    `);
    group.addLayer(userMarker);

    // Vòng tròn bán kính tìm kiếm
    const circle = L.circle([userLat, userLng], {
      radius: radiusKm * 1000,
      color: '#059669',
      fillColor: '#10b981',
      fillOpacity: 0.12,
      weight: 2,
    });
    group.addLayer(circle);
  }, [userLat, userLng, radiusKm]);

  // Cập nhật Marker các quán chay
  useEffect(() => {
    const map = mapInstanceRef.current;
    const layer = markersLayerRef.current;
    if (!map || !layer) return;

    layer.clearLayers();

    shops.forEach((shop) => {
      const lat = Number(shop.latitude);
      const lng = Number(shop.longitude);
      if (isNaN(lat) || isNaN(lng) || (lat === 0 && lng === 0)) return;

      const isSelected = selectedShop?.shopId === shop.shopId;

      const pinColor = isSelected ? '#d97706' : '#047857';
      const pinBg = isSelected ? '#fef3c7' : '#ffffff';
      const pinBorder = isSelected ? '#b45309' : '#065f46';
      const size = isSelected ? 38 : 30;

      const shopIcon = L.divIcon({
        className: 'custom-shop-marker',
        html: `
          <div style="display:flex;align-items:center;justify-content:center;width:${size}px;height:${size}px;border-radius:50%;background:${pinBg};color:${pinColor};box-shadow:0 3px 8px rgba(0,0,0,0.25);border:2.5px solid ${pinBorder};cursor:pointer;transition:transform 0.2s;">
            <svg width="${size * 0.55}" height="${size * 0.55}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
              <path d="M7 2v20"/>
              <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>
            </svg>
          </div>
        `,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
        popupAnchor: [0, -size / 2],
      });

      const marker = L.marker([lat, lng], { icon: shopIcon });

      const distText =
        shop.distanceM != null
          ? shop.distanceM < 1000
            ? `${shop.distanceM}m`
            : `${(shop.distanceM / 1000).toFixed(1)}km`
          : '';

      const popupContent = `
        <div style="font-family:sans-serif;min-width:180px;padding:2px;">
          <strong style="color:#065f46;font-size:14px;display:block;">${shop.name}</strong>
          ${shop.address ? `<p style="font-size:11px;color:#666;margin:4px 0 2px;">${shop.address}</p>` : ''}
          ${shop.specialDish ? `<p style="font-size:11px;color:#b45309;margin:2px 0;">🍲 ${shop.specialDish}</p>` : ''}
          ${distText ? `<p style="font-size:11px;font-weight:700;color:#d97706;margin:4px 0;">Cách ${distText}</p>` : ''}
          <div style="margin-top:6px;padding-top:6px;border-top:1px solid #e5e7eb;">
            <a href="https://www.google.com/maps/dir/?api=1&destination=${shop.latitude},${shop.longitude}"
               target="_blank" rel="noopener noreferrer"
               style="font-size:11px;color:#2563eb;font-weight:600;text-decoration:none;">
              📍 Chỉ đường Google Maps →
            </a>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);

      marker.on('click', () => {
        onSelectShop(shop);
      });

      layer.addLayer(marker);
    });
  }, [shops, selectedShop, onSelectShop]);

  return (
    <div
      ref={mapContainerRef}
      style={{
        width: '100%',
        height: height || '420px',
        minHeight: '380px',
        borderRadius: '20px',
        position: 'relative',
        zIndex: 1,
        backgroundColor: '#f3f4f6',
      }}
    />
  );
}
