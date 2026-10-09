import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UserIngredientService } from './user-ingredient.service';
import { CreateUserIngredientDto } from './dto/create-user-ingredient.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('user-ingredients')
@ApiBearerAuth() // chỉ để Swagger hiện ô nhập token — guard JWT đã áp dụng toàn cục (APP_GUARD)
@Controller('users/me/ingredients')
export class UserIngredientController {
  constructor(private readonly service: UserIngredientService) {}

  @Get()
  findAll(@CurrentUser('user_id') userId: number) {
    return this.service.findAllByUser(userId);
  }

  @Post()
  create(
    @CurrentUser('user_id') userId: number,
    @Body() dto: CreateUserIngredientDto,
  ) {
    return this.service.create(userId, dto);
  }

  @Delete(':id')
  remove(
    @CurrentUser('user_id') userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.service.remove(userId, id);
  }
}