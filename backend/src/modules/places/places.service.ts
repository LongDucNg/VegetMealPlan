import { DataSource } from 'typeorm';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { OsmOverpassProvider } from './external/osm-overpass.provider';
import { SerperPlacesProvider } from './external/serper-places.provider';
import type {
  ExternalPlaceItem,
  NearbyPlacesFilter,
  ShopView,
  SpatialCacheCell,
} from './places.types';
import { CreatePlaceDto } from './places.dto';

@Injectable()
export class PlacesService {
  private readonly logger = new Logger(PlacesService.name);

  constructor(
    private readonly dataSource: DataSource,
    private readonly osmProvider: OsmOverpassProvider,
    private readonly serperProvider: SerperPlacesProvider,
  ) {}

  // Chia không gian thành lưới ô ~2.2km (bước 0.02 độ)
  private computeCellKey(lat: number, lng: number) {
    const step = 0.02;
    const centerLat = Number((Math.round(lat / step) * step).toFixed(2));
    const centerLng = Number((Math.round(lng / step) * step).toFixed(2));
    return {
      cellKey: `${centerLat.toFixed(2)}_${centerLng.toFixed(2)}`,
      centerLat,
      centerLng,
    };
  }

  async getNearbyPlaces(filter: NearbyPlacesFilter): Promise<{ items: ShopView[] }> {
    const radiusKm = filter.radiusKm ?? 5;
    const { cellKey, centerLat, centerLng } = this.computeCellKey(filter.lat, filter.lng);

    // ── Bước 1: Kiểm tra Spatial Cache ──────────────────────────────
    const cached = await this.dataSource.query<SpatialCacheCell[]>(
      `SELECT cell_key AS "cellKey", fetched_radius_km AS "fetchedRadiusKm", expires_at AS "expiresAt"
       FROM public.spatial_cache_cells
       WHERE cell_key = $1 AND expires_at > NOW()`,
      [cellKey],
    );

    const isCacheHit = cached.length > 0 && Number(cached[0].fetchedRadiusKm) >= radiusKm;

    if (!isCacheHit) {
      // ── Bước 2: CACHE MISS → Cào dữ liệu từ Serper (Google Places) hoặc OpenStreetMap ─────────
      const fetchRadiusKm = Math.max(radiusKm, 5); // Luôn fetch tối thiểu 5km để làm ấm cache
      this.logger.log(`Cache MISS for cell ${cellKey}. Fetching external places (radius: ${fetchRadiusKm}km)...`);

      let externalPlaces: ExternalPlaceItem[] = [];

      // Ưu tiên 1: Serper.dev (Google Places) nếu có SERPER_API_KEY
      if (process.env.SERPER_API_KEY?.trim()) {
        try {
          this.logger.log(`Fetching Google Places via Serper for cell ${cellKey}...`);
          externalPlaces = await this.serperProvider.searchNearby(filter.lat, filter.lng, filter.dish);
          this.logger.log(`Serper returned ${externalPlaces.length} places for cell ${cellKey}`);
        } catch (err) {
          this.logger.warn(`Serper fetch error: ${(err as Error).message}`);
        }
      }

      // Ưu tiên 2 (Fallback): OpenStreetMap Overpass API
      if (externalPlaces.length === 0) {
        try {
          this.logger.log(`Fetching OSM for cell ${cellKey} (radius: ${fetchRadiusKm}km)...`);
          externalPlaces = await this.osmProvider.searchNearby(filter.lat, filter.lng, fetchRadiusKm * 1000);
          this.logger.log(`OSM returned ${externalPlaces.length} places for cell ${cellKey}`);
        } catch (err) {
          this.logger.warn(`OSM fetch failed: ${(err as Error).message}`);
        }
      }

      // ── Bước 3: Upsert quán vào DB ────────────────────────────────
      for (const place of externalPlaces) {
        if (!place.latitude || !place.longitude) continue;
        try {
          await this.dataSource.query(
            `INSERT INTO public.shop
               (name, address, latitude, longitude, category, source, external_id, external_place_id,
                phone_number, rating, is_open, cached_at)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$7,$8,$9,$10,NOW())
             ON CONFLICT (external_id) DO UPDATE SET
               name = EXCLUDED.name,
               address = COALESCE(EXCLUDED.address, public.shop.address),
               latitude = EXCLUDED.latitude,
               longitude = EXCLUDED.longitude,
               cached_at = NOW()`,
            [
              place.name,
              place.address ?? null,
              place.latitude,
              place.longitude,
              place.category ?? 'restaurant',
              place.source,
              place.externalId,
              place.phoneNumber ?? null,
              place.rating ?? 4.2,
              place.isOpen ?? true,
            ],
          );
        } catch {
          // Bỏ qua lỗi upsert từng quán, không làm gián đoạn request
        }
      }

      // ── Bước 4: Lưu/Cập nhật cache cell (TTL 30 ngày) ────────────
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 30);
      await this.dataSource.query(
        `INSERT INTO public.spatial_cache_cells
           (cell_key, center_lat, center_lng, fetched_radius_km, shops_found, expires_at)
         VALUES ($1,$2,$3,$4,$5,$6)
         ON CONFLICT (cell_key) DO UPDATE SET
           fetched_radius_km = GREATEST(public.spatial_cache_cells.fetched_radius_km, EXCLUDED.fetched_radius_km),
           shops_found = EXCLUDED.shops_found,
           expires_at = EXCLUDED.expires_at`,
        [cellKey, centerLat, centerLng, fetchRadiusKm, externalPlaces.length, expiresAt],
      );
    } else {
      this.logger.log(`Cache HIT for cell ${cellKey}`);
    }

