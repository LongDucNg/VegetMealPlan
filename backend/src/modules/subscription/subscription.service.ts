import { BadRequestException, ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';
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
import { PayosService } from './payos.service';
import { maskPayosRaw, parsePayosProof, PayosReceiver, statusMatches } from './payos-proof.util';

const PLAN_TYPE = 'monthly';
const PLAN_DURATION_DAYS = 30;

export interface PaymentResult {
  status: 'success' | 'failed' | 'invalid' | 'pending';
  txn_ref?: string;
  premium_until?: Date | null;
  message: string;
}

@Injectable()
export class SubscriptionService {
  private readonly logger = new Logger(SubscriptionService.name);
  private readonly price: number;
  private readonly allowDirectPremium: boolean;
  /** Tài khoản nhận tiền hiển thị trên trang admin (khai trong .env, không ghi cứng trong code). */
  private readonly receiver: PayosReceiver;

  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepo: Repository<Subscription>,
    @InjectRepository(PaymentTransaction)
    private readonly transactionRepo: Repository<PaymentTransaction>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly notificationService: NotificationService,
    private readonly payos: PayosService,
    config: ConfigService,
  ) {
    this.price = Number(config.get<string>('MONTHLY_PLAN_PRICE')) || 99000;
    // Mặc định TẮT: bật lên thì ai đăng nhập cũng tự có Premium không cần trả tiền (chỉ dùng khi demo/test).
    this.allowDirectPremium = config.get<string>('ALLOW_DIRECT_PREMIUM') === 'true';
    this.receiver = {
      name: config.get<string>('PAYOS_RECEIVER_NAME')?.trim() || null,
      account: config.get<string>('PAYOS_RECEIVER_ACCOUNT')?.trim() || null,
      bank: config.get<string>('PAYOS_RECEIVER_BANK')?.trim() || null,
    };
  }

  /**
   * GET /subscriptions/admin/transactions: lịch sử giao dịch kèm chứng thực người chuyển/người nhận,
   * tách từ dữ liệu webhook PayOS đã lưu (không gọi PayOS từng dòng nên tải nhanh).
   */
  async adminListTransactions(query: { search?: string; status?: string; gateway?: string } = {}) {
    // Chỉ lấy vài cột của user: join cả entity sẽ trả luôn password_hash, google_id ra API.
    const qb = this.transactionRepo
      .createQueryBuilder('tx')
      .leftJoin('tx.user', 'user')
      .addSelect(['user.user_id', 'user.full_name', 'user.email'])
      .orderBy('tx.created_at', 'DESC');
    // Giá trị lạ cho cột enum làm Postgres báo lỗi 500: chỉ lọc khi đúng giá trị enum.
    const statuses = Object.values(PaymentTransactionStatus) as string[];
    const gateways = Object.values(PaymentGateway) as string[];
    if (query.status && statuses.includes(query.status)) qb.andWhere('tx.status = :status', { status: query.status });
    if (query.gateway && gateways.includes(query.gateway)) qb.andWhere('tx.gateway = :gateway', { gateway: query.gateway });
    if (query.search?.trim()) {
      qb.andWhere(
        '(user.email ILIKE :search OR user.full_name ILIKE :search OR tx.gateway_txn_ref ILIKE :search OR tx.gateway_transaction_no ILIKE :search)',
        { search: `%${query.search.trim()}%` },
      );
    }
    const rows = await qb.take(500).getMany();
    // Không trả raw_response: trong đó có số tài khoản người chuyển chưa che.
    return rows.map((tx) => ({
      transaction_id: tx.transaction_id,
      user_id: tx.user_id,
      user: tx.user ? { user_id: tx.user.user_id, full_name: tx.user.full_name, email: tx.user.email } : null,
      amount: tx.amount,
      gateway: tx.gateway,
      gateway_txn_ref: tx.gateway_txn_ref,
      gateway_transaction_no: tx.gateway_transaction_no,
      status: tx.status,
      created_at: tx.created_at,
      paid_at: tx.paid_at,
      proof: parsePayosProof(tx.raw_response, this.receiver),
    }));
  }

  /**
   * GET /subscriptions/admin/transactions/:orderCode/proof: tra trực tiếp API PayOS (bên thứ ba) để đối soát
   * một giao dịch với dữ liệu trong DB. Chỉ đọc, không đổi trạng thái giao dịch hay Premium.
   */
  async adminPayosProof(orderCode: string) {
    if (!/^\d{1,15}$/.test(orderCode)) {
      throw new BadRequestException({ code: ErrorCode.VALIDATION_FAILED, message: 'Mã đơn PayOS phải là số' });
    }
    const tx = await this.transactionRepo
      .createQueryBuilder('tx')
      .leftJoin('tx.user', 'user')
      .addSelect(['user.user_id', 'user.full_name', 'user.email'])
      .where('tx.gateway_txn_ref = :ref', { ref: orderCode })
      .getOne();
    if (!tx) {
      throw new NotFoundException({
        code: ErrorCode.RESOURCE_NOT_FOUND,
        message: `Không có giao dịch #${orderCode} trong hệ thống`,
      });
    }

    this.payos.assertConfigured();
    const info = await this.payos.getPaymentInformation(Number(orderCode));
    const proof = info ? parsePayosProof(info, this.receiver) : null;

    return {
      order_code: orderCode,
      checked_at: new Date(),
      found_on_payos: !!info,
      message: info ? 'Đã đối soát trực tiếp với PayOS' : 'PayOS không trả thông tin cho mã đơn này',
      db: {
        transaction_id: tx.transaction_id,
        status: tx.status,
        amount: tx.amount,
        created_at: tx.created_at,
        paid_at: tx.paid_at,
        user: tx.user ? { user_id: tx.user.user_id, full_name: tx.user.full_name, email: tx.user.email } : null,
      },
      proof,
      consistency: proof
        ? {
            status_matches: statusMatches(tx.status, proof.payosStatus),
            amount_matches: tx.status === PaymentTransactionStatus.SUCCESS ? proof.amountPaid === tx.amount : null,
          }
        : null,
      // JSON gốc PayOS trả về (đã che số tài khoản người chuyển) để chứng minh dữ liệu đến từ bên thứ ba.
      payos_raw: info ? maskPayosRaw(info) : null,
    };
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

    let start_date: string | null = null;
    let end_date: string | null = null;

    if (isPremium) {
      const sub = await this.subscriptionRepo.findOne({
        where: { user_id, status: SubscriptionStatus.ACTIVE },
        order: { subscription_id: 'DESC' },
      });
      if (sub) {
        start_date = typeof sub.start_date === 'string' ? sub.start_date : (sub.start_date ? new Date(sub.start_date).toISOString() : null);
        end_date = typeof sub.end_date === 'string' ? sub.end_date : (sub.end_date ? new Date(sub.end_date).toISOString() : null);
      } else if (premium_until) {
        end_date = premium_until.toISOString();
        const derivedStart = new Date(premium_until.getTime() - PLAN_DURATION_DAYS * 86_400_000);
        start_date = derivedStart.toISOString();
      }
    }

    return { isPremium, premium_until, start_date, end_date };
  }

  /**
   * POST /subscriptions/checkout: tạo giao dịch pending rồi trả link thanh toán VietQR (PayOS).
   * Chưa cấu hình PayOS thì báo 503 trước khi tạo giao dịch, để không sinh giao dịch rác.
   */
  async checkout(user_id: number, _ipAddr?: string) {
    this.payos.assertConfigured();

    // Sinh orderCode dạng số nguyên an toàn (6 số đuôi timestamp + 3 số ngẫu nhiên)
    const orderCode = Number(`${Date.now().toString().slice(-6)}${Math.floor(100 + Math.random() * 900)}`);
    const gateway_txn_ref = String(orderCode);

    const transaction = await this.transactionRepo.save(
      this.transactionRepo.create({
        user_id,
        amount: this.price,
        gateway: PaymentGateway.PAYOS,
        gateway_txn_ref,
        status: PaymentTransactionStatus.PENDING,
      }),
    );

    const paymentLink = await this.payos.createPaymentLink({
      orderCode,
      amount: transaction.amount,
      description: `Premium ${orderCode}`,
    });

    return {
      payment_url: paymentLink.checkoutUrl,
      qr_code: paymentLink.qrCode,
      order_code: orderCode,
      gateway_txn_ref,
      amount: transaction.amount,
      expires_in_minutes: 15,
    };
  }

  /**
   * Xử lý kết quả Webhook từ PayOS (server tới server).
   */
  async processPayosWebhook(webhookBody: any): Promise<{ success: boolean; message: string }> {
    let webhookData: any;
    try {
      webhookData = await this.payos.verifyWebhook(webhookBody);
    } catch (err: any) {
      this.logger.error(`Webhook signature không hợp lệ: ${err?.message || err}`);
      return { success: false, message: 'Invalid webhook signature' };
    }

    const orderCode = webhookData?.orderCode;
    if (!orderCode) {
      return { success: false, message: 'Missing orderCode in webhook data' };
    }

    const txn_ref = String(orderCode);
    const transaction = await this.transactionRepo.findOne({ where: { gateway_txn_ref: txn_ref } });
    if (!transaction) {
      this.logger.warn(`Không tìm thấy giao dịch cho orderCode #${orderCode}`);
      return { success: false, message: 'Transaction not found' };
    }

    if (transaction.status !== PaymentTransactionStatus.PENDING) {
      return { success: true, message: 'Transaction already processed' };
    }

    const isSuccess = webhookData.code === '00';
    const raw_response = JSON.stringify(webhookBody);

    const claimed = await this.transactionRepo.update(
      { transaction_id: transaction.transaction_id, status: PaymentTransactionStatus.PENDING },
      isSuccess
        ? {
            status: PaymentTransactionStatus.SUCCESS,
            gateway_transaction_no: String(webhookData.reference ?? webhookData.paymentLinkId ?? ''),
            raw_response,
            paid_at: new Date(),
          }
        : { status: PaymentTransactionStatus.FAILED, raw_response },
    );

    if (!claimed.affected) {
      return { success: true, message: 'Transaction claimed by concurrent worker' };
    }

    if (!isSuccess) {
      return { success: false, message: `Thanh toán thất bại (mã ${webhookData.code})` };
    }

    await this.activatePremium(transaction);
    this.logger.log(`Kích hoạt thành công gói Premium cho người dùng #${transaction.user_id} qua PayOS (Order #${orderCode})`);
    return { success: true, message: 'Payment success and premium activated' };
  }

  /**
   * Kiểm tra trạng thái giao dịch cho trang Return của Frontend
   */
  async checkPaymentStatus(orderCode: string | number): Promise<PaymentResult> {
    const txn_ref = String(orderCode);
    let transaction = await this.transactionRepo.findOne({ where: { gateway_txn_ref: txn_ref } });

    if (!transaction) {
      return { status: 'invalid', txn_ref, message: 'Không tìm thấy giao dịch' };
    }

    // Nếu giao dịch vẫn đang PENDING: chủ động tra cứu trực tiếp từ PayOS server (phòng trường hợp Webhook chưa tới kịp)
    if (transaction.status === PaymentTransactionStatus.PENDING && this.payos.isConfigured()) {
      try {
        const payosInfo: any = await this.payos.getPaymentInformation(orderCode);
        if (payosInfo && payosInfo.status === 'PAID') {
          const claimed = await this.transactionRepo.update(
            { transaction_id: transaction.transaction_id, status: PaymentTransactionStatus.PENDING },
            {
              status: PaymentTransactionStatus.SUCCESS,
              gateway_transaction_no: String(payosInfo.paymentLinkId ?? ''),
              raw_response: JSON.stringify(payosInfo),
              paid_at: new Date(),
            },
          );
          if (claimed.affected) {
            const end = await this.activatePremium(transaction);
            return {
              status: 'success',
              txn_ref,
              premium_until: end,
              message: 'Thanh toán thành công, đã kích hoạt gói Premium!',
            };
          }
        }
      } catch (err: any) {
        this.logger.warn(`Lỗi đối soát trực tiếp PayOS: ${err?.message || err}`);
      }
    }

    transaction = await this.transactionRepo.findOne({ where: { gateway_txn_ref: txn_ref } });
    const user = transaction ? await this.userRepo.findOne({ where: { user_id: transaction.user_id } }) : null;

    if (transaction?.status === PaymentTransactionStatus.SUCCESS) {
      return {
        status: 'success',
        txn_ref,
        premium_until: user?.premium_until ?? null,
        message: 'Thanh toán thành công, tài khoản đã được nâng cấp Premium!',
      };
    } else if (transaction?.status === PaymentTransactionStatus.FAILED) {
      return {
        status: 'failed',
        txn_ref,
        premium_until: null,
        message: 'Giao dịch thanh toán không thành công hoặc đã bị hủy.',
      };
    }

    return {
      status: 'pending',
      txn_ref,
      premium_until: null,
      message: 'Giao dịch đang chờ thanh toán qua VietQR.',
    };
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
   * Kích hoạt gói Premium trực tiếp (không qua thanh toán PayOS)
   * Chỉ chạy khi ALLOW_DIRECT_PREMIUM=true (demo/test); mặc định tắt để không ai tự bật Premium miễn phí.
   */
  async activateDirect(user_id: number) {
    if (!this.allowDirectPremium) {
      throw new ForbiddenException({
        code: ErrorCode.SUBSCRIPTION_DIRECT_DISABLED,
        message: 'Kích hoạt Premium miễn phí đang tắt. Vui lòng thanh toán qua VietQR (PayOS).',
      });
    }
    const transaction = await this.transactionRepo.save(
      this.transactionRepo.create({
        user_id,
        amount: 0,
        gateway: PaymentGateway.PAYOS,
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
