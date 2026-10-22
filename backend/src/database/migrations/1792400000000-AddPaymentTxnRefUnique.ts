import { MigrationInterface, QueryRunner } from 'typeorm';

/** Mã đơn hàng gửi VNPay (gateway_txn_ref) phải duy nhất để IPN tra đúng một giao dịch. */
export class AddPaymentTxnRefUnique1792400000000 implements MigrationInterface {
  name = 'AddPaymentTxnRefUnique1792400000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE UNIQUE INDEX IF NOT EXISTS "UQ_payment_transactions_txn_ref" ON "payment_transactions" ("gateway_txn_ref")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IF EXISTS "UQ_payment_transactions_txn_ref"`);
  }
}
