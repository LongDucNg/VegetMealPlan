import { Body, Controller, Get, Param, ParseIntPipe, Put, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { IngredientService } from './ingredient.service';
import { SetPriceDto } from './dto/set-price.dto';

@ApiTags('ingredients')
@Controller('ingredients')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Get()
  findAll() {
    return this.ingredientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ingredientService.findOne(id);
  }

  // Uoc tinh - co the lech thuc te theo khu vuc/thoi diem (FE hien disclaimer dua vao day).
  @UseGuards(AuthGuard('jwt'))
  @Put(':id/my-price')
  setMyPrice(
    @Req() req: any,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SetPriceDto,
  ) {
    return this.ingredientService.setUserPrice(req.user.user_id, id, dto.price_per_unit);
  }

  // TODO: POST/PATCH/DELETE cho Admin quản lý ingredient (CRUD chuẩn),
  // để mẫu Category/Ingredient tương tự nhau, mỗi bạn tự bổ sung theo task được chia.
}
