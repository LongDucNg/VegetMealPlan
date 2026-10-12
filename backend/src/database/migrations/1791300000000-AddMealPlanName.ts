import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMealPlanName1791300000000 implements MigrationInterface {
  name = 'AddMealPlanName1791300000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "meal_plans" ADD COLUMN "name" varchar(100)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "meal_plans" DROP COLUMN "name"`);
  }
}
