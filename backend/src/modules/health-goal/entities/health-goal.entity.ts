import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('health_goals')
export class HealthGoal {
  @PrimaryGeneratedColumn()
  goal_id: number;

  @Column({ unique: true })
  name: string; // lose_weight / gain_muscle / maintain

  @Column({ nullable: true })
  description: string;
}
