import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SubscriptionService } from './subscription.service';

@UseGuards(AuthGuard('jwt'))
@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get('me/premium-status')
  async premiumStatus(@Req() req: any) {
    const isPremium = await this.subscriptionService.isPremium(req.user.user_id);
    return { isPremium };
  }

  // TODO: tra ve URL redirect sang VNPay (can vnp_TmnCode/vnp_HashSecret that trong .env).
  @Post('checkout')
  async checkout(@Req() req: any) {
    const transaction = await this.subscriptionService.createPendingTransaction(req.user.user_id);
    return { gateway_txn_ref: transaction.gateway_txn_ref };
  }

  @Delete(':id')
  cancel(@Req() req: any, @Param('id') id: string) {
    return this.subscriptionService.cancel(req.user.user_id, Number(id));
  }
}

// TODO: endpoint rieng (khong qua JwtAuthGuard) nhan IPN callback tu VNPay,
// verify vnp_SecureHash roi goi subscriptionService.confirmPaymentSuccess/Failed.
