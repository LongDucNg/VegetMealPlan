import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User, UserStatus } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ErrorCode } from '../../common/constants/error-codes.enum';
import { GoogleProfile } from './strategies/google.strategy';
import { GoogleLoginCodeStore } from './google-login-code.store';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly googleCodes: GoogleLoginCodeStore,
  ) {}

  async register(dto: RegisterDto) {
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

    return this.buildToken(user);
  }

  async login(dto: LoginDto) {
    const user = await this.userRepo.findOne({ where: { email: dto.email } });
    // Cố ý dùng chung một mã/câu cho "email không tồn tại" và "sai mật khẩu" để kẻ tấn công không dò được email nào đã đăng ký.
    const invalid = { code: ErrorCode.AUTH_INVALID_CREDENTIALS, message: 'Sai email hoặc mật khẩu' };
    // Tài khoản chỉ đăng nhập bằng Google (chưa có mật khẩu) cũng trả "sai thông tin",
    // để không lộ ra rằng email này đang dùng Google.
    if (!user || !user.password_hash) throw new UnauthorizedException(invalid);

    const isMatch = await bcrypt.compare(dto.password, user.password_hash);
    if (!isMatch) throw new UnauthorizedException(invalid);

    if (user.status === UserStatus.LOCKED) {
      throw new UnauthorizedException({ code: ErrorCode.AUTH_ACCOUNT_LOCKED, message: 'Tài khoản đã bị khóa' });
    }

    return this.buildToken(user);
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
  async exchangeGoogleCode(code: string) {
    const pending = this.googleCodes.consume(code);
    const invalid = { code: ErrorCode.AUTH_GOOGLE_CODE_INVALID, message: 'Phiên đăng nhập Google không hợp lệ hoặc đã hết hạn, vui lòng thử lại' };
    if (!pending) throw new UnauthorizedException(invalid);

    const user = await this.userRepo.findOne({ where: { user_id: pending.userId } });
    if (!user) throw new UnauthorizedException(invalid);
    if (user.status === UserStatus.LOCKED) {
      throw new UnauthorizedException({ code: ErrorCode.AUTH_ACCOUNT_LOCKED, message: 'Tài khoản đã bị khóa' });
    }

    return { ...this.buildToken(user), is_new_user: pending.isNewUser };
  }

  private buildToken(user: User) {
    const payload = { sub: user.user_id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        user_id: user.user_id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
    };
  }
}
