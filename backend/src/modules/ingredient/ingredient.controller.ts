import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Post,
  Req,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { IngredientService } from './ingredient.service';
import { SetPriceDto } from './dto/set-price.dto';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
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
    @Body() dto: SetPriceDto,
  ) {
    return this.ingredientService.setUserPrice(
      req.user.user_id,
      id,
      dto.price_per_unit,
    );
  }

  // =========================
  // ADMIN ROUTES
  // =========================

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  createIngredient(
    @Req() req: any,
    @Body() dto: CreateIngredientDto,
  ) {
    this.checkAdmin(req);

    return this.ingredientService.createIngredient(dto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  updateIngredient(
    @Req() req: any,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateIngredientDto,
  ) {
    this.checkAdmin(req);

    return this.ingredientService.updateIngredient(
      id,
      dto,
    );
  }

  // =========================
  // ADMIN PERMISSION
  // =========================

  private checkAdmin(req: any) {
    if (req.user?.role !== 'admin') {
      throw new ForbiddenException(
        'Chỉ admin mới có quyền thực hiện',
      );
    }
  }
}