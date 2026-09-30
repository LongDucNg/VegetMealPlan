import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatbotConversation } from './entities/chatbot-conversation.entity';
import { UsageQuotaService } from '../usage-quota/usage-quota.service';
import { UsageActionType } from '../usage-quota/entities/usage-quota.entity';
import { SubscriptionService } from '../subscription/subscription.service';

const GUEST_CHATBOT_LIMIT = Number(process.env.GUEST_CHATBOT_LIMIT) || 2;
const FREE_CHATBOT_LIMIT = Number(process.env.FREE_CHATBOT_LIMIT) || 5;

@Injectable()
export class ChatbotService {
  constructor(
    @InjectRepository(ChatbotConversation)
    private readonly conversationRepo: Repository<ChatbotConversation>,
    private readonly usageQuotaService: UsageQuotaService,
    private readonly subscriptionService: SubscriptionService,
  ) {}

  async ask(question: string, user_id?: number, session_id?: string): Promise<ChatbotConversation> {
    if (user_id) {
      // Authorized user: premium thi bypass quota hoan toan, khong thi gioi han FREE_CHATBOT_LIMIT/thang.
      const isPremium = await this.subscriptionService.isPremium(user_id);
      if (!isPremium) {
        await this.usageQuotaService.checkAndIncrement({
          user_id,
          action_type: UsageActionType.CHATBOT_QUERY,
          limit: FREE_CHATBOT_LIMIT,
        });
      }
    } else if (session_id) {
      // Unauthorized/guest: gioi han GUEST_CHATBOT_LIMIT/thang theo session_id.
      await this.usageQuotaService.checkAndIncrement({
        session_id,
        action_type: UsageActionType.CHATBOT_QUERY,
        limit: GUEST_CHATBOT_LIMIT,
      });
    }

    let answer: string;
    try {
      answer = await this.callAiService(question);
    } catch {
      // Edge case bắt buộc: AI timeout -> báo lỗi tạm thời, KHÔNG lưu câu trả lời giả.
      throw new ServiceUnavailableException(
        'AI đang tạm thời không phản hồi, vui lòng thử lại sau.',
      );
    }

    const conversation = this.conversationRepo.create({
      user_id,
      session_id,
      question,
      answer,
    });
    return this.conversationRepo.save(conversation);
  }

  private async callAiService(question: string): Promise<string> {
    // TODO: gọi LLM thật (OpenAI/Anthropic API...) ở đây.
    throw new Error('AI service chưa được cấu hình — placeholder cho môn học.');
  }
}
