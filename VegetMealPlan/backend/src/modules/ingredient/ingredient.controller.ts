import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IngredientService } from './ingredient.service';

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

  // TODO: POST/PATCH/DELETE cho Admin quản lý ingredient (CRUD chuẩn),
  // để mẫu Category/Ingredient tương tự nhau, mỗi bạn tự bổ sung theo task được chia.
}
