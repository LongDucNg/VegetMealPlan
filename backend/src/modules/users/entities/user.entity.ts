import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
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

  @Column()
  password_hash: string;

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

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.ACTIVE })
  status: UserStatus;

  @CreateDateColumn()
  created_at: Date;
}
