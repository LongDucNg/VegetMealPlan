import * as fs from 'fs';
import * as path from 'path';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const multer = require('multer');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cloudinary = require('cloudinary').v2;
import {
  UseInterceptors,
  UploadedFile,
  BadRequestException,
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
import { FileInterceptor } from '@nestjs/platform-express';
import { ErrorCode } from '../../common/constants/error-codes.enum';
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

  // =========================
  // UPLOAD MEDIA (IMAGE & VIDEO)
  // =========================

  @Post('upload')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Tải lên hình ảnh hoặc video cho công thức món ăn' })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.diskStorage({
        destination: (_req: any, _file: any, cb: any) => {
          const uploadPath = path.join(process.cwd(), 'uploads', 'recipes');
          fs.mkdirSync(uploadPath, { recursive: true });
          cb(null, uploadPath);
        },
        filename: (_req: any, file: any, cb: any) => {
          const ext = path.extname(file.originalname).toLowerCase();
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, 'recipe-' + uniqueSuffix + ext);
        },
      }),
      fileFilter: (_req: any, file: any, cb: any) => {
        const allowedMimes = [
          'image/jpeg',
          'image/png',
          'image/webp',
          'image/gif',
          'video/mp4',
          'video/webm',
          'video/quicktime',
        ];
        const allowedExts = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.mp4', '.webm', '.mov'];
        const ext = path.extname(file.originalname).toLowerCase();
        if (allowedMimes.includes(file.mimetype) || allowedExts.includes(ext)) {
          cb(null, true);
        } else {
          cb(
            new BadRequestException({
              code: ErrorCode.VALIDATION_FAILED,
              message: 'Chỉ chấp nhận file ảnh (jpg, png, webp, gif) hoặc video (mp4, webm, mov)',
            }),
            false,
          );
        }
      },
      limits: {
        fileSize: 100 * 1024 * 1024,
      },
    }),
  )
  async uploadMedia(@UploadedFile() file: any) {
    if (!file) {
      throw new BadRequestException({
        code: ErrorCode.VALIDATION_FAILED,
        message: 'Vui lòng chọn file để tải lên',
      });
    }

    const isVideo =
      file.mimetype?.startsWith('video/') ||
      ['.mp4', '.webm', '.mov'].includes(path.extname(file.originalname).toLowerCase());

    // Nếu cấu hình Cloudinary trong .env, ưu tiên tải thẳng lên Cloudinary
    if (
      process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
    ) {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });

      try {
        const uploadResult = await cloudinary.uploader.upload(file.path, {
          resource_type: isVideo ? 'video' : 'image',
          folder: 'vegetmealplan/recipes',
        });

        // Xoá file tạm local sau khi đẩy lên Cloudinary
        try {
          fs.unlinkSync(file.path);
        } catch {
          // Bỏ qua lỗi xoá file tạm
        }

        return {
          url: uploadResult.secure_url,
          file_type: isVideo ? 'video' : 'image',
          public_id: uploadResult.public_id,
          size: file.size,
        };
      } catch (err: any) {
        console.error('Lỗi khi tải file lên Cloudinary:', err);
        throw new BadRequestException({
          code: ErrorCode.VALIDATION_FAILED,
          message: 'Lỗi khi tải file lên Cloudinary: ' + (err.message || 'Không xác định'),
        });
      }
    }

    const relativeUrl = '/uploads/recipes/' + file.filename;

    return {
      url: relativeUrl,
      file_type: isVideo ? 'video' : 'image',
      filename: file.filename,
      size: file.size,
    };
  }

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
