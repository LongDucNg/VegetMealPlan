import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { WeeklyPlan } from './weekly-plan.entity';
import { MealItem } from './meal-item.entity';

@Entity('daily_meals')
export class DailyMeal {
  @PrimaryGeneratedColumn()
  daily_meal_id: number;

  @Column()
  weekly_plan_id: number;

  @ManyToOne(() => WeeklyPlan, (w) => w.daily_meals, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'weekly_plan_id' })
  weekly_plan: WeeklyPlan;

  @Column({ type: 'date' })
  meal_date: Date;

  @Column()
  meal_type: string; // breakfast / lunch / dinner

  @Column('float', { nullable: true })
  target_calories: number;

  @OneToMany(() => MealItem, (m) => m.daily_meal)
  meal_items: MealItem[];
}
