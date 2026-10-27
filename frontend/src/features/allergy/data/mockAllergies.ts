export interface AllergenRule {
  id: string;
  name: string;
  keywords: string[];
}

export const COMMON_ALLERGENS: AllergenRule[] = [
  {
    id: "peanut",
    name: "Đậu phộng (lạc)",
    keywords: ["peanut", "peanuts", "peanut butter", "đậu phộng", "lạc"],
  },
  {
    id: "soy",
    name: "Đậu nành & đậu hũ",
    keywords: ["soy", "soya", "tofu", "tempeh", "edamame", "soy sauce", "soy milk", "đậu nành", "đậu phụ", "tàu hũ"],
  },
  {
    id: "gluten",
    name: "Gluten (lúa mì)",
    keywords: ["gluten", "wheat", "flour", "bread", "seitan", "lúa mì", "bột mì"],
  },
  {
    id: "dairy",
    name: "Sữa & chế phẩm sữa",
    keywords: ["dairy", "milk", "cheese", "butter", "yogurt", "sữa bò", "phô mai", "bơ sữa"],
  },
  {
    id: "treenut",
    name: "Hạt cây",
    keywords: ["cashew", "almond", "walnut", "pecan", "hazelnut", "macadamia", "hạt điều", "hạnh nhân", "óc chó"],
  },
  {
    id: "sesame",
    name: "Mè (vừng) & hạt gieo",
    keywords: ["sesame", "sesame oil", "tahini", "mè", "vừng", "dầu mè"],
  },
  {
    id: "corn",
    name: "Bắp (ngô)",
    keywords: ["corn", "maize", "cornstarch", "bắp", "ngô"],
  },
  {
    id: "egg",
    name: "Trứng",
    keywords: ["egg", "eggs", "egg white", "egg yolk", "trứng"],
  },
  {
    id: "legume",
    name: "Họ đậu khác",
    keywords: ["đậu đen", "đậu xanh", "đậu đỏ", "đậu gà", "đậu lăng", "đậu hà lan", "legume", "lentil", "chickpea"],
  },
  {
    id: "fungi",
    name: "Nấm",
    keywords: ["nấm", "nấm rơm", "nấm hương", "nấm đông cô", "nấm đùi gà", "nấm mỡ", "nấm kim châm", "mushroom", "fungi"],
  },
  {
    id: "allium",
    name: "Hành tỏi (ngũ vị tân)",
    keywords: ["hành", "tỏi", "hẹ", "kiệu", "hành tây", "hành lá", "ngũ vị tân", "garlic", "onion", "shallot", "leek", "chive"],
  },
];
