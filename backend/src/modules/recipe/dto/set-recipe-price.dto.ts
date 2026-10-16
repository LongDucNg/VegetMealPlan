import {
  IsNumber,
  Min,
} from 'class-validator';

export class SetRecipePriceDto {
  @IsNumber()
  @Min(0)
  actual_price: number;
}