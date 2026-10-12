import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRecipeReviewReason1791100000000
  implements MigrationInterface
{
  name = 'AddRecipeReviewReason1791100000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "recipes"
      ADD COLUMN "review_reason" text
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "recipes"
      DROP COLUMN "review_reason"
    `);
  }
}