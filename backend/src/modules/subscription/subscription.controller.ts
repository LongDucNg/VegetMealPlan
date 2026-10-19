import { Controller, Delete, Get, HttpCode, Logger, Param, ParseIntPipe, Post, Query, Req, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { SubscriptionService, IPN } from './subscription.service';
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
    summary: 'Tạo giao dịch và lấy link thanh toán VNPay',
    description: 'FE chuyển cả trang sang `payment_url`. Thanh toán xong VNPay đưa người dùng về VNPAY_RETURN_URL (trang FE).',
  })
  @ApiResponse({ status: 503, description: 'SUBSCRIPTION_PAYMENT_NOT_CONFIGURED: chưa cấu hình khoá VNPay' })
  checkout(@CurrentUser('user_id') userId: number, @Req() req: Request) {
    return this.subscriptionService.checkout(userId, clientIp(req));
  }

  /**
   * VNPay gọi thẳng vào đây (server tới server) để báo kết quả. Đây là nguồn sự thật để kích hoạt Premium.
   * Trả đúng định dạng VNPay yêu cầu { RspCode, Message }, không bọc envelope chung, không bao giờ ném lỗi.
   * URL này khai trên trang quản trị VNPay (sandbox: dùng ngrok khi chạy local).
   */
  @Public()
  @Get('vnpay-ipn')
  @ApiOperation({ summary: '[VNPay gọi] Nhận kết quả thanh toán (IPN)' })
  async vnpayIpn(@Query() query: Record<string, string>, @Res() res: Response) {
    try {
      const result = await this.subscriptionService.processVnpayResult(query);
      this.logger.log(`IPN ${query.vnp_TxnRef ?? '?'}: ${result.ipn.RspCode} ${result.status}`);
      return res.status(200).json(result.ipn);
    } catch (err) {
      this.logger.error(`IPN ${query.vnp_TxnRef ?? '?'} lỗi: ${(err as Error)?.message ?? err}`);
      return res.status(200).json(IPN.UNKNOWN);
    }
  }

  /**
   * Trang return của FE gọi API này kèm nguyên query VNPay gắn trên URL để hiển thị kết quả.
   * Kiểm tra chữ ký như IPN, nên không giả được bằng cách tự gõ vnp_ResponseCode=00.
   * Nếu IPN chưa tới (chạy local không có ngrok) thì kích hoạt luôn ở đây; IPN tới sau sẽ nhận "đã xác nhận".
   */
  @Public()
  @Get('vnpay-return')
  @ApiOperation({ summary: 'Xác nhận kết quả thanh toán cho trang return của FE' })
  async vnpayReturn(@Query() query: Record<string, string>) {
    const r = await this.subscriptionService.processVnpayResult(query);
    return {
      success: r.status === 'success',
      data: { status: r.status, txn_ref: r.txn_ref ?? null, premium_until: r.premium_until ?? null },
      message: r.message,
    };
  }

  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Huỷ gói (không hoàn tiền, vẫn dùng đến hết hạn)' })
  cancel(@CurrentUser('user_id') userId: number, @Param('id', ParseIntPipe) id: number) {
    return this.subscriptionService.cancel(userId, id);
  }
}

/** VNPay cần IPv4; localhost IPv6 (::1) đổi thành 127.0.0.1. */
function clientIp(req: Request) {
  const forwarded = (req.headers['x-forwarded-for'] as string | undefined)?.split(',')[0]?.trim();
  const ip = (forwarded || req.ip || '127.0.0.1').replace(/^::ffff:/, '');
  return ip === '::1' ? '127.0.0.1' : ip;
}
