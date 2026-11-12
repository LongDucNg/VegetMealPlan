/* eslint-disable @typescript-eslint/no-explicit-any */
import { SubscriptionService } from './subscription.service';

function build(allow?: string) {
  const saved: any[] = [];
  const transactionRepo: any = { create: (o: any) => o, save: async (o: any) => (saved.push(o), { ...o, transaction_id: 1 }) };
  const config: any = { get: (k: string) => (k === 'ALLOW_DIRECT_PREMIUM' ? allow : undefined) };
  const svc = new SubscriptionService({} as any, transactionRepo, {} as any, {} as any, {} as any, config);
  jest.spyOn(svc as any, 'activatePremium').mockResolvedValue(new Date('2030-01-01'));
  return { svc, saved };
}

describe('POST /subscriptions/activate-free (bật Premium không qua thanh toán)', () => {
  it.each([undefined, 'false', 'TRUE', '1'])('ALLOW_DIRECT_PREMIUM=%s -> 403, không tạo giao dịch', async (flag) => {
    const { svc, saved } = build(flag);
    await expect(svc.activateDirect(7)).rejects.toEqual(
      expect.objectContaining({ response: expect.objectContaining({ code: 'SUBSCRIPTION_DIRECT_DISABLED' }) }),
    );
    expect(saved).toHaveLength(0);
  });

  it('ALLOW_DIRECT_PREMIUM=true (demo) -> kích hoạt được', async () => {
    const { svc, saved } = build('true');
    const res = await svc.activateDirect(7);
    expect(res.isPremium).toBe(true);
    expect(saved).toHaveLength(1);
  });
});
