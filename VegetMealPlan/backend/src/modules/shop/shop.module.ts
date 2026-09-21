import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shop } from './entities/shop.entity';

// TODO: ShopService gọi Google Places API, cache kết quả vào bảng shops,
// route GET /shops/nearby?lat=&lng= và GET /shops/search?food=.
@Module({
  imports: [TypeOrmModule.forFeature([Shop])],
  exports: [TypeOrmModule],
})
export class ShopModule {}
