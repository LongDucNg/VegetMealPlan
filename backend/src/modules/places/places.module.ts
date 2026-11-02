import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlacesController } from './places.controller';
import { PlacesService } from './places.service';
import { OsmOverpassProvider } from './external/osm-overpass.provider';
import { SerperPlacesProvider } from './external/serper-places.provider';
import { Shop } from '../shop/entities/shop.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Shop])],
  controllers: [PlacesController],
  providers: [PlacesService, OsmOverpassProvider, SerperPlacesProvider],
  exports: [PlacesService, TypeOrmModule],
})
export class PlacesModule {}
