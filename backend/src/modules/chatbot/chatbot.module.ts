import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatbotConversation } from './entities/chatbot-conversation.entity';
import { ChatbotService } from './chatbot.service';
import { ChatbotController } from './chatbot.controller';
import { UsageQuotaModule } from '../usage-quota/usage-quota.module';
import { SubscriptionModule } from '../subscription/subscription.module';

@Module({
  imports: [TypeOrmModule.forFeature([ChatbotConversation]), UsageQuotaModule, SubscriptionModule],
  controllers: [ChatbotController],
  providers: [ChatbotService],
  exports: [ChatbotService],
})
export class ChatbotModule {}
