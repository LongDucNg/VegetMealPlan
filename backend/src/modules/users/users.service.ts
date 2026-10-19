import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, IsNull, Repository, DataSource } from 'typeorm';
import { ActivityLevel, BmiCategory, DietType, User, UserRole, UserStatus } from './entities/user.entity';
import { HealthGoal } from '../health-goal/entities/health-goal.entity';
import { UserAllergy } from '../ingredient/entities/user-allergy.entity';
import { Ingredient } from '../ingredient/entities/ingredient.entity';
import { UserSession } from '../auth/entities/user-session.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateAllergiesDto } from './dto/update-allergies.dto';
import { ALLERGEN_GROUPS } from './allergen-groups';
import { ErrorCode } from '../../common/constants/error-codes.enum';
import { bmiGoalWarnings, ExplanationStep, fmt, goalLabel, goalProgress, NutritionWarning } from './nutrition-advice';

const ACTIVITY_FACTOR: Record<ActivityLevel, number> = {
  [ActivityLevel.SEDENTARY]: 1.2,
  [ActivityLevel.LIGHT]: 1.375,
  [ActivityLevel.MODERATE]: 1.55,
  [ActivityLevel.ACTIVE]: 1.725,
};

const ACTIVITY_LABEL: Record<ActivityLevel, string> = {
  [ActivityLevel.SEDENTARY]: 'ít vận động',
  [ActivityLevel.LIGHT]: 'vận động nhẹ',
  [ActivityLevel.MODERATE]: 'vận động vừa',
  [ActivityLevel.ACTIVE]: 'vận động nhiều',
};

// Tỉ lệ calo theo bữa (tổng = 1)
const MEAL_SPLIT = { breakfast: 0.25, lunch: 0.35, dinner: 0.3, snack: 0.1 };

const CALORIE_FLOOR = 1200;

/** Các trường hồ sơ bắt buộc để tính dinh dưỡng; thiếu thì FE nhắc "hãy cập nhật hồ sơ". */
const REQUIRED_PROFILE_FIELDS = ['age', 'gender', 'height_cm', 'weight_kg', 'activity_level'] as const;

