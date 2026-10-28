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
   * Quy tắc:
   * 1. Chuẩn hóa về Unicode NFC và chữ thường.
   * 2. Bỏ qua các ngoại lệ (ví dụ "cá nhân").
   * 3. Khớp theo nguyên từ: (?<![\p{L}\p{N}])keyword(?![\p{L}\p{N}]).
   * 4. Từ khóa mặn mà ngay sau nó là chữ "chay" thì được qua (ví dụ "thịt chay", "cá chay", "mắm chay").
   *    Nếu chuỗi có cả hai ("thịt chay và thịt heo") thì vẫn bị phát hiện vi phạm.
   * 5. Trả về { isClean, violations }.
   */
  checkText(text: string | null | undefined): NonVegCheckResult {
    if (!text || !text.trim()) {
      return { isClean: true, violations: [] };
    }

    // 1. Chuẩn hóa văn bản về Unicode NFC và chữ thường
    let normalized = text.normalize('NFC').toLowerCase();

    // 2. Tạm thời ẩn các cụm từ ngoại lệ bằng token an toàn để tránh bắt nhầm
    const placeholderMap = new Map<string, string>();
    this.exceptions.forEach((exc, idx) => {
      const excNorm = exc.normalize('NFC').toLowerCase();
      const placeholder = `__EXCP_${idx}__`;
      if (normalized.includes(excNorm)) {
        placeholderMap.set(placeholder, excNorm);
        normalized = normalized.split(excNorm).join(placeholder);
      }
    });

    const violationsSet = new Set<string>();

    // 3 & 4. Kiểm tra từng từ khóa mặn
    for (const kw of this.keywords) {
      const kwNorm = kw.normalize('NFC').toLowerCase();
      const escapedKw = kwNorm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

      // Regex tìm từ khóa khớp nguyên từ, đồng thời kiểm tra từ "chay" ngay sau nó:
      // Group 1: từ khóa
      // Group 2: khoảng trắng + "chay" nếu có ngay sau
      const pattern = new RegExp(
        `(?<![\\p{L}\\p{N}])(${escapedKw})(?![\\p{L}\\p{N}])(?:(\\s+chay)(?![\\p{L}\\p{N}]))?`,
        'gui',
      );

      let match: RegExpExecArray | null;
      while ((match = pattern.exec(normalized)) !== null) {
        const hasChayAfter = Boolean(match[2]);
        if (!hasChayAfter) {
          // Xuất hiện từ khóa mặn mà không đi kèm chữ "chay" ngay sau nó -> Vi phạm!
          violationsSet.add(kw);
          break; // Chỉ cần ghi nhận 1 lần vi phạm cho từ khóa này
        }
      }
    }

    const violations = Array.from(violationsSet);
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
