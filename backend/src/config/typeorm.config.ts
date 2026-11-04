import { DataSource, DataSourceOptions } from 'typeorm';
import { config as loadEnv } from 'dotenv';
import { resolve } from 'path';
import { buildPostgresOptions } from './database.config';

// Nạp .env từ thư mục backend (thư mục chứa package.json) để lệnh migration
// vẫn đọc đúng config dù chạy từ thư mục khác.
loadEnv({ path: resolve(__dirname, '..', '..', '.env') });

// Datasource dùng cho TypeORM CLI (migration:generate / migration:run).
// App runtime lấy config qua ConfigService trong app.module.ts, không import file này.
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  // DATABASE_URL (DB deploy) hoặc DB_HOST/DB_NAME... (DB local); SSL và synchronize theo database.config.ts.
  ...buildPostgresOptions((key) => process.env[key]),
  entities: [__dirname + '/../modules/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  // CLI (migration, seed, script ảnh) không bao giờ tự sửa schema: chỉ đi qua migration.
  synchronize: false,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
