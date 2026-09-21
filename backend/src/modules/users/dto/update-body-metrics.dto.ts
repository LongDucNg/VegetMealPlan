import { IsNumber, IsPositive } from 'class-validator';

export class UpdateBodyMetricsDto {
  @IsNumber()
  @IsPositive({ message: 'height_cm phải lớn hơn 0' })
  height_cm: number;

  @IsNumber()
  @IsPositive({ message: 'weight_kg phải lớn hơn 0' })
  weight_kg: number;
}
