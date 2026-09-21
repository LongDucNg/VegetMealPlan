import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { HealthGoal } from '../../health-goal/entities/health-goal.entity';
import { WeeklyPlan } from './weekly-plan.entity';

export enum PlanType {
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
}

export enum MealPlanStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

@Entity('meal_plans')
export class MealPlan {
  @PrimaryGeneratedColumn()
  meal_plan_id: number;

  @Column()
  user_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: true })
  goal_id: number;

  @ManyToOne(() => HealthGoal, { nullable: true })
  @JoinColumn({ name: 'goal_id' })
  goal: HealthGoal;

  // Snapshot BMI tại thời điểm tạo plan — KHÔNG đổi theo BMI hiện tại của user sau này.
  @Column('float', { nullable: true })
  bmi_snapshot: number;

  @Column({ type: 'enum', enum: PlanType, default: PlanType.WEEKLY })
  plan_type: PlanType;

  @Column({ type: 'date' })
  start_date: Date;

  @Column({ type: 'date' })
  end_date: Date;

  @Column({ default: false })
  has_budget: boolean;

  @Column('float', { nullable: true })
  total_budget: number;

  @Column('float', { nullable: true })
  target_calories_per_day: number;

  @Column({ type: 'enum', enum: MealPlanStatus, default: MealPlanStatus.DRAFT })
  status: MealPlanStatus;

  @Column({ nullable: true })
  generated_by: string; // AI / manual

  @OneToMany(() => WeeklyPlan, (w) => w.meal_plan)
  weekly_plans: WeeklyPlan[];

  @CreateDateColumn()
  created_at: Date;
}
