import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatbotConversation } from './entities/chatbot-conversation.entity';
import { User, DietType } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { UsageQuotaService } from '../usage-quota/usage-quota.service';
import { UsageActionType } from '../usage-quota/entities/usage-quota.entity';
import { SubscriptionService } from '../subscription/subscription.service';
import { ChatbotContextService } from './chatbot-context.service';
import { ChatbotSafetyService } from './chatbot-safety.service';
import { AiProvider } from './providers/ai-provider.interface';
import {
  ChatResponseData,
  mapChatResponse,
  ChatHistoryResponseData,
  mapChatHistoryResponse,
  ChatSuggestionsResponseData,
  mapChatSuggestionsResponse,
} from './dto/chat-response.dto';
import { ChatHistoryQueryDto } from './dto/chat-history-query.dto';
import {
  ChatSuggestionItem,
  DEFAULT_CHAT_SUGGESTIONS,
} from './constants/chat-suggestions.constant';
import { cleanTextFormatting } from '../../common/utils/clean-text.util';
import { ErrorCode } from '../../common/constants/error-codes.enum';

interface RateLimitEntry {
  timestamps: number[];
}

@Injectable()
export class ChatbotService {
  private readonly logger = new Logger(ChatbotService.name);
  private readonly rateLimits = new Map<string, RateLimitEntry>();

  constructor(
    @InjectRepository(ChatbotConversation)
    private readonly conversationRepo: Repository<ChatbotConversation>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly usersService: UsersService,
    private readonly usageQuotaService: UsageQuotaService,
    private readonly subscriptionService: SubscriptionService,
    private readonly contextService: ChatbotContextService,
    private readonly safetyService: ChatbotSafetyService,
    @Inject('AI_PROVIDER')
    private readonly aiProvider: AiProvider,
  ) {}

