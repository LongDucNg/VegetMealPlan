/* eslint-disable @typescript-eslint/no-explicit-any */
import * as ExcelJS from 'exceljs';

import { RecipeImportController } from './recipe-import.controller';
import {
  isCategoryIdList,
  resolveCategoryText,
  validateImportCategories,
} from './import-category.util';
import { Category, CategoryStatus, CategoryType } from '../category/entities/category.entity';

/** Danh mục giống seed: tên recipe_type có dấu phẩy và "&", food_type trùng một phần chữ. */
const cat = (id: number, name: string, type: string, status = CategoryStatus.ACTIVE) =>
  ({ category_id: id, category_name: name, category_type: type, status }) as Category;

const CATEGORIES: Category[] = [
  cat(1, 'Mì, Bún & Phở', CategoryType.RECIPE_TYPE),
  cat(2, 'Canh & Súp', CategoryType.RECIPE_TYPE),
  cat(3, 'Tráng miệng & Đồ uống', CategoryType.RECIPE_TYPE),
  cat(4, 'Xào & Chiên', CategoryType.RECIPE_TYPE),
  cat(10, 'Món đủ bữa', CategoryType.FOOD_TYPE),
  cat(11, 'Canh/súp', CategoryType.FOOD_TYPE),
  cat(12, 'Đồ uống', CategoryType.FOOD_TYPE),
  cat(13, 'Món mặn', CategoryType.FOOD_TYPE),
  cat(20, 'Hỏi đáp', 'forum'),
  cat(30, 'Món cũ', CategoryType.FOOD_TYPE, CategoryStatus.INACTIVE),
];

describe('Import: đọc ô "Danh mục" (mục 4)', () => {
  it('nhận ra ô chỉ gồm id', () => {
    expect(isCategoryIdList('3, 12')).toBe(true);
    expect(isCategoryIdList('[3,12]')).toBe(true);
    expect(isCategoryIdList('Canh & Súp')).toBe(false);
    expect(isCategoryIdList(',;')).toBe(false);
  });

  it('đọc tên danh mục có dấu phẩy bên trong ("Mì, Bún & Phở")', () => {
    expect(resolveCategoryText('Mì, Bún & Phở, Món đủ bữa', CATEGORIES)).toEqual({ ids: [1, 10] });
  });

  it('không phân biệt hoa thường, khoảng trắng thừa, dấu phân cách ; hoặc xuống dòng', () => {
    expect(resolveCategoryText('  canh & súp ;  CANH/SÚP ', CATEGORIES)).toEqual({ ids: [2, 11] });
    expect(resolveCategoryText('Xào & Chiên\nMón mặn', CATEGORIES)).toEqual({ ids: [4, 13] });
  });

  it('tên dài được ưu tiên: "Tráng miệng & Đồ uống" không bị hiểu thành "Đồ uống"', () => {
    expect(resolveCategoryText('Tráng miệng & Đồ uống, Đồ uống', CATEGORIES)).toEqual({ ids: [3, 12] });
  });

  it('đọc được danh sách id', () => {
    expect(resolveCategoryText('2, 11', CATEGORIES)).toEqual({ ids: [2, 11] });
  });

  it('tên hoặc id không tồn tại -> báo lỗi kèm danh sách danh mục hợp lệ để chọn lại', () => {
    const byName = resolveCategoryText('Canh & Súp, Món lẩu', CATEGORIES);
    expect(byName.error).toContain('"món lẩu"');
    expect(byName.error).toContain('Danh mục hợp lệ');
    expect(byName.error).toContain('"Canh & Súp" (#2)');
    // Danh mục diễn đàn và danh mục đã tắt không được gợi ý.
    expect(byName.error).not.toContain('Hỏi đáp');
    expect(byName.error).not.toContain('Món cũ');

    expect(resolveCategoryText('2, 99', CATEGORIES).error).toContain('#99');
  });

  it('chặn danh mục không gắn được cho món (diễn đàn), đã tắt, hoặc chọn 2 nhóm món', () => {
    expect(validateImportCategories([2, 11], CATEGORIES)).toBeNull();
    expect(validateImportCategories([2, 20], CATEGORIES)).toContain('không gắn được cho công thức');
    expect(validateImportCategories([2, 30], CATEGORIES)).toContain('ngừng sử dụng');
    expect(validateImportCategories([1, 2], CATEGORIES)).toContain('chỉ thuộc 1 nhóm món');
    expect(validateImportCategories([10, 13], CATEGORIES)).toContain('chỉ thuộc 1 loại món');
    expect(validateImportCategories([2, 404], CATEGORIES)).toContain('#404');
  });
});

describe('Import: nhận đúng tên cột trong file Excel (mục 4)', () => {
  const BASE = ['Tên món', 'Hướng dẫn', 'Bữa ăn', 'Chế độ ăn chay', 'Nguyên liệu'];
  const BASE_ROW = ['Canh chua chay', '1. Nấu', 'Trưa/Tối', 'Thuần chay', 'Đậu hũ trắng (150g)'];

  async function importWith(headers: string[], row: any[]) {
    const wb = new ExcelJS.Workbook();
    const ws = wb.addWorksheet('recipes');
    ws.addRow(headers);
    ws.addRow(row);
    const buffer = Buffer.from(await wb.xlsx.writeBuffer());

    const captured: any[] = [];
    const controller = new RecipeImportController({
      importRows: async (_u: number, _f: string, rows: any[]) => {
        captured.push(...rows);
        return { success: true };
      },
    } as any);
    await controller.import({ user: { user_id: 1 } }, { originalname: 'a.xlsx', buffer, size: buffer.length });
    return captured[0];
  }

  it('cột "Danh mục" ghi tên -> chuyển sang service đối chiếu bằng tên', async () => {
    const row = await importWith([...BASE, 'Danh mục'], [...BASE_ROW, 'Canh & Súp, Canh/súp']);
    expect(row.category_raw).toBe('Canh & Súp, Canh/súp');
    expect(row.category_ids).toBeUndefined();
    expect(row.row_error).toBeUndefined();
  });

  it('cột "category_ids" ghi id -> đọc thành mảng id (trước đây cột này bị bỏ qua hoàn toàn)', async () => {
    const row = await importWith([...BASE, 'category_ids'], [...BASE_ROW, '2, 11']);
    expect(row.category_ids).toEqual([2, 11]);
    expect(row.category_raw).toBeUndefined();
  });

  it('"Cách nấu" là hướng dẫn, "Thời gian nấu" là số phút, "suitable_meals" không đè cột Bữa ăn', async () => {
    const row = await importWith(
      ['Tên món', 'Cách nấu', 'Thời gian nấu (phút)', 'Bữa ăn', 'suitable_meals', 'Chế độ ăn chay', 'Nguyên liệu'],
      ['Canh chua chay', '1. Nấu nước dùng', 25, 'Trưa/Tối', 'lunch,dinner', 'Thuần chay', 'Đậu hũ trắng (150g)'],
    );
    expect(row.instructions).toBe('1. Nấu nước dùng');
    expect(row.cook_time).toBe(25);
    expect(row.meal_type).toBe('lunch');
    expect(row.suitable_meals).toBe('lunch,dinner');
  });
});
