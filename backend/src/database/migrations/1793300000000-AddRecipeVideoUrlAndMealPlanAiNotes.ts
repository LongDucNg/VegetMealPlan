import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRecipeVideoUrlAndMealPlanAiNotes1793300000000 implements MigrationInterface {
  name = 'AddRecipeVideoUrlAndMealPlanAiNotes1793300000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "recipes" ADD COLUMN IF NOT EXISTS "video_url" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "meal_plans" ADD COLUMN IF NOT EXISTS "ai_cookability_notes" text`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "meal_plans" DROP COLUMN IF EXISTS "ai_cookability_notes"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recipes" DROP COLUMN IF EXISTS "video_url"`,
    );
  }
}

