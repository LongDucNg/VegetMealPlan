import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { HealthGoal } from '../../health-goal/entities/health-goal.entity';

export enum UserRole {
  ADMIN = 'admin',
  AUTHORIZED = 'authorized',
}

export enum UserStatus {
  ACTIVE = 'active',
  LOCKED = 'locked',
}

export enum DietType {
  VEGAN = 'vegan',
  LACTO = 'lacto',
  OVO = 'ovo',
  OVO_LACTO = 'ovo_lacto',
}

export enum ActivityLevel {
  SEDENTARY = 'sedentary',
  LIGHT = 'light',
  MODERATE = 'moderate',
  ACTIVE = 'active',
}

export enum BmiCategory {
  UNDERWEIGHT = 'underweight',
  NORMAL = 'normal',
  OVERWEIGHT = 'overweight',
  OBESE = 'obese',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  full_name: string;

  @Column({ unique: true })
  email: string;

  // null = tài khoản chỉ đăng nhập bằng Google (chưa từng đặt mật khẩu).
  @Column({ type: 'varchar', nullable: true })
  password_hash: string | null;

  // "sub" của Google, gắn khi user đăng nhập bằng Google lần đầu. Unique để một tài khoản Google chỉ ứng với một user.
  @Index('UQ_users_google_id', { unique: true })
  @Column({ type: 'varchar', nullable: true })
  google_id: string | null;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.AUTHORIZED })
  role: UserRole;

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: true })
  gender: string;

  @Column('float', { nullable: true })
  height_cm: number;

  @Column('float', { nullable: true })
  weight_kg: number;

  // CALCULATED, cached — KHÔNG nhận input trực tiếp từ client.
  // Tính lại mỗi khi height_cm/weight_kg đổi (xem UsersService.recalculateBmi()).
  @Column('float', { nullable: true })
  bmi: number;

  @Column({ type: 'enum', enum: BmiCategory, nullable: true })
  bmi_category: BmiCategory;

  @Column({ type: 'timestamp', nullable: true })
  bmi_updated_at: Date;

  @Column({ type: 'enum', enum: ActivityLevel, nullable: true })
  activity_level: ActivityLevel;

  @Column({ type: 'enum', enum: DietType, nullable: true })
  diet_type: DietType;

  @Column({ nullable: true })
  current_goal_id: number;

  @ManyToOne(() => HealthGoal, { nullable: true })
  @JoinColumn({ name: 'current_goal_id' })
  current_goal: HealthGoal;

  // Mục tiêu cụ thể (tuỳ chọn): muốn đạt bao nhiêu kg, trước ngày nào.
  @Column('float', { nullable: true })
  target_weight_kg: number | null;

  @Column({ type: 'date', nullable: true })
  target_date: string | null;

  // Lần cuối user tự khai báo dị ứng (kể cả khai "không dị ứng gì" = danh sách rỗng).
  // null = chưa khai báo lần nào, khác với đã khai là không dị ứng.
  @Column({ type: 'timestamp', nullable: true })
  allergies_declared_at: Date | null;

  // CACHED — null hoac da qua = free tier. Cap nhat khi co SUBSCRIPTION moi completed.
  @Column({ type: 'timestamp', nullable: true })
  premium_until: Date;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.ACTIVE })
  status: UserStatus;

  @CreateDateColumn()
  created_at: Date;
}
