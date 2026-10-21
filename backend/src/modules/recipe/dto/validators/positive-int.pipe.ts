import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';

/**
 * Validate param là số nguyên dương (>= 1).
 */
export class PositiveIntPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): number {
    const n = Number(value);
    if (!Number.isInteger(n) || n <= 0) {
      throw new BadRequestException('ID công thức phải là số nguyên dương');
    }
    return n;
  }
}
