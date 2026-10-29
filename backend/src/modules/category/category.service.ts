import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { RecipeCategory } from '../recipe/entities/recipe-category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ErrorCode } from '../../common/constants/error-codes.enum';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
    @InjectRepository(RecipeCategory)
    private readonly recipeCategoryRepo: Repository<RecipeCategory>,
  ) {}

  private normalize(str: string): string {
    return str.trim().toLowerCase();
  }

  private notFound(category_id: number): NotFoundException {
    return new NotFoundException({
      code: ErrorCode.CATEGORY_NOT_FOUND,
      message: `Không tìm thấy danh mục #${category_id}`,
    });
  }

  /**
   * Trùng tên trong cùng loại. Lọc theo loại ngay trong SQL (chỉ lấy id + tên), so tên ở JS
   * để giữ đúng cách so hoa/thường tiếng Việt, không phụ thuộc collation của Postgres.
   * category_type nullable: DTO không gửi (undefined) được coi như NULL trong DB.
   */
  private async findDuplicate(
    categoryName: string,
    categoryType: string | undefined | null,
    excludeId?: number,
  ): Promise<Pick<Category, 'category_id' | 'category_name'> | null> {
    const name = this.normalize(categoryName);
    const qb = this.categoryRepo
      .createQueryBuilder('c')
      .select(['c.category_id', 'c.category_name']);
    if (categoryType == null) qb.where('c.category_type IS NULL');
    else qb.where('c.category_type = :type', { type: categoryType });
    if (excludeId !== undefined) qb.andWhere('c.category_id <> :excludeId', { excludeId });

    const sameType = await qb.getMany();
    return sameType.find((c) => this.normalize(c.category_name) === name) ?? null;
  }

  private assertNoDuplicate(duplicate: unknown): void {
    if (duplicate) {
      throw new ConflictException({
        code: ErrorCode.CATEGORY_NAME_DUPLICATE,
        message: 'Danh mục với tên này đã tồn tại trong cùng loại',
      });
    }
  }

  async create(dto: CreateCategoryDto, adminId: number): Promise<Category> {
    const name = dto.category_name?.trim();

    // Chặn tên rỗng ở tầng service (DTO đã chặn sẵn, nhưng service có thể
    // được gọi trực tiếp từ module khác).
    if (!name) {
      throw new BadRequestException({
        code: ErrorCode.VALIDATION_FAILED,
        message: 'Tên danh mục không được để trống',
      });
    }

    this.assertNoDuplicate(await this.findDuplicate(name, dto.category_type));

    const category = this.categoryRepo.create({
      ...dto,
      category_name: name,
      created_by: adminId,
    });
    return await this.categoryRepo.save(category);
  }

  /** Danh mục kèm số công thức đang dùng (findAll / findOne dùng chung). */
  private withRecipeCount() {
    return this.categoryRepo
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
      .groupBy('category.category_id');
  }

  private toView(row: any) {
    return { ...row, recipe_count: Number(row.recipe_count || 0) };
  }

  async findAll(): Promise<any[]> {
    const rows = await this.withRecipeCount().orderBy('category.category_id', 'ASC').getRawMany();
    return rows.map((row) => this.toView(row));
  }

  async findOne(category_id: number): Promise<any> {
    const row = await this.withRecipeCount()
      .where('category.category_id = :category_id', { category_id })
      .getRawOne();
    if (!row) throw this.notFound(category_id);
    return this.toView(row);
  }

  async update(category_id: number, dto: UpdateCategoryDto): Promise<Category> {
    const entity = await this.categoryRepo.findOne({ where: { category_id } });
    if (!entity) throw this.notFound(category_id);

    // Loại đích sau khi update. Nếu chỉ đổi category_type (không gửi lại tên)
    // thì tên mới vẫn là tên cũ -> phải kiểm tra trùng theo loại MỚI.
    const nextType = dto.category_type ?? entity.category_type;
    const nextName = dto.category_name !== undefined ? dto.category_name.trim() : entity.category_name;
    this.assertNoDuplicate(await this.findDuplicate(nextName, nextType, category_id));

    // Đổi loại của danh mục đang được công thức dùng sẽ phá vỡ quy ước
    // "1 công thức = 1 recipe_type + 1 food_type" (món sẽ mất hoặc có 2 danh mục
    // cùng loại). Chặn lại thay vì để dữ liệu lệch.
    if (dto.category_type !== undefined && dto.category_type !== entity.category_type) {
      const linked = await this.recipeCategoryRepo.count({ where: { category_id } });
      if (linked > 0) {
        throw new ConflictException({
          code: ErrorCode.CATEGORY_TYPE_INVALID,
          message:
            'Không thể đổi loại danh mục đang được công thức sử dụng. ' +
            'Hãy gỡ danh mục khỏi các công thức trước.',
        });
      }
    }

    if (dto.category_name !== undefined) entity.category_name = nextName;
    if (dto.description !== undefined) entity.description = dto.description;
    if (dto.category_type !== undefined) entity.category_type = dto.category_type;
    if (dto.status !== undefined) entity.status = dto.status;

    return this.categoryRepo.save(entity);
  }

  async remove(category_id: number): Promise<void> {
    const entity = await this.categoryRepo.findOne({ where: { category_id } });
    if (!entity) throw this.notFound(category_id);

    const linked = await this.recipeCategoryRepo.count({ where: { category_id } });
    if (linked > 0) {
      throw new ConflictException({
        code: ErrorCode.CATEGORY_IN_USE,
        message: 'Không thể xóa danh mục vì đang có công thức sử dụng',
      });
    }

    // Ngoài recipe_categories, bảng blogs và videos cũng có FK tới categories
    // (ON DELETE mặc định = NO ACTION). Nếu danh mục còn được dùng ở đó,
    // Postgres ném lỗi 23503 -> HTTP 500. Bắt lại thành 409 cho nhất quán.
    try {
      await this.categoryRepo.remove(entity);
    } catch (error) {
      if ((error as any)?.code === '23503') {
        throw new ConflictException({
          code: ErrorCode.CATEGORY_IN_USE,
          message: 'Không thể xóa danh mục vì đang được nội dung khác sử dụng',
        });
      }
      throw error;
    }
  }
}
