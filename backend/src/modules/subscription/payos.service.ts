import { Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PayOS } from '@payos/node';
import { CreatePaymentLinkRequest, CreatePaymentLinkResponse } from '@payos/node/lib/resources/v2/payment-requests/payment-requests';
import { Webhook, WebhookData } from '@payos/node/lib/resources/webhooks/webhook';
import { ErrorCode } from '../../common/constants/error-codes.enum';

export interface PayosCreateLinkInput {
  orderCode: number;
  amount: number;
  description: string;
  returnUrl?: string;
  cancelUrl?: string;
}

@Injectable()
export class PayosService {
  private readonly logger = new Logger(PayosService.name);
  private readonly payos: PayOS | null = null;
  private readonly clientId?: string;
  private readonly apiKey?: string;
  private readonly checksumKey?: string;
  private readonly defaultReturnUrl: string;
  private readonly defaultCancelUrl: string;

  constructor(config: ConfigService) {
    this.clientId = config.get<string>('PAYOS_CLIENT_ID')?.trim();
    this.apiKey = config.get<string>('PAYOS_API_KEY')?.trim();
    this.checksumKey = config.get<string>('PAYOS_CHECKSUM_KEY')?.trim();

    const frontend = (config.get<string>('FRONTEND_URL') || 'http://localhost:3001').split(',')[0].trim();
    this.defaultReturnUrl = config.get<string>('PAYOS_RETURN_URL')?.trim() || `${frontend}/subscriptions/return`;
    this.defaultCancelUrl = config.get<string>('PAYOS_CANCEL_URL')?.trim() || `${frontend}/subscriptions/cancel`;

    if (this.clientId && this.apiKey && this.checksumKey) {
      try {
        this.payos = new PayOS({
          clientId: this.clientId,
          apiKey: this.apiKey,
          checksumKey: this.checksumKey,
        });
        this.logger.log('Cổng thanh toán VietQR (PayOS) đã được khởi tạo thành công.');
      } catch (err: any) {
        this.logger.error(`Không thể khởi tạo PayOS: ${err?.message || err}`);
      }
    } else {
      this.logger.warn('Chưa cấu hình đầy đủ PAYOS_CLIENT_ID, PAYOS_API_KEY, PAYOS_CHECKSUM_KEY.');
    }
  }

  isConfigured(): boolean {
    return !!(this.payos && this.clientId && this.apiKey && this.checksumKey);
  }

  assertConfigured(): void {
    if (!this.isConfigured()) {
      throw new ServiceUnavailableException({
        code: ErrorCode.SUBSCRIPTION_PAYMENT_NOT_CONFIGURED,
        message: 'Chưa cấu hình cổng thanh toán VietQR PayOS (PAYOS_CLIENT_ID, PAYOS_API_KEY, PAYOS_CHECKSUM_KEY)',
      });
    }
  }

  /**
   * Tạo link thanh toán VietQR động
   */
  async createPaymentLink(input: PayosCreateLinkInput): Promise<CreatePaymentLinkResponse> {
    this.assertConfigured();

    // Mô tả PayOS tối đa 25 ký tự, không dấu và không ký tự đặc biệt
    let cleanDesc = input.description
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9 ]/g, ' ')
      .trim();
    if (cleanDesc.length > 25) {
      cleanDesc = cleanDesc.slice(0, 25);
    }
    if (!cleanDesc) {
      cleanDesc = `HD ${input.orderCode}`;
    }

    const requestData: CreatePaymentLinkRequest = {
      orderCode: input.orderCode,
      amount: Math.round(input.amount),
      description: cleanDesc,
      returnUrl: input.returnUrl || this.defaultReturnUrl,
      cancelUrl: input.cancelUrl || this.defaultCancelUrl,
    };

    try {
      const response = await this.payos!.paymentRequests.create(requestData);
      return response;
    } catch (err: any) {
      this.logger.error(`Lỗi khi tạo payment link PayOS (orderCode ${input.orderCode}): ${err?.message || err}`);
      throw err;
    }
  }

  /**
   * Xác thực dữ liệu Webhook gửi từ PayOS
   */
  async verifyWebhook(webhookBody: Webhook): Promise<WebhookData> {
    this.assertConfigured();
    try {
      return await this.payos!.webhooks.verify(webhookBody);
    } catch (err: any) {
      this.logger.error(`Xác thực Webhook PayOS thất bại: ${err?.message || err}`);
      throw err;
    }
  }

  /**
   * Tra cứu thông tin thanh toán theo mã đơn hàng hoặc payment link ID từ PayOS
   */
  async getPaymentInformation(orderCodeOrId: number | string) {
    this.assertConfigured();
    try {
      return await this.payos!.paymentRequests.get(orderCodeOrId as any);
    } catch (err: any) {
      this.logger.warn(`Không thể lấy thông tin thanh toán PayOS #${orderCodeOrId}: ${err?.message || err}`);
      return null;
    }
  }

  /**
   * Đăng ký Webhook URL với PayOS (tuỳ chọn)
   */
  async confirmWebhook(webhookUrl: string) {
    this.assertConfigured();
    try {
      return await this.payos!.webhooks.confirm(webhookUrl);
    } catch (err: any) {
      this.logger.error(`Không thể xác nhận Webhook URL với PayOS: ${err?.message || err}`);
      throw err;
    }
  }
}
