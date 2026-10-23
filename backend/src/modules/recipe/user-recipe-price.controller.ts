import {
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Req,
  Body,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { RecipeService } from './recipe.service';
import { SetRecipePriceDto } from './dto/set-recipe-price.dto';
import { PositiveIntPipe } from '../../common/pipes/positive-int.pipe';

@ApiTags('recipe-prices')
@ApiBearerAuth()
@Controller('users/me/recipe-prices')
@UseGuards(AuthGuard('jwt'))
export class UserRecipePriceController {
  constructor(
    private readonly recipeService: RecipeService,
  ) {}

  @Get()
  getMyRecipePrices(@Req() req: any) {
    return this.recipeService.getMyRecipePrices(
      req.user.user_id,
    );
  }

  @Put(':recipeId')
  setMyRecipePrice(
    @Req() req: any,
    @Param('recipeId', PositiveIntPipe) recipeId: number,
    @Body() dto: SetRecipePriceDto,
  ) {
    return this.recipeService.setMyRecipePrice(
      req.user.user_id,
      recipeId,
      dto.actual_price,
    );
  }

  @Delete(':recipeId')
  removeMyRecipePrice(
    @Req() req: any,
    @Param('recipeId', PositiveIntPipe) recipeId: number,
  ) {
    return this.recipeService.removeMyRecipePrice(
      req.user.user_id,
      recipeId,
    );
  }
}