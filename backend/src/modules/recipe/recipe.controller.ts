import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { RecipeService } from './recipe.service';
import { RecipeExportService } from './recipe-export.service';
import { RecipePriceService } from './recipe-price.service';
import { RecipeRecommendationService } from './recipe-recommendation.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import {
  QueryRecipeDto,
  RecommendationQueryDto,
} from './dto/query-recipe.dto';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiProduces, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import { PositiveIntPipe } from '../../common/pipes/positive-int.pipe';
import { CurrentUser, AuthUser } from '../../common/decorators/current-user.decorator';
import { RecipeImageService, RECIPE_IMAGE_MAX_BYTES, UploadedImageFile } from './recipe-image.service';
import { RecipeMediaService, RECIPE_MEDIA_UPLOAD_OPTIONS } from './recipe-media.service';

@ApiTags('recipes')
@Controller('recipes')
export class RecipeController {
  constructor(
    private readonly recipeService: RecipeService,
    private readonly recipeImageService: RecipeImageService,
    private readonly recipeMediaService: RecipeMediaService,
    private readonly recipeExportService: RecipeExportService,
    private readonly recipePriceService: RecipePriceService,
    private readonly recipeRecommendationService: RecipeRecommendationService,
  ) {}

  // =========================
  // PUBLIC / COMMON ROUTES
  // =========================

  @Get()
  @Public()
  findAll(@Query() query: QueryRecipeDto) {
    return this.recipeService.findAll(query);
  }

  @Get('recommendations')
  @ApiBearerAuth()
  getRecommendations(
    @Query() query: RecommendationQueryDto,
    @CurrentUser('user_id') userId: number,
  ) {
    return this.recipeRecommendationService.getRecommendations(query, userId);
  }

  @Get('my-recipes')
  @ApiBearerAuth()
  findMyRecipes(@CurrentUser('user_id') userId: number) {
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
    const { filename, content } = await this.recipeExportService.exportRecipesCsv(
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
    return this.recipePriceService.getRecipeCost(id);
  }

  @Get(':id/replacements')
  @Public()
  getRecipeReplacements(@Param('id', PositiveIntPipe) id: number) {
    return this.recipeRecommendationService.getRecipeReplacements(id);
  }

  @Get(':id/prices')
  @Public()
  getRecipeCommunityPrices(@Param('id', PositiveIntPipe) id: number) {
    return this.recipePriceService.getRecipeCommunityPrices(id);
  }

  @Get(':id')
  @Public()
  findOne(@Param('id', PositiveIntPipe) id: number) {
    return this.recipeService.findOne(id);
  }

  // =========================
  // PROTECTED ROUTES (USER)
  // =========================

  // =========================
  // UPLOAD MEDIA (IMAGE & VIDEO)
  // =========================

  @Post('upload')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Tải lên hình ảnh hoặc video cho công thức món ăn' })
  @UseInterceptors(
    FileInterceptor('file', RECIPE_MEDIA_UPLOAD_OPTIONS),
  )
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  uploadMedia(@UploadedFile() file: any) {
    return this.recipeMediaService.upload(file);
  }

  @Post()
  @ApiBearerAuth()
  create(
    @CurrentUser() user: AuthUser,
    @Body() createRecipeDto: CreateRecipeDto,
  ) {
    const userId = user.user_id;
    const userRole = user.role;

    return this.recipeService.createRecipe(
      userId,
      userRole,
      createRecipeDto,
    );
  }

  @Put(':id')
  @ApiBearerAuth()
  update(
    @Param('id', PositiveIntPipe) id: number,
    @CurrentUser() user: AuthUser,
    @Body() updateRecipeDto: UpdateRecipeDto,
  ) {
    const userId = user.user_id;
    const userRole = user.role;

    return this.recipeService.updateRecipe(
      id,
      userId,
      userRole,
      updateRecipeDto,
    );
  }

  @Delete(':id')
  @ApiBearerAuth()
  async remove(
    @Param('id', PositiveIntPipe) id: number,
    @CurrentUser() user: AuthUser,
  ) {
    const userId = user.user_id;
    const userRole = user.role;

    const result = await this.recipeService.removeRecipe(id, userId, userRole);
    // Món đã xoá hẳn thì dọn luôn ảnh trên Cloudinary; món chỉ bị ẩn (REMOVED, còn trong thực đơn) giữ ảnh.
    await this.recipeImageService.removeIfRecipeDeleted(id);
    return result;
  }

  /**
   * Tải ảnh món lên Cloudinary (multipart, trường "image"; JPG/PNG/WEBP, tối đa 5 MB).
   * Gọi SAU khi tạo/sửa món thành công. Chỉ người tạo món hoặc admin. Đổi ảnh = ghi đè ảnh cũ.
   */
  @Post(':id/image')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Tải ảnh món ăn lên Cloudinary và gắn vào công thức' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ schema: { type: 'object', properties: { image: { type: 'string', format: 'binary' } }, required: ['image'] } })
  // Multer chặn cứng file trên 10 MB (không đọc file khổng lồ vào RAM); 5–10 MB để service báo lỗi tiếng Việt rõ ràng.
  @UseInterceptors(FileInterceptor('image', { limits: { fileSize: RECIPE_IMAGE_MAX_BYTES * 2, files: 1 } }))
  uploadImage(
    @Param('id', PositiveIntPipe) id: number,
    @CurrentUser() user: AuthUser,
    @UploadedFile() file?: UploadedImageFile,
  ) {
    return this.recipeImageService.upload(id, user.user_id, user.role, file);
  }
}
