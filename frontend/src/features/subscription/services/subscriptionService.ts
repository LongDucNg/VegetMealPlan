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
          expiresAt: res.premium_until || undefined,
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
   * Tạo giao dịch VNPay thật:
   * POST /subscriptions/checkout
   * Trả về { payment_url, gateway_txn_ref, amount, expires_in_minutes }
   */
  async createCheckout(): Promise<CheckoutResponse> {
    return apiClient.post<CheckoutResponse>("/subscriptions/checkout");
  },

  /**
   * Xác nhận kết quả thanh toán từ VNPay Return URL:
   * GET /subscriptions/vnpay-return
   */
  async verifyVnpayReturn(params: Record<string, string>): Promise<VnpayReturnResponse> {
    return apiClient.get<VnpayReturnResponse>("/subscriptions/vnpay-return", { params });
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
   * Kích hoạt Demo / Test khi cổng thanh toán chưa được cấu hình
   */
  purchasePlan(planId: SubscriptionTier = "premium"): UserSubscription {
    const now = new Date();
    const expires = new Date();
    expires.setDate(now.getDate() + 30);
    return this.setPremiumActive(expires.toISOString());
  },

  upgradeToPremium(): UserSubscription {
    return this.purchasePlan("premium");
  },

  /**
   * Hủy gói Premium:
   * DELETE /subscriptions/:id
   */
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
        await apiClient.delete(`/subscriptions/${id}`);
      } catch (err) {
        console.warn("[subscriptionService] cancel error:", err);
      }
    }

    return updated;
  },

  togglePremium(): UserSubscription {
    if (this.isPremium()) {
      this.cancelSubscription();
      return DEFAULT_SUBSCRIPTION;
    }
    return this.upgradeToPremium();
  },
};
