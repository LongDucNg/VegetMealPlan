import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

/**
 * Chỉ cho phép chữ cái (Unicode letters) và khoảng trắng.
 * \p{L} = tất cả chữ cái mọi ngôn ngữ (tiếng Việt, Anh, v.v.)
 * \p{M} = combining marks (dấu kết hợp tiếng Việt)
 */
@ValidatorConstraint({ async: false })
export class IsVietnameseNameConstraint implements ValidatorConstraintInterface {
  private readonly pattern = /^[\p{L}\p{M} &,\/.'\-()]+$/u;

  validate(value: unknown): boolean {
    if (typeof value !== 'string') return false;
    return this.pattern.test(value.trim());
  }

  defaultMessage(): string {
    return 'Tên danh mục chỉ được chứa chữ cái, khoảng trắng và dấu phân cách (&, /, -, ., \', (), )';
  }
}

export function IsVietnameseName(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: IsVietnameseNameConstraint,
    });
  };
}