    // ── Bước 5: Truy vấn DB với công thức Haversine ───────────────
    const radiusMeters = radiusKm * 1000;
    const dishParam = filter.dish ? `%${filter.dish.trim()}%` : null;
    const categoryParam = filter.category ? `%${filter.category.trim()}%` : null;

    const rows = await this.dataSource.query<any[]>(
      `SELECT
         shop_id         AS "shopId",
         name,
         address,
         latitude,
         longitude,
         category,
         categories,
         special_dish    AS "specialDish",
         suggested_dishes AS "suggestedDishes",
         phone_number    AS "phoneNumber",
         rating,
         is_open         AS "isOpen",
         source,
         ROUND(
           6371000 * acos(
             LEAST(1.0, GREATEST(-1.0,
               cos(radians($1)) * cos(radians(latitude)) * cos(radians(longitude) - radians($2)) +
               sin(radians($1)) * sin(radians(latitude))
             ))
           )
         ) AS "distanceM"
       FROM public.shop
       WHERE latitude IS NOT NULL AND longitude IS NOT NULL
         AND ($4::text IS NULL OR name ILIKE $4 OR category ILIKE $4 OR special_dish ILIKE $4)
         AND ($5::text IS NULL OR category ILIKE $5)
         AND (
           6371000 * acos(
             LEAST(1.0, GREATEST(-1.0,
               cos(radians($1)) * cos(radians(latitude)) * cos(radians(longitude) - radians($2)) +
               sin(radians($1)) * sin(radians(latitude))
             ))
           )
         ) <= $3
       ORDER BY
         CASE WHEN $4::text IS NOT NULL AND (special_dish ILIKE $4 OR name ILIKE $4) THEN 0 ELSE 1 END,
         "distanceM" ASC
       LIMIT 50`,
      [filter.lat, filter.lng, radiusMeters, dishParam, categoryParam],
    );

    const items: ShopView[] = rows.map((r) => this.mapRowToShopView(r));

