import { BadRequestException } from '@nestjs/common';
import {
  assertRecipeDietCompatible,
  classifyIngredientDiet,
  findDietIncompatibleIngredients,
  IngredientDietGroup,
  normalizeDietType,
} from './diet-compat.util';

/**
 * Nguyên liệu mẫu, lấy đúng từ dữ liệu seed hiện tại
 * (src/database/seeds/data/ingredients.json):
 *   - 9 nguyên liệu vegan_flag = false: 6 sữa, 2 trứng, 1 mật ong.
 *   - 190 nguyên liệu còn lại vegan_flag = true.
 * Cặp (tên, vegan_flag) ở đây là dữ liệu THẬT của dự án, không phải giả định.
 */
const VEGAN_ING = {
  ingredient_id: 7,
  ingredient_name: 'Bánh canh tươi',
  vegan_flag: true,
};

/** Đậu phụ - nguyên liệu chay điển hình (seed id 34). */
const TOFU = {
  ingredient_id: 34,
  ingredient_name: 'Đậu phụ',
  vegan_flag: true,
};

/** Bánh canh tươi / bột năng - nguyên liệu chay (seed id 20). */
const NOODLES = {
  ingredient_id: 20,
  ingredient_name: 'Bột năng (tapioca)',
  vegan_flag: true,
};

const MILK = {
  ingredient_id: 179,
  ingredient_name: 'Sữa tươi',
  vegan_flag: false,
};

const CONDENSED_MILK = {
  ingredient_id: 180,
  ingredient_name: 'Sữa đặc có đường',
  vegan_flag: false,
};

const CREAM = {
  ingredient_id: 181,
  ingredient_name: 'Kem tươi',
  vegan_flag: false,
};

const BUTTER = {
  ingredient_id: 182,
  ingredient_name: 'Bơ lạt',
  vegan_flag: false,
};

const CHEESE = {
  ingredient_id: 183,
  ingredient_name: 'Phô mai mozzarella',
  vegan_flag: false,
};

const YOGURT = {
  ingredient_id: 184,
  ingredient_name: 'Sữa chua không đường',
  vegan_flag: false,
};

const EGG = {
  ingredient_id: 185,
  ingredient_name: 'Trứng gà',
  vegan_flag: false,
};

const QUAIL_EGG = {
  ingredient_id: 186,
  ingredient_name: 'Trứng cút',
  vegan_flag: false,
};

const HONEY = {
  ingredient_id: 157,
  ingredient_name: 'Mật ong',
  vegan_flag: false,
};

/** Nguyên liệu "mặn" chưa tồn tại trong seed - admin tự thêm. */
const BEEF = {
  ingredient_id: 9001,
  ingredient_name: 'Thịt bò',
  vegan_flag: false,
};

const FISH = {
  ingredient_id: 9002,
  ingredient_name: 'Cá hồi',
  vegan_flag: false,
};

const SHRIMP = {
  ingredient_id: 9003,
  ingredient_name: 'Tôm',
  vegan_flag: false,
};

