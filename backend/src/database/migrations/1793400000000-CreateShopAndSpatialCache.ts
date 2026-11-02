import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateShopAndSpatialCache1793400000000 implements MigrationInterface {
  name = 'CreateShopAndSpatialCache1793400000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Drop old empty shops table if exists (so we can recreate shop as the main table)
    await queryRunner.query(`DROP TABLE IF EXISTS public.shops CASCADE`);

    // Create table public.shop
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS public.shop (
        shop_id           SERIAL PRIMARY KEY,
        name              VARCHAR(255) NOT NULL,
        address           TEXT,
        latitude          NUMERIC(10, 7) NOT NULL,
        longitude         NUMERIC(10, 7) NOT NULL,
        category          VARCHAR(100),
        categories        TEXT[],
        special_dish      VARCHAR(255),
        suggested_dishes  TEXT[],
        phone_number      VARCHAR(50),
        rating            NUMERIC(2, 1) DEFAULT 4.5,
        is_open           BOOLEAN DEFAULT true,
        source            VARCHAR(50) DEFAULT 'osm',
        external_id       VARCHAR(255) UNIQUE,
        external_place_id VARCHAR(255),
        cached_at         TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS idx_shop_lat_lng ON public.shop (latitude, longitude)`,
    );

    // Create table public.spatial_cache_cells
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS public.spatial_cache_cells (
        cell_key          VARCHAR(50) PRIMARY KEY,
        center_lat        NUMERIC(9, 6) NOT NULL,
        center_lng        NUMERIC(9, 6) NOT NULL,
        fetched_radius_km INT NOT NULL DEFAULT 5,
        shops_found       INT NOT NULL DEFAULT 0,
        expires_at        TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '30 days')
      )
    `);

    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS idx_spatial_cache_expires ON public.spatial_cache_cells (expires_at)`,
    );

    // Create backward-compatible view for 'shops'
    await queryRunner.query(
      `CREATE OR REPLACE VIEW public.shops AS SELECT * FROM public.shop`,
    );

    // Seed sample shops in TP.HCM
    await queryRunner.query(`
      INSERT INTO public.shop (name, address, latitude, longitude, category, special_dish, source, external_id, rating) VALUES
      ('Quán Chay Hoa Sen', '12 Nguyễn Thị Minh Khai, Q.1, TP.HCM', 10.7769, 106.6983, 'Cơm chay', 'Đậu hũ sốt nấm rơm', 'seed', 'seed:hoa-sen-q1', 4.5),
      ('Buffet Chay Liên Hoa', '45 Đinh Tiên Hoàng, Q.Bình Thạnh, TP.HCM', 10.8015, 106.7137, 'Buffet chay', 'Lẩu nấm thập cẩm', 'seed', 'seed:lien-hoa-bt', 4.7),
      ('Chay Garden', '88 Lê Văn Sỹ, Q.3, TP.HCM', 10.7862, 106.6841, 'Cơm chay', 'Nấm đùi gà áp chảo', 'seed', 'seed:chay-garden-q3', 4.3),
      ('Nhà Hàng Chay Phúc Lộc Thọ', '120 Hai Bà Trưng, Q.1, TP.HCM', 10.7796, 106.6998, 'Nhà hàng chay', 'Gỏi ngó sen', 'seed', 'seed:phucloctho-q1', 4.6),
      ('Cơm Chay Bà Ngoại', '5 Phan Xích Long, Q. Phú Nhuận, TP.HCM', 10.8003, 106.6820, 'Cơm bình dân', 'Cà tím kho nước dừa', 'seed', 'seed:banguai-pn', 4.4)
      ON CONFLICT (external_id) DO NOTHING
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP VIEW IF EXISTS public.shops`);
    await queryRunner.query(`DROP TABLE IF EXISTS public.spatial_cache_cells`);
    await queryRunner.query(`DROP TABLE IF EXISTS public.shop`);
  }
}

