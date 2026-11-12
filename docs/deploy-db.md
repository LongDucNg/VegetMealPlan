# Deploy database (Neon PostgreSQL)

DB dùng chung cho bản demo cuối. Cả nhóm vẫn code và test trên DB máy mình; chỉ một người (Long) chạy
migration/seed lên DB này.

## 1. Tạo DB trên Neon (một lần)

1. Đăng nhập https://neon.com bằng GitHub, tạo project: tên `vegetmealplan`, Postgres 16+,
   region **AWS Asia Pacific (Singapore)**.
2. Tạo database tên `vegetmealplan` (hoặc dùng `neondb` mặc định, nhớ tên).
3. Bấm **Connect**, tắt **Connection pooling**, copy chuỗi dạng
   `postgresql://<user>:<password>@<host>/<db>?sslmode=require`.
   Chuỗi này là mật khẩu DB: chỉ gửi trong nhóm chat riêng, không commit, không dán vào issue/PR.

## 2. Dựng schema + dữ liệu từ máy mình (PowerShell, trong `backend`)

Đặt `DATABASE_URL` tạm cho cửa sổ terminal này (không sửa `.env`, đóng terminal là hết):

```powershell
cd C:\Users\<ban>\VegetMealPlan\backend
$env:DATABASE_URL="postgresql://...neon.tech/vegetmealplan?sslmode=require"
$env:SEED_ADMIN_EMAIL="admin@..."
$env:SEED_ADMIN_PASSWORD="<it nhat 8 ky tu>"

npm run migration:run   # tạo bảng
npm run seed            # mục tiêu sức khoẻ, 190 nguyên liệu, 628 món, tài khoản admin, ảnh món
```

Log seed phải in `Bắt đầu seed vào <host neon>/vegetmealplan`. Nếu in `localhost/...` là biến chưa đặt đúng.

Xong thì **đóng cửa sổ terminal** (hoặc `Remove-Item Env:DATABASE_URL`) để lệnh sau không chạy nhầm lên DB demo.

## 3. Cập nhật khi có migration mới

Sau khi merge vào `dev`, chạy lại ở bước 2 chỉ lệnh `npm run migration:run`. Migration chỉ thêm thay đổi
mới, không xoá dữ liệu. Backend deploy có thể bật `DB_MIGRATIONS_RUN=true` để tự làm việc này khi khởi động.

## Chốt an toàn có sẵn trong code

| Nguy cơ | Chặn bằng |
|---|---|
| `DB_SYNCHRONIZE=true` làm TypeORM tự sửa bảng theo entity của nhánh cũ (xoá cột kèm dữ liệu) | Chỉ có tác dụng khi DB là localhost; DB khác luôn tắt và log cảnh báo |
| `SEED_RESET=true` xoá sạch công thức/nguyên liệu của cả nhóm | Trên DB không phải local bị từ chối, trừ khi thêm `SEED_RESET_CONFIRM=<tên database>` |
| Quên chạy migration sau khi deploy | `DB_MIGRATIONS_RUN=true` trên server |

## Sao lưu trước buổi demo

Neon Free khôi phục được về bất kỳ thời điểm nào trong 6 giờ gần nhất. Trước buổi bảo vệ nên dump thêm một bản:

```powershell
pg_dump "postgresql://...neon.tech/vegetmealplan?sslmode=require" -Fc -f vegetmealplan-demo.dump
```

## Cho cả nhóm truy cập DB demo

Nguyên tắc: **code và test vẫn trên DB máy mình**. DB demo chỉ để xem dữ liệu và chạy bản demo; chỉ Long chạy
migration/seed lên đó (sau khi đã merge vào `dev`).

| Ai / cần gì | Cách |
|---|---|
| Xem bảng, chạy câu SELECT trên web | Long vào Neon > project > **Settings > Project permissions**, thêm email của bạn đó. Bạn đó đăng nhập neon.com bằng đúng email này, dùng **Tables** / **SQL Editor**. Không ai ngoài chủ project xoá được project. |
| Xem bằng DBeaver / pgAdmin / VS Code | Dùng tài khoản **chỉ đọc** `team_readonly` (Long tạo một lần, xem dưới). Chuỗi kết nối gửi trong nhóm chat riêng. |
| Chạy backend máy mình trỏ vào DB demo (thử với dữ liệu thật) | Xin Long chuỗi kết nối, đặt tạm `$env:DATABASE_URL="..."` trong cửa sổ terminal rồi `npm run start:dev`. **Không** chạy `migration:run`, `seed`, `migration:revert` khi đang trỏ vào DB demo. |
| FE (Huy, Đức) | Không cần gì: FE gọi backend, backend mới nối DB. |

Tạo tài khoản chỉ đọc (Long chạy một lần trong **SQL Editor** của Neon, mật khẩu dài ngẫu nhiên vì Neon từ chối mật khẩu yếu):

```sql
CREATE ROLE team_readonly WITH LOGIN PASSWORD '<mat-khau-dai-ngau-nhien>';
GRANT CONNECT ON DATABASE neondb TO team_readonly;
GRANT USAGE ON SCHEMA public TO team_readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO team_readonly;
-- Bảng tạo sau này (migration mới) cũng tự cho đọc:
ALTER DEFAULT PRIVILEGES FOR ROLE neondb_owner IN SCHEMA public GRANT SELECT ON TABLES TO team_readonly;
```

Chuỗi kết nối chỉ đọc: `postgresql://team_readonly:<mat-khau>@<host Neon, bỏ "-pooler">/neondb?sslmode=require`.

Sau buổi bảo vệ: **Reset password** của `neondb_owner` và `team_readonly` trên Neon (mật khẩu đã gửi qua chat).
