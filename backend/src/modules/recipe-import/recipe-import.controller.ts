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
import { PositiveIntPipe } from './dto/validators/positive-int.pipe';
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
          'Sheet Excel không có dữ liệu',
        );
      }

      rows = data.map((row, index) => {
        const rowNumber = index + 2; // dòng 1 là header
        let ingredients: ImportIngredientRow[];
        let row_error: string | undefined;

        try {
          const value = row.ingredients || row.ingredients_json;

          ingredients =
            typeof value === 'string'
              ? JSON.parse(value)
              : value;

          if (!Array.isArray(ingredients)) {
            throw new Error();
          }

          // Mỗi phần tử phải là object có ingredient_name; phần tử rỗng/null bị loại
          // để dòng đó thành FAILED thay vì làm hỏng cả lô import.
          ingredients = ingredients.filter(
            (item) =>
              item &&
              typeof item === 'object' &&
              !Array.isArray(item),
          );
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
            ? String(row.description)
            : undefined,
          instructions: String(row.instructions || '').trim(),
          prep_time: this.toPositiveNumber(row.prep_time),
          cook_time: this.toPositiveNumber(row.cook_time),
          servings: this.toPositiveNumber(row.servings),
          difficulty: row.difficulty
            ? String(row.difficulty).trim()
            : undefined,
          // meal_type và diet_type là bắt buộc: giữ chuỗi rỗng khi thiếu để
          // service báo rõ "Thiếu field bắt buộc" thay vì tự gán mặc định.
          meal_type: String(row.meal_type ?? '').trim(),
          suitable_meals: row.suitable_meals
            ? String(row.suitable_meals)
            : undefined,
          diet_type: String(row.diet_type ?? '').trim(),
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
        'Không đọc được file Excel. Vui lòng kiểm tra định dạng file và dữ liệu.',
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