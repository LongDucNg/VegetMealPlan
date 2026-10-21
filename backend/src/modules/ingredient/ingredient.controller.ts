import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { IngredientService } from './ingredient.service';
import { SetPriceDto } from './dto/set-price.dto';
import { Public } from '../../common/decorators/public.decorator';
import { PositiveIntPipe } from '../../common/pipes/positive-int.pipe';

@ApiTags('ingredients')
@Controller('ingredients')
export class IngredientController {
  constructor(
    private readonly ingredientService: IngredientService,
  ) {}

  // =========================
  // PUBLIC ROUTES
  // =========================

  @Public()
  @Get()
  findAll() {
    return this.ingredientService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(
    @Param('id', PositiveIntPipe) id: number,
  ) {
    return this.ingredientService.findOne(id);
  }

  // =========================
  // USER INGREDIENT PRICE
  // =========================

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put(':id/my-price')
  setMyPrice(
    @Req() req: any,
    @Param('id', PositiveIntPipe) id: number,
    @Body() dto: SetPriceDto,
  ) {
    return this.ingredientService.setUserPrice(
      req.user.user_id,
      id,
      dto.price_per_unit,
    );
  }

  // Tạo/sửa nguyên liệu (admin) nằm ở AdminIngredientController: POST/PUT /admin/ingredients.
}
