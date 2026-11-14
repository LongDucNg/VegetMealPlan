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
 * Kiểm tra một vị trí xuất hiện của từ khóa mặn có nằm trong ngữ cảnh món chay/giả mặn hay không:
 * 1. Phía sau có chữ "chay" trong vòng 4 từ (không vượt qua dấu câu hay từ nối):
 *    Ví dụ: "thịt chay", "thịt kho tàu chay", "sườn xào chua ngọt chay", "cá kho tiêu chay".
 * 2. Phía trước có chỉ dấu món chay trong vòng 3 từ:
 *    Ví dụ: "món chay thịt kho tàu", "đồ chay sườn rim", "giả thịt heo".
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
    /(?:món\s+chay|đồ\s+chay|thực\s+phẩm\s+chay|giả\s+mặn|giả|thay\s+thế\s+(?:cho\s+)?|thay\s+cho|thay\s+vì\s+(?:dùng\s+)?|thay\s+bằng|thay|không\s+(?:dùng|sử\s+dụng|cần|chứa|có|ăn)|tránh|kiêng|giống\s+(?:như\s+)?|tương\s+tự\s+(?:như\s+)?|dai\s+như|ngọt\s+như|vị\s+như|kết\s+cấu\s+như|mon\s+chay|do\s+chay|thuc\s+pham\s+chay|gia\s+man|gia|thay\s+the(?:\s+cho)?|thay\s+cho|thay\s+vi|thay\s+bang|khong\s+(?:dung|su\s+dung|can|chua|co|an)|tranh|kieng|giong(?:\s+nhu)?|tuong\s+tu(?:\s+nhu)?|dai\s+nhu|ngot\s+nhu)([^,;.:!?\n\r()[\]{}–—]*)$/iu,
  );
  if (preMatch) {
    const middle = preMatch[1].trim();
    if (!middle) return true; // "thay thế thịt", "không dùng thịt", "dai như thịt"
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

/**
 * Kiểm tra chuỗi văn bản có chứa từ khóa nguyên liệu mặn hay không.
 * Hỗ trợ:
 * 1. Tiếng Việt có dấu nguyên từ (chuẩn Unicode NFC).
 * 2. Tiếng Việt không dấu đặc trưng (ví dụ "thit", "thit heo", "ca kho"...).
 * 3. Hashtag viết liền hoặc không dấu (ví dụ "#thitkhotau", "#cahoi", "#suonxao"...).
 * 4. Bỏ qua các ngoại lệ thực vật/trứng/đời sống (ví dụ "đậu gà", "nấm đùi gà", "cá nhân").
 * 5. Bỏ qua từ mặn có ngữ cảnh "chay" / "giả mặn" (ví dụ: "thịt kho tàu chay", "sườn xào chay", "#monchay").
 * 6. Khử trùng lặp từ có dấu / không dấu và gộp các từ lồng nhau khi thông báo.
 */
export function checkNonVegText(text: string | null | undefined): NonVegCheckResult {
  if (!text || !text.trim()) {
    return { isClean: true, violations: [] };
  }

  const rawViolations = new Set<string>();

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
    const kwRegex = new RegExp(`(?<![\\p{L}\\p{N}])(${escapedKw})(?![\\p{L}\\p{N}])`, 'gui');

    let match: RegExpExecArray | null;
    while ((match = kwRegex.exec(normalized)) !== null) {
      const isVeg = isMatchInVegContext(normalized, match.index, match[0].length);
      if (!isVeg) {
        rawViolations.add(kw);
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
        rawViolations.add(tag);
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
    const escapedKw = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const kwRegex = new RegExp(`(?<![\\p{L}\\p{N}])(${escapedKw})(?![\\p{L}\\p{N}])`, 'gui');

    let match: RegExpExecArray | null;
    while ((match = kwRegex.exec(unaccentedText)) !== null) {
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
