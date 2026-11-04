import { Injectable, Logger } from '@nestjs/common';
import { AiProvider, AiPromptContext } from './ai-provider.interface';

@Injectable()
export class MockChatbotAiProvider implements AiProvider {
  readonly providerName = 'mock';
  private readonly logger = new Logger(MockChatbotAiProvider.name);

  async generateResponse(context: AiPromptContext): Promise<string> {
    this.logger.log(`[MOCK CHATBOT] Nhận câu hỏi mô phỏng: "${context.userMessage}"`);

    return `[MÔ PHỎNG - MOCK AI]: Xin chào! Đây là câu trả lời thử nghiệm từ hệ thống chatbot ẩm thực chay VegetMealPlan (chế độ mock cho môi trường phát triển).

Về câu hỏi "${context.userMessage}" của bạn:
- Thực phẩm chay phong phú và dồi dào dưỡng chất từ các loại đậu, nấm, rau củ quả và ngũ cốc nguyên hạt.
- Khi cần phản hồi thật từ trí tuệ nhân tạo, vui lòng cấu hình biến môi trường CHATBOT_AI_PROVIDER=groq kèm GROQ_API_KEY và GROQ_MODEL hợp lệ.`;
  }
}
