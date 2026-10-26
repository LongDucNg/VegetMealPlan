import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Thêm lại cột recipes.suitable_meals.
 *
 * Lý do: cột này đã tồn tại trong DB (migration AddRecipeSuitableMeals đã chạy
 * trên database) nhưng lại bị gỡ khỏi code BE2 ở commit d6cf86f. Nhờ vậy
 * meals.meal_type ("lunch") bị dùng nhầm để lọc bữa ăn, khiến các món có
 * suitable_meals = "lunch,dinner" không bao giờ được chọn cho bữa tối.
 *
 * Cột là VARCHAR(100) chứa danh sách bữa ăn cách nhau dấu phẩy
 * (vd. "lunch,dinner"). Migration idempotent, không sửa dữ liệu hiện có.
 *
 * Rollback: DROP COLUMN (chỉ khi rollback, dữ liệu cũ vẫn còn trong file seed).
 */
export class AddRecipeSuitableMeals1793000000005
  implements MigrationInterface
{
  name = 'AddRecipeSuitableMeals1793000000005';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "recipes"
      ADD COLUMN IF NOT EXISTS "suitable_meals" character varying(100)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "recipes"
      DROP COLUMN IF EXISTS "suitable_meals"
    `);
  }
}
