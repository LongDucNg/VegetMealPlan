import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Xác thực email khi đăng ký: thêm users.email_verified_at.
 * Tài khoản đã có từ trước coi như đã xác thực (lấy mốc created_at) để không ai bị khoá ngoài sau khi chạy migration.
 */
export class AddUserEmailVerified1793100000000 implements MigrationInterface {
  name = 'AddUserEmailVerified1793100000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "email_verified_at" TIMESTAMP`);
    await queryRunner.query(
      `UPDATE "users" SET "email_verified_at" = COALESCE("created_at", now()) WHERE "email_verified_at" IS NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN IF EXISTS "email_verified_at"`);
  }
}
