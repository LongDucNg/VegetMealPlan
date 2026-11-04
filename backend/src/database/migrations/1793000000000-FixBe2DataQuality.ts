import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Sửa dữ liệu BE2: bổ sung food_type categories + recipe_categories thiếu.
 *
 * Database thực tế (xác minh 2026-10-20):
 *   categories: 9 dòng, TẤT CẢ đều category_type='recipe_type'
 *     ID 1: Món chính  | ID 2: Món chính (trùng tên)
 *     ID 3: Bánh, Bánh bột & Ăn vặt
 *     ID 4: Tráng miệng & Đồ uống
 *     ID 5: Món kho & Rim | ID 6: Xào & Chiên
 *     ID 7: Luộc & Hấp   | ID 8: Cuốn, Gỏi & Sa lát
 *     ID 9: Canh & Súp
 *   recipe_categories 1-49: mỗi recipe có đúng 1 link (recipe_type)
 *     1–17 → cat_id=1 (Món chính)     18–38 → cat_id=2 (Món chính)
 *     39–49 → cat_id=3 (đúng)
 *   KHÔNG CÓ food_type categories nào → migration cũ fail với FK violation.
 *
 * Sửa 3 việc:
 *   1. Thêm 8 food_type categories còn thiếu (idempotent).
 *   2. Thêm recipe_type "Mì, Bún & Phở" + link cho recipes 1–17.
 *   3. Thêm recipe_type "Cơm, Xôi & Cháo" + link cho recipes 18–38.
 *
 * LƯU Ý: recipes 1–38 hiện có link recipe_type sai tên ("Món chính").
 * Việc thêm link đúng không xóa link sai — recipes 1–38 sẽ có 2 recipe_type links.
 * Link sai cần được xử lý riêng sau khi tách biệt "Món chính" thành 2 danh mục
 * hoặc sau khi có đủ thông tin để clean up mà không mất dữ liệu.
 *
 * Rollback: NO-OP (không xóa dữ liệu đã insert).
 */
export class FixBe2DataQuality1793000000000 implements MigrationInterface {
  name = 'FixBe2DataQuality1793000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // ── 1. Bổ sung 8 food_type categories còn thiếu ─────────────────────
    // Dùng ON CONFLICT DO NOTHING để idempotent.
    await queryRunner.query(`
      INSERT INTO categories (category_name, category_type)
      SELECT name, 'food_type'
      FROM (VALUES
        ('Tráng miệng'), ('Đồ uống'), ('Món mặn'), ('Món đủ bữa'),
        ('Rau'), ('Ăn nhẹ'), ('Canh/súp'), ('Cơm/xôi nền')
      ) AS v(name)
      WHERE NOT EXISTS (
        SELECT 1 FROM categories c
        WHERE c.category_name = v.name AND c.category_type = 'food_type'
      )
      ON CONFLICT DO NOTHING
    `);

    // ── 2. Thêm recipe_type "Mì, Bún & Phở" (nếu chưa có) ───────────────
    await queryRunner.query(`
      INSERT INTO categories (category_name, category_type)
      SELECT 'Mì, Bún & Phở', 'recipe_type'
      WHERE NOT EXISTS (
        SELECT 1 FROM categories c WHERE c.category_name = 'Mì, Bún & Phở' AND c.category_type = 'recipe_type'
      )
      ON CONFLICT DO NOTHING
    `);

    // ── 3. Thêm recipe_type "Cơm, Xôi & Cháo" (nếu chưa có) ─────────────
    await queryRunner.query(`
      INSERT INTO categories (category_name, category_type)
      SELECT 'Cơm, Xôi & Cháo', 'recipe_type'
      WHERE NOT EXISTS (
        SELECT 1 FROM categories c WHERE c.category_name = 'Cơm, Xôi & Cháo' AND c.category_type = 'recipe_type'
      )
      ON CONFLICT DO NOTHING
    `);

    // ── 4. Bổ sung recipe_categories — food_type cho 1–49 ───────────────
    // food_type lookup: dùng ORDER BY category_id LIMIT 1 để xử lý trùng tên.
    // 4a. one_dish → Món đủ bữa (recipes 1–28, 30–38, 39–49; recipe 29 là staple)
    await queryRunner.query(`
      INSERT INTO recipe_categories (recipe_id, category_id)
      SELECT r.recipe_id, (
        SELECT c.category_id FROM categories c
        WHERE c.category_name = 'Món đủ bữa' AND c.category_type = 'food_type'
        ORDER BY c.category_id LIMIT 1
      )
      FROM recipes r
      WHERE r.recipe_id BETWEEN 1 AND 49
        AND r.recipe_id != 29
        AND NOT EXISTS (
          SELECT 1 FROM recipe_categories rc
          WHERE rc.recipe_id = r.recipe_id
            AND rc.category_id = (
              SELECT c2.category_id FROM categories c2
              WHERE c2.category_name = 'Món đủ bữa' AND c2.category_type = 'food_type'
              ORDER BY c2.category_id LIMIT 1
            )
        )
      ON CONFLICT DO NOTHING
    `);

