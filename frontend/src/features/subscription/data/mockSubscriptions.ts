import { SubscriptionPlan, UserSubscription } from "../types";

export const MOCK_PLANS: SubscriptionPlan[] = [
  {
    id: "free",
    name: "Miễn phí",
    price: 0,
    formattedPrice: "0 VNĐ",
    duration: "free",
    billingCycleText: "Tính năng cơ bản",
    features: [
      "Xem danh mục công thức",
      "Khám phá các công thức món chay",
      "Xem chi tiết công thức",
      "Hồ sơ cá nhân cơ bản",
      "Tính toán chỉ số BMI cơ bản",
      "Thông tin dinh dưỡng cơ bản",
      "Xem trước thực đơn mẫu",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 99000,
    formattedPrice: "99.000 VNĐ",
    duration: "monthly",
    billingCycleText: "99.000 VNĐ / tháng",
    badge: "Toàn bộ tính năng",
    popular: true,
    features: [
      "Kế hoạch thực đơn cá nhân hóa toàn diện",
      "Mục tiêu calo theo chỉ số cơ thể",
      "Gợi ý bữa ăn dựa trên BMI & BMR",
      "Loại trừ dị ứng thực phẩm nghiêm ngặt",
      "Đầy đủ thực đơn tuần và lịch tháng",
      "Tùy biến đổi món và chỉnh sửa thực đơn",
      "AI Dinh dưỡng hỗ trợ tư vấn",
      "Tạo lại thực đơn không giới hạn",
      "Ưu tiên tích hợp món ăn yêu thích",
    ],
  },
];

export const DEFAULT_SUBSCRIPTION: UserSubscription = {
  status: "free",
  planId: "free",
  planName: "Free Plan",
  autoRenew: false,
};

