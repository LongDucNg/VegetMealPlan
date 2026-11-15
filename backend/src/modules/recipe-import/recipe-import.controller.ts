import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, MulterModuleOptions } from '@nestjs/platform-express';
import { ApiTags, ApiBearerAuth, ApiConsumes, ApiBody, ApiOperation } from '@nestjs/swagger';

import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserRole } from '../users/entities/user.entity';
import { PositiveIntPipe } from '../../common/pipes/positive-int.pipe';
import { RecipeImportService } from './recipe-import.service';
import { RecipeExcelParser, UploadedExcelFile } from './recipe-excel.parser';

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

/**
 * Controller chỉ nhận request: kiểm quyền admin (guard toàn cục + @Roles), nhận file,
 * giao việc đọc Excel cho RecipeExcelParser và việc lưu DB cho RecipeImportService.
 */
@ApiTags('recipe-import')
@ApiBearerAuth()
@Roles(UserRole.ADMIN)
@Controller('admin/recipe-imports')
export class RecipeImportController {
  constructor(
    private readonly recipeImportService: RecipeImportService,
    private readonly excelParser: RecipeExcelParser,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: MAX_FILE_SIZE,
      },
    } as MulterModuleOptions),
  )
  @ApiOperation({ summary: 'Admin: nhập công thức từ file Excel (.xlsx/.xlsm, đọc sheet đầu tiên)' })
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
    @CurrentUser('user_id') userId: number,
    @UploadedFile() file: UploadedExcelFile,
  ) {
    const rows = await this.excelParser.parse(file);
    return this.recipeImportService.importRows(userId, file.originalname, rows);
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
