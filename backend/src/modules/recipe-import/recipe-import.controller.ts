import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, MulterModuleOptions } from '@nestjs/platform-express';
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
import { PositiveIntPipe } from '../../common/pipes/positive-int.pipe';
import {
  ImportRecipeRow,
  ImportIngredientRow,
} from './dto/import-recipe-row.dto';

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

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
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: MAX_FILE_SIZE,
      },
    } as MulterModuleOptions),
  )
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
      size?: number;
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
        throw new BadRequestException('File Excel không có sheet nào.');
      }

      // Đọc tiêu đề dòng 1 và chuẩn hoá alias cột tiếng Việt / tiếng Anh
      const headerMap = new Map<number, string>();
      sheet.getRow(1).eachCell({ includeEmpty: true }, (cell, col) => {
        const raw = this.cellToValue(cell.value).toString().trim();
        if (raw) {
          headerMap.set(col, this.canonicalColumnName(raw));
        }
      });

      const data: Record<string, any>[] = [];
      sheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) return;
        const obj: Record<string, any> = {};
        headerMap.forEach((key, col) => {
          if (key) {
            obj[key] = this.cellToValue(row.getCell(col).value);
          }
        });
        // Bỏ qua dòng hoàn toàn rỗng
        if (Object.values(obj).some((v) => v !== '' && v !== null && v !== undefined)) {
          data.push(obj);
        }
      });

      if (data.length === 0) {
        throw new BadRequestException(
          'File Excel không chứa dữ liệu công thức nào.',
        );
      }

      rows = data.map((row, index) => {
        const rowNumber = index + 2;
        const rawTitle = String(row.title || '').trim();
        if (!rawTitle) {
          throw new BadRequestException(`Dòng ${rowNumber}: thiếu Tên món (tiêu đề bắt buộc)`);
        }

        const ingredients = this.parseIngredientsCell(
          row.ingredients || row.ingredients_json,
          rowNumber,
        );

        const prep = row.prep_time !== '' && row.prep_time != null ? Number(row.prep_time) : 0;
        const cook = row.cook_time !== '' && row.cook_time != null ? Number(row.cook_time) : 0;
        const servings = row.servings !== '' && row.servings != null ? Number(row.servings) : 1;

        return {
          title: rawTitle,
          description: row.description ? String(row.description).trim() : undefined,
          instructions: String(row.instructions || 'Chế biến theo công thức chuẩn.').trim(),
          prep_time: Number.isFinite(prep) && prep >= 0 ? prep : 0,
          cook_time: Number.isFinite(cook) && cook >= 0 ? cook : 0,
          servings: Number.isFinite(servings) && servings > 0 ? servings : 1,
          difficulty: this.normalizeDifficulty(row.difficulty),
          meal_type: this.normalizeMealType(row.meal_type),
          diet_type: this.normalizeDietType(row.diet_type),
          ingredients,
        };
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new BadRequestException(
        `Không đọc được file Excel: ${(error as Error)?.message || 'Vui lòng kiểm tra định dạng file.'}`,
      );
    }

    return this.recipeImportService.importRows(
      req.user.user_id,
      file.originalname,
      rows,
    );
  }

  // Chuẩn hoá tên cột tiếng Việt và tiếng Anh về tên trường chuẩn
  private canonicalColumnName(raw: string): string {
    const clean = raw.toLowerCase().trim().replace(/[\s\-_()]+/g, ' ');
    if (/tên món|tên công thức|tiêu đề|recipe name|title/i.test(clean)) return 'title';
    if (/mô tả|giới thiệu|description|desc/i.test(clean)) return 'description';
    if (/hướng dẫn|cách làm|các bước|công thức|instructions|steps/i.test(clean)) return 'instructions';
    if (/chuẩn bị|prep/i.test(clean)) return 'prep_time';
    if (/thời gian nấu|nấu|cook/i.test(clean)) return 'cook_time';
    if (/khẩu phần|số người|phần ăn|servings|serving/i.test(clean)) return 'servings';
    if (/độ khó|difficulty/i.test(clean)) return 'difficulty';
    if (/bữa ăn|bữa|loại bữa|meal/i.test(clean)) return 'meal_type';
    if (/chế độ|loại ăn chay|loại chay|diet/i.test(clean)) return 'diet_type';
    if (/nguyên liệu|thành phần|ingredients/i.test(clean)) return 'ingredients';
    return clean;
  }

  // Phân tích ô nguyên liệu: chấp nhận cả JSON array lẫn văn bản tiếng Việt tự nhiên
  private parseIngredientsCell(value: any, rowNumber: number): ImportIngredientRow[] {
    if (!value) {
      throw new BadRequestException(`Dòng ${rowNumber}: Cột nguyên liệu không được để trống.`);
    }

    if (Array.isArray(value)) {
      return value.map((i) => ({
        ingredient_name: String(i.ingredient_name || i.name || '').trim(),
        quantity: Number(i.quantity) || 1,
        unit: String(i.unit || 'g').trim(),
        is_optional: Boolean(i.is_optional),
      }));
    }

    const str = String(value).trim();
    if (!str) {
      throw new BadRequestException(`Dòng ${rowNumber}: Cột nguyên liệu không được để trống.`);
    }

    // 1. Thử JSON parse nếu bắt đầu bằng [ và kết thúc bằng ]
    if (str.startsWith('[') && str.endsWith(']')) {
      try {
        const parsed = JSON.parse(str);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((i) => ({
            ingredient_name: String(i.ingredient_name || i.name || '').trim(),
            quantity: Number(i.quantity) || 1,
            unit: String(i.unit || 'g').trim(),
            is_optional: Boolean(i.is_optional),
          }));
        }
      } catch {
        // Không phải JSON hợp lệ, tiếp tục phân tích cú pháp chuỗi văn bản
      }
    }

    // 2. Phân tích chuỗi tự nhiên: tách theo xuống dòng, chấm phẩy hoặc dấu phẩy
    const rawTokens = str
      .split(/[\n;]+|,(?=\s*[^\d,]+[\(:\d])/)
      .map((s) => s.trim())
      .filter(Boolean);

    const result: ImportIngredientRow[] = [];

    for (const item of rawTokens) {
      // Dạng 1: Tên (số lượng + đơn vị) -> VD: "Đậu phụ (200g)" hoặc "Cà rốt (100 gram)"
      const matchParen = item.match(/^(.+?)\s*\(\s*([\d.,]+)\s*([a-zA-Z\p{L}]+)?\s*\)$/u);
      if (matchParen) {
        result.push({
          ingredient_name: matchParen[1].trim(),
          quantity: parseFloat(matchParen[2].replace(',', '.')) || 1,
          unit: matchParen[3]?.trim() || 'g',
          is_optional: false,
        });
        continue;
      }

      // Dạng 2: Tên: số lượng + đơn vị -> VD: "Đậu phụ: 200g"
      const matchColon = item.match(/^(.+?)\s*:\s*([\d.,]+)\s*([a-zA-Z\p{L}]+)?$/u);
      if (matchColon) {
        result.push({
          ingredient_name: matchColon[1].trim(),
          quantity: parseFloat(matchColon[2].replace(',', '.')) || 1,
          unit: matchColon[3]?.trim() || 'g',
          is_optional: false,
        });
        continue;
      }

      // Dạng 3: Tên số_lượng đơn_vị -> VD: "Đậu phụ 200g" hoặc "Nấm hương 50 g"
      const matchEndNum = item.match(/^(.+?)\s+([\d.,]+)\s*([a-zA-Z\p{L}]+)?$/u);
      if (matchEndNum && !/^\d/.test(matchEndNum[1].trim())) {
        result.push({
          ingredient_name: matchEndNum[1].trim(),
          quantity: parseFloat(matchEndNum[2].replace(',', '.')) || 1,
          unit: matchEndNum[3]?.trim() || 'g',
          is_optional: false,
        });
        continue;
      }

      // Dạng 4: Chỉ có tên nguyên liệu -> mặc định 1 phần
      if (item.length > 0) {
        result.push({
          ingredient_name: item.trim(),
          quantity: 1,
          unit: 'phần',
          is_optional: false,
        });
      }
    }

    if (result.length === 0) {
      throw new BadRequestException(`Dòng ${rowNumber}: Không tìm thấy danh sách nguyên liệu hợp lệ.`);
    }

    return result;
  }

  private normalizeMealType(val?: string): string {
    if (!val) return 'any';
    const lower = String(val).toLowerCase().trim();
    if (lower.includes('sáng') || lower.includes('breakfast')) return 'breakfast';
    if (lower.includes('trưa') || lower.includes('lunch')) return 'lunch';
    if (lower.includes('tối') || lower.includes('dinner')) return 'dinner';
    if (lower.includes('phụ') || lower.includes('snack')) return 'snack';
    return 'any';
  }

  private normalizeDietType(val?: string): string {
    if (!val) return 'vegan';
    const lower = String(val).toLowerCase().trim();
    if (lower.includes('thuần') || lower.includes('vegan')) return 'vegan';
    if ((lower.includes('sữa') && lower.includes('trứng')) || lower.includes('lacto_ovo')) return 'lacto_ovo_vegetarian';
    if (lower.includes('sữa') || lower.includes('lacto')) return 'lacto_vegetarian';
    if (lower.includes('trứng') || lower.includes('ovo')) return 'ovo_vegetarian';
    return 'vegan';
  }

  private normalizeDifficulty(val?: string): string {
    if (!val) return 'medium';
    const lower = String(val).toLowerCase().trim();
    if (lower.includes('dễ') || lower.includes('easy')) return 'easy';
    if (lower.includes('khó') || lower.includes('hard')) return 'hard';
    return 'medium';
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
  getItems(@Param('id', PositiveIntPipe) id: number) {
    return this.recipeImportService.getBatchItems(id);
  }
}