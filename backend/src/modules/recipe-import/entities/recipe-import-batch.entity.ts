import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('recipe_import_batches')
export class RecipeImportBatch {
  @PrimaryGeneratedColumn()
  batch_id: number;

  @Column()
  imported_by: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'imported_by' })
  admin: User;

  @Column()
  file_name: string;

  @Column()
  total_rows: number;

  @Column()
  success_count: number;

  @Column()
  failed_count: number;

  @CreateDateColumn()
  created_at: Date;
}
