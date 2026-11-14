import { Injectable, Logger } from '@nestjs/common';
import { NonVegetarianDetectorService } from '../../common/services/non-vegetarian-detector.service';

export interface SafetyCheckResult {
  isSafe: boolean;
  reason?: string;
}

/**
 * Các cụm từ/từ khóa báo hiệu ngữ cảnh AN TOÀN khi đề cập đến một nguyên liệu:
 * 1. Cảnh báo / kiêng / dị ứng.
 * 2. Thay thế / phương án thay cho nguyên liệu đó.
 * 3. So sánh kết cấu / hương vị tương đương.
 */
export const SAFE_ALLERGEN_CONTEXT_KEYWORDS = [
  // Cảnh báo, kiêng kỵ
  'dị ứng', 'di ung',
  'tránh', 'tranh',
  'không nên', 'khong nen',
  'không sử dụng', 'khong su dung',
  'không dùng', 'khong dung',
  'không ăn', 'khong an',
  'không có', 'khong co',
  'không chứa', 'khong chua',
  'không cần', 'khong can',
  'loại bỏ', 'loai bo',
  'loại trừ', 'loai tru',
  'kiêng', 'kieng',
  'hạn chế', 'han che',
  'bỏ qua', 'bo qua',
  'không thích hợp', 'khong thich hop',
  'không an toàn', 'khong an toan',

  // Thay thế nguyên liệu
  'thay thế', 'thay the',
  'thay cho',
  'thay bằng', 'thay bang',
  'thay vì', 'thay vi',
  'thế cho', 'the cho',
  'đổi sang', 'doi sang',
  'đổi thành', 'doi thanh',
  'lựa chọn thay', 'lua chon thay',
  'phương án thay', 'phuong an thay',
  'giải pháp thay', 'giai phap thay',
  'nguyên liệu thay', 'nguyen lieu thay',
  'thay thế cho', 'thay the cho',

  // So sánh kết cấu / hương vị ẩm thực
  'tương tự', 'tuong tu',
  'giống', 'giong',
  'như', 'nhu',
  'mô phỏng', 'mo phong',
  'kết cấu', 'ket cau',
  'hương vị', 'huong vi',
  'vị umami', 'vi umami',
  'vị ngọt', 'vi ngot',
  'độ dai', 'do dai',
];

@Injectable()
export class ChatbotSafetyService {
  private readonly logger = new Logger(ChatbotSafetyService.name);

  constructor(private readonly nonVegDetector: NonVegetarianDetectorService) {}

  /**
   * Kiểm tra câu hỏi của người dùng có phải là yêu cầu tìm nguyên liệu thay thế cho dị ứng không.
   */
  private isUserAskingForSubstitution(question: string | undefined, cleanAllergen: string): boolean {
    if (!question || !question.trim()) return false;
    const normQ = question.normalize('NFC').toLowerCase();
    const escaped = cleanAllergen.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const allergenRegex = new RegExp(`(?<![\\p{L}\\p{N}])${escaped}(?![\\p{L}\\p{N}])`, 'u');
    if (!allergenRegex.test(normQ)) return false;

    const subKeywords = [
      'thay thế', 'thay the',
      'thay cho',
      'thay bằng', 'thay bang',
      'thay vì', 'thay vi',
      'thay',
      'đổi', 'doi',
      'không ăn được', 'khong an duoc',
      'không dùng được', 'khong dung duoc',
      'dị ứng', 'di ung',
      'kiêng', 'kieng',
    ];
    return subKeywords.some((kw) => normQ.includes(kw));
  }

  /**
   * Kiểm tra dòng/mệnh đề chứa từ khóa dị ứng có nằm trong ngữ cảnh an toàn (thay thế, cảnh báo, so sánh) hay không.
   */
  private isLineInSafeContext(line: string, escapedAllergen: string): boolean {
    // 1. Kiểm tra các từ khóa an toàn
    const hasSafeKw = SAFE_ALLERGEN_CONTEXT_KEYWORDS.some((kw) => line.includes(kw));
    if (hasSafeKw) return true;

    // 2. Kiểm tra các cấu trúc ngữ pháp thay thế/so sánh/phủ định quanh từ khóa
    const safeRegexPatterns = [
      // "thay thế cho X", "thay X bằng Y", "đổi X sang Y"
      new RegExp(`(?:thay(?:\\s+thế|\\s+cho|\\s+bằng|\\s+vì)?|thế\\s+cho|đổi\\s+(?:sang|thành)|lựa\\s+chọn\\s+khác)\\s+.*?(?:${escapedAllergen})`, 'iu'),
      // "X được thay bằng", "X có thể thay thế"
      new RegExp(`(?:${escapedAllergen})\\s+.*?(?:được\\s+thay|bị\\s+thay|thay\\s+thế|thay\\s+bằng|có\\s+thể\\s+thay)`, 'iu'),
      // "giống như X", "tương tự X", "kết cấu của X"
      new RegExp(`(?:giống|tương\\s+tự|như|mô\\s+phỏng|kết\\s+cấu\\s+của|hương\\s+vị\\s+của)\\s+(?:như\\s+)?(?:${escapedAllergen})`, 'iu'),
      // "tránh X", "không dùng X", "dị ứng X"
      new RegExp(`(?:tránh|dị\\s+ứng|không\\s+(?:nên|dùng|sử\\s+dụng|ăn|chứa|cần)|loại\\s+bỏ|kiêng|hạn\\s+chế)\\s+.*?(?:${escapedAllergen})`, 'iu'),
    ];

    return safeRegexPatterns.some((pattern) => pattern.test(line));
  }

