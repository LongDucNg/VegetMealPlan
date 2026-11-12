import { NonVegetarianDetectorService } from '../../common/services/non-vegetarian-detector.service';
import { containsPhrase } from './recipe-image-keywords';

/**
 * Nguồn ảnh miễn phí bản quyền cho script lấy ảnh món ăn (KHÔNG lấy ảnh Google: dính bản quyền).
 *   - Pixabay: 100 request/phút, giấy phép Pixabay (dùng thương mại, không bắt buộc ghi nguồn).
 *     Điều khoản API cấm dùng thẳng link ảnh lâu dài -> ảnh phải đưa lên Cloudinary (images:cloudinary).
 *   - Pexels: 200 request/giờ, giấy phép Pexels.
 * Có khoá nào trong backend/.env thì dùng nguồn đó; có cả hai thì dùng Pixabay trước (nhanh hơn nhiều).
 */

export type ImageProvider = 'pixabay' | 'pexels';

export interface ImageCandidate {
  /** Định danh duy nhất giữa các nguồn, vd "pixabay:123" (dùng để không lặp ảnh và nhớ ảnh đã bị loại). */
  id: string;
  provider: ImageProvider;
  /** Link ảnh gốc để Cloudinary tải về. */
  url: string;
  /** Trang ảnh trên Pixabay/Pexels (ghi nguồn, kiểm tra lại). */
  source_url: string;
  author: string;
  author_url: string;
  /** Mô tả (Pexels) hoặc tags (Pixabay): dùng để lọc ảnh dính đồ mặn. */
  description: string;
}

export class RateLimitReached extends Error {
  constructor(
    readonly provider: ImageProvider,
    readonly resetAt: Date | null,
  ) {
    super(`Hết lượt gọi ${provider}`);
  }
}

export type SearchLang = 'vi' | 'en';

export interface ImageSource {
  provider: ImageProvider;
  /** Tags/mô tả trả về có theo ngôn ngữ tìm kiếm không (Pixabay có; Pexels luôn mô tả tiếng Anh). */
  readonly localizedTags: boolean;
  search(query: string, lang: SearchLang): Promise<ImageCandidate[]>;
}

const PER_PAGE = 20;
const RETRY_DELAYS_MS = [2_000, 5_000, 10_000];

/** Gọi API, tự thử lại khi mất mạng chốc lát hoặc máy chủ lỗi 5xx (lần trước dừng giữa chừng vì "fetch failed"). */
async function fetchWithRetry(url: string, init?: RequestInit): Promise<Response> {
  for (let attempt = 0; ; attempt++) {
    try {
      const res = await fetch(url, { ...init, signal: AbortSignal.timeout(20_000) });
      if (res.status < 500 || attempt >= RETRY_DELAYS_MS.length) return res;
    } catch (err) {
      if (attempt >= RETRY_DELAYS_MS.length) throw err;
    }
    await new Promise((r) => setTimeout(r, RETRY_DELAYS_MS[attempt]));
  }
}

function checkAuth(provider: ImageProvider, status: number) {
  if (status === 401 || status === 403) {
    throw new Error(`Khoá API ${provider} không hợp lệ (${provider} trả ${status}). Kiểm tra lại backend/.env.`);
  }
}

class PixabaySource implements ImageSource {
  readonly provider = 'pixabay' as const;
  readonly localizedTags = true;
  constructor(private readonly key: string) {}

  async search(query: string, lang: SearchLang): Promise<ImageCandidate[]> {
    const params = new URLSearchParams({
      key: this.key,
      q: query.slice(0, 100),
      lang,
      image_type: 'photo',
      category: 'food',
      safesearch: 'true',
      per_page: String(PER_PAGE),
    });
    const res = await fetchWithRetry(`https://pixabay.com/api/?${params}`);
    if (res.status === 429) {
      const reset = Number(res.headers.get('x-ratelimit-reset'));
      throw new RateLimitReached('pixabay', Number.isFinite(reset) ? new Date(Date.now() + reset * 1000) : null);
    }
    checkAuth('pixabay', res.status);
    if (!res.ok) throw new Error(`Pixabay trả lỗi ${res.status} cho "${query}"`);

    const body = (await res.json()) as {
      hits?: { id: number; pageURL: string; tags: string; largeImageURL: string; user: string; user_id: number }[];
    };
    return (body.hits ?? []).map((h) => ({
      id: `pixabay:${h.id}`,
      provider: 'pixabay',
      url: h.largeImageURL,
      source_url: h.pageURL,
      author: h.user,
      author_url: `https://pixabay.com/users/${encodeURIComponent(h.user)}-${h.user_id}/`,
      description: h.tags ?? '',
    }));
  }
}

