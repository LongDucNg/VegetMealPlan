import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserIngredient } from './entities/user-ingredient.entity';
import { CreateUserIngredientDto } from './dto/create-user-ingredient.dto';
import { Ingredient } from '../ingredient/entities/ingredient.entity';
import { UserAllergy } from '../ingredient/entities/user-allergy.entity';
import { User } from '../users/entities/user.entity';
import { checkIngredientDietViolation } from '../../common/utils/diet.util';

@Injectable()
export class UserIngredientService {
  constructor(
    @InjectRepository(UserIngredient)
    private readonly repo: Repository<UserIngredient>,

    @InjectRepository(Ingredient)
    private readonly ingredientRepo: Repository<Ingredient>,

    @InjectRepository(UserAllergy)
    private readonly allergyRepo: Repository<UserAllergy>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) { }

  findAllByUser(user_id: number): Promise<UserIngredient[]> {
    return this.repo.find({ where: { user_id }, relations: ['ingredient'] });
  }

  /**
   * Thêm nguyên liệu vào kho của user.
   *
   * Kiểm tra theo thứ tự:
   * 1. Nguyên liệu phải tồn tại.
   * 2. Nguyên liệu không nằm trong danh sách dị ứng của user.
   * 3. Nguyên liệu phải tương thích với chế độ ăn chay của user (diet_type).
   *    - Thịt / cá / hải sản (vegan_flag=false hoặc tên khớp regex): chặn với MỌI chế độ ăn chay.
   *    - Trứng: chặn với vegan và lacto; cho phép với ovo và ovo_lacto.
   *    - Sữa & chế phẩm: chặn với vegan và ovo; cho phép với lacto và ovo_lacto.
   *    - Nếu user chưa thiết lập diet_type: không kiểm tra (bỏ qua).
   */
  async create(user_id: number, dto: CreateUserIngredientDto): Promise<UserIngredient> {
    // 1. Kiểm tra nguyên liệu tồn tại
    const ingredient = await this.ingredientRepo.findOne({
      where: { ingredient_id: dto.ingredient_id },
    });
    if (!ingredient) {
      throw new NotFoundException(
        `Không tìm thấy nguyên liệu #${dto.ingredient_id} trong hệ thống.`,
      );
    }

    // 2. Kiểm tra nguyên liệu có trong danh sách dị ứng của user không
    const allergy = await this.allergyRepo.findOne({
      where: { user_id, ingredient_id: dto.ingredient_id },
    });
    if (allergy) {
      throw new BadRequestException(
        `Nguyên liệu "${ingredient.ingredient_name}" nằm trong danh sách dị ứng của bạn — ` +
        `không thể thêm vào kho. Nếu muốn dùng, hãy cập nhật lại hồ sơ dị ứng trước.`,
      );
    }

    // 3. Kiểm tra tương thích với chế độ ăn chay
    const user = await this.userRepo.findOne({ where: { user_id } });
    const dietViolation = checkIngredientDietViolation(
      ingredient.ingredient_name,
      ingredient.vegan_flag,
      user?.diet_type ?? null,
    );
    if (dietViolation) {
      throw new BadRequestException(dietViolation);
    }

    const entity = this.repo.create({ ...dto, user_id });
    return this.repo.save(entity);
  }

  async remove(user_id: number, user_ingredient_id: number): Promise<void> {
    const entity = await this.repo.findOne({ where: { user_ingredient_id, user_id } });
    if (!entity) {
      throw new NotFoundException('Không tìm thấy nguyên liệu này trong kho của bạn');
    }
    await this.repo.delete({ user_ingredient_id });
  }

  /** Trả về mảng ingredient_id user đang có — RecommendationService dùng cái này làm input. */
  async getAvailableIngredientIds(user_id: number): Promise<number[]> {
    const rows = await this.repo.find({ where: { user_id } });
    return rows.map((r) => r.ingredient_id);
  }
}