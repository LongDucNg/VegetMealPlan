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
  // Bat buoc.
  title: string;
  instructions: string;
  // Chi chap nhan: breakfast, lunch, snack (theo du lieu goc).
  meal_type: string;
  // Phai dung enum DietType.
  diet_type: string;
  // Toi thieu 1 nguyen lieu.
  ingredients: ImportIngredientRow[];

  // Khong bat buoc.
  description?: string;
  prep_time?: number;
  cook_time?: number;
  servings?: number;
  difficulty?: string;
  // Danh sách bữa ăn phù hợp, cách nhau dấu phẩy (vd. "lunch,dinner").
  suitable_meals?: string;
  category_ids?: number[];
  // Lỗi đọc được khi controller parse dòng (VD: cột ingredients không phải JSON hợp lệ).
  // Dòng này sẽ được đánh dấu FAILED thay vì hủy toàn bộ lô import.
  row_error?: string;
  // Số dòng THẬT trong file Excel (dòng 1 = header, dòng 2 = dữ liệu đầu tiên).
  // Controller gán khi đọc file để thông báo lỗi chỉ đúng dòng Excel.
  row_number?: number;
}
