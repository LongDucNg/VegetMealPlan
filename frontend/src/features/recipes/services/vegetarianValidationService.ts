import { VegetarianType } from "@/features/profile/types";
import { IngredientItem } from "../types";

// Keywords that indicate meat, poultry, fish, seafood or animal byproducts
const NON_VEGETARIAN_KEYWORDS = [
  "chicken",
  "beef",
  "pork",
  "bacon",
  "ham",
  "sausage",
  "meat",
  "poultry",
  "turkey",
  "duck",
  "lamb",
  "mutton",
  "veal",
  "fish",
  "salmon",
  "tuna",
  "shrimp",
  "prawn",
  "crab",
  "lobster",
  "seafood",
  "anchovy",
  "fish sauce",
  "oyster sauce",
  "clam",
  "squid",
  "octopus",
  "gelatin",
  "lard",
  "bone broth",
  // Vietnamese keywords
  "thịt",
  "gà",
  "bò",
  "heo",
  "lợn",
  "vịt",
  "cá",
  "tôm",
  "cua",
  "mực",
  "nước mắm",
  "chả lụa thịt",
  "giò heo",
];

// Keywords that indicate animal dairy/eggs (not suitable for strict Vegan)
const NON_VEGAN_KEYWORDS = [
  "cow milk",
  "dairy milk",
  "whole milk",
  "cheese",
  "cheddar",
  "parmesan",
  "mozzarella",
  "butter",
  "ghee",
  "dairy cream",
  "heavy cream",
  "sour cream",
  "egg",
  "eggs",
  "egg yolk",
  "egg white",
  "honey",
  "whey",
  "casein",
  // Vietnamese keywords
  "sữa bò",
  "phô mai",
  "bơ động vật",
  "trứng gà",
  "trứng vịt",
  "mật ong",
];

export interface VegetarianValidationResult {
  isCompliant: boolean;
  isStrictlyNonVeg: boolean;
  nonVegIngredients: string[];
  nonVeganIngredients: string[];
  issues: string[];
}

function normalize(text: string): string {
  return text.toLowerCase().trim();
}

export const vegetarianValidationService = {
  /**
   * Evaluates if a recipe's ingredients match vegetarian / vegan criteria (Requirement 13)
   */
  validate(
    ingredients: (IngredientItem | string)[],
    vegetarianType: VegetarianType = "vegan"
  ): VegetarianValidationResult {
    const rawNames = ingredients.map((ing) =>
      typeof ing === "string" ? ing : ing.name
    );

    const nonVegFound: string[] = [];
    const nonVeganFound: string[] = [];
    const issues: string[] = [];

    for (const name of rawNames) {
      const norm = normalize(name);

      // Check strictly non-vegetarian (meat/fish/seafood)
      for (const kw of NON_VEGETARIAN_KEYWORDS) {
        // Regex word boundary or token match to avoid false positives (e.g. "fish sauce" vs "vegan fish sauce")
        if (norm.includes("vegan") || norm.includes("chay") || norm.includes("plant-based")) {
          continue;
        }

        const regex = new RegExp(`(^|\\s|[.,/\\-_])${kw}([.,/\\-_]|\\s|$)`, "i");
        if (regex.test(norm) || norm === kw) {
          if (!nonVegFound.includes(name)) {
            nonVegFound.push(name);
          }
          break;
        }
      }

      // If vegan diet is specified, also check dairy/egg/honey
      if (vegetarianType === "vegan") {
        for (const kw of NON_VEGAN_KEYWORDS) {
          if (
            norm.includes("vegan") ||
            norm.includes("chay") ||
            norm.includes("plant-based") ||
            norm.includes("almond") ||
            norm.includes("soy") ||
            norm.includes("oat") ||
            norm.includes("coconut")
          ) {
            continue;
          }

          const regex = new RegExp(`(^|\\s|[.,/\\-_])${kw}([.,/\\-_]|\\s|$)`, "i");
          if (regex.test(norm) || norm === kw) {
            if (!nonVeganFound.includes(name)) {
              nonVeganFound.push(name);
            }
            break;
          }
        }
      }
    }

    if (nonVegFound.length > 0) {
      issues.push(`Contains non-vegetarian ingredients: ${nonVegFound.join(", ")}`);
    }

    if (nonVeganFound.length > 0 && vegetarianType === "vegan") {
      issues.push(
        `Vegetarian type is set to Vegan but contains animal products: ${nonVeganFound.join(", ")}`
      );
    }

    const isStrictlyNonVeg = nonVegFound.length > 0;
    const isCompliant = nonVegFound.length === 0 && nonVeganFound.length === 0;

    return {
      isCompliant,
      isStrictlyNonVeg,
      nonVegIngredients: nonVegFound,
      nonVeganIngredients: nonVeganFound,
      issues,
    };
  },
};
