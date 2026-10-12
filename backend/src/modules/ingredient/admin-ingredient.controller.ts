import {Body,Controller,ForbiddenException,Param,ParseIntPipe,Post,Put,Req,UseGuards,} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { IngredientService } from './ingredient.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';

@ApiTags('admin-ingredients')
@ApiBearerAuth()
@Controller('admin/ingredients')
@UseGuards(AuthGuard('jwt'))
export class AdminIngredientController {
  constructor(
    private readonly ingredientService: IngredientService,
  ) {}

  @Post()
  create(
    @Req() req: any,
    @Body() dto: CreateIngredientDto,
  ) {
    if (req.user.role !== 'admin') {
      throw new ForbiddenException(
        'Admin access required',
      );
    }

    return this.ingredientService.createIngredient(dto);
  }

  @Put(':id')
  update(
    @Req() req: any,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateIngredientDto,
  ) {
    if (req.user.role !== 'admin') {
      throw new ForbiddenException(
        'Admin access required',
      );
    }

    return this.ingredientService.updateIngredient(
      id,
      dto,
    );
  }
}