const missingProfileFields = (u: User) => REQUIRED_PROFILE_FIELDS.filter((k) => !u[k]);

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(HealthGoal) private readonly goalRepo: Repository<HealthGoal>,
    @InjectRepository(UserAllergy) private readonly allergyRepo: Repository<UserAllergy>,
    @InjectRepository(Ingredient) private readonly ingredientRepo: Repository<Ingredient>,
    @InjectRepository(UserSession) private readonly sessionRepo: Repository<UserSession>,
    private readonly dataSource: DataSource,
  ) {}

  async findOne(user_id: number): Promise<User> {
    const user = await this.userRepo.findOne({ where: { user_id }, relations: ['current_goal'] });
    if (!user) throw new NotFoundException({ code: ErrorCode.USER_NOT_FOUND, message: `Không tìm thấy người dùng #${user_id}` });
    return user;
  }

  /** Hồ sơ đầy đủ của user (không có password_hash). */
  async getProfile(user_id: number) {
    const user = await this.findOne(user_id);
    const { password_hash, ...safe } = user;
    const missing = missingProfileFields(user);
    return {
      ...safe,
      is_premium: !!user.premium_until && user.premium_until > new Date(),
      // FE dùng 2 trường này để nhắc "hãy cập nhật hồ sơ" sau khi đăng ký (đăng ký không bắt nhập chỉ số cơ thể).
      profile_complete: missing.length === 0,
      missing_profile_fields: missing,
      allergies_declared: !!user.allergies_declared_at,
      allergies: await this.getAllergies(user_id),
    };
  }

  /** Cập nhật hồ sơ; tính lại BMI ở server nếu height/weight đổi. */
  async updateProfile(user_id: number, dto: UpdateProfileDto) {
    const user = await this.findOne(user_id);

    if (dto.current_goal_id !== undefined) {
      const goal = await this.goalRepo.findOne({ where: { goal_id: dto.current_goal_id } });
      if (!goal) throw new BadRequestException({
          code: ErrorCode.USER_GOAL_NOT_FOUND,
          message: `Mục tiêu #${dto.current_goal_id} không tồn tại`,
        });
      user.current_goal_id = goal.goal_id;
      user.current_goal = goal;
    }
    if (dto.full_name !== undefined) user.full_name = dto.full_name;
    if (dto.age !== undefined) user.age = dto.age;
    if (dto.gender !== undefined) user.gender = dto.gender;
    if (dto.activity_level !== undefined) user.activity_level = dto.activity_level;
    if (dto.diet_type !== undefined) user.diet_type = dto.diet_type;
    if (dto.target_weight_kg !== undefined) user.target_weight_kg = dto.target_weight_kg;
    if (dto.target_date !== undefined) {
      if (dto.target_date !== null && dto.target_date <= todayIso()) {
        throw new BadRequestException({
          code: ErrorCode.USER_TARGET_DATE_INVALID,
          message: 'Ngày mục tiêu phải sau hôm nay',
        });
      }
      user.target_date = dto.target_date;
    }

    if (dto.height_cm !== undefined || dto.weight_kg !== undefined) {
      const height = dto.height_cm ?? user.height_cm;
      const weight = dto.weight_kg ?? user.weight_kg;
      if (!height || height <= 0 || !weight || weight <= 0) {
        throw new BadRequestException({
          code: ErrorCode.USER_BODY_METRICS_INVALID,
          message: 'Cần nhập đủ height_cm và weight_kg (> 0) để tính BMI',
        });
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
      if (found !== ids.size) throw new BadRequestException({
          code: ErrorCode.USER_ALLERGY_INGREDIENT_NOT_FOUND,
          message: 'Có ingredient_id không tồn tại',
        });
    }
    await this.allergyRepo.manager.transaction(async (m) => {
      await m.delete(UserAllergy, { user_id });
      if (ids.size) await m.insert(UserAllergy, [...ids].map((ingredient_id) => ({ user_id, ingredient_id })));
      // Đánh dấu đã khai báo, kể cả khi danh sách rỗng ("tôi không dị ứng gì").
      await m.update(User, { user_id }, { allergies_declared_at: new Date() });
    });
    return this.getAllergies(user_id);
  }

  /**
   * BMI, BMR (Mifflin-St Jeor), TDEE, calo mục tiêu theo mục tiêu sức khoẻ, macro và calo từng bữa.
   * Kèm `explanation` (từng bước tính ra con số) và `warnings` (khuyến cáo, KHÔNG chặn việc soạn thực đơn).
   * Đây là ƯỚC TÍNH tham khảo, không phải tư vấn y tế.
   */
  async getNutritionSummary(user_id: number) {
    const u = await this.findOne(user_id);
    const missing = missingProfileFields(u);
    if (missing.length) {
      throw new BadRequestException({
        code: ErrorCode.USER_PROFILE_INCOMPLETE,
        message: `Cần cập nhật hồ sơ trước: thiếu ${missing.join(', ')}`,
      });
    }

    const sexOffset = u.gender === 'male' ? 5 : u.gender === 'female' ? -161 : -78; // 'other': trung bình
    const bmr = 10 * u.weight_kg + 6.25 * u.height_cm - 5 * u.age + sexOffset;
    const activityFactor = ACTIVITY_FACTOR[u.activity_level];
    const tdee = bmr * activityFactor;

    const goalName = u.current_goal?.name ?? 'maintain';
    const factor = goalName === 'lose_weight' ? 0.85 : goalName === 'gain_muscle' ? 1.1 : 1;
    const proteinPerKg = goalName === 'lose_weight' ? 1.6 : goalName === 'gain_muscle' ? 1.8 : 1.2;
    const rawTarget = Math.round(tdee * factor);
    const target = Math.max(rawTarget, CALORIE_FLOOR); // sàn an toàn
    const floorApplied = rawTarget < CALORIE_FLOOR;

    const protein_g = Math.round(proteinPerKg * u.weight_kg);
    const fat_g = Math.round((target * 0.25) / 9);
    const carbs_g = Math.max(Math.round((target - protein_g * 4 - fat_g * 9) / 4), 0);

    const meal_calories = {
      breakfast: Math.round(target * MEAL_SPLIT.breakfast),
      lunch: Math.round(target * MEAL_SPLIT.lunch),
      dinner: Math.round(target * MEAL_SPLIT.dinner),
      snack: Math.round(target * MEAL_SPLIT.snack),
    };

    const explanation: ExplanationStep[] = [
      {
        step: 'BMR – năng lượng cơ thể tiêu hao khi nghỉ hoàn toàn (Mifflin-St Jeor)',
        formula: `10 × ${fmt(u.weight_kg, 1)} kg + 6,25 × ${fmt(u.height_cm, 1)} cm − 5 × ${u.age} tuổi ${sexOffset >= 0 ? '+' : '−'} ${Math.abs(sexOffset)} (${u.gender === 'male' ? 'nam' : u.gender === 'female' ? 'nữ' : 'giới tính khác, lấy trung bình'})`,
        result: Math.round(bmr),
        unit: 'kcal/ngày',
      },
      {
        step: 'TDEE – tổng năng lượng tiêu hao mỗi ngày',
        formula: `BMR × ${fmt(activityFactor, 3)} (${ACTIVITY_LABEL[u.activity_level]})`,
        result: Math.round(tdee),
        unit: 'kcal/ngày',
      },
      {
        step: 'Calo mục tiêu',
        formula:
          factor === 1
            ? `TDEE × 1 (duy trì: ăn bằng mức tiêu hao)`
            : `TDEE × ${fmt(factor, 2)} (${goalLabel(goalName)}: ${factor < 1 ? `ăn ít hơn ${Math.round((1 - factor) * 100)}%` : `ăn dư ${Math.round((factor - 1) * 100)}%`} so với mức tiêu hao)`,
        result: target,
        unit: 'kcal/ngày',
        note: floorApplied
          ? `Kết quả tính ra ${fmt(rawTarget)} kcal, thấp hơn mức sàn an toàn ${fmt(CALORIE_FLOOR)} kcal nên được nâng lên ${fmt(CALORIE_FLOOR)} kcal.`
          : undefined,
      },
      {
        step: 'Đạm (protein)',
        formula: `${fmt(proteinPerKg, 1)} g × ${fmt(u.weight_kg, 1)} kg cân nặng`,
        result: protein_g,
        unit: `g (≈ ${fmt(protein_g * 4)} kcal, 1 g đạm = 4 kcal)`,
      },
      {
        step: 'Chất béo (fat)',
        formula: `25% calo mục tiêu ÷ 9 (1 g béo = 9 kcal)`,
        result: fat_g,
        unit: `g (≈ ${fmt(fat_g * 9)} kcal)`,
      },
      {
        step: 'Tinh bột (carbs)',
        formula: `(calo mục tiêu − calo từ đạm − calo từ béo) ÷ 4 (1 g tinh bột = 4 kcal)`,
        result: carbs_g,
        unit: `g (≈ ${fmt(carbs_g * 4)} kcal)`,
      },
      {
        step: 'Chia calo theo bữa',
        formula: 'Sáng 25% · Trưa 35% · Tối 30% · Phụ 10%',
        result: target,
        unit: 'kcal/ngày',
      },
    ];

    const warnings: NutritionWarning[] = [...bmiGoalWarnings(u.bmi, u.bmi_category, goalName)];
    if (floorApplied) {
      warnings.push({
        code: 'CALORIE_FLOOR_APPLIED',
        message: `Calo mục tiêu đã được nâng lên mức tối thiểu ${fmt(CALORIE_FLOOR)} kcal/ngày. Ăn ít hơn mức này dễ thiếu chất.`,
      });
    }
    const target_goal = goalProgress(u.weight_kg, u.height_cm, goalName, u.target_weight_kg, u.target_date);
    warnings.push(...target_goal.warnings);

    return {
      bmi: u.bmi,
      bmi_category: u.bmi_category,
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      goal: goalName,
      target_calories: target,
      macros: { protein_g, carbs_g, fat_g },
      meal_calories,
      target_goal: target_goal.progress,
      warnings,
      explanation,
      note: 'Ước tính theo công thức Mifflin-St Jeor, chỉ mang tính tham khảo, không thay cho tư vấn y tế.',
    };
  }

  classifyBmi(bmi: number): BmiCategory {
    if (bmi < 18.5) return BmiCategory.UNDERWEIGHT;
    if (bmi < 25) return BmiCategory.NORMAL;
    if (bmi < 30) return BmiCategory.OVERWEIGHT;
    return BmiCategory.OBESE;
  }

  /** Lấy danh sách thành viên cho Admin kèm tìm kiếm và lọc trạng thái */
  async findMembers(search?: string, status?: string): Promise<User[]> {
    const qb = this.userRepo.createQueryBuilder('u').select([
      'u.user_id',
      'u.full_name',
      'u.email',
      'u.role',
      'u.status',
      'u.created_at',
    ]);
    if (search && search.trim()) {
      qb.andWhere('(u.full_name ILIKE :s OR u.email ILIKE :s)', { s: `%${search.trim()}%` });
    }
    if (status && status !== 'all') {
      const lower = status.toLowerCase();
      const dbStatus = lower === 'suspended' || lower === 'locked' ? UserStatus.LOCKED : UserStatus.ACTIVE;
      qb.andWhere('u.status = :status', { status: dbStatus });
    }
    qb.orderBy('u.user_id', 'ASC');
    return qb.getMany();
  }

  /**
   * Admin khóa / mở khóa tài khoản. Khóa thì thu hồi luôn mọi phiên đăng nhập của người đó
   * (bảng user_sessions), không chờ token hết hạn.
   */
  async updateMemberStatus(adminId: number, id: number, status: UserStatus) {
    this.assertNotSelf(adminId, id);
    const user = await this.findOne(id);
    user.status = status;
    await this.userRepo.save(user);
    if (status === UserStatus.LOCKED) {
      await this.sessionRepo.update({ user_id: id, revoked_at: IsNull() }, { revoked_at: new Date() });
    }
    return toMember(user);
  }

  /** Admin thăng / hạ vai trò. Có hiệu lực ngay vì JwtStrategy đọc role từ DB ở mỗi request. */
  async updateMemberRole(adminId: number, id: number, role: UserRole) {
    this.assertNotSelf(adminId, id);
    const user = await this.findOne(id);
    user.role = role;
    await this.userRepo.save(user);
    return toMember(user);
  }

  /**
   * Admin xóa vĩnh viễn tài khoản người dùng khỏi database.
   * Xóa sạch các dữ liệu liên quan trong transaction để không bị vi phạm ràng buộc Foreign Key.
   */
  async deleteMember(adminId: number, targetUserId: number) {
    if (adminId === targetUserId) {
      throw new BadRequestException({
        code: ErrorCode.USER_CANNOT_MODIFY_SELF,
        message: 'Không thể tự xóa tài khoản của chính mình',
      });
    }
    const user = await this.findOne(targetUserId);

    await this.dataSource.transaction(async (manager) => {
      // 1. Gỡ tham chiếu tác giả / người kiểm duyệt
      await manager.query(`UPDATE recipes SET approved_by = NULL WHERE approved_by = $1`, [targetUserId]);
      await manager.query(`UPDATE blogs SET approved_by = NULL WHERE approved_by = $1`, [targetUserId]);
      await manager.query(`UPDATE videos SET approved_by = NULL WHERE approved_by = $1`, [targetUserId]);
      await manager.query(`UPDATE categories SET created_by = NULL WHERE created_by = $1`, [targetUserId]);
      await manager.query(`UPDATE recipe_import_batches SET imported_by = NULL WHERE imported_by = $1`, [targetUserId]);

      // 2. Xóa các bảng phụ thuộc trực tiếp của user
      await manager.query(`DELETE FROM user_sessions WHERE user_id = $1`, [targetUserId]);
      await manager.query(`DELETE FROM notifications WHERE user_id = $1`, [targetUserId]);
      await manager.query(`DELETE FROM favorite_recipes WHERE user_id = $1`, [targetUserId]);
      await manager.query(`DELETE FROM user_recipe_prices WHERE user_id = $1`, [targetUserId]);
      await manager.query(`DELETE FROM user_ingredient_prices WHERE user_id = $1`, [targetUserId]);
      await manager.query(`DELETE FROM user_ingredients WHERE user_id = $1`, [targetUserId]);
      await manager.query(`DELETE FROM user_allergies WHERE user_id = $1`, [targetUserId]);
      await manager.query(`DELETE FROM votes WHERE user_id = $1`, [targetUserId]);
      await manager.query(`DELETE FROM comments WHERE user_id = $1`, [targetUserId]);
      await manager.query(`DELETE FROM chatbot_conversations WHERE user_id = $1`, [targetUserId]);

      // 3. Xóa gợi ý AI
      await manager.query(
        `DELETE FROM ai_recommendation_missing_ingredients WHERE recommendation_id IN (SELECT recommendation_id FROM ai_recommendations WHERE user_id = $1)`,
        [targetUserId]
      );
      await manager.query(`DELETE FROM ai_recommendations WHERE user_id = $1`, [targetUserId]);

      // 4. Xóa kế hoạch bữa ăn & hồ sơ mục tiêu
      await manager.query(`DELETE FROM meal_plans WHERE user_id = $1`, [targetUserId]);
      await manager.query(
        `DELETE FROM profile_allergies WHERE profile_id IN (SELECT profile_id FROM meal_plan_profiles WHERE user_id = $1)`,
        [targetUserId]
      );
      await manager.query(`DELETE FROM meal_plan_profiles WHERE user_id = $1`, [targetUserId]);

      // 5. Xóa gói hội viên & giao dịch
      await manager.query(`DELETE FROM subscriptions WHERE user_id = $1`, [targetUserId]);
      await manager.query(`DELETE FROM payment_transactions WHERE user_id = $1`, [targetUserId]);

      // 6. Xóa các nội dung do user tạo
      await manager.query(`DELETE FROM recipes WHERE created_by = $1`, [targetUserId]);
      await manager.query(`DELETE FROM blogs WHERE user_id = $1`, [targetUserId]);
      await manager.query(`DELETE FROM videos WHERE user_id = $1`, [targetUserId]);

      // 7. Xóa user khỏi bảng users
      await manager.query(`DELETE FROM users WHERE user_id = $1`, [targetUserId]);
    });

    return { success: true, message: `Đã xóa tài khoản #${targetUserId} (${user.email}) thành công` };
  }

  /** Không cho admin tự khóa hoặc tự hạ quyền chính mình (tránh hệ thống không còn admin nào). */
  private assertNotSelf(adminId: number, targetId: number) {
    if (adminId === targetId) {
      throw new BadRequestException({
        code: ErrorCode.USER_CANNOT_MODIFY_SELF,
        message: 'Không thể tự thay đổi trạng thái hoặc vai trò của chính mình',
      });
    }
  }

}

/** Chỉ trả các cột an toàn cho trang quản lý thành viên (không có password_hash, google_id). */
function toMember(user: User) {
  const { user_id, full_name, email, role, status, created_at } = user;
  return { user_id, full_name, email, role, status, created_at };
}

/** Ngày hôm nay theo giờ Việt Nam, dạng YYYY-MM-DD (để so với cột date). */
function todayIso() {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Ho_Chi_Minh' });
}