    // Chỉ trả về các quán trong phạm vi bán kính đã chọn (distanceM <= radiusMeters),
    // sắp xếp từ gần nhất đến xa nhất. Đảm bảo bán kính lớn luôn bao trùm bán kính nhỏ.
    return { items };
  }

  // Lấy danh sách toàn bộ quán (hỗ trợ filter theo category/type hoặc từ khóa)
  async getAllPlaces(type?: string, q?: string): Promise<ShopView[]> {
    let sql = `
      SELECT
        shop_id         AS "shopId",
        name,
        address,
        latitude,
        longitude,
        category,
        categories,
        special_dish    AS "specialDish",
        suggested_dishes AS "suggestedDishes",
        phone_number    AS "phoneNumber",
        rating,
        is_open         AS "isOpen",
        source,
        NULL            AS "distanceM"
      FROM public.shop
      WHERE 1=1
    `;
    const params: any[] = [];

    if (type && type !== 'All') {
      params.push(`%${type}%`);
      sql += ` AND category ILIKE $${params.length}`;
    }

    if (q && q.trim()) {
      params.push(`%${q.trim()}%`);
      sql += ` AND (name ILIKE $${params.length} OR address ILIKE $${params.length} OR special_dish ILIKE $${params.length})`;
    }

    sql += ` ORDER BY rating DESC, shop_id ASC LIMIT 100`;

    const rows = await this.dataSource.query<any[]>(sql, params);
    return rows.map((r) => this.mapRowToShopView(r));
  }

  async getPlaceById(id: number): Promise<ShopView> {
    const rows = await this.dataSource.query<any[]>(
      `SELECT
         shop_id         AS "shopId",
         name,
         address,
         latitude,
         longitude,
         category,
         categories,
         special_dish    AS "specialDish",
         suggested_dishes AS "suggestedDishes",
         phone_number    AS "phoneNumber",
         rating,
         is_open         AS "isOpen",
         source,
         NULL            AS "distanceM"
       FROM public.shop
       WHERE shop_id = $1`,
      [id],
    );

    if (!rows.length) {
      throw new NotFoundException(`Không tìm thấy quán với ID ${id}`);
    }

    return this.mapRowToShopView(rows[0]);
  }

  getFilters(): string[] {
    return ['All', 'Vegan', 'Vegetarian', 'Café', 'Grocer'];
  }

  async getSuggestedFoodSpots(): Promise<any[]> {
    return [
      {
        dish: 'Phở & Bún bò chay',
        places: [
          { name: 'Hum Vegetarian', distance: '1.2 km', price: '75.000đ - 120.000đ' },
          { name: 'Quán Chay Hoa Sen', distance: '1.5 km', price: '45.000đ - 65.000đ' },
        ],
      },
      {
        dish: 'Cơm tấm sườn bì chả chay',
        places: [
          { name: 'Cơm Chay Bà Ngoại', distance: '2.1 km', price: '35.000đ - 50.000đ' },
          { name: 'Chay Garden', distance: '2.4 km', price: '55.000đ - 85.000đ' },
        ],
      },
      {
        dish: 'Lẩu nấm & Buffet chay',
        places: [
          { name: 'Buffet Chay Liên Hoa', distance: '3.0 km', price: '120.000đ - 180.000đ' },
          { name: 'Nhà Hàng Phúc Lộc Thọ', distance: '1.8 km', price: '150.000đ - 250.000đ' },
        ],
      },
    ];
  }

  async createPlace(dto: CreatePlaceDto): Promise<ShopView> {
    const lat = dto.latitude ?? 10.776889;
    const lng = dto.longitude ?? 106.695345;
    const extId = `manual:${Date.now()}`;

    const rows = await this.dataSource.query<any[]>(
      `INSERT INTO public.shop
         (name, address, latitude, longitude, category, special_dish, phone_number, rating, is_open, source, external_id, cached_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'manual', $10, NOW())
       RETURNING shop_id AS "shopId", name, address, latitude, longitude, category, special_dish AS "specialDish",
                 phone_number AS "phoneNumber", rating, is_open AS "isOpen", source`,
      [
        dto.name,
        dto.address ?? null,
        lat,
        lng,
        dto.category ?? 'Vegan',
        dto.specialDish ?? null,
        dto.phoneNumber ?? null,
        dto.rating ?? 4.5,
        dto.isOpen ?? true,
        extId,
      ],
    );

    return this.mapRowToShopView(rows[0]);
  }

  async updatePlace(id: number, dto: Partial<CreatePlaceDto>): Promise<ShopView> {
    const updates: string[] = [];
    const params: any[] = [id];

    if (dto.name !== undefined) {
      params.push(dto.name);
      updates.push(`name = $${params.length}`);
    }
    if (dto.address !== undefined) {
      params.push(dto.address);
      updates.push(`address = $${params.length}`);
    }
    if (dto.latitude !== undefined) {
      params.push(dto.latitude);
      updates.push(`latitude = $${params.length}`);
    }
    if (dto.longitude !== undefined) {
      params.push(dto.longitude);
      updates.push(`longitude = $${params.length}`);
    }
    if (dto.category !== undefined) {
      params.push(dto.category);
      updates.push(`category = $${params.length}`);
    }
    if (dto.specialDish !== undefined) {
      params.push(dto.specialDish);
      updates.push(`special_dish = $${params.length}`);
    }
    if (dto.phoneNumber !== undefined) {
      params.push(dto.phoneNumber);
      updates.push(`phone_number = $${params.length}`);
    }
    if (dto.rating !== undefined) {
      params.push(dto.rating);
      updates.push(`rating = $${params.length}`);
    }
    if (dto.isOpen !== undefined) {
      params.push(dto.isOpen);
      updates.push(`is_open = $${params.length}`);
    }

    if (!updates.length) {
      return this.getPlaceById(id);
    }

    const rows = await this.dataSource.query<any[]>(
      `UPDATE public.shop
       SET ${updates.join(', ')}, cached_at = NOW()
       WHERE shop_id = $1
       RETURNING shop_id AS "shopId", name, address, latitude, longitude, category, special_dish AS "specialDish",
                 phone_number AS "phoneNumber", rating, is_open AS "isOpen", source`,
      params,
    );

    if (!rows.length) {
      throw new NotFoundException(`Không tìm thấy quán với ID ${id}`);
    }

    return this.mapRowToShopView(rows[0]);
  }

  async deletePlace(id: number): Promise<{ success: boolean }> {
    const res = await this.dataSource.query(`DELETE FROM public.shop WHERE shop_id = $1`, [id]);
    return { success: true };
  }

  private mapRowToShopView(r: any): ShopView {
    return {
      shopId: Number(r.shopId),
      name: r.name,
      address: r.address || null,
      latitude: Number(r.latitude),
      longitude: Number(r.longitude),
      distanceM: r.distanceM != null ? Number(r.distanceM) : null,
      category: r.category || null,
      categories: Array.isArray(r.categories) ? r.categories : null,
      specialDish: r.specialDish || null,
      suggestedDishes: Array.isArray(r.suggestedDishes) ? r.suggestedDishes : null,
      phoneNumber: r.phoneNumber || null,
      rating: r.rating != null ? Number(r.rating) : null,
      isOpen: r.isOpen ?? true,
      source: r.source || 'osm',
    };
  }
}
