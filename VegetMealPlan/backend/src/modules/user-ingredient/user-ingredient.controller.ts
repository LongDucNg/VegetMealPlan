import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserIngredientService } from './user-ingredient.service';
import { CreateUserIngredientDto } from './dto/create-user-ingredient.dto';

// TODO: đổi :userId sang lấy từ JWT (req.user.user_id) khi auth module xong.
@ApiTags('user-ingredients')
@Controller('users/:userId/ingredients')
export class UserIngredientController {
  constructor(private readonly service: UserIngredientService) {}

  @Get()
  findAll(@Param('userId', ParseIntPipe) userId: number) {
    return this.service.findAllByUser(userId);
  }

  @Post()
  create(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() dto: CreateUserIngredientDto,
  ) {
    return this.service.create(userId, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
