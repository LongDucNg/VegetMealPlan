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

export enum CategoryType {
  FOOD_TYPE = 'food_type',
  RECIPE_TYPE = 'recipe_type',
}

/**
 * Các loại danh mục được phép gắn vào công thức (bảng recipe_categories).
 *
 * Quy ước dữ liệu: mỗi công thức có đúng 1 danh mục recipe_type (cách chế biến)
 * và 1 danh mục food_type (vai trò của món trong bữa ăn).
 * Danh mục loại khác (vd. 'forum' của module cộng đồng) không liên quan tới
 * công thức nên không được gắn vào recipe_categories.
 */
export const RECIPE_CATEGORY_TYPES: string[] = [
  CategoryType.RECIPE_TYPE,
  CategoryType.FOOD_TYPE,
];

export enum CategoryStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  category_id: number;

  @Column()
  category_name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  category_type: string; // food_type / recipe_type

  @Column({ type: 'enum', enum: CategoryStatus, default: CategoryStatus.ACTIVE })
  status: CategoryStatus;

  @Column({ nullable: true })
  created_by: number;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'created_by' })
  creator: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
