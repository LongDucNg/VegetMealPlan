export interface ServerNutritionSummary {
  bmi: number;
  bmi_category: string;
  bmr: number;
  tdee: number;
  goal: string;
  target_calories: number;
  macros: {
    protein_g: number;
    carbs_g: number;
    fat_g: number;
  };
  meal_calories: {
    breakfast: number;
    lunch: number;
    dinner: number;
    snack: number;
  };
  note: string;
}
