import { Controller, Delete, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RecipeService } from './recipe.service';

@ApiTags('recipes')
@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get()
  findAll() {
    return this.recipeService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('favorites')
  listFavorites(@Req() req: any) {
    return this.recipeService.listFavorites(req.user.user_id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.recipeService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id/favorite')
  addFavorite(@Req() req: any, @Param('id', ParseIntPipe) id: number) {
    return this.recipeService.addFavorite(req.user.user_id, id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id/favorite')
  removeFavorite(@Req() req: any, @Param('id', ParseIntPipe) id: number) {
    return this.recipeService.removeFavorite(req.user.user_id, id);
  }

  // TODO: POST/PATCH cho Authorized User / Admin tạo & sửa recipe (kèm status=pending_review),
  // route riêng cho Admin duyệt (PATCH :id/approve, PATCH :id/reject).
}
