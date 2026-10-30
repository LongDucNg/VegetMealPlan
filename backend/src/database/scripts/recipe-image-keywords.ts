/**
 * Từ điển để tìm ảnh món chay "đúng loại" khi kho ảnh không có đúng món Việt.
 *
 * Kho ảnh miễn phí trả kết quả rất lỏng cho tên tiếng Việt (tìm "Bánh canh nấm chay" ra ảnh pizza),
 * nên script KHÔNG nhận bừa ảnh đầu tiên mà bắt ảnh phải "khớp" (tags có đúng loại món / nguyên liệu chính):
 *   1. exact:   tìm bằng tên món tiếng Việt, tags có đúng tên loại món (vd "bánh xèo", "cháo").
 *   2. similar: tìm bằng tiếng Anh "loại món + nguyên liệu chính" (vd "congee pumpkin"), tags có loại món.
 *   3. generic: tìm bằng tiếng Anh chỉ loại món hoặc nguyên liệu chính (vd "congee", "tofu").
 * Không khớp bước nào thì để món không có ảnh (an toàn hơn ảnh sai).
 */

export interface DishType {
  /** Cụm từ ở ĐẦU tên món, chữ thường có dấu. */
  vi: string;
  /** Từ khoá tìm tiếng Anh. */
  en: string;
  /** Ảnh tiếng Anh chỉ được nhận khi tags có ít nhất một từ này. */
  must: string[];
  /** Tags có các từ này thì loại (trừ khi tên món cũng có), vd món bún không nhận ảnh spaghetti. */
  avoid?: string[];
}

const NOT_PASTA = ['spaghetti', 'pasta', 'italian', 'italy', 'mì ống', 'mỳ ống', 'người ý', 'mì ý'];
const NOT_WESTERN_PORRIDGE = [
  'oatmeal', 'oats', 'buckwheat', 'millet', 'muesli', 'granola', 'berries', 'chocolate',
  'yến mạch', 'quả mọng', 'dâu tây', 'kiều mạch', 'sô cô la', 'ngũ cốc',
];

export interface IngredientWord {
  vi: string;
  /** Cách gọi khác trong tags tiếng Việt (vd "bắp" / "ngô"). */
  viAlt?: string[];
  en: string;
  must: string[];
}

