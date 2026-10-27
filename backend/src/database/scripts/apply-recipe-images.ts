import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { DataSource } from 'typeorm';
import { dataSourceOptions } from '../../config/typeorm.config';
import type { RecipeImageEntry } from './fetch-recipe-images';

/**
 * Gắn ảnh trong src/database/seeds/data/recipe-images.json vào cột recipes.image_url của DB máy mình.
 * Không cần API key, không gọi mạng. Khớp món theo tiêu đề (không phân biệt hoa thường, bỏ khoảng trắng thừa).
 *
 * Chạy:  npm run images:apply              (chỉ điền món CHƯA có ảnh, không đè ảnh admin đã sửa tay)
 *        npm run images:apply -- --force   (đè tất cả theo file)
 *
 * Chạy lại sau mỗi lần `npm run seed` với SEED_RESET=true, vì seed tạo lại món không có ảnh.
 */

const IMAGES_FILE = join(__dirname, '..', 'seeds', 'data', 'recipe-images.json');

async function main() {
  if (!existsSync(IMAGES_FILE)) {
    console.error('Chưa có file recipe-images.json. Pull code mới nhất hoặc chạy `npm run images:fetch` trước.');
    process.exit(1);
  }

  const force = process.argv.includes('--force');
  const map: Record<string, RecipeImageEntry | null> = JSON.parse(readFileSync(IMAGES_FILE, 'utf8'));
  const entries = Object.entries(map).filter((e): e is [string, RecipeImageEntry] => !!e[1]?.url);

  const dataSource = new DataSource(dataSourceOptions);
  await dataSource.initialize();

  let updated = 0;
  try {
    await dataSource.transaction(async (manager) => {
      for (const [title, entry] of entries) {
        const rows: unknown = await manager.query(
          `UPDATE recipes SET image_url = $1
           WHERE LOWER(BTRIM(REGEXP_REPLACE(title, '\\s+', ' ', 'g'))) = LOWER(BTRIM(REGEXP_REPLACE($2, '\\s+', ' ', 'g')))
           ${force ? '' : `AND (image_url IS NULL OR BTRIM(image_url) = '')`}
           RETURNING recipe_id`,
          [entry.url, title],
        );
        // TypeORM + pg trả [rows, số dòng] với UPDATE ... RETURNING; phòng trường hợp chỉ trả rows.
        const list = Array.isArray(rows) && Array.isArray(rows[0]) ? rows[0] : rows;
        updated += Array.isArray(list) ? list.length : 0;
      }
    });
  } finally {
    await dataSource.destroy();
  }

  console.log(
    `Đã gắn ảnh cho ${updated} món (file có ${entries.length} món có ảnh${force ? ', chế độ --force' : ', bỏ qua món đã có ảnh'}).`,
  );
}

main().catch((err) => {
  console.error('Gắn ảnh thất bại:', err instanceof Error ? err.message : err);
  process.exit(1);
});
