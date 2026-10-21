import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * BE2 - Import công thức: hỗ trợ trạng thái "skipped" khi trùng tên.
 *
 * Nội dung:
 *   1. Thêm giá trị 'skipped' vào enum recipe_import_items_status_enum.
 *   2. Thêm giá trị 'DUPLICATE_TITLE' vào enum recipe_import_items_fail_reason_enum.
 *   3. Thêm cột recipe_import_batches.skipped_count (default 0).
 *
 * Lưu ý: ADD VALUE cho enum không dùng được trong cùng transaction với
 * lệnh INSERT/UPDATE sử dụng giá trị mới, nên migration chỉ đổi schema,
 * không cập nhật dữ liệu cũ (dữ liệu cũ chỉ có success/failed).
 *
 * Rollback: NO-OP (không xoá enum value để tránh mất dữ liệu skipped).
 */
export class FixBe2ImportSkipped1793000000004 implements MigrationInterface {
  name = 'FixBe2ImportSkipped1793000000004';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE recipe_import_items_status_enum ADD VALUE IF NOT EXISTS 'skipped'`,
    );

    await queryRunner.query(
      `ALTER TYPE recipe_import_items_fail_reason_enum ADD VALUE IF NOT EXISTS 'DUPLICATE_TITLE'`,
    );

    await queryRunner.query(
      `ALTER TABLE recipe_import_batches ADD COLUMN IF NOT EXISTS skipped_count integer NOT NULL DEFAULT 0`,
    );
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {
    // NO-OP — không xoá enum value để tránh mất dữ liệu các dòng đã bị skipped.
  }
}
