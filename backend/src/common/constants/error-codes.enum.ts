/**
 * Mã lỗi nghiệp vụ dùng chung cho toàn bộ backend.
 *
 * Vì sao có enum này: trước đây service chỉ ném exception kèm chuỗi tiếng Việt, nên FE
 * chỉ phân biệt được lỗi qua HTTP status (ví dụ cả "email đã tồn tại" lẫn "tài khoản
 * bị khoá" đều là 4xx chung chung) hoặc phải so khớp chuỗi message, rất dễ vỡ khi
 * sửa câu chữ. Giờ FE rẽ nhánh theo `error.code`, còn `error.message` chỉ để hiển thị.
 *
 * Quy ước đặt tên: <MIỀN>_<SỰ_CỐ>. Thêm mã mới thì ghi kèm HTTP status ở JSDoc.
 * Định dạng response lỗi vẫn theo doc FE: { success: false, error: { code, message } }.
 */
export enum ErrorCode {
  // ---- Chung ----
  /** 400: dữ liệu gửi lên không qua được ValidationPipe (chi tiết ở error.details). */
  VALIDATION_FAILED = 'VALIDATION_FAILED',
  /** 404: đường dẫn không tồn tại. */
  ROUTE_NOT_FOUND = 'ROUTE_NOT_FOUND',
  /** 500: lỗi không lường trước (đã được log ở server). */
  INTERNAL_ERROR = 'INTERNAL_ERROR',

  // ---- Auth ----
  /** 401: thiếu token, token sai hoặc hết hạn. */
  AUTH_UNAUTHORIZED = 'AUTH_UNAUTHORIZED',
  /** 403: đã đăng nhập nhưng không đủ quyền (sai role). */
  AUTH_FORBIDDEN = 'AUTH_FORBIDDEN',
  /** 409: email đã có tài khoản. */
  AUTH_EMAIL_TAKEN = 'AUTH_EMAIL_TAKEN',
  /** 401: sai email hoặc mật khẩu (cố ý dùng chung một mã để không lộ email nào tồn tại). */
  AUTH_INVALID_CREDENTIALS = 'AUTH_INVALID_CREDENTIALS',
  /** 401: tài khoản bị admin khoá. */
  AUTH_ACCOUNT_LOCKED = 'AUTH_ACCOUNT_LOCKED',

  // ---- User / hồ sơ ----
  /** 404 */
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  /** 400: current_goal_id không có trong bảng health_goals. */
  USER_GOAL_NOT_FOUND = 'USER_GOAL_NOT_FOUND',
  /** 400: height_cm / weight_kg thiếu hoặc <= 0 nên không tính được BMI. */
  USER_BODY_METRICS_INVALID = 'USER_BODY_METRICS_INVALID',
  /** 400: hồ sơ thiếu trường để tính nutrition-summary (tuổi, giới tính, chiều cao, cân nặng, mức vận động). */
  USER_PROFILE_INCOMPLETE = 'USER_PROFILE_INCOMPLETE',
  /** 400: ingredient_id trong danh sách dị ứng không tồn tại. */
  USER_ALLERGY_INGREDIENT_NOT_FOUND = 'USER_ALLERGY_INGREDIENT_NOT_FOUND',

  // ---- Danh mục ----
  /** 404 */
  CATEGORY_NOT_FOUND = 'CATEGORY_NOT_FOUND',
}
