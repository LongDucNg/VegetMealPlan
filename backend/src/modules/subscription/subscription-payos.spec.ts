/* eslint-disable @typescript-eslint/no-explicit-any */
import { SubscriptionService } from './subscription.service';
import { PaymentGateway, PaymentTransactionStatus } from './entities/payment-transaction.entity';

describe('SubscriptionService - PayOS VietQR Integration', () => {
  let svc: SubscriptionService;
  let savedTransactions: any[];
  let updatedTransactions: any[];
  let mockPayos: any;
  let mockTxnRepo: any;
  let mockUserRepo: any;

  beforeEach(() => {
    savedTransactions = [];
    updatedTransactions = [];

    mockTxnRepo = {
      create: (o: any) => ({ ...o }),
      save: async (o: any) => {
        const item = { ...o, transaction_id: savedTransactions.length + 1, created_at: new Date() };
        savedTransactions.push(item);
        return item;
      },
      findOne: async ({ where }: any) => {
        return savedTransactions.find((t) => t.gateway_txn_ref === where.gateway_txn_ref) || null;
      },
      update: async (where: any, updateData: any) => {
        const item = savedTransactions.find((t) => t.transaction_id === where.transaction_id);
        if (item && item.status === where.status) {
          Object.assign(item, updateData);
          updatedTransactions.push({ where, updateData });
          return { affected: 1 };
        }
        return { affected: 0 };
      },
    };

    mockPayos = {
      isConfigured: jest.fn().mockReturnValue(true),
      assertConfigured: jest.fn(),
      createPaymentLink: jest.fn().mockResolvedValue({
        checkoutUrl: 'https://pay.payos.vn/web/test-checkout-123',
        qrCode: '00020101021238540010A000000727...',
        orderCode: 123456,
        paymentLinkId: 'plink_123',
        status: 'PENDING',
      }),
      verifyWebhook: jest.fn(),
      getPaymentInformation: jest.fn(),
    };

    mockUserRepo = {
      findOne: jest.fn().mockResolvedValue({ user_id: 1, role: 'user', premium_until: null }),
    };

    const mockConfig: any = {
      get: (k: string) => {
        if (k === 'MONTHLY_PLAN_PRICE') return '99000';
        return undefined;
      },
    };

    svc = new SubscriptionService(
      {} as any,
      mockTxnRepo,
      mockUserRepo,
      { create: jest.fn().mockResolvedValue({}) } as any,
      mockPayos,
      mockConfig,
    );

    jest.spyOn(svc as any, 'activatePremium').mockResolvedValue(new Date('2030-01-01'));
  });

  describe('checkout (Tạo link VietQR)', () => {
    it('tạo giao dịch pending với gateway PAYOS và trả link thanh toán cùng mã QR', async () => {
      const result = await svc.checkout(1);

      expect(mockPayos.assertConfigured).toHaveBeenCalled();
      expect(mockPayos.createPaymentLink).toHaveBeenCalledWith(
        expect.objectContaining({
          amount: 99000,
          description: expect.stringContaining('Premium'),
        }),
      );
      expect(result.payment_url).toBe('https://pay.payos.vn/web/test-checkout-123');
      expect(result.qr_code).toBeDefined();
      expect(savedTransactions).toHaveLength(1);
      expect(savedTransactions[0].gateway).toBe(PaymentGateway.PAYOS);
      expect(savedTransactions[0].status).toBe(PaymentTransactionStatus.PENDING);
    });
  });

  describe('processPayosWebhook (Xử lý Webhook PayOS)', () => {
    it('từ chối khi chữ ký webhook không hợp lệ', async () => {
      mockPayos.verifyWebhook.mockRejectedValue(new Error('Invalid signature'));

      const res = await svc.processPayosWebhook({ data: {}, signature: 'invalid' });
      expect(res.success).toBe(false);
      expect(res.message).toBe('Invalid webhook signature');
    });

    it('kích hoạt Premium khi thanh toán thành công (code: 00)', async () => {
      // Setup pending transaction
      savedTransactions.push({
        transaction_id: 10,
        user_id: 2,
        amount: 99000,
        gateway: PaymentGateway.PAYOS,
        gateway_txn_ref: '987654',
        status: PaymentTransactionStatus.PENDING,
      });

      mockPayos.verifyWebhook.mockResolvedValue({
        orderCode: 987654,
        amount: 99000,
        code: '00',
        reference: 'FT24001928371',
      });

      const res = await svc.processPayosWebhook({
        data: { orderCode: 987654, code: '00' },
        signature: 'valid_signature',
      });

      expect(res.success).toBe(true);
      expect(savedTransactions[0].status).toBe(PaymentTransactionStatus.SUCCESS);
      expect(svc['activatePremium']).toHaveBeenCalled();
    });

    it('đánh dấu FAILED khi thanh toán thất bại (code khác 00)', async () => {
      savedTransactions.push({
        transaction_id: 11,
        user_id: 3,
        amount: 99000,
        gateway: PaymentGateway.PAYOS,
        gateway_txn_ref: '112233',
        status: PaymentTransactionStatus.PENDING,
      });

      mockPayos.verifyWebhook.mockResolvedValue({
        orderCode: 112233,
        amount: 99000,
        code: '01',
      });

      const res = await svc.processPayosWebhook({
        data: { orderCode: 112233, code: '01' },
        signature: 'valid_signature',
      });

      expect(res.success).toBe(false);
      expect(savedTransactions[0].status).toBe(PaymentTransactionStatus.FAILED);
      expect(svc['activatePremium']).not.toHaveBeenCalled();
    });
  });

  describe('checkPaymentStatus (Tra cứu trạng thái)', () => {
    it('trả về status của giao dịch đã lưu', async () => {
      savedTransactions.push({
        transaction_id: 12,
        user_id: 4,
        amount: 99000,
        gateway: PaymentGateway.PAYOS,
        gateway_txn_ref: '445566',
        status: PaymentTransactionStatus.SUCCESS,
        paid_at: new Date('2026-11-03'),
      });

      const status = await svc.checkPaymentStatus('445566');
      expect(status.status).toBe('success');
      expect(status.txn_ref).toBe('445566');
    });
  });
});
