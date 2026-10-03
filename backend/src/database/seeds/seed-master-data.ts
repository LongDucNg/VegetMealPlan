import { DataSource } from 'typeorm';
import { HealthGoal } from '../../modules/health-goal/entities/health-goal.entity';

/** Master data nhỏ: mục tiêu sức khoẻ. Chạy lại an toàn (bỏ qua dòng đã có). */
export async function seedMasterData(ds: DataSource) {
  const repo = ds.getRepository(HealthGoal);
  const goals = [
    { name: 'lose_weight', description: 'Giảm cân' },
    { name: 'gain_muscle', description: 'Tăng cơ' },
    { name: 'maintain', description: 'Duy trì cân nặng' },
  ];
  let added = 0;
  for (const g of goals) {
    if (!(await repo.findOne({ where: { name: g.name } }))) {
      await repo.save(repo.create(g));
      added++;
    }
  }
  console.log(`✅ Master data: thêm ${added} health_goals (đã có ${goals.length - added}).`);
}
