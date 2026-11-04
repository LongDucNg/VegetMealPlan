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

export const UNACCENTED_NON_VEG_WORDS = [
  'thit',
  'thit heo',
  'thit bo',
  'thit ga',
  'thit vit',
  'thit cuu',
  'thit de',
  'thit lon',
  'heo quay',
  'thit quay',
  'thit kho',
  'thit nuong',
  'ca kho',
  'ca chien',
  'ca hap',
  'ca hoi',
  'ga ran',
  'ga luoc',
  'vit quay',
  'xuc xich',
  'lap xuong',
  'dam bong',
  'ba chi',
  'ba roi',
  'bach tuoc',
  'muc ong',
  'suon non',
];

export const HASHTAG_NON_VEG_ROOTS = [
  'thit', 'heo', 'lon', 'bo', 'ga', 'vit', 'ca', 'tom', 'cua', 'ghe',
  'muc', 'bachtuoc', 'oc', 'so', 'hau', 'ngheu', 'ngao', 'hen',
  'suon', 'xuong', 'mam', 'chalua', 'giothu', 'gioheo', 'changio',
  'lapxuong', 'dambong', 'xucxich', 'bacon', 'salami', 'luon', 'ech',
  'bachi', 'baroi'
];

export function removeVietnameseTones(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}

export interface NonVegCheckResult {
  isClean: boolean;
  violations: string[];
}

/**
 * Kiểm tra chuỗi văn bản có chứa từ khóa nguyên liệu mặn hay không.
 * Hỗ trợ:
 * 1. Tiếng Việt có dấu nguyên từ (chuẩn Unicode NFC).
 * 2. Tiếng Việt không dấu đặc trưng (ví dụ "thit", "thit heo", "ca kho"...).
 * 3. Hashtag viết liền hoặc không dấu (ví dụ "#thitkhotau", "#cahoi", "#suonxao"...).
 * 4. Bỏ qua các ngoại lệ thực vật/trứng/đời sống (ví dụ "đậu gà", "nấm đùi gà", "cá nhân").
 * 5. Bỏ qua từ mặn có chữ "chay" ngay sau (ví dụ: "thịt chay", "cá chay", "#thitchay").
 */
export function checkNonVegText(text: string | null | undefined): NonVegCheckResult {
  if (!text || !text.trim()) {
    return { isClean: true, violations: [] };
  }

  const violationsSet = new Set<string>();

  // 1. Quét theo nguyên từ có dấu chuẩn
  let normalized = text.normalize('NFC').toLowerCase();

  // Tạm thời ẩn các cụm từ ngoại lệ bằng token an toàn để tránh bắt nhầm
  NON_VEG_EXCEPTIONS.forEach((exc, idx) => {
    const excNorm = exc.normalize('NFC').toLowerCase();
    const placeholder = `__EXCP_${idx}__`;
    if (normalized.includes(excNorm)) {
      normalized = normalized.split(excNorm).join(placeholder);
    }
  });

  for (const kw of DEFAULT_NON_VEG_KEYWORDS) {
    const kwNorm = kw.normalize('NFC').toLowerCase();
    const escapedKw = kwNorm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

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

  // 2. Quét thông minh cho Hashtag (ví dụ: #thitkhotau, #cahoi)
  const hashtagMatches = text.match(/#[\p{L}\p{N}_-]+/gu) || [];
  for (const tag of hashtagMatches) {
    const rawTag = removeVietnameseTones(tag.toLowerCase().replace(/^#/, ''));
    if (rawTag.includes('chay')) continue;

    let isException = false;
    for (const exc of NON_VEG_EXCEPTIONS) {
      const cleanExc = removeVietnameseTones(exc.toLowerCase()).replace(/\s+/g, '');
      if (rawTag.includes(cleanExc)) {
        isException = true;
        break;
      }
    }
    if (isException) continue;

    for (const root of HASHTAG_NON_VEG_ROOTS) {
      if (rawTag.includes(root)) {
        violationsSet.add(tag);
        break;
      }
    }
  }

  // 3. Quét tiếng Việt không dấu trong nội dung
  let unaccentedText = removeVietnameseTones(text.toLowerCase());
  for (const exc of NON_VEG_EXCEPTIONS) {
    const excNorm = removeVietnameseTones(exc.toLowerCase());
    unaccentedText = unaccentedText.split(excNorm).join(' ');
  }

  for (const kw of UNACCENTED_NON_VEG_WORDS) {
    const pattern = new RegExp(
      `(?<![\\p{L}\\p{N}])(${kw})(?![\\p{L}\\p{N}])(?:(\\s+chay)(?![\\p{L}\\p{N}]))?`,
      'gui',
    );
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(unaccentedText)) !== null) {
      if (!match[2]) {
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
