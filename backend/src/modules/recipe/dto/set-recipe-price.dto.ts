import {
  IsNotEmpty,
  IsNumber,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class SetRecipePriceDto {
  // Không dùng @ValidateIf ở đây: ValidateIf cho phép body rỗng/null đi qua
  // validation, rồi actual_price = undefined đẩy xuống cột NOT NULL -> lỗi 500.
  // Bắt buộc phải là số >= 0.
  @ApiProperty({
    example: 45000,
    description: 'Giá tiền thực tế người dùng đã chi trả để chuẩn bị/nấu món ăn này',
  })
  @IsNotEmpty({
    message: 'Giá thực tế không được để trống.',
  })
  @Transform(({ value }) => {
    if (value === null || value === undefined || value === '') {
      return null;
    }
    const num = Number(value);
    if (isNaN(num) || !isFinite(num)) {
      return null;
    }
    return num;
  })
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'Giá thực tế phải là số hợp lệ.' },
  )
  @Min(0, {
    message: 'Giá thực tế không được âm.',
  })
  actual_price: number;
}
