import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProfileAllergies1791200000000 implements MigrationInterface {
  name = 'AddProfileAllergies1791200000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "profile_allergies" (
        "profile_id" integer NOT NULL,
        "ingredient_id" integer NOT NULL,
        CONSTRAINT "PK_profile_allergies" PRIMARY KEY ("profile_id", "ingredient_id"),
        CONSTRAINT "FK_profile_allergies_profile" FOREIGN KEY ("profile_id")
          REFERENCES "meal_plan_profiles"("profile_id") ON DELETE CASCADE,
        CONSTRAINT "FK_profile_allergies_ingredient" FOREIGN KEY ("ingredient_id")
          REFERENCES "ingredients"("ingredient_id") ON DELETE CASCADE
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "profile_allergies"`);
  }
}
