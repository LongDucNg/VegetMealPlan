import {
  IsNumber,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class SetRecipePriceDto {
  // Không dùng @ValidateIf ở đây: ValidateIf cho phép body rỗng/null đi qua
  // validation, rồi actual_price = undefined đẩy xuống cột NOT NULL -> lỗi 500.
  // Bắt buộc phải là số >= 0.
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