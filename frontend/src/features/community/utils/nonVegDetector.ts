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
  'bánh bò',
];

export interface NonVegCheckResult {
  isClean: boolean;
  violations: string[];
}

/**
 * Kiểm tra chuỗi văn bản có chứa từ khóa nguyên liệu mặn hay không.
 * Đồng bộ với thuật toán Backend:
 * - Chuẩn hóa Unicode NFC và chữ thường.
 * - Bỏ qua các ngoại lệ thực vật/trứng/đời sống (ví dụ "đậu gà", "nấm đùi gà", "cá nhân").
 * - Khớp theo nguyên từ: (?<![\p{L}\p{N}])keyword(?![\p{L}\p{N}]).
 * - Cho phép nếu ngay sau từ mặn là chữ "chay" (ví dụ: "thịt chay", "cá chay", "mắm chay").
 */
export function checkNonVegText(text: string | null | undefined): NonVegCheckResult {
  if (!text || !text.trim()) {
    return { isClean: true, violations: [] };
  }

  let normalized = text.normalize('NFC').toLowerCase();

  // Tạm thời ẩn các cụm từ ngoại lệ bằng token an toàn để tránh bắt nhầm
  NON_VEG_EXCEPTIONS.forEach((exc, idx) => {
    const excNorm = exc.normalize('NFC').toLowerCase();
    const placeholder = `__EXCP_${idx}__`;
    if (normalized.includes(excNorm)) {
      normalized = normalized.split(excNorm).join(placeholder);
    }
  });

  const violationsSet = new Set<string>();

  for (const kw of DEFAULT_NON_VEG_KEYWORDS) {
    const kwNorm = kw.normalize('NFC').toLowerCase();
    const escapedKw = kwNorm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Regex tìm từ khóa khớp nguyên từ, đồng thời kiểm tra từ "chay" ngay sau nó:
    const pattern = new RegExp(
      `(?<![\\p{L}\\p{N}])(${escapedKw})(?![\\p{L}\\p{N}])(?:(\\s+chay)(?![\\p{L}\\p{N}]))?`,
      'gui',
    );

    let match: RegExpExecArray | null;
    while ((match = pattern.exec(normalized)) !== null) {
      const hasChayAfter = Boolean(match[2]);
      if (!hasChayAfter) {
        violationsSet.add(kw);
        break;
      }
    }
  }

  const violations = Array.from(violationsSet);
  return {
    isClean: violations.length === 0,
    violations,
  };
}

