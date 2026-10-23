import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Chuẩn hoá recipes.meal_type + recipes.suitable_meals theo dữ liệu gốc.
 *
 * Lý do cần migration:
 *   Dữ liệu DB bị lệch ở vài dòng so với file seed gốc (425 món, commit
 *   3da4d55 - "feat(be2): recipe, ingredient, meal-plan, seed 425 mon chay"):
 *     - recipe 311 "Cà chua xào trứng":  meal_type='lunch'  nhưng suitable_meals='breakfast'
 *     - recipe 405 "Bánh ướt chay":      meal_type='breakfast' nhưng suitable_meals='lunch,dinner'
 *   (giá trị suitable_meals của 2 dòng này bị hoán đổi với nhau)
 *   - recipe 427 "Canh chua chay":      meal_type='Lunch' (hoa/thường lộn xộn)
 *   - recipe 426, 428, 429, 430:       suitable_meals = NULL
 *
 *   Hậu quả: món meal_type='lunch' nhưng suitable_meals='breakfast' không bao giờ
 *   được chọn cho bữa tối (bữa tối đọc suitable_meals làm nguồn chuẩn), và món
 *   'breakfast' lại bị gán vào bữa tối - sai nghiệp vụ.
 *
 * Cách sửa: với mỗi recipe có meal_type hợp lệ, đặt suitable_meals = mapping
 * chuẩn (breakfast->breakfast, lunch->lunch,dinner, snack->snack, any->any) và
 * chuẩn hoá meal_type về chữ thường. Idempotent: chạy lại vẫn cho kết quả
 * giống nhau, không đụng vào dòng đã đúng.
 *
 * Không seed lại DB, không xoá dòng nào - chỉ UPDATE 2 cột trên recipes.
 *
 * Rollback: NO-OP (không có dữ liệu gốc để khôi phục, migration chỉ chuẩn hoá).
 */
export class FixBe2MealTypeConsistency1793000000006
  implements MigrationInterface
{
  name = 'FixBe2MealTypeConsistency1793000000006';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Chuẩn hoá meal_type về chữ thường + bỏ khoảng trắng thừa.
    await queryRunner.query(`
      UPDATE recipes
      SET meal_type = LOWER(BTRIM(meal_type))
      WHERE meal_type IS NOT NULL
        AND meal_type <> LOWER(BTRIM(meal_type))
    `);

    // 2. Đồng bộ suitable_meals theo mapping chuẩn.
    //    Chỉ sửa dòng đang lệch (NULL/trống hoặc khác mapping của meal_type).
    await queryRunner.query(`
      UPDATE recipes
      SET suitable_meals = CASE LOWER(BTRIM(recipes.meal_type))
        WHEN 'breakfast' THEN 'breakfast'
        WHEN 'lunch'     THEN 'lunch,dinner'
        WHEN 'dinner'    THEN 'dinner'
        WHEN 'snack'     THEN 'snack'
        WHEN 'any'       THEN 'any'
        ELSE recipes.suitable_meals
      END
      WHERE LOWER(BTRIM(recipes.meal_type)) IN ('breakfast', 'lunch', 'dinner', 'snack', 'any')
        AND (
          recipes.suitable_meals IS NULL
          OR BTRIM(recipes.suitable_meals) = ''
          OR LOWER(BTRIM(recipes.suitable_meals)) <> CASE LOWER(BTRIM(recipes.meal_type))
            WHEN 'breakfast' THEN 'breakfast'
            WHEN 'lunch'     THEN 'lunch,dinner'
            WHEN 'dinner'    THEN 'dinner'
            WHEN 'snack'     THEN 'snack'
            WHEN 'any'       THEN 'any'
          END
        )
    `);
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {
    // NO-OP — không có bản gốc để khôi phục, migration chỉ chuẩn hoá dữ liệu.
  }
}
