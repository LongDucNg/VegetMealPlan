import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserRecipePrices1791000000000
  implements MigrationInterface
{
  name = 'AddUserRecipePrices1791000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "user_recipe_prices" (
        "user_id" integer NOT NULL,
        "recipe_id" integer NOT NULL,
        "actual_price" double precision NOT NULL,
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_user_recipe_prices"
          PRIMARY KEY ("user_id", "recipe_id")
      )
    `);

    await queryRunner.query(`
      ALTER TABLE "user_recipe_prices"
      ADD CONSTRAINT "FK_user_recipe_prices_user"
      FOREIGN KEY ("user_id")
      REFERENCES "users"("user_id")
      ON DELETE CASCADE
      ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      ALTER TABLE "user_recipe_prices"
      ADD CONSTRAINT "FK_user_recipe_prices_recipe"
      FOREIGN KEY ("recipe_id")
      REFERENCES "recipes"("recipe_id")
      ON DELETE CASCADE
      ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "user_recipe_prices"
      DROP CONSTRAINT "FK_user_recipe_prices_recipe"
    `);

    await queryRunner.query(`
      ALTER TABLE "user_recipe_prices"
      DROP CONSTRAINT "FK_user_recipe_prices_user"
    `);

    await queryRunner.query(`
      DROP TABLE "user_recipe_prices"
    `);
  }
}