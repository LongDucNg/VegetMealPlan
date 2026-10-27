import { DataSource } from 'typeorm';
import { HealthGoal } from '../../modules/health-goal/entities/health-goal.entity';
import { HEALTH_GOAL_DEFINITIONS } from '../../modules/health-goal/health-goal.service';

/** Master data nhỏ: mục tiêu sức khoẻ. Chạy lại an toàn (bỏ qua dòng đã có). */
export async function seedMasterData(ds: DataSource) {
  const repo = ds.getRepository(HealthGoal);
  let added = 0;
  for (const g of HEALTH_GOAL_DEFINITIONS) {
    if (!(await repo.findOne({ where: { name: g.name } }))) {
      await repo.save(repo.create({ ...g }));
      added++;
    }
  }
  console.log(`✅ Master data: thêm ${added} health_goals (đã có ${HEALTH_GOAL_DEFINITIONS.length - added}).`);
}
