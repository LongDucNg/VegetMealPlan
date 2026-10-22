import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

// Cùng quy tắc với RegisterDto (tối thiểu 8 ký tự) để mật khẩu đặt lại không bị chặt/lỏng hơn lúc đăng ký.
// MaxLength 72: bcrypt chỉ dùng 72 byte đầu, dài hơn cũng vô nghĩa.

export class ForgotPasswordDto {
  @ApiProperty({ example: 'nguyenvana@example.com' })
  @IsEmail()
  email: string;
}

export class ResetPasswordDto {
  @ApiProperty({ example: 'nguyenvana@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456', description: 'Mã 6 số nhận qua email' })
  @Matches(/^\d{6}$/, { message: 'code phải gồm đúng 6 chữ số' })
  code: string;

  @ApiProperty({ example: 'matkhaumoi123', minLength: 8 })
  @IsString()
  @MinLength(8, { message: 'new_password phải từ 8 ký tự trở lên' })
  @MaxLength(72)
  new_password: string;
}

export class ChangePasswordDto {
  @ApiProperty({ example: 'matkhau123' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(72)
  current_password: string;

  @ApiProperty({ example: 'matkhaumoi123', minLength: 8 })
  @IsString()
  @MinLength(8, { message: 'new_password phải từ 8 ký tự trở lên' })
  @MaxLength(72)
  new_password: string;
}
