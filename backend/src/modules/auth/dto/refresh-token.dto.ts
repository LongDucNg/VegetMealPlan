import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({ description: 'refresh_token nhận được khi đăng nhập / đăng ký / refresh lần trước' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  refresh_token: string;
}
