import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { Subscription, SubscriptionStatus } from './entities/subscription.entity';
import { PaymentTransaction, PaymentTransactionStatus, PaymentGateway } from './entities/payment-transaction.entity';
import { User } from '../users/entities/user.entity';
import { NotificationService } from '../notification/notification.service';
import { NotificationType } from '../notification/entities/notification.entity';
import { ErrorCode } from '../../common/constants/error-codes.enum';
import { PAYMENT_LINK_TTL_MINUTES, VnpayService } from './vnpay.service';

const PLAN_TYPE = 'monthly';
const PLAN_DURATION_DAYS = 30;

/** Mã phản hồi IPN theo tài liệu VNPay. VNPay chỉ ngừng gọi lại khi nhận 00 hoặc 02. */
export const IPN = {
  OK: { RspCode: '00', Message: 'Confirm Success' },
  ORDER_NOT_FOUND: { RspCode: '01', Message: 'Order not found' },
  ALREADY_CONFIRMED: { RspCode: '02', Message: 'Order already confirmed' },
  INVALID_AMOUNT: { RspCode: '04', Message: 'Invalid amount' },
  INVALID_SIGNATURE: { RspCode: '97', Message: 'Invalid signature' },
  UNKNOWN: { RspCode: '99', Message: 'Unknown error' },
} as const;
export type IpnResponse = (typeof IPN)[keyof typeof IPN];

export interface PaymentResult {
  ipn: IpnResponse;
  status: 'success' | 'failed' | 'invalid';
  txn_ref?: string;
  premium_until?: Date | null;
  message: string;
}

