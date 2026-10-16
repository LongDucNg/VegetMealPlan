import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

export enum EmailOtpPurpose {
  RESET_PASSWORD = 'reset_password',
}

/**
 * Mã OTP 6 số gửi qua email. Không lưu mã gốc, chỉ lưu HMAC-SHA256 của nó (khoá là JWT_SECRET):
 * mã chỉ có 1 triệu khả năng nên nếu dùng SHA-256 trơn thì lộ DB là dò ngược ra ngay.
 * Mỗi email + purpose chỉ có một mã còn hiệu lực; xin mã mới thì mã cũ bị xoá.
 */
@Entity('email_otps')
@Index('IDX_email_otps_email_purpose', ['email', 'purpose'])
export class EmailOtp {
  @PrimaryGeneratedColumn()
  otp_id: number;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 64 })
  code_hash: string;

  @Column({ type: 'varchar', length: 30 })
  purpose: EmailOtpPurpose;

  @Column({ type: 'timestamp' })
  expires_at: Date;

  @Column({ type: 'int', default: 0 })
  attempts: number;

  @Column({ type: 'timestamp', nullable: true })
  consumed_at: Date | null;

  @CreateDateColumn()
  created_at: Date;
}
