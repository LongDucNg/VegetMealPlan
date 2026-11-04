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
    aliases: ["peanuts", "peanut", "PEANUT"],
    keywords: [
      "peanut", "peanuts", "peanut butter",
      "đậu phộng", "đậu phọng", "lạc", "bơ đậu phộng", "kẹo thèo lèo", "đậu phụng"
    ],
  },
  {
    id: "soy",
    name: "Đậu nành & đậu hũ",
    aliases: ["soy", "soya", "SOY"],
    keywords: [
      "soy", "soya", "tofu", "tempeh", "edamame", "soy sauce", "soy milk",
      "đậu nành", "đậu phụ", "tàu hũ", "đậu hũ", "đậu hủ", "tàu hũ ky", "tàu hũ ki",
      "phù trúc", "váng đậu", "chao", "nước tương", "xì dầu", "sữa đậu nành", "đạm đậu nành"
    ],
  },
  {
    id: "gluten",
    name: "Gluten (lúa mì)",
    aliases: ["gluten", "wheat", "GLUTEN"],
    keywords: [
      "gluten", "wheat", "flour", "bread", "seitan",
      "mì căn", "mì can", "lúa mì", "bột mì", "bánh mì", "mì sợi", "bột chiên xù", "mì căn tươi"
    ],
  },
  {
    id: "dairy",
    name: "Sữa & chế phẩm sữa",
    aliases: ["dairy", "milk", "lactose", "DAIRY"],
    keywords: [
      "dairy", "milk", "cheese", "butter", "yogurt", "cream",
      "sữa bò", "sữa tươi", "sữa đặc", "phô mai", "pho mai", "bơ sữa", "bơ lạt",
      "kem tươi", "sữa chua", "váng sữa", "sữa", "lactose"
    ],
  },
  {
    id: "treenut",
    name: "Hạt cây",
    aliases: ["tree_nuts", "tree_nut", "treenuts", "treenut", "TREE_NUT", "nuts"],
    keywords: [
      "cashew", "almond", "walnut", "pecan", "hazelnut", "macadamia", "pistachio",
      "hạt điều", "hạnh nhân", "óc chó", "hạt dẻ", "hồ đào", "mắc ca", "macca", "sữa hạt điều"
    ],
  },
  {
    id: "sesame",
    name: "Mè (vừng) & hạt gieo",
    aliases: ["sesame", "seed", "seeds", "SEED"],
    keywords: [
      "sesame", "sesame oil", "tahini", "chia", "flaxseed", "sunflower seed", "pumpkin seed",
      "mè", "vừng", "dầu mè", "mè đen", "mè trắng", "hạt chia", "hạt hướng dương", "hạt bí", "hạt lanh"
    ],
  },
  {
    id: "corn",
    name: "Bắp (ngô)",
    aliases: ["corn", "maize", "CORN"],
    keywords: ["corn", "maize", "cornstarch", "bắp", "ngô", "bột bắp", "bắp ngọt", "ngô ngọt", "bắp non"],
  },
  {
    id: "egg",
    name: "Trứng",
    aliases: ["egg", "eggs", "EGG"],
    keywords: [
      "egg", "eggs", "egg white", "egg yolk",
      "trứng", "trứng gà", "trứng cút", "trứng vịt", "lòng đỏ", "lòng trắng"
    ],
  },
  {
    id: "legume",
    name: "Họ đậu khác",
    aliases: ["legumes", "legume", "LEGUME"],
    keywords: [
      "đậu đen", "đậu xanh", "đậu đỏ", "đậu gà", "đậu lăng", "đậu hà lan",
      "đậu ngự", "đậu trắng", "đậu cove", "đậu cô ve", "đậu ván", "đậu mắt cua",
      "legume", "lentil", "chickpea", "black bean", "green bean", "red bean"
    ],
  },
  {
    id: "fungi",
    name: "Nấm",
    aliases: ["mushrooms", "mushroom", "fungi", "FUNGI"],
    keywords: [
      "nấm", "nấm rơm", "nấm hương", "nấm đông cô", "nấm đùi gà", "nấm mỡ",
      "nấm kim châm", "nấm bào ngư", "nấm linh chi", "nấm tuyết", "mộc nhĩ",
      "nấm mèo", "nấm hải sản", "nấm mối", "mushroom", "fungi"
    ],
  },
  {
    id: "allium",
    name: "Hành tỏi (ngũ vị tân)",
    aliases: ["allium", "ALLIUM"],
    keywords: [
      "hành", "tỏi", "hẹ", "kiệu", "hành tây", "hành lá", "hành tím",
      "boa-rô", "boaro", "baro", "hành boa rô", "tỏi cô đơn", "hành khô",
      "ngũ vị tân", "ngũ tân", "garlic", "onion", "shallot", "leek", "chive"
    ],
  },
  {
    id: "salt",
    name: "Muối",
    aliases: ["salt", "SALT"],
    keywords: ["muối", "salt", "muối ăn", "muối tinh", "muối hột", "muối biển", "muối hồng"],
  },
];
