import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Phiên đăng nhập cho logout và refresh token.
 * Token cũ (phát hành trước migration này, không có `sid`) sẽ bị từ chối: user chỉ cần đăng nhập lại.
 */
export class AddUserSessions1791700000000 implements MigrationInterface {
  name = 'AddUserSessions1791700000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "user_sessions" (
        "session_id" uuid NOT NULL,
        "user_id" integer NOT NULL,
        "refresh_token_hash" character varying(64) NOT NULL,
        "previous_token_hash" character varying(64),
        "expires_at" TIMESTAMP NOT NULL,
        "revoked_at" TIMESTAMP,
        "user_agent" character varying(255),
        "ip" character varying(64),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "last_used_at" TIMESTAMP,
        CONSTRAINT "PK_user_sessions" PRIMARY KEY ("session_id"),
        CONSTRAINT "FK_user_sessions_user" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE
      )
    `);
    await queryRunner.query(`CREATE UNIQUE INDEX IF NOT EXISTS "UQ_user_sessions_refresh_hash" ON "user_sessions" ("refresh_token_hash")`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_user_sessions_previous_hash" ON "user_sessions" ("previous_token_hash")`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_user_sessions_user_id" ON "user_sessions" ("user_id")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "user_sessions"`);
  }
}
