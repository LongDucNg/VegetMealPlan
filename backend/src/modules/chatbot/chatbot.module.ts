import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatbotConversation } from './entities/chatbot-conversation.entity';
import { Recipe } from '../recipe/entities/recipe.entity';
import { RecipeIngredient } from '../recipe/entities/recipe-ingredient.entity';
import { User } from '../users/entities/user.entity';
import { ChatbotService } from './chatbot.service';
import { ChatbotContextService } from './chatbot-context.service';
import { ChatbotSafetyService } from './chatbot-safety.service';
import { ChatbotController } from './chatbot.controller';
import { LegacyChatbotController } from './legacy-chatbot.controller';
import { UsageQuotaModule } from '../usage-quota/usage-quota.module';
import { SubscriptionModule } from '../subscription/subscription.module';
import { UsersModule } from '../users/users.module';
import { NonVegetarianDetectorService } from '../../common/services/non-vegetarian-detector.service';
import { GroqAiProvider } from './providers/groq-ai.provider';
import { MockChatbotAiProvider } from './providers/mock-chatbot-ai.provider';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ChatbotConversation,
      Recipe,
      RecipeIngredient,
      User,
    ]),
    UsageQuotaModule,
    SubscriptionModule,
    UsersModule,
  ],
  controllers: [ChatbotController, LegacyChatbotController],
  providers: [
    ChatbotService,
    ChatbotContextService,
    ChatbotSafetyService,
    NonVegetarianDetectorService,
    GroqAiProvider,
    MockChatbotAiProvider,
    {
      provide: 'AI_PROVIDER',
      useFactory: (
        groq: GroqAiProvider,
        mock: MockChatbotAiProvider,
      ) => {
        const provider = (process.env.CHATBOT_AI_PROVIDER || 'groq').toLowerCase().trim();
        if (provider === 'mock' && process.env.NODE_ENV !== 'production') {
          return mock;
        }
        return groq;
      },
      inject: [GroqAiProvider, MockChatbotAiProvider],
    },
  ],
  exports: [ChatbotService, GroqAiProvider],
})
export class ChatbotModule {}
