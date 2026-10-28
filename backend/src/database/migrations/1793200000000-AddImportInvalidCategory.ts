import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Import công thức: thêm lý do lỗi INVALID_CATEGORY (danh mục không tồn tại, sai loại,
 * đã ngừng dùng, hoặc chọn quá 1 nhóm món / 1 loại món).
 * Chỉ thêm giá trị enum; rollback để trống vì PostgreSQL không xoá được giá trị enum an toàn.
 */
export class AddImportInvalidCategory1793200000000 implements MigrationInterface {
  name = 'AddImportInvalidCategory1793200000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE recipe_import_items_fail_reason_enum ADD VALUE IF NOT EXISTS 'INVALID_CATEGORY'`,
    );
  }

  public async down(): Promise<void> {
    // NO-OP: giữ giá trị enum để không làm hỏng các dòng lỗi đã ghi.
  }
}
