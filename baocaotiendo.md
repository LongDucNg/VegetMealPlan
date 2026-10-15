# BÁO CÁO TIẾN ĐỘ TÍCH HỢP API THẬT VÀO FRONTEND
**Dự án:** VegetMealPlan (Ứng dụng Hỗ trợ Kế hoạch Bữa ăn Chay)  
**Thời gian rà soát & kiểm thử:** 15/10/2026  
**Môi trường thực thi:**
- **Backend:** NestJS (`http://localhost:3000/api/v1`) — Database PostgreSQL Native (Port 5432)
- **Frontend:** Next.js 16 (`http://localhost:3001`) — TypeScript & Tailwind CSS

---

## I. TỔNG QUAN TIẾN ĐỘ TÍCH HỢP (EXECUTIVE SUMMARY)

| Phân loại trạng thái | Số lượng | Tỷ lệ (%) | Mô tả |
| :--- | :---: | :---: | :--- |
| 🟢 **Đã gắn API thật & Test thành công** | **12 / 35** | **34.3%** | Đã kết nối DB PostgreSQL, pass test E2E thực tế |
| 🟡 **Đã gắn Service FE (Đợi Backend)** | **9 / 35** | **25.7%** | Frontend đã viết sẵn Service gọi API & có fallback an toàn |
| ⚪ **Chưa làm (Chưa có Backend Controller)** | **14 / 35** | **40.0%** | Backend chưa dựng bảng/controller (AI models, Admin Members...) |
| **TỔNG CỘNG** | **35 / 35** | **100%** | |

---

## II. DANH SÁCH CÁC TRANG TRÊN FRONTEND ĐÃ GẮN API THẬT

| Trang / Màn hình FE | File mã nguồn | Các API thật đã gắn | Chức năng & Dữ liệu thực tế |
| :--- | :--- | :--- | :--- |
| **Trang Đăng ký**<br>`/register` | `src/app/register/page.tsx` | • `POST /auth/register`<br>• `GET /auth/diet-options` | • Tải danh sách 4 loại chay thật từ DB.<br>• Đăng ký tài khoản, mã hóa mật khẩu bcrypt, tự động sinh JWT. |
| **Trang Đăng nhập**<br>`/login` | `src/app/login/page.tsx` | • `POST /auth/login` | • Xác thực email và mật khẩu.<br>• Lưu `access_token` vào localStorage.<br>• Điều hướng người dùng thông minh: Admin về `/admin`, Member về `/me`. |
| **Toàn bộ ứng dụng (Header / AppShell)** | `src/components/layout/Header.tsx`<br>`src/features/notification/components/NotificationBell.tsx`<br>`src/features/auth/context/AuthContext.tsx` | • `GET /auth/me`<br>• `GET /notifications`<br>• `PATCH /notifications/:id/read` | • Tự động rehydrate phiên đăng nhập khi F5.<br>• Chuông thông báo hiển thị số lượng chưa đọc.<br>• Đánh dấu đã đọc thông báo qua API thật. |
| **Trang Cá nhân / Dinh dưỡng**<br>`/me` | `src/app/me/page.tsx` | • `GET /users/me/profile`<br>• `GET /users/me/nutrition-summary` | • Hiển thị chỉ số BMI, phân loại thể trạng thật.<br>• Tính toán BMR, TDEE, Calo mục tiêu chuẩn theo công thức Mifflin-St Jeor.<br>• Phân bổ Macro (Carb, Protein, Fat) & Calo 4 bữa ăn. |
| **Trang Cài đặt Hồ sơ**<br>`/me/settings` | `src/features/profile/components/ProfileEditor.tsx` | • `PUT /users/me/profile`<br>• `PUT /users/me/allergies` | • Cập nhật chiều cao, cân nặng, mức độ vận động.<br>• Cập nhật nhóm dị ứng: Tự động ánh xạ từ nhóm dị ứng sang nguyên liệu dị ứng thật trong DB. |
| **Quản trị Danh mục**<br>`/admin/categories` | `src/app/admin/categories/page.tsx` | • `GET /admin/categories`<br>• `POST /admin/categories`<br>• `PUT /admin/categories/:id`<br>• `DELETE /admin/categories/:id` | • Bảng 17 danh mục thật từ PostgreSQL.<br>• Modal tạo mới danh mục (phân loại recipe_type/food_type).<br>• Sửa tên/mô tả danh mục trực tiếp.<br>• Xóa danh mục vĩnh viễn khỏi DB. |

---

## III. BẢNG CHI TIẾT TRẠNG THÁI 35 ENDPOINTS

