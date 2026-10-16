import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RecipeService } from './recipe.service';
import { UpdateRecipeStatusDto } from './dto/update-recipe-status.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@ApiTags('admin-recipes')
@ApiBearerAuth()
@Controller('admin/recipes')
@Roles(UserRole.ADMIN)
export class AdminRecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get()
  async findAll(@Query('status') status?: string) {
    return this.recipeService.findAllForAdmin(status);
  }

  @Put(':id/status')
  async updateStatus(
    @Req() req: any,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRecipeStatusDto,
  ) {
    return this.recipeService.updateRecipeStatus(
      id,
      req.user.user_id,
      dto,
    );
  }
}