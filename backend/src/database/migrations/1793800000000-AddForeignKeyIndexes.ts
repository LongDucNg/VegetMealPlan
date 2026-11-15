import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Thêm index cho các cột khoá ngoại hay dùng để lọc/JOIN.
 *
 * PostgreSQL tự tạo index cho khoá chính và UNIQUE, nhưng KHÔNG tự tạo cho khoá ngoại.
 * Các truy vấn như "thực đơn của user", "các món trong một bữa", "món thuộc danh mục"
 * đều lọc theo những cột dưới đây, nên thiếu index thì DB phải quét cả bảng.
 *
 * Bỏ qua các cột đã có index sẵn (cột đầu của khoá chính ghép hoặc index cũ),
 * và các cột chỉ dùng khi xoá tài khoản (approved_by, reviewed_by, created_by...).
 * Dùng IF NOT EXISTS để chạy lại an toàn trên DB đã có index trùng tên.
 */
const INDEXES: Array<[table: string, column: string]> = [
  // Thực đơn (BE2): cây meal_plans -> weekly_plans -> daily_meals -> meal_items
  ['meal_plans', 'user_id'],
  ['weekly_plans', 'meal_plan_id'],
  ['daily_meals', 'weekly_plan_id'],
  ['meal_items', 'daily_meal_id'],
  ['meal_items', 'recipe_id'],
  ['meal_plan_profiles', 'user_id'],
  ['profile_allergies', 'ingredient_id'],
  // Công thức và nguyên liệu (BE2)
  ['recipe_ingredients', 'ingredient_id'],
  ['recipe_categories', 'category_id'],
  ['favorite_recipes', 'recipe_id'],
  ['user_recipe_prices', 'recipe_id'],
  ['user_ingredient_prices', 'ingredient_id'],
  ['user_allergies', 'ingredient_id'],
  ['ingredient_conflicts', 'ingredient_id_2'],
  ['ingredient_replacements', 'original_ingredient_id'],
  ['ingredient_replacements', 'replacement_ingredient_id'],
  ['recipe_import_items', 'batch_id'],
  // Cộng đồng, gợi ý, chatbot (BE3)
  ['blogs', 'user_id'],
  ['blogs', 'category_id'],
  ['videos', 'user_id'],
  ['videos', 'category_id'],
  ['comments', 'user_id'],
  ['user_ingredients', 'user_id'],
  ['user_ingredients', 'ingredient_id'],
  ['ai_recommendations', 'user_id'],
  ['chatbot_conversations', 'user_id'],
  // Tài khoản, thanh toán, thông báo (BE1)
  ['subscriptions', 'user_id'],
  ['payment_transactions', 'user_id'],
  ['notifications', 'user_id'],
];

const indexName = (table: string, column: string) => `IDX_${table}_${column}`;

export class AddForeignKeyIndexes1793800000000 implements MigrationInterface {
  name = 'AddForeignKeyIndexes1793800000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const [table, column] of INDEXES) {
      await queryRunner.query(
        `CREATE INDEX IF NOT EXISTS "${indexName(table, column)}" ON "${table}" ("${column}")`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    for (const [table, column] of [...INDEXES].reverse()) {
      await queryRunner.query(`DROP INDEX IF EXISTS "${indexName(table, column)}"`);
    }
  }
}
