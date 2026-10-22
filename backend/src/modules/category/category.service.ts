import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ErrorCode } from '../../common/constants/error-codes.enum';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  create(dto: CreateCategoryDto, adminId: number): Promise<Category> {
    const category = this.categoryRepo.create({ ...dto, created_by: adminId });
    return this.categoryRepo.save(category);
  }

  async findAll(): Promise<any[]> {
    const rawCategories = await this.categoryRepo
      .createQueryBuilder('category')
      .leftJoin('recipe_categories', 'rc', 'rc.category_id = category.category_id')
      .select([
        'category.category_id AS category_id',
        'category.category_name AS category_name',
        'category.description AS description',
        'category.category_type AS category_type',
        'category.status AS status',
        'category.created_by AS created_by',
        'category.created_at AS created_at',
        'category.updated_at AS updated_at',
      ])
      .addSelect('COUNT(rc.recipe_id)::int', 'recipe_count')
      .groupBy('category.category_id')
      .orderBy('category.category_id', 'ASC')
      .getRawMany();

    return rawCategories.map((row) => ({
      category_id: row.category_id,
      category_name: row.category_name,
      description: row.description,
      category_type: row.category_type,
      status: row.status,
      created_by: row.created_by,
      created_at: row.created_at,
      updated_at: row.updated_at,
      recipe_count: Number(row.recipe_count || 0),
    }));
  }

  async findOne(category_id: number): Promise<any> {
    const row = await this.categoryRepo
      .createQueryBuilder('category')
      .leftJoin('recipe_categories', 'rc', 'rc.category_id = category.category_id')
      .select([
        'category.category_id AS category_id',
        'category.category_name AS category_name',
        'category.description AS description',
        'category.category_type AS category_type',
        'category.status AS status',
        'category.created_by AS created_by',
        'category.created_at AS created_at',
        'category.updated_at AS updated_at',
      ])
      .addSelect('COUNT(rc.recipe_id)::int', 'recipe_count')
      .where('category.category_id = :category_id', { category_id })
      .groupBy('category.category_id')
      .getRawOne();

    if (!row) {
      throw new NotFoundException({
        code: ErrorCode.CATEGORY_NOT_FOUND,
        message: `Không tìm thấy danh mục #${category_id}`,
      });
    }

    return {
      category_id: row.category_id,
      category_name: row.category_name,
      description: row.description,
      category_type: row.category_type,
      status: row.status,
      created_by: row.created_by,
      created_at: row.created_at,
      updated_at: row.updated_at,
      recipe_count: Number(row.recipe_count || 0),
    };
  }

  async update(category_id: number, dto: UpdateCategoryDto): Promise<Category> {
    const category = await this.categoryRepo.findOne({ where: { category_id } });
    if (!category) {
      throw new NotFoundException({
        code: ErrorCode.CATEGORY_NOT_FOUND,
        message: `Không tìm thấy danh mục #${category_id}`,
      });
    }
    Object.assign(category, dto);
    return this.categoryRepo.save(category);
  }

  async remove(category_id: number): Promise<void> {
    const category = await this.categoryRepo.findOne({ where: { category_id } });
    if (!category) {
      throw new NotFoundException({
        code: ErrorCode.CATEGORY_NOT_FOUND,
        message: `Không tìm thấy danh mục #${category_id}`,
      });
    }
    await this.categoryRepo.remove(category);
  }
}
