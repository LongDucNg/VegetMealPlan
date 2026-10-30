import { assertSeedResetAllowed, buildPostgresOptions, describeDatabase, missingDatabaseEnv } from './database.config';

const envOf = (vars: Record<string, string>) => (key: string) => vars[key];

const LOCAL = { DB_HOST: 'localhost', DB_PORT: '5432', DB_USERNAME: 'postgres', DB_PASSWORD: 'pw', DB_NAME: 'vegetmealplan' };
const NEON_URL = 'postgresql://owner:secret@ep-cool-name-123.ap-southeast-1.aws.neon.tech/vegetmealplan?sslmode=require';

describe('Cấu hình DB: local và deploy (Neon)', () => {
  it('DB local: dùng DB_HOST/DB_NAME, không SSL', () => {
    expect(buildPostgresOptions(envOf(LOCAL))).toEqual({
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pw',
      database: 'vegetmealplan',
      ssl: false,
      synchronize: false,
    });
    expect(describeDatabase(envOf(LOCAL))).toMatchObject({ isLocal: true, label: 'localhost/vegetmealplan' });
  });

  it('có DATABASE_URL: dùng URL, bỏ qua DB_*, tự bật SSL, nhận diện là DB không phải local', () => {
    const env = envOf({ ...LOCAL, DATABASE_URL: NEON_URL });
    expect(buildPostgresOptions(env)).toEqual({ url: NEON_URL, ssl: true, synchronize: false });
    const target = describeDatabase(env);
    expect(target).toMatchObject({ isLocal: false, database: 'vegetmealplan' });
    // Nhãn in ra log không chứa mật khẩu.
    expect(target.label).not.toContain('secret');
  });

  it('DB_SSL ép bật/tắt được', () => {
    expect(buildPostgresOptions(envOf({ ...LOCAL, DB_SSL: 'true' })).ssl).toBe(true);
    expect(buildPostgresOptions(envOf({ DATABASE_URL: NEON_URL, DB_SSL: 'false' })).ssl).toBe(false);
  });

  it('DB_SYNCHRONIZE=true chỉ có tác dụng với DB local (DB dùng chung có thể bị xoá cột)', () => {
    expect(buildPostgresOptions(envOf({ ...LOCAL, DB_SYNCHRONIZE: 'true' })).synchronize).toBe(true);
    expect(buildPostgresOptions(envOf({ DATABASE_URL: NEON_URL, DB_SYNCHRONIZE: 'true' })).synchronize).toBe(false);
    expect(buildPostgresOptions(envOf({ ...LOCAL, DB_HOST: '10.0.0.5', DB_SYNCHRONIZE: 'true' })).synchronize).toBe(false);
  });

  it('báo thiếu biến theo tên; có DATABASE_URL thì không cần DB_*', () => {
    expect(missingDatabaseEnv(envOf({ DB_HOST: 'localhost' }))).toEqual(['DB_PORT', 'DB_USERNAME', 'DB_PASSWORD', 'DB_NAME']);
    expect(missingDatabaseEnv(envOf({ DATABASE_URL: NEON_URL }))).toEqual([]);
  });

  it('DATABASE_URL sai định dạng -> báo lỗi rõ ràng', () => {
    expect(() => describeDatabase(envOf({ DATABASE_URL: 'not a url' }))).toThrow('DATABASE_URL không đúng định dạng');
  });
});

describe('SEED_RESET trên DB dùng chung', () => {
  it('DB local: cho phép', () => {
    expect(() => assertSeedResetAllowed(envOf(LOCAL))).not.toThrow();
  });

  it('DB deploy: từ chối nếu không xác nhận đúng tên database', () => {
    expect(() => assertSeedResetAllowed(envOf({ DATABASE_URL: NEON_URL }))).toThrow('SEED_RESET_CONFIRM=vegetmealplan');
    expect(() => assertSeedResetAllowed(envOf({ DATABASE_URL: NEON_URL, SEED_RESET_CONFIRM: 'yes' }))).toThrow();
    expect(() =>
      assertSeedResetAllowed(envOf({ DATABASE_URL: NEON_URL, SEED_RESET_CONFIRM: 'vegetmealplan' })),
    ).not.toThrow();
  });
});
