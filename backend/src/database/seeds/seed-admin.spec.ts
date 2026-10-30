/* eslint-disable @typescript-eslint/no-explicit-any */
import * as bcrypt from 'bcrypt';
import { seedAdmin } from './seed-admin';
import { UserRole, UserStatus } from '../../modules/users/entities/user.entity';

function fakeDs(existing: any = null) {
  const saved: any[] = [];
  const updated: any[] = [];
  const repo = {
    findOne: async () => existing,
    create: (o: any) => o,
    save: async (o: any) => saved.push(o),
    update: async (where: any, data: any) => updated.push({ where, data }),
  };
  return { ds: { getRepository: () => repo } as any, saved, updated };
}

describe('Seed tài khoản admin từ biến môi trường', () => {
  beforeEach(() => jest.spyOn(console, 'log').mockImplementation(() => undefined));
  afterEach(() => jest.restoreAllMocks());

  it('không khai báo SEED_ADMIN_EMAIL -> không làm gì', async () => {
    const { ds, saved, updated } = fakeDs();
    await seedAdmin(ds, {});
    expect(saved).toHaveLength(0);
    expect(updated).toHaveLength(0);
  });

  it('tạo admin mới: mật khẩu được băm, đã xác thực email, đang hoạt động', async () => {
    const { ds, saved } = fakeDs();
    await seedAdmin(ds, { SEED_ADMIN_EMAIL: ' Admin@Veget.vn ', SEED_ADMIN_PASSWORD: 'MatKhau#2026' });
    expect(saved).toHaveLength(1);
    const admin = saved[0];
    expect(admin).toMatchObject({ email: 'admin@veget.vn', role: UserRole.ADMIN, status: UserStatus.ACTIVE });
    expect(admin.email_verified_at).toBeInstanceOf(Date);
    expect(admin.password_hash).not.toBe('MatKhau#2026');
    expect(await bcrypt.compare('MatKhau#2026', admin.password_hash)).toBe(true);
  });

  it('mật khẩu dưới 8 ký tự -> báo lỗi, không tạo', async () => {
    const { ds, saved } = fakeDs();
    await expect(seedAdmin(ds, { SEED_ADMIN_EMAIL: 'a@b.vn', SEED_ADMIN_PASSWORD: '123' })).rejects.toThrow('ít nhất 8');
    expect(saved).toHaveLength(0);
  });

  it('email đã có -> chỉ nâng quyền admin, giữ nguyên mật khẩu', async () => {
    const { ds, saved, updated } = fakeDs({ user_id: 9, email: 'a@b.vn', email_verified_at: null });
    await seedAdmin(ds, { SEED_ADMIN_EMAIL: 'a@b.vn', SEED_ADMIN_PASSWORD: 'khac-mat-khau' });
    expect(saved).toHaveLength(0);
    expect(updated[0].where).toEqual({ user_id: 9 });
    expect(updated[0].data).toMatchObject({ role: UserRole.ADMIN, status: UserStatus.ACTIVE });
    expect(updated[0].data).not.toHaveProperty('password_hash');
  });
});
