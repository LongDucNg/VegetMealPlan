// 190 chuẩn nguyên liệu từ hệ thống
export interface SystemIngredient {
  id: number;
  name: string;
}

export const SYSTEM_INGREDIENTS: SystemIngredient[] = [
  {
    "id": 1,
    "name": "Gạo tẻ (sống)"
  },
  {
    "id": 2,
    "name": "Gạo lứt (sống)"
  },
  {
    "id": 3,
    "name": "Gạo nếp (sống)"
  },
  {
    "id": 4,
    "name": "Gạo huyết rồng (sống)"
  },
  {
    "id": 5,
    "name": "Cơm trắng (đã nấu)"
  },
  {
    "id": 6,
    "name": "Cơm gạo lứt (đã nấu)"
  },
  {
    "id": 7,
    "name": "Bún tươi"
  },
  {
    "id": 8,
    "name": "Bánh phở tươi"
  },
  {
    "id": 9,
    "name": "Bánh canh tươi"
  },
  {
    "id": 10,
    "name": "Bánh hỏi"
  },
  {
    "id": 11,
    "name": "Sợi mì Quảng tươi"
  },
  {
    "id": 12,
    "name": "Hủ tiếu khô"
  },
  {
    "id": 13,
    "name": "Bún gạo khô"
  },
  {
    "id": 14,
    "name": "Miến dong khô"
  },
  {
    "id": 15,
    "name": "Mì sợi khô (lúa mì)"
  },
  {
    "id": 16,
    "name": "Bánh mì (ổ)"
  },
  {
    "id": 17,
    "name": "Bánh tráng gạo"
  },
  {
    "id": 18,
    "name": "Bột gạo"
  },
  {
    "id": 19,
    "name": "Bột nếp"
  },
  {
    "id": 20,
    "name": "Bột năng (tapioca)"
  },
  {
    "id": 21,
    "name": "Bột bắp"
  },
  {
    "id": 22,
    "name": "Bột mì đa dụng"
  },
  {
    "id": 23,
    "name": "Bột chiên xù"
  },
  {
    "id": 24,
    "name": "Bột sắn dây"
  },
  {
    "id": 25,
    "name": "Yến mạch"
  },
  {
    "id": 26,
    "name": "Trân châu / bột báng"
  },
  {
    "id": 27,
    "name": "Khoai tây"
  },
  {
    "id": 28,
    "name": "Khoai lang"
  },
  {
    "id": 29,
    "name": "Khoai môn"
  },
  {
    "id": 30,
    "name": "Khoai mì (sắn)"
  },
  {
    "id": 31,
    "name": "Bắp (ngô) tươi"
  },
  {
    "id": 32,
    "name": "Đậu hũ trắng"
  },
  {
    "id": 33,
    "name": "Đậu hũ non"
  },
  {
    "id": 34,
    "name": "Đậu hũ chiên"
  },
  {
    "id": 35,
    "name": "Tàu hũ ky khô"
  },
  {
    "id": 36,
    "name": "Sữa đậu nành không đường"
  },
  {
    "id": 37,
    "name": "Đậu nành hạt khô"
  },
  {
    "id": 38,
    "name": "Đạm đậu nành khô (thịt chay)"
  },
  {
    "id": 39,
    "name": "Giò chả chay"
  },
  {
    "id": 40,
    "name": "Mì căn (seitan)"
  },
  {
    "id": 41,
    "name": "Đậu xanh"
  },
  {
    "id": 42,
    "name": "Đậu xanh cà vỏ"
  },
  {
    "id": 43,
    "name": "Đậu đen"
  },
  {
    "id": 44,
    "name": "Đậu đỏ"
  },
  {
    "id": 45,
    "name": "Đậu trắng"
  },
  {
    "id": 46,
    "name": "Đậu gà khô"
  },
  {
    "id": 47,
    "name": "Đậu lăng"
  },
  {
    "id": 48,
    "name": "Đậu Hà Lan"
  },
  {
    "id": 49,
    "name": "Đậu phộng (lạc)"
  },
  {
    "id": 50,
    "name": "Đậu phộng rang"
  },
  {
    "id": 51,
    "name": "Rau muống"
  },
  {
    "id": 52,
    "name": "Cải ngọt"
  },
  {
    "id": 53,
    "name": "Cải bẹ xanh"
  },
  {
    "id": 54,
    "name": "Cải thảo"
  },
  {
    "id": 55,
    "name": "Bắp cải"
  },
  {
    "id": 56,
    "name": "Cải thìa"
  },
  {
    "id": 57,
    "name": "Su hào"
  },
  {
    "id": 58,
    "name": "Rau bó xôi"
  },
  {
    "id": 59,
    "name": "Rau dền"
  },
  {
    "id": 60,
    "name": "Rau ngót"
  },
  {
    "id": 61,
    "name": "Mồng tơi"
  },
  {
    "id": 62,
    "name": "Rau má"
  },
  {
    "id": 63,
    "name": "Cải cúc (tần ô)"
  },
  {
    "id": 64,
    "name": "Xà lách"
  },
  {
    "id": 65,
    "name": "Bông cải xanh"
  },
  {
    "id": 66,
    "name": "Súp lơ trắng"
  },
  {
    "id": 67,
    "name": "Cà rốt"
  },
  {
    "id": 68,
    "name": "Củ cải trắng"
  },
  {
    "id": 69,
    "name": "Củ dền"
  },
  {
    "id": 70,
    "name": "Bí đỏ"
  },
  {
    "id": 71,
    "name": "Bí đao (bí xanh)"
  },
  {
    "id": 72,
    "name": "Bí ngòi"
  },
  {
    "id": 73,
    "name": "Mướp hương"
  },
  {
    "id": 74,
    "name": "Khổ qua (mướp đắng)"
  },
  {
    "id": 75,
    "name": "Dưa leo"
  },
  {
    "id": 76,
    "name": "Cà chua"
  },
  {
    "id": 77,
    "name": "Cà tím"
  },
  {
    "id": 78,
    "name": "Ớt chuông"
  },
  {
    "id": 79,
    "name": "Đậu cô ve"
  },
  {
    "id": 80,
    "name": "Đậu bắp"
  },
  {
    "id": 81,
    "name": "Giá đỗ"
  },
  {
    "id": 82,
    "name": "Dưa cải chua"
  },
  {
    "id": 83,
    "name": "Củ năng"
  },
  {
    "id": 84,
    "name": "Củ sen (ngó sen)"
  },
  {
    "id": 85,
    "name": "Măng tươi"
  },
  {
    "id": 86,
    "name": "Bắp chuối (hoa chuối)"
  },
  {
    "id": 87,
    "name": "Hoa thiên lý"
  },
  {
    "id": 88,
    "name": "Nấm rơm"
  },
  {
    "id": 89,
    "name": "Nấm bào ngư"
  },
  {
    "id": 90,
    "name": "Nấm đùi gà"
  },
  {
    "id": 91,
    "name": "Nấm kim châm"
  },
  {
    "id": 92,
    "name": "Nấm mỡ"
  },
  {
    "id": 93,
    "name": "Nấm đông cô tươi"
  },
  {
    "id": 94,
    "name": "Nấm hương khô"
  },
  {
    "id": 95,
    "name": "Mộc nhĩ khô"
  },
  {
    "id": 96,
    "name": "Chuối"
  },
  {
    "id": 97,
    "name": "Chuối xanh"
  },
  {
    "id": 98,
    "name": "Thơm (dứa)"
  },
  {
    "id": 99,
    "name": "Xoài chín"
  },
  {
    "id": 100,
    "name": "Đu đủ chín"
  },
  {
    "id": 101,
    "name": "Đu đủ xanh"
  },
  {
    "id": 102,
    "name": "Mít chín"
  },
  {
    "id": 103,
    "name": "Bơ"
  },
  {
    "id": 104,
    "name": "Cam"
  },
  {
    "id": 105,
    "name": "Chanh (quả)"
  },
  {
    "id": 106,
    "name": "Thanh long"
  },
  {
    "id": 107,
    "name": "Táo"
  },
  {
    "id": 108,
    "name": "Dưa hấu"
  },
  {
    "id": 109,
    "name": "Sầu riêng"
  },
  {
    "id": 110,
    "name": "Dâu tây"
  },
  {
    "id": 111,
    "name": "Bưởi"
  },
  {
    "id": 112,
    "name": "Ổi"
  },
  {
    "id": 113,
    "name": "Chanh dây"
  },
  {
    "id": 114,
    "name": "Cơm dừa tươi"
  },
  {
    "id": 115,
    "name": "Dừa nạo sấy"
  },
  {
    "id": 116,
    "name": "Nước dừa tươi"
  },
  {
    "id": 117,
    "name": "Nước cốt dừa"
  },
  {
    "id": 118,
    "name": "Nho khô"
  },
  {
    "id": 119,
    "name": "Me chua"
  },
  {
    "id": 120,
    "name": "Táo tàu khô"
  },
  {
    "id": 121,
    "name": "Hạt sen khô"
  },
  {
    "id": 122,
    "name": "Hạt điều"
  },
  {
    "id": 123,
    "name": "Hạnh nhân"
  },
  {
    "id": 124,
    "name": "Óc chó"
  },
  {
    "id": 125,
    "name": "Mè (vừng) trắng"
  },
  {
    "id": 126,
    "name": "Mè đen"
  },
  {
    "id": 127,
    "name": "Hạt hướng dương"
  },
  {
    "id": 128,
    "name": "Hạt bí"
  },
  {
    "id": 129,
    "name": "Hạt chia"
  },
  {
    "id": 130,
    "name": "Hạt lanh xay"
  },
  {
    "id": 131,
    "name": "Ngò rí"
  },
  {
    "id": 132,
    "name": "Hành lá"
  },
  {
    "id": 133,
    "name": "Rau thơm các loại"
  },
  {
    "id": 134,
    "name": "Húng quế"
  },
  {
    "id": 135,
    "name": "Rau răm"
  },
  {
    "id": 136,
    "name": "Tía tô"
  },
  {
    "id": 137,
    "name": "Lá chanh"
  },
  {
    "id": 138,
    "name": "Lá lốt"
  },
  {
    "id": 139,
    "name": "Lá dứa"
  },
  {
    "id": 140,
    "name": "Sả"
  },
  {
    "id": 141,
    "name": "Gừng"
  },
  {
    "id": 142,
    "name": "Nghệ tươi"
  },
  {
    "id": 143,
    "name": "Riềng"
  },
  {
    "id": 144,
    "name": "Tỏi"
  },
  {
    "id": 145,
    "name": "Hành tím"
  },
  {
    "id": 146,
    "name": "Hành tây"
  },
  {
    "id": 147,
    "name": "Ớt tươi"
  },
  {
    "id": 148,
    "name": "Dầu ăn thực vật"
  },
  {
    "id": 149,
    "name": "Dầu dừa"
  },
  {
    "id": 150,
    "name": "Dầu mè"
  },
  {
    "id": 151,
    "name": "Dầu ô liu"
  },
  {
    "id": 152,
    "name": "Đường cát trắng"
  },
  {
    "id": 153,
    "name": "Đường phèn"
  },
  {
    "id": 154,
    "name": "Đường nâu"
  },
  {
    "id": 155,
    "name": "Đường thốt nốt"
  },
  {
    "id": 156,
    "name": "Mật mía"
  },
  {
    "id": 157,
    "name": "Mật ong"
  },
  {
    "id": 158,
    "name": "Muối"
  },
  {
    "id": 159,
    "name": "Nước tương (xì dầu)"
  },
  {
    "id": 160,
    "name": "Tương hột"
  },
  {
    "id": 161,
    "name": "Dầu hào chay (nấm)"
  },
  {
    "id": 162,
    "name": "Nước mắm chay"
  },
  {
    "id": 163,
    "name": "Giấm"
  },
  {
    "id": 164,
    "name": "Tương ớt"
  },
  {
    "id": 165,
    "name": "Sa tế chay"
  },
  {
    "id": 166,
    "name": "Tương cà"
  },
  {
    "id": 167,
    "name": "Hạt nêm nấm"
  },
  {
    "id": 168,
    "name": "Bột nghệ"
  },
  {
    "id": 169,
    "name": "Bột cà ri"
  },
  {
    "id": 170,
    "name": "Tiêu đen"
  },
  {
    "id": 171,
    "name": "Ngũ vị hương"
  },
  {
    "id": 172,
    "name": "Quế"
  },
  {
    "id": 173,
    "name": "Ớt bột"
  },
  {
    "id": 174,
    "name": "Men dinh dưỡng"
  },
  {
    "id": 175,
    "name": "Bột cacao"
  },
  {
    "id": 176,
    "name": "Bột matcha"
  },
  {
    "id": 177,
    "name": "Bột rau câu (agar)"
  },
  {
    "id": 178,
    "name": "Rong biển khô"
  },
  {
    "id": 179,
    "name": "Sữa tươi"
  },
  {
    "id": 180,
    "name": "Sữa đặc có đường"
  },
  {
    "id": 181,
    "name": "Kem tươi"
  },
  {
    "id": 182,
    "name": "Bơ lạt"
  },
  {
    "id": 183,
    "name": "Phô mai mozzarella"
  },
  {
    "id": 184,
    "name": "Sữa chua không đường"
  },
  {
    "id": 185,
    "name": "Trứng gà"
  },
  {
    "id": 186,
    "name": "Trứng cút"
  },
  {
    "id": 187,
    "name": "Sữa hạnh nhân không đường"
  },
  {
    "id": 188,
    "name": "Nước dùng rau củ"
  },
  {
    "id": 189,
    "name": "Nước dùng nấm"
  },
  {
    "id": 190,
    "name": "Nước mía"
  }
];

