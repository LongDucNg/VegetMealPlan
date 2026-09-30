export interface ImportIngredientRow {
  ingredient_name: string;
  quantity: number;
  unit: string;
  is_optional?: boolean;
}

// 1 dong trong file import (VD sinh ra tu doc xlsx bang thu vien 'xlsx'/'exceljs'
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
  ingredients: ImportIngredientRow[];
}
