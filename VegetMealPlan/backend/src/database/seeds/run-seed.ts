import { dataSourceOptions } from '../../config/typeorm.config';
import { DataSource } from 'typeorm';

/**
 * Seed data cơ bản để cả team có cùng dataset khi dev local.
 * Chạy: npm run seed (sau khi đã migration:run).
 *
 * TODO mỗi bạn tự thêm seed cho module mình phụ trách, ví dụ:
 *   - Dev phụ trách HealthGoal: seed 3 dòng lose_weight/gain_muscle/maintain
 *   - Dev phụ trách Category: seed vài category food_type/recipe_type mẫu
 */
async function runSeed() {
  const dataSource = new DataSource(dataSourceOptions);
  await dataSource.initialize();

  console.log('🌱 Seeding chưa có dữ liệu mẫu — thêm seed của bạn ở đây.');

  await dataSource.destroy();
}

runSeed().catch((err) => {
  console.error('Seed thất bại:', err);
  process.exit(1);
});
