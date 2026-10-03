import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'nguyenvana@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'matkhau123' })
  @IsNotEmpty()
  password: string;
}
