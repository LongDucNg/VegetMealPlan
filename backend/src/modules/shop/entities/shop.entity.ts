import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// Dữ liệu cache từ Google Places API — KHÔNG phải bảng do Admin CRUD tay.
@Entity('shops')
export class Shop {
  @PrimaryGeneratedColumn()
  shop_id: number;

  @Column({ unique: true })
  external_place_id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  address: string;

  @Column('float', { nullable: true })
  latitude: number;

  @Column('float', { nullable: true })
  longitude: number;

  @Column({ nullable: true })
  category: string;

  @Column({ type: 'timestamp' })
  cached_at: Date;
}
