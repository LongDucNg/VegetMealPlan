import {
  BadRequestException,
  Controller,
  Get,
  Logger,
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
  private readonly logger = new Logger(RecipeImportController.name);

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

    // Chỉ chấp nhận định dạng Excel mà ExcelJS đọc được. Nếu thiếu check này,
    // file .csv/.txt/.pdf sẽ lọt qua và rơi vào nhánh catch chung -> trả thông
    // báo "Không đọc được file Excel" chung chung, khó debug cho admin.
    const extension = file.originalname
      .toLowerCase()
      .split('.')
      .pop();

    if (!extension || !['xlsx', 'xlsm'].includes(extension)) {
      throw new BadRequestException(
        `Định dạng file không hỗ trợ "${file.originalname}". Chỉ chấp nhận file .xlsx hoặc .xlsm.`,
      );
    }

    let rows: ImportRecipeRow[];

    try {
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(file.buffer as any);

      const sheetNames = workbook.worksheets.map((s) => s.name);

      // API hiện chỉ đọc sheet đầu tiên (1 sheet = 1 lần import).
      // File nhiều sheet sẽ được báo rõ trong log để admin biết cần tách file.
      this.logger.log(
        `Đọc file Excel "${file.originalname}": ${sheetNames.length} sheet [${sheetNames.join(', ')}] - dùng sheet đầu tiên "${sheetNames[0] ?? ''}"`,
      );

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
        // Nếu file có nhiều sheet mà sheet đầu rỗng, báo rõ tên các sheet có dữ liệu
        // (API chỉ đọc 1 sheet/lần import - admin cần tách file).
        const otherSheetsWithData = workbook.worksheets
          .slice(1)
          .filter((other) => other.actualRowCount > 1)
          .map((other) => other.name);

        if (otherSheetsWithData.length > 0) {
          throw new BadRequestException(
            `Sheet đầu tiên "${sheet.name}" không có dữ liệu. File có các sheet khác chứa dữ liệu: ${otherSheetsWithData.join(', ')}. ` +
              'API chỉ đọc sheet đầu tiên mỗi lần import - vui lòng tách file hoặc xóa các sheet không cần thiết.',
          );
        }

        throw new BadRequestException(
          'File Excel không chứa dữ liệu công thức nào.',
        );
      }

      rows = data.map((row, index) => {
        const rowNumber = index + 2; // dòng 1 là header
        let ingredients: ImportIngredientRow[];
        let row_error: string | undefined;

        try {
          const rawIngredients = row.ingredients || row.ingredients_json;

          // Ô bắt đầu bằng '[' được coi là JSON array: bỏ phần tử rỗng/null
          // trước khi parse. JSON hỏng -> dòng này FAILED, các dòng khác vẫn import.
          let ingredientsValue = rawIngredients;
          if (typeof ingredientsValue === 'string') {
            const trimmed = ingredientsValue.trim();
            if (trimmed.startsWith('[')) {
              const parsed = JSON.parse(trimmed);
              if (!Array.isArray(parsed)) {
                throw new Error('cot ingredients khong phai JSON array');
              }
              ingredientsValue = parsed.filter(
                (item) =>
                  item && typeof item === 'object' && !Array.isArray(item),
              );
            } else if (!/\d/.test(trimmed)) {
              // Chuỗi tự nhiên không có số lượng nào (VD: "không phải JSON")
              // -> không phải danh sách nguyên liệu hợp lệ. Đánh dấu FAILED
              // cho dòng này thay vì báo lỗi chung làm hỏng cả lô import.
              throw new Error('cot ingredients khong chua so luong hop le');
            }
          }

          // Hỗ trợ cả JSON array lẫn văn bản tự nhiên (VD: "Đậu phụ (200g)").
          ingredients = this.parseIngredientsCell(ingredientsValue, rowNumber);
        } catch {
          // Dòng lỗi không hủy cả file: đánh dấu để service báo FAILED cho dòng này.
          ingredients = [];
          row_error = `Dòng Excel ${rowNumber}: cột ingredients phải chứa JSON array hợp lệ`;
        }

        // Cột category_ids (tuỳ chọn). Giá trị sai -> đánh dấu dòng FAILED
        // thay vì âm thầm bỏ qua (tạo công thức không có danh mục).
        const categoryIds = this.toCategoryIds(row.category_ids);

        if (categoryIds.error) {
          row_error = row_error
            ? `${row_error}; ${categoryIds.error}`
            : `Dòng Excel ${rowNumber}: ${categoryIds.error}`;
        }

        return {
          title: String(row.title || '').trim(),
          description: row.description
            ? String(row.description).trim()
            : undefined,
          instructions: String(row.instructions || '').trim(),
          prep_time: this.toPositiveNumber(row.prep_time),
          cook_time: this.toPositiveNumber(row.cook_time),
          servings: this.toPositiveNumber(row.servings),
          // difficulty/meal_type/diet_type được chuẩn hoá từ tiếng Việt sang
          // giá trị enum hợp lệ. Nếu không map được thì giữ nguyên giá trị gốc
          // để service báo rõ lý do dòng đó FAILED (không tự gán mặc định sai).
          difficulty: this.normalizeDifficulty(row.difficulty),
          // meal_type và diet_type là bắt buộc: giữ chuỗi rỗng khi thiếu để
          // service báo rõ "Thiếu field bắt buộc" thay vì tự gán mặc định.
          meal_type: this.normalizeMealType(row.meal_type),
          suitable_meals: row.suitable_meals
            ? String(row.suitable_meals)
            : undefined,
          diet_type: this.normalizeDietType(row.diet_type),
          category_ids: categoryIds.ids,
          row_error,
          ingredients: ingredients.map((ingredient) => ({
            ingredient_name: String(
              ingredient.ingredient_name || '',
            ).trim(),
            // Quantity phải là số > 0. Number('abc')=NaN -> để undefined
            // và để service báo FAILED cho dòng (thay vì lưu NaN xuống DB).
            quantity: this.toPositiveNumber(ingredient.quantity) ?? NaN,
            unit: String(ingredient.unit || '').trim(),
            is_optional: Boolean(ingredient.is_optional),
          })),
        };
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      // Log nguyên nhân thật để debug được, nhưng không lộ nội dung file/dữ liệu.
      this.logger.error(
        `Không đọc được file Excel "${file.originalname}" (${file.size ?? 0} bytes): ${
          error instanceof Error ? error.message : String(error)
        }`,
        error instanceof Error ? error.stack : undefined,
      );

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

  // Chuyển giá trị ô Excel thành số nguyên dương hợp lệ.
  // Number('')=0, Number('abc')=NaN, Number('12 phút')=NaN -> nếu đẩy thẳng
  // NaN xuống service/DB sẽ sinh lỗi 500 (invalid input for numeric column).
  private toPositiveNumber(value: any): number | undefined {
    if (value === null || value === undefined || value === '') {
      return undefined;
    }

    const num = Number(value);

    if (!Number.isFinite(num) || num <= 0) {
      return undefined;
    }

    return Math.round(num);
  }

  // Đọc cột category_ids (tuỳ chọn) của file Excel.
  // Chấp nhận 2 dạng: JSON array (vd. "[3,12]") hoặc chuỗi số phân tách
  // bằng dấu phẩy (vd. "3,12"). Ô rỗng -> undefined (dòng không gắn danh mục).
  // Trả về { error } nếu có giá trị nhưng parse hỏng -> controller đánh dấu
  // dòng FAILED, không tạo công thức sai danh mục.
  private toCategoryIds(value: any): {
    ids?: number[];
    error?: string;
  } {
    if (value === null || value === undefined || value === '') {
      return {};
    }

    let raw: unknown[];

    if (Array.isArray(value)) {
      raw = value;
    } else if (typeof value === 'string') {
      const trimmed = value.trim();

      if (!trimmed) {
        return {};
      }

      if (trimmed.startsWith('[')) {
        try {
          const parsed = JSON.parse(trimmed);

          if (!Array.isArray(parsed)) {
            return {
              error:
                'cột category_ids phải chứa JSON array hợp lệ',
            };
          }

          raw = parsed;
        } catch {
          return {
            error:
              'cột category_ids phải chứa JSON array hợp lệ',
          };
        }
      } else {
        raw = trimmed.split(',');
      }
    } else {
      raw = [value];
    }

    const ids: number[] = [];

    for (const item of raw) {
      const num = Number(String(item).trim());

      if (!Number.isFinite(num) || num <= 0) {
        return {
          error:
            'cột category_ids chỉ được chứa số nguyên dương',
        };
      }

      ids.push(Math.round(num));
    }

    return ids.length > 0 ? { ids } : {};
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

  // Chuyển giá trị ô Excel (string/số) sang number hợp lệ; trả undefined khi rỗng/không parse được.
  private toNumberOrUndefined(value: unknown): number | undefined {
    if (value === '' || value === null || value === undefined) {
      return undefined;
    }
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  }

  // meal_type: chỉ chấp nhận breakfast/lunch/snack (đúng dữ liệu gốc).
  // Giá trị không map được thì trả về chuỗi rỗng để service báo rõ
  // "Loại bữa ăn ... không hợp lệ" thay vì tự gán mặc định sai.
  private normalizeMealType(val?: string): string {
    if (!val) return '';
    const lower = String(val).toLowerCase().trim();
    if (!lower) return '';
    if (lower.includes('sáng') || lower.includes('breakfast')) return 'breakfast';
    if (lower.includes('trưa') || lower.includes('lunch')) return 'lunch';
    if (lower.includes('phụ') || lower.includes('snack')) return 'snack';
    if (lower === 'breakfast' || lower === 'lunch' || lower === 'snack') {
      return lower;
    }
    return lower;
  }

  // diet_type: phải khớp enum DietType (vegan/lacto/ovo/ovo_lacto).
  // Giá trị không map được thì giữ nguyên để service báo rõ danh sách hợp lệ.
  private normalizeDietType(val?: string): string {
    if (!val) return '';
    const lower = String(val).toLowerCase().trim();
    if (!lower) return '';
    if (lower.includes('thuần') || lower.includes('vegan')) return 'vegan';
    if (
      (lower.includes('sữa') && lower.includes('trứng')) ||
      lower.includes('ovo_lacto') ||
      lower.includes('lacto_ovo')
    ) {
      return 'ovo_lacto';
    }
    if (lower.includes('sữa') || lower.includes('lacto')) return 'lacto';
    if (lower.includes('trứng') || lower.includes('ovo')) return 'ovo';
    return lower;
  }

  // difficulty: enum Difficulty = easy/medium/hard.
  // Không map được thì giữ nguyên để service báo rõ danh sách hợp lệ.
  private normalizeDifficulty(val?: string): string {
    if (!val) return '';
    const lower = String(val).toLowerCase().trim();
    if (!lower) return '';
    if (lower.includes('dễ') || lower.includes('easy')) return 'easy';
    if (lower.includes('khó') || lower.includes('hard')) return 'hard';
    if (lower.includes('trung bình') || lower.includes('medium')) return 'medium';
    return lower;
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