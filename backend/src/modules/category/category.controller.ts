import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { Public } from '../../common/decorators/public.decorator';

// Đọc danh mục công khai (FE dùng cho bộ lọc). Ghi/sửa/xoá nằm ở AdminCategoryController (/admin/categories).
@ApiTags('categories')
@Public()
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.findOne(id);
  }
}
