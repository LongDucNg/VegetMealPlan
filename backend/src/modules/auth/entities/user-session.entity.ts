import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

/**
 * Một phiên đăng nhập = một thiết bị/trình duyệt. Access token (JWT) mang `sid` trỏ về đây,
 * nên thu hồi phiên là token đó mất hiệu lực ngay ở request kế tiếp.
 *
 * Refresh token KHÔNG lưu thô, chỉ lưu SHA-256 của nó (lộ DB cũng không dùng được).
 * previous_token_hash giữ hash của refresh token vừa bị xoay: nếu ai gửi lại đúng token cũ,
 * nghĩa là token đã bị đánh cắp, phiên bị thu hồi luôn.
 */
@Entity('user_sessions')
export class UserSession {
  @PrimaryColumn('uuid')
  session_id: string;

  @Index('IDX_user_sessions_user_id')
  @Column()
  user_id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Index('UQ_user_sessions_refresh_hash', { unique: true })
  @Column({ type: 'varchar', length: 64 })
  refresh_token_hash: string;

  @Index('IDX_user_sessions_previous_hash')
  @Column({ type: 'varchar', length: 64, nullable: true })
  previous_token_hash: string | null;

  @Column({ type: 'timestamp' })
  expires_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  revoked_at: Date | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  user_agent: string | null;

  @Column({ type: 'varchar', length: 64, nullable: true })
  ip: string | null;

  @CreateDateColumn()
  created_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  last_used_at: Date | null;
}
