import { ApiProperty } from '@nestjs/swagger';
import { ArrayUnique, IsArray, IsInt, Min } from 'class-validator';

export class SetProfileAllergiesDto {
  @ApiProperty({
    example: [49, 50],
    description:
      'Danh sách ingredient_id gây dị ứng; mảng rỗng = xoá hết dị ứng của hồ sơ',
  })
  @IsArray({ message: 'Danh sách dị ứng phải là một mảng.' })
  @ArrayUnique({ message: 'Danh sách dị ứng không được chứa giá trị trùng lặp.' })
  @IsInt({ each: true, message: 'Mỗi ID nguyên liệu phải là số nguyên.' })
  @Min(1, { each: true, message: 'Mỗi ID nguyên liệu phải là số nguyên dương.' })
  ingredient_ids: number[];
}
