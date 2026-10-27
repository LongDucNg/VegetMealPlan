import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RecipeService } from './recipe.service';
import { UpdateRecipeStatusDto } from './dto/update-recipe-status.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import { PositiveIntPipe } from '../../common/pipes/positive-int.pipe';

@ApiTags('admin-recipes')
@ApiBearerAuth()
@Controller('admin/recipes')
@Roles(UserRole.ADMIN)
export class AdminRecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get()
  async findAll(
    @Query('status') status?: string,
    @Query('category_id') categoryId?: string,
    // page/limit là tuỳ chọn: nếu client gửi thì backend phân trang và trả
    // { data, pagination, message }; nếu không gửi thì trả mảng đầy đủ
    // (frontend admin tự phân trang phía client).
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const catId = categoryId ? parseInt(categoryId, 10) : undefined;
    const pageNum = page ? parseInt(page, 10) : undefined;
    const limitNum = limit ? parseInt(limit, 10) : undefined;
    return this.recipeService.findAllForAdmin(
      status,
      catId,
      pageNum,
      limitNum,
    );
  }

  @Put(':id/status')
  async updateStatus(
    @Req() req: any,
    @Param('id', PositiveIntPipe) id: number,
    @Body() dto: UpdateRecipeStatusDto,
  ) {
    return this.recipeService.updateRecipeStatus(
      id,
      req.user.user_id,
      dto,
    );
  }
}