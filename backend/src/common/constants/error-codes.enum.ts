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
  /** 404: service ném NotFoundException chưa gắn mã riêng (mã dự phòng). */
  RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND',
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
  /** 503: server chưa cấu hình GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET nên không đăng nhập Google được. */
  AUTH_GOOGLE_NOT_CONFIGURED = 'AUTH_GOOGLE_NOT_CONFIGURED',
  /** 401: mã đổi token sau khi đăng nhập Google không tồn tại, đã dùng hoặc đã hết hạn. */
  AUTH_GOOGLE_CODE_INVALID = 'AUTH_GOOGLE_CODE_INVALID',
  /** 401: refresh token sai, hết hạn, đã bị thu hồi hoặc đã dùng (xoay vòng). FE phải cho đăng nhập lại. */
  AUTH_REFRESH_TOKEN_INVALID = 'AUTH_REFRESH_TOKEN_INVALID',
  /** 400: mã OTP sai, đã dùng hoặc không tồn tại (cố ý dùng chung một mã để không lộ email nào đã đăng ký). */
  AUTH_OTP_INVALID = 'AUTH_OTP_INVALID',
  /** 400: mã OTP đã quá 10 phút. FE cho bấm "Gửi lại mã". */
  AUTH_OTP_EXPIRED = 'AUTH_OTP_EXPIRED',
  /** 400: nhập sai mã quá 5 lần, mã bị vô hiệu. FE cho bấm "Gửi lại mã". */
  AUTH_OTP_TOO_MANY_ATTEMPTS = 'AUTH_OTP_TOO_MANY_ATTEMPTS',
  /** 429: xin mã quá nhanh (cùng email trong 60 giây, hoặc cùng IP quá nhiều lần). */
  AUTH_OTP_RATE_LIMITED = 'AUTH_OTP_RATE_LIMITED',
  /** 400: mật khẩu hiện tại không đúng khi đổi mật khẩu (400 chứ không 401 để FE không tưởng hết phiên). */
  AUTH_WRONG_PASSWORD = 'AUTH_WRONG_PASSWORD',
  /** 400: tài khoản chỉ đăng nhập Google, chưa có mật khẩu để đổi. Dùng "Quên mật khẩu" để tạo mật khẩu. */
  AUTH_PASSWORD_NOT_SET = 'AUTH_PASSWORD_NOT_SET',
  /** 400: mật khẩu mới trùng mật khẩu hiện tại. */
  AUTH_PASSWORD_UNCHANGED = 'AUTH_PASSWORD_UNCHANGED',
  /** 403: đúng mật khẩu nhưng email chưa xác thực. FE chuyển sang màn nhập OTP (server đã gửi mã mới). */
  AUTH_EMAIL_NOT_VERIFIED = 'AUTH_EMAIL_NOT_VERIFIED',

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
  /** 400: target_date không sau hôm nay. */
  USER_TARGET_DATE_INVALID = 'USER_TARGET_DATE_INVALID',
  /** 400: admin tự khóa hoặc tự đổi vai trò của chính mình. */
  USER_CANNOT_MODIFY_SELF = 'USER_CANNOT_MODIFY_SELF',

  // ---- Gói Premium ----
  /** 404 */
  SUBSCRIPTION_TRANSACTION_NOT_FOUND = 'SUBSCRIPTION_TRANSACTION_NOT_FOUND',
  /** 404 */
  SUBSCRIPTION_NOT_FOUND = 'SUBSCRIPTION_NOT_FOUND',
  /** 400: chế độ cũ đã được gia hạn đang active. */
  SUBSCRIPTION_NOT_ACTIVE = 'SUBSCRIPTION_NOT_ACTIVE',
  /** 503: server chưa cấu hình VNPAY_TMN_CODE / VNPAY_HASH_SECRET. */
  SUBSCRIPTION_PAYMENT_NOT_CONFIGURED = 'SUBSCRIPTION_PAYMENT_NOT_CONFIGURED',

  // ---- Danh mục ----
  /** 404 */
  CATEGORY_NOT_FOUND = 'CATEGORY_NOT_FOUND',
  /** 400: category_id không tồn tại trong bảng categories. */
  CATEGORY_ID_NOT_FOUND = 'CATEGORY_ID_NOT_FOUND',
  /** 400: category_id không thuộc loại hợp lệ để gắn vào công thức. */
  CATEGORY_TYPE_INVALID = 'CATEGORY_TYPE_INVALID',
  /** 409: trùng tên danh mục trong cùng một category_type. */
  CATEGORY_NAME_DUPLICATE = 'CATEGORY_NAME_DUPLICATE',
  /** 409: danh mục đang được công thức/nội dung khác sử dụng nên không xoá/đổi loại được. */
  CATEGORY_IN_USE = 'CATEGORY_IN_USE',
  // ---- Diễn đàn ----
  /** 404 */
  FORUM_POST_NOT_FOUND = 'FORUM_POST_NOT_FOUND',
  /** 400: category_id không tồn tại, đã tắt, hoặc không thuộc diễn đàn. */
  FORUM_CATEGORY_INVALID = 'FORUM_CATEGORY_INVALID',

  // ---- Video ----
  /** 404: không tìm thấy video hoặc video chưa được duyệt. */
  VIDEO_NOT_FOUND = 'VIDEO_NOT_FOUND',
  /** 400: category không tồn tại, đã tắt, hoặc không thuộc video. */
  VIDEO_CATEGORY_INVALID = 'VIDEO_CATEGORY_INVALID',
  /** 403: không phải chủ video hoặc admin. */
  VIDEO_FORBIDDEN = 'VIDEO_FORBIDDEN',
  /** 400: nguyên liệu chứa từ khóa mặn. */
  VIDEO_NON_VEGETARIAN_INGREDIENT = 'VIDEO_NON_VEGETARIAN_INGREDIENT',
  /** 404: không tìm thấy bình luận video. */
  VIDEO_COMMENT_NOT_FOUND = 'VIDEO_COMMENT_NOT_FOUND',
  /** 400: không thể tự vote cho bình luận của chính mình. */
  VIDEO_SELF_VOTE_FORBIDDEN = 'VIDEO_SELF_VOTE_FORBIDDEN',

  // ---- Recipe / Nguyên liệu / Thực đơn ----
  /** 404 */
  RECIPE_NOT_FOUND = 'RECIPE_NOT_FOUND',
  /** 404 */
  INGREDIENT_NOT_FOUND = 'INGREDIENT_NOT_FOUND',
  /** 409: tên nguyên liệu đã tồn tại. */
  INGREDIENT_NAME_CONFLICT = 'INGREDIENT_NAME_CONFLICT',
  /** 400: tên nguyên liệu không được để trống. */
  INGREDIENT_NAME_EMPTY = 'INGREDIENT_NAME_EMPTY',
  /** 404 */
  MEAL_PLAN_NOT_FOUND = 'MEAL_PLAN_NOT_FOUND',

  // ---- Chatbot AI ----
  /** 429: hết hạn mức câu hỏi chatbot trong ngày. */
  CHATBOT_QUOTA_EXCEEDED = 'CHATBOT_QUOTA_EXCEEDED',
  /** 429: gửi câu hỏi quá nhanh (vượt quá 10 req/phút). */
  CHATBOT_RATE_LIMITED = 'CHATBOT_RATE_LIMITED',
  /** 400: khách chưa đăng nhập bắt buộc phải gửi session_id. */
  CHATBOT_SESSION_REQUIRED = 'CHATBOT_SESSION_REQUIRED',
  /** 503: server chưa cấu hình AI_API_KEY hoặc nhà cung cấp AI. */
  CHATBOT_AI_NOT_CONFIGURED = 'CHATBOT_AI_NOT_CONFIGURED',
  /** 503: dịch vụ AI tạm thời không khả dụng, quá thời gian hoặc lỗi mạng. */
  CHATBOT_SERVICE_UNAVAILABLE = 'CHATBOT_SERVICE_UNAVAILABLE',
}
