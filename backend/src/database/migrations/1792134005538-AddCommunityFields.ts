import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCommunityFields1792134005538 implements MigrationInterface {
    name = 'AddCommunityFields1792134005538'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blogs" ADD "tags" text array NOT NULL DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "blogs" ADD "views" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "blogs" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "videos" ADD "tags" text array NOT NULL DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "videos" ADD "views" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "videos" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`CREATE UNIQUE INDEX "UQ_votes_user_content" ON "votes" ("user_id", "content_type", "content_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_comments_content" ON "comments" ("content_type", "content_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_comments_content"`);
        await queryRunner.query(`DROP INDEX "public"."UQ_votes_user_content"`);
        await queryRunner.query(`ALTER TABLE "videos" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "videos" DROP COLUMN "views"`);
        await queryRunner.query(`ALTER TABLE "videos" DROP COLUMN "tags"`);
        await queryRunner.query(`ALTER TABLE "blogs" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "blogs" DROP COLUMN "views"`);
        await queryRunner.query(`ALTER TABLE "blogs" DROP COLUMN "tags"`);
    }

}
