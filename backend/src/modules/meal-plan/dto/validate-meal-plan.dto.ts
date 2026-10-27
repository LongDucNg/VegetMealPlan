import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { WeightGoalDto } from '../../users/dto/weight-goal.dto';

export class ValidateMealItemDto {
  @IsInt({ message: 'ID công thức phải là số nguyên.' })
  @IsPositive({ message: 'ID công thức phải là số nguyên dương.' })
  recipe_id: number;

  @IsInt({ message: 'Số khẩu phần phải là số nguyên.' })
  @Min(1, { message: 'Số khẩu phần phải lớn hơn 0.' })
  servings: number;
}

export class ValidateMealDayDto {
  @IsDateString({}, { message: 'Ngày không hợp lệ. Định dạng: YYYY-MM-DD.' })
  date: string;

  @IsArray({ message: 'Danh sách bữa ăn phải là một mảng.' })
  @ValidateNested({ each: true })
  @Type(() => ValidateMealItemDto)
  meals: ValidateMealItemDto[];
}

export class ValidateMealPlanDto extends WeightGoalDto {
  @IsOptional()
  @IsString({ message: 'Tên thực đơn phải là chuỗi ký tự.' })
  plan_name?: string;

  @IsDateString({}, { message: 'Ngày bắt đầu không hợp lệ. Định dạng: YYYY-MM-DD.' })
  start_date: string;

  @IsDateString({}, { message: 'Ngày kết thúc không hợp lệ. Định dạng: YYYY-MM-DD.' })
  end_date: string;

  @IsArray({ message: 'Danh sách ngày phải là một mảng.' })
  @ArrayNotEmpty({ message: 'Danh sách ngày không được để trống.' })
  @ValidateNested({ each: true })
  @Type(() => ValidateMealDayDto)
  days: ValidateMealDayDto[];
}
