import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class SetPriceDto {
  @IsNotEmpty({ message: 'Giá nguyên liệu không được để trống.' })
  @Type(() => Number)
  @IsNumber({}, { message: 'Giá nguyên liệu phải là số hợp lệ.' })
  @IsPositive({ message: 'Giá nguyên liệu phải lớn hơn 0.' })
  price_per_unit: number;
}
