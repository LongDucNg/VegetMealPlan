import { IngredientItem } from "../types";

export interface IngredientConflictRule {
  id: string;
  ingredientA: string;
  ingredientB: string;
  reason: string;
  severity?: "warning" | "caution";
}

/**
 * Verified culinary and nutritional conflict rules database (Requirement 12)
 */
export const INGREDIENT_CONFLICT_RULES: IngredientConflictRule[] = [
  {
    id: "conf-1",
    ingredientA: "tofu",
    ingredientB: "spinach",
    reason: "High oxalic acid in spinach binds with calcium in tofu, significantly reducing calcium absorption.",
    severity: "warning",
  },
  {
    id: "conf-2",
    ingredientA: "soy milk",
    ingredientB: "brown sugar",
    reason: "Organic acids in unrefined brown sugar can cause protein denaturation and curdling in soy milk.",
    severity: "caution",
  },
  {
    id: "conf-3",
    ingredientA: "carrot",
    ingredientB: "radish",
    reason: "Carrots contain ascorbic acid oxidase which breaks down high Vitamin C content in radishes.",
    severity: "caution",
  },
  {
    id: "conf-4",
    ingredientA: "persimmon",
    ingredientB: "sweet potato",
    reason: "Tannins in persimmon combined with stomach acid from sweet potatoes can form insoluble phytobezoars.",
    severity: "warning",
  },
  {
    id: "conf-5",
    ingredientA: "durian",
    ingredientB: "alcohol",
    reason: "Sulfur compounds in durian inhibit aldehyde dehydrogenase, hindering alcohol metabolism.",
    severity: "warning",
  },
  {
    id: "conf-6",
    ingredientA: "cucumber",
    ingredientB: "tomato",
    reason: "Enzyme ascorbinase in cucumber degrades the antioxidant vitamin C in fresh tomatoes.",
    severity: "caution",
  },
];

export interface IngredientConflictMatch {
  rule: IngredientConflictRule;
  foundA: string;
  foundB: string;
}

function normalize(text: string): string {
  return text.toLowerCase().trim();
}

export const ingredientConflictService = {
  /**
   * Get all active conflict rules
   */
  getRules(): IngredientConflictRule[] {
    return INGREDIENT_CONFLICT_RULES;
  },

  /**
   * Evaluates a list of recipe ingredients against the conflict rules database
   */
  detectConflicts(ingredients: (IngredientItem | string)[]): IngredientConflictMatch[] {
    if (!ingredients || ingredients.length < 2) return [];

    const names = ingredients.map((ing) =>
      normalize(typeof ing === "string" ? ing : ing.name)
    );

    const matches: IngredientConflictMatch[] = [];

    for (const rule of INGREDIENT_CONFLICT_RULES) {
      const a = normalize(rule.ingredientA);
      const b = normalize(rule.ingredientB);

      const foundA = names.find((n) => n.includes(a) || a.includes(n));
      const foundB = names.find((n) => n.includes(b) || b.includes(n));

      if (foundA && foundB && foundA !== foundB) {
        matches.push({
          rule,
          foundA,
          foundB,
        });
      }
    }

    return matches;
  },
};