// Cụm dài đặt trước cụm ngắn ("bánh mì" trước "bánh", "nước ép" trước "nước").
export const DISH_TYPES: DishType[] = [
  { vi: 'bún riêu', en: 'vietnamese vermicelli soup', must: ['vermicelli', 'rice noodle', 'rice noodles'], avoid: NOT_PASTA },
  { vi: 'bún xào', en: 'stir fried rice vermicelli', must: ['vermicelli', 'rice noodle', 'rice noodles'], avoid: NOT_PASTA },
  { vi: 'bún', en: 'vietnamese rice vermicelli', must: ['vermicelli', 'rice noodle', 'rice noodles'], avoid: NOT_PASTA },
  { vi: 'phở cuốn', en: 'fresh spring rolls', must: ['roll', 'rolls', 'spring roll'] },
  { vi: 'phở', en: 'pho noodle soup', must: ['pho', 'rice noodle', 'rice noodles'], avoid: NOT_PASTA },
  { vi: 'hủ tiếu', en: 'rice noodle soup', must: ['rice noodle', 'rice noodles', 'noodle soup'], avoid: NOT_PASTA },
  { vi: 'mì quảng', en: 'vietnamese noodles', must: ['rice noodle', 'rice noodles', 'noodle soup'], avoid: NOT_PASTA },
  { vi: 'mì ý', en: 'pasta', must: ['pasta', 'spaghetti'] },
  { vi: 'mì căn', en: 'seitan', must: ['seitan', 'gluten'] },
  { vi: 'mì xào', en: 'stir fried noodles', must: ['noodle', 'noodles'], avoid: NOT_PASTA },
  { vi: 'mì', en: 'asian noodles', must: ['noodle', 'noodles', 'ramen'], avoid: NOT_PASTA },
  { vi: 'miến', en: 'glass noodles', must: ['glass noodles', 'noodle', 'noodles'], avoid: NOT_PASTA },
  { vi: 'nui', en: 'macaroni', must: ['macaroni', 'pasta'] },
  { vi: 'bánh canh', en: 'udon noodle soup', must: ['noodle', 'noodles', 'udon'], avoid: NOT_PASTA },
  { vi: 'cháo', en: 'congee rice porridge', must: ['congee', 'rice porridge', 'cháo'], avoid: NOT_WESTERN_PORRIDGE },
  { vi: 'xôi', en: 'sticky rice', must: ['sticky rice', 'glutinous'] },
  { vi: 'cơm chiên', en: 'fried rice', must: ['fried rice'] },
  { vi: 'cơm rang', en: 'fried rice', must: ['fried rice'] },
  { vi: 'cơm cuộn', en: 'kimbap', must: ['kimbap', 'gimbap', 'sushi roll'] },
  { vi: 'cơm', en: 'rice bowl', must: ['rice'] },
  { vi: 'bánh mì', en: 'sandwich baguette', must: ['sandwich', 'baguette', 'bread'] },
  { vi: 'bánh cuốn', en: 'steamed rice rolls', must: ['roll', 'rolls'] },
  { vi: 'bánh xèo', en: 'vietnamese crepe pancake', must: ['pancake', 'crepe'] },
  { vi: 'bánh khọt', en: 'mini pancakes', must: ['pancake', 'pancakes'] },
  { vi: 'bánh crepe', en: 'crepe', must: ['crepe', 'crepes'] },
  { vi: 'bánh flan', en: 'flan caramel pudding', must: ['flan', 'pudding', 'caramel'] },
  { vi: 'bánh bao', en: 'steamed buns', must: ['bun', 'buns', 'bao', 'dumpling'] },
  { vi: 'bánh tráng', en: 'rice paper', must: ['rice paper'] },
  { vi: 'bánh hỏi', en: 'rice vermicelli', must: ['vermicelli', 'rice noodle', 'rice noodles'], avoid: NOT_PASTA },
  { vi: 'bánh', en: 'cake', must: ['cake', 'cakes'] },
  { vi: 'gỏi cuốn', en: 'fresh spring rolls', must: ['roll', 'rolls', 'spring roll'] },
  { vi: 'bò bía', en: 'fresh spring rolls', must: ['roll', 'rolls', 'spring roll'] },
  { vi: 'nem', en: 'fried spring rolls', must: ['roll', 'rolls', 'spring roll'] },
  { vi: 'gỏi', en: 'salad', must: ['salad'] },
  { vi: 'nộm', en: 'salad', must: ['salad'] },
  { vi: 'salad', en: 'salad', must: ['salad'] },
  { vi: 'canh chua', en: 'sour soup', must: ['soup'] },
  { vi: 'canh', en: 'vegetable soup', must: ['soup', 'broth'] },
  { vi: 'súp', en: 'soup', must: ['soup'] },
  { vi: 'lẩu', en: 'hot pot', must: ['hot pot', 'hotpot'] },
  { vi: 'cà ri', en: 'curry', must: ['curry'] },
  { vi: 'chè', en: 'sweet dessert soup', must: ['dessert', 'pudding', 'sweet soup'] },
  { vi: 'sinh tố', en: 'smoothie', must: ['smoothie', 'smoothies'] },
  { vi: 'nước ép', en: 'fresh juice', must: ['juice'] },
  { vi: 'nước chanh dây', en: 'passion fruit juice', must: ['juice', 'passion fruit'] },
  { vi: 'nước chanh', en: 'lemonade', must: ['lemonade', 'lemon', 'lime'] },
  { vi: 'nước cam', en: 'orange juice', must: ['orange juice', 'juice'] },
  { vi: 'nước mía', en: 'sugarcane juice', must: ['sugarcane', 'juice'] },
  { vi: 'nước dừa', en: 'coconut water', must: ['coconut'] },
  { vi: 'nước', en: 'drink', must: ['drink', 'juice', 'beverage'] },
  { vi: 'sữa chua', en: 'yogurt', must: ['yogurt', 'yoghurt'] },
  { vi: 'sữa đậu nành', en: 'soy milk', must: ['soy milk', 'soymilk', 'milk'] },
  { vi: 'sữa', en: 'plant milk', must: ['milk'] },
  { vi: 'trà', en: 'tea', must: ['tea'] },
  { vi: 'matcha', en: 'matcha latte', must: ['matcha'] },
  { vi: 'ca cao', en: 'hot cocoa', must: ['cocoa', 'chocolate'] },
  { vi: 'yến mạch', en: 'oatmeal', must: ['oatmeal', 'oats', 'porridge'] },
  { vi: 'overnight oats', en: 'overnight oats', must: ['oats', 'oatmeal'] },
  { vi: 'pancake', en: 'pancakes', must: ['pancake', 'pancakes'] },
  { vi: 'kem', en: 'ice cream', must: ['ice cream'] },
  { vi: 'panna cotta', en: 'panna cotta', must: ['panna cotta', 'pudding'] },
  { vi: 'trứng chiên', en: 'omelette', must: ['omelette', 'omelet'] },
  { vi: 'trứng ốp la', en: 'fried egg', must: ['fried egg', 'egg'] },
  { vi: 'trứng', en: 'eggs', must: ['egg', 'eggs'] },
];

