# VegetMealPlan

Web hỗ trợ người ăn chay: tra cứu món chay, tính dinh dưỡng theo hồ sơ cá nhân, lên thực đơn ngày/tuần/tháng loại trừ món gây dị ứng, quản lý nguyên liệu trong bếp (quét ảnh bằng AI), diễn đàn và video cộng đồng, trợ lý AI, tìm quán chay gần đây, gói Premium thanh toán qua PayOS (VietQR).

| Phần | Công nghệ |
|---|---|
| Backend | NestJS 10, TypeORM, PostgreSQL, JWT + Passport (Google OAuth2), Swagger |
| Frontend | Next.js 16 (App Router), React 19, Tailwind CSS 4, TypeScript 5 |
| Dịch vụ ngoài | PayOS (thanh toán VietQR), Cloudinary (ảnh/video), Brevo (email OTP), Groq (chatbot), Gemini (quét ảnh), Serper + OpenStreetMap (quán chay) |
| Triển khai | Render (backend), Vercel (frontend), Neon (PostgreSQL) |

## Bản đang chạy

| | URL |
|---|---|
| Giao diện | https://veget-meal-plan.vercel.app |
| API | https://vegetmealplan-api.onrender.com/api/v1 |
| Swagger | https://vegetmealplan-api.onrender.com/api/docs |

Backend chạy gói Free của Render: không có request trong 15 phút thì server ngủ, lần gọi đầu tiên sau đó chờ khoảng 50 giây.

---

## Cấu trúc repo

```
VegetMealPlan/
├── backend/                 # API NestJS
│   ├── src/
│   │   ├── common/          # guard, decorator, interceptor, filter, ErrorCode
│   │   ├── config/          # cấu hình TypeORM / data-source cho migration
│   │   ├── database/
│   │   │   ├── migrations/  # migration viết tay, chạy theo thứ tự timestamp
│   │   │   └── seeds/       # dữ liệu mẫu (món chay, nguyên liệu, nhóm dị ứng...)
│   │   └── modules/         # mỗi nghiệp vụ một module
│   └── .env.example
├── frontend/                # Next.js (chạy cổng 3001)
│   └── src/app/             # các trang: /recipes, /planner, /forum, /ai, /admin...
└── docs/
    ├── algorithm.md         # công thức BMI, BMR (Mifflin-St Jeor), TDEE, macro
    ├── deploy-db.md         # đưa database lên Neon
    └── erd.md               # sơ đồ quan hệ CSDL
```

---

## Chạy dự án ở máy local

### Yêu cầu

- Node.js 20+ và npm
- PostgreSQL 14+ cài trên máy (không cần Docker), hoặc dùng chung database Neon của nhóm qua `DATABASE_URL`

### 1. Tạo database

```sql
CREATE DATABASE vegetmealplan;
```

### 2. Backend

```bash
cd backend
cp .env.example .env        # Windows: copy .env.example .env
npm install
npm run migration:run       # tạo toàn bộ bảng
npm run seed                # nạp dữ liệu mẫu
npm run start:dev
```

Mở `.env` và sửa tối thiểu các biến sau:

