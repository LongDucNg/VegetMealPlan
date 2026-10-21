/* eslint-disable @typescript-eslint/no-explicit-any */
import { BadRequestException } from '@nestjs/common';
import * as ExcelJS from 'exceljs';

import { RecipeImportController } from './recipe-import.controller';

const HEADERS = [
  'title',
  'description',
  'instructions',
  'prep_time',
  'cook_time',
  'servings',
  'difficulty',
  'meal_type',
  'diet_type',
  'ingredients',
];

const ingJson = (name: string) =>
  JSON.stringify([
    { ingredient_name: name, quantity: 100, unit: 'g', is_optional: false },
  ]);

const happyRow = (title: string): any[] => [
  title,
  'mô tả',
  '1. nấu\n2. ăn',
  10,
  20,
  2,
  'easy',
  'lunch',
  'vegan',
  ingJson('Yến mạch'),
];

async function makeWorkbook(
  sheets: { name: string; rows: any[][] }[],
): Promise<Buffer> {
  const wb = new ExcelJS.Workbook();
  for (const sh of sheets) {
    const ws = wb.addWorksheet(sh.name);
    ws.addRow(HEADERS);
    sh.rows.forEach((r) => ws.addRow(r));
  }
  return Buffer.from(await wb.xlsx.writeBuffer());
}

function buildController() {
  const captured: any[] = [];
  const svc: any = {
    importRows: async (_u: number, _f: string, rows: any[]) => {
      captured.push(rows);
      return { success: true, data: { count: rows.length }, message: 'ok' };
    },
  };
  return { controller: new RecipeImportController(svc), captured };
}

async function callImport(buffer: Buffer, name = 'test.xlsx') {
  const { controller, captured } = buildController();
  const res = await controller.import(
    { user: { user_id: 1 } },
    { originalname: name, buffer, size: buffer.length },
  );
  return { res, rows: captured[0] };
}

describe('RecipeImportController - đọc file Excel', () => {
  it('đọc được file 1 sheet, parse đủ 10 cột', async () => {
    const buffer = await makeWorkbook([
      { name: 'recipes', rows: [happyRow('Món 1'), happyRow('Món 2')] },
    ]);

    const { rows } = await callImport(buffer);

    expect(rows).toHaveLength(2);
    expect(rows[0].title).toBe('Món 1');
    expect(rows[0].prep_time).toBe(10);
    expect(rows[0].servings).toBe(2);
    expect(rows[0].difficulty).toBe('easy');
    expect(rows[0].ingredients).toHaveLength(1);
    expect(rows[0].ingredients[0]).toEqual({
      ingredient_name: 'Yến mạch',
      quantity: 100,
      unit: 'g',
      is_optional: false,
    });
  });

  it('chỉ đọc sheet đầu tiên, bỏ qua sheet thứ 2', async () => {
    const buffer = await makeWorkbook([
      { name: 'HappyCase', rows: [happyRow('Món Hợp Lệ')] },
      { name: 'UnhappyCase', rows: [happyRow('Món Sheet 2')] },
    ]);

    const { rows } = await callImport(buffer);

    expect(rows).toHaveLength(1);
    expect(rows[0].title).toBe('Món Hợp Lệ');
  });

  it('JSON ingredients chứa phần tử null không làm hỏng cả file', async () => {
    const buffer = await makeWorkbook([
      {
        name: 'recipes',
        rows: [
          [
            'Món Null',
            'mô tả',
            'nấu',
            10,
            20,
            2,
            'easy',
            'lunch',
            'vegan',
            JSON.stringify([null]),
          ],
          happyRow('Món Bình Thường'),
        ],
      },
    ]);

    const { rows } = await callImport(buffer);

    expect(rows).toHaveLength(2);
    // Dòng lỗi vẫn được đưa vào service để đánh dấu FAILED, không hủy cả file.
    expect(rows[0].row_error).toBeUndefined();
    expect(rows[0].ingredients).toEqual([]);
    expect(rows[1].title).toBe('Món Bình Thường');
    expect(rows[1].ingredients).toHaveLength(1);
  });

  it('JSON ingredients không hợp lệ -> đánh dấu row_error, không hủy cả file', async () => {
    const buffer = await makeWorkbook([
      {
        name: 'recipes',
        rows: [
          [
            'Món Lỗi',
            'mô tả',
            'nấu',
            10,
            20,
            2,
            'easy',
            'lunch',
            'vegan',
            'không phải JSON',
          ],
          happyRow('Món Tốt'),
        ],
      },
    ]);

    const { rows } = await callImport(buffer);

    expect(rows).toHaveLength(2);
    expect(rows[0].row_error).toContain('ingredients');
    expect(rows[0].ingredients).toEqual([]);
    expect(rows[1].title).toBe('Món Tốt');
  });

  it('sheet đầu rỗng nhưng có sheet khác chứa dữ liệu -> báo rõ tên sheet', async () => {
    const buffer = await makeWorkbook([
      { name: 'EmptySheet', rows: [] },
      { name: 'HappyCase', rows: [happyRow('Món Hợp Lệ')] },
    ]);

    await expect(callImport(buffer)).rejects.toThrow(
      /HappyCase/,
    );
  });

  it('file không phải xlsx -> 400 kèm thông báo chung', async () => {
    const { controller } = buildController();

    await expect(
      controller.import(
        { user: { user_id: 1 } },
        {
          originalname: 'bad.xlsx',
          buffer: Buffer.from('không phải file zip'),
          size: 20,
        },
      ),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('sheet có 15 dòng Happy + 15 dòng Unhappy (2 sheet) -> chỉ import 15 dòng sheet đầu', async () => {
    const buffer = await makeWorkbook([
      {
        name: 'HappyCase',
        rows: Array.from({ length: 15 }, (_, i) => happyRow(`Món ${i + 1}`)),
      },
      {
        name: 'UnhappyCase',
        rows: Array.from({ length: 15 }, (_, i) => [
          `Món Lỗi ${i + 1}`,
          'mô tả',
          'nấu',
          10,
          20,
          2,
          'easy',
          'lunch',
          'vegan',
          'không phải JSON',
        ]),
      },
    ]);

    const { rows } = await callImport(buffer);

    expect(rows).toHaveLength(15);
    expect(rows.every((r: any) => !r.row_error)).toBe(true);
  });
});
