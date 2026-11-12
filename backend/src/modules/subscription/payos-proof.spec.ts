/* eslint-disable @typescript-eslint/no-explicit-any */
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { maskAccount, maskPayosRaw, parsePayosProof, statusMatches } from './payos-proof.util';
import { SubscriptionService } from './subscription.service';
import { PaymentTransactionStatus } from './entities/payment-transaction.entity';

const RECEIVER = { name: 'CHU TAI KHOAN', account: '1111222233', bank: 'MB Bank' };

// Dữ liệu mẫu theo đúng kiểu @payos/node 2.x trả về.
const WEBHOOK_BODY = {
  code: '00',
  desc: 'success',
  success: true,
  signature: 'sig',
  data: {
    orderCode: 123456789,
    amount: 99000,
    description: 'Premium 123456789',
    accountNumber: '9999888877',
    reference: 'FT2531012345',
    transactionDateTime: '2026-11-10 18:20:00',
    paymentLinkId: 'plink_1',
    code: '00',
    desc: 'success',
    counterAccountBankId: '970436',
    counterAccountBankName: null,
    counterAccountName: 'NGUYEN VAN A',
    counterAccountNumber: '0123456789',
  },
};

const PAYMENT_LINK = {
  id: 'plink_1',
  orderCode: 123456789,
  amount: 99000,
  amountPaid: 99000,
  amountRemaining: 0,
  status: 'PAID',
  createdAt: '2026-11-10T11:19:00Z',
  transactions: [
    {
      reference: 'FT2531012345',
      amount: 99000,
      accountNumber: '9999888877',
      description: 'Premium 123456789',
      transactionDateTime: '2026-11-10 18:20:00',
      virtualAccountName: null,
      virtualAccountNumber: null,
      counterAccountBankId: '970422',
      counterAccountBankName: 'MB Bank',
      counterAccountName: 'NGUYEN VAN A',
      counterAccountNumber: '0123456789',
    },
  ],
  cancellationReason: null,
  canceledAt: null,
};

describe('payos-proof.util', () => {
  it('che số tài khoản, chỉ giữ 4 số cuối', () => {
    expect(maskAccount('0123456789')).toBe('•••• 6789');
    expect(maskAccount('0123 456 789')).toBe('•••• 6789');
    expect(maskAccount('123')).toBe('••••');
    expect(maskAccount(null)).toBeNull();
    expect(maskAccount('')).toBeNull();
  });

  it('đọc chứng thực từ webhook đã lưu (chuỗi JSON), tra tên ngân hàng theo mã BIN', () => {
    const proof = parsePayosProof(JSON.stringify(WEBHOOK_BODY), RECEIVER);
    expect(proof.source).toBe('payos_webhook');
    expect(proof.hasProof).toBe(true);
    expect(proof.payosStatus).toBe('PAID');
    expect(proof.amountPaid).toBe(99000);
    expect(proof.reference).toBe('FT2531012345');
    expect(proof.sender).toEqual({
      name: 'NGUYEN VAN A',
      account: '•••• 6789',
      bankId: '970436',
      bankName: 'Vietcombank',
    });
    // Số tài khoản nhận lấy từ PayOS, tên lấy từ .env.
    expect(proof.receiver).toEqual({ name: 'CHU TAI KHOAN', account: '9999888877', bank: 'MB Bank' });
  });

  it('đọc chứng thực từ API tra cứu PayOS (lấy lần chuyển mới nhất)', () => {
    const proof = parsePayosProof(PAYMENT_LINK, RECEIVER);
    expect(proof.source).toBe('payos_api');
    expect(proof.payosStatus).toBe('PAID');
    expect(proof.paymentLinkId).toBe('plink_1');
    expect(proof.sender.bankName).toBe('MB Bank');
    expect(proof.sender.account).toBe('•••• 6789');
  });

  it('ngân hàng không trả thông tin người chuyển thì để null, vẫn giữ mã tham chiếu', () => {
    const body = {
      ...WEBHOOK_BODY,
      data: { ...WEBHOOK_BODY.data, counterAccountName: null, counterAccountNumber: null, counterAccountBankId: null },
    };
    const proof = parsePayosProof(body, RECEIVER);
    expect(proof.hasProof).toBe(true);
    expect(proof.sender).toEqual({ name: null, account: null, bankId: null, bankName: null });
  });

  it('giao dịch chưa có dữ liệu PayOS (demo, JSON hỏng) trả bản rỗng, dùng tài khoản nhận trong .env', () => {
    for (const raw of [null, '', '{không phải json', JSON.stringify({ foo: 1 })]) {
      const proof = parsePayosProof(raw, RECEIVER);
      expect(proof.source).toBe('none');
      expect(proof.hasProof).toBe(false);
      expect(proof.receiver.account).toBe('1111222233');
    }
  });

  it('webhook mã khác "00" là thanh toán không thành công', () => {
    const proof = parsePayosProof({ ...WEBHOOK_BODY, code: '01', data: { ...WEBHOOK_BODY.data, code: '01' } }, RECEIVER);
    expect(proof.payosStatus).toBe('CANCELLED');
    expect(proof.amountPaid).toBe(0);
  });

  it('JSON gốc hiển thị cho admin đã che số tài khoản người chuyển ở mọi cấp, không sửa bản gốc', () => {
    const masked = maskPayosRaw(PAYMENT_LINK);
    expect(masked.transactions[0].counterAccountNumber).toBe('•••• 6789');
    expect(masked.transactions[0].accountNumber).toBe('9999888877');
    expect(PAYMENT_LINK.transactions[0].counterAccountNumber).toBe('0123456789');
    expect(JSON.stringify(masked)).not.toContain('0123456789');
  });

  it('so khớp trạng thái DB với PayOS', () => {
    expect(statusMatches('success', 'PAID')).toBe(true);
    expect(statusMatches('success', 'PENDING')).toBe(false);
    expect(statusMatches('failed', 'CANCELLED')).toBe(true);
    expect(statusMatches('failed', 'EXPIRED')).toBe(true);
    expect(statusMatches('pending', 'PENDING')).toBe(true);
    expect(statusMatches('pending', null)).toBe(false);
  });
});

