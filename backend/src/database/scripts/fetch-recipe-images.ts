import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { config as loadEnv } from 'dotenv';

loadEnv();

/**
 * Tìm ảnh minh hoạ cho các món trong seed bằng Pexels API (ảnh dùng miễn phí theo giấy phép Pexels).
 *
 * Kết quả ghi vào src/database/seeds/data/recipe-images.json (commit file này lên git), nên chỉ MỘT người
 * cần API key và chạy script; cả nhóm chỉ cần `npm run images:apply` để gắn ảnh vào DB máy mình.
 *
 * Chạy:  npm run images:fetch                 (bỏ qua món đã có trong file)
 *        npm run images:fetch -- --retry-missing   (thử lại các món lần trước không tìm được ảnh)
 *        npm run images:fetch -- --limit 50        (chỉ xử lý 50 món, để thử)
 *
 * Pexels giới hạn 200 request/giờ: hết lượt thì script tự lưu và dừng, chạy lại sau là làm tiếp.
 */

const DATA_DIR = join(__dirname, '..', 'seeds', 'data');
const RECIPES_FILE = join(DATA_DIR, 'recipes.json');
const INGREDIENTS_FILE = join(DATA_DIR, 'ingredients.json');
const OUTPUT_FILE = join(DATA_DIR, 'recipe-images.json');

const PEXELS_SEARCH = 'https://api.pexels.com/v1/search';
const PER_PAGE = 15;

// Ảnh có mô tả (alt) chứa đồ mặn thì bỏ: tìm "Nấm đùi gà" rất dễ ra ảnh thịt gà.
const NON_VEG_ALT = /\b(chicken|beef|pork|meat|meatball|steak|bacon|ham|sausage|salami|fish|salmon|tuna|shrimp|prawn|crab|lobster|seafood|squid|octopus|lamb|mutton|duck|turkey|oyster|clam|mussel|anchov\w*)\b/i;
// Món thuần chay (vegan) thì bỏ thêm ảnh có trứng, sữa, phô mai.
const ANIMAL_PRODUCT_ALT = /\b(egg|eggs|cheese|milk|yogurt|yoghurt|butter|cream)\b/i;

interface SeedRecipe {
  title: string;
  diet_type: string;
  ingredients: { ingredient_id: number; quantity: number; is_optional?: boolean }[];
}

interface SeedIngredient {
  ingredient_id: number;
  ingredient_name: string;
}

export interface RecipeImageEntry {
  url: string;
  photographer: string;
  photographer_url: string;
  source_url: string;
  alt: string;
  query: string;
}

/** null = đã tìm nhưng không có ảnh phù hợp (chạy lại với --retry-missing để thử lại). */
type ImageMap = Record<string, RecipeImageEntry | null>;

interface PexelsPhoto {
  id: number;
  url: string;
  alt: string;
  photographer: string;
  photographer_url: string;
  src: { large: string; landscape: string; medium: string };
}

class RateLimitReached extends Error {
  constructor(public readonly resetAt: Date | null) {
    super('Hết lượt gọi Pexels trong giờ này');
  }
}

async function searchPexels(apiKey: string, query: string): Promise<PexelsPhoto[]> {
  const url = `${PEXELS_SEARCH}?${new URLSearchParams({ query, per_page: String(PER_PAGE), locale: 'vi-VN' })}`;
  const res = await fetch(url, { headers: { Authorization: apiKey } });

  const remaining = Number(res.headers.get('x-ratelimit-remaining'));
  const reset = Number(res.headers.get('x-ratelimit-reset'));
  const resetAt = Number.isFinite(reset) && reset > 0 ? new Date(reset * 1000) : null;

  if (res.status === 429) throw new RateLimitReached(resetAt);
  if (res.status === 401 || res.status === 403) {
    throw new Error('PEXELS_API_KEY không hợp lệ (Pexels trả ' + res.status + ')');
  }
  if (!res.ok) throw new Error(`Pexels trả lỗi ${res.status} cho "${query}"`);

  const body = (await res.json()) as { photos?: PexelsPhoto[] };
  // Còn đúng 0 lượt: request này vẫn có kết quả, nhưng request sau chắc chắn bị 429.
  if (Number.isFinite(remaining) && remaining <= 0) {
    const photos = body.photos ?? [];
    throw Object.assign(new RateLimitReached(resetAt), { photos });
  }
  return body.photos ?? [];
}

function pickPhoto(photos: PexelsPhoto[], dietType: string, usedIds: Set<number>): PexelsPhoto | null {
  const acceptable = photos.filter((p) => {
    const alt = p.alt ?? '';
    if (NON_VEG_ALT.test(alt)) return false;
    if (dietType === 'vegan' && ANIMAL_PRODUCT_ALT.test(alt)) return false;
    return true;
  });
  // Ưu tiên ảnh chưa món nào dùng, để hai món khác nhau không trùng ảnh.
  return acceptable.find((p) => !usedIds.has(p.id)) ?? acceptable[0] ?? null;
}

