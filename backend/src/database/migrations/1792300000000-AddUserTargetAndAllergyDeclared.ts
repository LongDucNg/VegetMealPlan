import { MigrationInterface, QueryRunner } from 'typeorm';

/** Mục tiêu cụ thể (cân nặng muốn đạt, hạn) và mốc user đã khai báo dị ứng. */
export class AddUserTargetAndAllergyDeclared1792300000000 implements MigrationInterface {
  name = 'AddUserTargetAndAllergyDeclared1792300000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "target_weight_kg" double precision`);
    await queryRunner.query(`ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "target_date" date`);
    await queryRunner.query(`ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "allergies_declared_at" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN IF EXISTS "allergies_declared_at"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN IF EXISTS "target_date"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN IF EXISTS "target_weight_kg"`);
  }
}
