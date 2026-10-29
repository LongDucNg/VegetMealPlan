import { existsSync, readFileSync } from 'fs';
import { config as loadEnv } from 'dotenv';
import { DataSource } from 'typeorm';
import { dataSourceOptions } from '../../config/typeorm.config';
import {
  configuredSources,
  ImageCandidate,
  ImageSource,
  isAcceptable,
  RateLimitReached,
  SearchLang,
} from './recipe-image-sources';
import { analyzeTitle, avoidFor, containsPhrase } from './recipe-image-keywords';
import {
  DbRecipe,
  hasImage,
  ImageMap,
  ImageMatch,
  isSeedImageUrl,
  loadDbRecipes,
  loadMap,
  RecipeImageEntry,
  saveMap,
  sleep,
} from './recipe-image-map';

loadEnv();

/**
 * BƯỚC 1/4: tìm ảnh cho các món đang có trong DB (món chưa có ảnh, hoặc đang dùng ảnh seed) bằng API ảnh
 * miễn phí bản quyền (Pixabay / Pexels), ghi vào src/database/seeds/data/recipe-images.json.
 *
 * Ảnh chỉ được nhận khi tags KHỚP món (xem recipe-image-keywords.ts) và không dính đồ mặn.
 * Không khớp thì để món không có ảnh, an toàn hơn gắn ảnh sai.
 *
 * Chạy (viết tham số KHÔNG có dấu "--" để chạy đúng cả trên PowerShell):
 *   npm run images:fetch                         bỏ qua món đã có trong file
 *   npm run images:fetch limit=20                thử 20 món trước
 *   npm run images:fetch fresh                   bỏ kết quả cũ, tìm lại từ đầu
 *   npm run images:fetch retry-missing           thử lại món lần trước không tìm được ảnh
 *   npm run images:fetch retry-missing share     ...và cho phép nhiều món dùng chung ảnh minh hoạ chung
 *   npm run images:fetch reject=recipe-images-reject.txt
 *       loại ảnh sai đã đánh dấu ở trang images:review rồi tìm ảnh khác cho các món đó
 *
 * Hết lượt gọi API thì script tự lưu và dừng; chạy lại lệnh là làm tiếp từ chỗ dừng.
 */

/** Pixabay cho 100 request/phút: giãn cách để không bị chặn. */
const PIXABAY_DELAY_MS = 700;

/** Đọc tham số dạng "limit=20" / "fresh" (và cả "--limit 20" khi chạy ngoài PowerShell). */
export function parseArgs(argv: string[]) {
  const opts: Record<string, string | true> = {};
  for (let i = 0; i < argv.length; i++) {
    const raw = argv[i].replace(/^--/, '');
    const eq = raw.indexOf('=');
    if (eq > 0) opts[raw.slice(0, eq)] = raw.slice(eq + 1);
    else if (argv[i].startsWith('--') && argv[i + 1] && !argv[i + 1].startsWith('-') && !argv[i + 1].includes('=')) {
      opts[raw] = argv[++i];
    } else opts[raw] = true;
  }
  return opts;
}

export interface Attempt {
  match: ImageMatch;
  lang: SearchLang;
  query: string;
  /** Ảnh được nhận khi tags chứa ít nhất một cụm trong MỖI nhóm... */
  required: string[][];
  /** ...và không chứa cụm nào ở đây. */
  avoid: string[];
}

/** Các lượt tìm cho một món, từ khớp nhất đến chung nhất. */
export function buildAttempts(title: string, mainIngredientName: string | null): Attempt[] {
  const { dish, ingredient, method } = analyzeTitle(title);
  const avoid = avoidFor(dish, title);
  const attempts: Omit<Attempt, 'avoid'>[] = [];
  const titleNoChay = title.replace(/(?<![\p{L}\p{N}])chay(?![\p{L}\p{N}])/giu, '').replace(/\s+/g, ' ').trim();

  // 1. Tên tiếng Việt: tags (tiếng Việt) phải có đúng loại món. Loại món một chữ dễ trùng ("xôi", "cháo",
  //    "nước") thì phải có thêm nguyên liệu chính. Tên mở đầu bằng nguyên liệu thì chỉ tính là gần đúng.
  const ingredientVi = ingredient ? [ingredient.vi, ...(ingredient.viAlt ?? [])] : null;
  const required: string[][] = dish ? [[dish.vi]] : [ingredientVi ?? [titleNoChay]];
  if (dish && !dish.vi.includes(' ') && ingredientVi) required.push(ingredientVi);
  attempts.push({ match: dish ? 'exact' : 'similar', lang: 'vi', query: title, required });

  // 2. Tiếng Anh "loại món + nguyên liệu" hoặc "cách nấu + nguyên liệu".
  if (dish && ingredient) {
    attempts.push({ match: 'similar', lang: 'en', query: `${ingredient.en} ${dish.en}`, required: [dish.must, ingredient.must] });
  } else if (!dish && ingredient && method) {
    attempts.push({ match: 'similar', lang: 'en', query: `${method} ${ingredient.en}`, required: [ingredient.must] });
  }

  // 3. Chung: chỉ loại món, hoặc chỉ nguyên liệu chính (từ tên món, hoặc nguyên liệu nhiều nhất trong công thức).
  if (dish) {
    attempts.push({ match: 'generic', lang: 'en', query: `${dish.en} vegetarian`, required: [dish.must] });
  } else if (ingredient) {
    attempts.push({ match: 'generic', lang: 'en', query: `${ingredient.en} vegetarian dish`, required: [ingredient.must] });
  } else if (mainIngredientName) {
    const main = analyzeTitle(mainIngredientName).ingredient;
    if (main) attempts.push({ match: 'generic', lang: 'en', query: `${main.en} vegetarian dish`, required: [main.must] });
  }
  return attempts.map((a) => ({ ...a, avoid }));
}

