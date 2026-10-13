import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Đăng nhập Google:
 * - users.google_id: "sub" của Google, unique (một tài khoản Google ứng với một user).
 * - users.password_hash cho phép null: user tạo bằng Google không có mật khẩu.
 */
export class AddUserGoogleLogin1791600000000 implements MigrationInterface {
  name = 'AddUserGoogleLogin1791600000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "google_id" character varying`);
    await queryRunner.query(`CREATE UNIQUE INDEX IF NOT EXISTS "UQ_users_google_id" ON "users" ("google_id")`);
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password_hash" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Lưu ý: SET NOT NULL sẽ lỗi nếu đã có user chỉ đăng nhập bằng Google (password_hash = null).
    // Khi đó phải xử lý các user đó trước rồi mới revert.
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password_hash" SET NOT NULL`);
    await queryRunner.query(`DROP INDEX IF EXISTS "UQ_users_google_id"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN IF EXISTS "google_id"`);
  }
}
