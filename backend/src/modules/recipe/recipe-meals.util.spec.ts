import {
  deriveSuitableMeals,
  isRecipeSuitableForMeal,
  mealTypesSuitableFor,
  parseSuitableMeals,
} from './recipe-meals.util';

describe('recipe-meals.util', () => {
  describe('parseSuitableMeals', () => {
    it('tách danh sách bữa ăn theo dấu phẩy', () => {
      expect(parseSuitableMeals('lunch,dinner')).toEqual([
        'lunch',
        'dinner',
      ]);
    });

    it('bỏ khoảng trắng và chuyển chữ thường', () => {
      expect(parseSuitableMeals(' Lunch , Dinner ')).toEqual([
        'lunch',
        'dinner',
      ]);
    });

    it('trả về mảng rỗng khi không có giá trị', () => {
      expect(parseSuitableMeals(null)).toEqual([]);
      expect(parseSuitableMeals(undefined)).toEqual([]);
      expect(parseSuitableMeals('')).toEqual([]);
    });
  });

  describe('deriveSuitableMeals', () => {
    it('suy ra đúng theo mapping dữ liệu gốc', () => {
      expect(deriveSuitableMeals('breakfast')).toBe('breakfast');
      expect(deriveSuitableMeals('lunch')).toBe('lunch,dinner');
      expect(deriveSuitableMeals('snack')).toBe('snack');
    });

    it('không nhạy với hoa thường và khoảng trắng', () => {
      expect(deriveSuitableMeals(' LUNCH ')).toBe('lunch,dinner');
    });

    it('trả về null khi meal_type không hợp lệ', () => {
      expect(deriveSuitableMeals('sushi')).toBeNull();
      expect(deriveSuitableMeals(null)).toBeNull();
    });
  });

  describe('mealTypesSuitableFor', () => {
    it('bữa dinner nhận meal_type lunch và dinner', () => {
      expect(mealTypesSuitableFor('dinner')).toEqual(
        expect.arrayContaining(['lunch', 'dinner']),
      );
    });

    it('bữa breakfast nhận breakfast và any', () => {
      expect(mealTypesSuitableFor('breakfast')).toEqual(
        expect.arrayContaining(['breakfast', 'any']),
      );
      expect(
        mealTypesSuitableFor('breakfast'),
      ).not.toContain('lunch');
    });

    it('bữa snack nhận snack và any', () => {
      expect(mealTypesSuitableFor('snack')).toEqual(
        expect.arrayContaining(['snack', 'any']),
      );
      expect(mealTypesSuitableFor('snack')).not.toContain('lunch');
    });
  });

  describe('isRecipeSuitableForMeal', () => {
    it('món meal_type=lunch, suitable_meals=lunch,dinner dùng được cho bữa tối', () => {
      const recipe = {
        meal_type: 'lunch',
        suitable_meals: 'lunch,dinner',
      };

      expect(isRecipeSuitableForMeal(recipe, 'dinner')).toBe(true);
      expect(isRecipeSuitableForMeal(recipe, 'lunch')).toBe(true);
      expect(isRecipeSuitableForMeal(recipe, 'breakfast')).toBe(false);
      expect(isRecipeSuitableForMeal(recipe, 'snack')).toBe(false);
    });

    it('món suitable_meals=breakfast không dùng được cho bữa tối', () => {
      const recipe = {
        meal_type: 'breakfast',
        suitable_meals: 'breakfast',
      };

      expect(isRecipeSuitableForMeal(recipe, 'breakfast')).toBe(true);
      expect(isRecipeSuitableForMeal(recipe, 'dinner')).toBe(false);
    });

    it('món chưa có suitable_meals thì suy ra từ meal_type', () => {
      const recipe = { meal_type: 'lunch', suitable_meals: null };

      expect(isRecipeSuitableForMeal(recipe, 'dinner')).toBe(true);
      expect(isRecipeSuitableForMeal(recipe, 'lunch')).toBe(true);
      expect(isRecipeSuitableForMeal(recipe, 'breakfast')).toBe(false);
    });

    it('món meal_type=snack chỉ dùng cho bữa snack', () => {
      const recipe = { meal_type: 'snack', suitable_meals: null };

      expect(isRecipeSuitableForMeal(recipe, 'snack')).toBe(true);
      expect(isRecipeSuitableForMeal(recipe, 'lunch')).toBe(false);
      expect(isRecipeSuitableForMeal(recipe, 'dinner')).toBe(false);
    });

    it('meal_type=any khớp mọi bữa ăn', () => {
      const recipe = { meal_type: 'any', suitable_meals: null };

      expect(isRecipeSuitableForMeal(recipe, 'breakfast')).toBe(true);
      expect(isRecipeSuitableForMeal(recipe, 'lunch')).toBe(true);
      expect(isRecipeSuitableForMeal(recipe, 'dinner')).toBe(true);
      expect(isRecipeSuitableForMeal(recipe, 'snack')).toBe(true);
    });

    it('bỏ qua kiểm tra khi bữa ăn rỗng', () => {
      expect(
        isRecipeSuitableForMeal({ meal_type: 'snack' }, ''),
      ).toBe(true);
    });
  });
});
