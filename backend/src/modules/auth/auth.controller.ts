import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from '../../common/decorators/public.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UsersService } from '../users/users.service';
import { ALLERGEN_GROUPS } from '../users/allergen-groups';
import { DietType } from '../users/entities/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Đăng ký tài khoản (có thể kèm hồ sơ và dị ứng)' })
  @ApiResponse({ status: 409, description: 'AUTH_EMAIL_TAKEN: email đã được đăng ký' })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Đăng nhập, trả về access_token' })
  @ApiResponse({ status: 401, description: 'AUTH_INVALID_CREDENTIALS hoặc AUTH_ACCOUNT_LOCKED' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
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
