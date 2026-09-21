import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RecipeService } from './recipe.service';

@ApiTags('recipes')
@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get()
  findAll() {
    return this.recipeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.recipeService.findOne(id);
  }

  // TODO: POST/PATCH cho Authorized User / Admin tạo & sửa recipe (kèm status=pending_review),
  // route riêng cho Admin duyệt (PATCH :id/approve, PATCH :id/reject).
}
