import { apiClient } from "@/lib/apiClient";
import { tokenStorage } from "@/lib/tokenStorage";
import { storage, STORAGE_KEYS } from "@/utils/storage/storage";
import {
  UserSubscription,
  SubscriptionTier,
  SubscriptionPlan,
  BackendSubscriptionPlan,
  CheckoutResponse,
  PremiumStatusResponse,
  PaymentReturnResponse,
  VnpayReturnResponse,
} from "../types";
import { DEFAULT_SUBSCRIPTION, MOCK_PLANS } from "../data/mockSubscriptions";

const SUBSCRIPTION_PLAN_KEY = "subscriptionPlan";

export const subscriptionService = {
  /**
   * Get subscription plan ("free" | "premium")
   */
  getSubscriptionPlan(): "free" | "premium" {
    if (typeof window !== "undefined") {
      const explicit = window.localStorage.getItem(SUBSCRIPTION_PLAN_KEY);
      if (explicit === "premium" || explicit === "free") {
        return explicit;
      }
    }
    const current = storage.getItem<UserSubscription>(
      STORAGE_KEYS.SUBSCRIPTION,
      DEFAULT_SUBSCRIPTION
    );
    return current.status === "active" ? "premium" : "free";
  },

  getSubscription(): UserSubscription {
    const plan = this.getSubscriptionPlan();
    const stored = storage.getItem<UserSubscription>(
      STORAGE_KEYS.SUBSCRIPTION,
      DEFAULT_SUBSCRIPTION
    );

    if (plan === "premium" && stored.status !== "active") {
      const premiumPlan = MOCK_PLANS.find((p) => p.id === "premium") || MOCK_PLANS[1];
      const fixed: UserSubscription = {
        status: "active",
        planId: "premium",
        planName: premiumPlan.name,
        autoRenew: false,
      };
      storage.setItem(STORAGE_KEYS.SUBSCRIPTION, fixed);
      return fixed;
    }

    if (plan === "free" && stored.status === "active") {
      const fixed: UserSubscription = {
        ...DEFAULT_SUBSCRIPTION,
      };
      storage.setItem(STORAGE_KEYS.SUBSCRIPTION, fixed);
      return fixed;
    }

    return stored;
  },

  isPremium(): boolean {
    return this.getSubscriptionPlan() === "premium";
  },

  /**
   * Lấy chu kỳ gói đăng ký 30 ngày (ngày bắt đầu và ngày hết hạn)
   */
  getSubscriptionPeriod(): {
    isPremium: boolean;
    startDate: Date;
    endDate: Date;
    startDateKey: string;
    endDateKey: string;
    totalDays: number;
  } {
    const sub = this.getSubscription();
    const isPrem = this.isPremium();
    const now = new Date();

    let endDate: Date;
    let startDate: Date;

    const rawEnd = sub.endDate || sub.expiresAt;
    if (rawEnd) {
      endDate = new Date(rawEnd);
    } else {
      const user = tokenStorage.getUser();
      if (user?.premium_until) {
        endDate = new Date(user.premium_until);
      } else {
        endDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
      }
    }

    const rawStart = sub.startDate || sub.activatedAt;
    if (rawStart) {
      startDate = new Date(rawStart);
    } else {
      // 30 ngày chuẩn trước ngày hết hạn
      startDate = new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    const toDateKey = (d: Date) => {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${y}-${m}-${day}`;
    };

    return {
      isPremium: isPrem,
      startDate,
      endDate,
      startDateKey: toDateKey(startDate),
      endDateKey: toDateKey(endDate),
      totalDays: 30,
    };
  },

  /**
   * Đồng bộ trạng thái Premium thật từ backend:
   * GET /subscriptions/me/premium-status
   */
  async fetchServerStatus(): Promise<UserSubscription> {
    const token = tokenStorage.getToken();
    if (!token) {
      return this.getSubscription();
    }

    try {
      const res = await apiClient.get<PremiumStatusResponse>("/subscriptions/me/premium-status");
      const isPrem = !!res?.isPremium;

      if (isPrem) {
        if (typeof window !== "undefined") {
          window.localStorage.setItem(SUBSCRIPTION_PLAN_KEY, "premium");
        }
        const activeSub: UserSubscription = {
          status: "active",
          planId: "premium",
          planName: "Premium 1 tháng",
          activatedAt: res.start_date || undefined,
          expiresAt: res.end_date || res.premium_until || undefined,
          startDate: res.start_date || undefined,
          endDate: res.end_date || res.premium_until || undefined,
          autoRenew: false,
        };
        storage.setItem(STORAGE_KEYS.SUBSCRIPTION, activeSub);

        // Đồng bộ Auth user cache
        const authUser = tokenStorage.getUser();
        if (authUser) {
          authUser.is_premium = true;
          if (res.premium_until) {
            authUser.premium_until = new Date(res.premium_until);
          }
          tokenStorage.setUser(authUser);
        }

        return activeSub;
      } else {
        if (typeof window !== "undefined") {
          window.localStorage.setItem(SUBSCRIPTION_PLAN_KEY, "free");
        }
        storage.setItem(STORAGE_KEYS.SUBSCRIPTION, DEFAULT_SUBSCRIPTION);

        const authUser = tokenStorage.getUser();
        if (authUser && authUser.is_premium) {
          authUser.is_premium = false;
          authUser.premium_until = undefined;
          tokenStorage.setUser(authUser);
        }

        return DEFAULT_SUBSCRIPTION;
      }
    } catch (err) {
      console.warn("[subscriptionService] fetchServerStatus fallback:", err);
      return this.getSubscription();
    }
  },

  /**
   * Lấy danh sách các gói dịch vụ thật từ backend:
   * GET /subscriptions/plans
   */
  async getPlans(): Promise<SubscriptionPlan[]> {
    try {
      const res = await apiClient.get<BackendSubscriptionPlan[]>("/subscriptions/plans");
      if (Array.isArray(res) && res.length > 0) {
        const backendPlans: SubscriptionPlan[] = res.map((bp) => ({
          id: "premium",
          name: bp.name,
          price: bp.price,
          formattedPrice: `${bp.price.toLocaleString("vi-VN")} đ`,
          duration: "monthly",
          billingCycleText: `${bp.price.toLocaleString("vi-VN")} đ / ${bp.duration_days} ngày`,
          badge: "Toàn bộ tính năng",
          popular: true,
          description: bp.description,
          features: [
            "Kế hoạch thực đơn cá nhân hóa toàn diện",
            "Mục tiêu calo chuẩn theo chỉ số cơ thể",
            "Gợi ý bữa ăn dựa trên BMI & BMR",
            "Loại trừ dị ứng thực phẩm nghiêm ngặt",
            "Đầy đủ thực đơn tuần và lịch tháng",
            "Tùy biến đổi món và chỉnh sửa thực đơn",
            "AI Dinh dưỡng hỗ trợ tư vấn",
            "Tạo lại thực đơn không giới hạn",
            "Ưu tiên tích hợp món ăn yêu thích",
          ],
        }));

        const freePlan = MOCK_PLANS.find((p) => p.id === "free") || MOCK_PLANS[0];
        return [freePlan, ...backendPlans];
      }
    } catch (err) {
      console.warn("[subscriptionService] getPlans error, fallback to mock:", err);
    }
    return MOCK_PLANS;
  },

  /**
   * Tạo giao dịch thanh toán VietQR qua PayOS:
   * POST /subscriptions/checkout
   * Trả về { payment_url, qr_code, order_code, gateway_txn_ref, amount, expires_in_minutes }
   */
  async createCheckout(): Promise<CheckoutResponse> {
    return apiClient.post<CheckoutResponse>("/subscriptions/checkout");
  },

  /**
   * Tra cứu trạng thái giao dịch thanh toán PayOS:
   * GET /subscriptions/transactions/:orderCode
   */
  async checkTransactionStatus(orderCode: string): Promise<PaymentReturnResponse> {
    return apiClient.get<PaymentReturnResponse>(`/subscriptions/transactions/${orderCode}`);
  },

  /**
   * Xác nhận kết quả thanh toán từ Return URL (PayOS / VietQR):
   */
  async verifyVnpayReturn(params: Record<string, string>): Promise<PaymentReturnResponse> {
    const orderCode = params.orderCode || params.vnp_TxnRef || "";
    if (orderCode) {
      try {
        return await this.checkTransactionStatus(orderCode);
      } catch (err) {
        console.warn("[subscriptionService] checkTransactionStatus error:", err);
      }
    }
    const isCancelled = params.cancel === "true" || params.status === "CANCELLED";
    return {
      status: isCancelled ? "failed" : "success",
      txn_ref: orderCode || null,
      premium_until: null,
      message: isCancelled ? "Giao dịch đã bị hủy" : "Đã nhận kết quả thanh toán",
    };
  },

  /**
   * Kích hoạt trạng thái Premium sau khi thanh toán thành công
   */
  setPremiumActive(premiumUntil?: string | null, txnRef?: string | null): UserSubscription {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(SUBSCRIPTION_PLAN_KEY, "premium");
    }

    const updated: UserSubscription = {
      status: "active",
      planId: "premium",
      planName: "Premium 1 tháng",
      activatedAt: new Date().toISOString(),
      expiresAt: premiumUntil || undefined,
      autoRenew: false,
    };

    storage.setItem(STORAGE_KEYS.SUBSCRIPTION, updated);

    // Lưu vào user profile nếu đang đăng nhập
    const authUser = tokenStorage.getUser();
    if (authUser) {
      authUser.is_premium = true;
      if (premiumUntil) {
        authUser.premium_until = new Date(premiumUntil);
      }
      tokenStorage.setUser(authUser);
    }

    return updated;
  },

  /**
   * Kích hoạt gói Premium trực tiếp (không qua thanh toán)
   */
  async activateDirect(): Promise<{ success: boolean; isPremium: boolean; premium_until?: string; message: string }> {
    const res = await apiClient.post<any>("/subscriptions/activate-free");
    if (res?.success && res?.isPremium) {
      this.setPremiumActive(res.premium_until);
    }
    return res;
  },

  /**
   * Chuyển về gói Miễn phí
   */
  async switchFree(): Promise<{ success: boolean; isPremium: boolean; message: string }> {
    const res = await apiClient.post<any>("/subscriptions/switch-free");
    if (res?.success) {
      this.setFreeActive();
    }
    return res;
  },

  setFreeActive(): UserSubscription {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(SUBSCRIPTION_PLAN_KEY, "free");
    }

    const updated: UserSubscription = {
      ...DEFAULT_SUBSCRIPTION,
    };

    storage.setItem(STORAGE_KEYS.SUBSCRIPTION, updated);

    const authUser = tokenStorage.getUser();
    if (authUser) {
      authUser.is_premium = false;
      authUser.premium_until = undefined;
      tokenStorage.setUser(authUser);
    }

    return updated;
  },

  async togglePremium(): Promise<UserSubscription> {
    const current = this.getSubscriptionPlan();
    if (current === "premium") {
      await this.switchFree();
      return this.getSubscription();
    } else {
      await this.activateDirect();
      return this.getSubscription();
    }
  },

  async purchasePlan(planId: SubscriptionTier = "premium"): Promise<UserSubscription> {
    const token = tokenStorage.getToken();
    let backendUntil: string | null = null;

    if (token) {
      try {
        const res = await apiClient.post<any>("/subscriptions/activate-free");
        if (res?.premium_until) {
          backendUntil = res.premium_until;
        }
      } catch (err) {
        console.warn("[subscriptionService] activate-free API error, falling back locally:", err);
      }
    }

    const expires = backendUntil
      ? new Date(backendUntil)
      : new Date(Date.now() + 30 * 86_400_000);

    return this.setPremiumActive(expires.toISOString());
  },

  async upgradeToPremium(): Promise<UserSubscription> {
    return this.purchasePlan("premium");
  },

  async cancelSubscription(id: number = 1): Promise<UserSubscription> {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(SUBSCRIPTION_PLAN_KEY, "free");
    }

    const updated: UserSubscription = {
      ...DEFAULT_SUBSCRIPTION,
      status: "free",
      planId: "free",
      planName: "Free Plan",
    };
    storage.setItem(STORAGE_KEYS.SUBSCRIPTION, updated);

    const authUser = tokenStorage.getUser();
    if (authUser) {
      authUser.is_premium = false;
      authUser.premium_until = undefined;
      tokenStorage.setUser(authUser);
    }

    const token = tokenStorage.getToken();
    if (token) {
      try {
        await apiClient.post("/subscriptions/switch-free");
      } catch (err) {
        console.warn("[subscriptionService] switch-free error:", err);
      }
    }

    return updated;
  },
};
