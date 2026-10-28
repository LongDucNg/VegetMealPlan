import { ApiProperty } from '@nestjs/swagger';

export class ScanStatsResponseData {
  @ApiProperty({ example: 30, description: 'Hạn mức quét ảnh nguyên liệu tối đa mỗi ngày' })
  daily_limit: number;

  @ApiProperty({ example: 3, description: 'Số lượt quét đã sử dụng trong ngày hôm nay' })
  used_today: number;

  @ApiProperty({ example: 27, description: 'Số lượt quét ảnh còn lại trong ngày hôm nay' })
  remaining_today: number;

  @ApiProperty({
    example: '2026-10-29T00:00:00.000Z',
    description: 'Thời điểm hạn mức được đặt lại (lúc 00:00 ngày tiếp theo theo giờ Việt Nam UTC+7)',
  })
  reset_at: string;

  @ApiProperty({
    example: '2026-10-28T00:00:00.000Z',
    description: 'Thời điểm bắt đầu chu kỳ tính hạn mức hiện tại',
  })
  period_start: string;

  @ApiProperty({ example: 5, description: 'Giới hạn tần suất gọi tối đa (yêu cầu/phút)' })
  rate_limit_per_minute: number;

  @ApiProperty({ example: true, description: 'Trạng thái tài khoản Premium của người dùng' })
  is_premium: boolean;
}
