import { Body, Controller, Get, HttpCode, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBearerAuth, ApiExcludeEndpoint, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from '../../common/decorators/public.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UsersService } from '../users/users.service';
import { ALLERGEN_GROUPS } from '../users/allergen-groups';
import { DietType } from '../users/entities/user.entity';
import { GoogleExchangeDto } from './dto/google-exchange.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ChangePasswordDto, ForgotPasswordDto, ResetPasswordDto } from './dto/password.dto';
import { SessionMeta } from './session.service';
import { GoogleAuthCallbackGuard, GoogleAuthGuard, GoogleConfiguredGuard } from './guards/google.guards';
import { GoogleProfile } from './strategies/google.strategy';
import { ErrorCode } from '../../common/constants/error-codes.enum';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly config: ConfigService,
  ) {}

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Đăng ký tài khoản (có thể kèm hồ sơ và dị ứng)' })
  @ApiResponse({ status: 409, description: 'AUTH_EMAIL_TAKEN: email đã được đăng ký' })
  register(@Body() dto: RegisterDto, @Req() req: Request) {
    return this.authService.register(dto, sessionMeta(req));
  }

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Đăng nhập, trả về access_token và refresh_token' })
  @ApiResponse({ status: 401, description: 'AUTH_INVALID_CREDENTIALS hoặc AUTH_ACCOUNT_LOCKED' })
  login(@Body() dto: LoginDto, @Req() req: Request) {
    return this.authService.login(dto, sessionMeta(req));
  }

  // ---- Phiên đăng nhập: refresh token và đăng xuất ----

  @Public()
  @Post('refresh')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Đổi refresh_token lấy access_token mới',
    description: 'Mỗi lần gọi trả về refresh_token MỚI, cái cũ hết hiệu lực ngay (xoay vòng). FE phải lưu lại refresh_token mới.',
  })
  @ApiResponse({ status: 401, description: 'AUTH_REFRESH_TOKEN_INVALID hoặc AUTH_ACCOUNT_LOCKED: phải đăng nhập lại' })
  refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refresh(dto.refresh_token);
  }

  @ApiBearerAuth()
  @Post('logout')
  @HttpCode(200)
  @ApiOperation({ summary: 'Đăng xuất thiết bị hiện tại (thu hồi phiên của access_token đang gửi)' })
  logout(@CurrentUser('user_id') userId: number, @CurrentUser('sid') sid: string) {
    return this.authService.logout(userId, sid);
  }

  @ApiBearerAuth()
  @Post('logout-all')
  @HttpCode(200)
  @ApiOperation({ summary: 'Đăng xuất khỏi mọi thiết bị (thu hồi mọi phiên của tài khoản)' })
  logoutAll(@CurrentUser('user_id') userId: number) {
    return this.authService.logoutAll(userId);
  }

  // ---- Quên mật khẩu (OTP qua email) và đổi mật khẩu ----

  @Public()
  @Post('forgot-password')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Bước 1 quên mật khẩu: gửi mã OTP 6 số tới email',
    description:
      'Luôn trả cùng một câu dù email có tồn tại hay không (chống dò email). Mã hiệu lực 10 phút, ' +
      'gửi lại phải cách 60 giây. FE gọi xong thì chuyển sang màn nhập mã; nút "Gửi lại mã" gọi lại API này.',
  })
  @ApiResponse({ status: 429, description: 'AUTH_OTP_RATE_LIMITED: một IP gọi quá 10 lần trong 15 phút' })
  forgotPassword(@Body() dto: ForgotPasswordDto, @Req() req: Request) {
    return this.authService.forgotPassword(dto.email, req.ip ?? null);
  }

  @Public()
  @Post('reset-password')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Bước 2 quên mật khẩu: nhập mã OTP và mật khẩu mới',
    description: 'Thành công thì mọi thiết bị đang đăng nhập bị đăng xuất; FE chuyển về trang đăng nhập.',
  })
  @ApiResponse({ status: 400, description: 'AUTH_OTP_INVALID, AUTH_OTP_EXPIRED, AUTH_OTP_TOO_MANY_ATTEMPTS hoặc VALIDATION_FAILED' })
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }

  @ApiBearerAuth()
  @Put('change-password')
  @ApiOperation({
    summary: 'Đổi mật khẩu khi đang đăng nhập',
    description: 'Giữ phiên hiện tại, đăng xuất mọi thiết bị khác. Gửi mail báo đã đổi mật khẩu.',
  })
  @ApiResponse({ status: 400, description: 'AUTH_WRONG_PASSWORD, AUTH_PASSWORD_NOT_SET (tài khoản Google), AUTH_PASSWORD_UNCHANGED' })
  changePassword(
    @CurrentUser('user_id') userId: number,
    @CurrentUser('sid') sid: string,
    @Body() dto: ChangePasswordDto,
  ) {
    return this.authService.changePassword(userId, sid, dto);
  }

  // ---- Đăng nhập Google (OAuth2 redirect phía server) ----
  // FE không gọi bằng fetch mà điều hướng cả trang: window.location.href = `${API}/auth/google`.

  @Public()
  @Get('google')
  @UseGuards(GoogleConfiguredGuard, GoogleAuthGuard)
  @ApiOperation({
    summary: 'Bắt đầu đăng nhập Google (mở bằng trình duyệt, không gọi bằng fetch)',
    description: 'Chuyển hướng sang trang đồng ý của Google. Xong thì Google gọi lại /auth/google/callback.',
  })
  @ApiResponse({ status: 503, description: 'AUTH_GOOGLE_NOT_CONFIGURED: server chưa cấu hình Google' })
  googleLogin() {
    // GoogleAuthGuard đã chuyển hướng sang Google, hàm này không chạy tới.
  }

  @Public()
  @Get('google/callback')
  @UseGuards(GoogleConfiguredGuard, GoogleAuthCallbackGuard)
  @ApiExcludeEndpoint()
  async googleCallback(@Req() req: Request, @Res() res: Response) {
    const frontend = this.config.get<string>('FRONTEND_URL') || 'http://localhost:3001';
    const profile = req.user as GoogleProfile | null;

    if (!profile) return res.redirect(`${frontend}/login?error=google_failed`);

    try {
      const code = await this.authService.loginWithGoogle(profile);
      // Chỉ gắn mã dùng một lần trên URL, không gắn JWT.
      return res.redirect(`${frontend}/auth/google/callback?code=${encodeURIComponent(code)}`);
    } catch (err) {
      const locked = (err as { response?: { code?: string } })?.response?.code === ErrorCode.AUTH_ACCOUNT_LOCKED;
      return res.redirect(`${frontend}/login?error=${locked ? 'account_locked' : 'google_failed'}`);
    }
  }

  @Public()
  @Post('google/exchange')
  @ApiOperation({ summary: 'Đổi mã sau khi đăng nhập Google lấy access_token (cùng định dạng với /auth/login)' })
  @ApiResponse({ status: 401, description: 'AUTH_GOOGLE_CODE_INVALID hoặc AUTH_ACCOUNT_LOCKED' })
  googleExchange(@Body() dto: GoogleExchangeDto, @Req() req: Request) {
    return this.authService.exchangeGoogleCode(dto.code, sessionMeta(req));
  }

  @ApiBearerAuth()
  @Get('me')
  @ApiOperation({ summary: 'Lấy thông tin tài khoản đang đăng nhập' })
  me(@CurrentUser('user_id') userId: number) {
    return this.usersService.getProfile(userId);
  }

  // Dropdown cho form đăng ký (chưa đăng nhập nên để public).
  @Public()
  @Get('diet-options')
  @ApiOperation({ summary: 'Danh sách chế độ ăn chay cho form đăng ký' })
  dietOptions() {
    return [
      { value: DietType.VEGAN, label: 'Thuần chay (Vegan)', description: 'Không dùng sản phẩm từ động vật, kể cả trứng và sữa' },
      { value: DietType.LACTO, label: 'Chay có sữa (Lacto)', description: 'Dùng sữa, không dùng trứng' },
      { value: DietType.OVO, label: 'Chay có trứng (Ovo)', description: 'Dùng trứng, không dùng sữa' },
      { value: DietType.OVO_LACTO, label: 'Chay có trứng và sữa (Ovo-lacto)', description: 'Dùng cả trứng và sữa' },
    ];
  }

  @Public()
  @Get('allergen-groups')
  @ApiOperation({ summary: 'Danh sách nhóm dị ứng (đậu nành, hạt cây, gluten...) cho form đăng ký' })
  allergenGroups() {
    return ALLERGEN_GROUPS.map(({ code, name, examples }) => ({ code, name, examples }));
  }
}

/** Thông tin thiết bị gắn vào phiên đăng nhập (để sau này hiện danh sách thiết bị đang đăng nhập). */
function sessionMeta(req: Request): SessionMeta {
  return { userAgent: req.headers['user-agent'] ?? null, ip: req.ip ?? null };
}
