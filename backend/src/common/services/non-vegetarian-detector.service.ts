import { Injectable } from '@nestjs/common';
import { splitIntoClauses } from '../utils/diet.util';

// TODO: Chuyển danh sách từ khóa mặn này sang bảng database do admin quản lý khi có yêu cầu.
export const DEFAULT_NON_VEG_KEYWORDS = [
  'thịt',
  'heo',
  'lợn',
  'bò',
  'gà',
  'vịt',
  'ngan',
  'ngỗng',
  'cừu',
  'dê',
  'cá',
  'tôm',
  'cua',
  'ghẹ',
  'mực',
  'bạch tuộc',
  'ốc',
  'sò',
  'hàu',
  'nghêu',
  'ngao',
  'hến',
  'sườn',
  'xương',
  'mắm',
  'chả lụa',
  'giò thủ',
  'giò lợn',
  'giò heo',
  'chân giò',
  'lạp xưởng',
  'dăm bông',
  'xúc xích',
  'bacon',
  'salami',
  'lươn',
  'ếch',
  'ba chỉ',
  'ba rọi',
];

// Danh sách ngoại lệ cho các từ/cụm từ không phải nguyên liệu mặn (ví dụ "cá nhân", "bò cạp")
export const NON_VEG_EXCEPTIONS = [
  'cá nhân',
  'bò cạp',
  'bọ cạp',
  'cá tính',
  'chuột túi',
  'nấm đùi gà',
  'đậu gà',
  'rau càng cua',
  'trứng gà',
  'trứng vịt',
  'trứng cút',
  'hoa móng bò',
  // "Bánh bò" là bánh bột gạo lên men (seed có "Bánh bò nướng", "Bánh bò hấp"), không có thịt bò.
  'bánh bò',
];

/**
 * Ngoại lệ là TÊN CÂY / TÊN RAU trong tiếng Việt chứa từ khóa mặn nhưng là
 * nguyên liệu thực vật (vd. "Đậu gà khô" = chickpeas, "Nấm đùi gà" = king oyster
 * mushroom).
 *
 * Danh sách này CHỈ áp dụng cho bước dò keyword trên TÊN NGUYÊN LIỆU.
 * Không tự động bỏ qua kiểm tra diet_type / vegan_flag.
 *
 * Lưu ý: các tên dạng "<từ khóa> chay" (vd. "Gà chay", "Cá chay") đã được xử lý
 * bởi quy tắc "chay" đứng riêng nên không cần liệt kê ở đây.
 */
export const PLANT_NAME_EXCEPTIONS = [
  'đậu gà',
  'nấm đùi gà',
];

/**
 * Tên NGUYÊN LIỆU trứng chứa từ khóa mặn do tên loài vật ("trứng gà").
 * VD: "Trứng gà" chứa từ "gà" -> nếu không che thì bị chặn nhầm ở chế độ
 * `ovo` / `ovo_lacto` (vốn được phép trứng).
 *
 * Che cụm này chỉ áp dụng cho bước dò keyword trên TÊN NGUYÊN LIỆU.
 * Kiểm tra diet_type vẫn dùng tên gốc nên trứng vẫn bị chặn với `vegan`.
 */
export const EGG_NAME_EXCEPTIONS = [
  'trứng gà',
  'trứng vịt',
  'trứng cút',
];

export function removeVietnameseTones(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}

export const HASHTAG_NON_VEG_ROOTS = [
  'thit', 'heo', 'lon', 'bo', 'ga', 'vit', 'ca', 'tom', 'cua', 'ghe',
  'muc', 'bachtuoc', 'oc', 'so', 'hau', 'ngheu', 'ngao', 'hen',
  'suon', 'xuong', 'mam', 'chalua', 'giothu', 'gioheo', 'changio',
  'lapxuong', 'dambong', 'xucxich', 'bacon', 'salami', 'luon', 'ech',
  'bachi', 'baroi'
];

export const UNACCENTED_NON_VEG_WORDS = [
  'thit', 'thit heo', 'thit bo', 'thit ga', 'thit vit', 'thit cuu',
  'thit de', 'thit lon', 'heo quay', 'thit quay', 'thit kho', 'thit nuong',
  'ca kho', 'ca chien', 'ca hap', 'ca hoi', 'ga ran', 'ga luoc',
  'vit quay', 'xuc xich', 'lap xuong', 'dam bong', 'ba chi', 'ba roi',
  'bach tuoc', 'muc ong', 'suon non'
];

