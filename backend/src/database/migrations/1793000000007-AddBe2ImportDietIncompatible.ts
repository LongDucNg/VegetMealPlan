import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * BE2 - Import công thức: thêm lý do lỗi "nguyên liệu không tương thích
 * với chế độ ăn chay" (DIET_INCOMPATIBLE).
 *
 * Nội dung:
 *   1. Thêm giá trị 'DIET_INCOMPATIBLE' vào enum
 *      recipe_import_items_fail_reason_enum.
 *
 * Bối cảnh:
 *   Trước đây khi Admin import công thức có nguyên liệu không phù hợp với
 *   diet_type (VD: món 'vegan' chứa thịt/cá), dòng đó vẫn được tạo thành công
 *   và gán trạng thái PENDING_REVIEW. Giờ dòng đó bị đánh dấu FAILED với lý do
 *   riêng để Admin biết chính xác nguyên liệu nào gây lỗi.
 *
 * Lưu ý: ADD VALUE cho enum không dùng được trong cùng transaction với
 * lệnh INSERT/UPDATE sử dụng giá trị mới, nên migration chỉ đổi schema,
 * không cập nhật dữ liệu cũ (dữ liệu cũ chỉ có 4 giá trị trước đó).
 *
 * Rollback: NO-OP (không xoá enum value để tránh mất dữ liệu lỗi đã ghi).
 */
export class AddBe2ImportDietIncompatible1793000000007
  implements MigrationInterface
{
  name = 'AddBe2ImportDietIncompatible1793000000007';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE recipe_import_items_fail_reason_enum ADD VALUE IF NOT EXISTS 'DIET_INCOMPATIBLE'`,
    );
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {
    // NO-OP — không xoá enum value để tránh mất dữ liệu các dòng đã bị
    // đánh dấu lỗi DIET_INCOMPATIBLE.
  }
}