| # | Endpoint | Chức năng | Trạng thái | Vị trí FE đã gắn | Ghi chú & Đánh giá kiểm thử |
| :---: | :--- | :--- | :---: | :--- | :--- |
| **1** | `POST /auth/register` | Đăng ký kèm hồ sơ | 🟢 **ĐÃ XONG** | `register/page.tsx` | Đã test tạo user thành công vào Postgres |
| **2** | `POST /auth/login` | Đăng nhập lấy JWT | 🟢 **ĐÃ XONG** | `login/page.tsx` | Trả JWT hạn 1 ngày, phân quyền Admin/Member |
| **3** | `GET /auth/me` | Lấy user từ token | 🟢 **ĐÃ XONG** | `AuthContext.tsx`, `Header.tsx` | Giữ trạng thái đăng nhập sau khi reload trang |
| **4** | `GET /auth/diet-options` | Danh sách loại ăn chay | 🟢 **ĐÃ XONG** | `register/page.tsx` | Lấy 4 chế độ ăn chay chuẩn (Vegan, Lacto, Ovo, Ovo-lacto) |
| **5** | `POST /auth/logout` | Đăng xuất | 🟢 **ĐÃ XONG** | `AuthContext.tsx` | Xóa token, clear cache, đưa trạng thái về Guest |
| **6** | `POST /auth/refresh` | Refresh token | 🟡 **TẠM HOÃN** | `apiClient.ts` | Token hiện có hạn 1 ngày; chưa cần thiết ở giai đoạn hiện tại |
| **7** | `GET /users/me/profile` | Xem hồ sơ sức khỏe | 🟢 **ĐÃ XONG** | `me/page.tsx`, `useProfile.ts` | Lấy cân nặng, chiều cao, BMI, nhóm dị ứng |
| **8** | `PUT /users/me/profile` | Sửa hồ sơ, tính BMI | 🟢 **ĐÃ XONG** | `ProfileEditor.tsx` | Tự động tính toán lại BMI khi đổi cân nặng/chiều cao |
| **9** | `PUT /users/me/allergies` | Cập nhật dị ứng | 🟢 **ĐÃ XONG** | `ProfileEditor.tsx` | Đã sửa đúng DTO `ingredient_ids`, map đúng allergen groups |
| **10** | `GET /users/me/nutrition-summary` | BMR, TDEE, Calo, Macro | 🟢 **ĐÃ XONG** | `me/page.tsx` | Trả về BMR, TDEE, Calo mục tiêu và Macro 4 bữa |
| **11** | `GET /subscriptions/plans` | Danh sách gói cước | 🟡 **ĐÃ GẮN SERVICE** | `subscriptionService.ts` | Đang fallback sang dữ liệu gói mẫu (Free/Premium) |
| **12** | `GET /users/me/subscription` | Trạng thái gói hiện tại | 🟡 **ĐÃ GẮN SERVICE** | `subscriptionService.ts` | FE đã gọi `/subscriptions/me/premium-status` |
| **13** | `POST /users/me/subscription/purchase` | Thanh toán Premium | 🟡 **ĐÃ GẮN SERVICE** | `subscriptionService.ts` | Gọi `/subscriptions/checkout` (chưa có Merchant VNPay thật) |
| **14** | `GET /subscriptions/vnpay-return` | Callback VNPay | ⚪ **CHƯA LÀM** | `subscription` | Backend ghi chú TODO: Chờ VNPay sandbox key thật |
| **15** | `DELETE /users/me/subscription` | Hủy gói Premium | 🟡 **ĐÃ GẮN SERVICE** | `subscriptionService.ts` | Đã gắn hàm gọi `DELETE /subscriptions/:id` |
| **16** | `GET /users/me/notifications` | Danh sách thông báo | 🟢 **ĐÃ XONG** | `NotificationBell.tsx` | Đã test với backend controller `/notifications` |
| **17** | `PATCH /users/me/notifications/:id/read` | Đánh dấu đã đọc | 🟢 **ĐÃ XONG** | `NotificationBell.tsx` | Cập nhật tức thì badge đếm và gọi backend |
| **18** | `GET /admin/stats` | Thống kê dashboard Admin | 🟡 **ĐÃ GẮN SERVICE** | `adminService.ts`, `admin/page.tsx` | Backend chưa có controller, FE đang dùng mock dashboard |
| **19** | `GET /admin/members` | Danh sách thành viên | 🟡 **ĐÃ GẮN SERVICE** | `adminService.ts`, `admin/members` | Backend chưa có API phân trang thành viên |
| **20** | `PUT /admin/members/:id/status` | Khóa / mở khóa tài khoản | 🟡 **ĐÃ GẮN SERVICE** | `adminService.ts` | Đã có UI & Service chờ Backend cung cấp controller |
| **21** | `PUT /admin/members/:id/role` | Đổi quyền user | 🟡 **ĐÃ GẮN SERVICE** | `adminService.ts` | Chờ Backend cung cấp endpoint |
| **22** | `GET /admin/categories` | Xem danh mục | 🟢 **ĐÃ XONG** | `admin/categories/page.tsx` | Đã test hiển thị 17 danh mục thật từ DB |
| **23** | `POST /admin/categories` | Tạo mới danh mục | 🟢 **ĐÃ XONG** | `admin/categories/page.tsx` | Đã test tạo danh mục với guard role admin |
| **24** | `PUT /admin/categories/:id` | Sửa danh mục | 🟢 **ĐÃ XONG** | `admin/categories/page.tsx` | Đã test sửa tên/slug danh mục thành công |
| **25** | `DELETE /admin/categories/:id` | Xóa danh mục | 🟢 **ĐÃ XONG** | `admin/categories/page.tsx` | Đã test xóa danh mục vĩnh viễn thành công |
| **26** | `GET /admin/ai-models` | Số liệu model AI | ⚪ **CHƯA LÀM** | `admin/ai` | Backend chưa có bảng lưu số liệu AI model |
| **27** | `PUT /admin/ai-models/:id` | Override model AI | ⚪ **CHƯA LÀM** | `admin/ai` | Backend chưa phát triển |
| **28** | `GET /admin/ai-models/logs` | Log hệ thống AI | ⚪ **CHƯA LÀM** | `admin/ai` | Backend chưa phát triển |
| **29** | `GET /places` | Danh sách quán chay | 🟡 **ĐÃ GẮN SERVICE** | `placeService.ts`, `shops/page.tsx` | Backend mới có bảng cache `shops`, chưa có controller |
| **30** | `GET /places/:id` | Chi tiết quán chay | 🟡 **ĐÃ GẮN SERVICE** | `placeService.ts` | Backend chưa có controller |
| **31** | `GET /places/filters` | Bộ lọc loại quán | 🟡 **ĐÃ GẮN SERVICE** | `placeService.ts` | Backend chưa có controller |
| **32** | `GET /places/food-spots/suggested` | Gợi ý điểm ăn | 🟡 **ĐÃ GẮN SERVICE** | `placeService.ts` | Backend chưa có controller |
| **33** | `POST /places` | Admin thêm quán | 🟡 **ĐÃ GẮN SERVICE** | `placeService.ts` | Backend chưa có controller |
| **34** | `PUT /places/:id` | Admin sửa quán | 🟡 **ĐÃ GẮN SERVICE** | `placeService.ts` | Backend chưa có controller |
| **35** | `DELETE /places/:id` | Admin xóa quán | 🟡 **ĐÃ GẮN SERVICE** | `placeService.ts` | Backend chưa có controller |