| Biến | Ý nghĩa |
|---|---|
| `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_NAME` | kết nối PostgreSQL trên máy |
| `DATABASE_URL` | chuỗi kết nối đầy đủ (Neon); có biến này thì bỏ qua các biến `DB_*` ở trên. DB không phải localhost thì tự bật SSL |
| `DB_SYNCHRONIZE` | luôn để `false`, schema chỉ thay đổi qua migration (DB không phải localhost thì luôn bị tắt) |
| `DB_MIGRATIONS_RUN` | `true` thì tự chạy migration khi khởi động (bật trên Render); máy local để trống và chạy tay `npm run migration:run` |
| `JWT_SECRET` | chuỗi ngẫu nhiên dài, mỗi người tự sinh, không commit |
| `JWT_EXPIRES_IN` | hạn access token (mặc định `1d`) |
| `JWT_REFRESH_EXPIRES_DAYS` | hạn refresh token tính theo ngày (mặc định `30`) |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_CALLBACK_URL` | đăng nhập Google; để trống thì API Google trả 503, các chức năng khác vẫn chạy |
| `FRONTEND_URL` | địa chỉ FE: nơi backend redirect về sau khi đăng nhập Google, và là domain duy nhất được gọi API từ trình duyệt (CORS). Nhiều domain thì ngăn cách bằng dấu phẩy |
| `BREVO_API_KEY` | gửi mail OTP (đăng ký, quên mật khẩu) qua API HTTPS của Brevo. Bắt buộc trên Render vì gói Free chặn cổng SMTP |
| `MAIL_FROM` | người gửi, dạng `VegetMealPlan <email@gmail.com>`; email này phải được xác minh trong Brevo > Senders |
| `MAIL_HOST`, `MAIL_PORT`, `MAIL_USER`, `MAIL_PASS` | SMTP, chỉ dùng khi không có `BREVO_API_KEY` (máy local). Để trống cả hai thì nội dung mail (kèm mã) được in ra console |
| `GUEST_CHATBOT_LIMIT`, `FREE_CHATBOT_LIMIT` | số lượt hỏi chatbot mỗi ngày của khách / tài khoản free |
| `GROQ_API_KEY`, `GROQ_MODEL` | chatbot tư vấn ăn chay |
| `GEMINI_API_KEY`, `GEMINI_MODEL`, `GEMINI_FALLBACK_MODEL` | quét ảnh nguyên liệu; model chính quá tải (503) thì thử lại rồi chuyển sang model dự phòng |
| `SCAN_DAILY_LIMIT`, `SCAN_MAX_IMAGE_MB` | số lượt quét ảnh mỗi ngày, dung lượng ảnh tối đa |
| `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | lưu ảnh/video món ăn và cộng đồng (bắt buộc khi deploy, vì Render xoá ổ đĩa mỗi lần deploy) |
| `SERPER_API_KEY` | tìm quán chay gần đây (thiếu thì dùng OpenStreetMap) |
| `PIXABAY_API_KEY`, `PEXELS_API_KEY` | script lấy ảnh minh hoạ cho món ăn (`src/database/scripts/fetch-recipe-images.ts`) |
| `MONTHLY_PLAN_PRICE` | giá gói Premium theo tháng (VND) |
| `PAYOS_CLIENT_ID`, `PAYOS_API_KEY`, `PAYOS_CHECKSUM_KEY` | cổng thanh toán PayOS (VietQR). Webhook khai trên trang PayOS: `<địa chỉ API>/api/v1/subscriptions/payos-webhook` |
| `PAYOS_RETURN_URL`, `PAYOS_CANCEL_URL` | trang FE sau khi thanh toán / huỷ; để trống thì dùng `FRONTEND_URL/subscriptions/return` và `/cancel` |
| `PAYOS_RECEIVER_NAME`, `PAYOS_RECEIVER_ACCOUNT`, `PAYOS_RECEIVER_BANK` | tài khoản nhận tiền hiển thị ở trang đối soát của admin |
| `ALLOW_DIRECT_PREMIUM` | `true` cho phép kích hoạt Premium không qua thanh toán (chỉ để test); production luôn `false` |
| `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD`, `SEED_ADMIN_NAME` | tài khoản admin tạo khi chạy seed |

Sinh `JWT_SECRET` nhanh:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Seed nạp khoảng 628 món chay, 190 nguyên liệu, bảng nguyên liệu thay thế và các nhóm dị ứng. Muốn xoá dữ liệu cũ rồi nạp lại từ đầu:

```bash
SEED_RESET=true npm run seed          # Windows PowerShell: $env:SEED_RESET="true"; npm run seed
```

Trên database không phải localhost (Neon), lệnh reset bị từ chối trừ khi đặt thêm `SEED_RESET_CONFIRM` đúng bằng tên database, để không ai lỡ tay xoá dữ liệu chung.

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

### 4. Địa chỉ

