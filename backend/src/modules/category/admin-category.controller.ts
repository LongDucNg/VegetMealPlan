import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserRole } from '../users/entities/user.entity';

// Quản lý danh mục cho Admin (hợp đồng API: /admin/categories). Đọc công khai vẫn ở GET /categories.
@ApiTags('admin-categories')
@ApiBearerAuth()
@Roles(UserRole.ADMIN)
@Controller('admin/categories')
export class AdminCategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOperation({ summary: 'Admin: danh sách danh mục' })
  findAll() {
    return this.categoryService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Admin: tạo danh mục mới' })
  create(@Body() dto: CreateCategoryDto, @CurrentUser('user_id') adminId: number) {
    return this.categoryService.create(dto, adminId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Admin: cập nhật danh mục' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCategoryDto) {
    return this.categoryService.update(id, dto);
  }

  // TRƯỚC ĐÂY: xoá xong trả 200 kèm body rỗng/null, FE phải đoán là thành công hay không.
  // Giờ: 204 No Content, đúng quy ước xoá thành công của dự án.
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Admin: xoá danh mục' })
  @ApiResponse({ status: 204, description: 'Xoá thành công, không có nội dung trả về' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.remove(id);
  }
}
