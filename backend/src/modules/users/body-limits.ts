/**
 * Khoảng giá trị hợp lệ cho chỉ số cơ thể. Dùng chung cho DTO đăng ký và cập nhật hồ sơ.
 * Công thức Mifflin-St Jeor dành cho người từ khoảng 10 tuổi trở lên, nên tuổi tối thiểu là 10.
 */
export const BODY_LIMITS = {
  age: { min: 10, max: 120 },
  height_cm: { min: 50, max: 250 },
  weight_kg: { min: 20, max: 300 },
} as const;
