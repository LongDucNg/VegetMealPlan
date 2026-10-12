import {
  BadRequestException,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import * as XLSX from 'xlsx';

import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import { RecipeImportService } from './recipe-import.service';
import {
  ImportRecipeRow,
  ImportIngredientRow,
} from './dto/import-recipe-row.dto';

@ApiTags('recipe-import')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('admin/recipe-imports')
export class RecipeImportController {
  constructor(
    private readonly recipeImportService: RecipeImportService,
  ) { }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['file'],
    },
  })
  async import(
    @Req() req: any,
    @UploadedFile() file: {
      originalname: string;
      buffer: Buffer;
    },
  ) {
    if (!file) {
      throw new BadRequestException(
        'Vui lòng tải lên file Excel bằng trường file',
      );
    }

    let rows: ImportRecipeRow[];

    try {
      const workbook = XLSX.read(file.buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];

      if (!sheetName) {
        throw new BadRequestException('File Excel không có sheet');
      }

      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json<Record<string, any>>(
        sheet,
        { defval: '' },
      );

      if (data.length === 0) {
        throw new BadRequestException(
          'Sheet Excel không có dữ liệu',
        );
      }

      rows = data.map((row, index) => {
        let ingredients: ImportIngredientRow[];

        try {
          const value = row.ingredients || row.ingredients_json;

          ingredients =
            typeof value === 'string'
              ? JSON.parse(value)
              : value;

          if (!Array.isArray(ingredients)) {
            throw new Error();
          }
        } catch {
          throw new BadRequestException(
            `Dòng Excel ${index + 2}: cột ingredients phải chứa JSON array hợp lệ`,
          );
        }

        return {
          title: String(row.title || '').trim(),
          description: row.description
            ? String(row.description)
            : undefined,
          instructions: String(row.instructions || '').trim(),
          prep_time: row.prep_time === ''
            ? undefined
            : Number(row.prep_time),
          cook_time: row.cook_time === ''
            ? undefined
            : Number(row.cook_time),
          servings: row.servings === ''
            ? undefined
            : Number(row.servings),
          difficulty: row.difficulty
            ? String(row.difficulty)
            : undefined,
          meal_type: row.meal_type
            ? String(row.meal_type)
            : undefined,
          diet_type: row.diet_type
            ? String(row.diet_type)
            : undefined,
          ingredients: ingredients.map((ingredient) => ({
            ingredient_name: String(
              ingredient.ingredient_name || '',
            ).trim(),
            quantity: Number(ingredient.quantity),
            unit: String(ingredient.unit || '').trim(),
            is_optional: Boolean(ingredient.is_optional),
          })),
        };
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new BadRequestException(
        'Không đọc được file Excel. Vui lòng kiểm tra định dạng file và dữ liệu.',
      );
    }

    return this.recipeImportService.importRows(
      req.user.user_id,
      file.originalname,
      rows,
    );
  }

  @Get()
  listBatches() {
    return this.recipeImportService.listBatches();
  }

  @Get(':id/items')
  getItems(@Param('id', ParseIntPipe) id: number) {
    return this.recipeImportService.getBatchItems(id);
  }
}