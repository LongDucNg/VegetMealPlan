import { DataSource, EntityManager } from 'typeorm';
import { Ingredient } from '../../modules/ingredient/entities/ingredient.entity';
import { IngredientConflict } from '../../modules/ingredient/entities/ingredient-conflict.entity';
import { Recipe, RecipeStatus } from '../../modules/recipe/entities/recipe.entity';
import { RecipeIngredient } from '../../modules/recipe/entities/recipe-ingredient.entity';
import { RecipeCategory } from '../../modules/recipe/entities/recipe-category.entity';
import { NutritionInfo } from '../../modules/nutrition/entities/nutrition-info.entity';
import { Category } from '../../modules/category/entities/category.entity';
import { IngredientReplacement } from '../../modules/ingredient/entities/ingredient-replacement.entity';

import { readFileSync } from 'fs';
import { join } from 'path';

// Đọc bằng fs (không cần bật resolveJsonModule trong tsconfig). Seed chạy bằng ts-node nên dùng __dirname.
const load = (file: string): any[] =>
  JSON.parse(readFileSync(join(__dirname, 'data', file), 'utf-8'));
const ingredients = load('ingredients.json');
const recipes = load('recipes.json');
const conflicts = load('ingredient-conflicts.json');
const replacements = load('ingredient-replacements.json');

/**
 * Seed kho món chay: nguyên liệu, công thức, dinh dưỡng, danh mục, cặp kỵ nhau.
 * Chạy qua `npm run seed`. Chỉ chạy khi bảng ingredients còn trống (không ghi đè dữ liệu có sẵn).
 *
 * LƯU Ý DỮ LIỆU: dinh dưỡng và giá được TÍNH TỪ NGUYÊN LIỆU, không lấy từ JSON.
 * - Công thức: giá = sum(g / 1000 * price_per_kg), kcal = sum(kcal_per_100g * g / 100)
 * - nutrition_infos lưu trên 1 khẩu phần (chia cho servings)
 * - Chạy lại với SEED_RESET=true để XOÁ SẠCH công thức/nguyên liệu (kèm mọi bảng tham chiếu, CASCADE) rồi nạp lại.
 */
const chunk = <T>(arr: T[], n = 500): T[][] =>
  Array.from({ length: Math.ceil(arr.length / n) }, (_, i) => arr.slice(i * n, i * n + n));

async function resetSequence(m: EntityManager, table: string, col: string) {
  await m.query(
    `SELECT setval(pg_get_serial_sequence('${table}', '${col}'), COALESCE((SELECT MAX(${col}) FROM ${table}), 1))`,
  );
}

/**
 * Tính estimated_cost và nutrition từ nguyên liệu.
 * Giá = sum(g / 1000 * price_per_kg)
 * Dinh dưỡng = sum(kcal_per_100g * g / 100), chia cho servings
 */
function calculateCostAndNutrition(
  recipeIngredients: { ingredient_id: number; quantity: number; is_optional?: boolean }[],
  ingredientMap: Map<number, any>,
  servings: number,
): { estimated_cost: number; nutrition: { calories: number; protein: number; carbs: number; fat: number; fiber: number } } {
  let totalCost = 0;
  let totalCalories = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFat = 0;
  let totalFiber = 0;

  for (const item of recipeIngredients) {
    const ingredient = ingredientMap.get(item.ingredient_id);
    if (!ingredient) continue;

    const quantity = Number(item.quantity) || 0;
    const unit = (item as any).unit?.toLowerCase() || 'g';

    // Tính giá cho TẤT CẢ nguyên liệu (gram -> price_per_kg)
    if (ingredient.avg_price_per_unit && unit === 'g') {
      totalCost += (quantity / 1000) * Number(ingredient.avg_price_per_unit);
    }

    // Chỉ tính dinh dưỡng cho nguyên liệu BẮT BUỘC (không tính optional)
    if (item.is_optional) continue;

    // Tính dinh dưỡng (kcal_per_100g * g / 100)
    const factor = quantity / 100;
    totalCalories += (Number(ingredient.calories_per_100g) || 0) * factor;
    totalProtein += (Number(ingredient.protein_per_100g) || 0) * factor;
    totalCarbs += (Number(ingredient.carb_per_100g) || 0) * factor;
    totalFat += (Number(ingredient.fat_per_100g) || 0) * factor;
    totalFiber += (Number(ingredient.fiber_per_100g) || 0) * factor;
  }

  // Chia cho khẩu phần (nutrition lưu trên 1 khẩu phần)
  const srv = servings && servings > 0 ? servings : 1;

  return {
    estimated_cost: Math.round(totalCost),
    nutrition: {
      calories: totalCalories / srv,
      protein: totalProtein / srv,
      carbs: totalCarbs / srv,
      fat: totalFat / srv,
      fiber: totalFiber / srv,
    },
  };
}

export async function seedVegetarianData(ds: DataSource) {
  const reset = process.env.SEED_RESET === 'true';

  const existing = await ds.getRepository(Ingredient).count();
  if (existing > 0 && !reset) {
    console.log(`⏭️  Bỏ qua seed món chay: bảng ingredients đã có ${existing} dòng.`);
    return;
  }

  await ds.transaction(async (m) => {
    // Xoá và nạp lại trong CÙNG một transaction
    if (reset) {
      console.log('⚠️  SEED_RESET=true: xoá công thức, nguyên liệu và dữ liệu tham chiếu rồi nạp lại...');
      await m.query(
        'TRUNCATE TABLE recipe_ingredients, recipe_categories, nutrition_infos, recipes, ' +
          'ingredient_conflicts, ingredient_replacements, ingredients RESTART IDENTITY CASCADE',
      );
    }

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

    // 3. Tạo ingredient map để tính toán
    const ingredientMap = new Map<number, any>();
    for (const i of ingredients as any[]) {
      ingredientMap.set(i.ingredient_id, i);
    }

    // 4. Công thức + dinh dưỡng + nguyên liệu + danh mục
    const now = new Date();

    // Tính toán trước để lấy estimated_cost và nutrition
    const recipeCalculations = new Map<number, { estimated_cost: number; nutrition: any }>();
    for (const r of recipes as any[]) {
      const calc = calculateCostAndNutrition(r.ingredients, ingredientMap, r.servings);
      recipeCalculations.set(r.recipe_id, calc);
    }

    for (const part of chunk(recipes as any[], 100)) {
      await m.insert(
        Recipe,
        part.map((r) => {
          const calc = recipeCalculations.get(r.recipe_id);
          return {
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
            // Tính từ nguyên liệu, không lấy từ JSON
            estimated_cost: calc?.estimated_cost ?? 0,
            status: RecipeStatus.APPROVED,
            approved_at: now,
          };
        }),
      );

      // Lưu nutrition đã tính (trên 1 khẩu phần)
      await m.insert(
        NutritionInfo,
        part.map((r) => {
          const calc = recipeCalculations.get(r.recipe_id);
          return {
            recipe_id: r.recipe_id,
            ...(calc?.nutrition ?? { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }),
          };
        }),
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

    // 5. Cặp nguyên liệu kỵ nhau
    for (const part of chunk(conflicts as any[])) await m.insert(IngredientConflict, part);

    // 6. Gợi ý thay thế nguyên liệu
    for (const part of chunk(replacements as any[])) await m.insert(IngredientReplacement, part);
  });

  console.log(
    `✅ Seed món chay: ${ingredients.length} nguyên liệu, ${recipes.length} món, ${conflicts.length} cặp kỵ nhau, ${replacements.length} cặp thay thế.`,
  );
}
