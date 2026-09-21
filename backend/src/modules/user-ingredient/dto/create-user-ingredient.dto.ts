import { IsDateString, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { IngredientSource } from '../entities/user-ingredient.entity';

export class CreateUserIngredientDto {
  @IsNumber()
  ingredient_id: number;

  @IsOptional()
  @IsNumber()
  quantity?: number;

  @IsOptional()
  @IsString()
  unit?: string;

  @IsOptional()
  @IsDateString()
  expiry_date?: string;

  @IsOptional()
  @IsString()
  freshness_status?: string;

  @IsOptional()
  @IsEnum(IngredientSource)
  source?: IngredientSource;
}