export const INGREDIENT_WORDS: IngredientWord[] = [
  { vi: 'đậu hũ', viAlt: ['đậu phụ'], en: 'tofu', must: ['tofu'] },
  { vi: 'tàu hũ ky', en: 'tofu skin', must: ['tofu', 'yuba'] },
  { vi: 'tàu hũ', en: 'tofu', must: ['tofu'] },
  { vi: 'đậu phụ', en: 'tofu', must: ['tofu'] },
  { vi: 'nấm', en: 'mushroom', must: ['mushroom', 'mushrooms'] },
  { vi: 'cà tím', en: 'eggplant', must: ['eggplant', 'aubergine'] },
  { vi: 'cà chua', en: 'tomato', must: ['tomato', 'tomatoes'] },
  { vi: 'cà rốt', en: 'carrot', must: ['carrot', 'carrots'] },
  { vi: 'khoai lang', en: 'sweet potato', must: ['sweet potato', 'sweet potatoes'] },
  { vi: 'khoai tây', en: 'potato', must: ['potato', 'potatoes', 'fries'] },
  { vi: 'khoai môn', en: 'taro', must: ['taro'] },
  { vi: 'khoai mì', en: 'cassava', must: ['cassava'] },
  { vi: 'bí đỏ', en: 'pumpkin', must: ['pumpkin', 'squash'] },
  { vi: 'bí ngòi', en: 'zucchini', must: ['zucchini', 'courgette'] },
  { vi: 'bí đao', en: 'winter melon', must: ['melon'] },
  { vi: 'khổ qua', en: 'bitter melon', must: ['bitter melon', 'bitter gourd'] },
  { vi: 'mướp', en: 'luffa gourd', must: ['gourd', 'luffa'] },
  { vi: 'bầu', en: 'bottle gourd', must: ['gourd'] },
  { vi: 'bắp cải', en: 'cabbage', must: ['cabbage'] },
  { vi: 'bông cải', en: 'broccoli', must: ['broccoli', 'cauliflower'] },
  { vi: 'cải thảo', en: 'napa cabbage', must: ['cabbage'] },
  { vi: 'cải bó xôi', en: 'spinach', must: ['spinach'] },
  { vi: 'rau muống', en: 'water spinach', must: ['spinach', 'greens'] },
  { vi: 'củ cải', en: 'radish', must: ['radish', 'daikon'] },
  { vi: 'su hào', en: 'kohlrabi', must: ['kohlrabi'] },
  { vi: 'su su', en: 'chayote', must: ['chayote'] },
  { vi: 'mồng tơi', en: 'malabar spinach', must: ['spinach', 'greens'] },
  { vi: 'giá', viAlt: ['giá đỗ'], en: 'bean sprouts', must: ['bean sprouts', 'sprouts'] },
  { vi: 'ngó sen', en: 'lotus stem', must: ['lotus'] },
  { vi: 'cải', en: 'leafy greens', must: ['greens', 'bok choy', 'vegetables'] },
  { vi: 'rau củ', en: 'vegetables', must: ['vegetable', 'vegetables'] },
  { vi: 'rau', en: 'vegetables', must: ['vegetable', 'vegetables', 'greens'] },
  { vi: 'bắp', viAlt: ['ngô'], en: 'corn', must: ['corn'] },
  { vi: 'măng', en: 'bamboo shoots', must: ['bamboo'] },
  { vi: 'đậu xanh', en: 'mung bean', must: ['mung', 'bean', 'beans'] },
  { vi: 'đậu đen', en: 'black beans', must: ['bean', 'beans'] },
  { vi: 'đậu đỏ', en: 'red beans', must: ['bean', 'beans'] },
  { vi: 'đậu lăng', en: 'lentils', must: ['lentil', 'lentils'] },
  { vi: 'đậu gà', en: 'chickpeas', must: ['chickpea', 'chickpeas'] },
  { vi: 'đậu hà lan', en: 'green peas', must: ['peas', 'pea'] },
  { vi: 'đậu que', en: 'green beans', must: ['bean', 'beans'] },
  { vi: 'đậu phộng', en: 'peanuts', must: ['peanut', 'peanuts'] },
  { vi: 'đậu', en: 'beans', must: ['bean', 'beans'] },
  { vi: 'gạo lứt', en: 'brown rice', must: ['rice'] },
  { vi: 'rong biển', en: 'seaweed', must: ['seaweed'] },
  { vi: 'kim chi', en: 'kimchi', must: ['kimchi'] },
  { vi: 'mít', en: 'jackfruit', must: ['jackfruit'] },
  { vi: 'chuối', en: 'banana', must: ['banana', 'bananas'] },
  { vi: 'xoài', en: 'mango', must: ['mango'] },
  { vi: 'dứa', en: 'pineapple', must: ['pineapple'] },
  { vi: 'dưa hấu', en: 'watermelon', must: ['watermelon'] },
  { vi: 'dưa leo', en: 'cucumber', must: ['cucumber'] },
  { vi: 'đu đủ', en: 'papaya', must: ['papaya'] },
  { vi: 'thanh long', en: 'dragon fruit', must: ['dragon fruit', 'pitaya'] },
  { vi: 'chanh dây', en: 'passion fruit', must: ['passion fruit'] },
  { vi: 'dâu', en: 'strawberry', must: ['strawberry', 'strawberries'] },
  { vi: 'táo đỏ', viAlt: ['táo tàu'], en: 'jujube', must: ['jujube', 'jujubes', 'red dates'] },
  { vi: 'táo tàu', en: 'jujube', must: ['jujube', 'jujubes', 'red dates'] },
  { vi: 'lá dứa', en: 'pandan', must: ['pandan'] },
  { vi: 'táo', en: 'apple', must: ['apple', 'apples'] },
  { vi: 'cam', en: 'orange', must: ['orange'] },
  { vi: 'dừa', en: 'coconut', must: ['coconut'] },
  { vi: 'hạt sen', en: 'lotus seeds', must: ['lotus'] },
  { vi: 'củ sen', en: 'lotus root', must: ['lotus'] },
  { vi: 'hạt chia', en: 'chia seeds', must: ['chia'] },
  { vi: 'mè đen', en: 'black sesame', must: ['sesame'] },
  { vi: 'gừng', en: 'ginger', must: ['ginger'] },
  { vi: 'hạnh nhân', en: 'almond', must: ['almond', 'almonds'] },
];

