import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { createHmac, randomInt, timingSafeEqual } from 'crypto';
import { EmailOtp, EmailOtpPurpose } from './entities/email-otp.entity';
import { ErrorCode } from '../../common/constants/error-codes.enum';

export const OTP_TTL_SECONDS = 10 * 60;
export const OTP_RESEND_AFTER_SECONDS = 60;
export const OTP_MAX_ATTEMPTS = 5;

/**
 * Sinh và kiểm tra mã OTP 6 số.
 * - Mã sinh bằng crypto.randomInt (ngẫu nhiên an toàn), không dùng Math.random.
 * - DB chỉ giữ HMAC của mã; so sánh bằng timingSafeEqual.
 * - Hết hạn sau 10 phút, sai 5 lần là mã bị vô hiệu, xin mã mới phải cách 60 giây.
 */
@Injectable()
export class EmailOtpService {
  private readonly secret: string;

  constructor(
    @InjectRepository(EmailOtp)
    private readonly otpRepo: Repository<EmailOtp>,
    config: ConfigService,
  ) {
    this.secret = config.get<string>('JWT_SECRET') || 'dev-secret';
  }

  /** Tạo mã mới cho email + purpose, xoá mã cũ chưa dùng. Ném AUTH_OTP_RATE_LIMITED nếu chưa hết 60 giây chờ. */
  async issue(email: string, purpose: EmailOtpPurpose): Promise<string> {
    const latest = await this.otpRepo.findOne({ where: { email, purpose }, order: { created_at: 'DESC' } });
    if (latest && Date.now() - latest.created_at.getTime() < OTP_RESEND_AFTER_SECONDS * 1000) {
      throw new HttpException(
        { code: ErrorCode.AUTH_OTP_RATE_LIMITED, message: `Vui lòng đợi ${OTP_RESEND_AFTER_SECONDS} giây trước khi gửi lại mã` },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    const code = randomInt(0, 1_000_000).toString().padStart(6, '0');
    await this.otpRepo.manager.transaction(async (manager) => {
      await manager.delete(EmailOtp, { email, purpose, consumed_at: IsNull() });
      await manager.save(
        manager.create(EmailOtp, {
          email,
          purpose,
          code_hash: this.hash(email, purpose, code),
          expires_at: new Date(Date.now() + OTP_TTL_SECONDS * 1000),
          attempts: 0,
          consumed_at: null,
        }),
      );
    });
    return code;
  }

  /** Kiểm tra mã; đúng thì đánh dấu đã dùng (chỉ dùng được một lần), sai thì tăng số lần thử. */
  async consume(email: string, purpose: EmailOtpPurpose, code: string): Promise<void> {
    const otp = await this.otpRepo.findOne({
      where: { email, purpose, consumed_at: IsNull() },
      order: { created_at: 'DESC' },
    });
    if (!otp) throw invalidOtp();
    if (otp.expires_at.getTime() <= Date.now()) {
      throw new BadRequestException({ code: ErrorCode.AUTH_OTP_EXPIRED, message: 'Mã xác minh đã hết hạn, vui lòng gửi lại mã mới' });
    }
    if (otp.attempts >= OTP_MAX_ATTEMPTS) throw tooManyAttempts();

    if (!this.matches(otp.code_hash, this.hash(email, purpose, code))) {
      // Tăng bằng câu UPDATE nguyên tử để nhiều request song song không đếm sót.
      await this.otpRepo.increment({ otp_id: otp.otp_id }, 'attempts', 1);
      if (otp.attempts + 1 >= OTP_MAX_ATTEMPTS) throw tooManyAttempts();
      throw invalidOtp();
    }

    // Chỉ request đầu tiên đổi được consumed_at từ NULL; request thứ hai cùng mã sẽ nhận affected = 0.
    const result = await this.otpRepo.update({ otp_id: otp.otp_id, consumed_at: IsNull() }, { consumed_at: new Date() });
    if (!result.affected) throw invalidOtp();
  }

  private hash(email: string, purpose: string, code: string) {
    return createHmac('sha256', this.secret).update(`${purpose}:${email}:${code}`).digest('hex');
  }

  private matches(storedHex: string, candidateHex: string) {
    const a = Buffer.from(storedHex, 'hex');
    const b = Buffer.from(candidateHex, 'hex');
    return a.length === b.length && timingSafeEqual(a, b);
  }
}

function invalidOtp() {
  return new BadRequestException({ code: ErrorCode.AUTH_OTP_INVALID, message: 'Mã xác minh không đúng' });
}

function tooManyAttempts() {
  return new BadRequestException({
    code: ErrorCode.AUTH_OTP_TOO_MANY_ATTEMPTS,
    message: 'Nhập sai quá nhiều lần, vui lòng gửi lại mã mới',
  });
}
