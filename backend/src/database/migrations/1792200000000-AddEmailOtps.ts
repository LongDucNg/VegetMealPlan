import { MigrationInterface, QueryRunner } from 'typeorm';

/** Bảng mã OTP gửi qua email (hiện dùng cho quên mật khẩu). */
export class AddEmailOtps1792200000000 implements MigrationInterface {
  name = 'AddEmailOtps1792200000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "email_otps" (
        "otp_id" SERIAL NOT NULL,
        "email" character varying(255) NOT NULL,
        "code_hash" character varying(64) NOT NULL,
        "purpose" character varying(30) NOT NULL,
        "expires_at" TIMESTAMP NOT NULL,
        "attempts" integer NOT NULL DEFAULT 0,
        "consumed_at" TIMESTAMP,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_email_otps" PRIMARY KEY ("otp_id")
      )
    `);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_email_otps_email_purpose" ON "email_otps" ("email", "purpose")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "email_otps"`);
  }
}
