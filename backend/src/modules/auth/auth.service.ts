import { BadRequestException, ConflictException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User, UserStatus } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ErrorCode } from '../../common/constants/error-codes.enum';
import { GoogleProfile } from './strategies/google.strategy';
import { GoogleLoginCodeStore } from './google-login-code.store';
import { SessionMeta, SessionService } from './session.service';
import { JwtPayload } from './strategies/jwt.strategy';
import { UserSession } from './entities/user-session.entity';
import { EmailOtpPurpose } from './entities/email-otp.entity';
import { EmailOtpService, OTP_RESEND_AFTER_SECONDS, OTP_TTL_SECONDS } from './email-otp.service';
import { IpRateLimiter } from './ip-rate-limiter';
import { MailService } from '../mail/mail.service';
import { ChangePasswordDto, ResetPasswordDto } from './dto/password.dto';

// Hash giả để email không tồn tại cũng tốn thời gian bcrypt như email có thật (chống dò email qua thời gian phản hồi).
const DUMMY_PASSWORD_HASH = bcrypt.hashSync('vegetmealplan-timing-equaliser', 10);

const FORGOT_PER_IP_LIMIT = 10;
const FORGOT_PER_IP_WINDOW_MS = 15 * 60 * 1000;

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly googleCodes: GoogleLoginCodeStore,
    private readonly sessionService: SessionService,
    private readonly otpService: EmailOtpService,
    private readonly mailService: MailService,
    private readonly ipLimiter: IpRateLimiter,
  ) {}

  async register(dto: RegisterDto, meta: SessionMeta = {}) {
    const existing = await this.userRepo.findOne({ where: { email: dto.email } });
    if (existing) throw new ConflictException({ code: ErrorCode.AUTH_EMAIL_TAKEN, message: 'Email đã được đăng ký' });

    const password_hash = await bcrypt.hash(dto.password, 10);
    const user = await this.userRepo.save(
      this.userRepo.create({
        full_name: dto.full_name,
        email: dto.email,
        password_hash,
        status: UserStatus.ACTIVE,
      }),
    );

    // Hồ sơ + dị ứng đi kèm (tuỳ chọn). Nếu dữ liệu hồ sơ sai thì xoá user vừa tạo để không để lại tài khoản dở.
    try {
      const { full_name, email, password, allergen_groups, allergy_ingredient_ids, ...profile } = dto;
      if (Object.values(profile).some((v) => v !== undefined)) {
        await this.usersService.updateProfile(user.user_id, profile);
      }
      if (allergen_groups?.length || allergy_ingredient_ids?.length) {
        await this.usersService.setAllergies(user.user_id, {
          allergen_groups,
          ingredient_ids: allergy_ingredient_ids,
        });
      }
    } catch (err) {
      await this.userRepo.delete(user.user_id);
      throw err;
    }

    return this.issueTokens(user, meta);
  }

  async login(dto: LoginDto, meta: SessionMeta = {}) {
    const user = await this.userRepo.findOne({ where: { email: dto.email } });
    // Cố ý dùng chung một mã/câu cho "email không tồn tại" và "sai mật khẩu" để kẻ tấn công không dò được email nào đã đăng ký.
    const invalid = { code: ErrorCode.AUTH_INVALID_CREDENTIALS, message: 'Sai email hoặc mật khẩu' };
    // Tài khoản chỉ đăng nhập bằng Google (chưa có mật khẩu) cũng trả "sai thông tin",
    // để không lộ ra rằng email này đang dùng Google.
    // Luôn chạy bcrypt (với hash giả nếu không có user) để thời gian phản hồi như nhau.
    const isMatch = await bcrypt.compare(dto.password, user?.password_hash ?? DUMMY_PASSWORD_HASH);
    if (!user || !user.password_hash || !isMatch) throw new UnauthorizedException(invalid);

    // Kiểm tra khoá SAU khi đúng mật khẩu: người không biết mật khẩu không dò được tài khoản nào đang bị khoá.

    if (user.status === UserStatus.LOCKED) {
      throw new UnauthorizedException({ code: ErrorCode.AUTH_ACCOUNT_LOCKED, message: 'Tài khoản đã bị khóa' });
    }

    return this.issueTokens(user, meta);
  }

  /**
   * Gọi từ GET /auth/google/callback sau khi Google xác thực xong. Ba trường hợp:
   * 1. google_id đã gắn với một user: đăng nhập luôn.
   * 2. Chưa gắn nhưng email trùng tài khoản email/mật khẩu có sẵn: gắn google_id vào tài khoản đó
   *    (Google đã xác minh email nên coi là cùng chủ), giữ nguyên mật khẩu cũ.
   * 3. Email mới hoàn toàn: tạo user không có mật khẩu, hồ sơ trống (FE dẫn sang trang điền hồ sơ).
   * Trả về mã dùng một lần để FE đổi lấy access_token (xem GoogleLoginCodeStore).
   */
  async loginWithGoogle(profile: GoogleProfile): Promise<string> {
    let user = await this.userRepo.findOne({ where: { google_id: profile.googleId } });
    let isNewUser = false;

    if (!user) {
      // So khớp email không phân biệt hoa thường; không dùng ILike vì "_" và "%" trong email là ký tự đại diện.
      user = await this.userRepo
        .createQueryBuilder('user')
        .where('LOWER(user.email) = :email', { email: profile.email })
        .getOne();

      if (user) {
        user.google_id = profile.googleId;
        user = await this.userRepo.save(user);
      } else {
        user = await this.userRepo.save(
          this.userRepo.create({
            full_name: profile.fullName,
            email: profile.email,
            password_hash: null,
            google_id: profile.googleId,
            status: UserStatus.ACTIVE,
          }),
        );
        isNewUser = true;
      }
    }

    if (user.status === UserStatus.LOCKED) {
      throw new UnauthorizedException({ code: ErrorCode.AUTH_ACCOUNT_LOCKED, message: 'Tài khoản đã bị khóa' });
    }

    return this.googleCodes.issue(user.user_id, isNewUser);
  }

  /** POST /auth/google/exchange: đổi mã dùng một lần lấy access_token, cùng định dạng với /auth/login. */
  async exchangeGoogleCode(code: string, meta: SessionMeta = {}) {
    const pending = this.googleCodes.consume(code);
    const invalid = { code: ErrorCode.AUTH_GOOGLE_CODE_INVALID, message: 'Phiên đăng nhập Google không hợp lệ hoặc đã hết hạn, vui lòng thử lại' };
    if (!pending) throw new UnauthorizedException(invalid);

    const user = await this.userRepo.findOne({ where: { user_id: pending.userId } });
    if (!user) throw new UnauthorizedException(invalid);
    if (user.status === UserStatus.LOCKED) {
      throw new UnauthorizedException({ code: ErrorCode.AUTH_ACCOUNT_LOCKED, message: 'Tài khoản đã bị khóa' });
    }

    return { ...(await this.issueTokens(user, meta)), is_new_user: pending.isNewUser };
  }

  /**
   * POST /auth/refresh: đổi refresh token lấy cặp token mới. Refresh token cũ hết hiệu lực ngay
   * (xoay vòng); gửi lại token cũ sau 30 giây bị coi là đánh cắp và cả phiên bị thu hồi.
   */
  async refresh(refreshToken: string) {
    const { session, refreshToken: nextRefresh } = await this.sessionService.rotate(refreshToken);
    return this.buildTokenResponse(session.user, session.session_id, nextRefresh);
  }

  /** POST /auth/logout: thu hồi phiên của token đang dùng (chỉ thiết bị này). */
  async logout(user_id: number, session_id: string) {
    await this.sessionService.revoke(session_id, user_id);
    return { message: 'Đăng xuất thành công' };
  }

  /** POST /auth/logout-all: thu hồi mọi phiên của user (đăng xuất mọi thiết bị). */
  async logoutAll(user_id: number) {
    const revoked = await this.sessionService.revokeAll(user_id);
    return { message: 'Đã đăng xuất khỏi mọi thiết bị', revoked_sessions: revoked };
  }

  // ---- Quên mật khẩu / đổi mật khẩu ----

  /**
   * POST /auth/forgot-password: gửi OTP 6 số tới email.
   * Luôn trả cùng một câu dù email có tồn tại hay không, bị khoá hay đang trong 60 giây chờ,
   * để người ngoài không dò được email nào đã đăng ký. Mail gửi ở nền (không await) để thời gian
   * phản hồi cũng không khác nhau giữa email có và không có tài khoản.
   * Chỉ chặn công khai khi một IP gọi quá 10 lần / 15 phút (không lộ gì về email).
   */
  async forgotPassword(rawEmail: string, ip: string | null) {
    this.ipLimiter.hit(`forgot:${ip ?? 'unknown'}`, FORGOT_PER_IP_LIMIT, FORGOT_PER_IP_WINDOW_MS);

    const email = normalizeEmail(rawEmail);
    const user = await this.findByEmail(email);

    if (user && user.status !== UserStatus.LOCKED) {
      try {
        const code = await this.otpService.issue(email, EmailOtpPurpose.RESET_PASSWORD);
        this.mailService
          .sendResetPasswordOtp(user.email, code, OTP_TTL_SECONDS / 60)
          .catch((err) => this.logger.error(`Gửi OTP quên mật khẩu tới ${user.email} thất bại: ${err?.message ?? err}`));
      } catch (err) {
        // Đang trong 60 giây chờ: nuốt lỗi, trả như bình thường. Lỗi khác (DB...) vẫn ném ra.
        const code = (err as { response?: { code?: string } })?.response?.code;
        if (code !== ErrorCode.AUTH_OTP_RATE_LIMITED) throw err;
      }
    }

    return {
      message: 'Nếu email đã đăng ký, mã xác minh 6 số sẽ được gửi tới hộp thư trong ít phút',
      expires_in_seconds: OTP_TTL_SECONDS,
      resend_after_seconds: OTP_RESEND_AFTER_SECONDS,
    };
  }

  /**
   * POST /auth/reset-password: kiểm tra OTP rồi đặt mật khẩu mới.
   * Đổi mật khẩu và thu hồi mọi phiên chạy chung một transaction: kẻ đã chiếm tài khoản bị đá ra ngay.
   * Tài khoản chỉ đăng nhập Google (chưa có mật khẩu) đi qua đây sẽ có thêm mật khẩu; chấp nhận được
   * vì người làm đã chứng minh sở hữu email, giống cách Google đã xác minh email đó.
   */
  async resetPassword(dto: ResetPasswordDto) {
    const email = normalizeEmail(dto.email);
    await this.otpService.consume(email, EmailOtpPurpose.RESET_PASSWORD, dto.code);

    const user = await this.findByEmail(email);
    if (!user) throw new BadRequestException({ code: ErrorCode.AUTH_OTP_INVALID, message: 'Mã xác minh không đúng' });

    const password_hash = await bcrypt.hash(dto.new_password, 10);
    await this.userRepo.manager.transaction(async (manager) => {
      await manager.update(User, { user_id: user.user_id }, { password_hash });
      await manager.update(UserSession, { user_id: user.user_id, revoked_at: IsNull() }, { revoked_at: new Date() });
    });

    this.notifyPasswordChanged(user.email);
    return { message: 'Đặt lại mật khẩu thành công, vui lòng đăng nhập lại' };
  }

  /** PUT /auth/change-password: đổi mật khẩu khi đang đăng nhập, giữ phiên hiện tại, đăng xuất các thiết bị khác. */
  async changePassword(user_id: number, session_id: string, dto: ChangePasswordDto) {
    const user = await this.userRepo.findOne({ where: { user_id } });
    if (!user) throw new UnauthorizedException({ code: ErrorCode.AUTH_UNAUTHORIZED, message: 'Phiên đăng nhập đã kết thúc' });
    if (!user.password_hash) {
      throw new BadRequestException({
        code: ErrorCode.AUTH_PASSWORD_NOT_SET,
        message: 'Tài khoản đăng nhập bằng Google chưa có mật khẩu. Dùng "Quên mật khẩu" để tạo mật khẩu',
      });
    }
    if (!(await bcrypt.compare(dto.current_password, user.password_hash))) {
      throw new BadRequestException({ code: ErrorCode.AUTH_WRONG_PASSWORD, message: 'Mật khẩu hiện tại không đúng' });
    }
    if (dto.current_password === dto.new_password) {
      throw new BadRequestException({ code: ErrorCode.AUTH_PASSWORD_UNCHANGED, message: 'Mật khẩu mới phải khác mật khẩu hiện tại' });
    }

    await this.userRepo.update({ user_id }, { password_hash: await bcrypt.hash(dto.new_password, 10) });
    const revoked = await this.sessionService.revokeOthers(user_id, session_id);

    this.notifyPasswordChanged(user.email);
    return { message: 'Đổi mật khẩu thành công', revoked_sessions: revoked };
  }

  /** Mail cảnh báo gửi ở nền: gửi lỗi chỉ ghi log, không làm hỏng việc đổi mật khẩu đã xong. */
  private notifyPasswordChanged(email: string) {
    this.mailService
      .sendPasswordChanged(email)
      .catch((err) => this.logger.error(`Gửi mail báo đổi mật khẩu tới ${email} thất bại: ${err?.message ?? err}`));
  }

  /** Tìm user theo email không phân biệt hoa thường (không dùng ILike vì "_" và "%" là ký tự đại diện). */
  private findByEmail(email: string) {
    return this.userRepo.createQueryBuilder('user').where('LOWER(user.email) = :email', { email }).getOne();
  }

  /** Mở phiên mới rồi trả access_token (JWT có sid) + refresh_token. Dùng cho đăng ký, đăng nhập, Google. */
  private async issueTokens(user: User, meta: SessionMeta) {
    const { session, refreshToken } = await this.sessionService.create(user.user_id, meta);
    return this.buildTokenResponse(user, session.session_id, refreshToken);
  }

  private buildTokenResponse(user: User, session_id: string, refreshToken: string) {
    const payload: JwtPayload = { sub: user.user_id, email: user.email, role: user.role, sid: session_id };
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: refreshToken,
      user: {
        user_id: user.user_id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
    };
  }
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}
