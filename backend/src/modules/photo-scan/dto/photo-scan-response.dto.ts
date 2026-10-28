import { ApiProperty } from '@nestjs/swagger';

export class MatchedIngredientDto {
  @ApiProperty({ example: 12, description: 'ID nguyên liệu trong database' })
  ingredient_id: number;

  @ApiProperty({ example: 'Cà chua', description: 'Tên nguyên liệu trong hệ thống' })
  ingredient_name: string;

  @ApiProperty({ example: 'quả', description: 'Đơn vị tính' })
  unit: string;
}

export class DetectedIngredientItemDto {
  @ApiProperty({ example: 'Cà chua', description: 'Tên nguyên liệu do AI nhận diện' })
  detected_name: string;

  @ApiProperty({ example: 0.95, description: 'Độ tin cậy của AI (0.0 - 1.0)' })
  confidence: number;

  @ApiProperty({ example: false, description: 'Cờ đánh dấu độ tin cậy thấp (< 0.7) cần người dùng xem kỹ' })
  low_confidence: boolean;

  @ApiProperty({ example: 'fresh', enum: ['fresh', 'aging', 'spoiled', 'unknown'], description: 'Độ tươi của nguyên liệu' })
  freshness_status: string;

  @ApiProperty({ type: MatchedIngredientDto, nullable: true, description: 'Nguyên liệu khớp trong cơ sở dữ liệu' })
  ingredient: MatchedIngredientDto | null;

  @ApiProperty({ type: [MatchedIngredientDto], description: 'Danh sách nguyên liệu ứng viên nếu có nhiều kết quả khớp' })
  candidates: MatchedIngredientDto[];

  @ApiProperty({ example: ['allergen'], type: [String], description: 'Các cảnh báo: allergen (dị ứng), non_vegan (nguyên liệu mặn)' })
  warnings: Array<'allergen' | 'non_vegan'>;
}

export class PhotoScanResponseData {
  @ApiProperty({ type: [DetectedIngredientItemDto], description: 'Danh sách nguyên liệu nhận diện được' })
  items: DetectedIngredientItemDto[];

  @ApiProperty({ example: 'good', enum: ['good', 'blurry', 'dark', 'no_food'], description: 'Đánh giá chất lượng ảnh' })
  image_quality: string;

  @ApiProperty({ example: 'Nhận diện thành công 3 nguyên liệu.', description: 'Thông báo kết quả' })
  message: string;

  @ApiProperty({ example: 29, description: 'Số lượt quét ảnh còn lại trong ngày của người dùng' })
  remaining_scans: number;
}
