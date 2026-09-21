# VegetMealPlan

Ứng dụng hỗ trợ người ăn chay — đồ án môn học.

> **Không dùng Docker cho dự án này** (trường chưa cho phép, cả nhóm làm việc trực tiếp
> với PostgreSQL cài native trên máy). Mỗi người tự cài PostgreSQL + tạo database
> `vegetmealplan` local, cấu hình qua file `.env` riêng (không commit).

## Cấu trúc repo

```
VegetMealPlan/
├── backend/          # NestJS + TypeORM + PostgreSQL
├── frontend/         # (chờ 2 bạn FE chọn stack — React/Next/Vue)
└── docs/             # tài liệu ERD, business rules, thuật toán
```

## Cài đặt PostgreSQL (native, không Docker)

1. Tải PostgreSQL cho Windows: https://www.postgresql.org/download/windows/
   (bản 16.x, cài kèm pgAdmin 4 luôn cho dễ thao tác).
2. Trong lúc cài, đặt password cho user `postgres` — **nhớ password này**, mỗi người
   một password khác nhau cũng được vì nó chỉ nằm trong `.env` cá nhân, không commit.
3. Cổng mặc định `5432` — giữ nguyên trừ khi máy đã có Postgres khác chiếm cổng.
4. Mở pgAdmin (hoặc `psql -U postgres`), tạo database:
   ```sql
   CREATE DATABASE vegetmealplan;
   ```
5. Copy `.env.example` thành `.env` trong `backend/`, điền đúng `DB_USERNAME`/`DB_PASSWORD`
   bạn vừa đặt ở bước 2.

> Mỗi thành viên tự làm bước này trên máy mình — KHÔNG có 1 DB dùng chung cho cả nhóm ở
> giai đoạn code local. Khi cần data mẫu giống nhau, chạy `npm run seed` (xem dưới) sau khi
> đã có sẵn schema.

## Bắt đầu (backend)

```bash
cd backend
npm install

# copy .env.example -> .env rồi điền DB_USERNAME/DB_PASSWORD đã đặt lúc cài Postgres
cp .env.example .env

# tạo migration đầu tiên (chỉ người đầu tiên chạy cần làm, xem mục bên dưới)
npm run migration:run

# seed dữ liệu mẫu (optional)
npm run seed

# chạy dev server
npm run start:dev
```

API chạy tại `http://localhost:3000/api/v1`, Swagger docs tại `http://localhost:3000/api/docs`.

### Tạo migration đầu tiên từ entity

Entity đã viết sẵn theo đúng ERD (xem `docs/erd.md`), nhưng **chưa có migration nào** —
người đầu tiên chạy tạo ra migration này từ máy mình rồi commit, những người sau chỉ cần
`npm run migration:run`:

```bash
cd backend
npm run migration:generate -- src/database/migrations/InitSchema
npm run migration:run
```

Kiểm tra kỹ file migration sinh ra trước khi commit (đặc biệt enum types, composite PK của
các bảng trung gian). Sau khi migration đã có trong repo, người khác pull về chỉ cần chạy
`npm run migration:run`, không generate lại.

## Cấu trúc module (feature-module, theo ERD)

| Module | Entity | Ghi chú |
|---|---|---|
| `auth` | — | register/login, JWT strategy |
| `users` | User | + tính BMI server-side |
| `health-goal` | HealthGoal | lookup table |
| `category` | Category | quản lý bởi Admin |
| `ingredient` | Ingredient, IngredientConflict, UserAllergy | |
| `recipe` | Recipe, RecipeIngredient, RecipeCategory | |
| `nutrition` | NutritionInfo | 1:1 với Recipe |
| `user-ingredient` | UserIngredient | nguyên liệu user có ở nhà |
| `recommendation` | AiRecommendation, AiRecommendationMissingIngredient | **thuật toán matching chính** — xem `docs/algorithm.md` |
| `meal-plan` | MealPlan, WeeklyPlan, DailyMeal, MealItem | |
| `community` | Blog, Video, Comment, Vote | |
| `chatbot` | ChatbotConversation, TrialUsage | kèm logic chặn trial |
| `shop` | Shop | cache từ Google Places API |

## Đề xuất chia việc cho 3 bạn BE (feature-module, hạn chế đụng code)

- **BE-1 — Người & Nội dung**: `auth`, `users`, `health-goal`, `community`
- **BE-2 — Món ăn & Nguyên liệu**: `category`, `ingredient`, `recipe`, `nutrition`
- **BE-3 — Gợi ý & Kế hoạch**: `user-ingredient`, `recommendation`, `meal-plan`, `chatbot`, `shop`

Mỗi module đã có sẵn entity + (một số) service/controller mẫu. Module nào chỉ có
`.module.ts` với TODO nghĩa là khung đã sẵn, chưa có business logic — người phụ trách tự
viết service/controller theo mẫu của module `users`/`recipe`/`recommendation` (đã code đầy
đủ để tham khảo pattern).

## Git workflow

```
main  <── dev  <── long, member2, member3, member4, member5
```

- Mỗi thành viên code trên branch tên mình, PR vào `dev`.
- `dev` là nơi tích hợp + review nội bộ nhóm trước khi duyệt.
- Chỉ merge `dev` → `main` sau khi cả nhóm đã test qua.
- Đặt tên nhánh task nếu cần chia nhỏ hơn: `<tên>/feature-recipe-crud`.

## Database

PostgreSQL cài native trên từng máy (không Docker — trường chưa cho phép), schema theo ERD
trong `docs/erd.md`. Không dùng `synchronize: true` ngoài lúc thử nghiệm cá nhân — mọi thay
đổi schema đi qua migration để cả team cùng một nguồn sự thật, tránh xung đột khi 5 người
cùng động vào DB.