export const isRelevant = (c: ImageCandidate, attempt: Pick<Attempt, 'required' | 'avoid'>) =>
  attempt.required.every((group) => group.some((phrase) => containsPhrase(c.description, phrase))) &&
  !attempt.avoid.some((phrase) => containsPhrase(c.description, phrase));

async function main() {
  const sources = configuredSources(process.env);
  if (sources.length === 0) {
    console.error(
      'Chưa có khoá API ảnh. Thêm ít nhất một khoá vào backend/.env:\n' +
        '  PIXABAY_API_KEY=...  (khuyên dùng, miễn phí tại https://pixabay.com/api/docs/)\n' +
        '  PEXELS_API_KEY=...   (miễn phí tại https://www.pexels.com/api/)',
    );
    process.exit(1);
  }

  const opts = parseArgs(process.argv.slice(2));
  const limit = typeof opts.limit === 'string' ? Number(opts.limit) : Infinity;
  const retryMissing = !!opts['retry-missing'];
  // Cho phép ảnh minh hoạ chung (bát cháo, bát bún...) dùng lại cho nhiều món khi kho ảnh đã hết ảnh mới.
  const share = !!opts.share;
  const rejectFile = typeof opts.reject === 'string' ? opts.reject : undefined;

  const dataSource = new DataSource(dataSourceOptions);
  await dataSource.initialize();
  let recipes: DbRecipe[];
  try {
    recipes = await loadDbRecipes(dataSource);
  } finally {
    await dataSource.destroy();
  }
  const order = recipes.map((r) => r.title);
  const map: ImageMap = opts.fresh ? {} : loadMap();
  if (opts.fresh) console.log('Chế độ fresh: bỏ toàn bộ kết quả cũ, tìm lại từ đầu.');

  // Loại ảnh sai: nhớ id ảnh bị loại, đưa món về trạng thái chưa có ảnh để tìm lại.
  const rejectedNow = new Set<string>();
  if (rejectFile) {
    if (!existsSync(rejectFile)) {
      console.error(`Không thấy file ${rejectFile}`);
      process.exit(1);
    }
    const titles = readFileSync(rejectFile, 'utf8')
      .split(/\r?\n/)
      .map((t) => t.trim())
      .filter(Boolean);
    for (const title of titles) {
      const entry = map[title];
      if (!hasImage(entry)) {
        console.warn(`! Bỏ qua "${title}": không có trong recipe-images.json hoặc chưa có ảnh`);
        continue;
      }
      map[title] = { url: null, rejected: [...(entry.rejected ?? []), entry.candidate_id] };
      rejectedNow.add(title);
    }
    saveMap(map, order);
    console.log(`Đã loại ${rejectedNow.size} ảnh, giờ tìm ảnh khác cho các món đó.`);
  }

  const usedIds = new Set(Object.values(map).filter(hasImage).map((e) => e.candidate_id));
  // Món đã có ảnh do admin/người dùng tự chọn (không phải ảnh seed) thì không đụng tới.
  const eligible = recipes.filter((r) => !r.image_url?.trim() || isSeedImageUrl(r.image_url));
  const todo = eligible.filter((r) => {
    const entry = map[r.title];
    if (!entry) return true;
    return !entry.url && (retryMissing || rejectedNow.has(r.title));
  });
  console.log(
    `DB có ${recipes.length} món, ${eligible.length} món chưa có ảnh riêng, ${todo.length} món cần tìm ảnh. ` +
      `Nguồn: ${sources.map((s) => s.provider).join(', ')}.`,
  );

  const active: ImageSource[] = [...sources];
  const stats: Record<ImageMatch | 'missing' | 'shared', number> = { exact: 0, similar: 0, generic: 0, missing: 0, shared: 0 };
  let processed = 0;
  let stoppedBy: RateLimitReached | null = null;

  try {
    outer: for (const recipe of todo) {
      if (processed >= limit || active.length === 0) break;

      const rejected = new Set(map[recipe.title]?.rejected ?? []);
      let chosen: { candidate: ImageCandidate; attempt: Attempt } | null = null;

      attempts: for (const attempt of buildAttempts(recipe.title, recipe.main_ingredient)) {
        for (const source of [...active]) {
          // Pexels luôn trả mô tả tiếng Anh: không dùng cho lượt tìm tiếng Việt (không kiểm được độ khớp).
          if (attempt.lang === 'vi' && !source.localizedTags) continue;
          let candidates: ImageCandidate[];
          try {
            candidates = await source.search(attempt.query, attempt.lang);
            if (source.provider === 'pixabay') await sleep(PIXABAY_DELAY_MS);
          } catch (err) {
            if (err instanceof RateLimitReached) {
              active.splice(active.indexOf(source), 1);
              stoppedBy = err;
              console.log(`  (hết lượt ${source.provider}${active.length ? ', chuyển nguồn khác' : ''})`);
              if (active.length === 0) break outer; // món này chưa tìm xong, lần sau làm lại
              continue;
            }
            throw err;
          }
          const ok = candidates.filter(
            (c) => !rejected.has(c.id) && isAcceptable(c, recipe.diet_type) && isRelevant(c, attempt),
          );
          // Ưu tiên ảnh chưa món nào dùng. Hết ảnh mới: món đúng tên được dùng lại; ảnh minh hoạ chung chỉ dùng lại khi bật share.
          const fresh = ok.find((c) => !usedIds.has(c.id));
          const reuse = attempt.match === 'exact' || (share && attempt.match === 'generic') ? ok[0] : undefined;
          const candidate = fresh ?? reuse;
          if (candidate) {
            chosen = { candidate, attempt };
            break attempts;
          }
        }
      }

      processed++;
      if (chosen) {
        const { candidate: c, attempt } = chosen;
        const entry: RecipeImageEntry = {
          url: c.url,
          original_url: c.url,
          candidate_id: c.id,
          provider: c.provider,
          source_url: c.source_url,
          author: c.author,
          author_url: c.author_url,
          description: c.description,
          query: attempt.query,
          match: attempt.match,
          ...(usedIds.has(c.id) && attempt.match === 'generic' ? { shared: true } : {}),
          ...(rejected.size ? { rejected: [...rejected] } : {}),
        };
        map[recipe.title] = entry;
        usedIds.add(c.id);
        stats[attempt.match]++;
        if (entry.shared) stats.shared++;
        console.log(`✓ [${attempt.match}${entry.shared ? ', dùng chung' : ''}] ${recipe.title}  ←  "${attempt.query}"`);
      } else {
        map[recipe.title] = { url: null, ...(rejected.size ? { rejected: [...rejected] } : {}) };
        stats.missing++;
        console.log(`✗ ${recipe.title}`);
      }
      if (processed % 10 === 0) saveMap(map, order);
    }
  } finally {
    // Lỗi giữa chừng (mất mạng lâu, khoá API sai...) vẫn giữ được tiến độ đã tìm.
    saveMap(map, order);
  }
  const total = Object.values(map).filter(hasImage).length;
  console.log(
    `\nLần này: ${stats.exact} đúng món, ${stats.similar} gần đúng, ${stats.generic} minh hoạ chung (${stats.shared} dùng chung), ${stats.missing} không có ảnh phù hợp.` +
      ` Tổng ${total}/${eligible.length} món có ảnh.`,
  );
  if (active.length === 0 && stoppedBy) {
    const when = stoppedBy.resetAt ? stoppedBy.resetAt.toLocaleTimeString('vi-VN') : 'một lúc nữa';
    console.log(`Hết lượt gọi API. Đã lưu tiến độ, chạy lại lệnh sau ${when} để làm tiếp.`);
  } else {
    console.log('Tiếp theo: `npm run images:review` để xem lại ảnh trước khi đưa lên Cloudinary.');
  }
}

if (require.main === module) {
  main().catch((err) => {
    console.error('Lấy ảnh thất bại:', err instanceof Error ? err.message : err);
    process.exit(1);
  });
}