    // 4b. staple → Cơm/xôi nền (recipe 29)
    await queryRunner.query(`
      INSERT INTO recipe_categories (recipe_id, category_id)
      SELECT r.recipe_id, (
        SELECT c.category_id FROM categories c
        WHERE c.category_name = 'Cơm/xôi nền' AND c.category_type = 'food_type'
        ORDER BY c.category_id LIMIT 1
      )
      FROM recipes r
      WHERE r.recipe_id = 29
        AND NOT EXISTS (
          SELECT 1 FROM recipe_categories rc
          WHERE rc.recipe_id = r.recipe_id
            AND rc.category_id = (
              SELECT c2.category_id FROM categories c2
              WHERE c2.category_name = 'Cơm/xôi nền' AND c2.category_type = 'food_type'
              ORDER BY c2.category_id LIMIT 1
            )
        )
      ON CONFLICT DO NOTHING
    `);

    // ── 5. Bổ sung recipe_categories — recipe_type cho recipes 1–17 ─────
    // Nhóm "Mì, Bún & Phở" — lookup động bằng tên, không hardcode ID.
    await queryRunner.query(`
      INSERT INTO recipe_categories (recipe_id, category_id)
      SELECT r.recipe_id, (
        SELECT c.category_id FROM categories c
        WHERE c.category_name = 'Mì, Bún & Phở' AND c.category_type = 'recipe_type'
        ORDER BY c.category_id LIMIT 1
      )
      FROM recipes r
      WHERE r.recipe_id BETWEEN 1 AND 17
        AND NOT EXISTS (
          SELECT 1 FROM recipe_categories rc
          WHERE rc.recipe_id = r.recipe_id
            AND rc.category_id = (
              SELECT c2.category_id FROM categories c2
              WHERE c2.category_name = 'Mì, Bún & Phở' AND c2.category_type = 'recipe_type'
              ORDER BY c2.category_id LIMIT 1
            )
        )
      ON CONFLICT DO NOTHING
    `);

    // ── 6. Bổ sung recipe_categories — recipe_type cho recipes 18–38 ───
    // Nhóm "Cơm, Xôi & Cháo".
    await queryRunner.query(`
      INSERT INTO recipe_categories (recipe_id, category_id)
      SELECT r.recipe_id, (
        SELECT c.category_id FROM categories c
        WHERE c.category_name = 'Cơm, Xôi & Cháo' AND c.category_type = 'recipe_type'
        ORDER BY c.category_id LIMIT 1
      )
      FROM recipes r
      WHERE r.recipe_id BETWEEN 18 AND 38
        AND NOT EXISTS (
          SELECT 1 FROM recipe_categories rc
          WHERE rc.recipe_id = r.recipe_id
            AND rc.category_id = (
              SELECT c2.category_id FROM categories c2
              WHERE c2.category_name = 'Cơm, Xôi & Cháo' AND c2.category_type = 'recipe_type'
              ORDER BY c2.category_id LIMIT 1
            )
        )
      ON CONFLICT DO NOTHING
    `);
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {
    // NO-OP — không xóa dữ liệu đã insert.
    // Lý do: mỗi INSERT dùng NOT EXISTS nên không phân biệt được
    // link nào do up() tạo vs đã tồn tại trước.
    // Rollback thủ công nếu cần:
    //   DELETE FROM recipe_categories WHERE category_id IN (
    //     SELECT category_id FROM categories WHERE category_name = 'Mì, Bún & Phở' AND category_type = 'recipe_type'
    //   ) AND recipe_id BETWEEN 1 AND 17;
    //   DELETE FROM recipe_categories WHERE category_id IN (
    //     SELECT category_id FROM categories WHERE category_name = 'Cơm, Xôi & Cháo' AND category_type = 'recipe_type'
    //   ) AND recipe_id BETWEEN 18 AND 38;
    //   DELETE FROM recipe_categories WHERE category_id IN (
    //     SELECT category_id FROM categories WHERE category_name = 'Món đủ bữa' AND category_type = 'food_type'
    //   ) AND recipe_id BETWEEN 1 AND 49 AND recipe_id != 29;
    //   DELETE FROM recipe_categories WHERE category_id IN (
    //     SELECT category_id FROM categories WHERE category_name = 'Cơm/xôi nền' AND category_type = 'food_type'
    //   ) AND recipe_id = 29;
  }
}
