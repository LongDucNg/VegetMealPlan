import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Matches } from 'class-validator';

export class VerifyEmailDto {
  @ApiProperty({ example: 'nguyenvana@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456', description: 'Mã 6 số nhận qua email sau khi đăng ký' })
  @Matches(/^\d{6}$/, { message: 'code phải gồm đúng 6 chữ số' })
  code: string;
}

export class ResendVerificationDto {
  @ApiProperty({ example: 'nguyenvana@example.com' })
  @IsEmail()
  email: string;
}
