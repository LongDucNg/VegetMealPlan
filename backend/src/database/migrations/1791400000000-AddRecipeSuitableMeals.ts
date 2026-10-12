import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRecipeSuitableMeals1791400000000
  implements MigrationInterface
{
  name = 'AddRecipeSuitableMeals1791400000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "recipes"
      ADD COLUMN IF NOT EXISTS "suitable_meals" character varying(100)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "recipes"
      DROP COLUMN IF EXISTS "suitable_meals"
    `);
  }
}
