import { dataSourceOptions } from '../../config/typeorm.config';
import { DataSource } from 'typeorm';
import { seedMasterData } from './seed-master-data';
import { seedVegetarianData } from './seed-vegetarian-data';
import { seedAdmin } from './seed-admin';
import { applyRecipeImages } from '../scripts/apply-recipe-images';
import { describeDatabase } from '../../config/database.config';

/**
 * Seed dữ liệu: mục tiêu sức khoẻ, nguyên liệu + 628 món chay, tài khoản admin (nếu khai báo
 * SEED_ADMIN_EMAIL/SEED_ADMIN_PASSWORD) và ảnh món từ recipe-images.json.
 * Chạy: npm run seed (sau khi đã migration:run). Chạy lại an toàn: phần nào đã có thì bỏ qua.
 */
async function runSeed() {
  const dataSource = new DataSource(dataSourceOptions);
  await dataSource.initialize();

  console.log(`🌱 Bắt đầu seed vào ${describeDatabase((key) => process.env[key]).label}...`);
  try {
    await seedMasterData(dataSource);
    await seedVegetarianData(dataSource);
    await seedAdmin(dataSource);
    // Gắn ảnh món từ recipe-images.json (không đè ảnh tự tải lên), để seed xong là web có ảnh ngay.
    const withImage = await applyRecipeImages(dataSource);
    console.log(`✅ Ảnh món: gắn/cập nhật ${withImage} món.`);
  } finally {
    await dataSource.destroy();
  }
}

runSeed().catch((err) => {
  console.error('Seed thất bại:', err);
  process.exit(1);
});
