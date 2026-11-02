import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PlacesNearbyQueryDto, CreatePlaceDto } from './places.dto';
import { PlacesService } from './places.service';
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@ApiTags('Places')
@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Public()
  @Get('nearby')
  @ApiOperation({ summary: 'Lấy danh sách quán ăn chay gần vị trí người dùng' })
  async getNearby(@Query() query: PlacesNearbyQueryDto) {
    return this.placesService.getNearbyPlaces({
      lat: query.lat,
      lng: query.lng,
      radiusKm: query.radiusKm,
      dish: query.dish,
      category: query.category,
    });
  }

  @Public()
  @Get('filters')
  @ApiOperation({ summary: 'Lấy danh sách bộ lọc quán ăn chay' })
  getFilters() {
    return this.placesService.getFilters();
  }

  @Public()
  @Get('food-spots/suggested')
  @ApiOperation({ summary: 'Lấy gợi ý quán chay chuẩn vị theo món ăn' })
  async getSuggestedFoodSpots() {
    return this.placesService.getSuggestedFoodSpots();
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Lấy toàn bộ danh sách quán ăn chay' })
  async getAllPlaces(
    @Query('type') type?: string,
    @Query('q') q?: string,
  ) {
    return this.placesService.getAllPlaces(type, q);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết một quán ăn chay theo ID' })
  async getPlaceById(@Param('id', ParseIntPipe) id: number) {
    return this.placesService.getPlaceById(id);
  }

  @Roles(UserRole.ADMIN)
  @Post()
  @ApiOperation({ summary: 'Thêm quán ăn chay mới (Admin)' })
  async createPlace(@Body() dto: CreatePlaceDto) {
    return this.placesService.createPlace(dto);
  }

  @Roles(UserRole.ADMIN)
  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật quán ăn chay (Admin)' })
  async updatePlace(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<CreatePlaceDto>,
  ) {
    return this.placesService.updatePlace(id, dto);
  }

  @Roles(UserRole.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Xóa quán ăn chay (Admin)' })
  async deletePlace(@Param('id', ParseIntPipe) id: number) {
    return this.placesService.deletePlace(id);
  }
}

