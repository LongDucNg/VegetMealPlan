import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IngredientService } from './ingredient.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { PositiveIntPipe } from './dto/validators/positive-int.pipe';
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
