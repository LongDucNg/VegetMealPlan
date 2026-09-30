import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import { RecipeImportService } from './recipe-import.service';
import { ImportRecipeRow } from './dto/import-recipe-row.dto';

// Day la controller dau tien dung JwtAuthGuard + RolesGuard that su (cac TODO
// tu dau du an) - dung lam mau cho cac module khac gan Admin-only guard.
@ApiTags('recipe-import')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('admin/recipe-imports')
export class RecipeImportController {
  constructor(private readonly recipeImportService: RecipeImportService) {}

  // TODO: nhan file .xlsx that qua multer (@UseInterceptors(FileInterceptor('file')))
  // roi parse bang thu vien 'xlsx'/'exceljs' thanh ImportRecipeRow[] truoc khi goi
  // importRows. Hien tai endpoint nhan thang JSON da parse san de test truoc.
  @Post()
  import(@Req() req: any, @Body() body: { file_name: string; rows: ImportRecipeRow[] }) {
    return this.recipeImportService.importRows(req.user.user_id, body.file_name, body.rows);
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
