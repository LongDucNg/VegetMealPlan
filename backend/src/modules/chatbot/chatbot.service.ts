```typescript
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
   * Gioi han toc do: 10 yeu cau/phut cho moi user hoac guest session.
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
          message: 'Ban dang gui yeu cau qua nhanh, vui long thu lai sau 1 phut.',
        },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    entry.timestamps.push(now);
  }

  /**
   * Xu ly gui tin nhan chatbot AI.
   */
  async sendMessage(params: {
    message: string;
    userId?: number;
    sessionId?: string;
  }): Promise<ChatResponseData> {
    const { message, userId, sessionId } = params;

    // Khach chua dang nhap bat buoc phai co session_id.
    if (!userId && (!sessionId || !sessionId.trim())) {
      throw new BadRequestException({
        code: ErrorCode.CHATBOT_SESSION_REQUIRED,
        message:
          'Khach chua dang nhap bat buoc phai gui kem session_id de xac dinh phien.',
      });
    }

    const actorKey = userId ? `user_${userId}` : `guest_${sessionId}`;

    this.checkRateLimit(actorKey);

    // Gioi han luot chat.
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

    // Lay thong tin ho so, truong phai an chay va di ung.
    const {
      profilePrompt,
      allergyIngredientNames,
      allergyIngredientIds,
      dietType,
    } = await this.contextService.getUserProfileContext(userId);

    const { recipesPrompt, suggestedRecipes } =
      await this.contextService.getRelevantRecipes({
        question: message,
        dietType,
        allergyIngredientIds,
      });

    const systemInstruction = `${this.contextService.getSystemInstruction()}

${profilePrompt}

${recipesPrompt}`;

    const historyTurnsLimit = Number(process.env.CHATBOT_HISTORY_TURNS) || 6;
    const history = await this.contextService.getRecentTurns(
      userId,
      historyTurnsLimit,
    );

    // Goi AI provider.
    let rawAnswer: string;

    try {
      rawAnswer = await this.aiProvider.generateResponse({
        systemInstruction,
        userMessage: message,
        history,
      });
    } catch (aiError: any) {
      if (quotaReserved) {
        await this.usageQuotaService.refundQuota({
          user_id: userId,
          session_id: sessionId,
          action_type: UsageActionType.CHATBOT_QUERY,
        });
      }

      throw aiError;
    }

    // Lam sach cau tra loi.
    const answer = cleanTextFormatting(rawAnswer);

    // Kiem tra an toan va di ung.
    const safetyCheck = this.safetyService.checkAnswer(
      answer,
      allergyIngredientNames,
    );

    if (!safetyCheck.isSafe) {
      this.logger.warn(
        `Cau tra loi AI bi chan vi ly do an toan: ${safetyCheck.reason}`,
      );

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
        'Cau tra loi tu tro ly chua dap ung tieu chuan an toan thuc pham chay hoac danh muc di ung cua ban. ' +
        'Vui long thu hoi lai voi cau hoi cu the hon.';

      return mapChatResponse({
        conversation_id: 0,
        answer: safeFallback,
        remaining_queries: remainingQueries,
        suggested_recipes: [],
      });
    }

    // Luu hoi thoai vao database.
    const conversation = this.conversationRepo.create({
      user_id: userId,
      session_id: sessionId,
      question: message,
      answer,
    });

    const saved = await this.conversationRepo.save(conversation);

    return mapChatResponse({
      conversation_id: saved.conversation_id,
      answer,
      remaining_queries: remainingQueries,
      suggested_recipes: suggestedRecipes,
    });
  }

  /**
   * Lay danh sach cau hoi goi y.
   */
  async getSuggestions(
    userId?: number,
  ): Promise<ChatSuggestionsResponseData> {
    const suggestions: ChatSuggestionItem[] = [...DEFAULT_CHAT_SUGGESTIONS];

    if (userId) {
      try {
        const user = await this.userRepo.findOne({
          where: { user_id: userId },
          relations: ['current_goal'],
        });

        // Goi y theo di ung.
        const allergies = await this.usersService.getAllergies(userId);

        if (allergies.ingredients.length > 0) {
          const names = allergies.ingredients
            .map((i) => i.ingredient_name)
            .slice(0, 2);

          suggestions.unshift({
            text: `Nguyen lieu nao thay the an toan cho ${names.join(', ')} trong mon chay?`,
            category: 'substitute',
          });
        }

        // Goi y theo muc tieu suc khoe.
        const goal = user?.current_goal?.name;

        if (goal === 'lose_weight') {
          suggestions.unshift({
            text: 'Goi y cac mon chay duoi 400 kcal nhung van no lau va du chat?',
            category: 'dinner',
          });
        } else if (goal === 'gain_muscle') {
          suggestions.unshift({
            text: 'Thuc don chay giau protein tren 60g dam/ngay cho nguoi tap luyen?',
            category: 'macros',
          });
        }

        // Goi y theo truong phai an chay.
        if (user?.diet_type === DietType.VEGAN) {
          suggestions.unshift({
            text: 'Goi y thuc don thuan chay Vegan du vitamin B12 va sat tu nhien?',
            category: 'general',
          });
        }
      } catch (err: any) {
        this.logger.warn(
          `Khong the lay ho so ca nhan hoa cho goi y: ${err?.message}`,
        );
      }
    }

    return mapChatSuggestionsResponse(suggestions);
  }

  /**
   * Xem lich su chat cua user da dang nhap, co phan trang.
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
   * Xoa toan bo lich su tro chuyen cua chinh minh (Giai doan 3).
   * Khong thay doi so luot truy van trong usage_quotas.
   */
  async clearHistory(
    userId: number,
  ): Promise<{ deleted_count: number }> {
    const result = await this.conversationRepo.delete({
      user_id: userId,
    });

    return {
      deleted_count: result.affected || 0,
    };
  }

  /**
   * Tuong thich nguoc voi ham ask() cu trong codebase.
   */
  async ask(
    question: string,
    user_id?: number,
    session_id?: string,
  ): Promise<ChatResponseData> {
    return this.sendMessage({
      message: question,
      userId: user_id,
      sessionId: session_id,
    });
  }
}
```