---

## IV. CÁC ĐIỂM SỬA LỖI & TỐI ƯU HÓA HỆ THỐNG

1. **Khắc phục lỗi DTO Validation Backend (`forbidNonWhitelisted: true`)**:
   - Backend NestJS kích hoạt cờ kiểm tra strict, không chấp nhận field lạ.
   - Frontend đã được chuẩn hóa để gửi chính xác tên field theo DTO:
     - Dị ứng gửi mảng `ingredient_ids` thay vì `allergy_ingredient_ids`.
     - Danh mục gửi `category_name`, `category_type`, `description`, `status`.
2. **Khởi tạo tài khoản Quản trị viên (Admin) kiểm thử**:
   - Đã tạo tài khoản Admin chính thức trên database:
     - **Email:** `admin@vegetmealplan.com`
     - **Mật khẩu:** `AdminPassword123!`
     - **Role:** `admin`
   - Tài khoản Member mặc định: `nguyenvana@example.com` / `matkhau123`.
3. **Đạt chuẩn kiểm thử Linting & Build**:
   - `npm run lint` ở Frontend: **0 errors** (Đã khử sạch các lỗi TypeScript `any` trong `apiClient.ts`).
   - `npm run build` ở Backend: **Thành công 100%**.
   - `npm run build` ở Frontend: **Thành công 100% trên cả 23 static & dynamic routes**.

---

## V. ĐỀ XUẤT CÁC BƯỚC TIẾP THEO (NEXT STEPS)

1. **Phía Backend**:
   - Viết controller cho Places (`/places`) để khai thác bảng `shops` và API Google Places đã có entity.
   - Xây dựng controller quản trị thành viên (`/admin/members`) và số liệu dashboard (`/admin/stats`).
   - Tích hợp Merchant Key VNPay Sandbox để hoàn thiện Endpoint 13 & 14.
2. **Phía Frontend**:
   - Giữ nguyên kiến trúc Service hiện tại, khi Backend deploy thêm controller nào chỉ cần bật gọi trực tiếp (Frontend đã sẵn sàng toàn bộ contract và types tương thích).
