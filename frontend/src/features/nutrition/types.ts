export interface NutritionWarning {
  code: string;
  message: string;
}

export interface CalorieExplanationStep {
  step: number;
  formula: string;
  result: number | string;
  unit: string;
  note?: string;
}

export interface TargetGoalSummary {
  target_weight_kg: number;
  target_date: string;
  change_kg: number;
  weeks_left: number;
  weekly_change_kg: number;
  target_bmi: number;
}

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
  warnings?: NutritionWarning[];
  explanation?: CalorieExplanationStep[];
  target_goal?: TargetGoalSummary | null;
  note?: string;
}
