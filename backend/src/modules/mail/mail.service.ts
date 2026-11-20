import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

/** API gửi mail của Brevo qua HTTPS (cổng 443). */
const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';
const BREVO_TIMEOUT_MS = 10_000;

/**
 * Gửi email theo thứ tự ưu tiên:
 * 1. Có BREVO_API_KEY: gọi API HTTPS của Brevo. Dùng cách này trên Render, vì gói Free của Render
 *    chặn kết nối ra các cổng SMTP 25/465/587 (Gmail SMTP sẽ bị timeout, mail không bao giờ tới).
 * 2. Có MAIL_HOST: gửi qua SMTP (Gmail app password, Mailtrap...), dùng ở máy local.
 * 3. Không có gì: không gửi mà in nội dung ra console, để cả nhóm vẫn test được luồng OTP ở local.
 */
@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private readonly transporter: nodemailer.Transporter | null;
  private readonly from: string;
  private readonly isProduction: boolean;
  private readonly brevoApiKey?: string;

  constructor(config: ConfigService) {
    this.brevoApiKey = config.get<string>('BREVO_API_KEY')?.trim() || undefined;
    const host = config.get<string>('MAIL_HOST');
    const port = Number(config.get<string>('MAIL_PORT')) || 465;
    this.from = config.get<string>('MAIL_FROM') || `VegetMealPlan <${config.get<string>('MAIL_USER') ?? 'no-reply@localhost'}>`;
    this.isProduction = config.get<string>('NODE_ENV') === 'production';
    this.transporter = host && !this.brevoApiKey
      ? nodemailer.createTransport({
          host,
          port,
          secure: port === 465, // 465 dùng SSL ngay từ đầu; 587 dùng STARTTLS
          auth: { user: config.get<string>('MAIL_USER'), pass: config.get<string>('MAIL_PASS') },
        })
      : null;
  }

  async send(to: string, subject: string, html: string, text: string): Promise<void> {
    if (this.brevoApiKey) return this.sendViaBrevo(to, subject, html, text);
    if (!this.transporter) {
      // Không in nội dung (có thể chứa OTP) ra log ở production.
      if (this.isProduction) this.logger.error(`Chưa cấu hình BREVO_API_KEY hoặc MAIL_HOST, không gửi được mail "${subject}" tới ${to}`);
      else this.logger.warn(`[MAIL chưa cấu hình] Tới: ${to} | ${subject}\n${text}`);
      return;
    }
    try {
      await this.transporter.sendMail({ from: this.from, to, subject, html, text });
    } catch (err: any) {
      this.logger.error(`Lỗi gửi mail qua SMTP (${this.from} -> ${to}): ${err?.message ?? err}`);
      if (!this.isProduction) {
        this.logger.warn(`[DEV FALLBACK - SMTP LỖI] Đã sinh mã gửi tới: ${to} | ${subject}\n${text}`);
      } else {
        throw err;
      }
    }
  }

  /** Gửi qua API HTTPS của Brevo. Người gửi (MAIL_FROM) phải được xác minh trong Brevo > Senders. */
  private async sendViaBrevo(to: string, subject: string, html: string, text: string): Promise<void> {
    const sender = parseAddress(this.from);
    const res = await fetch(BREVO_API_URL, {
      method: 'POST',
      headers: { 'api-key': this.brevoApiKey!, 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify({ sender, to: [{ email: to }], subject, htmlContent: html, textContent: text }),
      signal: AbortSignal.timeout(BREVO_TIMEOUT_MS),
    }).catch((err: any) => {
      this.logger.error(`Lỗi kết nối Brevo (${sender.email} -> ${to}): ${err?.message ?? err}`);
      throw err;
    });
    if (!res.ok) {
      const detail = (await res.text().catch(() => '')).slice(0, 300);
      this.logger.error(`Brevo từ chối gửi mail (${sender.email} -> ${to}): HTTP ${res.status} ${detail}`);
      throw new Error(`Brevo HTTP ${res.status}`);
    }
  }

  sendResetPasswordOtp(to: string, code: string, ttlMinutes: number) {
    return this.send(
      to,
      `Mã đặt lại mật khẩu VegetMealPlan: ${code}`,
      layout(`
        <p>Bạn (hoặc ai đó) vừa yêu cầu đặt lại mật khẩu cho tài khoản VegetMealPlan.</p>
        <p style="font-size:28px;font-weight:700;letter-spacing:6px;margin:24px 0">${code}</p>
        <p>Mã có hiệu lực trong ${ttlMinutes} phút và chỉ dùng được một lần. Không chia sẻ mã này cho ai.</p>
        <p>Nếu bạn không yêu cầu, hãy bỏ qua email này, mật khẩu của bạn vẫn giữ nguyên.</p>`),
      `Mã đặt lại mật khẩu VegetMealPlan: ${code}. Hiệu lực ${ttlMinutes} phút. Nếu bạn không yêu cầu, hãy bỏ qua email này.`,
    );
  }

  sendVerifyEmailOtp(to: string, code: string, ttlMinutes: number) {
    return this.send(
      to,
      `Mã xác thực email VegetMealPlan: ${code}`,
      layout(`
        <p>Cảm ơn bạn đã đăng ký VegetMealPlan. Nhập mã dưới đây để xác thực email và kích hoạt tài khoản:</p>
        <p style="font-size:28px;font-weight:700;letter-spacing:6px;margin:24px 0">${code}</p>
        <p>Mã có hiệu lực trong ${ttlMinutes} phút và chỉ dùng được một lần. Không chia sẻ mã này cho ai.</p>
        <p>Nếu bạn không đăng ký tài khoản, hãy bỏ qua email này.</p>`),
      `Mã xác thực email VegetMealPlan: ${code}. Hiệu lực ${ttlMinutes} phút. Nếu bạn không đăng ký, hãy bỏ qua email này.`,
    );
  }

  sendPasswordChanged(to: string) {
    const time = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
    return this.send(
      to,
      'Mật khẩu VegetMealPlan của bạn vừa được thay đổi',
      layout(`
        <p>Mật khẩu tài khoản VegetMealPlan của bạn đã được thay đổi lúc ${time}.</p>
        <p>Nếu không phải bạn, hãy dùng chức năng <b>Quên mật khẩu</b> để lấy lại tài khoản ngay.</p>`),
      `Mật khẩu VegetMealPlan của bạn đã được thay đổi lúc ${time}. Nếu không phải bạn, hãy dùng chức năng Quên mật khẩu ngay.`,
    );
  }
}

/** `"VegetMealPlan <a@b.com>"` -> { name: 'VegetMealPlan', email: 'a@b.com' }; `a@b.com` -> { email }. */
export function parseAddress(value: string): { name?: string; email: string } {
  const m = value.match(/^\s*"?([^"<]*?)"?\s*<([^>]+)>\s*$/);
  if (!m) return { email: value.trim() };
  const name = m[1].trim();
  return name ? { name, email: m[2].trim() } : { email: m[2].trim() };
}

function layout(body: string) {
  return `<div style="font-family:Arial,sans-serif;max-width:480px;margin:auto;color:#1f2937">
    <h2 style="color:#15803d">VegetMealPlan</h2>${body}</div>`;
}
