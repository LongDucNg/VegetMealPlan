import { BadRequestException, Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChatbotService } from './chatbot.service';
import { AskChatbotDto } from './dto/ask-chatbot.dto';
import { Public } from '../../common/decorators/public.decorator';
import { OptionalJwtAuthGuard } from '../../common/guards/optional-jwt-auth.guard';
import { CurrentUser, AuthUser } from '../../common/decorators/current-user.decorator';
import { ErrorCode } from '../../common/constants/error-codes.enum';

@ApiTags('chatbot')
@Controller('chatbot')
export class LegacyChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post('ask')
  @Public()
  @UseGuards(OptionalJwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Bí danh cũ của POST /ai/chat (sẽ gỡ bỏ sau khi FE hoàn tất chuyển đổi)',
    deprecated: true,
  })
  @ApiResponse({ status: 200, description: 'Trả lời thành công' })
  @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ hoặc thiếu session_id' })
  @ApiResponse({ status: 401, description: 'Token không hợp lệ' })
  @ApiResponse({ status: 429, description: 'Hết lượt sử dụng' })
  @ApiResponse({ status: 503, description: 'Dịch vụ AI không khả dụng' })
  ask(@Body() dto: AskChatbotDto, @CurrentUser() user?: AuthUser) {
    const message = dto.message || dto.question;
    if (!message || !message.trim()) {
      throw new BadRequestException({
        code: ErrorCode.VALIDATION_FAILED,
        message: 'Nội dung câu hỏi không được để trống (field question hoặc message)',
      });
    }

    return this.chatbotService.sendMessage({
      message,
      userId: user?.user_id,
      sessionId: dto.session_id,
    });
  }
}
