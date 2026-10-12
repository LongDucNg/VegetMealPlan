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
import * as ExcelJS from 'exceljs';

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
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(file.buffer as any);
      const sheet = workbook.worksheets[0];

      if (!sheet) {
        throw new BadRequestException('File Excel không có sheet');
      }

      // Dòng 1 là tiêu đề cột; các dòng sau thành object theo tiêu đề (ô trống = '').
      const headers: string[] = [];
      sheet.getRow(1).eachCell({ includeEmpty: true }, (cell, col) => {
        headers[col] = this.cellToValue(cell.value).toString().trim();
      });
      const data: Record<string, any>[] = [];
      sheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) return;
        const obj: Record<string, any> = {};
        headers.forEach((header, col) => {
          if (header) obj[header] = this.cellToValue(row.getCell(col).value);
        });
        if (Object.values(obj).some((v) => v !== '')) data.push(obj);
      });

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

  // ExcelJS trả ô công thức/rich text/hyperlink dạng object; đưa về giá trị đơn giản như xlsx cũ.
  private cellToValue(value: any): any {
    if (value === null || value === undefined) return '';
    if (value instanceof Date) return value.toISOString();
    if (typeof value === 'object') {
      if (Array.isArray(value.richText)) {
        return value.richText.map((t: any) => t.text).join('');
      }
      if ('result' in value) return this.cellToValue(value.result);
      if ('text' in value) return this.cellToValue(value.text);
      return '';
    }
    return value;
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