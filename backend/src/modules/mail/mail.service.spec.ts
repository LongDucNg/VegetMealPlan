/* eslint-disable @typescript-eslint/no-explicit-any */
import { MailService, parseAddress } from './mail.service';

const make = (env: Record<string, string | undefined>) => new MailService({ get: (k: string) => env[k] } as any);

describe('MailService', () => {
  const realFetch = global.fetch;
  afterEach(() => {
    global.fetch = realFetch;
  });

  it('parseAddress tách tên và email người gửi', () => {
    expect(parseAddress('VegetMealPlan <a@b.com>')).toEqual({ name: 'VegetMealPlan', email: 'a@b.com' });
    expect(parseAddress('"Veget Meal" <a@b.com>')).toEqual({ name: 'Veget Meal', email: 'a@b.com' });
    expect(parseAddress('a@b.com')).toEqual({ email: 'a@b.com' });
  });

  it('có BREVO_API_KEY: gửi OTP qua API HTTPS của Brevo, không dùng SMTP', async () => {
    const fetchMock = jest.fn().mockResolvedValue({ ok: true, status: 201, text: async () => '' });
    global.fetch = fetchMock as any;
    const mail = make({ BREVO_API_KEY: 'xkeysib-test', MAIL_HOST: 'smtp.gmail.com', MAIL_FROM: 'VegetMealPlan <sender@gmail.com>' });

    await mail.sendVerifyEmailOtp('user@example.com', '123456', 10);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('https://api.brevo.com/v3/smtp/email');
    expect(init.headers['api-key']).toBe('xkeysib-test');
    const body = JSON.parse(init.body);
    expect(body.sender).toEqual({ name: 'VegetMealPlan', email: 'sender@gmail.com' });
    expect(body.to).toEqual([{ email: 'user@example.com' }]);
    expect(body.subject).toContain('123456');
    expect(body.htmlContent).toContain('123456');
  });

  it('Brevo trả lỗi (vd sender chưa xác minh): ném lỗi để ghi log, không im lặng', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 400, text: async () => '{"message":"sender not valid"}' }) as any;
    const mail = make({ BREVO_API_KEY: 'xkeysib-test', MAIL_FROM: 'sender@gmail.com' });

    await expect(mail.sendVerifyEmailOtp('user@example.com', '123456', 10)).rejects.toThrow('Brevo HTTP 400');
  });

  it('không có BREVO_API_KEY và MAIL_HOST: không gọi mạng (môi trường dev in ra console)', async () => {
    const fetchMock = jest.fn();
    global.fetch = fetchMock as any;
    await make({}).sendVerifyEmailOtp('user@example.com', '123456', 10);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
