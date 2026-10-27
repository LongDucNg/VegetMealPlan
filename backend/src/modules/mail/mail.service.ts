import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

/**
 * Gửi email qua SMTP (Gmail app password, Brevo, Mailtrap... đều được).
 * Chưa cấu hình MAIL_HOST thì không gửi mà in nội dung ra console, để cả nhóm vẫn test được
 * luồng quên mật khẩu ở máy local mà không cần tài khoản SMTP.
 */
@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private readonly transporter: nodemailer.Transporter | null;
  private readonly from: string;
  private readonly isProduction: boolean;

  constructor(config: ConfigService) {
    const host = config.get<string>('MAIL_HOST');
    const port = Number(config.get<string>('MAIL_PORT')) || 465;
    this.from = config.get<string>('MAIL_FROM') || `VegetMealPlan <${config.get<string>('MAIL_USER') ?? 'no-reply@localhost'}>`;
    this.isProduction = config.get<string>('NODE_ENV') === 'production';
    this.transporter = host
      ? nodemailer.createTransport({
          host,
          port,
          secure: port === 465, // 465 dùng SSL ngay từ đầu; 587 dùng STARTTLS
          auth: { user: config.get<string>('MAIL_USER'), pass: config.get<string>('MAIL_PASS') },
        })
      : null;
  }

  async send(to: string, subject: string, html: string, text: string): Promise<void> {
    if (!this.transporter) {
      // Không in nội dung (có thể chứa OTP) ra log ở production.
      if (this.isProduction) this.logger.error(`Chưa cấu hình MAIL_HOST, không gửi được mail "${subject}" tới ${to}`);
      else this.logger.warn(`[MAIL chưa cấu hình] Tới: ${to} | ${subject}\n${text}`);
      return;
    }
    await this.transporter.sendMail({ from: this.from, to, subject, html, text });
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

function layout(body: string) {
  return `<div style="font-family:Arial,sans-serif;max-width:480px;margin:auto;color:#1f2937">
    <h2 style="color:#15803d">VegetMealPlan</h2>${body}</div>`;
}