/** Cách nấu, ghép vào từ khoá tiếng Anh cho món mở đầu bằng nguyên liệu ("Đậu hũ xào sả ớt" -> "stir fried tofu"). */
export const COOKING_METHODS: { vi: string; en: string }[] = [
  { vi: 'xào', en: 'stir fried' },
  { vi: 'kho', en: 'braised' },
  { vi: 'om', en: 'braised' },
  { vi: 'chiên', en: 'fried' },
  { vi: 'rán', en: 'fried' },
  { vi: 'hấp', en: 'steamed' },
  { vi: 'nướng', en: 'grilled' },
  { vi: 'luộc', en: 'boiled' },
  { vi: 'hầm', en: 'stew' },
  { vi: 'sốt', en: 'in sauce' },
  { vi: 'nhồi', en: 'stuffed' },
];

/** Cụm từ trong tags có chứa tên loại món nhưng là thứ khác ("quả mâm xôi" không phải xôi). */
const TAG_COLLISIONS = ['mâm xôi', 'bó xôi', 'nước sốt', 'nước dùng', 'bánh mì kẹp thịt'];

const norm = (s: string) => s.normalize('NFC').toLowerCase().replace(/\s+/g, ' ').trim();
const wordRe = (phrase: string) => new RegExp(`(?<![\\p{L}\\p{N}])${phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![\\p{L}\\p{N}])`, 'u');

