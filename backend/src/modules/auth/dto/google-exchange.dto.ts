import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class GoogleExchangeDto {
  @ApiProperty({ description: 'Mã `code` trên URL mà backend redirect về FE sau khi đăng nhập Google' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  code: string;
}
