import { Body, Controller, Delete, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChatbotService } from './chatbot.service';
import { ChatRequestDto } from './dto/chat-request.dto';
import { ChatHistoryQueryDto } from './dto/chat-history-query.dto';
import { Public } from '../../common/decorators/public.decorator';
import { OptionalJwtAuthGuard } from '../../common/guards/optional-jwt-auth.guard';
import { CurrentUser, AuthUser } from '../../common/decorators/current-user.decorator';

@ApiTags('ai/chat')
@Controller('ai/chat')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post()
  @Public()
  @UseGuards(OptionalJwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Gửi câu hỏi tới Chatbot AI dinh dưỡng chay',
    description:
      'Hỗ trợ cả khách chưa đăng nhập (cần session_id, tối đa 2 lượt/ngày) ' +
      'và người dùng đã đăng nhập (Bearer token, miễn phí 5 lượt/ngày, Premium không giới hạn).',
  })
  @ApiResponse({ status: 200, description: 'Trả lời thành công kèm số lượt còn lại và món gợi ý' })
  @ApiResponse({ status: 400, description: 'Thiếu session_id với khách hoặc câu hỏi không hợp lệ' })
  @ApiResponse({ status: 401, description: 'Token không hợp lệ hoặc đã hết hạn' })
  @ApiResponse({ status: 429, description: 'Hết lượt sử dụng hoặc bị giới hạn tốc độ' })
  @ApiResponse({ status: 503, description: 'Dịch vụ AI chưa cấu hình hoặc tạm thời không khả dụng' })
  chat(@Body() dto: ChatRequestDto, @CurrentUser() user?: AuthUser) {
    return this.chatbotService.sendMessage({
      message: dto.message,
      userId: user?.user_id,
      sessionId: dto.session_id,
    });
  }

  @Get('suggestions')
  @Public()
  @UseGuards(OptionalJwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Danh sách câu hỏi gợi ý cho Chatbot AI',
    description:
      'Công khai, không gọi AI, không tốn lượt. Trả về danh sách câu hỏi gợi ý phổ biến, ' +
      'người dùng đã đăng nhập sẽ nhận thêm các câu hỏi cá nhân hóa theo mục tiêu và dị ứng.',
  })
  @ApiResponse({ status: 200, description: 'Lấy danh sách gợi ý thành công' })
  getSuggestions(@CurrentUser() user?: AuthUser) {
    return this.chatbotService.getSuggestions(user?.user_id);
  }

  @Get('history')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Xem lịch sử trò chuyện của chính mình (có phân trang)',
    description:
      'Yêu cầu đăng nhập. Sắp xếp cuộc hội thoại mới nhất trước. ' +
      'Phân trang mặc định 20, tối đa 50.',
  })
  @ApiResponse({ status: 200, description: 'Lấy lịch sử trò chuyện thành công' })
  @ApiResponse({ status: 401, description: 'Chưa đăng nhập hoặc token đã hết hạn' })
  getHistory(
    @CurrentUser('user_id') userId: number,
    @Query() query: ChatHistoryQueryDto,
  ) {
    return this.chatbotService.getHistory(userId, query);
  }

  @Delete('history')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Xóa toàn bộ lịch sử trò chuyện của chính mình',
    description:
      'Yêu cầu đăng nhập. Xóa toàn bộ cuộc hội thoại của chính người dùng hiện tại (xóa thật). ' +
      'Không ảnh hưởng đến số lượt đã truy vấn trong ngày.',
  })
  @ApiResponse({ status: 200, description: 'Xóa toàn bộ lịch sử trò chuyện thành công' })
  @ApiResponse({ status: 401, description: 'Chưa đăng nhập hoặc token đã hết hạn' })
  clearHistory(@CurrentUser('user_id') userId: number) {
    return this.chatbotService.clearHistory(userId);
  }
}
