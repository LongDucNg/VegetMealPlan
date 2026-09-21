import { Body, Controller, Get, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateBodyMetricsDto } from './dto/update-body-metrics.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // TODO: gắn @UseGuards(JwtAuthGuard) sau khi module auth xong,
  // và lấy user_id từ token thay vì param khi ráp thật.
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id/body-metrics')
  updateBodyMetrics(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateBodyMetricsDto,
  ) {
    return this.usersService.updateBodyMetrics(id, dto.height_cm, dto.weight_kg);
  }
}
