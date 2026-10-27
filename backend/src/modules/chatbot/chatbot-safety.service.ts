import { Injectable, Logger } from '@nestjs/common';
import { NonVegetarianDetectorService } from '../../common/services/non-vegetarian-detector.service';

export interface SafetyCheckResult {
  isSafe: boolean;
  reason?: string;
}

@Injectable()
export class ChatbotSafetyService {
  private readonly logger = new Logger(ChatbotSafetyService.name);

  constructor(private readonly nonVegDetector: NonVegetarianDetectorService) {}

  /**
   * Kiểm tra tính an toàn của câu trả lời do AI tạo ra trước khi trả về cho người dùng.
   * Quy tắc:
   * 1. Không chứa từ khóa nguyên liệu mặn (thịt, cá, mắm...) trừ khi đứng trước chữ "chay".
   * 2. Không đề xuất nguyên liệu nằm trong danh sách dị ứng của người dùng.
   *    (Ngoại trừ trường hợp câu trả lời nhắc để cảnh báo "bạn dị ứng X nên tránh X").
   */
  checkAnswer(answer: string, allergyIngredientNames: string[] = []): SafetyCheckResult {
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
      // Chia thành các câu/dòng để kiểm tra ngữ cảnh cảnh báo
      const lines = normalizedAnswer.split(/\r?\n|[.!?]+/);

      for (const allergen of allergyIngredientNames) {
        const cleanAllergen = allergen.normalize('NFC').toLowerCase().trim();
        if (!cleanAllergen) continue;

        const escaped = cleanAllergen.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const allergenRegex = new RegExp(`(?<![\\p{L}\\p{N}])${escaped}(?![\\p{L}\\p{N}])`, 'u');

        if (allergenRegex.test(normalizedAnswer)) {
          // Kiểm tra xem sự xuất hiện của nguyên liệu này có thuộc ngữ cảnh cảnh báo an toàn không
          let isOnlyWarning = true;

          for (const line of lines) {
            if (allergenRegex.test(line)) {
              const isWarningContext =
                line.includes('dị ứng') ||
                line.includes('tránh') ||
                line.includes('không nên') ||
                line.includes('không sử dụng') ||
                line.includes('không dùng') ||
                line.includes('thay vì') ||
                line.includes('loại bỏ');

              if (!isWarningContext) {
                isOnlyWarning = false;
                break;
              }
            }
          }

          if (!isOnlyWarning) {
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
