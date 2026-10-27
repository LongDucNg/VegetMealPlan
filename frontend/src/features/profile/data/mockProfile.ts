import { UserProfile } from "../types";

export const DEFAULT_MOCK_PROFILE: UserProfile = {
  id: "guest",
  name: "Thành viên VeggieHub",
  age: null,
  gender: "",
  height: null,
  weight: null,
  activityLevel: "",
  healthGoal: "",
  vegetarianType: "",
  allergies: [],
  email: "",
  handle: "member",
  bio: "",
};

export const ALLERGY_MASTER_LIST = [
  { id: "peanut", label: "Đậu phộng (Lạc)" },
  { id: "soy", label: "Đậu nành & Đậu hũ" },
  { id: "gluten", label: "Gluten / Lúa mì" },
  { id: "dairy", label: "Sữa & Chế phẩm sữa (Lactose)" },
  { id: "treenut", label: "Hạt cây (Điều, Hạnh nhân, Óc chó)" },
  { id: "sesame", label: "Mè & Hạt gieo (Vừng, Hướng dương, Bí)" },
  { id: "corn", label: "Bắp (Ngô)" },
  { id: "egg", label: "Trứng" },
  { id: "legume", label: "Họ Đậu khác (Đậu đen, xanh, đỏ, gà...)" },
  { id: "fungi", label: "Nấm" },
  { id: "allium", label: "Họ hành tỏi (Ngũ vị tân)" },
];

export const VEGETARIAN_TYPE_OPTIONS: { id: UserProfile["vegetarianType"]; label: string; desc: string }[] = [
  { id: "vegan", label: "Thuần chay (Vegan)", desc: "100% nguồn gốc thực vật, không dùng sản phẩm động vật" },
  { id: "lacto_vegetarian", label: "Chay có sữa (Lacto)", desc: "Ăn thực vật + các chế phẩm từ sữa" },
  { id: "ovo_vegetarian", label: "Chay có trứng (Ovo)", desc: "Ăn thực vật + trứng gà/vịt" },
  { id: "lacto_ovo_vegetarian", label: "Chay có trứng & sữa (Ovo-Lacto)", desc: "Ăn thực vật + trứng + sữa" },
];

export const HEALTH_GOAL_OPTIONS: { id: UserProfile["healthGoal"]; label: string; desc: string }[] = [
  { id: "lose_weight", label: "Giảm cân", desc: "Thâm hụt ~500 kcal giúp đốt mỡ đều đặn" },
  { id: "maintain_weight", label: "Duy trì vóc dáng", desc: "Cân bằng năng lượng phù hợp chỉ số TDEE" },
  { id: "gain_weight", label: "Tăng cơ / Tăng cân", desc: "Dư thừa ~400 kcal + tối ưu đạm thực vật" },
  { id: "healthy_eating", label: "Ăn uống lành mạnh", desc: "Đa dạng vi chất dinh dưỡng và tiêu hóa khỏe" },
];

export const ACTIVITY_LEVEL_OPTIONS: { id: UserProfile["activityLevel"]; label: string; factor: number; desc: string }[] = [
  { id: "sedentary", label: "Ít vận động", factor: 1.2, desc: "Hầu như không tập luyện, công việc văn phòng" },
  { id: "light", label: "Vận động nhẹ", factor: 1.375, desc: "Tập luyện nhẹ nhàng / thể thao 1 - 3 ngày/tuần" },
  { id: "moderate", label: "Vận động vừa phải", factor: 1.55, desc: "Tập luyện thể thao 3 - 5 ngày/tuần" },
  { id: "active", label: "Vận động nhiều", factor: 1.725, desc: "Tập luyện cường độ cao 6 - 7 ngày/tuần" },
  { id: "very_active", label: "Vận động rất nhiều", factor: 1.9, desc: "Lao động thể lực nặng hoặc tập 2 buổi/ngày" },
];
