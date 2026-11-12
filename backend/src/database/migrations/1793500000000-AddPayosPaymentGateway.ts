import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPayosPaymentGateway1793500000000 implements MigrationInterface {
  name = 'AddPayosPaymentGateway1793500000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."payment_transactions_gateway_enum" ADD VALUE IF NOT EXISTS 'PAYOS'`,
    );
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {
    // Enum values cannot be removed in PostgreSQL without recreating the type
  }
}

