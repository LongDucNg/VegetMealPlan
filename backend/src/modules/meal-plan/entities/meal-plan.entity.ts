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
import { MealPlanProfile } from './meal-plan-profile.entity';

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

  // null = lap ke hoach cho chinh user. Co gia tri = lap cho nguoi khac (MealPlanProfile).
  @Column({ nullable: true })
  target_profile_id: number;

  @ManyToOne(() => MealPlanProfile, { nullable: true })
  @JoinColumn({ name: 'target_profile_id' })
  target_profile: MealPlanProfile;

  // Snapshot BMI cua doi tuong duoc lap ke hoach (user hoac target_profile) tai thoi diem tao,
  // KHONG doi theo BMI hien tai cua doi tuong do sau nay.
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
