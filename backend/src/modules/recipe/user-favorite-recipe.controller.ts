import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RecipeService } from './recipe.service';

@ApiTags('user-favorite-recipes')
@ApiBearerAuth()
@Controller('users/me/favorites/recipes')
@UseGuards(AuthGuard('jwt'))
export class UserFavoriteRecipeController {
  constructor(
    private readonly recipeService: RecipeService,
  ) {}

  @Get()
  getMyFavorites(@Req() req: any) {
    return this.recipeService.listFavorites(
      req.user.user_id,
    );
  }

  @Post(':recipeId')
  addFavorite(
    @Req() req: any,
    @Param('recipeId', ParseIntPipe) recipeId: number,
  ) {
    return this.recipeService.addFavorite(
      req.user.user_id,
      recipeId,
    );
  }

  @Delete(':recipeId')
  removeFavorite(
    @Req() req: any,
    @Param('recipeId', ParseIntPipe) recipeId: number,
  ) {
    return this.recipeService.removeFavorite(
      req.user.user_id,
      recipeId,
    );
  }
}