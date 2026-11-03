import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDailyMealPlanType1793400000000 implements MigrationInterface {
  name = 'AddDailyMealPlanType1793400000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."meal_plans_plan_type_enum" ADD VALUE IF NOT EXISTS 'daily'`,
    );
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {
    // Enum values cannot be removed in PostgreSQL without recreating the type
  }
}