class PexelsSource implements ImageSource {
  readonly provider = 'pexels' as const;
  readonly localizedTags = false;
  constructor(private readonly key: string) {}

  async search(query: string, lang: SearchLang): Promise<ImageCandidate[]> {
    const params = new URLSearchParams({ query, per_page: String(PER_PAGE), locale: lang === 'vi' ? 'vi-VN' : 'en-US' });
    const res = await fetchWithRetry(`https://api.pexels.com/v1/search?${params}`, { headers: { Authorization: this.key } });
    if (res.status === 429) {
      const reset = Number(res.headers.get('x-ratelimit-reset'));
      throw new RateLimitReached('pexels', Number.isFinite(reset) && reset > 0 ? new Date(reset * 1000) : null);
    }
    checkAuth('pexels', res.status);
    if (!res.ok) throw new Error(`Pexels trả lỗi ${res.status} cho "${query}"`);

    const body = (await res.json()) as {
      photos?: { id: number; url: string; alt: string; photographer: string; photographer_url: string; src: { large: string } }[];
    };
    return (body.photos ?? []).map((p) => ({
      id: `pexels:${p.id}`,
      provider: 'pexels',
      url: p.src.large,
      source_url: p.url,
      author: p.photographer,
      author_url: p.photographer_url,
      description: p.alt ?? '',
    }));
  }
}

/** Các nguồn có khoá trong .env, theo thứ tự ưu tiên. */
export function configuredSources(env: NodeJS.ProcessEnv): ImageSource[] {
  const sources: ImageSource[] = [];
  if (env.PIXABAY_API_KEY?.trim()) sources.push(new PixabaySource(env.PIXABAY_API_KEY.trim()));
  if (env.PEXELS_API_KEY?.trim()) sources.push(new PexelsSource(env.PEXELS_API_KEY.trim()));
  return sources;
}

// Ảnh có mô tả/tags chứa đồ mặn thì bỏ: tìm "Nấm đùi gà" rất dễ ra ảnh thịt gà.
const NON_VEG = /\b(chicken|beef|pork|meat|meatball|steak|bacon|ham|sausage|salami|fish|salmon|tuna|shrimp|prawn|crab|lobster|seafood|squid|octopus|lamb|mutton|duck|turkey|oyster|clam|mussel|anchov\w*|sushi|sashimi)\b/i;
// Món thuần chay (vegan) thì bỏ thêm ảnh có trứng, sữa, phô mai.
const ANIMAL_PRODUCT = /\b(egg|eggs|cheese|milk|yogurt|yoghurt|butter|cream|honey)\b/i;

// Pixabay tìm bằng tiếng Việt thì tags cũng là tiếng Việt: dùng thêm bộ dò từ khoá mặn tiếng Việt của dự án.
const nonVegDetector = new NonVegetarianDetectorService();
const VI_ANIMAL_PRODUCT = ['trứng', 'phô mai', 'mật ong', 'sữa bò', 'sữa tươi', 'bơ sữa'];

/** Ảnh có dính đồ mặn (hoặc trứng/sữa với món thuần chay) theo mô tả/tags không. */
export function isAcceptable(candidate: ImageCandidate, dietType: string): boolean {
  const text = candidate.description;
  if (NON_VEG.test(text) || !nonVegDetector.checkText(text).isClean) return false;
  if (dietType === 'vegan') {
    if (ANIMAL_PRODUCT.test(text)) return false;
    if (VI_ANIMAL_PRODUCT.some((w) => containsPhrase(text, w))) return false;
  }
  return true;
}

/** Tên file trên Cloudinary theo tên món (không dấu), giống nhau trên máy mọi người: "Canh chua chay" -> "canh-chua-chay". */
export function slugify(title: string): string {
  return title
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120);
}
