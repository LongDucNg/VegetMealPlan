import { calculateIngredientCost } from './recipe-cost.util';
import { calculateNutritionPerServing } from './recipe-nutrition.util';

describe('recipe-cost.util', () => {
  describe('calculateIngredientCost', () => {
    it('đơn vị tính giá mặc định là kg (ingredients.unit rỗng hoặc "g")', () => {
      // 200g yến mạch, giá 20000đ/kg => 0.2kg * 20000 = 4000đ
      expect(calculateIngredientCost(200, 'g', 'g', 20000)).toEqual({
        cost: 4000,
        converted: true,
      });
      expect(calculateIngredientCost(200, 'g', null, 20000)).toEqual({
        cost: 4000,
        converted: true,
      });
      // 0.5kg giá 20000đ/kg => 10000đ
      expect(calculateIngredientCost(0.5, 'kg', 'kg', 20000)).toEqual({
        cost: 10000,
        converted: true,
      });
    });

    it('quy đổi qua lại giữa các đơn vị khối lượng', () => {
      // ingredients.unit = 'g' được chuẩn hoá về 'kg' (giá luôn là VNĐ/kg),
      // nên 1kg * 20000đ/kg = 20000đ chứ không phải 1kg * 20000đ/g.
      expect(calculateIngredientCost(1, 'kg', 'g', 20000)).toEqual({
        cost: 20000,
        converted: true,
      });
      // 1kg tính theo giá mỗi kg => 20000
      expect(calculateIngredientCost(1, 'kg', 'kg', 20000)).toEqual({
        cost: 20000,
        converted: true,
      });
      // 1000mg = 1g = 0.001kg; giá 20000đ/kg => 20đ
      expect(calculateIngredientCost(1000, 'mg', 'g', 20000)).toEqual({
        cost: 20,
        converted: true,
      });
    });

    it('giá tính theo đơn vị tự nhiên của nguyên liệu (đơn vị đếm)', () => {
      // ingredient.unit = 'trái' => avg_price_per_unit là giá MỖI trái.
      // Cùng đơn vị với công thức => nhân thẳng, không quy đổi sai ~1000 lần.
      expect(calculateIngredientCost(2, 'trái', 'trái', 35000)).toEqual({
        cost: 70000,
        converted: true,
      });
    });

    it('KHÔNG quy đổi được sang đơn vị đếm thì đánh dấu converted = false', () => {
      // Công thức ghi bằng g nhưng giá lại tính theo "trái": không có khối
      // lượng mỗi trái nên ước tính theo kg và BÁO HIỆU converted = false,
      // để lớp gọi biết đây chỉ là con số ước tính.
      const result = calculateIngredientCost(200, 'g', 'trái', 35000);
      expect(result.cost).toBe(7000); // 0.2kg * 35000
      expect(result.converted).toBe(false);
    });
  });
});

describe('recipe-nutrition.util', () => {
  it('kcal nguyên liệu = calories_per_100g * g / 100, chia cho servings', () => {
    const result = calculateNutritionPerServing(
      [
        {
          quantity: 200,
          ingredient: { calories_per_100g: 380, protein_per_100g: 13 },
        },
        {
          quantity: 100,
          ingredient: { calories_per_100g: 26, protein_per_100g: 1 },
        },
      ],
      2,
    );

    // Tổng món: 200/100*380 = 760 kcal + 100/100*26 = 26 kcal => 786
    expect(result.calories).toBe(393);
    expect(result.protein).toBe((2 * 13 + 1) / 2);
  });

  it('không tính nguyên liệu optional', () => {
    const result = calculateNutritionPerServing(
      [
        { quantity: 200, ingredient: { calories_per_100g: 380 } },
        {
          quantity: 500,
          is_optional: true,
          ingredient: { calories_per_100g: 340 },
        },
      ],
      1,
    );

    expect(result.calories).toBe(760);
  });

  it('servings thiếu / <= 0 thì chia cho 1', () => {
    const result = calculateNutritionPerServing(
      [{ quantity: 200, ingredient: { calories_per_100g: 380 } }],
      null,
    );

    expect(result.calories).toBe(760);
  });
});