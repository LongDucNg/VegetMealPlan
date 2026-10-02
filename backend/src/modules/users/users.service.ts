import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ActivityLevel, BmiCategory, DietType, User } from './entities/user.entity';
import { HealthGoal } from '../health-goal/entities/health-goal.entity';
import { UserAllergy } from '../ingredient/entities/user-allergy.entity';
import { Ingredient } from '../ingredient/entities/ingredient.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateAllergiesDto } from './dto/update-allergies.dto';
import { ALLERGEN_GROUPS } from './allergen-groups';

const ACTIVITY_FACTOR: Record<ActivityLevel, number> = {
  [ActivityLevel.SEDENTARY]: 1.2,
  [ActivityLevel.LIGHT]: 1.375,
  [ActivityLevel.MODERATE]: 1.55,
  [ActivityLevel.ACTIVE]: 1.725,
};

// Tỉ lệ calo theo bữa (tổng = 1)
const MEAL_SPLIT = { breakfast: 0.25, lunch: 0.35, dinner: 0.3, snack: 0.1 };

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(HealthGoal) private readonly goalRepo: Repository<HealthGoal>,
    @InjectRepository(UserAllergy) private readonly allergyRepo: Repository<UserAllergy>,
    @InjectRepository(Ingredient) private readonly ingredientRepo: Repository<Ingredient>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  async findOne(user_id: number): Promise<User> {
    const user = await this.userRepo.findOne({ where: { user_id }, relations: ['current_goal'] });
    if (!user) throw new NotFoundException(`User #${user_id} not found`);
    return user;
  }

  /** Hồ sơ đầy đủ của user (không có password_hash). */
  async getProfile(user_id: number) {
    const user = await this.findOne(user_id);
    const { password_hash, ...safe } = user;
    return {
      ...safe,
      is_premium: !!user.premium_until && user.premium_until > new Date(),
      allergies: await this.getAllergies(user_id),
    };
  }

  /** Cập nhật hồ sơ; tính lại BMI ở server nếu height/weight đổi. */
  async updateProfile(user_id: number, dto: UpdateProfileDto) {
    const user = await this.findOne(user_id);

    if (dto.current_goal_id !== undefined) {
      const goal = await this.goalRepo.findOne({ where: { goal_id: dto.current_goal_id } });
      if (!goal) throw new BadRequestException(`Mục tiêu #${dto.current_goal_id} không tồn tại`);
      user.current_goal_id = goal.goal_id;
      user.current_goal = goal;
    }
    if (dto.full_name !== undefined) user.full_name = dto.full_name;
    if (dto.age !== undefined) user.age = dto.age;
    if (dto.gender !== undefined) user.gender = dto.gender;
    if (dto.activity_level !== undefined) user.activity_level = dto.activity_level;
    if (dto.diet_type !== undefined) user.diet_type = dto.diet_type;

    if (dto.height_cm !== undefined || dto.weight_kg !== undefined) {
      const height = dto.height_cm ?? user.height_cm;
      const weight = dto.weight_kg ?? user.weight_kg;
      if (!height || height <= 0 || !weight || weight <= 0) {
        throw new BadRequestException('Cần nhập đủ height_cm và weight_kg (> 0) để tính BMI');
      }
      user.height_cm = height;
      user.weight_kg = weight;
      const m = height / 100;
      user.bmi = Number((weight / (m * m)).toFixed(2));
      user.bmi_category = this.classifyBmi(user.bmi);
      user.bmi_updated_at = new Date();
    }

    await this.userRepo.save(user);
    return this.getProfile(user_id);
  }

  /** Dị ứng hiện tại: danh sách ingredient + các nhóm được chọn đủ. */
  async getAllergies(user_id: number) {
    const rows = await this.allergyRepo.find({ where: { user_id } });
    const ids = rows.map((r) => r.ingredient_id);
    const ingredients = ids.length
      ? await this.ingredientRepo.find({ where: { ingredient_id: In(ids) }, select: ['ingredient_id', 'ingredient_name'] })
      : [];
    const idSet = new Set(ids);
    const groups = ALLERGEN_GROUPS.filter(
      (g) => g.ingredient_ids.length > 0 && g.ingredient_ids.every((i) => idSet.has(i)),
    ).map((g) => g.code);
    return { allergen_groups: groups, ingredients };
  }

  /** Thay toàn bộ dị ứng: nhóm dị ứng được ánh xạ sang ingredient_id rồi gộp với ingredient_ids. */
  async setAllergies(user_id: number, dto: UpdateAllergiesDto) {
    const ids = new Set<number>(dto.ingredient_ids ?? []);
    for (const code of dto.allergen_groups ?? []) {
      ALLERGEN_GROUPS.find((g) => g.code === code)?.ingredient_ids.forEach((i) => ids.add(i));
    }
    if (ids.size) {
      const found = await this.ingredientRepo.count({ where: { ingredient_id: In([...ids]) } });
      if (found !== ids.size) throw new BadRequestException('Có ingredient_id không tồn tại');
    }
    await this.allergyRepo.manager.transaction(async (m) => {
      await m.delete(UserAllergy, { user_id });
      if (ids.size) await m.insert(UserAllergy, [...ids].map((ingredient_id) => ({ user_id, ingredient_id })));
    });
    return this.getAllergies(user_id);
  }

  /**
   * BMI, BMR (Mifflin-St Jeor), TDEE, calo mục tiêu theo mục tiêu sức khoẻ, macro và calo từng bữa.
   * Đây là ƯỚC TÍNH tham khảo, không phải tư vấn y tế.
   */
  async getNutritionSummary(user_id: number) {
    const u = await this.findOne(user_id);
    const missing = ['age', 'gender', 'height_cm', 'weight_kg', 'activity_level'].filter((k) => !(u as any)[k]);
    if (missing.length) {
      throw new BadRequestException(`Cần cập nhật hồ sơ trước: thiếu ${missing.join(', ')}`);
    }

    const sexOffset = u.gender === 'male' ? 5 : u.gender === 'female' ? -161 : -78; // 'other': trung bình
    const bmr = 10 * u.weight_kg + 6.25 * u.height_cm - 5 * u.age + sexOffset;
    const tdee = bmr * ACTIVITY_FACTOR[u.activity_level];

    const goalName = u.current_goal?.name ?? 'maintain';
    const factor = goalName === 'lose_weight' ? 0.85 : goalName === 'gain_muscle' ? 1.1 : 1;
    const proteinPerKg = goalName === 'lose_weight' ? 1.6 : goalName === 'gain_muscle' ? 1.8 : 1.2;
    const target = Math.max(Math.round(tdee * factor), 1200); // sàn an toàn

    const protein_g = Math.round(proteinPerKg * u.weight_kg);
    const fat_g = Math.round((target * 0.25) / 9);
    const carbs_g = Math.max(Math.round((target - protein_g * 4 - fat_g * 9) / 4), 0);

    return {
      bmi: u.bmi,
      bmi_category: u.bmi_category,
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      goal: goalName,
      target_calories: target,
      macros: { protein_g, carbs_g, fat_g },
      meal_calories: {
        breakfast: Math.round(target * MEAL_SPLIT.breakfast),
        lunch: Math.round(target * MEAL_SPLIT.lunch),
        dinner: Math.round(target * MEAL_SPLIT.dinner),
        snack: Math.round(target * MEAL_SPLIT.snack),
      },
      note: 'Ước tính theo công thức Mifflin-St Jeor, chỉ mang tính tham khảo.',
    };
  }

  classifyBmi(bmi: number): BmiCategory {
    if (bmi < 18.5) return BmiCategory.UNDERWEIGHT;
    if (bmi < 25) return BmiCategory.NORMAL;
    if (bmi < 30) return BmiCategory.OVERWEIGHT;
    return BmiCategory.OBESE;
  }
}
