export interface ImportIngredientRow {
  ingredient_name: string;
  quantity: number;
  unit: string;
  is_optional?: boolean;
}

// 1 dong trong file import (VD sinh ra tu doc xlsx bang thu vien 'exceljs'
// o controller/service khac - TODO, chua wiring viec doc file o day, ham nay
// nhan vao mang object da parse san).
export interface ImportRecipeRow {
  title: string;
  description?: string;
  instructions: string;
  prep_time?: number;
  cook_time?: number;
  servings?: number;
  difficulty?: string;
  meal_type?: string;
  diet_type?: string;
  category_ids?: number[];
  // Lỗi đọc được khi controller parse dòng (VD: cột ingredients không phải JSON hợp lệ).
  // Dòng này sẽ được đánh dấu FAILED thay vì hủy toàn bộ lô import.
  row_error?: string;
  ingredients: ImportIngredientRow[];
}
