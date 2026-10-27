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
import { GeminiAiProvider } from './providers/gemini-ai.provider';
import { OpenAiCompatibleAiProvider } from './providers/openai-compatible-ai.provider';

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
    GeminiAiProvider,
    OpenAiCompatibleAiProvider,
    {
      provide: 'AI_PROVIDER',
      useFactory: (
        gemini: GeminiAiProvider,
        openAiCompatible: OpenAiCompatibleAiProvider,
      ) => {
        const provider = (process.env.AI_PROVIDER || 'gemini').toLowerCase().trim();
        if (
          provider === 'grok' ||
          provider === 'xai' ||
          provider === 'openai' ||
          provider === 'deepseek' ||
          provider === 'openrouter' ||
          provider === 'groq' ||
          provider === 'custom' ||
          process.env.AI_BASE_URL
        ) {
          return openAiCompatible;
        }
        return gemini;
      },
      inject: [GeminiAiProvider, OpenAiCompatibleAiProvider],
    },
  ],
  exports: [ChatbotService],
})
export class ChatbotModule {}
