import {
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

export enum RecipeReviewStatus {
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export class UpdateRecipeStatusDto {
  @IsEnum(RecipeReviewStatus)
  status: RecipeReviewStatus;

  @IsOptional()
  @IsString()
  reason?: string;
}