  /**
   * Giới hạn tốc độ chống lạm dụng (10 yêu cầu / phút per user hoặc per guest session).
   */
  private checkRateLimit(actorKey: string) {
    const now = Date.now();
    const windowMs = 60 * 1000;
    const maxRequests = 10;

    let entry = this.rateLimits.get(actorKey);
    if (!entry) {
      entry = { timestamps: [] };
      this.rateLimits.set(actorKey, entry);
    }

    entry.timestamps = entry.timestamps.filter((t) => now - t < windowMs);
    if (entry.timestamps.length >= maxRequests) {
      throw new HttpException(
        {
          code: ErrorCode.CHATBOT_RATE_LIMITED,
          message: 'Bạn đang gửi yêu cầu quá nhanh, vui lòng thử lại sau 1 phút.',
        },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }
    entry.timestamps.push(now);
  }

  /**
   * Xử lý gửi tin nhắn chatbot AI chính (phục vụ POST /ai/chat và bí danh POST /chatbot/ask).
   */
  async sendMessage(params: {
    message: string;
    userId?: number;
    sessionId?: string;
  }): Promise<ChatResponseData> {
    const { message, userId, sessionId } = params;

    // 1. Kiểm tra session_id đối với khách chưa đăng nhập
    if (!userId && (!sessionId || !sessionId.trim())) {
      throw new BadRequestException({
        code: ErrorCode.CHATBOT_SESSION_REQUIRED,
        message: 'Khách chưa đăng nhập bắt buộc phải gửi kèm session_id để hệ thống xác định phiên.',
      });
    }

    const actorKey = userId ? `user_${userId}` : `guest_${sessionId}`;

    // 2. Kiểm tra giới hạn tốc độ (10 req/phút)
    this.checkRateLimit(actorKey);

    // 3. Phân nhóm người dùng & Giữ chỗ lượt (Atomic reservation)
    const guestLimit = Number(process.env.GUEST_CHATBOT_LIMIT) || 2;
    const freeLimit = Number(process.env.FREE_CHATBOT_LIMIT) || 5;

    let remainingQueries: number | null = null;
    let quotaReserved = false;

    if (userId) {
      const isPremium = await this.subscriptionService.isPremium(userId);
      if (!isPremium) {
        const quotaResult = await this.usageQuotaService.reserveQuota({
          user_id: userId,
          action_type: UsageActionType.CHATBOT_QUERY,
          limit: freeLimit,
        });
        remainingQueries = quotaResult.remaining;
        quotaReserved = true;
      } else {
        // Premium: không giới hạn lượt, remaining_queries = null
        remainingQueries = null;
      }
    } else if (sessionId) {
      const quotaResult = await this.usageQuotaService.reserveQuota({
        session_id: sessionId,
        action_type: UsageActionType.CHATBOT_QUERY,
        limit: guestLimit,
      });
      remainingQueries = quotaResult.remaining;
      quotaReserved = true;
    }

    // 4. Xây dựng ngữ cảnh an toàn và tối thiểu
    const { profilePrompt, allergyIngredientNames, allergyIngredientIds, dietType } =
      await this.contextService.getUserProfileContext(userId);

    const { recipesPrompt, suggestedRecipes } = await this.contextService.getRelevantRecipes({
      question: message,
      dietType,
      allergyIngredientIds,
    });

    const systemInstruction = `${this.contextService.getSystemInstruction()}

${profilePrompt}

${recipesPrompt}`;

    const historyTurnsLimit = Number(process.env.CHATBOT_HISTORY_TURNS) || 6;
    const history = await this.contextService.getRecentTurns(userId, historyTurnsLimit);

    // 5. Gọi dịch vụ AI (Gemini hoặc Mock)
    let rawAnswer: string;
    try {
      rawAnswer = await this.aiProvider.generateResponse({
        systemInstruction,
        userMessage: message,
        history,
      });
    } catch (aiError: any) {
      // Nếu AI lỗi hoặc quá thời gian, hoàn lại lượt (giảm 1)
      if (quotaReserved) {
        await this.usageQuotaService.refundQuota({
          user_id: userId,
          session_id: sessionId,
          action_type: UsageActionType.CHATBOT_QUERY,
        });
      }
      throw aiError;
    }

    // 6. Làm sạch định dạng văn bản (loại bỏ ký tự markdown ###, **, gạch đầu dòng hoa thị)
    const answer = cleanTextFormatting(rawAnswer);

    // 7. Kiểm tra an toàn câu trả lời trước khi trả về client
    const safetyCheck = this.safetyService.checkAnswer(answer, allergyIngredientNames);

    if (!safetyCheck.isSafe) {
      this.logger.warn(`Câu trả lời AI bị chặn vì lý do an toàn: ${safetyCheck.reason}`);
      // Vi phạm an toàn: hoàn lại lượt và không lưu câu trả lời không an toàn vào DB
      if (quotaReserved) {
        await this.usageQuotaService.refundQuota({
          user_id: userId,
          session_id: sessionId,
          action_type: UsageActionType.CHATBOT_QUERY,
        });
        if (remainingQueries !== null) {
          remainingQueries += 1;
        }
      }

      const safeFallback =
        'Câu trả lời từ trợ lý chưa đáp ứng tiêu chuẩn an toàn thực phẩm chay hoặc danh mục dị ứng của bạn. ' +
        'Vui lòng thử hỏi lại với câu hỏi cụ thể hơn.';

      return mapChatResponse({
        conversation_id: 0,
        answer: safeFallback,
        remaining_queries: remainingQueries,
        suggested_recipes: [],
      });
    }

    // 8. Lưu cuộc hội thoại thành công vào database
    const conversation = this.conversationRepo.create({
      user_id: userId,
      session_id: sessionId,
      question: message,
      answer,
    });
    const saved = await this.conversationRepo.save(conversation);

    // 9. Trả về kết quả qua hàm ánh xạ duy nhất
    return mapChatResponse({
      conversation_id: saved.conversation_id,
      answer,
      remaining_queries: remainingQueries,
      suggested_recipes: suggestedRecipes,
    });
  }

  /**
   * Lấy danh sách câu hỏi gợi ý:
   * - Công khai, không gọi AI, không tốn lượt.
   * - Khách nhận danh sách chung cố định.
   * - Người đã đăng nhập nhận thêm câu hỏi gợi ý theo hồ sơ (dị ứng, mục tiêu sức khoẻ).
   */
  async getSuggestions(userId?: number): Promise<ChatSuggestionsResponseData> {
    const suggestions: ChatSuggestionItem[] = [...DEFAULT_CHAT_SUGGESTIONS];

    if (userId) {
      try {
        const user = await this.userRepo.findOne({
          where: { user_id: userId },
          relations: ['current_goal'],
        });

        // Gợi ý theo dị ứng
        const allergies = await this.usersService.getAllergies(userId);
        if (allergies.ingredients.length > 0) {
          const names = allergies.ingredients.map((i) => i.ingredient_name).slice(0, 2);
          suggestions.unshift({
            text: `Nguyên liệu nào thay thế an toàn cho ${names.join(', ')} trong món chay?`,
            category: 'substitute',
          });
        }

        // Gợi ý theo mục tiêu sức khoẻ
        const goal = user?.current_goal?.name;
        if (goal === 'lose_weight') {
          suggestions.unshift({
            text: 'Gợi ý các món chay dưới 400 kcal nhưng vẫn no lâu và đủ chất?',
            category: 'dinner',
          });
        } else if (goal === 'gain_muscle') {
          suggestions.unshift({
            text: 'Thực đơn chay giàu protein (trên 60g đạm/ngày) cho người tập luyện?',
            category: 'macros',
          });
        }

        // Gợi ý theo trường phái ăn chay
        if (user?.diet_type === DietType.VEGAN) {
          suggestions.unshift({
            text: 'Gợi ý thực đơn thuần chay (Vegan) đủ vitamin B12 và sắt tự nhiên?',
            category: 'general',
          });
        }
      } catch (err: any) {
        this.logger.warn(`Không thể lấy hồ sơ cá nhân hóa cho gợi ý: ${err?.message}`);
      }
    }

    return mapChatSuggestionsResponse(suggestions);
  }

  /**
   * Xem lịch sử chat của chính mình (chỉ dành cho user đã đăng nhập, có phân trang).
   */
  async getHistory(
    userId: number,
    query: ChatHistoryQueryDto,
  ): Promise<ChatHistoryResponseData> {
    const page = Math.max(1, query?.page || 1);
    const limit = Math.min(50, Math.max(1, query?.limit || 20));
    const skip = (page - 1) * limit;

    const [items, total] = await this.conversationRepo.findAndCount({
      where: { user_id: userId },
      order: { created_at: 'DESC' },
      skip,
      take: limit,
    });

    return mapChatHistoryResponse({
      items,
      page,
      limit,
      total,
    });
  }

  /**
   * Xóa toàn bộ lịch sử trò chuyện của chính mình (Giai đoạn 3).
   * Xóa thật trong database vì là dữ liệu riêng tư cá nhân.
   * Không ảnh hưởng đến số lượt đã truy vấn trong ngày trong bảng usage_quotas.
   */
  async clearHistory(userId: number): Promise<{ deleted_count: number }> {
    const result = await this.conversationRepo.delete({ user_id: userId });
    return {
      deleted_count: result.affected || 0,
    };
  }

  /**
   * Tương thích ngược với hàm ask() cũ trong codebase.
   */
  async ask(question: string, user_id?: number, session_id?: string): Promise<any> {
    return this.sendMessage({
      message: question,
      userId: user_id,
      sessionId: session_id,
    });
  }
}
