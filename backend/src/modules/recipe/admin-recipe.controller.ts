import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RecipeAdminService } from './recipe-admin.service';
import { UpdateRecipeStatusDto } from './dto/update-recipe-status.dto';
import { AdminRecipeQueryDto } from './dto/admin-recipe-query.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import { PositiveIntPipe } from '../../common/pipes/positive-int.pipe';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('admin-recipes')
@ApiBearerAuth()
@Controller('admin/recipes')
@Roles(UserRole.ADMIN)
export class AdminRecipeController {
  constructor(private readonly recipeAdminService: RecipeAdminService) {}

  @Get()
  async findAll(@Query() query: AdminRecipeQueryDto) {
    return this.recipeAdminService.findAllForAdmin(query.status, query.category_id, query.page, query.limit);
  }

  @Get(':id')
  async findOne(@Param('id', PositiveIntPipe) id: number) {
    return this.recipeAdminService.findOneForAdmin(id);
  }

  @Put(':id/status')
  async updateStatus(
    @CurrentUser('user_id') userId: number,
    @Param('id', PositiveIntPipe) id: number,
    @Body() dto: UpdateRecipeStatusDto,
  ) {
    return this.recipeAdminService.updateRecipeStatus(
      id,
      userId,
      dto,
    );
  }
}