import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatbotConversation } from './entities/chatbot-conversation.entity';
import { TrialUsage } from './entities/trial-usage.entity';
import { ChatbotService } from './chatbot.service';
import { ChatbotController } from './chatbot.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ChatbotConversation, TrialUsage])],
  controllers: [ChatbotController],
  providers: [ChatbotService],
  exports: [ChatbotService],
})
export class ChatbotModule {}
