import {
  Category,
  CategoryStatus,
  CategoryType,
  RECIPE_CATEGORY_TYPES,
} from '../category/entities/category.entity';

/**
 * Đọc và kiểm tra cột "Danh mục" của file import công thức.
 *
 * Quy ước dữ liệu (giống seed 628 món): mỗi công thức thuộc tối đa
 * 1 "nhóm món" (recipe_type, vd. "Canh & Súp") và 1 "loại món" (food_type, vd. "Món mặn").
 *
 * Ô danh mục chấp nhận:
 *   - id:  "3, 12" hoặc "[3,12]"
 *   - tên: "Canh & Súp, Canh/súp" (không phân biệt hoa thường).
 *     Tên danh mục có thể chứa dấu phẩy ("Mì, Bún & Phở") nên KHÔNG tách theo dấu phẩy
 *     một cách mù quáng: dò tên dài nhất trước rồi mới xét phần còn lại.
 *
 * Mọi sai sót đều trả về lỗi kèm danh sách danh mục hợp lệ để admin chọn lại,
 * không bao giờ âm thầm bỏ qua danh mục.
 */

export interface CategoryResolveResult {
  ids?: number[];
  error?: string;
}

const TYPE_LABEL: Record<string, string> = {
  [CategoryType.RECIPE_TYPE]: 'Nhóm món',
  [CategoryType.FOOD_TYPE]: 'Loại món',
};

function normalize(text: string): string {
  return text.normalize('NFC').toLowerCase().replace(/\s+/g, ' ').trim();
}

/** Ô chỉ gồm số và dấu phân cách -> hiểu là danh sách id. */
export function isCategoryIdList(raw: string): boolean {
  return /^[\s\d,;|[\]]+$/.test(raw) && /\d/.test(raw);
}

/** Danh sách danh mục được phép gắn cho công thức, để in trong thông báo lỗi. */
export function describeValidCategories(all: Category[]): string {
  const groups = [CategoryType.RECIPE_TYPE, CategoryType.FOOD_TYPE].map((type) => {
    const names = all
      .filter((c) => c.category_type === type && c.status !== CategoryStatus.INACTIVE)
      .map((c) => `"${c.category_name}" (#${c.category_id})`);
    return `${TYPE_LABEL[type]}: ${names.length ? names.join(', ') : '(chưa có)'}`;
  });
  return `Danh mục hợp lệ - ${groups.join('; ')}`;
}

/**
 * Đổi nội dung ô danh mục (tên hoặc id) thành danh sách id.
 * Chỉ kiểm "có tồn tại không"; loại/trạng thái do validateImportCategories kiểm.
 */
export function resolveCategoryText(raw: string, all: Category[]): CategoryResolveResult {
  const text = normalize(raw);
  if (!text) return { ids: [] };

  const ids = new Set<number>();
  const unknown: string[] = [];
  const byId = new Map(all.map((c) => [c.category_id, c]));

  if (isCategoryIdList(text)) {
    for (const token of text.split(/[\s,;|[\]]+/).filter(Boolean)) {
      const id = Number(token);
      if (byId.has(id)) ids.add(id);
      else unknown.push(`#${token}`);
    }
  } else {
    // Tên dài trước để "Tráng miệng & Đồ uống" không bị khớp nhầm thành "Đồ uống".
    // Cùng độ dài thì ưu tiên danh mục gắn được cho công thức.
    const candidates = [...all].sort((a, b) => {
      const diff = b.category_name.length - a.category_name.length;
      if (diff !== 0) return diff;
      return Number(RECIPE_CATEGORY_TYPES.includes(b.category_type)) -
        Number(RECIPE_CATEGORY_TYPES.includes(a.category_type));
    });

    let rest = ` ${text} `;
    for (const cat of candidates) {
      const name = normalize(cat.category_name);
      if (!name) continue;
      // Tên phải đứng trọn vẹn (đầu/cuối ô hoặc cạnh dấu phân cách), không khớp một phần chữ.
      const pattern = new RegExp(`(^|[,;|\\n]|\\s)${escapeRegExp(name)}(?=$|[,;|\\n]|\\s)`, 'u');
      while (pattern.test(rest)) {
        ids.add(cat.category_id);
        rest = rest.replace(pattern, '$1 ; ');
      }
    }

    for (const token of rest.split(/[,;|\n]+/).map((t) => t.trim()).filter(Boolean)) {
      if (/^#?\d+$/.test(token) && byId.has(Number(token.replace('#', '')))) {
        ids.add(Number(token.replace('#', '')));
      } else {
        unknown.push(`"${token}"`);
      }
    }
  }

  if (unknown.length > 0) {
    return {
      error: `Danh mục không tồn tại: ${unknown.join(', ')}. ${describeValidCategories(all)}`,
    };
  }
  return { ids: [...ids] };
}

/**
 * Kiểm tra danh mục của một dòng import:
 *   - tồn tại;
 *   - đúng loại gắn được cho công thức (không nhận danh mục diễn đàn...);
 *   - đang hoạt động (không nhận danh mục admin đã tắt);
 *   - tối đa 1 nhóm món và 1 loại món (giống dữ liệu gốc), nhiều hơn là không khớp.
 * Trả về null nếu hợp lệ, ngược lại trả câu báo lỗi kèm danh sách để chọn lại.
 */
export function validateImportCategories(ids: number[], all: Category[]): string | null {
  const byId = new Map(all.map((c) => [c.category_id, c]));
  const unique = [...new Set(ids)];
  const hint = describeValidCategories(all);

  const missing = unique.filter((id) => !byId.has(id));
  if (missing.length) {
    return `Danh mục không tồn tại: ${missing.map((id) => `#${id}`).join(', ')}. ${hint}`;
  }

  const found = unique.map((id) => byId.get(id)!);

  const wrongType = found.filter((c) => !RECIPE_CATEGORY_TYPES.includes(c.category_type));
  if (wrongType.length) {
    return (
      `Danh mục không gắn được cho công thức (chỉ nhận nhóm món/loại món): ` +
      `${wrongType.map((c) => `"${c.category_name}"`).join(', ')}. ${hint}`
    );
  }

  const inactive = found.filter((c) => c.status === CategoryStatus.INACTIVE);
  if (inactive.length) {
    return `Danh mục đã ngừng sử dụng: ${inactive.map((c) => `"${c.category_name}"`).join(', ')}. ${hint}`;
  }

  for (const type of [CategoryType.RECIPE_TYPE, CategoryType.FOOD_TYPE]) {
    const ofType = found.filter((c) => c.category_type === type);
    if (ofType.length > 1) {
      return (
        `Mỗi món chỉ thuộc 1 ${TYPE_LABEL[type].toLowerCase()}, dòng này chọn ${ofType.length}: ` +
        `${ofType.map((c) => `"${c.category_name}"`).join(', ')}. Vui lòng chọn lại.`
      );
    }
  }

  return null;
}

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
