import { Body, Controller, Delete, Get, HttpCode, Logger, Param, ParseIntPipe, Post, Req, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { SubscriptionService } from './subscription.service';
import { Public } from '../../common/decorators/public.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('subscriptions')
@Controller('subscriptions')
export class SubscriptionController {
  private readonly logger = new Logger(SubscriptionController.name);

  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Public()
  @Get('plans')
  @ApiOperation({ summary: 'Danh sách gói Premium (hiện có một gói tháng)' })
  plans() {
    return this.subscriptionService.getPlans();
  }

  @ApiBearerAuth()
  @Get('me/premium-status')
  @ApiOperation({ summary: 'Trạng thái Premium của tài khoản (kèm ngày hết hạn)' })
  premiumStatus(@CurrentUser('user_id') userId: number) {
    return this.subscriptionService.premiumStatus(userId);
  }

  @ApiBearerAuth()
  @Post('checkout')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Tạo giao dịch và lấy link thanh toán VietQR (PayOS)',
    description: 'Trả về `payment_url` và `qr_code`. Người dùng quét mã VietQR bằng ứng dụng ngân hàng bất kỳ để thanh toán.',
  })
  @ApiResponse({ status: 503, description: 'SUBSCRIPTION_PAYMENT_NOT_CONFIGURED: chưa cấu hình khoá PayOS' })
  checkout(@CurrentUser('user_id') userId: number, @Req() req: Request) {
    return this.subscriptionService.checkout(userId, clientIp(req));
  }

  /**
   * PayOS gọi Webhook (server tới server) để báo kết quả thanh toán.
   */
  @Public()
  @Post('payos-webhook')
  @HttpCode(200)
  @ApiOperation({ summary: '[PayOS gọi] Nhận kết quả thanh toán Webhook' })
  async payosWebhook(@Body() body: any, @Res() res: Response) {
    try {
      const result = await this.subscriptionService.processPayosWebhook(body);
      this.logger.log(`PayOS Webhook result: ${JSON.stringify(result)}`);
      return res.status(200).json({ success: true, message: result.message });
    } catch (err) {
      this.logger.error(`Lỗi xử lý PayOS Webhook: ${(err as Error)?.message ?? err}`);
      return res.status(200).json({ success: false, message: 'Webhook processing error' });
    }
  }

  /**
   * Tra cứu trạng thái giao dịch cho trang Return của Frontend
   */
  @Public()
  @Get('transactions/:orderCode')
  @ApiOperation({ summary: 'Kiểm tra trạng thái giao dịch thanh toán PayOS' })
  async checkTransactionStatus(@Param('orderCode') orderCode: string) {
    return this.subscriptionService.checkPaymentStatus(orderCode);
  }

  @ApiBearerAuth()
  @Post('activate-free')
  @HttpCode(200)
  @ApiOperation({ summary: 'Kích hoạt gói Premium trực tiếp không qua thanh toán' })
  activateDirect(@CurrentUser('user_id') userId: number) {
    return this.subscriptionService.activateDirect(userId);
  }

  @ApiBearerAuth()
  @Post('switch-free')
  @HttpCode(200)
  @ApiOperation({ summary: 'Chuyển về gói Miễn phí' })
  switchFree(@CurrentUser('user_id') userId: number) {
    return this.subscriptionService.switchFree(userId);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Huỷ gói (không hoàn tiền, vẫn dùng đến hết hạn)' })
  cancel(@CurrentUser('user_id') userId: number, @Param('id', ParseIntPipe) id: number) {
    return this.subscriptionService.cancel(userId, id);
  }
}

function clientIp(req: Request): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') return forwarded.split(',')[0].trim();
  if (Array.isArray(forwarded) && forwarded[0]) return forwarded[0].trim();
  return req.socket.remoteAddress || '127.0.0.1';
}