function toEntry(photo: PexelsPhoto, query: string): RecipeImageEntry {
  return {
    url: photo.src.large,
    photographer: photo.photographer,
    photographer_url: photo.photographer_url,
    source_url: photo.url,
    alt: photo.alt ?? '',
    query,
  };
}

function photoIdFromUrl(url: string): number | null {
  const m = url.match(/\/photos\/(\d+)\//);
  return m ? Number(m[1]) : null;
}

function save(recipes: SeedRecipe[], map: ImageMap) {
  // Ghi theo đúng thứ tự món trong recipes.json để diff trên git dễ đọc.
  const ordered: ImageMap = {};
  for (const r of recipes) if (r.title in map) ordered[r.title] = map[r.title];
  writeFileSync(OUTPUT_FILE, JSON.stringify(ordered, null, 2) + '\n', 'utf8');
}

async function main() {
  const apiKey = process.env.PEXELS_API_KEY;
  if (!apiKey) {
    console.error('Thiếu PEXELS_API_KEY trong backend/.env (đăng ký miễn phí tại https://www.pexels.com/api/).');
    process.exit(1);
  }

  const args = process.argv.slice(2);
  const retryMissing = args.includes('--retry-missing');
  const limitIdx = args.indexOf('--limit');
  const limit = limitIdx >= 0 ? Number(args[limitIdx + 1]) : Infinity;

  const recipes: SeedRecipe[] = JSON.parse(readFileSync(RECIPES_FILE, 'utf8'));
  const ingredients: SeedIngredient[] = JSON.parse(readFileSync(INGREDIENTS_FILE, 'utf8'));
  const ingredientName = new Map(ingredients.map((i) => [i.ingredient_id, i.ingredient_name]));
  const map: ImageMap = existsSync(OUTPUT_FILE) ? JSON.parse(readFileSync(OUTPUT_FILE, 'utf8')) : {};

  const usedIds = new Set<number>();
  for (const entry of Object.values(map)) {
    const id = entry ? photoIdFromUrl(entry.url) : null;
    if (id) usedIds.add(id);
  }

  const todo = recipes.filter((r) => !(r.title in map) || (retryMissing && map[r.title] === null));
  console.log(`Có ${recipes.length} món, ${todo.length} món cần tìm ảnh.`);

  let found = 0;
  let missing = 0;
  let processed = 0;

  try {
    for (const recipe of todo) {
      if (processed >= limit) break;
      processed++;

      // Lần 1: tìm theo tên món. Lần 2: tìm theo nguyên liệu chính (khối lượng lớn nhất, không tuỳ chọn).
      const main = [...recipe.ingredients]
        .filter((i) => !i.is_optional)
        .sort((a, b) => b.quantity - a.quantity)[0];
      const queries = [recipe.title, main ? ingredientName.get(main.ingredient_id) : undefined].filter(
        (q): q is string => !!q,
      );

      let entry: RecipeImageEntry | null = null;
      for (const query of queries) {
        let photos: PexelsPhoto[];
        try {
          photos = await searchPexels(apiKey, query);
        } catch (err) {
          if (err instanceof RateLimitReached) {
            const last = (err as RateLimitReached & { photos?: PexelsPhoto[] }).photos;
            const photo = last ? pickPhoto(last, recipe.diet_type, usedIds) : null;
            if (photo) {
              map[recipe.title] = toEntry(photo, query);
              usedIds.add(photo.id);
              found++;
            }
          }
          throw err;
        }
        const photo = pickPhoto(photos, recipe.diet_type, usedIds);
        if (photo) {
          entry = toEntry(photo, query);
          usedIds.add(photo.id);
          break;
        }
      }

      map[recipe.title] = entry;
      if (entry) found++;
      else missing++;

      console.log(`${entry ? '✓' : '✗'} ${recipe.title}${entry ? `  ←  "${entry.query}"` : ''}`);
      if (processed % 10 === 0) save(recipes, map);
    }
  } catch (err) {
    save(recipes, map);
    if (err instanceof RateLimitReached) {
      const when = err.resetAt ? err.resetAt.toLocaleTimeString('vi-VN') : 'khoảng 1 giờ nữa';
      console.log(`\nHết lượt gọi Pexels (200 request/giờ). Đã lưu tiến độ, chạy lại lệnh sau ${when} để làm tiếp.`);
      console.log(`Lần này: ${found} món có ảnh, ${missing} món không tìm được.`);
      return;
    }
    throw err;
  }

  save(recipes, map);
  const total = Object.values(map).filter(Boolean).length;
  console.log(`\nXong: lần này ${found} món có ảnh, ${missing} món không tìm được. Tổng ${total}/${recipes.length} món có ảnh.`);
  console.log('Tiếp theo: kiểm tra lại recipe-images.json rồi chạy `npm run images:apply` để gắn ảnh vào DB.');
}

main().catch((err) => {
  console.error('Lấy ảnh thất bại:', err instanceof Error ? err.message : err);
  process.exit(1);
});