describe('diet-compat.util', () => {
  describe('normalizeDietType', () => {
    it('chuẩn hoá 4 chế độ ăn hợp lệ', () => {
      expect(normalizeDietType('vegan')).toBe('vegan');
      expect(normalizeDietType('LACTO')).toBe('lacto');
      expect(normalizeDietType(' ovo ')).toBe('ovo');
      expect(normalizeDietType('ovo_lacto')).toBe('ovo_lacto');
    });

    it('trả null cho giá trị rỗng hoặc ngoài enum', () => {
      expect(normalizeDietType(null)).toBeNull();
      expect(normalizeDietType(undefined)).toBeNull();
      expect(normalizeDietType('')).toBeNull();
      expect(normalizeDietType('vegetarian')).toBeNull();
    });
  });

  describe('classifyIngredientDiet', () => {
    it('vegan_flag = true -> VEGAN (không cần đoán theo tên)', () => {
      expect(classifyIngredientDiet(VEGAN_ING)).toBe(
        IngredientDietGroup.VEGAN,
      );
      // Tên có chứa từ dễ gây hiểu nhầm vẫn là VEGAN khi cờ đúng.
      expect(
        classifyIngredientDiet({
          ingredient_name: 'Đạm đậu nành khô (thịt chay)',
          vegan_flag: true,
        }),
      ).toBe(IngredientDietGroup.VEGAN);
    });

    it('vegan_flag = false + tên trứng -> EGG', () => {
      expect(classifyIngredientDiet(EGG)).toBe(IngredientDietGroup.EGG);
      expect(classifyIngredientDiet(QUAIL_EGG)).toBe(
        IngredientDietGroup.EGG,
      );
    });

    it('vegan_flag = false + tên sữa -> DAIRY', () => {
      expect(classifyIngredientDiet(MILK)).toBe(IngredientDietGroup.DAIRY);
      expect(classifyIngredientDiet(CONDENSED_MILK)).toBe(
        IngredientDietGroup.DAIRY,
      );
      expect(classifyIngredientDiet(CREAM)).toBe(IngredientDietGroup.DAIRY);
      expect(classifyIngredientDiet(BUTTER)).toBe(IngredientDietGroup.DAIRY);
      expect(classifyIngredientDiet(CHEESE)).toBe(IngredientDietGroup.DAIRY);
      expect(classifyIngredientDiet(YOGURT)).toBe(IngredientDietGroup.DAIRY);
    });

    it('vegan_flag = false + tên mật ong -> HONEY', () => {
      expect(classifyIngredientDiet(HONEY)).toBe(IngredientDietGroup.HONEY);
    });

    it('vegan_flag = false + thịt/cá/tôm -> ANIMAL (chặn mọi chế độ chay)', () => {
      expect(classifyIngredientDiet(BEEF)).toBe(
        IngredientDietGroup.ANIMAL,
      );
      expect(classifyIngredientDiet(FISH)).toBe(
        IngredientDietGroup.ANIMAL,
      );
      expect(classifyIngredientDiet(SHRIMP)).toBe(
        IngredientDietGroup.ANIMAL,
      );
    });
  });

  describe('findDietIncompatibleIngredients', () => {
    it('vegan + nguyên liệu chay -> không có nguyên liệu không tương thích', () => {
      const result = findDietIncompatibleIngredients('vegan', [
        VEGAN_ING,
        TOFU,
        NOODLES,
      ]);
      expect(result).toHaveLength(0);
    });

    it('vegan + trứng -> bị chặn', () => {
      const result = findDietIncompatibleIngredients('vegan', [
        VEGAN_ING,
        EGG,
      ]);
      expect(result).toHaveLength(1);
      expect(result[0].ingredient_name).toBe('Trứng gà');
      expect(result[0].group).toBe(IngredientDietGroup.EGG);
    });

    it('vegan + sữa -> bị chặn', () => {
      const result = findDietIncompatibleIngredients('vegan', [MILK]);
      expect(result).toHaveLength(1);
      expect(result[0].group).toBe(IngredientDietGroup.DAIRY);
    });

    it('vegan + mật ong -> bị chặn', () => {
      const result = findDietIncompatibleIngredients('vegan', [HONEY]);
      expect(result).toHaveLength(1);
      expect(result[0].group).toBe(IngredientDietGroup.HONEY);
    });

    it('vegan + thịt bò đã đánh dấu không tương thích -> bị chặn', () => {
      const result = findDietIncompatibleIngredients('vegan', [BEEF]);
      expect(result).toHaveLength(1);
      expect(result[0].group).toBe(IngredientDietGroup.ANIMAL);
    });

    it('lacto + sữa -> hợp lệ (theo dữ liệu seed: lacto dùng sữa)', () => {
      const result = findDietIncompatibleIngredients('lacto', [
        VEGAN_ING,
        MILK,
        BUTTER,
        YOGURT,
        HONEY,
      ]);
      expect(result).toHaveLength(0);
    });

    it('lacto + trứng -> bị chặn', () => {
      const result = findDietIncompatibleIngredients('lacto', [EGG]);
      expect(result).toHaveLength(1);
      expect(result[0].group).toBe(IngredientDietGroup.EGG);
    });

    it('lacto + thịt/cá -> bị chặn', () => {
      const result = findDietIncompatibleIngredients('lacto', [
        BEEF,
        FISH,
      ]);
      expect(result).toHaveLength(2);
    });

    it('ovo + trứng -> hợp lệ (theo dữ liệu seed: ovo dùng trứng)', () => {
      const result = findDietIncompatibleIngredients('ovo', [
        VEGAN_ING,
        EGG,
        HONEY,
      ]);
      expect(result).toHaveLength(0);
    });

    it('ovo + sữa -> bị chặn', () => {
      const result = findDietIncompatibleIngredients('ovo', [MILK]);
      expect(result).toHaveLength(1);
      expect(result[0].group).toBe(IngredientDietGroup.DAIRY);
    });

    it('ovo + thịt -> bị chặn', () => {
      const result = findDietIncompatibleIngredients('ovo', [BEEF]);
      expect(result).toHaveLength(1);
    });

    it('ovo_lacto + cả trứng và sữa -> hợp lệ', () => {
      const result = findDietIncompatibleIngredients('ovo_lacto', [
        VEGAN_ING,
        EGG,
        MILK,
        BUTTER,
        HONEY,
      ]);
      expect(result).toHaveLength(0);
    });

    it('ovo_lacto + thịt/cá -> bị chặn', () => {
      const result = findDietIncompatibleIngredients('ovo_lacto', [
        BEEF,
        SHRIMP,
      ]);
      expect(result).toHaveLength(2);
    });

    it('diet_type rỗng -> kiểm tra theo mức nghiêm ngặt nhất (vegan)', () => {
      const result = findDietIncompatibleIngredients(null, [EGG]);
      expect(result).toHaveLength(1);
    });

    it('diet_type ngoài enum -> kiểm tra theo mức nghiêm ngặt nhất (fail-safe)', () => {
      const result = findDietIncompatibleIngredients('vegetarian', [
        EGG,
        BEEF,
      ]);
      expect(result).toHaveLength(2);
    });

    it('báo đủ nhiều nguyên liệu không tương thích trong một lần', () => {
      const result = findDietIncompatibleIngredients('vegan', [
        VEGAN_ING,
        EGG,
        MILK,
        BEEF,
      ]);
      expect(result.map((r) => r.ingredient_name)).toEqual([
        'Trứng gà',
        'Sữa tươi',
        'Thịt bò',
      ]);
    });
  });

  describe('assertRecipeDietCompatible', () => {
    it('không ném lỗi khi tất cả nguyên liệu tương thích', () => {
      expect(() =>
        assertRecipeDietCompatible('vegan', [VEGAN_ING, TOFU]),
      ).not.toThrow();
    });

    it('ném BadRequestException khi có nguyên liệu không tương thích', () => {
      expect(() =>
        assertRecipeDietCompatible('vegan', [VEGAN_ING, EGG]),
      ).toThrow(BadRequestException);
    });

    it('lỗi mang mã RECIPE_DIET_INCOMPATIBLE và nêu rõ nguyên liệu', () => {
      try {
        assertRecipeDietCompatible('vegan', [VEGAN_ING, BEEF]);
        throw new Error('phải ném lỗi');
      } catch (error: any) {
        expect(error.getResponse().code).toBe(
          'RECIPE_DIET_INCOMPATIBLE',
        );
        expect(error.getResponse().message).toContain('Thịt bò');
      }
    });
  });
});
