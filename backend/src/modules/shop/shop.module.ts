import { Module } from '@nestjs/common';
import { PlacesModule } from '../places/places.module';

@Module({
  imports: [PlacesModule],
  exports: [PlacesModule],
})
export class ShopModule {}