@Injectable()
export class SubscriptionService {
  private readonly logger = new Logger(SubscriptionService.name);
  private readonly price: number;

  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepo: Repository<Subscription>,
    @InjectRepository(PaymentTransaction)
    private readonly transactionRepo: Repository<PaymentTransaction>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly notificationService: NotificationService,
    private readonly vnpay: VnpayService,
    config: ConfigService,
  ) {
    this.price = Number(config.get<string>('MONTHLY_PLAN_PRICE')) || 99000;
  }

  /** GET /subscriptions/plans: hiện chỉ có một gói tháng. */
  getPlans() {
    return [
      {
        plan_type: PLAN_TYPE,
        name: 'Premium 1 tháng',
        price: this.price,
        currency: 'VND',
        duration_days: PLAN_DURATION_DAYS,
        description: 'Mua thêm khi còn hạn sẽ cộng dồn từ ngày hết hạn hiện tại.',
      },
    ];
  }

  /** User đang có gói premium còn hiệu lực không (dùng ở chatbot, thực đơn cho người thân...). */
  async isPremium(user_id: number): Promise<boolean> {
    return (await this.premiumStatus(user_id)).isPremium;
  }

  /** Premium tính theo users.premium_until (gói mua một lần, cộng dồn), chỉ đọc đúng cột cần. */
  async premiumStatus(user_id: number) {
    const user = await this.userRepo.findOne({ where: { user_id }, select: { user_id: true, role: true, premium_until: true } });
    const premium_until = user?.premium_until ?? null;
    const isPremium = user?.role === 'admin' || (!!premium_until && premium_until.getTime() > Date.now());
    return { isPremium, premium_until };
  }

  /**
   * POST /subscriptions/checkout: tạo giao dịch pending rồi trả link thanh toán VNPay đã ký.
   * Chưa cấu hình VNPay thì báo 503 trước khi tạo giao dịch, để không sinh giao dịch rác.
   */
  async checkout(user_id: number, ipAddr: string) {
    this.vnpay.assertConfigured();
    const gateway_txn_ref = `VMP${Date.now()}${randomUUID().slice(0, 6).toUpperCase()}`;
    const transaction = await this.transactionRepo.save(
      this.transactionRepo.create({
        user_id,
        amount: this.price,
        gateway_txn_ref,
        status: PaymentTransactionStatus.PENDING,
      }),
    );
    const payment_url = this.vnpay.buildPaymentUrl({
      txnRef: gateway_txn_ref,
      amount: transaction.amount,
      // VNPay khuyến nghị nội dung không dấu, không ký tự đặc biệt.
      orderInfo: `Thanh toan goi Premium 1 thang ${gateway_txn_ref}`,
      ipAddr,
      createdAt: transaction.created_at,
    });
    return {
      payment_url,
      gateway_txn_ref,
      amount: transaction.amount,
      expires_in_minutes: PAYMENT_LINK_TTL_MINUTES,
    };
  }

  /**
   * Xử lý kết quả VNPay, dùng chung cho IPN (VNPay gọi server, nguồn sự thật) và trang return (dự phòng khi IPN
   * chưa tới, ví dụ chạy localhost không có ngrok). Thứ tự kiểm tra theo tài liệu VNPay:
   * chữ ký → giao dịch tồn tại → đúng số tiền → chưa xử lý → kết quả.
   * Chỉ request đầu tiên đổi được trạng thái pending (UPDATE có điều kiện), nên IPN và return tới cùng lúc
   * cũng không kích hoạt Premium hai lần.
   */
  async processVnpayResult(query: Record<string, unknown>): Promise<PaymentResult> {
    if (!this.vnpay.verify(query)) {
      return { ipn: IPN.INVALID_SIGNATURE, status: 'invalid', message: 'Chữ ký không hợp lệ, không xác nhận được giao dịch' };
    }
    const txn_ref = String(query.vnp_TxnRef ?? '');
    const transaction = await this.transactionRepo.findOne({ where: { gateway_txn_ref: txn_ref } });
    if (!transaction) {
      return { ipn: IPN.ORDER_NOT_FOUND, status: 'invalid', txn_ref, message: 'Không tìm thấy giao dịch' };
    }
    if (Number(query.vnp_Amount) !== Math.round(transaction.amount * 100)) {
      return { ipn: IPN.INVALID_AMOUNT, status: 'invalid', txn_ref, message: 'Số tiền không khớp với giao dịch' };
    }
    if (transaction.status !== PaymentTransactionStatus.PENDING) {
      return this.alreadyProcessed(transaction);
    }

    const paid = query.vnp_ResponseCode === '00' && query.vnp_TransactionStatus === '00';
    const raw_response = JSON.stringify(query);
    const claimed = await this.transactionRepo.update(
      { transaction_id: transaction.transaction_id, status: PaymentTransactionStatus.PENDING },
      paid
        ? {
            status: PaymentTransactionStatus.SUCCESS,
            gateway_transaction_no: String(query.vnp_TransactionNo ?? ''),
            raw_response,
            paid_at: new Date(),
          }
        : { status: PaymentTransactionStatus.FAILED, raw_response },
    );
    if (!claimed.affected) {
      const latest = await this.transactionRepo.findOneOrFail({ where: { transaction_id: transaction.transaction_id } });
      return this.alreadyProcessed(latest);
    }

    if (!paid) {
      return {
        ipn: IPN.OK,
        status: 'failed',
        txn_ref,
        message: `Thanh toán không thành công (mã VNPay ${String(query.vnp_ResponseCode ?? '')})`,
      };
    }
    const premium_until = await this.activatePremium(transaction);
    return { ipn: IPN.OK, status: 'success', txn_ref, premium_until, message: 'Thanh toán thành công, đã kích hoạt Premium' };
  }

  /**
   * Tạo subscription và gia hạn premium_until. Còn hạn thì cộng dồn từ ngày hết hạn hiện tại,
   * hết hạn rồi thì tính từ hôm nay.
   */
  private async activatePremium(transaction: PaymentTransaction): Promise<Date> {
    const { saved, end } = await this.userRepo.manager.transaction(async (m) => {
      const user = await m.findOneOrFail(User, { where: { user_id: transaction.user_id }, lock: { mode: 'pessimistic_write' } });
      const now = new Date();
      const start = user.premium_until && user.premium_until > now ? user.premium_until : now;
      const end = new Date(start.getTime() + PLAN_DURATION_DAYS * 86_400_000);
      const saved = await m.save(
        m.create(Subscription, {
          user_id: transaction.user_id,
          transaction_id: transaction.transaction_id,
          plan_type: PLAN_TYPE,
          amount: transaction.amount,
          start_date: start,
          end_date: end,
          status: SubscriptionStatus.ACTIVE,
        }),
      );
      await m.update(User, { user_id: transaction.user_id }, { premium_until: end });
      return { saved, end };
    });

    await this.notificationService
      .create({
        user_id: transaction.user_id,
        type: NotificationType.SUBSCRIPTION_SUCCESS,
        title: 'Đăng ký gói Premium thành công',
        message: `Gói Premium của bạn có hiệu lực đến hết ngày ${end.toLocaleDateString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}.`,
        ref_type: 'subscription',
        ref_id: saved.subscription_id,
      })
      .catch((err) => this.logger.error(`Không tạo được thông báo thanh toán: ${err?.message ?? err}`));
    return end;
  }

  private async alreadyProcessed(transaction: PaymentTransaction): Promise<PaymentResult> {
    const user = await this.userRepo.findOne({ where: { user_id: transaction.user_id } });
    const success = transaction.status === PaymentTransactionStatus.SUCCESS;
    return {
      ipn: IPN.ALREADY_CONFIRMED,
      status: success ? 'success' : 'failed',
      txn_ref: transaction.gateway_txn_ref,
      premium_until: user?.premium_until ?? null,
      message: success ? 'Giao dịch đã được xác nhận trước đó' : 'Giao dịch không thành công',
    };
  }

  /**
   * Huỷ gói: KHÔNG hoàn tiền tự động (ngoài phạm vi đồ án), chỉ đánh dấu cancelled.
   * User vẫn dùng Premium đến hết hạn đã trả tiền (gói mua một lần, không tự gia hạn).
   */
  async cancel(user_id: number, subscription_id: number): Promise<Subscription> {
    const subscription = await this.subscriptionRepo.findOne({ where: { subscription_id, user_id } });
    if (!subscription) {
      throw new NotFoundException({ code: ErrorCode.SUBSCRIPTION_NOT_FOUND, message: 'Không tìm thấy gói đăng ký' });
    }
    if (subscription.status !== SubscriptionStatus.ACTIVE) {
      throw new BadRequestException({ code: ErrorCode.SUBSCRIPTION_NOT_ACTIVE, message: 'Chỉ huỷ được gói đang hoạt động' });
    }
    subscription.status = SubscriptionStatus.CANCELLED;
    subscription.cancelled_at = new Date();
    const saved = await this.subscriptionRepo.save(subscription);

    await this.notificationService.create({
      user_id,
      type: NotificationType.SUBSCRIPTION_CANCELLED,
      title: 'Đã huỷ gói Premium',
      message: 'Bạn vẫn dùng được Premium đến hết hạn đã thanh toán.',
      ref_type: 'subscription',
      ref_id: subscription.subscription_id,
    });
    return saved;
  }
  /**
   * Kích hoạt gói Premium trực tiếp (không qua thanh toán VNPay)
   * Phục vụ chuyển gói tự do trong giai đoạn chưa hoàn thiện cổng thanh toán.
   */
  async activateDirect(user_id: number) {
    const transaction = await this.transactionRepo.save(
      this.transactionRepo.create({
        user_id,
        amount: 0,
        gateway: PaymentGateway.VNPAY,
        gateway_txn_ref: `DIRECT_${Date.now()}_${randomUUID().slice(0, 6).toUpperCase()}`,
        status: PaymentTransactionStatus.SUCCESS,
      }),
    );
    const premium_until = await this.activatePremium(transaction);
    return {
      success: true,
      isPremium: true,
      premium_until,
      message: 'Kích hoạt gói Premium thành công! Toàn bộ tính năng đã được mở khóa.',
    };
  }

  /**
   * Chuyển về gói Miễn phí (hủy hiệu lực Premium)
   */
  async switchFree(user_id: number) {
    await this.userRepo.update({ user_id }, { premium_until: null as any });
    await this.subscriptionRepo.update(
      { user_id, status: SubscriptionStatus.ACTIVE },
      { status: SubscriptionStatus.CANCELLED, cancelled_at: new Date() },
    );
    return {
      success: true,
      isPremium: false,
      premium_until: null,
      message: 'Đã chuyển về gói Miễn phí thành công.',
    };
  }
}
