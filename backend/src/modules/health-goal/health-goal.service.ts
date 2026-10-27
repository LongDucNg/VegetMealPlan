import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HealthGoal } from './entities/health-goal.entity';

/**
 * Danh sách mục tiêu sức khoẻ chuẩn.
 *
 * Đây là "master data" — bảng `health_goals` chỉ chứa 3 dòng này. Giữ hằng số
 * ở code để:
 *   - frontend luôn có danh sách mục tiêu để chọn, kể cả khi bảng còn trống;
 *   - `current_goal_id` trong hồ sơ luôn trỏ tới một dòng có thật.
 */
export const HEALTH_GOAL_DEFINITIONS = [
  { name: 'lose_weight', description: 'Giảm cân' },
  { name: 'gain_muscle', description: 'Tăng cơ' },
  { name: 'maintain', description: 'Duy trì cân nặng' },
] as const;

export type HealthGoalName = (typeof HEALTH_GOAL_DEFINITIONS)[number]['name'];

@Injectable()
export class HealthGoalService {
  private readonly logger = new Logger(HealthGoalService.name);

  constructor(
    @InjectRepository(HealthGoal)
    private readonly goalRepo: Repository<HealthGoal>,
  ) {}

  /**
   * Đảm bảo bảng `health_goals` có đủ 3 mục tiêu chuẩn.
   *
   * Chạy lại an toàn (idempotent): dòng đã có thì bỏ qua, không xoá gì.
   * Dùng để tự khởi tạo dữ liệu tối thiểu khi bảng bị trống (ví dụ môi trường
   * dev mới, hoặc ai đó xoá nhầm) — không cần migration.
   */
  async ensureMasterData(): Promise<void> {
    const existing = await this.goalRepo.find();
    const existingNames = new Set(existing.map((g) => g.name));

    const missing = HEALTH_GOAL_DEFINITIONS.filter(
      (g) => !existingNames.has(g.name),
    );

    if (missing.length === 0) return;

    await this.goalRepo.save(
      missing.map((g) => this.goalRepo.create({ ...g })),
    );

    this.logger.log(
      `Đã tự khởi tạo ${missing.length} mục tiêu sức khoẻ còn thiếu: ${missing
        .map((g) => g.name)
        .join(', ')}`,
    );
  }

  /** Danh sách mục tiêu cho frontend chọn. Tự khởi tạo nếu bảng đang trống. */
  async findAll(): Promise<HealthGoal[]> {
    const goals = await this.goalRepo.find({ order: { goal_id: 'ASC' } });

    if (goals.length === 0) {
      await this.ensureMasterData();
      return this.goalRepo.find({ order: { goal_id: 'ASC' } });
    }

    return goals;
  }

  /**
   * Tìm mục tiêu theo tên ('lose_weight' | 'gain_muscle' | 'maintain').
   *
   * Tự lành: nếu bảng `health_goals` đang TRỐNG (dev mới chưa seed, hoặc bị
   * xoá nhầm) thì khởi tạo master data rồi thử lại. Nhờ vậy lời gọi này
   * không bao giờ trả về "không tìm thấy" chỉ vì bảng chưa có dữ liệu.
   */
  async findByName(name: string): Promise<HealthGoal | null> {
    const found = await this.goalRepo.findOne({ where: { name } });
    if (found) return found;

    // Bảng có dữ liệu nhưng không có tên này -> đúng là mục tiêu không tồn tại.
    if ((await this.goalRepo.count()) > 0) return null;

    await this.ensureMasterData();
    return this.goalRepo.findOne({ where: { name } });
  }
}