export const STOP_WORDS = new Set([
  'và', 'va', 'hoặc', 'hoac', 'hay', 'nhưng', 'nhung', 'còn', 'con',
  'với', 'voi', 'cùng', 'cung', 'chứ', 'chu', 'kèm', 'kem',
  'ăn', 'an', 'ngày', 'ngay', 'tháng', 'thang', 'người', 'nguoi',
  'thay', 'thay vì', 'thay cho',
]);

export const CANONICAL_VIOLATION_MAP: Record<string, string> = {
  thit: 'thịt',
  'thit heo': 'thịt heo',
  'thit bo': 'thịt bò',
  'thit ga': 'thịt gà',
  'thit vit': 'thịt vịt',
  'thit cuu': 'thịt cừu',
  'thit de': 'thịt dê',
  'thit lon': 'thịt lợn',
  'heo quay': 'heo quay',
  'thit quay': 'thịt quay',
  'thit kho': 'thịt kho',
  'thit nuong': 'thịt nướng',
  'ca kho': 'cá kho',
  'ca chien': 'cá chiên',
  'ca hap': 'cá hấp',
  'ca hoi': 'cá hồi',
  'ga ran': 'gà rán',
  'ga luoc': 'gà luộc',
  'vit quay': 'vịt quay',
  'xuc xich': 'xúc xích',
  'lap xuong': 'lạp xưởng',
  'dam bong': 'dăm bông',
  'ba chi': 'ba chỉ',
  'ba roi': 'ba rọi',
  'bach tuoc': 'bạch tuộc',
  'muc ong': 'mực ống',
  'suon non': 'sườn non',
  heo: 'heo',
  lon: 'lợn',
  bo: 'bò',
  ga: 'gà',
  vit: 'vịt',
  ca: 'cá',
  tom: 'tôm',
  cua: 'cua',
  ghe: 'ghẹ',
  muc: 'mực',
  bachtuoc: 'bạch tuộc',
  oc: 'ốc',
  so: 'sò',
  hau: 'hàu',
  ngheu: 'nghêu',
  ngao: 'ngao',
  hen: 'hến',
  suon: 'sườn',
  xuong: 'xương',
  mam: 'mắm',
  chalua: 'chả lụa',
  giothu: 'giò thủ',
  gioheo: 'giò heo',
  changio: 'chân giò',
  lapxuong: 'lạp xưởng',
  dambong: 'dăm bông',
  xucxich: 'xúc xích',
  bacon: 'bacon',
  salami: 'salami',
  luon: 'lươn',
  ech: 'ếch',
  bachi: 'ba chỉ',
  baroi: 'ba rọi',
};

/**
 * Kiểm tra một vị trí xuất hiện của từ khóa mặn có nằm trong ngữ cảnh món chay/giả mặn hay không.
 */
export function isMatchInVegContext(text: string, matchIndex: number, matchLen: number): boolean {
  // 1. Kiểm tra hậu tố "chay" hoặc "thực vật"
  const afterText = text.slice(matchIndex + matchLen);
  const postMatch = afterText.match(/^([^,;.:!?\n\r()[\]{}–—]*?)\s+(?:chay|thực\s+vật)(?![^\s,;.:!?\n\r()[\]{}–—])/iu);
  if (postMatch) {
    const middle = postMatch[1].trim();
    if (!middle) return true; // Trực tiếp: "thịt chay", "đạm thực vật"
    const words = middle.split(/\s+/).filter(Boolean);
    if (words.length <= 4) {
      const hasStopWord = words.some((w) => STOP_WORDS.has(w.toLowerCase()));
      if (!hasStopWord) return true; // Cụm món ăn: "thịt kho tàu chay"
    }
  }

  // 2. Kiểm tra tiền tố món chay hoặc ngữ cảnh thay thế / phủ định / so sánh chay
  const beforeText = text.slice(0, matchIndex);
  const preMatch = beforeText.match(
    /(?:món\s+chay|đồ\s+chay|thực\s+phẩm\s+chay|giả\s+mặn|giả|thay\s+thế\s+(?:cho\s+)?|thay\s+cho|thay\s+vì\s+(?:dùng\s+)?|thay\s+bằng|thay|không\s+(?:dùng|sử\s+dụng|cần|chứa|có|ăn)|tránh|kiêng|giống\s+(?:như\s+)?|tương\s+tự\s+(?:như\s+)?|dai\s+như|ngọt\s+như|vị\s+như|kết\s+cấu\s+như|mon\s+chay|do\s+chay|thuc\s+pham\s+chay|gia\s+man|gia|thay\s+the(?:\s+cho)?|thay\s+vi|thay\s+bang|khong\s+(?:dung|su\s+dung|can|chua|co|an)|tranh|kieng|giong(?:\s+nhu)?|tuong\s+tu(?:\s+nhu)?|dai\s+nhu|ngot\s+nhu)([^,;.:!?\n\r()[\]{}–—]*)$/iu,
  );
  if (preMatch) {
    const middle = preMatch[1].trim();
    if (!middle) return true;
    const words = middle.split(/\s+/).filter(Boolean);
    if (words.length <= 3) {
      const hasStopWord = words.some((w) => STOP_WORDS.has(w.toLowerCase()));
      if (!hasStopWord) return true;
    }
  }

  return false;
}

