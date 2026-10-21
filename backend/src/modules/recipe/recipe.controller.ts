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
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import {
  QueryRecipeDto,
  RecommendationQueryDto,
} from './dto/query-recipe.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Public } from '../../common/decorators/public.decorator';
import { PositiveIntPipe } from './dto/validators/positive-int.pipe';

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
