/**
 * Phân loại mức độ xung khắc giữa 2 nguyên liệu.
 *
 * Dữ liệu conflict lưu mức độ ở đầu chuỗi `reason`, theo format:
 *   [avoid/A]  - nên tránh, mức A
 *   [caution/B]- cẩn thận, mức B
 *   [tip/A]    - MẸO TỐT (2 nguyên liệu hỗ trợ lẫn nhau), mức A
 *
 * `tip` KHÔNG phải là xung khắc - đó là gợi ý có lợi (VD: Vitamin C giúp hấp
 * thu sắt thực vật). Dùng chung bảng cho cả "cảnh báo" lẫn "tip" nên phải
 * tách mức độ ra, nếu không mọi công thức dùng đậu hũ + chanh sẽ bị chặn
 * import oan (xem BE2 row "Bánh xèo chay").
 */

export type ConflictSeverityType = 'avoid' | 'caution' | 'tip';

export interface ParsedConflictSeverity {
  type: ConflictSeverityType;
  grade: string | null;
}

const SEVERITY_PATTERN = /^\[\s*(avoid|caution|tip)\s*\/\s*([A-C])\s*\]\s*/i;

/**
 * Tách mức độ khỏi `reason`. Nếu `reason` không theo format thì trả về null
 * (không đoán mò) - để caller quyết định mặc định.
 */
export function parseConflictSeverity(
  reason?: string | null,
): ParsedConflictSeverity | null {
  if (!reason) return null;

  const match = SEVERITY_PATTERN.exec(reason);
  if (!match) return null;

  return {
    type: match[1].toLowerCase() as ConflictSeverityType,
    grade: match[2].toUpperCase(),
  };
}

/**
 * Cặp nguyên liệu có chặn import hay không.
 *
 * - `avoid` / `caution`: có xung khắc thật -> chặn dòng import.
 * - `tip`: mẹo tốt, hợp lệ -> KHÔNG chặn.
 * - `reason` không theo format: coi như xung khắc (fail-safe, giữ hành vi cũ).
 */
export function isBlockingConflict(reason?: string | null): boolean {
  const parsed = parseConflictSeverity(reason);
  if (!parsed) return true;
  return parsed.type !== 'tip';
}
