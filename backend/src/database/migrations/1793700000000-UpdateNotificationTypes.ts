import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateNotificationTypes1793700000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Cho phép lưu các loại notification mới hoặc chuyển type sang varchar nếu cần
    await queryRunner.query(`ALTER TABLE "notifications" ALTER COLUMN "type" TYPE character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Không cần rollback
  }
}