describe('SubscriptionService - trang admin Lịch sử giao dịch', () => {
  let qb: any;
  let payos: any;
  let svc: SubscriptionService;

  const dbTx = (over: any = {}) => ({
    transaction_id: 7,
    user_id: 3,
    user: { user_id: 3, full_name: 'Nguyễn Văn A', email: 'a@example.com' },
    amount: 99000,
    gateway: 'PAYOS',
    gateway_txn_ref: '123456789',
    gateway_transaction_no: 'FT2531012345',
    status: PaymentTransactionStatus.SUCCESS,
    raw_response: JSON.stringify(WEBHOOK_BODY),
    created_at: new Date('2026-11-10T11:19:00Z'),
    paid_at: new Date('2026-11-10T11:20:00Z'),
    ...over,
  });

  beforeEach(() => {
    qb = {
      leftJoin: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue([dbTx()]),
      getOne: jest.fn().mockResolvedValue(dbTx()),
    };
    const txRepo: any = { createQueryBuilder: jest.fn().mockReturnValue(qb) };
    payos = {
      isConfigured: jest.fn().mockReturnValue(true),
      assertConfigured: jest.fn(),
      getPaymentInformation: jest.fn().mockResolvedValue(PAYMENT_LINK),
    };
    const env: Record<string, string> = {
      PAYOS_RECEIVER_NAME: 'CHU TAI KHOAN',
      PAYOS_RECEIVER_ACCOUNT: '1111222233',
    };
    const config: any = { get: (k: string) => env[k] };
    svc = new SubscriptionService({} as any, txRepo, {} as any, {} as any, payos, config);
  });

  it('danh sách chỉ lấy tên/email của user và không trả raw_response chưa che', async () => {
    const rows = await svc.adminListTransactions({});
    expect(qb.addSelect).toHaveBeenCalledWith(['user.user_id', 'user.full_name', 'user.email']);
    expect(rows[0]).not.toHaveProperty('raw_response');
    expect(JSON.stringify(rows)).not.toContain('0123456789');
    expect(rows[0].proof.sender.name).toBe('NGUYEN VAN A');
    expect(rows[0].proof.receiver.name).toBe('CHU TAI KHOAN');
  });

  it('bỏ qua giá trị lọc không thuộc enum thay vì để Postgres báo lỗi 500', async () => {
    await svc.adminListTransactions({ status: 'paid', gateway: 'momo' });
    expect(qb.andWhere).not.toHaveBeenCalled();
    await svc.adminListTransactions({ status: 'success', gateway: 'PAYOS', search: '  a@ex ' });
    expect(qb.andWhere).toHaveBeenCalledWith('tx.status = :status', { status: 'success' });
    expect(qb.andWhere).toHaveBeenCalledWith('tx.gateway = :gateway', { gateway: 'PAYOS' });
    expect(qb.andWhere).toHaveBeenCalledWith(expect.stringContaining('ILIKE'), { search: '%a@ex%' });
  });

  it('đối soát: tra PayOS theo orderCode, báo khớp trạng thái và số tiền, JSON gốc đã che', async () => {
    const res = await svc.adminPayosProof('123456789');
    expect(payos.getPaymentInformation).toHaveBeenCalledWith(123456789);
    expect(res.found_on_payos).toBe(true);
    expect(res.proof?.source).toBe('payos_api');
    expect(res.consistency).toEqual({ status_matches: true, amount_matches: true });
    expect(JSON.stringify(res)).not.toContain('0123456789');
  });

  it('đối soát phát hiện lệch: DB báo thành công nhưng PayOS chưa nhận đủ tiền', async () => {
    payos.getPaymentInformation.mockResolvedValue({ ...PAYMENT_LINK, status: 'PENDING', amountPaid: 0 });
    const res = await svc.adminPayosProof('123456789');
    expect(res.consistency).toEqual({ status_matches: false, amount_matches: false });
  });

  it('PayOS không trả dữ liệu thì báo rõ, không ném lỗi', async () => {
    payos.getPaymentInformation.mockResolvedValue(null);
    const res = await svc.adminPayosProof('123456789');
    expect(res.found_on_payos).toBe(false);
    expect(res.proof).toBeNull();
    expect(res.payos_raw).toBeNull();
  });

  it('mã đơn không phải số hoặc không có trong DB thì không gọi PayOS', async () => {
    await expect(svc.adminPayosProof('DIRECT_1')).rejects.toBeInstanceOf(BadRequestException);
    qb.getOne.mockResolvedValue(null);
    await expect(svc.adminPayosProof('999')).rejects.toBeInstanceOf(NotFoundException);
    expect(payos.getPaymentInformation).not.toHaveBeenCalled();
  });
});
