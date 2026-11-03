import { Injectable, Logger } from '@nestjs/common';
import type { ExternalPlaceItem } from '../places.types';

interface OverpassElement {
  type: 'node' | 'way' | 'relation';
  id: number;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  tags?: Record<string, string>;
}

@Injectable()
export class OsmOverpassProvider {
  private readonly logger = new Logger(OsmOverpassProvider.name);

  // Danh sách các mirror Overpass (dự phòng nếu một node bị quá tải)
  private readonly endpoints = [
    'https://overpass-api.de/api/interpreter',
    'https://lz4.overpass-api.de/api/interpreter',
  ];

  async searchNearby(
    lat: number,
    lng: number,
    radiusMeters: number,
  ): Promise<ExternalPlaceItem[]> {
    // Truy vấn Overpass QL: Tìm quán có tag diet:vegetarian/vegan hoặc tên chứa từ "chay"
    const query = `[out:json][timeout:12];
(
  node["diet:vegetarian"~"yes|only"](around:${radiusMeters},${lat},${lng});
  way["diet:vegetarian"~"yes|only"](around:${radiusMeters},${lat},${lng});
  node["diet:vegan"~"yes|only"](around:${radiusMeters},${lat},${lng});
  way["diet:vegan"~"yes|only"](around:${radiusMeters},${lat},${lng});
  node["amenity"~"restaurant|fast_food|cafe"]["name"~"chay|thuần chay|vegan|vegetarian",i](around:${radiusMeters},${lat},${lng});
  way["amenity"~"restaurant|fast_food|cafe"]["name"~"chay|thuần chay|vegan|vegetarian",i](around:${radiusMeters},${lat},${lng});
);
out center tags;`;

    for (const endpoint of this.endpoints) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 14000);
        try {
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
              'User-Agent': 'VegetMealPlan/1.0 (contact@vegetmealplan.vn)',
              Accept: 'application/json',
            },
            body: 'data=' + encodeURIComponent(query),
            signal: controller.signal,
          });

          if (!response.ok) continue;
          const data = (await response.json()) as { elements?: OverpassElement[] };

          return (data.elements || [])
            .filter((el) => el.tags?.name)
            .map((el) => {
              const elLat = el.lat ?? el.center?.lat ?? 0;
              const elLng = el.lon ?? el.center?.lon ?? 0;
              const tags = el.tags!;
              return {
                name: tags.name!,
                address:
                  [tags['addr:housenumber'], tags['addr:street'], tags['addr:city']]
                    .filter(Boolean)
                    .join(', ') || tags['addr:full'] || null,
                latitude: elLat,
                longitude: elLng,
                category: tags.amenity || 'restaurant',
                externalId: `osm:${el.type}:${el.id}`,
                source: 'osm',
                phoneNumber: tags.phone || tags['contact:phone'] || null,
              } as ExternalPlaceItem;
            });
        } finally {
          clearTimeout(timeout);
        }
      } catch (err) {
        this.logger.warn(`OSM endpoint ${endpoint} failed: ${(err as Error).message}`);
      }
    }
    return [];
  }
}