| | URL |
|---|---|
| Giao diện | http://localhost:3001 |
| API | http://localhost:3000/api/v1 |
| Swagger | http://localhost:3000/api/docs |

---

## Phân công backend

| Người | Module | Nội dung chính |
|---|---|---|
| **BE1 – Long** | `auth`, `users`, `health-goal`, `category`, `subscription`, `notification`, `usage-quota`, `media`, `mail`; khung chung `common/`, `config/` | đăng ký/đăng nhập, Google OAuth2, phiên đăng nhập (refresh token, logout), quên/đổi mật khẩu (OTP email), hồ sơ và dị ứng, BMI/BMR/TDEE, danh mục, gói Premium qua PayOS và đối soát, thông báo, giới hạn lượt dùng, Cloudinary; database Neon và deploy Render |
| **BE2 – TLong** | `recipe`, `ingredient`, `nutrition`, `meal-plan`, `recipe-import` | món chay, duyệt món, yêu thích, giá tự nhập, nguyên liệu thay thế, dinh dưỡng, sinh thực đơn tuần/tháng, import món hàng loạt |
| **BE3 – Khang** | `community`, `chatbot`, `photo-scan`, `user-ingredient`, `recommendation`, `places`, `shop` | diễn đàn, video, kiểm duyệt nội dung, trợ lý AI, quét ảnh nguyên liệu, nguyên liệu trong bếp, gợi ý món từ nguyên liệu có sẵn, quán chay gần đây |

Frontend: **Đức**, **Huy**.

---

## Nhóm API chính

Mọi đường dẫn có tiền tố `/api/v1`. Danh sách đầy đủ và thử trực tiếp ở Swagger.

| Nhóm | Ví dụ |
|---|---|
| Xác thực | `POST /auth/register`, `/auth/login`, `/auth/refresh`, `/auth/logout`, `/auth/logout-all`; `GET /auth/google` → `POST /auth/google/exchange`; `GET /auth/me` |
| Mật khẩu | `POST /auth/forgot-password` → `POST /auth/reset-password` (OTP 6 số qua email); `PUT /auth/change-password` |
| Hồ sơ | `GET/PUT /users/me/profile`, `GET/PUT /users/me/allergies`, `GET /users/me/nutrition-summary` |
| Món ăn | `GET /recipes`, `GET /recipes/:id`, `GET /recipes/:id/cost`, `GET /recipes/:id/replacements`, `POST /recipes` |
| Yêu thích, giá riêng | `/users/me/favorites/recipes`, `/users/me/recipe-prices` |
| Thực đơn | `POST /meal-plans/generate/weekly`, `/monthly`, `/for-someone`; `/users/me/meal-plans` |
| Nguyên liệu | `GET /ingredients`, `/users/me/ingredients`, `POST /users/me/recommendations/generate` |
| Cộng đồng | `/forum/...`, `/videos` |
| AI | `POST /ai/chat` (chatbot); `POST /meal-plans/scan/detect` → `POST /meal-plans/scan/confirm` (quét ảnh nguyên liệu) |
| Quán chay | `GET /places/nearby` |
| Premium | `GET /subscriptions/plans`, `/subscriptions/me/premium-status`, `POST /subscriptions/checkout` → trang VietQR của PayOS → `POST /subscriptions/payos-webhook`; `GET /subscriptions/transactions/:orderCode` |
| Thông báo | `/notifications` |
| Quản trị | `/admin/members`, `/admin/categories`, `/admin/ingredients`, `/admin/recipes`, `/admin/recipe-imports`, `/admin/forum`, `/admin/moderation`, `/subscriptions/admin/transactions` |

### Quy ước chung

- **Xác thực:** mọi route mặc định cần `Authorization: Bearer <access_token>`. Route công khai đánh dấu `@Public()`, route quản trị đánh dấu `@Roles(UserRole.ADMIN)`. Lấy user hiện tại trong controller bằng `@CurrentUser('user_id')`.
- **Phiên đăng nhập:** access token mang `sid` trỏ tới bảng `user_sessions`, nên logout có hiệu lực ngay. Refresh token chỉ lưu dạng SHA-256 và được xoay vòng sau mỗi lần dùng.
- **Response thành công:**
  ```json
  { "success": true, "data": { }, "message": "..." }
  ```
