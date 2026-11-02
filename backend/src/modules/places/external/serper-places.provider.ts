import { Injectable, Logger } from '@nestjs/common';
import type { ExternalPlaceItem } from '../places.types';

@Injectable()
export class SerperPlacesProvider {
  private readonly logger = new Logger(SerperPlacesProvider.name);

  async searchNearby(
    lat: number,
    lng: number,
    queryText?: string,
  ): Promise<ExternalPlaceItem[]> {
    const apiKey = process.env.SERPER_API_KEY?.trim();
    if (!apiKey) {
      return [];
    }

    const searchQuery = queryText?.trim()
      ? `${queryText.trim()} chay`
      : 'quán ăn chay';

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 12000);

      const response = await fetch('https://google.serper.dev/places', {
        method: 'POST',
        headers: {
          'X-API-KEY': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: searchQuery,
          ll: `@${lat},${lng},14z`,
          location: 'Ho Chi Minh City, Vietnam',
          gl: 'vn',
          hl: 'vi',
        }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!response.ok) {
        this.logger.warn(`Serper API error status: ${response.status}`);
        return [];
      }

      const data = (await response.json()) as {
        places?: {
          title: string;
          address?: string;
          latitude?: number;
          longitude?: number;
          rating?: number;
          ratingCount?: number;
          category?: string;
          phoneNumber?: string;
          cid?: string;
        }[];
      };

      return (data.places || [])
        .filter((p) => p.title && p.latitude && p.longitude)
        .map((p) => {
          let category = p.category || 'Quán chay';
          const lower = p.title.toLowerCase();
          if (lower.includes('buffet')) category = 'Buffet chay';
          else if (lower.includes('lẩu')) category = 'Lẩu chay';
          else if (lower.includes('cơm')) category = 'Cơm chay';
          else if (lower.includes('nhà hàng')) category = 'Nhà hàng chay';

          return {
            name: p.title,
            address: p.address || null,
            latitude: Number(p.latitude),
            longitude: Number(p.longitude),
            category,
            externalId: p.cid ? `serper:${p.cid}` : `serper:${p.latitude}_${p.longitude}`,
            source: 'serper',
            phoneNumber: p.phoneNumber || null,
            rating: p.rating ? Number(p.rating) : 4.5,
            isOpen: true,
          } as ExternalPlaceItem;
        });
    } catch (err) {
      this.logger.warn(`Serper fetch failed: ${(err as Error).message}`);
      return [];
    }
  }
}

