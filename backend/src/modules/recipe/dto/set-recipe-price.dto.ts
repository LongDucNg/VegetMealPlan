import {
  IsNumber,
  Min,
  ValidateIf,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class SetRecipePriceDto {
  @ValidateIf((o) => o.actual_price !== null && o.actual_price !== undefined)
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
  @IsNumber({ allowNaN: false, allowInfinity: false }, {
    message: 'Giá thực tế phải là số hợp lệ.',
  })
  @Min(0, {
    message: 'Giá thực tế không được âm.',
  })
  actual_price: number;
}