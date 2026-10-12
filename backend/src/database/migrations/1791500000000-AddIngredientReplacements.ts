import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIngredientReplacements1791500000000
  implements MigrationInterface
{
  name = 'AddIngredientReplacements1791500000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "ingredient_replacements" (
        "replacement_id" SERIAL NOT NULL,
        "original_ingredient_id" integer NOT NULL,
        "replacement_ingredient_id" integer NOT NULL,
        "ratio" character varying(500) NOT NULL,
        "reason" character varying(500) NOT NULL,
        "applicable_when" character varying(500) NOT NULL,
        "note" character varying(500) NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_a24cb98832ee4984f3db94302b9" PRIMARY KEY ("replacement_id"),
        CONSTRAINT "FK_bd1dacc01f54fc5d60e39fcb951" FOREIGN KEY ("original_ingredient_id")
          REFERENCES "ingredients"("ingredient_id") ON DELETE CASCADE ON UPDATE NO ACTION,
        CONSTRAINT "FK_2ee6c7323ef65195ffffd3fd312" FOREIGN KEY ("replacement_ingredient_id")
          REFERENCES "ingredients"("ingredient_id") ON DELETE CASCADE ON UPDATE NO ACTION
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "ingredient_replacements"`);
  }
}
