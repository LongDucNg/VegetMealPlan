import {
  calculateIngredientCost,
  calculateRecipeTotalCost,
  convertToGrams,
} from './recipe-cost.util';
import { calculateNutritionPerServing } from './recipe-nutrition.util';

describe('recipe-cost.util', () => {
  describe('convertToGrams', () => {
    it('quy đổi các đơn vị khối lượng sang gram', () => {
      expect(convertToGrams(500, 'g')).toBe(500);
      expect(convertToGrams(1, 'kg')).toBe(1000);
      expect(convertToGrams(1000, 'mg')).toBe(1);
      expect(convertToGrams(2, 'Gam')).toBe(2);
      expect(convertToGrams(1, 'kilogram')).toBe(1000);
    });

    it('quy đổi thể tích sang gram xấp xỉ 1ml ~ 1g', () => {
      expect(convertToGrams(1, 'l')).toBe(1000);
      expect(convertToGrams(1, 'ml')).toBe(1);
      expect(convertToGrams(2, 'thìa canh')).toBe(30);
    });

    it('KHÔNG đoán trọng lượng cho đơn vị đếm', () => {
      // Không có bảng gram/cái nên phải trả null thay vì đoán.
      for (const unit of ['miếng', 'trái', 'củ', 'ổ', 'tờ', 'quả', 'tép']) {
        expect(convertToGrams(2, unit)).toBeNull();
      }
      expect(convertToGrams(1, null)).toBeNull();
      expect(convertToGrams(1, 'đơn vị lạ')).toBeNull();
    });
  });

  describe('calculateIngredientCost', () => {
    it('giá = gram * giá/kg / 1000 (giá luôn là VNĐ/kg)', () => {
      // 200g yến mạch, giá 20000đ/kg => 4000đ
      expect(calculateIngredientCost(200, 'g', 20000)).toEqual({
        cost: 4000,
        converted: true,
      });
      // 0.5kg giá 20000đ/kg => 10000đ
      expect(calculateIngredientCost(0.5, 'kg', 20000)).toEqual({
        cost: 10000,
        converted: true,
      });
    });

    it('giá không phụ thuộc ingredients.unit (đơn vị tự nhiên của nguyên liệu)', () => {
      // Trước đây cost sai ~1000 lần khi row.unit == ingredient.unit = 'trái'.
      const result = calculateIngredientCost(2, 'trái', 35000);
      expect(result.cost).toBeNull();
      expect(result.converted).toBe(false);
    });

    it('trả cost null khi thiếu giá', () => {
      expect(calculateIngredientCost(200, 'g', null)).toEqual({
        cost: null,
        converted: false,
      });
      expect(calculateIngredientCost(200, 'g', undefined)).toEqual({
        cost: null,
        converted: false,
      });
    });
  });

  describe('calculateRecipeTotalCost', () => {
    it('món KHÔNG có nguyên liệu => cost null, không phải 0đ', () => {
      expect(calculateRecipeTotalCost([])).toEqual({
        total_cost: null,
        is_complete: false,
      });
    });

    it('tổng giá món = tổng giá các nguyên liệu (kể cả optional)', () => {
      const result = calculateRecipeTotalCost([
        { quantity: 400, unit: 'g', price: 20000 }, // 8000
        { quantity: 120, unit: 'g', price: 70000 }, // 8400
        { quantity: 10, unit: 'g', price: 50000 }, // 500
      ]);

      expect(result).toEqual({ total_cost: 16900, is_complete: true });
    });

    it('KHÔNG lưu tổng thiếu như giá đầy đủ khi thiếu giá hoặc đơn vị đếm', () => {
      expect(
        calculateRecipeTotalCost([
          { quantity: 400, unit: 'g', price: 20000 },
          { quantity: 300, unit: 'g', price: null },
        ]),
      ).toEqual({ total_cost: null, is_complete: false });

      expect(
        calculateRecipeTotalCost([
          { quantity: 400, unit: 'g', price: 20000 },
          { quantity: 2, unit: 'trái', price: 35000 },
        ]),
      ).toEqual({ total_cost: null, is_complete: false });
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