# VegetMealPlan

Web hỗ trợ người ăn chay: tra cứu món chay, tính dinh dưỡng theo hồ sơ cá nhân, lên thực đơn tuần/tháng, quản lý nguyên liệu trong bếp, diễn đàn cộng đồng và trợ lý AI.

| Phần | Công nghệ |
|---|---|
| Backend | NestJS 10, TypeORM, PostgreSQL, JWT + Passport (Google OAuth2), Swagger |
| Frontend | Next.js 16 (App Router), React 19, Tailwind CSS 4, TypeScript 5 |

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
├── docs/
│   ├── algorithm.md         # công thức BMI, BMR (Mifflin-St Jeor), TDEE, macro
│   └── erd.md               # sơ đồ quan hệ CSDL
└── baocaotiendo.md          # báo cáo tiến độ
```

---

## Chạy dự án ở máy local

### Yêu cầu

- Node.js 20+ và npm
- PostgreSQL 14+ (cài native, không cần Docker)

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
| `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_DATABASE` | kết nối PostgreSQL |
| `DB_SYNCHRONIZE` | luôn để `false`, schema chỉ thay đổi qua migration |
| `JWT_SECRET` | chuỗi ngẫu nhiên dài, mỗi người tự sinh, không commit |
| `JWT_EXPIRES_IN` | hạn access token (mặc định `1d`) |
| `JWT_REFRESH_EXPIRES_DAYS` | hạn refresh token tính theo ngày (mặc định `30`) |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_CALLBACK_URL` | đăng nhập Google; để trống thì API Google trả 503, các chức năng khác vẫn chạy |
| `FRONTEND_URL` | nơi backend redirect về sau khi đăng nhập Google (`http://localhost:3001`) |
| `GUEST_CHATBOT_LIMIT`, `FREE_CHATBOT_LIMIT` | số lượt hỏi chatbot của khách / tài khoản free |
| `MONTHLY_PLAN_PRICE` | giá gói Premium theo tháng (VND) |

Sinh `JWT_SECRET` nhanh:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Seed nạp khoảng 628 món chay, 190 nguyên liệu, bảng nguyên liệu thay thế và các nhóm dị ứng. Muốn xoá dữ liệu cũ rồi nạp lại từ đầu:

```bash
SEED_RESET=true npm run seed          # Windows PowerShell: $env:SEED_RESET="true"; npm run seed
```

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
| **BE1 – Long** | `auth`, `users`, `health-goal`, `category`, `subscription`, `notification`, `usage-quota` | đăng ký/đăng nhập, Google OAuth2, phiên đăng nhập (refresh token, logout), hồ sơ và dị ứng, BMI/BMR/TDEE, danh mục, gói Premium, thông báo |
| **BE2 – TLong** | `recipe`, `ingredient`, `nutrition`, `meal-plan`, `recipe-import` | món chay, duyệt món, yêu thích, giá tự nhập, nguyên liệu thay thế, dinh dưỡng, sinh thực đơn tuần/tháng, import món hàng loạt |
| **BE3 – Khang** | `community`, `chatbot`, `user-ingredient`, `recommendation`, `shop` | diễn đàn, trợ lý AI, nguyên liệu trong bếp, gợi ý món từ nguyên liệu có sẵn, cửa hàng |

Frontend: **Đức**, **Huy**.

---

## Nhóm API chính

Mọi đường dẫn có tiền tố `/api/v1`. Danh sách đầy đủ và thử trực tiếp ở Swagger.

| Nhóm | Ví dụ |
|---|---|
| Xác thực | `POST /auth/register`, `/auth/login`, `/auth/refresh`, `/auth/logout`, `/auth/logout-all`; `GET /auth/google` → `POST /auth/google/exchange`; `GET /auth/me` |
| Hồ sơ | `GET/PUT /users/me/profile`, `GET/PUT /users/me/allergies`, `GET /users/me/nutrition-summary` |
| Món ăn | `GET /recipes`, `GET /recipes/:id`, `GET /recipes/:id/cost`, `GET /recipes/:id/replacements`, `POST /recipes` |
| Yêu thích, giá riêng | `/users/me/favorites/recipes`, `/users/me/recipe-prices` |
| Thực đơn | `POST /meal-plans/generate/weekly`, `/monthly`, `/for-someone`; `/users/me/meal-plans` |
| Nguyên liệu | `GET /ingredients`, `/users/me/ingredients`, `POST /users/me/recommendations/generate` |
| Cộng đồng, AI | `/forum/posts`, `POST /chatbot/ask` |
| Premium, thông báo | `/subscriptions/me/premium-status`, `POST /subscriptions/checkout`, `/notifications` |
| Quản trị | `/admin/categories`, `/admin/ingredients`, `/admin/recipes`, `/admin/recipe-imports` |

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
- Không commit `.env`, `node_modules`, `dist`.
- Chỉ sửa trong module mình phụ trách; cần đổi module người khác thì báo trước.

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
