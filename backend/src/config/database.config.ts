/**
 * Cấu hình kết nối PostgreSQL dùng chung cho app (app.module.ts) và lệnh CLI (migration, seed, script ảnh).
 *
 * Hai cách khai báo:
 *   - DB local: DB_HOST / DB_PORT / DB_USERNAME / DB_PASSWORD / DB_NAME (như trước).
 *   - DB deploy (Neon...): DATABASE_URL=postgresql://user:pass@host/db?sslmode=require. Có DATABASE_URL thì
 *     dùng nó, bỏ qua các biến DB_* ở trên. DB không phải local thì mặc định bật SSL (Neon bắt buộc).
 *
 * Mẹo: muốn chạy migration/seed lên DB deploy mà không sửa .env, đặt DATABASE_URL tạm trong cửa sổ terminal
 * (PowerShell: $env:DATABASE_URL="..."). Biến môi trường thật luôn được ưu tiên hơn file .env.
 */

export type EnvReader = (key: string) => string | undefined;

const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '::1', 'host.docker.internal']);

export interface DatabaseTarget {
  host: string;
  database: string;
  isLocal: boolean;
  /** "host/database", không có mật khẩu: dùng để in log. */
  label: string;
}

export interface PostgresConnectionOptions {
  url?: string;
  host?: string;
  port?: number;
  username?: string;
  password?: string;
  database?: string;
  ssl: boolean | { rejectUnauthorized: boolean };
  synchronize: boolean;
}

const trimmed = (env: EnvReader, key: string) => env(key)?.trim() || undefined;

/** DB đang trỏ tới (đọc từ DATABASE_URL hoặc DB_HOST/DB_NAME). */
export function describeDatabase(env: EnvReader): DatabaseTarget {
  const url = trimmed(env, 'DATABASE_URL');
  let host = trimmed(env, 'DB_HOST') ?? 'localhost';
  let database = trimmed(env, 'DB_NAME') ?? '';
  if (url) {
    try {
      const parsed = new URL(url);
      host = parsed.hostname;
      database = decodeURIComponent(parsed.pathname.replace(/^\//, ''));
    } catch {
      throw new Error('DATABASE_URL không đúng định dạng postgresql://user:password@host/database');
    }
  }
  return { host, database, isLocal: LOCAL_HOSTS.has(host.toLowerCase()), label: `${host}/${database}` };
}

/** Thiếu biến nào để kết nối được (tên biến, không in giá trị). */
export function missingDatabaseEnv(env: EnvReader): string[] {
  if (trimmed(env, 'DATABASE_URL')) return [];
  return ['DB_HOST', 'DB_PORT', 'DB_USERNAME', 'DB_PASSWORD', 'DB_NAME'].filter((key) => !trimmed(env, key));
}

export function buildPostgresOptions(env: EnvReader): PostgresConnectionOptions {
  const target = describeDatabase(env);
  const sslFlag = trimmed(env, 'DB_SSL');
  // SSL: theo DB_SSL nếu có khai báo; không khai báo thì DB deploy bật, DB local tắt.
  const ssl = sslFlag ? sslFlag === 'true' : !target.isLocal;
  // synchronize tự sửa bảng theo entity của nhánh đang chạy (có thể XOÁ cột kèm dữ liệu):
  // chỉ cho phép trên DB local, DB dùng chung luôn đi qua migration.
  const synchronize = trimmed(env, 'DB_SYNCHRONIZE') === 'true' && target.isLocal;

  const url = trimmed(env, 'DATABASE_URL');
  if (url) return { url, ssl, synchronize };
  return {
    host: target.host,
    port: Number(trimmed(env, 'DB_PORT')) || 5432,
    username: trimmed(env, 'DB_USERNAME'),
    password: env('DB_PASSWORD'),
    database: target.database,
    ssl,
    synchronize,
  };
}

/**
 * Chặn xoá dữ liệu nhầm DB dùng chung: SEED_RESET=true trên DB không phải local chỉ chạy khi
 * SEED_RESET_CONFIRM bằng đúng tên database (phải cố ý gõ tên mới xoá được).
 */
export function assertSeedResetAllowed(env: EnvReader): void {
  const target = describeDatabase(env);
  if (target.isLocal) return;
  if (trimmed(env, 'SEED_RESET_CONFIRM') === target.database) return;
  throw new Error(
    `Từ chối SEED_RESET trên DB không phải local (${target.label}): lệnh này xoá sạch công thức và nguyên liệu ` +
      `của cả nhóm. Nếu chắc chắn, chạy lại kèm SEED_RESET_CONFIRM=${target.database}.`,
  );
}
