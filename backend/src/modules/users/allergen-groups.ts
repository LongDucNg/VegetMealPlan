// Nhóm dị ứng -> danh sách ingredient_id (sinh từ dữ liệu seed). Khi seed đổi thì cập nhật file này.
export interface AllergenGroup { code: string; name: string; examples: string; ingredient_ids: number[] }

export const ALLERGEN_GROUPS: AllergenGroup[] = [
  { code: 'SOY', name: "Đậu nành & sản phẩm từ đậu", examples: "Đậu hũ, tàu hũ ky, sữa đậu nành, nước tương, tương hột", ingredient_ids: [32, 33, 34, 35, 36, 37, 38, 39, 159, 160, 161, 162] },
  { code: 'TREE_NUT', name: "Các loại hạt cây", examples: "Hạt điều, hạnh nhân, óc chó, sữa hạnh nhân", ingredient_ids: [122, 123, 124, 187] },
  { code: 'PEANUT', name: "Đậu phộng (lạc)", examples: "Đậu phộng, đậu phộng rang", ingredient_ids: [49, 50] },
  { code: 'SEED', name: "Hạt gieo (mè, hướng dương, hạt bí)", examples: "Mè, dầu mè, hạt hướng dương, hạt bí", ingredient_ids: [125, 126, 127, 128, 150] },
  { code: 'GLUTEN', name: "Gluten (lúa mì)", examples: "Bột mì, mì sợi, bánh mì, mì căn, nước tương", ingredient_ids: [15, 16, 22, 23, 39, 40, 159] },
  { code: 'LEGUME', name: "Các loại họ Đậu khác", examples: "Đậu xanh, đậu đen, đậu đỏ, đậu gà, đậu lăng, đậu Hà Lan", ingredient_ids: [41, 42, 43, 44, 45, 46, 47, 48] },
  { code: 'EGG', name: "Trứng", examples: "Trứng gà, trứng cút", ingredient_ids: [185, 186] },
  { code: 'DAIRY', name: "Sữa và chế phẩm từ sữa", examples: "Sữa tươi, sữa đặc, bơ, phô mai, sữa chua, kem tươi", ingredient_ids: [179, 180, 181, 182, 183, 184] },
  { code: 'FUNGI', name: "Nấm", examples: "Các loại nấm tươi và khô", ingredient_ids: [88, 89, 90, 91, 92, 93, 94, 95, 189] },
  { code: 'ALLIUM', name: "Họ hành tỏi (ngũ tân)", examples: "Hành, tỏi. Người ăn chay Phật giáo thường kiêng", ingredient_ids: [132, 144, 145, 146] },
];

export const ALLERGEN_GROUP_CODES = ALLERGEN_GROUPS.map((g) => g.code);
