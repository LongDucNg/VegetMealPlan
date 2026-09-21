# VegetMealPlan

Ứng dụng hỗ trợ người ăn chay — đồ án môn học.

## Cấu trúc repo

```
VegetMealPlan/
├── backend/          # NestJS + TypeORM + PostgreSQL
├── frontend/         # (chờ 2 bạn FE chọn stack — React/Next/Vue)
├── docs/             # tài liệu ERD, business rules, thuật toán
└── docker-compose.yml
```

## Bắt đầu (backend)

```bash
# 1. Chạy PostgreSQL local bằng Docker
docker compose up -d

# 2. Cài dependencies
cd backend
npm install

# 3. Copy .env
cp .env.example .env

# 4. Chạy migration đầu tiên (sau khi đã generate — xem bên dưới)
npm run migration:run

# 5. Seed dữ liệu mẫu (optional, sau khi có seed)
npm run seed

# 6. Chạy dev server
npm run start:dev
```

API chạy tại `http://localhost:3000/api/v1`, Swagger docs tại `http://localhost:3000/api/docs`.

### Tạo migration đầu tiên từ entity

Entity đã viết sẵn theo đúng ERD (xem `docs/erd.md`), nhưng **chưa có migration nào** — migration đầu tiên do người chạy tạo ra từ máy mình:

```bash
cd backend
npm run migration:generate -- src/database/migrations/InitSchema
npm run migration:run
```

Kiểm tra kỹ file migration sinh ra trước khi commit (đặc biệt enum types, composite PK của các bảng trung gian).

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

Mỗi module đã có sẵn entity + (một số) service/controller mẫu. Module nào chỉ có `.module.ts` với TODO nghĩa là khung đã sẵn, chưa có business logic — người phụ trách tự viết service/controller theo mẫu của module `users`/`recipe`/`recommendation` (đã code đầy đủ để tham khảo pattern).

## Git workflow

```
main  <── dev  <── long, member2, member3, member4, member5
```

- Mỗi thành viên code trên branch tên mình, PR vào `dev`.
- `dev` là nơi tích hợp + review nội bộ nhóm trước khi duyệt.
- Chỉ merge `dev` → `main` sau khi cả nhóm đã test qua.
- Đặt tên nhánh task nếu cần chia nhỏ hơn: `<tên>/feature-recipe-crud`.

## Database

PostgreSQL, schema theo ERD trong `docs/erd.md`. Không dùng `synchronize: true` ngoài máy local cá nhân — mọi thay đổi schema đi qua migration để cả team cùng một nguồn sự thật, tránh xung đột khi 5 người cùng động vào DB.
