import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { DataSource } from 'typeorm';
import type { ImageProvider } from './recipe-image-sources';

export type ImageMatch = 'exact' | 'similar' | 'generic';

/**
 * File src/database/seeds/data/recipe-images.json: tên món -> ảnh đã chọn. File này được commit lên git
 * để cả nhóm dùng chung (mỗi người chỉ cần `npm run images:apply`, không cần khoá API nào).
 */
export const IMAGES_FILE = join(__dirname, '..', 'seeds', 'data', 'recipe-images.json');

/** Ảnh seed nằm trong thư mục này trên Cloudinary; ảnh admin/người dùng tự tải lên nằm ở vegetmealplan/recipes. */
export const SEED_FOLDER = 'vegetmealplan/seed';

export interface RecipeImageEntry {
  /** Link đang dùng: link Cloudinary sau `images:cloudinary`, trước đó là link gốc. */
  url: string;
  /** Link ảnh gốc trên Pixabay/Pexels (Cloudinary tải ảnh từ đây). */
  original_url: string;
  candidate_id: string;
  provider: ImageProvider;
  source_url: string;
  author: string;
  author_url: string;
  description: string;
  query: string;
  /**
   * Mức độ khớp: exact = đúng món (tìm bằng tên tiếng Việt); similar = đúng loại món + nguyên liệu chính;
   * generic = chỉ đúng loại món hoặc nguyên liệu chính (ảnh minh hoạ). Xem recipe-image-keywords.ts.
   */
  match: ImageMatch;
  /** Ảnh minh hoạ chung đang dùng chung với món khác (chạy images:fetch với tuỳ chọn share). */
  shared?: boolean;
  /** Ảnh đã bị loại khi xem lại (images:review), lần tìm sau không chọn lại. */
  rejected?: string[];
}

/** Món đã tìm nhưng chưa có ảnh phù hợp (hoặc ảnh vừa bị loại). */
export interface MissingImageEntry {
  url: null;
  rejected?: string[];
}

export type ImageMap = Record<string, RecipeImageEntry | MissingImageEntry>;

export const hasImage = (e: RecipeImageEntry | MissingImageEntry | undefined): e is RecipeImageEntry => !!e?.url;
export const isOnCloudinary = (url: string) => url.includes('res.cloudinary.com');
export const isSeedImageUrl = (url: string | null | undefined) => !!url && url.includes(`/${SEED_FOLDER}/`);

export function loadMap(): ImageMap {
  return existsSync(IMAGES_FILE) ? JSON.parse(readFileSync(IMAGES_FILE, 'utf8')) : {};
}

/** Ghi theo thứ tự món truyền vào (thứ tự trong DB) để diff trên git dễ đọc; món không còn trong DB vẫn giữ ở cuối. */
export function saveMap(map: ImageMap, order: string[] = []) {
  const ordered: ImageMap = {};
  for (const title of order) if (title in map) ordered[title] = map[title];
  for (const title of Object.keys(map)) if (!(title in ordered)) ordered[title] = map[title];
  writeFileSync(IMAGES_FILE, JSON.stringify(ordered, null, 2) + '\n', 'utf8');
}

export interface DbRecipe {
  title: string;
  diet_type: string;
  image_url: string | null;
  /** Nguyên liệu chính (khối lượng lớn nhất, không tuỳ chọn): dùng làm từ khoá dự phòng. */
  main_ingredient: string | null;
}

/** Món đang có trong DB (trừ món đã gỡ), theo thứ tự id. */
export async function loadDbRecipes(dataSource: DataSource): Promise<DbRecipe[]> {
  return dataSource.query(`
    SELECT r.title, r.diet_type, r.image_url,
      (SELECT i.ingredient_name
         FROM recipe_ingredients ri JOIN ingredients i ON i.ingredient_id = ri.ingredient_id
        WHERE ri.recipe_id = r.recipe_id AND NOT COALESCE(ri.is_optional, false)
        ORDER BY ri.quantity DESC LIMIT 1) AS main_ingredient
    FROM recipes r
    WHERE r.status <> 'removed'
    ORDER BY r.recipe_id`);
}

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
