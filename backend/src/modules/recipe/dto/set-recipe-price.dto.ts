import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class SetRecipePriceDto {
  @ApiProperty({
    example: 45000,
    description: 'Giá tiền thực tế người dùng đã chi trả để chuẩn bị/nấu món ăn này',
  })
  @IsNotEmpty({
    message: 'Giá thực tế không được để trống.',
  })
  @Type(() => Number)
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'Giá thực tế phải là số hợp lệ.' },
  )
  @IsPositive({
    message: 'Giá thực tế của món ăn phải lớn hơn 0.',
  })
  actual_price: number;
}