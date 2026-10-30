import { config as loadEnv } from 'dotenv';
import { CloudinaryService } from '../../modules/media/cloudinary.service';
import { hasImage, isOnCloudinary, loadMap, RecipeImageEntry, saveMap, SEED_FOLDER } from './recipe-image-map';
import { slugify } from './recipe-image-sources';

loadEnv();

/**
 * BƯỚC 3/4: đưa ảnh đã chọn trong recipe-images.json lên Cloudinary (Cloudinary tự tải từ link gốc,
 * không đi qua máy mình) rồi thay link trong file bằng link Cloudinary.
 * Tên file trên Cloudinary theo tên món: vegetmealplan/seed/canh-chua-chay -> giống nhau trên máy mọi người.
 *
 * Chạy:  npm run images:cloudinary
 * Cần CLOUDINARY_CLOUD_NAME / API_KEY / API_SECRET trong backend/.env. Chạy lại an toàn: món đã lên
 * Cloudinary thì bỏ qua. Xong thì commit recipe-images.json và chạy bước 4: npm run images:apply
 */

const CONCURRENCY = 4;

async function main() {
  const env = process.env;
  const cloudinary = new CloudinaryService({ get: (key: string) => env[key] } as never);
  if (!cloudinary.isConfigured) {
    console.error('Thiếu CLOUDINARY_CLOUD_NAME / CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET trong backend/.env');
    process.exit(1);
  }

  const map = loadMap();
  const todo = Object.entries(map).filter(
    (e): e is [string, RecipeImageEntry] => hasImage(e[1]) && !isOnCloudinary(e[1].url),
  );
  console.log(`Có ${todo.length} ảnh cần đưa lên Cloudinary.`);

  let done = 0;
  let failed = 0;
  let next = 0;
  const worker = async () => {
    while (next < todo.length) {
      const [title, entry] = todo[next++];
      try {
        const res = await cloudinary.uploadImageFromUrl(entry.original_url, `${SEED_FOLDER}/${slugify(title)}`);
        entry.url = res.secure_url;
        done++;
        console.log(`✓ ${title}`);
      } catch (err) {
        failed++;
        console.log(`✗ ${title}: ${(err as Error)?.message ?? err}`);
      }
      if ((done + failed) % 10 === 0) saveMap(map);
    }
  };
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  saveMap(map);
  console.log(`\nXong: ${done} ảnh đã lên Cloudinary, ${failed} ảnh lỗi${failed ? ' (chạy lại lệnh để thử lại)' : ''}.`);
  console.log('Tiếp theo: `npm run images:apply` để gắn ảnh vào DB, rồi commit recipe-images.json cho cả nhóm.');
}

main().catch((err) => {
  console.error('Đưa ảnh lên Cloudinary thất bại:', err instanceof Error ? err.message : err);
  process.exit(1);
});
