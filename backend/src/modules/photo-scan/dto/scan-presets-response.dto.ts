import { ApiProperty } from '@nestjs/swagger';
import { ScanPresetItem } from '../constants/scan-presets.constant';

export class ScanPresetDto implements ScanPresetItem {
  @ApiProperty({ example: 'pantry' })
  id: string;

  @ApiProperty({ example: 'Giỏ nguyên liệu / Bàn bếp (Pantry Produce Basket)' })
  label: string;

  @ApiProperty({ example: 'Chụp tổng quan rổ rau củ, giỏ quả hoặc các nguyên liệu được bày sẵn trên bàn bếp.' })
  description: string;

  @ApiProperty({ example: 'Đặt nguyên liệu trải đều trên mặt phẳng sáng sủa...' })
  guidelines: string;

  @ApiProperty({ example: 'Chụp góc 45 - 60 độ hoặc góc thẳng từ trên xuống.' })
  recommended_angle?: string;
}
