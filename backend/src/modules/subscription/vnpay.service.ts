import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHmac, timingSafeEqual } from 'crypto';
import { ErrorCode } from '../../common/constants/error-codes.enum';

const SANDBOX_PAY_URL = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
/** Link thanh toán sống 15 phút; quá hạn VNPay tự báo hết hạn. */
export const PAYMENT_LINK_TTL_MINUTES = 15;

export interface VnpayPaymentInput {
  txnRef: string;
  amount: number; // VND
  orderInfo: string;
  ipAddr: string;
  createdAt?: Date;
}

/**
 * Ký và kiểm tra chữ ký VNPay (API thanh toán v2.1.0).
 * Chữ ký = HMAC-SHA512(VNPAY_HASH_SECRET, chuỗi tham số vnp_* sắp xếp theo tên, mã hoá kiểu form: dấu cách thành "+").
 * Bản sandbox và bản thật dùng cùng code; chỉ khác TmnCode, HashSecret và VNPAY_URL.
 */
@Injectable()
export class VnpayService {
  private readonly tmnCode?: string;
  private readonly hashSecret?: string;
  private readonly payUrl: string;
  private readonly returnUrl: string;

  constructor(config: ConfigService) {
    this.tmnCode = config.get<string>('VNPAY_TMN_CODE') || undefined;
    this.hashSecret = config.get<string>('VNPAY_HASH_SECRET') || undefined;
    this.payUrl = config.get<string>('VNPAY_URL') || SANDBOX_PAY_URL;
    const frontend = (config.get<string>('FRONTEND_URL') || 'http://localhost:3001').split(',')[0].trim();
    this.returnUrl = config.get<string>('VNPAY_RETURN_URL') || `${frontend}/subscriptions/vnpay-return`;
  }

  isConfigured() {
    return !!this.tmnCode && !!this.hashSecret;
  }

  buildPaymentUrl(input: VnpayPaymentInput): string {
    this.assertConfigured();
    const created = input.createdAt ?? new Date();
    const expire = new Date(created.getTime() + PAYMENT_LINK_TTL_MINUTES * 60_000);
    const params: Record<string, string> = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      vnp_TmnCode: this.tmnCode!,
      vnp_Locale: 'vn',
      vnp_CurrCode: 'VND',
      vnp_TxnRef: input.txnRef,
      vnp_OrderInfo: input.orderInfo,
      vnp_OrderType: 'other',
      vnp_Amount: String(Math.round(input.amount * 100)), // VNPay tính theo đơn vị nhỏ nhất: x100
      vnp_ReturnUrl: this.returnUrl,
      vnp_IpAddr: input.ipAddr,
      vnp_CreateDate: formatVnTime(created),
      vnp_ExpireDate: formatVnTime(expire),
    };
    const query = buildQuery(params);
    return `${this.payUrl}?${query}&vnp_SecureHash=${this.sign(query)}`;
  }

  /** Kiểm tra chữ ký của tham số VNPay gửi về (IPN hoặc trang return). */
  verify(query: Record<string, unknown>): boolean {
    if (!this.hashSecret) return false;
    const received = typeof query.vnp_SecureHash === 'string' ? query.vnp_SecureHash.toLowerCase() : '';
    if (!received) return false;
    const params: Record<string, string> = {};
    for (const [k, v] of Object.entries(query)) {
      if (!k.startsWith('vnp_') || k === 'vnp_SecureHash' || k === 'vnp_SecureHashType') continue;
      if (typeof v === 'string' && v !== '') params[k] = v;
    }
    const expected = this.sign(buildQuery(params));
    const a = Buffer.from(expected, 'hex');
    const b = Buffer.from(received, 'hex');
    return a.length === b.length && timingSafeEqual(a, b);
  }

  private sign(data: string) {
    return createHmac('sha512', this.hashSecret!).update(Buffer.from(data, 'utf-8')).digest('hex');
  }

  assertConfigured() {
    if (!this.isConfigured()) {
      throw new ServiceUnavailableException({
        code: ErrorCode.SUBSCRIPTION_PAYMENT_NOT_CONFIGURED,
        message: 'Chưa cấu hình cổng thanh toán VNPay (VNPAY_TMN_CODE, VNPAY_HASH_SECRET)',
      });
    }
  }
}

/** Sắp xếp theo tên tham số rồi nối "key=value&...", mã hoá như form (dấu cách thành "+"), đúng cách VNPay ký. */
function buildQuery(params: Record<string, string>) {
  return Object.keys(params)
    .sort()
    .map((k) => `${encode(k)}=${encode(params[k])}`)
    .join('&');
}

function encode(s: string) {
  return encodeURIComponent(s).replace(/%20/g, '+');
}

/** yyyyMMddHHmmss theo giờ Việt Nam (VNPay yêu cầu GMT+7). */
export function formatVnTime(d: Date) {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Ho_Chi_Minh',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
      .formatToParts(d)
      .map((x) => [x.type, x.value]),
  );
  const hour = p.hour === '24' ? '00' : p.hour;
  return `${p.year}${p.month}${p.day}${hour}${p.minute}${p.second}`;
}
