import { HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EmailOtpPurpose } from './entities/email-otp.entity';
import { User, UserRole, UserStatus } from '../users/entities/user.entity';
import { ErrorCode } from '../../common/constants/error-codes.enum';

// bcrypt là thư viện native; giả lập để test chạy được trên mọi máy và nhanh.
jest.mock('bcrypt', () => ({
  hashSync: (s: string) => `h:${s}`,
  hash: async (s: string) => `h:${s}`,
  compare: async (plain: string, hash: string) => hash === `h:${plain}`,
}));

/** Kho user trong bộ nhớ, đủ các hàm AuthService dùng. */
function createUserRepo() {
  const users: User[] = [];
  let nextId = 1;
  const byEmail = (email: string) => users.find((u) => u.email.toLowerCase() === email) ?? null;
  const repo = {
    users,
    create: (data: Partial<User>) => ({ role: UserRole.AUTHORIZED, ...data }) as User,
    save: async (u: User) => {
      if (!u.user_id) {
        u.user_id = nextId++;
        users.push(u);
      }
      return u;
    },
    findOne: async ({ where }: { where: Partial<User> }) =>
      users.find((u) => Object.entries(where).every(([k, v]) => (u as never)[k] === v)) ?? null,
    update: async ({ user_id }: { user_id: number }, patch: Partial<User>) => {
      Object.assign(users.find((u) => u.user_id === user_id)!, patch);
    },
    delete: async (user_id: number) => {
      users.splice(users.findIndex((u) => u.user_id === user_id), 1);
    },
    createQueryBuilder: () => {
      let email = '';
      const qb = {
        where: (_sql: string, params: { email: string }) => {
          email = params.email;
          return qb;
        },
        getOne: async () => byEmail(email),
      };
      return qb;
    },
    manager: {
      transaction: async (fn: (m: unknown) => Promise<void>) =>
        fn({
          update: async (entity: unknown, where: { user_id?: number }, patch: Partial<User>) => {
            if (entity === User && where.user_id) await repo.update({ user_id: where.user_id }, patch);
          },
        }),
    },
  };
  return repo;
}

/** OTP giả: mỗi lần issue sinh mã "111111", "222222"...; có thể bật chế độ đang trong 60 giây chờ. */
function createOtpService() {
  const codes = new Map<string, string>();
  let counter = 0;
  const svc = {
    rateLimited: false,
    issued: [] as { email: string; purpose: EmailOtpPurpose; code: string }[],
    issue: jest.fn(async (email: string, purpose: EmailOtpPurpose) => {
      if (svc.rateLimited) {
        throw new HttpException({ code: ErrorCode.AUTH_OTP_RATE_LIMITED, message: 'wait' }, HttpStatus.TOO_MANY_REQUESTS);
      }
      counter++;
      const code = String(counter).repeat(6);
      codes.set(`${purpose}:${email}`, code);
      svc.issued.push({ email, purpose, code });
      return code;
    }),
    consume: jest.fn(async (email: string, purpose: EmailOtpPurpose, code: string) => {
      if (codes.get(`${purpose}:${email}`) !== code) {
        throw new HttpException({ code: ErrorCode.AUTH_OTP_INVALID, message: 'sai' }, HttpStatus.BAD_REQUEST);
      }
      codes.delete(`${purpose}:${email}`);
    }),
  };
  return svc;
}

function setup() {
  const userRepo = createUserRepo();
  const otp = createOtpService();
  const mail = {
    sendVerifyEmailOtp: jest.fn().mockResolvedValue(undefined),
    sendResetPasswordOtp: jest.fn().mockResolvedValue(undefined),
    sendPasswordChanged: jest.fn().mockResolvedValue(undefined),
  };
  const sessions = {
    create: jest.fn(async (user_id: number) => ({ session: { session_id: `s-${user_id}` }, refreshToken: 'refresh' })),
  };
  const googleCodes = { issue: jest.fn(() => 'google-code') };
  const jwt = { sign: jest.fn(() => 'access') };
  const usersService = { updateProfile: jest.fn(), setAllergies: jest.fn() };
  const ipLimiter = { hit: jest.fn() };

  const service = new AuthService(
    userRepo as never,
    jwt as never,
    usersService as never,
    googleCodes as never,
    sessions as never,
    otp as never,
    mail as never,
    ipLimiter as never,
  );
  return { service, userRepo, otp, mail, sessions };
}

