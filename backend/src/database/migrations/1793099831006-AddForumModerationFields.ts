import { MigrationInterface, QueryRunner } from "typeorm";

export class AddForumModerationFields1793099831006 implements MigrationInterface {
    name = 'AddForumModerationFields1793099831006'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blogs" ADD "is_flagged" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "blogs" ADD "flag_reason" text`);
        await queryRunner.query(`ALTER TABLE "blogs" ADD "reject_reason" text`);
        await queryRunner.query(`ALTER TABLE "blogs" ADD "reviewed_by" integer`);
        await queryRunner.query(`ALTER TABLE "blogs" ADD "reviewed_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "blogs" ADD CONSTRAINT "FK_5cee9cc2d33c297bc820fef282f" FOREIGN KEY ("reviewed_by") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blogs" DROP CONSTRAINT "FK_5cee9cc2d33c297bc820fef282f"`);
        await queryRunner.query(`ALTER TABLE "blogs" DROP COLUMN "reviewed_at"`);
        await queryRunner.query(`ALTER TABLE "blogs" DROP COLUMN "reviewed_by"`);
        await queryRunner.query(`ALTER TABLE "blogs" DROP COLUMN "reject_reason"`);
        await queryRunner.query(`ALTER TABLE "blogs" DROP COLUMN "flag_reason"`);
        await queryRunner.query(`ALTER TABLE "blogs" DROP COLUMN "is_flagged"`);
    }

}
