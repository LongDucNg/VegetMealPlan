import { MigrationInterface, QueryRunner } from "typeorm";

export class AddVideoFields1792732128964 implements MigrationInterface {
    name = 'AddVideoFields1792732128964'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "videos" ADD "thumbnail_url" character varying`);
        await queryRunner.query(`ALTER TABLE "videos" ADD "description" text`);
        await queryRunner.query(`ALTER TABLE "videos" ADD "duration" character varying`);
        await queryRunner.query(`ALTER TABLE "videos" ADD "cuisine" character varying`);
        await queryRunner.query(`ALTER TABLE "videos" ADD "difficulty" character varying`);
        await queryRunner.query(`ALTER TABLE "videos" ADD "ingredients" jsonb NOT NULL DEFAULT '[]'`);
        await queryRunner.query(`ALTER TABLE "videos" ADD "steps" jsonb NOT NULL DEFAULT '[]'`);
        await queryRunner.query(`ALTER TABLE "videos" ADD "kcal" integer`);
        await queryRunner.query(`ALTER TABLE "videos" ADD "servings" integer DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "videos" ADD "is_flagged" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "videos" ADD "flag_reason" text`);
        await queryRunner.query(`ALTER TABLE "videos" ADD "reject_reason" text`);
        await queryRunner.query(`ALTER TABLE "videos" ADD "reviewed_by" integer`);
        await queryRunner.query(`ALTER TABLE "videos" ADD "reviewed_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "videos" ADD CONSTRAINT "FK_1cda1585b969b5c0993586a0617" FOREIGN KEY ("reviewed_by") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "videos" DROP CONSTRAINT "FK_1cda1585b969b5c0993586a0617"`);
        await queryRunner.query(`ALTER TABLE "videos" DROP COLUMN "reviewed_at"`);
        await queryRunner.query(`ALTER TABLE "videos" DROP COLUMN "reviewed_by"`);
        await queryRunner.query(`ALTER TABLE "videos" DROP COLUMN "reject_reason"`);
        await queryRunner.query(`ALTER TABLE "videos" DROP COLUMN "flag_reason"`);
        await queryRunner.query(`ALTER TABLE "videos" DROP COLUMN "is_flagged"`);
        await queryRunner.query(`ALTER TABLE "videos" DROP COLUMN "servings"`);
        await queryRunner.query(`ALTER TABLE "videos" DROP COLUMN "kcal"`);
        await queryRunner.query(`ALTER TABLE "videos" DROP COLUMN "steps"`);
        await queryRunner.query(`ALTER TABLE "videos" DROP COLUMN "ingredients"`);
        await queryRunner.query(`ALTER TABLE "videos" DROP COLUMN "difficulty"`);
        await queryRunner.query(`ALTER TABLE "videos" DROP COLUMN "cuisine"`);
        await queryRunner.query(`ALTER TABLE "videos" DROP COLUMN "duration"`);
        await queryRunner.query(`ALTER TABLE "videos" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "videos" DROP COLUMN "thumbnail_url"`);
    }

}
