import { DataSource, DataSourceOptions } from 'typeorm';
import { config as loadEnv } from 'dotenv';

loadEnv();

// Datasource dùng cho TypeORM CLI (migration:generate / migration:run).
// App runtime lấy config qua ConfigService trong app.module.ts, không import file này.
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'vegetmealplan',
  entities: [__dirname + '/../modules/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  synchronize: false, // LUÔN false ngoài local dev nhanh — dùng migration để mọi người cùng schema
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
