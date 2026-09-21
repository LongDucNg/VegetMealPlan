import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChatbotService } from './chatbot.service';
import { AskChatbotDto } from './dto/ask-chatbot.dto';

// TODO: khi có auth, tách 2 route rõ ràng — hoặc đọc req.user nếu JWT hợp lệ,
// nếu không có token thì bắt buộc dto.session_id (Unauthorized trial flow).
@ApiTags('chatbot')
@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post('ask')
  ask(@Body() dto: AskChatbotDto) {
    return this.chatbotService.ask(dto.question, undefined, dto.session_id);
  }
}
