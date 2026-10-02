import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User, UserStatus } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.userRepo.findOne({ where: { email: dto.email } });
    if (existing) throw new ConflictException('Email đã được đăng ký');

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
    if (!user) throw new UnauthorizedException('Sai email hoặc mật khẩu');

    const isMatch = await bcrypt.compare(dto.password, user.password_hash);
    if (!isMatch) throw new UnauthorizedException('Sai email hoặc mật khẩu');

    if (user.status === UserStatus.LOCKED) {
      throw new UnauthorizedException('Tài khoản đã bị khóa');
    }

    return this.buildToken(user);
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
