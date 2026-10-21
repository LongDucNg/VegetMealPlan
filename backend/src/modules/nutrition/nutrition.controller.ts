
import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';

import { NutritionService } from './nutrition.service';
import { PositiveIntPipe } from '../recipe/dto/validators/positive-int.pipe';

@ApiTags('nutrition')
@ApiBearerAuth()
@Controller('nutrition')
export class NutritionController {
  constructor(
    private readonly nutritionService: NutritionService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách dinh dưỡng các công thức' })
  findAll() {
    return this.nutritionService.findAll();
  }

  @Get(':recipeId')
  @ApiOperation({ summary: 'Lấy thông tin dinh dưỡng của công thức' })
  @ApiParam({ name: 'recipeId', type: Number })
  getByRecipeId(
    @Param('recipeId', PositiveIntPipe) recipeId: number,
  ) {
    return this.nutritionService.getByRecipeId(recipeId);
  }
}
