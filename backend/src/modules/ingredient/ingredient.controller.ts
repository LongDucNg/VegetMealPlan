import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { IngredientService } from './ingredient.service';
import { SetPriceDto, ValidatePricePipe } from './dto/set-price.dto';
import { Public } from '../../common/decorators/public.decorator';

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
    @Param('id', ParseIntPipe) id: number,
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
    @Param('id', ParseIntPipe) id: number,
    // ValidatePricePipe phải gắn ở @Body(), KHÔNG dùng @UsePipes() cấp route:
    // @UsePipes() áp cho MỌI param của route (kể cả :id) nên pipe sẽ đọc
    // body của path param -> luôn ném "price_per_unit phải lớn hơn 0" -> API 400.
    @Body(new ValidatePricePipe()) dto: SetPriceDto,
  ) {
    return this.ingredientService.setUserPrice(
      req.user.user_id,
      id,
      dto.price_per_unit,
    );
  }

  // Tạo/sửa nguyên liệu (admin) nằm ở AdminIngredientController: POST/PUT /admin/ingredients.
}
