import { ForbiddenException, Injectable, ServiceUnavailableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatbotConversation } from './entities/chatbot-conversation.entity';
import { TrialUsage } from './entities/trial-usage.entity';

const TRIAL_QUERY_LIMIT = Number(process.env.TRIAL_QUERY_LIMIT) || 5;

@Injectable()
export class ChatbotService {
  constructor(
    @InjectRepository(ChatbotConversation)
    private readonly conversationRepo: Repository<ChatbotConversation>,
    @InjectRepository(TrialUsage)
    private readonly trialRepo: Repository<TrialUsage>,
  ) {}

  /** Dùng cho Unauthorized User — kiểm tra + tăng query_count trước khi gọi AI. */
  async checkAndIncrementTrial(session_id: string): Promise<void> {
    let trial = await this.trialRepo.findOne({ where: { session_id } });
    if (!trial) {
      trial = this.trialRepo.create({ session_id, query_count: 0 });
    }

    // Edge case bắt buộc: hết lượt trial -> chặn, không cho gửi thêm request.
    if (trial.query_count >= TRIAL_QUERY_LIMIT) {
      throw new ForbiddenException(
        'Bạn đã dùng hết lượt hỏi thử. Vui lòng đăng ký/đăng nhập để tiếp tục.',
      );
    }

    trial.query_count += 1;
    trial.last_query_at = new Date();
    await this.trialRepo.save(trial);
  }

  async ask(question: string, user_id?: number, session_id?: string): Promise<ChatbotConversation> {
    if (!user_id && session_id) {
      await this.checkAndIncrementTrial(session_id);
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
