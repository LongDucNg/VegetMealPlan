import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

export class ConfirmScanItemDto {
  @ApiProperty({
    example: 12,
    description: 'ID nguyên liệu trong database (bảng ingredients)',
  })
  @IsInt({ message: 'ingredient_id phải là số nguyên' })
  @IsPositive({ message: 'ingredient_id phải là số nguyên dương' })
  ingredient_id: number;

  @ApiPropertyOptional({
    example: 200,
    description: 'Số lượng nguyên liệu',
  })
  @IsOptional()
  @IsNumber({}, { message: 'quantity phải là số' })
  @Min(0, { message: 'quantity không được âm' })
  quantity?: number;

  @ApiPropertyOptional({
    example: 'g',
    description: 'Đơn vị tính (nếu không truyền sẽ dùng đơn vị mặc định của nguyên liệu)',
  })
  @IsOptional()
  @IsString({ message: 'unit phải là chuỗi' })
  unit?: string;

  @ApiPropertyOptional({
    example: 'fresh',
    enum: ['fresh', 'aging', 'spoiled', 'unknown'],
    description: 'Trạng thái độ tươi của nguyên liệu',
  })
  @IsOptional()
  @IsString({ message: 'freshness_status phải là chuỗi' })
  freshness_status?: string;

  @ApiPropertyOptional({
    example: '2026-11-05',
    description: 'Hạn sử dụng của nguyên liệu (định dạng YYYY-MM-DD)',
  })
  @IsOptional()
  @IsDateString({}, { message: 'expiry_date phải có định dạng ngày hợp lệ (YYYY-MM-DD)' })
  expiry_date?: string;
}

export class ConfirmScanDto {
  @ApiProperty({
    type: [ConfirmScanItemDto],
    description: 'Danh sách các nguyên liệu được người dùng tick chọn xác nhận đưa vào pantry (tối đa 30 mục)',
  })
  @IsArray({ message: 'items phải là mảng danh sách' })
  @ArrayMinSize(1, { message: 'Danh sách nguyên liệu xác nhận không được rỗng' })
  @ArrayMaxSize(30, { message: 'Mỗi lần xác nhận tối đa 30 nguyên liệu' })
  @ValidateNested({ each: true })
  @Type(() => ConfirmScanItemDto)
  items: ConfirmScanItemDto[];
}

export class ConfirmScanResultItem {
  @ApiProperty({ example: 12 })
  ingredient_id: number;

  @ApiProperty({ example: 'Cà chua' })
  ingredient_name: string;

  @ApiProperty({
    example: 'added',
    enum: ['added', 'already_in_pantry', 'non_vegan_rejected'],
    description:
      'Trạng thái xử lý: added (đã thêm), already_in_pantry (đã có trong tủ lạnh, bỏ qua), non_vegan_rejected (món mặn, bị từ chối)',
  })
  status: 'added' | 'already_in_pantry' | 'non_vegan_rejected';

  @ApiProperty({ example: 'Đã thêm thành công vào tủ lạnh' })
  message: string;
}

export class ConfirmScanResponseData {
  @ApiProperty({ example: 3, description: 'Số nguyên liệu mới đã thêm vào tủ lạnh' })
  added_count: number;

  @ApiProperty({ example: 1, description: 'Số nguyên liệu bị bỏ qua (trùng lặp hoặc món mặn)' })
  skipped_count: number;

  @ApiProperty({ type: [ConfirmScanResultItem], description: 'Chi tiết từng nguyên liệu trong danh sách' })
  results: ConfirmScanResultItem[];

  @ApiProperty({ example: 'Đã lưu thành công 3 nguyên liệu vào tủ lạnh của bạn.' })
  message: string;
}
