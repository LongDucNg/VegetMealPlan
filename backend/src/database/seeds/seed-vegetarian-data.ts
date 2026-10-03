import { DataSource, EntityManager } from 'typeorm';
import { Ingredient } from '../../modules/ingredient/entities/ingredient.entity';
import { IngredientConflict } from '../../modules/ingredient/entities/ingredient-conflict.entity';
import { Recipe, RecipeStatus } from '../../modules/recipe/entities/recipe.entity';
import { RecipeIngredient } from '../../modules/recipe/entities/recipe-ingredient.entity';
import { RecipeCategory } from '../../modules/recipe/entities/recipe-category.entity';
import { NutritionInfo } from '../../modules/nutrition/entities/nutrition-info.entity';
import { Category } from '../../modules/category/entities/category.entity';

import { readFileSync } from 'fs';
import { join } from 'path';

// Đọc bằng fs (không cần bật resolveJsonModule trong tsconfig). Seed chạy bằng ts-node nên dùng __dirname.
const load = (file: string): any[] =>
  JSON.parse(readFileSync(join(__dirname, 'data', file), 'utf-8'));
const ingredients = load('ingredients.json');
const recipes = load('recipes.json');
const conflicts = load('ingredient-conflicts.json');

/**
 * Seed kho món chay: nguyên liệu, công thức, dinh dưỡng, danh mục, cặp kỵ nhau.
 * Chạy qua `npm run seed`. Chỉ chạy khi bảng ingredients còn trống (không ghi đè dữ liệu có sẵn).
 *
 * LƯU Ý DỮ LIỆU: dinh dưỡng và giá là ƯỚC TÍNH, chưa đối chiếu USDA/Viện Dinh dưỡng.
 * - ingredients.unit = 'kg' (chất lỏng coi 1 L ≈ 1 kg); avg_price_per_unit = VND/kg.
 * - recipes.estimated_cost = tổng giá cả món (VND); nutrition_infos = trên 1 khẩu phần.
 * - recipes.meal_type: breakfast | snack | any (any = món trưa/tối).
 * - Nhóm món (recipe_type) và loại món course (food_type) được seed thành categories.
 */
const chunk = <T>(arr: T[], n = 500): T[][] =>
  Array.from({ length: Math.ceil(arr.length / n) }, (_, i) => arr.slice(i * n, i * n + n));

async function resetSequence(m: EntityManager, table: string, col: string) {
  await m.query(
    `SELECT setval(pg_get_serial_sequence('${table}', '${col}'), COALESCE((SELECT MAX(${col}) FROM ${table}), 1))`,
  );
}

export async function seedVegetarianData(ds: DataSource) {
  const existing = await ds.getRepository(Ingredient).count();
  if (existing > 0) {
    console.log(`⏭️  Bỏ qua seed món chay: bảng ingredients đã có ${existing} dòng.`);
    return;
  }

  await ds.transaction(async (m) => {
    // 1. Nguyên liệu (giữ ID số nguyên theo file seed)
    for (const part of chunk(ingredients as any[])) {
      await m.insert(
        Ingredient,
        part.map((i) => ({
          ingredient_id: i.ingredient_id,
          ingredient_name: i.ingredient_name,
          unit: i.unit,
          description: i.description,
          vegan_flag: i.vegan_flag,
          avg_price_per_unit: i.avg_price_per_unit,
          calories_per_100g: i.calories_per_100g,
          protein_per_100g: i.protein_per_100g,
          carb_per_100g: i.carb_per_100g,
          fat_per_100g: i.fat_per_100g,
          fiber_per_100g: i.fiber_per_100g,
        })),
      );
    }
    await resetSequence(m, 'ingredients', 'ingredient_id');

    // 2. Danh mục: nhóm món (recipe_type) + loại món (food_type)
    const groupNames = new Set<string>();
    const courseNames = new Set<string>();
    for (const r of recipes as any[]) {
      groupNames.add(r.categories[0]);
      courseNames.add(r.categories[1]);
    }
    const catId = new Map<string, number>();
    const upsertCat = async (name: string, type: string) => {
      let c = await m.findOne(Category, { where: { category_name: name, category_type: type } });
      if (!c) c = await m.save(m.create(Category, { category_name: name, category_type: type }));
      catId.set(`${type}:${name}`, c.category_id);
    };
    for (const g of groupNames) await upsertCat(g, 'recipe_type');
    const courseLabel: Record<string, string> = {
      staple: 'Cơm/xôi nền', main: 'Món mặn', side_veg: 'Rau', soup: 'Canh/súp',
      one_dish: 'Món đủ bữa', dessert: 'Tráng miệng', snack: 'Ăn nhẹ', drink: 'Đồ uống',
    };
    for (const c of courseNames) await upsertCat(courseLabel[c] ?? c, 'food_type');

    // 3. Công thức + dinh dưỡng + nguyên liệu + danh mục
    const now = new Date();
    for (const part of chunk(recipes as any[], 100)) {
      await m.insert(
        Recipe,
        part.map((r) => ({
          recipe_id: r.recipe_id,
          title: r.title,
          description: r.description,
          instructions: r.instructions,
          prep_time: r.prep_time,
          cook_time: r.cook_time,
          servings: r.servings,
          difficulty: r.difficulty,
          meal_type: r.meal_type,
          diet_type: r.diet_type,
          estimated_cost: r.estimated_cost,
          status: RecipeStatus.APPROVED,
          approved_at: now,
        })),
      );
      await m.insert(
        NutritionInfo,
        part.map((r) => ({ recipe_id: r.recipe_id, ...r.nutrition })),
      );
      await m.insert(
        RecipeCategory,
        part.flatMap((r) => [
          { recipe_id: r.recipe_id, category_id: catId.get(`recipe_type:${r.categories[0]}`)! },
          {
            recipe_id: r.recipe_id,
            category_id: catId.get(`food_type:${courseLabel[r.categories[1]] ?? r.categories[1]}`)!,
          },
        ]),
      );
    }
    const links = (recipes as any[]).flatMap((r) =>
      r.ingredients.map((i: any) => ({ recipe_id: r.recipe_id, ...i, note: null })),
    );
    for (const part of chunk(links)) await m.insert(RecipeIngredient, part);
    await resetSequence(m, 'recipes', 'recipe_id');

    // 4. Cặp nguyên liệu kỵ nhau (luôn id_1 < id_2)
    for (const part of chunk(conflicts as any[])) await m.insert(IngredientConflict, part);
  });

  console.log(
    `✅ Seed món chay: ${ingredients.length} nguyên liệu, ${recipes.length} món, ${conflicts.length} cặp kỵ nhau.`,
  );
}
