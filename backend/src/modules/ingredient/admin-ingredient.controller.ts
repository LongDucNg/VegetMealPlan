import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IngredientService } from './ingredient.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { CreateIngredientConflictDto } from './dto/create-ingredient-conflict.dto';
import { PositiveIntPipe } from '../../common/pipes/positive-int.pipe';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@ApiTags('admin-ingredients')
@ApiBearerAuth()
@Controller('admin/ingredients')
@Roles(UserRole.ADMIN)
export class AdminIngredientController {
  constructor(
    private readonly ingredientService: IngredientService,
  ) {}

  @Get('conflicts')
  getConflicts() {
    return this.ingredientService.findAllConflicts();
  }

  @Post('conflicts')
  createConflict(
    @Body() dto: CreateIngredientConflictDto,
  ) {
    return this.ingredientService.createConflict(
      Number(dto.ingredient_id_1),
      Number(dto.ingredient_id_2),
      dto.reason,
    );
  }

  @Delete('conflicts/:id1/:id2')
  deleteConflict(
    @Param('id1', PositiveIntPipe) id1: number,
    @Param('id2', PositiveIntPipe) id2: number,
  ) {
    return this.ingredientService.deleteConflict(id1, id2);
  }

  @Post()
  create(
    @Body() dto: CreateIngredientDto,
  ) {
    return this.ingredientService.createIngredient(dto);
  }

  @Put(':id')
  update(
    @Param('id', PositiveIntPipe) id: number,
    @Body() dto: UpdateIngredientDto,
  ) {
    return this.ingredientService.updateIngredient(
      id,
      dto,
    );
  }
}
