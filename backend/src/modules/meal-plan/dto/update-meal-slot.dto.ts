import {
  IsInt,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateMealSlotDto {
  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @IsInt({ message: 'ID công thức phải là số nguyên.' })
  @Min(1, { message: 'ID công thức phải là số nguyên dương.' })
  recipe_id?: number;

  @ApiPropertyOptional({ example: 1.5 })
  @IsOptional()
  @IsNumber({}, { message: 'Tỷ lệ khẩu phần phải là số hợp lệ.' })
  @Min(0.1, { message: 'Tỷ lệ khẩu phần phải lớn hơn 0.' })
  portion_multiplier?: number;
}
