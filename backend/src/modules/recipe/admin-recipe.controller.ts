import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RecipeService } from './recipe.service';
import { UpdateRecipeStatusDto } from './dto/update-recipe-status.dto';

@ApiTags('admin-recipes')
@ApiBearerAuth()
@Controller('admin/recipes')
@UseGuards(AuthGuard('jwt'))
export class AdminRecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  private checkAdmin(req: any): void {
    if (req.user?.role !== 'admin') {
      throw new ForbiddenException('Admin access required');
    }
  }

  @Get()
  async findAll(@Req() req: any) {
    this.checkAdmin(req);
    return this.recipeService.findAllForAdmin();
  }

  @Put(':id/status')
  async updateStatus(
    @Req() req: any,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRecipeStatusDto,
  ) {
    this.checkAdmin(req);

    return this.recipeService.updateRecipeStatus(
      id,
      req.user.user_id,
      dto,
    );
  }
}