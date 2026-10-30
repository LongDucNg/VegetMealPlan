import { existsSync } from 'fs';
import { DataSource } from 'typeorm';
import { dataSourceOptions } from '../../config/typeorm.config';
import { hasImage, IMAGES_FILE, isOnCloudinary, loadMap, SEED_FOLDER } from './recipe-image-map';

/**
 * BƯỚC 4/4: gắn ảnh trong src/database/seeds/data/recipe-images.json vào cột recipes.image_url.
 * Không cần khoá API, không gọi mạng. Khớp món theo tiêu đề (không phân biệt hoa thường, bỏ khoảng trắng thừa).
 * `npm run seed` cũng tự gọi bước này ở cuối, nên seed xong là món đã có ảnh.
 *
 * Chạy:  npm run images:apply         (điền món chưa có ảnh + cập nhật món đang dùng ảnh seed;
 *                                      KHÔNG đè ảnh admin/người dùng tự tải lên)
 *        npm run images:apply force   (đè tất cả theo file)
 */

/** Gắn ảnh vào DB đang mở; trả số món được cập nhật (file chưa có thì trả 0). */
export async function applyRecipeImages(dataSource: DataSource, force = false): Promise<number> {
  if (!existsSync(IMAGES_FILE)) return 0;
  const entries = Object.entries(loadMap()).filter((e) => hasImage(e[1]));
  const notOnCloud = entries.filter(([, e]) => hasImage(e) && !isOnCloudinary(e.url)).length;
  if (notOnCloud > 0) {
    console.warn(`! ${notOnCloud} ảnh chưa lên Cloudinary (đang dùng link gốc). Nên chạy \`npm run images:cloudinary\` trước.`);
  }

  let updated = 0;
  await dataSource.transaction(async (manager) => {
    for (const [title, entry] of entries) {
      if (!hasImage(entry)) continue;
      const rows: unknown = await manager.query(
        `UPDATE recipes SET image_url = $1
         WHERE LOWER(BTRIM(REGEXP_REPLACE(title, '\\s+', ' ', 'g'))) = LOWER(BTRIM(REGEXP_REPLACE($2, '\\s+', ' ', 'g')))
         AND image_url IS DISTINCT FROM $1
         ${force ? '' : `AND (image_url IS NULL OR BTRIM(image_url) = '' OR image_url LIKE $3)`}
         RETURNING recipe_id`,
        force ? [entry.url, title] : [entry.url, title, `%/${SEED_FOLDER}/%`],
      );
      // TypeORM + pg trả [rows, số dòng] với UPDATE ... RETURNING; phòng trường hợp chỉ trả rows.
      const list = Array.isArray(rows) && Array.isArray(rows[0]) ? rows[0] : rows;
      updated += Array.isArray(list) ? list.length : 0;
    }
  });
  return updated;
}

async function main() {
  if (!existsSync(IMAGES_FILE)) {
    console.error('Chưa có file recipe-images.json. Pull code mới nhất hoặc chạy `npm run images:fetch` trước.');
    process.exit(1);
  }
  const force = process.argv.some((a) => a === 'force' || a === '--force');
  const dataSource = new DataSource(dataSourceOptions);
  await dataSource.initialize();
  try {
    const updated = await applyRecipeImages(dataSource, force);
    console.log(`Đã gắn/cập nhật ảnh cho ${updated} món${force ? ' (chế độ force)' : ' (không đè ảnh tự tải lên)'}.`);
  } finally {
    await dataSource.destroy();
  }
}

if (require.main === module) {
  main().catch((err) => {
    console.error('Gắn ảnh thất bại:', err instanceof Error ? err.message : err);
    process.exit(1);
  });
}
