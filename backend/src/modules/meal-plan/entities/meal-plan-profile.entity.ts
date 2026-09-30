import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { BmiCategory, ActivityLevel, DietType } from '../../users/entities/user.entity';

/**
 * Ho so nguoi khac (con/vo chong/nguoi than) de user lap meal plan thay ho.
 * Luu lai nhu lich su, tai su dung duoc cho nhieu meal_plan sau nay.
 */
@Entity('meal_plan_profiles')
export class MealPlanProfile {
  @PrimaryGeneratedColumn()
  profile_id: number;

  @Column()
  user_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  full_name: string;

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: true })
  gender: string;

  @Column('float', { nullable: true })
  height_cm: number;

  @Column('float', { nullable: true })
  weight_kg: number;

  // CALCULATED, cached - giong logic o User.recalculateBmi()
  @Column('float', { nullable: true })
  bmi: number;

  @Column({ type: 'enum', enum: BmiCategory, nullable: true })
  bmi_category: BmiCategory;

  @Column({ type: 'enum', enum: ActivityLevel, nullable: true })
  activity_level: ActivityLevel;

  @Column({ type: 'enum', enum: DietType, nullable: true })
  diet_type: DietType;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
