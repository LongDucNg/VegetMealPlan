import { registerDecorator, ValidationOptions } from 'class-validator';

/**
 * Kiểm tra chuỗi không chỉ chứa khoảng trắng (trim trước khi đếm).
 */
export function IsNotBlank(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any): boolean {
          return typeof value === 'string' && value.trim().length > 0;
        },
        defaultMessage() {
          return 'Tên danh mục không được để trống';
        },
      },
    });
  };
}
