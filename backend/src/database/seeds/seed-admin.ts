import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';
import { User, UserRole, UserStatus } from '../../modules/users/entities/user.entity';

const MIN_PASSWORD_LENGTH = 8;

/**
 * Tạo tài khoản admin từ biến môi trường (dùng khi dựng DB mới, vd DB deploy):
 *   SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD, SEED_ADMIN_NAME (tuỳ chọn).
 * Không khai báo thì bỏ qua. Email đã có thì KHÔNG đổi mật khẩu, chỉ đảm bảo là admin, đang hoạt động
 * và đã xác thực email (để đăng nhập được ngay, không cần mã OTP).
 */
export async function seedAdmin(ds: DataSource, env: NodeJS.ProcessEnv = process.env): Promise<void> {
  const email = env.SEED_ADMIN_EMAIL?.trim().toLowerCase();
  const password = env.SEED_ADMIN_PASSWORD ?? '';
  if (!email) {
    console.log('⏭️  Bỏ qua tạo admin: chưa khai báo SEED_ADMIN_EMAIL.');
    return;
  }

  const repo = ds.getRepository(User);
  const existing = await repo.findOne({ where: { email } });
  if (existing) {
    await repo.update(
      { user_id: existing.user_id },
      { role: UserRole.ADMIN, status: UserStatus.ACTIVE, email_verified_at: existing.email_verified_at ?? new Date() },
    );
    console.log(`✅ Admin: ${email} đã có, đảm bảo quyền admin (giữ nguyên mật khẩu).`);
    return;
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    throw new Error(`SEED_ADMIN_PASSWORD phải có ít nhất ${MIN_PASSWORD_LENGTH} ký tự.`);
  }
  await repo.save(
    repo.create({
      email,
      full_name: env.SEED_ADMIN_NAME?.trim() || 'Quản trị viên',
      password_hash: await bcrypt.hash(password, 10),
      role: UserRole.ADMIN,
      status: UserStatus.ACTIVE,
      email_verified_at: new Date(),
    }),
  );
  console.log(`✅ Admin: đã tạo ${email}.`);
}
