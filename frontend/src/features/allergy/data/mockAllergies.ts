export interface AllergenRule {
  id: string;
  name: string;
  keywords: string[];
  aliases?: string[];
}

export const COMMON_ALLERGENS: AllergenRule[] = [
  {
    id: "peanut",
    name: "Đậu phộng (lạc)",
    aliases: ["peanuts", "peanut"],
    keywords: ["peanut", "peanuts", "peanut butter", "đậu phộng", "lạc"],
  },
  {
    id: "soy",
    name: "Đậu nành & đậu hũ",
    aliases: ["soy", "soya"],
    keywords: ["soy", "soya", "tofu", "tempeh", "edamame", "soy sauce", "soy milk", "đậu nành", "đậu phụ", "tàu hũ"],
  },
  {
    id: "gluten",
    name: "Gluten (lúa mì)",
    aliases: ["gluten", "wheat"],
    keywords: ["gluten", "wheat", "flour", "bread", "seitan", "lúa mì", "bột mì"],
  },
  {
    id: "dairy",
    name: "Sữa & chế phẩm sữa",
    aliases: ["dairy", "milk", "lactose"],
    keywords: ["dairy", "milk", "cheese", "butter", "yogurt", "sữa bò", "phô mai", "bơ sữa", "sữa"],
  },
  {
    id: "treenut",
    name: "Hạt cây",
    aliases: ["tree_nuts", "tree_nut", "treenuts", "treenut"],
    keywords: ["cashew", "almond", "walnut", "pecan", "hazelnut", "macadamia", "hạt điều", "hạnh nhân", "óc chó"],
  },
  {
    id: "sesame",
    name: "Mè (vừng) & hạt gieo",
    aliases: ["sesame", "seed", "seeds"],
    keywords: ["sesame", "sesame oil", "tahini", "mè", "vừng", "dầu mè"],
  },
  {
    id: "corn",
    name: "Bắp (ngô)",
    aliases: ["corn"],
    keywords: ["corn", "maize", "cornstarch", "bắp", "ngô"],
  },
  {
    id: "egg",
    name: "Trứng",
    aliases: ["egg", "eggs"],
    keywords: ["egg", "eggs", "egg white", "egg yolk", "trứng", "trứng gà", "trứng cút"],
  },
  {
    id: "legume",
    name: "Họ đậu khác",
    aliases: ["legumes", "legume"],
    keywords: ["đậu đen", "đậu xanh", "đậu đỏ", "đậu gà", "đậu lăng", "đậu hà lan", "legume", "lentil", "chickpea"],
  },
  {
    id: "fungi",
    name: "Nấm",
    aliases: ["mushrooms", "mushroom", "fungi"],
    keywords: ["nấm", "nấm rơm", "nấm hương", "nấm đông cô", "nấm đùi gà", "nấm mỡ", "nấm kim châm", "nấm bào ngư", "mushroom", "fungi"],
  },
  {
    id: "allium",
    name: "Hành tỏi (ngũ vị tân)",
    aliases: ["allium"],
    keywords: ["hành", "tỏi", "hẹ", "kiệu", "hành tây", "hành lá", "ngũ vị tân", "garlic", "onion", "shallot", "leek", "chive"],
  },
  {
    id: "salt",
    name: "Muối",
    aliases: ["salt"],
    keywords: ["muối", "salt", "muối ăn", "muối tinh", "muối hột", "muối biển"],
  },
];
