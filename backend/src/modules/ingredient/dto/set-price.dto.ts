import { createParamDecorator, ExecutionContext, PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class ValidatePricePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): any {
    const price = value?.price_per_unit;

    // Null/undefined
    if (price === null || price === undefined) {
      throw new BadRequestException('price_per_unit phải lớn hơn 0');
    }

    // String
    if (typeof price === 'string') {
      const trimmed = price.trim();
      // Empty string hoặc chỉ có khoảng trắng
      if (trimmed === '') {
        throw new BadRequestException(
          'Vui lòng nhập giá bằng số, không được để trống hoặc chỉ nhập khoảng trắng',
        );
      }
      // Chuỗi toàn số 0 với độ dài bất kỳ: "0", "00", "0000", "000000000000"
      if (/^0+$/.test(trimmed) || /^0+\.0*$/.test(trimmed)) {
        throw new BadRequestException('price_per_unit phải lớn hơn 0');
      }
      // Invalid format: không phải số hợp lệ (chứa chữ, ký tự đặc biệt)
      if (!/^-?\d+(\.\d+)?$/.test(trimmed)) {
        throw new BadRequestException('price_per_unit chỉ được chứa số');
      }
      const num = Number(trimmed);
      // Kiểm tra NaN hoặc Infinity
      if (isNaN(num) || !isFinite(num)) {
        throw new BadRequestException('price_per_unit chỉ được chứa số');
      }
      // Kiểm tra số dương
      if (num <= 0) {
        throw new BadRequestException('price_per_unit phải lớn hơn 0');
      }
      // Gán giá trị đã parse
      value.price_per_unit = num;
    }

    // Number (từ JSON hợp lệ)
    if (typeof price === 'number') {
      // Kiểm tra NaN hoặc Infinity
      if (isNaN(price) || !isFinite(price)) {
        throw new BadRequestException('price_per_unit chỉ được chứa số');
      }
      if (price <= 0) {
        throw new BadRequestException('price_per_unit phải lớn hơn 0');
      }
    }

    return value;
  }
}

export const SafePrice = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): number | null => {
    const body = ctx.switchToHttp().getRequest().body;
    const value = body?.price_per_unit;

    if (value === null || value === undefined || value === '') {
      return null;
    }

    if (typeof value === 'string') {
      const trimmed = value.trim();
      if (trimmed === '') return null;
      if (!/^-?\d+(\.\d+)?$/.test(trimmed)) return null;
      const num = Number(trimmed);
      if (isNaN(num)) return null;
      return num;
    }

    if (typeof value === 'number') return value;

    return null;
  },
);

export class SetPriceDto {
  price_per_unit: number;
}