/**
 * Khử trùng lặp, chuẩn hóa từ không dấu về có dấu, và loại bỏ từ con/từ thừa
 */
export function cleanViolations(violations: Iterable<string>): string[] {
  const canonical = new Set<string>();
  for (const v of violations) {
    const raw = v.toLowerCase().trim().replace(/^#/, '');
    const mapped = CANONICAL_VIOLATION_MAP[raw] || v;
    canonical.add(mapped);
  }

  const sorted = Array.from(canonical).sort((a, b) => a.length - b.length);
  const result: string[] = [];

  for (const item of sorted) {
    const isRedundant = result.some((existing) => {
      const regex = new RegExp(`(?<![\\p{L}\\p{N}])${existing.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![\\p{L}\\p{N}])`, 'u');
      return regex.test(item);
    });
    if (!isRedundant) {
      result.push(item);
    }
  }

  return result;
}

export interface NonVegCheckResult {
  isClean: boolean;
  violations: string[];
}

/** Từ "chay" đứng riêng (không dính chữ khác) - ngoại lệ của dự án. */
const STANDALONE_CHAY_REGEX = /(?<![\p{L}\p{N}])chay(?![\p{L}\p{N}])/u;

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Chuẩn hoá văn bản cho bước dò từ khóa: Unicode NFC + chữ thường + gộp khoảng trắng.
 */
export function normalizeForKeywordScan(text: string): string {
  return text.normalize('NFC').toLowerCase().replace(/\s+/g, ' ').trim();
}

/**
 * Ẩn các cụm từ ngoại lệ bằng token an toàn để không bắt nhầm
 * (vd. "cá nhân" không được hiểu là có "cá").
 */
export function hideKeywordExceptions(
  text: string,
  exceptions: string[] = NON_VEG_EXCEPTIONS,
): string {
  let normalized = text;

  exceptions.forEach((exc, idx) => {
    const excNorm = normalizeForKeywordScan(exc);
    const placeholder = `__EXCP_${idx}__`;
    if (normalized.includes(excNorm)) {
      normalized = normalized.split(excNorm).join(placeholder);
    }
  });

  return normalized;
}

/**
 * Dò từ khóa mặn theo TỪ NGUYÊN (không khớp lấn vào từ khác).
 * VD: "cá" khớp "Cá hồi" nhưng KHÔNG khớp "Cà rốt" hay "Cà chua".
 */
export function matchSaltyKeywords(
  normalizedText: string,
  keywords: string[] = DEFAULT_NON_VEG_KEYWORDS,
): string[] {
  const violations = new Set<string>();

  for (const kw of keywords) {
    const pattern = new RegExp(
      `(?<![\\p{L}\\p{N}])${escapeRegex(normalizeForKeywordScan(kw))}(?![\\p{L}\\p{N}])`,
      'iu',
    );

    if (pattern.test(normalizedText)) {
      violations.add(kw);
    }
  }

  return Array.from(violations);
}

/**
 * Kiểm tra TÊN NGUYEN LIỆU có chứa từ khóa mặn hay không.
 *
 * Quy tắc (riêng cho tên nguyên liệu, KHÔNG áp dụng cho tên món ăn):
 * 1. Chuẩn hoá Unicode NFC + chữ thường + gộp khoảng trắng.
 * 2. Ẩn các cụm từ ngoại lệ (vd. "cá nhân", và các ngoại lệ thực vật do
 *    module BE2 truyền vào) để tránh bắt nhầm.
 * 3. Ngoại lệ "chay" CHỈ áp dụng cho MỆNH ĐỀ có chứa từ riêng biệt "chay"
 *    (vd. "Thịt bò chay", "Cá chay", "Gà chay"). Tên gộp nhiều mệnh đề
 *    (vd. "Thịt bò chay và cá hồi") thì mệnh đề KHÔNG có "chay" vẫn bị dò
 *    keyword -> không lọt qua.
 * 4. Nếu không có từ khóa mặn nào -> sạch.
 *
 * Lưu ý: qua bước keyword KHÔNG đồng nghĩa đã xác minh thành phần thực tế
 * là thuần chay - phải kiểm tra diet_type / vegan_flag riêng.
 */
export function checkIngredientNameKeyword(
  name: string | null | undefined,
  options: { extraExceptions?: string[] } = {},
): NonVegCheckResult {
  if (!name || !name.trim()) {
    return { isClean: true, violations: [] };
  }

  const exceptions = [
    ...NON_VEG_EXCEPTIONS,
    ...(options.extraExceptions ?? []),
  ];

  const normalized = hideKeywordExceptions(
    normalizeForKeywordScan(name),
    exceptions,
  );

  // Ngoại lệ "chay": CHỈ bỏ qua mệnh đề có từ riêng biệt "chay".
  // Mệnh đề khác (vd. "cá hồi" trong "Thịt bò chay và cá hồi") vẫn được dò.
  const clauses = splitIntoClauses(normalized);
  const scanned = clauses.length > 0 ? clauses : [normalized];

  const violations = new Set<string>();

  for (const clause of scanned) {
    if (STANDALONE_CHAY_REGEX.test(clause)) {
      continue;
    }

    matchSaltyKeywords(clause).forEach((kw) => violations.add(kw));
  }

  return {
    isClean: violations.size === 0,
    violations: Array.from(violations),
  };
}

@Injectable()
export class NonVegetarianDetectorService {
  private readonly keywords: string[] = DEFAULT_NON_VEG_KEYWORDS;
  private readonly exceptions: string[] = NON_VEG_EXCEPTIONS;

  /**
   * Kiểm tra TÊN NGUYÊN LIỆU (không phải tên món ăn) theo quy tắc keyword
   * của dự án:
   * - Có từ khóa mặn và KHÔNG có từ riêng biệt "chay" -> vi phạm.
   * - Có từ khóa mặn và CÓ từ riêng biệt "chay" -> qua bước keyword.
   * - Không có từ khóa mặn -> qua bước keyword.
   *
   * Dùng chung cho: tạo công thức, sửa công thức và import công thức.
   * Lưu ý: qua bước keyword KHÔNG đồng nghĩa đã xác minh thành phần
   * thực tế là thuần chay (kiểm tra diet_type / vegan_flag là bước riêng).
   */
  checkIngredientName(
    name: string | null | undefined,
    options: { extraExceptions?: string[] } = {},
  ): NonVegCheckResult {
    return checkIngredientNameKeyword(name, {
      extraExceptions: [
        ...PLANT_NAME_EXCEPTIONS,
        ...EGG_NAME_EXCEPTIONS,
        ...(options.extraExceptions ?? []),
      ],
    });
  }

  /**
   * Kiểm tra một chuỗi văn bản có chứa từ khóa nguyên liệu mặn hay không.
   * Hỗ trợ:
   * 1. Chuẩn hóa về Unicode NFC và chữ thường.
   * 2. Bỏ qua các ngoại lệ (ví dụ "cá nhân", "đậu gà", "bánh bò"...).
   * 3. Khớp theo nguyên từ: (?<![\p{L}\p{N}])keyword(?![\p{L}\p{N}]).
   * 4. Từ khóa mặn mà nằm trong ngữ cảnh "chay" / "giả mặn" thì được qua:
   *    - Hậu tố: "thịt chay", "thịt kho tàu chay", "sườn xào chua ngọt chay", "cá kho tiêu chay".
   *    - Tiền tố: "món chay thịt kho tàu", "đồ chay sườn rim", "giả thịt heo".
   * 5. Quét hashtag (#monchay, #thitkhotau...).
   * 6. Quét tiếng Việt không dấu.
   * 7. Khử trùng lặp và chuẩn hóa danh sách từ vi phạm trước khi trả về.
   */
  checkText(text: string | null | undefined): NonVegCheckResult {
    if (!text || !text.trim()) {
      return { isClean: true, violations: [] };
    }

    const rawViolations = new Set<string>();

    // 1. Chuẩn hóa văn bản về Unicode NFC và chữ thường
    let normalized = text.normalize('NFC').toLowerCase();

    // 2. Tạm thời ẩn các cụm từ ngoại lệ bằng token an toàn để tránh bắt nhầm
    this.exceptions.forEach((exc, idx) => {
      const excNorm = exc.normalize('NFC').toLowerCase();
      const placeholder = `__EXCP_${idx}__`;
      if (normalized.includes(excNorm)) {
        normalized = normalized.split(excNorm).join(placeholder);
      }
    });

    // 3 & 4. Kiểm tra từng từ khóa mặn có dấu
    for (const kw of this.keywords) {
      const kwNorm = kw.normalize('NFC').toLowerCase();
      const escapedKw = kwNorm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const pattern = new RegExp(`(?<![\\p{L}\\p{N}])(${escapedKw})(?![\\p{L}\\p{N}])`, 'gui');

      let match: RegExpExecArray | null;
      while ((match = pattern.exec(normalized)) !== null) {
        const isVeg = isMatchInVegContext(normalized, match.index, match[0].length);
        if (!isVeg) {
          rawViolations.add(kw);
          break;
        }
      }
    }

    // 5. Quét thông minh cho Hashtag (ví dụ: #thitkhotau, #cahoi)
    const hashtagMatches = text.match(/#[\p{L}\p{N}_-]+/gu) || [];
    for (const tag of hashtagMatches) {
      const rawTag = removeVietnameseTones(tag.toLowerCase().replace(/^#/, ''));
      if (rawTag.includes('chay')) continue;

      let isException = false;
      for (const exc of this.exceptions) {
        const cleanExc = removeVietnameseTones(exc.toLowerCase()).replace(/\s+/g, '');
        if (rawTag.includes(cleanExc)) {
          isException = true;
          break;
        }
      }
      if (isException) continue;

      for (const root of HASHTAG_NON_VEG_ROOTS) {
        if (rawTag.includes(root)) {
          rawViolations.add(tag);
          break;
        }
      }
    }

    // 6. Quét tiếng Việt không dấu trong nội dung
    let unaccentedText = removeVietnameseTones(text.toLowerCase());
    for (const exc of this.exceptions) {
      const excNorm = removeVietnameseTones(exc.toLowerCase());
      unaccentedText = unaccentedText.split(excNorm).join(' ');
    }

    for (const kw of UNACCENTED_NON_VEG_WORDS) {
      const escapedKw = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const pattern = new RegExp(`(?<![\\p{L}\\p{N}])(${escapedKw})(?![\\p{L}\\p{N}])`, 'gui');

      let match: RegExpExecArray | null;
      while ((match = pattern.exec(unaccentedText)) !== null) {
        const isVeg = isMatchInVegContext(unaccentedText, match.index, match[0].length);
        if (!isVeg) {
          rawViolations.add(kw);
          break;
        }
      }
    }

    const violations = cleanViolations(rawViolations);
    return {
      isClean: violations.length === 0,
      violations,
    };
  }

  /**
   * Kiểm tra danh sách nguyên liệu.
   * Duyệt qua từng nguyên liệu, trả về danh sách các từ vi phạm và tên nguyên liệu vi phạm.
   */
  checkIngredients(
    ingredients: Array<{ name: string; amount?: string } | string> | null | undefined,
  ): { isClean: boolean; violations: string[]; offendingIngredients: string[] } {
    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return { isClean: true, violations: [], offendingIngredients: [] };
    }

    const violationsSet = new Set<string>();
    const offendingIngredientsSet = new Set<string>();

    for (const item of ingredients) {
      const name = typeof item === 'string' ? item : item?.name;
      if (!name) continue;

      const result = this.checkText(name);
      if (!result.isClean) {
        result.violations.forEach((v) => violationsSet.add(v));
        offendingIngredientsSet.add(name);
      }
    }

    const violations = Array.from(violationsSet);
    const offendingIngredients = Array.from(offendingIngredientsSet);

    return {
      isClean: violations.length === 0,
      violations,
      offendingIngredients,
    };
  }
}
