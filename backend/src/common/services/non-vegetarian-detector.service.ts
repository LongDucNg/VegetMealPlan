import { Injectable } from '@nestjs/common';

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
];

export interface NonVegCheckResult {
  isClean: boolean;
  violations: string[];
}

@Injectable()
export class NonVegetarianDetectorService {
  private readonly keywords: string[] = DEFAULT_NON_VEG_KEYWORDS;
  private readonly exceptions: string[] = NON_VEG_EXCEPTIONS;

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
