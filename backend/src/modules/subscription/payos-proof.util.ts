/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Đọc "chứng thực chuyển tiền" từ dữ liệu PayOS (bên thứ ba) cho trang admin Lịch sử giao dịch.
 *
 * PayOS không có API liệt kê toàn bộ giao dịch của tài khoản: chỉ tra được từng đơn theo orderCode.
 * Dữ liệu đến từ 2 nguồn, cả hai đều do PayOS gửi:
 *   - Webhook (lưu sẵn trong payment_transactions.raw_response): { code, desc, data: {...giao dịch}, signature }
 *   - API tra cứu paymentRequests.get(orderCode): { id, status, amountPaid, transactions: [...] }
 * Số tài khoản người chuyển luôn được che (chỉ giữ 4 số cuối) trước khi trả ra API.
 */

/** Mã BIN ngân hàng Việt Nam (NAPAS) -> tên, dùng khi PayOS chỉ trả counterAccountBankId. */
export const VIETNAM_BANK_BIN_MAP: Record<string, string> = {
  '970422': 'MB Bank',
  '970436': 'Vietcombank',
  '970407': 'Techcombank',
  '970415': 'VietinBank',
  '970418': 'BIDV',
  '970405': 'Agribank',
  '970423': 'TPBank',
  '970432': 'VPBank',
  '970448': 'OCB',
  '970428': 'Nam A Bank',
  '970441': 'VIB',
  '970403': 'Sacombank',
  '970416': 'ACB',
  '970454': 'BVBank',
  '970437': 'HDBank',
  '970443': 'SHB',
  '970449': 'LPBank',
  '970431': 'Eximbank',
  '970419': 'NCB',
  '970426': 'MSB',
  '970425': 'ABBANK',
  '970427': 'VietABank',
  '970452': 'KienlongBank',
  '970440': 'SeABank',
  '970412': 'PVcomBank',
  '970406': 'DongA Bank',
  '970400': 'Saigonbank',
  '970424': 'Shinhan Bank',
  '970439': 'Public Bank Vietnam',
  '970457': 'Woori Bank',
};

export interface PayosReceiver {
  name: string | null;
  account: string | null;
  bank: string | null;
}

export type PayosProofSource = 'payos_webhook' | 'payos_api' | 'none';

export interface PayosProof {
  /** Dữ liệu lấy từ đâu: webhook PayOS đã lưu, tra trực tiếp API PayOS, hoặc chưa có (vd giao dịch demo). */
  source: PayosProofSource;
  hasProof: boolean;
  /** PAID | PENDING | PROCESSING | CANCELLED | EXPIRED ... theo PayOS; null nếu không có dữ liệu. */
  payosStatus: string | null;
  amount: number | null;
  amountPaid: number | null;
  /** Mã tham chiếu giao dịch ngân hàng: tra được trên app ngân hàng. */
  reference: string | null;
  transactionDateTime: string | null;
  description: string | null;
  paymentLinkId: string | null;
  sender: {
    name: string | null;
    /** Đã che, vd "•••• 9024". */
    account: string | null;
    bankId: string | null;
    bankName: string | null;
  };
  receiver: PayosReceiver;
}

/** "0396379024" -> "•••• 9024". Giữ tối đa 4 số cuối; chuỗi quá ngắn thì che hết. */
export function maskAccount(account: string | null | undefined): string | null {
  if (account === null || account === undefined) return null;
  const value = String(account).replace(/\s+/g, '');
  if (!value) return null;
  if (value.length <= 4) return '••••';
  return `•••• ${value.slice(-4)}`;
}

function parseRaw(raw: unknown): any {
  if (!raw) return null;
  if (typeof raw === 'object') return raw;
  try {
    return JSON.parse(String(raw));
  } catch {
    return null;
  }
}

function bankNameOf(tx: any): string | null {
  if (tx?.counterAccountBankName) return tx.counterAccountBankName;
  const bin = tx?.counterAccountBankId;
  if (!bin) return null;
  return VIETNAM_BANK_BIN_MAP[String(bin)] ?? `Ngân hàng mã ${bin}`;
}

/** Tách chứng thực từ phản hồi webhook hoặc API PayOS. Không có dữ liệu thì trả bản rỗng (source "none"). */
export function parsePayosProof(raw: unknown, receiver: PayosReceiver): PayosProof {
  const data = parseRaw(raw);

  let source: PayosProofSource = 'none';
  let tx: any = null;
  let payosStatus: string | null = null;
  let amount: number | null = null;
  let amountPaid: number | null = null;
  let paymentLinkId: string | null = null;

  if (data && Array.isArray(data.transactions)) {
    // API paymentRequests.get(): một đơn có thể có nhiều lần chuyển, lấy lần mới nhất.
    source = 'payos_api';
    tx = data.transactions[data.transactions.length - 1] ?? null;
    payosStatus = data.status ?? null;
    amount = data.amount ?? null;
    amountPaid = data.amountPaid ?? null;
    paymentLinkId = data.id ?? null;
  } else if (data && data.data && typeof data.data === 'object') {
    // Webhook: code "00" = thanh toán thành công.
    source = 'payos_webhook';
    tx = data.data;
    payosStatus = data.code === '00' || data.data.code === '00' ? 'PAID' : 'CANCELLED';
    amount = data.data.amount ?? null;
    amountPaid = payosStatus === 'PAID' ? (data.data.amount ?? null) : 0;
    paymentLinkId = data.data.paymentLinkId ?? null;
  }

  return {
    source,
    hasProof: !!tx?.reference,
    payosStatus,
    amount,
    amountPaid,
    reference: tx?.reference ?? null,
    transactionDateTime: tx?.transactionDateTime ?? null,
    description: tx?.description ?? null,
    paymentLinkId,
    sender: {
      name: tx?.counterAccountName || null,
      account: maskAccount(tx?.counterAccountNumber),
      bankId: tx?.counterAccountBankId ?? null,
      bankName: bankNameOf(tx),
    },
    receiver: {
      name: receiver.name,
      // Ưu tiên số tài khoản nhận do PayOS trả về; không có mới dùng giá trị khai trong .env.
      account: tx?.accountNumber || receiver.account,
      bank: receiver.bank,
    },
  };
}

/** Bản sao JSON gốc của PayOS để hiển thị, với số tài khoản người chuyển đã được che. */
export function maskPayosRaw<T>(raw: T): T {
  const walk = (value: any): any => {
    if (Array.isArray(value)) return value.map(walk);
    if (value && typeof value === 'object') {
      const out: Record<string, any> = {};
      for (const [k, v] of Object.entries(value)) {
        out[k] = k === 'counterAccountNumber' ? maskAccount(v as string) : walk(v);
      }
      return out;
    }
    return value;
  };
  return walk(raw);
}

/** Trạng thái trong DB có khớp với trạng thái PayOS báo không. */
export function statusMatches(dbStatus: string, payosStatus: string | null): boolean {
  if (!payosStatus) return false;
  if (dbStatus === 'success') return payosStatus === 'PAID';
  if (dbStatus === 'failed') return payosStatus === 'CANCELLED' || payosStatus === 'EXPIRED';
  return payosStatus === 'PENDING' || payosStatus === 'PROCESSING';
}
