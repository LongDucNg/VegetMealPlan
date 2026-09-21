import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('trial_usages')
export class TrialUsage {
  @PrimaryColumn()
  session_id: string;

  @Column({ default: 0 })
  query_count: number;

  @Column({ type: 'timestamp', nullable: true })
  last_query_at: Date;
}