- **Response lỗi:**
  ```json
  { "success": false, "error": { "code": "AUTH_INVALID_CREDENTIALS", "message": "...", "details": [] } }
  ```
  FE rẽ nhánh theo `error.code` (enum `ErrorCode` trong `backend/src/common/constants/error-codes.enum.ts`), còn `error.message` chỉ để hiển thị. Thêm lỗi nghiệp vụ mới thì thêm mã vào enum này.
- **Validation:** body/query kiểm tra bằng DTO + `class-validator`; trường lạ bị từ chối.

---

## Migration

Schema chỉ thay đổi qua migration, không dùng `synchronize`.

```bash
npm run migration:run                                   # áp các migration chưa chạy
npm run migration:revert                                # lùi migration gần nhất
npm run migration:generate -- src/database/migrations/TenMigration   # sinh từ thay đổi entity
```

Quy tắc:

1. Sửa entity xong thì tạo migration mới, **không sửa migration đã merge vào `dev`**.
2. Đọc lại file sinh ra trước khi commit; xoá các câu lệnh thừa không liên quan đến thay đổi của mình.
3. Sau khi pull code mới, chạy `npm run migration:run` trước khi `start:dev`.

---

## Quy trình Git

```
main      ← bản ổn định, chỉ nhận merge từ dev
 └── dev  ← nhánh tích hợp của cả nhóm
      ├── longnd/...
      ├── tlong/...
      └── ...           mỗi người một nhánh cá nhân
```

```bash
git checkout dev && git pull origin dev
git checkout <nhánh-của-mình>
git merge dev                       # cập nhật code mới nhất trước khi làm
# ... code, test ...
git add .
git commit -m "feat(auth): mô tả ngắn"
git push origin <nhánh-của-mình>
```

Sau đó mở Pull Request vào `dev`. Khi `dev` ổn định, mở PR `dev → main`.

- Commit theo dạng `feat|fix|refactor|docs|chore(<module>): mô tả`.
- Không commit `.env`, `node_modules`, `dist`, `.next` hay file build nào khác. Trước khi `git add .` thì xem `git status` xem có thư mục lạ không.
- **Không force-push / reset `main` và `dev`.** Mỗi commit vào `main` được Render và Vercel tự deploy lên bản thật.
- Chỉ sửa trong module mình phụ trách; cần đổi module người khác thì báo trước.

---

## Triển khai

| | Nền tảng | Cấu hình |
|---|---|---|
| Backend | Render (Web Service, Free) | Root Directory `backend`; Build `npm ci --include=dev && npm run build`; Start `npm run start:prod`; biến môi trường như bảng ở trên, thêm `NODE_ENV=production`, `DB_MIGRATIONS_RUN=true`, không đặt `PORT` |
| Frontend | Vercel | Root Directory `frontend`, preset Next.js; biến `NEXT_PUBLIC_API_URL=https://vegetmealplan-api.onrender.com/api/v1` |
| Database | Neon | chuỗi kết nối đặt vào `DATABASE_URL` của backend |

Cả hai tự deploy lại khi nhánh `main` có commit mới. Đổi domain FE thì sửa `FRONTEND_URL` trên Render (CORS, đăng nhập Google, link thanh toán). Google OAuth cần redirect URI `https://vegetmealplan-api.onrender.com/api/v1/auth/google/callback`.

---

## Scripts

| Thư mục | Lệnh | Tác dụng |
|---|---|---|
| backend | `npm run start:dev` | chạy API, tự reload |
| backend | `npm run build` / `npm run start:prod` | build và chạy bản production |
| backend | `npm run lint` / `npm test` | kiểm tra code / chạy test |
| backend | `npm run seed` | nạp dữ liệu mẫu |
| frontend | `npm run dev` | chạy giao diện ở cổng 3001 |
| frontend | `npm run build` / `npm start` | build và chạy bản production |