  /**
   * Kiểm tra xem dòng có phải là chỉ dẫn trực tiếp khuyên người dùng tiêu thụ/nấu nguyên liệu này không.
   */
  private isDirectConsumptionInstruction(line: string, escapedAllergen: string): boolean {
    const consumePattern = new RegExp(
      `(?:cho|thêm|dùng|sử\\s+dụng|nấu|xào|kho|hấp|luộc|ăn|chuẩn\\s+bị|nguyên\\s+liệu:?)\\s+[^,;.:!?\n\r]*\\b(?:${escapedAllergen})\\b`,
      'iu',
    );
    if (!consumePattern.test(line)) {
      return false;
    }
    // Nếu có phủ định rõ ràng thì không phải khuyên tiêu thụ
    const hasNegation =
      line.includes('không') ||
      line.includes('tránh') ||
      line.includes('kiêng') ||
      line.includes('thay thế') ||
      line.includes('thay cho');
    return !hasNegation;
  }

  /**
   * Kiểm tra tính an toàn của câu trả lời do AI tạo ra trước khi trả về cho người dùng.
   * Quy tắc:
   * 1. Không chứa từ khóa nguyên liệu mặn (thịt, cá, mắm...) trừ khi đứng trước chữ "chay" hoặc trong ngữ cảnh thay thế/so sánh chay.
   * 2. Không đề xuất nguyên liệu nằm trong danh sách dị ứng của người dùng.
   *    (Cho phép đề cập trong ngữ cảnh cảnh báo, thay thế nguyên liệu, hoặc so sánh hương vị/kết cấu).
   */
  checkAnswer(
    answer: string,
    allergyIngredientNames: string[] = [],
    userQuestion?: string,
  ): SafetyCheckResult {
    if (!answer || !answer.trim()) {
      return { isSafe: false, reason: 'Câu trả lời rỗng' };
    }

    // 1. Kiểm tra từ khóa mặn bằng NonVegetarianDetectorService
    const nonVegResult = this.nonVegDetector.checkText(answer);
    if (!nonVegResult.isClean) {
      this.logger.warn(
        `Phát hiện từ khoá mặn trong câu trả lời của AI: ${nonVegResult.violations.join(', ')}`,
      );
      return {
        isSafe: false,
        reason: `Chứa thành phần nguồn gốc động vật: ${nonVegResult.violations.join(', ')}`,
      };
    }

    // 2. Kiểm tra dị ứng thực phẩm nếu người dùng có khai báo
    if (allergyIngredientNames.length > 0) {
      const normalizedAnswer = answer.normalize('NFC').toLowerCase();
      // Chia nhỏ thành các câu/dòng
      const lines = normalizedAnswer.split(/\r?\n|[.!?]+/);

      for (const allergen of allergyIngredientNames) {
        const cleanAllergen = allergen.normalize('NFC').toLowerCase().trim();
        if (!cleanAllergen) continue;

        const escaped = cleanAllergen.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const allergenRegex = new RegExp(`(?<![\\p{L}\\p{N}])${escaped}(?![\\p{L}\\p{N}])`, 'u');

        if (allergenRegex.test(normalizedAnswer)) {
          const userAskedToReplace = this.isUserAskingForSubstitution(userQuestion, cleanAllergen);

          let hasViolation = false;

          for (const rawLine of lines) {
            const line = rawLine.trim();
            if (!line || !allergenRegex.test(line)) {
              continue;
            }

            // Nếu người dùng chủ động hỏi tìm món thay thế, kiểm tra xem có dòng nào xúi ăn trực tiếp không
            if (userAskedToReplace) {
              if (this.isDirectConsumptionInstruction(line, escaped)) {
                hasViolation = true;
                break;
              }
              // Nếu không xúi ăn trực tiếp và đang trong mạch trả lời câu hỏi thay thế thì an toàn
              continue;
            }

            // Với câu hỏi thông thường: kiểm tra xem dòng nhắc đến allergen có thuộc ngữ cảnh an toàn không
            const isSafe = this.isLineInSafeContext(line, escaped);
            if (!isSafe) {
              hasViolation = true;
              break;
            }
          }

          if (hasViolation) {
            this.logger.warn(`Phát hiện nguyên liệu dị ứng của người dùng trong đề xuất của AI: ${cleanAllergen}`);
            return {
              isSafe: false,
              reason: `Đề xuất nguyên liệu nằm trong danh sách dị ứng của người dùng: ${cleanAllergen}`,
            };
          }
        }
      }
    }

    return { isSafe: true };
  }
}