export function containsPhrase(text: string, phrase: string): boolean {
  let t = norm(text);
  for (const c of TAG_COLLISIONS) if (c !== norm(phrase)) t = t.split(c).join(' ');
  return wordRe(norm(phrase)).test(t);
}

/** Ảnh lạc đề hay gặp khi tìm theo nguyên liệu ("beans" ra hạt cà phê, "pumpkin" ra latte Halloween). */
const AVOID_ALWAYS = [
  'coffee', 'coffee beans', 'latte', 'espresso', 'toy', 'stuffed animal', 'halloween', 'donut', 'doughnut', 'doughnuts',
];

/** Từ cần tránh của loại món, bỏ những từ chính tên món có (vd "Cháo yến mạch" vẫn nhận ảnh yến mạch). */
export function avoidFor(dish: DishType | null, title: string): string[] {
  return [...(dish?.avoid ?? []), ...AVOID_ALWAYS].filter((w) => !containsPhrase(title, w));
}

export interface TitleAnalysis {
  dish: DishType | null;
  ingredient: IngredientWord | null;
  method: string | null;
}

/** Tách tên món thành loại món (ở đầu tên), nguyên liệu chính và cách nấu. */
export function analyzeTitle(title: string): TitleAnalysis {
  const t = norm(title);
  const dish = DISH_TYPES.find((d) => t === d.vi || t.startsWith(d.vi + ' ')) ?? null;
  const rest = dish ? t.slice(dish.vi.length) : t;
  // Nguyên liệu xuất hiện sớm nhất trong phần còn lại; cùng vị trí thì lấy cụm dài hơn.
  let ingredient: IngredientWord | null = null;
  let bestPos = Infinity;
  for (const ing of INGREDIENT_WORDS) {
    const m = wordRe(ing.vi).exec(rest);
    if (m && (m.index < bestPos || (m.index === bestPos && ing.vi.length > (ingredient?.vi.length ?? 0)))) {
      ingredient = ing;
      bestPos = m.index;
    }
  }
  const method = COOKING_METHODS.find((m) => wordRe(m.vi).test(rest))?.en ?? null;
  return { dish, ingredient, method };
}
