import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPhotoScanUsageActionType1793100000000 implements MigrationInterface {
  name = 'AddPhotoScanUsageActionType1793100000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."usage_quotas_action_type_enum" ADD VALUE IF NOT EXISTS 'PHOTO_SCAN'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // PostgreSQL không hỗ trợ DROP VALUE trực tiếp từ enum type mà cần tạo lại type.
    // Giữ nguyên để tránh rủi ro mất toàn vẹn dữ liệu trong rollback.
  }
}
