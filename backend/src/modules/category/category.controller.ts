import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { Public } from '../../common/decorators/public.decorator';
import { PositiveIntPipe } from '../../common/pipes/positive-int.pipe';

// Đọc danh mục công khai (FE dùng cho bộ lọc). Ghi/sửa/xoá nằm ở AdminCategoryController (/admin/categories).
@ApiTags('categories')
@Public()
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOperation({ summary: 'Danh sách danh mục món ăn (công khai)' })
  @ApiQuery({
    name: 'type',
    required: false,
    description: 'Lọc theo loại: recipe (mặc định cho món ăn), forum, all, recipe_type, food_type',
  })
  findAll(@Query('type') type?: string) {
    // Mặc định cho endpoint công khai /categories là lấy danh mục món ăn (loại trừ diễn đàn)
    return this.categoryService.findAll(type ?? 'recipe');
  }

  @Get(':id')
  @ApiOperation({ summary: 'Chi tiết một danh mục (công khai)' })
  findOne(@Param('id', PositiveIntPipe) id: number) {
    return this.categoryService.findOne(id);
  }
}
