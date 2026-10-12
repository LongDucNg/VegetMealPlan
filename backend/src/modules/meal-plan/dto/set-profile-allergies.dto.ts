import { ApiProperty } from '@nestjs/swagger';
import { ArrayUnique, IsArray, IsInt, Min } from 'class-validator';

export class SetProfileAllergiesDto {
  @ApiProperty({
    example: [49, 50],
    description:
      'Danh sách ingredient_id gây dị ứng; mảng rỗng = xoá hết dị ứng của hồ sơ',
  })
  @IsArray()
  @ArrayUnique()
  @IsInt({ each: true })
  @Min(1, { each: true })
  ingredient_ids: number[];
}
