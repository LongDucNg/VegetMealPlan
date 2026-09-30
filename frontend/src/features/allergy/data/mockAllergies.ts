export interface AllergenRule {
  id: string;
  name: string;
  keywords: string[];
}

export const COMMON_ALLERGENS: AllergenRule[] = [
  {
    id: "peanut",
    name: "Peanut",
    keywords: ["peanut", "peanuts", "peanut butter", "đậu phộng", "lạc"],
  },
  {
    id: "soy",
    name: "Soy",
    keywords: ["soy", "soya", "tofu", "tempeh", "edamame", "soy sauce", "soy milk", "đậu nành", "đậu phụ", "tàu hũ"],
  },
  {
    id: "gluten",
    name: "Gluten",
    keywords: ["gluten", "wheat", "flour", "bread", "seitan", "lúa mì", "bột mì"],
  },
  {
    id: "dairy",
    name: "Dairy",
    keywords: ["dairy", "milk", "cheese", "butter", "yogurt", "sữa bò", "phô mai", "bơ sữa"],
  },
  {
    id: "treenut",
    name: "Tree Nut",
    keywords: ["cashew", "almond", "walnut", "pecan", "hazelnut", "macadamia", "hạt điều", "hạnh nhân", "óc chó"],
  },
  {
    id: "sesame",
    name: "Sesame",
    keywords: ["sesame", "sesame oil", "tahini", "mè", "vừng", "dầu mè"],
  },
  {
    id: "corn",
    name: "Corn",
    keywords: ["corn", "maize", "cornstarch", "bắp", "ngô"],
  },
  {
    id: "egg",
    name: "Egg",
    keywords: ["egg", "eggs", "egg white", "egg yolk", "trứng"],
  },
];