/** Chờ promise gửi mail chạy nền. */
const flush = () => new Promise((r) => setImmediate(r));

async function expectErrorCode(promise: Promise<unknown>, status: number, code: ErrorCode) {
  await expect(promise).rejects.toMatchObject({ status, response: expect.objectContaining({ code }) });
}

describe('Xác thực email khi đăng ký', () => {
  it('đăng ký: tạo user chưa xác thực, gửi OTP, KHÔNG trả token', async () => {
    const { service, userRepo, otp, mail, sessions } = setup();

    const res = await service.register({ full_name: 'An', email: '  An@Gmail.com ', password: 'matkhau123' } as never);
    await flush();

    expect(res).toMatchObject({ email: 'an@gmail.com', verification_required: true });
    expect(res).not.toHaveProperty('access_token');
    expect(sessions.create).not.toHaveBeenCalled();

    expect(userRepo.users[0]).toMatchObject({ email: 'an@gmail.com', email_verified_at: null });
    expect(otp.issued).toEqual([{ email: 'an@gmail.com', purpose: EmailOtpPurpose.VERIFY_EMAIL, code: '111111' }]);
    expect(mail.sendVerifyEmailOtp).toHaveBeenCalledWith('an@gmail.com', '111111', 10);
  });

  it('đăng ký trùng email (khác hoa thường) bị chặn 409', async () => {
    const { service } = setup();
    await service.register({ full_name: 'An', email: 'an@gmail.com', password: 'matkhau123' } as never);
    await expectErrorCode(
      service.register({ full_name: 'B', email: 'AN@gmail.com', password: 'matkhau123' } as never),
      409,
      ErrorCode.AUTH_EMAIL_TAKEN,
    );
  });

  it('đăng nhập khi chưa xác thực: đúng mật khẩu thì 403 và gửi mã mới; sai mật khẩu vẫn chỉ 401', async () => {
    const { service, otp } = setup();
    await service.register({ full_name: 'An', email: 'an@gmail.com', password: 'matkhau123' } as never);

    await expectErrorCode(
      service.login({ email: 'an@gmail.com', password: 'saimatkhau' } as never),
      401,
      ErrorCode.AUTH_INVALID_CREDENTIALS,
    );
    expect(otp.issued).toHaveLength(1); // sai mật khẩu: không gửi mã, không lộ trạng thái

    await expectErrorCode(
      service.login({ email: 'AN@gmail.com', password: 'matkhau123' } as never),
      403,
      ErrorCode.AUTH_EMAIL_NOT_VERIFIED,
    );
    expect(otp.issued).toHaveLength(2);
  });

  it('nhập đúng mã: đánh dấu đã xác thực, trả token; sau đó đăng nhập bình thường', async () => {
    const { service, userRepo } = setup();
    await service.register({ full_name: 'An', email: 'an@gmail.com', password: 'matkhau123' } as never);

    await expectErrorCode(
      service.verifyEmail({ email: 'an@gmail.com', code: '999999' }),
      400,
      ErrorCode.AUTH_OTP_INVALID,
    );
    expect(userRepo.users[0].email_verified_at).toBeNull();

    const res = await service.verifyEmail({ email: 'An@gmail.com', code: '111111' });
    expect(res).toMatchObject({ access_token: 'access', refresh_token: 'refresh' });
    expect(userRepo.users[0].email_verified_at).toBeInstanceOf(Date);

    await expect(service.login({ email: 'an@gmail.com', password: 'matkhau123' } as never)).resolves.toMatchObject({
      access_token: 'access',
    });
  });

  it('tài khoản bị khoá thì nhập đúng mã cũng không đăng nhập được', async () => {
    const { service, userRepo } = setup();
    await service.register({ full_name: 'An', email: 'an@gmail.com', password: 'matkhau123' } as never);
    userRepo.users[0].status = UserStatus.LOCKED;

    await expectErrorCode(
      service.verifyEmail({ email: 'an@gmail.com', code: '111111' }),
      401,
      ErrorCode.AUTH_ACCOUNT_LOCKED,
    );
  });

  it('gửi lại mã: luôn cùng một câu trả lời, chỉ gửi thật cho tài khoản chưa xác thực', async () => {
    const { service, userRepo, otp } = setup();
    await service.register({ full_name: 'An', email: 'an@gmail.com', password: 'matkhau123' } as never);
    await service.register({ full_name: 'Binh', email: 'binh@gmail.com', password: 'matkhau123' } as never);
    userRepo.users[1].email_verified_at = new Date();
    const before = otp.issued.length;

    const unknown = await service.resendVerification('khongco@gmail.com', '1.1.1.1');
    const verified = await service.resendVerification('binh@gmail.com', '1.1.1.1');
    const pending = await service.resendVerification('an@gmail.com', '1.1.1.1');

    expect(unknown).toEqual(verified);
    expect(verified).toEqual(pending);
    expect(otp.issued.slice(before).map((i) => i.email)).toEqual(['an@gmail.com']);
  });

  it('đang trong 60 giây chờ thì đăng ký vẫn thành công (mã cũ còn dùng được)', async () => {
    const { service, otp } = setup();
    otp.rateLimited = true;
    await expect(
      service.register({ full_name: 'An', email: 'an@gmail.com', password: 'matkhau123' } as never),
    ).resolves.toMatchObject({ verification_required: true });
  });

  it('Google đăng nhập vào tài khoản chưa xác thực: xoá mật khẩu do người khác có thể đã đặt', async () => {
    const { service, userRepo } = setup();
    await service.register({ full_name: 'Ke gian', email: 'nannhan@gmail.com', password: 'matkhaukegian' } as never);

    await service.loginWithGoogle({ googleId: 'g-1', email: 'nannhan@gmail.com', fullName: 'Nan Nhan' });

    expect(userRepo.users[0]).toMatchObject({ google_id: 'g-1', password_hash: null });
    expect(userRepo.users[0].email_verified_at).toBeInstanceOf(Date);
    await expectErrorCode(
      service.login({ email: 'nannhan@gmail.com', password: 'matkhaukegian' } as never),
      401,
      ErrorCode.AUTH_INVALID_CREDENTIALS,
    );
  });

  it('tạo tài khoản mới bằng Google thì coi như đã xác thực', async () => {
    const { service, userRepo } = setup();
    await service.loginWithGoogle({ googleId: 'g-2', email: 'moi@gmail.com', fullName: 'Moi' });
    expect(userRepo.users[0].email_verified_at).toBeInstanceOf(Date);
  });

  it('đặt lại mật khẩu bằng OTP email cũng đánh dấu đã xác thực', async () => {
    const { service, userRepo, otp } = setup();
    await service.register({ full_name: 'An', email: 'an@gmail.com', password: 'matkhau123' } as never);
    await service.forgotPassword('an@gmail.com', '1.1.1.1');
    const resetCode = otp.issued.find((i) => i.purpose === EmailOtpPurpose.RESET_PASSWORD)!.code;

    await service.resetPassword({ email: 'an@gmail.com', code: resetCode, new_password: 'matkhaumoi1' });

    expect(userRepo.users[0].email_verified_at).toBeInstanceOf(Date);
    await expect(service.login({ email: 'an@gmail.com', password: 'matkhaumoi1' } as never)).resolves.toMatchObject({
      access_token: 'access',
    });
  });
});
