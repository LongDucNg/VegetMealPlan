import { Test, TestingModule } from '@nestjs/testing';
import { PlacesService } from './places.service';
import { OsmOverpassProvider } from './external/osm-overpass.provider';
import { SerperPlacesProvider } from './external/serper-places.provider';
import { DataSource } from 'typeorm';

describe('PlacesService', () => {
  let service: PlacesService;
  let dataSource: Partial<DataSource>;
  let osmProvider: Partial<OsmOverpassProvider>;
  let serperProvider: Partial<SerperPlacesProvider>;

  beforeEach(async () => {
    dataSource = {
      query: jest.fn().mockImplementation(async (sql: string) => {
        if (sql.includes('spatial_cache_cells')) {
          return [{ cell_key: '10.78_106.70', fetched_radius_km: 5, expires_at: new Date(Date.now() + 86400000) }];
        }
        if (sql.includes('public.shop')) {
          return [
            {
              shopId: 1,
              name: 'Quán Chay Hoa Sen',
              address: '12 Nguyễn Thị Minh Khai',
              latitude: 10.7769,
              longitude: 106.6983,
              distanceM: 500,
              category: 'Cơm chay',
              specialDish: 'Đậu hũ sốt nấm rơm',
              rating: 4.5,
              isOpen: true,
              source: 'seed',
            },
          ];
        }
        return [];
      }),
    };

    osmProvider = {
      searchNearby: jest.fn().mockResolvedValue([]),
    };

    serperProvider = {
      searchNearby: jest.fn().mockResolvedValue([]),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlacesService,
        { provide: DataSource, useValue: dataSource },
        { provide: OsmOverpassProvider, useValue: osmProvider },
        { provide: SerperPlacesProvider, useValue: serperProvider },
      ],
    }).compile();

    service = module.get<PlacesService>(PlacesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return nearby places with distance', async () => {
    const result = await service.getNearbyPlaces({
      lat: 10.7769,
      lng: 106.6983,
      radiusKm: 5,
    });

    expect(result.items).toHaveLength(1);
    expect(result.items[0].name).toBe('Quán Chay Hoa Sen');
    expect(result.items[0].distanceM).toBe(500);
  });

  it('should return empty items when no places within radius (never return shops exceeding radius)', async () => {
    (dataSource.query as jest.Mock).mockImplementation(async (sql: string) => {
      if (sql.includes('spatial_cache_cells')) {
        return [{ cell_key: '10.78_106.70', fetched_radius_km: 5, expires_at: new Date(Date.now() + 86400000) }];
      }
      if (sql.includes('public.shop')) {
        return [];
      }
      return [];
    });

    const result = await service.getNearbyPlaces({
      lat: 10.7769,
      lng: 106.6983,
      radiusKm: 2,
    });

    expect(result.items).toEqual([]);
  });
});
