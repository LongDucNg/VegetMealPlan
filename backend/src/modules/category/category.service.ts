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

  private async findDuplicate(
    categoryName: string,
    categoryType: string | undefined,
    excludeId?: number,
  ): Promise<Category | null> {
    const name = this.normalize(categoryName);
    // categories.category_type nullable: so sánh undefined (DTO không gửi) với
    // null (giá trị lưu trong DB) phải được quy về cùng một giá trị, nếu không
    // sẽ bỏ sót trường hợp trùng tên ở các danh mục chưa gán loại.
    const type = categoryType ?? null;
    const all = await this.categoryRepo.find();
    return (
      all.find(
        (c) =>
          this.normalize(c.category_name) === name &&
          (c.category_type ?? null) === type &&
          (excludeId === undefined || c.category_id !== excludeId),
      ) ?? null
    );
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

    const duplicate = await this.findDuplicate(name, dto.category_type);
    if (duplicate) {
      throw new ConflictException({
        code: ErrorCode.CATEGORY_NAME_DUPLICATE,
        message: 'Danh mục với tên này đã tồn tại trong cùng loại',
      });
    }

    const category = this.categoryRepo.create({
      ...dto,
      category_name: name,
      created_by: adminId,
    });
    return await this.categoryRepo.save(category);
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
    const category = await this.findOne(category_id);

    // Loại đích sau khi update. Nếu chỉ đổi category_type (không gửi lại tên)
    // thì tên mới vẫn là tên cũ -> phải kiểm tra trùng theo loại MỚI.
    const nextType = dto.category_type ?? category.category_type;
    const nextName =
      dto.category_name !== undefined
        ? dto.category_name.trim()
        : category.category_name;

    const duplicate = await this.findDuplicate(nextName, nextType, category_id);
    if (duplicate) {
      throw new ConflictException({
        code: ErrorCode.CATEGORY_NAME_DUPLICATE,
        message: 'Danh mục với tên này đã tồn tại trong cùng loại',
      });
    }

    // Đổi loại của danh mục đang được công thức dùng sẽ phá vỡ quy ước
    // "1 công thức = 1 recipe_type + 1 food_type" (món sẽ mất hoặc có 2 danh mục
    // cùng loại). Chặn lại thay vì để dữ liệu lệch.
    if (dto.category_type !== undefined && dto.category_type !== category.category_type) {
      const linked = await this.recipeCategoryRepo.count({
        where: { category_id },
      });
      if (linked > 0) {
        throw new ConflictException({
          code: ErrorCode.CATEGORY_TYPE_INVALID,
          message:
            'Không thể đổi loại danh mục đang được công thức sử dụng. ' +
            'Hãy gỡ danh mục khỏi các công thức trước.',
        });
      }
    }

    // Ghi entity thật (findOne trả về object đã map kèm recipe_count).
    const entity = await this.categoryRepo.findOne({ where: { category_id } });
    if (!entity) {
      throw new NotFoundException({
        code: ErrorCode.CATEGORY_NOT_FOUND,
        message: `Không tìm thấy danh mục #${category_id}`,
      });
    }

    if (dto.category_name !== undefined) {
      entity.category_name = nextName;
    }
    if (dto.description !== undefined) entity.description = dto.description;
    if (dto.category_type !== undefined) entity.category_type = dto.category_type;
    if (dto.status !== undefined) entity.status = dto.status;

    return this.categoryRepo.save(entity);
  }

  async remove(category_id: number): Promise<void> {
    // findOne ném 404 nếu danh mục không tồn tại.
    await this.findOne(category_id);
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
    const entity = await this.categoryRepo.findOne({ where: { category_id } });
    if (!entity) {
      throw new NotFoundException({
        code: ErrorCode.CATEGORY_NOT_FOUND,
        message: `Không tìm thấy danh mục #${category_id}`,
      });
    }

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
