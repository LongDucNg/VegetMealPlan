import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import {
  QueryRecipeDto,
  RecommendationQueryDto,
} from './dto/query-recipe.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiProduces } from '@nestjs/swagger';
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import { PositiveIntPipe } from '../../common/pipes/positive-int.pipe';

@ApiTags('recipes')
@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  // =========================
  // PUBLIC / COMMON ROUTES
  // =========================

  @Get()
  @Public()
  findAll(@Query() query: QueryRecipeDto) {
    return this.recipeService.findAll(query);
  }

  @Get('recommendations')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  getRecommendations(
    @Query() query: RecommendationQueryDto,
    @Req() req: any,
  ) {
    const userId = req.user.user_id;
    return this.recipeService.getRecommendations(query, userId);
  }

  @Get('my-recipes')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  findMyRecipes(@Req() req: any) {
    const userId = req.user.user_id;
    return this.recipeService.findMyRecipes(userId);
  }

  // =========================
  // EXPORT CÔNG THỨC (CSV)
  // =========================

  /**
   * Export công thức ra file CSV (UTF-8 có BOM để Excel đọc đúng tiếng Việt).
   *
   * 3 cách chọn công thức:
   *  1. `?ids=15`           -> export 1 công thức.
   *  2. `?ids=15,20,35`     -> export nhiều công thức trong 1 file.
   *  3. bộ lọc hiện có      -> `?diet_type=vegan&status=approved`.
   *
   * Chỉ export công thức đã duyệt (approved) - không lộ món nháp/riêng tư.
   * Dùng @Res() để trả thẳng file, ResponseInterceptor không bọc JSON.
   *
   * PHÂN QUYỀN: chỉ Admin đã đăng nhập mới export được.
   * - Bỏ @Public() => JwtAuthGuard (global) chặn người chưa đăng nhập (401).
   * - @Roles(UserRole.ADMIN) => RolesGuard (global) chặn user thường (403).
   */
  @Get('export')
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Export công thức ra file CSV (Admin)' })
  @ApiProduces('text/csv')
  async exportRecipes(@Query() query: QueryRecipeDto, @Res() res: Response) {
    const { filename, content } = await this.recipeService.exportRecipesCsv(
      query.ids,
      query,
      { approvedOnly: true },
    );

    // BOM UTF-8 đã nằm trong content (buildRecipeCsv thêm sẵn).
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(content);
  }

  // Yêu thích và giá tự đặt nằm ở /users/me/favorites/recipes và /users/me/recipe-prices
  // (UserFavoriteRecipeController, UserRecipePriceController).

  // Route quản trị (GET /admin/recipes, PUT /admin/recipes/:id/status)
  // nằm trong AdminRecipeController để chỉ có một hợp đồng API.

  // =========================
  // RECIPE DETAIL / COST / REPLACEMENTS
  // =========================

  @Get(':id/cost')
  @Public()
  getRecipeCost(@Param('id', PositiveIntPipe) id: number) {
    return this.recipeService.getRecipeCost(id);
  }

  @Get(':id/replacements')
  @Public()
  getRecipeReplacements(@Param('id', PositiveIntPipe) id: number) {
    return this.recipeService.getRecipeReplacements(id);
  }

  @Get(':id/prices')
  @Public()
  getRecipeCommunityPrices(@Param('id', PositiveIntPipe) id: number) {
    return this.recipeService.getRecipeCommunityPrices(id);
  }

  @Get(':id')
  @Public()
  findOne(@Param('id', PositiveIntPipe) id: number) {
    return this.recipeService.findOne(id);
  }

  // =========================
  // PROTECTED ROUTES (USER)
  // =========================

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  create(
    @Req() req: any,
    @Body() createRecipeDto: CreateRecipeDto,
  ) {
    const userId = req.user.user_id;
    const userRole = req.user.role;

    return this.recipeService.createRecipe(
      userId,
      userRole,
      createRecipeDto,
    );
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  update(
    @Param('id', PositiveIntPipe) id: number,
    @Req() req: any,
    @Body() updateRecipeDto: UpdateRecipeDto,
  ) {
    const userId = req.user.user_id;
    const userRole = req.user.role;

    return this.recipeService.updateRecipe(
      id,
      userId,
      userRole,
      updateRecipeDto,
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  remove(
    @Param('id', PositiveIntPipe) id: number,
    @Req() req: any,
  ) {
    const userId = req.user.user_id;
    const userRole = req.user.role;

    return this.recipeService.removeRecipe(id, userId, userRole);
  }
}