export interface SystemAllergenGroup {
  code: string;
  name: string;
  ingredient_ids: number[];
}

export const SYSTEM_ALLERGEN_GROUPS: SystemAllergenGroup[] = [
  { code: 'SOY', name: "Đậu nành & sản phẩm từ đậu", ingredient_ids: [32, 33, 34, 35, 36, 37, 38, 39, 159, 160, 161, 162] },
  { code: 'TREE_NUT', name: "Các loại hạt cây", ingredient_ids: [122, 123, 124, 187] },
  { code: 'PEANUT', name: "Đậu phộng (lạc)", ingredient_ids: [49, 50] },
  { code: 'SEED', name: "Hạt gieo (mè, hướng dương, hạt bí)", ingredient_ids: [125, 126, 127, 128, 150] },
  { code: 'GLUTEN', name: "Gluten (lúa mì)", ingredient_ids: [15, 16, 22, 23, 39, 40, 159] },
  { code: 'LEGUME', name: "Các loại họ Đậu khác", ingredient_ids: [41, 42, 43, 44, 45, 46, 47, 48] },
  { code: 'EGG', name: "Trứng", ingredient_ids: [185, 186] },
  { code: 'DAIRY', name: "Sữa và chế phẩm từ sữa", ingredient_ids: [179, 180, 181, 182, 183, 184] },
  { code: 'FUNGI', name: "Nấm", ingredient_ids: [88, 89, 90, 91, 92, 93, 94, 95, 189] },
  { code: 'ALLIUM', name: "Họ hành tỏi (ngũ tân)", ingredient_ids: [132, 144, 145, 146] },
  { code: 'CORN', name: "Bắp (ngô)", ingredient_ids: [21, 31] },
];
