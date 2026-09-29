import { ChatSuggestion } from "../types";

export const CHAT_SUGGESTIONS: ChatSuggestion[] = [
  { text: "What should I eat for dinner?", category: "dinner" },
  { text: "Explain my BMI and body metrics", category: "bmi" },
  { text: "How many calories should I eat daily?", category: "macros" },
  { text: "Egg substitute for baking", category: "general" },
  { text: "How to get enough B12 in Vietnam", category: "general" },
  { text: "Protein in tofu vs tempeh", category: "macros" },
];

export const STATIC_KNOWLEDGE_BASE: Record<
  string,
  { text: string; substitution?: { original: string; substitute: string; reason: string; ratio: string } }
> = {
  "egg substitute for baking": {
    text: "For baking, eggs serve as binders, leaveners, and moisture providers. Here are the most reliable vegan substitutes:\n\n• **For binding:** Flax egg (1 tbsp ground flax + 3 tbsp water, rest 5 min) or chia egg.\n• **For lift:** 1 tsp baking soda + 1 tbsp apple cider vinegar per egg.\n• **For moisture & density:** 50g blended silken tofu per egg — works beautifully in brownies and quick breads.",
    substitution: {
      original: "1 Chicken Egg",
      substitute: "50g Silken Tofu (blended)",
      ratio: "1 egg = 50g silken tofu or 1 tbsp ground flax + 3 tbsp water",
      reason: "Provides moisture, emulsification, and dense crumb structure in brownies and quick breads without imparting flavor.",
    },
  },
  "how to get enough b12 in vietnam": {
    text: "B12 is the most critical nutrient for plant-based eaters since plants don't synthesize it reliably. In Vietnam:\n\n• **Supplementation:** A weekly 2,000–2,500µg cyanocobalamin tablet or daily 50–100µg dose is standard. Readily available at Pharmacity and An Khang.\n• **Fortified foods:** Nutritional yeast (men dinh dưỡng), fortified soy/oat milks sold at supermarkets.\n• **Target:** Aim for at least 2.4µg/day. If you consume eggs or dairy occasionally (lacto-ovo), part of your requirement may be met.",
  },
  "protein in tofu vs tempeh": {
    text: "Both are stellar soy proteins, but have different macro profiles:\n\n• **Firm Tofu (per 100g):** ~8–10g Protein, ~76 kcal. Soft, neutral, soaks up marinades.\n• **Tempeh (per 100g):** ~19–20g Protein (nearly 2× tofu!), ~193 kcal. Fermented whole soybeans, dense, nutty, rich in prebiotics.\n\n**Recommendation:** Use tofu for creamy soups/scrambles and tempeh for stir-fries and protein grain bowls.",
  },
};
