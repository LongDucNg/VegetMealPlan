import {
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Body,
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { RecipePriceService } from './recipe-price.service';
import { SetRecipePriceDto } from './dto/set-recipe-price.dto';
import { PositiveIntPipe } from '../../common/pipes/positive-int.pipe';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('recipe-prices')
@ApiBearerAuth()
@Controller('users/me/recipe-prices')
export class UserRecipePriceController {
  constructor(
    private readonly recipePriceService: RecipePriceService,
  ) {}

  @Get()
  getMyRecipePrices(@CurrentUser('user_id') userId: number) {
    return this.recipePriceService.getMyRecipePrices(
      userId,
    );
  }

  @Put(':recipeId')
  setMyRecipePrice(
    @CurrentUser('user_id') userId: number,
    @Param('recipeId', PositiveIntPipe) recipeId: number,
    @Body() dto: SetRecipePriceDto,
  ) {
    return this.recipePriceService.setMyRecipePrice(
      userId,
      recipeId,
      dto.actual_price,
    );
  }

  @Delete(':recipeId')
  removeMyRecipePrice(
    @CurrentUser('user_id') userId: number,
    @Param('recipeId', PositiveIntPipe) recipeId: number,
  ) {
    return this.recipePriceService.removeMyRecipePrice(
      userId,
      recipeId,
    );
  }
}