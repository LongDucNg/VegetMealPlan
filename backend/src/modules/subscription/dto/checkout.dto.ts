import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';

/**
 * Body của POST /subscriptions/checkout (cả 2 trường đều không bắt buộc).
 * FE gửi link để PayOS chuyển người dùng về sau khi thanh toán / huỷ.
 * Định dạng URL kiểm ở đây; domain phải thuộc FRONTEND_URL thì PayosService.assertAllowedRedirect kiểm.
 */
export class CheckoutDto {
  @ApiPropertyOptional({
    example: 'https://veget-meal-plan.vercel.app/subscriptions/return',
    description: 'Trang FE nhận kết quả thanh toán. Bỏ trống: dùng PAYOS_RETURN_URL hoặc FRONTEND_URL/subscriptions/return',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  @IsUrl({ protocols: ['http', 'https'], require_protocol: true, require_tld: false })
  returnUrl?: string;

  @ApiPropertyOptional({
    example: 'https://veget-meal-plan.vercel.app/subscriptions?cancel=true',
    description: 'Trang FE khi người dùng huỷ thanh toán. Bỏ trống: dùng PAYOS_CANCEL_URL hoặc FRONTEND_URL/subscriptions/cancel',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  @IsUrl({ protocols: ['http', 'https'], require_protocol: true, require_tld: false })
  cancelUrl?: string;
}
