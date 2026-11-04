/**
 * Xuất công thức ra file CSV (UTF-8 có BOM) để Excel đọc đúng tiếng Việt.
 *
 * Không thêm thư viện mới: CSV là text thuần, chỉ cần escape theo RFC 4180
 * và thêm BOM ở đầu file.
 */

/** Một dòng dữ liệu sẽ xuất ra CSV. */
export interface RecipeExportRow {
  recipe_id: number;
  title: string;
  description: string;
  diet_type: string;
  meal_type: string;
  suitable_meals: string;
  difficulty: string;
  servings: number | null;
  prep_time: number | null;
  cook_time: number | null;
  ingredient_count: number;
  ingredient_ids: string;
  ingredients: string;
  calories: number | null;
  protein: number | null;
  carbs: number | null;
  fat: number | null;
  fiber: number | null;
  estimated_cost: number | null;
  categories: string;
  instructions: string;
  image_url: string;
  status: string;
  created_by: number | null;
  created_at: string;
}

/** Cột của file CSV: key nội bộ + tiêu đề hiển thị cho người dùng. */
export interface CsvColumn<T> {
  label: string;
  value: (row: T) => string | number | null | undefined;
}

/**
 * BOM UTF-8. Excel cần byte này ở đầu file để nhận ra encoding là UTF-8,
 * nếu không tiếng Việt sẽ hiện lỗi font/mojibake khi mở file CSV.
 */
export const UTF8_BOM = '\uFEFF';

/**
 * Escape một ô theo RFC 4180.
 *
 * - Bọc dấu nháy kép khi giá trị chứa `,` `"` hoặc xuống dòng.
 * - Dấu nháy kép bên trong được nhân đôi.
 * - Chống "CSV injection": ô bắt đầu bằng = + - @ sẽ bị Excel hiểu là công thức
 *   nên thêm dấu `'` ở đầu. Chỉ áp dụng cho giá trị chuỗi, số không bị đổi.
 */
export function escapeCsvValue(raw: unknown): string {
  if (raw === null || raw === undefined) {
    return '';
  }

  let value = typeof raw === 'string' ? raw : String(raw);

  if (typeof raw === 'string' && /^[=+\-@\t\r]/.test(value)) {
    value = `'${value}`;
  }

  if (/[",\n\r]/.test(value)) {
    value = `"${value.replace(/"/g, '""')}"`;
  }

  return value;
}

/** Dựng nội dung CSV từ danh sách dòng và danh sách cột. */
export function buildCsv<T>(rows: T[], columns: CsvColumn<T>[]): string {
  const header = columns
    .map((column) => escapeCsvValue(column.label))
    .join(',');

  const body = rows.map((row) =>
    columns
      .map((column) => escapeCsvValue(column.value(row)))
      .join(','),
  );

  // CRLF là dấu xuống dòng chuẩn của CSV mở bằng Excel.
  return [header, ...body].join('\r\n') + '\r\n';
}

/**
 * Tự động xác định 1 trong 10 danh mục chuẩn khi công thức chưa có liên kết trong DB
 */
export function deriveCategoryFromTitle(title?: string, mealType?: string): string {
  const t = (title ?? '').toLowerCase();
  if (
    t.includes('mì') ||
    t.includes('bún') ||
    t.includes('phở') ||
    t.includes('hủ tiếu') ||
    t.includes('miến') ||
    t.includes('nui')
  ) {
    return 'Mì, Bún & Phở';
  }
  if (t.includes('cơm') || t.includes('xôi') || t.includes('cháo')) {
    return 'Cơm, Xôi & Cháo';
  }
  if (t.includes('canh') || t.includes('súp') || t.includes('lẩu')) {
    return 'Canh & Súp';
  }
  if (t.includes('kho') || t.includes('rim')) {
    return 'Món kho & Rim';
  }
  if (
    t.includes('xào') ||
    t.includes('chiên') ||
    t.includes('rán') ||
    t.includes('sốt')
  ) {
    return 'Xào & Chiên';
  }
  if (t.includes('luộc') || t.includes('hấp')) {
    return 'Luộc & Hấp';
  }
  if (
    t.includes('cuốn') ||
    t.includes('gỏi') ||
    t.includes('salad') ||
    t.includes('sa lát') ||
    t.includes('nộm')
  ) {
    return 'Cuốn, Gỏi & Sa lát';
  }
  if (
    t.includes('bánh') ||
    t.includes('nem') ||
    t.includes('chả giò') ||
    t.includes('ăn vặt')
  ) {
    return 'Bánh, Bánh bột & Ăn vặt';
  }
  if (
    t.includes('chè') ||
    t.includes('trà') ||
    t.includes('nước') ||
    t.includes('sinh tố') ||
    t.includes('sữa') ||
    t.includes('thạch')
  ) {
    return 'Tráng miệng & Đồ uống';
  }
  return 'Món đủ bữa';
}

/**
 * Các cột của file export công thức theo thứ tự khoa học:
 * Tên món -> Danh mục -> Chế độ ăn -> Nguyên liệu -> Hướng dẫn -> Dinh dưỡng & Chi phí
 */
export const RECIPE_CSV_COLUMNS: CsvColumn<RecipeExportRow>[] = [
  // 1. Nhóm thông tin cơ bản & phân loại
  { label: 'ID', value: (row) => row.recipe_id },
  { label: 'Tên công thức', value: (row) => row.title },
  { label: 'Danh mục', value: (row) => row.categories },
  { label: 'Mô tả', value: (row) => row.description },
  { label: 'Chế độ ăn', value: (row) => row.diet_type },
  { label: 'Loại bữa', value: (row) => row.meal_type },
  { label: 'Bữa phù hợp', value: (row) => row.suitable_meals },
  { label: 'Độ khó', value: (row) => row.difficulty },
  { label: 'Khẩu phần', value: (row) => row.servings },
  {
    label: 'Thời gian chuẩn bị (phút)',
    value: (row) => row.prep_time,
  },
  { label: 'Thời gian nấu (phút)', value: (row) => row.cook_time },

  // 2. Nhóm nguyên liệu & chế biến
  {
    label: 'Số lượng nguyên liệu',
    value: (row) => row.ingredient_count,
  },
  { label: 'Nguyên liệu', value: (row) => row.ingredients },
  { label: 'ID nguyên liệu', value: (row) => row.ingredient_ids },
  {
    label: 'Hướng dẫn thực hiện',
    value: (row) => row.instructions,
  },

  // 3. Nhóm dinh dưỡng & chi phí
  {
    label: 'Calo (kcal/khẩu phần)',
    value: (row) => row.calories,
  },
  { label: 'Protein (g)', value: (row) => row.protein },
  { label: 'Carb (g)', value: (row) => row.carbs },
  { label: 'Fat (g)', value: (row) => row.fat },
  { label: 'Fiber (g)', value: (row) => row.fiber },
  {
    label: 'Chi phí ước tính/khẩu phần',
    value: (row) => row.estimated_cost,
  },

  // 4. Nhóm hệ thống
  { label: 'Hình ảnh', value: (row) => row.image_url },
  { label: 'Trạng thái', value: (row) => row.status },
  { label: 'Người tạo (user_id)', value: (row) => row.created_by },
  { label: 'Ngày tạo', value: (row) => row.created_at },
];

/**
 * Tạo nội dung file CSV hoàn chỉnh (đã có BOM ở đầu).
 */
export function buildRecipeCsv(rows: RecipeExportRow[]): string {
  return UTF8_BOM + buildCsv(rows, RECIPE_CSV_COLUMNS);
}
