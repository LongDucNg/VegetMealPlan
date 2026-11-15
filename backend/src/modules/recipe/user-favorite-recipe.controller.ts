import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RecipeFavoriteService } from './recipe-favorite.service';
import { PositiveIntPipe } from '../../common/pipes/positive-int.pipe';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('user-favorite-recipes')
@ApiBearerAuth()
@Controller('users/me/favorites/recipes')
export class UserFavoriteRecipeController {
  constructor(
    private readonly recipeFavoriteService: RecipeFavoriteService,
  ) {}

  @Get()
  getMyFavorites(@CurrentUser('user_id') userId: number) {
    return this.recipeFavoriteService.listFavorites(
      userId,
    );
  }

  @Post(':recipeId')
  addFavorite(
    @CurrentUser('user_id') userId: number,
    @Param('recipeId', PositiveIntPipe) recipeId: number,
  ) {
    return this.recipeFavoriteService.addFavorite(
      userId,
      recipeId,
    );
  }

  @Delete(':recipeId')
  removeFavorite(
    @CurrentUser('user_id') userId: number,
    @Param('recipeId', PositiveIntPipe) recipeId: number,
  ) {
    return this.recipeFavoriteService.removeFavorite(
      userId,
      recipeId,
    );
  }
}