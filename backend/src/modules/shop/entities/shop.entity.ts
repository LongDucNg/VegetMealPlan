import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from 'typeorm';

@Entity('shop')
@Index('idx_shop_lat_lng', ['latitude', 'longitude'])
export class Shop {
  @PrimaryGeneratedColumn()
  shop_id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column('numeric', { precision: 10, scale: 7 })
  latitude: number;

  @Column('numeric', { precision: 10, scale: 7 })
  longitude: number;

  @Column({ length: 100, nullable: true })
  category: string;

  @Column('text', { array: true, nullable: true })
  categories: string[];

  @Column({ length: 255, nullable: true })
  special_dish: string;

  @Column('text', { array: true, nullable: true })
  suggested_dishes: string[];

  @Column({ length: 50, nullable: true })
  phone_number: string;

  @Column('numeric', { precision: 2, scale: 1, default: 4.5 })
  rating: number;

  @Column({ default: true })
  is_open: boolean;

  @Column({ length: 50, default: 'osm' })
  source: string;

  @Column({ length: 255, unique: true, nullable: true })
  external_id: string;

  @Column({ length: 255, nullable: true })
  external_place_id: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'NOW()' })
  cached_at: Date;
}
