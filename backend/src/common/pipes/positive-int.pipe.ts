import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

/**
 * Validate param/query là số nguyên dương (>= 1).
 * Thay thế ParseIntPipe khi cần đảm bảo ID không phải số âm, số 0 hoặc số thập phân.
 */
@Injectable()
export class PositiveIntPipe implements PipeTransform<string | number, number> {
  transform(value: string | number, metadata: ArgumentMetadata): number {
    const paramName = metadata.data ? `"${metadata.data}"` : 'ID';
    const n = Number(value);

    if (!Number.isInteger(n) || n <= 0) {
      throw new BadRequestException(`${paramName} không hợp lệ. Phải là số nguyên dương.`);
    }

    return n;
  }
}
