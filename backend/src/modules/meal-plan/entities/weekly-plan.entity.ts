import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { MealPlan } from './meal-plan.entity';
import { DailyMeal } from './daily-meal.entity';

@Entity('weekly_plans')
export class WeeklyPlan {
  @PrimaryGeneratedColumn()
  weekly_plan_id: number;

  @Column()
  meal_plan_id: number;

  @ManyToOne(() => MealPlan, (m) => m.weekly_plans, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'meal_plan_id' })
  meal_plan: MealPlan;

  @Column()
  week_number: number;

  // Tuan dau co the ngan hon 7 ngay neu meal_plan tao giua tuan (snap theo lich duong T2-CN).
  @Column({ type: 'date' })
  start_date: Date;

  @Column({ type: 'date' })
  end_date: Date;


  @Column('float', { nullable: true })
  week_budget: number;

  @Column('float', { nullable: true })
  adjusted_budget: number;

  @Column('float', { default: 0 })
  rollover_amount: number;

  @Column('float', { nullable: true })
  week_calorie_target: number;

  @OneToMany(() => DailyMeal, (d) => d.weekly_plan)
  daily_meals: DailyMeal[];
}
